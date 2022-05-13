import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useAuthenticator } from '@aws-amplify/ui-react';
import SpaceBetween from '@awsui/components-react/space-between';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Breadcrumbs from '../../components/Breadcrumbs';
import CommentsList from '../../components/CommentsList';
import CreateComment from '../../components/CreateComment';
import ErrorBoundary from '../../components/ErrorBoundary';
import TopicDetails from '../../components/TopicDetails';
import { GetTopicQuery, GetTopicQueryVariables } from '../../src/API';
import { getTopicWithComments } from '../../src/graphql/custom-queries';
import { Topic } from '../../types';

const TopicPage: NextPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const {
    query: { id: topicId },
  } = router;

  const getTopicQV: GetTopicQueryVariables = { id: topicId as string };
  const { loading, data, error } = useQuery<GetTopicQuery, GetTopicQueryVariables>(gql(getTopicWithComments), {
    variables: getTopicQV,
  });
  const { getTopic } = data ?? {};
  const topic = getTopic as unknown as Topic;
  const { commentCount, comments: topicComments } = topic ?? {};
  const { items: comments = [] } = topicComments ?? {};

  return (
    <>
      <Head>
        <title>Amplify Forum TypeScript</title>
      </Head>

      <ErrorBoundary>
        <Breadcrumbs
          breadcrumbs={[
            { text: 'Topics', href: '/' },
            { text: topic?.title ?? (topicId as string), href: `/topic/${topicId}` },
          ]}
        />
        <SpaceBetween size="l" direction="vertical">
          <TopicDetails loading={loading} username={user.username as string} topic={topic} error={error} />
          <CreateComment topicId={topicId as string} />
          <CommentsList
            comments={comments}
            commentCount={commentCount}
            loading={loading}
            username={user.username ?? ''}
          />
        </SpaceBetween>
      </ErrorBoundary>
    </>
  );
};

export default TopicPage;
