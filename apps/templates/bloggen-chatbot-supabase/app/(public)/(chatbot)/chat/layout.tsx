import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/chatbot/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/botui/sidebar';
import Script from 'next/script';
import { DataStreamProvider } from '@/components/chatbot/data-stream-provider';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <div className="chat-page-wrapper">
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <DataStreamProvider>
        <SidebarProvider defaultOpen={!isCollapsed}>
          <div className="flex flex-row flex-nowrap w-screen min-h-screen h-screen items-stretch relative z-[1]">
            <AppSidebar user={undefined} />
            <SidebarInset>{children}</SidebarInset>
          </div>
        </SidebarProvider>
      </DataStreamProvider>
    </div>
  );
}
