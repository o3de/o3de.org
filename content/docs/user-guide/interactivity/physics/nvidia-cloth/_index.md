---
description: ' Create realistic simulated cloth and fabric in Open 3D Engine with NVIDIA
  Cloth. '
linktitle: NVIDIA Cloth
title: Simulate cloth with NVIDIA Cloth
weight: 300
---

{{< preview-migrated >}}

 With **NVIDIA Cloth** in Open 3D Engine you can create realistic cloth simulations for entities that contain **Actor** or **Mesh** components. The **NVIDIA Cloth** gem provides a component you can use to simulate cloth on any mesh that has been processed with a **Cloth** modifier applied in **FBX Settings**.

To use **NVIDIA Cloth** you must enable the [NVIDIA Cloth gem](/docs/user-guide/gems/reference/nvidia-cloth/).

## NVIDIA Cloth features 

****
+ Apply cloth data to meshes imported from `.fbx` files.
+ Add cloth simulation to entities containing **Mesh** and **Actor** components.
+ Cloth mesh simplification and static triangle removal allow you to use complex cloth meshes and yield faster cloth simulation.
+ Define **Inverse mass**, **Motion constraints**, and **Backstop** per cloth particle with vertex color streams you create.
+ Blend between cloth simulation and actor keyframe animation with motion constraints.
+ Add cloth colliders to actors with **Animation Editor**.
+ Add local wind forces to your cloth simulations or use force regions to simulate wind.
+ Simulate cloth in parallel across available CPU cores.
+ **NVIDIA Cloth** gem's public API allows other systems and gems to access cloth simulation functionality.
+ Debug cloth simulations and constraints with real-time cloth debug visualizations.

## Using NVIDIA Cloth 

[Cloth component](/docs/user-guide/components/reference/physx/cloth/) - Cloth component reference.

[Cloth for Mesh components](/docs/user-guide/interactivity/physics/nvidia-cloth/meshes.md) - Create cloth for entities containing **Mesh** components.

[Cloth for Actor components](/docs/user-guide/interactivity/physics/nvidia-cloth/actors.md) - Create cloth for entities containing **Actor** components.

[Per vertex properties for cloth](/docs/user-guide/interactivity/physics/nvidia-cloth/vertex-data.md) - Use per vertex properties to define the **Inverse mass**, **Motion constraints**, and **Backstop** to create higher quality and more predictable cloth simulations.

[Cloth simulation constraints](/docs/user-guide/interactivity/physics/nvidia-cloth/constraints.md) - An overview of how **Motion constraints** and **Backstop** work to improve the results of cloth simulations.

[Cloth visual debugger](/docs/user-guide/interactivity/physics/nvidia-cloth/debugging.md) - Enable the visual debugger for cloth simulations.

## NVIDIA Cloth references 

 [NVIDIA Cloth documentation](https://gameworksdocs.nvidia.com/NvCloth/1.1/index.html) at the NVIDIA GAMEWORKS developer portal.
