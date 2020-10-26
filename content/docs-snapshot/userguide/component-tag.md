# Tag<a name="component-tag"></a>

Use the **Tag** component to apply one or more labels, or tags, to an entity such as **burning** or **player**\. You can use these tags to find or filter entities with particular traits\. For example, you can set a weapon to inflict double damage to entities tagged as **burning**\.

## EBuses – Request Bus Interface: TagGlobalRequestBus<a name="component-tag-ebusrequest-tagglobal"></a>

Use the following request function with the **TagGlobalRequestBus** EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### RequestTaggedEntities<a name="tag-ebus-requestraggedentities"></a>

Handlers respond if they have the tag \(listening on the tag's channel\)\. Use `AZ::EbusAggregateResults` to handle more than the first responder\.

**Parameters**  
None

**Return**  
const `AZ::EntityId`

**Scriptable**  
Yes

## EBuses – Request Bus Interface: TagRequestBus<a name="component-tag-ebusrequest-tagrequest"></a>

Use the following request functions with the **TagRequestBus** EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### HasTag<a name="tag-ebus-hastag"></a>

Returns true if the entity has the tag\.

**Parameters**  
const `Tag&`

**Return**  
bool

**Scriptable**  
Yes

### AddTag<a name="tag-ebus-addtag"></a>

Adds the tag to the entity if it didn't already have it\.

**Parameters**  
const `Tag&`

**Return**  
None

**Scriptable**  
Yes

### AddTags<a name="tag-ebus-addtags"></a>

Add a list of tags to the entity if it didn't already have them\.

**Parameters**  
const `Tags&`

**Return**  
None

**Scriptable**  
No

### RemoveTag<a name="tag-ebus-removetag"></a>

Removes a tag from the entity if it had it\.

**Parameters**  
const `Tag&`

**Return**  
None

**Scriptable**  
Yes

### RemoveTags<a name="tag-ebus-removetags"></a>

Removes a list of tags from the entity if it had them\.

**Parameters**  
const `Tags&`

**Return**  
None

**Scriptable**  
No

### GetTags<a name="tag-ebus-gettags"></a>

Gets the list of tags on the entity\.

**Parameters**  
None

**Return**  
const `Tags&`

**Scriptable**  
No

The following is an example of script using the **Request Bus Interface**\.

```
local enemies = TagGlobalRequestBus.Event.RequestTaggedEntities(Crc32("Enemy"));
 
local burning = TagComponentRequestBus.Event.HasTag(self.entityId, Crc32("Burning"));
```

## EBus – Notification Bus Interface: TagComponentNotificationsBus<a name="component-tag-notificationbus-tag-comp-notif-bus"></a>

Use the following request functions with the **TagComponentNotificationsBus** notification bus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### OnTagAdded<a name="tag-notbus-ontagadded"></a>

Notifies listeners about tags being added\.

**Parameters**  
const `Tag&` – Indicates the tag was added

**Return**  
None

**Scriptable**  
Yes

### OnTagRemoved<a name="tag-notbus-ontagremoved"></a>

Notifies listeners about tags being removed\.

**Parameters**  
const `Tag&` – Indicates the tag was removed

**Return**  
None

**Scriptable**  
Yes