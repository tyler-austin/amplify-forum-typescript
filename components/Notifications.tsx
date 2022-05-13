import React, { FC } from 'react';

import Flashbar from '@awsui/components-react/flashbar';

import useNotification from '../hooks/useNotification';

const Notifications: FC = () => {
  const [notifications] = useNotification();

  return <Flashbar items={notifications} />;
};

export default Notifications;
