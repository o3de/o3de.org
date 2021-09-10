---
linktitle: Audio
title: Adding Audio and Sound Effects
description: Use Open 3D Engine's Audio Translation Layer (ATL) and Audio Controls Editor (ACE) to develop your game audio without affecting game logic.
---

O3DE uses an audio translation layer (ATL) to interface between O3DE and third-party audio middleware, so you can develop and change your audio implementation without affecting the game logic. The game logic interacts with ATL controls, which map to their audio middleware equivalents through the Audio Controls Editor. For example, to play a sound, the game executes an ATL trigger, which is mapped to a 'Play' event in the audio middleware.

O3DE includes support for the Audiokinetic Wave Works Interactive Sound Engine (Wwise), an audio middleware solution with which you can create compelling soundscapes for your game or simulation. Refer to the [Wwise Audio Gem](/docs/user-guide/gems/reference/audio/wwise/audio-engine-wwise) reference documentation for information on how to configure and use this Gem.

## Audio topics

* [Audio System Overview](./overview)
* [Audio Components](./components)
* [Audio Translation Layer](./audio-translation-layer)
* [ATL Default Controls](./atl-default-controls)
* [Audio Controls Editor](./audio-controls-editor)
* [Audio Console Variables](./console-variables)
* [Advanced Topics](./advanced-topics)
