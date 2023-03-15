---
linkTitle: Scene Source Assets
title: Create and Process Scene Source Assets
description: With Scene Settings, you can set custom processing options for meshes, actors, motions, and PhysX colliders.
weight: 400
toc: true
---

Assets can be created in any content creation program that can export to a [file format](../asset-types) supported by **Open 3D Engine's (O3DE)** [Asset Pipeline](../asset-pipeline). This section focus on *scene source assets*, which are 3D meshes and animations created in applications such as Blender or Maya.

## Source and product assets

*Scene source assets* (meshes, actors, motions, and PhysX colliders) that are created in digital content creation (DCC) applications must be processed as runtime optimized *product assets* to be used in your project. To provide the broadest support for DCC applications and scene file formats, O3DE integrates the [Open Asset Import Library](https://github.com/assimp/assimp). O3DE uses `.fbx` as its primary format for scene source assets. O3DE also supports `.stl`, and support for `.gltf` is enabled and currently in development.

## Scene settings

When source assets are placed in a scan directory, [Asset Processor](../../assets/asset-processor) detects the new or modified files, determines the contents of the files, and then processes the data using *scene settings* that tell Asset Processor how to process the files.

Scene settings can come from several places:

* Default scene settings logic exists for all supported asset types. Asset Pipeline uses this default logic to process scene files when no other settings exist.
* Soft naming conventions on the mesh and skeleton nodes in the source asset can be used to override the default logic. For example, a node with the suffix `_phys` is treated as a collision mesh.
* User generated `.assetinfo` files override the default logic, and can override soft naming conventions. These sidecar files have the same name as their relative source asset file, but have a `.assetinfo` extension. For example, `myCharacter.fbx.assetinfo` contains the scene settings for `myCharacter.fbx`. User generated `.assetinfo` files are created with the [Scene Settings](scene-settings) tool.
* Some jobs output procedurally generated `.assetinfo` files as part of asset processing. These files take priority over user generated `.assetinfo` files because the procedural system can read the source file when generating scene settings and choose to override them.
* Python scripts can be called to modify the scene settings loaded in memory when an asset is processed. This can override all other scene settings, because the script can read the scene settings provided through any other method and modify them.

## Scene source assets topics

The topics in this section provide general information about creating scene source assets and the Scene Settings tool that you can use to customize how scene source assets are processed.

| Topic | Description |
| - | - |
| [Scene format support](scene-format-support) | In depth information on scene data supported in O3DE. |
| [Best Practices](source-asset-best-practices) | Best practices for scene source assets created in DCC applications to be processed for O3DE. |
| [Scene Settings](scene-settings) | Documentation on the Scene Settings tool that you can use to customize how individual scene source assets are processed. |
| [Interface](interface) | An overview of the Scene Settings interface and the options it displays based on the contents of source assets. |
| [Meshes](meshes-tab) | An explanation of the **Meshes** tab, and the modifiers you can add to customize mesh product asset generation. |
| [Actors](actors-tab) | An explanation of the **Actors** tab, and the modifiers you can add to customize actor product asset generation. |
| [Motions](motions-tab) | An explanation of the **Motions** tab, and the modifiers you can add to customize motion product asset generation. |
| [PhysX](physx-tab) | An explanation of the **PhysX** tab, and how to customize the generation of PhysX collider meshes and collider product assets. |
