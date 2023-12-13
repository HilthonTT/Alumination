import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { rateLimit } from "@/lib/rate-limit";

interface BandIdMembersProps {
  params: {
    bandId: string;
    memberId: string;
  };
}

export async function DELETE(req: Request, { params }: BandIdMembersProps) {
  try {
    const profile = await currentProfile();
    if (!profile || !profile?.userId) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    if (!params?.bandId) {
      return new NextResponse("Band ID is required", { status: 400 });
    }

    if (!params?.memberId) {
      return new NextResponse("Member ID is required", { status: 400 });
    }

    const band = await db.band.update({
      where: {
        id: params?.bandId,
        profileId: profile?.id,
      },
      data: {
        members: {
          delete: {
            id: params?.memberId,
          },
        },
      },
    });

    if (!band) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(band);
  } catch (error) {
    console.log("[BANDS_ID_MEMBERS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
