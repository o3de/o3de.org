# Using the AWS Script Behaviors Cloud Gem<a name="cloud-canvas-cloud-gem-aws-script-behavior-intro"></a>

You can use the AWS Script Behaviors cloud gem in Amazon Lumberyard to implement some common AWS behaviors for your game\. To implement these behaviors, you can use Script Canvas or Lua script\. These behaviors include decoding URLs, performing HTTP GET operations, transferring files to and from Amazon S3, and invoking AWS Lambda functions\. For programmatic information regarding the AWS Script Behaviors cloud gem, see [AWS Behavior Context Reflections](cloud-canvas-cgf-aws-behavior-context-reflections.md)\.

## Prerequisites<a name="cloud-canvas-cloud-gem-aws-script-behavior-intro-prerequisites"></a>

To use the features of this cloud gem, perform the following steps\.

1. Enable **Cloud Gem AWS Script Behaviors** in Project Configurator\. The examples in this section use the **CloudGemSamples** project, which you can also enable in Project Configurator\. The AWS Script Behaviors cloud gem is enabled in the **CloudGemSamples** project by default\.

1. Open the Cloud Canvas Resource Manager and update your deployment or upload all the resources in the **CloudGemAWSScriptBehaviors** resource group\.

**Topics**
+ [Prerequisites](#cloud-canvas-cloud-gem-aws-script-behavior-intro-prerequisites)
+ [Decoding a URL with Script Canvas](cloud-canvas-cloud-gem-aws-url-decode-sc.md)
+ [Performing HTTP GET with Script Canvas](cloud-canvas-cloud-gem-aws-http-get-sc.md)
+ [Uploading a File to Amazon S3 with Script Canvas](cloud-canvas-cloud-gem-aws-s3-upload-sc.md)
+ [Downloading a File from Amazon S3 with Script Canvas](cloud-canvas-cloud-gem-aws-s3-download-sc.md)
+ [Generating an Amazon S3 Presigned URL With Script Canvas](cloud-canvas-cloud-gem-aws-s3-presign-sc.md)
+ [Invoking an AWS Lambda Function from Script Canvas](cloud-canvas-cloud-gem-aws-lambda-sc.md)