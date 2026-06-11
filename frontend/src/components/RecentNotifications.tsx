import TrackingIdDisplay from "./TrackingIdDisplay";

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
              bg-black/20
              p-4
            "
          >
            <div>

              <p className="font-medium text-white">
                #{notification.orderId}
              </p>

              <p className="text-sm text-zinc-400 font-semibold mt-0.5">
                {notification.message}
              </p>

              {notification.trackingId && (
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-xs text-zinc-500">Tracking:</span>
                  <TrackingIdDisplay trackingId={notification.trackingId} />
                </div>
              )}

            </div>

            <div>

              <span className="text-yellow-400 text-xs font-semibold">
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