const AWS = require('aws-sdk');
const https = require('https');
const urlParse = require("url").URL;

const apiRequest = (query, operationName, variables, appsyncUrl, region, apiKey) => new Promise((resolve, reject) => {
  const endpoint = new urlParse(appsyncUrl).hostname.toString();
  const apiRequest = new AWS.HttpRequest(appsyncUrl, region);
  apiRequest.method = "POST";
  apiRequest.path = "/graphql";
  apiRequest.headers.host = endpoint;
  apiRequest.headers["Content-Type"] = "application/json";
  apiRequest.body = JSON.stringify({
    query: query,
    operationName: operationName,
    variables: variables
  });

  const signer = new AWS.Signers.V4(apiRequest, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  const httpsRequest = https.request({ ...apiRequest, host: endpoint }, result => {
    result.on('data', data => {
      console.log('API REQUEST:', JSON.parse(data.toString()))
      resolve(JSON.parse(data.toString()));
    });
  });

  httpsRequest.on('error', error => {
    console.error('API ERROR:', error.message)
    reject(error);
  });

  httpsRequest.write(apiRequest.body);
  httpsRequest.end();

});

module.exports = apiRequest;
