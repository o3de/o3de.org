---
description: ' Use the UILayoutGridComponent to control grid layout characteristics
  in &ALYlong;. '
title: UILayoutGridComponent
---
# UILayoutGridComponent {#lua-scripting-ces-api-ui-uilayoutgridcomponent}

Controls grid layout characteristics\.

## UiLayoutGridBus {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus}

Services messages for the `UiLayoutGridComponent`\.

### GetCellSize {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getcellsize}

Returns, in pixels, the size of a child element\.

**Syntax**

```
AZ::Vector2 GetCellSize()
```

### GetHorizontalOrder {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-gethorizontalorder}

Returns the horizontal order for the layout\.

**Syntax**

```
eUiHorizontalOrder GetHorizontalOrder()
```

Following are possible values for `eUiHorizontalOrder`\.

```
enum eUiHorizontalOrder
    {
        eUiHorizontalOrder_LeftToRight,
        eUiHorizontalOrder_RightToLeft
    };
```

### GetPadding {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getpadding}

Returns, in pixels, the padding inside the edges of the element\.

**Syntax**

```
UiPadding GetPadding()
```

Following are the attributes for `UiPadding`\.

```
class UiPadding
{
    int left;
    int right;
    int top;
    int bottom;
};
```

### GetSpacing {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getspacing}

Returns, in pixels, the spacing between child elements\.

**Syntax**

```
AZ::Vector2 GetSpacing()
```

### GetStartingDirection {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getstartingdirection}

Returns the starting direction for the layout\.

**Syntax**

```
eUiLayoutGridStartingDirection GetStartingDirection() 
```

Following are possible values for `eUiLayoutGridStartingDirection`\.

```
enum eUiLayoutGridStartingDirection
    {
        eUiLayoutGridStartingDirection_HorizontalOrder,
        eUiLayoutGridStartingDirection_VerticalOrder
    };
```

### GetVerticalOrder {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getverticalorder}

Returns the vertical order for the layout\.

**Syntax**

```
eUiVerticalOrder GetVerticalOrder()
```

Following are possible values for `eUiVerticalOrder`\.

```
enum eUiVerticalOrder
    {
        eUiVerticalOrder_TopToBottom,
        eUiVerticalOrder_BottomToTop
    };
```

### SetCellSize {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setcellsize}

Sets the size of a child element to the specified number of pixels\.

**Syntax**

```
void SetCellSize(AZ::Vector2 size)
```

### SetHorizontalOrder {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-sethorizontalorder}

Sets the horizontal order for the layout\.

**Syntax**

```
void SetHorizontalOrder(eUiHorizontalOrder order) 
```

For possible values for `eUiHorizontalOrder`, see [GetHorizontalOrder](#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-gethorizontalorder)\.

### SetPadding {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setpadding}

Sets the padding inside the edges of the element to the specified number of pixels\.

**Syntax**

```
void SetPadding(UiPadding padding)
```

For possible values for `UiPadding`, see [GetPadding](#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getpadding)\.

### SetSpacing {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setspacing}

Sets the spacing between child elements to the specified number of pixels\.

**Syntax**

```
void SetSpacing(AZ::Vector2 spacing)
```

### SetStartingDirection {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setstartingdirection}

Sets the starting direction for the layout\.

**Syntax**

```
void SetStartingDirection(eUiLayoutGridStartingDirection direction) 
```

For possible values for `eUiLayoutGridStartingDirection`, see [GetStartingDirection](#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getstartingdirection)\.

### SetVerticalOrder {#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setverticalorder}

Sets the vertical order for the layout\.

**Syntax**

```
void SetVerticalOrder(eUiVerticalOrder order)
```

For possible values for `eUiVerticalOrder`, see [GetVerticalOrder](#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getverticalorder)\.