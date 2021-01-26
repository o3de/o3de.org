---
description: ' Use the UIButtonComponent in Lua to implement button functionality
  in Amazon Lumberyard. '
title: UIButtonComponent
---
# UIButtonComponent {#lua-scripting-ces-api-ui-uibuttoncomponent}

You can use a button component to make an element behave like a button\.

## UiButtonBus {#lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonbus}

Services messages for the `UiButtonComponent`\.

### GetOnClickActionName {#lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonbus-getonclickactionname}

Returns the action triggered when the button is released\.

**Syntax**

```
AZStd::string UiButtonBus::GetOnClickActionName()
```

### SetOnClickActionName {#lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonbus-setonclickactionname}

Sets the action triggered when the button is released\.

**Syntax**

```
void UiButtonBus::SetOnClickActionName(const AZStd::string& actionName)
```

## UiButtonNotificationBus {#lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonnotificationbus}

Services notifications for the `UiButtonComponent`\.

### OnButtonClick {#lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonnotificationbus-onbuttonclick}

Occurs when a button has been clicked\.

**Syntax**

```
void OnButtonClick()
```