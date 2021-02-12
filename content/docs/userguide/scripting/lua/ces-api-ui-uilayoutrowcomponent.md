---
description: ' Use the UILayoutRowComponent to control the grid layout of rows in
  Amazon Lumberyard. '
title: UILayoutRowComponent
---
# UILayoutRowComponent {#lua-scripting-ces-api-ui-uilayoutrowcomponent}

Controls the grid layout of rows\.

## UiLayoutRowBus {#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus}

Messages serviced by the `UiLayoutRowComponent`\.

### GetOrder {#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getorder}

Returns the horizontal order for this layout\.

**Syntax**

```
eUiHorizontalOrder GetOrder()
```

Following are possible values for `eUiHorizontalOrder`\.

```
enum eUiHorizontalOrder
    {
        eUiHorizontalOrder_LeftToRight,
        eUiHorizontalOrder_RightToLeft
    };
```

### GetPadding {#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getpadding}

Returns, in pixels, the padding inside the edges of the element\.

**Syntax**

```
UiPadding GetPadding()
```

Following are possible values for `UiPadding`\.

```
class UiPadding
{
    int left;
    int right;
    int top;
    int bottom;
};
```

### GetSpacing {#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getspacing}

Returns, in pixels, the spacing between child elements\.

**Syntax**

```
float GetSpacing()
```

### SetOrder {#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-setorder}

Sets the horizontal order for this layout\.

**Syntax**

```
void SetOrder(eUiHorizontalOrder order)
```

For possible values for `eUiHorizontalOrder`, see [GetOrder](#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getorder)\.

### SetPadding {#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-setpadding}

Sets the padding inside the edges of the element to the specified number of pixels\.

**Syntax**

```
void SetPadding(UiPadding padding)
```

For possible values for `UiPadding`, see [GetPadding](#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getpadding)\.

### SetSpacing {#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-setspacing}

Sets the spacing between child elements to the specified number of pixels\.

**Syntax**

```
void SetSpacing(float spacing)
```