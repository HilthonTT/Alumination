import { NextResponse } from "next/server";
import { z } from "zod";

import { CheckIfMemberBand } from "@/lib/check-member-band";
import { currentProfile } from "@/lib/current-profile";
import { rateLimit } from "@/lib/rate-limit";
import { supabase } from "@/lib/supabase";
import { db } from "@/lib/prismadb";

interface BandIdSongIdProps {
  params: {
    bandId: string;
    songId: string;
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
});

export async function PATCH(req: Request, { params }: BandIdSongIdProps) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    if (!profile) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    const { title, description, imageUrl } = await RequestValidator.parseAsync(
      body
    );

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    const song = await db.bandSong.update({
      where: {
        id: params.songId,
      },
      data: {
        title,
        description,
        imageUrl,
      },
    });

    if (!song) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(song);
  } catch (error) {
    console.log("BANDS_SONGS_GET_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function DELETE(req: Request, { params }: BandIdSongIdProps) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    const song = await db.bandSong.findUnique({
      where: {
        id: params.songId,
      },
    });

    if (!song) {
      return new NextResponse("Not found", { status: 404 });
    }

    const band = await db.band.findUnique({
      where: {
        id: song?.bandId,
      },
      include: {
        members: true,
      },
    });

    if (!band) {
      return new NextResponse("Not found", { status: 404 });
    }

    const isAllowed = CheckIfMemberBand(band, profile);
    if (!isAllowed) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const deletedSong = await db.bandSong.delete({
      where: {
        id: params.songId,
      },
    });

    await supabase.storage.deleteBucket(deletedSong.songPath);

    return NextResponse.json(song);
  } catch (error) {
    console.log("[BANDS_SONGS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
