---
description: ' Sign up for an &AWS; account, get &AWS; credentials, and initialize
  and administer an &AWS;-enabled &ALY; project in this step-by-step tutorial. '
title: 'Tutorial: Getting Started with &cloud;'
---
# Tutorial: Getting Started with Cloud Canvas {#cloud-canvas-tutorial}

Cloud Canvas connects Lumberyard with Amazon Web Services \(AWS\) and uses cloud gems to enable connected features in your game\. This tutorial shows you how to deploy the resources for a cloud gem enabled project to AWS and guides you through the following tasks:
+ Signing up for an AWS account\.
+ Creating an AWS Identity and Access Management \(IAM\) user to administer your Cloud Canvas project\.
+ Enabling cloud gems in your project\.
+ Adding your IAM administrative credentials to Lumberyard\.
+ Uploading resources to AWS and creating a deployment\.
+ Accessing the Cloud Gem Portal to view and manage your deployed cloud gems\.

Optionally, you can also learn how to inspect your resources in AWS, create IAM users and groups for administrative purposes, and remove Cloud Canvas deployments and resources from AWS\.

## Prerequisites {#cloud-canvas-tutorial-prereqs}

Before starting this tutorial, complete the following:
+ [Install and set up](/docs/userguide/setup/intro.md) Lumberyard\.
+ Read [Implementing Connected Features with Cloud Canvas](/docs/userguide/gems/cloud-canvas/intro.md)\.

## Step 1: Sign up for AWS {#cloud-canvas-tutorial-sign-up}

