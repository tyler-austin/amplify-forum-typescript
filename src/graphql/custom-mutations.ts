export const createTopicWithComments = /* GraphQL */ `
  mutation CreateTopicWithComments($input: CreateTopicInput!, $condition: ModelTopicConditionInput) {
    createTopic(input: $input, condition: $condition) {
      id
      owner
      title
      content
      createdAt
      updatedAt
      commentCount
      voteCount
      currentVote
    }
  }
`;
export const updateTopicWithComments = /* GraphQL */ `
  mutation UpdateTopicWithComments($input: UpdateTopicInput!, $condition: ModelTopicConditionInput) {
    updateTopic(input: $input, condition: $condition) {
      id
      owner
      title
      content
      createdAt
      updatedAt
      commentCount
      voteCount
      currentVote
    }
  }
`;

export const upVoteTopic = /* GraphQL */ `
  mutation TopicUpVote($topicId: String) {
    upVoteTopic(topicId: $topicId) {
      id
      owner
      topicId
      vote
      createdAt
      updatedAt
    }
  }
`;
export const downVoteTopic = /* GraphQL */ `
  mutation TopicDownVote($topicId: String) {
    downVoteTopic(topicId: $topicId) {
      id
      owner
      topicId
      vote
      createdAt
      updatedAt
    }
  }
`;
export const removeVoteTopic = /* GraphQL */ `
  mutation TopicRemoveVote($topicId: String) {
    removeVoteTopic(topicId: $topicId) {
      id
      owner
      topicId
      vote
      createdAt
      updatedAt
    }
  }
`;
export const upVoteComment = /* GraphQL */ `
  mutation CommentUpVote($commentId: String) {
    upVoteComment(commentId: $commentId) {
      id
      owner
      commentId
      vote
      createdAt
      updatedAt
    }
  }
`;
export const downVoteComment = /* GraphQL */ `
  mutation CommentDownVote($commentId: String) {
    downVoteComment(commentId: $commentId) {
      id
      owner
      commentId
      vote
      createdAt
      updatedAt
    }
  }
`;
export const removeVoteComment = /* GraphQL */ `
  mutation CommentRemoveVote($commentId: String) {
    removeVoteComment(commentId: $commentId) {
      id
      owner
      commentId
      vote
      createdAt
      updatedAt
    }
  }
`;
