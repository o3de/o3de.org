# Inspect Your Resources in AWS<a name="cloud-canvas-tutorial-inspect"></a>

This topic shows you how to sign in to the AWS Management Console and use the console to inspect the AWS CloudFormation stacks that you created\.

**To sign in to the AWS Management Console as your IAM user**

1. Retrieve the AWS account ID that you received when you created your AWS account\. To sign in as your *CloudCanvasAdmin* IAM user, use this AWS account ID\.

1. In a web browser, enter the following URL with your account ID:

   ```
    https://My_AWS_Account_ID.signin.aws.amazon.com/console/
   ```

    For example, if your AWS account ID is *1234\-5678\-9012*, you sign in at `https://123456789012.signin.aws.amazon.com/console/`\.

   For convenience, you can create a bookmark of your URL for future use\.
**Tip**  
To create a bookmark for your account sign\-in page in your web browser, you should manually type the sign\-in URL for your account in the bookmark entry\. Do not use your web browser bookmark feature because redirects can obscure the sign\-in URL\. 

1. Enter the *CloudCanvasAdmin* IAM user name that you created\.

1. Enter the password for the user and choose **Sign In**\.

You are now successfully signed into the AWS Management Console\. 

**To inspect your resources in AWS**

1. Ensure that the AWS region, which appears on the upper\-right of the console screen, is set to the region that you specified when you had Cloud Canvas deploy its resources in [Step 5](cloud-canvas-tutorial.md#cloud-canvas-tutorial-upload-resources-to-aws-and-create-a-deployment) of the tutorial\. This tutorial uses the US East \(N\. Virginia\) Region\.

1. Do one of the following:
   + In the **AWS services** search box, enter **CloudFormation**, and then click **CloudFormation**\.
   + Expand **All services** and under **Management Tools**, click **CloudFormation**\.

1. On the **Stacks** page, you can see the individual stacks that have been created for your cloud gems and for your deployment\.  
![\[AWS CloudFormation stacks visible in the AWS Management Console.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-tutorial-cfn-stacks.png)
**Note**  
If a stack update operation is still in progress, the stack shows the status **UPDATE\-IN\-PROGRESS**\. Otherwise, the status shows **CREATE\-COMPLETE**\. You can click the **Refresh** icon ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-tutorial-cfn-stacks-refresh.png) to update the status\.