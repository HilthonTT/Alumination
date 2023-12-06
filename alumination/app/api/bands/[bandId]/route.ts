import { NextResponse } from "next/server";
import { z } from "zod";

import { BandWithMembers } from "@/types";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { rateLimit } from "@/lib/rate-limit";
import { CheckIfMemberBand } from "@/lib/check-member-band";

interface BandIdProps {
  params: {
    bandId: string;
  };
}

const RequestValidator = z.object({
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

export async function PATCH(req: Request, { params }: BandIdProps) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    if (!profile) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    if (!params?.bandId) {
      return new NextResponse("Band ID is required", { status: 400 });
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

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    let band: BandWithMembers | null;

    band = await db.band.findUnique({
      where: {
        id: params.bandId,
      },
      include: {
        members: true,
      },
    });

    if (!band) {
      return new NextResponse("Band not found", { status: 404 });
    }

    const isAllowed = CheckIfMemberBand(band, profile);

    if (!isAllowed) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    band = await db.band.update({
      where: {
        id: params.bandId,
      },
      data: {
        name,
        description,
        iconImageUrl,
        bannerImageUrl,
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(band);
  } catch (error) {
    console.log("[BANDS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: BandIdProps) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    if (!params.bandId) {
      return new NextResponse("Band ID is required", { status: 400 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    const band = await db.band.delete({
      where: {
        id: params.bandId,
        profileId: profile?.id,
      },
    });

    return NextResponse.json(band);
  } catch (error) {
    console.log("[BANDS_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
