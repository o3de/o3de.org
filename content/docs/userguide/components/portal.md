---
description: ' Use the Portal component to create efficient indoor spaces in &ALYlong;. '
title: Portal
---
# Portal<a name="component-portal"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Use the **Portal** component to create efficient indoor areas with the **[VisArea](/docs/userguide/components/vis-area.md)** component\. You can use portals to specify areas where you can look out of a visible area and see beyond it, such as windows or doors between visible areas\.

To use the **Portal** component, its volume must overlap at least two or more visible areas\.

**Note**  
You can't modify the **[OccluderArea](/docs/userguide/components/occluder-area.md)**, **[Portal](#component-portal)**, and **[VisArea](/docs/userguide/components/vis-area.md)** components at runtime\. 

**Topics**
+ [Portal Component Properties](#component-portal-properties)
+ [Portal Component Examples](#component-portal-examples)

## Portal Component Properties<a name="component-portal-properties"></a>

![\[The Portal component properties in Lumberyard Editor.\]](/images/userguide/component/portal-component-properties.png)

The **Portal** component has the following properties\.


****  

| Name | Description | 
| --- | --- | 
|  **Height**  |  The height of the portal\.  | 
|  **DisplayFilled**  |  Displays the portal as a filled volume in the Lumberyard Editor viewport\.  | 
|  **AffectedBySun**  |  Specifies whether the sun affects objects in the portal\.  | 
|  **ViewDistRatio**  |  A multiplier on how far the portal is rendered\.  | 
|  **SkyOnly**  |  Renders only the skybox outside the portal\.  | 
|  **OceanIsVisible**  |  Renders the ocean outside the portal\.   | 
|  **UseDeepness**  |  The portal is treated as an object with a volume instead of a plane\.  If `false`, the portal acts as if it does not have a volume and is treated like a plane between the four floor points\.  | 
|  **DoubleSide**  |  Cameras can look through the portal from both sides\. If `false`, the portal only works from one side\.  | 
|  **LightBlending**  |  Specify whether to blend light between connected visible areas\.  | 
|  **LightBlendValue**  |  The amount of light to blend between connected visible areas\.  | 
|  **Vertices**  |  The vertices that define the floor of the portal\.   | 
|  **Edit**  | Choose Edit, and the component is locked for editing\. For more information, see [Editing Components in the Viewport](/docs/userguide/edit-mode-for-components.md)\. | 

## Portal Component Examples<a name="component-portal-examples"></a>

**Example 1**  
In the following examples, two boxes are inside several visible areas\. The visible areas are connected by the portals, which are green\. The portal lets you see between the visible areas\. The shadows of the boxes inside the visible areas appear because the **AffectedBySun** option is enabled\.  

![\[Two Portal components connecting multiple VisArea components.\]](/images/userguide/component/component-portal-1.png)

**Example 2**  
The following example shows how the portal lets you see between two visible areas\. Although the boxes are in separate visible areas, the portal creates a window between them so that you can see both boxes\.  

![\[Portal component creates a window between two visible areas.\]](/images/userguide/component/component-portal-2.png)

**Example 3**  
In the following example, you see the portal at an angle\. You can't see the box in the other visible area because there is no portal in that line of sight\.  

![\[Portal doesn't render objects that aren't in the line of sight.\]](/images/userguide/component/component-portal-3.png)

**Example 4**  
In the following example, you can see a box through a different portal, but because the **DoubleSide** option is disabled, the portal is one\-sided\.  

![\[Portal component with DoubleSide option disabled.\]](/images/userguide/component/component-portal-4.png)

**Example 5**  
In the following example, if you go through the portal and look back, you can see the other visible areas, but you can't see the boxes in those areas\. You can't see through portals that aren't connected to the visible area that you're in\.   

![\[Visible areas must be connected with a Portal component to view between them.\]](/images/userguide/component-portal-5.png)