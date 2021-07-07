---
linkTitle: AWS GameLift
title: AWS GameLift Gem
description: The AWS GameLift Gem provides a framework to extend O3DE networking layer and Multiplayer Gem to work with Amazon GameLift.
toc: true
---

{{< preview-new >}}

## Feature Overview
 
### Amazon GameLift integration

- AWS GameLift Gem provides a framework to extend O3DE networking layer and to allow the Multiplayer Gem to work with [Amazon GameLift](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-intro.html). It provides integrations with both the Amazon GameLift Server SDK and GameLift Client.

### Build and package management

- AWS GameLift feature provides instruction to package and optionally upload the dedicated server build.
- AWS GameLift feature provides a sample [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html) application. Customers can deploy the CDK application for setting up basic GameLift resources or modify the CDK application to add their custom resources.

## Release highlights

**Preview Features**  

- Support CreateSession (on fleet/on queue), SearchSessions, JoinSession and LeaveSession through Amazon GameLift service.
- Support Windows dedicated server and Windows client.
- Support CDK application to manage GameLift resources.


## Topics

| Topic | Description |
| - | - |
| [AWS GameLift Gem Setup](gem-setup/) | Set up the AWS GameLift Gem in O3DE. |
| Prepare Game with AWS GameLift Gem |  |
| <ul><li> [C++ API for AWS GameLift Gem ](cpp-api/)</li></ul>| Learn how to prepare your game using the C++ API for the AWS GameLift Gem. |
| <ul><li> [Scripting with AWS GameLift Gem](scripting/) </li></ul>| Learn how to prepare your game using Script Canvas nodes that are provided by the AWS GameLift Gem. |
| <ul><li> [AWS GameLift Gem Advanced Topics](advanced-topics/) | Learn about some advanced ways to prepare your game with the AWS GameLift Gem. |
| [AWS GameLift Gem Local Testing](local-testing/) | Verify AWS GameLift feature integrations locally using GameLift Local, a command line tool that starts a self-contained version of the managed GameLift service. |
| [AWS GameLift Build Packaging for Windows](build-packaging-for-windows/) | Learn how to package your dedicated server builds so you can install and run them on Amazon GameLift. |
| [AWS GameLift Resource Management](resource-management/) | Learn about the sample CDK application that can be used to model and deploy Amazon GameLift resources. |
| AWS GameLift & Multiplayer Sample | Coming soon! |

