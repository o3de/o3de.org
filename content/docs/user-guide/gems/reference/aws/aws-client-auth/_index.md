---
linktitle: AWS Client Auth
title: AWS Client Auth Gem
description: Introduction to the Open 3D Engine (O3DE) AWS Client Auth Gem.
toc: true
---

{{< important >}}
O3DE no longer includes AWS gems by default. Visit https://github.com/aws/o3de-repo for instructions on how to install AWS gems.
{{< /important >}}

The **AWS Client Auth** Gem lets authenticated or anonymous users access AWS services when running your game or simulation. It provides authentication options using any of the following supported identity providers:

* Amazon Cognito user pool
* [Google Identity](https://developers.google.com/identity)
* [Login with Amazon](https://developer.amazon.com/login-with-amazon)

The Gem gets AWS credentials from the Amazon Cognito identity pool based on the current authenticated login status. If a successful login is found for the user, authenticated AWS credentials are fetched. Otherwise, anonymous AWS credentials are fetched.

AWS credentials have shared ownership with AWS native SDK client objects. Credentials are refreshed or updated whenever a new user signs in, signs out, or refreshes tokens.

If multiple sign-ins are found, `GetCredentials` links those identities together. Then, you get the same identity going forward regardless of which authentication provider you use.

## Features

This Gem has the following key features:

* User management in an Amazon Cognito user pool
    * Sign-up with email or phone confirmation
    * Multi-factor authentication (MFA)
    * Forgotten password handling

* Multiple authentication methods via the supported authentication providers.
    * Sign-in using a username and password in an Amazon Cognito user pool.
    * MFA sign-in using the OAuth password flow in an Amazon Cognito user pool.
    * MFA sign-in using the OAuth device flow in both Google and Login with Amazon.
    * Provider pattern to add implementations for custom authentication providers.
    * On-demand refreshing of expired tokens.

* AWS credential retrieval for the authentication provider state.
    * Authenticated credentials for users signed in with valid tokens.
    * Anonymous credentials when no user is signed in.
    * Auto-refreshing of credentials using existing tokens.
    * Credentials refreshed upon refreshing of authenticated tokens.
    * Credentials invalidated upon sign-out.
    * Sharing of credentials with AWS native SDK service clients using the shared `AWSCredentialsProvider` object.
    * Linking of identities for multiple sign-ins across different authentication providers.

## Enabling the AWS Client Auth Gem

To enable the AWS Client Auth Gem, do the following:

1. Use **O3DE Project Manager** or the command line to add the AWS Client Auth Gem to your project. Note that AWS Client Auth requires the following Gems as dependencies:

    * [AWS Core](/docs/user-guide/gems/reference/aws/aws-core)
    * **HttpRequestor**

1. Build your project using Project Manager, Visual Studio, or CMake.

1. To configure AWS Client Auth for your project, follow the instructions in [Setting Up the AWS Client Auth Gem](./setup/).
