---
description: ' Use UiDropdownComponent to enable dropdown menu options for a UI element
  in &ALYlong;. '
title: UiDropdownComponent
---
# UiDropdownComponent {#lua-scripting-ces-api-ui-uidropdowncomponent}

You can use `UiDropdownComponent` to implement a UI dropdown menu in Amazon Lumberyard\.

## UiDropdownBus {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus}

Services messages for the `UiDropdownComponent`\.

### GetValue {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getvalue}

Returns the value of the dropdown\. The value is the last option that was selected\.

**Syntax**

```
AZ::EntityId GetValue()
```

### SetValue {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setvalue}

Sets the value of the dropdown manually\.

**Syntax**

```
void SetValue(AZ::EntityId value)
```

### GetContent {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getcontent}

Returns the content element that this dropdown expands\.

**Syntax**

```
AZ::EntityId GetContent()
```

### SetContent {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setcontent}

Sets the content element that this dropdown expands\.

**Syntax**

```
void SetContent(AZ::EntityId content)
```

### GetExpandOnHover {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getexpandonhover}

Returns whether this dropdown should expand automatically on hover\.

**Syntax**

```
bool GetExpandOnHover()
```

### SetExpandOnHover {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setexpandonhover}

Sets whether this dropdown expands automatically on hover\.

**Syntax**

```
void SetExpandOnHover(bool expandOnHover)
```

### GetWaitTime {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getwaittime}

Returns how long to wait before expanding upon hover and collapsing upon exit\.

**Syntax**

```
float GetWaitTime()
```

### SetWaitTime {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setwaittime}

Sets how long to wait before expanding upon hover and collapsing upon exit\.

**Syntax**

```
void SetWaitTime(float waitTime)
```

### GetCollapseOnOutsideClick {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getcollapseonoutsideclick}

Returns whether this dropdown collapses when the user clicks outside\. 

**Syntax**

```
bool GetCollapseOnOutsideClick()
```

### SetCollapseOnOutsideClick {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setcollapseonoutsideclick}

Sets whether this dropdown collapses when the user clicks outside\.

**Syntax**

```
void SetCollapseOnOutsideClick(bool collapseOnOutsideClick)
```

### GetExpandedParentId {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getexpandedparentid}

Returns the element that the dropdown content parents to when expanded \(the root element by default\)\.

**Syntax**

```
AZ::EntityId GetExpandedParentId() 
```

### SetExpandedParentId {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setexpandedparentid}

Sets the element that the dropdown content parents to when expanded\.

**Syntax**

```
void SetExpandedParentId(AZ::EntityId expandedParentId)
```

### GetTextElement {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-gettextelement}

Returns the text element that displays the text of the currently selected option\.

**Syntax**

```
bool GetCollapseOnOutsideClick()
```

### SetTextElement {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-settextelement}

Sets the text element that displays the text of the currently selected option\.

**Syntax**

```
void SetTextElement(AZ::EntityId textElement)
```

### GetIconElement {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-geticonelement}

Returns the icon element that displays the icon of the currently selected option\.

**Syntax**

```
AZ::EntityId GetIconElement()
```

### SetIconElement {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-seticonelement}

Sets the icon element that displays the icon of the currently selected option\.

**Syntax**

```
void SetIconElement(AZ::EntityId iconElement)
```

### Expand {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-expand}

Expands the dropdown menu\.

**Syntax**

```
void Expand()
```

### Collapse {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-collapse}

Collapses the dropdown menu\.

**Syntax**

```
void Collapse()
```

### GetExpandedActionName {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getexpandedactionname}

Returns the name of the action that is sent when the dropdown is expanded\.

**Syntax**

```
const LyShine::ActionName& GetExpandedActionName()
```

### SetExpandedActionName {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setexpandedactionname}

Sets the name of the action that is sent when the dropdown is expanded\.

**Syntax**

```
void SetExpandedActionName(const LyShine::ActionName& actionName)
```

### GetCollapsedActionName {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getcollapsedactionname}

Returns the name of the action that is sent when the dropdown is collapsed\.

**Syntax**

```
const LyShine::ActionName& GetCollapsedActionName()
```

### SetCollapsedActionName {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setcollapsedactionname}

Sets the name of the action that is sent when the dropdown is collapsed\.

**Syntax**

```
void SetCollapsedActionName(const LyShine::ActionName& actionName)
```

### GetOptionSelectedActionName {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getoptionselectedactionname}

Returns the name of the action that is sent when the dropdown value is changed\.

**Syntax**

```
const LyShine::ActionName& GetOptionSelectedActionName()
```

### SetOptionSelectedActionName {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setoptionselectedactionname}

Sets the name of the action that is sent when the dropdown value is changed\.

**Syntax**

```
void SetOptionSelectedActionName(const LyShine::ActionName& actionName)
```

## UiDropdownNotificationBus {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownnotificationbus}

Services notifications for the `UiDropdownComponent`\. 

### OnDropdownExpanded {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownnotificationbus-ondropdownexpanded}

Notifies that the dropdown was expanded\.

**Syntax**

```
void OnDropdownExpanded()
```

### OnDropdownCollapsed {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownnotificationbus-ondropdowncollapsed}

Notifies that the dropdown was collapsed\.

**Syntax**

```
void OnDropdownCollapsed()
```

### OnDropdownValueChanged {#lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownnotificationbus-ondropdownvaluechanged}

Notifies that an option was selected\.

**Syntax**

```
void OnDropdownValueChanged(AZ::EntityId option)
```