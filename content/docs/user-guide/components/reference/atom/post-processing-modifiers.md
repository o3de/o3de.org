---
title: Post-processing Modifier Components
linktitle: Post-processing Modifiers
description: 'Open 3D Engine (O3DE) Post-Processing Modifier components.'
toc: true
---

Post-processing effects (PostFX) such as **Bloom** and **Depth of Field** are controlled in **Open 3D Engine (O3DE)** by PostFX modifier components. With PostFX modifier components, you can assign PostFX to layers and define their volume, area, and weight by shape, gradient, or radius. In O3DE, this set of configurations is known as a *PostFX volume*. A PostFX volume describes an entity that contains a PostFX Layer component, a PostFX modifier component, and a shape.


## Components

| Component | Description | 
| - | - |
| [**PostFX Layer**](/docs/user-guide/components/reference/atom/postfx-layer/) | Controls how PostFX modifiers are applied in a scene. The PostFX modifier components below require a PostFX Layer.|
| [**PostFX Gradient Weight Modifier**](/docs/user-guide/components/reference/atom/postfx-gradient-weight-modifier/) | Modifies the weight of PostFX based on a gradient provided by another entity. |
| [**PostFX Shape Weight Modifier**](/docs/user-guide/components/reference/atom/postfx-shape-weight-modifier/) | Defines a volume by using a **Shape** component and modifies the weight of PostFX within the volume. The PostFX's weight remains constant within the volume and begins to fall off outside of the volume.|
| [**PostFX Radius Weight Modifier**](/docs/user-guide/components/reference/atom/postfx-radius-weight-modifier/) |  Defines a sphere based on a radius from the origin of the entity and modifies the weight of PostFX based on the camera's position within the radius. |


## Tutorials

[Post-processing Effects in Open 3D Engine](/docs/learning-guide/tutorials/postfx/)