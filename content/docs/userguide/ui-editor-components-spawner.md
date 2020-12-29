# UISpawner Component<a name="ui-editor-components-spawner"></a>

Use the **UISpawner** component to spawn a runtime dynamic [slice](ui-editor-working-slices.md) \(\*\.`dynamicslice`\) at an entity's location with an optional offset\. In combination with scripting, you can use the **UISpawner** component to spawn any dynamic slice at any time and to spawn multiple instances of the same dynamic slice\.

![\[UISpawner component with an example slice file.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-uispawner.png)

**Contents**
+ [Example UISpawner Component](#ui-spawner-component-example)
+ [UISpawner Component Properties](#ui-editor-components-spawner-properties)
+ [EBus Request Bus Interface](#ui-editor-components-spawner-ebus)
  + [Spawn](#ui-editor-components-spawner-ebus-spawn)
  + [SpawnRelative](#ui-editor-components-spawner-ebus-spawnrelative)
  + [SpawnViewport](#ui-editor-components-spawner-ebus-spawnviewport)
  + [SpawnSlice](#ui-editor-components-spawner-ebus-spawnslice)
  + [SpawnSliceRelative](#ui-editor-components-spawner-ebus-spawnslicerelative)
  + [SpawnSliceViewport](#ui-editor-components-spawner-ebus-spawnsliceviewport)
+ [EBus Notification Bus Interface](#ui-editor-components-spawner-notification-bus)
  + [OnSpawnBegin](#ui-editor-components-spawner-notification-bus-onspawnbegin)
  + [OnSpawnEnd](#ui-editor-components-spawner-notification-bus-onspawnend)
  + [OnEntitySpawned](#ui-editor-components-spawner-notification-bus-onentityspawned)
  + [OnEntitiesSpawned](#ui-editor-components-spawner-notification-bus-onentitiesspawned)
  + [OnTopLevelEntitiesSpawned](#ui-editor-components-spawner-notification-bus-ontoplevelentitiesspawned)
  + [OnSpawnFailed](#ui-editor-components-spawner-notification-bus-on-spawn-failed)

## Example UISpawner Component<a name="ui-spawner-component-example"></a>

You can view a canvas with the **UISpawner** component in Samples Project\. For more information, see [Samples Project](sample-project-samples.md)\.

**To view an example canvas with a UISpawner component**

1. For Samples Project, choose **File**, **Open**, **UI**, **UiFeatures**\.

1. To start the game, press **Ctrl\+G**\.

1. Choose **Components**, **Dynamic Components**, **Spawner**\. You can see an example of a simple button spawner and a more complex radio button spawner\.

1. To exit the game, press **Esc**\.

You can also view the example canvases in the **UI Editor**\.

**To view the canvases**

1. In Lumberyard Editor, choose **Tools**, **UI Editor**\.

1. Navigate to the `lumberyard_version\dev\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Spawner` directory\.

1. Select a file and click **Open**\.

## UISpawner Component Properties<a name="ui-editor-components-spawner-properties"></a>

The **UISpawner** component has the following properties:

****Dynamic Slice****  
Select the slice asset to spawn\.

****Spawn on Activate****  
If selected, spawns the selected slice upon activation\.

## EBus Request Bus Interface<a name="ui-editor-components-spawner-ebus"></a>

Use the following request functions with the **UiSpawnerBus** EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### Spawn<a name="ui-editor-components-spawner-ebus-spawn"></a>

Spawns the UI slice specified in the component at the entity's location\.

**Parameters**  
None

**Return**  
The slice instantiation ticket for this spawn\.

**Scriptable**  
Yes

### SpawnRelative<a name="ui-editor-components-spawner-ebus-spawnrelative"></a>

Spawns the UI slice specified in the component at the entity's location with the specified relative offset\.

**Parameters**  
`Relative` – The offset position from the entity with the spawner component\.

**Return**  
The slice instantiation ticket for this spawn\.

**Scriptable**  
Yes

### SpawnViewport<a name="ui-editor-components-spawner-ebus-spawnviewport"></a>

Spawns the slice specified in the component at the specified viewport position\.

**Parameters**  
`Pos` – The viewport position at which to spawn the slice\.

**Return**  
The slice instantiation ticket for this spawn\.

**Scriptable**  
Yes

### SpawnSlice<a name="ui-editor-components-spawner-ebus-spawnslice"></a>

Spawns the specified slice at the entity's location\.

**Parameters**  
`slice` – Specifies the slice asset to be spawned\.

**Return**  
The slice instantiation ticket for this spawn\.

**Scriptable**  
No

### SpawnSliceRelative<a name="ui-editor-components-spawner-ebus-spawnslicerelative"></a>

Spawns the given slice at the entity's location with the relative offset\.

**Parameters**  
`slice` – Specifies the slice asset to be spawned\.  
`relative` – The offset position from the entity with the spawner component\.

**Return**  
The slice instantiation ticket for this spawn\.

**Scriptable**  
No

### SpawnSliceViewport<a name="ui-editor-components-spawner-ebus-spawnsliceviewport"></a>

Spawns the specified slice at the specified viewport position\.

**Parameters**  
`slice` – Specifies the slice asset to be spawned\.  
`pos` – The viewport position at which to spawn the slice\.

**Return**  
The slice instantiation ticket for this spawn\.

**Scriptable**  
Yes

## EBus Notification Bus Interface<a name="ui-editor-components-spawner-notification-bus"></a>

Use the following notification functions with the UiSpawnerNotificationBus EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### OnSpawnBegin<a name="ui-editor-components-spawner-notification-bus-onspawnbegin"></a>

Announces that the slice has been spawned, but entities have not yet been activated\. [OnEntitySpawned](#ui-editor-components-spawner-notification-bus-onentityspawned) events are about to be dispatched\.

**Parameters**  
`ticket` – The slice instantiation ticket that is returned by the spawn function\. These can be compared in order to know which spawn request it relates to\.

**Scriptable**  
Yes

### OnSpawnEnd<a name="ui-editor-components-spawner-notification-bus-onspawnend"></a>

Announces that a slice has been spawned\. This function is called once for each spawn request\. All [OnEntitySpawned](#ui-editor-components-spawner-notification-bus-onentityspawned) events have been dispatched\. 

**Parameters**  
`ticket` – The slice instantiation ticket that is returned by the spawn function\. These can be compared in order to know which spawn request it relates to\.

**Scriptable**  
Yes

### OnEntitySpawned<a name="ui-editor-components-spawner-notification-bus-onentityspawned"></a>

Announces that an entity has been created during a spawn\. This function is called once for each entity created while spawning a slice\.

**Parameters**  
`ticket` – The slice instantiation ticket that is returned by the spawn function\. These can be compared in order to know which spawn request it relates to\.  
`spawnedEntity` – Specifies the ID of the spawned entity\.

**Scriptable**  
Yes

### OnEntitiesSpawned<a name="ui-editor-components-spawner-notification-bus-onentitiesspawned"></a>

Provides the list of all entities that were created during a spawn\. This function is called only once for each spawn request\. The function is called after the [OnEntitySpawned](#ui-editor-components-spawner-notification-bus-onentityspawned) calls and before the [OnSpawnEnd](#ui-editor-components-spawner-notification-bus-onspawnend) call\. 

**Parameters**  
`ticket` – The slice instantiation ticket that is returned by the spawn function\. These can be compared in order to know which spawn request it relates to\.  
`spawnedEntities` – Specifies the IDs of the spawned entities\.

**Scriptable**  
Yes

### OnTopLevelEntitiesSpawned<a name="ui-editor-components-spawner-notification-bus-ontoplevelentitiesspawned"></a>

Provides the list of all top\-level entities that were created during a spawn\. This function is called only once for each spawn request\. The function is called after the [OnEntitySpawned](#ui-editor-components-spawner-notification-bus-onentityspawned) calls and before the [OnSpawnEnd](#ui-editor-components-spawner-notification-bus-onspawnend) call\.

Top\-level entities are entities that do not have any parent within the slice\. Typically, there is only one top\-level entity for each slice\.

**Parameters**  
`ticket` – The slice instantiation ticket returned by the spawn function\. These can be compared in order to know which spawn request it relates to\.  
`spawnedEntities` – Specifies the IDs of the spawned top\-level entities\.

**Scriptable**  
Yes

### OnSpawnFailed<a name="ui-editor-components-spawner-notification-bus-on-spawn-failed"></a>

Announces that a spawn request has failed\.

**Parameters**  
`ticket` – The slice instantiation ticket that is returned by the spawn function\. These can be compared in order to know which spawn request it relates to\.

**Scriptable**  
Yes