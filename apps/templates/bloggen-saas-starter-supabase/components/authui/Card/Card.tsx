import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto my-8 border rounded-md p border-blue-800">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl text-gray-900 font-medium">{title}</h3>
        <p className="text-gray-700">{description}</p>
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t rounded-b-md border-blue-800 bg-blue-100 text-zinc-500">
          {footer}
        </div>
      )}
    </div>
  );
}
