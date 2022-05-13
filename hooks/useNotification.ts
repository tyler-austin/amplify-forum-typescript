import { useContext } from 'react';

import { NotificationContext, NotificationDefinition } from '../components/NotificationProvider';

type UseNotificationType = [
  NotificationDefinition[],
  {
    clearNotifications: () => void;
    addNotification: (content: NotificationDefinition) => void;
    addErrorNotification: (id: string, content: string) => void;
  },
];

const useNotification = (): UseNotificationType => {
  const { notifications, addNotification, clearNotifications, addErrorNotification } = useContext(NotificationContext);
  return [notifications, { addNotification, clearNotifications, addErrorNotification }];
};

export default useNotification;
