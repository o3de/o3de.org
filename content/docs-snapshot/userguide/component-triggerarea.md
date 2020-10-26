# Trigger Area<a name="component-triggerarea"></a>

The **Trigger Area** component provides generic triggering services by using [Shape](component-shapes.md) components as its bounds\. 

**To add a trigger component**

1.  Create a new entity, or add the **Trigger Area** component to an existing entity\. 

1.  In the Entity Inspector, click **Add Component**, then select **Trigger Area**\. 

   Entity Inspector displays a message, "This component is missing a required component service and has been disabled\.

1. Click **Add Required Component**, then click one of the shape components that appears\.

   The shape component you select defines the boundaries for the trigger\.

1. If you want to change the boundaries of your shape component, simply remove the existing shape component, and then add a different shape component\.

**Note**  
The **Trigger Area** component does not work with the PhysX system\. 

## Trigger Area Component Properties<a name="component-triggerarea-properties"></a>

The **Trigger Area** component has the following properties:Network Bindable

Network bindable components are synchronized over the network\.

**Bind To Network**  
When selected, synchronizes component across the network\.Activation

**Trigger once**  
If selected, the trigger deactivates after the first trigger event\.

**Activated by**  
Select whether trigger is activated by **All entities**, which allows any entity to trigger the area, or by **Specific Entities**, which allows you to select specific entities\.Tag filters

**RequiredTags**  
A list of tags that are required for an entity to trigger this area\.

**ExcludedTags**  
A list of tags that exclude an entity from triggering this area\.

## EBus Request Bus Interface<a name="component-triggerarea-ebusrequest"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### AddRequiredTag<a name="triggerarea-ebus-addrequiredtag"></a>

Adds a required tag to the activation filtering criteria of this component\. Results in a reevaluation of the trigger\. Entities inside that no longer satisfy tag criteria are ejected\.

**Parameters**  
const `Tag&`  
`requiredTag` – *Tag to be added*

**Return**  
None

**Scriptable**  
Yes

### RemoveRequiredTag<a name="triggerarea-ebus-removerequiredtag"></a>

Removes a required tag from the activation filtering criteria of this component\. Results in a reevaluation of the trigger\. Entities inside that no longer satisfy tag criteria are ejected\.

**Parameters**  
const `Tag&`  
`requiredTag` – *Tag to be removed*

**Return**  
None

**Scriptable**  
Yes

### AddExcludedTag<a name="triggerarea-ebus-addexcludedtag"></a>

Adds an excluded tag to the activation filtering criteria of this component\. Results in a reevaluation of the trigger\. Entities inside that no longer satisfy tag criteria are ejected\.

**Parameters**  
const `Tag&`  
`excludedTag` – *Tag to be added*

**Return**  
None

**Scriptable**  
Yes

### RemoveExcludedTag<a name="triggerarea-ebus-removeexcludedtag"></a>

Removes an excluded tag from the activation filtering criteria of this component\. Results in a reevaluation of the trigger\. Entities inside that no longer satisfy tag criteria are ejected\.

**Parameters**  
const `Tag&` **excludedTag** – *Tag to be removed*

**Return**  
None

**Scriptable**  
Yes

## EBus Notification Bus Interface<a name="component-triggerarea-ebusnotification"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

The **Trigger** component sends notifications to:
+ Entities listening on the TriggerAreaNotificationBus for the entity with the trigger on it\.
+ Entities listening on the TriggerAreaEntityNotificationBus for the entity that enters or exits the trigger\.

### TriggerAreaNotificationBus<a name="triggerarea-ebus-triggerareanotificationbus"></a>

This bus allows the game to listen for events associated with a particular trigger\. Notifies of all the entities that enter and exit this trigger\.

#### OnTriggerAreaEntered<a name="triggerarea-ebus-triggerareanotificationbus-ontriggerareaentered"></a>

 Notifies listeners when `enteringEntityId` enters this trigger\. 

**Parameters**  
`enteringEntityId` – *ID of entity that has entered this trigger*

**Return**  
None

**Scriptable**  
Yes

#### OnTriggerAreaExited<a name="triggerarea-ebus-triggerareanotificationbus-ontriggerareaexited"></a>

 Notifies listeners when `enteringEntityId` exits this trigger\. 

**Parameters**  
`enteringEntityId` – *ID of entity that has exited this trigger*

**Return**  
None

**Scriptable**  
Yes

### TriggerAreaEntityNotificationBus<a name="triggerarea-ebus-triggerareaentitynotificationbus"></a>

This bus allows the game to listen for trigger\-related events associated with a particular entity\. Notifies every time the player enters or exits any trigger\.

#### OnEntityEnteredTriggerArea<a name="triggerarea-ebus-triggerareaentitynotificationbus-onentityenteredtriggerarea"></a>

 Sent when the entity enters `triggerID`\. 

**Parameters**  
`triggerId` – *ID of entity that the trigger is on*

**Return**  
None

**Scriptable**  
Yes

#### OnEntityExitedTriggerArea<a name="triggerarea-ebus-triggerareaentitynotificationbus-onentityexitedtriggerarea"></a>

 Sent when the entity exits `triggerID`\. 

**Parameters**  
`triggerId` – *ID of entity that the trigger is on*

**Return**  
None

**Scriptable**  
Yes

The following is an example of script using the EBus interface\.

```
local triggerexample =
{
    Properties =
    {
    }
}
 
function triggerexample:OnActivate()
    self.triggerHandler = TriggerAreaEntityNotificationBus.Connect(self, self.entityId)
end
 
function triggerexample:OnDeactivate()
    self.triggerHandler:Disconnect()
end
 
function triggerexample:OnEntityEnteredTriggerArea(entityId)
    Debug.Log("------- TRIGGERED.")
end
 
return triggerexample
```