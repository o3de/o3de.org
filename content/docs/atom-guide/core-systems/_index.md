---
title: "Developer Guide"
description: "Learn about the systems and interfaces behind the Atom renderer"
toc: true
weight: 1000
---  

{{< preview-new >}}

This section provides a deeper technical read into the systems and interfaces underlying the Atom renderer. 

| Contents                        | Details |
|--------------------------------------|---------|
| [Frame Rendering](frame-rendering.md) | The frame rendering process describes how a scene is processed from Render Components, through Render Passes in the RPI, and to the RHI. |
| [Material System](materials/_index.md) | The material system processes materials and material types and builds them into assets to use in the simulation. |
| [Shader System](shaders/_index.md) | The shader system processes AZSL shaders and builds them into shader assets that can be used in the simulation. This section also contains the AZSL Reference.  |
| [Render Pipeline Interface (RPI)](rpi/_index.md) | The Render Pipeline Interface (RPI) contains the main interface for developers to program the render pipeline. |
| [Rendering Hardware Interface (RHI)](rhi/_index.md) | The Rendering Hardware Interface (RHI) provides a low-level interface that abstracts platform-specific code. |
