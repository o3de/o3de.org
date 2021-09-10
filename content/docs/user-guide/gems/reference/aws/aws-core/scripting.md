---
linktitle: Scripting
title: AWS Core Scripting
description: Examples of using the AWS Core Gem with Script Canvas in Open 3D Engine (O3DE).
weight: 400
toc: true
---

This topic demonstrates the Script Canvas nodes that the AWS Core Gem defines.

## Amazon S3

### GetObject

Input data pins:

* Bucket Resource KeyName
* Object KeyName
* Outfile Name

If the function is successful, you will get a success message from the **OnGetObjectSuccess** event handler on the **AWSS3BehaviorNotificationBus** bus. The file downloads to the location specified as the Outfile Name.

If the function results in an error, you will get an error message from the **OnGetObjectError** event handler on the **AWSS3BehaviorNotificationBus** bus.

![Scripting AWS S3 GetObject node](/images/user-guide/gems/reference/aws/aws-core/scripting-s3-get-object.png)

### HeadObject

Input data pins:

* Bucket Resource KeyName
* Object KeyName

If the function is successful, you will get a success message from the **OnHeadObjectSuccess** event handler on the **AWSS3BehaviorNotificationBus** bus.

If the function results in an error, you will get an error message from the **OnHeadObjectError** event handler on the **AWSS3BehaviorNotificationBus** bus.

![Scripting AWS S3 HeadObject node](/images/user-guide/gems/reference/aws/aws-core/scripting-s3-head-object.png)

## Amazon DynamoDB

### GetItem

Input data pins:

* Table Resource KeyName
* Key Map

Key map variable format:

![GetItem - Key variable properties](/images/user-guide/gems/reference/aws/aws-core/scripting-dynamodb-get-item-key-variable.png)

Refer to [AttributeValue](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html) in the Amazon DynamoDB API Reference.

If the function is successful, you will get a result in the `AttributeValue` string map from the **OnGetItemSuccess** event handler on the **AWSDynamoDBBehaviorNotificationBus** bus.

If the function results in an error, you will get an error message from the **OnGetItemError** event handler on the **AWSDynamoDBBehaviorNotificationBus** bus.

![Scripting AWS DynamoDB GetItem node](/images/user-guide/gems/reference/aws/aws-core/scripting-dynamodb-get-item.png)

## AWS Lambda

### Invoke

Input data pins:

* Function Resource KeyName
* Payload

If the function is successful, you will get the return value from the **OnInvokeSuccess** event handler on the **AWSLambdaBehaviorNotificationBus** bus.

If the function results in an error, you will get an error message from the **OnInvokeError** event handler on the **AWSLambdaBehaviorNotificationBus** bus.

![Scripting AWS Lambda Invoke node](/images/user-guide/gems/reference/aws/aws-core/scripting-lambda-invoke.png)
