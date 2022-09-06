---
title: SSAO Component
linktitle: SSAO
description: 'Open 3D Engine (O3DE) SSAO component reference.'
toc: true
---

The screen-space ambient occlusion (**SSAO**) component approximates the occlusion of light in a scene by using the depth buffer. This occlusion is sometimes referred to as *Contact Shadows*.

{{< image-width "/images/user-guide/components/reference/atom/ssao-bistro.png" "700" "Image of SSAO applied to the Bistro scene" >}}


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Properties

{{< image-width "/images/user-guide/components/reference/atom/ssao-component.jpg" "500" "SSAO Component Properties" >}}

| Property | Description | Values | Default |
|-|-|-|-|
| **Enable SSAO** | If enabled, activates SSAO. By default, SSAO is activated, even if the level does not contain an SSAO component. To deactivate SSAO, add the SSAO component and disable this property. | Boolean | Enabled |
| **SSAO Strength** | The strength of the SSAO effect. The higher this value, the darker the SSAO appears. | 0.0 - 2.0 | 1.0 |
| **Sampling Radius** | The sampling radius of the SSAO effect in screen UV space. Decrease or increase this value to have a more local or global SSAO effect, respectively. | 0.0 - 0.25 | 0.05 |
| **Enable Blur** | If enabled, applies a blur to the computed SSAO buffer. Activating blur results in a smoother-looking SSAO image. | Boolean | Enabled |
| **Blur Strength** | How strong of a blur to apply to the SSAO. Lower values leads to a weaker blur, resulting in a sharper, noisier image. | 0.0 - 0.95 | 0.85 |
| **Blur Sharpness** |  The sharpness of the blur effect. A higher value results in a sharper-looking blur, whereas a lower value results in a softer-looking blur. SSAO blur tries to respect geometric edges to avoid smearing the SSAO across edges or objects. | 0.0 - 400.0 | 200.0 |
| **Blur Edge Threshold** | An edge threshold, in which the blur ignores depth changes at the specified value. This has the most effect with smaller values. | 0.0 - 1.0 | 0.0 |
| **Enable Downsample** | If enabled, first downsamples the depth buffer and performs SSAO and blur on the downsampled result, then upsamples the result. This is an optimization that results in a less detailed SSAO. | Boolean | Enabled |