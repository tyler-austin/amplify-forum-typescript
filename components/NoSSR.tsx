import React, { FC } from 'react';

import dynamic from 'next/dynamic';

const NoSSR: FC = ({ children }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
