import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    const { title, description, imageUrl, categoryId } = body;

    if (!profile || !profile?.id) {
      return new NextResponse("Not authorized", { status: 401 });
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

    const album = await db.album.create({
      data: {
        title,
        description,
        imageUrl,
        categoryId,
        profileId: profile?.id,
      },
    });

    return NextResponse.json(album);
  } catch (error) {
    console.log("[ALBUMS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
