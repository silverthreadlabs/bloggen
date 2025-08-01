'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/botui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/botui/sidebar';
import { useRouter } from 'next/navigation';
import { toast } from './toast';
import { LoaderIcon } from './icons';
import { guestRegex } from '@/lib/constants';
import { supabase } from '@/utils/supabase/client';

export function SidebarUserNav() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data }) => {
        setUserEmail(data?.user?.email ?? null);
        
        return null; // Ensure then() returns a value
      })
      .catch(() => {
        setUserEmail(null);
      });
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="bg-background h-10 cursor-default" disabled>
          <span className="truncate">{userEmail || 'Guest'}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
