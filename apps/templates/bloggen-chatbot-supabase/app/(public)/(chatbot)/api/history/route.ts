import type { NextRequest } from 'next/server';
import { getChatsByUserId } from '@/db/queries';
import { ChatSDKError } from '@/lib/errors';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const limit = Number.parseInt(searchParams.get('limit') || '10');
  const startingAfter = searchParams.get('starting_after');
  const endingBefore = searchParams.get('ending_before');

  if (startingAfter && endingBefore) {
    return new ChatSDKError(
      'bad_request:api',
      'Only one of starting_after or ending_before can be provided.',
    ).toResponse();
  }

  // Get current user from Supabase Auth
  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (data?.user?.id) userId = data.user.id;
  } catch { userId = null; }

  const chats = await getChatsByUserId({
    id: userId, // Use logged-in user's ID or null for guests
    limit,
    startingAfter,
    endingBefore,
  });

  return Response.json(chats);
}
