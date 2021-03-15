---
title: "What is Atom?"
description: "What is Atom Renderer?"
date: 2021-03-04
toc: false
weight: 110
---

{{< preview-new >}}

# What is Atom?

Atom is a modular, data-driven, and multi-threaded rendering engine. With Atom, you can create content using the latest rendering technology. Atom supports modern rendering pipelines such as Forward+ and Deferred rendering. Its rendering pipeline is fully data driven, enabling developers to modify or replace key components with minimal code change. Atom’s multi-threading support allows rendering features to run parallel on both the CPU and GPU, taking advantage of all computing resources. Atom is built on multiple industry-standard 3D graphics APIs and features a modular design that makes it easy to expand support for additional platforms. 

Atom also has the following advantages: 
* High-level APIs wrapping platform-dependent implementations. Developers can add or customize features without having to touch low-level code or understand platform graphics libraries.
* Optimized cluster forward+ shading model. Each process of the shading model is componentized into discrete passes, allowing flexibility to adopt future shading models.
* Modular design. The renderer's structure is separated into discrete units, allowing developers to move to a different shading model such as a full physically based or toon-based shading model. 

## Rendering pipeline

![Atom Architecture](/images/atom-guide/what-is-atom/atom-architecture.svg)

Atom’s rendering pipeline is split into several core systems, each communicating with one another to use the power of the GPU to process and display graphics onto the screen. The architecture of the rendering pipeline includes the Rendering Hardware Interface (RHI), the Render Pipeline Interface (RPI), and the graphics features. 

The Atom architecture is designed for modularity, allowing developers to activate only the graphics features that they need. The architecture also allows developers to easily build additional graphics features on top of the RPI. Understanding the fundamental concepts underlying Atom’s architecture is advantageous across many roles -- whether you're designing materials, livening your 3D environment with graphics features, or displaying your project across multiple views. 


**RHI**  
The RHI is at the lower level of the rendering pipeline. It talks directly to different graphics APIs and hardware. It provides an abstract layer of APIs to expose the GPU's functionality so high-level graphics features don't need to use platform-specific graphics APIs. For more information on the RHI, see [RHI](core-systems/rhi/_index.md).

**RPI**  
The RPI is the data-driven layer that makes the rendering pipeline customizable. The RPI also defines fundamental graphics assets such as images, materials, and shaders. Furthermore, it defines the Feature Processors that implement most of the high-level graphics features and enable their interaction with the render pipeline. When making changes to the rendering pipeline or adding and editing features, developers and engineers work with the RPI API (C++ and JSON). For more information on the RPI, see [RPI](core-systems/rpi/_index.md).

**Shader and Materials**  
In Atom, shaders are written in the Amazon Shading Language (AZSL), an extended version of HLSL. Shaders are compiled by the AZSL compiler. Then, materials reference these shaders, which ultimately describes how to render a mesh. For more information on shaders and materials, see [Shader System](core-systems/shaders/_index.md) and [Material System](core-systems/materials/_index.md).

**Features**  
As a part of the renderer, Atom provides built-in graphics features. Most graphics features are implemented using Feature Processor interfaces, which are defined in the RPI. For example, the RPI defines the Mesh Feature Processor, which implements static and dynamic meshes. Other features (like physically based rendering) live outside of feature processors and are instead implemented through passes and shaders. Atom integrates many features into Open 3D Engine (O3DE) through the Atom Gem, introducing components such as lighting, camera, and mesh. For more information on the features, see [Features and Feature Processors](core-systems/features/_index.md). 


## Common Workflows
Atom can elevate your project’s rendering capabilities and energize you and your whole team to push the limits of creation and innovation. Depending on your role, here are some common workflows that you’ll encounter when working with Atom:

* **Technical artists** can use Atom to create new materials easily through the Material Editor application, or with more control and detail through JSON files. With Atom’s raytracing technology and physically based rendering materials, artists can create accurate, real-life materials. 

* **Game developers** can use Atom’s collection of rendering features to enhance many aspects of their game such as lighting, mesh rendering, and post-processing effects. Atom is integrated into O3DE, a game engine where game developers can create AAA games. 

* **Rendering engineers** can configure Atom’s rendering pipeline, add new rendering passes, and create new rendering features using Atom’s C++ API. 


## First Steps  
Ready to get started? These first steps will get you up and running with Atom.

**1. Set up and install**  
Set up and install Atom on PC, Android, Mac, and iOS platforms. You can begin exploring Atom’s features and capabilities through its built-in BaseViewer application or the O3DE Editor.

For more information on setting up and installing Atom, see [Setup and Installation](setup/_index.md).

**2. Begin creating with Atom**  
You can learn more about Atom in the following sections of this guide. 

<!-- * **[Get Started](../get-started/_index.md)**: Explore materials and shaders in Atom, or set up a 3D environment with Atom's rendering features in O3DE. -->
* **[Atom Sample Viewer](atom-sample-viewer/_index.md)**: Preview Atom’s rendering features through a series of samples, such as global illumination and multi-scene rendering. 
<!-- * **[Tutorials](../tutorials/_index.md)**: Interact with a collection of tutorials on rendering with Atom. -->
* **[Atom Core Systems](core-systems/_index.md)**: Dive into Atom’s rendering pipeline and learn about its core systems and how they work together. 