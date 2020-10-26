# Player Account Cloud Gem Implementation Details<a name="cloud-canvas-cloud-gem-player-account-details"></a>

You can use the API operations described on this page to manage player accounts with the [Player Account Cloud Gem Portal](cloud-canvas-cloud-gem-player-account.md)\.

## Functions and Callbacks<a name="cloud-canvas-cloud-gem-player-account-details-functions-and-callbacks"></a>

Most functions for the Player Account Cloud Gem have a corresponding callback that supplies the results of the call\. The results contain the information gathered or error information\. To make calls to and receive responses from player registration and login component API operations, you use the [EBus](ebus-intro.md)\.

The callbacks use this naming convention: For every function `X`, the corresponding callback function is named `OnXComplete`\. For example, when a response to an EBus call of `SignUp()` is ready, the response is sent through the EBus to `OnSignUpComplete()`\. For more examples, see `dev\Gems\CloudGemPlayerAccount\Code\Include\CloudGemPlayerAccount\CloudGemPlayerAccountBus.h`\.

`HasCachedCredentials()` is an exception to this convention because it is a synchronous call and has no corresponding handler\.

## Functions for Key Player Account Cloud Gem Tasks<a name="cloud-canvas-cloud-gem-player-account-details-functions-tasks"></a>

You can use the functions described in this section for new account creation, password recovery, player sign\-in, and account management\. Most of the source code for the classes and functions can be found in the Lumberyard directory `\dev\Gems\CloudGemPlayerAccount\Code\Source`\.

### Creating an Account \(CloudGemPlayerAccountBus\)<a name="cloud-canvas-cloud-gem-player-account-details-creating-account"></a>

Use the following functions for creating new accounts\.

 `SignUp(username, password, attributes)`  
Creates an account\. The `attributes` parameter contains relevant data \(for example, email, address, name, and profile\)\. A confirmation email or text message is sent to the player as part of the signup\. Password recovery requires a valid email address\.

 `OnSignUpComplete(resultInfo, deliveryDetails, wasConfirmed)`  
