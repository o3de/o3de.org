---
description: ' Use the UIFlipbookAnimationComponent to animate the display of a range
  of cells in a sprite sheet image in &ALYlong;. '
title: UIFlipbookAnimationComponent
---
# UIFlipbookAnimationComponent {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent}

The `UIFlipbookAnimationComponent` animates the display of a range of cells in a sprite sheet image\. You must use an **Image** component along with the **UIFlipbookAnimationComponent** component\.

## UiFlipbookAnimationBus {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus}

Services messages for the `UiFlipbookAnimationComponent`\.

### Start {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-start}

Begins playing the flipbook animation\.

**Syntax**

```
void Start()
```

### Stop {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-stop}

Ends the animation\.

**Syntax**

```
void End()
```

### IsPlaying {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-isplaying}

Returns true if the animation is currently playing\. Otherwise, false\.

**Syntax**

```
void IsPlaying()
```

### GetStartFrame {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getstartframe}

Returns the first frame to display when starting the animation\.

**Syntax**

```
AZ::u32 GetStartFrame()
```

### SetStartFrame {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setstartframe}

Sets the first frame to display when starting the animation\.

**Syntax**

```
void SetStartFrame(AZ::u32 startFrame)
```

### GetEndFrame {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getendframe}

Returns the last frame to display for the animation\.

**Syntax**

```
AZ::u32 GetEndFrame()
```

### SetEndFrame {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setendframe}

Sets the last frame to display for the animation\.

**Syntax**

```
void SetEndFrame(AZ::u32 endFrame)
```

### GetCurrentFrame {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getcurrentframe}

Returns the frame of the animation currently displayed\.

**Syntax**

```
AZ::u32 GetCurrentFrame()
```

### SetCurrentFrame {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setcurrentframe}

Sets the frame to immediately display for the animation\.

**Syntax**

```
void SetCurrentFrame(AZ::u32 currentFrame)
```

### GetLoopStartFrame {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getloopstartframe}

Returns the first frame that is displayed within an animation loop\.

Applicable only when the **Loop Type** is set to anything other than **None**\. 

**Syntax**

```
AZ::u32 GetLoopStartFrame()
```

### SetLoopStartFrame {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setloopstartframe}

Sets the first frame that is displayed within an animation loop\.

Applicable only when the **Loop Type** is set to anything other than **None**\. 

**Syntax**

```
void SetLoopStartFrame(AZ::u32 loopStartFrame)
```

### GetLoopType {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getlooptype}

Returns the type of looping behavior for this animation\.

**Syntax**

```
eUiFlipbookAnimationLoopType GetLoopType()
```

See `SetLoopType` for a list of possible loop type values\.

### SetLoopType {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setlooptype}

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

### GetFrameDelay {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getframedelay}

Returns the number of seconds to wait before displaying the next frame\.

**Syntax**

```
float GetFrameDelay()
```

### SetFrameDelay {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setframedelay}

Sets the number of seconds to wait before displaying the next frame\.

**Syntax**

```
void SetFrameDelay(float delay)
```

### GetIsAutoPlay {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-getisautoplay}

Returns true if the animation will begin playing as soon as the element is activated\. Otherwise, false\.

**Syntax**

```
bool GetIsAutoPlay()
```

### SetIsAutoPlay {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationbus-setisautoplay}

Sets whether the animation will begin playing as soon as the element is activated\.

**Syntax**

```
void SetIsAutoPlay(bool isAutoPlay)
```

## UiFlipbookAnimationNotificationBus {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationnotificationbus}

Notifies listeners of important events concerning the `UiFlipbookAnimationComponent`\.

### OnAnimationStarted {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationnotificationbus-onanimationstarted}

The flipbook animation has begun playing\.

**Syntax**

```
void OnAnimationStarted()
```

### OnAnimationStopped {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationnotificationbus-onanimationstopped}

The flipbook animation has stopped playing\.

**Syntax**

```
void OnAnimationStopped()
```

### OnLoopSequenceCompleted {#lua-scripting-ces-api-ui-uiflipbookanimationcomponent-uiflipbookanimationnotificationbus-onloopsequencecompleted}

The flipbook animation has completed one loop iteration\. This triggers only when the **Loop Type** of the flipbook animation is configured to anything other than **None**\.

For **Linear** loops, this triggers when **End Frame** is displayed\.

For **Ping Pong** loops, this triggers when either **Start Frame** or **End Frame** is displayed \(depending on the current loop direction of the loop\)\.

**Syntax**

```
void OnLoopSequenceCompleted()
```