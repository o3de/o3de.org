---
description: ' Use the Amazon Lumberyard Sky Highlight component to add bursts of light to
  the sky. '
title: Sky Highlight
---
# Sky Highlight {#component-sky-highlight}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

The **Sky Highlight** component creates large bursts of light in the sky\. You can use this component with the **[Lightning](/docs/userguide/components/lightning.md)** component to simulate the sky lighting up when a bolt of lightning flashes\.

To enable the **Sky Highlight** component, you must enable the Lightning Arc gem\. For more information, see [Lightning Arc Gem](/docs/userguide/gems/builtin/lightning-arc.md)\.

**Note**
You can add multiple **Sky Highlight** components to your entities in a level, but the level uses only one of the **Sky Highlight** components\. The last **Sky Highlight** component to activate takes priority and Lumberyard renders that component\.

**Example**
The following is a sky highlight effect in the distance\.

![\[Add the Sky Highlight component to your entity to enable flashes of light in the sky, such lightning.\]](/images/userguide/component/sky-highlight-component-example.png)

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

## Sky Highlight Component Properties {#component-sky-highlight-properties}

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

## EBus Request Bus Interface {#component-sky-highlight-ebus-request}

You can use this EBus to communicate to an entity with a **Sky Highlight** component attached\. The EBus is available at game run time and editing and can be accessed from C\+\+, Lua, and the **Script Canvas** editor\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

### Enable {#sky-highlight-ebus-enabled}

Enables the sky highlight effect\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### Disable {#sky-highlight-ebus-disable}

Disables the sky highlight effect\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### Toggle {#sky-highlight-ebus-toggle}

Toggles whether the sky highlight effect is enabled\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### IsEnabled {#sky-highlight-ebus-is-enabled}

Returns whether the sky highlight effect is enabled\.

**Parameters**
None

**Return**
Type: Boolean

**Scriptable**
Yes

### SetColor {#sky-highlight-ebus-set-color}

Sets the color of the sky highlight\.

The **Color Multiplier** parameter uses this value to calculate the final sky highlight color\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### GetColor {#sky-highlight-ebus-get-color}

Returns the color of the sky highlight\.

**Note**
This value is not affected by the **Color Multiplier** parameter\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### SetColorMultiplier {#sky-highlight-ebus-set-color-multiplier}

Sets the color multiplier of the sky highlight\.

The **Color** parameter uses this value to calculate the final sky highlight color\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### GetColorMultiplier {#sky-highlight-ebus-get-color-multiplier}

Returns the color multiplier of the sky highlight\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### SetVerticalOffset {#sky-highlight-ebus-set-vertical-offset}

Sets how far to offset the sky highlight effect from the entity's transform, on the global z\-axis\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetVerticalOffset {#sky-highlight-ebus-get-vertical-offset}

Returns the vertical offset of the sky highlight\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetSize {#sky-highlight-ebus-set-size}

Sets the size of the sky highlight\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetSize {#sky-highlight-ebus-get-size}

Returns the size of the sky highlight\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### Notification Bus Example Script {#sky-highlight-notification-bus-example-script}

```
function example:OnActivate()
    SkyHighlightComponentRequestBus.Event.Toggle(self.entityId)
    SkyHighlightComponentRequestBus.Event.SetColorMultiplier(self.entityId, 10)
end
```