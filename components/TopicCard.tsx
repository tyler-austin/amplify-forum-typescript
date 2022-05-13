import React, { FC } from 'react';

import Box from '@awsui/components-react/box';
import ColumnLayout from '@awsui/components-react/column-layout';
import SpaceBetween from '@awsui/components-react/space-between';
import styled from 'styled-components';

import { listTopicsWithComments } from '../src/graphql/custom-queries';
import { Topic } from '../types';
import CommonVoting from './CommonVoting';
import DateTime from './DateTime';

const FlexColumnLayout = styled(ColumnLayout)`
  display: flex;
  margin: 2.5rem;
  max-height: 6rem;
  div {
    flex-direction: column;
  }
`;

type ValueWithLabelProps = {
  label: string;
};

const ValueWithLabel: FC<ValueWithLabelProps> = ({ label, children }) => (
  <div>
    <Box variant="awsui-key-label">{label}</Box>
    <div>{children}</div>
  </div>
);

type TopicCardProps = {
  topic: Topic;
};

const TopicCard: FC<TopicCardProps> = ({ topic }) => {
  const { id, currentVote, voteCount, createdAt, commentCount, owner } = topic;
  return (
    <SpaceBetween size="xxxs" direction="horizontal">
      <CommonVoting
        resourceType="topic"
        id={id}
        currentVote={currentVote}
        voteCount={voteCount}
        refetchQuery={listTopicsWithComments}
      />
      <FlexColumnLayout columns={3} variant="text-grid">
        <ValueWithLabel label="Created">
          <DateTime iso={createdAt} />
        </ValueWithLabel>
        <ValueWithLabel label="Comments">{commentCount.toString()}</ValueWithLabel>
        <ValueWithLabel label="Owner">{owner}</ValueWithLabel>
      </FlexColumnLayout>
    </SpaceBetween>
  );
};

export default TopicCard;
