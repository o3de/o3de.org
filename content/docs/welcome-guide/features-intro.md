---
linktitle: Features
title: Open 3D Engine Features
description: ' Read about the high-level features provided with Open 3D Engine (O3DE). '
weight: 100
toc: true
---

{{< preview-new >}}

Open 3D Engine (O3DE) is an open source, cross-platform, 3D engine you can use to create high performance interactive experiences including games and simulations. O3DE has a suite of tools to build and process assets, simulate physics in real time, create animation and cinematics, and a physically based renderer, all wrapped in a modular framework that you can modify and extend with your preferred development tools.  

## Open source

O3DE is open source under the Linux Foundation. You can use the provided binaries and tools to build your own projects, or get the source code and extend it!

Visit [O3DE on GitHub](https://github.com/aws-lumberyard/o3de) to get the source code.

## Modular engine and components

Take only the bits your project needs! O3DE is composed of *Gems*, which are modules that contain libraries with standard interfaces and assets. Each system in O3DE is provided by its own Gem and you can pick and choose what functionality to add based on your requirements. You can also customize O3DE, or replace functionality entirely, with your own Gems!

O3DE supports Gems with precompiled binaries and libraries. Adding or removing precompiled Gems does not require you to recompile O3DE. Upgrading to new engine versions only requires that you recompile projects.

For more information, see [the O3DE Gems documentation](/docs/user-guide/gems).

## Build with familiar tools

O3DE uses [CMake](https://cmake.org/) for creating build files, dependency management, testing, and automated code generation. O3DE's build system has the following advantages:

* Your project is created for, and built with, your native IDE and toolchain.

* Proper dependency trees for build targets are created and maintained, keeping the build targets clean.

* Robust support for creating and running automated tests.

* Use debugging and profiling tools such as **Edit and Continue** when supported by compiler tools.

For more information, refer to [Get started with O3DE builds](/docs/user-guide/build/).

## Atom Physically Based Renderer

O3DE uses the [Atom physically based renderer](atom-guide): A cross-platform, modular, data-driven, and multi-threaded renderer that can be extended for a wide variety of visual and performance needs.

Some of Atom's features include:

* Support for Forward+ and Deferred rendering.

* Multi-threaded renderer allows rendering process to run on the CPU and GPU.

* Modular framework allows development of multiple rendering paths.

* DirectX 12, Vulkan, and Metal graphics API support.

* Optimized cluster Forward+ shading model with discrete passes that gives you greater control over Atom's final output. 

* The AZSL shader language, an extension to HLSL designed for flexibility that allows you to write your own shaders in a familiar syntax.

* Global Illumination on a per-mesh and per-material basis with MSAA/SSAO/SSR support.

* Real time, hardware accelerated ray tracing.

* High resolution reflection cubemaps.

* Pipeline interface abstraction allowing for platform-independent creation of forward+, deferred or hybrid
renderers via a pass system.

* Support for parallax correction, mixed reflections per render pass, and runtime editing and visualization for lighting artists.

* No limitations on customizable render passes.

Read the [Atom Documentation](/docs/atom-guide) to find out more!

## Build logic with Script Canvas or Lua

In O3DE, you can create run time logic and functionality visually with Script Canvas or program with Lua.

With Script Canvas, scripts are created as flow graphs by placing and connecting functional nodes in a visual editor, no programming required. Script Canvas allows you to experiment and iterate quickly, and provides an easy entry point to new developers.

With Lua, O3DE provides a traditional script model, and the ability to use the editor of your choice.

The great part is, you don't have to use one or the other. You can use both in your projects and even within scripted entities.

## Physics simulations

O3DE provides support for a suite of industry standard physics solutions that you can use to add realism to your actors and environments, and visualize simulations. O3DE provides support for the following simulation SDKs:

* **NVIDIA PhysX:** Create static and dynamic rigid bodies, dynamic joints, and forces such as wind and gravity. PhysX can also be used for overlap testing, triggers, shapecasts, and raycasts.

* **NVIDIA Cloth:** Create clothing and fabrics that realistically react to animated entities and physical forces. NVIDIA Cloth has robust support for colliders, constraints, and per-vertex cloth data that allows highly resolving, layered cloth simulation.

* **NVIDIA Blast:** Create dynamic destruction with multiple layers of fracturing and user defined vector and stress damage limits.

* **AMD TressFX:** Create hair and fur using guide hairs and grooming data that reacts to animated entities and physical forces realistically.

## Robust Networking

Open 3D Engine comes with a high-performance networking Gem that gives you the features you need for robust, performant communications and servers. Networking features include:

+ Highly flexible, TCP/UDP low latency transport layer abstracted behind a simplified API.
+ Encryption and compression support with built in simulator for latency, jitter, reorder and loss.
+ Entity replication using unordered unreliable data replication for lowest possible latency.
+ Support for both player hosted and dedicated server models.
+ Local prediction latency compensation with backward reconciliation for server authority.
+ Detachable player behaviors supporting automated desync detection and correction.
+ RPC and future elastic fault tolerant multiserver support with prediction and reconciliation.

For more information, read [O3DE Networking](/docs/user-guide/networking)\.

## Data-driven Asset Workflows and Handling

+ Text editor and external tools support is easy through JSON-based material creation and control.
+ The EMFX animation system uses a shared file format for mesh and characters.
+ Optimized for modern GPU and asset streaming.
+ Support for non-blocking, asynchronous loading of any asset type.

## Prefab Support

+ Reusable assets with complete properties, components, and hierarchies.
+ Mergeable and diffable human readable text format.
+ Dynamic placement and management of spawnables.

## Scriptable Tools

The O3DE Editor and tools offer scriptable extension support through [Python 3](https://www.python.org/). Create custom editor components, automate processes, and extend your development environment. With O3DE's Python scripting support, you get:

+ Extensions with access to the Qt UX library used by the O3DE editor and tools.
+ Asset builder manipulations, including pre- and post-processing steps.
+ Custom behaviors in FBX and materials processing, letting you split, assign, and rehome assets.

## High-performance Math 

All of Open 3D Engine is backed with a high-perfomance math library, designed to take advantage of modern CPU capabilities for fast and precise math.

+ Libraries use optimal SIMD code for x64 SSE and ARM platforms, and fallback scalar code where optimizations aren't available.
+ Transforms hold separate position, quaternion, and scale fields to reduce the number of necessary conversions.

## Simplified Project Management

O3DE projects are managed through JSON configuration files and the CMake build system, making it simple for you to build custom management tools, or design and distribute your own customizations as Gems. O3DE's project design gives you:

+ Extending your project with an existing Gem is as easy as adding one line of JSON.
+ Each Gem comes with a JSON descriptor of its contents, enabled components, and libraries.
+ Python scripts with support for basic project management from the command line.

## Flexible Code and Data Templates

O3DE offers a code generator powered by [Jinja2 templates](https://jinja.palletsprojects.com/en/2.11.x/), giving you the capabilities to rapidly generate boilerplate code or large amounts of similar data. Some of the features of the code generator include:

+ Data-driven model powered by XML or JSON inputs.
+ Fully integrated into the CMake build system.
+ Regular expression and wildcard matching and replacement rules, letting you set up support for bulk file processing.

## White Box Tool

+ Build levels quickly with O3DE's White Box Gem, letting you sculpt and manipulate geometric volumes quickly to get your world sketched out in-engine.
