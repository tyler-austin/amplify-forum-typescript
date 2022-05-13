const { scanTable } = require('/opt/dynamoDB');

const topicVoteTable = process.env.API_AMPLIFYFORUM_TOPICVOTETABLE_NAME;
const commentVoteTable = process.env.API_AMPLIFYFORUM_COMMENTVOTETABLE_NAME;

const getCount = async (tableName, key, value) => {
  const { Items: votes } = await scanTable(tableName, key, value);
  const { up, down } = votes.reduce((acc, vote) => {
    if (vote.vote === 'up') {
      acc.up += 1
    } else {
      acc.down += 1
    }
    return acc;
  }, { up: 0, down: 0 });
  return up - down;
};

const resolvers = {
  Topic: {
    voteCount: async ctx => {
      try {
        const key = 'topicId';
        const value = ctx.source.id;
        return await getCount(topicVoteTable, key, value);
      } catch (err) {
        return { error: err };
      }
    },
  },
  Comment: {
    voteCount: async ctx => {
      try {
        const key = 'commentId';
        const value = ctx.source.id;
        return await getCount(commentVoteTable, key, value);
      } catch (err) {
        return { error: err };
      }
    },
  },
};

module.exports = resolvers;
