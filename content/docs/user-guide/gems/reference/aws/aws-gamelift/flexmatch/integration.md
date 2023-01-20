---
linkTitle: FlexMatch Integration
title: FlexMatch Integration
description: Learn how to integrate FlexMatch into your game and dedicated server using the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 200
---

## Prerequisites

- Complete the [integration for game session management](../session-management/integration) for the game client and dedicated server.

## Integrate game client

To support the optional FlexMatch features including backfill, your client application needs to implement the following use cases:
- `StartMatchmaking`
- `StopMatchmaking`
- `StartPolling`
- `StopPolling`
- `AcceptMatch`

The AWS GameLift Gem provides both [C++ APIs](cpp-api/) and [scripting](scripting/). You can implement these use cases using either method.


## Integrate dedicated server

To support the optional manual backfill, your server should implement the following the use cases:
- `StartMatchBackfill`
- `StopMatchBackfill`
- `OnUpdateSessionBegin`
- `OnUpdateSessionEnd`

## Related information

- [Preparing games for FlexMatch](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-integration-intro.html)
