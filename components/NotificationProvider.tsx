import React, { FC, useState } from 'react';

import type { FlashbarProps } from '@awsui/components-react/flashbar';
import { noop } from 'lodash';

export type NotificationDefinition = FlashbarProps.MessageDefinition & {
  id: string;
};

type NotificationContextType = {
  notifications: NotificationDefinition[];
  clearNotifications: () => void;
  addNotification: (content: NotificationDefinition) => void;
  addErrorNotification: (id: string, error: string) => void;
};

export const NotificationContext = React.createContext<NotificationContextType>({
  notifications: [],
  clearNotifications: noop,
  addNotification: noop,
  addErrorNotification: noop,
});

const NotificationProvider: FC = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationDefinition[]>([]);

  const clearNotifications = () => setNotifications([]);

  const addNotification = (content: NotificationDefinition) => {
    const newNotification = {
      type: 'success',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setNotifications((items) => items.filter((item) => item.id !== content.id)),
      ...content,
    } as NotificationDefinition;
    return setNotifications([...notifications, newNotification]);
  };

  const addErrorNotification = (id: string, error: string) => {
    return addNotification({ type: 'error', header: 'Error', id, content: error });
  };

  const contextValue = {
    notifications,
    addNotification,
    addErrorNotification,
    clearNotifications,
  };

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};

export default NotificationProvider;
