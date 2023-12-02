import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile || !profile?.id) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    const identifier = `${req.url}-${profile?.id}`;
    const { success } = await rateLimit(identifier);

    if (!success) {
      return new NextResponse("Rate limit is exceeded", { status: 429 });
    }

    if (!params.userId) {
      return new NextResponse("Profile ID is required", { status: 400 });
    }

    const existingFollow = await db.following.findFirst({
      where: {
        followerId: profile?.id,
        followeeId: params.userId,
      },
    });

    if (!existingFollow) {
      const newFollow = await db.following.create({
        data: {
          followeeId: params.userId,
          followerId: profile?.id,
        },
      });

      return NextResponse.json(newFollow);
    }

    const removedFollow = await db.following.delete({
      where: {
        followeeId_followerId: {
          followeeId: params.userId,
          followerId: profile?.id,
        },
      },
    });

    return NextResponse.json(removedFollow);
  } catch (error) {
    console.log("[NOTIFICATIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
