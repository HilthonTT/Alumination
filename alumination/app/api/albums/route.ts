import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";
import { rateLimit } from "@/lib/rate-limit";
import { NotificationType } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    const { title, description, imageUrl, categoryId } = body;

    if (!profile || !profile?.id) {
      return new NextResponse("Not authorized", { status: 403 });
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

    const album = await db.album.create({
      data: {
        title,
        description,
        imageUrl,
        categoryId,
        profileId: profile?.id,
      },
    });

    // Create notifications for followers
    const followers = await db.following.findMany({
      where: { followeeId: profile.id },
      select: { followerId: true },
    });

    const notifications = await Promise.all(
      followers.map(async (follower) => {
        const notification = await db.notification.create({
          data: {
            body: `has created a new album: ${album?.title}`,
            receiverId: follower.followerId,
            issuerId: profile.id,
            itemId: album?.id,
            type: NotificationType.ALBUM,
          },
        });
        return notification;
      })
    );

    return NextResponse.json({ album, notifications });
  } catch (error) {
    console.log("[ALBUMS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
