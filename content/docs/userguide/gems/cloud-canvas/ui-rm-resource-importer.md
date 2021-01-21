---
description: ' Add your existing AWS resources to a &cloud; resource group. '
title: ' Importing Resource Definitions into &cloud;'
---
# Importing Resource Definitions into Cloud Canvas {#cloud-canvas-ui-rm-resource-importer}

You can use the Cloud Canvas resource importer to add definitions of existing AWS resources to a Cloud Canvas resource group\. You can add resources by using the Cloud Canvas Resource Manager in Lumberyard Editor or at a command line prompt\.

## Importing Resources using Lumberyard Editor {#cloud-canvas-ui-rm-resource-importer-ly-editor}

In Lumberyard Editor, you can import a resource by specifying an [Amazon Resource Name \(ARN\)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) or by choosing from a list\.

**To import a resource by using an ARN**

1. From the Lumberyard Editor top menu, choose **AWS**, **Cloud Canvas**, **Resource Manager**\.

1. In the navigation pane, select a resource group\.

1. In the detail window, click **Import resource**, **Import using ARN**\. You can also open the context \(right\-click\) menu for the resource in the navigation pane and choose **Import resource**, **Import using ARN**\.
![\[Import using ARN\]](/images/userguide/cloud_canvas/cloud-canvas-resource-importer-using-arn.png)

1. In the **Import using ARN** dialog box, provide the ARN and name of the resource that you are going to import\. Both are required\.
![\[Provide the resource name and ARN\]](/images/userguide/cloud_canvas/cloud-canvas-resource-importer-using-arn-dialog-box.png)

   After you have provided both items of information, the **Import** button is enabled\.

1.  **Import**\.

**To import a resource by choosing from a list**

1. From the Lumberyard Editor top menu, choose **AWS**, **Cloud Canvas**, **Resource Manager**\.

1. In the navigation pane, select a resource group\.

1. In the detail window, choose **Import resource**, **Import using ARN**\. You can also open the context \(right\-click\) menu for the resource in the navigation pane and choose **Import resource**, **Import using ARN**\.
![\[Import from list\]](/images/userguide/cloud_canvas/cloud-canvas-resource-importer-from-list-dialog-box.png)

1. In the **Import from list** dialog box, choose the AWS Region of the resource for **Region**\. The default value is the region of the project stack if it exists\. Resources start loading in the list as soon as you choose a region that has importable resources\.
![\[Choose AWS Region\]](/images/userguide/cloud_canvas/cloud-canvas-resource-importer-region-selector.png)

1. You can use the AWS service selector to filter the resources by service, and then use the **Search** box to filter resources by name\.
![\[Filter by AWS service and resource name\]](/images/userguide/cloud_canvas/cloud-canvas-resource-importer-filter-by-name-and-ddb.png)

1. Select the check box to the left of each resource that you want to import\.
![\[Choose the resources to import\]](/images/userguide/cloud_canvas/cloud-canvas-resource-importer-choose-resources.png)

1.  **Configure**\.

1. In the **Configuration** dialog box, provide a reference name for each resource, or accept the default\. The default name is the original name of the resource on AWS\.

1. To delete a selected resource from the list, open the context \(right\-click\) menu for the resource and choose **Delete**\.
![\[Delete a resource\]](/images/userguide/cloud_canvas/cloud-canvas-resource-importer-delete-selected-resource.png)

1. When you are ready, click **Import**\. A progress bar displays\. An **Import Error** message informs you of any errors that occur\.
![\[Import progress\]](/images/userguide/cloud_canvas/cloud-canvas-resource-importer-progress.png)

1. Click **X** to close the **Import from list dialog** box\. The resources that you imported are listed in the details pane of Cloud Canvas Resource Manager\.

## Importing Resource Definitions Using the Command Line {#cloud-canvas-ui-rm-resource-importer-command-line}

