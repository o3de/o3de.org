---
description: ' Use the UIFaderComponent fader component to simultaneously adjust the
  transparency of an element and its children in Amazon Lumberyard. '
title: UIFaderComponent
---
# UIFaderComponent {#lua-scripting-ces-api-ui-uifadercomponent}

You can use a fader component to simultaneously adjust the transparency of an element and its children\.

## UiFaderBus {#lua-scripting-ces-api-ui-uifadercomponent-uifaderbus}

Services messages for the `UiFaderComponent`\.

### Fade {#lua-scripting-ces-api-ui-uifadercomponent-uifaderbus-fade}

Triggers a fade animation\.

**Syntax**

```
void Fade(float targetValue, float speed)
```


****

| Parameter | Description |
| --- | --- |
| targetValue | The value at which to end the fade \[0,1\]\. |
| speed | The speed of the fade animation in full fade amount per second; 0 means instant\. |

### GetFadeValue {#lua-scripting-ces-api-ui-uifadercomponent-uifaderbus-getfadevalue}

Returns the fade value\. The fade value is a float between zero and one\. One means no fade; zero means complete fade to invisible\.

**Syntax**

```
float GetFadeValue()
```

### IsFading {#lua-scripting-ces-api-ui-uifadercomponent-uifaderbus-isfading}

Returns whether a fade animation is taking place\.

**Syntax**

```
bool IsFading()
```

### SetFadeValue {#lua-scripting-ces-api-ui-uifadercomponent-uifaderbus-setfadevalue}

Sets the fade value\.

**Syntax**

```
void SetFadeValue(float fade)
```

## UiFaderNotificationBus {#lua-scripting-ces-api-ui-uifadercomponent-uifadernotificationbus}

Services notifications for the `UiFaderComponent`\.

### OnDestroyed {#lua-scripting-ces-api-ui-uifadercomponent-uifadernotificationbus-ondestroyed}

The fader component has been destroyed\.

**Syntax**

```
void OnFaderDestroyed()
```

### OnFadeComplete {#lua-scripting-ces-api-ui-uifadercomponent-uifadernotificationbus-onfadecomplete}

The fade animation is done\.

**Syntax**

```
void OnFadeComplete()
```

### OnFadeInterrupted {#lua-scripting-ces-api-ui-uifadercomponent-uifadernotificationbus-onfadeinterrupted}

The fade animation has been interrupted\.

**Syntax**

```
void OnFadeInterrupted()
```