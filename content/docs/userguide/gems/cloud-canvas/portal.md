---
description: ' Use a &cgp; to manage the data in &AWS; for your game. '
slug: cloud-canvas-cloud-gem-portal
title: '&cgp;'
---
# Cloud Gem Portal<a name="cloud-canvas-cloud-gem-portal"></a>


****  

|  | 
| --- |
|  The Cloud Gem Portal \(CGP\) is deprecated and will be removed in a future version of Lumberyard\.  | 

A [cloud gem](cloud-canvas-overview-cloud-gems.md) is a gem in Lumberyard whose scripts and assets use AWS resources to implement cloud\-connected game features\. A cloud gem creates a Cloud Gem Portal \(CGP\) that you can use to manage the cloud data for your game\. For example, the [Leaderboard Cloud Gem Portal](cloud-canvas-cloud-gem-leaderboard.md) can provide a way for a support person to remove fraudulent high scores\. The Cloud Gem Portal is hosted in your AWS account and is a website that you own\. The Cloud Gem Portal is part of the [Cloud Gem Framework](cloud-canvas-cloud-gem-framework-intro.md) and can be customized\.

## How a Cloud Gem Portal Works<a name="cloud-canvas-cloud-gem-portal-how-a-cloud-gem-portal-works"></a>

Cloud gem portals use Amazon Web Services to implement their functionality, as shown in the following diagram\.

![\[Understand the cloud gem workflow in Lumberyard.\]](/images/userguide/cloud_canvas/cloud-canvas-cloud-gem-portal.png)

[Amazon S3](https://aws.amazon.com/s3/) stores a Cloud Gem Portal as a web application\. [AWS Lambda](https://aws.amazon.com/lambda/) functions implement the required server\-side logic\. JavaScript code that runs in the web browser accesses the Lambda functions through the [Amazon API Gateway](https://aws.amazon.com/api-gateway/)\. The configuration for the API Gateway is handled by the Cloud Canvas [Cloud Gem Framework Service API](cloud-canvas-cgf-service-api.md)\.

### Cloud Gem Workflow<a name="cloud-canvas-cloud-gem-portal-cloud-gem-workflow"></a>

A cloud gem provides content \(for example, HTML, JavaScript, or images\) from its `lumberyard_version\dev\Gems\gemName\vN\AWS\cgp-resource-code` subdirectory\. When you deploy a cloud gem, the [Cloud Canvas Resource Manager](cloud-canvas-ui-rm-overview.md) uploads this content to the project’s configuration bucket\. To determine which cloud gems are available to it, the Cloud Gem Portal page uses the Cloud Gem Portal service API to call the Cloud Gem Portal Lambda function\. When you select a cloud gem, its content is loaded into the Cloud Gem Portal webpage\. To query the state of the cloud gem or perform other operations, JavaScript code can use a service API defined for the cloud gem\. The service API calls the cloud gem's Lambda function that implements the cloud gem's functionality\.

## Setting Up and Accessing the Cloud Gem Portal<a name="cloud-canvas-cloud-gem-portal-setup"></a>

In order to use the Cloud Gem Portal for a cloud gem, the corresponding cloud gem must be enabled in your project and you must create a project stack and a deployment stack in AWS\. For information on using the Project Configurator to enable gems and cloud gems in your project, see [Enabling Gems](gems-system-using-project-configurator.md)\. For information on using Cloud Canvas Resource Manager to create a project stack and a deployment stack in AWS, see [Tutorial: Getting Started with Cloud Canvas](cloud-canvas-tutorial.md)\.

**Topics**
+ [How a Cloud Gem Portal Works](#cloud-canvas-cloud-gem-portal-how-a-cloud-gem-portal-works)
+ [Setting Up and Accessing the Cloud Gem Portal](#cloud-canvas-cloud-gem-portal-setup)
+ [User Management in the Cloud Gem Portal](cloud-canvas-cloud-gem-portal-user-management.md)
+ [Using the Cloud Gem Portal REST Explorer](cloud-canvas-cloud-gem-portal-rest-explorer.md)
+ [Using the Cloud Gem Portal to View Logs](cloud-canvas-cloud-gem-portal-log-tab.md)