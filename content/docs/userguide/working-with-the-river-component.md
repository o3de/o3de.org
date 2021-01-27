---
description: null
title: Working with the River Component
---
# Working with the River Component {#working-with-the-river-component}

See the following procedures to create a river and modify its appearance\.

**Contents**
+ [Creating a River](#creating-river)
+ [Modifying the River Width](#modifying-river-width)
+ [Erasing River Vegetation](#erasing-river-vegetation)
+ [Setting River Material Properties](#setting-river-material-properties)

## Creating a River {#creating-river}

To create a realistic river, use the **River** component's **Carve River Bed** tool to prepare the surrounding terrain\. This tool carves out a riverbed and creates riverbanks on the edges of the river that are higher than the river's water level\.

You can also paint the river bottom with a different texture than the surrounding area\. This is useful if the water has translucent properties\. For more information on painting the terrain, see [Painting Terrain Texture Layers](/docs/userguide/terrain/texture-layers-paint.md)\.

**To create a river**

1. [Create an entity\.](/docs/userguide/creating-entity.md)

1. [Add](/docs/userguide/components/working-adding.md) the **River** component\.

1. Add the **[Spline](/docs/userguide/components/spline.md)** component\.

   The **Spline** component defines the path and shape of the river\. For information about how to add, remove, and edit individual points, see the **[Spline](/docs/userguide/components/spline.md)** component\.

1. Under **Terrain Editing**, specify values for the following parameters:
   + **Border width** - Sets the width of the slope on the river's sides\.
   + **Embankment height** - Defines the height of the hills on the river edges\. If the river is at ground level, this parameter makes the river appear to flow in the riverbed\.
   + **Depth of the river bed** - Defines the depth of riverbed\.
   + **Riverbed width offset** - Defines the width of the riverbed in relation to the river's width\. For example, a value of `0` makes the riverbed the same width as the river; `-1` makes the riverbed one meter narrower than the river; `1` makes the riverbed one meter wider than the river\.

1. Click **Carve River Bed**\.

**Example**  
A river on the ground before a riverbed has been carved out\.  

![\[River on the ground before carving a riverbed.\]](/images/userguide/component/carving-riverbed-1.png)
A river with a **Border width** of `5.0`, **Embankment** of `1.0`, **Depth** of `2.0`, and **River bed offset** of `-1`\.  

![\[Example river with a smaller embankment and border width.\]](/images/userguide/component/carving-riverbed-2.png)
A river with a **Border width** of `10.0`, **Embankment** of `3.0`, **Depth** of `2.0`, and **River bed offset** of `-1`\.  

![\[Example river with a larger border width and embankment.\]](/images/userguide/component/carving-riverbed-3.png)
You can also lower the river below the ground level and carve the riverbed\. This achieves a different type of terrain deformation\.  
A river with a **Border width** of `10.0`, **Embankment** of `1.0`, **Depth** of `2.0`, and **River bed offset** of `-1`\. This river is positioned below ground level\.  

![\[Example river that is below ground level.\]](/images/userguide/component/carving-riverbed-4.png)

## Modifying the River Width {#modifying-river-width}

You can use the **Global width** parameter to adjust the river's width\. This parameter modifies all the points on the river\.

For more refined control over the river's width, you can adjust the individual points with the **Per\-Vertex Width Modifiers** parameter\.

![\[Per-Vertex Width Modifications with four Elements\]](/images/userguide/component/modifying-road-width-1.png)

**To adjust the width of individual points**
+ In the **River** component, specify a negative or positive number for the element that you want to modify\.

  Negative numbers subtract from the **Global Width** parameter, while positive numbers add to it\. A value of `0` means that point is at global width\.  
**Example**  

  The global width of this river is 2, and the width at the selected point is set to `5`\. That means the total width at the selected point is `7`\.  
![\[River with one vertex widened\]](/images/userguide/component/modifying-river-width-2.png)

## Erasing River Vegetation {#erasing-river-vegetation}

You can erase vegetation around the river's borders\.

**To erase vegetation**

1. In the **River** component, for **Vegetation Editing**, set the **Erase width**\. This defines the amount of vegetation to erase at the river's edges\.

1. Set the **Erase variance**\. This parameter randomizes the removal of vegetation so that the edge looks more natural\.

## Setting River Material Properties {#setting-river-material-properties}

The road material must use the [WaterVolume Shader](/docs/userguide/shaders/watervolume.md)\. 

**To set the river material**

1. Press **M** or navigate to **Tools**, **Material Editor**

1. Select the **defaultRiver** or other appropriate river material\.

![\[WaterVolume Shader parameters\]](/images/userguide/component/setting-river-materials-1.png)

For information about the **WaterVolume Shader** properties, see [WaterVolume Shader](/docs/userguide/shaders/watervolume.md)\.