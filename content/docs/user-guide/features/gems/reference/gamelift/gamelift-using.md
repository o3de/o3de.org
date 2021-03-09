---
description: ' Use AGS to host your Open 3D Engine game in the cloud. '
title: Using Amazon GameLift
weight: 100
---

{{< preview-migrated >}}

O3DE supports hosting dedicated servers on the cloud by using Amazon GameLift\. GameLift is a managed AWS service for deploying, operating, and scaling session\-based multiplayer games\. GameLift is built on AWS's highly available cloud infrastructure and allows you to quickly scale high\-performance game servers up and down to meet player demand - without any additional engineering effort or upfront costs\. It reduces the time required to build a multiplayer backend from thousands of hours to just minutes\.

To use GameLift in your project, there are two options:

+ Enable the [GameLift Gem](/docs/user-guide/features/gems/gamelift.md) in your project\. O3DE has integrated Amazon GameLift, which makes it easier for you to use GameLift\.
+ Enable the O3DE [Multiplayer Gem](/docs/userguide/gems/builtin/multiplayer.md) in your project \(which requires the GameLift Gem\)\.

For information about configuring GameLift for the multiplayer sample, see [Configuring the Multiplayer Sample for Amazon GameLift](/docs/userguide/networking/multiplayer-gs-gamelift.md)\. For information, see [Add modular features and assets with Gems](/docs/user-guide/features/gems)\. For more information about GameLift, see [Amazon GameLift](https://aws.amazon.com/gamelift/)\.

## Additional Links {#network-gamelift-using-additional-links}

+ [Amazon GameLift \- Creating game sessions and connecting \(video\)](https://www.youtube.com/watch?v=zqc9TvLoBE4&feature=youtu.be)
+ [Amazon GameLift Developer Guide](https://docs.aws.amazon.com/gamelift/latest/developerguide/)
+ [Amazon GameLift API Reference](https://docs.aws.amazon.com/gamelift/latest/apireference/)