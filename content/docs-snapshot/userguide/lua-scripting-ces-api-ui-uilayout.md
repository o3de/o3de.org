# UiLayout<a name="lua-scripting-ces-api-ui-uilayout"></a>

Provides common functionality for row, column, and grid layouts\.

## UiLayoutBus<a name="lua-scripting-ces-api-ui-uilayout-uilayoutbus"></a>

Services messages for the `UILayout` components\.

### GetHorizontalChildAlignment<a name="lua-scripting-ces-api-ui-uilayout-gethorizontalchildalignment"></a>

Returns the horizontal child alignment\.

**Syntax**

```
eUiHAlign GetHorizontalChildAlignment()
```

Following are possible values for `eUiHAlign`\.

```
enum eUiHAlign
    {
        eUiHAlign_Left,
        eUiHAlign_Center,
        eUiHAlign_Right
    };
```

### GetIgnoreDefaultLayoutCells<a name="lua-scripting-ces-api-ui-uilayout-getignoredefaultlayoutcells"></a>

Returns whether default layout cell values calculated by other components on the child are ignored\.

**Syntax**

```
bool GetIgnoreDefaultLayoutCells()
```

### GetVerticalChildAlignment<a name="lua-scripting-ces-api-ui-uilayout-getverticalchildalignment"></a>

Returns the vertical child alignment\.

**Syntax**

```
eUiVAlign GetVerticalChildAlignment()
```

Following are possible values for `eUiVAlign`\.

```
enum eUiVAlign
    {
        eUiVAlign_Top,
        eUiVAlign_Center,
        eUiVAlign_Bottom
    };
```

### SetHorizontalChildAlignment<a name="lua-scripting-ces-api-ui-uilayout-sethorizontalchildalignment"></a>

Sets the horizontal child alignment\.

**Syntax**

```
void SetHorizontalChildAlignment(eUiHAlign hAlign)
```

For possible values for `eUiHAlign`, see [GetHorizontalChildAlignment](#lua-scripting-ces-api-ui-uilayout-gethorizontalchildalignment)\.

### SetIgnoreDefaultLayoutCells<a name="lua-scripting-ces-api-ui-uilayout-setignoredefaultlayoutcells"></a>

Sets whether default layout cell values calculated by other components on the child are ignored\.

**Syntax**

```
void SetIgnoreDefaultLayoutCells (bool ignore)
```

### SetVerticalChildAlignment<a name="lua-scripting-ces-api-ui-uilayout-setverticalchildalignment"></a>

Sets the vertical child alignment\.

**Syntax**

```
void SetVerticalChildAlignment(eUiVAlign vAlign)
```

For possible values for `eUiVAlign`, see [GetVerticalChildAlignment](#lua-scripting-ces-api-ui-uilayout-getverticalchildalignment)\.