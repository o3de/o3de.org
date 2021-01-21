---
description: ' Use UiDropdownOptionComponent to implement dropdown options for a UI
  element in &ALYlong;. '
title: UiDropdownOptionComponent
---
# UiDropdownOptionComponent {#lua-scripting-ces-api-ui-uidropdownoptioncomponent}

You can use `UiDropdownOptionComponent` to implement a dropdown options for a UI element in Amazon Lumberyard\.

## UiDropdownOptionBus {#lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus}

Services messages for the `UiDropdownOptionComponent`\.

### GetOwningDropdown {#lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-getowningdropdown}

Returns the owning dropdown to be modified when this dropdown option is selected\.

**Syntax**

```
AZ::EntityId GetOwningDropdown()
```

### SetOwningDropdown {#lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-setowningdropdown}

Sets the owning dropdown to be modified when this dropdown option is selected\.

**Syntax**

```
void SetOwningDropdown(AZ::EntityId owningDropdown)
```

### GetTextElement {#lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-gettextelement}

Returns the text element that is used to display this dropdown option's text\.

**Syntax**

```
AZ::EntityId GetTextElement()
```

### SetTextElement {#lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-settextelement}

Sets the text element that is used to display this dropdown option's text\.

**Syntax**

```
void SetTextElement(AZ::EntityId textElement)
```

### GetIconElement {#lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-geticonelement}

Returns the icon element that is used to display this dropdown option's icon\.

**Syntax**

```
AZ::EntityId GetIconElement()
```

### SetIconElement {#lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionbus-seticonelement}

Sets the icon element that is used to display this dropdown option's icon\.

**Syntax**

```
void SetIconElement(AZ::EntityId iconElement)
```

## UiDropdownOptionNotificationBus {#lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionnotificationbus}

Services notifications for the `UiDropdownOptionComponent`\.

### OnDropdownOptionSelected {#lua-scripting-ces-api-ui-uidropdownoptioncomponent-uidropdownoptionnotificationbus-ondropdownoptionselected}

Notifies that this dropdown option was selected\.

**Syntax**

```
void OnDropdownOptionSelected()
```