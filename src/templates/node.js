export default `'use strict';

const AWS = require('aws-sdk');

async function handler(event) {
  //
  // TODO: implement business logic
  //
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: 'Success' })
  };
}

module.exports = handler;
`