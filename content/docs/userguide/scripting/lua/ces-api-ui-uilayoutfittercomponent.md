---
description: ' Use the UILayoutFitterComponent to implement the UI layout fitter in
  Amazon Lumberyard. '
title: UILayoutFitterComponent
---
# UILayoutFitterComponent {#lua-scripting-ces-api-ui-uilayoutfittercomponent}

You can use this component to implement a UI Layout Fitter in Amazon Lumberyard\.

## UiLayoutFitterBus {#lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus}

Services messages for the `UiLayoutFitterComponent`\.

### GetHorizontalFit {#lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus-gethorizontalfit}

Returns whether to resize the element horizontally\.

**Syntax**

```
bool GetHorizontalFit()
```

### SetHorizontalFit {#lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus-sethorizontalfit}

Sets whether to resize the element horizontally\.

**Syntax**

```
void SetHorizontalFit(bool horizontalFit)
```

### GetVerticalFit {#lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus-getverticalfit}

Returns whether to resize the element vertically\.

**Syntax**

```
bool GetVerticalFit()
```

### SetVerticalFit {#lua-scripting-ces-api-ui-uilayoutfittercomponent-uilayoutfitterbus-setverticalfit}

Sets whether to resize the element vertically\.

**Syntax**

```
void SetVerticalFit(bool verticalFit)
```