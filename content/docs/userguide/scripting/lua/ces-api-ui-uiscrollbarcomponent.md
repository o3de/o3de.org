---
description: ' Use the UIScrollBarComponent to control scroll bar characteristics
  in &ALYlong;. '
title: UIScrollBarComponent
---
# UIScrollBarComponent {#lua-scripting-ces-api-ui-uiscrollbarcomponent}

Controls scroll bar characteristics\.

## UiScrollBarBus {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus}

Services messages for the `UiScrollBarComponent`\.

### GetAutoFadeDelay {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-getautofadedelay}

Returns the fade delay in seconds\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
float GetAutoFadeDelay()
```

### GetAutoFadeSpeed {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-getautofadespeed}

Returns the fade speed in seconds\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
float GetAutoFadeSpeed()
```

### GetHandleEntity {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-gethandleentity}

Returns the handle entity\.

**Syntax**

```
AZ::EntityId GetHandleEntity()
```

### GetHandleSize {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-gethandlesize}

Returns the size of the handle relative to the scroll bar \(0 \- 1\)\.

**Syntax**

```
float GetHandleSize()
```

### GetMinHandlePixelSize {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-getminhandlepixelsize}

Returns the minimum size of the handle in pixels\.

**Syntax**

```
float GetMinHandlePixelSize()
```

### IsAutoFadeEnabled {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-isautofadeenabled}

Returns whether auto fade is enabled\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
bool IsAutoFadeEnabled()
```

### SetAutoFadeDelay {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-setautofadedelay}

Sets the fade delay in seconds\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
void SetAutoFadeDelay(float delay)
```

### SetAutoFadeEnabled {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-setautofadeenabled}

Sets whether auto fade is enabled\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
void SetAutoFadeEnabled(bool isEnabled)
```

### SetAutoFadeSpeed {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-setautofadespeed}

Sets the fade speed in seconds\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
void SetAutoFadeSpeed(float speed)
```

### SetHandleEntity {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-sethandleentity}

Sets the handle entity\.

**Syntax**

```
void SetHandleEntity(AZ::EntityId entityId)
```

### SetHandleSize {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-sethandlesize}

Sets the size of the handle relative to the scroll bar \(0 \- 1\)\.

**Syntax**

```
void SetHandleSize(float size)
```

### SetMinHandlePixelSize {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollbarbus-setminhandlepixelsize}

Sets the minimum size of the handle in pixels\.

**Syntax**

```
void SetMinHandlePixelSize(float size)
```

## UiScrollerBus {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus}

Services scrolling for the `UiScrollBarComponent`\.

### GetOrientation {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getorientation}

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

### GetValue {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getvalue}

Returns the current value for the scroller \(0 \- 1\)\.

**Syntax**

```
float GetValue()
```

### GetValueChangedActionName {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getvaluechangedactionname}

Returns the name of the action triggered when the value has changed\.

**Syntax**

```
const AZStd::string& GetValueChangedActionName() 
```

### GetValueChangingActionName {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getvaluechangingactionname}

Returns the name of the action triggered while the value is changing\.

**Syntax**

```
AZStd::string& GetValueChangingActionName() 
```

### SetOrientation {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-setorientation}

Sets the orientation of the scroller\.

**Syntax**

```
SetOrientation(eUiScrollerOrientation orientation) 
```

For possible values for `eUiScrollerOrientation`, see [GetOrientation](#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-getorientation)\.

### SetValue {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-setvalue}

Sets the value of the scroller \(0 \- 1\)\.

**Syntax**

```
void SetValue(float value)
```

### SetValueChangedActionName {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-setvaluechangedactionname}

Sets the action triggered when the value has changed\.

**Syntax**

```
void SetValueChangedActionName(const AZStd::string& actionName)
```

### SetValueChangingActionName {#lua-scripting-ces-api-ui-uiscrollbarcomponent-uiscrollerbus-setvaluechangingactionname}

Sets the name of the action triggered while the value is changing\.

**Syntax**

```
void SetValueChangingActionName(const AZStd::string& actionName)
```