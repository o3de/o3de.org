# UIFaderComponent<a name="lua-scripting-ces-api-ui-uifadercomponent"></a>

You can use a fader component to simultaneously adjust the transparency of an element and its children\.

## UiFaderBus<a name="lua-scripting-ces-api-ui-uifadercomponent-uifaderbus"></a>

Services messages for the `UiFaderComponent`\.

### Fade<a name="lua-scripting-ces-api-ui-uifadercomponent-uifaderbus-fade"></a>

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

### GetFadeValue<a name="lua-scripting-ces-api-ui-uifadercomponent-uifaderbus-getfadevalue"></a>

Returns the fade value\. The fade value is a float between zero and one\. One means no fade; zero means complete fade to invisible\.

**Syntax**

```
float GetFadeValue()
```

### IsFading<a name="lua-scripting-ces-api-ui-uifadercomponent-uifaderbus-isfading"></a>

Returns whether a fade animation is taking place\.

**Syntax**

```
bool IsFading()
```

### SetFadeValue<a name="lua-scripting-ces-api-ui-uifadercomponent-uifaderbus-setfadevalue"></a>

Sets the fade value\.

**Syntax**

```
void SetFadeValue(float fade)
```

## UiFaderNotificationBus<a name="lua-scripting-ces-api-ui-uifadercomponent-uifadernotificationbus"></a>

Services notifications for the `UiFaderComponent`\.

### OnDestroyed<a name="lua-scripting-ces-api-ui-uifadercomponent-uifadernotificationbus-ondestroyed"></a>

The fader component has been destroyed\.

**Syntax**

```
void OnFaderDestroyed()
```

### OnFadeComplete<a name="lua-scripting-ces-api-ui-uifadercomponent-uifadernotificationbus-onfadecomplete"></a>

The fade animation is done\.

**Syntax**

```
void OnFadeComplete()
```

### OnFadeInterrupted<a name="lua-scripting-ces-api-ui-uifadercomponent-uifadernotificationbus-onfadeinterrupted"></a>

The fade animation has been interrupted\.

**Syntax**

```
void OnFadeInterrupted()
```