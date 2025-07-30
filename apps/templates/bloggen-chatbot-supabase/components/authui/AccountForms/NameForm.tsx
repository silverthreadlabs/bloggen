'use client';

import { Button } from '@/components/ui/button';
import { updateName } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NameForm({ userName }: { userName: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new name is the same as the old name
    if (e.currentTarget.fullName.value === userName) {
      e.preventDefault();
      setIsSubmitting(false);

      
      return;
    }
    handleRequest(e, updateName, router);
    setIsSubmitting(false);
  };

  return (
    <div className="relative group bg-gradient-to-br from-canvas-bg-subtle/80 to-canvas-bg-subtle/40 backdrop-blur-sm rounded-3xl p-6 transition-all duration-300 border border-canvas-border/50 hover:border-primary-solid/30">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-solid to-primary-solid/80 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-primary-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-canvas-text-contrast">Your Name</h3>
            <p className="text-sm text-canvas-text">
              Enter your full name or a display name you're comfortable with.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form id="nameForm" onSubmit={(e) => handleSubmit(e)} className="mb-6">
        <div className="relative">
          <input
            type="text"
            name="fullName"
            className="w-full p-4 rounded-2xl bg-canvas-bg-subtle/50 border-2 border-canvas-border/50 text-canvas-text-contrast placeholder-canvas-text/60 focus:border-primary-solid/70 focus:outline-none focus:ring-2 focus:ring-primary-solid/20 transition-all duration-200 backdrop-blur-sm"
            defaultValue={userName}
            placeholder="Enter your full name"
            maxLength={64}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-canvas-text/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-canvas-border/30">
        <div className="flex items-center gap-2 text-canvas-text text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          64 characters maximum
        </div>
        <Button
          variant="surface"
          type="submit"
          form="nameForm"
          isLoading={isSubmitting}
          className="!bg-gradient-to-r !from-primary-solid !to-primary-solid/90 !text-primary-on-primary !border-0 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform  "
        >
          {isSubmitting ? 'Updating...' : 'Update Name'}
        </Button>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-solid/5 to-transparent opacity-0  transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}