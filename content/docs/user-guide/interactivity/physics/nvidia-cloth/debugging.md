---
link-title: Cloth Debugging
description: 'Use console variables (CVARs) to debug NVIDIA Cloth in Open 3D Engine (O3DE).'
title: NVIDIA Cloth Debugging
weight: 500
---

![Debug visualization of the NVIDIA Cloth displaying wireframe, normals, tangents, and bitangents.](/images/user-guide/interactivity/physics/nvidia-cloth/cloth-debug-visualization.png)

You can use the following console variables (CVARs) in the editor console to visualize and debug NVIDIA Cloth:

| CVAR | Description | Values |
| --- | --- | --- |
| `cloth_DebugDraw <value>` | Draw the cloth mesh wireframe. | **0** - Disable wireframe display.<br>**1** - Enable wireframe display. |
| `cloth_DebugDrawNormals <value>` | Draw the cloth mesh normals. | **0** - Disable normals display.<br>**1** - Enable normals display.<br>**2** - Enable normals, tangents and bitangents display. |
| `cloth_DebugDrawColliders <value>` | Draw the cloth colliders. | **0** - Disable collider display.<br>**1** - Enable collider display. |
| `cloth_DebugDrawMotionConstraints <value>` | Draw the cloth motion constraints. | **0** - Disable motion constraint display.<br>**1** - Enable motion constraint display. |
| `cloth_DebugDrawBackstop <value>` | Draw the cloth backstop. | **0** - Disable backstop display.<br>**1** - Enable backstop display. |
| `cloth_DistanceToTeleport <meters>` | The amount of meters the entity has to move in a frame to consider it a teleport for cloth. | Floating point value that represents a distance in meters (world units). |
| `cloth_SecondsToDelaySimulationOnActorSpawned <seconds>` | The amount of time in seconds the cloth simulation will be delayed to avoid sudden impulses when actors are spawned. | Floating point value that represents a delay in seconds. |
