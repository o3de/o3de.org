---
description: ' Use the UIScrollBoxComponent to control the characteristics of a scroll
  box in Amazon Lumberyard. '
title: UIScrollBoxComponent
---
# UIScrollBoxComponent {#lua-scripting-ces-api-ui-uiscrollboxcomponent}

Controls the characteristics of a scroll box\.

## UiScrollBoxBus {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus}

Services messages for the `UiScrollBoxComponent`\.

### FindClosestContentChildElement {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-findclosestcontentchildelement}

Finds the child of the content element that is closest to the content anchors at the current scroll offset \(the currently selected child\)\.

**Syntax**

```
AZ::EntityId FindClosestContentChildElement()
```

### GetContentEntity {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getcontententity}

Returns the content element for the scroll box\.

**Syntax**

```
AZ::EntityId GetContentEntity()
```

### GetHorizontalScrollBarEntity {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-gethorizontalscrollbarentity}

Returns the horizontal scroll bar element for the scroll box\.

**Syntax**

```
AZ::EntityId GetHorizontalScrollBarEntity()
```

### GetHorizontalScrollBarVisibility {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-gethorizontalscrollbarvisibility}

Returns the visibility behavior for the horizontal scroll bar of the scroll box\.

**Syntax**

```
eUiScrollBoxScrollBarVisibility GetHorizontalScrollBarVisibility()
```

Following are possible values for `eUiScrollBoxScrollBarVisibility`\.

```
enum eUiScrollBoxScrollBarVisibility
    {
        eUiScrollBoxScrollBarVisibility_AlwaysShow,
        eUiScrollBoxScrollBarVisibility_AutoHide,
        eUiScrollBoxScrollBarVisibility_AutoHideAndResizeViewport
    };
```

### GetIsHorizontalScrollingEnabled {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getishorizontalscrollingenabled}

Returns whether the scroll box allows horizontal scrolling\.

**Syntax**

```
bool GetIsHorizontalScrollingEnabled()
```

### GetIsScrollingConstrained {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getisscrollingconstrained}

Returns whether the scroll box restricts scrolling to the content area\.

**Syntax**

```
bool GetIsScrollingConstrained()
```

### GetIsVerticalScrollingEnabled {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getisverticalscrollingenabled}

Returns whether the scroll box allows vertical scrolling\.

**Syntax**

```
bool GetIsVerticalScrollingEnabled()
```

### GetNormalizedScrollValue {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getnormalizedscrollvalue}

Returns the scroll value from 0 - 1\.

**Syntax**

```
AZ::Vector2 GetNormalizedScrollValue()
```

### GetScrollOffset {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getscrolloffset}

Returns the scroll offset of the scroll box\. The scroll offset is the offset from the content element's anchor point to the content element's pivot\.

**Syntax**

```
AZ::Vector2 GetScrollOffset()
```

### GetScrollOffsetChangedActionName {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getscrolloffsetchangedactionname}

Returns the action triggered when the scroll box drag is completed\.

**Syntax**

```
const AZStd::string& GetScrollOffsetChangedActionName()
```

### GetScrollOffsetChangingActionName {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getscrolloffsetchangingactionname}

Returns the action triggered while the scroll box is being dragged\.

**Syntax**

```
AZStd::string& GetScrollOffsetChangingActionName()
```

### GetSnapGrid {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getsnapgrid}

Returns the snapping grid of the scroll box\.

**Syntax**

```
AZ::Vector2 GetSnapGrid()
```

### GetSnapMode {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getsnapmode}

Returns the snap mode for the scroll box\.

**Syntax**

```
eUiScrollBoxSnapMode GetSnapMode()
```

Following are possible values for `eUiScrollBoxSnapMode`\.

```
enum eUiScrollBoxSnapMode
    {
        eUiScrollBoxSnapMode_None,
        eUiScrollBoxSnapMode_Children,
        eUiScrollBoxSnapMode_Grid
    };
```

### GetVerticalScrollBarEntity {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getverticalscrollbarentity}

Returns the vertical scroll bar element for the scroll box\.

**Syntax**

```
AZ::EntityId GetVerticalScrollBarEntity()
```

### GetVerticalScrollBarVisibility {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getverticalscrollbarvisibility}

Returns the visibility behavior for the vertical scroll bar of the scroll box\.

**Syntax**

```
eUiScrollBoxScrollBarVisibility GetVerticalScrollBarVisibility()
```

### HasHorizontalContentToScroll {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-hashorizontalcontenttoscroll}

Returns whether there is content to scroll horizontally\.

**Syntax**

```
bool HasHorizontalContentToScroll()
```

