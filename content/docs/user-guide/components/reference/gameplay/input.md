---
linkTitle: Input
title: Input Component
description: Use the Input component to bind raw input to events in Open 3D Engine (O3DE).
---

Use the **Input** component to bind raw input to events in your game. The Input component references an `.inputbindings` file, which binds a set of inputs (such as from a mouse, keyboard, game controller) to an event.

## Provider

[Starting Point Input Gem](/docs/user-guide/gems/reference/input/starting-point-input)

## Input properties

![Input component properties](/images/user-guide/interactivity/input/input-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Input to event bindings** | References an `.inputbindings` file that defines the bindings of raw input to events. | Inputbinding Asset | None |
| **Local player index** | Sets the player index to receive input events from. If set to `-1`, this Input component receives input events from all controllers. If set to `0` to `3`, this Input component receives input from a single controller. | -1 to 3 | `-1` |

{{< note >}}
The **Local player index** property will only be functional on platforms where **Local player index** corresponds to the `Local user Id`, such as PC.  For other platforms, `SetLocalUserId` must be called at runtime with the id of a logged-in user.
{{< /note >}}
