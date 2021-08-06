---
title: Contrast Adaptive Sharpening
description: "Learn about contrast adaptive sharpening in the Atom Renderer"
toc: true
---  

*Contrast adaptive sharpening* (CAS) is a type of sharpening that takes into account the local 3x3 neighborhood's contrast when deciding how much to sharpen. Samples that already have high contrast will be sharpened much less than samples that have low contrast. This helps prevent the over-sharpened look that is found in standard sharpening filters that sharpen uniformly. You can use CAS with [temporal anti-aliasing](taa/) (TAA) to reduce the softness that TAA introduces to your image.

Our contrast adaptive sharpening is based on AMD's implementation. For more information, refer to [AMD FidelityFX CAS](https://gpuopen.com/fidelityfx-cas/).


## Parameters

| Parameter | Description | Values | Default |
| - | - | - | - |
| **m_strength** | Controls the strength of the sharpening effect. | `0.0` to `1.0` | `0.25` |


## Using CAS

You can enable `ContrastAdaptiveSharpening.pass` in the main render pipeline through the parent pass, `PostProcessParent.pass`. By default, CAS is disabled. To enable it, set `Enabled` to `true` in the parent pass. 

You can also add `ContrastAdaptiveSharpening.pass` to a custom pipeline. 

To use CAS to improve the quality of your image with TAA, run the `ContrastAdaptiveSharpening.pass` after the `Taa.pass`. 