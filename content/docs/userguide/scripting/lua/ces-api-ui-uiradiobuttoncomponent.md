---
description: ' Use UiRadioButtonComponent to implement a UI radio button in &ALYlong;. '
title: UiRadioButtonComponent
---
# UiRadioButtonComponent {#lua-scripting-ces-api-ui-uiradiobuttoncomponent}

You can use `UiRadioButtonComponent` to implement a UI radio button in Amazon Lumberyard\.

## UiRadioButtonBus {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus}

Services messages for the `UiRadioButtonComponent`\.

### GetState {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getstate}

Returns the state of the radio button\. True if selected; false otherwise\.

**Syntax**

```
bool GetState()
```

### GetGroup {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getgroup}

Returns the group of the radio button\.

**Syntax**

```
AZ::EntityId GetGroup()
```

### GetCheckedEntity {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getcheckedentity}

Returns the child element that is shown when the radio button is selected\.

**Syntax**

```
AZ::EntityId GetCheckedEntity()
```

### SetCheckedEntity {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setcheckedentity}

Sets the child element to show when the radio button is selected\.

**Syntax**

```
void SetCheckedEntity(AZ::EntityId entityId)
```

### GetUncheckedEntity {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getuncheckedentity}

Returns the child element that is shown when the radio button is cleared\.

**Syntax**

```
AZ::EntityId GetUncheckedEntity()
```

### SetUncheckedEntity {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setuncheckedentity}

Sets the child element to show when the radio button is cleared\.

**Syntax**

```
void SetUncheckedEntity(AZ::EntityId entityId)
```

### GetTurnOnActionName {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getturnonactionname}

Returns the name of the action that is triggered when the radio button is selected\. 

**Syntax**

```
const AZStd::string& GetTurnOnActionName()
```

### SetTurnOnActionName {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setturnonactionname}

Sets the action triggered when the radio button is selected\.

**Syntax**

```
void SetTurnOnActionName(const AZStd::string & actionName)
```

### GetTurnOffActionName {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getturnoffactionname}

Returns the action triggered when the radio button is cleared\.

**Syntax**

```
const AZStd::string & GetTurnOffActionName() 
```

### SetTurnOffActionName {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setturnoffactionname}

Sets the action triggered when the radio button is cleared\.

**Syntax**

```
void SetTurnOffActionName(const AZStd::string & actionName)
```

### GetChangedActionName {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-getchangedactionname}

Returns the action triggered when the radio button value changes\.

**Syntax**

```
AZStd::string & GetChangedActionName()
```

### SetChangedActionName {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonbus-setchangedactionname}

Sets the action triggered when the radio button value changes\.

**Syntax**

```
void SetChangedActionName(const AZStd::string& actionName)
```

## UiRadioButtonCommunicationBus {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttoncommunicationbus}

Allows communication between the radio button group and a radio button\. 

### SetState {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttoncommunicationbus-setstate}

Sets the state of the radio button\. True if selected; false otherwise\.

**Syntax**

```
void SetState(bool checked)
```

### SetGroup {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttoncommunicationbus-setgroup}

Sets the group of the radio button\.

**Syntax**

```
void SetGroup(AZ:EntityId group)
```

## UiRadioButtonNotificationBus {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonnotificationbus}

Services notifications for the `UiRadioButtonComponent`\. 

### OnRadioButtonStateChange {#lua-scripting-ces-api-ui-uiradiobuttoncomponent-uiradiobuttonnotificationbus-onradiobuttonstatechange}

Notifies that the radio button state has changed\.

**Syntax**

```
void OnRadioButtonStateChange(bool checked)
```