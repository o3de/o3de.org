# Editing the FBX Settings<a name="char-fbx-importer-edit-import-settings"></a>

If you update the FBX settings or add modifiers for the `.fbx` file, Lumberyard generates an `.assetinfo` file with the `.fbx` file\. The `.assetinfo` file stores the configuration and modifier settings that are applied when processing the `.fbx` file\. The original `.fbx` file remains intact\. 

You can find a sample `.fbx` file in the `lumberyard_version/dev/SamplesProject/Objects/Tutorials/Fbx` directory\.

**To edit the FBX Settings**

1. In Lumberyard Editor, in the **Asset Browser**, select the `.fbx` file to modify\.
**Tip**  
Enter **fbx** into the **Asset Browser**'s search bar to find `.fbx` files\.

1. Right\-click the `.fbx` file and then choose **Edit Settings**\.

1. In the **FBX Settings** tool, you can specify changes for the following settings:
   + **Meshes** – Modify the settings for static meshes \(`.cgf`\)\. This tab appears if the file includes static meshes\.
   + **Actors** – Modify the settings for actors \(`.actor`\)\. This tab appears if the file includes actors\. 
   + **Motions** – Modify the settings for motions \(`.motion`\)\. This tab appears if the file includes motions\. 
   + **PhysX** – Modify the settings for PhysX meshes \(`.pxmesh`\)\. This tab appears if the file includes PhysX meshes\. 

1. To delete a modifier or group, click the **X** icon for the entry\.

1. Click **Update** to apply your changes\. Asset Processor automatically updates the meshes in your level\. Larger files can take longer to process\.

1. Review the status for errors or a success message\. To return to the settings, click **OK**\.

## Meshes<a name="char-fbx-importer-import-settings-meshes-tab"></a>

Mesh groups are a collection of meshes in your file that you want to process\. By default, all meshes in your file are processed\. However, you can manually exclude individual meshes in your `.fbx` file\. You can also process multiple mesh groups from a single `.fbx` file\.

The **Meshes** tab includes the following settings\.


