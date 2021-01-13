---
description: ' Use the Road component to create paths and align the terrain to roads
  in &ALYlong;. '
title: Road
---
# Road {#component-road}


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Use the **Road** component to create paths in Lumberyard Editor\. You can create roads that follow the curvature of existing terrain by applying a texture over the terrain texture\. You can also use the **Align heightmap** feature with the **Road** component to shape the terrain to the height and curvature of the road you placed\.

To enable the **Road** component, you must enable the **Roads and Rivers** gem\. For more information, see [Add modular features and assets with Gems](/docs/userguide/gems/builtin/s.md)\.

The **Road** requires the **[Spline](/docs/userguide/components/spline.md)** component to shape its path along the X, Y, and Z axes\. After you place a road, you can edit the points in the road's spline\.

**Note**  
You can rebuild roads at runtime by modifying the spline\. However, this method can be slow\. We recommended that you avoid modifying the spline continuously at runtime\.



**Topics**
+ [Road Properties](#road-properties)
+ [Creating a Road](#creating-a-road)
+ [Modifying Road Width](#modifying-road-width)
+ [Setting Road Material Properties](#setting-road-materials)
+ [Using Roads to Modify Terrain](#using-roads-to-modify-terrain)
+ [Erasing Vegetation](#erasing-road-vegetation)
+ [RoadRequestBus Interface](#component-road-ebus-request)
+ [RoadsAndRiversGeometryRequestsBus Interface](#component-roadsandriversgeometryrequestsbus-ebus)

## Road Properties {#road-properties}

![\[Road component properties.\]](/images/userguide/component/road-properties-1.png)

See the following **Road** properties:


****  

| Name | Description | 
| --- | --- | 
| Global width | Width of the road\. | 
| Per\-Vertex Width Modifiers | Width at a specific vertex that is added to or subtracted from the global width\. For more information, see [Modifying Road Width](#modifying-road-width)\. | 
| Elements | The road's vertices or points\. Specify a positive or negative number for each vertex\. | 
| Segment length | Length of each segment\. Smaller segment lengths increase the polycount used for the road surface\. To create a road with smooth corners, use smaller segment lengths\. | 
| Tile length | Length of the road texture\. Adjust Tile length with Segment length to avoid stretching textures\. | 
| Sort priority | Priority that you can use if the road is drawn over or under another road\. | 
| View distance multiplier |  Distance at which the road is visible\. A higher number indicates a longer visibility distance\.  The default value is `1`\.  | 
| Minimum spec | Specifies the minimum system configuration level for the effect\. If the configuration is lower than the set value, the road will not appear\. Choose from Low, Medium, High, VeryHigh, and Never\.Default value: **Low** | 
| Road material | Sets the material for the road\. For more information, see [Setting Road Material Properties](#setting-road-materials)\. | 
| Ignore terrain holes | If enabled, the road texture is rendered over terrain holes\. | 
| Border width | Width of the border extending from the sides of the road\. Use with the [**Align heightmap**](#using-roads-to-modify-terrain) feature\. | 
| Erase width |  Distance from the road edges in which the vegetation should be removed\. Specifying a value of `0` removes only vegetation that is on the road\. Specify positive values to remove vegetation in a wider border from the road's edge\. Specify negative values to leave some vegetation within the borders of the road\.  For more information, see [Erasing Vegetation](#erasing-road-vegetation)\.  | 
| Erase variance | Randomizes the removal of vegetation so that the road edges appear more natural\. | 

## Creating a Road {#creating-a-road}

**To create a road**

1. [Create an entity\.](/docs/userguide/creating-entity.md)

1. [Add](/docs/userguide/components/working-adding.md) the **Road** component\.

1. Add the **[Spline](/docs/userguide/components/spline.md)** component\.

   The **Spline** component defines the path and shape of the road\. For information about how to add, remove, and edit individual points, see [Spline](/docs/userguide/components/spline.md)\.

The road is created with the default material **defaultRoad**\. The **Spline** component defaults to the **Linear** **Spline Type** and contains four vertices \(0, 1, 2, 3\)\. For a road that curves smoothly, specify the [**Bezier**](/docs/userguide/components/spline#spline-type-bezier) **Spline Type**\.

![\[Basic road with default road material and four vertices placed with Linear Spline Type.\]](/images/userguide/component/creating-a-road.png)

## Modifying Road Width {#modifying-road-width}

You can modify the road's width by adjusting the road's **Global width** property\. Adjusting this property modifies all the points on the road\.

For more granular control over the road's width, you can adjust individual points with the **Per\-Vertex Width Modifiers** property\.

![\[Per-Vertex Width Modifications with four Elements\]](/images/userguide/component/modifying-road-width-1.png)

**To adjust the width of individual points**
+ In the **Road** component properties, enter a negative or positive number for the property that you want to modify\.

  Negative numbers subtract from the **Global width** property, while positive numbers add to it\. A value of `0` means that point is at global width\.  
**Example**  

  The global width of this road is `2`, and the width at the selected point is set to `5`\. The total width at the selected point is `7`\.  
![\[Road with one vertex widened\]](/images/userguide/component/modifying-road-width-2.png)

## Setting Road Material Properties {#setting-road-materials}

Roads are [Decals](/docs/userguide/components/decal.md) placed along a spline\. This makes the material setup of a road similar to that of decals\.

The road material must use the [Illum Shader](/docs/userguide/shaders/illum.md) and should also enable the **Decal** and **Vertex Colors** parameters in the **Shader Generation Params**\.

**To open the **Material Editor****

1. In Lumberyard Editor, choose **Tools**, **Material Editor** or press **M**\.

1. Select the road material and expand the **Shader Generation Params**, and select the following parameters:  
****Vertex Colors****  
Activates a blend fadeout at each end of the road\. This is a 100% to 0% fadeout over the length of the final step\. The textures and alpha channel have no influence on the fadeout\.  
****Decal****  
Enables alpha blending on the sides of the road, which comes from the diffuse texture's alpha channel\.

![\[Road with one vertex widened.\]](/images/userguide/component/setting-road-materials-1.png)

**Example**  
In the left image, **Vertex Colors** is enabled\. In the right image, the parameter is disabled\.  

![\[Road with Vertex Color enabled and disabled.\]](/images/userguide/component/setting-road-materials-2.png)

## Using Roads to Modify Terrain {#using-roads-to-modify-terrain}

You can use roads to modify the shape of the terrain\.

**To modify the terrain with roads**

1. [Create a road\.](#creating-a-road)

1. Manipulate the individual vertices to shape the road\. For more information, see [Spline](/docs/userguide/components/spline.md)\.

1. In the **Road** component's properties, under **Terrain Editing**, set the **Border width**\. This parameter defines the width of the slope at the edges of the road\.

1. Click **Align heightmap**\.

**Example**  
The following image shows a road that has been created and shaped, but not yet aligned\.  

![\[Road not yet aligned with terrain.\]](/images/userguide/component/using-roads-to-modify-terrain-1.png)

**Example**  
The following image shows the road and terrain after alignment with a **Border width** of `5`\.  

![\[Road aligned with terrain with Border width of 5.\]](/images/userguide/component/using-roads-to-modify-terrain-2.png)

**Example**  
The following image shows the road and terrain after alignment with a **Border width** of `20`\.  

![\[Road aligned with terrain with Border width of 5.\]](/images/userguide/component/using-roads-to-modify-terrain-3.png)

## Erasing Vegetation {#erasing-road-vegetation}

You can erase vegetation around the road's borders\.

**To erase vegetation**

1. In the **Road** component's properties, under **Vegetation Editing**, specify the **Erase width**\. This parameter defines the amount of vegetation to erase at the road's edges\.

1. Specify the **Erase variance**\. This parameter randomizes the removal of vegetation, so that the edge looks more natural\.

**Example**  
The following image shows the road with no vegetation erased\.  

![\[Road with no vegetation erased.\]](/images/userguide/component/erasing-road-vegetation-1.png)

**Example**  
The following image shows the road with **Erase width** set to `0`\.  

![\[Road with Erase width set to 0.\]](/images/userguide/component/erasing-road-vegetation-2.png)

**Example**  
The following image shows the road with **Erase width** set to `1` and **Erase variance** set to `5`\.  

![\[Road with Erase width set to 1 and Erase variance set to 5.\]](/images/userguide/shared-erasing-road-vegetation-3.png)

## RoadRequestBus Interface {#component-road-ebus-request}

Use the following request functions with the `RoadRequestBus` EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.


****  

| Request Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| Rebuild | Triggers full rebuild of the road object, including geometry and render node generation\. | None | None | Yes | 
| SetIgnoreTerrainHoles | Sets whether to allow the road texture to be rendered over terrain holes\. | Boolean | None | Yes | 

## RoadsAndRiversGeometryRequestsBus Interface {#component-roadsandriversgeometryrequestsbus-ebus}

Use the following request functions with the `RoadsAndRiversGeometryRequestsBus` EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.


****  

| Request Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
|  `SetVariableWidth`  | Sets the variable width along the river using the index of spline\. | AZ::u32, float | None | Yes | 
| SetGlobalWidth | Sets the uniform global width along the road or river\. This value is added to the variable width specified by the spline width attribute\. If no width attribute specified, the width of the spline geometry is uniform and equal to this parameter\. | float | None | Yes | 
| SetTileLength | Sets the tile length, which is the texture mapping scale along the geometry spline\. | float | None | Yes | 
| SetDesiredGranularity | Sets the desired granularity, which is the size of the polygon along the road or river\. Lower numbers generate more polygons\. | float | None | Yes | 