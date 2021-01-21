---
description: ' Use the UIMaskComponent to show only part of the content of a component''s
  child elements in &ALYlong;. '
title: UIMaskComponent
---
# UIMaskComponent {#lua-scripting-ces-api-ui-uimaskcomponent}

You can add a mask component to an element to show only a part of the content of its child elements \(for example, example, image or text\)\.

## UiMaskBus {#lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus}

Services messages for the `UiMaskComponent`\.

### GetDrawBehind {#lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-getdrawbehind}

Returns whether the mask is drawn behind the child elements\.

**Syntax**

```
bool GetDrawBehind()
```

### GetDrawInFront {#lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-getdrawinfront}

Returns whether the mask is drawn in front of child elements\.

**Syntax**

```
bool GetDrawInFront()
```

### GetIsMaskingEnabled {#lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-getismaskingenabled}

Returns whether masking is enabled\.

**Syntax**

```
bool GetIsMaskingEnabled()
```

### GetUseAlphaTest {#lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-getusealphatest}

Returns whether to use the alpha channel in the mask visual's texture to define the mask\.

**Syntax**

```
bool GetUseAlphaTest()
```

### SetDrawBehind {#lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-setdrawbehind}

Sets whether the mask is drawn behind the child elements\.

**Syntax**

```
void SetDrawBehind(bool drawMaskVisualBehindChildren)
```

### SetDrawInFront {#lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-setdrawinfront}

Sets whether the mask is drawn in front of child elements\.

**Syntax**

```
void SetDrawInFront(bool drawMaskVisualInFrontOfChildren)
```

### SetIsMaskingEnabled {#lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-setismaskingenabled}

Sets whether masking is enabled\.

**Syntax**

```
void SetIsMaskingEnabled(bool enableMasking)
```

### SetUseAlphaTest {#lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-setusealphatest}

Sets whether to use the alpha channel in the mask visual's texture to define the mask\.

**Syntax**

```
void SetUseAlphaTest(bool useAlphaTest)
```