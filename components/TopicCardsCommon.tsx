import React, { FC } from 'react';

import Box from '@awsui/components-react/box';
import Button from '@awsui/components-react/button';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';

import TopicModal from './TopicModal';

type CardsHeaderProps = {
  variant: 'h1' | 'h2' | 'h3' | 'awsui-h1-sticky';
  title: string;
  counter: string;
  actions: React.ReactNode;
};

export const CardsHeader: FC<CardsHeaderProps> = ({ variant, title, counter, actions }) => {
  return (
    <Header variant={variant} actions={actions} counter={counter}>
      {title}
    </Header>
  );
};

type CardsNoMatchStateProps = {
  onClearFilter: () => void;
};

export const CardsNoMatchState: FC<CardsNoMatchStateProps> = ({ onClearFilter }) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No matches</b>
        <Box variant="p" color="inherit">
          We can&apos;t find a match.
        </Box>
      </div>
      <Button onClick={onClearFilter}>Clear filter</Button>
    </SpaceBetween>
  </Box>
);

export const CardsEmptyState: FC = () => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No topics</b>
        <Box variant="p" color="inherit">
          No topics associated with this resource.
        </Box>
      </div>
      <TopicModal buttonVariant="normal" />
    </SpaceBetween>
  </Box>
);
