import { loadStripe } from '@stripe/stripe-js';
import { validateEnv } from '../../config/env';

const env = validateEnv();

if (!env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Stripe public key is not configured');
}

export const stripePromise = loadStripe(env.VITE_STRIPE_PUBLIC_KEY);

export const SUBSCRIPTION_PRICES = {
  SCHOOL: {
    BASIC: 'price_basic_school',
    PREMIUM: 'price_premium_school'
  },
  FAMILY: {
    BASIC: 'price_basic_family',
    PREMIUM: 'price_premium_family'
  }
};