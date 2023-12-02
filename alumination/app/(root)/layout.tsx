import { Navbar } from "@/components/navbar";

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

  return (
    <div className="h-full">
      <Navbar
        songs={songs}
        profiles={profiles}
        notifications={notifications}
        albums={albums}
      />
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
