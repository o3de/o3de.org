---
description: ' Use layout components in O3DE''s UI Editor to organize child
  elements into columns, rows, or a grid. '
title: Layout Components
---
# Layout Components {#ui-editor-components-layout}

Like other UI components, layout components define the layout properties of your game's interface\. The UI system features four layout components to organize your elements: **LayoutColumn**, **LayoutRow**, **LayoutGrid**, and **LayoutCell**\. You can also nest layout components\.

**Topics**
+ [LayoutColumn](/docs/user-guide/features/interactivity/user-interface/editor/components-layout-column.md)
+ [LayoutRow](/docs/user-guide/features/interactivity/user-interface/editor/components-layout-row.md)
+ [LayoutGrid](/docs/user-guide/features/interactivity/user-interface/editor/components-layout-grid.md)
+ [LayoutCell](/docs/user-guide/features/interactivity/user-interface/editor/components-layout-cell.md)
+ [LayoutFitter](/docs/user-guide/features/interactivity/user-interface/editor/components-layout-fitter.md)
+ [Nesting Layout Components](/docs/user-guide/features/interactivity/user-interface/editor/components-layout-nesting.md)

**LayoutColumn**
Add the **LayoutColumn** component to an element to make it a layout column\. When you add child elements to the layout column, the layout column assigns each child element a layout cell\. The layout column adjusts the size of the layout cells depending on how many child elements you add as well as the values provided by the child elements' layout cells\.

**LayoutRow**
Add the **LayoutRow** component to an element to make it a layout row\. Like the layout column, the layout row assigns each child elements a layout cell\. The layout row adjusts the size of the layout cells depending on how many child elements you add and the values provided by the child elements' layout cells\.

**LayoutGrid**
Add the **LayoutGrid** component to an element to make it a layout grid\. The layout grid places child elements into a grid\. Unlike the layout row and layout column, however, the layout grid does not use layout cells\. The **LayoutGrid** component's properties determine the size of its children\.

**LayoutCell**
Add the **LayoutCell** component to a layout row or layout column's children to customize how a layout cell's size is determined\. A layout cell is a programmatic concept whose properties define the area of a child element\. Anytime that you add a child element to a layout row or layout column, that child element receives layout cell properties \(not visible in the **UI Editor**\), which determine the size of the child's space\. You can override the layout cell's calculated properties by adding the **LayoutCell** component to the child\. For more information, see [LayoutCell](/docs/user-guide/features/interactivity/user-interface/editor/components-layout-cell.md)\.

**LayoutFitter**
Add the **LayoutFitter** component to an element to make the element resize itself to fit its content\. Use the layout fitter component with other components that provide cell sizing information, such as text, image \(with **ImageType** set to **Fixed**\), or layout components \(cell, row, column, grid\)\. For more information, see [LayoutFitter](/docs/user-guide/features/interactivity/user-interface/editor/components-layout-fitter.md)\.