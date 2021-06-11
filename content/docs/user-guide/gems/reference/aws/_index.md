---
linktitle: AWS Gems
title: AWS, AWS Gems, and O3DE
description: Use AWS Gems to access AWS cloud-connected services in Open 3D Engine.
---

Amazon Web Services (AWS) is an extensive and powerful collection of cloud-based services. You can use these services to upload or download files, access databases, execute code in the cloud, and perform many other operations. A cloud service saves you the trouble of maintaining the infrastructure that it relies on.

## Cloud-based resources

When you want to use an AWS cloud service, you do so through a resource, a cloud-based entity that is available for your use, help, or support. Resources include a database, a location for storing files, the code that a service runs, and more.

When you create a resource, it exists in the cloud, but you can use it and manage its content. You also specify the permissions that individuals or groups have to access or use the resource. For example, you might allow anyone in the public to read from your database but not write to it or modify it.

## Resource groups

In order to create an AWS-connected feature, such as a metrics reporting pipeline, AWS Gems utilize the [AWS CloudFormation Development Kit](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html) (CDK) to model and deploy resources. Each Gem contains a CDK application which defines the AWS resources that feature requires. Because the CDK applications model resources as code, it is easy to extend or combine CDK constructs to create powerful backend services.

## AWS accounts

Your resources are owned by an AWS account. The AWS account allows you and your team to share access to the same resources. For example, your team's AWS account might own a database resource so that you and your teammate can both work with the same database.

You, or someone on your team, is an administrator. The administrator creates the AWS account for your team and gives individuals on the team access to the account's resources.

## AWS Gems

The AWS Gems provide sample CDK applications and all the code to utilize them. They support the modeling, deployment, and communication of your AWS resources.

The following Gems are available.

| Gem               | Details |
|-------------------|---------|
| [AWS Core](aws-core/) | Provides the common mechanisms and essential configuration for all AWS feature Gems, including credentials, resource sharing, and handling calls to AWS services. It includes platform extensions for the AWS C++ SDK. |
| [AWS Client Auth](aws-client-auth/) | Provides OAuth sign in authentication flows and fetches temporary AWS credentials using open ID tokens. |
| [AWS Metrics](aws-metrics/) | Reports and aggregates metrics data for real time or batch analytics in AWS. |
