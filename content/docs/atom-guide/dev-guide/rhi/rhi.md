---
linktitle: Overview
title: "Render Hardware Interface Overview"
description: "What is RHI? The Render Hardware Interface (RHI) is an abstraction layer over several platform-specific graphics APIs."
date: 2021-03-05
toc: false
weight: 100
---

The **Render Hardware Interface (RHI)** is an abstraction layer over several platform-specific graphics APIs. It is designed from the ground up to take advantage of DirectX 12, Vulkan, and Metal 2.0. 

The RHI provides support for key requirements in the Open 3D Engine:

**Developers can author bespoke graphics features as FeatureComponents or Gems.**
The RHI provides customers with a platform-independent, general purpose rendering API that abstracts away platform details. Developers can write general purpose graphics code and game-specific features without cluttering platform-specific code throughout the entire rendering stack, and in several cases even the upper levels of the engine. For "Ninja" developers who want to take advantage of deep platform quirks, we plan to expose the underlying API-specific constructs in a clean fashion. 

**Support for high performance across all platforms.** 
The RHI is designed to allow platform developers to take advantage of specialized hardware features, to the extent possible, without the need for custom code paths at both the lower and higher levels of the renderer. The Frame Scheduler, a component of the RHI, enables whole-frame optimization by representing render passes as nodes in a graph. The graph execution strategy is determined at the platform-specific level to best optimize the frame for the needs of the hardware. RHI is an ever-growing layer with plans to support more backends and the latest API across current backends. Some of the RHI's optimization techniques include the following:
- Generate multi-threaded command buffer on platforms that facilitate it, such as PC and mobile.
- Save significant amounts of GPU memory by reclaiming unused regions within the current frame.
- Ability to use Async Compute to help fill up compute resources not used by graphics tasks.
- Explicitly track all the resources through FrameGraph. 
- Ability to keep render targets in on-chip memory on mobile.
- Long term, we will take advantage of Heterogeneous and linked multi-GPU setups, which will become more tractable by having full-frame knowledge.

**Robustness and ease of use.**
The RHI is built with API consistency, simplicity and thorough documentation as core tenets, which simplifies understanding and using the RHI. Another tenet of the RHI is that it pre-compiles and pre-validates graphics data structures so less work is done during the run-time loop, and errors are caught upfront. This tailors naturally to next-generation APIs like DirectX12, Vulkan and Metal 2.0, while gracefully scaling back to more legacy APIs. 
