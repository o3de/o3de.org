---
description: ' Use the UICheckboxComponent to implement a UI check box in Amazon Lumberyard. '
title: UICheckboxComponent
---
# UICheckboxComponent {#lua-scripting-ces-api-ui-uicheckboxcomponent}

You can use this component to implement a UI check box in Amazon Lumberyard\.

## UiCheckboxBus {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus}

Services messages for the `UiCheckboxComponent`\.

### GetChangedActionName {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getchangedactionname}

Returns the action triggered when the check box value changes\.

**Syntax**

```
AZStd::string & GetChangedActionName()
```

### GetCheckedEntity {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getcheckedentity}

Returns the child element that is shown when the check box is selected\.

**Syntax**

```
AZ::EntityId GetCheckedEntity()
```

### GetState {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getstate}

Returns the state of the check box\. True if selected; false otherwise\.

**Syntax**

```
bool GetState()
```

### GetTurnOffActionName {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getturnoffactionname}

Returns the action triggered when the check box is cleared\.

**Syntax**

```
const AZStd::string & GetTurnOffActionName()
```

### GetTurnOnActionName {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getturnonactionname}

Returns the name of the action that is triggered when the check box is selected\.

**Syntax**

```
const AZStd::string& GetTurnOnActionName()
```

### GetUncheckedEntity {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-getuncheckedentity}

Returns the child element that is shown when the check box is cleared\.

**Syntax**

```
AZ::EntityId GetUncheckedEntity()
```

### SetChangedActionName {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setchangedactionname}

Sets the action triggered when the check box value changes\.

**Syntax**

```
void SetChangedActionName(const AZStd::string& actionName)
```

### SetCheckedEntity {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setcheckedentity}

Sets the child element to show when the check box is selected\.

**Syntax**

```
void SetCheckedEntity(AZ::EntityId entityId)
```

### SetState {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setstate}

Sets the state of the check box\. True if selected; false otherwise\.

**Syntax**

```
void SetState(bool checked)
```

### SetTurnOffActionName {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setturnoffactionname}

Sets the action triggered when the check box is cleared\.

**Syntax**

```
void SetTurnOffActionName(const AZStd::string & actionName)
```

### SetTurnOnActionName {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setturnonactionname}

Sets the action triggered when the check box is selected\.

**Syntax**

```
void SetTurnOnActionName(const AZStd::string & actionName)
```

### SetUncheckedEntity {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-setuncheckedentity}

Sets the child element to show when the check box is cleared\.

**Syntax**

```
void SetUncheckedEntity(AZ::EntityId entityId)
```

### ToggleState {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxbus-togglestate}

Toggles the state of the check box\.

**Syntax**

```
bool ToggleState()
```

## UiCheckboxNotificationBus {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxnotificationbus}

Services notifications for the `UiCheckboxComponent`\.

### OnCheckboxStateChange {#lua-scripting-ces-api-ui-uicheckboxcomponent-uicheckboxnotificationbus-oncheckboxstatechange}

Notifies that the check box state has changed\.

**Syntax**

```
void OnCheckboxStateChange(bool checked)
```