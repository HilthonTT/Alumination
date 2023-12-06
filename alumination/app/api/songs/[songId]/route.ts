import { NextResponse } from "next/server";
import { z } from "zod";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

interface SongIdProps {
  params: {
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
  categoryId: z.string().min(1, {
    message: "The category is required.",
  }),
});

export async function PATCH(req: Request, { params }: SongIdProps) {
  try {
    const body = await req.json();
    const profile = await currentProfile();

    const { title, description, imageUrl, categoryId } =
      await RequestValidator.parseAsync(body);

    if (!params.songId) {
      return new NextResponse("Song ID is required", { status: 400 });
    }

    if (!profile || !profile?.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
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
