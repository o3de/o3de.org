---
linktitle: Setting Up Client Auth
title: Setting Up the AWS Client Auth Gem
description: Learn how to set up the AWS Client Auth Gem for your Open 3D Engine (O3DE) project.
toc: true
weight: 100
---

{{< preview-new >}}

## Prerequisites

The AWS Client Auth Gem requires the following to be installed and configured:

* AWS Command Line Interface (CLI)
* AWS Cloud Development Kit (CDK)
* AWS credentials
* O3DE AWS Core Gem

See [Getting Started with AWS Gems](/docs/user-guide/gems/reference/aws/aws-core/getting-started.md) for help with installing and configuring these prerequisites.

## Setting up AWS Client Auth

Complete the following set up steps to use the AWS Client Auth Gem in your project:

* Enable the AWS Client Auth Gem in your project.
* Set project level settings.
* Deploy the CDK application.
* Update the resource mapping file to use the deployed AWS resources.

### Enabling the AWS Client Auth Gem in your project

If you haven't already added and built the **AWS Client Auth Gem** in your project, do so now using the instructions in [Enabling the AWS Client Auth Gem](./_index.md#enabling-the-aws-client-auth-gem).

### Setting project level settings

The `AuthenticationProvider.setreg` registry file defines the third-party OAuth authentication provider settings.

These settings and those in the resource mapping file are read once during activation of `AWSClientAuthSystemComponent`.

| Setting | Description |
| --- | --- |
| **AppClientId** | Client id provided by the authentication provider on creating an account with them. |
| **ClientSecret** | Client secret provided by the authentication provider on creating an account with them. Required only for Login With Amazon. |
| **GrantType** | What type of grant is requested. [https://oauth.net/2/grant-types/](https://oauth.net/2/grant-types/) |
| **ResponseType** | Required only for Login With Amazon. Same as grant type. |
| **OAuthCodeURL** | Url to request cod for authentication. |
| **OAuthTokensURL** | Url to confirm and get authenticated tokens on success. |

Example `AuthenticationProvider.setreg` file:

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

### Deploying the CDK application

The AWS Client Auth Gem requires AWS resources to be deployed for authentication and authorization support. For instructions on how to deploy the CDK application, see the deploy steps in [Deploying the CDK Application](/docs/user-guide/gems/reference/aws/aws-core/cdk-application.md) in the AWS Core documentation.

When setting constants for deploy, the AWS Client Auth Gem includes the following additional optional values. If set, the CDK application will try to enable the authenticated provider authorization using the AWS Cognito Identity pool.

**`GOOGLE_APP_CLIENT_ID`**: Google app client id to enable authenticated authorization in Cognito Identity pool. <https://docs.aws.amazon.com/cognito/latest/developerguide/google.html>

**`LOGIN_WITH_AMAZON_APP_CLIENT_ID`**: Login with Amazon app client id to enable Google authenticated authorization in Cognito Identity pool. <https://docs.aws.amazon.com/cognito/latest/developerguide/amazon.html>

You can use [deployment scripts](https://docs.aws.amazon.com/cdk/latest/guide/environments.html) to set these environment variables.

After a successful deployment, the following resources are provisioned.

#### AWS Client Auth stack

Groups all resources provisioned for AWS Client Auth Gem. Deleting stack will delete all resources from AWS Client Auth stack.

#### IAM roles

1. **CognitoUserPoolSMSRole**: Allows Cognito user pool to send sms for signup and MFA.

1. **Authenticated CognitoIdentityPoolRole**: Provides permission to authenticated clients by providing credentials associated with the managed policy attached to this role.

1. **Anonymous CognitoIdentityPoolRole**: Provides permission to anonymous clients by providing credentials associated with the managed policy attached to this role.

#### Cognito User pool

Create user pool with email/phone sign-up enabled, SMS_MFA enabled and optional.

#### Cognito Identity pool

Create identity pool to support authenticated and anonymous identities.

##### Authenticated

1. **Cognito User pool**: Use above created user pool for authentication.
2. **Google**: Use Google authentication provider for authentication.
3. **Login With Amazon**: Use LWA authentication provider for authentication.

### Using deployed AWS resources

After deploying the CDK application, your project's resource mapping file must be updated to export the deployed REST API information.

Use the [Resource Mapping Tool](/docs/user-guide/gems/reference/aws/aws-core/resource-mapping-tool.md) to add the following information to your project's resource mapping file:

* `AWSClientAuth.CognitoUserPoolId`
* `AWSClientAuth.CognitoUserPoolAppClientId`
* `AWSClientAuth.CognitoIdentityPoolId`
