/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic($owner: String) {
    onCreateTopic(owner: $owner) {
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
export const onUpdateTopic = /* GraphQL */ `
  subscription OnUpdateTopic($owner: String) {
    onUpdateTopic(owner: $owner) {
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
export const onDeleteTopic = /* GraphQL */ `
  subscription OnDeleteTopic($owner: String) {
    onDeleteTopic(owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String) {
    onCreateComment(owner: $owner) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String) {
    onUpdateComment(owner: $owner) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String) {
    onDeleteComment(owner: $owner) {
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
export const onCreateTopicVote = /* GraphQL */ `
  subscription OnCreateTopicVote($owner: String) {
    onCreateTopicVote(owner: $owner) {
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
export const onUpdateTopicVote = /* GraphQL */ `
  subscription OnUpdateTopicVote($owner: String) {
    onUpdateTopicVote(owner: $owner) {
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
export const onDeleteTopicVote = /* GraphQL */ `
  subscription OnDeleteTopicVote($owner: String) {
    onDeleteTopicVote(owner: $owner) {
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
export const onCreateCommentVote = /* GraphQL */ `
  subscription OnCreateCommentVote($owner: String) {
    onCreateCommentVote(owner: $owner) {
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
export const onUpdateCommentVote = /* GraphQL */ `
  subscription OnUpdateCommentVote($owner: String) {
    onUpdateCommentVote(owner: $owner) {
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
export const onDeleteCommentVote = /* GraphQL */ `
  subscription OnDeleteCommentVote($owner: String) {
    onDeleteCommentVote(owner: $owner) {
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
