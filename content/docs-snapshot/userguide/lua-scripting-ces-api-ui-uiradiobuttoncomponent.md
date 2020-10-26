# UiRadioButtonComponent<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent"></a>

You can use `UiRadioButtonComponent` to implement a UI radio button in Amazon Lumberyard\.

## UiRadioButtonBus<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus"></a>

Services messages for the `UiRadioButtonComponent`\.

### GetState<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getstate"></a>

Returns the state of the radio button\. True if selected; false otherwise\.

**Syntax**

```
bool GetState()
```

### GetGroup<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getgroup"></a>

Returns the group of the radio button\.

**Syntax**

```
AZ::EntityId GetGroup()
```

### GetCheckedEntity<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getcheckedentity"></a>

Returns the child element that is shown when the radio button is selected\.

**Syntax**

```
AZ::EntityId GetCheckedEntity()
```

### SetCheckedEntity<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setcheckedentity"></a>

Sets the child element to show when the radio button is selected\.

**Syntax**

```
void SetCheckedEntity(AZ::EntityId entityId)
```

### GetUncheckedEntity<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getuncheckedentity"></a>

Returns the child element that is shown when the radio button is cleared\.

**Syntax**

```
AZ::EntityId GetUncheckedEntity()
```

### SetUncheckedEntity<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setuncheckedentity"></a>

Sets the child element to show when the radio button is cleared\.

**Syntax**

```
void SetUncheckedEntity(AZ::EntityId entityId)
```

### GetTurnOnActionName<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getturnonactionname"></a>

Returns the name of the action that is triggered when the radio button is selected\. 

**Syntax**

```
const AZStd::string& GetTurnOnActionName()
```

### SetTurnOnActionName<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setturnonactionname"></a>

Sets the action triggered when the radio button is selected\.

**Syntax**

```
void SetTurnOnActionName(const AZStd::string & actionName)
```

### GetTurnOffActionName<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getturnoffactionname"></a>

Returns the action triggered when the radio button is cleared\.

**Syntax**

```
const AZStd::string & GetTurnOffActionName() 
```

### SetTurnOffActionName<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setturnoffactionname"></a>

Sets the action triggered when the radio button is cleared\.

**Syntax**

```
void SetTurnOffActionName(const AZStd::string & actionName)
```

### GetChangedActionName<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getchangedactionname"></a>

Returns the action triggered when the radio button value changes\.

**Syntax**

```
AZStd::string & GetChangedActionName()
```

### SetChangedActionName<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setchangedactionname"></a>

Sets the action triggered when the radio button value changes\.

**Syntax**

```
void SetChangedActionName(const AZStd::string& actionName)
```

## UiRadioButtonCommunicationBus<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttoncommunicationbus"></a>

Allows communication between the radio button group and a radio button\. 

### SetState<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttoncommunicationbus-setstate"></a>

Sets the state of the radio button\. True if selected; false otherwise\.

**Syntax**

```
void SetState(bool checked)
```

### SetGroup<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttoncommunicationbus-setgroup"></a>

Sets the group of the radio button\.

**Syntax**

```
void SetGroup(AZ:EntityId group)
```

## UiRadioButtonNotificationBus<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonnotificationbus"></a>

Services notifications for the `UiRadioButtonComponent`\. 

### OnRadioButtonStateChange<a name="lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonnotificationbus-onradiobuttonstatechange"></a>

Notifies that the radio button state has changed\.

**Syntax**

```
void OnRadioButtonStateChange(bool checked)
```