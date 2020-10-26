# UIScrollBoxComponent<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent"></a>

Controls the characteristics of a scroll box\.

## UiScrollBoxBus<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus"></a>

Services messages for the `UiScrollBoxComponent`\.

### FindClosestContentChildElement<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-findclosestcontentchildelement"></a>

Finds the child of the content element that is closest to the content anchors at the current scroll offset \(the currently selected child\)\.

**Syntax**

```
AZ::EntityId FindClosestContentChildElement()
```

### GetContentEntity<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getcontententity"></a>

Returns the content element for the scroll box\.

**Syntax**

```
AZ::EntityId GetContentEntity()
```

### GetHorizontalScrollBarEntity<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-gethorizontalscrollbarentity"></a>

Returns the horizontal scroll bar element for the scroll box\.

**Syntax**

```
AZ::EntityId GetHorizontalScrollBarEntity()
```

### GetHorizontalScrollBarVisibility<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-gethorizontalscrollbarvisibility"></a>

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

### GetIsHorizontalScrollingEnabled<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getishorizontalscrollingenabled"></a>

Returns whether the scroll box allows horizontal scrolling\.

**Syntax**

```
bool GetIsHorizontalScrollingEnabled()
```

### GetIsScrollingConstrained<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getisscrollingconstrained"></a>

Returns whether the scroll box restricts scrolling to the content area\.

**Syntax**

```
bool GetIsScrollingConstrained()
```

### GetIsVerticalScrollingEnabled<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getisverticalscrollingenabled"></a>

Returns whether the scroll box allows vertical scrolling\.

**Syntax**

```
bool GetIsVerticalScrollingEnabled()
```

### GetNormalizedScrollValue<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getnormalizedscrollvalue"></a>

Returns the scroll value from 0 – 1\.

**Syntax**

```
AZ::Vector2 GetNormalizedScrollValue()
```

### GetScrollOffset<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getscrolloffset"></a>

Returns the scroll offset of the scroll box\. The scroll offset is the offset from the content element's anchor point to the content element's pivot\.

**Syntax**

```
AZ::Vector2 GetScrollOffset()
```

### GetScrollOffsetChangedActionName<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getscrolloffsetchangedactionname"></a>

Returns the action triggered when the scroll box drag is completed\.

**Syntax**

```
const AZStd::string& GetScrollOffsetChangedActionName()
```

### GetScrollOffsetChangingActionName<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getscrolloffsetchangingactionname"></a>

Returns the action triggered while the scroll box is being dragged\.

**Syntax**

```
AZStd::string& GetScrollOffsetChangingActionName() 
```

### GetSnapGrid<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getsnapgrid"></a>

Returns the snapping grid of the scroll box\.

**Syntax**

```
AZ::Vector2 GetSnapGrid()
```

### GetSnapMode<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getsnapmode"></a>

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

### GetVerticalScrollBarEntity<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getverticalscrollbarentity"></a>

Returns the vertical scroll bar element for the scroll box\.

**Syntax**

```
AZ::EntityId GetVerticalScrollBarEntity()
```

### GetVerticalScrollBarVisibility<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getverticalscrollbarvisibility"></a>

Returns the visibility behavior for the vertical scroll bar of the scroll box\.

**Syntax**

```
eUiScrollBoxScrollBarVisibility GetVerticalScrollBarVisibility()
```

### HasHorizontalContentToScroll<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-hashorizontalcontenttoscroll"></a>

Returns whether there is content to scroll horizontally\.

**Syntax**

```
bool HasHorizontalContentToScroll()
```

### HasVerticalContentToScroll<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-hasverticalcontenttoscroll"></a>

Returns whether there is content to scroll vertically\.

**Syntax**

```
bool HasVerticalContentToScroll()
```

### SetContentEntity<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setcontententity"></a>

Sets the content element for the scroll box\.

**Syntax**

```
void SetContentEntity(AZ::EntityId entityId)
```

### SetHorizontalScrollBarEntity<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-sethorizontalscrollbarentity"></a>

Sets the horizontal scroll bar element for the scroll box\.

**Syntax**

```
void SetHorizontalScrollBarEntity(AZ::EntityId entityId)
```

### SetHorizontalScrollBarVisibility<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-sethorizontalscrollbarvisibility"></a>

