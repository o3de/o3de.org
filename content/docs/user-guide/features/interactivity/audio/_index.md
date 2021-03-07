---
description: ' Use Open 3D Engine''s audio translation layer (ATL) to develop your game
  audio without affecting game logic. '
linktitle: Audio
title: Adding Audio and Sound Effects
---

O3DE uses an audio translation layer \(ATL\) to interface between O3DE and third\-party audio middleware, so you can develop and change your audio implementation without affecting the game logic\. The game logic interacts with ATL controls, which map to their audio middleware equivalents through the Audio Controls Editor\. For example, to play a sound, the game executes an ATL trigger, which is mapped to a 'Play' event in the audio middleware\.

O3DE supports Audiokinetic Wave Works Interactive Sound Engine \(Wwise\), an audio pipeline solution with which you can create compelling soundscapes for your game\. O3DE comes pre\-configured with Wwise LTX, a free, compact version of Wwise\.

For more information, see [Setting up Wwise LTX](/docs/userguide/audio/wwise-using.md)\.

Wwise is an industry standard audio middleware, but the full\-featured software is not free\. For licensing and pricing details, see [http://www\.audiokinetic\.com/pricing](http://www.audiokinetic.com/pricing)\.

**Topics**
+ [Audio System Overview](/docs/user-guide/features/interactivity/audio/architecture.md)
+ [Audio Translation Layer](/docs/user-guide/features/interactivity/audio/translation-layer.md)
+ [Audiokinetic Wwise](/docs/userguide/audio/wwise.md)
+ [Audio Components](/docs/user-guide/features/interactivity/audio/components.md)
+ [Audio Console Variables](/docs/user-guide/features/interactivity/audio/console-commands.md)