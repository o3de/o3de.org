# UiLayoutCellComponent<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent"></a>

Overrides default layout cell values\.

## UiLayoutCellBus<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-uilayoutcellbus"></a>

Services messages for the `UiLayoutCellComponent`\.

### GetExtraHeightRatio<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-getextraheightratio"></a>

Returns the overridden extra height ratio for the element\. A value of –1 means that the ratio has not been overridden\.

**Syntax**

```
float GetExtraHeightRatio()
```

### GetExtraWidthRatio<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-getextrawidthratio"></a>

Returns the overridden extra width ratio for the element\. A value of –1 means that the ratio has not been overridden\.

**Syntax**

```
float GetExtraWidthRatio()
```

### GetMinHeight<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-getminheight"></a>

Returns the overridden minimum height for the element\. A value of –1 means that the height has not been overridden\.

**Syntax**

```
float GetMinHeight()
```

### GetMinWidth<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-getminwidth"></a>

Returns the overridden minimum width for the element\. A value of –1 means it has not been overridden\.

**Syntax**

```
float GetMinWidth()
```

### GetTargetHeight<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-gettargetheight"></a>

Returns the overridden target height for the element\. A value of –1 means that the height has not been overridden\.

**Syntax**

```
float GetTargetHeight()
```

### GetTargetWidth<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-gettargetwidth"></a>

Returns the overridden target width for the element\. \-1 means it has not been overridden\.

**Syntax**

```
float GetTargetWidth()
```

### SetExtraHeightRatio<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-setextraheightratio"></a>

Sets the overridden extra height ratio for the element\. A value of –1 means don’t override\.

**Syntax**

```
void SetExtraHeightRatio(float height)
```

### SetExtraWidthRatio<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-setextrawidthratio"></a>

Sets the overridden extra width ratio for the element\. A value of –1 means don’t override\.

**Syntax**

```
void SetExtraWidthRatio(float width)
```

### SetMinHeight<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-setminheight"></a>

Sets the overridden minimum height for the element\. A value of –1 means don’t override\.

**Syntax**

```
void SetMinHeight(float height)
```

### SetMinWidth<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-setminwidth"></a>

Sets the overridden minimum width for the element\. A value of –1 means don’t override\.

**Syntax**

```
void SetMinWidth(float width)
```

### SetTargetHeight<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-settargetheight"></a>

Sets the overridden target height for the element\. A value of –1 means don’t override\.

**Syntax**

```
void SetTargetHeight(float height)
```

### SetTargetWidth<a name="lua-scripting-ces-api-ui-uilayoutcellcomponent-settargetwidth"></a>

Sets the overridden target width for the element\. A value of –1 means don’t override\.

**Syntax**

```
void SetTargetWidth(float width)
```