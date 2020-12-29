# UICanvasComponent<a name="lua-scripting-ces-api-ui-uicanvascomponent"></a>

Contains buses and notification buses for UI canvas and animation\.

## UiCanvasBus<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus"></a>

Services messages for the `UiCanvasComponent`\.

### FindElementByName<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-findelementbyname"></a>

Returns the entity ID of the first UI element in this canvas that has the specified name\.

**Syntax**

```
AZ::EntityId FindElementByName(const AZStd::string& name)
```

### ForceEnterInputEventOnInteractable<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-forceenterinputeventoninteractable"></a>

Forces a specified interactive element to receive an Enter press/release navigation event\. This is useful for automated testing using script, such as simulating a button click\.

**Syntax**

```
void ForceEnterInputEventOnInteractable(AZ::EntityId entityId)
```

### ForceHoverInteractable<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-forcehoverinteractable"></a>

Forces a specified interactive element to receive the hover\.

**Syntax**

```
void ForceHoverInteractable(AZ::EntityId entityId) 
```

### GetChildElement<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getchildelement"></a>

Returns the entity ID of the child element that has the specified index\.

**Syntax**

```
AZ::EntityId GetChildElement(int index)
```

### GetChildElements<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getchildelements"></a>

Returns a list of entity IDs of the child elements of the canvas\.

**Syntax**

```
AZStd::vector<AZ::EntityId> GetChildElements() 
```

### GetDrawOrder<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getdraworder"></a>

Returns the draw order on the canvas\.

**Syntax**

```
int GetDrawOrder()
```

### GetEnabled<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getenabled"></a>

Returns the enabled flag of the canvas\. True if the canvas is enabled; false otherwise\. Enabled canvases are updated and rendered for each frame\.

**Syntax**

```
bool GetEnabled()
```

### GetHoverInteractable<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-gethoverinteractable"></a>

Returns the entity ID of the interactive element that has the hover\.

**Syntax**

```
AZ::EntityId GetHoverInteractable()
```

### GetIsNavigationSupported<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getisnavigationsupported"></a>

Returns true if the canvas accepts navigation input; false otherwise\.

**Syntax**

```
bool GetIsNavigationSupported()
```

### GetIsPixelAligned<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getispixelaligned"></a>

Returns true if pixel alignment is enabled for this canvas; false otherwise\. If pixel alignment is enabled, then all corners of all elements are rounded to the nearest pixel when they are rendered\.

**Syntax**

```
bool GetIsPixelAligned()
```

### GetIsRenderToTexture<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getisrendertotexture"></a>

Returns true if the canvas is rendered to a texture instead of the full screen; false otherwise\.

**Syntax**

```
bool GetIsRenderToTexture()
```

### GetKeepLoadedOnLevelUnload<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getkeeploadedonlevelunload"></a>

Returns true if the canvas stays loaded when the level is unloaded; `false` otherwise\.

**Syntax**

```
bool GetKeepLoadedOnLevelUnload()
```

### GetNumChildElements<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getnumchildelements"></a>

Returns the number of child elements that the canvas has\.

**Syntax**

```
int GetNumChildElements()
```

### GetRenderTargetName<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-getrendertargetname"></a>

Returns the name of the texture that is created when this canvas is rendered to a texture\.

**Syntax**

```
AZStd::string GetRenderTargetName()
```

### GetTooltipDisplayElement<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-gettooltipdisplayelement"></a>

Returns the entity ID of the tooltip element that is to be displayed when the pointer pauses on an interactable element\.

**Syntax**

```
AZ::EntityId GetTooltipDisplayElement()
```

### RecomputeChangedLayouts<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-recomputechangedlayouts"></a>

Tells the layout manager for the canvas to recompute the layout\. This happens automatically every frame\. Occasionally a script modifies something that affects the layout \(such as the reparenting of an element\) and tries to query positions in the same frame\. In this case you can call `RecomputeChangedLayouts` to force an immediate recalculation of all layouts on the canvas that have been flagged for recomputing\.

**Syntax**

```
void RecomputeChangedLayouts()
```

### SetDrawOrder<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setdraworder"></a>

Sets the draw order on the canvas\.

**Syntax**

```
void SetDrawOrder(int drawOrder)
```

### SetEnabled<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setenabled"></a>

Sets whether the canvas is enabled\. Enabled canvases are updated and rendered for each frame\. Specify true to enable the canvas, false to disable\.

**Syntax**

```
void SetEnabled(bool enabled)
```

### SetHoverInteractable<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-sethoverinteractable"></a>

Sets the interactable element on the canvas on which the pointer has been paused\.

**Note**  
This action is done automatically, but in unusual situations it can be useful to call this function from a script\. 

**Syntax**

```
void SetHoverInteractable(AZ::EntityId entityId)
```

### SetIsNavigationSupported<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setisnavigationsupported"></a>

Specify true to make the canvas accept navigation input; false otherwise\.

**Syntax**

```
void SetIsNavigationSupported(bool isSupported) 
```

### SetIsPixelAligned<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setispixelaligned"></a>

Specify true to enable pixel alignment for this canvas; false otherwise\.

**Syntax**

```
void SetIsPixelAligned(bool isPixelAligned)
```

### SetIsRenderToTexture<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setisrendertotexture"></a>

