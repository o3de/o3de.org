# Using EBuses in Lua<a name="lua-scripting-ces-using-ebuses"></a>

Components provide interfaces that allow scripts to send them information and receive notifications when certain actions take place\. Communication is established by creating two different objects in Lua: senders and handlers\. A sender or a handler is an interface to an [EBus](ebus-intro.md), a communication system used extensively in the Lumberyard Engine\. When a sender is created, it can call functions, which in turn send information to a component\. When a handler is created, the component calls certain functions that the Lua script defines\. These senders and handlers are created with an entity ID\. You can use the entity ID to communicate with components that are attached to entities other than the one the script itself is running on\. The main script table always provides a field called `entityId` that contains the ID of the entity to which the script is attached\. Other entity IDs can be passed to the script through the `Properties` interface\.

## Order of Component Activation<a name="scriptbind_entity-lua-scripting-ces-communicating-with-components-order-of-component-activation"></a>

Keep in mind the following points regarding the order of activation of Lua components:
+ Lua components are activated after all C\+\+ components have been activated\.
+ If an entity has multiple Lua components, there is no guarantee regarding which Lua component is activated first\.

## Communicating with Components<a name="lua-scripting-ces-communicating-with-components"></a>

When a Lua script creates a handler object, it notifies a component attached to an entity that it should call the script handler functions when certain events occur\. For example, in the first sample below, the script creates a [Spawner](component-spawner.md) notification bus handler when `OnActivate()` is called\. This tells the spawner component attached to the entity that has the script to call the `OnSpawnBegin()`, `OnSpawnEnd()`, and `OnEntitySpawned()` functions when the spawner instantiates a new [dynamic slice](dynamic-slices-what-is.md)\. Subsequently, the handler is explicitly disconnected and set back to nil in the `OnDeactivate` function\. This ensures that processing time is not wasted when the entity attached to the script isn't active\. As long as the entity is active, these functions are called by the spawner component at the appropriate time\.

The following code example shows a spawner component handler\.

```
local SpawnerScriptSample = { }

function SpawnerScriptSample:OnActivate()
    -- Register our handlers to receive notification from the spawner attached to this entity.
    if( self.spawnerNotiBusHandler == nil ) then
        self.spawnerNotiBusHandler = SpawnerComponentNotificationBus.CreateHandler(self, self.entityId)
    end
end

-- This handler is called when we start spawning a slice.
function SpawnerScriptSample:OnSpawnBegin(sliceTicket)
    -- Do something so we know if/when this is being called
    Debug.Log("Slice Spawn Begin")
end

-- This handler is called when we're finished spawning a slice.
function SpawnerScriptSample:OnSpawnEnd(sliceTicket)
    -- Do something so we know if/when this is being called
    Debug.Log("Slice Spawn End")
end

-- This handler is called whenever an entity is spawned.
function SpawnerScriptSample:OnEntitySpawned(sliceTicket, entityId)
    -- Do something so we know if/when this is being called
    Debug.Log("Entity Spawned: " .. tostring(entityId) )
end

function SpawnerScriptSample:OnDeactivate()
    -- Disconnect our spawner notificaton 
    if self.spawnerNotiBusHandler ~= nil then
        self.spawnerNotiBusHandler:Disconnect()
        self.spawnerNotiBusHandler = nil
    end
end

return SpawnerScriptSample
```

## Noncomponent Notifications<a name="lua-scripting-ces-non-component-notifications"></a>

Some event buses that are available to Lua are not associated with components\. For example, the system's [tick bus](component-entity-system-pg-tick-bus.md) is not a component bus and does not require an entity ID\. It provides both the amount of time that has passed since the last engine tick and the current time point\. To gain access to this information, write a script that implements the `OnTick()` function and creates the handler\. The handler receives notifications from the system whenever the engine ticks\.

The following example shows how to register with the tick bus\.

```
local TestScript = { }
function TestScript:OnActivate()
    -- Inform the tick bus that you want to receive event notifications
    self.tickBusHandler = TickBus.CreateHandler(self)
    self.tickBusHandler:Connect()
end

-- This callback is called every frame by the tick bus after this entity activates
function TestScript:OnTick(deltaTime, timePoint)
    -- Add script to be executed every frame here...
end

function TestScript:OnDeactivate()
    -- Inform the tick bus that you no longer want to receive notifications
    self.tickBusHandler:Disconnect()
end

return TestScript
```

