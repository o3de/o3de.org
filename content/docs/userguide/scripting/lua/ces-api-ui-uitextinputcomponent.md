---
description: ' Use the UITextInputComponent to provide player text input capability
  in &ALYlong;. '
title: UITextInputComponent
---
# UITextInputComponent {#lua-scripting-ces-api-ui-uitextinputcomponent}

You can use a text input component to provide player text input capability\.

## UiTextInputBus {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus}

Services messages for the `UiTextInputComponent`\.

### GetChangeAction {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getchangeaction}

Returns the action triggered when the text is changed\.

**Syntax**

```
const AZStd::string& GetChangeAction()
```

### GetCursorBlinkInterval {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getcursorblinkinterval}

Returns the cursor blink interval of the text input\.

**Syntax**

```
float GetCursorBlinkInterval()
```

### GetEndEditAction {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getendeditaction}

Returns the action triggered when the editing of text is finished\.

**Syntax**

```
const AZStd::string& GetEndEditAction()
```

### GetEnterAction {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getenteraction}

Returns the action triggered when enter is pressed\.

**Syntax**

```
const AZStd::string& GetEnterAction()
```

### GetIsPasswordField {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getispasswordfield}

Returns whether the text input is configured as a password field\.

**Syntax**

```
bool GetIsPasswordField()
```

### GetMaxStringLength {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getmaxstringlength}

Returns the maximum number of characters that can be entered\.

**Syntax**

```
int GetMaxStringLength()
```

### GetPlaceHolderTextEntity {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getplaceholdertextentity}

Returns the placeholder text element\.

**Syntax**

```
AZ::EntityId GetPlaceHolderTextEntity()
```

### GetReplacementCharacter {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getreplacementcharacter}

Returns the replacement character used to hide password text\.

**Syntax**

```
char GetReplacementCharacter()
```

### GetText {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-gettext}

Returns the text string being displayed or edited by the element\.

**Syntax**

```
AZStd::string GetText()
```

### GetTextCursorColor {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-gettextcursorcolor}

Returns the color to be used for the text cursor\.

**Syntax**

```
AZ::Color GetTextCursorColor()
```

### GetTextEntity {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-gettextentity}

Returns the text element\.

**Syntax**

```
AZ::EntityId GetTextEntity()
```

### GetTextSelectionColor {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-gettextselectioncolor}

Returns the color to be used for the text background when it is selected\.

**Syntax**

```
AZ::Color GetTextSelectionColor()
```

### SetChangeAction {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setchangeaction}

Sets the action triggered when the text is changed\.

**Syntax**

```
void SetChangeAction(const AZStd::string& actionName)
```

### SetCursorBlinkInterval {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setcursorblinkinterval}

Sets the cursor blink interval of the text input\.

**Syntax**

```
void SetCursorBlinkInterval(float interval)
```

### SetEndEditAction {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setendeditaction}

Sets the action triggered when the editing of text is finished\.

**Syntax**

```
void SetEndEditAction(const AZStd::string& actionName)
```

### SetEnterAction {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setenteraction}

Sets the action triggered when enter is pressed\.

**Syntax**

```
void SetEnterAction(const AZStd::string& actionName)
```

### SetIsPasswordField {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setispasswordfield}

Sets whether the text input is configured as a password field\.

**Syntax**

```
void SetIsPasswordField(bool passwordField)
```

### SetMaxStringLength {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setmaxstringlength}

Sets the maximum number of characters that can be entered\.

**Syntax**

```
void SetMaxStringLength(int maxCharacters)
```

### SetPlaceHolderTextEntity {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setplaceholdertextentity}

Sets the placeholder text element\.

**Syntax**

```
void SetPlaceHolderTextEntity(AZ::EntityId textEntity) 
```

### SetReplacementCharacter {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setreplacementcharacter}

Sets the replacement character used to hide password text\.

**Syntax**

```
void SetReplacementCharacter(char replacementChar) 
```

### SetText {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-settext}

Sets the text string being displayed or edited by the element\.

**Syntax**

```
void SetText(const AZStd::string& text)
```

### SetTextCursorColor {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-settextcursorcolor}

Sets the color to be used for the text cursor\.

**Syntax**

```
void SetTextCursorColor(const AZ::Color& color) 
```

### SetTextEntity {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-settextentity}

Sets the text element\.

**Syntax**

```
void SetTextEntity(AZ::EntityId textEntity)
```

### SetTextSelectionColor {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-settextselectioncolor}

Sets the color to be used for the text background when it is selected\.

**Syntax**

```
void SetTextSelectionColor(const AZ::Color& color) 
```

## UiTextInputNotificationBus {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputnotificationbus}

Services notifications for the `UiTextInputComponent`\.

### OnTextInputChange {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputnotificationbus-ontextinputchange}

Called when a character is added, removed, or changed\.

**Syntax**

```
void OnTextInputChange(const AZStd::string& textString)
```

### OnTextInputEndEdit {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputnotificationbus-ontextinputendedit}

Called when edit of text is completed\.

**Syntax**

```
void OnTextInputEndEdit(const AZStd::string& textString)
```

### OnTextInputEnter {#lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputnotificationbus-ontextinputenter}

Called when **Enter** is pressed on the keyboard\.

**Syntax**

```
void OnTextInputEnter(const AZStd::string& textString)
```