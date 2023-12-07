import { SidebarToggle } from "@/components/navigation/sidebar-toggle";
import { Navbar } from "@/components/navigation/navbar";

import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/prismadb";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const profile = await initialProfile();

  const [songs, profiles, albums, notifications, following] = await Promise.all(
    [
      db.song.findMany(),
      db.profile.findMany(),
      db.album.findMany(),
      db.notification.findMany({ where: { receiverId: profile?.id } }),
      db.following.findMany({
        where: { followerId: profile?.id },
        include: { followee: true },
      }),
    ]
  );

  const followingArtists = following.map((follow) => follow.followee);
  const createdSongs = songs.filter((s) => s.profileId === profile?.id);

  return (
    <div className="h-full">
      <Navbar
        songs={songs}
        profiles={profiles}
        notifications={notifications}
        albums={albums}
        profile={profile}
      />
      <main className="pt-16 h-full">{children}</main>
      <div className="fixed top-16 left-4">
        <SidebarToggle
          followingArtists={followingArtists}
          createdSongs={createdSongs}
          profile={profile}
        />
      </div>
    </div>
  );
};

export default RootLayout;
