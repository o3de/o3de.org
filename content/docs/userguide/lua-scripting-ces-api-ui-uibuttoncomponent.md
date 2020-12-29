# UIButtonComponent<a name="lua-scripting-ces-api-ui-uibuttoncomponent"></a>

You can use a button component to make an element behave like a button\.

## UiButtonBus<a name="lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonbus"></a>

Services messages for the `UiButtonComponent`\.

### GetOnClickActionName<a name="lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonbus-getonclickactionname"></a>

Returns the action triggered when the button is released\.

**Syntax**

```
AZStd::string UiButtonBus::GetOnClickActionName()
```

### SetOnClickActionName<a name="lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonbus-setonclickactionname"></a>

Sets the action triggered when the button is released\.

**Syntax**

```
void UiButtonBus::SetOnClickActionName(const AZStd::string& actionName)
```

## UiButtonNotificationBus<a name="lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonnotificationbus"></a>

Services notifications for the `UiButtonComponent`\.

### OnButtonClick<a name="lua-scripting-ces-api-ui-uibuttoncomponent-uibuttonnotificationbus-onbuttonclick"></a>

Occurs when a button has been clicked\.

**Syntax**

```
void OnButtonClick()
```