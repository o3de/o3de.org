# Testing the Player Account Cloud Gem<a name="cloud-canvas-cloud-gem-player-account-testing"></a>

To test the Player Account Cloud Gem, you can use the CloudGemSamples project that is included with Lumberyard\.

**To test the Player Account Cloud Gem**

1. In the Project Configurator, select the **CloudGemSamples** project\.

1. Start Lumberyard Editor\.

1. On the **Welcome to Lumberyard Editor** screen, click **Open level**, **Levels**, **PlayerAccountSample**, **Open**\.

1. Click **AWS**, **Cloud Canvas**, **Select a Deployment**\.

1. Click the deployment that you want to use, and then click **OK**\.

1. Press **Ctrl\+G** to start the game\.

1. In the main menu of the sample, click **Create Account**\.  
![\[Create account\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-1.png)
**Note**  
If the **Create Account** option does not appear, click **Sign Out** and try again\. 

1. Enter a user name, password, and an email account to which you have access\.  
![\[Type test credentials\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-2.png)

1. Click **Create**\.

1. From the email account, copy the confirmation code that you receive\.

1. In Lumberyard, paste the confirmation code into the **Verification Code** box, and then click **Verify**\.  
![\[Verification code\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-3.png)

1. Sign in using the password that you specified earlier\. This tests the custom authentication flow\.  
![\[Sign in\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-4.png)

1. Click **Manage Account**\.  
![\[Manage account\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-5.png)

1. Click **Edit Account**\.  
![\[Edit account\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-6.png)

1. Type in a name for **Player Name**, and then click **Save**\. This step tests the player service API\.  
![\[Type a player name\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-7.png)

   The main menu displays the player name that you specified\.  
![\[Player name in main menu\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-8.png)

1. Press **ESC** to stop the game\.

1. In Lumberyard Editor, click **AWS**, **Open Cloud Gem Portal**\.

1. In the Cloud Gem Portal, choose the deployment that you are using for the test\.  
![\[Choose deployment\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-9.png)

1. Click **Player Account**\.  
![\[Click Player Account\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-10.png)

1. The gem displays the account that you created\.  
![\[Click the account\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-11.png)

   Click the account so that you can edit its information\. These steps test the administrative service API\.

1. In **Player Account Profile**, click the gear ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-settings-icon.png) icon to edit the player profile\.  
![\[Click Edit\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-12.png)

1. Make a change to the player name, and then click **Save**\.  
![\[Change the player name\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-13.png)

1. Verify the change in the profile for the player\.  
![\[Verify change\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-player-account-testing-14.png)