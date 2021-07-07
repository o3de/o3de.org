---
linkTitle: Setup
title: AWS GameLift Gem Setup
description: "Learn how to set up the AWS GameLift Gem in O3DE"
toc: true
weight: 100
---

This topic teaches you how to set up the AWS GameLift Gem in Open 3D Engine (O3DE) and the AWS GameLift service in your project. 

## 1. Understand GameLift

GameLift allows players to connect to your game by creating a game session. Read more in the AWS Amazon GameLift [How Players Connect to Games](https://docs.aws.amazon.com/gamelift/latest/developerguide/game-sessions-intro.html) documentation.

A *game session* is an instance of the game running on the server with a given set of properties. A game session can be either public so that it can be found and joined by other players, or private so only players who are invited or notified of it can join.  

The lifetime of a session involves the following phases:
   1. Create a new session with the desired settings.  
   2. Wait for the players to request to join the session.  
   3. Reserve the players who want to join.  
   4. Destroy the session when the condition is met. For example, when the last player leaves the session. 
    

## 2. Enable AWS GameLift

To enable AWS GameLift in your project:  
- [1. Understand GameLift](#1-understand-gamelift)
- [2. Enable AWS GameLift](#2-enable-aws-gamelift)
  - [Dependencies](#dependencies)
  - [Enable AWS GameLift Gem and its dependencies](#enable-aws-gamelift-gem-and-its-dependencies)
  - [Include AWS GameLift static library](#include-aws-gamelift-static-library)
- [3. Integrate game](#3-integrate-game)
- [4. Integrate server](#4-integrate-server)
- [5. Set up AWS credentials](#5-set-up-aws-credentials)
- [## 6. Set up AWS CLI and CDK](#-6-set-up-aws-cli-and-cdk)

### Dependencies

The AWS GameLift Gem depends on the following Gems:

- **[AWS Core Gem](/docs/user-guide/gems/reference/aws/aws-core)**: It provides the framework to use AWS services in O3DE.
- **[Multiplayer Gem](/docs/user-guide/gems/reference/multiplayer)**:  It provides the multiplayer functionality, like connection and hosting, by extending networking framework.
  

### Enable AWS GameLift Gem and its dependencies
To enable the AWS GameLift Gem in your project:
1. Open the Project Manager. 
2. Open the menu under your project and choose **Edit Project Settings...**.
3. Select the **Configure Gems** button.
4. Enable the AWS GameLift Gem and ensure that the dependent Gems are also enabled.

### Include AWS GameLift static library
You must include AWS GameLift static library in your project's CMake build target.

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

2. **(Optional)** If you need to make AWS GameLift requests in C++, then you must include **Gem::AWSGameLift.Client.Static** as **BUILD_DEPENDENCIES** for your client target.


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

## 3. Integrate game

For a client application, your game must implement the following use cases to manage a session:
- `CreateSession`
- `SearchSessions`
- `JoinSession`
- `LeaveSession`

The AWS GameLift Gem provides both [C++ APIs](cpp-api/) and [Scripting](scripting/) to support developers. You can implement these use cases using either method. 

## 4. Integrate server

To establish communication between your server and Amazon GameLift service, you must notify Amazon GameLift that your server is ready and then respond to GameLift notifications.

For more details on Server Notifications, read [C++ API for AWS GameLift Gem](cpp-api/)

## 5. Set up AWS credentials

To work with AWS resources in O3DE you must set up AWS credentials for your users. 

For more details, read [Configuring AWS Credentials for O3DE](/docs/user-guide/gems/reference/aws/aws-core/configuring-credentials/) in the AWS Core Gem section.

{{< note >}} 
This step is only required for developers who perform remote tests and infrastructure builds against the Amazon GameLift service.

Alternatively, you can test on your local machine using GameLift Local, which does not require AWS credentials. To test against GameLift Local, there is support for the client override. For more information, read [AWS GameLift Gem Local Testing](/docs/user-guide/gems/reference/aws/aws-gamelift/local-testing/). 
{{< /note >}} 


## 6. Set up AWS CLI and CDK
--------------------------

The AWS GameLift provides a sample CDK application that you can use to model and deploy your server to the Amazon GameLift service. To do this, you must have [AWS CLI](https://aws.amazon.com/cli/) and [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) installed on your local machine.



Previous Topic: [AWS GameLift Feature Overview](/docs/user-guide/gems/reference/aws/aws-gamelift)

Next Topic:[C++ API for AWS GameLift Gem](cpp-api/)