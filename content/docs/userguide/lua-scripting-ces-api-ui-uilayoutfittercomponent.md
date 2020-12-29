# UILayoutFitterComponent<a name="lua-scripting-ces-api-ui-uilayoutfittercomponent"></a>

You can use this component to implement a UI Layout Fitter in Amazon Lumberyard\.

## UiLayoutFitterBus<a name="lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus"></a>

Services messages for the `UiLayoutFitterComponent`\.

### GetHorizontalFit<a name="lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus-gethorizontalfit"></a>

Returns whether to resize the element horizontally\.

**Syntax**

```
bool GetHorizontalFit()
```

### SetHorizontalFit<a name="lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus-sethorizontalfit"></a>

Sets whether to resize the element horizontally\.

**Syntax**

```
void SetHorizontalFit(bool horizontalFit)
```

### GetVerticalFit<a name="lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus-getverticalfit"></a>

Returns whether to resize the element vertically\.

**Syntax**

```
bool GetVerticalFit()
```

### SetVerticalFit<a name="lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus-setverticalfit"></a>

Sets whether to resize the element vertically\.

**Syntax**

```
void SetVerticalFit(bool verticalFit)
```