A callback function that returns the [results](#cloud-canvas-cloud-gem-player-account-details-basicresultinfo-class) of the signup\. The [deliveryDetails](#cloud-canvas-cloud-gem-player-account-details-deliverydetails-class) attribute contains details about where the confirmation code was sent\.

 `ResendConfirmationCode(username)`  
 Resends the confirmation code to the player\. The confirmation code received from the player is passed as an argument to `ConfirmSignUp(username, confirmationCode)`\.

### Password Recovery \(CloudGemPlayerAccountSystemComponent\)<a name="cloud-canvas-cloud-gem-player-account-details-password-recovery"></a>

Use the following functions if a player has forgotten a password and has an account with a valid email or phone number\.

`ForgotPassword(username)`  
Causes a confirmation code to be sent to the player\.

`OnForgotPasswordComplete(resultInfo, deliveryDetails)`  
Contains information regarding the password reset\.

`ConfirmForgotPassword(username, password, confirmationCode)`  
Receives the confirmation code, user name, and new password from the player and sets the new password\.

### Sign In and Sign Out<a name="cloud-canvas-cloud-gem-player-account-details-sign-in-sign-out"></a>

Use the following functions to sign players in and out of your game\.

`InitiateAuth(username, password)`  
Call this function to sign in players\. Sign\-in is a two\-step process\. When `InitiateAuth` finishes, the server issues a challenge to which the client must respond correctly\. Currently, authorization by user name and password is supported; MFA and other forms of additional authentication are not\.

You have two ways to sign out: `SignOut(username)` and `GlobalSignOut(username)`\.

`SignOut`  
Clears all cached authentication information from memory, so that the player's credentials are essentially forgotten\. No server\-side changes occur, so the authentication information, if it were known, could still be used\. The `SignOut` function always succeeds, even if the player is not actually signed in\.

`GlobalSignOut`  
Invalidates all access and refresh tokens for the player on all devices that the player might be signed into\. Unlike `SignOut`, `GlobalSignOut` can succeed only when the player is signed in\.

### Account Management \(CloudGemPlayerAccountSystemComponent\)<a name="cloud-canvas-cloud-gem-player-account-details-account-management"></a>

All of the following functions require that the player be signed in\.

`ChangePassword(username, previousPassword, proposedPassword)`  
Allows a player to update a password without the use of a confirmation code\.

`DeleteOwnAccount(username)`  
Deletes the player's account\. Use this function with caution\.

`GetUser(username)`  
Retrieves attributes \(for example, email, address, name, and profile\) that have been associated with the player's account\.

`UpdateUserAttributes(username, attributes)`  
Updates the specified set of attributes\. If any updates require verification, confirmation codes are sent\. Details are found in the `deliveryDetailsArray` parameter that is passed to `OnUpdateUserAttributesComplete`\. Note that it is possible to update attributes that previously did not have any associated information\.

`VerifyUserAttribute(username, attributeName, confirmationCode)`  
Following a call to `UpdateUserAttributes`, verifies a single attribute that requires confirmation\. Most attribute updates do not require verification\.

`DeleteUserAttributes(username, attributesToDelete)`  
Removes the specified set of attributes from the player's account\. The attributes can be added again with a call to `UpdateUserAttributes`\.

## Key Player Account Cloud Gem Classes and Functions<a name="cloud-canvas-cloud-gem-player-account-details-key-classes-and-functions"></a>

This section describes key classes and functions in the Player Account Cloud Gem\.

### BasicResultInfo Class<a name="cloud-canvas-cloud-gem-player-account-details-basicresultinfo-class"></a>

The `BasicResultInfo` class bundles together information returned in almost all responses from the component\. The class has no functions to be used at run time and contains the following values, which are public:

 `wasSuccessful`  
A Boolean that indicates whether the request succeeded\.

 `username`  
The name of the player for which a request was made\.

 `errorTypeName`  
The name of the error type\.

 `errorTypeValue`  
The numeric value of the error type\. If `errorTypeValue` is greater than or equal to 0, it corresponds to a standard `CognitoIdentityProviderErrors` value\. Otherwise, an unexpected error occurred\. Most commonly, the player has not yet signed in for the operation\. In this case, see the error information in `errorTypeName` for details\.

 `errorMessage`  
A human readable string that describes the error\.

### DeliveryDetails Class<a name="cloud-canvas-cloud-gem-player-account-details-deliverydetails-class"></a>

The `DeliveryDetails` class provides details related to the sending of confirmation codes to the player\. it contains the following string functions:

 `GetAttributeName()`  
The name of the attribute for which a confirmation code was sent \(for example, `email`\)\.

 `GetDeliveryMedium()`  
The medium used to send the confirmation code \(for example, `EMAIL`\)\.

 `GetDestination()`  
The destination to which the confirmation code was sent\. The destination is partially obscured for security \(for example, `d***@a***.com`\)\.

### DeliveryDetailsArray Class<a name="cloud-canvas-cloud-gem-player-account-details-deliverydetailsarray-class"></a>

The `DeliveryDetailsArray` class is a collection of `DeliveryDetails` objects and contains the following functions:

 `GetSize()`  
The number of `DeliveryDetails` objects in the array\.

 `At(index)`  
Returns a copy of the object at the specified index\.

### UserAttributeValues Class<a name="cloud-canvas-cloud-gem-player-account-details-userattributevalues-class"></a>

 `UserAttributeValues` maps attribute names like `address`, `email`, and `family_name` to attribute values\. An attribute value can be a string up to 256 characters\. In general, the attributes are those used by the [OpenID Connect specification](http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)\. See the `UserAttributeValues.h` file for details\.

Phone numbers must follow these formatting rules:
+ The phone number must start with a plus \(\+\) sign, followed immediately by the country code\.
+ The phone number can contain only the \+ sign and digits\.
+ You must remove characters such as parentheses, spaces, or dashes from the phone number before submitting the value\. For example, a United States–based phone number must follow the format `+14325551212`\.

## Resource Group<a name="cloud-canvas-cloud-gem-player-account-details-resource-group"></a>

The Player Account Cloud Gem uses an Amazon Cognito user pool that contains all registered players\. It is set as an authentication provider with `PlayerAccessIdentityPool`\. For more information, see [Controlling Access to Resources](cloud-canvas-setting-access-permissions.md)\.