# Export PhysX collider mesh assets<a name="physx-export-physx-mesh-asset"></a>

If you want to use a mesh a collider for the **PhysX Collider** component, you need a `.pxmesh` file to define the entity's collision geometry\. You create this file from an FBX file with at least one mesh\. Lumberyard's PhysX system can export a mesh as a triangle mesh or a convex mesh\. The default is set to triangle mesh, which you can use only on static objects\. 

**Note**  
Dynamic entities can only use convex meshes\. Static objects can use convex and triangle meshes\. When you export a mesh, triangle mesh is the default\. 

The following procedure shows you how to export your mesh with various settings\.

**To export a \.pxmesh file**

1. On your file system, locate the FBX file with the mesh that you want to export\. Artists typically create these FBX files with DCC tools\.  
![\[FBX file on the operating system\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-export-physx-mesh-asset-1.png)

1. Place the FBX file into your project's asset directory such as `lumberyard_version\dev\StarterGame\Objects`\. If Lumberyard Editor is not open, launch it\.

   Asset Processor automatically detects and processes the FBX file\.

1. In the **[Asset Browser](asset-browser-intro.md)**, navigate to the FBX file, right\-click, and then choose **Edit Settings** to open the **FBX Settings** tool\.  
![\[Right-click the FBX file and choose Edit Settings\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-export-physx-mesh-asset-2.png)

1. In the **FBX Settings** tool, configure PhysX mesh export parameters:

   1. Click the **PhysX** tab\.

   1. <a name="convex-mesh"></a>If this `.pxmesh` file is for a dynamic entity, you must select **Export Mesh As Convex**\. If the file is static, this parameter is optional\. 
**Note**  
When enabled, this parameter exports the mesh as a convex mesh\. Otherwise, the mesh is exported as a triangle mesh\.

   1. In the **Select meshes** box, select at least one mesh\.

   1. If no meshes are selected, click **Select meshes**\.

   1. Select one or more meshes \(**5**\) and click **Select**\.  
![\[Edit parameters in the FBX Settings tool to export a mesh as a .pxmesh file\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-export-physx-mesh-asset-3.png)

1. Click **Update**\.

1. Once Asset Processor finishes processing the updated mesh, click **OK**\. 

1. Close the **FBX Settings** tool\.

   For more information about the parameters in this window, see [PxMesh Export Parameters](#physx-mesh-export-params)\.

1. In the **Asset Browser**, you can verify that the **PhysX Collision Mesh** \(`.pxmesh` file\) appears\.  
![\[Edit parameters in the FBX Settings to export a mesh as a .pxmesh file\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-export-physx-mesh-asset-4.png)

## Exporting PxMesh Automatically for Static Objects<a name="physx-automatic-pxmesh-export"></a>

You can also set a mesh node in an FBX file to export automatically as a PhysX triangle mesh for static PhysX objects\. You do this by appending **`_phys`** to the end of a mesh node name\. Then, when you place the FBX file in your project's asset directory, Asset Processor automatically creates the `.pxmesh` file with a triangle mesh\. The `.pxmesh` file, or **PhysX Collision Mesh**, appears in the **Asset Browser** without any further action\.

**Note**  
If you want to export a convex mesh to use with a dynamic PhysX entity, you must do so manually using the **FBX Settings** tool\. See [Export Mesh as Convex](#convex-mesh)\.

## PxMesh Export Parameters<a name="physx-mesh-export-params"></a>

When you export a `.pxmesh` file from a mesh node in an FBX file, you use the **FBX Settings** tool\. You can export your `.pxmesh` file as a triangle mesh or a convex mesh\. 

**Important**  
Triangle meshes can be used only for static PhysX entities\. See [Triangle Mesh Parameters](#physx-mesh-export-params-triangular)\.
Convex meshes can be used for both static and dynamic PhysX entities\. See [Convex Mesh Parameters](#physx-mesh-export-params-convex)\.

Use the PhysX mesh export parameters to configure and tune the output produced by PhysX [cooking](ly-glos-chap.md#cooking) later in your game\.

**Contents**
+ [Shared Parameters](#pxmesh-shared-params)
+ [Triangle Mesh Parameters](#physx-mesh-export-params-triangular)
+ [Convex Mesh Parameters](#physx-mesh-export-params-convex)

### Shared Parameters<a name="pxmesh-shared-params"></a>


****  

| Parameter | Description | 
| --- | --- | 
| Name PhysX Mesh | Type a name for the PhysX mesh\. This name appears in the Asset Browser\. You can specify up to 40 characters for the name\. | 
| Export Mesh As Convex |  Sets the [cooking](ly-glos-chap.md#cooking) process to build this mesh as convex, which makes the mesh available for dynamic objects\.  | 
| Build GPU Data |  If set, creates additional information required for GPU\-accelerated rigid body simulation\.  This can increase memory usage and cooking times for convex meshes and triangle meshes\. Convex hulls are created with respect to GPU simulation limitations\.  Vertex limit is set to `64` and vertex limit per face is internally set to `32`\.  | 
| Select meshes |  You can select the meshes to include in the mesh group\.  | 

### Triangle Mesh Parameters<a name="physx-mesh-export-params-triangular"></a>

These parameters appear in the **FBX Settings** tool when the **Export Mesh As Convex** parameter is not set\.

![\[Triangle mesh export parameters for static objects only\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-mesh-export-params-1.png)


****  

| Parameter | Description | 
| --- | --- | 
| Weld Vertices |  If set, mesh welding is performed\. A clean mesh is required\. The **Disable Clean Mesh** parameter must not be selected\.  | 
| Disable Clean Mesh | If set, mesh cleaning is disabled\. This makes [cooking](ly-glos-chap.md#cooking) faster\. When clean mesh is not performed, mesh welding is also not performed\.  | 
| Force 32\-Bit Indices |  If set, 32\-bit indices are always created regardless of triangle count\.  | 
| Suppress Triangle Mesh Remap Table |  If set, the face remap table is not created\. This saves a significant amount of memory, but the PhysX SDK can't provide the remap information for internal mesh triangles returned by collisions, sweeps, or raycasts hits\.  | 
| Build Triangle Adjacencies |  If set, the triangle adjacency information is created\. You can get the adjacency triangles for a given triangle from `[getTriangle](https://docs.nvidia.com/gameworks/content/gameworkslibrary/physx/apireference/files/classPxMeshQuery.html#c567bb759621105f07886f257587d70f)`\.   | 
| Mesh Weld Tolerance |  To set this parameter, you must enable the **Weld Vertices** parameter\. If set, this value controls the distance at which vertices are welded\. Otherwise, this value defines the acceptable distance for mesh validation\. If no two vertices are within this distance, the mesh is considered to be clean\. Otherwise, a warning is issued\. Ideally, you want to have a clean, welded mesh to achieve the best possible performance\. As a best practice, start with a low value\. If you are using custom meshes from a DCC, don't enable this parameter\.  | 
| Number of Triangles Per Leaf |  Mesh [cooking](ly-glos-chap.md#cooking) hint for max triangles per leaf limit\. Fewer triangles per leaf produces larger meshes with better runtime performance but decreased cooking performance\. More triangles per leaf results in faster cooking speed and smaller mesh sizes, but with decreased runtime performance\.  | 

### Convex Mesh Parameters<a name="physx-mesh-export-params-convex"></a>

These parameters appear in the **FBX Settings** when you set the **Export Mesh As Convex** parameter\.

![\[Convex mesh export parameters for static or dynamic objects\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-mesh-export-params-2.png)


****  

| Parameters | Description | 
| --- | --- | 
|  **Area Test Epsilon**  | If the area of a triangle of the hull is below this value, the triangle is rejected\. This test is performed only if Check Zero Area Triangles is set\. | 
| Plane Tolerance |  This value is used during hull construction\. When a new point is added to the hull, it gets dropped when the point is closer to the hull than the **Plane Tolerance** value\. The **Plane Tolerance** value is increased according to the hull size\.  If `0.0` is set, all points are accepted when the convex hull is created\. This may lead to edge cases where the new points may be merged into an existing polygon and the polygons plane equation might change slightly\. This can lead to failures during polygon merging phase in the hull computation\.  We recommend the default value\. However, if it is required that all points needs to be accepted or huge thin convexes are created, you can specify a lower value\.  | 
| Use 16\-bit Indices |  If set, uses 16\-bit vertex indices in `PxConvexMeshDesc::triangles` or `PxConvexMeshDesc::polygons`\. Otherwise, 32\-bit vertex indices are used\.  | 
| Check Zero Area Triangles |  Checks and removes triangles that are nearly zero\-area during convex hull computation\. The rejected area size is specified in `PxCookingParams::areaTestEpsilon`\.  | 
| Quantize Input |  Quantizes the input vertices using the [k\-means clustering](ly-glos-chap.md#kmeansclustering)\.  | 
| Use Plane Shifting |  Enables plane shifting vertex limit algorithm\. For more information, see [Geometry](https://docs.nvidia.com/gameworks/content/gameworkslibrary/physx/guide/Manual/Geometry.html) in the NVIDIA documentation\.  | 
| Shift Vertices |  Convex hull input vertices are shifted to be around the origin to provide better computation stability\. It is recommended to provide input vertices around the origin; otherwise, use this parameter to improve numerical stability\.  | 
| Gauss Map Limit |  Vertex limit beyond which additional acceleration structures are computed for each convex mesh\. Increase the limit to reduce memory usage\. Computing the extra structures doesn't guarantee optimal performance\. There is a per\-platform break\-even point below which the extra structures can actually impact performance\.  | 