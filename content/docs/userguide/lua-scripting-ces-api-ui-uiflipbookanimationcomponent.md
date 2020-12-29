# UIFlipbookAnimationComponent<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent"></a>

The `UIFlipbookAnimationComponent` animates the display of a range of cells in a sprite sheet image\. You must use an **Image** component along with the **UIFlipbookAnimationComponent** component\.

## UiFlipbookAnimationBus<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus"></a>

Services messages for the `UiFlipbookAnimationComponent`\.

### Start<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-start"></a>

Begins playing the flipbook animation\.

**Syntax**

```
void Start()
```

### Stop<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-stop"></a>

Ends the animation\.

**Syntax**

```
void End()
```

### IsPlaying<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-isplaying"></a>

Returns true if the animation is currently playing\. Otherwise, false\.

**Syntax**

```
void IsPlaying()
```

### GetStartFrame<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getstartframe"></a>

Returns the first frame to display when starting the animation\.

**Syntax**

```
AZ::u32 GetStartFrame()
```

### SetStartFrame<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setstartframe"></a>

Sets the first frame to display when starting the animation\.

**Syntax**

```
void SetStartFrame(AZ::u32 startFrame)
```

### GetEndFrame<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getendframe"></a>

Returns the last frame to display for the animation\.

**Syntax**

```
AZ::u32 GetEndFrame()
```

### SetEndFrame<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setendframe"></a>

Sets the last frame to display for the animation\.

**Syntax**

```
void SetEndFrame(AZ::u32 endFrame)
```

### GetCurrentFrame<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getcurrentframe"></a>

Returns the frame of the animation currently displayed\.

**Syntax**

```
AZ::u32 GetCurrentFrame()
```

### SetCurrentFrame<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setcurrentframe"></a>

Sets the frame to immediately display for the animation\.

**Syntax**

```
void SetCurrentFrame(AZ::u32 currentFrame)
```

### GetLoopStartFrame<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getloopstartframe"></a>

Returns the first frame that is displayed within an animation loop\.

Applicable only when the **Loop Type** is set to anything other than **None**\. 

**Syntax**

```
AZ::u32 GetLoopStartFrame()
```

### SetLoopStartFrame<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setloopstartframe"></a>

Sets the first frame that is displayed within an animation loop\.

Applicable only when the **Loop Type** is set to anything other than **None**\. 

**Syntax**

```
void SetLoopStartFrame(AZ::u32 loopStartFrame)
```

### GetLoopType<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getlooptype"></a>

Returns the type of looping behavior for this animation\.

**Syntax**

```
eUiFlipbookAnimationLoopType GetLoopType()
```

See `SetLoopType` for a list of possible loop type values\.

### SetLoopType<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setlooptype"></a>

Sets the type of looping behavior for this animation\.

**Syntax**

```
void SetLoopType(eUiFlipbookAnimationLoopType loopType)
```

Possible loop types are as follows:

```
enum eUiFlipbookAnimationLoopType
    {
        eUiFlipbookAnimationLoopType_None,
        eUiFlipbookAnimationLoopType_Linear,
        eUiFlipbookAnimationLoopType_PingPong
    };
```

Each type performs a different looping action:
+ **None** – Animation ends when end frame is reached\.
+ **Linear** – The frame displayed after the end frame is always the **Loop Start Frame**\.
+ **PingPong** – The direction of the animation loop goes back and forth between the start frame and the end frame\.

### GetFrameDelay<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getframedelay"></a>

Returns the number of seconds to wait before displaying the next frame\.

**Syntax**

```
float GetFrameDelay()
```

### SetFrameDelay<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setframedelay"></a>

Sets the number of seconds to wait before displaying the next frame\.

**Syntax**

```
void SetFrameDelay(float delay)
```

### GetIsAutoPlay<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getisautoplay"></a>

Returns true if the animation will begin playing as soon as the element is activated\. Otherwise, false\.

**Syntax**

```
bool GetIsAutoPlay()
```

### SetIsAutoPlay<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setisautoplay"></a>

Sets whether the animation will begin playing as soon as the element is activated\.

**Syntax**

```
void SetIsAutoPlay(bool isAutoPlay)
```

## UiFlipbookAnimationNotificationBus<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationnotificationbus"></a>

Notifies listeners of important events concerning the `UiFlipbookAnimationComponent`\.

### OnAnimationStarted<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationnotificationbus-onanimationstarted"></a>

The flipbook animation has begun playing\.

**Syntax**

```
void OnAnimationStarted()
```

### OnAnimationStopped<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationnotificationbus-onanimationstopped"></a>

The flipbook animation has stopped playing\.

**Syntax**

```
void OnAnimationStopped()
```

### OnLoopSequenceCompleted<a name="lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationnotificationbus-onloopsequencecompleted"></a>

The flipbook animation has completed one loop iteration\. This triggers only when the **Loop Type** of the flipbook animation is configured to anything other than **None**\.

For **Linear** loops, this triggers when **End Frame** is displayed\.

For **Ping Pong** loops, this triggers when either **Start Frame** or **End Frame** is displayed \(depending on the current loop direction of the loop\)\.

**Syntax**

```
void OnLoopSequenceCompleted()
```