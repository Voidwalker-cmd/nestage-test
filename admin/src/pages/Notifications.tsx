import NotificationCreateCard from "../components/molecules/NotificationCreateCard";
import NotificationsCard from "../components/molecules/NotificationsCard";

const Notifications = () => {
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to the Nestage admin dashboard
        </h2>
        <p>Current Page: {"Notification"}</p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
        <NotificationCreateCard />
        <NotificationsCard />
      </div>
    </main>
  );
};

export default Notifications;
