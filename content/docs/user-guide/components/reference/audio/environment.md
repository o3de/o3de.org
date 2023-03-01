---
linkTitle: Audio Environment
title: Audio Environment Component
description: Use the Audio Environment component to set up a default environment for an entity in Open 3D Engine.
toc: true
---

The **Audio Environment** component provides access to features of the [Audio Translation Layer (ATL)](/docs/user-guide/interactivity/audio/audio-translation-layer) environments. Environments are used to apply environmental effects such as reverb or echo.

![Audio Environment component](/images/user-guide/component/audio/component-audio-environment1.png)

## Audio Environment Properties

| Name | Description | Default |
|------|-------------|---------|
| **Default Environment** | Enter the name of the audio environment to use by default when setting amounts. | `<Empty>` |

## EBus Request Bus Interface

Use the following request functions with the EBus interface to communicate with other components of your game.

For more information about using the Event Bus (EBus) interface, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).

| Name | Description | Parameters | Return | Scriptable |
|------|-------------|------------|--------|------------|
| **SetAmount** | Sets the amount of environmental **'send'** to apply to the default environment, if set. | `amount` - Float value of the amount to set | None | Yes |
| **SetEnvironmentAmount** | Sets the amount of environmental **'send'** to apply to the specified environment. | `environmentName` - Name of ATL Environment to set an amount on; `amount` - Float value of the amount to set | None | Yes |