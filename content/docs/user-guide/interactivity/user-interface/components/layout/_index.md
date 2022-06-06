---
linkTitle: Layout Components
description: ' Use layout components in O3DE''s UI Editor to organize child elements into columns, rows, or a grid. '
title: Layout Components
weight: 500
---

Layout components define the arrangement of your game's interface. The UI system features four layout components to organize your elements: **LayoutColumn**, **LayoutRow**, **LayoutGrid**, and **LayoutCell**. You can also nest layout components.

## Section topics

| Topic | Description |
|---|---|
| [UI Layout Column](components-layout-column) | Add the **LayoutColumn** component to an element to make it a layout column. When you add child elements to the layout column, the layout column assigns each child element a layout cell. The layout column adjusts the size of the layout cells depending on how many child elements you add as well as the values provided by the child elements' layout cells. |
| [UI Layout Row](components-layout-row) | Add the **LayoutRow** component to an element to make it a layout row. Like the layout column, the layout row assigns each child elements a layout cell. The layout row adjusts the size of the layout cells depending on how many child elements you add and the values provided by the child elements' layout cells. |
| [UI Layout Grid](components-layout-grid) | Add the **LayoutGrid** component to an element to make it a layout grid. The layout grid places child elements into a grid. Unlike the layout row and layout column, however, the layout grid does not use layout cells. The **LayoutGrid** component's properties determine the size of its children. |
| [UI Layout Cell](components-layout-cell) | Add the **LayoutCell** component to a layout row or layout column's children to customize how a layout cell's size is determined. A layout cell is a programmatic concept whose properties define the area of a child element. Anytime that you add a child element to a layout row or layout column, that child element receives layout cell properties (not visible in the **UI Editor**), which determine the size of the child's space. You can override the layout cell's calculated properties by adding the **LayoutCell** component to the child. |
| [UI Layout Fitter](components-layout-fitter) | Add the **LayoutFitter** component to an element to make the element resize itself to fit its content. Use the layout fitter component with other components that provide cell sizing information, such as text, image (with **ImageType** set to **Fixed**), or layout components (cell, row, column, grid). |
| [UI Dynamic Layout](dynamic-layout) | With the **Dynamic Layout** component, you can change the number of children of layout elements at runtime. |
| [Nesting layout components](components-layout-nesting) | Learn how to nest layout components. |
