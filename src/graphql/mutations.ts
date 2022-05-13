/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const upVoteTopic = /* GraphQL */ `
  mutation UpVoteTopic($topicId: String) {
    upVoteTopic(topicId: $topicId) {
      id
      owner
      topicId
      topic {
        id
        title
        content
        createdAt
        commentCount
        voteCount
        currentVote
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const downVoteTopic = /* GraphQL */ `
  mutation DownVoteTopic($topicId: String) {
    downVoteTopic(topicId: $topicId) {
      id
      owner
      topicId
      topic {
        id
        title
        content
        createdAt
        commentCount
        voteCount
        currentVote
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const removeVoteTopic = /* GraphQL */ `
  mutation RemoveVoteTopic($topicId: String) {
    removeVoteTopic(topicId: $topicId) {
      id
      owner
      topicId
      topic {
        id
        title
        content
        createdAt
        commentCount
        voteCount
        currentVote
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const upVoteComment = /* GraphQL */ `
  mutation UpVoteComment($commentId: String) {
    upVoteComment(commentId: $commentId) {
      id
      owner
      commentId
      comment {
        id
        topicId
        content
        voteCount
        currentVote
        createdAt
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const downVoteComment = /* GraphQL */ `
  mutation DownVoteComment($commentId: String) {
    downVoteComment(commentId: $commentId) {
      id
      owner
      commentId
      comment {
        id
        topicId
        content
        voteCount
        currentVote
        createdAt
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const removeVoteComment = /* GraphQL */ `
  mutation RemoveVoteComment($commentId: String) {
    removeVoteComment(commentId: $commentId) {
      id
      owner
      commentId
      comment {
        id
        topicId
        content
        voteCount
        currentVote
        createdAt
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const createTopic = /* GraphQL */ `
  mutation CreateTopic(
    $input: CreateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    createTopic(input: $input, condition: $condition) {
      id
      title
      content
      createdAt
      comments {
        nextToken
      }
      commentCount
      votes {
        nextToken
      }
      voteCount
      currentVote
      updatedAt
      owner
    }
  }
`;
export const updateTopic = /* GraphQL */ `
  mutation UpdateTopic(
    $input: UpdateTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    updateTopic(input: $input, condition: $condition) {
      id
      title
      content
      createdAt
      comments {
        nextToken
      }
      commentCount
      votes {
        nextToken
      }
      voteCount
      currentVote
      updatedAt
      owner
    }
  }
`;
export const deleteTopic = /* GraphQL */ `
  mutation DeleteTopic(
    $input: DeleteTopicInput!
    $condition: ModelTopicConditionInput
  ) {
    deleteTopic(input: $input, condition: $condition) {
      id
      title
      content
      createdAt
      comments {
        nextToken
      }
      commentCount
      votes {
        nextToken
      }
      voteCount
      currentVote
      updatedAt
      owner
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      topicId
      topic {
        id
        title
        content
        createdAt
        commentCount
        voteCount
        currentVote
        updatedAt
        owner
      }
      content
      votes {
        nextToken
      }
      voteCount
      currentVote
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      topicId
      topic {
        id
        title
        content
        createdAt
        commentCount
        voteCount
        currentVote
        updatedAt
        owner
      }
      content
      votes {
        nextToken
      }
      voteCount
      currentVote
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      topicId
      topic {
        id
        title
        content
        createdAt
        commentCount
        voteCount
        currentVote
        updatedAt
        owner
      }
      content
      votes {
        nextToken
      }
      voteCount
      currentVote
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createTopicVote = /* GraphQL */ `
  mutation CreateTopicVote(
    $input: CreateTopicVoteInput!
    $condition: ModelTopicVoteConditionInput
  ) {
    createTopicVote(input: $input, condition: $condition) {
      id
      owner
      topicId
      topic {
        id
        title
        content
        createdAt
        commentCount
        voteCount
        currentVote
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const updateTopicVote = /* GraphQL */ `
  mutation UpdateTopicVote(
    $input: UpdateTopicVoteInput!
    $condition: ModelTopicVoteConditionInput
  ) {
    updateTopicVote(input: $input, condition: $condition) {
      id
      owner
      topicId
      topic {
        id
        title
        content
        createdAt
        commentCount
        voteCount
        currentVote
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const deleteTopicVote = /* GraphQL */ `
  mutation DeleteTopicVote(
    $input: DeleteTopicVoteInput!
    $condition: ModelTopicVoteConditionInput
  ) {
    deleteTopicVote(input: $input, condition: $condition) {
      id
      owner
      topicId
      topic {
        id
        title
        content
        createdAt
        commentCount
        voteCount
        currentVote
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const createCommentVote = /* GraphQL */ `
  mutation CreateCommentVote(
    $input: CreateCommentVoteInput!
    $condition: ModelCommentVoteConditionInput
  ) {
    createCommentVote(input: $input, condition: $condition) {
      id
      owner
      commentId
      comment {
        id
        topicId
        content
        voteCount
        currentVote
        createdAt
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const updateCommentVote = /* GraphQL */ `
  mutation UpdateCommentVote(
    $input: UpdateCommentVoteInput!
    $condition: ModelCommentVoteConditionInput
  ) {
    updateCommentVote(input: $input, condition: $condition) {
      id
      owner
      commentId
      comment {
        id
        topicId
        content
        voteCount
        currentVote
        createdAt
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
export const deleteCommentVote = /* GraphQL */ `
  mutation DeleteCommentVote(
    $input: DeleteCommentVoteInput!
    $condition: ModelCommentVoteConditionInput
  ) {
    deleteCommentVote(input: $input, condition: $condition) {
      id
      owner
      commentId
      comment {
        id
        topicId
        content
        voteCount
        currentVote
        createdAt
        updatedAt
        owner
      }
      vote
      createdAt
      updatedAt
    }
  }
`;
