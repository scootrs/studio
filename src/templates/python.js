export default `import boto3
import json

def endpoint(event, context):
    #
    # TODO: add business logic here
    #
    response = {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Success!"
        })
    }

    return response
`;