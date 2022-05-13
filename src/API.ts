/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTopicInput = {
  id?: string | null,
  title: string,
  content: string,
  createdAt?: string | null,
  commentCount?: number | null,
  voteCount?: number | null,
  currentVote?: string | null,
};

export type ModelTopicConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  commentCount?: ModelIntInput | null,
  voteCount?: ModelIntInput | null,
  currentVote?: ModelStringInput | null,
  and?: Array< ModelTopicConditionInput | null > | null,
  or?: Array< ModelTopicConditionInput | null > | null,
  not?: ModelTopicConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Topic = {
  __typename: "Topic",
  id: string,
  title: string,
  content: string,
  createdAt?: string | null,
  comments?: ModelCommentConnection | null,
  commentCount?: number | null,
  votes?: ModelTopicVoteConnection | null,
  voteCount?: number | null,
  currentVote?: string | null,
  updatedAt: string,
  owner?: string | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  topicId: string,
  topic?: Topic | null,
  content: string,
  votes?: ModelCommentVoteConnection | null,
  voteCount?: number | null,
  currentVote?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelCommentVoteConnection = {
  __typename: "ModelCommentVoteConnection",
  items:  Array<CommentVote | null >,
  nextToken?: string | null,
};

export type CommentVote = {
  __typename: "CommentVote",
  id: string,
  owner: string,
  commentId: string,
  comment?: Comment | null,
  vote: VoteType,
  createdAt: string,
  updatedAt: string,
};

export enum VoteType {
  up = "up",
  down = "down",
}


export type ModelTopicVoteConnection = {
  __typename: "ModelTopicVoteConnection",
  items:  Array<TopicVote | null >,
  nextToken?: string | null,
};

export type TopicVote = {
  __typename: "TopicVote",
  id: string,
  owner: string,
  topicId: string,
  topic?: Topic | null,
  vote: VoteType,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTopicInput = {
  id: string,
  title?: string | null,
  content?: string | null,
  createdAt?: string | null,
  commentCount?: number | null,
  voteCount?: number | null,
  currentVote?: string | null,
};

export type ModelTopicFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  commentCount?: ModelIntInput | null,
  voteCount?: ModelIntInput | null,
  currentVote?: ModelStringInput | null,
  and?: Array< ModelTopicFilterInput | null > | null,
  or?: Array< ModelTopicFilterInput | null > | null,
  not?: ModelTopicFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTopicConnection = {
  __typename: "ModelTopicConnection",
  items:  Array<Topic | null >,
  nextToken?: string | null,
};

export type DeleteTopicInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  topicId: string,
  content: string,
  voteCount?: number | null,
  currentVote?: string | null,
};

export type ModelCommentConditionInput = {
  topicId?: ModelIDInput | null,
  content?: ModelStringInput | null,
  voteCount?: ModelIntInput | null,
  currentVote?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
  topicId?: string | null,
  content?: string | null,
  voteCount?: number | null,
  currentVote?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type CreateTopicVoteInput = {
  id?: string | null,
  owner: string,
  topicId: string,
  vote: VoteType,
};

export type ModelTopicVoteConditionInput = {
  owner?: ModelStringInput | null,
  topicId?: ModelIDInput | null,
  vote?: ModelVoteTypeInput | null,
  and?: Array< ModelTopicVoteConditionInput | null > | null,
  or?: Array< ModelTopicVoteConditionInput | null > | null,
  not?: ModelTopicVoteConditionInput | null,
};

export type ModelVoteTypeInput = {
  eq?: VoteType | null,
  ne?: VoteType | null,
};

export type UpdateTopicVoteInput = {
  id: string,
  owner?: string | null,
  topicId?: string | null,
  vote?: VoteType | null,
};

export type DeleteTopicVoteInput = {
  id: string,
};

export type CreateCommentVoteInput = {
  id?: string | null,
  owner: string,
  commentId: string,
  vote: VoteType,
};

export type ModelCommentVoteConditionInput = {
  owner?: ModelStringInput | null,
  commentId?: ModelIDInput | null,
  vote?: ModelVoteTypeInput | null,
  and?: Array< ModelCommentVoteConditionInput | null > | null,
  or?: Array< ModelCommentVoteConditionInput | null > | null,
  not?: ModelCommentVoteConditionInput | null,
};

export type UpdateCommentVoteInput = {
  id: string,
  owner?: string | null,
  commentId?: string | null,
  vote?: VoteType | null,
};

export type DeleteCommentVoteInput = {
  id: string,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  topicId?: ModelIDInput | null,
  content?: ModelStringInput | null,
  voteCount?: ModelIntInput | null,
  currentVote?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type ModelTopicVoteFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  topicId?: ModelIDInput | null,
  vote?: ModelVoteTypeInput | null,
  and?: Array< ModelTopicVoteFilterInput | null > | null,
  or?: Array< ModelTopicVoteFilterInput | null > | null,
  not?: ModelTopicVoteFilterInput | null,
};

export type ModelCommentVoteFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  commentId?: ModelIDInput | null,
  vote?: ModelVoteTypeInput | null,
  and?: Array< ModelCommentVoteFilterInput | null > | null,
  or?: Array< ModelCommentVoteFilterInput | null > | null,
  not?: ModelCommentVoteFilterInput | null,
};

export type CreateTopicWithCommentsMutationVariables = {
  input: CreateTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type CreateTopicWithCommentsMutation = {
  createTopic?:  {
    __typename: "Topic",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    createdAt?: string | null,
    updatedAt: string,
    commentCount?: number | null,
    voteCount?: number | null,
    currentVote?: string | null,
  } | null,
};

export type UpdateTopicWithCommentsMutationVariables = {
  input: UpdateTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type UpdateTopicWithCommentsMutation = {
  updateTopic?:  {
    __typename: "Topic",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    createdAt?: string | null,
    updatedAt: string,
    commentCount?: number | null,
    voteCount?: number | null,
    currentVote?: string | null,
  } | null,
};

export type TopicUpVoteMutationVariables = {
  topicId?: string | null,
};

export type TopicUpVoteMutation = {
  upVoteTopic?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type TopicDownVoteMutationVariables = {
  topicId?: string | null,
};

export type TopicDownVoteMutation = {
  downVoteTopic?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type TopicRemoveVoteMutationVariables = {
  topicId?: string | null,
};

export type TopicRemoveVoteMutation = {
  removeVoteTopic?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTopicsWithCommentsQueryVariables = {
  filter?: ModelTopicFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTopicsWithCommentsQuery = {
  listTopics?:  {
    __typename: "ModelTopicConnection",
    items:  Array< {
      __typename: "Topic",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      createdAt?: string | null,
      updatedAt: string,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTopicWithCommentsQueryVariables = {
  id: string,
};

export type GetTopicWithCommentsQuery = {
  getTopic?:  {
    __typename: "Topic",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    createdAt?: string | null,
    updatedAt: string,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        owner?: string | null,
        content: string,
        createdAt: string,
        updatedAt: string,
        voteCount?: number | null,
        currentVote?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    commentCount?: number | null,
    voteCount?: number | null,
    currentVote?: string | null,
  } | null,
};

export type UpVoteTopicMutationVariables = {
  topicId?: string | null,
};

export type UpVoteTopicMutation = {
  upVoteTopic?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DownVoteTopicMutationVariables = {
  topicId?: string | null,
};

export type DownVoteTopicMutation = {
  downVoteTopic?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type RemoveVoteTopicMutationVariables = {
  topicId?: string | null,
};

export type RemoveVoteTopicMutation = {
  removeVoteTopic?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpVoteCommentMutationVariables = {
  commentId?: string | null,
};

export type UpVoteCommentMutation = {
  upVoteComment?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DownVoteCommentMutationVariables = {
  commentId?: string | null,
};

export type DownVoteCommentMutation = {
  downVoteComment?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type RemoveVoteCommentMutationVariables = {
  commentId?: string | null,
};

export type RemoveVoteCommentMutation = {
  removeVoteComment?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTopicMutationVariables = {
  input: CreateTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type CreateTopicMutation = {
  createTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    content: string,
    createdAt?: string | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount?: number | null,
    votes?:  {
      __typename: "ModelTopicVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateTopicMutationVariables = {
  input: UpdateTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type UpdateTopicMutation = {
  updateTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    content: string,
    createdAt?: string | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount?: number | null,
    votes?:  {
      __typename: "ModelTopicVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteTopicMutationVariables = {
  input: DeleteTopicInput,
  condition?: ModelTopicConditionInput | null,
};

export type DeleteTopicMutation = {
  deleteTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    content: string,
    createdAt?: string | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount?: number | null,
    votes?:  {
      __typename: "ModelTopicVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    content: string,
    votes?:  {
      __typename: "ModelCommentVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    content: string,
    votes?:  {
      __typename: "ModelCommentVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    content: string,
    votes?:  {
      __typename: "ModelCommentVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateTopicVoteMutationVariables = {
  input: CreateTopicVoteInput,
  condition?: ModelTopicVoteConditionInput | null,
};

export type CreateTopicVoteMutation = {
  createTopicVote?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTopicVoteMutationVariables = {
  input: UpdateTopicVoteInput,
  condition?: ModelTopicVoteConditionInput | null,
};

export type UpdateTopicVoteMutation = {
  updateTopicVote?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTopicVoteMutationVariables = {
  input: DeleteTopicVoteInput,
  condition?: ModelTopicVoteConditionInput | null,
};

export type DeleteTopicVoteMutation = {
  deleteTopicVote?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCommentVoteMutationVariables = {
  input: CreateCommentVoteInput,
  condition?: ModelCommentVoteConditionInput | null,
};

export type CreateCommentVoteMutation = {
  createCommentVote?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommentVoteMutationVariables = {
  input: UpdateCommentVoteInput,
  condition?: ModelCommentVoteConditionInput | null,
};

export type UpdateCommentVoteMutation = {
  updateCommentVote?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommentVoteMutationVariables = {
  input: DeleteCommentVoteInput,
  condition?: ModelCommentVoteConditionInput | null,
};

export type DeleteCommentVoteMutation = {
  deleteCommentVote?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTopicQueryVariables = {
  id: string,
};

export type GetTopicQuery = {
  getTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    content: string,
    createdAt?: string | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount?: number | null,
    votes?:  {
      __typename: "ModelTopicVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListTopicsQueryVariables = {
  filter?: ModelTopicFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTopicsQuery = {
  listTopics?:  {
    __typename: "ModelTopicConnection",
    items:  Array< {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    content: string,
    votes?:  {
      __typename: "ModelCommentVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTopicVoteQueryVariables = {
  id: string,
};

export type GetTopicVoteQuery = {
  getTopicVote?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTopicVotesQueryVariables = {
  filter?: ModelTopicVoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTopicVotesQuery = {
  listTopicVotes?:  {
    __typename: "ModelTopicVoteConnection",
    items:  Array< {
      __typename: "TopicVote",
      id: string,
      owner: string,
      topicId: string,
      vote: VoteType,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentVoteQueryVariables = {
  id: string,
};

export type GetCommentVoteQuery = {
  getCommentVote?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommentVotesQueryVariables = {
  filter?: ModelCommentVoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentVotesQuery = {
  listCommentVotes?:  {
    __typename: "ModelCommentVoteConnection",
    items:  Array< {
      __typename: "CommentVote",
      id: string,
      owner: string,
      commentId: string,
      vote: VoteType,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTopicSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateTopicSubscription = {
  onCreateTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    content: string,
    createdAt?: string | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount?: number | null,
    votes?:  {
      __typename: "ModelTopicVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTopicSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateTopicSubscription = {
  onUpdateTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    content: string,
    createdAt?: string | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount?: number | null,
    votes?:  {
      __typename: "ModelTopicVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTopicSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteTopicSubscription = {
  onDeleteTopic?:  {
    __typename: "Topic",
    id: string,
    title: string,
    content: string,
    createdAt?: string | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      nextToken?: string | null,
    } | null,
    commentCount?: number | null,
    votes?:  {
      __typename: "ModelTopicVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    content: string,
    votes?:  {
      __typename: "ModelCommentVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    content: string,
    votes?:  {
      __typename: "ModelCommentVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    content: string,
    votes?:  {
      __typename: "ModelCommentVoteConnection",
      nextToken?: string | null,
    } | null,
    voteCount?: number | null,
    currentVote?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateTopicVoteSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateTopicVoteSubscription = {
  onCreateTopicVote?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTopicVoteSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateTopicVoteSubscription = {
  onUpdateTopicVote?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTopicVoteSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteTopicVoteSubscription = {
  onDeleteTopicVote?:  {
    __typename: "TopicVote",
    id: string,
    owner: string,
    topicId: string,
    topic?:  {
      __typename: "Topic",
      id: string,
      title: string,
      content: string,
      createdAt?: string | null,
      commentCount?: number | null,
      voteCount?: number | null,
      currentVote?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommentVoteSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateCommentVoteSubscription = {
  onCreateCommentVote?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommentVoteSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateCommentVoteSubscription = {
  onUpdateCommentVote?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommentVoteSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteCommentVoteSubscription = {
  onDeleteCommentVote?:  {
    __typename: "CommentVote",
    id: string,
    owner: string,
    commentId: string,
    comment?:  {
      __typename: "Comment",
      id: string,
      topicId: string,
      content: string,
      voteCount?: number | null,
      currentVote?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    vote: VoteType,
    createdAt: string,
    updatedAt: string,
  } | null,
};
