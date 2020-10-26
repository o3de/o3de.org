# UISliderComponent<a name="lua-scripting-ces-api-ui-uislidercomponent"></a>

Controls the values of a slider\.

## UiSliderBus<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus"></a>

Services messages for the `UiSliderComponent`\.

### GetFillEntity<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getfillentity"></a>

Returns the fill element\.

**Syntax**

```
AZ::EntityId GetFillEntity()
```

### GetManipulatorEntity<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getmanipulatorentity"></a>

Returns the entity ID of the manipulator element\.

**Syntax**

```
AZ::EntityId GetManipulatorEntity()
```

### GetMaxValue<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getmaxvalue"></a>

Returns the maximum value of the slider\.

**Syntax**

```
float GetMaxValue()
```

### GetMinValue<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getminvalue"></a>

Returns the minimum value of the slider\.

**Syntax**

```
float GetMinValue()
```

### GetStepValue<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getstepvalue"></a>

Returns the smallest increment allowed between values\. Zero means no restriction\.

**Syntax**

```
float GetStepValue()
```

### GetTrackEntity<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-gettrackentity"></a>

Returns the track element\.

**Syntax**

```
AZ::EntityId GetTrackEntity()
```

### GetValue<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getvalue"></a>

Returns the value of the slider\.

**Syntax**

```
float GetValue()
```

### GetValueChangedActionName<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getvaluechangedactionname"></a>

Returns the action triggered when the value has finished changing\.

**Syntax**

```
const AZStd::string& GetValueChangedActionName() 
```

### GetValueChangingActionName<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-getvaluechangingactionname"></a>

Returns the name of the action triggered while the value is changing\.

**Syntax**

```
const AZStd::string& GetValueChangingActionName() 
```

### SetFillEntity<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setfillentity"></a>

Sets the fill element\.

**Syntax**

```
void SetFillEntity(AZ::EntityId entityId)
```

### SetManipulatorEntity<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setmanipulatorentity"></a>

Sets the manipulator element\.

**Syntax**

```
void SetManipulatorEntity(AZ::EntityId entityId) 
```

### SetMaxValue<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setmaxvalue"></a>

Sets the maximum value of the slider\.

**Syntax**

```
void SetMaxValue(float value)
```

### SetMinValue<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setminvalue"></a>

Sets the minimum value of the slider\.

**Syntax**

```
void SetMinValue(float value)
```

### SetStepValue<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setstepvalue"></a>

Sets the smallest increment allowed between values\. Use zero for no restriction\.

**Syntax**

```
void SetStepValue(float step)
```

### SetTrackEntity<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-settrackentity"></a>

Sets the track element\.

**Syntax**

```
void SetTrackEntity(AZ::EntityId entityId)
```

### SetValue<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setvalue"></a>

Sets the value of the slider\.

**Syntax**

```
void SetValue(float value)
```

### SetValueChangedActionName<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setvaluechangedactionname"></a>

Sets the action triggered when the value is done changing\.

**Syntax**

```
void SetValueChangedActionName(const AZStd::string& actionName)
```

### SetValueChangingActionName<a name="lua-scripting-ces-api-ui-uislidercomponent-uisliderbus-setvaluechangingactionname"></a>

Sets the action triggered while the value is changing\.

**Syntax**

```
void SetValueChangingActionName(const AZStd::string& actionName)
```

## UiSliderNotificationBus<a name="lua-scripting-ces-api-ui-uislidercomponent-uislidernotificationbus"></a>

Services notifications for the `UiSliderComponent`\.

### OnSliderValueChanged<a name="lua-scripting-ces-api-ui-uislidercomponent-uislidernotificationbus-onslidervaluechanged"></a>

The slider value has finished changing\.

**Syntax**

```
void OnSliderValueChanged(float value)
```

### OnSliderValueChanging<a name="lua-scripting-ces-api-ui-uislidercomponent-uislidernotificationbus-onslidervaluechanging"></a>

The slider value is changing\.

**Syntax**

```
void OnSliderValueChanging(float value)
```