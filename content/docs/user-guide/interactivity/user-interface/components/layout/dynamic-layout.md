---
linkTitle: UI Dynamic Layout
description: Use the Dynamic Layout component together with the layout components to display dynamic content in a game UI in Open 3D Engine (O3DE).
title: UI Dynamic Layout Component
weight: 550
---

With the **DynamicLayout** component, you can change the number of children of the layout element at run time. To use the **DynamicLayout** component, you place it on an element that also has a [**LayoutColumn**](components-layout-column), [**LayoutRow**](components-layout-row), or [**LayoutGrid**](components-layout-grid) component.

The layout element (1) dynamically resizes to fit its child elements. The first child (2) of the layout element acts as the prototype element. At run time, the UI system clones the prototype element to achieve the specified number of children in the layout.

![Layout element and child in Hierarcy pane](/images/user-guide/interactivity/user-interface/components/ui-editor-components-dynamic-child.png)

The automatic resizing of the layout element depends on the layout type.

For [**LayoutColumn**](components-layout-column) and [**LayoutRow**](components-layout-row) elements, the layout element resizes in order to keep all of the child elements the same size as the prototype element.

For a [**LayoutGrid**](components-layout-grid) element, the cell size of the **LayoutGrid** component determines the size of the child elements. The **LayoutGrid** element's initial size determines the number of children that can fit in each row or each column, depending on fill direction or **Order** settings. If the **Starting with** fill direction is **horizontal**, the UI system uses the **LayoutGrid** element's initial width to determine how many children fit in each row. If set to **vertical**, the initial height is used to determine how many children fit in each column.

![Order setting 'Starting with' set to 'Horizontal'](/images/user-guide/interactivity/user-interface/components/ui-editor-components-dynamic-fillorder.png)

**To use a dynamic layout component**

1. In the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor), add a **LayoutRow**, **LayoutColumn**, or **LayoutGrid** prefab. To do this, choose **New**, **Element from Prefab**. Then select one of the layout elements.

   This serves as the structure or framework to hold your dynamic content.

1. Add a **DynamicLayout** component to your layout component. To do this, in the **Properties** pane choose **Add Component**, **DynamicLayout**.

   For **Num Cloned Elements**, enter the initial number of children to be created.

1. Create a child entity that has an **Image** component. To do this, right-click your layout component in the **Hierarchy** pane and choose **New**, **Element from Prefab**, **Image**.

   This image serves as the prototype element that will be cloned and filled with dynamic content.
