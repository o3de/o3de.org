---
linkTitle: Actor Processing
title: Customize Actor Asset Processing
description: Learn to customize how actor assets are processed for Open 3D Engine (O3DE) with Scene Settings.
weight: 300
toc: true
---

This tutorial demonstrates how to use [**Scene Settings**](/docs/user-guide/assets/scene-settings/scene-settings) to customize actor asset processing for **Open 3D Engine (O3DE)**. An actor contains one or more meshes bound to a skeleton. You can use any actor asset for this tutorial. The primary 3D scene format supported by O3DE is `.fbx`, so it's recommended to use an actor asset saved to a `.fbx` file. If you don't have your own actor source asset, you can use a character asset from a provider such as [Mixamo](https://www.mixamo.com/#/?page=1&type=Character).

{{< note >}}
Understanding the [best practices](/docs/user-guide/assets/scene-settings/source-asset-best-practices#actors) for creating actor source assets can mitigate issues you might encounter when processing actors for O3DE. For technical details about the data supported by actors, refer to the [supported 3D scene data](/docs/user-guide/assets/scene-settings/scene-format-support#supported-3d-scene-data) table.
{{< /note >}}

| O3DE Experience | Time to Complete | Feature Focus | Last Updated |
| - | - | - | - |
| Beginner | 10 Minutes | Customized processing of actor assets from `.fbx` files with Scene Settings. | January 4, 2023 |

## Preparation

Place your actor `.fbx` source asset in a [scan directory](/docs/user-guide/assets/pipeline/scan-directories) for your project, such as the `Assets` subdirectory, so it can be detected by [**Asset Processor**](/docs/user-guide/assets/asset-processor).

## Processing an actor asset

When you placed your actor `.fbx` source asset in your project's `Assets` directory, Asset Processor detected the asset, examined its contents, and processed it with a default set of rules. These default rules might be sufficient for simple actor assets, however, actors often require additional processing for custom normals and tangents, cloth meshes, root motion extraction, or coordinate space changes. To customize the rules that process the actor asset, do the following:

1. In **O3DE Editor**, locate your asset in **Asset Browser**. You can type the name of the asset into the search field at the top of Asset Browser to filter the list and locate your actor asset.

    ![ Search for a specific mesh asset in Asset Browser. ](/images/learning-guide/tutorials/assets/actor-search-asset-browser.png)

    If your asset has already been processed, you might see a preview image of the asset, and a list of product assets below the `.fbx` source asset.

1. **Double-click** the `.fbx` source asset and choose **Edit Settings...** from the context menu to open Scene Settings.

    ![ Open Scene Settings from Asset Browser. ](/images/learning-guide/tutorials/assets/actor-edit-settings.png)

1. Select the [**Meshes**](/docs/user-guide/assets/scene-settings/meshes-tab) tab.

    ![ Scene Settings meshes tab. ](/images/learning-guide/tutorials/assets/actor-mesh-scene-settings.png)

    In the preceding image, there is one **Mesh group** in the **Meshes** tab. A mesh group produces a runtime optimized mesh asset. By default, all the meshes in the source asset are selected for the mesh group and are processed as a single mesh.

    Additional mesh groups can be created by choosing **Add another mesh**. However, an actor entity can only have one mesh component. All of the actor's meshes - which is to say, all the meshes that are bound to the actor's skeleton - must be included in a single mesh group. The actor in this example has one mesh, though it's common for actors to have many unique meshes.

    The following table explains the important elements of the default mesh group for actors:

    | Element | Description |
    | --- | --- |
    | **Name mesh** | This property is the name of the mesh group. All product assets of this mesh group use this string as a prefix for their name. The product assets appear in Asset Browser beneath the source asset. By default, the name of the source scene file is used. |
    | **Select meshes** | The meshes selected for processing as part of the mesh group. Choosing the {{< icon browse-edit-select-files.svg >}} **node select** button allows you to select which meshes from the `.fbx` source asset to include in the mesh group. By default, all meshes in the `.fbx` source asset are selected. |
    | **Skin** | The [Skin](/docs/user-guide/assets/scene-settings/meshes-tab/#skin) modifier is automatically added for meshes that are bound to a skeleton. The Skin modifier sets the max weights per vertex for the mesh, and the weight threshold for bone influences. The **Max weights per vertex** property has a default value of `8`, so that up to 8 bones can influence each vertex in the mesh. The default **Weight threshold** is `0.001`. Any vertex weights that are lower than the threshold value are ignored. |
    | **Material** | The [Material](/docs/user-guide/assets/scene-settings/meshes-tab/#material) modifier is automatically added to mesh groups. With the Material modifier, you can choose to update the materials for the processed actor, and remove unused materials that might have been previously processed for the actor. |

    {{< note >}}
If your actor has custom normals and materials that use normal maps, you might need to add [**Mesh (Advanced)**](/docs/user-guide/assets/scene-settings/meshes-tab/#mesh-advanced) and [**Tangents**](/docs/user-guide/assets/scene-settings/meshes-tab/#tangents) modifiers as well. To learn more about mesh modifiers, refer to the [Meshes Tab](/docs/user-guide/assets/scene-settings/meshes-tab) topic in the User Guide.
    {{< /note >}}

1. Choose the {{< icon browse-edit-select-files.svg >}} file select button to view and select which meshes to include in the actor's mesh group.

    ![ Select meshes for actor. ](/images/learning-guide/tutorials/assets/select-actor-mesh.png)

1. In the **Select nodes** dialog, select only the mesh nodes required by the actor. Mesh nodes are denoted by a mesh icon. Choose **Select** to complete the selection.

1. Select the [**Actors**](/docs/user-guide/assets/scene-settings/actors-tab) tab to specify the root joint of the actor's skeleton.

    ![ Select the Actors tab. ](/images/learning-guide/tutorials/assets/actors-tab.png)

    In the preceding image, there is a single **Actor group**.

    The **Name actor** property is the name of the actor group. All product assets of this actor group use this string as a prefix for their name. The product assets of this actor group appear in Asset Browser beneath the source asset. By default, the name of the source scene file is used.

    The **Select root bone** property specifies the root bone of the skeleton to process for the actor.

1. Click the **Select root bone** property to expose the list of bones. From the list, select the root bone of the skeleton.

    ![ Specify the root bone for the actor. ](/images/learning-guide/tutorials/assets/select-actor-root.png)

    {{< note >}}
The first node in the list is the scene root node, not the root of the skeleton. Make sure the bone you select is the root bone of the actor's skeleton. The skeleton root bone is critical for animation and root motion. For more information, refer to the [Data Driven Root Motion](/docs/learning-guide/tutorials/animation/data-driven-root-motion) tutorial.
    {{< /note >}}

1. Choose **Update** to save the customized settings for the actor. The asset is immediately reprocessed with the new settings.

1. Locate the actor product asset in Asset Browser and drag the actor into the viewport to create an entity for the actor.

    ![ Drag the actor from Asset Browser to create an actor entity. ](/images/learning-guide/tutorials/assets/actor-entity-instance.png)

    In **Entity Inspector**, note that the entity contains a single **Actor** component that references the actor product asset that you dragged into the viewport.

    ![ Actor entity in Entity Inspector. ](/images/learning-guide/tutorials/assets/actor-entity-components.png)
