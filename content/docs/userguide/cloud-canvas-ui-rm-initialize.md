# Initializing Cloud Canvas Resource Manager<a name="cloud-canvas-ui-rm-initialize"></a>

When you perform an operation that requires an AWS account, and no account has been associated with your Lumberyard project, the **Initialize Cloud Canvas Resource Manager** dialog prompts you for the required information\. 

![\[Initialize Cloud Canvas Resource Manager\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-ui-rm-initialize.png)

**To initialize **Cloud Canvas Resource Manager****

1. When prompted to initialize the **Cloud Canvas Resource Manager**, provide the following information: 
   + For **Project stack name**, enter the name of an [AWS CloudFormation stack](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-whatis-concepts.html#d0e3545) that you will create\. The stack will contain the AWS resources that **Cloud Canvas Resource Manager** will use for your project\. By default, Lumberyard uses the name of your project for the stack name\. A stack with the name that you specify must not already exist in your AWS account for the region you select\. 
   +  For **AWS Credentials**, select from the list of available profiles or create a new one\. If you have no [AWS profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-multiple-profiles) on your computer, you are prompted for an AWS secret key and an AWS access key\. You can also edit an existing one\. 

     In order to use Lumberyard with AWS, you must provide administrative credentials for your AWS account either directly, or through an AWS profile\. For information on how to get these credentials from AWS, see the [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.
   +  For **AWS region**, specify the AWS data center where your resources will reside\. You must choose a region that supports all the AWS services that your game uses\. The region you choose must also support the Amazon Cognito service, which Lumberyard uses to establish player identity, and AWS CloudFormation, which Lumberyard uses to create and manage resources\. For more information about the capabilities of different regions, see [AWS Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html)\. 

1. Click **Create** to start the initialization process\. In the navigation tree, the [**Project stack**](cloud-canvas-ui-rm-project-stack.md) node is selected, and in the detail pane, the [**Progress log**](cloud-canvas-ui-rm-progress-log.md) shows the progress of the initialization\. 