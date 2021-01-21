---
description: ' Use the UICanvasComponent in &ALYlong; to control UI canvases and animation. '
title: UICanvasComponent
---
# UICanvasComponent {#lua-scripting-ces-api-ui-uicanvascomponent}

Contains buses and notification buses for UI canvas and animation\.

## UiCanvasBus {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus}

Services messages for the `UiCanvasComponent`\.

### FindElementByName {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-findelementbyname}

Returns the entity ID of the first UI element in this canvas that has the specified name\.

**Syntax**

```
AZ::EntityId FindElementByName(const AZStd::string& name)
```

### ForceEnterInputEventOnInteractable {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-forceenterinputeventoninteractable}

Forces a specified interactive element to receive an Enter press/release navigation event\. This is useful for automated testing using script, such as simulating a button click\.

**Syntax**

```
void ForceEnterInputEventOnInteractable(AZ::EntityId entityId)
```

### ForceHoverInteractable {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-forcehoverinteractable}

Forces a specified interactive element to receive the hover\.

**Syntax**

```
void ForceHoverInteractable(AZ::EntityId entityId)
```

### GetChildElement {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getchildelement}

Returns the entity ID of the child element that has the specified index\.

**Syntax**

```
AZ::EntityId GetChildElement(int index)
```

### GetChildElements {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getchildelements}

Returns a list of entity IDs of the child elements of the canvas\.

**Syntax**

```
AZStd::vector<AZ::EntityId> GetChildElements()
```

### GetDrawOrder {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getdraworder}

Returns the draw order on the canvas\.

**Syntax**

```
int GetDrawOrder()
```

### GetEnabled {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getenabled}

Returns the enabled flag of the canvas\. True if the canvas is enabled; false otherwise\. Enabled canvases are updated and rendered for each frame\.

**Syntax**

```
bool GetEnabled()
```

### GetHoverInteractable {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-gethoverinteractable}

Returns the entity ID of the interactive element that has the hover\.

**Syntax**

```
AZ::EntityId GetHoverInteractable()
```

### GetIsNavigationSupported {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getisnavigationsupported}

Returns true if the canvas accepts navigation input; false otherwise\.

**Syntax**

```
bool GetIsNavigationSupported()
```

### GetIsPixelAligned {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getispixelaligned}

Returns true if pixel alignment is enabled for this canvas; false otherwise\. If pixel alignment is enabled, then all corners of all elements are rounded to the nearest pixel when they are rendered\.

**Syntax**

```
bool GetIsPixelAligned()
```

### GetIsRenderToTexture {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getisrendertotexture}

Returns true if the canvas is rendered to a texture instead of the full screen; false otherwise\.

**Syntax**

```
bool GetIsRenderToTexture()
```

### GetKeepLoadedOnLevelUnload {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getkeeploadedonlevelunload}

Returns true if the canvas stays loaded when the level is unloaded; `false` otherwise\.

**Syntax**

```
bool GetKeepLoadedOnLevelUnload()
```

### GetNumChildElements {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getnumchildelements}

Returns the number of child elements that the canvas has\.

**Syntax**

```
int GetNumChildElements()
```

### GetRenderTargetName {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getrendertargetname}

Returns the name of the texture that is created when this canvas is rendered to a texture\.

**Syntax**

```
AZStd::string GetRenderTargetName()
```

### GetTooltipDisplayElement {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-gettooltipdisplayelement}

Returns the entity ID of the tooltip element that is to be displayed when the pointer pauses on an interactable element\.

**Syntax**

```
AZ::EntityId GetTooltipDisplayElement()
```

### RecomputeChangedLayouts {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-recomputechangedlayouts}

Tells the layout manager for the canvas to recompute the layout\. This happens automatically every frame\. Occasionally a script modifies something that affects the layout \(such as the reparenting of an element\) and tries to query positions in the same frame\. In this case you can call `RecomputeChangedLayouts` to force an immediate recalculation of all layouts on the canvas that have been flagged for recomputing\.

**Syntax**

```
void RecomputeChangedLayouts()
```

### SetDrawOrder {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setdraworder}

Sets the draw order on the canvas\.

**Syntax**

```
void SetDrawOrder(int drawOrder)
```

### SetEnabled {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setenabled}

Sets whether the canvas is enabled\. Enabled canvases are updated and rendered for each frame\. Specify true to enable the canvas, false to disable\.

**Syntax**

```
void SetEnabled(bool enabled)
```

### SetHoverInteractable {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-sethoverinteractable}

Sets the interactable element on the canvas on which the pointer has been paused\.

**Note**
This action is done automatically, but in unusual situations it can be useful to call this function from a script\.

**Syntax**

```
void SetHoverInteractable(AZ::EntityId entityId)
```

### SetIsNavigationSupported {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setisnavigationsupported}

Specify true to make the canvas accept navigation input; false otherwise\.

**Syntax**

```
void SetIsNavigationSupported(bool isSupported)
```

### SetIsPixelAligned {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setispixelaligned}

Specify true to enable pixel alignment for this canvas; false otherwise\.

**Syntax**

```
void SetIsPixelAligned(bool isPixelAligned)
```

### SetIsRenderToTexture {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setisrendertotexture}

Sets whether the canvas is rendered to a texture instead of the full screen\. Specify true to render the canvas to a texture; false otherwise\.

**Syntax**

```
void SetIsRenderToTexture(bool isRenderToTexture)
```

