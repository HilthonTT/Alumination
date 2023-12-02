import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";

export interface AlbumIdProps {
  params: {
    albumId: string;
  };
}

export async function PATCH(req: Request, { params }: AlbumIdProps) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    const { title, description, categoryId, imageUrl } = body;

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

    const album = await db.album.update({
      where: {
        profileId: profile.id,
        id: params.albumId,
      },
      data: {
        title,
        description,
        categoryId,
        imageUrl,
      },
    });

    if (!album) {
      return new NextResponse("Album Not found", { status: 404 });
    }

    return NextResponse.json(album);
  } catch (error) {
    console.log("[ALBUMS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: AlbumIdProps) {
  try {
    const profile = await currentProfile();

    if (!profile || !profile?.id) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    const album = await db.album.delete({
      where: {
        id: params.albumId,
        profileId: profile?.id,
      },
    });

    if (!album) {
      return new NextResponse("Album not found", { status: 404 });
    }

    return NextResponse.json(album);
  } catch (error) {
    console.log("[ALBUMS_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
