---
description: ' Use the UISliderComponent to control the value of a slider in &ALYlong;. '
title: UISliderComponent
---
# UISliderComponent {#lua-scripting-ces-api-ui-uislidercomponent}

Controls the values of a slider\.

## UiSliderBus {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus}

Services messages for the `UiSliderComponent`\.

### GetFillEntity {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getfillentity}

Returns the fill element\.

**Syntax**

```
AZ::EntityId GetFillEntity()
```

### GetManipulatorEntity {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getmanipulatorentity}

Returns the entity ID of the manipulator element\.

**Syntax**

```
AZ::EntityId GetManipulatorEntity()
```

### GetMaxValue {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getmaxvalue}

Returns the maximum value of the slider\.

**Syntax**

```
float GetMaxValue()
```

### GetMinValue {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getminvalue}

Returns the minimum value of the slider\.

**Syntax**

```
float GetMinValue()
```

### GetStepValue {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getstepvalue}

Returns the smallest increment allowed between values\. Zero means no restriction\.

**Syntax**

```
float GetStepValue()
```

### GetTrackEntity {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-gettrackentity}

Returns the track element\.

**Syntax**

```
AZ::EntityId GetTrackEntity()
```

### GetValue {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getvalue}

Returns the value of the slider\.

**Syntax**

```
float GetValue()
```

### GetValueChangedActionName {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getvaluechangedactionname}

Returns the action triggered when the value has finished changing\.

**Syntax**

```
const AZStd::string& GetValueChangedActionName() 
```

### GetValueChangingActionName {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getvaluechangingactionname}

Returns the name of the action triggered while the value is changing\.

**Syntax**

```
const AZStd::string& GetValueChangingActionName() 
```

### SetFillEntity {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setfillentity}

Sets the fill element\.

**Syntax**

```
void SetFillEntity(AZ::EntityId entityId)
```

### SetManipulatorEntity {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setmanipulatorentity}

Sets the manipulator element\.

**Syntax**

```
void SetManipulatorEntity(AZ::EntityId entityId) 
```

### SetMaxValue {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setmaxvalue}

Sets the maximum value of the slider\.

**Syntax**

```
void SetMaxValue(float value)
```

### SetMinValue {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setminvalue}

Sets the minimum value of the slider\.

**Syntax**

```
void SetMinValue(float value)
```

### SetStepValue {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setstepvalue}

Sets the smallest increment allowed between values\. Use zero for no restriction\.

**Syntax**

```
void SetStepValue(float step)
```

### SetTrackEntity {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-settrackentity}

Sets the track element\.

**Syntax**

```
void SetTrackEntity(AZ::EntityId entityId)
```

### SetValue {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setvalue}

Sets the value of the slider\.

**Syntax**

```
void SetValue(float value)
```

### SetValueChangedActionName {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setvaluechangedactionname}

Sets the action triggered when the value is done changing\.

**Syntax**

```
void SetValueChangedActionName(const AZStd::string& actionName)
```

### SetValueChangingActionName {#lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setvaluechangingactionname}

Sets the action triggered while the value is changing\.

**Syntax**

```
void SetValueChangingActionName(const AZStd::string& actionName)
```

## UiSliderNotificationBus {#lua-scripting-ces-api-ui-uislidercomponent-uislidernotificationbus}

Services notifications for the `UiSliderComponent`\.

### OnSliderValueChanged {#lua-scripting-ces-api-ui-uislidercomponent-uislidernotificationbus-onslidervaluechanged}

The slider value has finished changing\.

**Syntax**

```
void OnSliderValueChanged(float value)
```

### OnSliderValueChanging {#lua-scripting-ces-api-ui-uislidercomponent-uislidernotificationbus-onslidervaluechanging}

The slider value is changing\.

**Syntax**

```
void OnSliderValueChanging(float value)
```