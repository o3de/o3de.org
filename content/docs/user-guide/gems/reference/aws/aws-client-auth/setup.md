---
linktitle: Setting Up Client Auth
title: Setting Up the AWS Client Auth Gem
description: Learn how to set up the AWS Client Auth Gem for your Open 3D Engine (O3DE) project.
toc: true
weight: 100
---

{{< important >}}
O3DE no longer includes AWS gems by default. Visit https://github.com/aws/o3de-repo for instructions on how to install AWS gems.
{{< /important >}}

## Prerequisites

The AWS Client Auth Gem requires the following to be installed and configured:

* AWS Cloud Development Kit (CDK)
* AWS credentials
* O3DE AWS Core Gem

The [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) (CLI) (version 2) is optional but also strongly recommended.

See [Getting Started with AWS Gems](/docs/user-guide/gems/reference/aws/aws-core/getting-started/) for help with installing and configuring these prerequisites.

## Setting up AWS Client Auth

Complete the following set up steps to use the AWS Client Auth Gem in your project:

* Enable the AWS Client Auth Gem in your project.
* Configure project settings.
* Deploy the CDK application.
* Update the resource mapping file to use the deployed AWS resources.

### 1. Enable the AWS Client Auth Gem

If you haven't already added and built the **AWS Client Auth Gem** into your project, follow the instructions to [Add a Gem to a Project](/docs/user-guide/project-config/add-remove-gems/).

### 2. Configure authentication providers

For this step, decide which authentication provider you will use and configure your project to use that provider by following the steps in [Using Authentication Providers](./authentication-providers/). You can use one of the supported providers, or extend the Gem to support your own.

### 3. Deploy the CDK application

Use the CDK synth and deploy commands from the AWS Client Auth Gem directory to deploy AWS resources for authentication and authorization support. For help with these deployment operations, refer to the synth and deploy steps in [Deploying the CDK Application](/docs/user-guide/gems/reference/aws/aws-core/cdk-application/) in the AWS Core documentation.

When setting constants for deploy, the AWS Client Auth Gem supports the following additional, optional values. If set, the CDK application will try to enable the authenticated provider authorization using the Amazon Cognito identity pool.

**`GOOGLE_APP_CLIENT_ID`**: **Google** app client ID to enable Google-authenticated authorization in Amazon Cognito identity pool.

**`LOGIN_WITH_AMAZON_APP_CLIENT_ID`**: **Login with Amazon** (LWA) app client ID to enable LWA-authenticated authorization in Amazon Cognito identity pool.

You can use [deployment scripts](https://docs.aws.amazon.com/cdk/v2/guide/environments.html) to set these environment variables.

After a successful deployment, the following resources are provisioned.

#### AWS Client Auth stack

Groups all resources provisioned for AWS Client Auth Gem. Deleting stack will delete all resources from AWS Client Auth stack.

#### IAM roles

1. **CognitoUserPoolSMSRole**: Allows Amazon Cognito user pool to send SMS messages for sign up and MFA.

1. **Authenticated CognitoIdentityPoolRole**: Provides permission to authenticated clients by providing credentials associated with the managed policy attached to this role.

1. **Anonymous CognitoIdentityPoolRole**: Provides permission to anonymous clients by providing credentials associated with the managed policy attached to this role.

#### Amazon Cognito user pool

Create user pool with email/phone sign up enabled, SMS_MFA enabled and optional.

#### Amazon Cognito identity pool

Create identity pool to support authenticated and anonymous identities.

##### Authenticated

1. **Amazon Cognito user pool**: Use the created user pool for authentication.
2. **Google**: Use Google authentication provider for authentication.
3. **Login With Amazon**: Use LWA authentication provider for authentication.

### 4. Update the resource mapping file

After deploying the CDK application, your project's resource mapping file must be updated to export the deployed REST API information so that you can use the deployed AWS resources.

Use the [Resource Mapping Tool](/docs/user-guide/gems/reference/aws/aws-core/resource-mapping-tool/) to add the following mappings to your project's resource mapping file:

* `AWSClientAuth.CognitoUserPoolId`
* `AWSClientAuth.CognitoUserPoolAppClientId`
* `AWSClientAuth.CognitoIdentityPoolId`
