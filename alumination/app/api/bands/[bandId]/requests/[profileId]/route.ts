import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/prismadb";

interface BandIdRequestsProps {
  params: {
    bandId: string;
    profileId: string;
  };
}

export async function POST(req: Request, { params }: BandIdRequestsProps) {
  try {
    const profile = await currentProfile();
    if (!profile || !profile?.id || !profile?.userId) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    if (!params?.bandId) {
      return new NextResponse("Band ID is required", { status: 400 });
    }

    if (!params.profileId) {
      return new NextResponse("Profile ID is required", { status: 400 });
    }

    let band = await db.band.findUnique({
      where: {
        id: params?.bandId,
        profileId: profile?.id,
      },
    });

    if (!band) {
      return new NextResponse("Not found", { status: 404 });
    }

    const isOwner = band?.profileId === profile?.id;
    if (!isOwner) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    band = await db.band.update({
      where: {
        id: params?.bandId,
      },
      data: {
        members: {
          create: {
            profileId: params?.profileId,
          },
        },
      },
    });

    const request = await db.bandRequest.deleteMany({
      where: {
        profileId: params?.profileId,
        bandId: params?.bandId,
      },
    });

    return NextResponse.json({ band, request });
  } catch (error) {
    console.log("[BANDS_REQUESTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: BandIdRequestsProps) {
  try {
    const profile = await currentProfile();
    if (!profile || !profile?.id || !profile?.userId) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    if (!params?.bandId) {
      return new NextResponse("Band ID is required", { status: 400 });
    }

    if (!params.profileId) {
      return new NextResponse("Profile ID is required", { status: 400 });
    }

    let band = await db.band.findUnique({
      where: {
        id: params?.bandId,
        profileId: profile?.id,
      },
    });

    if (!band) {
      return new NextResponse("Not found", { status: 404 });
    }

    const isOwner = band?.profileId === profile?.id;
    if (!isOwner) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    band = await db.band.update({
      where: {
        id: params?.bandId,
      },
      data: {
        members: {
          deleteMany: {
            profileId: params?.profileId,
          },
        },
      },
    });

    const request = await db.bandRequest.deleteMany({
      where: {
        profileId: params?.profileId,
        bandId: params?.bandId,
      },
    });

    return NextResponse.json({ band, request });
  } catch (error) {
    console.log("[BANDS_REQUESTS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
