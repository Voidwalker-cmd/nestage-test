import { ReactNode } from "react";

export type NotificationType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "plain";
export type NotificationPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  message: ReactNode;
  timeout?: number;
  position?: NotificationPosition;
};

export type NotificationContextType = {
  addNotification: (notification: Omit<Notification, "id">) => void;
};

export type typeStylesT = {
  success: string;
  error: string;
  info: string;
  warning: string;
  plain: string;
};
