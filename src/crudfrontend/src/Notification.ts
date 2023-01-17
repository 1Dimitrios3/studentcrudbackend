import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface Notification {
    type: NotificationType,
    message: string,
    description: string,
    placement?: NotificationPlacement
}

notification.config({
    placement: 'topRight',
    top: 40,
    duration: 3
  });

  const openNotificationWithIcon = (
    type: NotificationType,
    message: Notification['message'],
    description: Notification['description'],
    placement?: NotificationPlacement
    ) => {
    placement = placement || 'topRight'
    notification[type]({ message, description, placement });
    };

  export const successNotification = (
    message: Notification['message'],
    description: Notification['description'],
    placement?: NotificationPlacement
  ) => openNotificationWithIcon('success', message, description, placement);

  export const errorNotification = (
    message: Notification['message'],
    description: Notification['description'],
    placement?: NotificationPlacement
  ) => openNotificationWithIcon('error', message, description, placement);

  export const infoNotification = (
    message: Notification['message'],
    description: Notification['description'],
    placement?: NotificationPlacement
  ) => openNotificationWithIcon('info', message, description, placement);

  export const warningNotification = (
    message: Notification['message'],
    description: Notification['description'],
    placement?: NotificationPlacement
  ) => openNotificationWithIcon('warning', message, description, placement);

