---
description: ' Use the UITextComponent to control the text and formatting of a text
  element in Amazon Lumberyard. '
title: UITextComponent
---
# UITextComponent {#lua-scripting-ces-api-ui-uitextcomponent}

Controls the text and formatting of a text element\.

## UiTextBus {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus}

Services messages for the `UiTextComponent`\.

### GetColor {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getcolor}

Returns the color to draw the text string\.

**Syntax**

```
AZ::Color GetColor()
```

### GetFont {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getfont}

Returns the pathname to the font\.

**Syntax**

```
AZStd::string GetFont()
```

### GetFontEffect {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getfonteffect}

Returns the font effect\.

**Syntax**

```
int GetFontEffect()
```

### GetFontSize {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getfontsize}

Returns the size of the font in points\.

**Syntax**

```
float GetFontSize()
```

### GetHorizontalTextAlignment {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-gethorizontaltextalignment}

Returns the horizontal text alignment\.

**Syntax**

```
eUiHAlign GetHorizontalTextAlignment()
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

### GetOverflowMode {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getoverflowmode}

Returns the overflow behavior of the text\.

**Syntax**

```
eUiTextOverflowMode GetOverflowMode()
```

Following are possible values for `eUiTextOverflowMode`\.

```
enum eUiTextOverflowMode
    {
        eUiTextOverflowMode_OverflowText,
        eUiTextOverflowMode_ClipText
    };
```

### GetText {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-gettext}

Returns the text string being displayed by the element\.

**Syntax**

```
AZStd::string GetText()
```

### GetVerticalTextAlignment {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getverticaltextalignment}

Returns the vertical text alignment\.

**Syntax**

```
eUiVAlign GetVerticalTextAlignment()
```

Following are possible values for eUiVAlign\.

```
enum eUiVAlign
    {
        eUiVAlign_Top,
        eUiVAlign_Center,
        eUiVAlign_Bottom
    };
```

### GetWrapText {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getwraptext}

Returns whether text is wrapped\.

**Syntax**

```
eUiTextWrapTextSetting GetWrapText()
```

Following are possible values for `eUiTextWrapTextSetting`\.

```
enum eUiTextWrapTextSetting
    {
        eUiTextWrapTextSetting_NoWrap,
        eUiTextWrapTextSetting_Wrap
    };
```

### SetColor {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setcolor}

Sets the color to draw the text string\.

**Syntax**

```
void SetColor(const AZ::Color& color)
```

### SetFont {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setfont}

Sets the pathname to the font\.

**Syntax**

```
void SetFont(const AZStd::string& fontPath)
```

### SetFontEffect {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setfonteffect}

Sets the font effect\.

**Syntax**

```
void SetFontEffect(int effectIndex)
```

### SetFontSize {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setfontsize}

Sets the size of the font in points\.

**Syntax**

```
void SetFontSize(float size)
```

### SetHorizontalTextAlignment {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-sethorizontaltextalignment}

Sets the horizontal text alignment\.

**Syntax**

```
void SetHorizontalTextAlignment(eUiHAlign alignment)
```

For possible values for `eUiHAlign`, see [GetHorizontalTextAlignment](#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-gethorizontaltextalignment)\.

### SetOverflowMode {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setoverflowmode}

Sets the overflow behavior of the text\.

**Syntax**

```
void SetOverflowMode(eUiTextOverflowMode overflowMode)
```

For possible values for `eUiTextOverflowMode`, see [GetOverflowMode](#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getoverflowmode)\.

### SetText {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-settext}

Sets the text string being displayed by the element\.

**Syntax**

```
void SetText(const AZStd::string& text)
```

### SetVerticalTextAlignment {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setverticaltextalignment}

Sets the vertical text alignment\.

**Syntax**

```
void SetVerticalTextAlignment(eUiVAlign alignment)
```

For possible values for `eUiVAlign`, see [GetVerticalTextAlignment](#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getverticaltextalignment)\.

### SetWrapText {#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setwraptext}

Sets whether text is wrapped\.

**Syntax**

```
void SetWrapText(eUiTextWrapTextSetting wrapSetting)
```

For possible values for `eUiTextWrapTextSetting`, see [GetWrapText](#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getwraptext)\.