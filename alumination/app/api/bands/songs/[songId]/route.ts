import { NextResponse } from "next/server";
import { z } from "zod";

import { currentProfile } from "@/lib/current-profile";
import { rateLimit } from "@/lib/rate-limit";
import { db } from "@/lib/prismadb";

interface SongIdProps {
  params: {
    songId: string;
  };
}

export async function GET(req: Request, { params }: SongIdProps) {
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

    return NextResponse.json(song);
  } catch (error) {
    console.log("BANDS_SONGS_GET_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
