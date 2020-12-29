# Defect Reporter Implementation Details<a name="cloud-canvas-cloud-gem-defect-reporter-implementation-details"></a>

The Defect Reporter cloud gem uses the Cloud Gem Framework \(CGF\) and Cloud Gem Portal \(CGP\)\.

Cloud gems follow a [serverless microservice architecture](https://aws.amazon.com/blogs/compute/microservices-without-the-servers/) that uses API Gateway and AWS Lambda\. The Defect Reporter cloud gem uses these services to receive attachments from the client device and upload them to Amazon S3 as part of the defect report\. Using Amazon S3 as the backend to create a serverless service has the following advantages:
+ **Separation of concerns** – With Amazon S3, the collected data can be easily used by other systems\. This makes the solution flexible and modular\.
+ **Security** – Amazon S3 supports server\-side encryption \(SSE\)\. Customer data is encrypted while at rest in S3\.
+ **User convenience** – Amazon S3 supports presigned URLs\. Players can upload report attachments to S3 without requiring a separate AWS account or write permissions\.

## Metrics Cloud Gem<a name="cloud-canvas-cloud-gem-defect-reporter-implementation-details-metrics-cloud-gem"></a>

The Defect Reporter cloud gem uses the Metrics cloud gem to handle metadata information and non\-binary attachments\. The Metrics cloud gem uses [Amazon Athena](https://aws.amazon.com/athena/) to query data in Amazon S3 using standard SQL\. The Metrics cloud gem supports unstructured text searches with Athena over non\-binary files, which are kept in [Apache Parquet format](https://parquet.apache.org/)\.

## AWS Resources Used<a name="cloud-canvas-cloud-gem-defect-reporter-implementation-details-aws-resources-used"></a>

The Defect Reporter cloud gem uses Amazon S3 and AWS Lambda\.

### Amazon S3<a name="cloud-canvas-cloud-gem-defect-reporter-implementation-details-amazon-s3"></a>

The Defect Reporter cloud gem uses two kinds of S3 buckets:
+ The attachment S3 bucket is a repository of attachments\. This bucket holds copies of binary and non\-binary files sent as attachments to a defect report\.
+ The sanitized S3 bucket is the repository of attachments that have been deemed non\-malicious\. To prevent downloads of malicious files, the Cloud Gem Portal's access is restricted to the sanitized bucket

### AWS Lambda<a name="cloud-canvas-cloud-gem-defect-reporter-implementation-details-aws-lambda"></a>

A service Lambda function writes to and communicates with the Amazon S3 attachment bucket\. The Lambda function generates presigned POST URLs so that players can report defects without requiring AWS credentials or direct permission to write to the S3 attachment bucket\.

A sanitization Lambda function processes attachments to validate them as non\-malicious\. 

For the source code, see the `lumberyard_version\dev\Gems\CloudGemDefectReporter\vN\AWS\lambda-code\SanitizationLambda\sanitization_lambda.py` file\.

### PatchS3Notifications Custom Resource<a name="cloud-canvas-cloud-gem-defect-reporter-implementation-details-patchs3notifications-custom-resource"></a>

The `PatchS3NotificationsResourceType` \(`lumberyard_version\dev\Gems\CloudGemDefectReporter\vN\AWS\project-code\lambda-code\PatchS3NotificationsResourceType\resource_types\Custom_PatchS3Notifications.py`\) configures a notification on the attachment bucket\. When a file is created in the attachment bucket, the notification triggers the `SanitizationLambda` function\. \(A custom resource is required because creating and setting the notification configurations in the resource\-template would cause a circular reference\.\) The custom resource is created after the attachment bucket is created\.

## Service API Operations<a name="cloud-canvas-cloud-gem-defect-reporter-implementation-details-service-api-operations"></a>

The service API operations include the following general requests\.

### /service/status GET<a name="cloud-canvas-cloud-gem-defect-reporter-implementation-details-servicestatus-get"></a>

Returns the service's status\. Useful for testing connectivity\.

### /service/upload POST<a name="cloud-canvas-cloud-gem-defect-reporter-implementation-details-serviceupload-post"></a>

Requests the number of encrypted presigned posts and the number of unencrypted presigned posts\. 

You can configure the maximum number of presigned posts that can be requested in the `lumberyard_version\dev\Gems\CloudGemDefectReporter\vN\AWS\common-code\Constant\defect_reporter_constants.py` file\.

The maximum number of encrypted posts and the maximum number of unencrypted posts can be configured separately\. The lifetime of a presigned post can also be modified in the same file\.