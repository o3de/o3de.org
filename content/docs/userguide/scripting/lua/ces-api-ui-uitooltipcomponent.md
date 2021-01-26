---
description: ' Use the UITooltipComponent to provide the text of a tooltip in Amazon Lumberyard. '
title: UITooltipComponent
---
# UITooltipComponent {#lua-scripting-ces-api-ui-uitooltipcomponent}

You can use a tooltip component to provide the text of a tooltip\.

## UiTooltipBus {#lua-scripting-ces-api-ui-uitooltipcomponent-uitooltipbus}

Services messages for the `UiTooltipComponent`\.

### GetText {#lua-scripting-ces-api-ui-uitooltipcomponent-uitooltipbus-gettext}

Returns the tooltip text\.

**Syntax**

```
AZStd::string GetText()
```

### SetText {#lua-scripting-ces-api-ui-uitooltipcomponent-uitooltipbus-settext}

Sets the tooltip text\.

**Syntax**

```
void SetText(const AZStd::string& text)
```