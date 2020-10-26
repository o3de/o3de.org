# UILayoutGridComponent<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent"></a>

Controls grid layout characteristics\.

## UiLayoutGridBus<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus"></a>

Services messages for the `UiLayoutGridComponent`\.

### GetCellSize<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getcellsize"></a>

Returns, in pixels, the size of a child element\.

**Syntax**

```
AZ::Vector2 GetCellSize()
```

### GetHorizontalOrder<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-gethorizontalorder"></a>

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

### GetPadding<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getpadding"></a>

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

### GetSpacing<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getspacing"></a>

Returns, in pixels, the spacing between child elements\.

**Syntax**

```
AZ::Vector2 GetSpacing()
```

### GetStartingDirection<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getstartingdirection"></a>

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

### GetVerticalOrder<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getverticalorder"></a>

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

### SetCellSize<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setcellsize"></a>

Sets the size of a child element to the specified number of pixels\.

**Syntax**

```
void SetCellSize(AZ::Vector2 size)
```

### SetHorizontalOrder<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-sethorizontalorder"></a>

Sets the horizontal order for the layout\.

**Syntax**

```
void SetHorizontalOrder(eUiHorizontalOrder order) 
```

For possible values for `eUiHorizontalOrder`, see [GetHorizontalOrder](#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-gethorizontalorder)\.

### SetPadding<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setpadding"></a>

Sets the padding inside the edges of the element to the specified number of pixels\.

**Syntax**

```
void SetPadding(UiPadding padding)
```

For possible values for `UiPadding`, see [GetPadding](#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getpadding)\.

### SetSpacing<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setspacing"></a>

Sets the spacing between child elements to the specified number of pixels\.

**Syntax**

```
void SetSpacing(AZ::Vector2 spacing)
```

### SetStartingDirection<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setstartingdirection"></a>

Sets the starting direction for the layout\.

**Syntax**

```
void SetStartingDirection(eUiLayoutGridStartingDirection direction) 
```

For possible values for `eUiLayoutGridStartingDirection`, see [GetStartingDirection](#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getstartingdirection)\.

### SetVerticalOrder<a name="lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-setverticalorder"></a>

Sets the vertical order for the layout\.

**Syntax**

```
void SetVerticalOrder(eUiVerticalOrder order)
```

For possible values for `eUiVerticalOrder`, see [GetVerticalOrder](#lua-scripting-ces-api-ui-uilayoutgridcomponent-uilayoutgridbus-getverticalorder)\.