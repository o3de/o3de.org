---
description: ' Use the Gameplay Bus to end contextual messages between the visual
  scripting, scripting, and code parts of your game '
slug: component-entity-system-gameplay-bus
title: Gameplay Bus
---
# Gameplay Bus<a name="component-entity-system-gameplay-bus"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

The gameplay bus alerts gameplay systems that an event has occurred\. You can use the bus to send contextual messages between the visual scripting, scripting, and code parts of your game in a generic and extensible way\.

The gameplay bus passes an `AZStd::any`, a class that uses type erasure to hold any C\+\+ reflected type or any Lua primitive except for tables \(string, number, Boolean, etc\.\)\. It includes mechanisms for type safety to ensure that it returns the same type that it is passed\. In Lua, the type can be inspected if it has been exposed to the behavior context through the `typeid()` function, which uses the `AZ_RTTI` system\. 

**Example**

```
function MyComponent:OnEventBegin(param)
    if typeid(param) == typeid(Uuid) then
        -- param is a Uuid
    elseif typeid(param) == typeid(Vector3) then
        -- param is a Vector3
    end
end
```

## GameplayNotificationId<a name="component-entity-system-gameplay-bus-gameplaynotificationid"></a>

The `GameplayNotificationId` is the type used as the ID for the gameplay bus\. Its syntax is as follows\.

```
GameplayNotificationId(const AZ::EntityId& entityChannel, AZ::Crc32 actionNameCrc, const AZ::Uuid& payloadType)
```

This function takes the `entityChannel`, `actionNameCrc`, and `payloadType` parameters and creates a unique ID that you can use to communicate with the bus\.

### entityChannel<a name="component-entity-system-gameplay-bus-entitychannel"></a>

When you write your events, choose the ID of an entity channel that makes sense in the context of your game\. Components are automatically aware of the following two entity IDs, which you can use for channels\. These IDs do not require an entity reference\.

1. The component's own entity ID\. To obtain it, call `GetEntityId().`

1. The default `AZ::EntityId()`\.

To communicate directly to a specific entity, use `GetEntityId()`\. To communicate indirectly to a generic audience, use `AZ::EntityId()`\.

### actionNameCrc<a name="component-entity-system-gameplay-bus-actionnamecrc"></a>

You can pass the `actionNameCrc` parameter as a string or as the `AZ::Crc32` of that string when you construct the ID\. This parameter should be the name of the event that gives context to the event data\.

### payloadType<a name="component-entity-system-gameplay-bus-payloadtype"></a>

Use the `payloadType` parameter to specify the type that is sent or received\. This parameter is required starting in Lumberyard version 1\.12\.

## GameplayNotifications<a name="component-entity-system-gameplay-bus-gameplaynotifications"></a>

The `GameplayNotifications` class contains the gameplay bus type traits\. It establishes the `GameplayNotificationId` as the bus ID\. It defines the following events\.

```
void OnEventBegin(const AZStd::any& value)
```

```
void OnEventUpdate(const AZStd::any& value)
```

```
void OnEventEnd(cosnt AZStd::any& value)
```

## Script Examples<a name="component-entity-system-gameplay-bus-script-examples"></a>

The Lua script examples in this section illustrate the use of `GameplayNotificationBus` to control what happens when an entity enters and then exits lava\.

1\. The following example implements the `OnActivate` function when the entity enters lava\.

```
local InLavaBehavior ={
    Properties =
    {
    },
}

function InLavaBehavior:OnActivate()
    local gameplayId = GameplayNotificationId(self.entityId, "InLava")
    self.gameplayBus = GameplayNotificationBus.CreateHandler(self, inputBusId)
end
```

2\. The following example implements the `OnEventBegin` function to start an animation associated with the event\.

```
function InLavaBehavior:OnEventBegin(floatValue)
    local animInfo = AnimatedLayer("LavaHotFootDance", 0, true, 1.0, 0.0);
    SimpleAnimationComponentRequestBus.Event.StartAnimation(self.entityId, animInfo)

    -- tell the HUD to transition the screen effect to "In Lava"
    local gameplayId = GameplayNotificationId(EntityId(), "TransitionScreenEffect")
    GameplayNotificationBus.Event.OnEventBegin(gameplayId, "In Lava")
end
```

3\. The following example implements the `OnEventUpdating` function to update a health component regarding the status of the entity\.

```
function InLavaBehavior:OnEventUpdating(floatValue)
    -- alert the health component (this gameplay component is an example only) that we are taking damage, it can handle any death transitions
    HealthComponentBus.Event.TakeDamage(self.entityId, floatValue)
end
```

4\. The following example implements the `OnEventEnd` function to end the animation and return status to normal\.

```
function InLavaBehavior:OnEventEnd(floatValue)
    local animInfo = AnimatedLayer("Idle", 0, true, 1.0, 0.0);
    SimpleAnimationComponentRequestBus.Event.StartAnimation(self.entityId, animInfo)

    -- tell the HUD to transition the screen effect to "Normal"
    local gameplayId = GameplayNotificationId(EntityId(), "TransitionScreenEffect")
    GameplayNotificationBus.Event.OnEventBegin(gameplayId, "Normal")
end
```

5\. The following example implements the `OnDeactivate` function to disconnect from the gameplay bus\.

```
function InLavaBehavior:OnDeactivate()
    self.gameplayBus:Disconnect()
end
 
return InLavaBehavior
```