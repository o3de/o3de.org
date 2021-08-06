---
description: ' Create realistic destruction simulations in Open 3D Engine with NVIDIA Blast. '
linktitle: NVIDIA Blast
title: Simulated destruction with NVIDIA Blast
weight: 200
---

{{< preview-migrated >}}

 With **NVIDIA Blast** in Open 3D Engine, you can simulate destruction by authoring blast assets in SideFX Houdini and creating entities with the **Blast Family** and **Blast Family Mesh Data** components.

To use **NVIDIA Blast**, you must enable the [NVIDIA Blast gem](/docs/user-guide/gems/reference/physics/nvidia/nvidia-blast/).

**Note**
NVIDIA Blast for O3DE requires a SideFX Houdini commercial or indie license to create assets. The apprentice license is not sufficient. For more information on Houdini, see [SideFX's home page](https://www.sidefx.com/).
The precompiled Houdini plug-ins supplied with the **NVIDIA Blast** gem require Houdini 18.0.

## NVIDIA Blast features 

These are the features that NVIDIA Blast provides:
+ Fracture geometry and author blast assets in SideFX Houdini with the provided Houdini plug-ins and Houdini Digital Assets (HDAs).
+ Create multiple levels of destruction for simulation.
+ Automatically process and quickly set up assets with the provided Python Asset Builder for NVIDIA Blast.
+ Create blast materials to define the forces required to trigger destruction simulation on blast assets.
+ Add NVIDIA Blast assets to entities with the **Blast Family** and **Blast Family Mesh Data** components.
+ Script destruction with the provided **Script Canvas** nodes for NVIDIA Blast.
+ Debug NVIDIA Blast simulations with real-time debug visualizations.

## Using NVIDIA Blast 

See the following topics for detailed information about NVIDIA Blast.

[Blast Family component](/docs/user-guide/components/reference/destruction/blast-family/) - Blast Family component reference.

[Blast Family Mesh Data component](/docs/user-guide/components/reference/destruction/blast-family-mesh-data/) - Blast Family Mesh Data component reference.

[Install NVIDIA Blast plug-ins](/docs/user-guide/interactivity/physics/nvidia-blast/install-houdini-plugin/#install-nvidia-blast-plug-ins) - Install the NVIDIA Blast plug-ins and Houdini Digital Assets.

[Create assets for NVIDIA Blast](/docs/user-guide/interactivity/physics/nvidia-blast/create-blast-asset.md) - Fracture meshes in Houdini and export assets for NVIDIA Blast.

[Processing assets for NVIDIA Blast](/docs/user-guide/interactivity/physics/nvidia-blast/process-blast-asset.md) - Process NVIDIA Blast assets for O3DE.

[Simulate destruction with NVIDIA Blast](/docs/user-guide/interactivity/physics/nvidia-blast/) - Create entities with NVIDIA Blast assets and simulate destruction.

[Partial destruction with NVIDIA Blast](/docs/user-guide/interactivity/physics/nvidia-blast/static-chunks.md) - Use attributes to create partial destruction.

[Specify destruction properties with Blast materials](/docs/user-guide/interactivity/physics/nvidia-blast/materials.md) - Use a blast material to define the force required to trigger destruction.

[NVIDIA Blast visual debugger](/docs/user-guide/interactivity/physics/nvidia-blast/debug.md) - Use the visual debugger for NVIDIA Blast.

[Script Canvas nodes for NVIDIA Blast](/docs/user-guide/interactivity/physics/nvidia-blast/script-canvas.md) - Script destruction simulation in Script Canvas.

## NVIDIA Blast references 

 [NVIDIA Blast documentation](https://developer.nvidia.com/blast) at the NVIDIA GAMEWORKS developer portal.
