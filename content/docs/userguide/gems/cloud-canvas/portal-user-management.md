---
description: ' Manage users and administrators of your Cloud Gem Portal in &ALYlong;. '
title: User Management in the Cloud Gem Portal
---
# User Management in the Cloud Gem Portal {#cloud-canvas-cloud-gem-portal-user-management}


****

|  |
| --- |
|  The Cloud Gem Portal \(CGP\) is deprecated and will be removed in a future version of Lumberyard\.  |

Starting in Lumberyard 1\.10, the Cloud Gem Portal authentication API requires all Cloud Gem Portal users to have a valid Cloud Gem Portal account to sign in\. You can use the new **User Administration** page in the Cloud Gem Portal for your project to create and manage these accounts\. User accounts can have one of two roles: **Portal Admin** or **User**\. Only users with the **Portal Admin** role can access the **User Administration** page and manage other users\. User names must be unique, and new users are required to change their password the first time that they sign in\.

**Note**
This feature is not related to the [Login with Amazon](https://developer.amazon.com/login-with-amazon) feature that Lumberyard itself uses\. Because your Cloud Gem Portal does not exist publicly and is not registered with Login with Amazon, you cannot use your Login with Amazon account with the Cloud Gem Portal\.

## Prerequisites {#cloud-canvas-cloud-gem-user-management-prerequisites}

This tutorial assumes the following:
+ You are using a Lumberyard project that has the Cloud Gem Framework Gem enabled \(in the Project Configurator, select **Cloud Gem Player Framework**\)\.
+ You have created a project stack in [Cloud Canvas Resource Manager](/docs/userguide/gems/cloud-canvas/ui-rm-overview.md)\.

If you don't meet the prerequisites, follow the steps in [Enabling Gems](/docs/userguide/gems/using-project-configurator.md) to add **Cloud Gem Framework** in the Project Configurator\. For information on creating a project stack and accessing the Cloud Gem Portal, see [Tutorial: Getting Started with Cloud Canvas](/docs/userguide/gems/cloud-canvas/tutorial.md)\.

### Legal Restrictions {#cloud-canvas-cloud-gem-user-management-legal-restrictions}

You are responsible for \(a\) providing legally adequate privacy notices to your end users; \(b\) obtaining any necessary consent from the end user for the collection, use, transfer, and storage of any name, password, other login information, or personally identifiable information or personal data of any end user that you \(or any third\-party plug\-in or service provider you use\) may access; \(c\) using and authorizing others to access and use the information only for the purposes permitted by the end user; and \(d\) ensuring the information is collected, used, transferred, and stored in accordance with all laws, rules, and regulations applicable in jurisdictions in which your applications are used\.

## Managing Users {#cloud-canvas-cloud-gem-portal-user-management-managing-users}

To manage users of your Cloud Gem Portal, use the **User Administration** page\.

**To open the User Administration page**

1. In Lumberyard Editor, choose **AWS**, **Open Cloud Gem Portal**\. If this is your first time, follow the steps in [Tutorial: Getting Started with Cloud Canvas](/docs/userguide/gems/cloud-canvas/tutorial.md) to sign in with your temporary administrator account credentials\. You must change your password immediately after you sign in\.

1. Click **Administration** or its gear ![\[Image NOT FOUND\]](/images/userguide/shared/cloud-canvas-cloud-gem-text-to-speech-cgp-4.png) icon in the left navigation pane of the Cloud Gem Portal to open the **User Administration** page\.
![\[User Administration page\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-user-management-1.png)

The page shows the current list of users that have access to your project's portal\. The Cloud Gem Portal has two roles: **Portal Admin** and **User**\. Administrators have access to the **Admin** page and can add and remove users\. Nonadministrative users do not see the **Admin** page but have access to cloud gems\.

### Adding Users {#cloud-canvas-cloud-gem-portal-user-management-adding}

To add a user to your project, you can use the **Admin** page or the Amazon Cognito management console\. Using the **Admin** page is easier and ensures that the permissions are correct\.

**To add a user to the Cloud Gem Portal**

1. Click **Add New User**\.
![\[Add a user\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-user-management-2.png)

1. Fill in the fields, which have the restrictions noted\.
![\[Type user information\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-user-management-3.png)
+ **Username** - The user name is case sensitive and must not contain spaces\. It cannot be changed after it is assigned\. Each user name must be unique\.
+ **Email** - Because new users are sent temporary passwords by email, you must provide a valid email address\.
+ **Temporary Password** - A random temporary password is provided by default, but you can change this\. The password must have eight characters and include at least one uppercase letter, one lowercase letter, one number, and one special \(nonalphanumeric\) character\.
+ **Roles** - Choose **Admin** to grant the user access to the **Admin** page and give them permissions to and remove users\. Choose **User** for other users\.

After you create the user, the user is sent an email with the temporary password\. After the new user signs in, the user is required to change passwords\.

### Deleting Users {#cloud-canvas-cloud-gem-portal-user-management-deleting}

To delete a user, click the delete icon for the user on the **User Administrator** page\.

![\[Delete a user\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-user-management-4.png)

After you confirm the deletion at the confirmation prompt, the user account is removed and the user is no longer able to sign in\.

### Resetting User Passwords {#cloud-canvas-cloud-gem-portal-user-management-resetting-passwords}

To reset a user's password, click the arrow next to the delete icon for the user, and then click **Reset Password**\.

![\[Reset a password\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal-user-management-5.png)