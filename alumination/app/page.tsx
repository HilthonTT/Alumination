import { ModeToggle } from "@/components/mode-toggle";
import { redirectToSignIn, auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  return (
    <div>
      Home [Protected]
      <div>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default HomePage;
