import 'server-only';

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  gte,
  inArray,
  lt,
  type SQL,
} from 'drizzle-orm';

import type { Tables } from '@/types_db';
type Suggestion = Tables<'suggestions'>;
import type { ArtifactKind } from '@/components/chatbot/artifact';
import type { VisibilityType } from '@/components/chatbot/visibility-selector';
import { ChatSDKError } from '@/lib/errors';
import { supabase } from '@/utils/supabase/client';

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// REMOVE all Drizzle/pg imports and client setup
// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// const client = postgres(process.env.POSTGRES_URL!);
// const db = drizzle(client);

// Only allow reading users with getUser. Do not insert/update users table directly.
export async function getUser(email: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email);
    if (error) throw error;

    return data ?? [];
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get user by email',
    );
  }
}

// User creation is handled by Supabase Auth. Do not use these functions.
// export async function createUser(email: string, password: string) { ... }
// export async function createGuestUser() { ... }

// Save a chat for a user (signed-in) or as guest (userId null)
export async function saveChat({
  id,
  userId,
  title,
  visibility,
}: {
  id: string;
  userId: string | null; // null for guests
  title: string;
  visibility: string;
}) {
  console.log('Saving chat:', { id, user_id: userId, title, visibility });
  const chatInsert: any = {
    id,
    title,
    visibility,
    created_at: new Date().toISOString(),
  };
  if (userId) chatInsert.user_id = userId;
  const { error } = await (supabase as any).from('chats').insert([chatInsert]);
  if (error) {
    console.error('Supabase error (saveChat):', error);
    throw new Error('Failed to save chat: ' + error.message);
  }
}

export async function deleteChatById({ id }: { id: string }) {
  // Delete messages first due to foreign key constraint
  const { error: msgError } = await (supabase as any).from('messages').delete().eq('chat_id', id);
  if (msgError) throw new Error('Failed to delete messages: ' + msgError.message);
  // Delete the chat
  const { data, error } = await (supabase as any).from('chats').delete().eq('id', id).select();
  if (error) throw new Error('Failed to delete chat: ' + error.message);

  return data?.[0] || null;
}

// Fetch chats for a user (signed-in) or none for guests
export async function getChatsByUserId({
  id, // userId or null
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string | null; // null for guests
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    if (!id || id === 'public-user') {
      return { chats: [], hasMore: false };
    }
    const query = (supabase as any)
      .from('chats')
      .select('*')
      .eq('user_id', id)
      .order('created_at', { ascending: false })
      .limit(limit);
    const { data, error } = await query;
    // Debug logging
    console.log('getChatsByUserId: searching for user_id:', id);
    console.log('getChatsByUserId: query result:', { data, error });
    const hasMore = data.length > limit;
    // Map snake_case to camelCase ONLY for chat history
    const mappedChats = (hasMore ? data.slice(0, limit) : data).map((chat: any) => ({
      id: chat.id,
      createdAt: chat.created_at,
      title: chat.title,
      userId: chat.user_id,
      visibility: chat.visibility,
    }));

    return {
      chats: mappedChats,
      hasMore,
    };
  } catch (error) {
    console.error('getChatsByUserId error:', error);
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get chats by user id',
    );
  }
}

export async function getChatById({ id }: { id: string }) {
  const { data, error } = await (supabase as any).from('chats').select('*').eq('id', id).maybeSingle();
  if (error && error.code !== 'PGRST116') { // PGRST116: No rows found
    throw new Error('Failed to get chat: ' + error.message);
  }

  return data || null;
}

type MessageInsert = {
  id: string;
  chat_id: string;
  user_id: string | null;
  parts: any[];
  attachments: any[];
  role: string;
  created_at: string;
};

type VoteInsert = {
  chat_id: string;
  message_id: string;
  is_upvoted: boolean;
};

