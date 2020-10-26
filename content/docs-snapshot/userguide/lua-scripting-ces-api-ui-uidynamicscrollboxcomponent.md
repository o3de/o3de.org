# UIDynamicScrollBoxComponent<a name="lua-scripting-ces-api-ui-uidynamicscrollboxcomponent"></a>

Dynamically sets up scrollbox content as a horizontal or vertical list of elements that are cloned from a prototype element\. For efficient scrolling, only the minimum number of elements are created\.

## UiDynamicScrollBoxBus<a name="lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxbus"></a>

Services messages for the `UiDynamicScrollBoxComponent`\.

### GetChildElementAtLocationIndex<a name="lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxbus-getchildelementatlocationindex"></a>

Returns the child element at the specified location index\.

**Syntax**

```
AZ::EntityId GetChildElementAtLocationIndex(int index) 
```

### GetLocationIndexOfChild<a name="lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxbus-getlocationindexofchild"></a>

Returns the location index of the specified child element\. Returns \-1 if not found\.

**Syntax**

```
int GetLocationIndexOfChild(AZ::EntityId childElement) 
```

### RefreshContent<a name="lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxbus-refreshcontent"></a>

Refreshes the content\. You should call this when the list size or element content has changed\.

**Syntax**

```
void RefreshContent()
```

## UiDynamicScrollBoxDataBus<a name="lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxdatabus"></a>

Create this handler to provide a dynamic scrollbox with the number of elements to display\.

### GetNumElements<a name="lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-uidynamicscrollboxdatabus-getnumelements"></a>

Returns the total number of elements that the dynamic scrollbox is to display\.

**Syntax**

```
int GetNumElements()
```

## UiDynamicScrollBoxElementNotificationBus<a name="lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-luauidynamicscrollboxelementnotificationbus"></a>

Create this handler to receive notifications of dynamic scrollbox element state changes, such as when an element is about to scroll into view\.

### OnElementBecomingVisible<a name="lua-scripting-ces-api-ui-uidynamicscrollboxcomponent-luauidynamicscrollboxelementnotificationbus-onelementbecomingvisible"></a>

An element is about to become visible\. Use this event to populate the element with data for display\. Specifies the entity ID of the element that is about to become visible and its location index\.

**Syntax**

```
void OnElementBecomingVisible(AZ::EntityId entityId, int index)
```