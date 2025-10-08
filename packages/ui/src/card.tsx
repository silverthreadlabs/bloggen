import * as React from "react"

import { cn } from "./lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  title?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, href, title, children, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "rounded-sm bg-canvas-bg text-canvas-text-contrast shadow p-6",
          href && "transition-colors hover:bg-canvas-bg/80",
          className
        )}
        {...props}
      >
        {title && (
          <h3 className="text-lg font-semibold leading-none tracking-tight mb-2">
            {title}
          </h3>
        )}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    );

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block no-underline"
        >
          {content}
        </a>
      );
    }

    return content;
  }
);
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }