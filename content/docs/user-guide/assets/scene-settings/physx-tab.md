---
linkTitle: PhysX Tab
title: Scene Settings PhysX Tab
description: Modifiers and options available in the Scene Settings PhysX tab to generate PhysX colliders for Open 3D Engine (O3DE). 
weight: 600
toc: true
---

You can create PhysX collider product assets for PhysX simulation, hit detection, and triggers by defining PhysX mesh groups. Collider assets can be triangle meshes, or generated as primitives or convex meshes based on meshes contained in the source asset. Multiple PhysX mesh groups can be processed from a single source asset. Each PhysX mesh group produces its own `.pxmesh` product assets. The runtime product assets appear in **Asset Browser** as children of the source asset.

You can name meshes with the postfix `_phys` in your source asset to automatically process them as PhysX colliders. When a mesh in a source asset has the `_phys` postfix, it is recognized as a collider and automatically added to the default PhysX mesh group.

{{< important >}}
There are many options for creating PhysX colliders. The *best* options in a scenario depend on many factors including mesh complexity, how the collider is used, and whether the entity containing the collider is static (doesn't move), kinematic (animated), or simulated (driven by forces and collisions). In general, primitive colliders offer the best simulation performance, but you might consider trading performance for precision in situations where collider assets that closely match the shape of a visible mesh are desirable.
{{< /important >}}

The PhysX tab is available if the source asset contains at least one mesh.

## PhysX tab properties

![The Scene Settings PhysX tab properties.](/images/user-guide/assets/scene-settings/physx-tab.png)

| Property | Description |
| - | - |
| **Add another physxmesh** | Add a PhysX mesh group to process as a PhysX collider \(`.pxmesh`\) product asset from the source asset. |
| **Name PhysX Mesh** | Enter a name for the PhysX mesh group. This is the name of the `.pxmesh` product asset that appears in Asset Browser as a child of the source asset. |
| **Select Meshes** | Choose the {{< icon browse-edit-select-files.svg >}} **Selection list** button to display a list of meshes found in the source asset file. Select meshes from the list to include them in the PhysX mesh group. The selected meshes can be purpose built as collision meshes, or they can be visible meshes. The selected meshes are used to automatically generate collider product assets. Meshes in the source asset that are named with a `_phys` postfix are automatically selected in the default PhysX mesh group. |
| **Export As** | The cooking method to apply to this PhysX mesh group. This setting exposes properties for the selected cooking method. The three options: `Triangle Mesh`, `Convex`, and `Primitive`, and detailed in the sections below.  |
| **Decompose Meshes** | When active, the V-HACD algorithm splits the selected meshes into convex parts which together approximate the original mesh shape. Each part is exported as a convex collider using the properties configured above. Decompose Meshes exposes **Decomposition Properties** which determine how the selected meshes are decomposed into convex parts.  **Decompose Meshes** is only available when `Convex` or `Primitive` is selected in the **Export As** property. For more information and illustrated examples of results, see the [V-HACD library on GitHub](https://github.com/kmammou/v-hacd). |
| **Physics Materials** | Associate a physics material to each material from the selected meshes. Physics materials define physical surface properties such as friction. |

## Triangle mesh asset

![The Scene Settings PhysX triangle mesh asset properties.](/images/user-guide/assets/scene-settings/physx-triangle-mesh-asset.png)

Triangle mesh colliders accurately reproduce the shape of the selected meshes, but cannot be used on simulated entities. Triangle mesh colliders are most suitable for static environment entities that have complex shapes and require colliders that accurately resemble the shape of the visible mesh.

| Property | Description |
| - | - |
| **Merge Meshes** | When active, all selected mesh nodes are merged into a single collider mesh. Otherwise, the selected mesh nodes are exported as separate shapes. It's usually more efficient to have a single collider mesh. |
| **Weld Vertices** | When active, mesh vertex welding is performed. **Disable clean mesh** must be off when **Weld Vertices** is on or vertex welding is not performed. |
| **Disable Clean Mesh** | When active, mesh cleaning is not performed. This makes cooking faster. **Disable clean mesh** must be off when **Weld Vertices** is on or vertex welding is not performed. |
| **Force 32-bit Indices** | When enabled, 32-bit indices are created for the collider asset regardless of triangle count. |
| **Suppress Triangle Mesh Remap Table** | When active, the face remap table is not created. This saves a significant amount of memory, but without remap information, internal mesh triangles from collisions, sweeps, or raycast hits can't be returned. |
| **Build Triangle Adjacencies** | When active, triangle adjacency information is created. You can get the adjacency triangles for a given triangle using the `getTriangle` method. |
| **Mesh Weld Tolerance** | When **Weld Vertices** is active, this value is the distance within which vertices are welded. When **Weld Vertices** is inactive, this value defines the acceptance distance for mesh validation. **Weld Vertices** uses a snap-to-grid approach that truncates each vertex to an integer value using **Mesh Weld Tolerance**. Once these snapped vertices are produced, all vertices that snap to a given vertex on the grid are remapped to a single vertex. All triangle indices are then remapped to reference this subset of clean vertices. Vertices do not have their positions modified. The snap-to-grid is only performed to identify nearby vertices. The mesh validation approach uses the same snap-to-grid approach to identify nearby vertices. If more than one vertex snaps to a given grid coordinate, the distance between the vertices is checked to ensure it is greater than **Mesh Weld Tolerance**. If the vertices are within **Mesh Weld Tolerance**, a warning is emitted. |
| **Number of Triangles Per Leaf** | Set the mesh cooking hint for max triangles per leaf. Fewer triangles per leaf results in slower cooking speed and produces larger mesh sizes with better runtime performance. More triangles per leaf results in faster cooking speed and produces smaller mesh sizes with decreased runtime performance. |

## Convex asset

![The Scene Settings PhysX convex asset properties.](/images/user-guide/assets/scene-settings/physx-convex-asset.png)

Convex hulls are generated colliders that can approximate the shape of the selected meshes. Convex hulls can be used with static, kinematic, and simulated entities, and are often used on interactive entities that require rigid body physics and a collider mesh that resembles the shape of the visible mesh.

| Property | Description |
| - | - |
| **Area Test Epsilon** | If the area of a triangle in the hull is below this value, the triangle is  rejected. This test is performed only if **Check Zero Area Triangles** is active. Valid values range from `0` to `100`. |
| **Plane Tolerance** | This value is used during hull construction. New points added to the hull are rejected if they're closer to the hull than the **Plane Tolerance** value. If the **Plane Tolerance** value is `0.0`, all points are accepted. This can lead to edge cases where the new points are merged into an existing polygon, changing the polygon's plane equation slightly, resulting in failures during polygon merging phase in the hull computation. The **Plane Tolerance** value is increased according to the hull size, and the default value of `0.0006` is recommended. However, if all points must be accepted, or large, thin convex hulls must be created, you can specify a lower value. Valid values range from `0` to `100`.  |
| **Use 16-bit Indices** | When active, 16-bit triangle or polygon indices are generated. Otherwise, 32-bit vertex indices are generated. |
| **Check Zero Area Triangles** | Removes triangles that have a smaller area than the value specified in **Area Test Epsilon**. |
| **Quantize Input** | Quantizes the input vertices using k-means clustering. K-means clustering partitions the input mesh data into Voronoi cells.  |
| **Use Plane Shifting** | Plane shifting is an alternative algorithm for the scenario when the computed hull has more vertices than the per hull vertex limit. The default algorithm computes the full hull and a bounding box around the input vertices. The bounding box is then sliced with the hull planes until the vertex limit is reached. The default algorithm typically produces results that are much better quality than are produced by plane shifting. When plane shifting is active, the hull computation stops when vertex limit is reached. The hull planes are then shifted to contain all input vertices, and the new plane intersection points are then used to generate the final hull with the given vertex limit. Plane shifting might produce sharp edges to vertices very far away from the input mesh, and doesn't guarantee that all input vertices are inside the resulting hull. |
| **Shift Vertices** | When active, vertices of the input mesh are shifted around the origin to improve computation stability. Use this when the input mesh is not centered around the origin. |
| **Gauss Map Limit** | The vertex limit beyond which additional acceleration structures are computed for each convex mesh. Higher values reduce memory usage. Lower values can improve performance dependent on target platform. |
| **Build GPU Data** | When active, data for GPU-accelerated rigid body simulation is created. This can increase memory usage and cooking time. Internally, the vertex limit is set to 64 and vertex limit per face is set to 32. |

## Primitive asset

![The Scene Settings PhysX primitive asset properties.](/images/user-guide/assets/scene-settings/physx-primitive-asset.png)

Primitive colliders are simple parametric shape primitives (box, capsule, sphere) that are fit to the input meshes and can be used with static, kinematic, and simulated entities. Primitive colliders generally provide the best simulation performance, but might not closely match the shape of the visible mesh. They are best suited for simulated entities with simple meshes, as well as projectiles, triggers, and entities where colliders that accurately represent shape of the visible mesh are not necessary.

| Property | Description |
| - | - |
| **Target Shape** | The primitive shape to fit to the input mesh. `Automatic` determines which of the shapes fits best. |
| **Volume Term Coefficient** | Specify how closely the fitting algorithm will try to fit the primitive shape to the input mesh. A value of `0` (no volume minimization) is recommended for most meshes. If the input mesh has few vertices, or vertices mainly on edges, the result might fit the primitive shape inside the input mesh. Increasing this value can improve the result, but values that are too high can have a negative result. |

## Decompose meshes

![The Scene Settings PhysX decompose meshes properties.](/images/user-guide/assets/scene-settings/physx-decompose-meshes.png)

Exporting a PhysX mesh as a convex or a primitive collider might not produce good results if the mesh's shape is concave or doesn't closely fit one of the primitive shapes. Exporting a PhysX mesh as a triangle mesh collider creates a collider that accurately resembles the original mesh, but won't work with a simulated entity. For these scenarios, O3DE supports approximate convex decomposition. Arbitrary meshes are broken down into convex parts which approximate the original shape before processing each part through the asset pipeline individually.

Decomposing meshes has the advantage that each individual convex part can be exported as a convex or primitive approximation. Since the resulting asset doesn't contain any triangle meshes, it can be used on simulated entities.

For more information and illustrated examples of results, see the [V-HACD library on GitHub](https://github.com/kmammou/v-hacd).

| Property | Description |
| - | - |
| **Maximum Hulls** | Specify the maximum number of hulls that can be generated. Values range from `1` to `1024`. |
| **Maximum Vertices Per Hull** | Specify the maximum number of vertices per convex hull. Values range from `4` to `1024`. |
| **Concavity** | Maximum concavity of each convex hull. |
| **Resolution** | Maximum number of voxels generated during the voxelization stage. Valid values range from a minimum of `10000` to a maximum value of `64000000`. |
| **Mode** | Use either a `Voxel-based` (cubic) or `Tetrahedron-based` volume for approximate convex decomposition. |
| **Alpha** | The bias toward clipping along symmetry planes. Values range from `0.0` to `1.0`. |
| **Beta** | Specify the bias toward clipping along revolution axes. Values range from `0.0` to `1.0`. |
| **Minimum Volume Per Hull** | Specify the adaptive sampling of the generated convex hulls. Values range from `0.0` to `0.01`. |
| **Plane Downsampling** | The granularity of the search for the *best* clipping plane. Values range from `1` to a maximum value of `16`. |
| **Hull Downsampling** | The precision of the convex hull generation process during the clipping plane selection stage. Values range `1` to `16`. |
| **Enable PCA** | When active, the input mesh is normalized before applying the convex decomposition. |
| **Project Hull Vertices** | When active, the output convex hull vertices are projected onto the input mesh to increase the floating point accuracy of the results. |

## Comment

![The Scene Settings PhysX tab Comment modifier.](/images/user-guide/assets/scene-settings/comment-modifier.png)

Add a comment to the file for the PhysX mesh group. You can add a comment about changes made to the source asset file for tracking purposes or notes on export options, for example. Comments don't affect how files are processed. Multiple comment modifiers can be added to a PhysX mesh group.