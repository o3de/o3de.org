---
title: SSAO Component
linktitle: SSAO
description: 'Open 3D Engine (O3DE) SSAO component reference.'
toc: true
---

The **SSAO** component approximates the occlusion of indirect lighting in a scene by using the *screen space ambient occlusion* technique. This occlusion is sometimes referred to as contact-shadows. 

![ssao-bistro](/images/user-guide/components/reference/atom/ssao-bistro.png)

## Properties

![ssao-component-properties](/images/user-guide/components/reference/atom/ssao-component.jpg)

| Property | Description |
|-|-|
| Enable SSAO | Whether SSAO should be enabled or not |
| SSAO Strength | The strength of the SSAO effect - the higher this value the darker the SSAO will appear |
| Sampling Radius | The sampling radius of the SSAO effect in screen UV space - decrease/increase this value to have a more local/global SSAO effect. |
| Enable Blur | Whether a blur is applied to the computed SSAO buffer. Enabling with result in a smoother looking SSAO image |
| Blur Strength | How strong of a blur to apply to the SSAO. Weaker values will result in a sharper albeit more noisy image. |
| Blur Sharpness | The SSAO blur tries to respect geometric edges to avoid smearing the SSAO across edges or objects. Increasing this value will result in a sharper looking blur, whereas decreasing it will result in a softer looking SSAO blur. |
| Blur Edge Threshold | An edge threshold can be specified for the blur to ignore depth changes of a certain value. This has the most effect at small values. |
| Enable Downsample | Whether to downsample the depth buffer and perform SSAO and blur on the downsampled result before upsampling. This is an optimization that results in less detailed SSAO. |

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)
