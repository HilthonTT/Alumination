import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { AlbumIdProps } from "../route";

export async function POST(req: Request, { params }: AlbumIdProps) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    const { imageUrl, songPath, title, description } = body;

    if (!profile || !profile?.id) {
      return new NextResponse("Not authorized", { status: 401 });
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
