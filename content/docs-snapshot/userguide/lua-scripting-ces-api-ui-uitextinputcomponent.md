# UITextInputComponent<a name="lua-scripting-ces-api-ui-uitextinputcomponent"></a>

You can use a text input component to provide player text input capability\.

## UiTextInputBus<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus"></a>

Services messages for the `UiTextInputComponent`\.

### GetChangeAction<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getchangeaction"></a>

Returns the action triggered when the text is changed\.

**Syntax**

```
const AZStd::string& GetChangeAction()
```

### GetCursorBlinkInterval<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getcursorblinkinterval"></a>

Returns the cursor blink interval of the text input\.

**Syntax**

```
float GetCursorBlinkInterval()
```

### GetEndEditAction<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getendeditaction"></a>

Returns the action triggered when the editing of text is finished\.

**Syntax**

```
const AZStd::string& GetEndEditAction()
```

### GetEnterAction<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getenteraction"></a>

Returns the action triggered when enter is pressed\.

**Syntax**

```
const AZStd::string& GetEnterAction()
```

### GetIsPasswordField<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getispasswordfield"></a>

Returns whether the text input is configured as a password field\.

**Syntax**

```
bool GetIsPasswordField()
```

### GetMaxStringLength<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getmaxstringlength"></a>

Returns the maximum number of characters that can be entered\.

**Syntax**

```
int GetMaxStringLength()
```

### GetPlaceHolderTextEntity<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getplaceholdertextentity"></a>

Returns the placeholder text element\.

**Syntax**

```
AZ::EntityId GetPlaceHolderTextEntity()
```

### GetReplacementCharacter<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-getreplacementcharacter"></a>

Returns the replacement character used to hide password text\.

**Syntax**

```
char GetReplacementCharacter()
```

### GetText<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-gettext"></a>

Returns the text string being displayed or edited by the element\.

**Syntax**

```
AZStd::string GetText()
```

### GetTextCursorColor<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-gettextcursorcolor"></a>

Returns the color to be used for the text cursor\.

**Syntax**

```
AZ::Color GetTextCursorColor()
```

### GetTextEntity<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-gettextentity"></a>

Returns the text element\.

**Syntax**

```
AZ::EntityId GetTextEntity()
```

### GetTextSelectionColor<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-gettextselectioncolor"></a>

Returns the color to be used for the text background when it is selected\.

**Syntax**

```
AZ::Color GetTextSelectionColor()
```

### SetChangeAction<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setchangeaction"></a>

Sets the action triggered when the text is changed\.

**Syntax**

```
void SetChangeAction(const AZStd::string& actionName)
```

### SetCursorBlinkInterval<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setcursorblinkinterval"></a>

Sets the cursor blink interval of the text input\.

**Syntax**

```
void SetCursorBlinkInterval(float interval)
```

### SetEndEditAction<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setendeditaction"></a>

Sets the action triggered when the editing of text is finished\.

**Syntax**

```
void SetEndEditAction(const AZStd::string& actionName)
```

### SetEnterAction<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setenteraction"></a>

Sets the action triggered when enter is pressed\.

**Syntax**

```
void SetEnterAction(const AZStd::string& actionName)
```

### SetIsPasswordField<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setispasswordfield"></a>

Sets whether the text input is configured as a password field\.

**Syntax**

```
void SetIsPasswordField(bool passwordField)
```

### SetMaxStringLength<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setmaxstringlength"></a>

Sets the maximum number of characters that can be entered\.

**Syntax**

```
void SetMaxStringLength(int maxCharacters)
```

### SetPlaceHolderTextEntity<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setplaceholdertextentity"></a>

Sets the placeholder text element\.

**Syntax**

```
void SetPlaceHolderTextEntity(AZ::EntityId textEntity) 
```

### SetReplacementCharacter<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-setreplacementcharacter"></a>

Sets the replacement character used to hide password text\.

**Syntax**

```
void SetReplacementCharacter(char replacementChar) 
```

### SetText<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-settext"></a>

Sets the text string being displayed or edited by the element\.

**Syntax**

```
void SetText(const AZStd::string& text)
```

### SetTextCursorColor<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-settextcursorcolor"></a>

Sets the color to be used for the text cursor\.

**Syntax**

```
void SetTextCursorColor(const AZ::Color& color) 
```

### SetTextEntity<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-settextentity"></a>

Sets the text element\.

**Syntax**

```
void SetTextEntity(AZ::EntityId textEntity)
```

### SetTextSelectionColor<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputbus-settextselectioncolor"></a>

Sets the color to be used for the text background when it is selected\.

**Syntax**

```
void SetTextSelectionColor(const AZ::Color& color) 
```

## UiTextInputNotificationBus<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputnotificationbus"></a>

Services notifications for the `UiTextInputComponent`\.

### OnTextInputChange<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputnotificationbus-ontextinputchange"></a>

Called when a character is added, removed, or changed\.

**Syntax**

```
void OnTextInputChange(const AZStd::string& textString)
```

### OnTextInputEndEdit<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputnotificationbus-ontextinputendedit"></a>

Called when edit of text is completed\.

**Syntax**

```
void OnTextInputEndEdit(const AZStd::string& textString)
```

### OnTextInputEnter<a name="lua-scripting-ces-api-ui-uitextinputcomponent-uitextinputnotificationbus-ontextinputenter"></a>

Called when **Enter** is pressed on the keyboard\.

**Syntax**

```
void OnTextInputEnter(const AZStd::string& textString)
```