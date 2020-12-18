# FBX Soft Naming Conventions<a name="char-fbx-importer-soft-naming"></a>

You can use soft naming conventions when authoring assets in your digital content creation \(DCC\) tools, such as Autodesk 3ds Max or Maya\. Soft naming conventions are prefixes or suffixes that you add to either your scene's DCC node or the `.fbx` file name\. In Lumberyard, Asset Processor recognizes these soft naming conventions and then applies an action based on the specified soft naming convention\.

Lumberyard provides soft naming conventions as a convenience for content creators to automate steps that are typically done manually in the **FBX Settings** tool\. Depending on the soft naming conventions that you specify, Asset Processor automatically adds those modifiers to the scene settings\. 

**Contents**
+ [Viewing Soft Naming Conventions](#viewing-the-fbx-soft-naming-convention)
+ [Soft Naming Convention Parameters](#understanding-the-soft-naming-convention-parameters)
+ [Examples](#soft-naming-convention-examples)
+ [Configuring Soft Naming Conventions](#configuring-soft-naming-conventions)
+ [Moving FBX Files Between Projects](#moving-fbx-files-between-project)

**Note**  
The Scene Processing gem is required to use the **FBX Settings** tool\. This gem is enabled by default\.

The following table lists current soft naming conventions and the actions that are applied\.


**Default Soft Naming Conventions**  

| Soft Naming Convention | Method | Supported Modules | Example | Asset Processor Action | 
| --- | --- | --- | --- | --- | 
| \_phys | Apply suffix to node name\. | CryPhysics, PhysX | legMesh\_phys | Nodes with the \_phys suffix are treated as a physics proxy\. A physics proxy modifier is automatically added\. | 
|  `_lod1` `_lod2` `_lod3` `_lod4` `_lod5`  | Apply suffix to node name\. | Graphics |  `jack_lod1` `jack_lod2` `jack_lod3` `jack_lod4` `jack_lod5`  | Nodes are treated as LOD meshes\. The scene settings automatically add an LOD modifier with each suffixed node\. | 
| \_ignore | Apply suffix to node name\. | Graphics and CryPhysics | jackSkeleton\_ignore | Asset Processor ignores and doesn't process nodes with the \_ignore suffix\. | 
| \_anim | Apply suffix to file name\. | CryAnimation | jackMoves\_anim\.fbx | For \.fbx file names with the \_anim suffix, Asset Processor processes only the animations in the \.fbx file\. | 

## Viewing Soft Naming Conventions<a name="viewing-the-fbx-soft-naming-convention"></a>

You can use the System Entity Editor to view the current soft naming conventions for your project\.

**To view the soft naming conventions**

1. In the Project Configurator, choose **Advanced Settings** for your project\.

1. In the System Entity Editor, for **Configuration**, select **Editor**\. Soft naming conventions are available only to tools and Lumberyard Editor\.

1. Expand the **Scene Processing Config** section to find the soft naming conventions\.
**Note**  
If the **Scene Processing Config** section doesn't appear, click **Add Component** and then click **Scene Processing Config**\.   
![\[Example System Entity Editor for default soft naming conventions.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scene-entity-editor-example.png)

## Soft Naming Convention Parameters<a name="understanding-the-soft-naming-convention-parameters"></a>

You can use the System Entity Editor to match the files that use the specified pattern for the node name or file name\. The soft naming conventions are matched based on the pattern of the node name or file name that you specify\. 

There are three approaches available for matching:

**Postfix**  
Checks if the node or file name ends in the specified pattern\. For file name, the extension isn't included\.

**Prefix**  
Checks if the node or file name starts with the specified pattern\. This approach doesn't include any paths that are in front of the node or file name\.

**Regex**  
For complex pattern matching, you can use regular expressions to match the entire node \(for example, `root.group_a.group_b.mesh`\) or file path \(for example, `example/file/object.fbx`\)\. This approach is more complex but useful if you want more granular control\. For example, you can use regular expression to have all files in an `/animation/` directory export only the animation files\. 

For **Node name settings**, you can specify the following:

**Virtual type**  
Provides the list of virtual types that the nodes are converted to after their pattern matches\. You can assign multiple virtual types to a single node\.

**Include child node**  
If enabled, the virtual type applies to the node and all of its child nodes\. You can use this option to apply the change to a parent node and all of its children without adding a separate rule for each child node\.

For **File name settings**, you can specify the following:

**Virtual type**  
Provides the list of virtual types that the files are converted to after their pattern matches\.

**Graph type**  
Select one or more graph types that the virtual type is applied to\.

**Inclusive**  
If enabled, the virtual type applies to all graph node types that are selected\. If disabled, the virtual type applies to all graph node types that are unselected\.

## Examples<a name="soft-naming-convention-examples"></a>

Using these parameters, you can customize how Asset Processor processes `.fbx` files that you import\. 

**Example Node Name Setting**  
You can pair a node name in a source asset file to a predefined Lumberyard virtual type\.   

1. For **Node name setting**, for **Pattern**, specify **\_lod1**\.

1. For **Matcher**, specify **Postfix**\. 

1. For **Virtual type**, specify **LODMESH1** and select the **Include child nodes** check box\.

1. When Asset Processor processes the `.fbx` file, it checks for node names with the **\_lod1** suffix\. If any nodes match, Asset Processor assigns them the **LODMESH1** virtual type, and the change applies to all child nodes\.

**Example File Name Setting**  
You can pair a file name in a source asset file to a predefined Lumberyard virtual type\.   

1. For **Node name setting**, for **Pattern**, specify **anim\_**\.

1. For **Matcher**, specify **Prefix**\. 

1. For **Virtual type**, specify **Ignore**\.

1. For **Graph type**, specify **IAnimData** and select the **Inclusive** check box\.

1. When Asset Processor processes your files, it checks for file names with the **anim\_** prefix and that use the **IAnimData** graph type\. If any file names match, Asset Processor assigns them the **Ignore** virtual type\.

## Configuring Soft Naming Conventions<a name="configuring-soft-naming-conventions"></a>

The preconfigured soft naming conventions might not apply to your workflow\. You can change the existing soft naming conventions or create and delete them as needed\.

**To change soft naming conventions**

1. In the System Entity Editor, for **Node name settings**, you can specify the following options:

   1. For **Pattern**, specify a value\. The matcher uses this value to check against the file\.

   1. For **Matcher**, select one of the following:
      + **PreFix**
      + **PostFix**
      + **Regex**

   1. For **Virtual type**, select one of the following:
      + **Ignore**
      + **LODMesh1** – **LODMesh5**
      + **PhysicsMesh**

   1. For **Include child nodes**, specify whether the virtual type applies to the node and its children\.

1. For **File name setting**, you can specify the following options:

   1. For **Pattern**, enter a value\. The matcher uses this value to check against the file\.

   1. For **Matcher**, select one of the following:
      + **PreFix**
      + **PostFix**
      + **Regex**

   1. For **Virtual type**, select one of the following:
      + **Ignore**
      + **LODMesh1** – **LODMesh5**
      + **PhysicsMesh**

   1. For **Graph type**, select the graph types that you want\.

   1. For **Inclusive**, specify whether the virtual type applies to graph node types that you selected in the previous step\. If disabled, the virtual type applies to graphs that are unselected\.

1. To add a configuration, click the **\+** icon\.

1. For **Classes**, choose **File name setting** or **Node name setting** and then click **Save**\.

1. To delete a configuration, click the **x** icon\.

1. Click **Save**\.

## Moving FBX Files Between Projects<a name="moving-fbx-files-between-project"></a>

Soft naming conventions are project\-specific\. As a result, different projects can process the `.fbx` file differently\. 

**To process the FBX file the same way between projects**

1. In the **FBX Settings** tool, open the `.fbx` file to move\. 

1. Click **Update** at least once\. This creates a manifest \(`.fbx.assetinfo`\) file\.

1. When you move the `.fbx` file to another project, move the manifest file as well\. This ensures that the `.fbx` file is processed the same way, regardless of the specified soft naming conventions\.