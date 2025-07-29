'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import OauthSignIn from '@/components/authui/AuthForms/OauthSignIn';
import Separator from '@/components/authui/AuthForms/Separator';

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router);
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
          <div className="grid gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-canvas-text">Email</label>
              <input
                id="email"
                placeholder="name@example.com"
                type="email"
                name="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="w-full p-3 rounded-md bg-canvas-bg-subtle text-canvas-text-contrast border border-canvas-border focus:outline-none focus:ring-2 focus:ring-primary-solid focus:border-transparent transition-colors duration-200"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-canvas-text">Password</label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                className="w-full p-3 rounded-md bg-canvas-bg-subtle text-canvas-text-contrast border border-canvas-border focus:outline-none focus:ring-2 focus:ring-primary-solid focus:border-transparent transition-colors duration-200"
              />
            </div>
          </div>
          <Button
            variant="solid"
            color="primary"
            type="submit"
            className="mt-1 cursor-pointer"
            isLoading={isSubmitting}
            fullWidth={true}
          >
            Sign up
          </Button>
        </div>
      </form>
      <div className="my-8">
        <Separator text="or continue with" />
        <OauthSignIn />
      </div>
      <p className="text-canvas-text">Already have an account?</p>
      <p className="text-canvas-text">
        <Link href="/signin/password_signin" className="font-light text-sm text-primary-text hover:text-primary-text-contrast transition-colors duration-200">
          Sign in with email and password
        </Link>
      </p>
      {allowEmail && (
        <p className="text-canvas-text">
          <Link href="/signin/email_signin" className="font-light text-sm text-primary-text hover:text-primary-text-contrast transition-colors duration-200">
            Sign in with magic link
          </Link>
        </p>
      )}
    </div>
  );
}
