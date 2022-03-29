import { GraphQLResult } from '@aws-amplify/api';

export type TopicFormData = {
  title: string;
};

export type CommentFormData = {
  content: string;
};

export type Topic = {
  id: string;
  title: string;
  comments: {
    items: Comment[];
    nextToken?: string | null;
  };
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type Comment = {
  id: string;
  topicId: string;
  content: string;
  topic: Topic;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type GraphQLError = {
  errors: Error[];
};

export type SubscriptionNext<T> = {
  value: GraphQLResult<T>;
};
