# Player Account Cloud Gem Portal<a name="cloud-canvas-cloud-gem-player-account"></a>

The Player Account Cloud Gem provides a standalone player authentication and management solution that uses Amazon Cognito\. The cloud gem includes a player registration API, built\-in two\-step verification, and support for both anonymous and authenticated players\. You can use your Cloud Gem Portal to administer players and manually register, delete, ban, and update their accounts\.

## Prerequisites<a name="cloud-canvas-cloud-gem-player-account-prerequisites"></a>

This tutorial assumes the following:
+ You are using a Lumberyard project that has **Cloud Gem Player Account** enabled\.
+ You have created a project stack in [Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md)\.
+ You have a deployment stack with Player Account Cloud Gem resources in Cloud Canvas Resource Manager\.
+ You have opened the Cloud Gem Portal \(in Lumberyard Editor, choose **AWS**, **Cloud Gem Portal**\.\)

If you don't meet the prerequisites, follow the steps in [Enabling Gems](gems-system-using-project-configurator.md) to add **Cloud Gem Player Account** in the Project Configurator\. For information on creating a project stack and a deployment stack, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

### Legal Restrictions<a name="cloud-canvas-cloud-gem-player-account-legal-restrictions"></a>

You are responsible for \(a\) providing legally adequate privacy notices to your end users; \(b\) obtaining any necessary consent from the end user for the collection, use, transfer, and storage of any name, password, other login information, or personally identifiable information or personal data of any end user that you \(or any third\-party plug\-in or service provider you use\) may access; \(c\) using and authorizing others to access and use the information only for the purposes permitted by the end user; and \(d\) ensuring the information is collected, used, transferred, and stored in accordance with all laws, rules, and regulations applicable in jurisdictions in which your applications are used\.

## Using the Player Account Cloud Gem Portal<a name="cloud-canvas-cloud-gem-player-account-using-the-player-account-cloud-gem-portal"></a>

To open the Player Account Cloud Gem Portal, click **Player Account** on the **Cloud Gems** page\.

![\[Click Player Account\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-1.png)

### Adding Players<a name="cloud-canvas-cloud-gem-player-account-adding-users"></a>

The first screen is the **Player Account** page, which lists the player accounts in your game\. If your game doesn't have any players yet, the list is empty\.

**To add a player to your game**

1. Click **Add Account** to add a player\.  
![\[Click Add Account\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-add-account-button.png)

1. In the **Add Account** dialog box, fill in the appropriate information\. Only the **Username** and **Email** fields are required\.  
![\[Add account dialog box\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-add-account-dialog-box.png)

   After you fill in the information, the player appears in the list of player accounts\.  
![\[Player Account page\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-2.png)

   Each player entry has the following fields:
   + **User Name** – The Amazon Cognito user name\.
   + **Player Name** – The name of the player in the game\.
   + **Cognito Identity ID** – The unique ID of the player in the Amazon Cognito database\. This ID field is initially empty and is filled after the player signs in for the first time\.
   + **Email** – The email of the player\.
   + **Account ID** – An automatically assigned ID\.
   + **Account Status** – The current status of the account\. The following statuses are possible:
     + **Archived** – The account has been archived due to inactivity\. You can change this from the Amazon Cognito console\.
     + **Compromised** – This account requires further investigation from Amazon Cognito console\.
     + **Disabled** – The player account is currently disabled\. You can reenable it on the Amazon Cognito console\.
     + **Force Change Password** – An AWS administrator has used Amazon Cognito to create the player account, and the player now must change their temporary password before they can successfully sign in\.
     + **Reset Required** – The player's account was imported, but the player has not logged in\.
     + **Unconfirmed** – The player account hasn't confirmed the account's email address or phone number\. The account is unusable until it has been confirmed\. To confirm an account manually, see [Confirming an Account](#cloud-canvas-cloud-gem-player-account-confirming-an-account) later in this document\.
     + **Unknown** – The account is in an unknown state\. Use the Amazon Cognito console to investigate further\.

1. You can use the box and filter on the upper right of the **Player Account** page to search the list of player accounts\.  
![\[Filter options\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-3.png)

### Viewing and Editing Account Details<a name="cloud-canvas-cloud-gem-player-account-viewing-and-editing-account-details"></a>

To view the details of an account, click the account\. The **Player Account Profile** page shows additional account details\.

![\[Player account profile\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-4.png)

To edit the player's information, click the settings ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-settings-icon.png) icon in the **Player Account Profile** box\.

![\[Edit player account profile\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-5.png)

All fields are editable except **Account ID** and **Username**\.

![\[Edit player account\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-6.png)

### Confirming an Account<a name="cloud-canvas-cloud-gem-player-account-confirming-an-account"></a>

You can use the Player Account Cloud Gem Portal to confirm an account whose status is **Unconfirmed**\.

**To confirm an account**

1. Click the player account with **Unconfirmed** status\.

1. Click the arrow next to the settings icon\.

1. Choose **Confirm Account**\.

### Banning an Account<a name="cloud-canvas-cloud-gem-player-account-banning-an-account"></a>

Accounts that you ban no longer can log in to the game\.

**To ban an account**

1. On the **Player Account** page, click the ban ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-ban-icon.png) icon next to the player\.  
![\[Banning an account\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-8.png)

1. In the **Ban Player Account** confirmation dialog box, click **Save**\. The account disappears from the **Accounts** tab\.

1. Click the **Banned Players** tab\. The banned account has been added to the banned players list\.  
![\[Banned players list\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-9.png)

### Removing a Ban<a name="cloud-canvas-cloud-gem-player-account-removing-a-ban"></a>

Removing a ban from an account is similar to adding one\.

**To remove an ban from an account**

1. On the **Player Account** page, click the **Banned Players** tab\.  
![\[Banned players list\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-9.png)

1. Click the ban ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-leaderboard-ban-icon.png) icon for the account that you want to reinstate\.  
![\[Remove ban\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-remove-ban.png)

1. In the confirmation dialog box, click **Save**\. 

1. Click the **Accounts** tab\. The account reappears in the list of players\.

## Next Steps<a name="cloud-canvas-cloud-gem-player-account-next-steps"></a>

After you have added player accounts to your Cloud Gem Portal, you can start using them in your game\. The Lumberyard team is always looking for feedback on cloud gems and suggestions for improvements\. Feel free to reach out to us on our [forums](https://forums.awsgametech.com/) or send email to lumberyard\-feedback@amazon\.com\.