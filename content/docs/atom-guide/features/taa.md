---
title: Temporal Anti-aliasing
description: "Learn about temporal anti-aliasing (TAA) in Atom Renderer, the graphics engine integrated into Open 3D Engine (O3DE)."
toc: true
---  

*Temporal anti-aliasing* (TAA) is a type of supersampling that takes samples from different locations within a pixel each frame and combines them with samples from previous frames to create a supersampled image. The main challenge of TAA is knowing when samples from the previous frame are valid. TAA may cause some softness in your image, especially while in motion. To improve the quality of your image, you can enable contrast adaptive sharpening, which sharpens the details of your image. For more information, refer to [Contrast Adaptive Sharpening](cas/).


## Parameters

| Parameter | Description | Values | Default |
| - | - | - | - |
| **m_currentFrameContribution** | Controls how much the current frame's samples contribute to the final image, when history isn't rejected. Reducing this value may help prevent flickering in some circumstances. | `0.1` to `1.0` | `0.1` |
| **m_clampGamma** | Controls the number of standard deviations from the mean of the 3x3 current neighborhood that the history is clipped to. Increasing this value may prevent flickering, but can also lead to ghosting. | `0.0` to infinity | `1.0` |
| **m_maxDeviationBeforeDampening** | Controls the number of standard deviations from the mean, which defines a threshold for the pixel's brightness before it begins to reduce its contribution. This prevents flickering by lowering the weight of the current pixel, if its brightness is very different from the surrounding neighborhood and history. By default, any pixel with a brightness that is more than 0.5 standard deviations from the mean begins to contribute less. | `0.0` to infinity | `0.5` |


## Using TAA

You can enable `Taa.pass` in the main render pipeline through the parent pass, `PostProcessParent.pass`. By default, TAA is disabled. To enable it, set `Enabled` to `true` in the parent pass.

You can also add `Taa.pass` to a custom pipeline.
