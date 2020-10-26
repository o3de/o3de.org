# UICheckboxComponent<a name="lua-scripting-ces-api-ui-uicheckboxcomponent"></a>

You can use this component to implement a UI check box in Amazon Lumberyard\.

## UiCheckboxBus<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus"></a>

Services messages for the `UiCheckboxComponent`\.

### GetChangedActionName<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getchangedactionname"></a>

Returns the action triggered when the check box value changes\.

**Syntax**

```
AZStd::string & GetChangedActionName()
```

### GetCheckedEntity<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getcheckedentity"></a>

Returns the child element that is shown when the check box is selected\.

**Syntax**

```
AZ::EntityId GetCheckedEntity()
```

### GetState<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getstate"></a>

Returns the state of the check box\. True if selected; false otherwise\.

**Syntax**

```
bool GetState()
```

### GetTurnOffActionName<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getturnoffactionname"></a>

Returns the action triggered when the check box is cleared\.

**Syntax**

```
const AZStd::string & GetTurnOffActionName() 
```

### GetTurnOnActionName<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getturnonactionname"></a>

Returns the name of the action that is triggered when the check box is selected\.

**Syntax**

```
const AZStd::string& GetTurnOnActionName()
```

### GetUncheckedEntity<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getuncheckedentity"></a>

Returns the child element that is shown when the check box is cleared\.

**Syntax**

```
AZ::EntityId GetUncheckedEntity()
```

### SetChangedActionName<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setchangedactionname"></a>

Sets the action triggered when the check box value changes\.

**Syntax**

```
void SetChangedActionName(const AZStd::string& actionName)
```

### SetCheckedEntity<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setcheckedentity"></a>

Sets the child element to show when the check box is selected\.

**Syntax**

```
void SetCheckedEntity(AZ::EntityId entityId)
```

### SetState<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setstate"></a>

Sets the state of the check box\. True if selected; false otherwise\.

**Syntax**

```
void SetState(bool checked)
```

### SetTurnOffActionName<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setturnoffactionname"></a>

Sets the action triggered when the check box is cleared\.

**Syntax**

```
void SetTurnOffActionName(const AZStd::string & actionName)
```

### SetTurnOnActionName<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setturnonactionname"></a>

Sets the action triggered when the check box is selected\.

**Syntax**

```
void SetTurnOnActionName(const AZStd::string & actionName)
```

### SetUncheckedEntity<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setuncheckedentity"></a>

Sets the child element to show when the check box is cleared\.

**Syntax**

```
void SetUncheckedEntity(AZ::EntityId entityId)
```

### ToggleState<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-togglestate"></a>

Toggles the state of the check box\.

**Syntax**

```
bool ToggleState()
```

## UiCheckboxNotificationBus<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxnotificationbus"></a>

Services notifications for the `UiCheckboxComponent`\.

### OnCheckboxStateChange<a name="lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxnotificationbus-oncheckboxstatechange"></a>

Notifies that the check box state has changed\.

**Syntax**

```
void OnCheckboxStateChange(bool checked)
```