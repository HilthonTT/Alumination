import { MobileToggle } from "@/components/navigation/mobile-sidebar";
import { Navbar } from "@/components/navigation/navbar";

import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/prismadb";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const profile = await initialProfile();

  const songs = await db.song.findMany();
  const profiles = await db.profile.findMany();
  const albums = await db.album.findMany();

  const notifications = await db.notification.findMany({
    where: {
      receiverId: profile?.id,
    },
  });

  const following = await db.following.findMany({
    where: {
      followerId: profile?.id,
    },
    include: {
      followee: true,
    },
  });

  const followingArtists = following.map((follow) => follow.followee);
  const createdSongs = songs.filter((s) => s.profileId === profile?.id);

  return (
    <div className="h-full">
      <Navbar
        songs={songs}
        profiles={profiles}
        notifications={notifications}
        albums={albums}
      />
      <main className="pt-16 h-full">{children}</main>
      <div className="absolute top-16 left-4">
        <MobileToggle
          followingArtists={followingArtists}
          createdSongs={createdSongs}
        />
      </div>
    </div>
  );
};

export default RootLayout;