When you sign up for AWS, you can access all its cloud capabilities\. Cloud Canvas creates resources in your AWS account to make these services accessible through Lumberyard\. You are charged only for the services that you use\. If you are a new AWS customer, you can get started with Cloud Canvas for free\. For more information, see [AWS Free Tier](https://aws.amazon.com/free/)\.

If you or your team already have an AWS account, skip to Step 2\. 

If you do not have an AWS account, complete the following steps to create one\.

**To sign up for an AWS account**

1. Open [https://portal\.aws\.amazon\.com/billing/signup](https://portal.aws.amazon.com/billing/signup)\.

1. Follow the online instructions\.

   Part of the sign\-up procedure involves receiving a phone call and entering a verification code on the phone keypad\.

**Note**  
You must provide a payment method in order to create your account\. Although the tutorials here fall within the [AWS Free Tier](https://aws.amazon.com/free/), be aware that you can incur costs\.
Make a note of your AWS account number, which you will use in the next step\.

## Step 2: Create an IAM User to Administer the Cloud Canvas Project {#cloud-canvas-tutorial-create-iam-admin}

After you sign up for an AWS account, you need an IAM user with appropriate permissions to administer a Cloud Canvas project\. IAM allows you to manage access to your AWS account\.

AWS requires that you provide credentials to verify that you have the appropriate permissions for the AWS services that you access\. You enter these credentials into Lumberyard Editor as part of setting up your project\.

The IAM user that you create will belong to a group that has administrator permissions\. This allows users in this group to create the Cloud Canvas resources and make them accessible through Lumberyard\. Administrative users in this group will have special permissions beyond the scope of a normal Cloud Canvas user\.

In a team environment, you-as a member of the administrator's group-can create IAM users for each member of your team\. With IAM, you can set permissions specifically for each person's role in a project\. For example, you might specify that only designers can edit a database, or prevent team members from accidentally writing to resources with which your players interact\.

For more information on IAM and permissions, see the [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/)\.

### Create an IAM User and an Administrator Group {#cloud-canvas-tutorial-create-iam-admin-user}

This section guides you through IAM best practices by creating an IAM user and an administrator group in your account to which the IAM user belongs\.

**To create an IAM user and group in your account**

1. Sign in to the AWS Management Console and open the IAM console at [https://console\.aws\.amazon\.com/iam/](https://console.aws.amazon.com/iam/)\.

1. In the navigation pane, click **Users**\.

1. Click **Add user**\.

1. For **User name**, enter a user name like *CloudCanvasAdmin*\. The name can contain letters, digits, and the following characters: plus \(\+\), equal \(=\), comma \(,\), period \(\.\), at \(@\), underscore \(\-\), and hyphen \(\-\)\. The name is not case sensitive and can be a maximum of 64 characters\.

1. Select the check box next to **Programmatic access**\.

1. Select the check box next to **AWS Management Console access**, select **Custom password**, and then enter a new password in the text box\.
**Note**  
When you create a user for someone else, you can select **Require password reset** so that the user must create a new password when the user first signs in\. 

1. Click **Next: Permissions**\. 

1. Click **Create group**\.

1. In the **Create group** dialog box, enter a name like *CloudCanvasAdministrators* for the group\. The name can contain letters, digits, and the following characters: plus \(\+\), equal \(=\), comma \(,\), period \(\.\), at \(@\), underscore \(\-\), and hyphen \(\-\)\. The name is not case sensitive and can be a maximum of 128 characters\.

1. In the **Policy name** list, select the check box next to **AdministratorAccess**\. This policy provides the necessary permissions to create and administer a Cloud Canvas project\. 
**Warning**  
The **AdministratorAccess** policy allows almost all permissions within the AWS account and should be attached only to the administrator of the account\. Otherwise, other team members can perform actions that incur unwanted charges in your AWS account\.

1. Click **Create group**\.

1. In the list of groups, select the check box for your new group if it is not already selected\. If necessary, click **Refresh** to see the group in the list\.

1. Click **Next: Review** to review your choices\. 

1. When you are ready to proceed, click **Create user**\.

   Your IAM user is created along with two important credentials: an access key and a secret access key\. Later, you enter these credentials into Lumberyard Editor to access the AWS resources in your project\.

1. Click **Show** to view your secret access key and password, or click **Download \.csv** to download the credentials in a `.csv` file\. Your credentials will look something like this:
   + Access key ID: AKIAIOSFODNN7EXAMPLE
   + Secret access key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

   You can also click **Send email** to receive login instructions by email\. After this point, you cannot view the secret access key from the AWS Management Console\.
**Important**  
Keep the keys confidential in order to protect your AWS account, and never email them\. Do not share them outside your organization, even if an inquiry appears to come from AWS or Amazon\.com\. No one who legitimately represents Amazon will ever ask you for your secret key\.

1. You have now created an IAM user called *CloudCanvasAdmin* and a *CloudCanvasAdministrators* administrator group to which the user belongs\. To confirm this, click **Groups** in the navigation pane\. Under **Group Name**, click *CloudCanvasAdministrators*\. The *CloudCanvasAdmin* user appears in the list of users for the group\.

**Note**  
In this tutorial, you add only one IAM user to the administrator group, but you can add more if required\.

If you lose your secret access key, you must create a new set of keys\.

**To create a new set of keys**

1. Open the IAM console at [https://console\.aws\.amazon\.com/iam/](https://console.aws.amazon.com/iam/)\.

1. In the left navigation pane, click **Users**\.

1. In the **User name** list, click the user name for which you want to generate new access keys\. 

1. On the **Summary** page, click the **Security credentials** tab\. 

1. In the **Access keys** section, click **Create access key**\. 

## Step 3: Enable One or More Cloud Gems in Your Project {#cloud-canvas-tutorial-enable-gem}

Cloud Canvas functionality is enabled in Lumberyard through [gems](/docs/userguide/gems/builtin/s.md) and [cloud gems](/docs/userguide/gems/cloud-canvas/s-intro.md)\. Gems are extensions that share code and assets among Lumberyard projects\. Cloud gems are gems that use the power of AWS to provide connected features\. To enable gems and cloud gems in your project, you use the [Project Configurator](/docs/userguide/configurator/intro.md)\. 

This tutorial uses the Lumberyard CloudGemSamples project, which includes many of the cloud gems that come with Lumberyard\. 

**To enable the CloudGemSamples project**

1. Open the Lumberyard Project Configurator, located at `lumberyard-version\dev\Bin64BuildPlatform\ProjectConfigurator.exe`\. For example, when using Visual Studio 2017 as your build platform, the Project Configurator is located at `lumberyard-version\dev\Bin64vc141\ProjectConfigurator.exe`\. 

1. Click **CloudGemSamples**\.

1. In the upper\-right corner of the Project Configurator, click **Set as default**\.

1. Close the Project Configurator\. 

## Step 4: Add Administrator Credentials to Lumberyard {#cloud-canvas-tutorial-enter-admin-creds}

In order to begin managing a Cloud Canvas project, you add the IAM user credentials that you generated earlier to a profile that Cloud Canvas can easily reference\. To do this, you can use either Lumberyard Editor or a command line prompt\.

**To enter your credentials in Lumberyard Editor**

1. Use one of the following methods to launch Lumberyard Editor:
   + From the desktop, double\-click the Lumberyard Editor icon\. ![\[Image NOT FOUND\]](/images/shared/lumberyard-editor-launch.png) 
   + From Lumberyard Setup Assistant, on the **Summary** page, click **Launch Editor**\.
   + For Visual Studio 2017, navigate to the `lumberyard-version\dev\Bin64vc141` directory and double\-click `Editor.exe`\.

1.  In Lumberyard Editor, choose **AWS**, **Credentials manager**\.   
![\[Open Credentials manager\]](/images/userguide/cloud_canvas/cloud-canvas-credentials-manager-open.png)

1. In the **Credentials Manager** dialog, click **Add profile**\.  
![\[Click Add profile\]](/images/userguide/cloud_canvas/cloud-canvas-credentials-manager-add-profile.png)

1. In the **Add profile** dialog box, enter the following information:
   + For **Profile name**, enter a name of your choice \(for example, **CloudCanvasAdmin**\)\.
   + For **AWS access key** and **AWS secret key**, enter the access key and secret key\.

      
![\[Enter profile information for your AWS account in Lumberyard Editor\]](/images/userguide/cloud_canvas/cloud-canvas-credentials-manager-add-profile-dialog-box.png)
**Important**  
Do not share these credentials with anyone, and do not check them into source control\. These credentials grant control over your AWS account, and a malicious user could incur charges\.

1. Click **Save**\.

1. In **Credentials Manager**, click **OK**\.  
![\[Profile added in the Credentials Manager.\]](/images/userguide/cloud_canvas/cloud-canvas-credentials-manager-profile-added.png)

You have now created a profile to administer a Cloud Canvas project\. The profile name is associated with your credentials, and saved locally on your machine in your AWS credentials file\. This file is normally located in your `C:\Users\user_name\.aws\` directory\. As a convenience, other tools such as the [AWS Command Line Interface](https://aws.amazon.com/cli/) or the [AWS Toolkit for Visual Studio](https://aws.amazon.com/visualstudio/) can access these credentials\. 

## Step 5: Upload Resources to AWS and Create a Deployment {#cloud-canvas-tutorial-upload-resources-to-aws-and-create-a-deployment}

You are now ready for the resources defined by your project to be created in AWS\.

This is a two\-part process:

1. Creating a project stack in AWS that contains the resources that your cloud gems require\.

1. Creating a deployment\. A deployment is a separate, independent copy of your project's AWS resources for a dedicated purpose \(for example, development, testing, or production\)\.

**To upload resources to AWS**

1.  In Lumberyard Editor, choose **AWS**, **Cloud Canvas**, **Resource Manager**\. 

1. In **Resource Manager**, click **Upload all resources**\.  
![\[Upload all resources in AWS.\]](/images/userguide/cloud_canvas/cloud-canvas-tutorial-1.png)

1. In the **Initialize Resource Manager** dialog box, click **Yes**\.  
![\[Initialize Resource Manager\]](/images/userguide/cloud_canvas/cloud-canvas-tutorial-2.png)

1. In the **Initialize Cloud Canvas Resource Manager** dialog box, review the fields provided\.  
![\[Provide a project stack name, AWS profile, and AWS region\]](/images/userguide/cloud_canvas/cloud-canvas-tutorial-3.png)
   + **Project stack name** - This name defaults to the name of your project\. You can provide a different name if you want\.
   + **AWS profile** - This is the profile that you prepared in the previous procedure\. You can click **Edit** to edit this profile or **Add profile** to add another profile\.
   + **AWS region** - This defaults to **us\-east\-1**, which supports all Lumberyard cloud gems\. Not all cloud gems are supported in all AWS regions\.

1. Click **Create**\. The **Progress log** indicates **Operation in progress**\. Creating the project stack in AWS takes about 5 to 10 minutes\.  
![\[Project stack creation in progress\]](/images/userguide/cloud_canvas/cloud-canvas-tutorial-4.png)

1. When the operation finishes, the **Cloud Gem Portal Administrator Account Creation** dialog box appears\. 

   Copy the temporary credentials to the clipboard\. You can right\-click the dialog box and use the context menu or press **Ctrl\+A** to select the credentials and then press **Ctrl\+C** to copy them\.  
![\[Copy your temporary credentials for the Cloud Gem Portal\]](/images/userguide/cloud_canvas/cloud-canvas-tutorial-5.png)
**Important**  
You will need these credentials later to use the Cloud Gem Portal, which is the web management interface for the cloud gems\.

1. Click **OK\.**

1. In the **Create deployment** dialog box, which appears at about the same time as the **Cloud Gem Portal Administrator Account Creation** dialog box, enter a name for your deployment \(for example, **dev**, **test**, or **prod**\)\.  
![\[Enter a deployment name\]](/images/userguide/cloud_canvas/cloud-canvas-tutorial-6.png)

1. Click **Create**\. The deployment operation takes about 10 minutes\.

## Step 6: Access the Cloud Gem Portal {#cloud-canvas-tutorial-access-the-cloud-gem-portal}

Now that your cloud gems have been created, you can manage them in the Cloud Gem Portal\.

**To open the Cloud Gem Portal**

1. In Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\.  
![\[Open the Cloud Gem Portal\]](/images/userguide/cloud_canvas/cloud-canvas-tutorial-7.png)

1. In the **Sign In to the Cloud Gem Portal** box, enter the temporary user name and password that you recorded earlier\.  
![\[Enter your temporary credentials in the Cloud Gem Portal.\]](/images/userguide/cloud_canvas/cloud-canvas-tutorial-8.png)

1. As a security measure, you are required to replace your temporary password\. Enter a new password and click **Save Password**\.

1. After you sign in, the **Cloud Gems** page shows the list of cloud gems that are available in your current deployment\.  
![\[The Cloud Gems page of the Cloud Gem Portal\]](/images/userguide/cloud_canvas/cloud-canvas-tutorial-10.png)

1. Click a cloud gem to see its management page\.

## Step 7: Learn More {#cloud-canvas-tutorial-optional-steps}

See the following resources\.


****  

| Task | Topic | 
| --- | --- | 
| Learn more about each of the cloud gems \(including cloud gems not in the CloudGemSamples project\) | [Cloud Gems](/docs/userguide/gems/cloud-canvas/s-intro.md) | 
| Add additional gems and cloud gems to a project | [Enabling Gems](/docs/userguide/gems/using-project-configurator.md) | 
| Use the AWS Management Console to see your resources in AWS | [Inspect Your Resources in AWS](/docs/userguide/gems/cloud-canvas/tutorial-inspect.md) | 
| Create security groups for Cloud Canvas team management | [Create IAM Users and Groups to Administer Cloud Canvas Teams](/docs/userguide/gems/cloud-canvas/tutorial-team-admin.md) | 
| Manage Cloud Gem Portal users | [User Management in the Cloud Gem Portal](/docs/userguide/gems/cloud-canvas/portal-user-management.md) | 
| Create your own cloud gems and customize the Cloud Gem Portal | [Creating a Cloud Gem](/docs/userguide/gems/cloud-canvas/cgf-getting-started-create-gem.md)[Getting Started With Game Development on the Cloud Gem Portal](/docs/userguide/gems/cloud-canvas/cgf-cgp-dev-gs.md) | 
| Remove the resources that you created in AWS | [Delete Your Cloud Canvas Deployments and Resources](/docs/userguide/gems/cloud-canvas/how-to-delete-deployments.md) | 