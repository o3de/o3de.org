# UiDropdownOptionComponent<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent"></a>

You can use `UiDropdownOptionComponent` to implement a dropdown options for a UI element in Amazon Lumberyard\.

## UiDropdownOptionBus<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus"></a>

Services messages for the `UiDropdownOptionComponent`\.

### GetOwningDropdown<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-getowningdropdown"></a>

Returns the owning dropdown to be modified when this dropdown option is selected\.

**Syntax**

```
AZ::EntityId GetOwningDropdown()
```

### SetOwningDropdown<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-setowningdropdown"></a>

Sets the owning dropdown to be modified when this dropdown option is selected\.

**Syntax**

```
void SetOwningDropdown(AZ::EntityId owningDropdown)
```

### GetTextElement<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-gettextelement"></a>

Returns the text element that is used to display this dropdown option’s text\.

**Syntax**

```
AZ::EntityId GetTextElement()
```

### SetTextElement<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-settextelement"></a>

Sets the text element that is used to display this dropdown option’s text\.

**Syntax**

```
void SetTextElement(AZ::EntityId textElement)
```

### GetIconElement<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-geticonelement"></a>

Returns the icon element that is used to display this dropdown option’s icon\.

**Syntax**

```
AZ::EntityId GetIconElement()
```

### SetIconElement<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-seticonelement"></a>

Sets the icon element that is used to display this dropdown option’s icon\.

**Syntax**

```
void SetIconElement(AZ::EntityId iconElement)
```

## UiDropdownOptionNotificationBus<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionnotificationbus"></a>

Services notifications for the `UiDropdownOptionComponent`\. 

### OnDropdownOptionSelected<a name="lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionnotificationbus-ondropdownoptionselected"></a>

Notifies that this dropdown option was selected\.

**Syntax**

```
void OnDropdownOptionSelected()
```