import {
  getChatById,
  getMessagesByChatId,
  getStreamIdsByChatId,
} from '@/db/queries';
import type { Tables } from '@/types_db';
type Chat = Tables<'chats'>;
import { ChatSDKError } from '@/lib/errors';
import type { ChatMessage } from '@/lib/types';
import { createUIMessageStream, JsonToSseTransformStream } from 'ai';
import { getStreamContext } from '../../route';
import { differenceInSeconds } from 'date-fns';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // Skip stream processing during build time
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return new Response(null, { status: 204 });
  }

  // Additional check for build environment
  if (process.env.NODE_ENV === 'production' && !process.env.REDIS_URL) {
    return new Response(null, { status: 204 });
  }

  const { id: chatId } = await params;

  if (!chatId) {
    return new ChatSDKError('bad_request:api').toResponse();
  }

  // Skip database operations during build
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return new Response(null, { status: 204 });
  }

  let chat: Chat;

  try {
    const chatData = await getChatById({ id: chatId });
    if (!chatData) {
      throw new Error('Chat not found');
    }
    chat = {
      id: chatData.id,
      title: chatData.title,
      created_at: new Date(chatData.created_at).toISOString(),
      user_id: chatData.user_id,
      visibility: chatData.visibility as 'public' | 'private',
    };
  } catch {
    return new ChatSDKError('not_found:chat').toResponse();
  }

  if (!chat) {
    return new ChatSDKError('not_found:chat').toResponse();
  }

  // Skip database operations during build
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return new Response(null, { status: 204 });
  }

  const streamIds = await getStreamIdsByChatId({ chatId });

  if (!streamIds.length) {
    return new ChatSDKError('not_found:stream').toResponse();
  }

  const recentStreamId = streamIds.at(-1);

  if (!recentStreamId) {
    return new ChatSDKError('not_found:stream').toResponse();
  }

  const emptyDataStream = createUIMessageStream<ChatMessage>({
    execute: () => {},
  });

  // Only try to get stream context if we're not in build mode
  let streamContext = null;
  if (process.env.NODE_ENV !== 'production' || process.env.REDIS_URL) {
    try {
      streamContext = getStreamContext();
    } catch (error) {
      console.log('Failed to get stream context:', error);
    }
  }

  if (!streamContext) {
    // Skip database operations during build
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return new Response(emptyDataStream.pipeThrough(new JsonToSseTransformStream()), { status: 200 });
    }

    const messages = await getMessagesByChatId({ id: chatId });
    const mostRecentMessage = messages.at(-1);

    if (!mostRecentMessage) {
      return new Response(emptyDataStream.pipeThrough(new JsonToSseTransformStream()), { status: 200 });
    }

    if (mostRecentMessage.role !== 'assistant') {
      return new Response(emptyDataStream.pipeThrough(new JsonToSseTransformStream()), { status: 200 });
    }

    const resumeRequestedAt = new Date();
    const messageCreatedAt = new Date(mostRecentMessage.created_at);

    if (differenceInSeconds(resumeRequestedAt, messageCreatedAt) > 15) {
      return new Response(emptyDataStream.pipeThrough(new JsonToSseTransformStream()), { status: 200 });
    }

    const restoredStream = createUIMessageStream<ChatMessage>({
      execute: ({ writer }) => {
        writer.write({
          type: 'data-appendMessage',
          data: JSON.stringify(mostRecentMessage),
          transient: true,
        });
      },
    });

    return new Response(
      restoredStream.pipeThrough(new JsonToSseTransformStream()),
      { status: 200 },
    );
  }

  try {
    const stream = await streamContext.resumableStream(recentStreamId, () =>
      emptyDataStream.pipeThrough(new JsonToSseTransformStream()),
    );

    /*
     * For when the generation is streaming during SSR
     * but the resumable stream has concluded at this point.
     */
    if (!stream) {
      // Skip database operations during build
      if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return new Response(emptyDataStream.pipeThrough(new JsonToSseTransformStream()), { status: 200 });
      }

      const messages = await getMessagesByChatId({ id: chatId });
      const mostRecentMessage = messages.at(-1);

      if (!mostRecentMessage) {
        return new Response(emptyDataStream.pipeThrough(new JsonToSseTransformStream()), { status: 200 });
      }

      if (mostRecentMessage.role !== 'assistant') {
        return new Response(emptyDataStream.pipeThrough(new JsonToSseTransformStream()), { status: 200 });
      }

      const resumeRequestedAt = new Date();
      const messageCreatedAt = new Date(mostRecentMessage.created_at);

      if (differenceInSeconds(resumeRequestedAt, messageCreatedAt) > 15) {
        return new Response(emptyDataStream.pipeThrough(new JsonToSseTransformStream()), { status: 200 });
      }

      const restoredStream = createUIMessageStream<ChatMessage>({
        execute: ({ writer }) => {
          writer.write({
            type: 'data-appendMessage',
            data: JSON.stringify(mostRecentMessage),
            transient: true,
          });
        },
      });

      return new Response(
        restoredStream.pipeThrough(new JsonToSseTransformStream()),
        { status: 200 },
      );
    }

    return new Response(stream, { status: 200 });
  } catch (error) {
    console.error('Stream error:', error);

    return new Response(emptyDataStream.pipeThrough(new JsonToSseTransformStream()), { status: 200 });
  }
}
