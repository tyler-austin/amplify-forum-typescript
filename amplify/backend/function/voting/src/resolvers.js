const apiRequest = require('/opt/graphQL');
const {
  createTopicVote,
  updateTopicVote,
  deleteTopicVote,
  createCommentVote,
  updateCommentVote,
  deleteCommentVote,
} = require('/opt/mutations');
const { getVotesByTopicIdAndOwner, getVotesByCommentIdAndOwner } = require('/opt/dynamoDB');

const appsyncUrl = process.env.API_AMPLIFYFORUM_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const topicVoteTable = process.env.API_AMPLIFYFORUM_TOPICVOTETABLE_NAME;
const commentVoteTable = process.env.API_AMPLIFYFORUM_COMMENTVOTETABLE_NAME;

class ValidationException extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationException";
  }
}

const topicAddVote = async (owner, topicId, vote) => {
  const variables = { input: { owner, topicId, vote } };
  const { data } = await apiRequest(createTopicVote, 'CreateTopicVote', variables, appsyncUrl, region);
  return data.createTopicVote;
};

const topicDeleteVote = async (id) => {
  const variables = { input: { id } };
  const { data } = await apiRequest(deleteTopicVote, 'DeleteTopicVote', variables, appsyncUrl, region);
  return data.deleteTopicVote;
};

const topicUpdateVote = async (id, vote) => {
  const variables = { input: { id, vote } };
  const { data } = await apiRequest(updateTopicVote, 'UpdateTopicVote', variables, appsyncUrl, region);
  return data.updateTopicVote;
};

const commentAddVote = async (owner, commentId, vote) => {
  const variables = { input: { owner, commentId, vote } };
  const { data } = await apiRequest(createCommentVote, 'CreateCommentVote', variables, appsyncUrl, region);
  return data.createCommentVote;
};

const commentDeleteVote = async (id) => {
  const variables = { input: { id } };
  const { data } = await apiRequest(deleteCommentVote, 'DeleteCommentVote', variables, appsyncUrl, region);
  return data.deleteCommentVote;
};

const commentUpdateVote = async (id, vote) => {
  const variables = { input: { id, vote } };
  const { data } = await apiRequest(updateCommentVote, 'UpdateCommentVote', variables, appsyncUrl, region);
  return data.updateCommentVote;
};

const resolvers = {
  Mutation: {
    upVoteTopic: async ctx => {
      const { arguments, identity: { username } } = ctx;
      try {
        const args = JSON.parse(JSON.stringify(arguments));
        Object.keys(args).forEach(key => args[key] === null && delete args[key]);
        const { topicId } = args;
        const { Items: votes, Count: numVotes } = await getVotesByTopicIdAndOwner(topicVoteTable, topicId, username);
        console.log('votes:', votes);
        const downVotes = votes.filter((vote) => vote.vote === 'down');
        console.log('downVotes:', downVotes);
        if (numVotes === 0) {
          return await topicAddVote(username, topicId, 'up');
        } else if (downVotes.length === 1) {
          const downVote = downVotes[0];
          return await topicUpdateVote(downVote.id, 'up');
        } else {
          throw new ValidationException("Only one vote per a topic is allowed");
        }
      } catch (err) {
        throw (err);
      }
    },
    downVoteTopic: async ctx => {
      const { arguments, identity: { username } } = ctx;
      try {
        const args = JSON.parse(JSON.stringify(arguments));
        Object.keys(args).forEach(key => args[key] === null && delete args[key]);
        const { topicId } = args;
        const { Items: votes, Count: numVotes } = await getVotesByTopicIdAndOwner(topicVoteTable, topicId, username);
        console.log('votes:', votes);
        const upVotes = votes.filter((vote) => vote.vote === 'up');
        console.log('upVotes:', upVotes);
        if (numVotes === 0) {
          return await topicAddVote(username, topicId, 'down');
        } else if (upVotes.length === 1) {
          const upVote = upVotes[0];
          return await topicUpdateVote(upVote.id, 'down');
        } else {
          throw new ValidationException("Only one vote per a topic is allowed");
        }
      } catch (err) {
        throw (err);
      }
    },
    removeVoteTopic: async ctx => {
      const { arguments, identity: { username } } = ctx;
      try {
        const args = JSON.parse(JSON.stringify(arguments));
        Object.keys(args).forEach(key => args[key] === null && delete args[key]);
        const { topicId } = args;
        const { Items: votes, Count: numVotes } = await getVotesByTopicIdAndOwner(topicVoteTable, topicId, username);
        console.log('votes:', votes);
        if (numVotes === 1) {
          const vote = votes[0];
          return await topicDeleteVote(vote.id);
        } else {
          throw new ValidationException("No vote found to remove");
        }
      } catch (err) {
        throw (err);
      }
    },
    upVoteComment: async ctx => {
      const { arguments, identity: { username } } = ctx;
      try {
        const args = JSON.parse(JSON.stringify(arguments));
        Object.keys(args).forEach(key => args[key] === null && delete args[key]);
        const { commentId } = args;
        const { Items: votes, Count: numVotes } = await getVotesByCommentIdAndOwner(commentVoteTable, commentId, username);
        console.log('votes:', votes);
        const downVotes = votes.filter((vote) => vote.vote === 'down');
        console.log('downVotes:', downVotes);
        if (numVotes === 0) {
          return await commentAddVote(username, commentId, 'up');
        } else if (downVotes.length === 1) {
          const downVote = downVotes[0];
          return await commentUpdateVote(downVote.id, 'up');
        } else {
          throw new ValidationException("Only one vote per a comment is allowed");
        }
      } catch (err) {
        throw (err);
      }
    },
    downVoteComment: async ctx => {
      const { arguments, identity: { username } } = ctx;
      try {
        const args = JSON.parse(JSON.stringify(arguments));
        Object.keys(args).forEach(key => args[key] === null && delete args[key]);
        const { commentId } = args;
        const { Items: votes, Count: numVotes } = await getVotesByCommentIdAndOwner(commentVoteTable, commentId, username);
        console.log('votes:', votes);
        const upVotes = votes.filter((vote) => vote.vote === 'up');
        console.log('upVotes:', upVotes);
        if (numVotes === 0) {
          return await commentAddVote(username, commentId, 'down');
        } else if (upVotes.length === 1) {
          const upVote = upVotes[0];
          return await commentUpdateVote(upVote.id, 'down');
        } else {
          throw new ValidationException("Only one vote per a comment is allowed");
        }
      } catch (err) {
        throw (err);
      }
    },
    removeVoteComment: async ctx => {
      const { arguments, identity: { username } } = ctx;
      try {
        const args = JSON.parse(JSON.stringify(arguments));
        Object.keys(args).forEach(key => args[key] === null && delete args[key]);
        const { commentId } = args;
        const { Items: votes, Count: numVotes } = await getVotesByCommentIdAndOwner(commentVoteTable, commentId, username);
        console.log('votes:', votes);
        if (numVotes === 1) {
          const vote = votes[0];
          return await commentDeleteVote(vote.id);
        } else {
          throw new ValidationException("No vote found to remove");
        }
      } catch (err) {
        throw (err);
      }
    }
  }
}

module.exports = resolvers;
