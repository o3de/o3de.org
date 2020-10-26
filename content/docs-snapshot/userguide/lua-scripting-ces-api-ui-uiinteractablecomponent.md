# UIInteractableComponent<a name="lua-scripting-ces-api-ui-uiinteractablecomponent"></a>

Controls elements that respond to user input\.

## UiInteractableBus<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus"></a>

Services messages for the `UiInteractableComponent`\.

### GetIsAutoActivationEnabled<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus-getisautoactivationenabled"></a>

Returns true if automatic activation is enabled; false otherwise\.

**Syntax**

```
bool GetIsAutoActivationEnabled ()
```

### IsHandlingEvents<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus-ishandlingevents"></a>

Returns true if event handling is enabled; false otherwise\.

**Syntax**

```
bool IsHandlingEvents()
```

### SetIsAutoActivationEnabled<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus-setisautoactivationenabled"></a>

Sets whether automatic activation is enabled\.

**Syntax**

```
void SetIsAutoActivationEnabled (bool isEnabled)
```

### SetIsHandlingEvents<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus-setishandlingevents"></a>

Sets whether event handling is enabled\.

**Syntax**

```
void SetIsHandlingEvents (bool isHandlingEvents) 
```

## UiInteractableActionsBus<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus"></a>

Services actions for the `UiInteractableComponent`\.

### GetHoverEndActionName<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-gethoverendactionname"></a>

Returns the current hover end action name\.

**Syntax**

```
AZStd::string& GetHoverEndActionName()
```

### GetHoverStartActionName<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-gethoverstartactionname"></a>

Returns the current hover start action name\.

**Syntax**

```
AZStd::string& GetHoverStartActionName()
```

### GetPressedActionName<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-getpressedactionname"></a>

Returns the pressed action name\.

**Syntax**

```
AZStd::string& GetPressedActionName()
```

### GetReleasedActionName<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-getreleasedactionname"></a>

Returns the released action name\.

**Syntax**

```
AZStd::string& GetReleasedActionName()
```

### SetHoverEndActionName<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-sethoverendactionname"></a>

Sets the hover end action name\.

**Syntax**

```
SetHoverEndActionName(const AZStd::string& actionName)
```

### SetHoverStartActionName<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-sethoverstartactionname"></a>

Sets the hover start action name\.

**Syntax**

```
SetHoverStartActionName(const AZStd::string& actionName)
```

### SetPressedActionName<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-setpressedactionname"></a>

Sets the pressed action name\.

**Syntax**

```
SetPressedActionName(const AZStd::string& actionName)
```

### SetReleasedActionName<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-setreleasedactionname"></a>

Sets the released action name\.

**Syntax**

```
SetReleasedActionName(const AZStd::string& actionName)
```

## UiInteractableStatesBus<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus"></a>

Services states for the `UiInteractableComponent`\.

### GetStateAlpha<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatealpha"></a>

Returns the alpha to be used for the specified target when the interactable element is in the specified state\.

**Syntax**

```
float GetStateAlpha(eUiInteractableState state, AZ::EntityId target)
```

### GetStateColor<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatecolor"></a>

Returns the color to be used for the specified target when the interactable element is in the specified state\.

**Syntax**

```
AZ::Color GetStateColor(eUiInteractableState state, AZ::EntityId target)
```

Possible values for `eUiInteractableState` are as follows\.

```
enum eUiInteractableState
    {
        eUiInteractableState_Normal,
        eUiInteractableState_Hover,
        eUiInteractableState_Pressed,
        eUiInteractableState_Disabled
    };
```

### GetStateFontEffectIndex<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatefonteffectindex"></a>

Returns the font effect to be used for the specified target when the interactable element is in the specified state\.

**Syntax**

```
unsigned int GetStateFontEffectIndex(eUiInteractableState state, AZ::EntityId target)
```

### GetStateFontPathname<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatefontpathname"></a>

Returns the font path to be used for the specified target when the interactable element is in the specified state\.

**Syntax**

```
AZStd::string GetStateFontPathname(eUiInteractableState state, AZ::EntityId target)
```

### GetStateSpritePathname<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatespritepathname"></a>

Returns the sprite path to be used for the specified target when the interactable element is in the specified state\.

**Syntax**

```
AZStd::string GetStateSpritePathname(eUiInteractableState state, AZ::EntityId target)
```

### HasStateAlpha<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-hasstatealpha"></a>

Returns true if the interactable element has an alpha action for the specified state and target combination\.

**Syntax**

```
bool HasStateAlpha(eUiInteractableState state, AZ::EntityId target)
```

### HasStateColor<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-hasstatecolor"></a>

Returns true if the interactable element has a color action for the specified state and target combination\.

**Syntax**

```
bool HasStateColor(eUiInteractableState state, AZ::EntityId target)
```

### HasStateFont<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-hasstatefont"></a>

Returns true if the interactable element has a font action for the specified state and target combination\.

**Syntax**

```
bool HasStateFont(eUiInteractableState state, AZ::EntityId target)
```

### HasStateSprite<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-hasstatesprite"></a>

Returns true if the interactable element has a sprite action for the specified state and target combination\.

**Syntax**

```
bool HasStateSprite(eUiInteractableState state, AZ::EntityId target)
```

### SetStateAlpha<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-setstatealpha"></a>

Sets the alpha to be used for the specified target when the interactable element is in the specified state\. If the interactable element already has an alpha action for this state and target combination, then `SetStateAlpha` replaces the alpha action\.

**Syntax**

```
void SetStateAlpha(eUiInteractableState state, AZ::EntityId target, float alpha)
```

### SetStateColor<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-setstatecolor"></a>

Sets the color to be used for the specified target when the interactable element is in the specified state\. If the interactable element already has a color action for the current state and target combination, then `SetStateColor` replaces the color action\.

**Syntax**

```
void SetStateColor(eUiInteractableState state, AZ::EntityId target, const AZ::Color& color)
```

### SetStateFont<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-setstatefont"></a>

Sets the font to be used for the specified target when the interactable element is in the specified state\. If the interactable element already has a font action for the specified state and target combination, then `SetStateFont` replaces the font action\.

**Syntax**

```
void SetStateFont(eUiInteractableState state, AZ::EntityId target, const AZStd::string& fontPathname, unsigned int fontEffectIndex)
```

### SetStateSpritePathname<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-setstatespritepathname"></a>

Sets the sprite path to be used for the specified target when the interactable element is in the specified state\. If the interactable element already has a sprite action for the specified state and target combination, then `SetStateSpritePathname` replaces the sprite action\.

**Syntax**

```
void SetStateSpritePathname(eUiInteractableState state, AZ::EntityId target, const AZStd::string& spritePath) 
```

## UiInteractableNotificationBus<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus"></a>

Services notifications for the `UIInteractableComponent`\.

### OnHoverEnd<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onhoverend"></a>

Called on hover end\.

**Syntax**

```
void OnHoverEnd()
```

### OnHoverStart<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onhoverstart"></a>

Called on hover start\.

**Syntax**

```
void OnHoverStart()
```

### OnPressed<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onpressed"></a>

Called when an element has been pressed\.

**Syntax**

```
void OnPressed()
```

### OnReleased<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onreleased"></a>

Called when an element has been released\.

**Syntax**

```
void OnReleased()
```

### OnReceivedHoverByNavigatingFromDescendant<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onreceivedhoverbynavigatingfromdescendant"></a>

Called when the element receives the hover by being navigated to from a descendant\.

**Syntax**

```
void OnReceivedHoverByNavigatingFromDescendant(AZ::EntityId descendantEntityId)
```

## UiNavigationBus<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus"></a>

Services navigation for the `UIInteractableComponent`\.

### GetNavigationMode<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getnavigationmode"></a>

Returns the navigation mode\.

**Syntax**

```
eUiNavigationMode GetNavigationMode()
```

Possible values for `eUiNavigationMode` are as follows\.

```
enum eUiNavigationMode
    {
        eUiNavigationMode_Automatic,
        eUiNavigationMode_Custom,
        eUiNavigationMode_None
    };
```

### GetOnDownEntity<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getondownentity"></a>

Returns the ID of the entity that receives focus when down is pressed\.

**Syntax**

```
AZ::EntityId GetOnDownEntity()
```

### GetOnLeftEntity<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getonleftentity"></a>

Returns the ID of the entity to receive focus when left is pressed\.

**Syntax**

```
AZ::EntityId GetOnLeftEntity()
```

### GetOnRightEntity<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getonrightentity"></a>

Returns the ID of the entity to receive focus when right is pressed\.

**Syntax**

```
AZ::EntityId GetOnRightEntity()
```

### GetOnUpEntity<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getonupentity"></a>

Returns the ID of the entity that receives focus when up is pressed\.

**Syntax**

```
AZ::EntityId GetOnUpEntity()
```

### SetNavigationMode<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setnavigationmode"></a>

Sets the navigation mode\.

**Syntax**

```
void SetNavigationMode(eUiNavigationMode navigationMode)
```

### SetOnDownEntity<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setondownentity"></a>

Sets the entity to receive focus when down is pressed\.

**Syntax**

```
void SetOnDownEntity(AZ::EntityId entityId)
```

### SetOnLeftEntity<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setonleftentity"></a>

Sets the entity to receive focus when left is pressed\.

**Syntax**

```
void SetOnLeftEntity(AZ::EntityId entityId)
```

### SetOnRightEntity<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setonrightentity"></a>

Sets the entity to receive focus when right is pressed\.

**Syntax**

```
void SetOnRightEntity(AZ::EntityId entityId)
```

### SetOnUpEntity<a name="lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setonupentity"></a>

Sets the entity to receive focus when up is pressed\.

**Syntax**

```
void SetOnUpEntity(AZ::EntityId entityId)
```