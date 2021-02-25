---
description: ' Use the Amazon Lumberyard Random Timed Spawner component to spawn a specified
  dynamic slice at a given interval. '
title: Random Timed Spawner
---
# Random Timed Spawner {#component-random-timed-spawner}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

You can use the **Random Timed Spawner** component to spawn a specified dynamic slice\. The component spawns the slice at a specified interval \(and random interval variation\) to a random position inside of a specified volume\.

The **Random Timed Spawner** component requires that the following components are also attached to the entity:
+ **[Spawner](/docs/user-guide/features/components/spawner.md)** component - Manages the spawning of the slice\.
+ **[Box Shape](/docs/user-guide/features/components/shapes.md)** or **[Cylinder Shape](/docs/user-guide/features/components/shapes.md)** component - Defines the volume of possible positions where the entities can spawn\.

With these components, you can control the random distribution that determines the random points inside the volume\.

Currently, you can specify how entities spawn in random positions with the following random distribution types:
+ Normal distribution
+ Uniform Real distribution

The **Random Timed Spawner** component is part of the LmbrCentral gem\. For more information, see [Add modular features and assets with Gems](/docs/user-guide/features/gems/_index.md)\.

**Example**
The following **Random Timed Spawner** component has the distribution type, Uniform Real\.

**Contents**
+ [Random Timed Spawner Properties](#component-random-timed-spawner-properties)
  + [Timing](#component-random-timed-spawner-timing)
+ [EBus Request Bus Interface](#component-random-timed-spawner-ebus-request)
  + [Enable](#random-timed-spawner-ebus-enabled)
  + [Disable](#random-timed-spawner-ebus-disable)
  + [Toggle](#random-spawner-component-ebus-toggle)
  + [IsEnabled](#random-timed-spawner-ebus-is-enabled)
  + [SetRandomDistribution](#random-timed-spawner-ebus-set-random-distribution)
  + [GetRandomDistribution](#random-timed-spawner-ebus-get-random-distribution)
  + [SetSpawnDelay](#random-timed-spawner-ebus-set-spawn-delay)
  + [GetSpawnDelay](#random-timed-spawner-ebus-get-spawn-delay)
  + [SetSpawnDelayVariation](#random-timed-spawner-ebus-set-spawn-delay-variation)
  + [GetSpawnDelayVariation](#random-timed-spawner-ebus-get-spawn-delay-variation)
  + [Notification Bus Example Script](#random-timed-spawner-notification-bus-example-script)

## Random Timed Spawner Properties {#component-random-timed-spawner-properties}

**Enabled**
Enables slices to spawn with the specified parameters\.
Default value: `True`

**Random Distribution**
Specify the random distribution type when the **Random Timed Spawner** component creates random spawn positions\.
Default value: Uniform Real
Valid values: Normal, Uniform Real

### Timing {#component-random-timed-spawner-timing}

**Spawn Delay**
Time between spawns, in seconds\.
If the **Enabled** parameter is `true`, a value of `2.0` means that every two seconds after the **Random Timed Spawner** component is activated, a spawn is triggered\.
Default value: `5.0`
Valid values: \-∞ to ∞

**Spawn Delay Variation**
Amount of random variation to apply to the spawn delay\.
For example, a value of `1.0` and a **Spawn Delay** value of `2.0` means that the range of possible spawn times is \(`2.0` \+/- `1.0`\) or between `1.0` and `3.0` seconds\.
Default value: `0`
Valid values: \-∞ to ∞

## EBus Request Bus Interface {#component-random-timed-spawner-ebus-request}

You can use this EBus to communicate to an entity with a **Random Timed Spawner** component attached\. The EBus is available at game run time and editing and can be accessed from C\+\+, Lua, and the **Script Canvas** editor\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/user-guide/features/engine/ebus/_index.md)\.

### Enable {#random-timed-spawner-ebus-enabled}

Starts random spawning\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### Disable {#random-timed-spawner-ebus-disable}

Stops random spawning\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### Toggle {#random-spawner-component-ebus-toggle}

Toggles random spawning\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### IsEnabled {#random-timed-spawner-ebus-is-enabled}

Returns whether the **Random Timed Spawner** component is spawning entities\.

**Parameters**
None

**Return**
Type: Boolean

**Scriptable**
Yes

### SetRandomDistribution {#random-timed-spawner-ebus-set-random-distribution}

Sets the type of random distribution that determines where the **Random Timed Spawner** component places the entities that spawn\.

**Parameters**
Type: `AZ::RandomDistributionType`

**Return**
None

**Scriptable**
Yes

### GetRandomDistribution {#random-timed-spawner-ebus-get-random-distribution}

Returns the type of random distribution for the **Random Timed Spawner** component\.

**Note**
In Lua, this value is returned as a number:
`0` - Normal distribution
`1` - Uniform Real distribution

**Parameters**
None

**Return**
Type: `AZ::RandomDistributionType`

**Scriptable**
Yes

### SetSpawnDelay {#random-timed-spawner-ebus-set-spawn-delay}

Sets the time between entity spawns, in seconds\.

**Parameters**
Type: Double

**Return**
None

**Scriptable**
Yes

### GetSpawnDelay {#random-timed-spawner-ebus-get-spawn-delay}

Returns the time between entity spawns, in seconds\.

**Parameters**
None

**Return**
Type: Double

**Scriptable**
Yes

### SetSpawnDelayVariation {#random-timed-spawner-ebus-set-spawn-delay-variation}

Sets the random variation in spawn delay, in seconds\.

The **Random Timed Spawner** component uses the specified value to calculate a random value that is added to the **Spawn Delay** parameter\.

For example, a **SpawnDelayVariation** value of `1.0` and a **Spawn Delay** value of `2.0` means that the range of possible spawn times is \(`2.0` \+/- `1.0`\) or between `1.0` and `3.0` seconds\.

For more information, see [Timing](#component-random-timed-spawner-timing)\.

**Parameters**
Type: Double

**Return**
None

**Scriptable**
Yes

### GetSpawnDelayVariation {#random-timed-spawner-ebus-get-spawn-delay-variation}

Returns the random variation in spawn delay, in seconds\.

**Parameters**
None

**Return**
Type: Double

**Scriptable**
Yes

### Notification Bus Example Script {#random-timed-spawner-notification-bus-example-script}

```
function example:OnActivate()
    RandomTimedSpawnerComponentRequestBus.Event.SetSpawnDelay(self.entityId, 0.5)
    RandomTimedSpawnerComponentRequestBus.Event.SetSpawnDelayVariation(self.entityId, 0.03)
end
```