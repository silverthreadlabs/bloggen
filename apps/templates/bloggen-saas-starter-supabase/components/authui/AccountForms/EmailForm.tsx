'use client';

import { Button } from '@/components/ui/button';
import { updateEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EmailForm({
  userEmail
}: {
  userEmail: string | undefined;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new email is the same as the old email
    if (e.currentTarget.email.value === userEmail) {
      e.preventDefault();
      setIsSubmitting(false);
      setIsEditing(false);

      
      return;
    }
    await handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
    setIsEditing(false);
  };

  return (
    <div className="relative group bg-gradient-to-br from-canvas-bg-subtle/80 to-canvas-bg-subtle/40 backdrop-blur-sm rounded-3xl p-6 transition-all duration-300 border border-canvas-border/50 hover:border-primary-solid/30">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-solid to-primary-solid/80 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-primary-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a1 1 0 001.42 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-canvas-text-contrast">Your Email</h3>
            <p className="text-sm text-canvas-text">
              This is the email address associated with your account.
            </p>
          </div>
          {!isEditing && (
            <Button
              iconOnly
              variant="ghost"
              color="neutral"
              aria-label="Edit email"
              name="Edit email"
              leadingIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              }
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <form id="emailForm" onSubmit={(e) => handleSubmit(e)} className="mb-6">
          <div className="relative">
            <input
              type="email"
              name="email"
              className="w-full p-4 rounded-2xl bg-canvas-bg-subtle/50 border-2 border-canvas-border/50 text-canvas-text-contrast placeholder-canvas-text/60 focus:border-primary-solid/70 focus:outline-none focus:ring-2 focus:ring-primary-solid/20 transition-all duration-200 backdrop-blur-sm"
              defaultValue={userEmail}
              placeholder="Enter your email address"
              required
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-canvas-text/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a1 1 0 001.42 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-6">
          <div className=" p-1 md:p-4 rounded-2xl bg-canvas-bg-subtle/30 border border-canvas-border/30 text-canvas-text-contrast font-medium flex items-center gap-3">
            <svg className="w-5 h-5 text-canvas-text/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a1 1 0 001.42 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="flex-1">{userEmail ?? 'No email set'}</span>
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              Verified
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {isEditing && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-canvas-border/30">
          <div className="flex items-center gap-2 text-canvas-text text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            A verification email will be sent
          </div>
          <div className="flex gap-3">
            <Button
              variant="surface"
              onClick={() => setIsEditing(false)}
              className="!bg-canvas-bg-subtle !border-2 !border-canvas-border cursor-pointer !text-canvas-text-contrast hover:!bg-canvas-bg hover:!border-canvas-border/70 px-4 py-2 rounded-xl font-medium transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              variant="surface"
              type="submit"
              form="emailForm"
              isLoading={isSubmitting}
              className="!bg-gradient-to-r !from-primary-solid cursor-pointer !to-primary-solid/90 !text-primary-on-primary  !border-0 px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform"
            >
              {isSubmitting ? 'Updating...' : 'Update Email'}
            </Button>
          </div>
        </div>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-solid/5 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}