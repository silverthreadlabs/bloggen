'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { ModelSelector } from '@/components/chatbot/model-selector';
import { SidebarToggle } from '@/components/chatbot/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon, VercelIcon } from './icons';
import { useSidebar } from '../botui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../botui/tooltip';
import { type VisibilityType, VisibilitySelector } from './visibility-selector';

export function ChatHeader({
  session,
  isReadonly,
  selectedModelId,
  selectedVisibilityType,
  chatId,
  ...props
}: {
  session?: any;
  isReadonly: boolean;
  selectedModelId: string;
  selectedVisibilityType: any;
  chatId: string;
  [key: string]: any;
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle className="order-1 md:order-1 ml-0" />

      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              iconOnly
              className="order-2 md:order-1 ml-auto md:ml-0"
              onClick={() => {
                router.push('/chat');
                router.refresh();
              }}
              leadingIcon={<PlusIcon size={18} />}
            >
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )}

      {!isReadonly && (
        <ModelSelector
          session={session}
          selectedModelId={selectedModelId}
          className="order-1 md:order-2"
        />
      )}

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
          className="order-1 md:order-3"
        />
      )}
    </header>
  );
}
