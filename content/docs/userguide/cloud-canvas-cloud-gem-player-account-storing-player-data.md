# Storing Data Associated with a Player Account<a name="cloud-canvas-cloud-gem-player-account-storing-player-data"></a>

Each player account has a randomly generated account ID\. When you store data associated with a player, use this ID instead of the identifiers provided by the Amazon Cognito user and identity pools\. You should do this for the following reasons:
+ Lumberyard uses the `PlayerAccounts` table defined in the `dev\Gems\CloudGemPlayerAccount\AWS\resource-template.json` file to map account IDs to Amazon Cognito IDs\. By associating a player's data with the account ID, you can move all of the player's data from one identity to another by simply updating the mapping\.

   
+ The Amazon Cognito ID on the Amazon Cognito identity pool is not guaranteed to stay the same for a particular player\. For example, it can change if identities are merged\. Amazon Cognito identity pools are public facing and do not prevent the merging of identities\.

   
+ If you configure the `PlayerAccess` identity pool to support identity providers other than the Amazon Cognito user pool, the user pool's user name cannot be used for players that use another provider\.

   
+ If a user name is deleted from the Amazon Cognito user pool, the name can be reused\. Amazon Cognito user pools are publicly visible and do not prevent a player from deleting his or her own user name\.

A `PlayerName` field is provided in the `PlayerAccounts` table as an example of how to store player data for an account\. The Amazon Cognito user pool supports storing a variety of attributes and could also be used for storing player data\. However, this is not recommended if you configure the `PlayerAccess` identity pool to use more than one identity provider\. In such a scenario, some players might not have a user in the Amazon Cognito user pool\.

**Warning**  
Do not store the data for unauthenticated \(guest or anonymous\) players who are using an Amazon Cognito ID directly or indirectly on the server\. The reasons not to store this data are the following:  
A person who knows the Amazon Cognito ID for an unauthenticated account can claim the identity by linking it to a user that the person controls\. The identity's original owner cannot recover the account if an original device is lost or the identity is stolen\. For more information on identity pools, see [Identity Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html)\.  
 
The local copy of the unauthenticated Amazon Cognito ID is overwritten with a new one when the player logs in and out\.  
 
The player has no way to recover an unauthenticated Amazon Cognito ID after it has been overwritten locally\. The identity still exists in the identity pool, but the identity and data associated with its Amazon Cognito ID effectively become orphaned\.  
 
The buildup of orphaned identities can be misleading when trying to determine the actual number of players\.  
 
If a player uses an unauthenticated identity and then creates a new account, the account ID from the unauthenticated identity does not carry over to the new account\.

## Obtaining Player Account IDs<a name="cloud-canvas-cloud-gem-player-account-obtaining-player-ids"></a>

You can use the following techniques to obtain player account IDs and account information programmatically\.
+ **To get a player's account ID in game** – Call `GetPlayerAccount` on the `CloudGemPlayerAccountRequestBus`\. This EBus is defined in the `dev\Gems\CloudGemPlayerAccount\Code\Include\CloudGemPlayerAccount\CloudGemPlayerAccountBus.h` file\. The player's account ID is in the `AccountResultInfo` parameter of `CloudGemPlayerAccountNotificationBusHandler::OnGetPlayerAccountComplete`\.

   
+ **To get the account ID from a Lambda function located behind an API Gateway** – Because Amazon API Gateway provides the Amazon Cognito ID to the Lambda function, the Lambda function can look up the account ID\. To quickly look up the account ID, you can use the global secondary index `CognitoIdentityIdIndex` of the `PlayerAccounts` table\. The `PlayerAccounts` table is defined in the `dev\Gems\CloudGemPlayerAccount\AWS\resource-template.json` file\.

   
+ **To get the caller's account information without relying on the caller to provide its account ID** – Use the request's authentication parameters\. For an example, see the code in the `dev\Gems\CloudGemPlayerAccount\AWS\lambda-function-code\api\account.py` file\.