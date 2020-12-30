---
description: ' Use the UIDynamicLayoutComponent to implement clone a prototype UI
  element in &ALYlong;. '
slug: lua-scripting-ces-api-ui-uidynamiclayoutcomponent
title: UIDynamicLayoutComponent
---
# UIDynamicLayoutComponent<a name="lua-scripting-ces-api-ui-uidynamiclayoutcomponent"></a>

Clones a prototype element to achieve the specified number of child elements\.

## UiDynamicLayoutBus<a name="lua-scripting-ces-api-ui-uidynamiclayoutcomponent-uidynamiclayoutbus"></a>

Services messages for the `UiDynamicLayoutComponent`\.

### SetNumChildElements<a name="lua-scripting-ces-api-ui-uidynamiclayoutcomponent-uidynamiclayoutbus-setnumchildelements"></a>

Specifies the number of child elements to be created dynamically\.

**Syntax**

```
void SetNumChildElements(int numChildren)
```