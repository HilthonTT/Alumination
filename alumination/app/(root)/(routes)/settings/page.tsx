import { redirectToSignIn } from "@clerk/nextjs";

import { checkSubscription } from "@/lib/check-subscription";
import { currentProfile } from "@/lib/current-profile";

import { SettingsDetails } from "@/components/settings/settings-details";
import { Container } from "@/components/container";

const SettingsPage = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const isPro = await checkSubscription();

  return (
    <Container className="h-56 w-full">
      <SettingsDetails isPro={isPro} profile={profile} />
    </Container>
  );
};

export default SettingsPage;
