---
description: ' Use the UiLayoutCellComponent operation to provide cell layout features
  in Amazon Lumberyard '
title: UiLayoutCellComponent
---
# UiLayoutCellComponent {#lua-scripting-ces-api-ui-uilayoutcellcomponent}

Overrides default layout cell values\.

## UiLayoutCellBus {#lua-scripting-ces-api-ui-uilayoutcellcomponent-uilayoutcellbus}

Services messages for the `UiLayoutCellComponent`\.

### GetExtraHeightRatio {#lua-scripting-ces-api-ui-uilayoutcellcomponent-getextraheightratio}

Returns the overridden extra height ratio for the element\. A value of -1 means that the ratio has not been overridden\.

**Syntax**

```
float GetExtraHeightRatio()
```

### GetExtraWidthRatio {#lua-scripting-ces-api-ui-uilayoutcellcomponent-getextrawidthratio}

Returns the overridden extra width ratio for the element\. A value of -1 means that the ratio has not been overridden\.

**Syntax**

```
float GetExtraWidthRatio()
```

### GetMinHeight {#lua-scripting-ces-api-ui-uilayoutcellcomponent-getminheight}

Returns the overridden minimum height for the element\. A value of -1 means that the height has not been overridden\.

**Syntax**

```
float GetMinHeight()
```

### GetMinWidth {#lua-scripting-ces-api-ui-uilayoutcellcomponent-getminwidth}

Returns the overridden minimum width for the element\. A value of -1 means it has not been overridden\.

**Syntax**

```
float GetMinWidth()
```

### GetTargetHeight {#lua-scripting-ces-api-ui-uilayoutcellcomponent-gettargetheight}

Returns the overridden target height for the element\. A value of -1 means that the height has not been overridden\.

**Syntax**

```
float GetTargetHeight()
```

### GetTargetWidth {#lua-scripting-ces-api-ui-uilayoutcellcomponent-gettargetwidth}

Returns the overridden target width for the element\. \-1 means it has not been overridden\.

**Syntax**

```
float GetTargetWidth()
```

### SetExtraHeightRatio {#lua-scripting-ces-api-ui-uilayoutcellcomponent-setextraheightratio}

Sets the overridden extra height ratio for the element\. A value of -1 means don't override\.

**Syntax**

```
void SetExtraHeightRatio(float height)
```

### SetExtraWidthRatio {#lua-scripting-ces-api-ui-uilayoutcellcomponent-setextrawidthratio}

Sets the overridden extra width ratio for the element\. A value of -1 means don't override\.

**Syntax**

```
void SetExtraWidthRatio(float width)
```

### SetMinHeight {#lua-scripting-ces-api-ui-uilayoutcellcomponent-setminheight}

Sets the overridden minimum height for the element\. A value of -1 means don't override\.

**Syntax**

```
void SetMinHeight(float height)
```

### SetMinWidth {#lua-scripting-ces-api-ui-uilayoutcellcomponent-setminwidth}

Sets the overridden minimum width for the element\. A value of -1 means don't override\.

**Syntax**

```
void SetMinWidth(float width)
```

### SetTargetHeight {#lua-scripting-ces-api-ui-uilayoutcellcomponent-settargetheight}

Sets the overridden target height for the element\. A value of -1 means don't override\.

**Syntax**

```
void SetTargetHeight(float height)
```

### SetTargetWidth {#lua-scripting-ces-api-ui-uilayoutcellcomponent-settargetwidth}

Sets the overridden target width for the element\. A value of -1 means don't override\.

**Syntax**

```
void SetTargetWidth(float width)
```