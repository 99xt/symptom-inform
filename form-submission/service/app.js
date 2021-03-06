'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const devConfig = require('./development/config')
devConfig.init(AWS);

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.lambdaHandler = async (event) => {

    try {

        var params = {
            TableName: tableName,
            Item: {
                Id: uuid.v4(),
                CreatedAt: (new Date().getTime()).toString(),
                FormData: JSON.parse(event.body)
            }
        }

        await dynamoDb.put(params).promise();

        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'success'
            })
        };

    } catch (err) {
        return err;
    }

};
