"use client";

import { Bell } from "lucide-react";

import { NotificationWithProfile } from "@/types";
import { NoResults } from "@/components/no-results";
import { NotificationCard } from "@/components/notifications/notification-card";
import { PageHeader } from "@/components/page-header";

interface NotificationDetailsProps {
  notifications: NotificationWithProfile[];
}

export const NotificationDetails = ({
  notifications,
}: NotificationDetailsProps) => {
  return (
    <>
      <PageHeader title="Notifications" icon={Bell} />
      <div className="flex flex-col">
        {notifications.length === 0 && (
          <NoResults
            src="/empty-box.png"
            title="You do not have any notifications."
          />
        )}

        {notifications?.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </>
  );
};
