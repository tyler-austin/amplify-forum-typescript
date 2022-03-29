import React, { useEffect, useState, useCallback } from 'react';

import { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import Head from 'next/head';
import { Observable } from 'zen-observable-ts';

import Button from '../components/Button';
import Grid from '../components/Grid';
import Modal from '../components/Modal';
import TopicForm from '../components/TopicForm';
import {
  ListTopicsQuery,
  CreateTopicInput,
  CreateTopicMutation,
  CreateTopicMutationVariables,
  OnCreateTopicSubscription,
  OnCreateTopicSubscriptionVariables,
  DeleteTopicInput,
  DeleteTopicMutationVariables,
  DeleteTopicMutation,
  OnDeleteTopicSubscriptionVariables,
  OnDeleteTopicSubscription,
} from '../src/API';
import { createTopic, deleteTopic } from '../src/graphql/mutations';
import { listTopics } from '../src/graphql/queries';
import { onCreateTopic, onDeleteTopic } from '../src/graphql/subscriptions';
import { Topic, TopicFormData, GraphQLError, SubscriptionNext } from '../types';

const Home = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  console.log('user:', user);

  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<TopicFormData>({ title: '' });
  const [topics, setTopics] = useState<Topic[]>([]);
  const [createInProgress, setCreateInProgress] = useState<boolean>(false);

  const fetchTopics = useCallback(async () => {
    const result = (await API.graphql(graphqlOperation(listTopics))) as GraphQLResult<ListTopicsQuery>;
    const { data } = result;
    if (data && data.listTopics) {
      const { items: $topics } = data?.listTopics ?? {};
      setTopics($topics as unknown as Topic[]);
    }
  }, []);

  const subscribeToOnCreateTopic = useCallback(() => {
    const onCreateTopicSV: OnCreateTopicSubscriptionVariables = { owner: user.username };
    const subClient = API.graphql(graphqlOperation(onCreateTopic, onCreateTopicSV)) as Observable<object>;
    const subscription = subClient.subscribe({
      next: ({ value }: SubscriptionNext<OnCreateTopicSubscription>) => {
        console.log('onCreateTopic:', value.data?.onCreateTopic);
        const topic = value.data?.onCreateTopic as unknown as Topic;
        setTopics((currTopics) => [topic, ...currTopics]);
      },
      error: (error) => console.warn(error),
    });
    return subscription;
  }, [user.username]);

  const subscribeToOnDeleteTopic = useCallback(() => {
    const onDeleteTopicSV: OnDeleteTopicSubscriptionVariables = { owner: user.username };
    const subClient = API.graphql(graphqlOperation(onDeleteTopic, onDeleteTopicSV)) as Observable<object>;
    const subscription = subClient.subscribe({
      next: ({ value }: SubscriptionNext<OnDeleteTopicSubscription>) => {
        console.log('onDeleteTopic:', value.data?.onDeleteTopic);
        const topic = value.data?.onDeleteTopic as unknown as Topic;
        setTopics((currTopics) => currTopics.filter((t) => t.id !== topic.id));
      },
      error: (error) => console.warn(error),
    });
    return subscription;
  }, [user.username]);

  const createNewTopic = async () => {
    setCreateInProgress(true);
    try {
      const createTopicI: CreateTopicInput = {
        ...formData,
      };
      const createTopicMV: CreateTopicMutationVariables = {
        input: createTopicI,
      };
      const result = (await API.graphql(
        graphqlOperation(createTopic, createTopicMV),
      )) as GraphQLResult<CreateTopicMutation>;
      console.log('CreateTopicMutation result:', result);
      setFormData({ title: '' });
    } catch (err) {
      const error = err as GraphQLError;
      console.log('CreateTopicMutation error:', error);
      const errMsg = error?.errors
        ? error?.errors.map(({ message }) => message).join('\n')
        : 'Oops! Something went wrong!';
      console.log('CreateTopicMutation errMsg:', errMsg);
    }
    setOpen(false);
    setCreateInProgress(false);
  };

  const deleteExistingTopic = async (topic: Topic) => {
    try {
      const deleteTopicI: DeleteTopicInput = { id: topic.id };
      const deleteTopicMV: DeleteTopicMutationVariables = {
        input: deleteTopicI,
      };
      const result = (await API.graphql(
        graphqlOperation(deleteTopic, deleteTopicMV),
      )) as GraphQLResult<DeleteTopicMutation>;
      console.log('DeleteTopicMutation result:', result);
    } catch (err: unknown) {
      const error = err as GraphQLError;
      console.log('DeleteTopicMutation error:', error);
      const errMsg = error?.errors
        ? error?.errors.map(({ message }) => message).join('\n')
        : 'Oops! Something went wrong!';
      console.log('DeleteTopicMutation errMsg:', errMsg);
    }
  };

  const disableSubmit = createInProgress || formData.title.length === 0;

  useEffect(() => {
    void fetchTopics();
    const onCreateSubscription = subscribeToOnCreateTopic();
    const onDeleteSubscription = subscribeToOnDeleteTopic();
    return () => {
      onCreateSubscription.unsubscribe();
      onDeleteSubscription.unsubscribe();
    };
  }, [fetchTopics, subscribeToOnCreateTopic, subscribeToOnDeleteTopic, user.username]);

  console.log('topics:', topics);

  return (
    <div>
      <Head>
        <title>Amplify Forum TypeScript</title>
        <link
          rel="icon"
          href="data\:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐕</text></svg>"
        />
      </Head>

      <div className="container mx-auto">
        <main className="bg-white">
          <div className="px-4 py-16 mx-auto max-w-7xl sm\:py-24 sm\:px-6 lg\:px-8">
            <div className="text-center">
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm\:text-5xl sm\:tracking-tight lg\:text-6xl">
                Amplify Forum
              </p>
              <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500">Welcome to Amplify Forum: {user.username}</p>
              <Grid topics={topics} onDeleteTopic={deleteExistingTopic} />
              <div className="mt-10" />
              <Button text="Add New Topic" onClick={() => setOpen(true)} />
              <br />
              <Button text="Sign Out" onClick={() => signOut()} />
            </div>
          </div>
          <Modal open={open} setOpen={setOpen}>
            <TopicForm
              formData={formData}
              setFormData={setFormData}
              disableSubmit={disableSubmit}
              handleSubmit={createNewTopic}
            />
          </Modal>
        </main>
      </div>

      <footer></footer>
    </div>
  );
};

export default withAuthenticator(Home);
