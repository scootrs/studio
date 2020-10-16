export default `'use strict';

const AWS = require('aws-sdk');

async function handler(event) {
    //
    // TODO: implement business logic
    //
    return createJsonResponse(200, { message: 'Success' });
}

function createJsonResponse(code, body = {}, headers = {}) {
    return {
        statusCode: code,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            ...headers
        },
        body: JSON.stringify(body)
    };
}

module.exports = handler;
`;