To list and import resources using the Cloud Canvas command line, see [resource\-importer list\-importable\-resources](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-resource-importer-list-importable-resources) and [resource\-importer import\-resource](/docs/userguide/gems/cloud-canvas/command-line#cloud-canvas-command-line-resource-importer-import-resource)\.

## Understanding Resource Definitions {#cloud-canvas-ui-rm-resource-importer-resource-definitions-caveat}

When you use the Cloud Canvas resource importer to import the definition of a resource, it is important to understand that you are importing the resource's definition, not the resource itself\. For example, suppose you use the AWS console to create a high score table in DynamoDB called Table A\. You create a game client that uploads scores, and send out the client to your players\. Table A begins to populate with data from the players of your game\.

You then decide to use Cloud Canvas to manage your resources and deployments\. Using the Cloud Canvas Resource Manager, you import Table A because it has the exact configuration values that you want, and it has worked well for your use cases\.

When you create a deployment with the imported resource, the deployment contains Table B, which is a new table with Table A's structure but not its data\. Table B is managed by Cloud Canvas and has the same behavior as Table A\. However, Table B is not a reference to Table A, and it does not have Table A's data or history\. Keep this distinction in mind when you import resource definitions\.



## Automatically Imported Resource Definitions {#cloud-canvas-ui-rm-resource-importer-automatically-imported}

Some of the existing resources that you select might be related to other resources\. For example, Lambda functions can respond to events from the selected triggers\. You can use event notifications from an Amazon S3 bucket to send alerts or trigger workflows\. Cloud Canvas imports the related resources for you automatically\.

Cloud Canvas uses the following naming conventions for automatically imported resource definitions\.


****

|  Source  |  Naming Convention  |  Example Name of Imported Resource  |
| --- | --- | --- |
|  DynamoDB table, Lambda function, Amazon SNS topic, Amazon SQS queue  |  <resource\_name> \+ "AutoAdded" \+ <resource\_type> \+ <counter>  |  LambdaFunctionAutoAddedtable0  |
|  Lambda function configuration resource??  |  <lambda\_function\_name> \+ "Configuration"  |  LambdaFunctionConfiguration  |
|  Lambda function policy resource  |  <lambda\_function\_name> \+ "Permission"  |  LambdaFunctionPermission  |
|  DynamoDB table Lambda function event source  |  <DynamoDB\_table\_name> \+ "EventSource"  |  DynamoTableEventSource  |

## Resources Supported for Import {#cloud-canvas-ui-rm-resource-importer-resources-supported-for-import}

The following sections list the resource attributes and related resources that Cloud Canvas imports for each supported AWS service\.

### Dynamo DB Tables {#w31aac29c28c25b7c26c13b5}

For DynamoDB tables, Cloud Canvas imports the following resource attributes:
+ `AttributeDefinitions`
+ `GlobalSecondaryIndexes`
+ `KeySchema`
+ `LocalSecondaryIndexes`
+ `ProvisionedThroughput`
+ `StreamSpecification`

### Amazon S3 Buckets {#w31aac29c28c25b7c26c13b7}

For Amazon S3 buckets, Cloud Canvas imports the following resource attributes:
+ `CorsConfiguration`
+ `LifecycleConfiguration`
+ `NotificationConfiguration`
+ `Tags`
+ `VersioningConfiguration`
+ `WebsiteConfiguration`

For Amazon S3 buckets, Cloud Canvas also imports the following related resources:
+ Lambda functions
+ Amazon SQS queues
+ Amazon SNS topics

### Lambda Functions {#w31aac29c28c25b7c26c13b9}

For Lambda functions, Cloud Canvas imports the following resource attributes:
+ `Code`
+ `Description`
+ `Handler`
+ `MemorySize`
+ `Role`
+ `Runtime`
+ `Timeout`
+ `VpcConfig`

For Lambda functions, Cloud Canvas also imports the following related resources:
+ Lambda function configurations
+ Lambda function permissions
+ DynamoDB tables
+ Event source mappings

### Amazon SNS Topics {#w31aac29c28c25b7c26c13c11}

For Amazon SNS topics, Cloud Canvas imports the following resource attributes:
+ `DisplayName`
+ `Subscription`

For Amazon SNS topics, Cloud Canvas also imports any Lambda functions that are related resources\.

### SQS Queues {#w31aac29c28c25b7c26c13c13}

For SQS queues, Cloud Canvas imports the following resource attributes:
+ `DelaySeconds`
+ `MaximumMessageSize`
+ `MessageRetentionPeriod`
+ `ReceiveMessageWaitTimeSeconds`
+ `RedrivePolicy`
+ `VisibilityTimeout`