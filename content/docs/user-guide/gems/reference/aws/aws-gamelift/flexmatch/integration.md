---
linkTitle: FlexMatch Integration
title: FlexMatch Integration
description: Learn how to set up the AWS GameLift Gem in Open 3D Engine (O3DE).
toc: true
weight: 200
---

## Prerequisites

- Finish the session management integration for the game client and dedicated server.

## Integrate game client

To support the optional FlexMatch feature including backfill, your client application need to implement the following use cases:
- `StartMatchmaking`
- `StopMatchmaking`
- `StartPolling`
- `StopPolling`
- `AcceptMatch`

The AWS GameLift Gem provides both [C++ APIs](cpp-api/) and [scripting](scripting/). You can implement these use cases using either method.


## Integrate dedicated server

To support the optional manual backfill, you server should implement the following the use cases:
- `StartMatchBackfill`
- `StopMatchBackfill`
- `OnUpdateSessionBegin`
- `OnUpdateSessionEnd`

## Related Information

- [Preparing games for FlexMatch](https://docs.aws.amazon.com/gamelift/latest/flexmatchguide/match-integration-intro.html)


---

Previous topic: [FlexMatch Support](/docs/user-guide/gems/reference/aws/aws-gamelift/flexmatch)

Next topic: [FlexMatch C++ API](cpp-api/)
