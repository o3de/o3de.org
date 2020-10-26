# UILayoutColumnComponent<a name="lua-scripting-ces-api-ui-uilayoutcolumncomponent"></a>

Controls column layout\.

## UiLayoutColumnBus<a name="lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus"></a>

Services messages for the `UiLayoutColumnComponent`\.

### GetOrder<a name="lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getorder"></a>

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

### GetPadding<a name="lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getpadding"></a>

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

### GetSpacing<a name="lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getspacing"></a>

Returns, in pixels, the spacing between child elements\.

**Syntax**

```
float GetSpacing()
```

### SetOrder<a name="lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-setorder"></a>

Sets the vertical order for this layout\.

**Syntax**

```
void SetOrder(eUiVerticalOrder order)
```

For possible values for `eUiVerticalOrder`, see [GetOrder](#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getorder)\.

### SetPadding<a name="lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-setpadding"></a>

Sets the padding inside the edges of the element to the pixel value specified\.

**Syntax**

```
void SetPadding(UiPadding padding)
```

For the possible values for `UiPadding`, see [GetPadding](#lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-getpadding)\.

### SetSpacing<a name="lua-scripting-ces-api-ui-uilayoutcolumncomponent-uilayoutcolumnbus-setspacing"></a>

Sets the spacing between child elements to the pixel value specified\.

**Syntax**

```
void SetSpacing(float spacing)
```