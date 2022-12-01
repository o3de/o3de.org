---
linktitle: Features
title: Open 3D Engine Features
description: Read about the high-level features provided with Open 3D Engine (O3DE).
weight: 100
toc: true
---

**Open 3D Engine (O3DE)** is an open-source, cross-platform, real time 3D engine that you can use to create high performance interactive experiences, including games and simulations. O3DE has a physically-based renderer and a suite of tools to build and process assets, simulate physics, and create animation and cinematics. The renderer and tools are all wrapped in a modular framework that you can modify and extend with your preferred development tools.

## Open source

O3DE is open source. You can use the provided binaries and tools to build your own projects, or get the source code and extend it!

Visit [O3DE on GitHub](https://{{< links/o3de-source >}}) to get the source code, then follow the [GitHub setup instructions](/docs/welcome-guide/setup/setup-from-github) to get started.

## Modular engine and components

Take only the bits your project needs! O3DE is composed of *Gems*, which are modules that contain libraries with standard interfaces and assets. Each system in O3DE is provided by its own Gem and you can pick and choose what functionality to add based on your requirements. You can also customize O3DE, or replace functionality entirely, with your own Gems!

O3DE supports Gems with precompiled binaries and libraries. Adding or removing precompiled Gems does not require you to recompile O3DE. Upgrading to new engine versions only requires that you recompile projects.

For more information, see [the O3DE Gems documentation](/docs/user-guide/gems/).

## Build with familiar tools

O3DE uses [CMake](https://cmake.org/) for creating build files, managing dependencies, testing, and automating code generation. O3DE's build system has the following advantages:

* Your project is created for, and built with, your native IDE and toolchain.

* Proper dependency trees for build targets are created and maintained, keeping the build targets clean.

* Robust support for creating and running automated tests.

* Use debugging and profiling tools such as **Edit and Continue** when supported by compiler tools.

For more information, refer to [Get started with O3DE builds](/docs/user-guide/build/).

## Atom physically based renderer

O3DE uses the Atom physically based renderer. Atom is a cross-platform, modular, data-driven, and multi-threaded renderer that can be extended for a wide variety of visual and performance needs.

Some of Atom's features include:

* Support for Forward+ and Deferred rendering.

* Multi-threaded. Rendering processes run on the CPU and GPU.

* Modular framework allows development of multiple rendering paths.

* DirectX 12, Vulkan, and Metal graphics API support.

* Optimized cluster Forward+ shading model with discrete passes that gives you greater control over Atom's final output.

* The AZSL shader language is a flexible extension of HLSL that allows you to write your own shaders in a familiar syntax.

* Global Illumination on a per-mesh and per-material basis with MSAA/SSAO/SSR support.

* Real time, hardware accelerated ray tracing.

* High resolution reflection cubemaps.

* Pipeline interface abstraction allowing for platform-independent creation of Forward+, Deferred, or hybrid renderers via a pass system. Supports Forward+ by default.

* Support for parallax correction, mixed reflections per render pass, and runtime editing and visualization for lighting artists.

* No limitations on customizable render passes.

Read the [Atom Documentation](/docs/atom-guide) to find out more!

## Build runtime logic with Script Canvas or Lua

In O3DE, you have *two* scripting environments available for creating runtime logic: a visual scripting tool called Script Canvas, and a more traditional scripting model, Lua.

With Script Canvas, you can create scripts as flow graphs by placing and connecting functional nodes in a visual editor, no programming required. Script Canvas allows you to experiment and iterate quickly, and provides an easy yet powerful entry point to new developers.

With Lua, O3DE supports a well-established scripting language and the ability to use the editor of your choice.

You don't have to choose one or the other. You can use both Script Canvas and Lua in your projects and even within the same entity.

## Physics simulations

O3DE provides support for a suite of industry standard physics solutions that you can use to add realism to your actors and environments, and to visualize simulations. O3DE provides support for the following simulation SDKs:

* **NVIDIA PhysX:** Create static and dynamic rigid bodies, dynamic joints, and forces such as wind and gravity. PhysX can also be used for overlap testing, triggers, shapecasts, and raycasts.

* **NVIDIA Cloth:** Create clothing and fabrics that realistically react to animated entities and physical forces. NVIDIA Cloth has robust support for colliders, constraints, and per-vertex cloth data to compute highly resolving, layered cloth simulation.

* **AMD TressFX:** Create hair and fur using guide hairs and grooming data that realistically reacts to animated entities and physical forces.

<!-- * **NVIDIA Blast:** Create dynamic destruction with multiple layers of fracturing and user defined vector and stress damage limits. -->

## Robust networking

O3DE comes with a high-performance networking Gem that gives you the features you need for robust communications and servers. Networking features include:

* Highly flexible, TCP/UDP low latency transport layer abstracted behind a simplified API.

* Encryption and compression support with a built-in simulator for latency, jitter, reorder, and loss.

* Entity replication using unordered, unreliable data replication for lowest possible latency.

* Support for both player hosted and dedicated server models.

* Local prediction latency compensation with backward reconciliation for server authority.

* Customizable player behaviors supporting automated desync detection and correction.

<!-- For more information, read [O3DE Networking](/docs/user-guide/networking). -->

## Data-driven asset workflows and asset handling

O3DE supports industry standard asset file formats and provides a unified asset processor. O3DE includes the following asset processing features:

* Assets and asset manifests use JSON formatting allowing greater potential for scripting and automation.

* A unified mesh format for actors, static, and dynamic objects.

* Optimized run time assets for streaming on modern graphics hardware.

* Support for non-blocking, asynchronous loading of any asset type.

* Asset builders can be scripted with Python.

## Prefab support

Complex entities can be created, shared, re-used, and dynamically spawned with O3DE's prefab system. O3DE prefabs include the following features:

* Reusable assets with complete properties, components, and hierarchies.

* Prefabs use a human readable text format, so you can use standard source control tools to view diffs and merge changes.

* Prefabs can be placed and managed dynamically as *spawnables*.

## Scripted tools

The O3DE Editor and tools offer extension support through [Python 3](https://www.python.org/). Create custom editor components, automate processes, and extend your development environment. With O3DE's Python scripting support, you get:

* Extensions with access to the Qt UX library used by the O3DE editor and tools.

* Asset builder customization, including pre- and post-processing steps.

* Custom behaviors in mesh, image, and material processing, letting you split, assign, and rehome assets.

## High-performance math

All of Open 3D Engine is backed with a high performance math library, designed to take advantage of modern CPU capabilities for fast and precise calculations.

* Libraries use optimal SIMD code for x64 SSE and ARM Neon platforms, and fallback scalar code where optimizations aren't available.

* SIMD-accelerated trigonometric functions that operate faster than equivalent scalar operations and are capable of performing multiple trigonometric calculations in a single call.

## Simplified project management

O3DE projects are managed through JSON configuration files and the CMake build system, making it simple for you to build custom management tools, or design and distribute your own customizations as Gems. Gems can add new functionality to your projects with a single line of JSON. O3DE's project design gives you:

* A JSON descriptor of a Gem's contents, enabled components, and libraries.

* Python scripts with support for basic project management from the command line.

## Flexible code and data templates

O3DE offers a code generator powered by [Jinja2 templates](https://jinja.palletsprojects.com/en/2.11.x/), giving you the capabilities to rapidly generate boilerplate code or large amounts of similar data. Some of the features of the code generator include:

* Data-driven model powered by XML or JSON inputs.

* Fully integrated into the CMake build system.

* Regular expression and wildcard matching and replacement rules, letting you set up support for bulk file processing.

## White Box tool

* Build levels quickly with O3DE's White Box Gem, letting you sculpt and manipulate geometric volumes quickly to get your world sketched out in-engine.
