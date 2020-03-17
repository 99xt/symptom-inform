# Symptom Inform Platform
This repository contains a sample application to submit medical symptoms

## Form Handler
![Highlevel-Design](docs/form-submit-flow.jpeg?raw=true "Highlevel Design")

This module contians the form submission data
1. Guidelines to create HTML https://izifortune.com/serverless-website-sam-aws/
2. Guidelines to create a HTTP endpoint and need to add it to same CloudFront distribution as above 
https://aws.amazon.com/blogs/compute/working-with-aws-lambda-and-lambda-layers-in-aws-sam/
3. Current submit api implements a GET method, modify it to work for POST.

## Deploying Frontend Code
You can use the following command (Inside Frontend Folder) to deploy the latest frontend changes to S3 bucket
aws s3 sync . s3://mybucketname

Clear the cache
aws cloudfront create-invalidation \
    --distribution-id EDFDVBD6EXAMPLE \
    --paths "/*"

## Deploying Backend Code
You can use the AWS SAM commands to build and deploy the API
e.g
sam deploy --parameter-overrides APIBasePath=api AppEnv=Dev

## Running dynamodb locally
Dynamodb locally is powered by the following NPM library, if you encounter any issues refer its documentation.
https://www.npmjs.com/package/dynamodb-localhost

Go to form-submissions/service and execute the following
npm run dynamodb

To view all the tables use following command in CLI
aws dynamodb list-tables --endpoint-url http://localhost:8000 --region us-west-1

View table data
 aws dynamodb scan --table-name Local_Form_Data --endpoint-url http://localhost:8000 --region us-west-1


