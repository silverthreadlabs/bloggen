import type { ComponentProps } from 'react';

import { type SidebarTrigger, useSidebar } from '@/components/botui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/botui/tooltip';

import { SidebarLeftIcon } from './icons';
import { Button } from '@/components/ui/button';

export function SidebarToggle({
  className,
}: ComponentProps<typeof SidebarTrigger>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-testid="sidebar-toggle-button"
          onClick={toggleSidebar}
          variant="outline"
          size="sm"
          iconOnly
          leadingIcon={<SidebarLeftIcon size={18} />}
        >
        </Button>
      </TooltipTrigger>
      <TooltipContent align="start">Toggle Sidebar</TooltipContent>
    </Tooltip>
  );
}
