# Making a Custom Lambda Function Available to Script Canvas<a name="cloud-canvas-cloud-gem-aws-lambda-sc-adding"></a>

You can make custom Lambda function available to Script Canvas with the following steps:

1. Use the Project Configurator to add **Cloud Gem AWS Script Behaviors** to your project\. For information on adding gems to your game project, see [Enabling Gems](gems-system-using-project-configurator.md)\.

1. In Lumberyard Editor, use the Cloud Canvas Resource Manager to add a Lambda resource to the **CloudGemAWSScriptBehaviors** resource group\. When you perform this step, Lumberyard creates a directory named after your function and a placeholder `main.py` code file for you\. The code directory and file look like the following:

   ```
   lumberyard_version\dev\Gems\CloudGemAWSScriptBehaviors\AWS\lambda-code\your_function_name\main.py
   ```

1. Add your function code to the `main.py` file\.

1. Use the Cloud Canvas Resource Manager to upload the resources to AWS\. After you complete this step, your Lambda function becomes available to Script Canvas\.

This topic shows you how to perform the second and fourth steps: use the Cloud Canvas Resource Manager to add a custom Lambda function to the **CloudGemAWSScriptBehaviors** resource group, and upload your Lambda function to AWS\.

**Topics**
+ [Adding a Lambda Function Resource](#cloud-canvas-cloud-gem-aws-lambda-sc-adding-to-resource-group)
+ [Uploading Your Custom Lambda Function to AWS](#cloud-canvas-cloud-gem-aws-lambda-sc-adding-uploading)

## Adding a Lambda Function Resource<a name="cloud-canvas-cloud-gem-aws-lambda-sc-adding-to-resource-group"></a>

With Lumberyard Editor, you can add a Lambda function resource to the **CloudGemAWSScriptBehaviors** resource group\.

**To add a custom Lambda function to the CloudGemAWSScriptBehaviors resource group**

1. In Lumberyard Editor, choose **AWS**, **Cloud Canvas**, **Resource Manager**\.

1. Under **Resource Groups**, select **CloudGemAWSScriptBehaviors**\.  
![\[Select CloudGemAWSScriptBehaviors in Cloud Canvas Resource Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-lambda-sc-adding-1.png)

1. Click **Add resource**, and then choose **Lambda function**\.  
![\[Click Add resource, and then choose Lambda function in Cloud Canvas Resource Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-lambda-sc-adding-2.png)

1. In the **Add a Lambda function** dialog box, specify the following values\.
   + **Name** – The name of the Lambda function\.
   + **Handler** – Specifies the code source for the function in the format `python_filename`\.`function_name`\. To use the `main.py` file that Lumberyard creates for you, specify `main.function_name`\. For example, for a function named `MyCustomAWSLambdaFunction`, enter `main.MyCustomAWSLambdaFunction`\.

      For more information about Lambda function handlers, see [Lambda Function Handler \(Python\)](https://docs.aws.amazon.com/lambda/latest/dg/python-programming-model-handler-types.html) in the *AWS Lambda Developer Guide*\.
   + **Player invokable** – Choose **Yes**\. This option gives the player the permission to invoke the Lambda function\.  
![\[Add a Lambda function in the Cloud Canvas Resource Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-lambda-sc-adding-3.png)

   These properties are added to the `resource-template.json` file in the `lumberyard_version\dev\Gems\CloudGemAWSScriptBehaviors\AWS` directory\.

1. Click **OK**\. Now you are ready to add code to the `main.py` file that Lumberyard created for you at the following location:

   ```
   lumberyard_version\dev\Gems\CloudGemAWSScriptBehaviors\AWS\lambda-code\your_function_name\main.py
   ```

## Uploading Your Custom Lambda Function to AWS<a name="cloud-canvas-cloud-gem-aws-lambda-sc-adding-uploading"></a>

After you add your Lambda function code to the `main.py` file, you are ready to upload it to AWS to make it available to Script Canvas\.

**To upload your Lambda function code to AWS**

1. In Lumberyard Editor, choose **AWS**, **Cloud Canvas**, **Resource Manager**\.

1. Under **Resource Groups**, select **CloudGemAWSScriptBehaviors**\.

1. In Cloud Canvas Resource Manager, click **Upload resources** to upload your Lambda function to AWS\.

1. In the **Upload group resources** dialog box, click **Yes** to approve any changes to security, if you agree\.  
![\[Click Upload resources in the Cloud Canvas Resource Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-lambda-sc-adding-4.png)

   Cloud Canvas Resource Manager notifies you when the Lambda resources have been created in AWS\.  
![\[Cloud Canvas Resource Manager shows that the Lambda function has been uploaded.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-lambda-sc-adding-5.png)

   Now when you use **Node Inspector** to add an **AWSLambda Variable** node to a Script Canvas graph, your Lambda function becomes available in the **functionName** box\.  
![\[Custom Lambda function available in the functionName box in the Script Canvas editor\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-aws-lambda-sc-adding-6.png)

For more information, see [Invoking an AWS Lambda Function from Script Canvas](cloud-canvas-cloud-gem-aws-lambda-sc.md)\.