'use server';

import { getSuggestionsByDocumentId } from '@/db/queries';
import type { Tables } from '@/types_db';
type Suggestion = Tables<'suggestions'>;

function isSuggestion(s: any): s is Suggestion {
  return (
    s &&
    typeof s.createdAt === 'string' &&
    typeof s.documentCreatedAt === 'string' &&
    typeof s.originalText === 'string' &&
    typeof s.suggestedText === 'string'
  );
}

export async function getSuggestions({ documentId }: { documentId: string }) {
  const suggestions = await getSuggestionsByDocumentId({ documentId });
  return (suggestions ?? [])
    .reduce((acc: any[], s: any) => {
      if (isSuggestion(s)) {
        acc.push({
          ...s,
          createdAt: new Date(s.created_at),
          documentCreatedAt: new Date(s.document_created_at),
        });
      }
      return acc;
    }, []);
}
