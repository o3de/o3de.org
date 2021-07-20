---
linkTitle: AWS GameLift
title: AWS GameLift Gem
description: The AWS GameLift Gem provides a framework to extend O3DE networking layer and Multiplayer Gem to work with Amazon GameLift.
toc: true
---

{{< preview-new >}}

## Feature overview
The **AWS GameLift** Gem provides the following features:

**Amazon GameLift integration**
- A framework to extend the O3DE networking layer and to let the **Multiplayer** Gem work with [Amazon GameLift](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-intro.html). The AWS GameLift Gem provides integrations with both the [GameLift Server SDK](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-supported.html#gamelift-supported-servers) and the GameLift client (GameLift calls in the AWS SDK).

**Build and package management**
- Instructions to package and optionally upload the dedicated server build.
- A sample [AWS Cloud Development Kit (AWS CDK)](https://docs.aws.amazon.com/cdk/latest/guide/home.html) application. You can deploy the AWS CDK application to set up basic GameLift resources, or modify the application to add custom resources.


## Release highlights

**Preview features**  

- Support for CreateSession (on fleet/on queue), SearchSessions, JoinSession, and LeaveSession through GameLift.
- Support for Windows dedicated servers and the O3DE client for Windows.
- Support for AWS CDK applications to manage GameLift resources.


## Related information

For a better understanding of the AWS GameLift Gem topics in this guide, we recommend reviewing the following: 
- [What Is Amazon GameLift? (Amazon GameLift Developer Guide)](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-intro.html)
- [Multiplayer Gem](/docs/user-guide/gems/reference/multiplayer/multiplayer/)
- [Networking](/docs/user-guide/networking/)


## Topics

| Topic | Description |
| - | - |
| [AWS GameLift Gem Setup](gem-setup/) | Set up the AWS GameLift Gem in O3DE. |
| Game Preparation with the AWS GameLift Gem |  |
| <ul><li> [AWS GameLift Gem C++ API](cpp-api/)</li></ul>| Learn how to prepare your game using the C++ API for the AWS GameLift Gem. |
| <ul><li> [AWS GameLift Gem Scripting](scripting/) </li></ul>| Learn how to prepare your game using Script Canvas nodes that the AWS GameLift Gem provides. |
| <ul><li> [AWS GameLift Gem Advanced Topics](advanced-topics/) | Learn some advanced ways to prepare your game with the AWS GameLift Gem. |
| [AWS GameLift Gem Local Testing](local-testing/) | Verify AWS GameLift Gem feature integrations locally using GameLift Local, a command line tool that starts a self-contained version of the managed GameLift service. |
| [AWS GameLift Gem Build Packaging for Windows](build-packaging-for-windows/) | Learn how to package your dedicated server builds so that you can install and run them on GameLift. |
| [AWS GameLift Gem Resource Management](resource-management/) | Learn about the sample AWS CDK application that you can use to model and deploy GameLift resources. |
| AWS GameLift Gem Multiplayer Sample | Coming soon! |

