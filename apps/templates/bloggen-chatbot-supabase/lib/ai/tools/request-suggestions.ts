import { z } from 'zod';
import { streamObject, tool, type UIMessageStreamWriter } from 'ai';
import { getDocumentById, saveSuggestions } from '@/db/queries';
import type { Tables } from '@/types_db';
type Suggestion = Tables<'suggestions'>;
import { generateUUID } from '@/lib/utils';
import { myProvider } from '../providers';
import type { ChatMessage } from '@/lib/types';

export interface RequestSuggestionsProps {
  session?: any;
  dataStream: any;
}

export const requestSuggestions = ({
  session,
  dataStream,
}: RequestSuggestionsProps) =>
  tool({
    description: 'Request suggestions for a document',
    inputSchema: z.object({
      documentId: z
        .string()
        .describe('The ID of the document to request edits'),
    }),
    execute: async ({ documentId }) => {
      const document = await getDocumentById({ id: documentId });

      if (!document || typeof document !== 'object' || !('content' in document) || !document.content) {
        return {
          error: 'Document not found',
        };
      }

      const suggestions: Array<
        Omit<Suggestion, 'userId' | 'createdAt' | 'documentCreatedAt'>
      > = [];

      const { elementStream } = streamObject({
        model: myProvider.languageModel('artifact-model'),
        system:
          'You are a help writing assistant. Given a piece of writing, please offer suggestions to improve the piece of writing and describe the change. It is very important for the edits to contain full sentences instead of just words. Max 5 suggestions.',
        prompt: document.content,
        output: 'array',
        schema: z.object({
          originalSentence: z.string().describe('The original sentence'),
          suggestedSentence: z.string().describe('The suggested sentence'),
          description: z.string().describe('The description of the suggestion'),
        }),
      });

      for await (const element of elementStream) {
        const suggestion: Omit<Suggestion, 'userId' | 'createdAt' | 'documentCreatedAt'> = {
          original_text: element.originalSentence,
          suggested_text: element.suggestedSentence,
          description: element.description,
          id: generateUUID(),
          document_id: documentId,
          is_resolved: false,
          user_id: null,
          created_at: new Date().toISOString(),
          document_created_at: new Date().toISOString(),
        };

        dataStream.write({
          type: 'data-suggestion',
          data: suggestion,
          transient: true,
        });

        suggestions.push(suggestion);
      }

      if (session?.user?.id) {
        const userId = session.user.id;

        await saveSuggestions({
          suggestions: suggestions.map((suggestion) => ({
            ...suggestion,
            user_id: userId,
            created_at: new Date(document.created_at).toISOString(),
            document_created_at: new Date(document.created_at).toISOString(),
          })),
        });
      }

      return {
        id: documentId,
        title: (document as any).title,
        kind: (document as any).kind,
        message: 'Suggestions have been added to the document',
      };
    },
  });
