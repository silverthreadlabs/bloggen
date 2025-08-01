import { getSuggestionsByDocumentId } from '@/db/queries';
import { ChatSDKError } from '@/lib/errors';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const documentId = searchParams.get('documentId');

  if (!documentId) {
    return new ChatSDKError(
      'bad_request:api',
      'Parameter documentId is required.',
    ).toResponse();
  }

  const suggestions = (await getSuggestionsByDocumentId({
    documentId,
  })) ?? [];

  const suggestion = suggestions[0];

  if (!suggestion) {
    return Response.json([], { status: 200 });
  }

  // Remove: if (suggestion.userId !== session.user.id) {
  return Response.json(suggestions, { status: 200 });
}
