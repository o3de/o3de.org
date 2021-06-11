---
linktitle: Scripting with AWS Core
title: AWS Core Scripting
description: See examples of how to use the AWS Core Gem with Script Canvas in Open 3D Engine.
weight: 400
toc: true
---

{{< preview-new >}}

This page demonstrates Script Canvas nodes defined by the AWS Core Gem.

## AWS S3

### GetObject

Input data pins:

* Bucket name
* Object name
* Output filename

Get success message from **OnSuccess** handler. File is downloaded to the location specifed by the output filename.

Get error message from **OnError** handler.

![Scripting AWS S3 GetObject node](/images/user-guide/gems/reference/aws/aws-core/scripting-s3-get-object.png)

### HeadObject

Input data pins:

* Bucket name
* Object name

Get success message from **OnSuccess** handler.

Get error message from **OnError** handler.

![Scripting AWS S3 HeadObject node](/images/user-guide/gems/reference/aws/aws-core/scripting-s3-head-object.png)

## AWS DynamoDB

### GetItem

Input data pins:

* Table name
* Key

Key map variable format:

![GetItem - Key variable properties](/images/user-guide/gems/reference/aws/aws-core/scripting-dynamodb-get-item-key-variable.png)

See [https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html).

Get result in `AttributeValue` map from **OnSuccess** handler.

Get error message from **OnError** handler.

![Scripting AWS DynamoDB GetItem node](/images/user-guide/gems/reference/aws/aws-core/scripting-dynamodb-get-item.png)

## AWS Lambda

### Invoke

Input data pins:

* Function name
* Function payload

Get function return value from **OnSuccess** handler.

Get error message from **OnError** handler.

![Scripting AWS Lambda Invoke node](/images/user-guide/gems/reference/aws/aws-core/scripting-lambda-invoke.png)
