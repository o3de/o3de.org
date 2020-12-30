---
description: ' Use the OccluderArea component to create a custom shaped occlusion
  plane with four vertices in &ALYlong;. '
slug: component-occluder-area
title: OccluderArea
---
# OccluderArea<a name="component-occluder-area"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can use the **OccluderArea** component to create a custom\-shaped occlusion plane with four vertices\. This is useful if you don't want Lumberyard to render everything that is behind the **OccluderArea** component\. This can result in better performance in areas where automatic occlusion doesn't work well\. For example, if you have many objects behind a wall, you can add an occluder area behind the wall so that those objects don't appear\.

**Note**  
You can't modify the **[OccluderArea](#component-occluder-area)**, **[Portal](component-portal.md)**, and **[VisArea](component-vis-area.md)** components at runtime\. 

**Topics**
+ [OccluderArea Component Properties](#component-occluder-area-properties)
+ [Occluder Area Component Example](#component-occluder-area-example)

## OccluderArea Component Properties<a name="component-occluder-area-properties"></a>

![\[The Occluder Area component properties in Lumberyard Editor.\]](/images/userguide/component/occluder-area-component-properties.png)

The **OccluderArea** component has the following properties\.


****  

| Name | Description | 
| --- | --- | 
|  **DisplayFilled**  |  Displays the occluder area as a filled volume in the Lumberyard Editor viewport\.  | 
|  **CullDistRatio**  |  A multiplier on the range where the culling effect stops\.   | 
| UseInIndoors |  The occluder area works inside visible areas\.  | 
| DoubleSide |  Specifies whether the occluder area works from both sides\.  | 
| Vertices |  The vertices that define the shape of the occluder area\. Occluder areas always have four vertices\.  | 
|  **Edit**  | Choose Edit, and the component is locked for editing\. For more information, see [Editing Components in the Viewport](edit-mode-for-components.md)\. | 

## Occluder Area Component Example<a name="component-occluder-area-example"></a>

The following example shows two boxes\. One box is hidden behind the occluder area, but you can see its shadow\. The other box is outside the occluder area and appears normally on screen\.

![\[OccluderArea component with two boxes.\]](/images/userguide/component-occluderarea.png)