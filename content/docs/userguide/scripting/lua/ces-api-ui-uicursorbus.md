---
description: ' Use UiCursorBus to manipulate the cursor in a game in &ALYlong;. '
title: UiCursorBus
---
# UiCursorBus {#lua-scripting-ces-api-ui-uicursorbus}

The `UiCursorBus` contains functions for manipulating the cursor in the game UI\.

## IncrementVisibleCounter {#lua-scripting-ces-api-ui-incrementvisiblecounter}

Increments the UI cursor visible counter\. Should be paired with a call to `DecrementVisibleCounter`\.

**Syntax**

```
void IncrementVisibleCounter()
```

## DecrementVisibleCounter {#lua-scripting-ces-api-ui-cecrementvisiblecounter}

Decrements the UI cursor visible counter\. Should be paired with a call to `IncrementVisibleCounter`\.

**Syntax**

```
void DecrementVisibleCounter()
```

## IsUiCursorVisible {#lua-scripting-ces-api-ui-isuicursorvisible}

Queries whether the UI cursor is currently visible\.

**Syntax**

```
bool IsUiCursorVisible()
```

## SetUiCursor {#lua-scripting-ces-api-ui-setuicursor}

Sets the UI cursor image\.

**Syntax**

```
void SetUiCursor(const char* cursorImagePath) 
```

## GetUiCursorPosition {#lua-scripting-ces-api-ui-getuicursorposition}

Returns the UI cursor position \(in pixels\) relative to the top left corner of the UI overlay viewport\.

**Syntax**

```
AZ::Vector2 GetUiCursorPosition()
```