# UiDropdownComponent<a name="lua-scripting-ces-api-ui-uidropdowncomponent"></a>

You can use `UiDropdownComponent` to implement a UI dropdown menu in Amazon Lumberyard\.

## UiDropdownBus<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus"></a>

Services messages for the `UiDropdownComponent`\.

### GetValue<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getvalue"></a>

Returns the value of the dropdown\. The value is the last option that was selected\.

**Syntax**

```
AZ::EntityId GetValue()
```

### SetValue<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setvalue"></a>

Sets the value of the dropdown manually\.

**Syntax**

```
void SetValue(AZ::EntityId value)
```

### GetContent<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getcontent"></a>

Returns the content element that this dropdown expands\.

**Syntax**

```
AZ::EntityId GetContent()
```

### SetContent<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setcontent"></a>

Sets the content element that this dropdown expands\.

**Syntax**

```
void SetContent(AZ::EntityId content)
```

### GetExpandOnHover<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getexpandonhover"></a>

Returns whether this dropdown should expand automatically on hover\.

**Syntax**

```
bool GetExpandOnHover()
```

### SetExpandOnHover<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setexpandonhover"></a>

Sets whether this dropdown expands automatically on hover\.

**Syntax**

```
void SetExpandOnHover(bool expandOnHover)
```

### GetWaitTime<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getwaittime"></a>

Returns how long to wait before expanding upon hover and collapsing upon exit\.

**Syntax**

```
float GetWaitTime()
```

### SetWaitTime<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setwaittime"></a>

Sets how long to wait before expanding upon hover and collapsing upon exit\.

**Syntax**

```
void SetWaitTime(float waitTime)
```

### GetCollapseOnOutsideClick<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getcollapseonoutsideclick"></a>

Returns whether this dropdown collapses when the user clicks outside\. 

**Syntax**

```
bool GetCollapseOnOutsideClick()
```

### SetCollapseOnOutsideClick<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setcollapseonoutsideclick"></a>

Sets whether this dropdown collapses when the user clicks outside\.

**Syntax**

```
void SetCollapseOnOutsideClick(bool collapseOnOutsideClick)
```

### GetExpandedParentId<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getexpandedparentid"></a>

Returns the element that the dropdown content parents to when expanded \(the root element by default\)\.

**Syntax**

```
AZ::EntityId GetExpandedParentId() 
```

### SetExpandedParentId<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setexpandedparentid"></a>

Sets the element that the dropdown content parents to when expanded\.

**Syntax**

```
void SetExpandedParentId(AZ::EntityId expandedParentId)
```

### GetTextElement<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-gettextelement"></a>

Returns the text element that displays the text of the currently selected option\.

**Syntax**

```
bool GetCollapseOnOutsideClick()
```

### SetTextElement<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-settextelement"></a>

Sets the text element that displays the text of the currently selected option\.

**Syntax**

```
void SetTextElement(AZ::EntityId textElement)
```

### GetIconElement<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-geticonelement"></a>

Returns the icon element that displays the icon of the currently selected option\.

**Syntax**

```
AZ::EntityId GetIconElement()
```

### SetIconElement<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-seticonelement"></a>

Sets the icon element that displays the icon of the currently selected option\.

**Syntax**

```
void SetIconElement(AZ::EntityId iconElement)
```

### Expand<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-expand"></a>

Expands the dropdown menu\.

**Syntax**

```
void Expand()
```

### Collapse<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-collapse"></a>

Collapses the dropdown menu\.

**Syntax**

```
void Collapse()
```

### GetExpandedActionName<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getexpandedactionname"></a>

Returns the name of the action that is sent when the dropdown is expanded\.

**Syntax**

```
const LyShine::ActionName& GetExpandedActionName()
```

### SetExpandedActionName<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setexpandedactionname"></a>

Sets the name of the action that is sent when the dropdown is expanded\.

**Syntax**

```
void SetExpandedActionName(const LyShine::ActionName& actionName)
```

### GetCollapsedActionName<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getcollapsedactionname"></a>

Returns the name of the action that is sent when the dropdown is collapsed\.

**Syntax**

```
const LyShine::ActionName& GetCollapsedActionName()
```

### SetCollapsedActionName<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setcollapsedactionname"></a>

Sets the name of the action that is sent when the dropdown is collapsed\.

**Syntax**

```
void SetCollapsedActionName(const LyShine::ActionName& actionName)
```

### GetOptionSelectedActionName<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-getoptionselectedactionname"></a>

Returns the name of the action that is sent when the dropdown value is changed\.

**Syntax**

```
const LyShine::ActionName& GetOptionSelectedActionName()
```

### SetOptionSelectedActionName<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownbus-setoptionselectedactionname"></a>

Sets the name of the action that is sent when the dropdown value is changed\.

**Syntax**

```
void SetOptionSelectedActionName(const LyShine::ActionName& actionName)
```

## UiDropdownNotificationBus<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownnotificationbus"></a>

Services notifications for the `UiDropdownComponent`\. 

### OnDropdownExpanded<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownnotificationbus-ondropdownexpanded"></a>

Notifies that the dropdown was expanded\.

**Syntax**

```
void OnDropdownExpanded()
```

### OnDropdownCollapsed<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownnotificationbus-ondropdowncollapsed"></a>

Notifies that the dropdown was collapsed\.

**Syntax**

```
void OnDropdownCollapsed()
```

### OnDropdownValueChanged<a name="lua-scripting-ces-api-ui-uidropdowncomponent-uidropdownnotificationbus-ondropdownvaluechanged"></a>

Notifies that an option was selected\.

**Syntax**

```
void OnDropdownValueChanged(AZ::EntityId option)
```