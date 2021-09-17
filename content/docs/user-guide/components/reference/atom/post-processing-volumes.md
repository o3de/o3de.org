---
title: Post Processing Volume Components
linktitle: Post Processing Volumes
description: 'Open 3D Engine (O3DE) Post Processing Volume components.'
toc: true
---

Post processing volumes allow post-processing effects (PostFX) to be bounded in certain shapes and areas in the game. Open 3D Engine (O3DE) provides various post processing volume components that allow you to control the weight of PostFX components, such as Bloom, Deferred Fog, and Depth of Field.

## Components

| Component | Description | 
| - | - |
| [**PostFX Gradient Weight Modifier**](/docs/user-guide/components/reference/atom/postfx-gradient-weight-modifier/) | Modifies the weight of PostFX based on another entity's gradient signal. |
| [**PostFX Layer**](/docs/user-guide/components/reference/atom/postfx-layer/) | Controls how PostFX are applied in a scene. |
| [**PostFX Shape Weight Modifier**](/docs/user-guide/components/reference/atom/postfx-shape-weight-modifier/) | Limits PostFX to a volume of space that's defined by a **Shape** component. The PostFX's weight remains constant within the volume, and it begins to fade outside of the volume.|
| [**PostFX Radius Weight Modifier**](/docs/user-guide/components/reference/atom/radius-weight-modifier/) | Modifies the weight of PostFX based on the camera's distance to the center. |