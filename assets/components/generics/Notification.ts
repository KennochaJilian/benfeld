import { notification } from 'antd';

enum notificationType {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error"
};

const openNotificationWithIcon = (type: notificationType, message: string, description: string) => {
  notification[type]({
    message: message,
    description: description
  });
};

export { openNotificationWithIcon, notificationType };