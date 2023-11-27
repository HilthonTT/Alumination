import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { supabase } from "@/lib/supabase";

interface SongIdProps {
  params: {
    songId: string;
  };
}

export async function PATCH(req: Request, { params }: SongIdProps) {
  try {
    const body = await req.json();
    const profile = await currentProfile();

    const { title, description, imageUrl, categoryId } = body;

    if (!params.songId) {
      return new NextResponse("Song ID is required", { status: 400 });
    }

    if (!profile || !profile?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const song = await db.song.update({
      where: {
        id: params.songId,
        profileId: profile?.id,
      },
      data: {
        title,
        description,
        imageUrl,
        categoryId,
      },
    });

    if (!song) {
      return new NextResponse("Song not found", { status: 404 });
    }

    return NextResponse.json(song);
  } catch (error) {
    console.log("[SONGS_ID_PATH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: SongIdProps) {
  try {
    const profile = await currentProfile();

    if (!params.songId) {
      return new NextResponse("Song ID is required", { status: 400 });
    }

    if (!profile || !profile?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const song = await db.song.delete({
      where: {
        profileId: profile.id,
        id: params.songId,
      },
    });

    if (!song) {
      return new NextResponse("Song not found", { status: 404 });
    }

    await supabase.storage.from("songs").remove([song.songPath]);

    return NextResponse.json(song);
  } catch (error) {
    console.log("SONGS_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}