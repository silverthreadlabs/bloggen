import Stripe from 'stripe';

// Create Stripe client dynamically to prevent build-time evaluation
export const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    throw new Error('Missing Stripe secret key');
  }

  return new Stripe(secretKey, {
    // https://github.com/stripe/stripe-node#configuration
    // https://stripe.com/docs/api/versioning
    // @ts-ignore
    apiVersion: null,
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: 'Next.js Subscription Starter',
      version: '0.0.0',
      url: 'https://github.com/vercel/nextjs-subscription-payments'
    }
  });
};

// For backward compatibility
export const stripe = getStripe();
