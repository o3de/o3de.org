---
description: ' Use the &ALYlong; Lightning Arc component to add lightning arc effects
  to your game. '
title: Lighting Arc
---
# Lighting Arc {#component-lightning-arc}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

You can use the **Lightning Arc** component to create short arcs \(also called sparks\) between an emitter and a series of target entities\. When an arc is emitted, the arc jumps between the center of the entity to which the **Lightning Arc** component is attached and the center of the target entity\.

To enable the **Lightning Arc** component, you must enable the Lightning Arc gem\. For more information, see [Lightning Arc Gem](/docs/userguide/gems/builtin/lightning-arc.md)\.

**Example**
The **Lightning Arc** component is attached to the entity in the center, and the arc randomly jumps between three targets\. This example uses the default lightning material in the Lightning Arc gem and the `Tesla_core` arc preset\. For more information, see [Customizing a Lightning Arc Preset](/docs/userguide/gems/builtin/lightning-arc-presets.md)\.

![\[Add the Lightning Arc component to your entity to create lightning arcs that jump between entities.\]](/images/shared/shared-lightning-arc-component-animation-example.gif)

**Topics**
+ [Lightning Arc Component Properties](#component-lightning-arc-properties)
+ [EBus Request Bus Interface](#component-lightning-arc-ebus-request)
+ [EBus Notification Bus Interface](#lightning-arc-component-notification-bus-interface)

## Lightning Arc Component Properties {#component-lightning-arc-properties}

The **Lightning Arc** component has the following properties:

**Enabled**
Specifies whether the **Lightning Arc** component emits arcs\.

**Targets**
The collection of targets to which the **Lightning Arc** component emits arcs\.

**Material**
The lightning arc material\. This parameter does not require a specific type of material, but it's recommended that you use the [Illum shader](/docs/userguide/shaders/illum.md) and a texture with opacity\.
You can find the default files in the following directory: `Gems\LightningArc\Assets\materials\effects`
Default value: None

**Arc Preset Name**
The name of the arc preset in use; the arc preset is specified in the `lightningarceffects.xml` file\. If you change any of the arc parameters in this file, this field changes to `<Custom>`\.
You can find the available arc preset names in the following directory: `Gems\LightningArc\Assets\libs\lightningarc\lightningarceffects.xml `

**Refresh Presets**
If you make changes to the `lightningarceffects.xml` file, click **Refresh Presets** to get the most recent arc preset names\.

### Arc Parameters {#component-lightning-arc-parameters}

The **Lightning Arc** component has the following lightning options:

**Contents**
+ [Lightning](#component-lightning-arc-parameters-lightning)
+ [Branch](#component-lightning-arc-branch-)
+ [Strike](#component-lightning-arc-strike-)
+ [Beam](#component-lightning-arc-beam-)

#### Lightning {#component-lightning-arc-parameters-lightning}

**Deviation**
Amount of deviation applied to the arcs\. Specify lower values to make the arc appear more smooth\.

**Fuzziness**
Amount of noise applied to the arcs\.

**Velocity**
Specify how fast an arc drifts upward after it is emitted\.

#### Branch {#component-lightning-arc-branch-}

The **Lightning Arc** component has following branch options:

**Max Level**
Maximum number of branches that can spawn from an arc\. For more information, see [SetBranchMaxLevel](#lightning-arc-ebus-set-branch-max-level)\.

**Probability**
Specifies how likely that a child branch spawns from an arc\. For more information, see [SetBranchProbability](#lightning-arc-ebus-set-branch-probability)\.

#### Strike {#component-lightning-arc-strike-}

The **Lightning Arc** component has following strike options:

**Time Min**
Minimum amount of time that an arc is kept alive\.

**Time Max**
Maximum amount of time that an arc is kept alive\.

**Fade Out**
Specifies how long it takes for an arc to fade out\.

**Segment Count**
Number of segments in an arc\. Specify more segments to make the arcs appear more winding\.

**Point Count**
Number of points for each segment\. Specify more points to increase the noise effect that is defined by the **Fuzziness** parameter\.

**Max Strike Count**
Specify how many arcs can be alive at one time from this **Lightning Arc** component\.

#### Beam {#component-lightning-arc-beam-}

The **Lightning Arc** component has following beam options:

**Size**
The width of the arcs that the **Lightning Arc** component creates\. The branches that spawn off the arc beam will have half this size\.

**Tex Tiling**
Texture tiling based on the world size of the arc beam\. For more information, see [SetBeamTexTiling](#lightning-arc-ebus-set-beam-tex-tiling)\.

**Tex Shift**
Specify how fast to move through textures in the arc's animation\. For more information, see [SetBeamTexShift](#lightning-arc-ebus-set-beam-tex-shift)\.

**Tex Frames**
Specify how many frames are in the arc's animation\.

**Tex FPS**
Specify how many frames per second are in the arc's animation\.

### Timing {#component-lightning-arc-timing-}

The **Lightning Arc** component has following timing options:

**Delay**
Time between emitted arcs, in seconds\.

**Delay Variation**
Variation in time between emitted arcs\. For more information, see [SetDelayVariation](#lightning-arc-ebus-set-delay-variation)\.

## EBus Request Bus Interface {#component-lightning-arc-ebus-request}

Use the following request functions with the EBus interface to communicate with other components of your game\. You can use this EBus to communicate to an entity with a **Lightning Arc** component attached\. The EBus is available at game run time and editing and can be accessed from C\+\+, Lua, and the **Script Canvas** editor\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

**Contents**
+ [Enable](#lightning-arc-ebus-enable)
+ [Disable](#lightning-arc-ebus-disable)
+ [Toggle](#lightning-arc-ebus-toggle)
+ [IsEnabled](#lightning-arc-ebus-is-enabled)
+ [SetTargets](#lightning-arc-ebus-set-targets)
+ [GetTargets](#lightning-arc-ebus-get-targets)
+ [SetDelay](#lightning-arc-ebus-set-delay)
+ [GetDelay](#lightning-arc-ebus-get-delay)
+ [SetDelayVariation](#lightning-arc-ebus-set-delay-variation)
+ [GetDelayVariation](#lightning-arc-ebus-get-delay-variation)
+ [SetStrikeTimeMin](#lightning-arc-ebus-set-strike-time-min)
+ [GetStrikeTimeMin](#lightning-arc-ebus-get-strike-time-min)
+ [SetStrikeTimeMax](#lightning-arc-ebus-set-strike-time-max)
+ [GetStrikeTimeMax](#lightning-arc-ebus-get-strike-time-max)
+ [SetStrikeFadeOut](#lightning-arc-ebus-set-strike-fade-out)
+ [GetStrikeFadeOut](#lightning-arc-ebus-get-strike-fade-out)
+ [SetStrikeSegmentCount](#lightning-arc-ebus-set-segment-count)
+ [GetStrikeSegmentCount](#lightning-arc-ebus-get-segment-count)
+ [SetStrikePointCount](#lightning-arc-ebus-set-strike-point-count)
+ [GetStrikePointCount](#lightning-arc-ebus-get-strike-point-count)
+ [SetLightningDeviation](#lightning-arc-ebus-set-lightning-deviation)
+ [GetLightningDeviation](#lightning-arc-ebus-get-lightning-deviation)
+ [SetLightningFuzziness](#lightning-arc-ebus-set-lightning-fuzziness)
+ [GetLightningFuzziness](#lightning-arc-ebus-get-lightning-fuzziness)
+ [SetLightningVelocity](#lightning-arc-ebus-set-lightning-velocity)
+ [GetLightningVelocity](#lightning-arc-ebus-get-lightning-velocity)
+ [SetBranchProbability](#lightning-arc-ebus-set-branch-probability)
+ [GetBranchProbablity](#lightning-arc-ebus-get-branch-probability)
+ [SetBranchMaxLevel](#lightning-arc-ebus-set-branch-max-level)
+ [GetBranchMaxLevel](#lightning-arc-ebus-get-branch-max-level)
+ [SetMaxStrikeCount](#lightning-arc-ebus-set-max-strike-count)
+ [GetMaxStrikeCount](#lightning-arc-ebus-get-max-strike-count)
+ [SetBeamSize](#lightning-arc-ebus-set-beam-size)
+ [GetBeamSize](#lightning-arc-ebus-get-beam-size)
+ [SetBeamTexTiling](#lightning-arc-ebus-set-beam-tex-tiling)
+ [GetBeamTexTiling](#lightning-arc-ebus-get-beam-tex-tiling)
+ [SetBeamTexShift](#lightning-arc-ebus-set-beam-tex-shift)
+ [GetBeamTexShift](#lightning-arc-ebus-get-beam-tex-shift)
+ [SetBeamTexFrames](#lightning-arc-ebus-set-beam-tex-frames)
+ [GetBeamTexFrames](#lightning-arc-ebus-get-beam-tex-frames)
+ [SetBeamTexFPS](#lightning-arc-ebus-set-beam-tex-fps)
+ [GetBeamTexFPS](#lightning-arc-ebus-get-beam-tex-fps)
+ [Request Bus Example Script](#lightning-arc-ebus-example-script)

### Enable {#lightning-arc-ebus-enable}

Enables the component to emit lightning arcs\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### Disable {#lightning-arc-ebus-disable}

Disables lightning arc emission\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### Toggle {#lightning-arc-ebus-toggle}

Toggles lightning arc emission\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### IsEnabled {#lightning-arc-ebus-is-enabled}

Returns whether the **Lightning Arc** component emits lightning arcs\.

**Parameters**
None

**Return**
Type: Boolean

**Scriptable**
Yes

### SetTargets {#lightning-arc-ebus-set-targets}

Sets the target entities to which the **Lightning Arc** component emits arcs\.

**Parameters**
`AZStd::vector<AZ::EntityId>`
Type: Vector of entity IDs\.

**Return**
None

**Scriptable**
Yes

### GetTargets {#lightning-arc-ebus-get-targets}

Returns the target entities to which the **Lightning Arc** component emits arcs\.

**Parameters**
None

**Return**
`AZStd::vector<AZ::EntityId>`
Type: Vector of entity IDs\.

**Scriptable**
Yes

### SetDelay {#lightning-arc-ebus-set-delay}

Sets the time between emitted arcs, in seconds\.

**Parameters**
Type: Double

**Return**
None

**Scriptable**
Yes

### GetDelay {#lightning-arc-ebus-get-delay}

Returns the time between emitted arcs, in seconds\.

**Parameters**
None

**Return**
Type: Double

**Scriptable**
Yes

### SetDelayVariation {#lightning-arc-ebus-set-delay-variation}

Sets the variation in time between emitted arcs\.

Delay variation is a random range applied to the **Delay** parameter to calculate the time that the next arc emits\.

The random variation is in the following range: \[delay variation \* `0.5`, delay variation\]\.

For example, if the delay is `2.0` and the delay variation is `1.0`, the range of time between arc emissions is \[`2.5` and `3.0`\]\.

**Parameters**
Type: Double

**Return**
None

**Scriptable**
Yes

### GetDelayVariation {#lightning-arc-ebus-get-delay-variation}

Returns the variation in time between emitted arcs\.

**Parameters**
None

**Return**
Type: Double

**Scriptable**
Yes

### SetStrikeTimeMin {#lightning-arc-ebus-set-strike-time-min}

Sets the minimum amount of time that an arc is kept alive\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetStrikeTimeMin {#lightning-arc-ebus-get-strike-time-min}

Returns the minimum amount of time that an arc is kept alive\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetStrikeTimeMax {#lightning-arc-ebus-set-strike-time-max}

Sets the maximum amount of time that an arc is kept alive\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetStrikeTimeMax {#lightning-arc-ebus-get-strike-time-max}

Returns the maximum amount of time that an arc is kept alive\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetStrikeFadeOut {#lightning-arc-ebus-set-strike-fade-out}

Sets how long it takes for an arc to fade out\.

**Note**
Lumberyard completes this fade out internally by scaling the size to `0` rather than adjusting the transparency\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetStrikeFadeOut {#lightning-arc-ebus-get-strike-fade-out}

Returns how long it takes for an arc to fade out\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetStrikeSegmentCount {#lightning-arc-ebus-set-segment-count}

Sets the number of segments in an arc\.

Specify more segments to make the arcs appear more winding\. A **Lightning arc** component must have a minimum of `1` segment\. If you specify `0`, a warning appears and `1` is used instead\.

**Parameters**
Type: `AZ::u32`

**Return**
None

**Scriptable**
Yes

### GetStrikeSegmentCount {#lightning-arc-ebus-get-segment-count}

Returns the number of segments in an arc\.

**Parameters**
None

**Return**
Type: `AZ::u32`

**Scriptable**
Yes

### SetStrikePointCount {#lightning-arc-ebus-set-strike-point-count}

Sets the number of points for each segment\.

**Note**
Specify more points to increase the noise effect that is defined by the **Fuzziness** parameter\. A **Lightning arc** component must have a minimum of `1` point\. If you specify `0`, a warning appears and `1` is used instead\.

**Parameters**
Type: `AZ::u32`

**Return**
None

**Scriptable**
Yes

### GetStrikePointCount {#lightning-arc-ebus-get-strike-point-count}

Returns the number of points for each segment in an arc\.

**Parameters**
None

**Return**
Type: `AZ::u32`

**Scriptable**
Yes

### SetLightningDeviation {#lightning-arc-ebus-set-lightning-deviation}

Sets the amount of deviation applied to the arcs\.

**Note**
Specify lower values to make the arc appear more smooth\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetLightningDeviation {#lightning-arc-ebus-get-lightning-deviation}

Returns the amount of deviation applied to the arcs\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetLightningFuzziness {#lightning-arc-ebus-set-lightning-fuzziness}

Sets the amount of noise applied to the arcs\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetLightningFuzziness {#lightning-arc-ebus-get-lightning-fuzziness}

Returns the amount of noise applied to the arcs\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetLightningVelocity {#lightning-arc-ebus-set-lightning-velocity}

Sets how fast an arc drifts upwards after it emits\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetLightningVelocity {#lightning-arc-ebus-get-lightning-velocity}

Returns how fast an arc drifts upwards after it emits\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetBranchProbability {#lightning-arc-ebus-set-branch-probability}

Sets how likely a branch spawns off of an arc\.

A branch \(or child arc\) is an arc that is half the size and intensity of the parent arc\. A branch has the same emission point and target as its parent\.
+ A value of `0` means that branches do not spawn\.
+  A value of `0.5` means there is a 50% chance of spawning a branch\.
+  A value of `2.0` means there is a 100% chance of spawning two branches\.

For more information about setting the maximum number of branches, see [SetBranchMaxLevel](#lightning-arc-ebus-set-branch-max-level)\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetBranchProbablity {#lightning-arc-ebus-get-branch-probability}

Returns how likely a branch spawns off the parent arc\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetBranchMaxLevel {#lightning-arc-ebus-set-branch-max-level}

Sets the maximum number of branches that can spawn off the parent arc\.
+ A value of `0` means branches do not spawn, regardless of branch probability\.
+ A value of `3` means that between `0` and `3` branches can spawn, depending on the branch probability\.

**Parameters**
Type: `AZ::u32`

**Return**
None

**Scriptable**
Yes

### GetBranchMaxLevel {#lightning-arc-ebus-get-branch-max-level}

Returns the maximum number of branches allowed to spawn off the parent arc\.

**Parameters**
None

**Return**
Type: `AZ::u32`

**Scriptable**
Yes

### SetMaxStrikeCount {#lightning-arc-ebus-set-max-strike-count}

Sets how many arcs can be alive at one time from this **Lightning Arc** component; this includes parent and branch arcs\.

**Parameters**
Type: `AZ::u32`

**Return**
None

**Scriptable**
Yes

### GetMaxStrikeCount {#lightning-arc-ebus-get-max-strike-count}

Returns the maximum number of arcs that can be alive at one time from this **Lightning Arc** component\.

**Parameters**
None

**Return**
Type: `AZ::u32`

**Scriptable**
Yes

### SetBeamSize {#lightning-arc-ebus-set-beam-size}

Sets the width of the generated arcs\. Branch arcs be half this size\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetBeamSize {#lightning-arc-ebus-get-beam-size}

Returns the width of the generated arcs\.

**Parameters**
None

**Return**
Float

**Scriptable**
Yes

### SetBeamTexTiling {#lightning-arc-ebus-set-beam-tex-tiling}

Sets the texture tiling based on the world size of the arc beam\.
+ A value of `2.0` means that the texture wraps around twice for each meter\.
+ A value of `0.25` means that the texture wraps around four times for each meter\.

**Note**
Only the U coordinate of the texture map is affected by this parameter\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetBeamTexTiling {#lightning-arc-ebus-get-beam-tex-tiling}

Returns the texture tiling parameter for the arc beam\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetBeamTexShift {#lightning-arc-ebus-set-beam-tex-shift}

Sets how fast to move through textures in the arc's animation\.

**Note**
The U value of the texture coordinate moves at this specified rate\. The V value is automatically calculated to select the correct frame\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetBeamTexShift {#lightning-arc-ebus-get-beam-tex-shift}

Returns how fast to move through textures in the arc's animation\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetBeamTexFrames {#lightning-arc-ebus-set-beam-tex-frames}

Sets how many frames are in an arc's animation\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetBeamTexFrames {#lightning-arc-ebus-get-beam-tex-frames}

Returns the number of frames in an arc's animation\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### SetBeamTexFPS {#lightning-arc-ebus-set-beam-tex-fps}

Sets how many frames per second are in an arc's animation\.

**Parameters**
Type: Float

**Return**
None

**Scriptable**
Yes

### GetBeamTexFPS {#lightning-arc-ebus-get-beam-tex-fps}

Returns how many frames per second are in an arc's animation\.

**Parameters**
None

**Return**
Type: Float

**Scriptable**
Yes

### Request Bus Example Script {#lightning-arc-ebus-example-script}

```
function example:OnActivate()
    -- Send some events to a LightningArcComponent attached to the same entity as this script
    LightningArcComponentRequestBus.Event.Toggle(self.entityId)
    LightningArcComponentRequestBus.Event.SetDelayVariation(self.entityId, 0.4)
end
```

## EBus Notification Bus Interface {#lightning-arc-component-notification-bus-interface}

Use the following notification functions with the **Lightning Arc** component notification EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

### OnSpark {#lightning-arc-component-notification-bus-on-spark}

Notifies an event that triggers when the specified component fires a spark\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### Notification Bus Example Script {#lightning-arc-notification-bus-example-script}

```
function example:OnActivate()
    -- Listen for lightning arc notifications on the same entity to which this script is attached
    self.lightningArcHandler = LightningArcComponentNotificationBus.Connect(self, self.entityId)
end

function example:OnSpark()
    Debug.Log("On Spark Triggered")
end

function example:OnDeactivate()
    self.lightningArcHandler:Disconnect()
end
```