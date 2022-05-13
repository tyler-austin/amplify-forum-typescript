import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum VoteType {
  UP = "up",
  DOWN = "down"
}



type TopicMetaData = {
  readOnlyFields: 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentVoteMetaData = {
  readOnlyFields: 'updatedAt';
}

type TopicVoteMetaData = {
  readOnlyFields: 'updatedAt';
}

export declare class Topic {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly comments?: (Comment | null)[] | null;
  readonly commentCount?: number | null;
  readonly votes?: TopicVote[] | null;
  readonly voteCount?: number | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Topic, TopicMetaData>);
  static copyOf(source: Topic, mutator: (draft: MutableModel<Topic, TopicMetaData>) => MutableModel<Topic, TopicMetaData> | void): Topic;
}

export declare class Comment {
  readonly id: string;
  readonly topic?: Topic | null;
  readonly content: string;
  readonly votes?: CommentVote[] | null;
  readonly voteCount?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class CommentVote {
  readonly id: string;
  readonly comment?: Comment | null;
  readonly createdAt: string;
  readonly vote?: VoteType | keyof typeof VoteType | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CommentVote, CommentVoteMetaData>);
  static copyOf(source: CommentVote, mutator: (draft: MutableModel<CommentVote, CommentVoteMetaData>) => MutableModel<CommentVote, CommentVoteMetaData> | void): CommentVote;
}

export declare class TopicVote {
  readonly id: string;
  readonly topic?: Topic | null;
  readonly createdAt: string;
  readonly vote?: VoteType | keyof typeof VoteType | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TopicVote, TopicVoteMetaData>);
  static copyOf(source: TopicVote, mutator: (draft: MutableModel<TopicVote, TopicVoteMetaData>) => MutableModel<TopicVote, TopicVoteMetaData> | void): TopicVote;
}