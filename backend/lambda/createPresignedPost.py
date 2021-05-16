import logging
import boto3
import json
from botocore.exceptions import ClientError


def lambda_handler(event, context):
    print(event)
    bucket_name = json.loads(event["body"])["bucket_name"]
    object_name = json.loads(event["body"])["object_name"]
    fields=None
    conditions=None
    expiration=3600
    """Generate a presigned URL S3 POST request to upload a file

    :param bucket_name: string
    :param object_name: string
    :param fields: Dictionary of prefilled form fields
    :param conditions: List of conditions to include in the policy
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Dictionary with the following keys:
        url: URL to post to
        fields: Dictionary of form fields and values to submit with the POST
    :return: None if error.
    """

    # Generate a presigned S3 POST URL
    s3_client = boto3.client('s3')
    statusCode = 200
    result = {}
    try:
        response = s3_client.generate_presigned_url('put_object',Params={"Bucket": bucket_name,"Key": object_name},ExpiresIn=3600)
        result['status'] = "success"
        result['url'] =  response
    except ClientError as e:
        statusCode = 400
        result['status'] = 'error'
        result['error'] = str(e)
        print(e)
        return None
    print(response)
    # The response contains the presigned URL and required fields
    return {
        "statusCode": statusCode,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        },
        "body": json.dumps(result)
    }
    