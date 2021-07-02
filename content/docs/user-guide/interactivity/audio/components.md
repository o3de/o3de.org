---
title: Audio Components
description:  Use the audio components in Open 3D Engine to add sounds to your level.
weight: 200
---

Use the following audio components to add and configure sounds in your level.

| Component | Description |
| --- | --- |
| [Audio Area Environment](/docs/user-guide/components/reference/audio/area-environment) | Enables entities that are moving around and throughout a shape to have environment effects applied to any sounds that they trigger. You must also add a shape component to use the audio area environment component. |
| [Audio Environment](/docs/user-guide/components/reference/audio/environment) | Provides access to features of the Audio Translation Layer (ATL) environments. Environments are used to apply environmental effects such as reverb or echo. |
| [Audio Listener](/docs/user-guide/components/reference/audio/listener) | Places a virtual microphone in the environment. An audio listener acts as a sink for sound sources in the virtual world, and 3D audio rendering is processed with respect to the listener's world transform. You can specify the audio listener's position and rotation independently. |
| [Audio Preload](/docs/user-guide/components/reference/audio/preload) | Loads and unloads ATL preloads, which contain references to soundbanks. |
| [Audio Proxy](/docs/user-guide/components/reference/audio/proxy) | Required dependency if you add multiple audio components to an entity. It acts as a proxy audio object wrapped in a component. For example, if you have an audio trigger component and an audio rtpc component on the same entity, they communicate to the same audio object using this audio proxy component. |
| [Audio RTPC](/docs/user-guide/components/reference/audio/rtpc) | Provides basic Real-Time Parameter Control (RTPC) functionality. An RTPC is a named variable that the audio system can interpret in many different ways. It allows game developers to set the value from the game at run time to produce real-time tweaking of sounds. |
| [Audio Switch](/docs/user-guide/components/reference/audio/switch) | Provides basic Audio Translation Layer (ATL) switch functionality. With switches and switch states, you can specify the state of an entity. The audio middleware interprets states, modifies the behavior of sounds, and plays the appropriate sounds. |
| [Audio System](/docs/user-guide/components/reference/audio/audio-system) | Control of the global Audio System settings. |
| [Audio Trigger](/docs/user-guide/components/reference/audio/trigger) | Provides basic play and stop features so that you can set up Audio Translation Layer (ATL) play and stop triggers that can be executed on demand. With an audio trigger, you can also enable the player to run or stop audio triggers by name on entities. |
| [Multi-position Audio](/docs/user-guide/components/reference/audio/multi-position) | Control audio which plays from multiple locations within a level. |

## Related topics

* [Microphone Gem](/docs/user-guide/gems/reference/audio/microphone)
