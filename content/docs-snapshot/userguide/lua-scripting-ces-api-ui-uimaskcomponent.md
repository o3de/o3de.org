# UIMaskComponent<a name="lua-scripting-ces-api-ui-uimaskcomponent"></a>

You can add a mask component to an element to show only a part of the content of its child elements \(for example, example, image or text\)\.

## UiMaskBus<a name="lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus"></a>

Services messages for the `UiMaskComponent`\.

### GetDrawBehind<a name="lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-getdrawbehind"></a>

Returns whether the mask is drawn behind the child elements\.

**Syntax**

```
bool GetDrawBehind()
```

### GetDrawInFront<a name="lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-getdrawinfront"></a>

Returns whether the mask is drawn in front of child elements\.

**Syntax**

```
bool GetDrawInFront()
```

### GetIsMaskingEnabled<a name="lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-getismaskingenabled"></a>

Returns whether masking is enabled\.

**Syntax**

```
bool GetIsMaskingEnabled()
```

### GetUseAlphaTest<a name="lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-getusealphatest"></a>

Returns whether to use the alpha channel in the mask visual's texture to define the mask\.

**Syntax**

```
bool GetUseAlphaTest()
```

### SetDrawBehind<a name="lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-setdrawbehind"></a>

Sets whether the mask is drawn behind the child elements\.

**Syntax**

```
void SetDrawBehind(bool drawMaskVisualBehindChildren) 
```

### SetDrawInFront<a name="lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-setdrawinfront"></a>

Sets whether the mask is drawn in front of child elements\.

**Syntax**

```
void SetDrawInFront(bool drawMaskVisualInFrontOfChildren)
```

### SetIsMaskingEnabled<a name="lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-setismaskingenabled"></a>

Sets whether masking is enabled\.

**Syntax**

```
void SetIsMaskingEnabled(bool enableMasking)
```

### SetUseAlphaTest<a name="lua-scripting-ces-api-ui-uimaskcomponent-uimaskbus-setusealphatest"></a>

Sets whether to use the alpha channel in the mask visual's texture to define the mask\.

**Syntax**

```
void SetUseAlphaTest(bool useAlphaTest)
```