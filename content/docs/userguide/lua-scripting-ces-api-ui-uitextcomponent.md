# UITextComponent<a name="lua-scripting-ces-api-ui-uitextcomponent"></a>

Controls the text and formatting of a text element\.

## UiTextBus<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus"></a>

Services messages for the `UiTextComponent`\.

### GetColor<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getcolor"></a>

Returns the color to draw the text string\.

**Syntax**

```
AZ::Color GetColor()
```

### GetFont<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getfont"></a>

Returns the pathname to the font\.

**Syntax**

```
AZStd::string GetFont()
```

### GetFontEffect<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getfonteffect"></a>

Returns the font effect\.

**Syntax**

```
int GetFontEffect()
```

### GetFontSize<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getfontsize"></a>

Returns the size of the font in points\.

**Syntax**

```
float GetFontSize()
```

### GetHorizontalTextAlignment<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-gethorizontaltextalignment"></a>

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

### GetOverflowMode<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getoverflowmode"></a>

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

### GetText<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-gettext"></a>

Returns the text string being displayed by the element\.

**Syntax**

```
AZStd::string GetText()
```

### GetVerticalTextAlignment<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getverticaltextalignment"></a>

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

### GetWrapText<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getwraptext"></a>

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

### SetColor<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setcolor"></a>

Sets the color to draw the text string\.

**Syntax**

```
void SetColor(const AZ::Color& color)
```

### SetFont<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setfont"></a>

Sets the pathname to the font\.

**Syntax**

```
void SetFont(const AZStd::string& fontPath) 
```

### SetFontEffect<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setfonteffect"></a>

Sets the font effect\.

**Syntax**

```
void SetFontEffect(int effectIndex)
```

### SetFontSize<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setfontsize"></a>

Sets the size of the font in points\.

**Syntax**

```
void SetFontSize(float size)
```

### SetHorizontalTextAlignment<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-sethorizontaltextalignment"></a>

Sets the horizontal text alignment\.

**Syntax**

```
void SetHorizontalTextAlignment(eUiHAlign alignment) 
```

For possible values for `eUiHAlign`, see [GetHorizontalTextAlignment](#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-gethorizontaltextalignment)\.

### SetOverflowMode<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setoverflowmode"></a>

Sets the overflow behavior of the text\.

**Syntax**

```
void SetOverflowMode(eUiTextOverflowMode overflowMode) 
```

For possible values for `eUiTextOverflowMode`, see [GetOverflowMode](#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getoverflowmode)\.

### SetText<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-settext"></a>

Sets the text string being displayed by the element\.

**Syntax**

```
void SetText(const AZStd::string& text)
```

### SetVerticalTextAlignment<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setverticaltextalignment"></a>

Sets the vertical text alignment\.

**Syntax**

```
void SetVerticalTextAlignment(eUiVAlign alignment) 
```

For possible values for `eUiVAlign`, see [GetVerticalTextAlignment](#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getverticaltextalignment)\.

### SetWrapText<a name="lua-scripting-ces-api-ui-uitextcomponent-uitextbus-setwraptext"></a>

Sets whether text is wrapped\.

**Syntax**

```
void SetWrapText(eUiTextWrapTextSetting wrapSetting) 
```

For possible values for `eUiTextWrapTextSetting`, see [GetWrapText](#lua-scripting-ces-api-ui-uitextcomponent-uitextbus-getwraptext)\.