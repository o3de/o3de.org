---
description: ' Use the UiTransformBus to control positioning, scaling, rotation, anchor,
  and offset settings for UI elements in &ALYlong;. '
title: UITransform2dComponent
---
# UITransform2dComponent {#lua-scripting-ces-api-ui-uitransform2dcomponent}

Controls positioning, scaling, rotation, anchor, and offset settings for UI elements\.

## UiTransformBus {#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransformbus}

Services messages for the `UiTransform2dComponent`\.

### GetCanvasPosition {#lua-scripting-ces-api-ui-uitransform2dcomponent-getcanvasposition}

Returns the position for this element in the canvas space\.

**Syntax**

```
AZ::Vector2 GetCanvasPosition()
```

### GetLocalPosition {#lua-scripting-ces-api-ui-uitransform2dcomponent-getlocalposition}

Returns the position for this element relative to the center of the element's anchors\.

**Syntax**

```
AZ::Vector2 GetLocalPosition()
```

### GetPivot {#lua-scripting-ces-api-ui-uitransform2dcomponent-getpivot}

Returns the pivot point\.

**Syntax**

```
AZ::Vector2 GetPivot()
```

### GetScale {#lua-scripting-ces-api-ui-uitransform2dcomponent-getscale}

Returns the scale\.

**Syntax**

```
AZ::Vector2 GetScale()
```

### GetScaleToDeviceMode {#lua-scripting-ces-api-ui-uitransform2dcomponent-getscaletodevice}

Returns how this element and all of the child elements are scaled to allow for the difference between the authored canvas size and the actual viewport size\.

**Syntax**

```
ScaleToDeviceMode GetScaleToDeviceMode()
```

Following are possible values for `ScaleToDeviceMode`\.

```
enum ScaleToDeviceMode
    {
        None
        UniformScaleToFit,
        UniformScaleToFill,
        UniformScaleToFitX,
        UniformScaleToFitY,
        NonUniformScale,
        ScaleXOnly,
        ScaleYOnly
    };
```

### GetViewportPosition {#lua-scripting-ces-api-ui-uitransform2dcomponent-getviewportposition}

Returns the position for this element in the viewport space\.

**Syntax**

```
AZ::Vector2 GetViewportPosition()
```

### GetZRotation {#lua-scripting-ces-api-ui-uitransform2dcomponent-getzrotation}

Returns the rotation about the z\-axis\.

**Syntax**

```
float GetZRotation()
```

### MoveCanvasPositionBy {#lua-scripting-ces-api-ui-uitransform2dcomponent-movecanvaspositionby}

Moves this element in the canvas space\.

**Syntax**

```
void MoveCanvasPositionBy(const AZ::Vector2& offset)
```

### MoveLocalPositionBy {#lua-scripting-ces-api-ui-uitransform2dcomponent-movelocalpositionby}

Moves this element relative to the center of the element's anchors\.

**Syntax**

```
void MoveLocalPositionBy(const AZ::Vector2& offset)
```

### MoveViewportPositionBy {#lua-scripting-ces-api-ui-uitransform2dcomponent-moveviewportpositionby}

Moves this element in the viewport space\.

**Syntax**

```
void MoveViewportPositionBy(const AZ::Vector2& offset)
```

### SetCanvasPosition {#lua-scripting-ces-api-ui-uitransform2dcomponent-setcanvasposition}

Sets the position for this element in the canvas space\.

**Syntax**

```
void SetCanvasPosition(const AZ::Vector2& position)
```

### SetLocalPosition {#lua-scripting-ces-api-ui-uitransform2dcomponent-setlocalposition}

Sets the position for this element relative to the center of the element's anchors\.

**Syntax**

```
void SetLocalPosition(const AZ::Vector2& position)
```

### SetPivot {#lua-scripting-ces-api-ui-uitransform2dcomponent-setpivot}

Sets the pivot point\.

**Syntax**

```
void SetPivot(AZ::Vector2 pivot)
```

### SetScale {#lua-scripting-ces-api-ui-uitransform2dcomponent-setscale}

Sets the scale\.

**Syntax**

```
void SetScale(AZ::Vector2 scale)
```

### SetScaleToDeviceMode {#lua-scripting-ces-api-ui-uitransform2dcomponent-setscaletodevice}

Sets how the element and all of its child elements are scaled to allow for the difference between the authored canvas size and the actual viewport size\.

**Syntax**

```
void SetScaleToDeviceMode(ScaleToDeviceMode scaleToDeviceMode)
```

Following are possible values for `scaleToDeviceMode`\.

```
enum ScaleToDeviceMode
    {
        None
        UniformScaleToFit,
        UniformScaleToFill,
        UniformScaleToFitX,
        UniformScaleToFitY,
        NonUniformScale,
        ScaleXOnly,
        ScaleYOnly
    };
```

### SetViewportPosition {#lua-scripting-ces-api-ui-uitransform2dcomponent-setviewportposition}

Sets the position for this element in the viewport space\.

**Syntax**

```
void SetViewportPosition(const AZ::Vector2& position)
```

### SetZRotation {#lua-scripting-ces-api-ui-uitransform2dcomponent-setzrotation}

Sets the rotation about the z\-axis\.

**Syntax**

```
void SetZRotation(float rotation)
```

## UiTransform2dBus {#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus}

Services anchors and offsets for the `UITransform2dComponent`\.

### GetAnchors {#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-getanchors}

Returns the UI anchors\.

**Syntax**

```
UiAnchors GetAnchors()
```

Following are possible values for `UiAnchors`\.

```
class UiAnchors
{
    float left;
    float top;
    float right;
    float bottom;
};
```

### GetOffsets {#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-getoffsets}

Returns the UI offsets\.

**Syntax**

```
UiOffsets GetOffsets()
```

The following are possible values for `UiOffsets`\.

```
class UiOffsets
{
    float left;
    float top;
    float right;
    float bottom;
};
```

### SetAnchors {#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-setanchors}

Sets the anchors\.

**Syntax**

```
void SetAnchors(UiAnchors anchors, bool adjustOffsets, bool allowPush)
```

For possible values for `UiAnchors`, see [GetAnchors](#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-getanchors)\.


****

| **Parameter** | **Description** |
| --- | --- |
| adjustOffsets | If true, the offsets are adjusted to keep the rectangle in the same position\. |
| allowPush | Only takes effect if the anchors are invalid\. If true, when an anchor is changed to overlap the anchor opposite it, the opposite anchor moves\. |

### SetOffsets {#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-setoffsets}

Sets UI offsets\.

**Syntax**

```
void SetOffsets(UiOffsets offsets)
```

For possible values for `UiOffsets`, see [GetOffsets](#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-getoffsets)\.

### SetPivotAndAdjustOffsets {#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-setpivotandadjustoffsets}

Sets the pivot and adjusts the offsets so that this element stays in the same place\.

**Syntax**

```
void SetPivotAndAdjustOffsets(AZ::Vector2 pivot)
```