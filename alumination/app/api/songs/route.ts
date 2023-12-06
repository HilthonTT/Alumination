import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/prismadb";
import { currentProfile } from "@/lib/current-profile";
import { rateLimit } from "@/lib/rate-limit";
import { NotificationType } from "@prisma/client";

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
  songPath: z.string().min(1, {
    message: "Song path is required.",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile = await currentProfile();

    const { imageUrl, songPath, title, description, categoryId } =
      await RequestValidator.parseAsync(body);

    if (!profile || !profile?.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
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

    if (!categoryId) {
      return new NextResponse("Category ID is missing", { status: 400 });
    }

    const song = await db.song.create({
      data: {
        profileId: profile.id,
        imageUrl,
        songPath,
        title,
        description,
        categoryId,
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
            body: `has created a new song: ${song?.title}`,
            receiverId: follower.followerId,
            issuerId: profile.id,
            itemId: song?.id,
            type: NotificationType.SONG,
          },
        });
        return notification;
      })
    );

    return NextResponse.json({ song, notifications });
  } catch (error) {
    console.log("[SONGS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
