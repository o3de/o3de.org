---
linkTitle: Session Management Integration
title: Session Management Integration
description: Learn how to integrate multiplayer session management into your game and dedicated server using the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 200
---

## Integrate game client

For a client application, your game must implement the following use cases to manage a session:
- `CreateSession`
- `SearchSessions`
- `JoinSession`
- `LeaveSession`

The AWS GameLift Gem provides both [C++ APIs](cpp-api/) and [scripting](scripting/). You can implement these use cases using either method.


## Integrate dedicated server

To establish communication between your server and GameLift, you must notify GameLift that your server is ready, and then have your server respond to GameLift notifications.

For more details on GameLift server initialization, refer to the [Server initialization](cpp-api/#server-initialization) section of the AWS GameLift Gem C++ API page.

For more details on GameLift server notifications, refer to the [Server notifications](cpp-api/#server-notifications) section of the AWS GameLift Gem C++ API page.


## Related information

- [Integrating Games with Custom Game Servers](https://docs.aws.amazon.com/gamelift/latest/developerguide/integration-custom-intro.html)
