---
linkTitle: Setup
title: AWS GameLift Gem Setup
description: "Learn how to set up the AWS GameLift Gem in O3DE"
toc: true
---

This topic is about how to set up the AWS GameLift Gem in Open 3D Engine (O3DE) and the AWS GameLift service in your project. 

## 1. Understand GameLift

GameLift allows players to connect to your game by creating a game session. Read more in the AWS Amazon GameLift documentation, [How Players Connect to Games](https://docs.aws.amazon.com/gamelift/latest/developerguide/game-sessions-intro.html).

A *game session* is an instance of the game running on the server with a given set of properties. A game session can be either public so that it can be found and joined by other players, or private so only players who are invited or notified of it can join.  

The lifetime of a session involves the following phases:
   1. Create a new session with the desired settings.  
   2. Wait for the players to request to join the session.  
   3. Reserve the players who want to join.  
   4. Destroy the session when the condition is met. For example, when the last player leaves the session. 
    

## 2. Enable AWS GameLift

To enable AWS GameLift in your project:  
- [Enable the AWS GameLift Gem and its dependencies](#enable-aws-gamelift-gem-and-its-dependencies)
- [Include AWS GameLift static library](#include-aws-gamelift-static-library)

### Dependencies

The AWS GameLift Gem depends on the following Gems:

- **[Multiplayer Gem](/docs/user-guide/gems/reference/multiplayer)**:  It provides the multiplayer functionality like connection and hosting by extend networking framework.

- **[AWS Core Gem](/docs/user-guide/gems/reference/aws/aws-core)**: It provides the framework to use AWS services in Open 3D Engine (O3DE).
  

### Enable AWS GameLift Gem and its dependencies
To enable the AWS GameLift Gem in your project:
1. Open the Project Manager. 
2. Open the menu under your project and choose **Edit Project Settings...**.
3. Select the **Configure Gems** button.
4. Enable the AWS GameLift Gem, and ensure that the dependent Gems are also enabled.

### Include AWS GameLift static library
You must include AWS GameLift static library in your project's CMake build target.

1. **(Required)** Please include **Gem::AWSGameLift.Server.Static** as **BUILD_DEPENDENCIES** for your project server target.

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

2. **(Optional)** If you need to make AWS GameLift requests in C++, then you can include **Gem::AWSGameLift.Client.Static** as **BUILD_DEPENDENCIES** for your client target.


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

The AWS GameLift Gem provides both [C++ APIs](usage/cpp-api/) and [Scripting](usage/scripting/) to support developers.

## 4. Integrate server

To establish communication between your server and Amazon GameLift service, you must notify Amazon GameLift that your server is ready and respond to GameLift notifications.

For more details on Server Notifications, read [C++ API for AWS GameLift Gem](usage/cpp-api/)

## 5. Set up AWS Credentials

To work with AWS resources in O3DE you must set up AWS Credentials for your users. 

For more details, read [Configuring AWS Credentials for O3DE](/docs/user-guide/gems/reference/aws/aws-core/configuring-credentials/) in the AWS Core Gem documentation.

{{< note >}} 
This step is only required for developers who perform remote tests and infrastructure builds against the Amazon GameLift service.

To test against GameLift Local, there is support for the client override. You can test against a local endpoint, which does not require AWS credentials.
{{< /note >}} 


## 6. Set up AWS CLI and CDK
--------------------------

The AWS GameLift provides a sample CDK application that you can use to model and deploy your server to the Amazon GameLift service. To do this, you must have [AWS CLI](https://aws.amazon.com/cli/) and [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) installed on your local machine.



Previous Topic: [AWS GameLift Feature Overview](_index.md)

Next Topic:[C++ API for AWS GameLift Gem](usage/cpp-api.md)