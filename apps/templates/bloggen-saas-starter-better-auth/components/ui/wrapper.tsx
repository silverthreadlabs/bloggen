import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Wrapper(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'rounded-sm bg-radial-[at_bottom] from-blue-500/20 p-4 border border-fd-primary/10 prose-no-margin dark:bg-black/20',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
