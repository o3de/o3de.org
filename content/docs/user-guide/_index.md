---
description: ' Open 3D Engine is a free, cross-platform, cloud-connected game engine that
  you can use to build games. '
linktitle: Open 3D Engine User guide
title: What is Open 3D Engine (O3DE)?
weight: 300
---

Open 3D Engine is a free, cross\-platform, 3D game engine that allows you to create high\-quality games, connect your games to the compute and storage of the AWS Cloud, and engage fans on Twitch\. With O3DE, you can spend more time creating great gameplay and building communities of fans, and less time on the heavy lifting of building a game engine and managing servers\.

O3DE offers everything a professional game developer can expect, such as a full\-featured editor, native code performance, and stunning visuals\. It also includes hundreds of other ready\-to\-use features like networking, cinematics, the **Script Canvas** editor, the **Animation Editor**, audio tools, and more\.

Interested? Want to get started?
+ [Download the latest version of the O3DE beta](https://aws.amazon.com/lumberyard/downloads/)
+ [ Kickstart your learning by watching tutorial videos](https://aws.amazon.com/lumberyard/videos/)
+ [Sign up for and participate in the Open 3D Engine forums](https://forums.awsgametech.com/)

![\[Learn more about O3DE's systems and features in the Open 3D Engine User Guide.\]](/images/user-guide/starter-game-introduction-1.25.png)

Image from Starter Game\. For more sample projects and levels, see [Using O3DE sample projects and levels](/docs/userguide/samples/projects/s-levels-intro.md)\.

## Professional\-Grade AAA Engine {#lumberyard-aaa-engine}

O3DE helps you build rich, engaging, world\-class games through its comprehensive and proven toolset and highly optimized runtime performance\.

### Beautiful Worlds {#lumberyard-aaa-engine-worlds}

The visuals technology of O3DE can bring to life any virtual environment\. Your artists get a powerful toolbox to create high quality visual elements, such as physically based shaders, dynamic global illumination, particle effects, lifelike vegetation, real\-time dynamic water caustics, and volumetric fog\. They can also produce cinematic features like color grading, motion blur, depth of field, and integrated HDR lens flares\.

For more information, see the following topics:
+ [Creating levels and adding environment effects](/docs/userguide/level-intro.md)
+ [Adding particle effects](/docs/userguide/particles/intro.md)
+ [Create screen effects](/docs/userguide/rendering/screen-effects-intro.md)

### Asset Changes {#lumberyard-aaa-engine-asset-changes}

With the O3DE's Asset Processor, you can quickly get assets into the engine\. Save a file \(for example, from Maya or Photoshop\) into a directory, and the Asset Processor automatically processes that file from source art into game\-ready assets\. If you edit an asset, O3DE detects the change and automatically updates it in the background\.

For more information, see [Using Asset Processor](/docs/user-guide/features/assets/processor.md)\.

### Component Entities {#lumberyard-aaa-engine-component-entities}

The component entity system helps you compose complex entities out of simpler entities\. Content creators can drag and drop components to build behaviors, edit component settings live in the editor, and create Lua scripts to quickly change or extend an entity's behavior\. To build and iterate for complex scenes, entities can be grouped together into slices\. Those slices can in turn be used to create more complex slices, resulting in a fully cascading prefab system\. If you change a slice, you can share your changes to all the slice instances, or keep your changes exclusive to just that instance\.

For more information, see the following topics:
+ [Working with component entities](/docs/userguide/components/intro.md)
+ [Working with Slices](/docs/userguide/components/slices.md)

### Compelling Characters {#lumberyard-aaa-engine-characters}

Artists can use O3DE to create believable characters and high\-fidelity performances\. O3DE's character tool, Animation Editor, combines animation, attachments, and physics simulations with blend shape, blend space, and animation layering\.

For more information, see [Create and animate characters](/docs/user-guide/features/visualization/animation/char-intro.md)\.

### Robust Networking {#lumberyard-aaa-engine-networking}

O3DE introduces GridMate, a robust and flexible networking solution designed for efficient bandwidth usage and low\-latency communications\. You can synchronize objects over the network with GridMate's replica framework\. GridMate's session management can be integrated with other multiplayer services and helps you handle peer\-to\-peer and client-server topologies with host migration\.

For more information, see [Using O3DE Networking](/docs/userguide/networking/intro.md)\.

### Real\-Time Gameplay Editing {#lumberyard-aaa-engine-gameplay}

Real\-time gameplay editing helps you iterate on gameplay and immediately see your results without waiting for builds or leaving the editor\. O3DE's Asset Processor automatically converts and optimizes your game assets in real time so that you can import game objects, fine\-tune behavior, and play the game that you created\.

### Modular Gems {#lumberyard-aaa-engine-gems}

O3DE's Modular Gems system gives you a library of prebuilt features with which you can start new projects or prototype ideas quickly\. Modular Gems offer increased control over which technologies to include in your game project\. Create your own modular Gems or use the Gems included with O3DE, such as physics, multiplayer, "white box" rapid prototyping tools, and more\.

For more information, see [Add modular features and assets with Gems](/docs/user-guide/features/gems)\.

### Wwise LTX {#lumberyard-aaa-engine-wwise-ltx}

O3DE includes a version of Audiokinetic's advanced, feature\-rich sound engine\. Sound designers and composers can author rich soundscapes for your games\.

For more information, see [Adding Audio and Sound Effects](/docs/user-guide/features/interactivity/audio/intro.md)\.

## Integrated with AWS {#lumberyard-aws-integration}

O3DE is deeply integrated with AWS so you can build live and multiplayer games with dramatically less cost, time, and technical risk\. AWS integrations include:

### Amazon GameLift {#lumberyard-aws-gamelift}

Amazon GameLift is an AWS service for deploying, operating, and scaling session\-based multiplayer games\. You can scale high\-performance game servers up and down to meet player demand without additional engineering effort\.

For more information, see the [Amazon GameLift Developer Guide](https://docs.aws.amazon.com/gamelift/latest/developerguide/)\.

### Cloud Canvas {#lumberyard-aws-cloud-canvas}

Cloud Canvas is O3DE's technology for connecting your game to Amazon Web Services\. With Cloud Canvas, you can use AWS to implement cloud\-hosted features and create asynchronous multiplayer games\. Using AWS means you no longer have to acquire, configure, or operate host servers to implement connected gameplay\.

You can build live, online game features, such as a community news feed, daily gifts, or in\-game notifications, in minutes with O3DE's Cloud Canvas tool\. Using cloud gems, you can build gameplay that connects to AWS services, such as Amazon DynamoDB, AWS Lambda, and Amazon S3\.

For more information, see [Implementing Connected Features with Cloud Canvas](/docs/userguide/gems/cloud-canvas/intro.md)\.

### AWS SDK for C\+\+ {#lumberyard-aws-sdk}

The AWS SDK for C\+\+ provides C\+\+ API operations for numerous AWS services including Amazon S3, Amazon EC2, Amazon DynamoDB, and more, with support for all major native platforms\. You can use the SDK to integrate AWS components into your game\.

For more information, see the [AWS SDK for C\+\+](https://aws.amazon.com/sdk-for-cpp/)\.

## Integrated with Twitch {#lumberyard-aws-twitch}

O3DE is integrated with Twitch so that you can build games that engage with more than 1\.7 million monthly broadcasters and more than 100 million monthly viewers on Twitch\.

### Twitch ChatPlay {#lumberyard-aws-chatplay}

The Twitch ChatPlay feature within O3DE helps you build gameplay that interacts in real time with Twitch viewers\. For example, you can build a game where viewers can vote on game outcomes, gift power\-ups to their favorite players, or change the level based on the number of viewers watching the player\.

For more information, see [Twitch ChatPlay System](/docs/user-guide/features/gems/chatplay/intro.md)\.

## Free with Source {#lumberyard-aws-source}

O3DE is free, including source code\. You can customize O3DE for your team and vision for your project today, and for future projects\. There are no seat fees, subscription fees, or requirements to share revenue\. Only pay for the AWS services that you choose to use\.

For more information, see the [O3DE Licensing FAQ](https://aws.amazon.com/lumberyard/faq/#licensing)\.