'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Chat } from '@/components/chatbot/chat';
import { convertToUIMessages } from '@/lib/utils';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import type { DBMessage } from '@/types_db';

export default function ChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      if (typeof id !== 'string') return;
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', id)
        .order('created_at', { ascending: true });
      const mapped = (data || []).map((msg) => ({
        ...msg,
        chatId: msg.chat_id,
        createdAt: new Date(msg.created_at),
        parts: 'parts' in msg ? msg.parts ?? [] : [],
        attachments: msg.attachments ?? [],
      }));
      setMessages(mapped);
      setLoading(false);
    }
    fetchMessages();
  }, [id]);

  if (loading) return <div>Loading chat...</div>;

  // Convert DB messages to UI messages for the Chat component
  const initialMessages = convertToUIMessages(messages);

  return (
    <Chat
      id={typeof id === 'string' ? id : (Array.isArray(id) ? id[0] ?? '' : '')}
      initialMessages={initialMessages}
      initialChatModel={DEFAULT_CHAT_MODEL}
      initialVisibilityType="private"
      isReadonly={false}
      session={undefined}
      autoResume={false}
    />
  );
}