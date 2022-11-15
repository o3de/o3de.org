---
linkTitle: Scene Settings
title: Scene Settings
description: Learn to navigate the Scene Settings interface to customize how source assets are processed. 
weight: 200
toc: true
---

With **Scene Settings**, you can specify what data is processed from 3D scene source assets, and add modifiers to customize how the data is processed for **Open 3D Engine (O3DE)**. Scene settings provides tabs with options for **Meshes**, **Actors**, **Motions**, and **PhysX** colliders. The Scene Settings interface presents tabs based on the types of data that are detected in the selected source asset file.

{{< image-width "/images/user-guide/assets/scene-settings/scene-settings-interface.png" "650" "The Scene Settings user interface." >}}

## Source and product assets

In Scene Settings you can specify any number of meshes, actors, PhysX colliders, and motions to process from a single source asset. Source assets often generate multiple product assets. A mesh group, for example, can generate an `.azmodel` product asset, several `.azlod` product assets, and multiple `.azbuffer` product assets for the `.azmodel` and `.azlod` product assets. Depending on the selected modifiers and options, a single static mesh group can generate dozens of product assets.

You can see the product assets by expanding the asset list of a source asset in **Asset Browser**. In the image below, `Lucy_High.fbx` is the source asset and the assets contained within the highlighted box are all product assets of `Lucy_High.fbx`

{{< image-width "/images/user-guide/assets/scene-settings/asset-browser-product-assets.png" "650" "An expanded list of product assets in Asset Browser." >}}

## Using Scene Settings

Scene Settings operates on one source asset at a time. To open Scene Settings, use the steps below:

1. In **O3DE Editor**, in Asset Browser, select the 3D scene source asset to modify. You can use the search bar at the top of Asset Browser to filter the list.

1. **Right-click** the 3D scene source asset and then choose **Edit Settings...**.

{{< image-width "/images/user-guide/assets/scene-settings/asset-browser-edit.png" "650" "Open Scene Settings from a selected 3D scene source asset in Asset Browser." >}}
<!-- Don't remove the newline below. -->
\
{{< note >}}
O3DE integrates [Open Asset Import Library](https://github.com/assimp/assimp) to parse 3D scene source assets with support for `.fbx`, `.stl`, and `.gltf` enabled by default. If you want to experiment with other [scene formats](https://github.com/assimp/assimp/blob/master/doc/Fileformats.md) supported by Open Asset Import Library, you can edit the `o3de/Registry/sceneassetimporter.setreg` settings file and add format extensions to the `"SupportedFileTypeExtensions":` list. When you add a new format extension, the **Edit Settings...** option appears in the context menu for that source asset format.
{{< /note >}}

## The `.assetinfo` sidecar file

The asset groups you create, the modifiers you add, and the options you set in Scene Settings are all saved to a `.assetinfo` sidecar file when you choose **Update** on the bottom right of the Scene Settings interface. Asset Processor recognizes the sidecar file as a source dependency for the source asset, and automatically processes the source asset when the `.assetinfo` file is created or updated.

You can create, for example, a 3D scene source asset that contains plants of different types and sizes, with skinned meshes and LODs, and then use Scene Settings to specify mesh groups, actors, motions, and PhysX colliders for each plant contained in the source asset. The information needed to process all the plants is contained in a single `.assetinfo` file. It's important to understand that if you choose to process many product assets from a single source asset, a change to any aspect of the source asset or its dependencies will automatically reprocess everything contained in the source asset.

The `.assetinfo` sidecar file is formatted with JSON, is human-readable, and can be easily generated and modified through automated processes such as a Python script.

## Scene Settings tabs

There are four tabs in Scene Settings: **Meshes**, **Actors**, **Motions**, and **PhysX**. Each tab provides modifiers and options specific to processing data of that type. The tabs that are displayed for a particular source asset depend on the contents of the source asset. The table below provides links to topics for each tab, and the data required in the source asset to make the tab available in Scene Settings' interface.

| Tab | Description | Requirements |
| - | - | - |
| [Meshes](meshes-tab) | Create mesh groups and modify process job settings for meshes. Mesh processing generates `.azmodel`, `.azlod`, and `.azbuffer` product assets. | The source asset must contain at least one mesh. |
| [Actors](actors-tab) | Create actor groups and modify process job settings for actors. An actor is any source asset (not necessarily a character). Actor processing generates `.actor` and `.skinmeta` product assets. | The source asset must contain at least one bone and a skinned mesh. |
| [Motions](motions-tab) | Create and modify process job settings for motions (animation). Motion processing generates `.motion` product assets. | The source asset must contain a skeleton with keyframe animation. |
| [PhysX](physx-tab) | Create PhysX mesh groups and modify process job settings for PhysX colliders. PhysX processing generates `.pxmesh` product assets. | The source asset must contain at least one mesh. The **PhysX Gem** must be enabled for your project to process and use PhysX colliders. |

