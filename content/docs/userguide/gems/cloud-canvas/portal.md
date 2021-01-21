---
description: ' Use a &cgp; to manage the data in &AWS; for your game. '
title: '&cgp;'
---
# Cloud Gem Portal {#cloud-canvas-cloud-gem-portal}


****

|  |
| --- |
|  The Cloud Gem Portal \(CGP\) is deprecated and will be removed in a future version of Lumberyard\.  |

A [cloud gem](/docs/userguide/gems/cloud-canvas/overview-cloud-gems.md) is a gem in Lumberyard whose scripts and assets use AWS resources to implement cloud\-connected game features\. A cloud gem creates a Cloud Gem Portal \(CGP\) that you can use to manage the cloud data for your game\. For example, the [Leaderboard Cloud Gem Portal](/docs/userguide/gems/cloud-canvas/leaderboard.md) can provide a way for a support person to remove fraudulent high scores\. The Cloud Gem Portal is hosted in your AWS account and is a website that you own\. The Cloud Gem Portal is part of the [Cloud Gem Framework](/docs/userguide/gems/cloud-canvas/framework-intro.md) and can be customized\.

## How a Cloud Gem Portal Works {#cloud-canvas-cloud-gem-portal-how-a-cloud-gem-portal-works}

Cloud gem portals use Amazon Web Services to implement their functionality, as shown in the following diagram\.

![\[Understand the cloud gem workflow in Lumberyard.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal.png)

[Amazon S3](https://aws.amazon.com/s3/) stores a Cloud Gem Portal as a web application\. [AWS Lambda](https://aws.amazon.com/lambda/) functions implement the required server\-side logic\. JavaScript code that runs in the web browser accesses the Lambda functions through the [Amazon API Gateway](https://aws.amazon.com/api-gateway/)\. The configuration for the API Gateway is handled by the Cloud Canvas [Cloud Gem Framework Service API](/docs/userguide/gems/cloud-canvas/cgf-service-api.md)\.

### Cloud Gem Workflow {#cloud-canvas-cloud-gem-portal-cloud-gem-workflow}

A cloud gem provides content \(for example, HTML, JavaScript, or images\) from its `lumberyard_version\dev\Gems\gemName\vN\AWS\cgp-resource-code` subdirectory\. When you deploy a cloud gem, the [Cloud Canvas Resource Manager](/docs/userguide/gems/cloud-canvas/ui-rm-overview.md) uploads this content to the project's configuration bucket\. To determine which cloud gems are available to it, the Cloud Gem Portal page uses the Cloud Gem Portal service API to call the Cloud Gem Portal Lambda function\. When you select a cloud gem, its content is loaded into the Cloud Gem Portal webpage\. To query the state of the cloud gem or perform other operations, JavaScript code can use a service API defined for the cloud gem\. The service API calls the cloud gem's Lambda function that implements the cloud gem's functionality\.

## Setting Up and Accessing the Cloud Gem Portal {#cloud-canvas-cloud-gem-portal-setup}

In order to use the Cloud Gem Portal for a cloud gem, the corresponding cloud gem must be enabled in your project and you must create a project stack and a deployment stack in AWS\. For information on using the Project Configurator to enable gems and cloud gems in your project, see [Enabling Gems](/docs/userguide/gems/using-project-configurator.md)\. For information on using Cloud Canvas Resource Manager to create a project stack and a deployment stack in AWS, see [Tutorial: Getting Started with Cloud Canvas](/docs/userguide/gems/cloud-canvas/tutorial.md)\.

**Topics**
- [Cloud Gem Portal {#cloud-canvas-cloud-gem-portal}](#cloud-gem-portal)
  - [How a Cloud Gem Portal Works {#cloud-canvas-cloud-gem-portal-how-a-cloud-gem-portal-works}](#how-a-cloud-gem-portal-works)
    - [Cloud Gem Workflow {#cloud-canvas-cloud-gem-portal-cloud-gem-workflow}](#cloud-gem-workflow)
  - [Setting Up and Accessing the Cloud Gem Portal {#cloud-canvas-cloud-gem-portal-setup}](#setting-up-and-accessing-the-cloud-gem-portal)
