# Behavior Tree<a name="component-behavior-tree"></a>

Use the **Behavior Tree** component to load and run a [Modular Behavior Tree Node Reference](ai-scripting-mbt-nodes.md) for the attached entity\.

## Behavior Tree Component Properties<a name="component-behavior-tree-properties"></a>

The **Behavior Tree** component has the following properties:

**Behavior tree asset**  
Select an `XML` file that contains a behavior tree definition\.

**Enabled initially**  
When selected, the behavior tree is loaded and activated with the entity\.

## EBus Request Bus Interface<a name="component-behavior-tree-ebusrequest"></a>

Use the following request functions with the event bus \(EBus\) interface, `BehaviorTreeComponentRequestBus`, to communicate with other components of your game\.

For more information about using the EBus interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### StartBehaviorTree<a name="navigation-ebus-startbehaviortree"></a>

Starts an inactive behavior tree associated with this entity\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### StopBehaviorTree<a name="navigation-ebus-stopbehaviortree"></a>

Stops an active behavior tree associated with this entity\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### GetVariableNameCrcs<a name="navigation-ebus-getvariablenamecrcs"></a>

Gets a list of all `crc32s` of the variable names\.

**Parameters**  
None

**Return**  
`AZStd::vector<AZ::Crc32>`

**Scriptable**  
Yes

### GetVariableValue<a name="navigation-ebus-getvariablevalue"></a>

Gets the value associated with a variable\.

**Parameters**  
`AZ::Crc32 variableNameCrc`

**Return**  
`bool`

**Scriptable**  
Yes

### SetVariableValue<a name="navigation-ebus-setvariablevalue"></a>

Sets the value associated with a variable\.

**Parameters**  
`AZ::Crc32 variableNameCrc`  
bool `newValue`

**Return**  
None

**Scriptable**  
Yes

The following is an example of script using the **Request Bus Interface**\.

```
local behaviortreescript =
{
    Properties =
    {
        Target = EntityId(),
    },
}
   
function behaviortreescript:OnActivate()
    BehaviorTreeComponentRequestBus.Event.StartBehaviorTree(self.entityId)
    BehaviorTreeComponentRequestBus.Event.SetVariableValue(self.entityId, Crc32("HasTarget"), self.Properties.Target:IsValid())
end
 
return behaviortreescript
```