---
description: ' Use FBX Settings to customize how static meshes, actors, PhysX colliders,
  and motions stored in .fbx files are exported for Amazon Lumberyard. '
title: Customize FBX asset export with FBX Settings
---
# Customize FBX asset export with FBX Settings {#fbx-intro}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

Meshes, actors, PhysX colliders, and motions created in third\-party content creation tools must be exported to a runtime format for your project\. To export your assets to Lumberyard, save the assets from your content application as `.fbx` files\. Then, place the `.fbx` files in one of the asset directories of your project\. Lumberyard uses `.fbx` as an intermediate file format because most modeling and animation applications can read and create `.fbx` files\.

**Topics**
+ [FBX Settings introduction](#fbx-settings-intro)
+ [FBX Settings export properties](/docs/userguide/fbx/properties.md)
+ [FBX Settings mesh export](/docs/userguide/fbx/mesh-export.md)
+ [FBX Settings actor export](/docs/userguide/fbx/actor-export.md)
+ [FBX Settings motion export](/docs/userguide/fbx/motion-export.md)
+ [FBX Settings PhysX export](/docs/userguide/fbx/physx-export.md)
+ [Multiple UV sets for meshes and actors](/docs/userguide/fbx/multiple-uv-sets.md)
+ [FBX soft naming conventions](/docs/userguide/fbx/settings-soft-naming.md)

## FBX Settings introduction {#fbx-settings-intro}

 When you place `.fbx` files in an asset directory in your project, **Asset Processor** detects the new or modified files, determines the contents of the files, and then exports the data using basic settings\. However, `.fbx` files can be complex and might contain data that is necessary for an artist, animator, or designer, but not necessary for a runtime asset\. Data in the `.fbx` file might require special handling such as higher precision vertex data or a coordinate space change\. With **FBX Settings**, you can specify what data in the `.fbx` file to export, and how the data should be processed by **Asset Processor**\.

When you customize export properties and add modifiers with **FBX Settings**, a corresponding `.assetinfo` file containing the settings is created for the `.fbx` file\. The `.fbx` file is not changed\. When **Asset Processor** exports the `.fbx` file, it uses the settings in the `.assetinfo` file to generate the runtime asset\.

You can find a sample `.fbx` files in the `lumberyard_version\dev\SamplesProject\Objects\Tutorials\Fbx` directory, or type **fbx** into the search field at the top of **Asset Browser** to show `.fbx` files in your current project\.