# UiCursorBus<a name="lua-scripting-ces-api-ui-uicursorbus"></a>

The `UiCursorBus` contains functions for manipulating the cursor in the game UI\.

## IncrementVisibleCounter<a name="lua-scripting-ces-api-ui-incrementvisiblecounter"></a>

Increments the UI cursor visible counter\. Should be paired with a call to `DecrementVisibleCounter`\.

**Syntax**

```
void IncrementVisibleCounter()
```

## DecrementVisibleCounter<a name="lua-scripting-ces-api-ui-cecrementvisiblecounter"></a>

Decrements the UI cursor visible counter\. Should be paired with a call to `IncrementVisibleCounter`\.

**Syntax**

```
void DecrementVisibleCounter()
```

## IsUiCursorVisible<a name="lua-scripting-ces-api-ui-isuicursorvisible"></a>

Queries whether the UI cursor is currently visible\.

**Syntax**

```
bool IsUiCursorVisible()
```

## SetUiCursor<a name="lua-scripting-ces-api-ui-setuicursor"></a>

Sets the UI cursor image\.

**Syntax**

```
void SetUiCursor(const char* cursorImagePath) 
```

## GetUiCursorPosition<a name="lua-scripting-ces-api-ui-getuicursorposition"></a>

Returns the UI cursor position \(in pixels\) relative to the top left corner of the UI overlay viewport\.

**Syntax**

```
AZ::Vector2 GetUiCursorPosition()
```