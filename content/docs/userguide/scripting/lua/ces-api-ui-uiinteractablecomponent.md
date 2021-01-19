---
description: ' Use the UIInteractableComponent to control elements that respond to
  user input in &ALYlong;. '
title: UIInteractableComponent
---
# UIInteractableComponent {#lua-scripting-ces-api-ui-uiinteractablecomponent}

Controls elements that respond to user input\.

## UiInteractableBus {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus}

Services messages for the `UiInteractableComponent`\.

### GetIsAutoActivationEnabled {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus-getisautoactivationenabled}

Returns true if automatic activation is enabled; false otherwise\.

**Syntax**

```
bool GetIsAutoActivationEnabled ()
```

### IsHandlingEvents {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus-ishandlingevents}

Returns true if event handling is enabled; false otherwise\.

**Syntax**

```
bool IsHandlingEvents()
```

### SetIsAutoActivationEnabled {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus-setisautoactivationenabled}

Sets whether automatic activation is enabled\.

**Syntax**

```
void SetIsAutoActivationEnabled (bool isEnabled)
```

### SetIsHandlingEvents {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablebus-setishandlingevents}

Sets whether event handling is enabled\.

**Syntax**

```
void SetIsHandlingEvents (bool isHandlingEvents) 
```

## UiInteractableActionsBus {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus}

Services actions for the `UiInteractableComponent`\.

### GetHoverEndActionName {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-gethoverendactionname}

Returns the current hover end action name\.

**Syntax**

```
AZStd::string& GetHoverEndActionName()
```

### GetHoverStartActionName {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-gethoverstartactionname}

Returns the current hover start action name\.

**Syntax**

```
AZStd::string& GetHoverStartActionName()
```

### GetPressedActionName {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-getpressedactionname}

Returns the pressed action name\.

**Syntax**

```
AZStd::string& GetPressedActionName()
```

### GetReleasedActionName {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-getreleasedactionname}

Returns the released action name\.

**Syntax**

```
AZStd::string& GetReleasedActionName()
```

### SetHoverEndActionName {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-sethoverendactionname}

Sets the hover end action name\.

**Syntax**

```
SetHoverEndActionName(const AZStd::string& actionName)
```

### SetHoverStartActionName {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-sethoverstartactionname}

Sets the hover start action name\.

**Syntax**

```
SetHoverStartActionName(const AZStd::string& actionName)
```

### SetPressedActionName {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-setpressedactionname}

Sets the pressed action name\.

**Syntax**

```
SetPressedActionName(const AZStd::string& actionName)
```

### SetReleasedActionName {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractableactionsbus-setreleasedactionname}

Sets the released action name\.

**Syntax**

```
SetReleasedActionName(const AZStd::string& actionName)
```

## UiInteractableStatesBus {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus}

Services states for the `UiInteractableComponent`\.

### GetStateAlpha {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatealpha}

Returns the alpha to be used for the specified target when the interactable element is in the specified state\.

**Syntax**

```
float GetStateAlpha(eUiInteractableState state, AZ::EntityId target)
```

### GetStateColor {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatecolor}

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

### GetStateFontEffectIndex {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatefonteffectindex}

Returns the font effect to be used for the specified target when the interactable element is in the specified state\.

**Syntax**

```
unsigned int GetStateFontEffectIndex(eUiInteractableState state, AZ::EntityId target)
```

### GetStateFontPathname {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatefontpathname}

Returns the font path to be used for the specified target when the interactable element is in the specified state\.

**Syntax**

```
AZStd::string GetStateFontPathname(eUiInteractableState state, AZ::EntityId target)
```

### GetStateSpritePathname {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-getstatespritepathname}

Returns the sprite path to be used for the specified target when the interactable element is in the specified state\.

**Syntax**

```
AZStd::string GetStateSpritePathname(eUiInteractableState state, AZ::EntityId target)
```

### HasStateAlpha {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-hasstatealpha}

Returns true if the interactable element has an alpha action for the specified state and target combination\.

**Syntax**

```
bool HasStateAlpha(eUiInteractableState state, AZ::EntityId target)
```

### HasStateColor {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-hasstatecolor}

Returns true if the interactable element has a color action for the specified state and target combination\.

**Syntax**

```
bool HasStateColor(eUiInteractableState state, AZ::EntityId target)
```

### HasStateFont {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-hasstatefont}

Returns true if the interactable element has a font action for the specified state and target combination\.

**Syntax**

```
bool HasStateFont(eUiInteractableState state, AZ::EntityId target)
```

### HasStateSprite {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-hasstatesprite}

