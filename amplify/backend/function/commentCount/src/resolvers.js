const { scanTable } = require('/opt/dynamoDB');

const commentTable = process.env.API_AMPLIFYFORUM_COMMENTTABLE_NAME;

const resolvers = {
  Topic: {
    commentCount: async ctx => {
      try {
        const key = 'topicId';
        const value = ctx.source.id;
        const { Items, Count } = await scanTable(commentTable, key, value);
        return Count;
      } catch (err) {
        return { error: err };
      }
    },
  },
};

module.exports = resolvers;
