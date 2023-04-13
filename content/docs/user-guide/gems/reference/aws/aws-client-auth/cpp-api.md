---
linktitle: Using the C++ API
title: Using the C++ API with the AWS Client Auth Gem
description: Get an overview of using the C++ API with the AWS Client Auth Gem in Open 3D Engine (O3DE).
toc: true
weight: 400
---

The AWS Client Auth Gem provides a C++ API for making client authorization and user management requests and handling notifications using the O3DE EBus. For more information about using the EBus system, refer to the [EBus](/docs/user-guide/programming/messaging/ebus) documentation.

## C++ API Reference

The O3DE API Reference Guide has a complete reference to the [AWS Client Auth](/docs/api/gems/awsclientauth) C++ API.

In particular, for Amazon Cognito authorization requests, refer to the documentation for the [IAWSCognitoAuthorizationRequests](https://o3de.org/docs/api/gems/awsclientauth/class_a_w_s_client_auth_1_1_i_a_w_s_cognito_authorization_requests.html) interface and the [AWSCognitoAuthorizationNotifications](https://o3de.org/docs/api/gems/awsclientauth/class_a_w_s_client_auth_1_1_a_w_s_cognito_authorization_notifications.html) notification bus for handler functions.

For Amazon Cognito user management requests, refer to the documentation for the [IAWSCognitoUserManagementRequests](https://o3de.org/docs/api/gems/awsclientauth/class_a_w_s_client_auth_1_1_i_a_w_s_cognito_user_management_requests.html) interface and the [AWSCognitoUserManagementNotifications](https://o3de.org/docs/api/gems/awsclientauth/class_a_w_s_client_auth_1_1_a_w_s_cognito_user_management_notifications.html) notification bus for handler functions.

For authentication requests using one of the supported authentication providers, refer to the documentation for the [AuthenticationProviderInterface](https://o3de.org/docs/api/gems/awsclientauth/class_a_w_s_client_auth_1_1_i_authentication_provider_requests.html) interface and the [AuthenticationProviderNotifications](https://o3de.org/docs/api/gems/awsclientauth/class_a_w_s_client_auth_1_1_authentication_provider_notifications.html) notification bus for handler functions.

Reference documentation for specific authentication provider implementations can be found in [AWSCognitoAuthenticationProvider](https://o3de.org/docs/api/gems/awsclientauth/class_a_w_s_client_auth_1_1_a_w_s_cognito_authentication_provider.html), [GoogleAuthenticationProvider](https://o3de.org/docs/api/gems/awsclientauth/class_a_w_s_client_auth_1_1_google_authentication_provider.html), and [LWAAuthenticationProvider](https://o3de.org/docs/api/gems/awsclientauth/class_a_w_s_client_auth_1_1_l_w_a_authentication_provider.html).
