---
title: "Render Hardware Interface"
description: "What is RHI? The Render Hardware Interface (RHI) is an abstraction layer over several platform-specific graphics APIs."
toc: false
weight: 600
---

This section contains technical details about the Render Hardware Interface (RHI) in Atom. The RHI is a low-level layer in the rendering pipeline that communicates with the backend graphics API. The RHI Gems are part of Atom and you need at least one compatible backend for your platform to render something on screen. 

The RHI layer supports three backends:
- **DX12 backend**: Supported on Microsoft Windows 10 and above.
- **Vulkan backend**: Supported on Microsoft Windows 10 and above, Linux and Android.
- **Metal backend**: Supported on Apple macOS (Intel x86_64) and iOS (iPad and iPhone).


| Contents                        | Details |
|--------------------------------------|---------|
| [RHI Overview](rhi/) | What the RHI does and why we need it. |
| [Frame Scheduler](frame-scheduler/) | The Frame Scheduler is a core component of the RHI, responsible for efficient GPU submission across each backend. | 
<!-- | Work Submission | Describes the API used to submit work to the GPU. This includes draw, dispatch, blit or ray tracing work |
| Resources and Pools | Describes all the resources and their associated pools supported by the RHI layer. |
| Shader Resource Groups | Describes Shader Resource Groups. How they are created, updated and used within RHI. |
| Shader Resource Groups and Constant Data | Describes how the Constant data within Shader Resource Groups are handled and bound to the GPU |
| Shader Buffer Packing | Describes how to create buffers within azsl for various buffer types within Shader - Resource Groups |
| Pipeline Layout Descriptors | Provides an overview of Pipeline Layout Descriptors and how it helps bind - shader resources within RHI |
| Root Constants | Provides an overview of Root Constants and how they can be used within Atom |
| Queries | Provides an overview of Queries and how they are implemented within RHI |
| Raytracing Abstraction | Provides an overview of RHI abstraction for RayTracing |
| Shader Asset Generation | Describes how AP processes shader assets for various RHI backends |
| Gem Library Structure | Describes the gem structure of RHI within Atom. |
| Runtime Selection | Describes how a RHI backend is picked by Atom to be used for a given platform |
| RHI AtomSampleViewer Examples | List of all the RHI samples in AtomSampleViewer and details related to them  |
 -->
