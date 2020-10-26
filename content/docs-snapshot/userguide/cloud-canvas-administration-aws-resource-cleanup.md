# Freeing Up AWS Resources<a name="cloud-canvas-administration-aws-resource-cleanup"></a>

After a time of intensively testing or developing Lumberyard game projects that use Cloud Canvas, your attempts to create resources in AWS might fail or result in rollback loops\. For example, you might receive error messages like the following:

```
CREATE_FAILED for Configuration (AWS::S3::Bucket with ID "bucket_id"). You have attempted to create more buckets than allowed.
```

```
CREATE_FAILED for ServiceApi (Custom::ServiceApi with ID "api_id"). Failed to create resource. Unexpected RuntimeError occurred: [...] An error occurred (BadRequestException) when calling the ImportRestApi operation: 
Maximum number of API operations has been reached. Please contact AWS if you need additional API operations.
```

These errors occur when you exceed limits that some AWS services have on the number of resources that you can create per account\. The number of resources allowed per account varies by service and by resource\. The following table shows some limits for some AWS resources that are commonly used with Cloud Canvas:


****  

| AWS Service | Limit | Information Link | 
| --- | --- | --- | 
| Amazon S3 | 100 buckets per account\. | [Amazon Simple Storage Service \(Amazon S3\) Limits](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html#limits_s3) | 
| Amazon API Gateway | 60 APIs per account per region\. | [Amazon API Gateway Limits, Pricing and Known Issues](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html#api-gateway-limits) | 
| Amazon DynamoDB | Initially, 256 tables per region\. | [Limits in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html) | 

For more information on the resource limits of individual AWS services, see the [AWS Service Limits](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) in the *AWS General Reference*\.

If necessary, you can contact AWS customer service to increase the resource limits for some services\. However, if you have resources that you no longer require, it might be easier to simply remove them from your account\. 

To remove unused resources from AWS, the following tools are available:
+ [The Cloud Canvas Cleanup Tool](#cloud-canvas-administration-aws-resource-cleanup-using-the-cloud-canvas-cleanup-tool)
+ [The AWS Command Line Interface \(CLI\)](#cloud-canvas-administration-aws-resource-cleanup-aws-cli)
+  [The AWS Management Console](#cloud-canvas-administration-aws-resource-cleanup-using-the-aws-management-console)

Of these, the Cloud Canvas cleanup tool provides the quickest way to delete resources\.

## The Cloud Canvas Cleanup Tool<a name="cloud-canvas-administration-aws-resource-cleanup-tool"></a>

The Lumberyard installation includes the Cloud Canvas cleanup tool\. You can use the Cloud Canvas cleanup tool to delete AWS resources from your account that have the prefix that you specify\. The tool is located in the `lumberyard_version\dev\Tools\lmbr_aws\test` directory\.

### Prerequisites<a name="cloud-canvas-administration-aws-resource-cleanup-tool-prerequisites"></a>

To use the cleanup tool, you must complete the following:
+ Have access to a Windows computer\.
+ Install Lumberyard on your computer\.
+ Set up and configure an AWS admininstrator IAM profile and set an admininstrator profile name as default on your computer\.

  For more information, see [Step 2: Create an IAM User to Administer the Cloud Canvas Project](cloud-canvas-tutorial.md#cloud-canvas-tutorial-create-iam-admin) and [Step 4: Add Administrator Credentials to Lumberyard](cloud-canvas-tutorial.md#cloud-canvas-tutorial-enter-admin-creds) in the [Cloud Canvas tutorial](cloud-canvas-tutorial.md)\.
+ Install the [AWS CLI](https://aws.amazon.com/cli/), [configure](https://docs.aws.amazon.com/cli/latest/reference/configure/index.html) it with an admininstrator IAM profile, and set it to your preferred region\.

  For instructions on how to install the AWS CLI on Windows, see [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)\. The AWS CLI requires Python\. You may use the version of Python distributed as part of Lumberyard, provided that it's available in your system's `PATH`\.
+ Use Cloud Canvas Resource Manager or the `lmbr_aws` tool to create a Cloud Canvas project stack\. 
**Note**  
If you are using a fresh installation of Lumberyard and need to clean up resources before you can create a project stack, perform the following steps\.  
In Project Configurator, set the default project to a project that has the Cloud Canvas Common gem enabled\.
Determine the name of the AWS profile that you want to use\. To discover existing profiles, you can examine either the `credentials` or `config` file in the `%SystemDrive%\Users\user_name\.aws\` directory\.
Enter the following command to configure the AWS CLI to use the profile\.   

     ```
     aws configure --profile profile_name
     ```
In the `lumberyard_installation\dev` directory, run the following command\.  

     ```
     lmbr_aws profile default --set profile_name
     ```
This adds the profile to the `DefaultProfile` section of the [user\-settings\.json](cloud-canvas-resource-definitions.md#cloud-canvas-user-settings) file\. As of Lumberyard version 1\.15, the Cloud Canvas cleanup tool requires that a default profile be set in the `user-settings.json` file\.  
The following example command sets the default Cloud Canvas profile to `CloudCanvasAdmin` for the CloudGemDefectReportSample project in the Lumberyard installation location `C:\Lumberyard\`\.

     ```
     C:\Lumberyard\dev>lmbr_aws profile default --set CloudCanvasAdmin
     ```
The command produces the following output\.  

     ```
     [WAF] Engine Root: C:\Lumberyard\dev\
     Saving C:\Lumberyard\dev\Cache\CloudGemDefectReportSample\pc\User\AWS\user-settings.json
     
     Default Profile: CloudCanvasAdmin
     ```

### Using the Cloud Canvas Cleanup Tool<a name="cloud-canvas-administration-aws-resource-cleanup-using-the-cloud-canvas-cleanup-tool"></a>

Before you use the cleanup tool, be aware of the following points:
+ Do not use the cleanup tool if you have a project stack name that begins with an IAM user name that you do not want to delete\. Doing so can result in the deletion of the IAM user, its roles, and its profiles\.
+ When you delete an AWS resource, you permanently delete any objects that are stored in that resource\. For example, if you delete an S3 bucket, all objects inside the bucket are also deleted\.

**To use the Cloud Canvas cleanup tool**

1. Open a command prompt window\.

1. Navigate to the `lumberyard_version\dev\Tools\lmbr_aws\test` directory\.

1. Determine the string prefix \(full or partial\) that you want to specify to delete resources\. For more information, see [Identifying Cloud Canvas Prefixes](#cloud-canvas-administration-aws-resource-cleanup-identifying-cloud-canvas-prefixes)\.

1. Enter the following command:

   ```
   cleanup --prefix prefix_string
   ```

   For example, the following command removes AWS resources that begin with the prefix `cloudgemsamples`\.

   ```
   cleanup --prefix cloudgemsamples
   ```

   Depending on the number of resources, the command might take some time to complete\.

1. Repeat the command until the cleanup tool no longer finds items to delete\. Multiple runs can be required\. The cleanup tool attempts to delete resources as they become available for deletion\. However, because the cleanup tool attempts to delete resources in type order, some resources are not available for deletion until after the script finishes\.


**Optional Arguments**  

| Argument | Description | 
| --- | --- | 
| \-\-aws\-access\-key  | The AWS access key to use\. | 
| \-\-aws\-secret\-key | The AWS secret access key to use\. | 
| \-\-delete\-global\-resources  |  If the `--region` argument is specified, deletes global resources such as IAM roles and Amazon S3 buckets\. If the `--region` argument is not specified, the `--delete-global-resources` argument is ignored\.  This argument is new in Lumberyard version 1\.16\.  | 
| \-\-except exception \[exception …\] | Do not delete resources that start with the prefixes specified\. | 
| \-h, \-\-help | Shows a help message and exits\. | 
| \-\-prefix prefix \[prefix \.\.\.\] | Deletes stacks and Amazon S3 buckets in AWS that have the specified prefixes\. | 
| \-\-profile profile  | The AWS profile to use\. Defaults to the default AWS profile\. | 
| \-\-region region | The AWS region to use\. Defaults to us\-east\-1\. | 

#### Identifying Cloud Canvas Prefixes<a name="cloud-canvas-administration-aws-resource-cleanup-identifying-cloud-canvas-prefixes"></a>

Use the Cloud Canvas resource naming conventions in this section to identify the resources that you want to delete\. In general, the AWS Management Console uses the names that you provided for your resources when you created them in Cloud Canvas Resource Manager or `lmbr_aws`\.

##### Project Stacks<a name="cloud-canvas-administration-aws-resource-cleanup-project-stacks"></a>

In Cloud Canvas, project stack names correspond to AWS CloudFormation stack names\. For example, if you create a Cloud Canvas project stack called `CloudGemSamples`, the project stack appears in the [AWS CloudFormation Console](https://console.aws.amazon.com/cloudformation/home) as `CloudGemSamples`\.

##### Project Stack Resources<a name="cloud-canvas-administration-aws-resource-cleanup-project-stack-resources"></a>

Resources in a Cloud Canvas project stack have the following form\.

```
ProjectStackName-ResourceName         
```

For example, if a `CloudGemSamples` Cloud Canvas project stack has an Amazon S3 bucket named `Storage`, the bucket appears in the [Amazon S3 Console](https://console.aws.amazon.com/s3/home) as `CloudGemSamples-Storage.`

##### Deployment Stacks<a name="cloud-canvas-administration-aws-resource-cleanup-deployment-stacks"></a>

A deployment stack name in AWS has the following form\.

```
ProjectStackName-DeploymentStackName
```

For example, if a `CloudGemSamples` Cloud Canvas project stack has a deployment stack named `TestDeployment`, the deployment stack appears in the [AWS CloudFormation Console](https://console.aws.amazon.com/cloudformation/home) as `CloudGemSamples-TestDeployment.`

##### Deployment Stack Resources<a name="cloud-canvas-administration-aws-resource-cleanup-deployment-stack-resources"></a>

Cloud Canvas deployment stack resource names have the following form\.

```
ProjectStackName-DeploymentName-ResourceGroupOrGemName-ResourceName
```

For example, suppose a `CloudGemSamples` Cloud Canvas project stack has a deployment stack named `TestDeployment`\. If `TestDeployment` has a cloud gem named `TestGem` that uses an Amazon S3 bucket named `GemResourceBucket`, the bucket appears in the [Amazon S3 Console](https://console.aws.amazon.com/s3/home) as `CloudGemSamples-TestDeployment-TestGem-GemResourceBucket`\.

##### Viewing Prefixes in the AWS Management Console<a name="cloud-canvas-administration-aws-resource-cleanup-viewing-prefixes-in-the-aws-management-console"></a>

You can use the [AWS Management Console](https://console.aws.amazon.com/) to identify resources to delete\.

**To view AWS CloudFormation stacks**

1. Sign in to the AWS Management Console and open the AWS CloudFormation console at [https://console\.aws\.amazon\.com/cloudformation](https://console.aws.amazon.com/cloudformation/)\.

1. In the upper\-right corner of the management console, choose the AWS region from which you want to delete resources\.

1. Identify the AWS CloudFormation stack\(s\) that you no longer require\.

1. Use the Cloud Canvas resource naming rules to determine the prefix to use with the Cloud Canvas cleanup tool\.

**To identify orphaned resource\(s\)**

1. Open the [AWS Console](https://console.aws.amazon.com/) for the resource that you believe is orphaned \(for example, the [Amazon S3 Console](https://console.aws.amazon.com/s3/home) or the [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway/home)\)\.

1. In the upper\-right corner of the management console, choose the AWS region from which you want to delete resources\.

1. Identify a resource that you no longer require\.

1. Use the Cloud Canvas resource naming rules to determine the prefix to use with the Cloud Canvas cleanup tool\.

#### Notes Regarding the Cleanup Tool<a name="cloud-canvas-administration-aws-resource-cleanup-notes-regarding-the-cleanup-tool"></a>

When you use the Cloud Canvas cleanup tool, note the following\.
+ You do not have to specify a complete prefix\. The cleanup tool takes the string that you specify and matches it with all resources that have names that start with that string\. For example, if you specify the prefix `Cloud`, all resources that start with `Cloud` \(like `CloudGemSamples`\) are deleted, including resources that AWS CloudFormation created\.
+ An Amazon S3 bucket/*aws\_resource* can seem to fail to delete even though it is empty and visible in the management console\.

  A resource that has been removed can have an obsolete \(ghost\) reference to it in the AWS Management Console\. If you attempt to use the cleanup tool or AWS CLI to delete the resource, you receive an error that the resource does not exist\. For example, when you try to delete an S3 bucket that has already been deleted, an error message like the following occurs:

  ```
  ERROR An error occurred (NoSuchBucket) when calling the ListObjectVersion operation: The specified bucket does not exist.
  ```

  This error confirms that the resource has been deleted\. The resource will no longer count against your resource limits or costs\. AWS automatically cleans up the ghost reference in 24 to 72 hours\.
+ Errors can occur when you delete a Cloud Canvas project stack prefix for your current Lumberyard project and then use Cloud Canvas Resource Manager or `lmbr_aws` commands\. This is because the resources that the project expects no longer exist in AWS\.

  To resolve this issue, you can delete the `lumberyard_version\dev\project_name\AWS\local-project-settings.json` file, which is automatically regenerated by Cloud Canvas Resource Manager and `lmbr_aws`\. Alternatively, you can edit the `ProjectStackId` section of the `local-project-settings.json` file to remove the resources listed that have been deleted\. You should also edit the `Mappings` section of the `lumberyard_version\dev\Cache\game\OS\user\AWS\user-settings.json` file to remove references to resources that have been deleted\.

## AWS Command Line Interface \(CLI\)<a name="cloud-canvas-administration-aws-resource-cleanup-aws-cli"></a>

You can use the AWS Command Line Interface to remove resources from specific AWS services in your account\. This section lists some useful commands for the following AWS services that are commonly used with Cloud Canvas:
+ [Amazon DynamoDB](#cloud-canvas-administration-aws-resource-cleanup-dynamodb)
+ [AWS Lambda](#cloud-canvas-administration-aws-resource-cleanup-aws-lambda)
+ [Amazon API Gateway](#cloud-canvas-administration-aws-resource-cleanup-api-gateway)
+ [Amazon S3](#cloud-canvas-administration-aws-resource-cleanup-amazon-s3)

### Prerequisites<a name="cloud-canvas-administration-aws-resource-cleanup-aws-cli-prerequisites"></a>

To use the AWS CLI, you must complete the following:
+ Set up and configure an AWS admininstrator IAM profile and set an admininstrator profile name as default on your computer\.

  For more information, see [Step 2: Create an IAM User to Administer the Cloud Canvas Project](cloud-canvas-tutorial.md#cloud-canvas-tutorial-create-iam-admin) and [Step 4: Add Administrator Credentials to Lumberyard](cloud-canvas-tutorial.md#cloud-canvas-tutorial-enter-admin-creds) in the [Cloud Canvas tutorial](cloud-canvas-tutorial.md)\.
+ Install the [AWS CLI](https://aws.amazon.com/cli/), [configure](https://docs.aws.amazon.com/cli/latest/reference/configure/index.html) it with an admininstrator IAM profile, and set it to your preferred region\.

  For instructions on how to install the AWS CLI on Windows, Linux, macOS, or Unix, see [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)\. The AWS CLI requires Python\. You may use the version of Python distributed as part of Lumberyard, provided that it's available in your system's `PATH`\.

### Creating Script Files for Batch Deletion<a name="cloud-canvas-administration-aws-resource-cleanup-creating-script-files-for-batch-deletion"></a>

A generally useful ad hoc strategy is to use a service\-specific AWS CLI command to redirect a list of the resources into a text file\. You can then use the text file programatically or convert the file into a shell script of AWS CLI deletion commands\. The next few sections illustrate this technique\.

### Amazon DynamoDB<a name="cloud-canvas-administration-aws-resource-cleanup-dynamodb"></a>

To show list of the DynamoDB tables in the current region in a command prompt window, enter the following command\.

```
aws dynamodb list-tables
```

To specify a different region, use the *\-\-region *region\_name** argument, as in the following example\.

```
aws --region us-west-2 dynamodb list-tables
```

To redirect the list of tables into a text file, enter a command like the following\.

```
aws dynamodb list-tables >ddb_table_list.txt 
```

The example command redirects the output into a text file called `ddb_table_list.txt`\.

The AWS CLI command to delete a DynamoDB table uses the following syntax\.

```
aws dynamodb delete-table --table-name table_name
```

To create a shell script that deletes many or all tables at once, you can edit the text file that has the `list-tables` output\. Use a search and replace operation to precede each table name with the `aws dynamodb delete-table` command\. Do another search and replace to remove the double quote and comma at the end of each line\. The result looks like the following example\.

```
aws dynamodb delete-table --table-name CloudGemSamples-CGSamplesDeployment-CloudGemDynamicContent-hash-StagingSettingsTable
aws dynamodb delete-table --table-name CloudGemSamples-CGSamplesDeployment-CloudGemInGameSurvey-hash-AnswerAggregations
aws dynamodb delete-table --table-name CloudGemSamples-CGSamplesDeployment-CloudGemInGameSurvey-hash-Answers-hash
aws dynamodb delete-table --table-name CloudGemSamples-CGSamplesDeployment-CloudGemInGameSurvey-hash-Questions
aws dynamodb delete-table --table-name CloudGemSamples-CGSamplesDeployment-CloudGemInGameSurvey-hash-Surveys
aws dynamodb delete-table --table-name CloudGemSamples-CGSamplesDeployment-CloudGemLeaderboard-hash-BannedPlayerTable
```

After you rename the file with a `.cmd` or `.bat` extension \(Windows\), you can run the script to delete all the tables in one go\.

For more information on the DynamoDB CLI commands, see [dynamodb](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html)\.

### AWS Lambda<a name="cloud-canvas-administration-aws-resource-cleanup-aws-lambda"></a>

To list AWS Lambda functions, enter the following command\.

```
aws lambda list-functions
```

The following syntax deletes a Lambda function\.

```
aws lambda delete-function --function-name function_name
```

The deletion syntax requires only the function name, so to create a script, filter the JSON output of the `list-functions` command on `FunctionName`\. In Windows, you can use the following syntax to pipe the output of `list-functions` into the `findstr` command and redirect the result into a text file\.

```
aws lambda list-functions | findstr /C:FunctionName >lambdafns.txt
```

The resulting file looks like this:

```
            "FunctionName": "CloudGemSamples-CGSamplesDep-Clo-ServiceLambda-hash",
            "FunctionName": "CloudGemSamples-AH-CoreResourceTypes-AWS_SQS_Queue",
            "FunctionName": "CloudGemSamples-AH-CoreResourceTypes-Custom_ServiceApi",
            "FunctionName": "CloudGemSamples-CRH-CoreResourceTypes-Custom_Helper",
            "FunctionName": "CloudGemSamples-CRH-CoreResourceTypes-Custom_Interfac-hash",
            "FunctionName": "CloudGemSamples-CGSamplesDep-PackageVoiceLines-hash",
```

As before, use search and replace operations to turn the file into a deletion script, as in the following example\.

```
aws lambda delete-function --function-name CloudGemSamples-CGSamplesDep13-Clo-ServiceLambda-hash
aws lambda delete-function --function-name CloudGemSamples-AH-CoreResourceTypes-AWS_SQS_Queue
aws lambda delete-function --function-name CloudGemSamples-AH-CoreResourceTypes-Custom_ServiceApi
aws lambda delete-function --function-name CloudGemSamples-CRH-CoreResourceTypes-Custom_Helper
aws lambda delete-function --function-name CloudGemSamples-CRH-CoreResourceTypes-Custom_Interfac-hash
aws lambda delete-function --function-name CloudGemSamples-CGSamplesDep13-PackageVoiceLines-hash
```

For more information on the AWS Lambda CLI commands, see [lambda](https://docs.aws.amazon.com/cli/latest/reference/lambda/index.html)\.

### Amazon API Gateway<a name="cloud-canvas-administration-aws-resource-cleanup-api-gateway"></a>

To delete a REST API from API Gateway, you must specify the ID of the REST API\.

```
aws apigateway delete-rest-api --rest-api-id rest_api_id
```

To list the APIs in API Gateway, use the `get-rest-apis` command\.

```
aws apigateway get-rest-apis
```

In Windows, you can filter the output of the `get-rest-apis` command by ID as in the following example\.

```
aws apigateway get-rest-apis | findstr /C:id >gatewayapis.txt
```

For more information on the API Gateway CLI commands, see [apigateway](https://docs.aws.amazon.com/cli/latest/reference/apigateway/index.html)\.

### Amazon S3<a name="cloud-canvas-administration-aws-resource-cleanup-amazon-s3"></a>

In Amazon S3, you can **delete** empty buckets but must **remove** non\-empty buckets\.

**Note**  
The commands presented here work only on unversioned buckets\. Amazon S3 buckets are unversioned by default\. For more information, see [Using Versioning](https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html) in the *Amazon Simple Storage Service Developer Guide*\.

#### Getting a List of Bucket Names<a name="cloud-canvas-administration-aws-resource-cleanup-getting-a-list-of-bucket-names"></a>

To obtain a list of S3 bucket names, use the following command\.

```
aws s3api list-buckets --query Buckets[].Name 
```

#### Deleting a Bucket<a name="cloud-canvas-administration-aws-resource-cleanup-deleting-a-bucket"></a>

The following syntax deletes an empty S3 bucket:

```
aws s3api delete-bucket --bucket bucket_name
```

#### Removing a Bucket<a name="cloud-canvas-administration-aws-resource-cleanup-removing-a-bucket"></a>

To remove a non\-empty bucket, use the `rb` \(remove bucket\) command with `--force` parameter\.

```
aws s3 rb s3://bucket_name --force
```

The following example command deletes all objects in the `cloudgemsamples-cloudgemportal-hash` bucket and then deletes the bucket itself\.

```
aws s3 rb s3://cloudgemsamples-cloudgemportal-hash --force
```

For more information on the Amazon S3 CLI high\-level commands, see [s3](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)\. For more information on the more detailed Amazon S3 CLI commands, see [s3api](https://docs.aws.amazon.com/cli/latest/reference/s3api/index.html)\.

## Using the AWS Management Console<a name="cloud-canvas-administration-aws-resource-cleanup-using-the-aws-management-console"></a>

You can use the [AWS Management Console](https://console.aws.amazon.com/) to manually delete individual AWS resources from your account\. However, if you have many resources to delete, the Cloud Canvas cleanup tool or the AWS CLI are faster alternatives\.

**To delete an Amazon S3 bucket**

1. Sign in to the AWS Management Console and open the Amazon S3 console at [https://console\.aws\.amazon\.com/s3/](https://console.aws.amazon.com/s3/)\.

1. Identify a bucket that you no longer require\.

1. Select the identified bucket's line entry\.

1. Click the **Empty Bucket** button\.

1. Follow modal instructions to empty bucket and confirm\.

1. Click the **Delete Bucket** button\.

1. Follow the modal instructions to delete the bucket and confirm\.

**To delete an API from API Gateway**

1. Sign in to the AWS Management Console and open the API Gateway console at [https://console\.aws\.amazon\.com/apigateway/](https://console.aws.amazon.com/apigateway/)\. 

1. In the upper\-right corner of the management console, choose the AWS region from which you want to delete resources\.

1. Identify an API that you no longer require\.

1. Click the API\.

1. Click the **Actions** menu\.

1. Select **Delete API** from the menu\.

1. Follow the instructions in the **DeleteRestApi** dialog box to confirm the deletion of the API\.

**To delete AWS CloudFormation stacks**

1. Sign in to the AWS Management Console and open the AWS CloudFormation console at [https://console\.aws\.amazon\.com/cloudformation](https://console.aws.amazon.com/cloudformation/)\.

1. In the upper\-right corner of the management console, choose the AWS region from which you want to delete resources\.

1. Identify a AWS CloudFormation stack that you no longer require\.

1. Select the stack\.

1. Click the **Actions** menu\.

1. Choose **Delete Stack** from the drop\-down list\.
**Note**  
If termination protection is enabled for the stack, you must remove the protection before you can delete the stack\.

1. Follow the instructions to confirm the deletion of the stack\.