/* Amplify Params - DO NOT EDIT
	API_AMPLIFYFORUM_COMMENTTABLE_ARN
	API_AMPLIFYFORUM_COMMENTTABLE_NAME
	API_AMPLIFYFORUM_COMMENTVOTETABLE_ARN
	API_AMPLIFYFORUM_COMMENTVOTETABLE_NAME
	API_AMPLIFYFORUM_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYFORUM_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYFORUM_GRAPHQLAPIKEYOUTPUT
	API_AMPLIFYFORUM_TOPICTABLE_ARN
	API_AMPLIFYFORUM_TOPICTABLE_NAME
	API_AMPLIFYFORUM_TOPICVOTETABLE_ARN
	API_AMPLIFYFORUM_TOPICVOTETABLE_NAME
	AUTH_AMPLIFYFORUM903EB6D0_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const resolvers = require('./resolvers');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log('event:', JSON.stringify(event));
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
