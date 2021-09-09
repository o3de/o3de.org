---
linkTitle: Create a Level
title: Create a Level in Open 3D Engine
description: Learn to create a level in Open 3D Engine (O3DE).
weight: 200
toc: true
---

In Open 3D Engine (O3DE), a *level* is a playable section of a project. Within a level, you create entities, instantiate prefabs, arrange lights and cameras, and implement scripted behaviors and interactivity. A level can be interpreted literally as a level of a game, however, levels are the basis for all O3DE projects. Non-gaming applications such as a simulations require at least one level. A project can have a single level or many levels.

In O3DE, levels are stored in `.prefab` files within subdirectories of the `Levels` directory of your project. The level `.prefab` file is in JSON format and contains a list of the entities placed in the level, including the components, values, and asset references that define the entities. All assets including the meshes, scripts, materials, audio files, and other prefabs that compose the level are referenced within the level `.prefab` file.

{{< note >}}
By default all levels must be placed in the `Levels` subdirectory of the project.
{{< /note >}}

## Create a level

Levels can be created from the **Welcome to O3DE** dialog box that appears when **O3DE Editor** is launched, or from the **File** menu within O3DE Editor.

1. In the Welcome to O3DE dialog, choose the **Create new...** button to open the **New Level** dialog. Alternatively, from the **File** menu in O3DE Editor, choose **New Level** (hotkey **Ctrl + N**) to open the New Level dialog.

    ![Welcome to O3DE dialog](/images/learning-guide/tutorials/environments/create-a-level-A.png)

1. In the **New Level** dialog, enter a name for the level.

    ![New Level dialog](/images/learning-guide/tutorials/environments/create-a-level-B.png)

1. Choose **Ok** to create the level.

## Default Atom Environment contents

The new level is populated with some basic entities. In **Entity Outliner**, there is a root entity named **Atom Default Environment**. Click the arrow to the left of the default entity in Entity Outliner to expand the list of child entities.

{{< note >}}
The Atom Default Environment is a *prefab*. A prefab is a collection of preconfigured entities that is stored on disk as a reusable `.prefab` asset file. Prefabs can be instanced in a level. You can modify the contents of the default level environment by saving your own prefab to `/o3de/Assets/Editor/Prefabs/Default_Level.prefab`.
{{< /note >}}

![Default level prefab](/images/learning-guide/tutorials/environments/create-a-level-C.png)

| Entity Name | Description |
| - | - |
| Atom Default Environment | This is the root entity. It contains a **Transform** component and is the parent for the default environment entities. |
| Global Sky | Contains a **Global Skylight (IBL)** component and a **HDRI Skybox** component. This entity provides image based lighting using a high dynamic range image and displays the image as a skybox. |
| Ground | Contains a **Mesh** component and a **Material** component to display a simple ground plane with a checkerboard material. |
| Grid | Contains a **Grid** component aligned with the Ground entity that can be used as a construction plane for placing and aligning entities and prefabs. |
| Shader Ball | Contains a **Mesh** component with a `shaderball_default_1m` mesh asset. This mesh asset provides a good basis for developing materials. |
| Sun | Contains a **Directional Light** component. A directional light casts light uniformly in a single direction and simulates a distant light source. |
| Camera | Contains a **Camera** component that provides a camera view a frustum to view the level, and a **Fly Camera Input** component that takes user input and moves the camera while in **Game** mode. |