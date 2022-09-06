---
title: "Rendering"
toc:
---

Open 3D Engine's (O3DE) graphics features are integrated using the Atom renderer, a high performance, physically based rendering engine. Atom provides the following features:

* Ray tracing to produce detailed, authentic environments.
* Physically based rendering to achieve real-world lighting.
* Modern post-processing effects to enhance the game experience.
* Forward+ rendering, with support for deferred rendering in the future. 
  

Atom has a unified interface which supports multiple platforms and graphics APIs:
* DirectX 12 or Vulkan on Windows
* Metal on macOS and iOS
* Vulkan on Linux

The following sections in the Atom guide provide more detail about the graphics features in O3DE. 

| Feature | Description |
| - | - |
| [Materials](/docs/atom-guide/dev-guide/materials/) | Create PBR materials with global illumination support using Atom's Material Editor. |
| [Shaders](/docs/atom-guide/dev-guide/shaders/) | Create shaders using Atom's shading language, AZSL. |
| [Atom Gem Components](/docs/user-guide/components/reference/#atom) | Add mesh, lighting, and a variety of post-processing effects using components provided by the Atom Gem. |
| Particles | Produce particle effects using [PopcornFX](https://www.popcornfx.com/o3de/) integrated into Atom. |
