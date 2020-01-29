export default `import boto3
import json

def endpoint(event, context):
    #
    # TODO: add business logic here
    #
    return create_json_response(200, { "message": "Success" })

def create_json_response(code, body = {}, headers = {}):
    original_headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    }
    original_headers.update(headers)
    return {
        "statusCode": code,
        "headers": original_headers,
        "body": json.dumps(body)
    }
`;