**Note**  
Instead of calling `CreateHandler` and then calling `Connect` on the handler, you can use the Lua shortcut function `TickBus.Connect`\. The `Connect` function uses the following syntax to create a handler and automatically connect the handler to the bus\.   

```
handler = TickBus.Connect(handlerTable[, connectionId])
```

## Sending Events to a Component<a name="lua-scripting-ces-sending-events-to-a-component"></a>

In addition to receiving notifications from components, a script must sometimes exercise control over components\. Control is accomplished by sending events to components using the `Event` table and calling the functions implemented on it\. In the example script that follows, the **[Spawner](component-spawner.md)** component is sent an event that tells the component to spawn a dynamic slice by calling the `Spawn()` function\. The first argument to an `Event` function is always the ID of the listener that you send the event to; the remaining arguments follow\.

The following example shows how to send EBus events\.

```
local SpawnerScript = { }
function SpawnerScript:OnActivate()
    SpawnerComponentRequestBus.Event.Spawn(self.entityId)
end

return SpawnerScript
```

You can request information from some event sending functions that return values\. The next example script uses a `TransformBus` to get the current local transform of the entity and uses the `GetLocalTM()` function, which returns a transform object\. This object is stored in a variable in the main script table\. `TransformBus` is used again to reset the transform of the object to the identity\.

The following example shows how to use the transform bus\.

```
function samplescript:OnActivate()

    -- Retrieve the object's local transform and store it for later use
    self.myOldTransform = TransformBus.Event.GetLocalTM(self.entityId)

    -- Reset the object's local transform to the identity matrix
    TransformBus.Event.SetLocalTM(self.entityId, Transform.CreateIdentity())
end
```

## Communicating with Components Attached to Other Entities<a name="lua-scripting-ces-communicating-with-components-attached-to-other-entities"></a>

You can also send events and create handlers to communicate with components that are attached to other entities\. The following example defines a parent entity in the properties table and requests its transform\. This allows it to set its transform to that of another entity\.

```
local ParentScriptSample = {
    Properties = {
        ParentEntity = {default = EntityId()}
    }
}

function ParentScriptSample:OnActivate()
    if self.Properties.ParentEntity:IsValid() then
        self.entityBusHandler = EntityBus.Connect(self, self.Properties.ParentEntity)
    end
end

function ParentScriptSample:OnEntityActivated()
    local parentTransform = TransformBus.Event.GetLocalTM(self.Properties.ParentEntity)
    TransformBus.Event.SetLocalTM(self.entityId, parentTransform)
end

return ParentScriptSample
```

**Important**  
If you have a Lua script that is attached to an entity that needs to get information from another entity, your script must subscribe to the target entity's `OnEntityActivated` event\. Your script should wait for the target entity to be activated before requesting the relevant information\. Otherwise, your script might return nil\.

## Using AZStd::vector and AZStd::array<a name="lua-scripting-ces-using-azstd-vector-and-azstd-array"></a>

Vectors and arrays in Lua behave very simarly to tables, with a few limitations\. Both vector and array have the following features\.

**Length Operator `#`**  
You can obtain the length of a collection by prefixing the name of the collection with the length operator `#`, as in the following example\.

```
#myCollection
```

**Indexing \[\]**  
To obtain the elements in a collection, use indexing in square brackets as the following syntax shows\. Indexing is 1 based, just like Lua tables\.

```
myCollection[index]
```

`Vector` also has the following methods for mutating the collection\.

**push\_back**  
Use the `push_back` method to append elements to the vector, as in the following example\.

```
myCollection:push_back(5)
```

**pop\_back**  
Use the `pop_back` method to remove the last element of the vector, as in the following example\. 

```
myCollection:pop_back()
```

**clear**  
Use the `clear` method to remove all elements from the vector, as in the following example\.

```
myCollection:clear()
```

## Using AZStd::any<a name="lua-scripting-ces-using-azstd-any"></a>

You can pass any Lua primitive type excluding tables to any bus or function that takes `AZStd::any` as a parameter \(for example, `GameplayNotificationBus::OnEventBegin`\)\. You can also pass any type reflected from C\+\+ \(for example, vectors or `EntityId` values\)\. There is no syntax required to pass a value as an `any`—just call the bus or function\.

The following example shows the use of `AZStd::any`\.

```
GameplayNotificationBus.Broadcast.OnEventBegin(self.eventId, "The value I'd like to pass to the handler")
```