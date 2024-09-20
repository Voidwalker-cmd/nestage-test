import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  CSSProperties,
} from "react";
// import { useSwipeable } from "react-swipeable";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./NotificationStyles.css";
import { Notification, NotificationContextType } from "./NotificationType";
import NotificationItem from "./NotificationItem";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = new Date().getTime();
    setNotifications((prev) => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <TransitionGroup>
          {notifications.map((notification) => (
            <CSSTransition
              key={notification.id}
              timeout={300}
              classNames="notification"
            >
              <NotificationItem
                notification={notification}
                onClose={() => removeNotification(notification.id)}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