Returns true if the interactable element has a sprite action for the specified state and target combination\.

**Syntax**

```
bool HasStateSprite(eUiInteractableState state, AZ::EntityId target)
```

### SetStateAlpha {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-setstatealpha}

Sets the alpha to be used for the specified target when the interactable element is in the specified state\. If the interactable element already has an alpha action for this state and target combination, then `SetStateAlpha` replaces the alpha action\.

**Syntax**

```
void SetStateAlpha(eUiInteractableState state, AZ::EntityId target, float alpha)
```

### SetStateColor {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-setstatecolor}

Sets the color to be used for the specified target when the interactable element is in the specified state\. If the interactable element already has a color action for the current state and target combination, then `SetStateColor` replaces the color action\.

**Syntax**

```
void SetStateColor(eUiInteractableState state, AZ::EntityId target, const AZ::Color& color)
```

### SetStateFont {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-setstatefont}

Sets the font to be used for the specified target when the interactable element is in the specified state\. If the interactable element already has a font action for the specified state and target combination, then `SetStateFont` replaces the font action\.

**Syntax**

```
void SetStateFont(eUiInteractableState state, AZ::EntityId target, const AZStd::string& fontPathname, unsigned int fontEffectIndex)
```

### SetStateSpritePathname {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablestatesbus-setstatespritepathname}

Sets the sprite path to be used for the specified target when the interactable element is in the specified state\. If the interactable element already has a sprite action for the specified state and target combination, then `SetStateSpritePathname` replaces the sprite action\.

**Syntax**

```
void SetStateSpritePathname(eUiInteractableState state, AZ::EntityId target, const AZStd::string& spritePath) 
```

## UiInteractableNotificationBus {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus}

Services notifications for the `UIInteractableComponent`\.

### OnHoverEnd {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onhoverend}

Called on hover end\.

**Syntax**

```
void OnHoverEnd()
```

### OnHoverStart {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onhoverstart}

Called on hover start\.

**Syntax**

```
void OnHoverStart()
```

### OnPressed {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onpressed}

Called when an element has been pressed\.

**Syntax**

```
void OnPressed()
```

### OnReleased {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onreleased}

Called when an element has been released\.

**Syntax**

```
void OnReleased()
```

### OnReceivedHoverByNavigatingFromDescendant {#lua-scripting-ces-api-ui-uiinteractablecomponent-uiinteractablenotificationbus-onreceivedhoverbynavigatingfromdescendant}

Called when the element receives the hover by being navigated to from a descendant\.

**Syntax**

```
void OnReceivedHoverByNavigatingFromDescendant(AZ::EntityId descendantEntityId)
```

## UiNavigationBus {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus}

Services navigation for the `UIInteractableComponent`\.

### GetNavigationMode {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getnavigationmode}

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

### GetOnDownEntity {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getondownentity}

Returns the ID of the entity that receives focus when down is pressed\.

**Syntax**

```
AZ::EntityId GetOnDownEntity()
```

### GetOnLeftEntity {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getonleftentity}

Returns the ID of the entity to receive focus when left is pressed\.

**Syntax**

```
AZ::EntityId GetOnLeftEntity()
```

### GetOnRightEntity {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getonrightentity}

Returns the ID of the entity to receive focus when right is pressed\.

**Syntax**

```
AZ::EntityId GetOnRightEntity()
```

### GetOnUpEntity {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-getonupentity}

Returns the ID of the entity that receives focus when up is pressed\.

**Syntax**

```
AZ::EntityId GetOnUpEntity()
```

### SetNavigationMode {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setnavigationmode}

Sets the navigation mode\.

**Syntax**

```
void SetNavigationMode(eUiNavigationMode navigationMode)
```

### SetOnDownEntity {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setondownentity}

Sets the entity to receive focus when down is pressed\.

**Syntax**

```
void SetOnDownEntity(AZ::EntityId entityId)
```

### SetOnLeftEntity {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setonleftentity}

Sets the entity to receive focus when left is pressed\.

**Syntax**

```
void SetOnLeftEntity(AZ::EntityId entityId)
```

### SetOnRightEntity {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setonrightentity}

Sets the entity to receive focus when right is pressed\.

**Syntax**

```
void SetOnRightEntity(AZ::EntityId entityId)
```

### SetOnUpEntity {#lua-scripting-ces-api-ui-uiinteractablecomponent-uinavigationbus-setonupentity}

Sets the entity to receive focus when up is pressed\.

**Syntax**

```
void SetOnUpEntity(AZ::EntityId entityId)
```