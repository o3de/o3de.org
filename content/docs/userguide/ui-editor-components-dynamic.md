# Dynamic Components<a name="ui-editor-components-dynamic"></a>

Dynamic components work together with [ Layout](ui-editor-components-layout.md) components and the [Scroll Box](ui-editor-components-scrollbox.md) component to display dynamic content in the user interface\.

To see in\-game examples of completed canvases with dynamic components, open the level **UiFeatures** in the project **SamplesProject**\. Press **Ctrl\+G** to play the game, and then choose **Components**, **Dynamic Components**\. You can view examples of different types of dynamic layouts and scroll boxes\. Press **Esc** to exit the game\.

## DynamicLayout<a name="ui-editor-components-dynamic-layout"></a>

To use the **DynamicLayout** component, you place it on an element that also has a [**LayoutColumn**](ui-editor-components-layout-column.md), [**LayoutRow**](ui-editor-components-layout-row.md), or [**LayoutGrid**](ui-editor-components-layout-grid.md) component\. With the **DynamicLayout** component, you can change the number of children of the layout element at run time\. 

The layout element \(1\) dynamically resizes to fit its child elements\. The first child \(2\) of the layout element acts as the prototype element\. At run time, the UI system clones the prototype element to achieve the specified number of children in the layout\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-dynamic-child.png)

The automatic resizing of the layout element depends on the layout type\. 

For [**LayoutColumn**](ui-editor-components-layout-column.md) and [**LayoutRow**](ui-editor-components-layout-row.md) elements, the layout element resizes in order to keep all of the child elements the same size as the prototype element\. 

For a [**LayoutGrid**](ui-editor-components-layout-grid.md) element, the cell size of the **LayoutGrid** component determines the size of the child elements\. The **LayoutGrid** element's initial size determines the number of children that can fit in each row or each column, depending on fill direction or **Order** settings\. If the **Starting with** fill direction is **horizontal**, the UI system uses the **LayoutGrid** element's initial width to determine how many children fit in each row\. If set to **vertical**, the initial height is used to determine how many children fit in each column\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-dynamic-fillorder.png)

**To use a dynamic layout component**

1. In the [**UI Editor**](ui-editor-using.md), add a **LayoutRow**, **LayoutColumn**, or **LayoutGrid** prefab\. To do this, choose **New**, **Element from Prefab**\. Then select one of the layout elements\.

   This serves as the structure or framework to hold your dynamic content\.

1. Add a **DynamicLayout** component to your layout component\. To do this, in the **Properties** pane choose **Add Component**, **DynamicLayout**\.

   For **Num Cloned Elements**, enter the initial number of children to be created\.

1. Create a child entity that has an **Image** component\. To do this, right\-click your layout component in the **Hierarchy** pane and choose **New**, **Element from Prefab**, **Image**\.

   This image serves as the prototype element that will be cloned and filled with dynamic content\.

## DynamicScrollBox<a name="ui-editor-components-dynamic-scrollbox"></a>

To use the **DynamicScrollBox** component, you place it on an element that also has a **ScrollBox** component\. With the **DynamicScrollBox** component, you can change the number of children of the scroll box’s element at run time\. 

The content element dynamically resizes to fit its child elements\. The first child of the content element acts as the prototype element\. At run time, the UI system clones the prototype element to achieve the specified number of children in the layout\.

With the **DynamicScrollBox** component, only the minimum number of child elements are actually created for display\. This is different from the **DynamicLayout** component, where all child elements are created at run time and can consume a large amount of resources\. The **DynamicScrollBox**'s elements are reused as the user scrolls; therefore, a scroll box can simulate a large number of children while maintaining good performance\.

The **DynamicScrollBox** component automatically positions its children and resizes the content element to match the bounding box of its children\. Each child’s size is the same as the prototype element\. By default, the children are positioned in a row from left to right\. If vertical scrolling is enabled, the children are positioned in a column from top to bottom\.

**To use a dynamic scroll box component**

1. In the [**UI Editor**](ui-editor-using.md), add a **Scrollbox** prefab\. To do this, click **New**, **Element from Prefab**, **ScrollBox**\.

   This serves as the structure or framework to hold your dynamic content\.

1. Add a **DynamicScrollbox** component to your scroll box component\. To do this, in the **Properties** pane choose **Add Component**, **DynamicScrollbox**\.

   For **Default Num Elements**, enter the initial number of children to be created\. This is mainly for previewing a canvas in **Preview** mode since the number of children ultimately comes from a custom component that implements the `UiDynamicScrollBoxDataBus`\.

1. Create a child entity that has an **Image** component\. To do this, right\-click on your scroll box component in the **Hierarchy** pane, choose **New**, **Element from Prefab**, **Image**\.

   This image serves as the prototype element that will be cloned and filled with dynamic content\.

The **DynamicScrollBox** component uses a bus called `UiDynamicScrollBoxDataBus` to retrieve the number of children that the content element should have\. It also uses a bus called `Ui DynamicScrollBoxElementNotificationBus` to notify when a child element is about to become visible\. This is where you set up the child element with dynamic content\. To do this, you must create and add to the scroll box element a custom component that implements these two buses\.

## EBus Interface<a name="ui-editor-components-dynamic-bus-interface"></a>

Use the following notification functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### UiDynamicScrollBoxDataBus:GetNumElements<a name="ui-editor-components-ebus-uidynamicscrollboxdatabus"></a>

Implement this bus to provide a dynamic scroll box the number of children it should clone\.

Returns the number of children that the dynamic scroll box should clone\.

**Parameters**  
None

**Return**  
Number of children to clone\.

### Ui DynamicScrollBoxElementNotificationBus:OnElementBecomingVisible<a name="ui-editor-components-ebus-ui-dynamicscrollboxelementnotificationbus"></a>

Implement this bus to receive notifications when elements of a dynamic scroll box are about to become visible\.

Sends a signal when an element of a dynamic scroll box is about to become visible\.

**Parameters**  
`entityID` – The entity Id of the element that is about to become visible\.  
`index` – The index of the element that is about to become visible\.

**Return**  
None