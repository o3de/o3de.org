# UILayoutRowComponent<a name="lua-scripting-ces-api-ui-uilayoutrowcomponent"></a>

Controls the grid layout of rows\.

## UiLayoutRowBus<a name="lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus"></a>

Messages serviced by the `UiLayoutRowComponent`\.

### GetOrder<a name="lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getorder"></a>

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

### GetPadding<a name="lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getpadding"></a>

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

### GetSpacing<a name="lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getspacing"></a>

Returns, in pixels, the spacing between child elements\.

**Syntax**

```
float GetSpacing()
```

### SetOrder<a name="lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-setorder"></a>

Sets the horizontal order for this layout\.

**Syntax**

```
void SetOrder(eUiHorizontalOrder order)
```

For possible values for `eUiHorizontalOrder`, see [GetOrder](#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getorder)\.

### SetPadding<a name="lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-setpadding"></a>

Sets the padding inside the edges of the element to the specified number of pixels\.

**Syntax**

```
void SetPadding(UiPadding padding)
```

For possible values for `UiPadding`, see [GetPadding](#lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-getpadding)\.

### SetSpacing<a name="lua-scripting-ces-api-ui-uilayoutrowcomponent-uilayoutrowbus-setspacing"></a>

Sets the spacing between child elements to the specified number of pixels\.

**Syntax**

```
void SetSpacing(float spacing)
```