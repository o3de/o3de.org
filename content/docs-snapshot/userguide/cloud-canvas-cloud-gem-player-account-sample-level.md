# The Player Account Sample Level<a name="cloud-canvas-cloud-gem-player-account-sample-level"></a>

The CloudGemSamples project contains a sample level named `PlayerAccountSample`\. The player account sample level provides a menu from which players can create an account, verify their email addresses, sign in and out of their accounts, and recover their passwords by email\.

The following table describes the files for the player account sample level\.


****  

| Location | Description | 
| --- | --- | 
| \\dev\\CloudGemSamples\\Levels\\PlayerAccountSample | A level that contains an entity with the Lua script component\. | 
| \\dev\\CloudGemSamples\\Scripts\\PlayerAccount | The Lua scripts that manage the UI canvases and interact with the Player Account Cloud Gem's EBus API\. | 
| \\dev\\CloudGemSamples\\UI\\Canvases\\PlayerAccount | The UI canvases displayed for the player\. | 

Note that in the sample, UI canvases do not include functionality for displaying error messages graphically; instead, error messages are output to the console\. If you integrate this gem into an existing project, you should use the UI canvas to show error messages\. For example, you could do this when the confirmation code is incorrect or the password does not meet the minimum password length\. For more information on using the Player Account Cloud Gem in an existing project, see [Integrating the Player Account Cloud Gem into an Existing Project](cloud-canvas-cloud-gem-player-account-integrating-existing-project.md)\.

The following diagram shows how the UI canvases are connected\. For more information on the Amazon Cognito user pool signup process, see the [Signing Up and Confirming User Accounts](https://docs.aws.amazon.com/cognito/latest/developerguide/signing-up-users-in-your-app.html) page in the [Amazon Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)\.

![\[Player sign in workflow\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-player-account-gem-ui-canvases-connection.png)