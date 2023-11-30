import { Navbar } from "@/components/navbar";
import { NavigationArrows } from "@/components/navigation-arrow";

import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/prismadb";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const profile = await initialProfile();

  const songs = await db.song.findMany();
  const profiles = await db.profile.findMany();
  const notifications = await db.notification.findMany({
    where: {
      receiverId: profile?.id,
    },
  });

  return (
    <div className="h-full">
      <Navbar songs={songs} profiles={profiles} notifications={notifications} />
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
