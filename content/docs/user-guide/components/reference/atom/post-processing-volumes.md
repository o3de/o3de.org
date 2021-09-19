---
title: Post-processing Volume Components
linktitle: Post-processing Volumes
description: 'Open 3D Engine (O3DE) Post-Processing Volume components.'
toc: true
---

Post-processing volumes allow post-processing effects (PostFX) to be bounded in certain shapes and areas in the game. Open 3D Engine (O3DE) provides various post processing volume components that allow you to control the weight of PostFX components, such as Bloom, Deferred Fog, and Depth of Field.

## Components

| Component | Description | 
| - | - |
| [**PostFX Gradient Weight Modifier**](/docs/user-guide/components/reference/atom/postfx-gradient-weight-modifier/) | Modifies the weight of PostFX based on another entity's gradient signal. |
| [**PostFX Layer**](/docs/user-guide/components/reference/atom/postfx-layer/) | Controls how PostFX are applied in a scene. |
| [**PostFX Shape Weight Modifier**](/docs/user-guide/components/reference/atom/postfx-shape-weight-modifier/) | Limits PostFX to a volume of space that's defined by a **Shape** component. The PostFX's weight remains constant within the volume, and it begins to fade outside of the volume.|
| [**PostFX Radius Weight Modifier**](/docs/user-guide/components/reference/atom/radius-weight-modifier/) | Modifies the weight of PostFX based on the camera's distance to the center. |


## Usage

This section demonstrates how to set up a post-processing volume to control the weight of PostFX in other entities. In this example, the main camera's exposure is controlled by a post-processing volume. When it moves in and out of the volume, the camera's exposure changes.

Whenever you use post-processing volumes, you need two entities: one that defines the PostFX volume and one that defines a PostFX. In this example, you will set up the following entities:

- **Camera**: This is the main camera in the scene. It contains an **Exposure Control** component, which adjusts the amount of light that the camera exposes in the scene.

- **PostFX Volume**: An entity that contains the PostFX component that you want it to control and the PostFX volume component that controls the weight of the PostFX. In this example, it contains Exposure Control and **PostFX Shape Weight Modifier** components.

To use post-processing volumes: 

1. In **O3DE Editor**, create a default level.
2. For the Camera entity:
   - Add the **Exposure Control** component and set **Manual Compensation** property to `1.0`. 

3. For the PostFX Volume entity:
    - Add the **PostFX Weight Modifier** and **PostFX Layer** components. This configures how the PostFX Volume controls the weight of a PostFX. 
    - In the PostFX Layer component, set the Layer Category property to `Volume` or `Camera` so the weight modifier will function. 
    - Add the Exposure Control component and set the Manual Compensation property to `-3.5`. This will darken the Camera entity's exposure when it's within the volume.


4. Run the level and observe how the exposure changes when flying the camera in and out of the PostFX Volume.

The image series below demonstrates how PostFX volumes work in this example. As shown on the left, when the camera is outside of the volume, the scene appears bright. On the right, when the camera enters the volume, the scene darkens.

![Using PostFX Volumes](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-example.png)
