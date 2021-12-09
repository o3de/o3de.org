---
linkTitle: PhysX Assets
title: Process PhysX Collider Assets
description: Learn to customize how PhysX collider assets are processed for Open 3D Engine (O3DE) with Scene Settings.
weight: 100
toc: true
---

**Open 3D Engine (O3DE)** has a very robust set of options for generating PhysX collider assets. You can customize how PhysX collider assets should be generated for a mesh asset in **Scene Settings**. The generated PhysX colliders are stored in `.pxmesh` product assets and can be added to a PhysX Collider component by selecting **PhysicsMesh** from in the component's **Shape** property.

There are three PhysX asset collider types that can be used in different simulation scenarios. This topic explains the benefits and limitations of the different collider types to help you understand when you might choose each type. This topic also covers the basics of generating PhysX asset colliders with Scene Settings.

## Entity behavior

Before learning about collider types, you should understand the three types of entity behavior that influence the collider asset type you might choose in a given scenario:

* **Static** - Static entities can be collided with, but don't move, and are not affected by PhysX collisions and forces. Static entities can use any collider type.
* **Kinematic** - Kinematic entities have a **PhysX Rigid Body** component and have movement that is driven by script. Kinematic entities can be collided with, but are not affected by PhysX collisions or forces. Kinematic entities can use any collider type.
* **Dynamic** - Dynamic entities have a **PhysX Rigid Body** component and simulated movement that results from PhysX collisions and forces. Dynamic entities can only use primitive and convex colliders.

## PhysX collider assets

Collider assets are generated when a source asset is processed and are based on input meshes you specify in Scene Settings. You can use a single input mesh, multiple input meshes, and even specify that multiple input meshes should be merged and welded into a single mesh before the collider asset is generated. The source asset is not altered when the collider asset is generated.

Because physics simulation can be computationally expensive, it's important to understand the various collider types, their limitations, and the scenarios in which they can be used.

### Triangle Mesh

As the name implies, triangle mesh colliders are composed of triangle meshes. You can create a simplified mesh in a digital content creation (DCC) application specifically for the collider, or generate a triangle mesh collider based on the render mesh of the asset. Triangle mesh colliders can closely approximate a complex render mesh, but can only be used with static and kinematic entities. Because triangle mesh colliders can contain many vertices, and the collider asset is not required to be convex, they generally incur a higher performance cost than primitive colliders.

Triangle mesh colliders can have multiple physics material assignments. Because the collider is derived from the input mesh, one physics material can be applied to the collider per each material assignment. This is particularly useful for ground and floor colliders that transition between materials such as concrete and dirt, or wood planks and carpet.

Colliders occupy the same physical space as the input mesh when they are generated. In the image below, a triangle mesh collider asset is offset to the right of the input mesh asset that generated the collider so that you can clearly view the collider. Note that the collider asset (right) accurately represents the render mesh (left) and that the collider supports separate physics materials for the front and back faces (magenta wireframe) and side faces (teal wireframe) of the mesh.

{{< image-width "/images/learning-guide/tutorials/assets/triangle-mesh-collider-example.png" "700" "An example triangle mesh collider asset." >}}

Triangle mesh colliders are commonly used for immobile environment objects that have complex shapes such as tree trunks, floors, large stone and architectural features, and statues.

### Primitive

Primitive colliders are composed of sphere, box, or capsule primitive shapes. Because the shapes are defined by simple properties such as **Radius**, **Height**, and **Width**, primitive colliders generally offer the best simulation performance. Primitive colliders can be automatically fitted to the input mesh. However, depending on the complexity of the input mesh, areas of the collider might fall within or far outside of the input mesh surface. This can result in collisions that aren't visually accurate. Complex input meshes can be decomposed into smaller parts, and have primitive colliders fitted to each part. Primitive colliders can be used with static, kinematic, or dynamic entities and can only have one physics material assignment.

Colliders occupy the same physical space as the input mesh when they are generated. In the image below, a primitive collider asset is offset to the right of the input mesh asset that generated the collider so that you can clearly view the collider. The collider asset (right) is a simple box that has been automatically oriented and scaled to encompass the render mesh (left). Note that one corner of the primitive collider extends far from the input mesh and is penetrating the ground plane. This demonstrates one of the drawbacks of using a primitive collider on a complex input mesh. In a scenario where this is a dynamic entity, the ground plane collision would push the asset upward and the asset would not come to rest standing upright because of the sharp corner at the bottom of the primitive collider.

{{< image-width "/images/learning-guide/tutorials/assets/primitive-collider-example.png" "700" "An example primitive collider asset." >}}

Primitive colliders are commonly used when the input mesh closely resembles one of the simple primitive shapes, and in scenarios where fast dynamic collision resolution is more important than visual accuracy.

### Convex

Convex colliders are automatically generated convex hulls. A convex hull has no concave or hollow surface areas. For PhysX, the convex hull is constructed within a limited number of vertices and is fitted to the input mesh. Convex colliders can better approximate a complex input mesh than primitive colliders, but incur a greater performance cost. To a lesser extent than primitive colliders, convex colliders might also have areas where the collider surface falls inside or outside of the input mesh, which might result in collisions that aren't visually accurate. Complex input meshes can be decomposed into smaller parts, and have convex colliders fitted to each part. Convex colliders can be used with static, kinematic, or dynamic entities and can only have one physics material assignment.