| Parameter | Description | 
| --- | --- | 
| Add another mesh |  Create a mesh \(`.cgf`\) from the original `.fbx` file\.   | 
| Name mesh |  Enter a name for the mesh group\. This name appears in the **Asset Browser** for the `.cgf` file\.  | 
| Select meshes |  Specify the meshes to process from your `.fbx` file\. You should specify the meshes to render\.  For example, if your physics proxy mesh is different from your render mesh, deselect the physics proxy mesh from the general meshes to process\.  | 
| Add Modifier |  Add modifiers to specify how you want to process the mesh group\. You can add the following modifiers: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Comment |  Add one or more comments for the file\. For example, you can add a comment about the change made to the `.fbx` file for tracking purposes\. Comments don't affect how files are processed\.  | 
| Level of Detail |  Specify a level of detail \([LOD](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#lod)\)\. You can specify a maximum of five LODs, which are numbered \[`0`\] to \[`4`\], with \[`0`\] the highest level of detail\. LODs are optimized meshes with a low polygon count that appears the farther the camera moves from the render mesh\.  Click **Select nodes** to specify the mesh nodes to include for each LOD\.  When you author the mesh in your 3D application, you can add `_lod1`, `_lod2`, `_lod3`, `_lod4`, `_lod5` as suffixes to your mesh names to automatically add a **Level of Detail** modifier and assign the appropriate LOD to the level\. `_lod1` is mapped to \[`0`\], `_lod2` is mapped to \[`1`\], and so on\.   | 
| Material |  Materials contain the surface properties of a mesh and the generated material file \(`.mtl`\) stores the materials of the processed mesh\. Names of materials in the `.fbx` file are based on the **Name** setting for materials in the `.mtl` file\.  For example, a mesh processed with a file named `myfile.cgf` has a corresponding material file named `myfile.mtl`\.  You can customize materials with the following settings: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Mesh \(Advanced\) |  You can specify the following advanced modifiers for processed mesh files: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Origin |  Change the position \(translation\), orientation \(rotation\), and scale of a mesh relative to how it was authored\.  You can specify the following settings: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| CryPhysics Proxy |  You can specify the following setting: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  If your `.fbx` file includes a mesh node with the suffix `_phys`, the mesh node automatically adds a new **Physics Proxy** modifier\.   | 

## Actors<a name="char-fbx-importer-import-settings-actor-tab"></a>

Actors are character files with at least one bone and can contain one or more meshes\. By default, all actors in your scene are processed\. However, you can manually exclude individual actors within your `.fbx` file\. You can also process multiple actors from a single `.fbx` file\.

For more information, see [Animation Editor File Types](char-animation-editor-file-types.md)\.

The **Actors** tab includes the following settings\.


****  

| Parameter | Description | 
| --- | --- | 
| Add another actor |  Create an actor \(`.actor`\) from the original `.fbx` file\.   | 
| Name actor |  Enter a name for the actor group\. This name appears in the **Asset Browser** for the `.actor` file\.  | 
| Select root bone |  Select the default root bone\. The top parent of the skeleton is selected as the default bone\. All the child bones of the root bone are processed\.  | 
| Select meshes |  Specify the meshes to process from your `.fbx` file\. You should specify the meshes to render\.  For example, if your physics proxy mesh is different than your render mesh, deselect the physics proxy mesh from the general meshes to process\.  | 
| Add Modifiers |  Add modifiers to specify how you want to process the actor group\. You can specify the following modifiers: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Comment |  Add one or more comments for the file\. For example, you can add a comment about the change made to the `.fbx` file for tracking purposes\. Comments don't affect how files are processed\.  | 
| Mesh |  You can specify the following setting: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Material |  You can specify the following settings: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Skin |  You can specify the following settings: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Scale actor |  You can specify the following setting: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
|  **Tangents**  |  You can generate tangents with MikkT or import tangents and bitangents from an FBX file\. To achieve the same appearance in Lumberyard, we recommend that you use the same tangent space that you used to bake the normal maps in your DCC\. You can specify the following settings: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)    **Animation Editor** can store bitangents in case they aren't orthogonal\.   If an old actor file is loaded, it uses the tangents that the **Animation Editor** already generated before the change\. This is the default option until the asset is rebuilt\.     If there are no tangent rules set on an actor, Lumberyard uses the default settings:   **Tangent space** = **MikkT**   **Bitangent** = **Orthogonal**   **Normalize** = `true`   **UV set** = `0`       | 
| Coordinate system change |  You can specify the following setting: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 

## Motions<a name="char-fbx-importer-import-settings-motion-tab"></a>

Motion groups are a collection of motion files \(`.motion`\) in your scene that you want to process\. By default, all motions in your scene are processed\. However, you can manually exclude individual motions within your `.fbx` file\. You can also process multiple motion groups from a single `.fbx` file\.

For more information, see [Animation Editor File Types](char-animation-editor-file-types.md)\.

The **Motions** tab has the following settings\.


****  

| Parameter | Description | 
| --- | --- | 
| Add another motion |  Create a motion \(`.motion`\) from the original `.fbx` file\.   | 
| Name motion |  Enter a name for the motion group\. This name appears in the **Asset Browser** for the `.motion` file\.  | 
| Select root bone |  Select the default root bone\. The top parent of the skeleton is selected as the default bone\. All the child bones of the root bone are processed\.  | 
| Modifiers |  Click **Add Modifier** to choose a configuration for the motion group\. For more information, see the following **Modifiers** table\.  | 


**Modifiers**  

| Parameter | Description | 
| --- | --- | 
| Compression settings |  You can specify the following settings: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Scale motion |  You can specify the following settings for **Scale motion**: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Coordinate system change |  You can specify the following setting: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Additive motion |  Use this option to convert an existing motion into an additive motion\. You can specify the following setting: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Motion range |  You can specify the following settings: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/char-fbx-importer-edit-import-settings.html)  | 
| Comment |  Add one or more comments for the file\. For example, you can add a comment about the change made to the `.fbx` file for tracking purposes\. Comments don't affect how files are processed\.  | 

## PhysX<a name="char-fbx-importer-import-settings-physx-tab"></a>

PhysX groups are a collection of meshes \(`.pxmesh`\) in your scene that you want to process\. By default, all meshes in your scene are processed\. However, you can manually exclude individual meshes within your `.fbx` file\. You can also process multiple mesh groups from a single `.fbx` file\.

For more information, see [PxMesh Export Parameters](physx-export-physx-mesh-asset.md#physx-mesh-export-params)\.