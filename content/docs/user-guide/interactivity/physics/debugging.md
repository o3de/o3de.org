---
description: ' Debug PhysX issues for your game in Open 3D Engine. '
title: Debugging PhysX
weight: 1000
---

The PhysX system has the following features that you can use to debug issues.

{{< note >}}
You must first enable the [PhysX Debug](/docs/user-guide/gems/reference/physics/nvidia/physx-debug/) gem.
{{< /note >}}

**Topics**
+ [PhysX Debug Console Variables](#physx-debug-console-variables)
+ [Debugging with the ImGui Tool](#debugging-with-the-imgui-tool)
+ [Debug Options in the PhysX Configuration](#debug-options-in-the-physx-configuration)

## PhysX Debug Console Variables 

Enter the following console variables to debug your PhysX issues.

Sets your preferences for debugging. As a recommended best practice, enter this console variable command as your first step for debugging.

**Example**

```
physx_Debug 1
```

You can specify the following values:
+ `1` - Enable debug visualizations. By default, this value enables the collision shapes and edges for your PhysX entities.
+ `2` - Enables all configuration options. This enables all the available visualization options.
+ `3` - Toggles the proximity based collider visualization. This value applies only to mesh colliders. See [Physics asset colliders](/docs/user-guide/components/reference/physx/collider/#physics-asset-colliders).
+ `0` - Disables debug visualizations.

Toggles a visual culling box frame.

**Example**

```
physx_CullingBox 1
```

Adjusts the culling box size to **100**. Enter **0** to disable culling.

```
physx_CullingBoxSize 100
```

Connects to the PhysX Visual Debugger. You must have the PhysX Visual Debugger open to run this command. See [Debugger Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-debugger.md).

```
physx_PvdConnect
```

Disconnects from the PhysX Visual Debugger. You must have the PhysX Visual Debugger open to run this command. See [Debugger Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-debugger.md).

```
physx_PvdDisconnect
```

For more information, see [Using the Console Window](/docs/user-guide/editor/console.md).

## Debugging with the ImGui Tool 

In game mode, you can configure the PhysX debug settings using the immediate mode graphical user interface (**ImGui**) tool.

{{< note >}}
You must enable the [ImGui Gem](/docs/user-guide/gems/reference/debug/imgui) to access this tool.
{{< /note >}}

**To debug with the ImGui tool**

1. Press **Ctrl+G** to enter gameplay mode.

1. Press the **Home** key to open the **ImGui** tool. The **PhysX Debug** menu appears under the **Perspective** viewport.

1. Click **PhysX Debug**.
**Example**
![PhysX Debug menu in gameplay mode.](/images/user-guide/physx/physx-debugger-imgui-tool.png)

1. You can make the following changes.
****


## Debug Options in the PhysX Configuration 

You can also specify debug settings in the **PhysX Configuration** tool. See [Debugger Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-debugger.md).
