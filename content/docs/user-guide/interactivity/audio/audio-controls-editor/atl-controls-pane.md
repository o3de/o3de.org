---
title: ATL Controls Pane
description: Use the Audio Controls Editor's ATL Controls pane to add new audio controls and to select and edit audio controls in Open 3D Engine.
weight: 100
---

The **ATL Control** pane has the following control types. The associated icon designates the type of control. You can customize the name of the control.

| Audio Control Type | Icon | Description |
| --- | --- | --- |
| Trigger | ![Trigger control](/images/user-guide/audio/audio_atl_trigger.png) |  Containers that connects to events in the audio middleware. You can author events to complete actions such as play or stop sounds, mute or unmute buses, and so on. To preview a trigger, right-click and choose **Execute Trigger**, or press the spacebar. |
| RTPC | ![RTPC control](/images/user-guide/audio/audio_atl_rtpc.png) | Real-Time Parameter Control (RTPC) is a floating-point variable that is updated over time by the game logic. RTPCs connect to parameters in the audio middleware that drive and modulate sound characteristics. |
| Switch | ![Switch control](/images/user-guide/audio/audio_atl_switch.png) | A variable that can be in one of several states, called switch states, that the game logic can set. For example, a SurfaceType switch can have values of Rock, Sand, or Grass. |
| Environment | ![Environment control](/images/user-guide/audio/audio_atl_environment.png) | Environments can be set on audio objects, which control the amount of environmental effect, such as reverb and echo. |
| Preload | ![Preload control](/images/user-guide/audio/audio_atl_preload.png) | Preloads are connected to sound banks, which are audio files that include packaged audio data. This audio data contains both signal content and metadata. |

**To display a limited subset of control types**

1. In the **Audio Controls Editor**, click **Filters**.

1. Select or clear control types.

![Select or clear the control types](/images/user-guide/audio/audio-atl-editor-filter.png)

**To add a new control**

1. Click **Add**.

1. Select the type of control that you want to add.

![Select the type of control you want to add](/images/user-guide/audio/audio-atl-editor-add.png)
