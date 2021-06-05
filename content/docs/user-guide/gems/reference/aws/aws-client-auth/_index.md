---
linktitle: AWS Client Auth
title: AWS Client Auth Gem
description: Open 3D Engine (O3DE) AWS Client Auth Gem reference.
toc: true
---

{{< preview-new >}}

AWS Client Auth Gem enables users to access AWS services using authenticated or anonymous users. It provides authentication for following identity providers Cognito User pool, Login With Amazon and Google. Auth Gem gets AWS credentials from Cognito Identity pool based on the current authenticated login status. If a successful login is found, authenticated AWS credentials are fetched else anonymous AWS credentials will be fetched.

AWS credentials have shared ownership with AWS native SDK client objects. They are refreshed or updated appropriately whenever a new user signs in or sign out or refreshes tokens.

If multiple sign-in's are found, `GetCredentials` will link those identities together and you will get the same identity going forward regardless of the what authentication provider is used.

This Gem has the following key features:

* User management on Cognito user pool users.

  * Email sign up
  * Phone sign up
  * Enable MFA
  * Forgot Password

* Ways to authenticate with various authentication providers.

  * Sign in using username and password in Cognito user pool (IDP).
  * MFA sign in using OAuth password flow in Cognito user pool.
  * MFA sign in using OAuth device flow in Login with Amazon.
  * MFA sign in using OAuth device flow in Google.
  * Provider pattern to add implementations for custom authentication providers.
  * Refresh tokens on demand if expired.

* Fetch AWS credentials for the authentication provider state.

  * Get authenticated credentials if user signed in with valid tokens.
  * Get anonymous credentials if no user signed in.
  * Auto refresh credentials using existing tokens.
  * Refresh credentials on refreshing authenticated tokens.
  * Provide sharing of credentials with AWS Native SDK service clients using shared AWSCredentialsProvider object.
  * Invalidate credentials on sign out.
  * Link identities if multiple sign in found for different authentication providers.

## Enabling the Gem

1. Add `Gem::AWSClientAuth` to your project dependencies in CMakeLists.txt to your Gem to use interfaces/ebuses defined in client auth Gem.

1. Add `Gem::AWSClientAuth` to your project runtime\_dependencies.cmake and tool\_dependencies.cmake.

1. AWSClientAuth depends on AWSCore and HttpRequestor Gems. Need to add these dependencies to your project runtime\_dependencies.cmake and tool\_dependencies.cmake as well.

Above steps should enable you to use and build AWSClientAuth API's in your project Gem.

## Configuring your project

Before running your project you want to create AWS resources required and set up required configurations file.

**Gem level settings**

No specific Gem level settings are applied.

**Project level settings**

AWS Client Auth Gem works with 2 settings/configurations file.

**AuthenticationProvider.setreg** settings registry file for third-party authentication provider settings and **resource mappings json** file for any AWS configurations. Resource mappings discussed in client auth Gem cdk documentation.

The above configurations are parsed once during activation of `AWSClientAuthSystemComponent`.

1. `AuthenticationProvider.setreg`: OAuth settings for 3rd party authentication providers.

    | Setting | Description |
    | --- | --- |
    | **AppClientId** | Client id provided by the authentication provider on creating an account with them. |
    | **ClientSecret** | Client secret provided by the authentication provider on creating an account with them. Required only for Login With Amazon. |
    | **GrantType** | What type of grant is requested. [https://oauth.net/2/grant-types/](https://oauth.net/2/grant-types/) |
    | **ResponseType** | Required only for Login With Amazon. Same as grant type. |
    | **OAuthCodeURL** | Url to request cod for authentication. |
    | **OAuthTokensURL** | Url to confirm and get authenticated tokens on success. |

    **Example `authenticationProvider.setreg`**

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

1. AWS Gems depend on AWS resources that need to deployed in an AWS account for the c++ Gem code to work with. All the required code is provided as a Cloud Developer Kit (cdk) application within the Gem. Instructions on deploying cdk and updating resource mappings json are provided here: <link\>

1. Run Editor/your project Game Launcher to test.
