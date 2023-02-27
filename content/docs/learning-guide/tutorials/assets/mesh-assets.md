---
linkTitle: Mesh Processing
title: Customize Mesh Asset Processing
description: Learn to customize how mesh assets are processed for Open 3D Engine (O3DE) with Scene Settings.
weight: 200
toc: true
---

This tutorial demonstrates how to use [**Scene Settings**](/docs/user-guide/assets/scene-settings/scene-settings) to customize mesh asset processing for **Open 3D Engine (O3DE)**. You can use any mesh for this tutorial. The primary 3D scene format supported by O3DE is `.fbx`, so it's recommended to use a simple mesh asset saved to a `.fbx` file for this tutorial. If you don't have your own source asset, you can use one of the assets provided with O3DE.

{{< note >}}
Understanding the [best practices](/docs/user-guide/assets/scene-settings/source-asset-best-practices#meshes) for creating mesh source assets can mitigate issues you might encounter when processing meshes for O3DE. For technical details about the data supported by meshes, refer to the [supported 3D scene data](/docs/user-guide/assets/scene-settings/scene-format-support#supported-3d-scene-data) table.
{{< /note >}}

| O3DE Experience | Time to Complete | Feature Focus | Last Updated |
| - | - | - | - |
| Beginner | 10 Minutes | Customized processing of mesh assets from `.fbx` files with Scene Settings. | January 4, 2023 |

## Preparation

Place your mesh `.fbx` source asset in a [scan directory](/docs/user-guide/assets/pipeline/scan-directories) for your project, such as the `Assets` subdirectory, so it can be detected by [**Asset Processor**](/docs/user-guide/assets/asset-processor).

## Processing a mesh asset

When you placed your mesh `.fbx` source asset in your project's `Assets` directory, Asset Processor detected the asset, examined its contents, and processed it with a default set of rules. To customize the rules that process the mesh asset, do the following:

1. In **O3DE Editor** locate your asset in **Asset Browser**. If you don't have an asset of your own, you can type `fbx` into the search field at the top of Asset Browser and use one of the `.fbx` files included with O3DE.

    ![ Search for a specific mesh asset in Asset Browser. ](/images/learning-guide/tutorials/assets/meshes-search-asset-browser.png)

    If your asset has already been processed, you might see a preview image of the asset, and a list of product assets below the `.fbx` source asset.

1. **Double-click** the `.fbx` source asset and choose **Edit Settings...** from the context menu to open Scene Settings.

    ![ Open Scene Settings from Asset Browser. ](/images/learning-guide/tutorials/assets/meshes-edit-settings.png)

1. Select the [**Meshes**](/docs/user-guide/assets/scene-settings/meshes-tab) tab.

    ![ Scene Settings meshes tab. ](/images/learning-guide/tutorials/assets/meshes-scene-settings.png)

    In the preceding image, there is a single **Mesh group**. By default, all the meshes in a source asset are processed as a single mesh group. Each mesh group produces a set of product assets. You can create additional mesh groups by choosing **Add another mesh**.

    The **Name mesh** property contains the name of the source asset. All product assets of this mesh group use this string as a prefix for their name. When there are multiple mesh groups, the product assets appear in Asset Browser beneath the source asset and are organized by mesh group name.

    The **Select meshes** property reads **All meshes selected**. You can choose the {{< icon browse-edit-select-files.svg >}} **node select** button to select which meshes to include in the mesh group.

1. Add a modifier to customize how the asset is processed. Choose the **Add Modifier** button to view the mesh modifier list and select [**Coordinate system change**](/docs/user-guide/assets/scene-settings/meshes-tab#coordinate-system-change).

    ![ Scene Settings meshes tab, adding mesh a modifier. ](/images/learning-guide/tutorials/assets/meshes-coordinate-system-change.png)

1. The Coordinate system change mesh modifier is used to scale or transform the asset for those scenarios where the asset might be too small, too large, or incorrectly oriented in O3DE. By default, the modifier provides a single option to rotate the mesh 180 degrees. Activate the **Use advanced settings** toggle to expose the advanced modifier settings.

    ![ Scene Settings meshes Coordinate system change modifier, Use advanced settings. ](/images/learning-guide/tutorials/assets/meshes-use-advanced-settings.png)

1. Customize the scale of the asset. Set the **Scale** property to `5.0` to scale the asset to five times its size.

1. Choose the **Update** button at the bottom-right of Scene Settings. This creates or updates the `.assetinfo` sidecar file and triggers Asset Processor to reprocess the asset.

    When Asset Processor detects a `.assetinfo` file, it uses the settings in the file to process the related source asset. This sidecar file is treated as a source dependency for the asset. This means that if the `.assetinfo` file is changed, the source asset will be reprocessed even if the source asset has not changed.

1. Drag the `.azmodel` product asset from Asset Browser into the viewport.

    {{< image-width "/images/learning-guide/tutorials/assets/meshes-finished.png" "800" "Drag the mesh product asset into the viewport">}}

    When you drag the asset into the viewport, O3DE automatically creates an entity with a **Mesh** component that references the mesh product asset. If the source asset contains materials that have been processed, the materials are applied to the mesh by automatically.
