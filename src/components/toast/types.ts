export enum NotificationType {
  error = "error",
  info = "info",
  success = "success",
}

export interface Notification {
  id: string;
  message: string;
  title: string;
  type: NotificationType;
}
