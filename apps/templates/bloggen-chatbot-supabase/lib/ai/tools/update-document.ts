import { tool, type UIMessageStreamWriter } from 'ai';
import { z } from 'zod';
import { getDocumentById } from '@/db/queries';
import { documentHandlersByArtifactKind } from '@/lib/artifacts/server';
import type { ChatMessage } from '@/lib/types';

export interface UpdateDocumentProps {
  session?: any;
  dataStream: any;
}

export const updateDocument = ({ session, dataStream }: UpdateDocumentProps) =>
  tool({
    description: 'Update a document with the given description.',
    inputSchema: z.object({
      id: z.string().describe('The ID of the document to update'),
      description: z
        .string()
        .describe('The description of changes that need to be made'),
    }),
    execute: async ({ id, description }) => {
      const document = await getDocumentById({ id });

      if (!document || typeof document !== 'object' || !('kind' in document) || !('title' in document) || !('content' in document) || !('created_at' in document) || !('user_id' in document)) {
        return {
          error: 'Document not found',
        };
      }

      // Map DB fields to expected document shape
      const mappedDocument = {
        id: (document as any).id,
        title: (document as any).title,
        content: (document as any).content,
        kind: (document as any).kind,
        created_at: new Date((document as any).created_at).toISOString(),
        user_id: (document as any).user_id,
      };

      const documentHandler = documentHandlersByArtifactKind.find(
        (documentHandlerByArtifactKind) =>
          documentHandlerByArtifactKind.kind === mappedDocument.kind,
      );

      if (!documentHandler) {
        throw new Error(`No document handler found for kind: ${mappedDocument.kind}`);
      }

      await documentHandler.onUpdateDocument({
        document: mappedDocument,
        description,
        dataStream,
        session,
      });

      dataStream.write({ type: 'data-finish', data: null, transient: true });

      return {
        id,
        title: mappedDocument.title,
        kind: mappedDocument.kind,
        content: 'The document has been updated successfully.',
      };
    },
  });
