---
linkTitle: Using EBuses in Lua
title: Using EBuses in Lua
description: Write Lua scripts that use the EBus to communicate between components in Open 3D Engine.
toc: true
weight: 450
---

Components provide interfaces that allow scripts to send them information and receive notifications when certain actions take place. Communication is established by creating two different objects in Lua: senders and handlers. A sender or a handler is an interface to an [EBus](/docs/user-guide/programming/messaging/ebus), a communication system used extensively in the O3DE Engine. When a sender is created, it can call functions, which in turn send information to a component. When a handler is created, the component calls certain functions that the Lua script defines. These senders and handlers are created with an entity ID. You can use the entity ID to communicate with components that are attached to entities other than the one the script itself is running on. The main script table always provides a field called `entityId` that contains the ID of the entity to which the script is attached. Other entity IDs can be passed to the script through the `Properties` interface.

## Order of component activation 

Keep in mind the following points regarding the order of activation of Lua components:
+ Lua components are activated after all C++ components have been activated.
+ If an entity has multiple Lua components, there is no guarantee regarding which Lua component is activated first.

## Communicating with components 

When a Lua script creates a handler object in the `OnActivate` function, it notifies a component attached to an entity that it should call the script handler functions when certain events occur.  Subsequently, the handler is explicitly disconnected and set back to nil in the `OnDeactivate` function. This ensures that processing time is not wasted when the entity attached to the script isn't active. As long as the entity is active, functions are called by the component at the appropriate time.

You can request information from some event sending functions that return values. The following example script uses the `TransformBus` to get the current local transform of the entity and uses the `GetLocalTM()` function, which returns a transform object. This object is stored in a variable in the main script table. `TransformBus` is used again to reset the transform of the object to the identity.

The following example shows how to use the transform bus.

```lua
function samplescript:OnActivate()

    -- Retrieve the object's local transform and store it for later use
    self.myOldTransform = TransformBus.Event.GetLocalTM(self.entityId)

    -- Reset the object's local transform to the identity matrix
    TransformBus.Event.SetLocalTM(self.entityId, Transform.CreateIdentity())
end
```

## Communicating with components attached to other entities 

You can also send events and create handlers to communicate with components that are attached to other entities. The following example defines a parent entity in the properties table and requests its transform. This allows it to set its transform to that of another entity.

```lua
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

{{< important >}}
If you have a Lua script that is attached to an entity that needs to get information from another entity, your script must subscribe to the target entity's `OnEntityActivated` event. Your script should wait for the target entity to be activated before requesting the relevant information. Otherwise, your script might return nil.
{{< /important >}}

## Using AZStd::vector and AZStd::array 

Vectors and arrays in Lua behave very simarly to tables, with a few limitations. Both vector and array have the following features.

**Length Operator `#`**
You can obtain the length of a collection by prefixing the name of the collection with the length operator `#`, as in the following example.

```lua
#myCollection
```

**Indexing \[\]**
To obtain the elements in a collection, use indexing in square brackets as the following syntax shows. Indexing is 1 based, just like Lua tables.

```lua
myCollection[index]
```

`Vector` also has the following methods for mutating the collection.

**push\_back**
Use the `push_back` method to append elements to the vector, as in the following example.

```lua
myCollection:push_back(5)
```

**pop\_back**
Use the `pop_back` method to remove the last element of the vector, as in the following example.

```lua
myCollection:pop_back()
```

**clear**
Use the `clear` method to remove all elements from the vector, as in the following example.

```lua
myCollection:clear()
```

## Using AZStd::any 

You can pass any Lua primitive type excluding tables to any bus or function that takes `AZStd::any` as a parameter \(for example, `GameplayNotificationBus::OnEventBegin`\). You can also pass any type reflected from C++ \(for example, vectors or `EntityId` values\). There is no syntax required to pass a value as an `any`-just call the bus or function.

The following example shows the use of `AZStd::any`.

```lua
GameplayNotificationBus.Broadcast.OnEventBegin(self.eventId, "The value I'd like to pass to the handler")
```
