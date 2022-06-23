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
- [PhysX Debug Console Variables](#physx-debug-console-variables)
- [Debugging with the ImGui Tool](#debugging-with-the-imgui-tool)
- [Debug Options in the PhysX Configuration](#debug-options-in-the-physx-configuration)
- [Enable additional checks and error reporting in PhysX SDK](#enable-additional-checks-and-error-reporting-in-physx-sdk)

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

**Example**

Toggles a visual culling box frame.

```
physx_CullingBox 
```

Adjusts the culling box size to **100**. Enter **0** to disable culling.

```
physx_CullingBoxSize 100
```

Connects to the PhysX Visual Debugger. You must have the PhysX Visual Debugger open to run this command. See [Debugger Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-debugger/).

```
physx_PvdConnect
```

Disconnects from the PhysX Visual Debugger. You must have the PhysX Visual Debugger open to run this command. See [Debugger Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-debugger/).

```
physx_PvdDisconnect
```

For more information, see [Using the Console Window](/docs/user-guide/editor/console/).

## Debugging with the ImGui Tool 

In game mode, you can configure the PhysX debug settings using the immediate mode graphical user interface (**ImGui**) tool.

{{< note >}}
You must enable the [ImGui Gem](/docs/user-guide/gems/reference/debug/imgui) to access this tool.
{{< /note >}}

**To debug with the ImGui tool**

1. Press **Ctrl+G** to enter gameplay mode.

1. Press the **Home** key to open the **ImGui** tool. The **PhysX Debug** menu appears under the **Perspective** viewport.

1. Click **PhysX Debug**.

![PhysX Debug menu in gameplay mode.](/images/user-guide/physx/physx-debugger-imgui-tool.png)

1. You can make the following changes.
****

| **Default** | **Description** |
|-------|--------|
| **Debug visualizations** | Enables debug visualizations mode. This is the same as the physx_Debug 1 console variable. |
| **Visualize colliders** | Enables colliders to appear. This is the same as the physx_Debug 3 console variable. |
| **Culling** | You can specify the following options:<ul><li>**Wireframe** – Displays wireframes in the viewport.</li><li>**Size** – Click and drag the slider to specify the size of the wireframes. As a best practice, keep this value small to prevent performance issues.</li></ul> |
| **Collisions** | Enables debugging for collision types. You can specify the following options: <ul><li>**Shapes**</li><li>**Edges**</li><li>**F Normals**</li><li>**Aabbs**</li><li>**Axis**</li><li>**Compounds**</li><li>**Static**</li><li>**Dynamic**</li></ul> |
| **Body** | Enables debugging for body types. You can specify the following options: <ul><li>**Axes**</li><li>**Mass Axes**</li><li>**Linear Velocity**</li><li>**Angular Velocity**</li></ul> |

## Debug Options in the PhysX Configuration 

You can also specify debug settings in the **PhysX Configuration** tool. See [Debugger Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-debugger/). 

## Enable additional checks and error reporting in PhysX SDK

You can make the profile configuration of O3DE use the **checked** version of the PhysX SDK library. PhysX will perform additional checks to detect invalid parameters, API race conditions and other incorrect uses of the API which might otherwise cause mysterious crashes or failures in simulation. The benefit of doing this is the same safety checks from the debug configuration are enabled without having to run O3DE in debug, where low framerates could impact the simulation.

Using the checked version of PhysX has an impact on performance. Use it to detect errors in the simulation or to make sure that the scene is properly set up, but disable it when doing profiling or trying to identify performance bottlenecks.

You can enable the checked version of PhysX by setting **LY_PHYSX_PROFILE_USE_CHECKED_LIBS** to **TRUE** during CMake configuration:

```
-DLY_PHYSX_PROFILE_USE_CHECKED_LIBS=TRUE
```
