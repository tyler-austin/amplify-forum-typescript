const { scanTable, getVotesByTopicIdAndOwner, getVotesByCommentIdAndOwner } = require('/opt/dynamoDB');

const topicVoteTable = process.env.API_AMPLIFYFORUM_TOPICVOTETABLE_NAME;
const commentVoteTable = process.env.API_AMPLIFYFORUM_COMMENTVOTETABLE_NAME;

const getCurrentVote = (votes) => {
  if (votes.length === 1) {
    return votes[0].vote;
  } else {
    return null;
  }
};

const resolvers = {
  Topic: {
    currentVote: async ctx => {
      const { identity: { username }, source: { id } } = ctx;
      try {
        const { Items: votes } = await getVotesByTopicIdAndOwner(topicVoteTable, id, username);
        return getCurrentVote(votes);
      } catch (err) {
        return { error: err };
      }
    },
  },
  Comment: {
    currentVote: async ctx => {
      const { identity: { username }, source: { id } } = ctx;
      try {
        const { Items: votes } = await getVotesByCommentIdAndOwner(commentVoteTable, id, username);
        return getCurrentVote(votes);
      } catch (err) {
        return { error: err };
      }
    },
  },
};

module.exports = resolvers;
