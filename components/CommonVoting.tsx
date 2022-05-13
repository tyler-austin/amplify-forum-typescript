import React, { FC, useState } from 'react';

import { FetchResult, gql, useMutation } from '@apollo/client';
import Button from '@awsui/components-react/button';
import Icon from '@awsui/components-react/icon';
import SpaceBetween from '@awsui/components-react/space-between';
import Spinner from '@awsui/components-react/spinner';
import { isNull } from 'lodash';
import styled from 'styled-components';

import {
  UpVoteTopicMutation,
  UpVoteTopicMutationVariables,
  UpVoteCommentMutation,
  UpVoteCommentMutationVariables,
  DownVoteTopicMutation,
  DownVoteTopicMutationVariables,
  DownVoteCommentMutation,
  DownVoteCommentMutationVariables,
  RemoveVoteTopicMutation,
  RemoveVoteTopicMutationVariables,
  RemoveVoteCommentMutation,
  RemoveVoteCommentMutationVariables,
} from '../src/API';
import {
  upVoteTopic,
  upVoteComment,
  downVoteTopic,
  downVoteComment,
  removeVoteTopic,
  removeVoteComment,
} from '../src/graphql/custom-mutations';

const VoteCountSpan = styled.span`
  margin: 0 2.5rem;
`;

type CommonVotingProps = {
  resourceType: 'topic' | 'comment';
  id: string;
  currentVote: 'up' | 'down' | null;
  voteCount: number;
  refetchQuery: string;
};

const CommonVoting: FC<CommonVotingProps> = ({ resourceType, id, currentVote, voteCount, refetchQuery }) => {
  const [upVoteLoading, setUpVoteLoading] = useState<boolean>(false);
  const [downVoteLoading, setDownVoteLoading] = useState<boolean>(false);

  const [upVoteTopicMutateFunction, { error: upVoteTopicError }] = useMutation<
    UpVoteTopicMutation,
    UpVoteTopicMutationVariables
  >(gql(upVoteTopic), {
    refetchQueries: [gql(refetchQuery)],
    awaitRefetchQueries: true,
    onCompleted: () => setUpVoteLoading(false),
  });

  const [upVoteCommentMutateFunction, { error: upVoteCommentError }] = useMutation<
    UpVoteCommentMutation,
    UpVoteCommentMutationVariables
  >(gql(upVoteComment), {
    refetchQueries: [gql(refetchQuery)],
    awaitRefetchQueries: true,
    onCompleted: () => setUpVoteLoading(false),
  });

  const [downVoteTopicMutateFunction, { error: downVoteTopicError }] = useMutation<
    DownVoteTopicMutation,
    DownVoteTopicMutationVariables
  >(gql(downVoteTopic), {
    refetchQueries: [gql(refetchQuery)],
    awaitRefetchQueries: true,
    onCompleted: () => setDownVoteLoading(false),
  });

  const [downVoteCommentMutateFunction, { error: downVoteCommentError }] = useMutation<
    DownVoteCommentMutation,
    DownVoteCommentMutationVariables
  >(gql(downVoteComment), {
    refetchQueries: [gql(refetchQuery)],
    awaitRefetchQueries: true,
    onCompleted: () => setDownVoteLoading(false),
  });

  const [removeVoteTopicMutateFunction, { error: removeVoteTopicError }] = useMutation<
    RemoveVoteTopicMutation,
    RemoveVoteTopicMutationVariables
  >(gql(removeVoteTopic), {
    refetchQueries: [gql(refetchQuery)],
    awaitRefetchQueries: true,
    onCompleted: () => [setUpVoteLoading(false), setDownVoteLoading(false)],
  });

  const [removeVoteCommentMutateFunction, { error: removeVoteCommentError }] = useMutation<
    RemoveVoteCommentMutation,
    RemoveVoteCommentMutationVariables
  >(gql(removeVoteComment), {
    refetchQueries: [gql(refetchQuery)],
    awaitRefetchQueries: true,
    onCompleted: () => [setUpVoteLoading(false), setDownVoteLoading(false)],
  });

  const topicUpVote = async () => {
    try {
      let result: FetchResult<UpVoteTopicMutation | UpVoteCommentMutation>;
      if (resourceType === 'topic') {
        result = await upVoteTopicMutateFunction({ variables: { topicId: id } });
      } else {
        result = await upVoteCommentMutateFunction({ variables: { commentId: id } });
      }
      console.log('UpVoteMutation result:', result);
    } catch (err) {
      console.error('UpVoteMutation error:', err);
    }
  };

  const topicDownVote = async () => {
    try {
      let result: FetchResult<DownVoteTopicMutation | DownVoteCommentMutation>;
      if (resourceType === 'topic') {
        result = await downVoteTopicMutateFunction({ variables: { topicId: id } });
      } else {
        result = await downVoteCommentMutateFunction({ variables: { commentId: id } });
      }
      console.log('DownVoteMutation result:', result);
    } catch (err) {
      console.error('DownVoteMutation error:', err);
    }
  };

  const topicRemoveVote = async () => {
    try {
      let result: FetchResult<RemoveVoteTopicMutation | RemoveVoteCommentMutation>;
      if (resourceType === 'topic') {
        result = await removeVoteTopicMutateFunction({ variables: { topicId: id } });
      } else {
        result = await removeVoteCommentMutateFunction({ variables: { commentId: id } });
      }
      console.log('DownVoteMutation result:', result);
    } catch (err) {
      console.error('DownVoteMutation error:', err);
    }
  };

  if (upVoteTopicError) console.error('upVoteError:', upVoteTopicError);
  if (upVoteCommentError) console.error('upVoteError:', upVoteCommentError);
  if (downVoteTopicError) console.error('downVoteError:', downVoteTopicError);
  if (downVoteCommentError) console.error('downVoteError:', downVoteCommentError);
  if (removeVoteTopicError) console.error('removeVoteError:', removeVoteTopicError);
  if (removeVoteCommentError) console.error('removeVoteError:', removeVoteCommentError);

  const handleUpVote = () => {
    setUpVoteLoading(true);
    if (isNull(currentVote) || currentVote === 'down') {
      void topicUpVote();
    } else {
      void topicRemoveVote();
    }
  };

  const handleDownVote = () => {
    setDownVoteLoading(true);
    if (isNull(currentVote) || currentVote === 'up') {
      void topicDownVote();
    } else {
      void topicRemoveVote();
    }
  };

  return (
    <SpaceBetween size="xs" direction="vertical">
      <Button variant="link" disabled={upVoteLoading} onClick={() => handleUpVote()}>
        {upVoteLoading ? (
          <Spinner variant="disabled" />
        ) : (
          <Icon name="angle-up" variant={currentVote === 'up' ? 'warning' : 'normal'} />
        )}
      </Button>
      <VoteCountSpan>{voteCount}</VoteCountSpan>
      <Button variant="link" disabled={downVoteLoading} onClick={() => handleDownVote()}>
        {downVoteLoading ? (
          <Spinner variant="disabled" />
        ) : (
          <Icon name="angle-down" variant={currentVote === 'down' ? 'warning' : 'normal'} />
        )}
      </Button>
    </SpaceBetween>
  );
};

export default CommonVoting;
