---
linktitle: 2107.1 Release Notes
title: Release Notes for Open 3D Engine 2107.1 (Developer Preview)
description: Find out what was delivered in O3DE 2107.1 (Developer Preview).
weight: 900
toc: true
---

These are the release notes for **Open 3D Engine 2107.1 (Developer Preview)**, released on 2021-07-06. Check out the [known issues](https://github.com/o3de/o3de/issues/1736).

## Highlights

The [Open 3D Foundation](https://o3d.foundation) is very excited to bring you this initial Developer Preview release, kicking off what we hope is a long and illustrious community effort to develop a 3D rendering platform that can evolve as fast as modern gaming and simulation has. If it looks a bit familiar to AWS Lumberyard developers, well, they're right: O3DE builds off the effort Amazon Web Services poured into that engine.

Note that this release is a Developer Preview and is incomplete for many major development workflows. Initially, this release primarily supports engine and tools developers, and as the O3DE community builds it out, more features will be added.

 With that said, let's review a few of the bigger features available in O3DE 2107.1:

* It's more modular than ever! Just build your project with the Gems you need, and avoid tedious engine recompiles! If you're an experienced Lumberyard dev, you will appreciate this. [Huh? What? I want to read more about this SDK-esque model!](/docs/welcome-guide/key-concepts/)

* Atom renderer: With this initial release of O3DE, we're proud to introduce the first version of the Atom renderer! Atom is a photorealistic, physically based renderer with a modular, extensible implementation. For more details, read [the Atom renderer documentation.](/docs/atom-guide/)

* New math libraries: O3DE is built atop a foundation of all-new SIMD-enabled math libraries.

* New networking stack: O3DE provides a performance-oriented basic networking stack to build on. [Read up on how it works here](/docs/user-guide/networking/).

* Prefab support: O3DE replaces the old slice system with the well-understood prefab model for combining components and assets.

* Project Manager: The new Project Manager simplifies the process of managing Gems and building your project and the O3DE engine.

* CMake support: Heck yeah! CMake replaces WAF as the build environment and tools, and brings with it a host of great features. [Check out the documentation here.](/docs/user-guide/build/)

* Script Canvas: We're pleased to introducine Script Canvas Backend 2.0, which decouples the front-end and back-end of ScriptCanvas and provides an all-new back-end that compiles to Lua. Users will see performance increases and reductions in memory use, as we reduced the per-entity and per-graph run-time memory costs from `O(entity * graph)` to `O(1)` in the best cases, and put so much more execution on the C++ stack (and Lua execution space) than before.

Or, if you're the literary sort, [read through our new Get Started docs](/docs/welcome-guide/). This is a good place to get oriented to all the [features](/docs/welcome-guide/features-intro/) and [concepts](/docs/welcome-guide/key-concepts/) O3DE introduces.

## New and updated core features

There's a lot of additional updates we're bringing to you with this initial release. Check 'em out!

### Build

* WAF removed and replaced with CMAKE as build system for all components
* Project and Gem management replaced with centralized JSON and python O3DE script tools
* Engine, Gem and project configuration moved to `<platform user path>/.o3de`
* XML configuration systems removed and replaced with JSON implementation
* Autogen replacement for `AzCodeGenerator` implemented with Jinja2 templating language
* Added regex/wildcard and json document support for process and rule implementation
* Restructured entire system to support modularity with precompiled binaries support outside of project folder path
* Implemented support for Windows, MacOS, Linux, Android, and iOS editor and runtime builds
​

### Renderer (Atom)

* Removed rendering from all coupled and replaced with new PBR Atom renderer library
* Added HLSL compatibility with AZSL shader extension with export per backend
* Implemented DirectX 12 and Vulkan support.
  * Coming very soon: Metal interfaces with RT support!
* Implemented pipeline interface for forward+ and/or deferred render passes
* Implemented Global Illumination for forward or deferred per mesh/material basis
* Added MSAA/SSAO/SSR support
* (Animation) We have unified the mesh format used by EMFX and Atom, such that EMotionFX Actors now use Atom's `ModelAsset` class for serializing mesh data
* To improve the runtime drawing of its meshes, the mesh data for EMotionFX Actors is first processed by a mesh optimizer. This restructures the mesh data to better fit the needs of the graphics hardware

​

### Asset processing

* Asset Processor changed to use file hash for change determination
* Python scriptable pipeline added to the Asset Processor for pre/post-processing of assets
* Implemented *AssImp* library for FBX processing
​

### Core Engine

* All core and system modules Gems changed to common `AZ::Interface` allowing direct function calls against any module Interface
* Modules now support global single handler ebuses for 5x speed improvement
* `AZ::Event` replacement for notification buses using simplified C# style event system
* `AZ::Console` replacement for CryConsole exposing cvar and console(s) to any Gem
* Added thread safe mocking of raw var types in `AZ::Console`
* Removed EBus and implemented `AZ::Interface` and `AZ::Event` for efficiency
* `AZ::ScheduledEvent` added as alternative to `TickBus` for periodic or time-sensitive tasks
* Added timeslicing and priority queue for event management control
* Implemented scheduling algorithm to prevent starvation
* Adjusted model to prevent server "spiral of death" behaviors
* `AZ::Logger` replacement for CryLogger and `AZ::Trace` systems for syslog levels of logging priorities
* Implemented runtime toggling to change log levels without recompile or restart
* Removed over 2 million lines of legacy code
* 98% Replacement of all major Cry systems
* `AZ::SIMD` implemented to produce SIMD code for x64 SSE, ARM Neon, or pure scalar fallback code
* `AZ::Transform` implemented for non-matrix/decomposed required calculations with position, quaternion * orientation and scale
​

### Physics and Simulation

* NVIDIA Blast Destruction implemented
* New Visibility interface for culling and occlusion using spatial-hash implementation
* CryPhysics replaced with Physics API; implemented PhysX support
* NVIDIA Cloth support is available!
​

### Editor

* Editor extended with Python scripting support
* White Box polygonal shape/modelling tool added to Editor
* Implemented White Box python scripting and toolchain support with import/export
* Script Canvas 2.0 implemented with full visual compile to Lua
* Created a new Atom-native Editor viewport. The Editor viewport now supports rendering in DirectX 12 or Vulkan!
* Implemented a new Viewport Interaction Model, designed to make editing within Lumberyard more intuitive and enjoyable!

### Networking

* Networking 2.0 implemented with TCP/UDP transport extended with data abstracted generation
* Implemented encryption and compression into network stack

## 3rd Party Gems

**Looking for support for your favorite third-party libraries and cloud service SDKs?** Here's what's been added in 2107.1.

### Amazon Web Services

* GameLift Gem support: Amazon Web Services (AWS) brings you a Gem for GameLift support, enabling you to host multiplayer games with scaling support, as well as other cloud features. [Read the AWS GameLift Gem docs here](/docs/user-guide/gems/reference/aws/aws-gamelift/), and read up on GameLift proper in [the AWS official GameLift documentation.](https://docs.aws.amazon.com/gamelift/index.html)

* AWS Integrations Gems: AWS also has developed several Gems for common cloud service support, such as S3 Storage. They include:
  * [AWS Client Auth Gem](/docs/user-guide/gems/reference/aws/aws-client-auth/): The AWS Client Auth Gem provides solutions for client authentication and AWS authorization.

  * [AWS Core Gem](/docs/user-guide/gems/reference/aws/aws-core/): The AWS Core Gem provides basic shared AWS functionality such as AWS SDK initialization and client configuration.

  * [AWS Metrics Gem](/docs/user-guide/gems/reference/aws/aws-metrics/): The AWS Metrics Gem provides a solution for AWS metrics submission and analytics.

## Known Issues

* [The current list of Known Issues in release 2107.1](https://github.com/o3de/o3de/issues/1736). Help the community out and grab one&mdash;or a few! Or just comment on them and provide us with your thoughts.
