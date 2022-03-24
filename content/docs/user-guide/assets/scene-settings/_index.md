---
linkTitle: Scene Settings
title: Customize Asset Processing with Scene Settings
description: With Scene Settings, you can set custom processing options for meshes, actors, motions, and PhysX colliders.
weight: 400
toc: true
---

Meshes, actors, motions, and PhysX colliders created in third-party digital content creation (DCC) applications must be processed as runtime optimized product assets to be used in **Open 3D Engine (O3DE)**. To provide the broadest support for DCC applications and scene file formats, O3DE integrates the [Open Asset Import Library](https://github.com/assimp/assimp). O3DE uses `.fbx` as its primary format for 3D scene source assets. O3DE also supports `.stl`, and support for `.gltf` is enabled and currently in development.

When source assets are placed in a scan directory, **Asset Processor** detects the new or modified files, determines the contents of the files, and then processes the data using basic default settings. However, 3D scene files can be complex and might contain data that's necessary for an artist, animator, or designer, but isn't necessary for a product asset. Data in the source asset might require special handling such as processing custom normals or a coordinate space change. With **Scene Settings**, you can specify the data in the source asset to process and customize how it's processed.

Scene Settings can come from several places:
* At a baseline, the engine has a default set of logic it will use when importing scene files when no specific setting exists.
* A step above the baseline, there are some soft naming conventions in use that will override default settings. For example, a node with the suffix "_lod1" on it will be treated as a level of detail mesh.
* The next priority for tracking scene import settings is the source asset info file, a file that sits next to the source scene file, with the same name but `.assetinfo` appended. For example, `myCharacter.fbx.assetinfo` would be the scene settings file for `myCharacter.fbx`.
* Some jobs, usually from the [Python Asset Builder](/docs/user-guide/assets/builder/), can output a procedurally generated asset info file. Procedural asset info files take priority over user generated source asset info files. This is because the procedural system can read the source file as part of the generation and choose to include the source settings or skip them.
* When the scene file is being processed, there is a point where Python scripts can be called to additionally modify the scene settings loaded in memory. This is highest priority because this same logic could read the current settings and choose which to preserve and which settings to override.

The source Scene Settings tracked in the `.assetinfo` file is best edited with the [Scene Settings tool](/docs/user-guide/assets/scene-settings/interface) within the O3DE Editor.

## Scene Settings topics

The topics in this section provide general information about the Scene Settings interface, product asset output types and modifiers that you can use to customize how 3D scene source assets are processed.

| Topic | Description |
| - | - |
| [Scene format support](scene-format-support) | In depth information on scene data supported in O3DE, as well as considerations when creating source assets. |
| [Interface](interface) | An overview of the Scene Settings interface and the options it displays based on the contents of source assets. |
| [Meshes](meshes-tab) | An explanation of the **Meshes** tab, and the modifiers you can add to customize mesh product asset generation. |
| [Actors](actors-tab) | An explanation of the **Actors** tab, and the modifiers you can add to customize actor product asset generation. |
| [Motions](motions-tab) | An explanation of the **Motions** tab, and the modifiers you can add to customize motion product asset generation. |
| [PhysX](physx-tab) | An explanation of the **PhysX** tab, and how to customize the generation of PhysX collider meshes and collider product assets. |
