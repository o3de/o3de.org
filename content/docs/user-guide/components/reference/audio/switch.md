---
linkTitle: Audio Switch
title: Audio Switch Component
description: Use the Audio Switch component to set up a default switch and switch states for an entity in O3DE.
toc: true
---

The **Audio Switch** component provides basic [Audio Translation Layer (ATL)](/docs/user-guide/interactivity/audio/audio-translation-layer) switch functionality. With switches (and switch states), you can specify the state of an entity. The audio middleware interprets states, modifies the behavior of sounds, and plays the appropriate sounds.

![Audio Switch component](/images/user-guide/component/audio/component-audio-switch1.png)

## Audio Switch Properties

| Name | Description | Default |
|------|-------------|---------|
| **Default Switch** | Enter the name of the audio switch to use by default. You can associate any audio switch with the entity. | `<Empty>` |
| **Default State** | Enter the name of the audio switch state to use by default. Use the [Audio Controls Editor](/docs/user-guide/interactivity/audio/audio-controls-editor) to assign the state to the switch. When this component is activated, the **Default Switch** is set to the **Default State**. | `<Empty>` |

## EBus Request Bus Interface

Use the following request functions with the EBus interface to communicate with other components of your game.

For more information about using the Event Bus (EBus) interface, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus).

| Name | Description | Parameters | Return | Scriptable |
|------|-------------|------------|--------|------------|
| **SetState** | Sets the specified state of the default switch. | `stateName` - Name of the state to set  | None | Yes |
| **SetSwitchState** | Sets a specified switch to a specified state. | `switchName` - Name of the switch to set; `stateName` - Name of the state to set | None | Yes |
