import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { checkRequest } from "@/lib/check-request";
import { rateLimit } from "@/lib/rate-limit";

interface BandIdRequestProps {
  params: {
    bandId: string;
  };
}

export async function POST(req: Request, { params }: BandIdRequestProps) {
  try {
    const profile = await currentProfile();
    if (!profile || !profile?.id || !profile?.userId) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    let request = await checkRequest(params.bandId, profile?.id);

    if (request) {
      request = await db.bandRequest.delete({
        where: {
          id: request?.id,
        },
      });

      return NextResponse.json(request);
    }

    request = await db.bandRequest.create({
      data: {
        bandId: params.bandId,
        profileId: profile?.id,
      },
    });

    return NextResponse.json(request);
  } catch (error) {
    console.log("[BANDS_ID_REQUESTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
