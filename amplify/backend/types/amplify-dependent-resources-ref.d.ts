export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "amplifyforum903eb6d0": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "AmplfiyForumUserPoolGroupGroupRole": "string"
        }
    },
    "api": {
        "amplifyforum": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "analytics": {
        "amplifyforum": {
            "Region": "string",
            "Id": "string",
            "appName": "string"
        }
    },
    "function": {
        "amplifyforumCommonVoting": {
            "Arn": "string"
        },
        "voting": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "currentVote": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "voteCount": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "commentCount": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}