---
title: Overview
description: An overview of the Atom Renderer in Open 3D Engine (O3DE).
toc: false
weight: 110
---

Atom is a modular, data-driven, and multi-threaded rendering engine. With Atom, you can create content using the latest rendering technology. Atom supports modern rendering pipelines such as Forward+ and Deferred rendering. Its rendering pipeline is fully data driven, enabling developers to modify or replace key components with minimal code change. Atom's multi-threading support allows rendering features to run parallel on both the CPU and GPU, taking advantage of all computing resources. Atom is built on multiple industry-standard 3D graphics APIs and features a modular design that makes it easy to expand support for additional platforms. 

Atom also has the following advantages: 
* High-level APIs wrapping platform-dependent implementations. Developers can add or customize features without having to touch low-level code or understand platform graphics libraries.
* Optimized cluster forward+ shading model. Each process of the shading model is componentized into discrete passes, allowing flexibility to adopt future shading models.
* Modular design. The renderer's structure is separated into discrete units, allowing developers to move to a different shading model such as a full physically based or toon-based shading model. 

![A scene with shader balls showcasing PBR materials and other graphics features rendered by Atom](/images/atom-guide/intro-to-atom.jpg)

## Rendering pipeline

Atom's rendering pipeline is split into several core systems, each communicating with one another to use the power of the GPU to process and display graphics onto the screen. The architecture of the rendering pipeline includes the Rendering Hardware Interface (RHI), the Render Pipeline Interface (RPI), and the graphics features.

The Atom architecture is designed for modularity, allowing developers to activate only the graphics features that they need. The architecture also allows developers to easily build additional graphics features on top of the RPI. Understanding the fundamental concepts underlying Atom's architecture is advantageous across many roles -- whether you're designing materials, livening your 3D environment with graphics features, or displaying your project across multiple views.

**RHI**  
The RHI is at the lower level of the rendering pipeline. It talks directly to different graphics APIs and hardware. It provides an abstract layer of APIs to expose the GPU's functionality so high-level graphics features don't need to use platform-specific graphics APIs. For more information on the RHI, see [RHI](dev-guide/rhi).

**RPI**  
The RPI is the data-driven layer that makes the rendering pipeline customizable. The RPI also defines fundamental graphics assets such as images, materials, and shaders. Furthermore, it defines the Feature Processors that implement most of the high-level graphics features and enable their interaction with the render pipeline. When making changes to the rendering pipeline or adding and editing features, developers and engineers work with the RPI API (C++ and JSON). For more information on the RPI, see [RPI](dev-guide/rpi).

**Shader and Materials**  
In Atom, shaders are written in the Amazon Shading Language (AZSL), an extended version of HLSL. Shaders are compiled by the AZSL compiler. Then, materials reference these shaders, which ultimately describes how to render a mesh. For more information on shaders and materials, see [Shader System](dev-guide/shaders) and [Material System](dev-guide/materials).

**Features**  
As a part of the renderer, Atom provides built-in graphics features. Most graphics features are implemented using Feature Processor interfaces, which are defined in the RPI. For example, the RPI defines the Mesh Feature Processor, which implements static and dynamic meshes. Other features (like physically based rendering) live outside of feature processors and are instead implemented through passes and shaders. Atom integrates many features into **Open 3D Engine (O3DE)** through the Atom Gem, introducing components such as lighting, camera, and mesh. For more information on the features, see [Features and Feature Processors](features).

![Atom Architecture](/images/atom-guide/what-is-atom/atom-architecture.png)

## Common Workflows
Atom can elevate your project's rendering capabilities and energize you and your whole team to push the limits of creation and innovation. Depending on your role, here are some common workflows that you'll encounter when working with Atom:

* **Technical artists** can use Atom to create new materials easily through the Material Editor application, or with more control and detail through JSON files. With Atom's raytracing technology and physically based rendering materials, artists can create accurate, real-life materials. 

* **Game developers** can use Atom's collection of rendering features to enhance many aspects of their game such as lighting, mesh rendering, and post-processing effects. Atom is integrated into O3DE, a game engine where game developers can create AAA games. 

* **Rendering engineers** can configure Atom's rendering pipeline, add new rendering passes, and create new rendering features using Atom's C++ API. 

## Get started with Atom

Get started with Atom Renderer through O3DE by [creating a new O3DE project](/docs/welcome-guide/create/) or building [Atom Sample Viewer](https://github.com/o3de/o3de-atom-sampleviewer), Atom's standalone application.
