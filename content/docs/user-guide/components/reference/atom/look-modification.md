---
title: Look Modification Component
linktitle: Look Modification
description: 'Open 3D Engine (O3DE) Look Modification component reference.'
toc: true
---

The **Look Modification** component allows you to apply a color grading post-processing effect using a look-up table (LUT). Before the LUT is applied, the linear color values are altered using the transfer function selected in the **Shaper Type** property. The colors are then un-shaped back into linear color. Any color values outside of the range of the shaper will be clamped. For low dynamic range content, you should typically use the `Log2 48 nits` shaper. For high dynamic range content, you should typically use either the `Log2 1000 nits` or `PQ(SMPTE ST 2084)` shapers.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)

## Dependencies

[PostFX Layer component](postfx-layer)

## Properties

![Look modification component interface](/images/user-guide/components/reference/atom/look-modification/component.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Enable look modification** | If enabled, activates the look modification component. | Boolean | `Disabled` |
| **Color grading LUT** | An asset reference to a LUT. | LUT Asset | `None` |
| **Shaper Type** | The transfer function used to shape input values before applying the LUT.<li>None: Does not shape the color values before applying the LUT. Input values will be clamped to the 0.0 - 1.0 range.</li><li>Linear Custom Range: Linearly maps the range of **Minimum Exposure** to **Maximum Exposure** into the 0.0 - 1.0 range, and then applies the LUT.</li><li>Log2 48 nits: Maps values from -6.5 to +6.5 stops into the 0.0 - 1.0 range along a log2 curve. This is the standard shaper for low dynamic range content.</li><li>Log2 1000 nits: Maps values from -12.0 to +10.0 stops into the 0.0 - 1.0 range along a log2 curve. This shape is optimized for high dynamic range content for 1000 nit displays.</li><li>Log2 2000 nits: Maps values from -12.0 to +11.0 stops into the 0.0 - 1.0 range along a log2 curve. This shape is optimized for high dynamic range content for 2000 nit displays.</li><li>Log2 4000 nits: Maps values from -12.0 to +12.0 stops into the 0.0 - 1.0 range along a log2 curve. This shape is optimized for high dynamic range content for 4000 nit displays.</li><li>Log2 Custom Range: Maps values in the provided range in stops into the 0.0 - 1.0 range along a log2 curve.</li><li>PQ(SMPTE ST 2084): Maps values from 0 to 10,000 nits into the 0.0 - 1.0 range along the perceptual quantizer curve. For more information on the perceptual quantizer curve refer to https://en.wikipedia.org/wiki/Perceptual_quantizer.</li>|`None`,<br><nobr>`Linear Custom Range`</nobr>,<br>`Log2 48 nits`,<br>`Log2 1000 nits`,<br>`Log2 2000 nits`,<br>`Log2 4000 nits`,<br>`Log2 Custom Range`,<br>`PQ(SMPTE ST 2084)`| `Log2 48 nits` |
| **Minimum Exposure** | The minimum exposure in stops that this LUT supports. Values smaller than this will be clamped to `0.0`.<br><br> *This field is only available when **Shaper Type** is set to a custom range.* | -50.0 - 0.0 | `-6.5` |
| **Maximum Exposure** | The maximum exposure in stops that this LUT supports. Values larger than this will be clamped to `1.0`. <br><br> *This field is only available when **Shaper Type** is set to a custom range.* | 0.0 - 50.0 | `6.5` |
| **LUT intensity** | How strongly this LUT is applied. | 0.0 - 1.0 | `1.0` |
| **LUT override** | The strength of this LUT relative to other LUTs that are also being applied by the PostFX system. | 0.0 - 1.0 | `1.0` |