"use client";
import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Product = Tables<'products'> & { prices: Tables<'prices'>[] };
type Price = Tables<'prices'>;
type Subscription = Tables<'subscriptions'>;

type Props = {
  products: Product[];
  user: unknown | null | undefined;
  subscription: Subscription | null;
};

export default function HomePricingSection({ products, user, subscription }: Props) {
  const [priceIdLoading, setPriceIdLoading] = useState<string | undefined>();
  const router = useRouter();
  const currentPath = usePathname();

  // Billing interval toggle state
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);

      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);

      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  return (
    <section className="relative py-16 w-full">
      <div className="px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <span className="text-primary-text border-canvas-line mb-4 block max-w-fit rounded border border-none bg-transparent px-1 font-mono text-sm leading-normal font-normal tracking-widest whitespace-nowrap uppercase md:text-base mx-auto">
              Pricing Plans
            </span>
            <h2 className="text-canvas-text-contrast mb-6 text-4xl leading-tight font-bold tracking-tight md:text-6xl">
              Choose Your
              <span className="from-primary-solid via-primary-text to-primary-text-contrast bg-gradient-to-r bg-clip-text text-transparent">
                <br />
                Perfect Plan
              </span>
            </h2>
            <p className="text-canvas-text mb-8 text-xl leading-relaxed font-normal tracking-normal md:text-2xl max-w-3xl mx-auto">
              Simple, transparent pricing that scales with your business needs.
            </p>
            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-canvas-bg-subtle/80 backdrop-blur-sm border border-canvas-border/50 rounded-2xl p-2 shadow-xl mb-8">
              {intervals.includes('month') && (
                <button
                  onClick={() => setBillingInterval('month')}
                  type="button"
                  className={
                    billingInterval === 'month'
                      ? 'bg-gradient-to-r from-primary-solid to-primary-solid/90 text-primary-on-primary shadow-lg px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform'
                      : 'text-canvas-text hover:text-canvas-text-contrast hover:bg-canvas-bg/50 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform'
                  }
                >
                  Monthly
                </button>
              )}
              {intervals.includes('year') && (
                <button
                  onClick={() => setBillingInterval('year')}
                  type="button"
                  className={
                    billingInterval === 'year'
                      ? 'bg-gradient-to-r from-primary-solid to-primary-solid/90 text-primary-on-primary shadow-lg px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform'
                      : 'text-canvas-text hover:text-canvas-text-contrast hover:bg-canvas-bg/50 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform'
                  }
                >
                  <span>Yearly</span>
                  <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">Save 20%</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            key={billingInterval} // Trigger animation on billing interval change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center items-stretch gap-8 w-full"
          >
            {products?.map((product, index) => {
              const isCurrentPlan = subscription?.price_id && product.prices?.some(p => p.id === subscription.price_id);
              const price = product.prices?.find((price) => price.interval === billingInterval);
              if (!price) return null;
              const priceDisplay = price.unit_amount !== null ? `$${(price.unit_amount / 100).toFixed(0)}` : 'Free';
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`
                    relative group transition-all duration-300
                    flex-1 min-w-[320px] max-w-[400px] flex flex-col p-8 rounded-3xl
                    bg-canvas-bg-subtle border-canvas-border border shadow-sm hover:shadow-md h-[560px]
                  `}
                >
                  {/* Current Plan Badge */}
                  {isCurrentPlan && (
                    <div className="absolute -top-4 right-4 z-20">
                      <div className="bg-success-solid text-success-on-success px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Current Plan
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col h-full">
                    <div className="flex-1 flex flex-col">
                      {/* Header */}
                      <div className="mb-8">
                        <h3 className="text-canvas-text-contrast text-2xl font-bold mb-3">
                          {product.name}
                        </h3>
                        <p className="text-canvas-text leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      {/* Pricing */}
                      <div className="mb-8">
                        <div className="flex items-baseline mb-3">
                          <span className="text-canvas-text-contrast text-5xl font-bold">
                            {priceDisplay}
                          </span>
                          <span className="ml-2 text-canvas-text text-lg font-normal">
                            /{billingInterval}
                          </span>
                        </div>
                        {billingInterval === 'year' && price.unit_amount && (
                          <div className="inline-flex items-center px-3 py-1 bg-success-bg border border-success-border rounded-full mb-4">
                            <span className="text-success-text text-sm font-medium">
                              Save 20% annually
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button
                        color="primary"
                        variant="solid"
                        size="lg"
                        fullWidth
                        isLoading={priceIdLoading === price.id}
                        onClick={() => handleStripeCheckout(price)}
                        disabled={priceIdLoading === price.id}
                        className="!cursor-pointer"
                      >
                        {subscription ? 'Manage Plan' : 'Get Started'}
                      </Button>
                    </div>
                    {/* Features */}
                    <div className="pt-6 border-canvas-border">
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Easy Pay</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Secure Method</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Full access to all features</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>24/7 Customer Support</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>GDPR Compliant</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Priority Email Support</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Enterprise Card */}
            <motion.div
              key="enterprise"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (products?.length || 0) * 0.1 }}
              className={`
                relative group transition-all duration-300
                flex-1 min-w-[320px] max-w-[400px] flex flex-col p-8 rounded-3xl
                bg-canvas-bg-subtle border-canvas-border border shadow-sm hover:shadow-md h-[560px]
              `}
            >
              <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="text-canvas-text-contrast text-2xl font-bold mb-3">ENTERPRISE</h3>
                    <p className="text-canvas-text leading-relaxed">
                      For large-scale applications running Internet scale workloads.
                    </p>
                  </div>
                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline mb-3">
                      <span className="text-canvas-text-contrast text-5xl font-bold">Custom</span>
                    </div>
                  </div>
                  {billingInterval === 'year' && (
                    <div className="h-12" />
                  )}
                </div>
                <div className="mt-auto">
                  <Link href="/contact">
                    <Button
                      color="neutral"
                      variant="outline"
                      size="lg"
                      fullWidth
                      type="button"
                      className="!cursor-pointer"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
                {/* Features */}
                <div className="pt-6 border-canvas-border">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Designated Support manager</li>
                    <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Uptime SLAs</li>
                    <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>BYO Cloud supported</li>
                    <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>24x7x365 premium enterprise support</li>
                    <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Private Slack channel</li>
                    <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Custom Security Questionnaires</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center justify-center space-x-8 p-6 bg-canvas-bg-subtle border border-canvas-border rounded-2xl shadow-sm">
              <div className="flex items-center space-x-2 text-canvas-text">
                <svg className="w-5 h-5 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">30-day free trial</span>
              </div>
              <div className="flex items-center space-x-2 text-canvas-text">
                <svg className="w-5 h-5 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2 text-canvas-text">
                <svg className="w-5 h-5 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">No setup fees</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}