import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const { paymentMethod, items, shippingDetails } = await req.json();

    if (paymentMethod === 'card') {
      const session = await stripe.checkout.sessions.create({
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${item.name} (${item.size || 'Standard'})`,
              images: [item.image.startsWith('/') ? `https://${req.headers.get('host')}${item.image}` : item.image],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: 1,
        })),
        mode: 'payment',
        customer_email: shippingDetails?.email,
        success_url: `https://${req.headers.get('host')}/?success=true`,
        cancel_url: `https://${req.headers.get('host')}/?canceled=true`,
      });

      return NextResponse.json({ checkoutUrl: session.url });
    } else {
      return NextResponse.json({ 
        checkoutUrl: `https://www.paypal.com` 
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}