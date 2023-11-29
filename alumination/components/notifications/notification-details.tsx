"use client";

import { Bell } from "lucide-react";

import { NotificationWithProfile } from "@/types";
import { NoResults } from "@/components/no-results";
import { NotificationCard } from "@/components/notifications/notification-card";

interface NotificationDetailsProps {
  notifications: NotificationWithProfile[];
}

export const NotificationDetails = ({
  notifications,
}: NotificationDetailsProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold mb-5">
        <div className="flex items-center justify-center space-x-3">
          <span>Notifications</span> <Bell className="h-8 w-8" />
        </div>
      </h1>
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
  );
};
