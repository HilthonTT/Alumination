import { NextResponse } from "next/server";

import { db } from "@/lib/prismadb";
import { currentProfile } from "@/lib/current-profile";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile = await currentProfile();

    const { imageUrl, songPath, title, description } = body;

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

    const song = await db.song.create({
      data: {
        profileId: profile.id,
        imageUrl,
        songPath,
        title,
        description,
      },
    });

    return NextResponse.json(song);
  } catch (error) {
    console.log("[SONGS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
