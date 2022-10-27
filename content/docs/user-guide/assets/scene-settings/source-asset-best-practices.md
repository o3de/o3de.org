---
linkTitle: Best Practices
title: Scene Source Asset Best Practices
description: These bst practices can help ensure your scene source assets can be processed properly for OPen 3D Engine (O3DE).
weight: 125
toc: true
---

This topic provides some best practices that can help ensure the scene source assets you create in a digital content creation application (DCC) can be processed and used in Open 3D Engine (O3DE).

## General

* **Use FBX** - Although O3DE can support many [scene formats](../scene-format-support/) through the Open Asset Import Library, FBX is the best option for scene source assets. FBX provides complete support for the data that O3DE can consume.
* **World Scale** - Ensure your scene uses a proper [world scale](../scene-format-support/#world-measurement-units). O3DE's world scale is 1 meter per world unit. Many DDC applications have a default scale of 1 cm per world unit.
* **Coordinate System** - O3DE uses a [right handed, Z up coordinate system](../scene-format-support/#coordinate-systems). DCC applications use varying coordinate systems. You can set your DCC application to a coordinate system that matches O3DE, or apply a transform to your scene in the exporter options of your DCC application.
* **Scene assets** - Ensure your source scene assets contain all the nodes and only the nodes you intend to have in the asset. Most DCC applications allow you to export only what is selected, or specify what nodes to export through an export interface. By default, [Asset Processor](../../asset-processor) attempts to process all nodes found in in a scene source asset.
* **Scene data** - Ensure your assets only contain data that can be processed for O3DE. This table lists [scene data supported by O3DE](../scene-format-support/#supported-3d-scene-data). There are some hard limits and some limits dependent on hardware resources. In many cases, unsupported data is ignored. In some cases, unsupported data or data that exceeds the limitations can result in warnings or errors in processing, or performance issues.
* **Node names** - The nodes (meshes and bones) included in your scene source asset should have names that are alpha-numeric strings. Use `_` underscore as a separator if needed. Special characters or `.` dot as a separator can cause issues when processing. It is also recommend that you use sensible node names. In some places, such as [Scene Settings](./scene-settings) you might need to select specific nodes from the scene source asset. It is much easier to find the nodes in the list if they are sensibly named.
* **User Defined Properties (UDP)** - User defined properties can be stored on nodes in the scene source asset, and used to help determine how the nodes should be processed. UDP is particularly useful for complex source scene assets that are intended to be processed as procedural prefabs. For more information visit the [User Defined Properties](/docs/user-guide/assets/scene-pipeline/scene-api-udp) topic.

If you have issues when processing a scene source asset, check the [Event Log](../asset-processor/interface) in Asset processor for warnings and errors. The Event Log might contain information that can help you debug issues with scene source assets.

## Meshes

There are many options to configure mesh processing settings. Check the Scene Settings [Mesh Tab](../scene-settings/meshes-tab.md) topic for additional information.

* **Mesh Density** - Although O3DE theoretically supports billions of vertices per mesh, ensure that your meshes have an appropriate density to perform well on your target platform.
* **Clean mesh data** - Ensure the mesh data is coherent. Some DCC applications can create and export meshes with issues such as the following:
  
  * poly lines (a polygon with just two points)
  * non-manifold geometry (edges that share more than two faces)
  * globally small faces and edges
  * unintended non convex polygons
  * self-intersecting polygons
  * unintended open edges

  Most DCC applications offer tools and scripts that you can use to check for these sort of issues before exporting to an FBX scene source asset.

* **Triangles and Quads** - It's recommended that meshes be composed of three or four sided polygons when possible. N-gons are supported, however, n-gons might be triangulated either during export from a DCC application or processing in O3DE, and yield unintended results such as non convex surfaces.
* **Normals** - Ensure meshes in your source scene assets have custom normals if required. Normals can be generated for meshes when they are processed, however, the generated normals will be averaged and might not accurately represent some models such as hard surfaces with sharp edges.
* **UVs** - Shaders included with O3DE support up to two UV sets. Support for additional UV sets can be added in custom shaders. Its recommend to use simple names for UV sets such as `UV0`, `UV1`, and so on. Some DCC applications make a distinction between mesh *points* that describe mesh surface positions, and *vertices* that describe mesh surfaces atlases. For these scenarios, UVs should be applied as a vertex attribute.
* **Vertex Color Streams** - Vertex color streams can represent a color to be used in a shader, and can also be used to pack per vertex attributes such as constraints and mass values for cloth meshes. It's recommended to use floating point color values for vertex streams and use sensible names for vertex color streams to ensure you can easily determine which streams are intended to represent surface color and which streams represent other per vertex attributes.
* **Level of detail (LOD)** - It's highly recommended to create LOD meshes for your assets. LODs are optimized meshes with progressively lower polygon counts and simplified materials. For more information on LODs check the [Level of Detail (LOD)](../scene-settings/meshes-tab/#level-of-detail-lod) section of the Scene Settings topic.
* **Tangents** - Tangents (and bitangents) are vertex attributes that, in combination with mesh normals and normal maps, ensure deforming meshes are shaded correctly. Tangents can be a critical mesh attribute for realistic actors. Tangents can be generated automatically based on the mesh's normals, or custom tangents can be imported from the source scene asset. For more information on tangents, check the [Tangents](../scene-settings/meshes-tab/#tangents) section of the Scene Settings topic.
* **Materials** - Though material settings can be processed from scene source assets for O3DE, there usually isn't a one-to-one relationship between the properties of the material in the DCC application and the material in O3DE. You can use the closest equivalent physics-based rendering (PBR) material included in your DCC application and modify the material in O3DE, or better yet, create a material with a one-to-one representation of O3DE's material properties in your DCC application.

## Actors

Actors are meshes that are bound to skeletons. Though there is an `.actor` asset type, an actor really is a combination of skeleton(s), mesh(es), and motion(s). FOr more information on processing actors, check the Scene Settings [Actors Tab](../scene-settings/actors-tab.md) topic for additional information.

* **Root Joint** - A root joint should be added you the actor's skeleton. The root joint is required for root motion extraction.

## Motions

## PhysX

Physics colliders are generated based on selected meshes in your source scene asset. There are three types of PhysX meshes: triangle meshes, primitives and convex hulls. Each type has it's own use cases and strengths and weaknesses. Because PhysX colliders are generated based on meshes in the scene source file, the most important concern is that the selected meshes follow the recommendations for mesh density, clean mesh data, triangles and quads, and LODs outlined in the [Meshes](#meshes) section.

PhysX colliders are a complex topic and it's recommend to read the tutorial [Process PhysX Collider Assets](/docs/learning-guide/tutorials/assets/physx-colliders) to get a complete understanding of collider types and how they are processed.