### SetKeepLoadedOnLevelUnload {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setkeeploadedonlevelunload}

Sets whether the canvas stays loaded when the level is unloaded\. Specify true to keep the canvas loaded on level unload; false otherwise\.

**Syntax**

```
void SetKeepLoadedOnLevelUnload(bool keepLoaded)
```

### SetRenderTargetName {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setrendertargetname}

Sets the name of the texture that is created when this canvas is rendered to a texture\.

**Syntax**

```
void SetRenderTargetName(const AZStd::string& name)
```

### SetTooltipDisplayElement {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-settooltipdisplayelement}

Sets the element that is to be displayed when the pointer pauses over an interactable element\.

**Syntax**

```
void SetTooltipDisplayElement(AZ::EntityId entityId)
```

## UiCanvasInputNotifications {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications}

Services notifications for the `UiCanvasComponent`\.

### OnCanvasEnterPressed {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvasenterpressed}

Called when the "enter" key is pressed\. Sends the entity that was pressed or an invalid entity id if no element was pressed\.

**Syntax**

```
OnCanvasEnterPressed(AZ::EntityId entityId)
```

### OnCanvasEnterReleased {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvasenterreleased}

Called when the enter key is released\. Sends the entity that was pressed or an invalid entity id if no element was pressed\.

**Syntax**

```
OnCanvasEnterReleased(AZ::EntityId entityId)
```

### OnCanvasHoverEnd {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvashoverend}

Called when an element ends being hovered\.

**Syntax**

```
OnCanvasHoverEnd(AZ::EntityId entityId)
```

### OnCanvasHoverStart {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvashoverstart}

Called when an element starts being hovered\.

**Syntax**

```
OnCanvasHoverStart(AZ::EntityId entityId)
```

### OnCanvasPrimaryPressed {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvasprimarypressed}

Called on a positional input press\. Sends the entity that was pressed or an invalid entity id if no element was pressed\.

**Syntax**

```
void OnCanvasPrimaryPressed(AZ::EntityId entityId)
```

### OnCanvasPrimaryReleased {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvasprimaryreleased}

Called on a positional input release\. Sends the entity that was pressed or an invalid entity id if no element was pressed\.

**Syntax**

```
OnCanvasPrimaryReleased(AZ::EntityId entityId)
```

## UiCanvasNotificationBus {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasnotificationbus}

Services notifications for the `UiCanvasComponent`\.

### OnAction {#lua-scripting-ces-api-ui-uicanvascomponent-uicanvasnotificationbus-onaction}

Maps the name of an action to the entity ID of a canvas component that triggers the action\.

**Syntax**

```
void OnAction(AZ::EntityId entityId, const AZStd::string& actionName)
```

## UiAnimationBus {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus}

Animation messages serviced by the `UiCanvasComponent`\.

### AbortSequence {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-abortsequence}

Aborts the specified sequence\.

**Syntax**

```
void AbortSequence (const AZStd::string& sequenceName)
```

### GetSequencePlayingSpeed {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-getsequenceplayingspeed}

Returns the current playing speed of the specified sequence\.

**Syntax**

```
float GetSequencePlayingSpeed(const AZStd::string& sequenceName)
```

### GetSequencePlayingTime {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-getsequenceplayingtime}

Returns the current playing time of the specified sequence\.

**Syntax**

```
float GetSequencePlayingTime(const AZStd::string& sequenceName)
```

### IsSequencePlaying {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-issequenceplaying}

Returns true if the specified sequence is playing; false otherwise\.

**Syntax**

```
bool IsSequencePlaying(const AZStd::string& sequenceName)
```

### PauseSequence {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-pausesequence}

Pauses the specified sequence\.

**Syntax**

```
void PauseSequence (const AZStd::string& sequenceName)
```

### ResetSequence {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-resetsequence}

Resets the specified sequence to the start\.

**Syntax**

```
void ResetSequence (const AZStd::string& sequenceName)
```

### ResumeSequence {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-resumesequence}

Causes the specified sequence to resume\.

**Syntax**

```
void ResumeSequence (const AZStd::string& sequenceName)
```

### SetSequencePlayingSpeed {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-setsequenceplayingspeed}

Sets the current playing speed of the specified sequence\.

**Syntax**

```
void SetSequencePlayingSpeed(const AZStd::string& sequenceName, float speed)
```

### StartSequence {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-startsequence}

Starts playing the specified sequence\.

**Syntax**

```
void StartSequence(const AZStd::string& sequenceName)
```

### StopSequence {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-stopsequence}

Stops playing the specified sequence\.

**Syntax**

```
void StopSequence (const AZStd::string& sequenceName)
```

## UiAnimationNotificationBus {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationnotificationbus}

Services animation notifications for the `UiCanvasComponent`\.

### OnUiAnimationEvent {#lua-scripting-ces-api-ui-uicanvascomponent-uianimationnotificationbus-onuianimationevent}

Specifies the animation event for the specified sequence\.

**Syntax**

```
void OnUiAnimationEvent(eUiAnimationEvent uiAnimationEvent, AZStd::string animSequenceName)
```

Following are possible values for the `eUiAnimationEvent` flag\.

```
enum eUiAnimationEvent
    {
        eUiAnimationEvent_Started,
        eUiAnimationEvent_Stopped,
        eUiAnimationEvent_Aborted,
        eUiAnimationEvent_Updated
    };
```