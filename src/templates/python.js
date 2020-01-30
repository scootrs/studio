export default `import boto3
from botocore.exceptions import ClientError
import json
import decimal

def endpoint(event, context):
    #
    # TODO: add business logic here
    #
    return create_json_response(200, { "message": "Success" })

class CustomJsonEncoder(json.JSONEncoder):
    """
    This is a custom class that allows the \`json\` library to encode decimal types without
    throwing an error. The encoder is used in the \`create_json_response\` method below.
    """
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return str(obj)
        # Let the base class default method raise the TypeError
        return json.JSONEncoder.default(self, obj)

def create_json_response(code, body = {}, headers = {}):
    """
    Creates the AWS Lambda response necessary for responding to API Gateway events when
    the response body is formatted as JSON.
    """
    original_headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    }
    original_headers.update(headers)
    return {
        "statusCode": code,
        "headers": original_headers,
        "body": json.dumps(body, cls=CustomJsonEncoder)
    }
`;
