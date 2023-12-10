import { NextResponse } from "next/server";

import { absoluteUrl } from "@/lib/utils";
import { currentProfile } from "@/lib/current-profile";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prismadb";

const settingsUrl = absoluteUrl("/settings");

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile || !profile?.userId) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const userSubscription = await db?.userSubscription.findUnique({
      where: {
        userId: profile?.userId,
      },
    });

    if (userSubscription && userSubscription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription?.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card", "paypal", "bancontact"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: profile?.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Alumination Pro",
              description: "Allows you to create bands",
            },
            unit_amount: 499,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: profile?.userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
