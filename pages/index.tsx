import React, { useMemo } from 'react';

import { gql, useQuery } from '@apollo/client';
import Header from '@awsui/components-react/header';
import SpaceBetween from '@awsui/components-react/space-between';
import { NextPage } from 'next';
import Head from 'next/head';

import Breadcrumbs from '../components/Breadcrumbs';
import ErrorBoundary from '../components/ErrorBoundary';
import TopicCards from '../components/TopicCards';
import { ListTopicsQuery } from '../src/API';
import { listTopicsWithComments } from '../src/graphql/custom-queries';
import { Topic } from '../types';
import { sortDates } from '../utils/sortDates';

const Home: NextPage = () => {
  const {
    loading: topicsLoading,
    data: topicsData,
    error: topicsError,
  } = useQuery<ListTopicsQuery>(gql(listTopicsWithComments));
  const { listTopics } = topicsData ?? {};
  const { items: topics = [] } = listTopics ?? {};

  const sortedTopics = useMemo(
    () => [...(topics as unknown as Topic[])].sort((a, b) => sortDates(a.createdAt, b.createdAt)),
    [topics],
  );

  return (
    <>
      <Head>
        <title>Amplify Forum TypeScript</title>
      </Head>

      <ErrorBoundary>
        <Breadcrumbs breadcrumbs={[{ text: 'Topics', href: '/' }]} />
        <SpaceBetween size="l" direction="vertical">
          <Header
            variant="h1"
            description="A static site generated, serverless CRUD application made with NextJS, GraphQL, Apollo Client and TypeScript"
          >
            Amplify Forum TypeScript
          </Header>
          <TopicCards loading={topicsLoading} topics={sortedTopics} error={topicsError} />
        </SpaceBetween>
      </ErrorBoundary>
    </>
  );
};

export default Home;
