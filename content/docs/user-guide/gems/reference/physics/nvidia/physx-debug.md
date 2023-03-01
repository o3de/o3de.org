---
linkTitle: PhysX Debug
title: PhysX Debug Gem
description: The PhysX Debug Gem provides debugging functionality and visualizations for PhysX in Open 3D Engine (O3DE) projects.
toc: true
---

The PhysX Debug Gem provides features to debug visualizations for your PhysX scene geometry, such as the **PhysX Collider** and **PhysX Rigid Body** components, and so on.

When you enter console variables or the use the **ImGui** tool, you can view the PhysX debug lines in editor and game modes. This Gem uses data directly from PhysX to show a culled (limited by proximity to the camera) view of the simulated world in real time.

In editor mode, this Gem displays PhysX shapes within a given distance of the viewport camera. In game mode, this Gem uses the currently active camera to visualize a culled view of the PhysX scene.

This Gem includes the following features:
+ Visualize debug rendering of physics geometry, such as collision primitives, terrain, shapes, and forces.
+ Control mechanisms using console variables, the PhysX settings menu, and the **ImGui** tool.
+ Visualization frustum culling.
+ PhysX visual debugger hooks and controls using the third-party tool visual debgger.
+ Proximity based debug visualizations of collision meshes.

{{< note >}}
To enable the PhysX Debug Gem, you must first enable the [PhysX](/docs/user-guide/gems/reference/physics/nvidia/physx) and [ImGui](/docs/user-guide/gems/reference/debug/imgui/) Gems.
{{< /note >}}

For more information, see [Debugging PhysX](/docs/user-guide/interactivity/physics/debugging/).
