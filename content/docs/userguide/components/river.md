---
description: ' Use the River component to carve riverbeds into the terrain and fill
  them with moving water in &ALYlong;. '
title: River
---
# River<a name="component-river"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Use the **River** component to carve riverbeds into the terrain and fill them with moving water\. The **River** component uses 2D materials to create the illusion of flowing water\. Optimally, you should use this component to create flat rivers along level terrain\. To create rivers that run downhill, you can create a series of rivers separated by occasional waterfalls\.

The **River** component requires the **[Spline](/docs/userguide/components/spline.md)** component to shape its path along the x, y, and z axes\. After you place a river, you can edit the points in the river's spline\.

To use the **River** component, you must [enable](/docs/userguide/gems/using-project-configurator.md) the **Roads and Rivers** gem\. For more information, see [Enabling Gems](/docs/userguide/gems/using-project-configurator.md)\.

![\[Example animation of the River component.\]](/images/userguide/shared-component-river.gif)

**Topics**
+ [River Properties](#component-river-properties)
+ [Working with the River Component](/docs/userguide/working-with-the-river-component.md)
+ [River Request Bus Interface](/docs/userguide/components/river-riverrequestbus-interface-ebus.md)

## River Properties<a name="component-river-properties"></a>

![\[River component properties.\]](/images/userguide/component/component-river-properties.png)

See the following **River** component properties\.


****  

| Name | Description | 
| --- | --- | 
| Global width | Sets the width of the river\. | 
| Per\-Vertex Width Modifiers | Modifies the width at a specific vertex that is added to or subtracted from the Global width\. For more information, see [Modifying the River Width](working-with-the-river-component.md#modifying-river-width)\. | 
| Elements | The river's vertices or points\. Specify a positive or negative value for each vertex\. | 
| Segment length | Length of each segment\. Smaller segment lengths increase the polycount used for the river curvature\. To create a river with smooth corners, specify lower values\. | 
| Tile length | Length of the river texture\. Adjust this parameter with Segment Length to avoid stretching textures\. | 
| Sort priority | Priority that you can set if the river intersects with another river\. | 
| View distance multiplier | Distance at which the river is visible\. The default value is 1\. A higher value indicates a longer visibility distance\. | 
| Minimum spec | Specifies the minimum system configuration level for the effect\. If the configuration is lower than the set value, the river will not appear\. Choose from Low, Medium, High, VeryHigh, and Never\.Default value: **Low** | 
| Tile width | Width of the river texture\. | 
| Depth | Depth of the river\. | 
| River material | Material file for the river\. For more information, see [Setting River Material Properties](working-with-the-river-component.md#setting-river-material-properties)\. | 
| Cap at Depth | If selected, limit fog rendering to the river's bottom\. If deselected, fog continues to render below the specified depth of the river\. | 
| Density | Specifies how dense the fog appears\. Specify higher values for thicker fog\. | 
| Color | Color of the fog\. | 
| Affected by Sun | If selected, the value for the Sun color parameter in the [Time of Day Editor](/docs/userguide/sky/day-sun-params.md) affects fog color of the river\. | 
| Shadowing | Sets the shadow darkness on the surface of the river\. To enable this parameter, set the console variable `r_FogShadowsWater` to `1`\. For more information, see [Using the Console Window](/docs/userguide/console-intro.md)\. | 
| Caustics \- Enabled | Enables caustics – Light rays that are reflected or refracted by the water's surface\. | 
| Intensity | Intensity of normals during caustics generation\. | 
| Height | Distance above water's surface that caustics are visible\. | 
| Tiling | Tiling of normals during caustic generation\. | 
| Physics \- Enabled | Bind river with CryPhysics\. | 
| Speed | Defines how fast physicalized objects are moved along the river\. Negative values move objects in the opposite direction\. | 
| Border width | Specifies the width of the slope on the borders of the river\. | 
| Embankment height | Defines the height of the slopes on the borders of the river\. If the river is at ground level, specify an embankment height to make the river appear to flow\. | 
| Depth of the river bed | Defines the depth of the ditch beneath the river\. | 
| River bed width offset | Defines the width of the riverbed relative to the river's width\. A value of 0 makes the riverbed the same width as the river\. A value of \-1 makes the riverbed one meter narrower, and so on\. | 
| Erase width |  Distance from the river edges in which the vegetation should be removed\. Set the parameter to `0` to remove only vegetation that is on the river\. Specify positive values to remove vegetation in a wider border from the river's edge\. Specify negative values to leave some vegetation within the borders of the river\.  For more information, see [Erasing River Vegetation](working-with-the-river-component.md#erasing-river-vegetation)\.  | 
| Erase variance | Randomizes the removal of vegetation so that the edge looks more natural\. | 