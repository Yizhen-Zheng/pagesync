import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/lib/subscription-handler";

// assert all environment variables are not null or undefined
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  // Handle POST requests here
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  try {
    event = stripe.webhooks.constructEvent(payload, signature!, endpointSecret);
    switch (event.type) {
      // Handle successful checkout session
      case "checkout.session.completed":
        const sessionId = event.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });
        await handleCheckoutSessionCompleted({ session, stripe });
        break;
      case "customer.subscription.deleted":
        const subscription = event.data.object;
        const subscriptionId = subscription.id;
        await handleSubscriptionDeleted({ subscriptionId, stripe });
        break;
      default:
        console.warn(`Unhandled event type ${event.type}`);
        break;
    }
  } catch (error) {
    console.error(`Error constructing event: ${error}`);
    return NextResponse.json(
      { error: `Webhook Error: Invalid signature` },
      { status: 400 }
    );
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
