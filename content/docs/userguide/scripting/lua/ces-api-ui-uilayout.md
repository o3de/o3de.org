---
description: ' Use the UiLayout component to provide UI layout features in Amazon Lumberyard. '
title: UiLayout
---
# UiLayout {#lua-scripting-ces-api-ui-uilayout}

Provides common functionality for row, column, and grid layouts\.

## UiLayoutBus {#lua-scripting-ces-api-ui-uilayout-uilayoutbus}

Services messages for the `UILayout` components\.

### GetHorizontalChildAlignment {#lua-scripting-ces-api-ui-uilayout-gethorizontalchildalignment}

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

### GetIgnoreDefaultLayoutCells {#lua-scripting-ces-api-ui-uilayout-getignoredefaultlayoutcells}

Returns whether default layout cell values calculated by other components on the child are ignored\.

**Syntax**

```
bool GetIgnoreDefaultLayoutCells()
```

### GetVerticalChildAlignment {#lua-scripting-ces-api-ui-uilayout-getverticalchildalignment}

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

### SetHorizontalChildAlignment {#lua-scripting-ces-api-ui-uilayout-sethorizontalchildalignment}

Sets the horizontal child alignment\.

**Syntax**

```
void SetHorizontalChildAlignment(eUiHAlign hAlign)
```

For possible values for `eUiHAlign`, see [GetHorizontalChildAlignment](#lua-scripting-ces-api-ui-uilayout-gethorizontalchildalignment)\.

### SetIgnoreDefaultLayoutCells {#lua-scripting-ces-api-ui-uilayout-setignoredefaultlayoutcells}

Sets whether default layout cell values calculated by other components on the child are ignored\.

**Syntax**

```
void SetIgnoreDefaultLayoutCells (bool ignore)
```

### SetVerticalChildAlignment {#lua-scripting-ces-api-ui-uilayout-setverticalchildalignment}

Sets the vertical child alignment\.

**Syntax**

```
void SetVerticalChildAlignment(eUiVAlign vAlign)
```

For possible values for `eUiVAlign`, see [GetVerticalChildAlignment](#lua-scripting-ces-api-ui-uilayout-getverticalchildalignment)\.