---
description: ' Open 3D Engine is a free, cross-platform, cloud-connected game engine that
  you can use to build games. '
linktitle: Open 3D Engine User guide
title: What is Open 3D Engine (O3DE)?
weight: 300
---

Open 3D Engine (03DE) is a free, cross\-platform, 3D game engine that allows you to create high\-quality games, connect your games to the compute and storage of the AWS Cloud, and engage fans on Twitch\. With O3DE, you can spend more time creating great gameplay and building communities of fans, and less time on the heavy lifting of building a game engine and managing servers\.

O3DE offers everything a professional game developer can expect, such as a full\-featured editor, native code performance, and stunning visuals\. It also includes hundreds of other ready\-to\-use features like networking, cinematics, the **Script Canvas** editor, the **Animation Editor**, audio tools, and more\.

Interested? Want to get started?

+ [Download the latest version of the O3DE beta](https://aws.amazon.com/lumberyard/downloads/)
+ [Kickstart your learning by watching tutorial videos](https://aws.amazon.com/lumberyard/videos/)
+ [Sign up for and participate in the Open 3D Engine forums](https://forums.awsgametech.com/)

![\[Learn more about O3DE's systems and features in the Open 3D Engine User Guide.\]](/images/user-guide/starter-game-introduction-1.25.png)

<!-- DougEric Note: Replace this page with a proper Nav page and move this content to a features.md page or the what-is page later. -->

## Open 3D Engine Features

### Fully Open Source

Open 3D Engine is fully open sourced under the Linux Foundation. Use the currently provided binaries and tools, or fork the code and extend it! 

### Modern Physically Based Renderer

The new [Atom graphics engine](atom-guide) is a highly flexible, data-driven, and modern physically based renderer that can be extended for a wide variety of visual and performance needs.

Some of the features include:

+ Fully multi-threaded and modular renderer with future distributed rendering support
+ Vulkan, Metal, and DirectX 12 raytracing support
+ Unified, flexible AZSL language with HLSL compatibility
+ Render Pipeline Interface (RPI) allows for forward+, deferred, or hybrid
renderer models
+ No limitations! Create customizable render passes to match mobile, PC, console, and cloud hardware profiles
+ Global illumination model allows forward or deferred rendering (per-mesh and per-material) with MSAA/SSAO/SSR support
+ No restrictions on resolution sizes for reflection cubemaps
+ Support for parallax correction, mixed reflections per render pass, and runtime editing for lighting artists

New features are being added by the community regularly. Read the [Atom Documentation](/docs/atom-guide) to find out more!

### Modular Engine and Components

+ Take only the bits your project needs! No need to adopt the entire engine, as all objects are now Gems (libraries with standard interfaces), including Core O3DE modules and components
+ Precompiled binary, library, and header support for engine modules and Gems. Adding or removing precompiled Gems do not require project recompilation. Upgrading to new engine versions only require resolving any compile issues in project code.
+ Easily customize engine components and replace prebuilt Gems with your own custom modules!

For more information, see [the O3DE Gems documentation](/docs/user-guide/gems)\.

### Build with Familiar Tools

+ New standard CMAKE build system, which includes support for: CTest, O3DE Gems, and automated code generation
+ Projects generated are native IDE projects (Visual Studio 2017/2019, XCode, make, and others)
+ Enables **Edit and Continue** and profiling support (depending on your IDE or tools)
+ Proper dependency tree model to build only your targets of choice, with the correct dependencies

For more information, see the following topics:

+ [Get started with O3DE builds](/docs/user-guide/features/build/)

### Industry Standard Hardware Accelerated Physics

+ NVIDIA PhysX is the default physics library
+ Data-driven design for frontend and backend computations, with independent simulation
+ Physics API system separable for replacement or customization

### Script Canvas 2.0&mdash;Visual Scripting for Everyone

+ JIT optimizations for a 350% peroformance improvement over Amazon Lumberyard 1.X
+ Scripts compiles to both Python and LUA; C++ support planned
+ Perform reusable rapid prototyping without rewriting the scripts due to optimized output

### Robust Networking

+ Highly flexible, TCP/UDP low-latency transport layer abstracted behind a simple API
+ Encryption and compression support with a built-in simulator for packet latency, jitter, reordering, and loss
+ Entity replication using unordered unreliable data replication for lowest possible latency
+ Supports player-hosted and dedicated server models
+ Local prediction latency compensation, as well as backward reconciliation for server authority
+ Supports detachable player behaviors with automated desync detection and correction

For more information, read [O3DE Networking](/docs/userguide/networking/intro.md)\.

### Improved Asset Workflows and Handling

+ JSON-based material creation and management
+ Asset Processor startup time reduced to seconds
+ EMFX uses new shared file format for meshes and characters
+ Optimized for modern GPU and streaming
+ Full support for asynchronous loading of any asset type with blocking load support
+ Reduction of CPU load, memory usage, and overall load times.

### Native Prefab Support

+ Reusable assets with complete properties, components, and hierarchies
+ Mergeable and diffable human readable text format
+ Dynamic placement and management of spawnables

### Python-based UI and Media Tools

+ Python extensions with access to Qt for Python, enabling custom editor components
+ Asset builder manipulation with pre- and post-process step bindings, so you can modify processing at runtime
+ Custom behavior for FBX and material processing to split, assign, and rehome assets

## High-performance Math Libraries

+ All-new high-peformance math libraries with full SIMD support
+ `AZ::Simd` API produces optimal SIMD code for x64 SSE, ARM Neon, or pure scalar code
for fallback compatibility
+ `AZ::Transform` has separate position, quaternion orientation, and scale fields

### Simplified Project Management

+ Project and Gem management greatly simplified with CMake and JSON
+ Gems enabled in one line update to project JSON
+ DLLs and enabled components defined in self-described Gem JSON
+ Simple Python scripts for automation and creation of Gems and projects

### Core APIs

+ [AZ::Interface](/docs/user-guide/az-interface) replacement for global single-handler EBuses used for rendering, physics, and audio
+ 500% faster then EBus with direct function calls against interface, plus autocomplete support
+ [AZ::Event](/docs/user-guide/az-event) 200% faster than EBus using C# event design patterns, and which replaces notification buses
+ AZ::ScheduledEvent using timeslicing and priority queue with simple scheduling for no starvation
+ [AZ::Console](/docs/user-guide/az-console) supports the thread-safe network sync of console variables (cvars)

### Flexible Automation

+ Replaces AzCodeGenerator improved expansion times by 10,000% with no custom binary requirements
+ Integrated into CMake to allow data files and templates with expansion rules in cmake.txt
+ Regex/wildcard match and replacement rules to support individual or bulk file processing
+ Data-driven using XML or JSON documents, and uses **jinja2** as a templating language

### White Box Tool

+ Fast creation and manipulation of geometric volumes for rapid prototyping

