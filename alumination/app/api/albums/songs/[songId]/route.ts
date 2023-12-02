import { NextResponse } from "next/server";

import { db } from "@/lib/prismadb";

interface SongIdProps {
  params: {
    songId: string;
  };
}

export async function GET(req: Request, { params }: SongIdProps) {
  try {
    const song = await db.albumSong.findUnique({
      where: {
        id: params.songId,
      },
    });

    if (!song) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(song);
  } catch (error) {
    console.log("ALBUMS_SONGS_GET_ID");
  }
}
