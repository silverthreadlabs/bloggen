'use client';

import { Button } from '@/components/ui/button';
import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import cn from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: unknown | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
  variant?: 'default' | 'home';
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({ user, products, subscription, variant = 'default' }: Props) {
  console.log('Products received by client Pricing component:', products);
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

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

  if (!products.length) {
    return (
      <section className={
        variant === 'home'
          ? 'overflow-hidden px-4 sm:px-6 md:px-8 lg:px-0 py-20 w-full bg-gradient-to-br from-canvas-bg via-canvas-bg-subtle to-canvas-bg relative'
          : 'overflow-hidden px-4 sm:px-6 md:px-8 lg:px-0 min-h-screen w-full bg-gradient-to-br from-canvas-bg via-canvas-bg-subtle to-canvas-bg relative'
      }>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-solid/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen mx-auto max-w-7xl">
          <div className="text-center max-w-4xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-solid to-primary-solid/80 rounded-2xl mb-8 shadow-2xl">
              <svg className="w-10 h-10 text-primary-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-canvas-text-contrast mb-6 tracking-tight">
              No Plans Found
            </h1>
            <p className="text-xl sm:text-2xl text-canvas-text mb-8 leading-relaxed max-w-3xl mx-auto">
              Ready to get started? Create your subscription pricing plans in your{' '}
              <a
                className="text-primary-solid hover:text-primary-solid/80 underline decoration-2 underline-offset-4 transition-colors duration-200 font-semibold"
                href="https://dashboard.stripe.com/products"
                rel="noopener noreferrer"
                target="_blank"
              >
                Stripe Dashboard
              </a>
              {' '}and watch the magic happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="px-6 py-3 bg-canvas-bg-subtle border border-canvas-border rounded-xl text-canvas-text text-sm">
                💡 Tip: Set up your products first
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className={
        variant === 'home'
          ? 'overflow-hidden px-4 sm:px-6 md:px-8 lg:px-0 py-20 w-full bg-gradient-to-br from-canvas-bg via-canvas-bg-subtle to-canvas-bg relative'
          : 'overflow-hidden px-4 sm:px-6 md:px-8 lg:px-0 min-h-screen w-full bg-gradient-to-br from-canvas-bg via-canvas-bg-subtle to-canvas-bg relative'
      }>
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-solid/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary-solid/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_70%)]"></div>
        </div>

        <div className="relative z-10 py-8 sm:py-12 mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center px-6 sm:px-8 lg:px-12 mb-12">
            <h1 className="text-canvas-text-contrast mb-6 text-4xl leading-tight font-bold tracking-tight md:text-6xl">
              Choose Your
              <span className="from-primary-solid via-primary-text to-primary-text-contrast bg-gradient-to-r bg-clip-text text-transparent">
                <br />
                Perfect Plan
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-canvas-text mb-8 text-xl leading-relaxed font-normal tracking-normal md:text-2xl">
              Transform your ideas into reality with our flexible pricing options designed to grow with your business.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-canvas-bg-subtle/80 backdrop-blur-sm border border-canvas-border/50 rounded-2xl p-2 shadow-xl">
              {intervals.includes('month') && (
                <button
                  onClick={() => setBillingInterval('month')}
                  type="button"
                  className={cn(
                    'relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform',
                    billingInterval === 'month'
                      ? 'bg-gradient-to-r from-primary-solid to-primary-solid/90 text-primary-on-primary shadow-lg'
                      : 'text-canvas-text hover:text-canvas-text-contrast hover:bg-canvas-bg/50'
                  )}
                >
                  Monthly
                </button>
              )}
              {intervals.includes('year') && (
                <button
                  onClick={() => setBillingInterval('year')}
                  type="button"
                  className={cn(
                    'relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 transform',
                    billingInterval === 'year'
                      ? 'bg-gradient-to-r from-primary-solid to-primary-solid/90 text-primary-on-primary shadow-lg'
                      : 'text-canvas-text hover:text-canvas-text-contrast hover:bg-canvas-bg/50'
                  )}
                >
                  <span>Yearly</span>
                  <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">Save 20%</span>
                </button>
              )}
            </div>
          </div>

          {/* Pricing Cards - Dynamic Centering */}
          <div className="w-full">
            <div className="flex justify-center w-full">
              <div className="flex flex-wrap justify-center items-start gap-8 w-full">
                {products.map((product, index) => {
                  const price = product?.prices?.find(
                    (price) => price.interval === billingInterval
                  );
                  if (!price) 
                    
                    return null;
                  
                  const priceString = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: price.currency!,
                    minimumFractionDigits: 0
                  }).format((price?.unit_amount || 0) / 100);
                  
                  const isPopular = product.name === 'Freelancer';
                  const isCurrentPlan = subscription?.prices?.products?.name === product.name;

                  return (
                    <div
                      key={product.id}
                      className={cn(
                        'relative group flex-1 min-w-[320px] max-w-[400px] flex flex-col bg-gradient-to-br from-canvas-bg-subtle/90 via-canvas-bg-subtle/70 to-canvas-bg-subtle/50 backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 transform border border-canvas-border/50 hover:border-primary-solid/40 h-full max-h-[687px]'
                      )}
                    >
                      {/* Popular Badge */}
                      {isPopular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-primary-solid via-primary-solid/90 to-primary-solid/80 text-primary-on-primary px-8 py-3 rounded-full text-sm font-bold shadow-lg">
                            ⭐ Most Popular
                          </div>
                        </div>
                      )}

                      {/* Current Plan Badge */}
                      {isCurrentPlan && (
                        <div className="absolute -top-4 right-4">
                          <div className="bg-green-500 text-white px-5 py-2 rounded-full text-xs font-semibold shadow-lg">
                            ✓ Current Plan
                          </div>
                        </div>
                      )}

                      <div className="flex-1 flex flex-col min-h-[300px]">
                        {/* Plan Header */}
                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-canvas-text-contrast">
                              {product.name}
                            </h3>
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-solid/20 to-primary-solid/10 rounded-xl flex items-center justify-center">
                              <svg className="w-6 h-6 text-primary-solid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                          </div>
                          <p className="text-canvas-text leading-relaxed text-base">
                            {product.description}
                          </p>
                        </div>

                        {/* Pricing */}
                        <div className="mb-8">
                          <div className="flex items-baseline mb-3">
                            <span className="text-5xl font-black text-canvas-text-contrast">
                              {priceString}
                            </span>
                            <span className="ml-3 text-lg text-canvas-text font-medium">
                              /{billingInterval}
                            </span>
                          </div>
                          {billingInterval === 'year' && (
                            <div className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              <p className="text-sm text-green-400 font-medium">
                                Save {Math.round(((12 * (price?.unit_amount || 0)) - (price?.unit_amount || 0)) / (12 * (price?.unit_amount || 0)) * 100)}% annually
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-auto">
                        <Button
                          color="primary"
                          variant="solid"
                          size="lg"
                          fullWidth
                          type="button"
                          isLoading={priceIdLoading === price.id}
                          onClick={() => handleStripeCheckout(price)}
                          className="!cursor-pointer"
                        >
                          {subscription ? 'Manage Plan' : 'Get Started'}
                        </Button>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-solid/5 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none"></div>

                      {/* Feature List */}
                      <div className="mt-6 pt-6 border-t border-canvas-border">
                        <ul className="space-y-2">
                          <li className="flex items-center text-sm text-canvas-text">
                            <svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Full access to all features
                          </li>
                          <li className="flex items-center text-sm text-canvas-text">
                            <svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            24/7 Customer Support
                          </li>
                          <li className="flex items-center text-sm text-canvas-text">
                            <svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            99.99% Uptime Guarantee
                          </li>
                          <li className="flex items-center text-sm text-canvas-text">
                            <svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            GDPR Compliant
                          </li>
                          <li className="flex items-center text-sm text-canvas-text">
                            <svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            API Access
                          </li>
                          <li className="flex items-center text-sm text-canvas-text">
                            <svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Secure Data Encryption
                          </li>
                          <li className="flex items-center text-sm text-canvas-text">
                            <svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Easy Integrations
                          </li>
                          <li className="flex items-center text-sm text-canvas-text">
                            <svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Priority Email Support
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
                {/* Enterprise Card */}
                <div className="relative group flex-1 min-w-[320px] max-w-[400px] flex flex-col p-8 rounded-3xl bg-gradient-to-br from-canvas-bg-subtle/90 via-canvas-bg-subtle/70 to-canvas-bg-subtle/50 backdrop-blur-sm border border-canvas-border/50 hover:border-primary-solid/40 h-full max-h-[687px]">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 flex flex-col min-h-[300px]">
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-canvas-text-contrast">ENTERPRISE</h3>
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-solid/20 to-primary-solid/10 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary-solid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        </div>
                        <p className="text-canvas-text leading-relaxed text-base">
                          For large-scale applications running Internet scale workloads.
                        </p>
                      </div>
                      <div className="mb-8">
                        <div className="flex items-baseline mb-3">
                          <span className="text-5xl font-black text-canvas-text-contrast">Custom</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Link href="/contact" passHref legacyBehavior>
                        <Button
                          color="neutral"
                          variant="outline"
                          size="lg"
                          fullWidth
                          type="button"
                          className="!cursor-pointer mb-6"
                        >
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                    <div className="pt-6 border-t border-canvas-border">
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Full access to all features</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Priority Email Support</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Designated Support manager</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Uptime SLAs</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>BYO Cloud supported</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>24x7x365 premium enterprise support</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Private Slack channel</li>
                        <li className="flex items-center text-sm text-canvas-text"><svg className="w-4 h-4 mr-2 text-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Custom Security Questionnaires</li>
                      </ul>
                    </div>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-solid/5 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center px-6 sm:px-8 lg:px-12">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-canvas-bg-subtle/80 via-canvas-bg-subtle/60 to-canvas-bg-subtle/40 backdrop-blur-sm border border-canvas-border/30 rounded-3xl p-8 sm:p-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-solid/20 to-primary-solid/10 rounded-2xl mb-6">
                <svg className="w-8 h-8 text-primary-solid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-canvas-text-contrast mb-4">
                Need something custom?
              </h2>
              <p className="text-lg text-canvas-text mb-8 max-w-2xl mx-auto">
                Get in touch for enterprise solutions, volume discounts, and custom integrations designed for your business.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-3 text-canvas-text">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">24/7 Priority Support</span>
                </div>
                <div className="flex items-center gap-3 text-canvas-text">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">Custom Integrations</span>
                </div>
                <div className="flex items-center gap-3 text-canvas-text">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">Dedicated Account Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}