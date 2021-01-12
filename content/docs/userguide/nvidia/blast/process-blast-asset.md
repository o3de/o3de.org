---
description: ' Process assets for NVIDIA Blast. '
title: Processing assets for NVIDIA Blast
---
# Processing assets for NVIDIA Blast<a name="nvidia-blast-process-blast-asset"></a>


****  

|  | 
| --- |
| This feature is an [experimental](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#experimental) release and is subject to change\.  | 

Blast assets that are exported from Houdini must be processed by **Asset Processor** to generate run\-time assets\. There are two methods for processing Blast assets for use in Lumberyard: an automated method using Python Asset Builder, and a manual method where you select the meshes to be processed\. 

**Important**  
Processing meshes automatically is less time consuming than manually setting up blast meshes to process\. It is important to understand both processes, however\. You might use the automatic process for the initial export and then manually edit the mesh assets to add modifiers for custom normals or vertex color streams\.   
Once you have manually edited the `.fbx` asset in **FBX Settings**, a `.assetinfo` file is created for the `.fbx` asset\. The `.assetinfo` file prevents the mesh assets from being processed automatically by **Python Asset Builder**\. Any further changes made to the source `.fbx` file, such as adding or removing fracture levels or chunks, must be manually edited in **FBX Settings**\. 

**Contents**
+ [Process Blast assets automatically](#nvidia-blast-automatic-process)
+ [Process Blast mesh assets manually](#nvidia-blast-manual-process)

## Process Blast assets automatically<a name="nvidia-blast-automatic-process"></a>

When blast assets are processed automatically, a blast slice asset is created that adds the blast mesh chunks to the **Blast Family Mesh Data** component\. If you have a blast asset with dozens of chunks, automatic processing with the Python asset builder for NVIDIA Blast can save some time\. 

**Note**  
Automatically processing assets for NVIDIA Blast requires that your project has been built with the **Python Asset Builder** and **EditorPythonBidnings** gems enabled\. For more information, see [Python Asset Builder gem](/docs/userguide/assets/process/python/_index.md)\. 

**To process Blast assets automatically**

1. Copy the `.blast` and `.fbx` files for your Blast asset into an asset directory in your project\. 

1. Start Lumberyard Editor\. **Asset Processor** detects the `.blast` and `.fbx` files and generates the runtime mesh assets, a blast asset, and a blast slice asset\. 

1. You can verify that the assets have processed successfully in the **Jobs** tab of **Asset Processor**\. If you need to reprocess the assets, do the following: 

   1. In **Asset Processor**, select the **Assets** tab\. 

   1. Right\-click the asset in the asset list to open the context menu\. 

   1. Choose **Reprocess File** from the context menu\.   
![\[Automatic process of Blast assets.\]](/images/userguide/physx/blast/ui-blast-process-automatic.png)

## Process Blast mesh assets manually<a name="nvidia-blast-manual-process"></a>

Manually processing blast assets requires you to add a mesh group for each chunk mesh so that **Asset Processor** can generate the run\-time asset\. Manual processing also requires you to add each run\-time mesh to the **Blast Family Mesh Data** component\. If you need to add modifiers to the blast mesh chunks, such as specifying a vertex color stream, you must use this manual process\. 

**To process Blast assets manually**

1. Copy the `.blast` and `.fbx` files for your Blast asset into an asset directory in your project\. 

1. Start Lumberyard Editor\. 

1. Locate the `.fbx` asset in **Asset Browser** and double\-click on the asset to open **FBX Settings**\. 

1. Choose the **Meshes** tab\. 

1. Create one **Mesh group** for each mesh in the `.fbx` asset\. 

   1. If there is an existing **Mesh group**, ensure it has only the first mesh selected from the **Select Meshes** list\. 

   1. Add a new **Mesh group** by choosing **Add another mesh**\. 

   1. Add the next mesh to the new **Mesh group** by choosing the **Hierarchy** button to the right of **Select meshes** and selecting the next mesh from the list\. 

   1. Repeat steps **b** and **c** until each mesh in the mesh list is assigned to its own **Mesh group**\.   
![\[Create mesh groups for Blast assets.\]](/images/userguide/physx/blast/ui-blast-asset-mesh-groups.png)

1. **Optional:** If the meshes require special processing, such as a vertex color stream provided by the **Mesh \(Advanced\)** modifier, add modifiers to each mesh group as required\. 

1. Choose the **Update** button in the bottom right of **FBX Settings**\. **Asset Processor** generates the run\-time assets\. A **File progress** window appears and displays feedback about the process\. 