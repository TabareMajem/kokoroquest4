import { Request, Response } from 'express';
import { stripe } from '../../services/stripe/config';
import { logger } from '../config/logger';

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const { priceId, successUrl, cancelUrl } = req.body;
    const userId = req.user._id;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: req.user.email,
      metadata: {
        userId: userId.toString()
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    logger.error('Checkout session creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create checkout session'
    });
  }
}

export async function handleWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({
      success: false,
      error: 'Missing stripe signature or webhook secret'
    });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );

    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    logger.error('Webhook error:', error);
    res.status(400).json({
      success: false,
      error: 'Webhook error'
    });
  }
}

async function handleSubscriptionCreated(subscription: any) {
  // Update user's subscription status in database
  logger.info('Subscription created:', subscription.id);
}

async function handleSubscriptionUpdated(subscription: any) {
  // Update subscription details in database
  logger.info('Subscription updated:', subscription.id);
}

async function handleSubscriptionDeleted(subscription: any) {
  // Update user's subscription status in database
  logger.info('Subscription deleted:', subscription.id);
}

async function handlePaymentSucceeded(invoice: any) {
  // Update payment status in database
  logger.info('Payment succeeded:', invoice.id);
}

async function handlePaymentFailed(invoice: any) {
  // Handle failed payment (e.g., notify user)
  logger.info('Payment failed:', invoice.id);
}