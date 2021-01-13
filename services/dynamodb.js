const AWS = require('aws-sdk');

let options;
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
} else { options = {} }
const dbclient = new AWS.DynamoDB.DocumentClient(options);
module.exports = dbclient;