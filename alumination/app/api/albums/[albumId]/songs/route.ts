import { NextResponse } from "next/server";
import { z } from "zod";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { AlbumIdProps } from "../route";
import { rateLimit } from "@/lib/rate-limit";

const RequestValidator = z.object({
  title: z.string().min(1, {
    message: "Album title is required.",
  }),
  description: z.string().min(1, {
    message: "Album description is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Album image is required.",
  }),
  songPath: z.string().min(1, {
    message: "Song Path is required.",
  }),
});

export async function POST(req: Request, { params }: AlbumIdProps) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    const { imageUrl, songPath, title, description } =
      await RequestValidator.parseAsync(body);

    if (!profile || !profile?.id) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    if (!profile || !profile?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!songPath) {
      return new NextResponse("Song path is required", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const albumSong = await db.albumSong.create({
      data: {
        profileId: profile.id,
        imageUrl,
        songPath,
        title,
        description,
        albumId: params.albumId,
      },
    });

    return NextResponse.json(albumSong);
  } catch (error) {
    console.log("ALBUMS_ID_SONGS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
