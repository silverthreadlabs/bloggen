'use client';

import { Button } from '@/components/ui/button';
import { updatePassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod
}: UpdatePasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, updatePassword, router);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="password" className="text-canvas-text">New Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full p-3 rounded-md bg-canvas-bg-subtle text-canvas-text-contrast border border-canvas-border focus:outline-none focus:ring-2 focus:ring-primary-solid focus:border-transparent transition-colors duration-200"
            />
            <label htmlFor="passwordConfirm" className="text-canvas-text">Confirm New Password</label>
            <input
              id="passwordConfirm"
              placeholder="Password"
              type="password"
              name="passwordConfirm"
              autoComplete="current-password"
              className="w-full p-3 rounded-md bg-canvas-bg-subtle text-canvas-text-contrast border border-canvas-border focus:outline-none focus:ring-2 focus:ring-primary-solid focus:border-transparent transition-colors duration-200"
            />
          </div>
          <Button
            variant="solid"
            color="primary"
            type="submit"
            className="mt-1 cursor-pointer"
            isLoading={isSubmitting}
            fullWidth={true}
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
