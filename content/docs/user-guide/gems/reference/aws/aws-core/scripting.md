---
linktitle: Scripting
title: AWS Core Scripting
description: Examples of using the AWS Core Gem with Script Canvas in Open 3D Engine (O3DE).
weight: 400
toc: true
---

{{< preview-new >}}

This topic demonstrates the Script Canvas nodes that the AWS Core Gem defines.

## Amazon S3

### GetObject

Input data pins:

* Bucket Resource KeyName
* Object KeyName
* Outfile Name

Get a success message from the **OnSuccess** handler. The file downloads to the location specified as the output file name.

Get an error message from the **OnError** handler.

![Scripting AWS S3 GetObject node](/images/user-guide/gems/reference/aws/aws-core/scripting-s3-get-object.png)

### HeadObject

Input data pins:

* Bucket Resource KeyName
* Object KeyName

Get a success message from the **OnSuccess** handler.

Get an error message from the **OnError** handler.

![Scripting AWS S3 HeadObject node](/images/user-guide/gems/reference/aws/aws-core/scripting-s3-head-object.png)

## Amazon DynamoDB

### GetItem

Input data pins:

* Table Resource KeyName
* Key Map

Key map variable format:

![GetItem - Key variable properties](/images/user-guide/gems/reference/aws/aws-core/scripting-dynamodb-get-item-key-variable.png)

Refer to [AttributeValue](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html) in the Amazon DynamoDB API Reference.

Get a result in the `AttributeValue` map from the **OnSuccess** handler.

Get an error message from the **OnError** handler.

![Scripting AWS DynamoDB GetItem node](/images/user-guide/gems/reference/aws/aws-core/scripting-dynamodb-get-item.png)

## AWS Lambda

### Invoke

Input data pins:

* Function Resource KeyName
* Payload

Get the function return value from the **OnSuccess** handler.

Get an error message from the **OnError** handler.

![Scripting AWS Lambda Invoke node](/images/user-guide/gems/reference/aws/aws-core/scripting-lambda-invoke.png)
