/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCommentByTopicId = /* GraphQL */ `
  subscription OnCreateCommentByTopicId($topicId: String!) {
    onCreateCommentByTopicId(topicId: $topicId) {
      id
      topicId
      content
      topic {
        id
        title
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCommentByTopicId = /* GraphQL */ `
  subscription OnDeleteCommentByTopicId($topicId: String!) {
    onDeleteCommentByTopicId(topicId: $topicId) {
      id
      topicId
      content
      topic {
        id
        title
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic($owner: String) {
    onCreateTopic(owner: $owner) {
      id
      title
      comments {
        items {
          id
          topicId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
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
      comments {
        items {
          id
          topicId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
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
      comments {
        items {
          id
          topicId
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
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
      content
      topic {
        id
        title
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
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
      content
      topic {
        id
        title
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
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
      content
      topic {
        id
        title
        comments {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
