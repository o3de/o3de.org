# Spawner<a name="component-spawner"></a>

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

## Spawner Component Properties<a name="component-spawner-properties"></a>

The **Spawner** component has the following properties:

**Dynamic slice**  
The slice to spawn\.

**Spawn on activate**  
If selected, the component spawns the selected slice, upon activation\.  
Default value: `False`

**Destroy on deactivate**  
If selected, the component destroys any slices that it spawned, upon deactivation\.  
Default value: `False`

## EBus Request Bus Interface<a name="component-spawner-spawnercomponentrequestbus"></a>

Use the following request functions with the **Spawner** component EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

A `SliceInstantiationTicket` is the ID for the slice that spawns\. You can use this ID with the **Spawner** component to interact with the entities that came from the spawned slice\. For example, you can use the [DestroySpawnedSlice](#spawner-ebus-destroy-spawned-slice) function to destroy all entities from that spawned slice\.

### Spawn<a name="spawner-ebus-spawn"></a>

Spawns the selected slice at the entity's location\.

**Parameters**  
None

**Return**  
The ID of the spawning slice\.  
Type: `SliceInstantiationTicket`

**Scriptable**  
Yes

### SpawnRelative<a name="spawner-ebus-spawn-relative"></a>

Spawns the selected slice at the entity's location with the specified relative `offset`\.

**Parameters**  
`offset` – The coordinates to offset the slice when it spawns\.   
Type: Transform

**Return**  
The ID of the spawning slice\.  
Type: `SliceInstantiationTicket`

**Scriptable**  
Yes

### SpawnAbsolute<a name="spawner-ebus-spawn-absolute"></a>

Spawns the provided `slice` at the specified world transform\.

**Parameters**  
`world` – The world coordinates\.  
Type: Transform

**Return**  
The ID of the spawning slice\.  
Type: `SliceInstantiationTicket`

**Scriptable**  
Yes

### SpawnSlice<a name="spawner-ebus-spawn-slice"></a>

Spawns the selected `slice` at the entity's location\.

**Parameters**  
`slice` – The dynamic slice asset\.

**Return**  
The ID of the spawning slice\.  
Type: `SliceInstantiationTicket`

**Scriptable**  
No

### SpawnSliceRelative<a name="spawner-ebus-spawn-slice-relative"></a>

Spawns the selected `slice` at the entity's location with the specified relative `offset`\.

**Parameters**  
`slice` – The dynamic slice asset\.  
`offset` – The coordinates to offset the slice when it spawns\.  
Type: Transform

**Return**  
The ID of the spawning slice\.  
Type: `SliceInstantiationTicket`

**Scriptable**  
No

### SpawnSliceAbsolute<a name="spawner-ebus-spawn-slice-absolute"></a>

Spawns the selected `slice` at the specified world transform\.

**Parameters**  
`slice` – The dynamic slice asset\.  
`world` – The world coordinates\.  
Type: Transform

**Return**  
The ID of the spawning slice\.  
Type: `SliceInstantiationTicket`

**Scriptable**  
No

### DestroySpawnedSlice<a name="spawner-ebus-destroy-spawned-slice"></a>

Destroys all entities from the slice that spawned\. If the slice is not finished spawning, the slice is canceled\. The **Spawner** component can destroy only slices that it spawned\.

**Parameters**  
`ticket` – The ID of the spawned slice\.  
Type: `SliceInstantiationTicket`

**Return**  
None

**Scriptable**  
Yes

### DestroyAllSpawnedSlices<a name="spawner-ebus-destroy-all-spawned-slices"></a>

Destroys all entities that the **Spawner** component spawned\. Slices that are not finished spawning are canceled\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### GetCurrentlySpawnedSlices<a name="spawner-ebus-get-currently-spawned-slices"></a>

Returns the IDs for spawned slices that are not yet destroyed\. A slice is considered destroyed when all its entities are destroyed\. The function also includes slices that have not yet finished spawning\. This function returns only slices spawned by this **Spawner** component\.

**Parameters**  
None

**Return**  
Type: Vector of `SliceInstantiationTickets`\.

**Scriptable**  
Yes

### HasAnyCurrentlySpawnedSlices<a name="spawner-ebus-has-any-currently-spawned-slices"></a>

Returns whether this **Spawner** component has spawned any slices, including any slices that are not yet destroyed\. A slice is considered destroyed when all its entities are destroyed\. Returns `true` if any slices have not yet finished spawning\.

**Parameters**  
None

**Return**  
Type: Boolean

**Scriptable**  
Yes

### GetCurrentEntitiesFromSpawnedSlice<a name="spawner-ebus-get-current-entities-from-spawned-slice"></a>

Returns the IDs of current entities from a slice that spawned\. Note that spawning is not instant; if a slice is still spawning, then the entities are not returned\. If an entity has been destroyed since it was spawned, its ID is not returned\. This function can query only slices spawned by this **Spawner** component\.

**Parameters**  
`ticket` – The ID of the spawned slice\.  
Type: `SliceInstantiationTicket`

**Return**  
Type: Vector of entity IDs\.

**Scriptable**  
Yes

### GetAllCurrentlySpawnedEntities<a name="spawner-ebus-get-all-currently-spawned-entities"></a>

Returns the IDs of all existing entities spawned by this **Spawner** component\. Spawning is not instant; if a slice is still spawning, then entities are not returned\. If an entity has been destroyed since it was spawned, its ID is not returned\.

**Parameters**  
None

**Return**  
Type: Vector of entity IDs\.

**Scriptable**  
Yes

## EBus Notification Bus Interface<a name="component-spawner-notification-bus"></a>

Use the following EBus notification functions with the **Spawner** component to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### OnSpawned<a name="spawner-ebus-onspawned"></a>

Notifies that a slice finished spawning\.

**Parameters**  
`spawnedEntities` – Entities that the **Spawner** component spawned\.  
Type: Vector of entity IDs\.

**Return**  
None

**Scriptable**  
Yes

### OnSpawnBegin<a name="spawner-ebus-on-spawn-begin"></a>

Notifies that the slice is beginning to spawn its entities\.

**Parameters**  
`ticket` – The ID of the spawned slice\.  
Type: `SliceInstantiationTicket`

**Return**  
None

**Scriptable**  
Yes

### OnSpawnEnd<a name="spawner-ebus-on-spawn-end"></a>

Notifies that the slice finished spawning its entities\.

**Parameters**  
`ticket` – The ID of the spawned slice\.  
Type: `SliceInstantiationTicket`

**Return**  
None

**Scriptable**  
Yes

### OnEntitySpawned<a name="spawner-ebus-on-entity-spawned"></a>

Notifies that an entity spawned\.

**Parameters**  
`ticket` – The ID of the spawned slice\.  
Type: `SliceInstantiationTicket`  
`spawnedEntity` – The entity ID\.

**Return**  
None

**Scriptable**  
Yes

### OnEntitiesSpawned<a name="spawner-ebus-on-entities-spawned"></a>

Notifies that the entities spawned from a slice and sends a list of the entity IDs\.

**Parameters**  
`ticket` – The ID of the spawned slice\.  
Type: `SliceInstantiationTicket`  
`spawnedEntities` – The IDs of the entities\.  
Type: A vector of entity IDs\.

**Return**  
None

**Scriptable**  
No

### OnSpawnedSliceDestroyed<a name="spawner-ebus-on-spawned-slice-destroyed"></a>

Notifies when a slice that spawned is destroyed\. This occurs when all entities from a spawn are destroyed or when the slice fails to spawn\.

**Parameters**  
`ticket` – The ID of the spawned slice\.  
Type: `SliceInstantiationTicket`

**Return**  
None

**Scriptable**  
Yes