---
title: Temporal Anti-Aliasing
description: "Learn about temporal anti-aliasing in the Atom Renderer"
toc: true
---  

*Temporal anti-aliasing* (TAA) is a type of supersampling that takes samples from different locations within a pixel each frame and combines them with samples from previous frames to create a supersampled image. The main challenge of TAA is knowing when samples from the previous frame are valid. TAA may cause some softness in your image, especially while in motion. To improve the quality of your image, you can enable [contrast adaptive sharpening](cas/), which sharpens the details of your image. 


## Parameters

| Parameter | Description | Default |
| - | - | - |
| **m_currentFrameContribution** | Controls how much the current frame's samples contribute to the final image. Reducing this value can help prevent flickering in some circumstances. | `0.1` |
| **m_clampGamma** | Controls the number of standard deviations from the mean of the 3x3 current neighborhood that the history is clipped to. Increasing this value may prevent flickering, but can also lead to ghosting. | `1.0` |
| **m_maxDeviationBeforeDampening** | Controls the number of standard deviations from the mean, which defines a threshold for the pixel's brightness before it begins to reduce its contribution. This prevents flickering by lowering the weight of the current pixel, if its brightness is very different from the surrounding neighborhood and history. By default, any pixel with a brightness that is more than 0.5 standard deviations from the mean will begin to reduce its contribution. | `0.5` |


## Using TAA

You can enable `Taa.pass` in the main render pipeline through the parent pass, `PostProcessParent.pass`. By default, TAA is disabled. To enable it, set `Enabled` to `true` in the parent pass.

You can also add `Taa.pass` to a custom pipeline. 


## Issues and improvements

The following are a list of known issues and improvements for TAA:

- The bloom effect causes flickering when TAA is enabled. 
  
- Aux-Geom causes jittering because it uses the jittered view, but applies it after TAA runs. Therefore, TAA currently is not recommended to use in the **O3DE Editor**.

- Motion vectors on parallel occlusion mapping are only accurate when pixel depth offset is enabled. However, this can lead to additional blur when in motion.

- Transparent objects, such as particles, may have increased blur, because transparencies don't write motion vectors.

- Screen space ambient occlusion (SSAO) leads to camera jitter, which can cause flickering if TAA is using half-sized render targets. To mitigate this issue, SSAO can be increased to full resolution.

- To improve the quality of TAA, mip bias should be added to all shaders. Since TAA is a supersampling method, it's best to sample from a higher mip level.

- In the future, the O3DE Editor will support a TAA component, making it easier to configure TAA in your scene.