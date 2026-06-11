type Notification = {
  orderId: number;
  message: string;
  notificationStatus: string;
  trackingId?: string;
};

type RecentNotificationsProps = {
  notifications: Notification[];
};

function RecentNotifications({
  notifications,
}: RecentNotificationsProps) {
  const recentNotifications = notifications.slice(-5);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Recent Notifications
      </h2>

      <div className="space-y-4">

        {recentNotifications.map((notification) => (
          <div
            key={notification.orderId}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-zinc-800
              p-4
            "
          >
            <div>

              <p className="font-medium text-white">
                #{notification.orderId}
              </p>

              <p className="text-sm text-zinc-400">
                {notification.message}
              </p>

              {notification.trackingId && (
                <p className="text-xs text-zinc-500 font-mono mt-1">
                  Tracking: {notification.trackingId.substring(0, 8)}...
                </p>
              )}

            </div>

            <div>

              <span className="text-yellow-400">
                {notification.notificationStatus}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentNotifications;