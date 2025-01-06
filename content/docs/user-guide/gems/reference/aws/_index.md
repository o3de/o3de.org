---
linktitle: AWS Gems
title: AWS, AWS Gems, and O3DE
description: Use AWS Gems to access AWS cloud-connected services in Open 3D Engine (O3DE).
---

{{< o3de-aws-gems-moved >}}

Amazon Web Services (AWS) is a cloud platform that offers an extensive and powerful collection of services. You can use these cloud services to upload or download files, access databases, execute code in the cloud, and perform many other operations. Using a cloud service saves you the trouble of maintaining the infrastructure that it relies on.

For an overview of AWS Gems in **Open 3D Engine (O3DE)**, check out the video below. Then, read on to learn more about using AWS in your O3DE projects!

{{< youtube-width id="EG0C9enezzo" title="AWS Gems in O3DE" >}}

## Cloud-based resources

When you use an AWS cloud service, you do so through a *resource*: a cloud-based entity that's available for your use, help, or support. For example, resources include databases, file storage locations, the code that a service runs, and more.

When you create a resource, it exists in the cloud, but you can use it and manage its content. You also specify the permissions that individuals or groups have to access or use the resource. For example, you might allow anyone in the public to read from your database but not write to it or modify it.

## Resource groups

To create an AWS-connected feature, such as a metrics reporting pipeline, AWS Gems use the [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) (AWS CDK) to model and deploy resources. Each AWS Gem contains an AWS CDK application that defines the AWS resources that the feature requires. Because the AWS CDK applications model resources as code, you can extend or combine AWS CDK constructs to create powerful backend services.

## AWS accounts

An AWS account owns your AWS resources. You and your team can use an AWS account to share access to the same resources. For example, your team's AWS account might own a database resource that you and a teammate can both work with.

You, or someone on your team, is an administrator. The administrator creates the AWS account for your team and gives team members access to the account's resources.

## AWS Gems

The AWS Gems provide sample AWS CDK applications and all the code to utilize them. These Gems support the modeling, deployment, and communication of your AWS resources.

The following AWS Gems are available:

| Gem               | Details |
|-------------------|---------|
| [AWS Core](aws-core/) | Provides the common mechanisms and essential configuration for all AWS feature Gems, including credential management, resource sharing, and handling of calls to AWS services. This Gem also includes platform extensions for the AWS SDK for C++. |
| [AWS Client Auth](aws-client-auth/) | Provides OAuth sign-in authentication flows and fetches temporary AWS credentials using OpenID tokens. |
| [AWS Metrics](aws-metrics/) | Reports and aggregates metrics data for real-time or batch analytics in AWS. |
| [AWS GameLift](aws-gamelift/) | Provides a framework to extend the O3DE networking layer and Multiplayer Gem to work with Amazon GameLift.|
