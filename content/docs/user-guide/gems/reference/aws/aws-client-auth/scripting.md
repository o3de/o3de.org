---
linktitle: Scripting Client Auth
title: AWS Client Auth Scripting
description: Examples of using the AWS Client Auth Gem with Script Canvas and Lua in Open 3D Engine (O3DE).
weight: 300
toc: true
---

{{< preview-new >}}

This page demonstrates example usage of Script Canvas nodes and Lua scripting defined by the AWS Client Auth Gem.

## Script Canvas

### Initialize

Initializes all event buses (EBuses) from the AWS Client Auth Gem.

Note the use of a `Providers` variable, which is an array of strings.

Input data pins:

* Providers
* Authentication provider registry file path

Output data pins:

* Result

![Scripting AWS Client Auth Initialize node](/images/user-guide/gems/reference/aws/aws-client-auth/scripting-initialize.png)

### Amazon Cognito user pool password sign-in flow

The following image shows the password sign-in flow in an Amazon Cognito user pool.

Note the variables created for providers, tokens, and credentials.

![Scripting password sign in with the Amazon Cognito user pool](/images/user-guide/gems/reference/aws/aws-client-auth/scripting-password-sign-in.png)

### Login with Amazon device sign-in flow

![Scripting LWA device sign in](/images/user-guide/gems/reference/aws/aws-client-auth/scripting-lwa-device-sign-in.png)

## Lua

### Auth notification handler

Example script:

```lua
local auth = {
    Properties = {
        EventNames = {"level_started", "login", "logout", "level_completed"}
    }
}
 
function auth:OnActivate()
    self.authenticationNotificationBus = AuthenticationProviderNotificationBus.Connect(self)
    self.awsCognitoAuthorizationNotificationBus = AWSCognitoAuthorizationNotificationBus.Connect(self)
    LyShineLua.ShowMouseCursor(true)
end
 
function auth:OnPasswordGrantSingleFactorSignInSuccess(tokens)
    Debug.Log("Lua:login Success. Got tokens")
end
 
function auth:OnPasswordGrantSingleFactorSignInFail(errorMessage)
    Debug.Log("Lua:login fail: "..errorMessage)
end
 
function auth:OnRequestAWSCredentialsSuccess(creds)
    Debug.Log("Lua:Creds success")
end
 
function auth:OnRequestAWSCredentialsFail(errorMessage)
    Debug.Log("Lua:Get Creds fail: "..errorMessage)
end
 
function auth:OnDeactivate()   
    self.authenticationNotificationBus:Disconnect()
    self.awsCognitoAuthorizationNotificationBus:Disconnect()
end
 
return auth
```
