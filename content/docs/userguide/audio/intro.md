---
description: ' Use &ALYlong;''s audio translation layer (ATL) to develop your game
  audio without affecting game logic. '
slug: audio-intro
title: Adding Audio and Sound Effects
---
# Adding Audio and Sound Effects<a name="audio-intro"></a>

Lumberyard uses an audio translation layer \(ATL\) to interface between Lumberyard and third\-party audio middleware, so you can develop and change your audio implementation without affecting the game logic\. The game logic interacts with ATL controls, which map to their audio middleware equivalents through the Audio Controls Editor\. For example, to play a sound, the game executes an ATL trigger, which is mapped to a 'Play' event in the audio middleware\.

Lumberyard supports Audiokinetic Wave Works Interactive Sound Engine \(Wwise\), an audio pipeline solution with which you can create compelling soundscapes for your game\. Lumberyard comes pre\-configured with Wwise LTX, a free, compact version of Wwise\. 

For more information, see [Setting up Wwise LTX](/docs/userguide/audio/wwise-using.md)\.

Wwise is an industry standard audio middleware, but the full\-featured software is not free\. For licensing and pricing details, see [http://www\.audiokinetic\.com/pricing](http://www.audiokinetic.com/pricing)\.

**Topics**
+ [Audio System Overview](/docs/userguide/audio/architecture.md)
+ [Audio Translation Layer](/docs/userguide/audio/translation-layer.md)
+ [Audiokinetic Wwise](/docs/userguide/audio/wwise.md)
+ [Audio Components](/docs/userguide/audio/components.md)
+ [Audio Console Variables](/docs/userguide/audio/console-commands.md)