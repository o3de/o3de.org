---
description: ' Use the Open 3D Engine Spawner component to spawn a design-time or runtime
  dynamic slice at an entity''s location. '
title: Spawner
---

{{< preview-migrated >}}

Use the **Spawner** component to spawn a design\-time or runtime dynamic slice \(`*.dynamicslice`\) at an entity's location with an optional offset\.

**Contents**
+ [Spawner Component Properties](#component-spawner-properties)
+ [EBus Request Bus Interface](#component-spawner-spawnercomponentrequestbus)
  + [Spawn](#spawner-ebus-spawn)
  + [SpawnRelative](#spawner-ebus-spawn-relative)
  + [SpawnAbsolute](#spawner-ebus-spawn-absolute)
  + [SpawnSlice](#spawner-ebus-spawn-slice)
  + [SpawnSliceRelative](#spawner-ebus-spawn-slice-relative)
  + [SpawnSliceAbsolute](#spawner-ebus-spawn-slice-absolute)
  + [DestroySpawnedSlice](#spawner-ebus-destroy-spawned-slice)
  + [DestroyAllSpawnedSlices](#spawner-ebus-destroy-all-spawned-slices)
  + [GetCurrentlySpawnedSlices](#spawner-ebus-get-currently-spawned-slices)
  + [HasAnyCurrentlySpawnedSlices](#spawner-ebus-has-any-currently-spawned-slices)
  + [GetCurrentEntitiesFromSpawnedSlice](#spawner-ebus-get-current-entities-from-spawned-slice)
  + [GetAllCurrentlySpawnedEntities](#spawner-ebus-get-all-currently-spawned-entities)
+ [EBus Notification Bus Interface](#component-spawner-notification-bus)
  + [OnSpawned](#spawner-ebus-onspawned)
  + [OnSpawnBegin](#spawner-ebus-on-spawn-begin)
  + [OnSpawnEnd](#spawner-ebus-on-spawn-end)
  + [OnEntitySpawned](#spawner-ebus-on-entity-spawned)
  + [OnEntitiesSpawned](#spawner-ebus-on-entities-spawned)
  + [OnSpawnedSliceDestroyed](#spawner-ebus-on-spawned-slice-destroyed)

## Spawner Component Properties {#component-spawner-properties}

The **Spawner** component has the following properties:

**Dynamic slice**
The slice to spawn\.

**Spawn on activate**
If selected, the component spawns the selected slice, upon activation\.
Default value: `False`

**Destroy on deactivate**
If selected, the component destroys any slices that it spawned, upon deactivation\.
Default value: `False`

## EBus Request Bus Interface {#component-spawner-spawnercomponentrequestbus}

Use the following request functions with the **Spawner** component EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/user-guide/engine/ebus/_index.md)\.

A `SliceInstantiationTicket` is the ID for the slice that spawns\. You can use this ID with the **Spawner** component to interact with the entities that came from the spawned slice\. For example, you can use the [DestroySpawnedSlice](#spawner-ebus-destroy-spawned-slice) function to destroy all entities from that spawned slice\.

### Spawn {#spawner-ebus-spawn}

Spawns the selected slice at the entity's location\.

**Parameters**
None

**Return**
The ID of the spawning slice\.
Type: `SliceInstantiationTicket`

**Scriptable**
Yes

### SpawnRelative {#spawner-ebus-spawn-relative}

Spawns the selected slice at the entity's location with the specified relative `offset`\.

**Parameters**
`offset` - The coordinates to offset the slice when it spawns\.
Type: Transform

**Return**
The ID of the spawning slice\.
Type: `SliceInstantiationTicket`

**Scriptable**
Yes

### SpawnAbsolute {#spawner-ebus-spawn-absolute}

Spawns the provided `slice` at the specified world transform\.

**Parameters**
`world` - The world coordinates\.
Type: Transform

**Return**
The ID of the spawning slice\.
Type: `SliceInstantiationTicket`

**Scriptable**
Yes

### SpawnSlice {#spawner-ebus-spawn-slice}

Spawns the selected `slice` at the entity's location\.

**Parameters**
`slice` - The dynamic slice asset\.

**Return**
The ID of the spawning slice\.
Type: `SliceInstantiationTicket`

**Scriptable**
No

### SpawnSliceRelative {#spawner-ebus-spawn-slice-relative}

Spawns the selected `slice` at the entity's location with the specified relative `offset`\.

**Parameters**
`slice` - The dynamic slice asset\.
`offset` - The coordinates to offset the slice when it spawns\.
Type: Transform

**Return**
The ID of the spawning slice\.
Type: `SliceInstantiationTicket`

**Scriptable**
No

### SpawnSliceAbsolute {#spawner-ebus-spawn-slice-absolute}

Spawns the selected `slice` at the specified world transform\.

**Parameters**
`slice` - The dynamic slice asset\.
`world` - The world coordinates\.
Type: Transform

**Return**
The ID of the spawning slice\.
Type: `SliceInstantiationTicket`

**Scriptable**
No

### DestroySpawnedSlice {#spawner-ebus-destroy-spawned-slice}

Destroys all entities from the slice that spawned\. If the slice is not finished spawning, the slice is canceled\. The **Spawner** component can destroy only slices that it spawned\.

**Parameters**
`ticket` - The ID of the spawned slice\.
Type: `SliceInstantiationTicket`

**Return**
None

**Scriptable**
Yes

### DestroyAllSpawnedSlices {#spawner-ebus-destroy-all-spawned-slices}

Destroys all entities that the **Spawner** component spawned\. Slices that are not finished spawning are canceled\.

**Parameters**
None

**Return**
None

**Scriptable**
Yes

### GetCurrentlySpawnedSlices {#spawner-ebus-get-currently-spawned-slices}

Returns the IDs for spawned slices that are not yet destroyed\. A slice is considered destroyed when all its entities are destroyed\. The function also includes slices that have not yet finished spawning\. This function returns only slices spawned by this **Spawner** component\.

**Parameters**
None

**Return**
Type: Vector of `SliceInstantiationTickets`\.

**Scriptable**
Yes

### HasAnyCurrentlySpawnedSlices {#spawner-ebus-has-any-currently-spawned-slices}

Returns whether this **Spawner** component has spawned any slices, including any slices that are not yet destroyed\. A slice is considered destroyed when all its entities are destroyed\. Returns `true` if any slices have not yet finished spawning\.

**Parameters**
None

**Return**
Type: Boolean

**Scriptable**
Yes

### GetCurrentEntitiesFromSpawnedSlice {#spawner-ebus-get-current-entities-from-spawned-slice}

Returns the IDs of current entities from a slice that spawned\. Note that spawning is not instant; if a slice is still spawning, then the entities are not returned\. If an entity has been destroyed since it was spawned, its ID is not returned\. This function can query only slices spawned by this **Spawner** component\.

**Parameters**
`ticket` - The ID of the spawned slice\.
Type: `SliceInstantiationTicket`

**Return**
Type: Vector of entity IDs\.

**Scriptable**
Yes

### GetAllCurrentlySpawnedEntities {#spawner-ebus-get-all-currently-spawned-entities}

Returns the IDs of all existing entities spawned by this **Spawner** component\. Spawning is not instant; if a slice is still spawning, then entities are not returned\. If an entity has been destroyed since it was spawned, its ID is not returned\.

**Parameters**
None

**Return**
Type: Vector of entity IDs\.

**Scriptable**
Yes

## EBus Notification Bus Interface {#component-spawner-notification-bus}

Use the following EBus notification functions with the **Spawner** component to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/user-guide/engine/ebus/_index.md)\.

### OnSpawned {#spawner-ebus-onspawned}

Notifies that a slice finished spawning\.

**Parameters**
`spawnedEntities` - Entities that the **Spawner** component spawned\.
Type: Vector of entity IDs\.

**Return**
None

**Scriptable**
Yes

### OnSpawnBegin {#spawner-ebus-on-spawn-begin}

Notifies that the slice is beginning to spawn its entities\.

**Parameters**
`ticket` - The ID of the spawned slice\.
Type: `SliceInstantiationTicket`

**Return**
None

**Scriptable**
Yes

### OnSpawnEnd {#spawner-ebus-on-spawn-end}

Notifies that the slice finished spawning its entities\.

**Parameters**
`ticket` - The ID of the spawned slice\.
Type: `SliceInstantiationTicket`

**Return**
None

**Scriptable**
Yes

### OnEntitySpawned {#spawner-ebus-on-entity-spawned}

Notifies that an entity spawned\.

**Parameters**
`ticket` - The ID of the spawned slice\.
Type: `SliceInstantiationTicket`
`spawnedEntity` - The entity ID\.

**Return**
None

**Scriptable**
Yes

### OnEntitiesSpawned {#spawner-ebus-on-entities-spawned}

Notifies that the entities spawned from a slice and sends a list of the entity IDs\.

**Parameters**
`ticket` - The ID of the spawned slice\.
Type: `SliceInstantiationTicket`
`spawnedEntities` - The IDs of the entities\.
Type: A vector of entity IDs\.

**Return**
None

**Scriptable**
No

### OnSpawnedSliceDestroyed {#spawner-ebus-on-spawned-slice-destroyed}

Notifies when a slice that spawned is destroyed\. This occurs when all entities from a spawn are destroyed or when the slice fails to spawn\.

**Parameters**
`ticket` - The ID of the spawned slice\.
Type: `SliceInstantiationTicket`

**Return**
None

**Scriptable**
Yes
