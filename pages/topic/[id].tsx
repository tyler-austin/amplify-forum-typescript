import React, { useEffect, useState, useCallback } from 'react';

import { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Observable } from 'zen-observable-ts';

import CommentForm from '../../components/CommentForm';
import CommentList from '../../components/CommentList';
import {
  GetTopicQuery,
  GetTopicQueryVariables,
  CreateCommentInput,
  CreateCommentMutation,
  CreateCommentMutationVariables,
  OnCreateCommentByTopicIdSubscription,
  OnCreateCommentByTopicIdSubscriptionVariables,
  OnDeleteCommentByTopicIdSubscription,
  OnDeleteCommentByTopicIdSubscriptionVariables,
} from '../../src/API';
import { createComment } from '../../src/graphql/mutations';
import { getTopic } from '../../src/graphql/queries';
import { onCreateCommentByTopicId, onDeleteCommentByTopicId } from '../../src/graphql/subscriptions';
import { Topic, Comment, CommentFormData, GraphQLError, SubscriptionNext } from '../../types';

const TopicPage = () => {
  const router = useRouter();
  const {
    query: { id: topicId },
  } = router;

  const [topic, setTopic] = useState<Topic>();
  const [formData, setFormData] = useState<CommentFormData>({ content: '' });
  const [createInProgress, setCreateInProgress] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [, setCommentNextToken] = useState<string | null | undefined>();

  const subscribeToOnDeleteComment = useCallback(() => {
    const onDeleteCommentByTopicIdSV: OnDeleteCommentByTopicIdSubscriptionVariables = { topicId: topicId as string };
    const pubSubClient = API.graphql(
      graphqlOperation(onDeleteCommentByTopicId, onDeleteCommentByTopicIdSV),
    ) as Observable<object>;
    const subscription = pubSubClient.subscribe({
      next: ({ value }: SubscriptionNext<OnDeleteCommentByTopicIdSubscription>) => {
        console.log('onDeleteCommentByTopicId data:', value.data?.onDeleteCommentByTopicId);
        const comment = value.data?.onDeleteCommentByTopicId as unknown as Comment;
        console.log('deleted comment:', comment);
        setComments((currComments) => currComments.filter((c) => c.id !== comment.id));
      },
      error: (error) => console.warn(error),
    });

    return subscription;
  }, [topicId]);

  const subscribeToOnCreateComment = useCallback(() => {
    const onCreateCommentByTopicIdSV: OnCreateCommentByTopicIdSubscriptionVariables = { topicId: topicId as string };
    const pubSubClient = API.graphql(
      graphqlOperation(onCreateCommentByTopicId, onCreateCommentByTopicIdSV),
    ) as Observable<object>;
    const subscription = pubSubClient.subscribe({
      next: ({ value }: SubscriptionNext<OnCreateCommentByTopicIdSubscription>) => {
        console.log('onCreateCommentByTopicId data:', value.data?.onCreateCommentByTopicId);
        const comment = value.data?.onCreateCommentByTopicId as unknown as Comment;
        console.log('new comment:', comment);
        setComments((currComments) => [comment, ...currComments]);
      },
      error: (error) => console.warn(error),
    });
    return subscription;
  }, [topicId]);

  const fetchTopic = useCallback(async () => {
    console.log('fetching topicId:', topicId);
    const getTopicQV: GetTopicQueryVariables = { id: topicId as string };
    const result = (await API.graphql(graphqlOperation(getTopic, getTopicQV))) as GraphQLResult<GetTopicQuery>;
    const { data } = result;
    if (data && data.getTopic) {
      const $topic = data?.getTopic as unknown as Topic;
      setTopic($topic);
      const {
        comments: { items, nextToken },
      } = $topic;
      setComments(items);
      setCommentNextToken(nextToken);
    }
  }, [topicId]);

  const createNewComment = async () => {
    setCreateInProgress(true);
    try {
      const createCommentI: CreateCommentInput = {
        ...formData,
        topicId: topicId as string,
      };
      const createCommentMV: CreateCommentMutationVariables = {
        input: createCommentI,
      };
      const result = (await API.graphql(
        graphqlOperation(createComment, createCommentMV),
      )) as GraphQLResult<CreateCommentMutation>;
      console.log('CreateCommentMutation result:', result);
      setFormData({ content: '' });
    } catch (err: unknown) {
      const error = err as GraphQLError;
      console.log('CreateCommentMutation error:', error);
      const errMsg = error?.errors
        ? error?.errors.map(({ message }) => message).join('\n')
        : 'Oops! Something went wrong!';
      console.log('CreateCommentMutation errMsg:', errMsg);
    }
    setCreateInProgress(false);
  };

  const disableSubmit = createInProgress || formData.content.length === 0;

  useEffect(() => {
    if (topicId) {
      void fetchTopic();
      const onCreateSubscription = subscribeToOnCreateComment();
      const onDeleteSubscription = subscribeToOnDeleteComment();
      return () => {
        onCreateSubscription.unsubscribe();
        onDeleteSubscription.unsubscribe();
      };
    }
  }, [fetchTopic, subscribeToOnCreateComment, subscribeToOnDeleteComment, topicId]);

  return (
    <div>
      <Head>
        <title>Amplify Forum TypeScript</title>
        <link
          rel="icon"
          href="data\:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22></text></svg>"
        />
      </Head>

      <div className="container mx-auto">
        <main className="bg-white">
          <div className="px-4 py-16 mx-auto max-w-7xl sm\:py-24 sm\:px-6 lg\:px-8">
            <div className="text-center">
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm\:text-5xl sm\:tracking-tight lg\:text-6xl">
                {!topic && 'Loading...'}
                {topic && topic.title}
              </p>
            </div>
            {topic && (
              <>
                <div className="mt-10" />
                <CommentList commentsItems={comments} />
                <div className="mt-20" />
                <CommentForm
                  formData={formData}
                  setFormData={setFormData}
                  disableSubmit={disableSubmit}
                  handleSubmit={createNewComment}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TopicPage;