Colliders occupy the same physical space as the input mesh when they are generated. In the image below, a convex collider asset is offset to the right of the input mesh asset that generated the collider so that you can clearly view the collider. Note that the collider asset (right) is has been automatically generated to encompass and roughly approximate the silhouette shape of the render mesh (left). The convex collider, however, does not include detail such as the hole in the middle of the input mesh.

{{< image-width "/images/learning-guide/tutorials/assets/convex-collider-example.png" "700" "An example convex collider asset." >}}

Convex colliders are commonly used on entities with complex render meshes that must be dynamically simulated, such as interactive props, and entities that must be decomposed into smaller parts to provide collisions with a higher level of visual accuracy.

### Summary

The table below summarizes the most import information to know about the available collider types:

| Type | Entity Behavior | Description | Limitations |
| - | - | - | - |
| **Triangle mesh** | Static, Kinematic | A collider composed of triangles. Triangle mesh colliders can closely approximate complex input meshes and can have more than one physics material assignment.  | Can only be used with static and kinematic entities. Can be more computationally expensive to simulate than other collider types. |
| **Primitive** | Static, Kinematic, Dynamic | A collider defined by a simple primitive sphere, box, or capsule shape that is automatically fitted to the input mesh. Primitive colliders generally offer the best performance.  | Might not closely approximate a complex input mesh. Primitive colliders can be fitted to input meshes, but in some scenarios the collider might fall within or far outside the extents of the input mesh, yielding collisions that aren't realistic visually. Primitive colliders can only have one physics material assignment. |
| **Convex** | Static, Kinematic, Dynamic | An automatically generated collider that is a convex hull composed of a limited number of vertices. Convex hulls have no concave or hollow surface areas, and are automatically fitted to the input mesh. Convex colliders can better approximate input meshes than primitive colliders, but are more computationally expensive to simulate.  | Might not approximate an input mesh as well as a triangle mesh collider, or offer the performance of a primitive collider. Convex colliders might fall slightly within or outside the extents of the input mesh. Convex colliders can only have one physics material assignment. |

## Generate PhysX collider assets

PhysX collider assets can be generated from any source asset that contains at least one mesh. The settings for PhysX collider generation are customized in the **PhysX** tab of Scene Settings.

{{< note >}}
If you are unfamiliar with Scene Settings, refer to the [Mesh Asset tutorial](../mesh-assets) and check the [Scene Settings PhysX Tab](/docs/user-guide/assets/scene-settings/physx-tab) topic for in-depth information on the options for generating PhysX collider assets.
{{< /note >}}

You can follow the tutorial below using any source asset that contains at least one mesh.

1. In **O3DE Editor**, locate your source asset in **Asset Browser**. If you don't have an asset of your own, you can type `fbx` into the search field at the top of Asset Browser and use one of the provided `.fbx` files such as `sphere.fbx`.

    ![ Search for a specific mesh asset in Asset Browser. ](/images/learning-guide/tutorials/assets/meshes-search-asset-browser.png)

    If your asset has already been processed, you might see a preview image of the asset, and a list of product assets below the `.fbx` source asset.

1. **Right-click** the `.fbx` source asset and choose **Edit settings...** from the context menu to open Scene Settings.

    ![ Open Scene Settings from Asset Browser. ](/images/learning-guide/tutorials/assets/meshes-edit-settings.png)

1. The Scene Settings window presents different tabs depending on the contents of the source asset file. Make sure the PhysX tab is selected. If the PhysX tab is empty, choose **Add another physxmesh** to create a PhysX mesh group.

    ![ Scene Settings PhysX tab. ](/images/learning-guide/tutorials/assets/physx-scene-settings.png)

    In the image above, there is a single **PhysX mesh group**. Each PhysX mesh group produces a `.pxmesh` product asset. You can create additional PhysX mesh groups for a source asset by choosing **Add another physxmesh**.
    
    The **Name mesh** property contains the name of the source asset. The `.pxmesh` product asset of this PhysX mesh group uses this string for its name.

1. The **Select meshes** property reads **0 of 1 selected**. Choose the {{< icon browse-edit-select-files.svg >}} file select button to select which meshes to include in the PhysX mesh group. Meshes in the list are denoted by a purple mesh icon, as in the example below. You can select more than one mesh here if multiple meshes are available in the asset. If you do select more than one mesh, you might also want to activate the **Merge Meshes** and **Weld Vertices** properties to ensure the input mesh is optimized.

    ![ Selecting a PhysX mesh. ](/images/learning-guide/tutorials/assets/select-physx-mesh.png)

{{< note >}}
To automatically assign meshes in the source asset to a Physx mesh group, add the suffix `_phys` to the mesh node name in your DCC application. Any meshes that have `_phys` postfixed to their node name in the source asset are excluded from the default render mesh group and are automatically added to a single Physx mesh group in Scene Settings.
{{< /note >}}

