# Sky Highlight<a name="component-sky-highlight"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

The **Sky Highlight** component creates large bursts of light in the sky\. You can use this component with the **[Lightning](component-lightning.md)** component to simulate the sky lighting up when a bolt of lightning flashes\.

To enable the **Sky Highlight** component, you must enable the Lightning Arc gem\. For more information, see [Lightning Arc Gem](gems-system-gem-lightning-arc.md)\.

**Note**  
You can add multiple **Sky Highlight** components to your entities in a level, but the level uses only one of the **Sky Highlight** components\. The last **Sky Highlight** component to activate takes priority and Lumberyard renders that component\.

**Example**  
The following is a sky highlight effect in the distance\.  

![\[Add the Sky Highlight component to your entity to enable flashes of light in the sky, such lightning.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/sky-highlight-component-example.png)

**Contents**
+ [Sky Highlight Component Properties](#component-sky-highlight-properties)
+ [EBus Request Bus Interface](#component-sky-highlight-ebus-request)
  + [Enable](#sky-highlight-ebus-enabled)
  + [Disable](#sky-highlight-ebus-disable)
  + [Toggle](#sky-highlight-ebus-toggle)
  + [IsEnabled](#sky-highlight-ebus-is-enabled)
  + [SetColor](#sky-highlight-ebus-set-color)
  + [GetColor](#sky-highlight-ebus-get-color)
  + [SetColorMultiplier](#sky-highlight-ebus-set-color-multiplier)
  + [GetColorMultiplier](#sky-highlight-ebus-get-color-multiplier)
  + [SetVerticalOffset](#sky-highlight-ebus-set-vertical-offset)
  + [GetVerticalOffset](#sky-highlight-ebus-get-vertical-offset)
  + [SetSize](#sky-highlight-ebus-set-size)
  + [GetSize](#sky-highlight-ebus-get-size)
  + [Notification Bus Example Script](#sky-highlight-notification-bus-example-script)

## Sky Highlight Component Properties<a name="component-sky-highlight-properties"></a>

**Enabled**  
Sky highlight effect is rendered when the entity activates\.  
Default value: `True`

**Color**  
Color of the sky highlight effect\. The default color is a pale blue\.  
Default value: `204`, `204`, `255`

**Color Multiplier**  
Multiplier to apply to the color\. You can use this parameter to adjust the color intensity at run time\.  
Default value: `1`  
Valid values: `0` to `100`

**Vertical Offset**  
Offsets the height of the sky highlight render position\. Specify a value to render the sky highlight above or below the entity's transform\.  
Default value: `0`  
Valid values: `0` to `100`

**Size**  
Size of the sky highlight effect\.   
Default value: `10`  
Valid values: `0` to `100`

## EBus Request Bus Interface<a name="component-sky-highlight-ebus-request"></a>

You can use this EBus to communicate to an entity with a **Sky Highlight** component attached\. The EBus is available at game run time and editing and can be accessed from C\+\+, Lua, and the **Script Canvas** editor\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### Enable<a name="sky-highlight-ebus-enabled"></a>

Enables the sky highlight effect\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### Disable<a name="sky-highlight-ebus-disable"></a>

Disables the sky highlight effect\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### Toggle<a name="sky-highlight-ebus-toggle"></a>

Toggles whether the sky highlight effect is enabled\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### IsEnabled<a name="sky-highlight-ebus-is-enabled"></a>

Returns whether the sky highlight effect is enabled\.

**Parameters**  
None

**Return**  
Type: Boolean

**Scriptable**  
Yes

### SetColor<a name="sky-highlight-ebus-set-color"></a>

Sets the color of the sky highlight\.

The **Color Multiplier** parameter uses this value to calculate the final sky highlight color\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### GetColor<a name="sky-highlight-ebus-get-color"></a>

Returns the color of the sky highlight\.

**Note**  
This value is not affected by the **Color Multiplier** parameter\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### SetColorMultiplier<a name="sky-highlight-ebus-set-color-multiplier"></a>

Sets the color multiplier of the sky highlight\.

The **Color** parameter uses this value to calculate the final sky highlight color\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### GetColorMultiplier<a name="sky-highlight-ebus-get-color-multiplier"></a>

Returns the color multiplier of the sky highlight\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### SetVerticalOffset<a name="sky-highlight-ebus-set-vertical-offset"></a>

Sets how far to offset the sky highlight effect from the entity's transform, on the global z\-axis\.

**Parameters**  
Type: Float

**Return**  
None

**Scriptable**  
Yes

### GetVerticalOffset<a name="sky-highlight-ebus-get-vertical-offset"></a>

Returns the vertical offset of the sky highlight\.

**Parameters**  
None

**Return**  
Type: Float

**Scriptable**  
Yes

### SetSize<a name="sky-highlight-ebus-set-size"></a>

Sets the size of the sky highlight\.

**Parameters**  
Type: Float

**Return**  
None

**Scriptable**  
Yes

### GetSize<a name="sky-highlight-ebus-get-size"></a>

Returns the size of the sky highlight\.

**Parameters**  
None

**Return**  
Type: Float

**Scriptable**  
Yes

### Notification Bus Example Script<a name="sky-highlight-notification-bus-example-script"></a>

```
function example:OnActivate()
    SkyHighlightComponentRequestBus.Event.Toggle(self.entityId)
    SkyHighlightComponentRequestBus.Event.SetColorMultiplier(self.entityId, 10)
end
```