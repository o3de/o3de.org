---
linktitle: 2107.1 Release Notes
title: Release Notes for Open 3D Engine 2107.1 (Developer Preview)
description: Find out what's was delivered in O3DE 2107.1 (Developer Preview).
weight: 101
toc: true
menu_uuid: releasenotes
guide_img: "/images/release-notes/guide_img.svg"
---

The current version of Open 3D Engine is 2107.1 (Developer Preview). Check out the [known issues](2107-1-known-issues.md) here.

## Highlights

The [Open 3D Foundation](https://o3de.foundation) is very excited to bring you this initial Developer Preview release, kicking off what we hope is a long and illustrious community effort to develop a 3D rendering platform that can evolve as fast as modern gaming and simulation has. If it looks a bit familiar to AWS Lumberyard developers, well, they're right: O3DE builds off the effort Amazon Web Services poured into that engine.

Note that this release is a Developer Preview and is incomplete for many major development workflows. Initially, this release primarily supports engine and tools developers, and as the O3DE community builds it out, more features will be added.

 With that said, let's review a few of the bigger features available in O3DE 2107.1:

* Atom renderer: With this initial release of O3DE, we're proud to introduce the first version of the Atom renderer! Atom is a photorealistic, physically based renderer with a modular, extensible implementation. For more details, read [the Atom renderer documentation](/docs/atom-guide/).

* New math libraries: O3DE is built atop a foundation of all-new SIMD-enabled math libraries. [Check out the API reference for the AZ:Math APIs here]().

* New networking stack: O3DE provides a performance-oriented basic networking stack to build on. [Read up on how it works here.](/docs/user-guide/networking/)

* Prefab support: O3DE replaces the old slice system with the well-understood prefab model for combining components and assets. Curious? [Read the early documentation here]().

* Project Manager: The new Project Manager simplifies the process of managing Gems and building your project and the O3DE engine. [Read more about it in the documentation here]().

* CMake support: Heck yeah! CMake replaces WAF as the build environment and tools, and brings with it a host of great features. [Check out the documentation here]().

Or, if you're the literary sort, [read through our new Get Started docs](/docs/welcome-guide/). This is a good place to get oriented to all the [features](/docs/welcome-guide/features-intro/), and [concepts](/docs/welcome-guide/key-concepts/) O3DE introduces.

## New and updated core features

There's a lot of updates we're bringing to you with this initial release. Check 'em out!

### Build

* WAF removed and replaced with CMAKE as build system for all components
* Project and Gem management replaced with centralized JSON and python O3DE script tools
* Engine, Gem and project configuration moved to `<platform user path>/.o3de`
* XML configuration systems removed and replaced with JSON implementation
* Autogen replacement for AzCodeGenerator implemented with Jinja2 templating language
* Added regex/wildcard and json document support for process and rule implementation
* Restructured entire system to support modularity with precompiled binaries support outside of project folder path
* Implemented support for Windows, MacOS, Linux, Android, and iOS editor and runtime builds
​

## Renderer

* Removed rendering from all coupled and replaced with new PBR Atom renderer library
* Added HLSL compatibility with AZSL shader extension with export per backend
* Implemented DirectX 12, Vulkan, and Metal interfaces with RT support
* Implemented pipeline interface for forward+ and/or deferred render passes
* Implemented Global Illumination for forward or deferred per mesh/material basis
* Added MSAA/SSAO/SSR support
​

### Asset processing

* Asset processor changed to use file hash for change determinatino.
* Python scriptable pipeline added to Asset processor for pre/post-processing of assets
* Implemented Assimp library for FBX processing
​

### Core Engine

* All core and system modules Gems changed to common AZ::Interface allowing direct function call against any module Interface
* Modules now support global single handler ebuses for 5x speed improvement
* AZ::Event replacement for notification buses using simplified C# style event system.
* AZ::Console replacement for CryConsole exposing cvar and console to any Gem
* Added thread safe mocking of raw var types in AZ::Console
* Removed EBUS and Implemented AZ::Interface and AZ::Event for efficiency
* AZ::ScheduledEvent added as alternative to TickBus for periodic or time sensitive tasks
* Added timeslicing and priority queue for event management control
* Implemented scheduling algorithm to prevent starvation
* Adjusted model to prevent server 'spiral  of death' behaviors
* AZ::Logger replacement for CryLogger and AZ::Trace systems for syslog levels of loggint priorities
* Implemented runtime toggling to change log levels without recompile or restart
* Removed over 2M lines of legacy red-code
* 98% Replacement of all major Cry systems
* AZ::SIMD implemented to produce SIMD code for x64 SSE, ARM Neon or pure scalar fallback code
* AZ::Transofrm implemented for non-matrix/decomposed required calculations with position, quaternion * orientation and scale
​

### Simulation

* Blast Destruction implemented
* New Visibility interface for culling and occlusion using spatial-hash implementation
* CryPhysics replaced with Physics API, implemented PhysX
​

### Editor

* Editor extended
* Whitebox polygonal shape/modelling tool added to editor
* Implemented whitebox python scripting and toolchain support with import/export
* Script Canvas 2.0 implemented with full visual compile to LUA

### Networking

* Networking 2.0 implemented with TCP/UDP transport extended with data abstracted generation.
* Implemented encryption and compression into network stack

## Partner Gems

Looking for support for your favorite third-party libraries and cloud service SDKs? Here's what's been added in 2107.1.

### Amazon Web Services

* GameLift Gem support

* AWS Integrations Gems