Sets whether the canvas is rendered to a texture instead of the full screen\. Specify true to render the canvas to a texture; false otherwise\.

**Syntax**

```
void SetIsRenderToTexture(bool isRenderToTexture) 
```

### SetKeepLoadedOnLevelUnload<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setkeeploadedonlevelunload"></a>

Sets whether the canvas stays loaded when the level is unloaded\. Specify true to keep the canvas loaded on level unload; false otherwise\.

**Syntax**

```
void SetKeepLoadedOnLevelUnload(bool keepLoaded) 
```

### SetRenderTargetName<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-setrendertargetname"></a>

Sets the name of the texture that is created when this canvas is rendered to a texture\.

**Syntax**

```
void SetRenderTargetName(const AZStd::string& name)
```

### SetTooltipDisplayElement<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasbus-settooltipdisplayelement"></a>

Sets the element that is to be displayed when the pointer pauses over an interactable element\.

**Syntax**

```
void SetTooltipDisplayElement(AZ::EntityId entityId)
```

## UiCanvasInputNotifications<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications"></a>

Services notifications for the `UiCanvasComponent`\.

### OnCanvasEnterPressed<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvasenterpressed"></a>

Called when the “enter” key is pressed\. Sends the entity that was pressed or an invalid entity id if no element was pressed\.

**Syntax**

```
OnCanvasEnterPressed(AZ::EntityId entityId)
```

### OnCanvasEnterReleased<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvasenterreleased"></a>

Called when the enter key is released\. Sends the entity that was pressed or an invalid entity id if no element was pressed\.

**Syntax**

```
OnCanvasEnterReleased(AZ::EntityId entityId)
```

### OnCanvasHoverEnd<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvashoverend"></a>

Called when an element ends being hovered\.

**Syntax**

```
OnCanvasHoverEnd(AZ::EntityId entityId)
```

### OnCanvasHoverStart<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvashoverstart"></a>

Called when an element starts being hovered\.

**Syntax**

```
OnCanvasHoverStart(AZ::EntityId entityId)
```

### OnCanvasPrimaryPressed<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvasprimarypressed"></a>

Called on a positional input press\. Sends the entity that was pressed or an invalid entity id if no element was pressed\.

**Syntax**

```
void OnCanvasPrimaryPressed(AZ::EntityId entityId)
```

### OnCanvasPrimaryReleased<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasinputnotifications-oncanvasprimaryreleased"></a>

Called on a positional input release\. Sends the entity that was pressed or an invalid entity id if no element was pressed\.

**Syntax**

```
OnCanvasPrimaryReleased(AZ::EntityId entityId)
```

## UiCanvasNotificationBus<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasnotificationbus"></a>

Services notifications for the `UiCanvasComponent`\.

### OnAction<a name="lua-scripting-ces-api-ui-uicanvascomponent-uicanvasnotificationbus-onaction"></a>

Maps the name of an action to the entity ID of a canvas component that triggers the action\.

**Syntax**

```
void OnAction(AZ::EntityId entityId, const AZStd::string& actionName)
```

## UiAnimationBus<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus"></a>

Animation messages serviced by the `UiCanvasComponent`\.

### AbortSequence<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-abortsequence"></a>

Aborts the specified sequence\.

**Syntax**

```
void AbortSequence (const AZStd::string& sequenceName)
```

### GetSequencePlayingSpeed<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-getsequenceplayingspeed"></a>

Returns the current playing speed of the specified sequence\.

**Syntax**

```
float GetSequencePlayingSpeed(const AZStd::string& sequenceName)
```

### GetSequencePlayingTime<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-getsequenceplayingtime"></a>

Returns the current playing time of the specified sequence\.

**Syntax**

```
float GetSequencePlayingTime(const AZStd::string& sequenceName)
```

### IsSequencePlaying<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-issequenceplaying"></a>

Returns true if the specified sequence is playing; false otherwise\.

**Syntax**

```
bool IsSequencePlaying(const AZStd::string& sequenceName)
```

### PauseSequence<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-pausesequence"></a>

Pauses the specified sequence\.

**Syntax**

```
void PauseSequence (const AZStd::string& sequenceName)
```

### ResetSequence<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-resetsequence"></a>

Resets the specified sequence to the start\.

**Syntax**

```
void ResetSequence (const AZStd::string& sequenceName)
```

### ResumeSequence<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-resumesequence"></a>

Causes the specified sequence to resume\.

**Syntax**

```
void ResumeSequence (const AZStd::string& sequenceName)
```

### SetSequencePlayingSpeed<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-setsequenceplayingspeed"></a>

Sets the current playing speed of the specified sequence\.

**Syntax**

```
void SetSequencePlayingSpeed(const AZStd::string& sequenceName, float speed)
```

### StartSequence<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-startsequence"></a>

Starts playing the specified sequence\.

**Syntax**

```
void StartSequence(const AZStd::string& sequenceName)
```

### StopSequence<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationbus-stopsequence"></a>

Stops playing the specified sequence\.

**Syntax**

```
void StopSequence (const AZStd::string& sequenceName)
```

## UiAnimationNotificationBus<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationnotificationbus"></a>

Services animation notifications for the `UiCanvasComponent`\.

### OnUiAnimationEvent<a name="lua-scripting-ces-api-ui-uicanvascomponent-uianimationnotificationbus-onuianimationevent"></a>

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