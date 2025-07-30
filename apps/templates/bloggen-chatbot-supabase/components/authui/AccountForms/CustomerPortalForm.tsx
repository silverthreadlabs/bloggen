'use client';

import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { createStripePortal } from '@/utils/stripe/server';
import Link from 'next/link';
import { Tables } from '@/types_db';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency ?? 'USD',
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);

    return router.push(redirectUrl);
  };

  return (
    <div className="relative group bg-gradient-to-br from-canvas-bg-subtle/80 to-canvas-bg-subtle/40 backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 border border-canvas-border/50 hover:border-primary-solid/30">
      {/* Status Indicator */}
      <div className="absolute -top-3 left-8">
        <div className={`px-4 py-2 rounded-full text-xs font-semibold shadow-lg ${
          subscription 
            ? 'bg-gradient-to-r from-green-500 to-green-400 text-white' 
            : 'bg-gradient-to-r from-yellow-500 to-orange-400 text-white'
        }`}>
          {subscription ? '✓ Active Subscription' : '⚠ No Active Plan'}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 pt-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-solid to-primary-solid/80 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-primary-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-canvas-text-contrast">Your Plan</h3>
            <p className="text-canvas-text">
              {subscription
                ? `Currently subscribed to ${subscription?.prices?.products?.name}`
                : 'You are not currently subscribed to any plan.'}
            </p>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="mb-8">
        {subscription ? (
          <div className="bg-gradient-to-r from-primary-solid/10 to-primary-solid/5 rounded-2xl p-6 border border-primary-solid/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-canvas-text-contrast mb-2">
                  {subscriptionPrice}
                  <span className="text-lg font-medium text-canvas-text ml-2">
                    /{subscription?.prices?.interval}
                  </span>
                </div>
                <div className="text-sm text-canvas-text">
                  Plan: <span className="font-semibold text-canvas-text-contrast">{subscription?.prices?.products?.name}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Active
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-400/10 rounded-2xl p-6 border border-yellow-500/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-canvas-text-contrast mb-2">Ready to get started?</h4>
              <p className="text-canvas-text mb-4">Choose a plan that fits your needs and unlock all features.</p>
              <Link 
                href="/pricing" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-solid to-primary-solid/90 text-primary-on-primary rounded-xl font-semibold  transition-all duration-200 transform  "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Choose Your Plan
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {subscription && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-canvas-border/30">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-canvas-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-canvas-text">
              Manage your subscription, billing, and payment methods on Stripe.
            </p>
          </div>
          <Button
            variant="surface"
            onClick={handleStripePortalRequest}
            isLoading={isSubmitting}
            className="!bg-canvas-bg-subtle cursor-pointer !border-2 !border-canvas-border !text-canvas-text-contrast hover:!bg-canvas-bg hover:!border-primary-solid/50 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            {isSubmitting ? 'Opening...' : 'Open Customer Portal'}
          </Button>
        </div>
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-solid/5 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}