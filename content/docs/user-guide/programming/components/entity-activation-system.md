---
linkTitle: Entity Activation System
title: Understanding Entity Activation and the Activation Type System
description: Learn how to set Entity Active States, and define new Custom Activation Types.
weight: 900
---

An *entity* in **Open 3D Engine (O3DE)** is the most primordial element in the entire system. As O3DE is an [*entity-component system (ECS)* engine](overview), the *entity* is the core of how everything works.

An Entity has many purposes, but one is that it is the authority of whether it is active or not. As it processes changing its active state, it sets its components accordingly, reports its change of state, and handles bringing itself to a functional place in its new state. Outside systems rely on its state handling, and only instruct it to change, allowing it to handle it all itself.

## Activating and Deactivating an Entity
### Scripting and GameEntityContext
There are easy to use Script Canvas Nodes to handle Entity Activation: ActivateGameEntity and DeactivateGameEntity nodes.

(NODES)

Using C++, the easiest way to set an entitys active state is to use the Game Entity Context Component entity handling events.
- ActivateGameEntity
- DeactivateGameEntity

These, like the Script Canvas nodes, handle everything for you directly.

### Direct Entity Active State Control
If you wish to directly control an Entitys active state there are a few subtleties.
Direct Entity handling is only necessary in controlled, and systemic environments where you want direct command of the state changing stages and where you'll handle them.

The Entity Activation requires two steps to properly work.
- You need to change its desired state by using the `SetEntityActive` method.
- You then need to call its `ApplyEffectiveActiveState` method to make it actually process its new Active State and change to it accordingly.

The purpose of this segmentation is to allow systems to do many changes to an Entitys state, then once finalized apply it once. Removing any excessive update calls.

## How an Entity determines it's Active State
An entity, instead of having one setting of "Active/Inactive" now has a list of up to 32 active state flags.
By evaluating these many possible flags, an entity can determine if it's active: All flags are true (active), (111111...).
And determine if it is inactive: All or some flags are false (inactive), (110101...)

By using this "many-state" method of evaluating an Entitys active state, we are able to stack many outside forces that may want control over when an entity is active or inactive without overwriting the entities state before this potential system affected the Entity.

This purpose can be seen in the following examples.

### Entity Active type (Default)
The "Entity" active type layer is the default, local, entity state. This is the equivalent to "Active/Inactive" for the entity.
SetEntityActive simply changes that type directly within the Entity.

The Entity active type "index" on that row of 1's is the 0 position. This means if the Entity flags is "011111..." that means he entity directly should be inactive.

### Parent Activate type
Added through this system, we can now affect the entity using the "Parent" active type layer introduced by the [TransformComponent](/docs/user-guide/components/reference/transform/).
The "Parent" layer is registered dynamically to the Entity Active System, and then, using the Transforms Parent Hierarchy features, can dictate to descendent entities, whether or not one of their parents is active or inactive.

This drives the Transforms to set themselves to "Parent" inactive. As these are the two layers currently available form the O3DE engine natively, the entity state flags would look like this: "1011111...", as the next space to be registered to is the "1" index position.

### How the Entity Determines its "Effective Active State"
We can see now, with those two active types, that there are some possible combinations to determine an Entity's "Effective Active State":
- "11" is Entity becomes Active.
- "01" is Entity becomes Inactive because *it* is set inactive.
- "10" is Entity becomes Inactive because its *Parent* is set inactive.
- "00" is Entity becomes Inactive because *it* and its *Parent* is set inactive.

## Creating and Registering a Custom Activate Type
AzCore now comes with an Entity Active System Component, which handles the registration of Active Types and their index on the Entitys flag list.

The EntityActiveSystemBus: EntityActiveSystemRequestBus carries the events for registering and getting the active type index.

```C++
size_t GetActiveTypeIndexByName(AZStd::string typeName) const noexcept

size_t GetActiveTypeIndexById(AZ::Crc32 typeNameId) const noexcept

size_t RegisterEntityActiveTypeByName(AZStd::string typeName)

size_t RegisterEntityActiveType(AZ::Crc32 typeNameId)
```

You will notice that the Get Active Type, and Register Active Type events all return the index pertaining to your chosen type.

## Possible Future Active Types
Using this system, we can consider some other potential types that have unique purposes.
- **"LoD"** type could be used for LoD systems to enable toggling LoD's inside of itself while allowing a designer to toggle one of the LoD's off permanently and remove it from the LoD stack.
- **"Stream"** type could be used for world streaming systems that can control, entity by entity, what is active in the environment without any overriding of local entity state, or parent hierarchy state.

Regardless of the types registered we can trust that with this robust system, an entity can be highly controlled to be active when desired and inactive when desired.

Looking at the possible combinations to determine an Entity's "Effective Active State" with these new layers we can still see that the entity would work exactly as desired:
- "1111" is the entity active, its parent active, it as an LoD active, and active in the streaming space.
- "1010", "1100", "1001", etc. would be any possible factor determining that the entity isn't active by the system that controls those specific active types.