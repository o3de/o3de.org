# Input Component EBus Interface<a name="component-input-event-bus-interface"></a>

Input subcomponents are objects that have the same lifetime as components and must override `Activate` and `Deactivate`\.

```
//////////////////////////////////////////////////////////////////////////
// InputSubComponent
void Activate(const AZ::InputEventNotificationId& channelId) override;
void Deactivate(const AZ::InputEventNotificationId& channelId) override;
```

You can use the `GameplayNotificationBus` to work with the `InputSubComponent`\. For more information, see [GameplayNotifications](component-entity-system-gameplay-bus.md#component-entity-system-gameplay-bus-gameplaynotifications)\.

You can find example Lua scripts and code in the `lumberyard_version\dev\Gems\StartingPointInput\Assets\Scripts\Input` directory\.

## Input Event Notification Bus<a name="component-input-event-notification-bus"></a>

Use the following notification functions with the event notification bus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### <a name="component-input-event-notification-input"></a>


****  

| Request Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| OnPressed |  Event sent when an input surpasses the threshold\.  | Float | None | Yes | 
| OnHeld |  Event sent when an input continues to surpass the threshold\.  | Float | None | Yes | 
| OnReleased |  Event sent when an input no longer surpasses the threshold\.  | Float | None | Yes | 

**Example**  

```
local held =
{
    Properties =
    {
        IncomingInputEventName = "",
        OutgoingGameplayEventName = "",
    },
}
 
function held:OnActivate()
    local inputBusId = InputEventNotificationId(self.Properties.IncomingInputEventName)
    self.inputBus = InputEventNotificationBus.Connect(self, inputBusId)
end
 
  
function held:OnHeld(floatValue)
    GameplayNotificationBus.Event.OnEventUpdating(GameplayNotificationId(self.entityId, self.Properties.OutgoingGameplayEventName), floatValue)
end
 
function held:OnReleased(floatValue)
    GameplayNotificationBus.Event.OnEventEnd(GameplayNotificationId(self.entityId, self.Properties.OutgoingGameplayEventName), floatValue)
end
 
function held:OnDeactivate()
    self.inputBus:Disconnect()
end
 
return held
```

## Input Request Bus<a name="component-input-request-bus"></a>

Use the following functions with the input request bus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.


****  

| Request Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| PushContext |  Pushes a new context onto the stack, which becomes the active context\.  | String | None | Yes | 
| PopContext |  Removes the top context from the input context stack\.  | None | None | Yes | 
| PopAllContexts |  Clears the context stack, and the active context becomes the empty string: `""`  | None | Empty string | Yes | 
| GetCurrentContext |  Returns the context at the top of the stack\. If the stack is empty, returns: `""`  | None | String | Yes | 

**Example Input Contexts**  
You can use the **Input contexts** parameter to specify what context asset binding is available\. For example, you can switch contexts so that when a character is under water, the input events are different than when the character is on the ground\.  
For example, for the **Input** component, you can specify **Input contexts**, such as an empty string, `"under water`", and `"run"`\. When you add a **Lua** component to the entity, you can specify the different **Input contexts**, `"under water"`, and `"run"` in your Lua script\.  
This means that when your Lua script runs, the Lua script tells the **Input** component which context to use\.  

```
local foo
{
    Properties =
    {
        Context {default = "", description = "A context to push onto the input stack. Like console, or UI, or turret, under water, etc."},
    }
}
  
function foo:OnActivate()
    -- by default the context is blank ""
    InputRequestBus.Broadcast.PushContext(self.Properties.Context) -- context stack is now 1)user defined property
    InputRequestBus.Broadcast.PushContext("under water") -- context stack is now 1)user defined property, 2) "under water"
    Debug.Log(InputRequestBus.Broadcast.GetCurrentContext()) -- prints "under water"
    InputRequestBus.Broadcast.PushContext("run") -- context stack is now 1)use defined property, 2) "under water", 3) "run"
    InputRequestBus.Broadcast.PopContext() -- context stack is now 1)user defined property, 2) "under water"
    InputRequestBus.Broadcast.PopAllContexts() context stack is now empty
end
  
return foo
```