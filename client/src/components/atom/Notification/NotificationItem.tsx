import React, { useEffect, CSSProperties } from "react";
import { useSwipeable } from "react-swipeable";
import {
  Notification,
  NotificationPosition,
  NotificationType,
  typeStylesT,
} from "./NotificationType";

const NotificationItem: React.FC<{
  notification: Notification;
  onClose: () => void;
}> = ({ notification, onClose }) => {
  const {
    type,
    title,
    message,
    timeout = 5000,
    position = "top-right",
  } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onClose]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: onClose,
    onSwipedRight: onClose,
  });

  const typeStyles: typeStylesT = {
    success: "border-green-500 bg-green-50",
    error: "border-red-500 bg-red-50",
    info: "border-cyan-500 bg-cyan-50",
    warning: "border-amber-500 bg-amber-50",
    plain: "border-slate-500 bg-slate-50",
  };

  const positionStyles: Record<NotificationPosition, CSSProperties> = {
    "top-left": { top: "1rem", left: "1rem" },
    "top-center": { top: "1rem", left: "50%", transform: "translateX(-50%)" },
    "top-right": { top: "1rem", right: "1rem" },
    "bottom-left": { bottom: "1rem", left: "1rem" },
    "bottom-center": {
      bottom: "1rem",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "bottom-right": { bottom: "1rem", right: "1rem" },
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      default:
        return "";
    }
  };

  return (
    <div
      role="alert"
      className={`notification-item ${typeStyles[type]}`}
      style={{ ...positionStyles[position] }}
      {...swipeHandlers}
    >
      <div className="flex justify-between items-start">
        <strong className="font-medium flex items-center gap-2 text-red-800">
          {getIcon()} {title}
        </strong>
        <button
          onClick={onClose}
          className="ml-4 bg-transparent text-xl font-semibold leading-none"
        >
          &times;
        </button>
      </div>
      <p className="mt-2 text-sm text-red-700">{message}</p>
    </div>
  );
};

export default NotificationItem;
{
  /* <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
  <div className="flex items-center gap-2 text-red-800">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>

    <strong className="block font-medium"> Something went wrong </strong>
  </div>

  <p className="mt-2 text-sm text-red-700">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quasi
    assumenda numquam deserunt consectetur autem nihil quos debitis dolor culpa.
  </p>
</div>; */
}
