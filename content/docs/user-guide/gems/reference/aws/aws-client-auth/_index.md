---
linktitle: AWS Client Auth
title: AWS Client Auth Gem
description: Introduction to the Open 3D Engine (O3DE) AWS Client Auth Gem.
toc: true
---

{{< preview-new >}}

The AWS Client Auth Gem enables authenticated or anonymous users to access AWS services. It provides authentication options using any of these supported identity providers:

* Amazon Cognito user pool
* Google
* Login With Amazon

The Gem gets AWS credentials from the Amazon Cognito identity pool based on the current authenticated login status. If a successful login is found, authenticated AWS credentials are fetched. Otherwise, anonymous AWS credentials are fetched.

AWS credentials have shared ownership with AWS native SDK client objects. They are refreshed or updated whenever a new user signs in, signs out, or refreshes tokens.

If multiple sign-in's are found, `GetCredentials` will link those identities together and you will get the same identity going forward regardless of the what authentication provider is used.

## Features

This Gem has the following key features:

* User management on Amazon Cognito user pool users.

  * Sign up with email confirmation.
  * Sign up with phone confirmation.
  * Enable multi-factor authentication (MFA).
  * Handle forgotten password.

* Authentication methods for the supported authentication providers.

  * Sign in using username and password in Amazon Cognito user pool (IDP).
  * MFA sign in using OAuth password flow in Amazon Cognito user pool.
  * MFA sign in using OAuth device flow in Login with Amazon.
  * MFA sign in using OAuth device flow in Google.
  * Provider pattern to add implementations for custom authentication providers.
  * Refresh tokens on demand if expired.

* Fetch AWS credentials for the authentication provider state.

  * Get authenticated credentials if user signed in with valid tokens.
  * Get anonymous credentials if no user signed in.
  * Auto refresh credentials using existing tokens.
  * Refresh credentials on refreshing authenticated tokens.
  * Provide sharing of credentials with AWS Native SDK service clients using shared `AWSCredentialsProvider` object.
  * Invalidate credentials on sign out.
  * Link identities if multiple sign in found for different authentication providers.

## Enabling the AWS Client Auth Gem

To enable the AWS Client Auth Gem, do the following:

1. Use **O3DE Project Manager** or the command line to add the **AWS Client Auth Gem** to your project. AWS Client Auth also requires the following Gems as dependencies:

    * [AWS Core](/docs/user-guide/gems/reference/aws/aws-core)
    * **HttpRequestor**

1. Build your project using Project Manager, Visual Studio, or CMake.

1. Continue with [Setting Up AWS Client Auth](./setup.md) to configure AWS Client Auth for your project.
