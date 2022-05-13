export const listTopicsWithComments = /* GraphQL */ `
  query ListTopicsWithComments($filter: ModelTopicFilterInput, $limit: Int, $nextToken: String) {
    listTopics(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

export const getTopicWithComments = /* GraphQL */ `
  query GetTopicWithComments($id: ID!) {
    getTopic(id: $id) {
      id
      owner
      title
      content
      createdAt
      updatedAt
      comments {
        items {
          id
          owner
          content
          createdAt
          updatedAt
          voteCount
          currentVote
        }
        nextToken
      }
      commentCount
      voteCount
      currentVote
    }
  }
`;
