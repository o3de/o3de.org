---
description: ' Use the NVIDIA Cloth component to add cloth simulation to Mesh components
  in Open 3D Engine. '
title: Cloth for Mesh components
weight: 100
---

To use **Cloth**, you must enable the **NVIDIA Cloth** gem. For more information, see the [NVIDIA Cloth Gem](/docs/user-guide/gems/reference/physics/nvidia/nvidia-cloth/) documentation.

You can create cloth assets for entities with **Mesh** components in the content creation application of your choice and import them into O3DE from an `.fbx` file. The mesh asset should have the following:
+ A cloth mesh that will be simulated and rendered in O3DE.
  + Cloth data can be added to define per vertex mass and constraint properties using the vertex color tool in your content creation application. For more information see [Per vertex properties for cloth](/docs/user-guide/interactivity/physics/nvidia-cloth/vertex-data/).
+ **Optional** - Any other static mesh. For example, if you create a flag to be simulated as cloth, then you can include a mesh for the flag pole.

{{< note >}}
Sample **Mesh** component cloth assets are located in the **NVIDIA Cloth** gem directory, which is located at `/dev/Gems/NvCloth/Assets/Objects/cloth/Environment/`.
{{< /note >}}

For information on exporting mesh assets, see [FBX Settings mesh export](/docs/user-guide/assets/scene-settings/meshes-tab/).

## Add Cloth to Mesh components

Create cloth by adding the **Cloth** component to an entity that has a **Mesh** component, and then setting the properties of the **Cloth** component.

1. In O3DE Editor, add a new entity to the level.

1. Add a **Mesh** component to the entity, and reference the mesh asset and material.

1. Add a **Cloth** component to the entity.

1. Set the cloth data of the mesh asset.

   1. Click the button beside the **Mesh node** property to open the **FBX Settings** window.

   ![Open 3D Engine cloth component mesh node select.](/images/user-guide/physx/cloth/ui-cloth-mesh-node-select.png)

   1. In the **FBX Settings** window, on the **Meshes** tab, and choose **Add Modifier**, **Cloth**.

   1. In the **Cloth** modifier area:

      1. Select the cloth mesh from the drop-down list.

      1. When applicable, select the vertex color stream and channel that includes the **Inverse Masses** data. If data is not provided, then cloth defaults to an inverse mass value of 1.0 for all vertices.

      1. When applicable, select the vertex color stream and channel that include the **Motion Constraints** data. If data is not provided, then cloth defaults to a motion constraint value of 1.0 for all vertices.

      1. When applicable, select the vertex color streams and channels that includes the **Backstop Offset** and **Backstop Radius** data. If data is not provided, then no backstop constraints will be applied in the simulation.

      ![Open 3D Engine cloth modifier setup.](/images/user-guide/physx/cloth/ui-cloth-modifier-mesh-setup.png)

   1. Choose the **Update** button. **Asset Processor** then updates the asset and includes the cloth data.

1. Configure the cloth component.

   1. Select the cloth mesh node from the drop-down list.

   ![Open 3D Engine cloth component.](/images/user-guide/physx/cloth/ui-cloth-component-select-mesh.png)

   1. Adjust cloth properties to obtain the desired cloth behavior. For more information, see [Cloth Component](/docs/user-guide/components/reference/physx/cloth/).

## View the Cloth Simulation

In O3DE Editor, press Ctrl+G or press the **Play** button to run your project.

![Open 3D Engine cloth simulation with the NVIDIA Cloth gem.](/images/user-guide/physx/cloth/anim-mesh-cloth.gif)
