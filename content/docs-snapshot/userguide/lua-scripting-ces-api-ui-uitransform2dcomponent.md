# UITransform2dComponent<a name="lua-scripting-ces-api-ui-uitransform2dcomponent"></a>

Controls positioning, scaling, rotation, anchor, and offset settings for UI elements\.

## UiTransformBus<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-uitransformbus"></a>

Services messages for the `UiTransform2dComponent`\.

### GetCanvasPosition<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-getcanvasposition"></a>

Returns the position for this element in the canvas space\.

**Syntax**

```
AZ::Vector2 GetCanvasPosition()
```

### GetLocalPosition<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-getlocalposition"></a>

Returns the position for this element relative to the center of the element's anchors\.

**Syntax**

```
AZ::Vector2 GetLocalPosition()
```

### GetPivot<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-getpivot"></a>

Returns the pivot point\.

**Syntax**

```
AZ::Vector2 GetPivot()
```

### GetScale<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-getscale"></a>

Returns the scale\.

**Syntax**

```
AZ::Vector2 GetScale()
```

### GetScaleToDeviceMode<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-getscaletodevice"></a>

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

### GetViewportPosition<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-getviewportposition"></a>

Returns the position for this element in the viewport space\.

**Syntax**

```
AZ::Vector2 GetViewportPosition()
```

### GetZRotation<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-getzrotation"></a>

Returns the rotation about the z\-axis\.

**Syntax**

```
float GetZRotation()
```

### MoveCanvasPositionBy<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-movecanvaspositionby"></a>

Moves this element in the canvas space\.

**Syntax**

```
void MoveCanvasPositionBy(const AZ::Vector2& offset)
```

### MoveLocalPositionBy<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-movelocalpositionby"></a>

Moves this element relative to the center of the element's anchors\.

**Syntax**

```
void MoveLocalPositionBy(const AZ::Vector2& offset)
```

### MoveViewportPositionBy<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-moveviewportpositionby"></a>

Moves this element in the viewport space\.

**Syntax**

```
void MoveViewportPositionBy(const AZ::Vector2& offset)
```

### SetCanvasPosition<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-setcanvasposition"></a>

Sets the position for this element in the canvas space\.

**Syntax**

```
void SetCanvasPosition(const AZ::Vector2& position)
```

### SetLocalPosition<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-setlocalposition"></a>

Sets the position for this element relative to the center of the element's anchors\.

**Syntax**

```
void SetLocalPosition(const AZ::Vector2& position)
```

### SetPivot<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-setpivot"></a>

Sets the pivot point\.

**Syntax**

```
void SetPivot(AZ::Vector2 pivot)
```

### SetScale<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-setscale"></a>

Sets the scale\.

**Syntax**

```
void SetScale(AZ::Vector2 scale)
```

### SetScaleToDeviceMode<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-setscaletodevice"></a>

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

### SetViewportPosition<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-setviewportposition"></a>

Sets the position for this element in the viewport space\.

**Syntax**

```
void SetViewportPosition(const AZ::Vector2& position)
```

### SetZRotation<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-setzrotation"></a>

Sets the rotation about the z\-axis\.

**Syntax**

```
void SetZRotation(float rotation)
```

## UiTransform2dBus<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus"></a>

Services anchors and offsets for the `UITransform2dComponent`\.

### GetAnchors<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-getanchors"></a>

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

### GetOffsets<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-getoffsets"></a>

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

### SetAnchors<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-setanchors"></a>

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

### SetOffsets<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-setoffsets"></a>

Sets UI offsets\.

**Syntax**

```
void SetOffsets(UiOffsets offsets)
```

For possible values for `UiOffsets`, see [GetOffsets](#lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-getoffsets)\.

### SetPivotAndAdjustOffsets<a name="lua-scripting-ces-api-ui-uitransform2dcomponent-uitransform2dbus-setpivotandadjustoffsets"></a>

Sets the pivot and adjusts the offsets so that this element stays in the same place\.

**Syntax**

```
void SetPivotAndAdjustOffsets(AZ::Vector2 pivot)
```