export type TopicFormData = {
  title: string;
  content: string;
};

export type CommentFormData = {
  content: string;
};

export type Topic = {
  id: string;
  owner: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  comments?: {
    items: Comment[];
    nextToken?: string | null;
  };
  commentCount: number;
  voteCount: number;
  currentVote: 'up' | 'down' | null;
};

export type Comment = {
  id: string;
  owner: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  topic?: Topic;
  topicId?: string;
  voteCount: number;
  currentVote: 'up' | 'down' | null;
};

type Vote = {
  id: string;
  createdAt: string;
  owner: string;
  vote: VoteType;
};

export enum VoteType {
  up,
  down,
}

export type TopicVote = Vote & {
  topicId: string;
  topic: Topic;
};

export type CommentVote = Vote & {
  commentId: string;
  comment: Comment;
};
