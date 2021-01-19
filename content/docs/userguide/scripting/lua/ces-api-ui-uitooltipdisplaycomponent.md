---
description: ' Use the UITooltipDisplayComponent to control the display behavior of
  a tooltip in &ALYlong;. '
title: UITooltipDisplayComponent
---
# UITooltipDisplayComponent {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent}

Controls the display behavior of a tooltip\.

## UiTooltipDisplayBus {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus}

Services messages for the `UiTooltipDisplayComponent`\.

### GetAutoPosition {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-getautoposition}

Returns whether the tooltip display element is auto positioned\.

**Syntax**

```
bool GetAutoPosition()
```

### GetAutoPositionMode {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-getautopositionmode}

Returns the auto position mode\.

**Syntax**

```
AutoPositionMode GetAutoPositionMode()
```

Following are possible values for `AutoPositionMode`\.

```
enum AutoPositionMode
    {
        OffsetFromMouse,
        OffsetFromElement
    };
```

### GetAutoSize {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-getautosize}

Returns whether the tooltip display element should be resized so that the text element size matches the size of the string\.

**Syntax**

```
bool GetAutoSize()
```

### GetDelayTime {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-getdelaytime}

Returns the amount of time to wait before showing the tooltip display element after the trigger condition has occurred\.

**Syntax**

```
float GetDelayTime()
```

### GetDisplayTime {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-getdisplaytime}

Returns the amount of time the tooltip display element is to remain visible\.

**Syntax**

```
float GetDisplayTime()
```

### GetOffset {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-getoffset}

Returns the offset from the tooltip display element's pivot to the mouse position\.

**Syntax**

```
const AZ::Vector2& GetOffset()
```

### GetTextEntity {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-gettextentity}

Returns the entity ID of the text element that is used for resizing\.

**Syntax**

```
AZ::EntityId GetTextEntity()
```

### GetTriggerMode {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-gettriggermode}

Returns the trigger mode describing the condition under which the tooltip will be displayed\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
TriggerMode GetTriggerMode()
```

Following are possible values for `TriggerMode`\.

```
enum TriggerMode
    {
        OnHover,
        OnPress,
        OnClick
    };
```

### SetAutoPosition {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-setautoposition}

Sets whether the tooltip display element is auto positioned\.

**Syntax**

```
void SetAutoPosition(bool autoPosition)
```

### SetAutoPositionMode {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-setautopositionmode}

Sets the auto position mode\.

**Syntax**

```
void SetAutoPositionMode(AutoPositionMode autoPositionMode)
```

Following are possible values for `AutoPositionMode`\.

```
enum AutoPositionMode
    {
        OffsetFromMouse,
        OffsetFromElement
    };
```

### SetAutoSize {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-setautosize}

Sets whether the tooltip display element should be resized so that the text element size matches the size of the string\.

**Syntax**

```
void SetAutoSize(bool autoSize)
```

### SetDelayTime {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-setdelaytime}

Sets the amount of time to wait before showing the tooltip display element after the trigger condition has occurred\.

**Syntax**

```
void SetDelayTime(float delayTime)
```

### SetDisplayTime {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-setdisplaytime}

Sets the amount of time the tooltip display element is to remain visible\.

**Syntax**

```
void SetDisplayTime(float displayTime)
```

### SetOffset {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-setoffset}

Sets the offset from the tooltip display element's pivot to the mouse position\.

**Syntax**

```
void SetOffset(const AZ::Vector2& offset)
```

### SetTextEntity {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-settextentity}

Sets the entity ID of the text element that is used for resizing\. The text element must be a child of this entity\.

**Syntax**

```
void SetTextEntity(AZ::EntityId textEntity)
```

### SetTriggerMode {#lua-scripting-ces-api-ui-uitooltipdisplaycomponent-uitooltipdisplaybus-settriggermode}

Sets the trigger condition for displaying the tooltip after the set amount of delay time has elapsed\.

**Minimum Lumberyard Version: **1\.24

**Syntax**

```
void SetTriggerMode(TriggerMode triggerMode)
```

Following are possible values for `TriggerMode`\.

```
enum TriggerMode
    {
        OnHover,
        OnPress,
        OnClick
    };
```