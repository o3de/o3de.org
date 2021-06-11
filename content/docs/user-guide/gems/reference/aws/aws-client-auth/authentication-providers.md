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

1. Add the **App ID** and **App secret** to your project's authentication provider registry settings in `AuthenticationProvider.setreg`. See [Project Level Settings](./setup.md#setting-project-level-settings) in the set up instructions for details about this file.

1. Update the third-party authentication provider in the CDK constants.

## Custom provider

To use a custom authentication provider with the AWS Client Auth Gem, you must have endpoints based on the OAuth 2.0/OIDC protocol. Use the following steps to enable your provider.

1. Update the **Cognito Identity Pool** to support a custom login provider.

    1. In the CDK application, constants.py add entry for the App Client Id for your authentication service.
    1. Add above app id to supported_login_providers in cognito_identity_pool.py.
    1. Synth and deploy AWSClientAuth stack.

1. Implement your C++ custom provider.

    1. Add a new enum value to ProviderNameEnum in AuthenticationTokens.h.
    1. Implement new custom provider inheriting from AuthenticationProviderInterface.
    1. In AuthenticationManager CreateAuthenticationProviderObject method, add support for above.
    1. Authorization will work if Cognito setting above is setup correctly.
