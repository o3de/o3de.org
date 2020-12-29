description: ' Use the UITooltipComponent to provide the text of a tooltip in &ALYlong;. '
slug: lua-scripting-ces-api-ui-uitooltipcomponent
title: UITooltipComponent
---
# UITooltipComponent<a name="lua-scripting-ces-api-ui-uitooltipcomponent"></a>

You can use a tooltip component to provide the text of a tooltip\.

## UiTooltipBus<a name="lua-scripting-ces-api-ui-uitooltipcomponent-uitooltipbus"></a>

Services messages for the `UiTooltipComponent`\.

### GetText<a name="lua-scripting-ces-api-ui-uitooltipcomponent-uitooltipbus-gettext"></a>

Returns the tooltip text\.

**Syntax**

```
AZStd::string GetText()
```

### SetText<a name="lua-scripting-ces-api-ui-uitooltipcomponent-uitooltipbus-settext"></a>

Sets the tooltip text\.

**Syntax**

```
void SetText(const AZStd::string& text)
```