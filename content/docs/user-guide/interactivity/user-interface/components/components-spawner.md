---
linkTitle: UI Spawner
description: ' Use the Open 3D Engine UI Spawner component to spawn a runtime dynamic slice at an entity''s location with an optional offset. '
title: UI Spawner Component
---

Use the **UISpawner** component to spawn a runtime dynamic [slice](/docs/user-guide/interactivity/user-interface/slices) \(\*.`dynamicslice`\) at an entity's location with an optional offset. In combination with scripting, you can use the **UISpawner** component to spawn any dynamic slice at any time and to spawn multiple instances of the same dynamic slice.

![UISpawner component with an example slice file.](/images/user-guide/interactivity/user-interface/components/ui-editor-components-uispawner.png)

## UISpawner Component Properties 

The **UISpawner** component has the following properties:

****Dynamic Slice****
Select the slice asset to spawn.

****Spawn on Activate****
If selected, spawns the selected slice upon activation.

## EBus Request Bus Interface 

Use the following request functions with the **UiSpawnerBus** EBus interface to communicate with other components of your game.

 For more information about using the event bus (EBus) interface, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).

### Spawn 

Spawns the UI slice specified in the component at the entity's location.

**Parameters**
None

**Return**
The slice instantiation ticket for this spawn.

**Scriptable**
Yes

### SpawnRelative 

Spawns the UI slice specified in the component at the entity's location with the specified relative offset.

**Parameters**
`Relative` - The offset position from the entity with the spawner component.

**Return**
The slice instantiation ticket for this spawn.

**Scriptable**
Yes

### SpawnViewport 

Spawns the slice specified in the component at the specified viewport position.

**Parameters**
`Pos` - The viewport position at which to spawn the slice.

**Return**
The slice instantiation ticket for this spawn.

**Scriptable**
Yes

### SpawnSlice 

Spawns the specified slice at the entity's location.

**Parameters**
`slice` - Specifies the slice asset to be spawned.

**Return**
The slice instantiation ticket for this spawn.

**Scriptable**
No

### SpawnSliceRelative 

Spawns the given slice at the entity's location with the relative offset.

**Parameters**
`slice` - Specifies the slice asset to be spawned.
`relative` - The offset position from the entity with the spawner component.

**Return**
The slice instantiation ticket for this spawn.

**Scriptable**
No

### SpawnSliceViewport 

Spawns the specified slice at the specified viewport position.

**Parameters**
`slice` - Specifies the slice asset to be spawned.
`pos` - The viewport position at which to spawn the slice.

**Return**
The slice instantiation ticket for this spawn.

**Scriptable**
Yes

## EBus Notification Bus Interface 

Use the following notification functions with the UiSpawnerNotificationBus EBus interface to communicate with other components of your game.

 For more information about using the event bus (EBus) interface, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).

### OnSpawnBegin 

Announces that the slice has been spawned, but entities have not yet been activated. [OnEntitySpawned](#onentityspawned) events are about to be dispatched.

**Parameters**
`ticket` - The slice instantiation ticket that is returned by the spawn function. These can be compared in order to know which spawn request it relates to.

**Scriptable**
Yes

### OnSpawnEnd 

Announces that a slice has been spawned. This function is called once for each spawn request. All [OnEntitySpawned](#onentityspawned) events have been dispatched.

**Parameters**
`ticket` - The slice instantiation ticket that is returned by the spawn function. These can be compared in order to know which spawn request it relates to.

**Scriptable**
Yes

### OnEntitySpawned 

Announces that an entity has been created during a spawn. This function is called once for each entity created while spawning a slice.

**Parameters**
`ticket` - The slice instantiation ticket that is returned by the spawn function. These can be compared in order to know which spawn request it relates to.
`spawnedEntity` - Specifies the ID of the spawned entity.

**Scriptable**
Yes

### OnEntitiesSpawned 

Provides the list of all entities that were created during a spawn. This function is called only once for each spawn request. The function is called after the [OnEntitySpawned](#onentityspawned) calls and before the [OnSpawnEnd](#onspawnend) call.

**Parameters**
`ticket` - The slice instantiation ticket that is returned by the spawn function. These can be compared in order to know which spawn request it relates to.
`spawnedEntities` - Specifies the IDs of the spawned entities.

**Scriptable**
Yes

### OnTopLevelEntitiesSpawned 

Provides the list of all top-level entities that were created during a spawn. This function is called only once for each spawn request. The function is called after the [OnEntitySpawned](#onentityspawned) calls and before the [OnSpawnEnd](#onspawnend) call.

Top-level entities are entities that do not have any parent within the slice. Typically, there is only one top-level entity for each slice.

**Parameters**
`ticket` - The slice instantiation ticket returned by the spawn function. These can be compared in order to know which spawn request it relates to.
`spawnedEntities` - Specifies the IDs of the spawned top-level entities.

**Scriptable**
Yes

### OnSpawnFailed 

Announces that a spawn request has failed.

**Parameters**
`ticket` - The slice instantiation ticket that is returned by the spawn function. These can be compared in order to know which spawn request it relates to.

**Scriptable**
Yes
