---
linktitle: Using the CDK
title: Using the CDK to deploy AWS resources for client authorization
description: Learn how to use the CDK with the AWS Client Auth Gem to deploy AWS resources for authentication and authorization support in your Open 3D Engine (O3DE) project.
weight: 100
toc: true
---

{{< preview-new >}}

Cloud Development Kit (CDK) is a software development framework from AWS for defining cloud infrastructure in your project and provisioning it through AWS Cloud Formation. The AWS Client Auth Gem uses the CDK to deploy AWS resources required for authentication and authorization support.

## Prerequisites

Before using the CDK with this Gem, make sure you have completed the following prerequisite setup:

* Setup AWS credentials. For help, see [Configuring AWS Credentials](/docs/user-guide/gems/reference/aws/aws-core/configuring-credentials.md).

* Install prerequisites for the CDK using the instructions in [AWS CDK: Getting Started](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting-started-prerequisites).

* Setup your python environment using the instructions in [AWS Core Gem: Prerequisites](/docs/user-guide/gems/reference/aws/aws-core/cdk-application.md#prerequisites).

## Deploy the CDK

Follow the steps in the AWS Core Gem to [deploy the CDK](/docs/user-guide/gems/reference/aws/aws-core/cdk-application.md#deploy-the-cdk).

When setting constants, the AWS Client Auth Gem includes the following additional optional values. If set, the CDK application will try to enable the authenticated provider authorization using the AWS Cognito Identity pool.

**`GOOGLE_APP_CLIENT_ID`**: Google app client id to enable authenticated authorization in Cognito Identity pool. <https://docs.aws.amazon.com/cognito/latest/developerguide/google.html>

**`LOGIN_WITH_AMAZON_APP_CLIENT_ID`**: Login with Amazon app client id to enable Google authenticated authorization in Cognito Identity pool. <https://docs.aws.amazon.com/cognito/latest/developerguide/amazon.html>

After a successful deployment, the following resources are provisioned.

### AWS Client Auth stack

Groups all resources provisioned for AWS Client Auth Gem. Deleting stack will delete all resources from AWS Client Auth stack.

### IAM roles

1. **CognitoUserPoolSMSRole**: Allows Cognito user pool to send sms for signup and MFA.

1. **Authenticated CognitoIdentityPoolRole**: Provides permission to authenticated clients by providing credentials associated with the managed policy attached to this role.

1. **Anonymous CognitoIdentityPoolRole**: Provides permission to anonymous clients by providing credentials associated with the managed policy attached to this role.

### Cognito User pool

Create user pool with email/phone sign-up enabled, SMS_MFA enabled and optional.

### Cognito Identity pool

Create identity pool to support authenticated and anonymous identities.

#### Authenticated

1. **Cognito User pool**: Use above created user pool for authentication.
2. **Google**: Use Google authentication provider for authentication.
3. **Login With Amazon**: Use LWA authentication provider for authentication.

## Update the resource mapping

 After CDK deployment, perform the following steps to add key/value pairs to the resource mapping json file.

1. Open resource mapping tool.

    ```cmd
    python <O3DE folder>\Gems\AWSCore\Code\Tools\ResourceMappingTool\resource_mapping_tool.py
    ```

1. Import AWSClientAuth stack that was deployed.

1. Select Cognito User pool, Cognito User pool App Client and Cognito Identity pool to import.

1. Map the following keys to above values. Defined in AWSClientAuthResourceMappingConstants.h file.

    1. **AWSClientAuth.CognitoUserPoolId**
    1. **AWSClientAuth.CognitoUserPoolAppClientId**
    1. **AWSClientAuth.CognitoIdentityPoolId**

1. Save resource mapping file.

1. Update project level settings defined by the AWS Core Gem to use the newly created resource mapping file. For help, see [AWS Core - Project Level Settings](/docs/user-guide/gems/reference/aws/aws-core/index.md#project-level-settings).

For help using this tool, refer to the [Resource Mapping Tool](docs/user-guide/gems/reference/aws/aws-core/resource-mapping-tool.md) documentation.
