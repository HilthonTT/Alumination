import { NextResponse } from "next/server";
import { z } from "zod";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { BandWithMembers } from "@/types";
import { rateLimit } from "@/lib/rate-limit";
import { CheckIfMemberBand } from "@/lib/check-member-band";
import { isImageUrl } from "@/lib/check-image";

interface BandIdProps {
  params: {
    bandId: string;
  };
}

const RequestValidator = z.object({
  title: z.string().min(1, {
    message: "Song title is required.",
  }),
  description: z.string().min(1, {
    message: "Song description is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Song image is required.",
  }),
  songPath: z.string().min(1, {
    message: "Song path is required.",
  }),
});

export async function POST(req: Request, { params }: BandIdProps) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    if (!profile) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    if (!params?.bandId) {
      return new NextResponse("Band ID is required", { status: 400 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    const { title, description, imageUrl, songPath } =
      await RequestValidator.parseAsync(body);

    const isImage = await isImageUrl(imageUrl);
    if (!isImage) {
      return new NextResponse("Invalid Image URL", { status: 400 });
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
        songs: {
          create: [
            {
              title,
              description,
              imageUrl,
              songPath,
            },
          ],
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(band);
  } catch (error) {
    console.log("[BAND_ID_SONGS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
