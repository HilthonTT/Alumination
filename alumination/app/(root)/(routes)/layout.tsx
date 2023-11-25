import { Navbar } from "@/components/navbar";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
