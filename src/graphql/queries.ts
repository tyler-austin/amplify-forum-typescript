/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTopic = /* GraphQL */ `
  query GetTopic($id: ID!) {
    getTopic(id: $id) {
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
export const listTopics = /* GraphQL */ `
  query ListTopics(
    $filter: ModelTopicFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        topicId
        content
        voteCount
        currentVote
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTopicVote = /* GraphQL */ `
  query GetTopicVote($id: ID!) {
    getTopicVote(id: $id) {
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
export const listTopicVotes = /* GraphQL */ `
  query ListTopicVotes(
    $filter: ModelTopicVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTopicVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        topicId
        vote
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommentVote = /* GraphQL */ `
  query GetCommentVote($id: ID!) {
    getCommentVote(id: $id) {
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
export const listCommentVotes = /* GraphQL */ `
  query ListCommentVotes(
    $filter: ModelCommentVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        commentId
        vote
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
