---
linktitle: Using the C++ API
title: Using the C++ API with the AWS Client Auth Gem
description: Get an overview of using the C++ API with the AWS Client Auth Gem in Open 3D Engine (O3DE).
toc: true
weight: 400
---

The AWS Client Auth Gem provides a C++ API for making client authorization and user management requests and handling notifications using the O3DE EBus. For more information about using the EBus system, refer to the [EBus](/docs/user-guide/programming/messaging/ebus) documentation.

## C++ API Reference

The source code for the [AWS Client Auth](https://github.com/aws/o3de-repo/tree/main/Gems/AWSClientAuth) Gem, hosted in the `aws/o3de-repo` GitHub repository, contains the complete C++ API.

In particular, for Amazon Cognito authorization requests, refer to the documentation for the [IAWSCognitoAuthorizationRequests](https://github.com/aws/o3de-repo/blob/main/Gems/AWSClientAuth/Code/Include/Authorization/AWSCognitoAuthorizationBus.h) interface and the [AWSCognitoAuthorizationNotifications](https://github.com/aws/o3de-repo/blob/main/Gems/AWSClientAuth/Code/Include/Authorization/AWSCognitoAuthorizationBus.h) notification bus for handler functions.

For Amazon Cognito user management requests, refer to the documentation for the [IAWSCognitoUserManagementRequests](https://github.com/aws/o3de-repo/blob/main/Gems/AWSClientAuth/Code/Include/UserManagement/AWSCognitoUserManagementBus.h) interface and the [AWSCognitoUserManagementNotifications](https://github.com/aws/o3de-repo/blob/main/Gems/AWSClientAuth/Code/Include/UserManagement/AWSCognitoUserManagementBus.h) notification bus for handler functions.

For authentication requests using one of the supported authentication providers, refer to the documentation for the [AuthenticationProviderInterface](https://github.com/aws/o3de-repo/blob/main/Gems/AWSClientAuth/Code/Include/Authentication/AuthenticationProviderBus.h) interface and the [AuthenticationProviderNotifications](https://github.com/aws/o3de-repo/blob/main/Gems/AWSClientAuth/Code/Include/Authentication/AuthenticationProviderBus.h) notification bus for handler functions.

Reference documentation for specific authentication provider implementations can be found in [AWSCognitoAuthenticationProvider](https://github.com/aws/o3de-repo/blob/main/Gems/AWSClientAuth/Code/Source/Authentication/AWSCognitoAuthenticationProvider.h), [GoogleAuthenticationProvider](https://github.com/aws/o3de-repo/blob/main/Gems/AWSClientAuth/Code/Source/Authentication/GoogleAuthenticationProvider.h), and [LWAAuthenticationProvider](https://github.com/aws/o3de-repo/blob/main/Gems/AWSClientAuth/Code/Source/Authentication/LWAAuthenticationProvider.h).
