---
title: "Rendering"
toc:
---

{{< preview-new >}}

Open 3D Engine's graphics features are integrated using the Atom renderer, a high performance, physically based rendering (PBR) engine. Atom provides advanced graphics techniques, such as ray tracing to produce authentic environments, PBR to achieve real-world lighting, and modern post-processing effects to enhance the game experience. Atom currently supports Forward+ rendering, and is designed to support deferred rendering in the future. Atom supports multiple platforms: Windows, Linux, Mac, Android, and iOS. Atom also provides a unified interface across multiple graphics APIs: DirectX 12, Vulkan, and Metal. 

The following sections go into detail the graphics features in O3DE. 
| Feature | Description |
| - | - |
| [Materials](/docs/atom-guide/materials/_index.md) | Create PBR materials with global illumination support using Atom's Material Editor. |
| [Shaders](/docs/atom-guide/core-systems/shaders) | Create shaders using Atom's shading language, AZSL. |
| [Atom Gem Components](/docs/user-guide/components/reference/atom/index.md) | Add mesh, lighting, and a variety of post-processing effects using components provided by the Atom Gem. |
| Particles | Produce particle effects using [PopcornFX](https://www.popcornfx.com/) integrated into Atom. |