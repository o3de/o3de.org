# Integrating the Player Account Cloud Gem into an Existing Project<a name="cloud-canvas-cloud-gem-player-account-integrating-existing-project"></a>

To integrate the Player Account Cloud Gem into an existing project, you must enable the Player Account Cloud Gem, update your deployment stack, and integrate the gem into your game menu\.

**To integrate the Player Account Cloud Gem into an existing project**

1. Enable the gem\. In the Project Configurator, click **Cloud Gem Player Account**\.

1. [Create or update the project stack](cloud-canvas-ui-rm-project-stack.md)\.

   The Player Account Cloud Gem uses an Amazon Cognito user pool\. If you created your project using a version of Lumberyard earlier than 1\.9, update it by opening a command prompt window in the \\dev directory and entering the following command\.

   ```
   lmbr_aws project update
   ```

1. [Create or update the deployment stack](cloud-canvas-ui-rm-deployments.md)\. Be sure the `CloudGemPlayerAccount` resource group is added to your deployment\. If your deployment doesn't have the `CloudGemPlayerAccount` resource group, make sure that the Cloud Gem Player Account gem is enabled in the Project Configurator\.

1. At a command prompt, enter the following command to update the deployment access stack\.

   ```
   lmbr_aws deployment update-access
   ```

   This ensures that the `CloudGemPlayerAccount` resource group is correctly linked to the `PlayerAccess` identity pool in the deployment access stack\.

1. Integrate the gem into your game menu\. We recommend that you include the following features:
   + **A global signout** – This security feature allows players to invalidate an account's tokens across all devices if a device has been lost or stolen\. The sample level shows how to offer this as a standalone feature\. If the previous password was compromised and already used to obtain authentication tokens, you can also have the menu automatically globally sign out after a password change\. To implement this functionality, do the following:

     1. Monitor the `CloudGemPlayerAccountNotifications::OnChangePasswordComplete` EBus event\.

     1. When you receive confirmation that the password change has succeeded, send the following event\.

        ```
        EBUS_EVENT(CloudGemPlayerAccountRequestBus, GlobalSignOut, username)
        ```

      
   + **Email verification** – An email verification step ensures that email can be used to recover account access if a password has been forgotten\. You can customize the content of the verification emails by using Lambda triggers\. To add a new Lambda trigger to the AWS CloudFormation template, use the `LambdaConfig` property of `PlayerUserPool` in the `dev\Gems\CloudGemPlayerAccount\AWS\resource-template.json` file\. For more information, see [Customizing User Pool Workflows by Using AWS Lambda Triggers](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html)\.