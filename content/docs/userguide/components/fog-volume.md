---
description: ' Use the &ALYlong; Fog Volume to create a fog volume in your game. '
title: Fog Volume
---
# Fog Volume {#component-fog-volume}


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can use the **Fog Volume** component to create fog effects in your game\. For more information, see [Volumetric Fog](/docs/userguide/rendering/fog-volumetric.md)\.

By default, the **Fog Volume** component renders in nonvolumetric mode\. To enable volumetric rendering, you must specify the `e_VolumetricFog` console variable\. For more information, see [Console Variables for Volumetric Fog](/docs/userguide/rendering/fog-volumetric-console-variables.md) and [Using the Console Window](/docs/userguide/console-intro.md)\.

**Note**  
The **Fog Volume** component must have a **[Box Shape](/docs/userguide/components/shapes.md)** component attached to the entity\. The entity uses the **Box Shape** component to set the area of the fog\.

You can also change global fog properties in the **Time of Day** editor\. For more information, see [Setting Global \(Time of Day\) Fog](/docs/userguide/weather/fog-global.md)\.

![\[Fog Volume component example.\]](/images/userguide/component/fog-component-example.png)

**Contents**
+ [Fog Volume Properties](#component-fog-volume-properties)
  + [Rendering General](#component-fog-volume-rendering-general)
  + [Fall Off Settings](#component-fog-volume-fall-off-settings)
  + [Ramp \(Volumetric Fog Only\)](#component-fog-volume-ramp)
  + [Density Noise \(Volumetric Fog Only\)](#component-fog-volume-density-noise)
  + [Light Component Fog Properties](#fog-component-light-property)
+ [Volumetric Fog Examples](#component-fog-examples)

## Fog Volume Properties {#component-fog-volume-properties}

The **Fog Volume** component has the following properties: 

**Volume type**  
Specify the volume shape, which can be an ellipsoid or cuboid\. A **[Box Shape](/docs/userguide/components/shapes.md)** component attached to the entity defines the boundaries for both shapes\.

**Color**  
Color of the fog\. Specify a color with the **Color Picker**\.  
Default: `255`, `255`, `255`

**HDR Dynamic \(Nonvolumetric fog only\)**  
Specify the brightness of the fog color\.  
Default: `0`  
Valid values: `0` – `20`

**Use global fog color**  
If `true`, the **Color** property is ignored, and the global fog color is used instead\. In the **Time of Day** editor, you can specify the global fog color with the **Color \(bottom\)** parameter\. For more information, see [Setting Global \(Time of Day\) Fog](/docs/userguide/weather/fog-global.md)\.  
Default: `False`

**Soft edges**  
Specify a factor to soften the edges of the fog volume\. When you view the fog volume, the fog gradually fades into the surrounding area\.   
Default: `1`  
Valid values: `0` to `1`

**Wind influence \(Volumetric fog only\)**  
Specify the influence that the global wind has on the fog volume\.  
Default: `1`  
Valid values: `0` to `20`

**Fog Density**  
Specify the density of the fog volume\.  
Default: `1`  
Valid values: `0` to `1000`

**Density offset**  
Specify the offset of the density of the fog volume\. Specify higher values to reduce fog density around the edges\.  
Default: `0`  
Valid values: `-1000` to `1000`

**Near cutoff**  
Stops rendering the fog volume, depending on the camera distance from the object, in meters\.  
Default: `0`  
Valid values: `0` to `2`

### Rendering General {#component-fog-volume-rendering-general}

The **Fog Volume** component has the following rendering options: 

** Minimum spec**  
Minimum specifications for the fog volume to be active\.  
Default: Low

**View distance multiplier**  
Adjusts the maximum view distance\.  
Default: `1`  
Valid values: `0` to ∞ \(infinity\)

**Ignore vis\. areas**  
Specify whether the **Fog Volume** component affects visible areas and clip volumes\. If `true`, the fog volume does not affect visible areas and clip volumes\.  
Default: `False`

**Affect this area only**  
Specify whether the **Fog Volume** component affects only the specified area\. If `false`, the **Fog Volume** component can affect multiple visible areas and clip volumes\.   
Default: `False`

### Fall Off Settings {#component-fog-volume-fall-off-settings}

The **Fog Volume** component has the following fall off settings: 

**Longitude**  
Direction of the fall off or where the fog starts to fade in the world space\. Specify a value of `0` so that the fog starts to fade on the east side of the **Fog Volume** component\.  
Default: `0`  
Valid values: `0` to `360`

** Latitude**  
Direction of the fall off or where the fog starts to fade in the world space\. Specify a value of `90` so that the fog starts to fade on top of the **Fog Volume** component\.  
For more information, see [Volumetric Fog Examples](#component-fog-examples)\.  
Default: `90`  
Valid values: `0` to `360`

**Shift**  
Specify how much to move the fog density along the fall\-off direction\. Specify a positive value to move thicker fog layers along the fall off direction of the fog volume\. Specify a negative value to move thicker layers along the opposite direction\.   
Default: `0`  
Valid values: `-50` — `50`

**Scale**  
Scales the density distribution along the fall\-off direction\. Specify higher values to make the fog fall off more rapidly\.  
Default: `1`  
Valid values: `-50` to `50`

### Ramp \(Volumetric Fog Only\) {#component-fog-volume-ramp}

The **Fog Volume** component has the following ramp options: 

**Start**  
Specify the start distance of the fog density ramp, in meters\.   
Default: `1`  
Valid values: `0` to `30000`

**End**  
Specify the end distance of the fog density ramp, in meters\.   
Default: `50`  
Valid values: `0` to `30000`

**Influence**  
Specify the influence of the fog density ramp\.  
Default: `0`  
Valid values: `0` to `1`

### Density Noise \(Volumetric Fog Only\) {#component-fog-volume-density-noise}

The **Fog Volume** component has the following density noise options: 

**Scale**  
Specify the noise value for the fog volume density\. This parameter defines the thickness of the individual patches of fog\. Specify a low value to thin out the fog density and increase the space between patches of fog\.  
Default: `1`  
Valid values: `0` to `10`

**Offset**  
Offsets the noise value for the density\. Specify a value to break the solid shape of the fog volume into patches\.   
Default: `1`  
Valid values: `-2` to `2`

**Time frequency**  
Specify the time frequency of the noise for the density\. Specify high frequencies to create fog that changes quickly\. You can use this parameter to cause the individual fog patches to morph into different shapes over the course of their lifetime\.   
As a best practice, specify a low value\. High values can cause the fog to morph too quickly\.
Default: `0`  
Valid values: `0` to `1`

**Spatial frequency**  
Specify the spatial frequency of the noise for the density\. You can use this parameter to define the amount of patchy fog in the fog volume\. You can increase the z\-value to create a layered effect in the volume; this stacks fog patches on top of each other\. Specify higher x\- and y\-values to create more individual fog patches within the volume\.  
Default: `10`, `10`, `10`

### Light Component Fog Properties {#fog-component-light-property}

If you add light components to your entities, you can also specify following parameters for light components:

**Volumetric Fog**  
Enables the light to affect volumetric fog\.

**Volumetric Fog Only**  
Enables the light to affect volumetric fog and not affect other objects, such as meshes\.

**Example**  
In the following example, the parameter **Volumetric Fog On** is enabled for the light component\.  

![\[Fog Volume component and light component where Volumetric Fog is enabled.\]](/images/userguide/component/fog-component-example-4.png)

**Example**  
In the following example, the parameter **Volumetric Fog** is disabled for the light component\.  

![\[Fog Volume component and light component where Volumetric Fog is disabled.\]](/images/userguide/fog-component-example-5.png)

For more information about light components, see [Rendering](/docs/userguide/components/components#component-entity-rendering)\.

## Volumetric Fog Examples {#component-fog-examples}

**Example**  
In the following example, the value for **Latitude** is `0`\. The fall off appears on the left side of the fog volume, along the x\-axis\.  

![\[Fog Volume component example with fall off on one side, or 0 degrees latitude.\]](/images/userguide/component/fog-component-example-2.png)

**Example**  
In the following example, the value for the **Latitude** is `90`\. The fall off appears on the top for the fog volume\.  

![\[Fog Volume component example fall off on the top of the volume, or 90 degrees latitude.\]](/images/userguide/component/fog-component-example-3.png)

**Note**  
For the **Fog Volume** component, the **Latitude** and **Longitude** parameters work in the world space\. Local transform changes do not affect these parameters\. The **Latitude** and **Longitude** parameters orient the fog volume on the xy\-plane\. You can specify different values to orient the fog volume in any direction\.