### HasVerticalContentToScroll {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-hasverticalcontenttoscroll}

Returns whether there is content to scroll vertically\.

**Syntax**

```
bool HasVerticalContentToScroll()
```

### SetContentEntity {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setcontententity}

Sets the content element for the scroll box\.

**Syntax**

```
void SetContentEntity(AZ::EntityId entityId)
```

### SetHorizontalScrollBarEntity {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-sethorizontalscrollbarentity}

Sets the horizontal scroll bar element for the scroll box\.

**Syntax**

```
void SetHorizontalScrollBarEntity(AZ::EntityId entityId)
```

### SetHorizontalScrollBarVisibility {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-sethorizontalscrollbarvisibility}

Sets the visibility behavior for the horizontal scroll bar of the scroll box\.

**Syntax**

```
void SetHorizontalScrollBarVisibility(eUiScrollBoxScrollBarVisibility visibility)
```

For possible values for `eUiScrollBoxScrollBarVisibility`, see [GetHorizontalScrollBarVisibility](#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-gethorizontalscrollbarvisibility)\.

### SetIsHorizontalScrollingEnabled {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setishorizontalscrollingenabled}

Sets whether the scroll box allows horizontal scrolling\.

**Syntax**

```
void SetIsHorizontalScrollingEnabled(bool isEnabled)
```

### SetIsScrollingConstrained {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setisscrollingconstrained}

Sets whether the scroll box restricts scrolling to the content area\.

**Syntax**

```
void SetIsScrollingConstrained(bool isConstrained)
```

### SetIsVerticalScrollingEnabled {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setisverticalscrollingenabled}

Sets whether the scroll box allows vertical scrolling\.

**Syntax**

```
void SetIsVerticalScrollingEnabled(bool isEnabled)
```

### SetScrollOffset {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setscrolloffset}

Sets the scroll offset of the scroll box\.

**Syntax**

```
void SetScrollOffset(AZ::Vector2 scrollOffset)
```

### SetScrollOffsetChangedActionName {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setscrolloffsetchangedactionname}

Sets the action triggered when the scroll box drag is completed\.

**Syntax**

```
void SetScrollOffsetChangedActionName(const AZStd::string& actionName)
```

### SetScrollOffsetChangingActionName {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setscrolloffsetchangingactionname}

Sets the action triggered while the scroll box is being dragged\.

**Syntax**

```
void SetScrollOffsetChangingActionName(const AZStd::string& actionName)
```

### SetSnapGrid {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setsnapgrid}

Sets the snapping grid of the scroll box\.

**Syntax**

```
void SetSnapGrid(AZ::Vector2 snapGrid)
```

### SetSnapMode {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setsnapmode}

Sets the snap mode for the scroll box\.

**Syntax**

```
void SetSnapMode(eUiScrollBoxSnapMode snapMode)
```

For possible values for `eUiScrollBoxSnapMode`, see [GetSnapMode](#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getsnapmode)\.

### SetVerticalScrollBarEntity {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setverticalscrollbarentity}

Sets the vertical scroll bar element for the scroll box\.

**Syntax**

```
void SetVerticalScrollBarEntity(AZ::EntityId entityId)
```

### SetVerticalScrollBarVisibility {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setverticalscrollbarvisibility}

Sets the visibility behavior for the vertical scroll bar of the scroll box\.

**Syntax**

```
void SetVerticalScrollBarVisibility(eUiScrollBoxScrollBarVisibility visibility
```

## UiScrollBoxNotificationBus {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxnotificationbus}

Services scroll offset change notifications for the `UiScrollBoxComponent`\.

### OnScrollOffsetChanged {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxnotificationbus-onscrolloffsetchanged}

Called when the scroll offset has changed\.

**Syntax**

```
void OnScrollOffsetChanged(AZ::Vector2 newScrollOffset)
```

### OnScrollOffsetChanging {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxnotificationbus-onscrolloffsetchanging}

Called when the scroll offset is changing\.

**Syntax**

```
void OnScrollOffsetChanging(AZ::Vector2 newScrollOffset)
```

## UiScrollableNotificationBus {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollablenotificationbus}

Services scrollable value change notifications for the `UiScrollBoxComponent`\.

### OnScrollableValueChanged {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollablenotificationbus-onscrollablevaluechanged}

Called when the scroll value \(0 \- 1\) has changed\.

**Syntax**

```
void OnScrollableValueChanged(AZ::Vector2 value)
```

### OnScrollableValueChanging {#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollablenotificationbus-onscrollablevaluechanging}

Called when the scroll value \(0 \- 1\) is changing\.

**Syntax**

```
void OnScrollableValueChanging(AZ::Vector2 value)
```