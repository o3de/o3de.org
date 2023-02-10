---
linkTitle: UI Dynamic Scroll Box
description: Use the Dynamic Scroll Box component to create Scroll Box elements at runtime in Open 3D Engine (O3DE).
title: UI Dynamic Scroll Box Component
weight: 185
---

With the **DynamicScrollBox** component, you can change the number of children of the scroll box's element at run time. To use the **DynamicScrollBox** component, you place it on an element that also has a **ScrollBox** component.

The content element dynamically resizes to fit its child elements. The first child of the content element acts as the prototype element. At run time, the UI system clones the prototype element to achieve the specified number of children in the layout.

With the **DynamicScrollBox** component, only the minimum number of child elements are actually created for display. This is different from the [**DynamicLayout**](../layout/dynamic-layout) component, where all child elements are created at run time and can consume a large amount of resources. The **DynamicScrollBox**'s elements are reused as the user scrolls; therefore, a scroll box can simulate a large number of children while maintaining good performance.

The **DynamicScrollBox** component automatically positions its children and resizes the content element to match the bounding box of its children. Each child's size is the same as the prototype element. By default, the children are positioned in a row from left to right. If vertical scrolling is enabled, the children are positioned in a column from top to bottom.

**To use a dynamic scroll box component**

1. In the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor), add a **Scrollbox** prefab. To do this, click **New**, **Element from Prefab**, **ScrollBox**.

   This serves as the structure or framework to hold your dynamic content.

1. Add a **DynamicScrollbox** component to your scroll box component. To do this, in the **Properties** pane choose **Add Component**, **DynamicScrollbox**.

   For **Default Num Elements**, enter the initial number of children to be created. This is mainly for previewing a canvas in **Preview** mode since the number of children ultimately comes from a custom component that implements the `UiDynamicScrollBoxDataBus`.

1. Create a child entity that has an **Image** component. To do this, right-click on your scroll box component in the **Hierarchy** pane, choose **New**, **Element from Prefab**, **Image**.

   This image serves as the prototype element that will be cloned and filled with dynamic content.

The **DynamicScrollBox** component uses a bus called `UiDynamicScrollBoxDataBus` to retrieve the number of children that the content element should have. It also uses a bus called `Ui DynamicScrollBoxElementNotificationBus` to notify when a child element is about to become visible. This is where you set up the child element with dynamic content. To do this, you must create and add to the scroll box element a custom component that implements these two buses.

## EBus Interface 

Use the following notification functions with the EBus interface to communicate with other components of your game.

 For more information about using the Event Bus (EBus) interface, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus).

### UiDynamicScrollBoxDataBus:GetNumElements 

Implement this bus to provide a dynamic scroll box the number of children it should clone.

Returns the number of children that the dynamic scroll box should clone.

**Parameters**
None

**Return**
Number of children to clone.

### Ui DynamicScrollBoxElementNotificationBus:OnElementBecomingVisible 

Implement this bus to receive notifications when elements of a dynamic scroll box are about to become visible.

Sends a signal when an element of a dynamic scroll box is about to become visible.

**Parameters**
`entityID` - The entity Id of the element that is about to become visible.
`index` - The index of the element that is about to become visible.

**Return**
None
