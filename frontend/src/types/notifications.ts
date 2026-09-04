export type NotificationType =
  | "FIELD_UPDATE"
  | "WEATHER"
  | "SYSTEM"
  | "REPORT"
  | (string & {});

  
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
   userId: string;
  isRead: boolean;
  createdAt: string;
}

