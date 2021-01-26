---
description: ' Use accurate illuminance values and auto exposure key settings in Lumberyard
  for best tone and realistic light–dark ratios. '
title: Illuminance and Auto Exposure Key
---
# Illuminance and Auto Exposure Key {#enviro-lighting-luminance-scene-key}

Also known as luminous flux density, illuminance is the total amount of visible light falling on a point on a surface from all directions above the surface in a given time\. Proper illuminance values ensures the environment lighting in your level closely models real\-world values\. Besides simply having good ratios between light and dark, accurate illuminance values ensure that tone\-mapping, and eye adaptation works optimally\.

The following table lists real\-world illuminance values, expressed in luminous flux \(lux\)\. Lux is the unit of illuminance and luminous emittance, measuring lux per unit area, and equal to one lumen per square meter\.




**Illuminance Values**

| Real\-world illuminance | Lux Value | Uniformity Ratio | Artistic Interpretation |
| --- | --- | --- | --- |
| Full moon | 0\.25 | 0\.00005 | \- |
| Living room | 50 | 0\.01 | \- |
| Clear sunrise | 400 | 0\.08 | \- |
| Office | 500 | 0\.1 | \- |
| TV studio | 1,000 | 0\.2 | \- |
| Overcast day | 15,000 | 3\.0 | \~ 1\.5 |
| Indirect sunlight \(in shadow\) | 20,000 | 4\.0 | \~ 2\.0 |
| Direct sunlight | 100,000 | 20\.0 | \~ 10\.0 |

The **Auto Exposure Key** setting controls the amount of light exposure and determines whether the tone\-mapped image appears relatively bright or dark\. This setting is calculated automatically from the average scene illuminance, which is why it is important to use standard real\-world illuminance levels\. For other settings that affect the tone mapping of a scene, see [HDR Settings](/docs/userguide/rendering/lighting/hdr-tone-mapping.md)\.

Lumberyard's auto\-exposure mode works in exposure value \(EV\) units and can be enabled using the **r\_HDREyeAdaptationMode** console variable\.

The following settings are used to achieve the desired illuminance in an environment level\. See [Setting Daytime Atmospheric Effects](/docs/userguide/sky/day-atmosphere.md) for more information\.
+ Sun color
+ Sun color multiplier
+ Sun intensity
+ Sun intensity multiplier