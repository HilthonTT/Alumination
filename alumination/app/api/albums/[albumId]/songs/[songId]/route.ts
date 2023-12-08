import { NextResponse } from "next/server";
import { z } from "zod";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { supabase } from "@/lib/supabase";

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

interface AlbumIdSongIdProps {
  params: {
    albumId: string;
    songId: string;
  };
}

export async function PATCH(req: Request, { params }: AlbumIdSongIdProps) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    if (!profile) {
      return new NextResponse("Not authorized", { status: 403 });
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

    const song = await db.albumSong.update({
      where: {
        id: params.songId,
        albumId: params.albumId,
        profileId: profile?.id,
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
    console.log("[ALBUMS_ID_SONGS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: AlbumIdSongIdProps) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const song = await db.albumSong.delete({
      where: {
        id: params.songId,
        albumId: params.albumId,
        profileId: profile.id,
      },
    });

    if (!song) {
      return new NextResponse("Not found", { status: 404 });
    }

    await supabase.storage.deleteBucket(song.songPath);

    return NextResponse.json(song);
  } catch (error) {
    console.log("[ALBUMS_ID_SONGS_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
