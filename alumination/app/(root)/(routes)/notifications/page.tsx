import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

import { Container } from "@/components/container";
import { db } from "@/lib/prismadb";
import { NotificationDetails } from "@/components/notifications/notification-details";

const Notifications = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const notifications = await db.notification.findMany({
    where: {
      receiverId: profile?.id,
    },
    include: {
      issuer: true,
      receiver: true,
    },
  });

  return (
    <Container>
      <NotificationDetails notifications={notifications} />
    </Container>
  );
};

export default Notifications;
