// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const VoteType = {
  "UP": "up",
  "DOWN": "down"
};

const { Topic, Comment, CommentVote, TopicVote } = initSchema(schema);

export {
  Topic,
  Comment,
  CommentVote,
  TopicVote,
  VoteType
};