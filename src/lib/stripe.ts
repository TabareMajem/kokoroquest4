import { loadStripe } from '@stripe/stripe-js';
import { validateEnv } from '../config/env';

const env = validateEnv();

export const stripePromise = loadStripe(env.VITE_STRIPE_PUBLIC_KEY);