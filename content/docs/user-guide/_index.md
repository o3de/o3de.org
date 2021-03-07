---
description: "Open 3D Engine is an open-source, cross-platform, cloud-connected game engine that
  you can use to build games."
title: "Open 3D Engine (O3DE) User Guide"
toc: true
weight: 100
---

Open 3D Engine (03DE) is a free, cross\-platform, 3D game engine that allows you to create high\-quality games, connect your games to the compute and storage of the AWS Cloud, and engage fans on Twitch\. With O3DE, you can spend more time creating great gameplay and building communities of fans, and less time on the heavy lifting of building a game engine and managing servers\.

O3DE offers everything a professional game developer can expect, such as a full\-featured editor, native code performance, and stunning visuals\. It also includes hundreds of other ready\-to\-use features like networking, cinematics, the **Script Canvas** editor, the **Animation Editor**, audio tools, and more\.

Interested? Want to get started?
+ [Download the latest version of the O3DE beta](https://aws.amazon.com/lumberyard/downloads/)
+ [Kickstart your learning by watching tutorial videos](https://aws.amazon.com/lumberyard/videos/)
+ [Sign up for and participate in the Open 3D Engine forums](https://forums.awsgametech.com/)

![\[Learn more about O3DE's systems and features in the Open 3D Engine User Guide.\]](/images/user-guide/starter-game-introduction-1.25.png)

<!-- TAKE TALKING POINTS FROM ROYAL'S DECK -->
## Open 3D Engine Features

HIGH LEVEL MARKETING TYPE DESCRIPTION HERE


### Fully Open Source

### Modern Physically Based Renderer

The new Atom graphics engine is a highly flexible, data-driven, and modern physically based renderer that can be extended for a wide variety of visual and performance needs.

Some of the features include:

+ Vulkan, Metal, DX 12 Raytracing support to unified language with HLSL compatibility
extended to AZSL for flexibility to allowing exporting per rendering backend.
+ Render pipeline Interface allows creation of forward+, deferred or hybrid
renderer through pass system
+ No limitations, customizable render passes to match mobile, PC and Cloud
hardware restrictions.
+ Global Illumination allows forward or deferred on per mesh / per material basis
with MSAA/SSAO/SSR support
+ No restrictions on resolution sizes for reflection cubemaps
+ Support for parallax correction, mixed reflections per render pass,
runtime editing / vis for light artists
+ Fully multi-threaded and modular renderer with future distributed rendering support

New features are being added by the community regularly. Read the [Atom Documentation](/docs/atom-guide) to find out more!

### Modular Engine and Components

+ No need to adopt entire engine, completely separable with standard interfaces
+ All objects are now Gems / libraries including core
+ Adopt the objects you want to use with your current stack or reduce tech debt
+ Precompiled binary, library, and header support for engine modules and gems.
+ Adding or removing precompiled gems do not require recompile on
project changes
+ Upgrading to new engine versions only require resolving any compile
issues in project code.
+ Easily customize engine components and replace prebuilt components
with specific custom modules

For more information, see [Using Asset Processor](/docs/user-guide/features/assets/processor.md)\.

### Build with Familiar Tools

+ New standard CMAKE build system, includes support for: CTest, Gems, and automated code generation
+ Projects generated are native IDE projects (VS, Xcode , make / etc
+ Enables Edit and Continue and profiling with tool support
+ Saves time w/proper dependency tree to build target of choice
and only actual dependencies

For more information, see the following topics:

+ [Get started with O3DE builds](/docs/user-guide/features/build/)

### Industry Standard Hardware Accelerated Physics

+ Nvidia PhysX as default, no cry physics
+ Data driven design for frontend/backend with independent simulation
+ Physics API system separable for replacement or customization

### Script Canvas 2.0&mdash;Visual Scripting for Everyone

+ 350% faster than 1.0 with JIT optimizations
+ Compiles to Python / LUA and with future native code support
+ Reusable rapid prototyping without need for rewrite due to optimized output.

### Robust Networking 

+ Highly flexible, TCP/UDP low latency transport layer abstracted behind simple API
+ Encryption and compression support with built in simulator for latency, jitter, reorder & loss
+ Entity replication using unordered unreliable data replication for lowest possible latency
+ Supports player hosted and dedicated server models
+ Local prediction latency compensation, backward reconciliation for server authority
+ Detachable player behaviors supporting automated desync detection and correction
+ RPC and future elastic fault tolerant multiserver support with same
prediction and reconciliation

For more information, see [Using O3DE Networking](/docs/userguide/networking/intro.md)\.

### Improved Asset Workflows and Handling

+ JSON based material creation and control
+ Asset Processor startup time reduced to seconds
+ EMFX uses new shared file format for mesh and characters
+ Optimized for modern GPU and streaming
+ Full support for asynchronous loading of any asset type with blocking load support
+ Reduction of CPU load, memory usage and overall load times.

### Native Prefab Support

+ Reusable assets with complete properties, components and hierarchies
+ Mergeable and diffable human readable text format

For more information, see [Add modular features and assets with Gems](/docs/user-guide/features/gems)\.

### Python-based UI and Media Tools

+ Python extensions with access to Qt for Python enabling custom editor components
+ Asset builder manipulation with pre/post process step python bindings
to modify in flight processing
+ Custom behavior for FBX & material processing to split, assign, & rehome assets

For more information, see [Adding Audio and Sound Effects](/docs/user-guide/features/interactivity/audio/intro.md)\.

## High-performance Math Libraries

+ `AZ::Simd` API produces optimal SIMD code for x64 SSE, ARM or pure scalar code
for fallback compatibility
+ `AZ::Transform` has separate position, quaternion orientation, and scale fields to
remove conversions needs

### Simplified Project Management

+ Project and gem management greatly simplified with Cmake and JSON
+ Gems enabled in one line update to project JSON
+ DLLs and enabled components defined in self described gem JSON
+ Simple Python scripts for automation and creation of gems and projects

### Core APIs

+ AZ::Interface replacement for global single handler EBuses used for rendering,
physics and audio
+ 500% faster then EBus w/ direct function calls against interface & autocomplete support
+ AZ::Event 200% faster than Ebus using C# event design patterns,
replaces notification buses
+ AZ:: ScheduledEvent using timeslicing and priority queue with simple scheduling
for no starvation
+ AZ::Console support network sync cvars w/ thread safe mock of mutated
raw var types by other threads

### Flexible Automation

+ Replaces AzCodeGenerator improved expansion times by 10,000% with no custom
binary requirements
+ Integrated into cmake to allow data files and templates with expansion rules in cmake.txt
+ Regex/wildcard match and replacement rules to support individual or bulk file processing
+ Data driven, can be fed xml or json documents, uses jinja2 as a templating language

### White Box Tool

+ Fast creation and manipulation of geometric volumes for rapid prototyping

### AWS SDK for C\+\+ {#lumberyard-aws-sdk}

The AWS SDK for C\+\+ provides C\+\+ API operations for numerous AWS services including Amazon S3, Amazon EC2, Amazon DynamoDB, and more, with support for all major native platforms\. You can use the SDK to integrate AWS components into your game\.

For more information, see the [AWS SDK for C\+\+](https://aws.amazon.com/sdk-for-cpp/)\.
