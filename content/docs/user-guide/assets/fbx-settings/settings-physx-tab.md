---
description: null
title: FBX Settings PhysX tab
---

{{< preview-migrated >}}

In the **PhysX** tab, you can create **PhysX Mesh groups** to process collider assets for PhysX\. Collider assets can be triangle meshes, or generated as primitives or convex meshes based on meshes contained in the `.fbx` file\. Multiple **PhysX Mesh groups** can be processed from a single `.fbx` file\. Each **PhysX Mesh group** produces its own `.pxmesh` file\. The processed runtime assets appear in Asset Browser as children of the `.fbx` file\.

**Important**
There are many options for creating PhysX collider assets\. The *best* options in a scenario depend on many factors including mesh complexity, how the collider asset is used, and whether the entity containing the collider is static \(doesn't move\), kinematic \(animated\), or dynamic \(has a rigid body component\)\. In general, primitive colliders offer the best simulation performance, but you might consider trading performance for precision in situations where collider assets that closely match a visible render mesh are desirable\.

**Contents**
+ [PhysX tab properties](#fbx-importer-physx-tab-base-properties)
+ [Triangle mesh asset properties](#fbx-importer-physx-tab-triangle-properties)
+ [Convex asset properties](#fbx-importer-physx-tab-convex-properties)
+ [Primitive asset properties](#fbx-importer-physx-tab-primitive-properties)
+ [Decomposition properties](#fbx-importer-physx-tab-decomposition-properties)
+ [PhysX modifiers](#fbx-settings-physx-modifiers)
    + [Comment modifier](#w31aac15b9c11c17c23)
    + [Origin modifier](#w31aac15b9c11c17c25)

## PhysX tab properties 

![\[The FBX Settings PhysX tab.\]](/images/user-guide/fbx/ui-fbx-settings-physx-tab.png)

****Add another physxmesh****
Add a **PhysX mesh group** to process as a PhysX collider asset \(`.pxmesh`\) from the `.fbx` file\.

****Name PhysX Mesh****
Enter a name for the PhysX mesh\. This is the name of the `.pxmesh` file that appears in **Asset Browser** as a child of the `.fbx` file\.

****Select meshes****
Specify the meshes to process from the `.fbx` file for this **PhysX mesh group**\. Choose the **Hierarchy** icon to see a list of meshes found in the `.fbx` file\. Select meshes from the list to include them in the **PhysX mesh group** and process as PhysX collider assets\.
If your \.fbx file includes mesh nodes with the suffix `_phys`, the meshes are automatically selected for processing in the **PhysX mesh group**\.

****Export As****
The cooking method to apply to this **PhysX mesh group**\. This setting exposes properties for the selected cooking method\. The three options are:
+ Triangle \- Generate colliders composed of triangles based on the selected meshes\.
+ Convex \- Generate convex hull colliders based on the selected meshes\.
+ Primitive \- Fit primitive colliders based on the selected meshes\.
Triangle mesh colliders can only be used with static and kinematic entities\. To use the PhysX collider asset with dynamic entities \(entities that have a **PhysX Rigid Body** component\), choose **Convex** or **Primitive** for the **Export as** property\.

****Physics Materials****
Associate a physics material to each material from the selected meshes\.

## Triangle mesh asset properties 

Triangle mesh colliders accurately reproduce the shape of the selected meshes, but cannot be used on dynamic entities\. Triangle mesh colliders are most suitable for static environment entities that have complex shapes and require colliders that accurately resemble the visible render mesh shape\.

![\[The FBX Settings PhysX tab Triangle mesh asset properties.\]](/images/user-guide/fbx/ui-fbx-settings-physx-triangle-parameters.png)

**Merge Meshes**
When enabled, all selected mesh nodes are merged into a single collider mesh\. Otherwise, the selected mesh nodes are exported as separate shapes\. It is usually more efficient to have a single collider mesh\.

**Weld Vertices**
When enabled, mesh vertex welding is performed\. **Disable clean mesh** must be disabled when **Weld Vertices** is enabled or vertex welding is not performed\.

**Disable Clean Mesh**
When enabled, mesh cleaning is disabled\. This makes cooking faster\. **Disable clean mesh** must be disabled when **Weld Vertices** is enabled or vertex welding is not performed\.

**Force 32\-bit Indices**
When enabled, 32\-bit indices are created for the collider asset regardless of triangle count\.

**Suppress Triangle Mesh Remap Table**
When enabled, the face remap table is not created\. This saves a significant amount of memory, but the SDK won't be able to provide the remap information for internal mesh triangles returned by collisions, sweeps, or raycast hits\.

**Build Triangle Adjacencies**
When enabled, triangle adjacency information is created\. You can get the adjacency triangles for a given triangle from `getTriangle`\.

**Mesh Weld Tolerance**
When **Weld Vertices** is enabled, this value is the distance within which vertices are welded\. When **Weld Vertices** is disabled, this value defines the acceptance distance for mesh validation\.
Having a clean, welded mesh is required to achieve the best possible performance\. **Weld Vertices** uses a snap\-to\-grid approach\. This approach truncates each vertex to an integer value using **Mesh Weld Tolerance**\. Once these snapped vertices are produced, all vertices that snap to a given vertex on the grid are remapped to reference a single vertex\. Following this, all triangle indices are remapped to reference this subset of clean vertices\. Vertices do not have their positions modified; the snap\-to\-grid is only performed to identify nearby vertices\.
The mesh validation approach uses the same snap\-to\-grid approach to identify nearby vertices\. If more than one vertex snaps to a given grid coordinate, the distance between the vertices is checked to ensure it is greater than **Mesh Weld Tolerance**\. If the vertices are within **Mesh Weld Tolerance**, a warning is emitted\.

**Number of Triangles Per Leaf**
Set the mesh cooking hint for max triangles per leaf\. Fewer triangles per leaf results in slower cooking speed and produces larger mesh sizes with better runtime performance\. More triangles per leaf results in faster cooking speed and produces smaller mesh sizes with decreased runtime performance\.

## Convex asset properties 

Convex hulls are generated colliders that can approximate the shape of the selected meshes\. Convex hulls can be used with static, kinematic, and dynamic entities, and are often used on interactive entities such as weapons that require rigid body physics and a collider mesh that resembles the shape of the visible render mesh\.

![\[The FBX Settings PhysX tab Convex asset properties.\]](/images/user-guide/fbx/ui-fbx-settings-physx-convex-parameters.png)

**Area Test Epsilon**
If the area of a triangle in the hull is below this value, the triangle is rejected\. This test is performed only if **Check Zero Area Triangles** is set\. Valid values range from a minimum of **0** to a maximum value of **100**\.

**Plane Tolerance**
This value is used during hull construction\. When a new point is added to the hull, it is rejected when the point is closer to the hull than the **Plane Tolerance** value\. The **Plane Tolerance** value is increased according to the hull size\.
If the **Plane Tolerance** value is **0\.0**, all points are accepted when the convex hull is created\. This can lead to edge cases where the new points are merged into an existing polygon, changing the polygon's plane equation slightly, resulting in failures during polygon merging phase in the hull computation\.
We recommend the default value\. However, if all points must be accepted, or large, thin convex hulls must be created, you can specify a lower value\. Valid values range from a minimum of **0** to a maximum value of **100**\.

**Use 16\-bit Indices**
When enabled, 16\-bit triangle or polygon indices are generated\. Otherwise, 32\-bit vertex indices are generated\.

**Check Zero Area Triangles**
Checks and removes triangles that are have a smaller area than the area value specified in **Area Test Epsilon**\.

**Quantize Input**
Quantizes the input vertices using [k\-means clustering](/docs/userguide/ly-glos-chap#kmeansclustering)\.

**Use Plane Shifting**
Enables plane shifting vertex limit algorithm\. For more information, see the [ NVIDIA PhysX Geometry documentation](https://docs.nvidia.com/gameworks/content/gameworkslibrary/physx/guide/Manual/Geometry.html)\.

**Shift Vertices**
When enabled, convex hull input vertices are shifted to be around the origin to provide better computation stability\. It is recommended to provide input vertices around the origin; otherwise, use this property to improve numerical stability\.

**Gauss Map Limit**
Specifies the vertex limit beyond which additional acceleration structures are computed for each convex mesh\. Increase the limit to reduce memory usage\. Computing the extra structures doesn't guarantee optimal performance\. There is a per\-platform break\-even point below which the extra structures can negatively impact performance\. Valid values range from a minimum of **0** to infinity\.

**Build GPU Data**
When enabled, additional information required for GPU accelerated rigid body simulation is generated\. This can increase memory usage and cooking time for convex meshes and triangle meshes\. Convex hulls are generated with respect to GPU simulation limitations\. The vertex limit is set to 64 and the per face vertex limit is set to 32\.

**Decompose Meshes**
When enabled, the V\-HACD algorithm is applied to split each node into approximately convex parts\. Each part is exported as a convex collider using the properties configured above\. **Decompose Meshes** enables **Decomposition Properties** which determine how the selected meshes are decomposed into approximately convex parts\.

## Primitive asset properties 

Primitive colliders are simple parametric primitives \(box, capsule, sphere\) fit to the selected meshes and can be used with static, kinematic, and dynamic entities\. Primitive colliders generally provide the best simulation performance, but might not closely match the shape of the visible render mesh\. They are best suited for dynamic entities with simple meshes such as crates and barrels, as well as projectiles, triggers, and entities where colliders that accurately represent shape of the visible render mesh are not necessary\.

![\[The FBX Settings PhysX tab Primitive asset properties.\]](/images/user-guide/fbx/ui-fbx-settings-physx-primitive-parameters.png)

**Target Shape**
Select a target shape to fit to the mesh: **Box**, **Capsule**, or **Sphere**\. If **Automatic** is selected, then the algorithm determines which shape fits best\.

**Volume Term Coefficient**
Specifies how aggressively the primitive fitting algorithm minimizes the volume of the fitted primitive\. Valid values range from a minimum of **0** to a maximum of **0\.002**\.
A value of **0** performs no volume minimization and is recommended for most meshes, especially meshes with moderate to high vertex counts\.
For meshes that have low vertex counts, or vertices that are distributed mainly along the edges, the algorithm can sometimes produce sub\-optimal results where the primitive touches the edges of the mesh, but not the faces\. In these cases, the fitting can be improved by increasing the **Volume Term Coefficient** so that the fitting algorithm shrinks the volume of the primitive while minimizing its deviation from the mesh\. A **Volume Term Coefficient** that is too high can shrink the primitive collider so that it's occluded by the mesh\.

**Decompose Meshes**
When enabled, the V\-HACD algorithm is applied to split each node into approximately convex parts\. Each part is exported as a primitive collider using the properties configured above\. **Decompose Meshes** enables **Decomposition Properties** which determine how the selected meshes are decomposed into approximately convex parts\.

## Decomposition properties 

Exporting a PhysX mesh as a convex or a primitive collider might not produce good results if the mesh's shape is concave or doesn't closely fit one of the primitive shapes\. Exporting a PhysX mesh as a triangle mesh collider creates a collider that accurately resembles the original mesh, but won't work with a dynamic entity\. For these scenarios, O3DE supports approximate convex decomposition\. Arbitrary meshes are broken down into approximately convex parts before processing each part through the asset pipeline individually\.

Decomposing meshes has the advantage that each individual, nearly convex part, can be more accurately exported as a convex or primitive\. Since the resulting asset doesn't contain any triangle meshes, it can be used on dynamic entities\.

For more information and illustrated examples of results, see the [V\-HACD library on GitHub](https://github.com/kmammou/v-hacd)\.

![\[The FBX Settings PhysX tab Decomposition properties.\]](/images/user-guide/fbx/ui-fbx-settings-physx-decomposition-parameters.png)

**Maximum Hulls**
Specify the maximum number of hulls to generate\. Valid values range from a minimum of **1** to a maximum value of **1024**\.

**Maximum Vertices Per Hull**
Defines the maximum number of triangles per convex hull\. Valid values range from a minimum of **4** to a maximum value of **1024**\.

**Concavity**
Specify the maximum concavity of each approximate convex hull\. Valid values range from a minimum of **0** to a maximum value of **1**\.

**Resolution**
Maximum number of voxels generated during the voxelization stage\. Valid values range from a minimum of **10000** to a maximum value of **64000000**\.

**Mode**
Select voxel\-based approximate convex decomposition or tetrahedron\-based approximate convex decomposition\.

**Alpha**
Specify the bias toward clipping along symmetry planes\. Valid values range from a minimum of **0** to a maximum value of **1**\.

**Beta**
Specify the bias toward clipping along revolution axes\. Valid values range from a minimum of **0** to a maximum value of **1**\.

**Minimum Volume Per Hull**
Specify the adaptive sampling of the generated convex hulls\. Valid values range from a minimum of **0** to a maximum value of **0\.01**\.

**Plane Downsampling**
Specify the granularity of the search for the *best* clipping plane\. Valid values range from a minimum of **1** to a maximum value of **16**\.

**Hull Downsampling**
Specify the precision of the convex hull generation process during the clipping plane selection stage\. Valid values range from a minimum of **1** to a maximum value of **16**\.

**Enable PCA**
When enabled, the mesh is normalized before applying the convex decomposition\.

**Project Hull Vertices**
When enabled, the output convex hull vertices are projected onto the original source mesh to increase the floating point accuracy of the results\.

## PhysX modifiers 

Modifiers can be added to a **PhysX mesh group** by choosing the **Add Modifier** button, and selecting a modifier from the list\.

### Comment modifier 

![\[The FBX Settings PhysX tab Comment modifier.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-comment.png)

Add a comment to the file\. You can add a comment about changes made to the `.fbx` file for tracking purposes or notes on export options, for example\. Comments don't affect how files are processed and multiple comment modifiers can be added to a mesh group\.

### Origin modifier 

![\[The FBX Settings Meshes tab Origin modifier.\]](/images/user-guide/fbx/ui-fbx-settings-mesh-modifier-origin.png)

Change the position \(translation\), orientation \(rotation\), and scale of a mesh relative to how it was authored\.

****Relative Origin Node****
Select the transform relative to which the mesh is processed\. By default, the mesh origin is placed at the scene position `0`, `0`, `0` in the `.fbx` file\.

****Translation****
Sets the position offset of the processed mesh\.

****Rotation****
Sets the orientation offset of the processed mesh in degrees\.

****Scale****
Sets the scale offset of the processed mesh\.