Sets the visibility behavior for the horizontal scroll bar of the scroll box\.

**Syntax**

```
void SetHorizontalScrollBarVisibility(eUiScrollBoxScrollBarVisibility visibility)
```

For possible values for `eUiScrollBoxScrollBarVisibility`, see [GetHorizontalScrollBarVisibility](#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-gethorizontalscrollbarvisibility)\.

### SetIsHorizontalScrollingEnabled<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setishorizontalscrollingenabled"></a>

Sets whether the scroll box allows horizontal scrolling\.

**Syntax**

```
void SetIsHorizontalScrollingEnabled(bool isEnabled) 
```

### SetIsScrollingConstrained<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setisscrollingconstrained"></a>

Sets whether the scroll box restricts scrolling to the content area\.

**Syntax**

```
void SetIsScrollingConstrained(bool isConstrained)
```

### SetIsVerticalScrollingEnabled<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setisverticalscrollingenabled"></a>

Sets whether the scroll box allows vertical scrolling\.

**Syntax**

```
void SetIsVerticalScrollingEnabled(bool isEnabled)
```

### SetScrollOffset<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setscrolloffset"></a>

Sets the scroll offset of the scroll box\.

**Syntax**

```
void SetScrollOffset(AZ::Vector2 scrollOffset)
```

### SetScrollOffsetChangedActionName<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setscrolloffsetchangedactionname"></a>

Sets the action triggered when the scroll box drag is completed\.

**Syntax**

```
void SetScrollOffsetChangedActionName(const AZStd::string& actionName)
```

### SetScrollOffsetChangingActionName<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setscrolloffsetchangingactionname"></a>

Sets the action triggered while the scroll box is being dragged\.

**Syntax**

```
void SetScrollOffsetChangingActionName(const AZStd::string& actionName)
```

### SetSnapGrid<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setsnapgrid"></a>

Sets the snapping grid of the scroll box\.

**Syntax**

```
void SetSnapGrid(AZ::Vector2 snapGrid)
```

### SetSnapMode<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setsnapmode"></a>

Sets the snap mode for the scroll box\.

**Syntax**

```
void SetSnapMode(eUiScrollBoxSnapMode snapMode) 
```

For possible values for `eUiScrollBoxSnapMode`, see [GetSnapMode](#lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-getsnapmode)\.

### SetVerticalScrollBarEntity<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setverticalscrollbarentity"></a>

Sets the vertical scroll bar element for the scroll box\.

**Syntax**

```
void SetVerticalScrollBarEntity(AZ::EntityId entityId) 
```

### SetVerticalScrollBarVisibility<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxbus-setverticalscrollbarvisibility"></a>

Sets the visibility behavior for the vertical scroll bar of the scroll box\.

**Syntax**

```
void SetVerticalScrollBarVisibility(eUiScrollBoxScrollBarVisibility visibility
```

## UiScrollBoxNotificationBus<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxnotificationbus"></a>

Services scroll offset change notifications for the `UiScrollBoxComponent`\.

### OnScrollOffsetChanged<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxnotificationbus-onscrolloffsetchanged"></a>

Called when the scroll offset has changed\.

**Syntax**

```
void OnScrollOffsetChanged(AZ::Vector2 newScrollOffset)
```

### OnScrollOffsetChanging<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollboxnotificationbus-onscrolloffsetchanging"></a>

Called when the scroll offset is changing\.

**Syntax**

```
void OnScrollOffsetChanging(AZ::Vector2 newScrollOffset)
```

## UiScrollableNotificationBus<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollablenotificationbus"></a>

Services scrollable value change notifications for the `UiScrollBoxComponent`\.

### OnScrollableValueChanged<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollablenotificationbus-onscrollablevaluechanged"></a>

Called when the scroll value \(0 \- 1\) has changed\.

**Syntax**

```
void OnScrollableValueChanged(AZ::Vector2 value) 
```

### OnScrollableValueChanging<a name="lua-scripting-ces-api-ui-uiscrollboxcomponent-uiscrollablenotificationbus-onscrollablevaluechanging"></a>

Called when the scroll value \(0 \- 1\) is changing\.

**Syntax**

```
void OnScrollableValueChanging(AZ::Vector2 value) 
```