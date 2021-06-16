---
title: Using Authentication Providers
description: Learn how to configure third-party and custom authentication providers for use with the AWS Client Auth Gem in Open 3D Engine (O3DE).
weight: 200
toc: true
---

{{< preview-new >}}

The AWS Client Auth Gem supports several third-party and custom authentication providers. This topic provides a brief overview on how to get started.

## Third-party provider

1. Create and enable a [Google](https://docs.aws.amazon.com/cognito/latest/developerguide/google.html) or [Login with Amazon](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon.html) account for authentication.

1. Make note of the **App ID** and **App secret** for device type flow.

1. Add the **App ID** and **App secret** to your project's authentication provider registry settings in `AuthenticationProvider.setreg`. For details about this file, see [Configure Project Settings](./setup.md#2-configure-project-settings) in the set up instructions.

1. Update the third-party authentication provider in the CDK constants.

## Custom provider

To use a custom authentication provider with the AWS Client Auth Gem, you must have endpoints based on the OAuth 2.0/OIDC protocol. Use the following steps to enable your provider.

1. Update the **Amazon Cognito identity pool** to support a custom login provider.

    a. In the CDK application, in the file `constants.py`, add an entry for the App Client ID for your authentication service.

    b. Add the same App Client ID to `supported_login_providers` in `cognito_identity_pool.py`.

    c. Synth and deploy the AWS Client Auth stack. For help with these commands, see [Deploying the CDK Application](/docs/user-guide/gems/reference/aws/aws-core/cdk-application.md) in the AWS Core Gem documentation.

1. Implement your C++ custom provider.

    a. Add a new enum value to `ProviderNameEnum` in `AuthenticationTokens.h`.

    b. Implement a new custom provider inheriting from `AuthenticationProviderInterface`.

    c. In the `AuthenticationProviderManager::CreateAuthenticationProviderObject` method, add support for the above.

    d. Authorization will work if the Amazon Cognito setting above is setup correctly.

Refer to the [AWS Client Auth](/docs/api/gems/awsclientauth) API Reference for more information.
