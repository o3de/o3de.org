---
description: ' Use the UIDynamicScrollBoxComponent to set up scrollbox content as
  a horizontal or vertical list of elements in Amazon Lumberyard. '
title: UIDynamicScrollBoxComponent
---
# UIDynamicScrollBoxComponent {#lua-scripting-ces-api-ui-uidynamicscrollboxcomponent}

Dynamically sets up scrollbox content as a horizontal or vertical list of elements that are cloned from a prototype element\. For efficient scrolling, only the minimum number of elements are created\.

## UiDynamicScrollBoxBus {#lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxbus}

Services messages for the `UiDynamicScrollBoxComponent`\.

### GetChildElementAtLocationIndex {#lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxbus-getchildelementatlocationindex}

Returns the child element at the specified location index\.

**Syntax**

```
AZ::EntityId GetChildElementAtLocationIndex(int index)
```

### GetLocationIndexOfChild {#lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxbus-getlocationindexofchild}

Returns the location index of the specified child element\. Returns \-1 if not found\.

**Syntax**

```
int GetLocationIndexOfChild(AZ::EntityId childElement)
```

### RefreshContent {#lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxbus-refreshcontent}

Refreshes the content\. You should call this when the list size or element content has changed\.

**Syntax**

```
void RefreshContent()
```

## UiDynamicScrollBoxDataBus {#lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxdatabus}

Create this handler to provide a dynamic scrollbox with the number of elements to display\.

### GetNumElements {#lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxdatabus-getnumelements}

Returns the total number of elements that the dynamic scrollbox is to display\.

**Syntax**

```
int GetNumElements()
```

## UiDynamicScrollBoxElementNotificationBus {#lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-luauidynamicscrollboxelementnotificationbus}

Create this handler to receive notifications of dynamic scrollbox element state changes, such as when an element is about to scroll into view\.

### OnElementBecomingVisible {#lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-luauidynamicscrollboxelementnotificationbus-onelementbecomingvisible}

An element is about to become visible\. Use this event to populate the element with data for display\. Specifies the entity ID of the element that is about to become visible and its location index\.

**Syntax**

```
void OnElementBecomingVisible(AZ::EntityId entityId, int index)
```