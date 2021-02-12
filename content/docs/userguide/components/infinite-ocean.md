---
description: ' Use the Amazon Lumberyard Infinite Ocean component to add an ocean surface
  to your level. '
title: Infinite Ocean
---
# Infinite Ocean {#component-infinite-ocean}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

You can use the **Infinite Ocean** component to add an ocean surface to your level\. The ocean expands to the horizon, no matter where the camera moves in the environment\.
+ Ocean simulation is based on a fast Fourier transform \(FFT\) noise\-based gradient, normal, and height maps, and mixes multiple frequencies and scale for ambient waves\.
+ Players can interact with ocean waves and generate wave propagation, such as shooting at the water\.
+ On higher\-end machines, vertex displacement is used and supports additional water interaction, such as buoyancy and floating objects\.

**Note**
To enable the **Infinite Ocean** component, you must enable the Water gem\. For more information, see [Add modular features and assets with Gems](/docs/userguide/gems/builtin/s.md)\.

**Example Infinite Ocean Component**

![\[Example Infinite Ocean component in Lumberyard.\]](/images/userguide/component/infiniteocean/infinite-ocean-component-1.png)

Water rendering in real time is complex due to visual and physical contributing factors\. For example, light behaves differently when it moves from air into water\. Most sunlight reflects off the ocean, but a large amount also penetrates into the water, which absorbs light more strongly than air\. The visible light consists of a rainbow with different wavelengths, which appears as different colors\.

For example, blue light penetrates farther in the water, giving the ocean its blue and green colors\. In contrast, the ocean absorbs red, orange, and yellow wavelengths, which removes these colors\. When light hits a substance, the light does one of the following:
+ The light hits molecules of a substance and then scatters and bounces off in different directions\.
+ The light passes through the substance\.
+ The substance absorbs the light, either completely or only some wavelengths\. In Lumberyard this is called *underwater fog*\.

In Lumberyard, various elements such as sunlight, reflections, and environment probes contribute to how the ocean surface renders\. These elements approximate how light is scattered and absorbed in the ocean\.



**Topics**
+ [Adding the Infinite Ocean Component](#adding-the-infinite-ocean-component)
+ [Understanding Water Properties](/docs/userguide/components/ocean/water-properties-examples.md)
+ [Infinite Ocean Component Properties](/docs/userguide/components/ocean/properties.md)
+ [Water Shader Material for the Infinite Ocean Component](/docs/userguide/components/ocean/water-shader-material.md)
+ [Best Practices Working with the Infinite Ocean Component](/docs/userguide/components/ocean/best-practices.md)
+ [Additional Workflow](/docs/userguide/components/ocean/additional-worklow.md)
+ [Console Variables for the Infinite Ocean Component](/docs/userguide/components/ocean/console-variables.md)
+ [Infinite Ocean Component with the Track View Editor](/docs/userguide/infinite-ocean-track-view-editor.md)
+ [Infinite Ocean Component Request Bus Interface](/docs/userguide/components/ocean/request-bus-interface.md)
+ [Using the Infinite Ocean Component with Script Canvas](/docs/userguide/components/ocean/working-with-script-canvas.md)

## Adding the Infinite Ocean Component {#adding-the-infinite-ocean-component}

**To create an infinite ocean in your level**

1. [Create an entity](/docs/userguide/creating-entity.md) in your level\.

1. In the **Entity Inspector**, click **Add Component**, and then choose the **Infinite Ocean** component\.

   For more information, see [Working with Components](/docs/userguide/components/working.md)\.