5. The customizations you make in Scene Settings are stored in a *sidecar file* with a `.assetinfo` extension. When **Asset Processor** detects a `.assetinfo` file, it uses the settings in the file to process the related source asset. This sidecar file is treated as a source dependency for the asset. This means that if the `.assetinfo` file is changed, the source asset will be reprocessed even if the source asset has not changed.

    Customize the PhysX mesh collider type. Set the **Export as** property to `Convex` so that you can create any type of entity (static, kinematic, or dynamic).

6. Choose the **Update** button at the bottom-right of Scene Settings. This creates or updates the `.assetinfo` sidecar file and triggers Asset Processor to reprocess the asset.

9. **Left-click + drag** the source asset from Asset Browser into the viewport.

    {{< image-width "/images/learning-guide/tutorials/assets/physx-entity.png" "800" "Drag the mesh asset into the viewport">}}

    When you drag the asset into the viewport, O3DE automatically creates an entity with a **Mesh** component that references the mesh product asset. If the source asset contains materials that have been processed, the materials are applied to the mesh by default. Note the `.pxmesh` product asset has been generated and appears beneath the source asset in Asset Browser.

8. Add a **PhysX Collider** component to the entity. With the entity selected, in **Entity Inspector**, choose **Add Component** and select **PhysX Collider** from the component list. The `.pxmesh` asset is automatically detected by the component. The PhysX Collider component's **Shape** property is set to `PhysicsAsset` and the **PhysX Mesh** property automatically references the `.pxmesh` product asset.

9. With just a PhysX Collider component, this is a static entity. PhysX objects can collide with this entity, but the entity will not move or react to PhysX collisions or forces.

{{< note >}}
If you intend for the entity to be static, you should also activate the **Static** property in the **Transform** component of the entity. The **Static** property optimizes the entity, ensuring the best runtime performance for static entities.
{{< /note >}}

10. If you intend to create a kinematic or dynamic entity, you must add a **PhysX Rigid Body** component as well. With the entity selected, in Entity Inspector, choose **Add Component** and select PhysX Rigid Body from the component list. Ensure the **Static** property in the entity's Transform component is not active.

{{< note >}}
Adding the PhysX Rigid Body component makes the entity dynamic. If you choose the {{< icon simulate-physics.svg >}} simulation button, the entity will drop with gravity.

If you want to create a kinematic entity that is animated through script, activate the **Kinematic** property in the PhysX Rigid Body component.
{{< /note >}}

## Decompose input meshes

Assets that are composed of multiple meshes, or assets that have complex meshes, might require similarly complex PhysX collider assets. This is particularly true for kinematic and dynamic entities where triangle mesh colliders can't be used. In these scenarios, the input mesh can be decomposed into convex parts, and primitive colliders or convex colliders can be generated automatically fitted to each part, and processed as collider `.pxmesh` product assets.

{{< note >}}
Mesh decomposition doesn't alter the input mesh. Mesh decomposition is part of the process of generating and fitting collider assets. Mesh decomposition can only be used with primitive or convex colliders.

Mesh decomposition in O3DE uses the [V-HACD Library](https://github.com/kmammou/v-hacd). Refer to the preceding link for more information and example images demonstrating decomposition of complex meshes.
{{< /note >}}

To use mesh decomposition, do the following:

1. In Scene Settings, in the PhysX mesh group, choose either `Primitive` or `Convex` as the **Export As** property. 
1. Activate the **Decompose Meshes** option.

Activating Decompose Meshes reveals many options you can use to fine tune mesh decomposition. For guidance on mesh decomposition options, refer to the [Decompose Meshes](/docs/user-guide/assets/scene-settings/physx-tab/#decompose-meshes) topic in the User Guide.

### Primitive decomposition

When Decompose meshes is activated for primitive colliders, the input mesh is decomposed into convex parts, the best fitting primitive shapes are automatically selected and transformed to encompass each part, and the primitives are processed as a collider `.pxmesh` product asset. In the example below, the input mesh (left) is decomposed in to 6 parts and a primitive collider is automatically fitted to each part (right). Most parts are fitted with box primitive colliders, but one part, near the bottom of the asset, has a capsule primitive collider.

{{< image-width "/images/learning-guide/tutorials/assets/primitive-decompose.png" "700" "An example of mesh decomposition with primitive collider assets." >}}

### Convex decomposition

When Decompose meshes is activated for convex colliders, the input mesh is decomposed into convex parts, a convex hull is generated for each part, and the convex hulls are process as a collider `.pxmesh` product asset. In the example below, the input mesh (left) is decomposed in to 6 parts and convex hulls are generated for each part (right). The convex colliders provide a fairly accurate representation of the render mesh that might be sufficient in many scenarios.

{{< image-width "/images/learning-guide/tutorials/assets/convex-decompose.png" "700" "An example of mesh decomposition with convex collider assets." >}}

In both of the examples above, the generated collider asset provides a more accurate representation of the render mesh than a single primitive or convex collider can. Notice, for example, that in both results, the hole in the middle of the logo is not blocked by the collider surface as it was in the initial example of the convex collider asset type.