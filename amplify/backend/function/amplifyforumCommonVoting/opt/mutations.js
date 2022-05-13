const createTopicVote = /* GraphQL */ `
  mutation CreateTopicVote(
    $input: CreateTopicVoteInput!
    $condition: ModelTopicVoteConditionInput
  ) {
    createTopicVote(input: $input, condition: $condition) {
      id
      topicId
      vote
      createdAt
      updatedAt
      owner
    }
  }
`;

const updateTopicVote = /* GraphQL */ `
  mutation UpdateTopicVote(
    $input: UpdateTopicVoteInput!
    $condition: ModelTopicVoteConditionInput
  ) {
    updateTopicVote(input: $input, condition: $condition) {
      id
      topicId
      vote
      createdAt
      updatedAt
      owner
    }
  }
`;

const deleteTopicVote = /* GraphQL */ `
  mutation DeleteTopicVote(
    $input: DeleteTopicVoteInput!
    $condition: ModelTopicVoteConditionInput
  ) {
    deleteTopicVote(input: $input, condition: $condition) {
      id
      topicId
      vote
      createdAt
      updatedAt
      owner
    }
  }
`;

const createCommentVote = /* GraphQL */ `
  mutation CreateCommentVote(
    $input: CreateCommentVoteInput!
    $condition: ModelCommentVoteConditionInput
  ) {
    createCommentVote(input: $input, condition: $condition) {
      id
      owner
      commentId
      vote
      createdAt
      updatedAt
    }
  }
`;

const updateCommentVote = /* GraphQL */ `
  mutation UpdateCommentVote(
    $input: UpdateCommentVoteInput!
    $condition: ModelCommentVoteConditionInput
  ) {
    updateCommentVote(input: $input, condition: $condition) {
      id
      owner
      commentId
      vote
      createdAt
      updatedAt
    }
  }
`;

const deleteCommentVote = /* GraphQL */ `
  mutation DeleteCommentVote(
    $input: DeleteCommentVoteInput!
    $condition: ModelCommentVoteConditionInput
  ) {
    deleteCommentVote(input: $input, condition: $condition) {
      id
      owner
      commentId
      vote
      createdAt
      updatedAt
    }
  }
`;

module.exports = {
  createTopicVote,
  updateTopicVote,
  deleteTopicVote,
  createCommentVote,
  updateCommentVote,
  deleteCommentVote,
};
