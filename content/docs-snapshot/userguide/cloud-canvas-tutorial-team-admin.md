# Create IAM Users and Groups to Administer Cloud Canvas Teams<a name="cloud-canvas-tutorial-team-admin"></a>

To manage your team members' access to AWS resources, you create IAM users, a group for the users, and then attach the appropriate Cloud Canvas customer managed policies to the group\. The policies that Cloud Canvas creates for your IAM users are more restrictive than those for an administrator\. You can use these policies so that your team members do not inadvertently incur charges without administrator approval\.

**To create IAM users and a user group with managed policies**

1. Sign in to the AWS Management Console with your *CloudCanvasAdmin* credentials\. See [Inspect Your Resources in AWS](cloud-canvas-tutorial-inspect.md)\.

1. Do one of the following:
   + In the **AWS services** search box, enter **IAM**, and then click **IAM**\.
   + Expand **All services** and under **Security, Identity & Compliance**, click **IAM**\.

1. In the navigation pane, click **Users**\.

1. Click **Add user**\.

1. On the **Add user** page, in the **User name** box, enter an IAM user name for a team member\. 

   The user name can contain of letters, digits, and the following characters: plus \(\+\), equal \(=\), comma \(,\), period \(\.\), at \(@\), underscore \(\-\), and hyphen \(\-\)\. The name is not case sensitive and can be a maximum of 64 characters\.

1. For each additional user, click **Add another user**, and then enter a user name\.

1. Under **Select AWS access type**, select **Programmatic access** and/or **AWS Management Console access**, depending on the access that you want each user to have\. 

   If you choose **AWS Management Console access**, the **Console password** and **Require password reset** options appear\.
   + **Console password** – Enter a password or choose to have a password generated automatically \(default\)\.
   + **Require password reset** – Requires your users to create a password at their next sign in\. This is selected by default\.

1. Click **Next: Permissions**\.

1. Click **Create group** to create an IAM group for your new users\.

1. On the **Create group** page, for **Group name**, enter a name for the group \(for example, *CloudCanvasDevelopers*\)\.

   The group name can contain letters, digits, and the following characters: plus \(\+\), equal \(=\), comma \(,\), period \(\.\), at \(@\), underscore \(\-\), and hyphen \(\-\)\. The name is not case sensitive and can be a maximum of 128 characters\. 

1. To find the IAM customer managed policy that Cloud Canvas created for you, click **Filter policies** and then select **Customer managed**\.

1. Select the appropriate policies that you want to apply to the group\. Related policies are those that include the name of your project \(for example, `CloudGemSamples-CloudGemPortalUserAccess`\)\. 

   To decide which policies to include, use the information in the following table\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/cloud-canvas-tutorial-team-admin.html)

1. Click **Create group**\.

1. Click **Next: Review**\. The **Review** page lists the user names that you created and summarizes the permissions that are to be granted\.

1. Click **Create users**\. 

   After you successfully created your users, you can view the access key ID, secret access key, and automatically generated password for each new user\. You can also email users instructions to sign in to the AWS Management Console\.

1. Click **Download \.csv** to download a `.csv` file that has the keys for all the users that you created\. Make sure you preserve the credentials in a safe place\. 
**Important**  
After this point, you cannot view the secret access key from the AWS Management Console\. You must deliver each user his or her keys securely\.
As an administrator, it is your responsibility to keep your team and your AWS account secure\. Amazon provides some best practices and options for how to manage your team’s access keys on the [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id-credentials-access-keys.html) page in the *IAM User Guide*\. You are encouraged to read this thoroughly\. 

1. Click **Close**\.

Next, have your team members use Lumberyard Editor to create their AWS profiles with the credentials that you provided\.

**To have users create AWS profiles**

1. In Lumberyard Editor, have each user choose **AWS**, **Credentials manager**\.

1. Have the user enter a new profile name and his or her access and secret access keys\.
**Important**  
 Stress the importance to your users of keeping their keys secure and not sharing them\.

For information regarding limits on the number of groups and users in an AWS account, see [Limitations on IAM Entities and Objects](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-iam-limits.html) in the *IAM User Guide*\.