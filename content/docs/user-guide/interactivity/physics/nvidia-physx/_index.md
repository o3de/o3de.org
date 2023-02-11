---
description: Use Open 3D Engine's PhysX system to create realistic physical effects such as collision detection and rigid body dynamics simulation. 
linktitle: NVIDIA PhysX
title: Simulating physics behavior with the PhysX system
weight: 100
---

O3DE's PhysX system acts upon entities to create realistic physical effects such as collision detection and rigid body dynamics simulation. 

**Topics**
+ [PhysX Gems](#physx-gems)
+ [PhysX Components](#physx-components)
+ [PhysX Configuration](#physx-configuration)
+ [Physics Materials](#physics-materials)
+ [PhysX Debugging](#physx-debugging)
+ [Configuring the PhysX System](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/))
+ [PhysX Scene Queries](/docs/user-guide/interactivity/physics/nvidia-physx/scene-queries/)
+ [PhysX Simulated Bodies](/docs/user-guide/interactivity/physics/nvidia-physx/simulated-bodies/)
+ [Dynamic joints with PhysX](/docs/user-guide/interactivity/physics/nvidia-physx/joint-intro/)
+ [Debugging PhysX](/docs/user-guide/interactivity/physics/debugging/)
+ [PhysX Best Practices](/docs/user-guide/interactivity/physics/nvidia-physx/best-practices/)
+ [Simulate cloth with NVIDIA Cloth](/docs/user-guide/interactivity/physics/nvidia-cloth/)
+ [Determinism](#determinism)
<!-- + [Simulated destruction with NVIDIA Blast](/docs/user-guide/interactivity/physics/nvidia-blast/) -->

## PhysX Gems 

The PhysX system uses the following Gems, which you can enable in **Project Manager**.

+ **[PhysX](/docs/user-guide/gems/reference/physics/nvidia/physx/)** - Provides integration for the [NVIDIA PhysX 4 SDK](https://developer.nvidia.com/physx-sdk) into O3DE. The integration provided includes a suite of components, configuration via the **O3DE Editor**, Script Canvas integration, **PhysX Visual Debugger** integration, and a simplified API abstraction layer for games.

  For more information, see [PhysX](/docs/user-guide/gems/reference/physics/nvidia/physx/).
+ **[PhysX Debug](/docs/user-guide/gems/reference/physics/nvidia/physx-debug/)** - Provides debug visualizations of PhysX scene geometry that you can enable with console commands and other tools.

  For more information, see [PhysX Debug](/docs/user-guide/gems/reference/physics/nvidia/physx-debug/).

## PhysX Components 

The **PhysX** gem has the following components, which you can [add](/docs/user-guide/components/reference/#adding-components-to-an-entity) to entities by using the [**Entity Inspector**](/docs/user-guide/editor/entity-inspector/):
+ **[PhysX Collider](/docs/user-guide/components/reference/physx/collider/)** - Enables physics objects to collide with other physics objects. An entity that does not have a **PhysX Rigid Body Physics** component is a **static** collider, while an entity with the component is a **dynamic** collider.
+ **[PhysX Shape Collider](/docs/user-guide/components/reference/physx/shape-collider/)** - Enables physics objects to collide with other physics objects, using geometry defined by a **[Shape component](/docs/user-guide/components/reference/shape/)**. An entity that does not have a **PhysX Rigid Body Physics** component is a **static** collider, while an entity with the component is a **dynamic** collider.
+ **[PhysX Force Region](/docs/user-guide/components/reference/physx/force-region/)** - Enables an entity to specify a region that applies physical force to entities. For each physics simulation frame, the component applies force to entities that are in the bounds of the region.
+ **[PhysX Rigid Body](/docs/user-guide/components/reference/physx/rigid-body/)** - Enables an entity to be simulated by physics. Rigid body mode can be **kinematic** or **dynamic**. Dynamic rigid bodies respond to collision events with other rigid bodies. Kinematic rigid bodies are not affected by outside forces and gravity; their motion is driven by scripting.
+ **[PhysX Character Controller](/docs/user-guide/components/reference/physx/character-controller/)** - Implements basic character interactions with the physical world. For example, it can control interactions with slopes and steps, manage interactions with other characters, and prevent characters from walking through walls or passing through terrain.
+ **[PhysX Character Gameplay](/docs/user-guide/components/reference/physx/character-gameplay/)** - Provides example implementations for character controller behaviors which are likely to require game-specific tweaking, such as detecting whether the character is on the ground, interacting with gravity, and behavior for interacting with kinematic bodies and other controllers. 
+ **[PhysX Ragdoll](/docs/user-guide/components/reference/physx/ragdoll/)** - Enables animation of certain character behaviors. The physical representation is usually a hierarchical collection of rigid bodies with simple shapes connected by joints.
+ **[PhysX Ball Joint](/docs/user-guide/components/reference/physx/ball-joint/)** - Creates a dynamic ball joint that constrains an entity to the joint with freedom to rotate around the y- and z-axes of the joint.
+ **[PhysX Fixed Joint](/docs/user-guide/components/reference/physx/fixed-joint/)** - Creates a dynamic fixed joint that constrains an entity to the joint with no degree of freedom in any axis.
+ **[PhysX Hinge Joint](/docs/user-guide/components/reference/physx/hinge-joint/)** - Creates a dynamic hinge joint that constrains an entity to the joint with freedom to rotate around the x-axis of the joint.

## PhysX Configuration 

Use the **PhysX Configuration** window in O3DE Editor to configure global settings, collision layers, collision groups, and PhysX Visual Debugger settings.

For more information, see [Configuring the PhysX System](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/).

## Physics Materials 

Physics materials allow simulation properties to be configured by entity. Materials customize how an object reacts when it hits a surface and control qualities like friction and bounciness. You use the **Asset Editor** to create a physics material and then assign a material to the collider.

For more information, see [Physics materials](/docs/user-guide/interactivity/physics/nvidia-physx/materials/).

## PhysX Debugging 

To verify the implementation of interactions in the simulated world, the following tools are available.
+ **PhysX Debug gem** - The PhysX Debug gem is recommended if you are a developer or technical artist. You can use this tool to view the physics world in real time in O3DE Editor's editor mode or game mode. To activate the tool, you use console commands or an immediate mode graphical user interface (ImGui). The tool displays PhysX debug lines within the editor and game modes.

  For more information, see [PhysX Debug](/docs/user-guide/gems/reference/physics/nvidia/physx-debug/).
+ **PhysX Visual Debugger** - The [PhysX Visual Debugger (PVD)](https://developer.nvidia.com/physx-visual-debugger) is a third party tool provided by NVIDIA that is useful for deep inspection of the PhysX world. O3DE can connect PhysX worlds and scenes to a running PVD application instance. You can use the PVD to step through your simulation and examine various properties at your own pace in detail.

  For information on configuring O3DE's connection to PVD, see [Debugger Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-debugger/).

For more information, see [Debugging PhysX](/docs/user-guide/interactivity/physics/debugging/).

## Determinism
Although PhysX does have support for [**deterministic behavior**](https://docs.nvidia.com/gameworks/content/gameworkslibrary/physx/guide/Manual/BestPractices.html#determinism), it requires specific conditions when constructing and stepping physics scenes, which are not met in O3DE. Furthermore, the physics system in O3DE interacts with many other systems which are not deterministic, such as animation, scripting and asynchronous asset loading. Therefore, the PhysX simulation in O3DE is not expected to be deterministic.
