# Simple State<a name="component-simple-state"></a>

The **Simple State** component provides a simple state machine\. Each state is represented by a name and zero or more entities\. The entities are activated upon entering the state and deactivated upon exiting it\. A simple state component may be in NullState, which means no state is active\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-simple-state.png)

## Simple State Component Properties<a name="component-simple-state-properties"></a>

The **Simple State** component has the following properties:

**Initial state**  
The active state when the simple state component is first activated\.

**Reset on activate**  
If selected, simple state returns to the configured initial state when activated, and not the state held before deactivating\.

**States**  
The list of states on this simple state component\.

**State \(\[0\], \[1\], \[2\], etc\)**  
Includes a name for the state and a set of entities that are activated when the state is entered and deactivated when the state is exited\.

**Name**  
The name of this state\. Indicates the state to which to transition on the SetState API\.

**Entities**  
List of the entities referenced by this state\.

## EBus Request Bus Interface<a name="component-simple-state-ebusrequest"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### SetState<a name="simple-state-ebus-setstate"></a>

Sets the active state to the named state\.

**Parameters**  
`stateName`

## EBus Notification Bus Interface<a name="component-simple-state-ebusnotification"></a>

Use the following notification functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### OnStateChanged<a name="simple-state-ebus-onstatechanged"></a>

Notifies that the state has changed from state `oldName` to state `newName`\.

**Parameters**  
`oldName`  
`newName`

The following is an example of script using the **Request Bus Interface**\.

```
local simplestateexample =
{
    Properties =
    {
        TransitionInterval = 1.0,
        States = {"Houses", "Nope", "Lamps", "Tree", "HouseAndTree", "NoState"},
    }
}
 
function simplestateexample:OnActivate()
      
    self.TransitionCountDown = self.Properties.TransitionInterval
    self.StateIdx = 0
    self.tickBusHandler = TickBus.Connect(self)
    self.stateChangedHandler = SimpleStateComponentNotificationBus.Connect(self, self.entityId)
      
    Debug.Log("SimpleStateComponent activated for entity: " .. tostring(self.entityId.id))
end
 
function simplestateexample:OnDeactivate()
    self.tickBusHandler:Disconnect()
    self.stateChangedHandler:Disconnect()
end
 
function simplestateexample:OnTick(deltaTime, timePoint)
    self.TransitionCountDown = self.TransitionCountDown - deltaTime
    if (self.TransitionCountDown < 0.0) then
        SimpleStateComponentRequestBus.Event.SetState(self.entityId, self.Properties.States[self.StateIdx + 1])
        self.StateIdx = (self.StateIdx + 1) % table.getn(self.Properties.States)
        self.TransitionCountDown = self.Properties.TransitionInterval
    end
end
  
function simplestateexample:OnStateChanged(oldState, newState)
    Debug.Log("Old State: " .. (oldState or "NullState")  .. " => New State: " .. (newState or "NullState"))
end
 
return simplestateexample
```