import { Navbar } from "@/components/navbar";
import { initialProfile } from "@/lib/initial-profile";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const profile = await initialProfile();

  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
