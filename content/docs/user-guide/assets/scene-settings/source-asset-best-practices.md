---
linkTitle: Best Practices
title: Scene Source Asset Best Practices
description: These bst practices can help ensure your scene source assets can be processed properly for OPen 3D Engine (O3DE).
weight: 125
toc: true
---

This topic provides best practices that can help ensure the scene source assets you create in a digital content creation application (DCC) can be processed and used in Open 3D Engine (O3DE).

## General recommendations

* **Use FBX** - Although O3DE can support many [scene formats](../scene-format-support/) through the Open Asset Import Library, FBX is the best option for scene source assets. FBX provides complete support for the data that O3DE can consume.
* **World Scale** - Ensure your scene uses a proper [world scale](../scene-format-support/#world-measurement-units). O3DE's world scale is 1 meter per world unit. Many DCC applications have a default scale of 1 cm per world unit.
* **Coordinate System** - O3DE uses a [right handed, Z up coordinate system](../scene-format-support/#coordinate-systems). DCC applications use varying coordinate systems. You can set your DCC application to a coordinate system that matches O3DE, or apply a transform to your scene in the exporter options of your DCC application.
* **Transform** - In most scenarios, assets should be placed on the ground at the origin of the scene, standing upright, and facing down the positive view axis (the Y axis).
* **Scene assets** - Ensure your source scene assets contain all the nodes and only the nodes you intend to have in the asset. Most DCC applications allow you to export only what is selected, or specify what nodes to export through an export interface. By default, [Asset Processor](../../asset-processor) attempts to process all nodes found in a scene source asset.
* **Scene data** - Ensure your assets only contain data that can be processed for O3DE. This table lists [scene data supported by O3DE](../scene-format-support/#supported-3d-scene-data). There are some hard limits and some limits dependent on hardware resources. In many cases, unsupported data is ignored. In some cases, unsupported data or data that exceeds the limitations can result in warnings or errors in processing, or performance issues.
* **Node names** - The nodes (meshes and bones) included in your scene source asset should have names that are alpha-numeric strings. Use underscore (`_`) as a separator if needed. Using special characters or dot (`.`) as a separator can cause issues when assets are processed. Use node names that make sense to you. In some tools, such as [Scene Settings](./scene-settings), you might need to select specific nodes from the scene source asset. It's much easier to find the nodes in the list if they are sensibly named.
* **User Defined Properties (UDP)** - User defined properties can be stored in the scene source asset and used to help determine how the asset should be processed. UDP is particularly useful for complex source scene assets that are intended to be processed as procedural prefabs. For more information visit the [User Defined Properties](/docs/user-guide/assets/scene-pipeline/scene-api-udp) topic.

If you have issues processing a scene source asset, check the [Event Log](../asset-processor/interface) in [Asset Processor](../asset-processor) for warnings and errors. The Event Log might contain information that can help you debug issues with scene source assets.

## Meshes

There are many options to configure mesh processing settings. Check the Scene Settings [Mesh Tab](../scene-settings/meshes-tab.md) topic for additional information.

* **Mesh Density** - Although O3DE theoretically supports billions of vertices per mesh, ensure that your meshes have an appropriate density for your target platform.
* **Clean mesh data** - Ensure the mesh data is coherent. Some DCC applications can create and export meshes with issues such as the following:
  
  * poly lines (a polygon with just two points)
  * non-manifold geometry (edges that share more than two faces)
  * globally small faces and edges
  * unintended non-convex polygons
  * self-intersecting polygons
  * unintended open edges

  Most DCC applications offer tools and scripts that you can use to check for these issues before exporting to an FBX scene source asset.

* **Triangles and Quads** - Meshes should be composed of three or four sided polygons when possible. N-gons are supported, however, n-gons might be triangulated either during export from a DCC application or processing in O3DE, and yield unintended results such as non-convex surfaces.
* **Normals** - Ensure meshes in your source scene assets have custom normals if required. Normals can be generated for meshes when they are processed. However, generated normals are averaged and might not accurately represent some models such as hard surfaces with creased edges. Some DCC applications make a distinction between mesh *points* that describe mesh surface positions, and *vertices* that describe mesh surface texture atlases. For DCC applications that support both point and vertex attributes, normals should be applied as a point attribute.
* **UVs** - Shaders included with O3DE support up to two UV sets. Support for additional UV sets can be added in custom shaders. Use simple names for UV sets such as `UV0`, `UV1`, and so on. For DCC applications that support both point and vertex attributes, UVs should be applied as a vertex attribute.
* **Vertex Color Streams** - Vertex color streams can represent a color to be used in a shader, and can also be used to pack per vertex attributes such as constraints and mass values for cloth meshes. Use floating point color values and sensible names for vertex color streams to ensure you can easily determine which streams are intended to represent surface color and which streams represent other per vertex attributes.
* **Level of detail (LOD)** - LODs are optimized meshes with progressively lower polygon counts and simplified materials and should be employed for the best runtime performance. For more information on LODs, check the [Level of Detail (LOD)](../scene-settings/meshes-tab/#level-of-detail-lod) section of the Scene Settings topic.
* **Tangents** - Tangents (and bitangents) are vertex attributes that, in combination with mesh normals and normal maps, ensure deforming meshes are shaded correctly. Tangents can be a critical mesh attribute for realistic actors. Tangents can be generated automatically based on the mesh's normals, or custom tangents can be imported from the source scene asset. For more information on tangents, check the [Tangents](../scene-settings/meshes-tab/#tangents) section of the Scene Settings topic.
* **Materials** - Though material settings can be processed from scene source assets for O3DE, there usually isn't a one-to-one relationship between the properties of the material in the DCC application and the material in O3DE. You can use the closest equivalent physics-based rendering (PBR) material included in your DCC application and modify the material in O3DE, or better yet, create a material with a one-to-one representation of O3DE's material properties in your DCC application.

## Actors

Actors are meshes that are bound to skeletons. Though this section is specifically about the `.actor` asset type, an actor is a combination of skeleton(s), skinned mesh(es), and motion(s). For more information on processing actors, check the Scene Settings [Actors Tab](../scene-settings/actors-tab) topic for additional information.

* **Root bone** - A root bone should be added to the actor's skeleton. It's required for root motion extraction. For more information check the [Data Driven Root Motion](/docs/learning-guide/tutorials/animation/data-driven-root-motion) tutorial topic.
* **Root transform** - The position of the root bone should be at the scene origin (0, 0, 0) and rotation of the root bone should be 0 on each axis.
* **Bone names** - The same advice for naming mesh nodes applies here. Names should be alpha-numeric strings. Use underscore (`_`) as a separator if needed. Using special characters or dot (`.`) as a separator can cause issues when processing. Use bone names that make sense to you. In some tools, such as [Scene Settings](./scene-settings), you might need to select specific bones from the scene source asset. It's much easier to find the bones in the list if they are sensibly named.
* **Hierarchy** -  Do not use transforms, groups, or parent nodes in the hierarchy above your root bone. The root bone must be the top parent of the skeletal hierarchy to ensure that motion extraction works properly.
* **Orientation** - Orient the actor so that it's facing down the positive view axis (the Y axis).
* **Coordinate system change** - If you use the [Coordinate system change](../scene-settings/actors-tab/#coordinate-system-change) modifier to correct the actor's orientation, use a Coordinate system change modifier with the same settings for each of the actor's motions as well. This is required to ensure that animations are oriented correctly for the actor.
* **Delete history (collapse modifiers, freeze geometry)** - If your DCC application has some concept of construction history or a modifier stack, you should delete the history, collapse the modifier stack, or cache/freeze the geometry before binding the mesh to the skeleton.
* **Freeze or zero transforms** - The skeleton for your actor should have a *bind pose*. The actor's appendages are usually extended in this pose to ensure skin vertices can be captured and have their skin weights painted easily. The transforms on all bones should be frozen or zeroed in this pose before the skin mesh is bound to the skeleton.
* **Bind pose** - Ensure the skin mesh is bound to the skeleton in the bind pose. All animation (bone transformations) applied to the actor should be relative to this pose.

{{< important >}}
It's important to ensure that only skinned meshes and bones that influence the skinned meshes are included in the actor source scene asset. Actor skeletons can have complex animation controls and solvers that can cause issues when Asset Processor attempts to process them. Although you might be able to work around potential issues by selecting specific meshes and bone hierarchies to process in Scene Settings, it's better to provide clean scene source assets.

A solution is to create separate hierarchies for the animation rig and and the capture skeleton that deforms the skinned meshes. Then, only include the skinned meshes and the capture skeleton in the actor source scene asset. Meshes that aren't captured to any bone, and leaf bones that don't influence any skinned meshes are not processed with the actor by default.
{{< /important >}}

## Motions

In general, the best practices for actors also apply here, as motions generally use the same skeleton as the actor to which they are applied. It's possible to retarget motions for use with different actors. Check the [Retargeting Motions](/docs/user-guide/visualization/animation/animation-editor/retargeting-animations) topic for more information.

For more information on processing motions, check the Scene Settings [Motions Tab](../scene-settings/motions-tab) topic for additional information.

* **Root motion** - Any transform that moves the actor off the scene origin should be keyed to the root bone so that root motion can be extracted. For more information check the [Data Driven Root Motion](/docs/learning-guide/tutorials/animation/data-driven-root-motion) tutorial topic.
* **Bake Animation** - All animation should be *baked*, that is, bone transforms should be keyed at every frame. Many DCC applications have export options that bake animation on export.
* **Coordinate system change** - If you use the [Coordinate system change](../scene-settings/actors-tab/#coordinate-system-change) modifier to correct the actor's orientation, use a Coordinate system change modifier with the same settings for each of the actor's motions as well. This is required to ensure that animations are oriented correctly for the actor.

## PhysX

Physics colliders are generated based on selected meshes, meshes that use the `_phys` naming convention, or meshes that have a `collision = true` UDP property in the source scene asset. There are three types of PhysX meshes: triangle meshes, primitives, and convex hulls. Each type has it's own use cases. Because PhysX colliders are generated based on meshes in the scene source asset, the most important concern is that the selected meshes follow the recommendations for mesh density, clean mesh data, triangles and quads, and LODs that are outlined in the [Meshes](#meshes) section.

If the collider (and it's corresponding mesh asset) are intended to be simulated as a dynamic rigid body, it can be helpful to place the object in the scene source asset so that the world origin defines the center of mass (COM) of the rigid body. The COM can be adjusted in the PhysX Rigid Body component, but it's much easier to define the COM in the scene source asset by positioning the asset.

PhysX colliders are a complex topic and it's helpful to read the tutorial [Process PhysX Collider Assets](/docs/learning-guide/tutorials/assets/physx-colliders) to get a complete understanding of collider types and how they are processed.
