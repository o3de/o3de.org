# Adding Touch \(Collision\) Bending Effects<a name="vegetation-bending-touch-intro"></a>

The touch bending technique simulates a player touching, brushing against, and interacting with vegetation\. Use it for bushes, branches, flexible trees, and bigger leaves with stems\. 

To start implementing touch bending vegetation effects in your game, you must have mesh assets for your vegetative elements in FBX format\. FBX files can be exported from most 3D modeling software packages\.

For a specific vegetation element, you must have:
+ The FBX file representing the vegetation asset as a mesh
+ A cube\-shaped proxy mesh that represents the "trigger volume" for collisions
+ A skeleton \(tree of joints\) used to define the branches as well as the skinning data

The figure below shows how these 3 components are represented in the Lumberyard user interface after you have imported the main vegetation object mesh \(as FBX\)\.

![\[How touch bending vegetation is managed within Lumberyard\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/vegetation/vegetation-touch-bending-cube-primitive1.png)

**Topics**
+ [Vegetation FBX Mesh](#vegetation-bending-touch-fbx)
+ [Cube Collision Proxy Mesh](#vegetation-bending-touch-collision-cube)
+ [Vegetation Skeleton](#vegetation-bending-touch-skeleton)
+ [Debugging and Performance Tips](#vegetation-bending-touch-debugging-and-perf)

## Vegetation FBX Mesh<a name="vegetation-bending-touch-fbx"></a>

An FBX mesh can be exported into Lumberyard from many common digital content creation tools, or from an existing \.fbx asset file\. 

For more details on working with FBX meshes in Lumberyard, read [Working with the FBX Settings Tool](char-fbx-importer.md)\.

## Cube Collision Proxy Mesh<a name="vegetation-bending-touch-collision-cube"></a>

The cube proxy mesh is a simple primitive used to determine when a collision \(a "touch"\) occurs between the vegetation object and some other physical entity\. You import it as an FBX mesh, and if you name this mesh as **\*\_touchbend** \(for example, **proxy\_touchbend**\) the FBX pipeline will automatically identify this mesh as the trigger volume\.

This mesh is cube\-shaped and big enough to cover the main mesh, and is used at runtime as a trigger volume\. Whenever a physical entity enters this volume during your game's inner loop processing, the Lumberyard engine will trigger the creation of a "skeleton" structure made of dynamic rigid bodies \(segments\) attached to each other via joints \(specifically, D6Joints in PhysX\)\. This structure simulates a terrain\-anchored skeleton that passively reacts to the movement of physical entities pushing through it\. 

For more details on creating physics proxy meshes, read [Creating Physics Proxies for Static Meshes](char-fbx-export-static-meshes-best-practices-physics.md)\.

## Vegetation Skeleton<a name="vegetation-bending-touch-skeleton"></a>

For users of standard digital content creation \(DCC\) tools like Maya, 3D Studio, or Blender, this part of the asset is nothing more than joints organized in a parent\-child relationship\. This skeleton is used to skin the main mesh and define a binding pose for it\.

**Limitations:**

The skeleton cannot have more than 128 joints\.

**Naming Convention Requirements:**

The joints must follow the naming convention "**branchN\_M**", where N and M are positive integers starting from number 1\. Here is an example showing joint structure and naming:

![\[Defining and managing a tree of joints for touch bending behaviors\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/vegetation/vegetation-touch-bending-skeleton1.png)

**Note**  
The name of the root joint can be postfixed with "\_touchbend" \(for example, "branch1\_touchbend"\) as a convenience to notify the FBX pipeline that this asset is used for touch bending instead of a traditional animated character\.

## Debugging and Performance Tips<a name="vegetation-bending-touch-debugging-and-perf"></a>

In the Lumberyard Editor, you can instantiate or paint static touch bendable vegetation using the Rollup Bar \(LEGACY\) UI\. 

![\[Painting Touch Bendable Vegetation with Lumberyard\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/vegetation/vegetation-touch-bending-debugging1.png)

The steps shown above are no different from painting regular vegetation objects\. Just make sure that the chosen CGF file comes from an FBX asset exported as Touch Bendable Geometry\.

Alternatively, you can use Dynamic Vegetation planting with help from the Vegetation Gem\.

**Improving performance**

There is a set of CVARs that can be used to fine\-tune the performance of touch bendable vegetation\.


****  

| CVAR | Description | 
| --- | --- | 
|  **e\_CullVegActivation**  | Maximum distance, in meters, from the camera for a touch bendable vegetation node to be considered for bending\. The default value is 50 meters\. In many cases, this value can be reduced to 12m and still provide good results and higher performance\. Setting this value to 0 indicates that there is no activation limit\. | 
|  **e\_FoliageBranchesTimeout**  | Lifetime, in seconds, of touch bending physics simulation after the last time a vegetation object was touched by another physical entity\. The default value is 4 seconds\. | 
|  **physx\_Debug**  | Set this CVAR to 1 to enable the drawing of PhysX rigid bodies and trigger volumes when debugging\. This allows you to view the interactions during run time and check for unexpected behaviors during object interactions\. The example pictures below show the trigger volume at the time it is first touched by a spherical collider\. In the next frame, a tree of capsules is created dynamically and its realtime movement is fed into the renderer for skinning\. This tree of capsules will remain alive in PhysX memory for **e\_FoliageBranchesTimeout** seconds unless another collision occurs during that window, in which case the window will reset\.  | 

![\[Enabling PhysX rigid bodies and trigger volumes for debugging\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/vegetation/vegetation-touch-bending-debugging2.png)