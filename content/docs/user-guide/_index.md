---
description: ' Open 3D Engine is a free, cross-platform, cloud-connected game engine that
  you can use to build games. '
linktitle: O3DE User Guide
title: Open 3D Engine User Guide
weight: 300
---

Open 3D Engine (O3DE) is a fully open-source, cross\-platform, 3D engine and tools you can use to create high\-quality interactive experience, including games and simulations.

<!-- DougEric Note: Replace this page with a proper Nav page and move this content to a features.md page or the what-is page later. -->

## Open 3D Engine Features

### Fully Open Source

Open 3D Engine is fully open sourced under the Linux Foundation. Use the currently provided binaries and tools, or fork the code and extend it!

### Modern Physically Based Renderer

Open 3D Engine comes with the [Atom physically based renderer](atom-guide): A highly flexible, data-driven, and modern pipeline-based system that can be extended for a wide variety of visual and performance needs.

Some of Atom's features include:

+ Fully multi-threaded and modular renderer with future distributed rendering support
+ Vulkan, Metal, and DirectX 12 raytracing support
+ The AZSL shader language, an extension to HLSL designed for flexibility per rendering backend.
+ An abstracted pipeline interface allowing for platform-independent creation of forward+, deferred or hybrid
renderers via a pass system.
+ No limitations on customizable render passes to match hardware restrictions.
+ A Global Illumination system that allows forward or deferred rendering on a per-mesh and per-material basis
with MSAA/SSAO/SSR support.
+ No restrictions on resolution sizes for reflection cubemaps.
+ Support for parallax correction, mixed reflections per render pass, and runtime editing and visualization for light artists.
+ Fully multi-threaded and modular renderer with future distributed rendering support.

New features are being added by the community regularly. Read the [Atom Documentation](/docs/atom-guide) to find out more!

### Modular Engine and Components

+ Take only the bits your project needs! No need to adopt the entire engine, as all objects are now Gems (libraries with standard interfaces), including Core O3DE modules and components.
+ Precompiled binary, library, and header support for engine modules and Gems. Adding or removing precompiled Gems do not require project recompilation. Upgrading to new engine versions only require resolving any compile issues in project code.
+ Easily customize engine components and replace prebuilt Gems with your own custom modules!

For more information, see [the O3DE Gems documentation](/docs/user-guide/features/gems)\.

### Build with Familiar Tools

Open 3D Engine uses the [CMake build tools](https://cmake.org/) for creating toolchain-specific build files, dependency management, testing, and automated code generation. Some of the advantages you get with O3DE's build system are:

+ Easy support for creating and running automated tests.
+ Your project has files created for, and are built with, your native IDE and toolchains.
+ Enables **Edit and Continue** and profiling when compiler tools offer support.
+ Creates and maintains a proper dependency tree for build targets, keeping them clean.

For more information, read the following topics:

+ [Get started with O3DE builds](/docs/user-guide/features/build/)

### Industry Standard Hardware Accelerated Physics

Open 3D Engine comes with support for the NVIDIA PhysX system, offering a frontend Gem for working with it. Like any other Gem, you can replace it with your own physics system. The advantages of using the O3DE PhysX support include:

+ Data-driven design for frontend and backend with independent simulation.
+ The core engine physics API can be used with any full replacement supporting it.

### Script Canvas&mdash;Visual Scripting for Everyone

Open 3D Engine uses the Script Canvas visual scripting language for authoring gameplay and interactivity. O3DE also offers support for the Lua scripting language and scripting through C++ directly, but Script Canvas offers the following advantages:

+ Compiles to Python or Lua.
+ Future native code support (C++) planned.
+ Reusable rapid prototyping without need for rewrite due to optimized output.

### Robust Networking

Open 3D Engine comes with a high-performance networking Gem that gives you the features you need for robust, performant communications and servers. Networking features include:

+ Highly flexible, TCP/UDP low latency transport layer abstracted behind a simplified API.
+ Encryption and compression support with built in simulator for latency, jitter, reorder and loss.
+ Entity replication using unordered unreliable data replication for lowest possible latency.
+ Support for both player hosted and dedicated server models.
+ Local prediction latency compensation with backward reconciliation for server authority.
+ Detachable player behaviors supporting automated desync detection and correction.
+ RPC and future elastic fault tolerant multiserver support with prediction and reconciliation.

For more information, read [O3DE Networking](/docs/user-guide/features/networking)\.

### Data-driven Asset Workflows and Handling

+ Text editor and external tools support is easy through JSON-based material creation and control.
+ The EMFX animation system uses a shared file format for mesh and characters.
+ Optimized for modern GPU and asset streaming.
+ Support for non-blocking, asynchronous loading of any asset type.

### Native Prefab Support

+ Reusable assets with complete properties, components, and hierarchies.
+ Mergeable and diffable human readable text format.
+ Dynamic placement and management of spawnables.

### Python-based UI and Media Tools

The O3DE Editor and tools offer scriptable extension support through [Python 3](https://www.python.org/). Create custom editor components, automate processes, and extend your development environment. With O3DE's Python scripting support, you get:

+ Extensions with access to the Qt UX library used by the O3DE editor and tools.
+ Asset builder manipulations, including pre- and post-processing steps.
+ Custom behaviors in FBX and materials processing, letting you split, assign, and rehome assets.

## High-performance Math Libraries

All of Open 3D Engine is backed with a high-perfomance math library, designed to take advantage of modern CPU capabilities for fast and precise math.

+ Libraries use optimal SIMD code for x64 SSE and ARM platforms, and fallback scalar code where optimizations aren't available.
+ Transforms hold separate position, quaternion, and scale fields to reduce the number of necessary conversions.

### Simplified Project Management

O3DE projects are managed through JSON configuration files and the CMake build system, making it simple for you to build custom management tools, or design and distribute your own customizations as Gems. O3DE's project design gives you:

+ Extending your project with an existing Gem is as easy as adding one line of JSON.
+ Each Gem comes with a JSON descriptor of its contents, enabled components, and libraries.
+ Python scripts with support for basic project management from the command line.

### Flexible Code and Data Templates

O3DE offers a code generator powered by [Jinja2 templates](https://jinja.palletsprojects.com/en/2.11.x/), giving you the capabilities to rapidly generate boilerplate code or large amounts of similar data. Some of the features of the code generator include:

+ Data-driven model powered by XML or JSON inputs.
+ Fully integrated into the CMake build system.
+ Regular expression and wildcard matching and replacement rules, letting you set up support for bulk file processing.

### White Box Tool

+ Build levels quickly with O3DE's White Box Gem, letting you sculpt and manipulate geometric volumes quickly to get your world sketched out in-engine.
