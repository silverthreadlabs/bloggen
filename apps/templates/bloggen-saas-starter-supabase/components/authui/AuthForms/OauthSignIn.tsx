'use client';

import { Button } from '@/components/ui/button';
import { signInWithOAuth } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import type { Provider } from '@supabase/supabase-js';

type SocialAuthButtonProps = {
  provider: Provider;
  icon: React.ReactElement;
  label: string;
  redirectMethod: string;
};

function SocialAuthButton({
  provider,
  icon,
  label,
  redirectMethod
}: SocialAuthButtonProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  return (
    <form
      noValidate={true}
      onSubmit={(e) => handleSubmit(e)}
      className="w-full"
    >
      <input type="hidden" name="provider" value={provider} />
      <Button
        variant="outline"
        color="neutral"
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-canvas-border bg-canvas-bg-subtle text-canvas-text hover:bg-canvas-bg-hover hover:border-canvas-border-hover transition-colors duration-200 cursor-pointer"
        isLoading={isSubmitting}
        fullWidth={true}
        leadingIcon={icon}
      >
        {label}
      </Button>
    </form>
  );
}

interface OauthSignInProps {
  redirectMethod?: string;
}

export default function OauthSignIn({ redirectMethod = 'client' }: OauthSignInProps) {
  return (
    <div className="flex flex-col gap-3">
      <SocialAuthButton
        provider="google"
        icon={
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M17.64 9.2045c0-.638-.0573-1.2527-.1636-1.8364H9v3.4818h4.8445c-.2082 1.1236-.8345 2.0763-1.7763 2.719v2.2582h2.8736C16.9782 14.0964 17.64 11.8627 17.64 9.2045z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.4673-.8064 5.9564-2.1882l-2.8736-2.2582c-.7973.5345-1.8136.8491-3.0827.8491-2.3718 0-4.3818-1.6018-5.0982-3.7573H.9391v2.3064C2.4227 16.2936 5.4818 18 9 18z" fill="#34A853"/>
              <path d="M3.9018 10.6455c-.1818-.5345-.2864-1.1045-.2864-1.6955s.1045-1.161.2864-1.6955V4.9482H.9391C.3409 6.1618 0 7.5309 0 9c0 1.4691.3409 2.8382.9391 4.0518l2.9627-2.4063z" fill="#FBBC05"/>
              <path d="M9 3.5791c1.3218 0 2.5045.4545 3.4363 1.3455l2.5773-2.5773C13.4645.8064 11.4273 0 9 0 5.4818 0 2.4227 1.7064.9391 4.9482l2.9627 2.3064C4.6182 5.1809 6.6282 3.5791 9 3.5791z" fill="#EA4335"/>
            </g>
          </svg>
        }
        label="Continue with Google"
        redirectMethod={redirectMethod}
      />
    </div>
  );
}
