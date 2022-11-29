---
linkTitle: Setup
title: AWS GameLift Gem Setup
description: Learn how to set up the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 200
---

This topic teaches you how to set up the **AWS GameLift** Gem in **Open 3D Engine (O3DE)**, so you can use Amazon GameLift in your project.

## 1. Understand GameLift

GameLift allows players to connect to your game by creating a game session. For more information, refer to [How Players Connect to Games](https://docs.aws.amazon.com/gamelift/latest/developerguide/game-sessions-intro.html) in the Amazon GameLift Developer Guide.

A *game session* is an instance of the game running on the server with a given set of properties. A game session can be either public so that it can be found and joined by other players, or private so only players who are invited or notified of it can join.  

The lifetime of a session involves the following phases:
   1. Create a new session with the desired settings.  
   2. Wait for the players to request to join the session.  
   3. Reserve the players who want to join.  
   4. Destroy the session when the condition is met. For example, when the last player leaves the session.


## 2. Enable the AWS GameLift Gem


### Dependencies

The AWS GameLift Gem depends on the following Gems:

- [AWS Core Gem](/docs/user-guide/gems/reference/aws/aws-core): Provides the framework to use AWS services in O3DE.
- [Multiplayer Gem](/docs/user-guide/gems/reference/multiplayer/multiplayer-gem/): Provides multiplayer functionality, like connection and hosting, by extending the networking framework.


### Enable the AWS GameLift Gem and its dependencies

To enable the AWS GameLift Gem in your project:
1. Open the **Project Manager**.
2. Open the menu under your project and choose **Edit Project Settings...**.
3. Choose **Configure Gems**.
4. Enable the AWS GameLift Gem and the dependent Gems.


### Include the AWS GameLift Gem static library

You must include the AWS GameLift Gem static library in your project's CMake build target.

1. **(Required)** You must include **Gem::AWSGameLift.Server.Static** as **BUILD_DEPENDENCIES** for your project server target.

    ```cpp
    ly_add_target(
        NAME YourProject.Server.Static STATIC
        ...
        BUILD_DEPENDENCIES
            PUBLIC
            ...
            PRIVATE
                ...
                Gem::AWSGameLift.Server.Static
    )
    ```

2. **(Required)** To ensure that the Amazon GameLift Server SDK gets initialized correctly, you must indicate that the `AWSGameLiftServerService` is required for your project server system component.

   ```cpp
    void YourProjectServerSystemComponent::GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required)
    {
        ...
        required.push_back(AZ_CRC_CE("AWSGameLiftServerService"));
        ...
    }
   ```

3. **(Optional)** If you need to make GameLift service requests in C++, then you must include **Gem::AWSGameLift.Client.Static** as **BUILD_DEPENDENCIES** for your client target.

    ```cpp
    ly_add_target(
        NAME YourProject.Client.Static STATIC
        ...
        BUILD_DEPENDENCIES
        PUBLIC
            ...
        PRIVATE
            ...
            Gem::AWSCore.Static
            Gem::AWSGameLift.Client.Static
    )
    ```

## 3. Integrate game and dedicated server

Check [Session Management Integration](session-management/integration/) for managing game sessions within your game and dedicated server.
To support the optional FlexMatch feature, check [FlexMatch Integration](flexmatch/integration/).


## 4. Set up AWS credentials

To work with AWS resources in O3DE you must set up AWS credentials for your users.

For more details on configuring your AWS credentials in O3DE, refer to [Configuring AWS Credentials](/docs/user-guide/gems/reference/aws/aws-core/configuring-credentials/).

Please check [IAM policy examples for GameLift](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-iam-policy-examples.html) to configure appropriate permissions required to use the GameLift service.

To use the FlexMatch feature for matchmaking and backfill, please check [Setting up FlexMatch](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-setting-up.html) for the required permissions.

{{< note >}}
This step is only required for developers who perform remote tests and infrastructure builds against the GameLift service.

Alternatively, you can test your server's GameLift integration locally using GameLift Local, which does not require AWS credentials. With support for client override, you can test against GameLift Local. For more information, refer to [AWS GameLift Gem Local Testing](/docs/user-guide/gems/reference/aws/aws-gamelift/local-testing/).
{{< /note >}}


## 5. Set up the AWS CLI and AWS CDK

The AWS GameLift Gem provides a sample AWS Cloud Development Kit (AWS CDK) application that you can use to model GameLift resources and deploy your server to GameLift. To do this, you must have the [AWS Command Line Interface (AWS CLI)](https://aws.amazon.com/cli/) and [AWS CDK](https://aws.amazon.com/cdk/) installed on your local machine.
