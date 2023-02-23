---
linkTitle: PhysX Assets
title: Process PhysX Collider Assets
description: Learn to customize PhysX collider asset processing in Open 3D Engine (O3DE) with Scene Settings.
weight: 400
toc: true
---

**Open 3D Engine (O3DE)** has a robust set of options for generating PhysX collider assets. There are three PhysX collider types that you can use in different simulation scenarios. This topic explains the benefits and limitations of the different collider types, as well as the basics of generating PhysX asset colliders with  [**Scene Settings**](/docs/user-guide/assets/scene-settings/scene-settings).

The generated PhysX colliders are stored in `.pxmesh` product assets. You can add the PhysX collider assets to a **PhysX Collider** component by selecting **PhysicsAsset** in the component's **Shape** property.

{{< note >}}
Understanding the [best practices](/docs/user-guide/assets/scene-settings/source-asset-best-practices#physx) for creating PhysX collider source assets can mitigate issues you might encounter when processing colliders for O3DE. For technical details about the data supported by colliders, refer to the [supported 3D scene data](/docs/user-guide/assets/scene-settings/scene-format-support#supported-3d-scene-data) table.
{{< /note >}}

| O3DE Experience | Time to Complete | Feature Focus | Last Updated |
| - | - | - | - |
| Beginner | 25 Minutes | Customized processing of PhysX collider assets from `.fbx` files with Scene Settings. | January 4, 2023 |

## Entity behavior

Before you learn about collider types, you should understand the three types of entity behavior that influence the collider asset type you might choose in a given scenario:

* **Static** -- Static entities can be collided with, but they don't move, and PhysX collisions and forces don't affect them. Static entities can use any collider type.
* **Kinematic** -- Kinematic entities have a **PhysX Rigid Body** component and movement that is driven by script. Kinematic entities can be collided with, but PhysX collisions and forces don't affect them. Kinematic entities can use any collider type.
* **Dynamic** -- Dynamic entities have a **PhysX Rigid Body** component and simulated movement that results from PhysX collisions and forces. Dynamic entities can use only primitive and convex colliders.

## PhysX collider assets

Collider assets are based on input meshes that you specify in Scene Settings. You can use a single input mesh, use multiple input meshes, or even specify that multiple input meshes should be merged and welded into a single mesh before the collider asset is generated. The source asset is not altered when the collider asset is generated.

Because physics simulation can be computationally expensive, it's important to understand the various collider types, their limitations, and the scenarios in which you can use them.

### Triangle Mesh

As the name implies, triangle mesh colliders are composed of triangle meshes. You can create a simplified mesh in a digital content creation (DCC) application specifically for the collider, or generate a triangle mesh collider based on the render mesh of the asset. Triangle mesh colliders can closely approximate a complex render mesh, but you can use them only with static and kinematic entities. Because triangle mesh colliders can contain many vertices, and the collider asset is not required to be convex, these colliders generally incur a higher performance cost than primitive colliders.

Triangle mesh colliders can have multiple physics material assignments. Because the collider is derived from the input mesh, you can apply a physics material to the collider for each material assignment. This is particularly useful for ground and floor colliders that transition between materials such as concrete and dirt, or wood planks and carpet.

Colliders occupy the same physical space as the input mesh. In the following image, a triangle mesh collider asset is offset to the right of the input mesh asset that generated the collider so that you can clearly view the collider. Note that the collider asset (right) accurately represents the render mesh (left), and that the collider supports separate physics materials for the front and back faces (magenta wireframe) and side faces (teal wireframe) of the mesh.

{{< image-width "/images/learning-guide/tutorials/assets/triangle-mesh-collider-example.png" "700" "An example triangle mesh collider asset." >}}

Triangle mesh colliders are commonly used for immobile environment objects that have complex shapes, such as tree trunks, floors, large stone and architectural features, and statues.

### Primitive

Primitive colliders are composed of sphere, box, or capsule primitive shapes. Because simple properties such as **Radius**, **Height**, and **Width** define the primitive shapes, primitive colliders generally offer the best simulation performance. Primitive colliders are automatically fitted to the input mesh. However, depending on the complexity of the input mesh, areas of the collider might fall within or far outside of the input mesh surface. This can result in collisions that aren't visually accurate. The **Decompose Meshes** property decomposes complex input meshes into smaller parts, and fits primitive colliders to each part. You can use primitive colliders with static, kinematic, and dynamic entities. These colliders can have only one physics material assignment.

Colliders occupy the same physical space as the input mesh. In the following image, a primitive collider asset is offset to the right of the input mesh asset that generated the collider so that you can clearly view the collider. The collider asset (right) is a simple box that has been automatically oriented and scaled to encompass the render mesh (left). Note that one corner of the primitive collider extends far from the input mesh and penetrates the ground plane. This demonstrates one of the drawbacks of using a primitive collider on a complex input mesh. In a scenario where this is a dynamic entity, the ground plane collision would push the asset upward, and the asset would not come to rest standing upright because of the sharp corner at the bottom of the primitive collider.

{{< image-width "/images/learning-guide/tutorials/assets/primitive-collider-example.png" "700" "An example primitive collider asset." >}}

Primitive colliders are commonly used when the input mesh closely resembles one of the simple primitive shapes, and in scenarios where fast dynamic collision resolution is more important than visual accuracy.

### Convex

Convex colliders are automatically generated convex hulls. A convex hull has no concave or hollow surface areas. For PhysX, the convex hull is constructed within a limited number of vertices and is fitted to the input mesh. Convex colliders can better approximate a complex input mesh than primitive colliders, but convex colliders incur a greater performance cost. To a lesser extent than primitive colliders, convex colliders might also have areas where the collider surface falls inside or outside of the input mesh, which can result in collisions that aren't visually accurate. The Decompose Meshes property decomposes complex input meshes into smaller parts, and fits convex colliders to each part. You can use convex colliders with static, kinematic, or dynamic entities. These colliders can have only one physics material assignment.

Colliders occupy the same physical space as the input mesh. In the following image, a convex collider asset is offset to the right of the input mesh asset that generated the collider so that you can clearly view the collider. Note that the collider asset (right) has been automatically generated to encompass and roughly approximate the silhouette shape of the render mesh (left). However, the convex collider does not include details such as the hole in the middle of the input mesh.

{{< image-width "/images/learning-guide/tutorials/assets/convex-collider-example.png" "700" "An example convex collider asset." >}}

Convex colliders are commonly used on entities with complex render meshes that must be dynamically simulated, such as interactive props, and on entities that must be decomposed into smaller parts to provide collisions with a higher level of visual accuracy.

### Summary

The following table summarizes the most import information about the available collider types:

| Type | Entity behavior | Description | Limitations |
| - | - | - | - |
| **Triangle mesh** | Static, Kinematic | A collider composed of triangles. Can closely approximate complex input meshes and have more than one physics material assignment. | Can be used only with static and kinematic entities. Can be more computationally expensive to simulate than other collider types. |
| **Primitive** | Static, Kinematic, Dynamic | A collider defined by a simple primitive sphere, box, or capsule shape that is automatically fitted to the input mesh. Generally offers the best performance. | Might not closely approximate a complex input mesh. Can be fitted to input meshes, but in some scenarios, might fall within or far outside the extents of the input mesh, yielding collisions that aren't visually accurate. Can have only one physics material assignment. |
| **Convex** | Static, Kinematic, Dynamic | An automatically generated collider that is a convex hull composed of a limited number of vertices. Convex hulls have no concave or hollow surface areas, and are automatically fitted to the input mesh. This collider can better approximate input meshes than a primitive collider, but it's more computationally expensive to simulate. | Might not approximate an input mesh as well as a triangle mesh collider, or offer the performance of a primitive collider. Might fall slightly within or outside the extents of the input mesh. Can have only one physics material assignment. |

## Generate PhysX collider assets

You can generate PhysX collider assets from any source asset that contains at least one mesh. You can customize the settings for PhysX collider generation in Scene Settings, in the **PhysX** tab. If you are unfamiliar with Scene Settings, refer to the [mesh processing tutorial](../mesh-assets) and check the [Scene Settings PhysX tab](/docs/user-guide/assets/scene-settings/physx-tab) topic for in-depth information on the options for generating PhysX collider assets.

You can follow this tutorial using any source asset that contains at least one mesh.

1. In **O3DE Editor**, in **Asset Browser**, locate your source asset. If you don't have an asset of your own, in the search field at the top of Asset Browser, you can type `fbx` and use one of the provided `.fbx` files, such as `sphere.fbx`.

    ![ Search for a specific mesh asset in Asset Browser. ](/images/learning-guide/tutorials/assets/meshes-search-asset-browser.png)

    If your asset has already been processed, you might see a preview image of the asset and a list of product assets below the `.fbx` source asset.

1. To open Scene Settings, **double-click** the `.fbx` source asset, and then choose **Edit settings...** from the context menu.

    ![ Open Scene Settings from Asset Browser. ](/images/learning-guide/tutorials/assets/meshes-edit-settings.png)

1. The Scene Settings window presents different tabs depending on the contents of the source asset file. Select the **PhysX** tab. If the tab is empty, to create a PhysX mesh group, choose **Add another physxmesh**.

    ![ Scene Settings PhysX tab. ](/images/learning-guide/tutorials/assets/physx-scene-settings.png)

    In this image, there is a single **PhysX mesh group**. Each PhysX mesh group produces a `.pxmesh` product asset. You can create additional PhysX mesh groups for a source asset by choosing **Add another physxmesh**.

    The **Name PhysX Mesh** property contains the name of the source asset. The `.pxmesh` product asset of this PhysX mesh group uses this string for its name.

1. To select which meshes to include in the PhysX mesh group, next to the **Select meshes** property, choose the file select {{< icon browse-edit-select-files.svg >}} button. Meshes in the list are denoted by a purple mesh icon, as in the following image. You can select more than one mesh here if multiple meshes are available in the asset. If you select more than one mesh, you might additionally enable the **Merge Meshes** and **Weld Vertices** properties to ensure that the input mesh is optimized.

    ![ Selecting a PhysX mesh. ](/images/learning-guide/tutorials/assets/select-physx-mesh.png)

    {{< note >}}
To automatically assign meshes in the source asset to a PhysX mesh group, add the suffix `_phys` to the mesh node name in your DCC application. Any meshes that have `_phys` postfixed to their node name in the source asset are excluded from the default render mesh group and are automatically added to a single PhysX mesh group in Scene Settings.
    {{< /note >}}

1. Customize the PhysX mesh collider type by setting the **Export As** property to `Convex` so that you can create any type of entity (static, kinematic, or dynamic).

    The customizations that you make in Scene Settings are stored in a *sidecar file* with a `.assetinfo` extension. When **Asset Processor** detects a `.assetinfo` file, it uses the settings in the file to process the related source asset. This sidecar file is treated as a source dependency for the asset. This means that if the `.assetinfo` file changes, the source asset is reprocessed, even if the source asset has not changed.

1. At the bottom right of Scene Settings, choose **Update**. This creates or updates the `.assetinfo` sidecar file and triggers Asset Processor to reprocess the asset.

1. Drag the `.azmodel` product asset from Asset Browser into the viewport.

    {{< image-width "/images/learning-guide/tutorials/assets/physx-entity.png" "900" "Drag the mesh asset into the viewport.">}}

    When you drag the asset into the viewport, O3DE automatically creates an entity with a **Mesh** component that references the mesh product asset. If the source asset contains materials that have been processed, the materials are automatically applied to the mesh. Note that in Asset Browser, the `.pxmesh` product asset has been generated and appears beneath the source asset.

1. Add a PhysX Collider component to the entity. With the entity selected in the viewport, in **Entity Inspector**, choose **Add Component**, and then select **PhysX Collider** from the component list. The component automatically detects the `.pxmesh` asset. The component's **Shape** property is set to `PhysicsAsset`, and the **PhysX Mesh** property automatically references the `.pxmesh` product asset.

    With just a PhysX Collider component, this is currently a static entity. PhysX objects can collide with this entity, but the entity doesn't move or react to PhysX collisions or forces.

1. Depending on the type of entity that you want, do one of the following:

    * For a static entity, optimize your current static entity. In the **Transform** component, enable the **Static** property. This property ensures the best runtime performance for a static entity.

    * For a dynamic entity, add a **PhysX Rigid Body** component. With the entity selected in the viewport, in **Entity Inspector**, choose **Add Component**, and then select **PhysX Rigid Body** from the component list. If you choose the {{< icon simulate-physics.svg >}} simulation button now, the entity drops with gravity.

    * For a kinematic entity, add a **PhysX Rigid Body** component, like you would for a dynamic entity. Then, in the **PhysX Rigid Body** component, enable the **Kinematic** property.

    
    {{< caution >}}
For a kinematic or dynamic entity, in the **Transform** component, make sure that the **Static** property is *not* enabled.
    {{< /caution >}}

## Decompose input meshes

Assets that are composed of multiple meshes, or assets that have complex meshes, might require similarly complex PhysX collider assets. This is particularly true for kinematic entities and for dynamic entities, which can't use triangle mesh colliders. In these scenarios, you can decompose the input mesh into convex parts. You can automatically generate primitive colliders or convex colliders, fit them to each part, and process them as collider `.pxmesh` product assets.

Mesh decomposition is part of the process of generating and fitting collider assets, and it doesn't alter the input mesh. You can use mesh decomposition only with primitive or convex colliders.

{{< note >}}
In O3DE, mesh decomposition uses the V-HACD library. For more information, including example images demonstrating decomposition of complex meshes, refer to the [V-HACD library](https://github.com/kmammou/v-hacd) on GitHub.
{{< /note >}}

To use mesh decomposition, do the following:

1. In Scene Settings, under **PhysX Mesh group**, for **Export As**, choose either `Primitive` or `Convex`.
1. Enable **Decompose Meshes**.

Enabling Decompose Meshes reveals many options that you can use to fine-tune mesh decomposition. For guidance on mesh decomposition options, refer to the [Decompose meshes](/docs/user-guide/assets/scene-settings/physx-tab/#decompose-meshes) section of the **Scene Settings PhysX Tab** topic.

### Primitive decomposition

When you enable Decompose meshes for primitive colliders, the input mesh is decomposed into convex parts. The best fitting primitive shapes are automatically selected and transformed to encompass each part and the primitives are processed as a collider `.pxmesh` product asset. In the following image, the input mesh (left) is decomposed into four parts, and a primitive collider is automatically fitted to each part (right). The parts are fitted with box primitive colliders.

{{< image-width "/images/learning-guide/tutorials/assets/primitive-decompose.png" "700" "An example of mesh decomposition with primitive collider assets." >}}

### Convex decomposition

When you enable Decompose meshes for convex colliders, the input mesh is decomposed into convex parts. A convex hull is generated for each part and the convex hulls are processed as a collider `.pxmesh` product asset. In the following image, the input mesh (left) is decomposed in to four parts and convex hulls are generated for each part (right). The convex colliders provide a fairly accurate representation of the render mesh which may be sufficient in many scenarios.


{{< image-width "/images/learning-guide/tutorials/assets/convex-decompose.png" "700" "An example of mesh decomposition with convex collider assets." >}}

In general, collider assets generated with decomposed meshes provide a more accurate representation of the render mesh than a single primitive or convex collider can. For example, notice that in both of the preceding results, the collider surface doesn't block the hole in the middle of the logo, unlike in the first example image of the convex collider asset type.
