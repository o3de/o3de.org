# Getting Started with the Cloud Gem Framework<a name="cloud-canvas-cgf-getting-started"></a>

Lumberyard cloud gems make it easy to create cloud\-connected functionality for your games\. You can use the cloud gems included with Lumberyard, or use Lumberyard's Cloud Gem Framework to create your own cloud gems\.

## Cloud Gems<a name="cloud-canvas-cgf-getting-started-cloud-gems"></a>

Cloud gems are Lumberyard gems that use [Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md) \(CCRM\) to define AWS resources that support their operation\. CCRM provides the infrastructure needed to create, configure, and access AWS resources\. A cloud gem defines resources and implements the required operations to create a complete game subsystem\.

Cloud gems use general purpose AWS features that operate in your AWS account\. They are not game\-specific services operated by Amazon\. Cloud gems follow a [serverless](https://aws.amazon.com/blogs/compute/microservices-without-the-servers/) [microservice](https://en.wikipedia.org/wiki/Microservices) architecture that makes use of [AWS Lambda](https://aws.amazon.com/lambda) functions for computation, and [Amazon DynamoDB](https://aws.amazon.com/dynamodb), [Amazon RDS](https://aws.amazon.com/rds), and [Amazon S3](https://aws.amazon.com/s3) for data storage\. However, a cloud gem can use any AWS service\.

For example, a cloud gem could provide a leaderboard system that uses a DynamoDB table to store high scores\. The gem could use an AWS Lambda function to validate submitted scores and allow fraudulent high scores to be deleted\.

In this scenario, CCRM performs the following tasks:
+ Creates the DynamoDB table and Lambda function defined by the gem\.
+ Enables the game client to invoke the API to submit a score\.
+ Protects the integrity of the leaderboard by removing fraudulent scores automatically\.
+ Permits the creation of a user interface that enables an authorized employee to remove fraudulent scores manually\.

## Cloud Gem Framework<a name="cloud-canvas-cgf-getting-started-cloud-gem-framework"></a>

The Cloud Gem Framework is a collection of tools and API operations that support the creation and operation of cloud gems\.

The following diagram shows a high\-level view of the Cloud Gem Framework architecture\.

![\[Cloud Gem Framework architecture\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cgf-architecture.png)

The Cloud Gem Framework contains the following major components:
+ [Cloud Gem Portal](cloud-canvas-cloud-gem-portal.md) – A web application for operating and managing cloud gems\.
+ [Cloud Gem Framework Service API](cloud-canvas-cgf-service-api.md) – An API that provides a secure interface to a cloud gem's functionality\.
+ [AWS API Jobs](cloud-canvas-cgf-aws-api-jobs.md) – Integrates the AWS API with the Lumberyard job execution systems \(not illustrated\)\.
+ [HTTP Request Job](cloud-canvas-cgf-http-requests.md) – A Lumberyard job for executing HTTP requests \(not illustrated\)\.