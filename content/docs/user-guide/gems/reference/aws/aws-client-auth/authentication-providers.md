---
title: Using Authentication Providers
description: Learn how to configure third-party and custom authentication providers for use with the AWS Client Auth Gem in Open 3D Engine (O3DE).
weight: 200
toc: true
---

The AWS Client Auth Gem supports several preconfigured third-party authentication providers. You can also add support for a custom provider.

To configure an authentication provider, you must do the following.

1. Enable an account with the provider for authentication.
1. Create and configure the authentication provider settings file.

To create and use a custom provider, refer to the instructions at the end of this topic on [Using a Custom Provider](#using-a-custom-provider).

## Using a preconfigured third-party provider

1. Create and enable a [Google](https://docs.aws.amazon.com/cognito/latest/developerguide/google.html) or [Login with Amazon](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon.html) account for authentication.

1. Make note of the **app ID** and **app secret** for device type flow.

## Configure authentication provider settings

You must create a registry settings file named `AuthenticationProvider.setreg` to configure the authentication provider's settings. This file must be located in the project's registry directory: `<ProjectName>\Registry`. Its format is shown in the example that follows.

Use the app ID that you obtained when you enabled your account as the value for `AppClientId`.

If you are using Google, you must also use the app secret you were given for your account as the value for `ClientSecret`.

When deploying the CDK application, be sure to use the CDK constant that corresponds to your selected provider. Refer to the CDK application deployment step in [Setting Up Client Auth](./setup/) for details.

These settings and those in the resource mapping file are read once during activation of `AWSClientAuthSystemComponent`.

| Setting | Description |
| --- | --- |
| **AppClientId** | Client ID provided by the authentication provider upon creating an account. |
| **ClientSecret** | Client secret provided by the authentication provider upon creating an account. Required only for **Google**. |
| **GrantType** | Type of grant requested. See [https://oauth.net/2/grant-types/](https://oauth.net/2/grant-types/). |
| **ResponseType** | Required only for **Login With Amazon**. Same as grant type. |
| **OAuthCodeURL** | URL to request code for authentication. |
| **OAuthTokensURL** | URL to confirm and get authenticated tokens on success. |

Example `AuthenticationProvider.setreg` file. When creating this file, include the appropriate section that corresponds to the provider you selected.

```json
{
    "AWS":
    {
        "LoginWithAmazon":
        {
            "AppClientId": "",
            "GrantType":  "device_code",
            "ResponseType":  "device_code",
            "OAuthCodeURL": "https://api.amazon.com/auth/o2/create/codepair",
            "OAuthTokensURL": "https://api.amazon.com/auth/o2/token"
        },
        "Google":
        {
            "AppClientId": "",
            "ClientSecret": "",
            "GrantType": "urn:ietf:params:oauth:grant-type:device_code",
            "OAuthCodeURL": "https://oauth2.googleapis.com/device/code",
            "OAuthTokensURL": "https://oauth2.googleapis.com/token"
        }
    }
}
```

## Using a custom provider

To use a custom authentication provider with the AWS Client Auth Gem, you must have endpoints based on the OAuth 2.0/OIDC protocol. Use the following steps to enable your provider.

1. Update the **Amazon Cognito identity pool** to support a custom login provider.

    a. In the CDK application, in the file `constants.py`, add an entry for the App Client ID for your authentication service.

    b. Add the same App Client ID to `supported_login_providers` in `cognito_identity_pool.py`.

    c. Synth and deploy the AWS Client Auth stack. For help with these commands, see [Deploying the CDK Application](/docs/user-guide/gems/reference/aws/aws-core/cdk-application/) in the AWS Core Gem documentation.

1. Implement your C++ custom provider.

    a. Add a new enum value to `ProviderNameEnum` in `AuthenticationTokens.h`.

    b. Implement a new custom provider inheriting from `AuthenticationProviderInterface`.

    c. In the `AuthenticationProviderManager::CreateAuthenticationProviderObject` method, add support for the above.

    d. Authorization will work if the Amazon Cognito setting above is setup correctly.

Refer to the [AWS Client Auth](/docs/api/gems/awsclientauth) API Reference for more information.
