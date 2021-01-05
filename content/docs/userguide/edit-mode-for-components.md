---
description: ' You can use component edit mode so that you can specifically edit one
  component at a time in &ALYlong;. '
slug: edit-mode-for-components
title: Editing Components in the Viewport
---
# Editing Components in the Viewport<a name="edit-mode-for-components"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

When you're working with components, you can lock a single component for editing\. You can't edit any other components that are attached to the entity\. This feature prevents you from accidentally editing other components that are attached to the entity\. For example, if you have an entity with attached **Spline** and **Mesh** components, you can lock the **Spline** component, make your changes to the spline, and stop editing\.

This feature supports the following components: <a name="supported-components-viewport-interaction-model"></a>
+ **[Box Shape](/docs/userguide/components/shapes.md)**
+ **[OccluderArea](/docs/userguide/components/occluder-area.md)**
+ **[Portal](/docs/userguide/components/portal.md)**
+ **[Polygon Prism Shape](/docs/userguide/components/polygon-prism.md)**
+ **[Spline](/docs/userguide/components/spline.md)**
+ **[Tube Shape](/docs/userguide/components/tube-shape.md)**
+ **[VisArea](/docs/userguide/components/vis-area.md)**

**Topics**
+ [Editing a Single Component in the Viewport](#editing-components-in-viewport)
+ [Editing Multiple Components in the Viewport](#editing-multiple-component-in-the-viewport)

If you want to add this feature to other components, you must make code changes to Lumberyard Editor\. For more information, see the [Programmer's Guide to Component Mode](working-with-component-mode-programmatically.md)\.

## Editing a Single Component in the Viewport<a name="editing-components-in-viewport"></a>

For components that support this feature, the component is locked when you edit its properties in the viewport\.

**To edit a single component in Component Mode**

1. In Lumberyard Editor, create an entity\. See [Creating an Entity](creating-entity.md)\. 

1. In the **Entity Inspector**, choose **Add Component** and select the **Spline** component\.  
**Example**  

   An entity with the **Spline** component appears in the viewport\.  
![\[Example Spline component in the viewport.\]](/images/userguide/componentmode/using-component-mode-1.png)

1. In the viewport, double\-click the spline or, in the **Entity Inspector**, click **Edit**\.  
![\[Example Spline component with the Component Mode option.\]](/images/userguide/using-component-mode-3.png)  
**Example**  

   The manipulator appears in the viewport\. The vertices turn red\. When you select a vertex, the manipulator appears\.  
![\[Example Spline component with the component manipulator.\]](/images/userguide/componentmode/using-component-mode-2.png)

   All other components attached to the entity are dimmed in the **Entity Inspector**, and you can't edit them\.  
![\[Example Spline component with the Component Mode option enabled and all other components dimmed.\]](/images/userguide/using-component-mode-4.png)

1. Select a vertex and make changes such as adding, moving, or deleting vertices\.  
![\[Example editing a component directly in the viewport.\]](/images/userguide/componentmode/using-component-mode-6.png)

1. When you've finished, press **Esc** or, in the **Entity Inspector**, on the component, click **Done**\. 

   The vertices become yellow again\.  
![\[Modify the component in the viewport using the manipulator in Lumberyard.\]](/images/userguide/componentmode/using-component-mode-7.png)

## Editing Multiple Components in the Viewport<a name="editing-multiple-component-in-the-viewport"></a>

In some cases, Component Mode supports editing multiple components\. This is useful when you want to lock a specific component type for editing\. Component Mode supports this feature in the following cases:
+ An entity has dependent components, such as the **Tube Shape** and **Spline** components
+ You select multiple entities that all have the same component that supports Component Mode \(such as a **Box Shape**\)

**To edit multiple components in Component Mode**

1. In Lumberyard Editor, create an entity\. See [Creating an Entity](creating-entity.md)\. 

1. In the **Entity Inspector**, choose **Add Component** and then select components that have this feature\. See [supported components](#supported-components-viewport-interaction-model)\. 

1. In the **Entity Inspector**, choose **Edit**\. You can't edit the **Transform** component, but the **Spline** and **Tube Shape** components are active\.

1. Make your changes to the component\. 

1. To switch between components, do one of the following:
   + Select the entity and press **Tab**\. The **Entity Inspector** highlights the selected component\.
   + In the Lumberyard Editor toolbar menu, choose **Edit** and choose **Edit Next** or **Edit Previous**\.  
**Example**  

   The **Transform** component is dimmed, but you can edit the **Spline** and **Tube Shape** components\.  
![\[Example entity with two components that can be edited at the same time.\]](/images/userguide/componentmode/using-component-mode-5.png)

   In the following example, a radius for the **Tube Shape** is selected\.  
![\[Example Tube Shape component that you can edit in Lumberyard.\]](/images/userguide/componentmode/using-component-mode-8.png)

**Note**  
The Lumberyard Editor **Edit** menu shows the available actions for the selected component\. You can specify different shortcuts except for the **Save**, **Undo**, and **Redo** actions\.  

**Example**  
For example, if you select a vertex point for a **Tube Shape** component, the **Edit** menu shows the available shortcuts\.  

![\[Shortcuts in the Edit menu when editing a component in Lumberyard.\]](/images/userguide/componentmode/using-component-mode-11.png)