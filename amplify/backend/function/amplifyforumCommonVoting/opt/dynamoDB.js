const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const scanTable = async (tableName, key, value) => {
  var params = {
    TableName: `${tableName}`,
    FilterExpression: '#key = :value', // optional
    ExpressionAttributeNames: { '#key': `${key}` }, // optional
    ExpressionAttributeValues: { ':value': `${value}` }, // optional
  }
  console.log('params:', params);
  try {
    return await docClient.scan(params).promise()
  } catch (err) {
    return err
  }
};

const getVotesByTopicIdAndOwner = async (tableName, topicId, owner) => {
  var params = {
    TableName: `${tableName}`,
    FilterExpression: '#topicId = :topicId AND #owner = :owner',
    ExpressionAttributeNames: {
      '#topicId': `topicId`,
      '#owner': `owner`
    },
    ExpressionAttributeValues: {
      ':topicId': `${topicId}`,
      ':owner': `${owner}`
    },
  }
  console.log('params:', params);
  try {
    return await docClient.scan(params).promise()
  } catch (err) {
    return err
  }
};

const getVotesByCommentIdAndOwner = async (tableName, commentId, owner) => {
  var params = {
    TableName: `${tableName}`,
    FilterExpression: '#commentId = :commentId AND #owner = :owner',
    ExpressionAttributeNames: {
      '#commentId': `commentId`,
      '#owner': `owner`
    },
    ExpressionAttributeValues: {
      ':commentId': `${commentId}`,
      ':owner': `${owner}`
    },
  }
  console.log('params:', params);
  try {
    return await docClient.scan(params).promise()
  } catch (err) {
    return err
  }
};

module.exports = { scanTable, getVotesByTopicIdAndOwner, getVotesByCommentIdAndOwner };
