# Building the Menus for the Player Account Cloud Gem<a name="cloud-canvas-cloud-gem-player-account-building-menus"></a>

To build the menus, use the code for `CloudGemPlayerAccountRequestBus` and `CloudGemPlayerAccountNotificationBusHandler` in the `dev\Gems\CloudGemPlayerAccount\Code\Include\CloudGemPlayerAccount\CloudGemPlayerAccountBus.h` file\. Keep in mind the following points:
+ Most of the EBus events are wrappers for Amazon Cognito user pool API operations\. For the Amazon Cognito API reference, see [Amazon Cognito Identity Provider](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/Welcome.html)\.

   
+ To return the user name for the currently logged\-in player, call the `GetCurrentUser` function, which has a corresponding `OnGetCurrentUserComplete` event\. This function and EBus event are not part of the Amazon Cognito user pool API but are needed for most calls to the API\.

   
+ The `GetCurrentUser` function also loads the credentials that were returned and caches them inside the gem's system component\. As a result, subsequent calls to `GetCurrentUser` are faster\.

   
+ The act of signing in also caches the player's credentials inside the gem's system component\.

For information about Player Account Cloud Gem functions for creating accounts, password recovery, signing in and out, and account management, see [Player Account Cloud Gem Implementation Details](cloud-canvas-cloud-gem-player-account-details.md)\.