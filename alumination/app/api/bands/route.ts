import { NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuid } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { rateLimit } from "@/lib/rate-limit";
import { checkSubscription } from "@/lib/check-subscription";

export const RequestValidator = z.object({
  name: z.string().min(1, {
    message: "Band name is required.",
  }),
  description: z.string().min(1, {
    message: "Band description is required",
  }),
  iconImageUrl: z.string().min(1, {
    message: "Band icon image is required.",
  }),
  bannerImageUrl: z.string().min(1, {
    message: "Band banner image is required.",
  }),
});

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    if (!profile) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const isPro = await checkSubscription();
    if (!isPro) {
      return new NextResponse("Pro subscription plan is required", {
        status: 403,
      });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    const { name, description, iconImageUrl, bannerImageUrl } =
      await RequestValidator.parseAsync(body);

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }
    if (!iconImageUrl) {
      return new NextResponse("Icon image is required", { status: 400 });
    }
    if (!bannerImageUrl) {
      return new NextResponse("Banner image is required", { status: 400 });
    }

    const band = await db.band.create({
      data: {
        name,
        description,
        iconImageUrl,
        bannerImageUrl,
        inviteCode: uuid(),
        profileId: profile.id,
        members: {
          create: {
            profileId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(band);
  } catch (error) {
    console.log("[BANDS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
