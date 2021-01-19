---
description: ' Use the UILayoutColumnComponent to control column layout in &ALYlong;. '
title: UILayoutColumnComponent
---
# UILayoutColumnComponent {#lua-scripting-ces-api-ui-uilayoutcolumncomponent}

Controls column layout\.

## UiLayoutColumnBus {#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus}

Services messages for the `UiLayoutColumnComponent`\.

### GetOrder {#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getorder}

Returns the vertical order for this layout\.

**Syntax**

```
eUiVerticalOrder GetOrder()
```

Following are the possible values for `eUiVerticalOrder`\.

```
enum eUiVerticalOrder
    {
        eUiVerticalOrder_TopToBottom,
        eUiVerticalOrder_BottomToTop
    };
```

### GetPadding {#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getpadding}

Returns, in pixels, the padding inside the edges of the element\.

**Syntax**

```
UiPadding GetPadding()
```

Following are the possible values for `UiPadding`\.

```
class UiPadding
{
     int left;
     int right;
     int top;
     int bottom;
};
```

### GetSpacing {#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getspacing}

Returns, in pixels, the spacing between child elements\.

**Syntax**

```
float GetSpacing()
```

### SetOrder {#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-setorder}

Sets the vertical order for this layout\.

**Syntax**

```
void SetOrder(eUiVerticalOrder order)
```

For possible values for `eUiVerticalOrder`, see [GetOrder](#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getorder)\.

### SetPadding {#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-setpadding}

Sets the padding inside the edges of the element to the pixel value specified\.

**Syntax**

```
void SetPadding(UiPadding padding)
```

For the possible values for `UiPadding`, see [GetPadding](#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getpadding)\.

### SetSpacing {#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-setspacing}

Sets the spacing between child elements to the pixel value specified\.

**Syntax**

```
void SetSpacing(float spacing)
```