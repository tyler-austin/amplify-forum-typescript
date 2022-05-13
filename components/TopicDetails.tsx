import React, { FC } from 'react';

import { ApolloError } from '@apollo/client';
import Alert from '@awsui/components-react/alert';
import Box from '@awsui/components-react/box';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import { isUndefined } from 'lodash';
import styled from 'styled-components';

import { getTopicWithComments } from '../src/graphql/custom-queries';
import { Topic } from '../types';
import CommonVoting from './CommonVoting';
import DateTime from './DateTime';
import Loading from './Loading';
import TopicModal from './TopicModal';

const TopicHeaderContainer = styled.div`
  display: flex;
`;

const CommonVotingContainer = styled.div`
  margin: 2rem 1rem 2rem 0rem;
`;

type TopicDetailsProps = {
  loading: boolean;
  username: string;
  topic: Topic;
  error?: ApolloError;
};

const TopicDetails: FC<TopicDetailsProps> = ({ loading, username, topic, error }) => {
  const isTopicOwner = username === topic?.owner;

  if (!isUndefined(error)) {
    console.error('GetTopicQuery error:', error);
  }

  return loading ? (
    <Loading margin="xxxs" padding="xxxs" />
  ) : !isUndefined(error) ? (
    <Alert visible={!!error} type="error" header="Error querying topic">
      {error}
    </Alert>
  ) : (
    <TopicHeaderContainer>
      <CommonVotingContainer>
        <CommonVoting
          resourceType="topic"
          id={topic.id}
          currentVote={topic.currentVote}
          voteCount={topic.voteCount}
          refetchQuery={getTopicWithComments}
        />
      </CommonVotingContainer>
      <SpaceBetween size="s" direction="vertical">
        <Header
          variant="h1"
          actions={topic && isTopicOwner && <TopicModal isEdit buttonVariant="normal" topic={topic} />}
        >
          {topic.title ?? ''}
        </Header>
        <div>{topic.content ?? ''}</div>
        <Box color="text-body-secondary">
          by <strong>{topic.owner}</strong> <DateTime iso={topic.createdAt} />
        </Box>
      </SpaceBetween>
    </TopicHeaderContainer>
  );
};

export default TopicDetails;