// Save messages for a user (signed-in) or as guest (userId null)
export async function saveMessages({
  messages,
}: {
  messages: MessageInsert[];
}) {
  const formatted: MessageInsert[] = messages.map((m) => {
    if (!m.id || !m.chat_id || !m.parts || !m.role || !m.created_at) {
      throw new Error('Missing required message fields: id, chat_id, parts, role, or created_at');
    }

    return {
      id: m.id,
      chat_id: m.chat_id,
      user_id: m.user_id ?? null,
      parts: m.parts,
      attachments: m.attachments ?? [],
      role: m.role,
      created_at: m.created_at,
    };
  });
  console.log('Saving messages:', formatted);
  const { error } = await (supabase as any).from('messages').insert(formatted);
  if (error) {
    console.error('Supabase error (saveMessages):', error);
    throw new Error('Failed to save messages: ' + error.message);
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  const { data, error } = await (supabase as any)
    .from('messages')
    .select('*')
    .eq('chat_id', id)
    .order('created_at', { ascending: true });
  if (error) throw new Error('Failed to get messages: ' + error.message);

  return data;
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: 'up' | 'down';
}) {
  try {
    const { data: existingVotes } = await (supabase as any)
      .from('votes')
      .select('*')
      .eq('message_id', messageId)
      .eq('chat_id', chatId);
    if (existingVotes && existingVotes.length > 0) {

      return await (supabase as any)
        .from('votes')
        .update({ is_upvoted: type === 'up' })
        .eq('message_id', messageId)
        .eq('chat_id', chatId);
    }

    return await (supabase as any).from('votes').insert({
      chat_id: chatId,
      message_id: messageId,
      is_upvoted: type === 'up',
    });
  } catch (error) {
    throw new ChatSDKError('bad_request:database', 'Failed to vote message');
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await (supabase as any).from('votes').select('*').eq('chat_id', id);
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get votes by chat id',
    );
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  userId: string | null;
}) {
  try {
    return await (supabase as any)
      .from('documents')
      .insert([{
        id,
        title,
        kind,
        content,
        user_id: userId,
        created_at: new Date(),
      }])
      .select();
  } catch (error) {
    throw new ChatSDKError('bad_request:database', 'Failed to save document');
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const documents = await (supabase as any)
      .from('documents')
      .select('*')
      .eq('id', id)
      .order('created_at', { ascending: true });

    return documents.data;
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get documents by id',
    );
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const { data } = await (supabase as any)
      .from('documents')
      .select('*')
      .eq('id', id)
      .order('created_at', { ascending: false });

    return data?.[0] || null;
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get document by id',
    );
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    await (supabase as any)
      .from('suggestions')
      .delete()
      .eq('document_id', id)
      .gt('document_created_at', timestamp);

    return await (supabase as any)
      .from('documents')
      .delete()
      .eq('id', id)
      .gt('created_at', timestamp)
      .select();
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to delete documents by id after timestamp',
    );
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Array<Suggestion>;
}) {
  try {
    return await (supabase as any).from('suggestions').insert(suggestions);
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to save suggestions',
    );
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    const { data } = await (supabase as any)
      .from('suggestions')
      .select('*')
      .eq('document_id', documentId);

    return data;

  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get suggestions by document id',
    );
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    const { data } = await (supabase as any).from('messages').select('*').eq('id', id);
    
    return data;
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get message by id',
    );
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await (supabase as any)
      .from('messages')
      .select('id')
      .eq('chat_id', chatId)
      .gt('created_at', timestamp);

    const messageIds = messagesToDelete.data?.map((message: any) => message.id) || [];

    if (messageIds.length > 0) {
      await (supabase as any)
        .from('votes')
        .delete()
        .eq('chat_id', chatId)
        .in('message_id', messageIds);

      return await (supabase as any)
        .from('messages')
        .delete()
        .eq('chat_id', chatId)
        .in('id', messageIds);
    }
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to delete messages by chat id after timestamp',
    );
  }
}

export async function updateChatVisiblityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: 'private' | 'public';
}) {
  try {
    return await (supabase as any).from('chats').update({ visibility }).eq('id', chatId);
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to update chat visibility by id',
    );
  }
}

export async function getMessageCountByUserId({
  id,
  differenceInHours,
}: { id: string; differenceInHours: number }) {
  try {
    const twentyFourHoursAgo = new Date(
      Date.now() - differenceInHours * 60 * 60 * 1000,
    );

    const [stats] = await (supabase as any)
      .from('messages')
      .select({ count: (supabase as any).from('messages').select('*', { count: 'exact' }) })
      .eq('user_id', id)
      .gt('created_at', twentyFourHoursAgo)
      .eq('role', 'user')
      .then(({ count }: any) => [{ count }]);

    return stats?.count ?? 0;
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get message count by user id',
    );
  }
}

// Update createStreamId to use Supabase only
export async function createStreamId({
  streamId,
  chatId,
}: {
  streamId: string;
  chatId: string;
}) {
  const { error } = await (supabase as any)
    .from('streams')
    .insert([{ id: streamId, chat_id: chatId, created_at: new Date() }]);
  if (error) {
    console.error('Supabase error (createStreamId):', error);
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to create stream id',
    );
  }
}

export async function getStreamIdsByChatId({ chatId }: { chatId: string }) {
  try {
    const streamIds = await (supabase as any)
      .from('streams')
      .select('id')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    return streamIds.data?.map(({ id }: any) => id) || [];
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get stream ids by chat id',
    );
  }
}