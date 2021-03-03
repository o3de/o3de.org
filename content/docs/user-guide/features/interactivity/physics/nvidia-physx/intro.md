---
description: ' Use Open 3D Engine''s PhysX system to create realistic physical effects
  such as collision detection and rigid body dynamics simulation. '
title: Simulating physics behavior with the PhysX system
---
# Simulating physics behavior with the PhysX system {#physx-intro}

Lumberyard's PhysX system acts upon entities to create realistic physical effects such as collision detection and rigid body dynamics simulation\. To use the PhysX system, install the [PhysX SDK](https://developer.nvidia.com/gameworks-physx-overview) using the [Lumberyard Setup Assistant](/docs/userguide/lumberyard-launcher-using.md)\.

**Note**
 Lumberyard's PhysX system does not interact with [Physics \(Legacy\)](/docs/userguide/components/components#component-entity-physics-legacy) component entities or the legacy [Physics](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/physics-intro.html)\.

**Topics**
+ [PhysX Gems](#physx-intro-gems)
+ [PhysX Components](#physx-intro-physx-components)
+ [PhysX Configuration](#physx-intro-configuration)
+ [PhysX Materials](#physx-intro-materials)
+ [PhysX Debugging](#physx-intro-debugging)
+ [Configuring the PhysX System](/docs/user-guide/features/interactivity/physics/nvidia-physx/configuration.md)
+ [Physics materials](/docs/user-guide/features/interactivity/physics/nvidia-physx/materials.md)
+ [PhysX Scene Queries](/docs/user-guide/features/interactivity/physics/nvidia-physx/scene-queries.md)
+ [Dynamic joints with PhysX](/docs/user-guide/features/interactivity/physics/nvidia-physx/joint-intro.md)
+ [Create global or localized wind forces with PhysX](/docs/user-guide/features/interactivity/physics/nvidia-physx/wind-provider.md)
+ [Debugging PhysX](/docs/user-guide/features/interactivity/physics/debugging.md)
+ [PhysX Best Practices](/docs/user-guide/features/interactivity/physics/nvidia-physx/best-practices.md)
+ [Simulated destruction with NVIDIA Blast](/docs/user-guide/features/interactivity/physics/nvidia-blast/intro.md)
+ [Simulate cloth with NVIDIA Cloth](/docs/user-guide/features/interactivity/physics/nvidia-cloth/intro.md)

## PhysX Gems {#physx-intro-gems}

The PhysX system uses the following gems, which you can [enable](/docs/userguide/gems/using-project-configurator.md) in the Project Configurator:
+ **[PhysX](/docs/user-guide/features/gems/physx.md)** - Provides integration for the [NVIDIA PhysX SDK](https://developer.nvidia.com/physx-sdk) into Lumberyard\. The integration provided includes a suite of components, configuration via the editor, Script Canvas integration, PhysX Visual Debugger integration, and a simplified API abstraction layer for games\.

  For more information, see [PhysX](/docs/user-guide/features/gems/physx.md)\.
+ **[PhysX Characters](/docs/user-guide/features/gems/physx-characters.md)** - Provides integration for character controllers and ragdolls\. To enable the PhysX Characters gem, you must first enable the [PhysX](/docs/user-guide/features/gems/physx.md) gem\.

  For more information, see [PhysX Characters](/docs/user-guide/features/gems/physx-characters.md)\.
+ **[PhysX Debug](/docs/user-guide/features/gems/physx-debug.md)** - Provides debug visualizations of PhysX scene geometry that you can enable with console commands and other tools\.

  For more information, see [PhysX Debug](/docs/user-guide/features/gems/physx-debug.md)\.

## PhysX Components {#physx-intro-physx-components}

The **PhysX** gem has the following components, which you can [add](/docs/userguide/components/working-adding.md) to entities by using the [**Entity Inspector**](/docs/user-guide/editor/entity-inspector.md):
+ **[PhysX Collider](/docs/user-guide/features/components/physx-collider.md)** - Enables physics objects to collide with other physics objects\. An entity that does not have a **PhysX Rigid Body Physics** component is a **static** collider, while an entity with the component is a **dynamic** collider\.
+ **[PhysX Force Region](/docs/user-guide/features/components/physx-force-region.md)** - Enables an entity to specify a region that applies physical force to entities\. For each physics simulation frame, the component applies force to entities that are in the bounds of the region\.
+ **[PhysX Rigid Body](/docs/user-guide/features/components/physx-rigid-body-physics.md)** - Enables an entity to be simulated by physics\. Rigid body mode can be **kinematic** or **dynamic**\. Dynamic rigid bodies respond to collision events with other rigid bodies\. Kinematic rigid bodies are not affected by outside forces and gravity; their motion is driven by scripting\.
+ **[PhysX Terrain](/docs/user-guide/features/components/physx-terrain.md)** - Implements physical interaction with the terrain\. It exports terrain and saves it as an asset that loads at runtime\.

The **PhysX Characters** gem has the following components:
+ **[PhysX Character Controller](/docs/user-guide/features/components/physx-character-controller.md)** - Implements basic character interactions with the physical world\. For example, it can control interactions with slopes and steps, manage interactions with other characters, and prevent characters from walking through walls or passing through terrain\.
+ **[PhysX Ragdoll](/docs/user-guide/features/components/physx-ragdoll.md)** - Enables animation of certain character behaviors\. The physical representation is usually a hierarchical collection of rigid bodies with simple shapes connected by joints\.

## PhysX Configuration {#physx-intro-configuration}

Use the **PhysX Configuration** window in Lumberyard Editor to configure global settings, collision layers, collision groups, and PhysX Visual Debugger settings\.

For more information, see [Configuring the PhysX System](/docs/user-guide/features/interactivity/physics/nvidia-physx/configuration.md)\.

## PhysX Materials {#physx-intro-materials}

PhysX materials allow simulation properties to be configured by entity\. Materials customize how an object reacts when it hits a surface and control qualities like friction and bounciness\. You use the **Asset Editor** to create a material library, assign the library to a collider, and then select a specific material from the library for the collider\.

For more information, see [Physics materials](/docs/user-guide/features/interactivity/physics/nvidia-physx/materials.md)\.

## PhysX Debugging {#physx-intro-debugging}

To verify the implementation of interactions in the simulated world, the following tools are available\.
+ **PhysX Debug gem** - The PhysX Debug gem is recommended if you are a developer or technical artist\. You can use this tool to view the physics world in real time in Lumberyard Editor's editor mode or game mode\. To activate the tool, you use console commands or an immediate mode graphical user interface \(ImGui\)\. The tool displays PhysX debug lines within the editor and game modes\.

  For more information, see [PhysX Debug](/docs/user-guide/features/gems/physx-debug.md)\.
+ **PhysX Visual Debugger** - The [PhysX Visual Debugger \(PVD\)](https://developer.nvidia.com/physx-visual-debugger) is a third party tool provided by NVIDIA that is useful for deep inspection of the PhysX world\. Lumberyard can connect PhysX worlds and scenes to a running PVD application instance\. You can use the PVD to step through your simulation and examine various properties at your own pace in detail\.

  For information on configuring Lumberyard's connection to PVD, see [Debugger Configuration](/docs/user-guide/features/interactivity/physics/nvidia-physx/configuration-debugger.md)\.

For more information, see [Debugging PhysX](/docs/user-guide/features/interactivity/physics/debugging.md)\.
