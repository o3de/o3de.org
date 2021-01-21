---
description: ' Use volumetric fog in your &ALY; level for fog that supports regular
  light and sunlight with dynamic shadows, environment probes, ambient light, as well
  as variations in fog density. '
title: Volumetric Fog
---
# Volumetric Fog {#rendering-graphics-fog-volumetric}

Volumetric fog uses volume textures as a view\-frustum\-shaped [voxel](/docs/userguide/ly-glos-chap#voxel) buffer to store incoming light and its properties\. Volumetric fog supports regular light and sunlight with dynamic shadows, environment probes, ambient light, as well as variations in fog density\. It also supports the application of volumetric fog with respect to opaque and transparent materials\.

**Example**
In the following example, volumetric fog is disabled\.

![\[Volumetric fog disabled\]](/images/userguide/rendering/rendering-graphics-volumetric-fog-disabled.png)

**Example**
In the following example, volumetric fog is enabled\.

![\[Volumetric fog enabled\]](/images/userguide/rendering/rendering-graphics-volumetric-fog-enabled.png)

You can add the **Fog Volume** component to an entity to create fog effects\. For more information, see the **[Fog Volume](/docs/userguide/components/fog-volume.md)** component\.

You can specify how light components affect volumetric fog\. For more information, see [Light Component Fog Properties](/docs/userguide/components/fog-volume#fog-component-light-property)\.

You can also use the **Particle Editor** to place a particle emitter in your level to add fog density to an area\. For more information, see the **Volume Fog** and **Volume Thickness** parameters for the **Advanced Attribute** in the [Particles Attributes Reference](/docs/userguide/particles/editor/reference.md)\.

To add localized nonvolumetric regions of fog, see [Using Fog Volumes](/docs/userguide/weather/fog-volumes.md)\.

**Topics**
+ [Best Practices for Volumetric Fog](/docs/userguide/rendering/fog-volumetric-bp.md)
+ [Setting Global \(Time of Day\) Volumetric Fog](/docs/userguide/rendering/fog-volumetric-global.md)
+ [Console Variables for Volumetric Fog](/docs/userguide/rendering/fog-volumetric-console-variables.md)