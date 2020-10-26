# UIScrollBarComponent<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent"></a>

Controls scroll bar characteristics\.

## UiScrollBarBus<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus"></a>

Services messages for the `UiScrollBarComponent`\.

### GetAutoFadeDelay<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-getautofadedelay"></a>

Returns the fade delay in seconds\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
float GetAutoFadeDelay()
```

### GetAutoFadeSpeed<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-getautofadespeed"></a>

Returns the fade speed in seconds\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
float GetAutoFadeSpeed()
```

### GetHandleEntity<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-gethandleentity"></a>

Returns the handle entity\.

**Syntax**

```
AZ::EntityId GetHandleEntity()
```

### GetHandleSize<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-gethandlesize"></a>

Returns the size of the handle relative to the scroll bar \(0 \- 1\)\.

**Syntax**

```
float GetHandleSize()
```

### GetMinHandlePixelSize<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-getminhandlepixelsize"></a>

Returns the minimum size of the handle in pixels\.

**Syntax**

```
float GetMinHandlePixelSize()
```

### IsAutoFadeEnabled<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-isautofadeenabled"></a>

Returns whether auto fade is enabled\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
bool IsAutoFadeEnabled()
```

### SetAutoFadeDelay<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-setautofadedelay"></a>

Sets the fade delay in seconds\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
void SetAutoFadeDelay(float delay)
```

### SetAutoFadeEnabled<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-setautofadeenabled"></a>

Sets whether auto fade is enabled\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
void SetAutoFadeEnabled(bool isEnabled)
```

### SetAutoFadeSpeed<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-setautofadespeed"></a>

Sets the fade speed in seconds\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
void SetAutoFadeSpeed(float speed)
```

### SetHandleEntity<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-sethandleentity"></a>

Sets the handle entity\.

**Syntax**

```
void SetHandleEntity(AZ::EntityId entityId)
```

### SetHandleSize<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-sethandlesize"></a>

Sets the size of the handle relative to the scroll bar \(0 \- 1\)\.

**Syntax**

```
void SetHandleSize(float size)
```

### SetMinHandlePixelSize<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-setminhandlepixelsize"></a>

Sets the minimum size of the handle in pixels\.

**Syntax**

```
void SetMinHandlePixelSize(float size)
```

## UiScrollerBus<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus"></a>

Services scrolling for the `UiScrollBarComponent`\.

### GetOrientation<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getorientation"></a>

Returns the orientation of the scroller\.

**Syntax**

```
eUiScrollerOrientation GetOrientation()
```

Following are possible values for `eUiScrollerOrientation`\.

```
enum eUiScrollerOrientation
    {
        eUiScrollerOrientation_Horizontal,
        eUiScrollerOrientation_Vertical
    };
```

### GetValue<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getvalue"></a>

Returns the current value for the scroller \(0 \- 1\)\.

**Syntax**

```
float GetValue()
```

### GetValueChangedActionName<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getvaluechangedactionname"></a>

Returns the name of the action triggered when the value has changed\.

**Syntax**

```
const AZStd::string& GetValueChangedActionName() 
```

### GetValueChangingActionName<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getvaluechangingactionname"></a>

Returns the name of the action triggered while the value is changing\.

**Syntax**

```
AZStd::string& GetValueChangingActionName() 
```

### SetOrientation<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-setorientation"></a>

Sets the orientation of the scroller\.

**Syntax**

```
SetOrientation(eUiScrollerOrientation orientation) 
```

For possible values for `eUiScrollerOrientation`, see [GetOrientation](#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getorientation)\.

### SetValue<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-setvalue"></a>

Sets the value of the scroller \(0 \- 1\)\.

**Syntax**

```
void SetValue(float value)
```

### SetValueChangedActionName<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-setvaluechangedactionname"></a>

Sets the action triggered when the value has changed\.

**Syntax**

```
void SetValueChangedActionName(const AZStd::string& actionName)
```

### SetValueChangingActionName<a name="lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-setvaluechangingactionname"></a>

Sets the name of the action triggered while the value is changing\.

**Syntax**

```
void SetValueChangingActionName(const AZStd::string& actionName)
```