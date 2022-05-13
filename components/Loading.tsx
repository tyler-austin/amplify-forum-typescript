import React, { FC } from 'react';

import Box, { BoxProps } from '@awsui/components-react/box';
import SpaceBetween from '@awsui/components-react/space-between';
import Spinner from '@awsui/components-react/spinner';

type LoadingProps = {
  margin?: BoxProps.SpacingSize;
  padding?: BoxProps.SpacingSize;
};

const Loading: FC<LoadingProps> = ({ margin = 'xxxl', padding = 'xxxl' }) => {
  return (
    <Box textAlign="center" margin={margin} padding={padding}>
      <SpaceBetween size="xs" direction="vertical">
        <Spinner size="large" />
        <Box color="text-body-secondary">Loading...</Box>
      </SpaceBetween>
    </Box>
  );
};

export default Loading;
