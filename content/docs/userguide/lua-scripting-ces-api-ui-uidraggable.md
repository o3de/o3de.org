# UIDraggableComponent<a name="lua-scripting-ces-api-ui-uidraggable"></a>

You can use a draggable component to make an element draggable for drag\-and\-drop behavior\.

## UiDraggableBus<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus"></a>

Services messages for the `UiDraggableComponent`\.

### GetCanDropOnAnyCanvas<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus-getcandroponanycanvas"></a>

Gets the flag that indicates whether this draggable can be dropped on this canvas or any loaded canvas\.

**Syntax**

```
bool GetCanDropOnAnyCanvas()
```

### GetDragState<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus-getdragstate"></a>

Returns the current drag state of the draggable component\.

**Syntax**

```
eUiDragState GetDragState()
```

Following are possible values for `eUiDragState`\.

```
enum eUiDragState
    {
        eUiDragState_Normal,
        eUiDragState_Valid,
        eUiDragState_Invalid
    };
```

### GetOriginalFromProxy<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus-getoriginalfromproxy"></a>

Gets the original draggable component from a draggable component that is acting as a proxy\.

**Syntax**

```
AZ::EntityId GetOriginalFromProxy()
```

### IsProxy<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus-isproxy"></a>

Checks whether a draggable component is acting as a proxy for another draggable component\.

**Syntax**

```
bool IsProxy()
```

### ProxyDragEnd<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus-proxydragend"></a>

Concludes the drag of a proxy\. Call `ProxyDragEnd` at the end of a drag if `SetAsProxy` was used for the drag\. Call `ProxyDragEnd` from the `OnDragEnd` handler of the proxy element\. This results in a call to `OnDragEnd` for the original draggable component\.

**Syntax**

```
void ProxyDragEnd(AZ::Vector2 point)
```

### RedoDrag<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus-redodrag"></a>

Causes the draggable component to redetect the drop targets that are underneath the pointer and resend `OnDropHoverStart` or `OnDropHoverEnd` messages if needed\. You can call `RedoDrag` from a script after the script has caused drop targets to change positions\. This function is most useful for keyboard or gamepad navigation\.

**Syntax**

```
void RedoDrag(AZ::Vector2 point)
```

### SetAsProxy<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus-setasproxy"></a>

Sets a draggable component to act as a proxy for another draggable component and starts dragging the draggable component at the specified point\. A proxy is useful if you want the visible element being dragged to be on a canvas other than the one on which the original draggable component is selected\. It is also useful if you want to avoid moving the original draggable component\.

**Syntax**

```
void SetAsProxy(AZ::EntityId originalDraggableId, AZ::Vector2 point)
```

### SetCanDropOnAnyCanvas<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus-setcandroponanycanvas"></a>

Sets the flag that indicates whether a draggable can be dropped on this canvas or any loaded canvas\.

**Syntax**

```
void SetCanDropOnAnyCanvas(bool anyCanvas)
```

### SetDragState<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablebus-setdragstate"></a>

Sets the current drag state of the draggable component\.

**Syntax**

```
void SetDragState(eUiDragState dragState)
```

For possible values for `eUiDragState`, see [GetDragState](#lua-scripting-ces-api-ui-uidraggable-uidraggablebus-getdragstate)\.

## UiDraggableNotificationBus<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablenotificationbus"></a>

Services notifications for the `UiDraggableComponent`\.

### OnDrag<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablenotificationbus-ondrag"></a>

Occurs each time the drag position changes during dragging\. `OnDrag` events happen only between `OnDragStart` and `OnDragEnd` events\.

**Syntax**

```
void OnDrag(AZ::Vector2 position)
```

### OnDragEnd<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablenotificationbus-ondragend"></a>

Occurs at the end of dragging when the release input event occurs\. The `OnDragEnd` notification is sent before the `OnDrop` drop target notification\.

**Syntax**

```
void OnDragEnd(AZ::Vector2 position)
```

### OnDragStart<a name="lua-scripting-ces-api-ui-uidraggable-uidraggablenotificationbus-ondragstart"></a>

Occurs when dragging is detected on the draggable component\. For mouse or touch input, this occurs when movement has been detected after the press or touch\.

**Syntax**

```
void OnDragStart(AZ::Vector2 position)
```