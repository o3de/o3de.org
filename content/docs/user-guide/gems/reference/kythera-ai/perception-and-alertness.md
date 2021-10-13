---
linkTitle: Perception and Alertness
title: Spatial Query System
description: Overview of Kythera AI's Perception and Alertness systems
weight: 1100
toc: true
---

Kythera AI's **Perception** systems are responsible for receiving sensory input and determining what entities an agent is aware of, and its state of **Alertness** as a result.

## Perception

To perceive entities in the world, an AI has several stimulus systems that receive input from the world in different ways and pass this on to a central perception system that keeps track of them. There are currently five types of stimulus in Kythera:

*   **Visual** - Physical raycasts done in the world to determine line of sight to targets
*   **Audio** - Sound events such as weapon fire, engine noise, and explosions, with a sound radius that will make them be picked up by any AI within that radius
*   **Tactile** - Collision events such as being hit by a bullet or explosion, or colliding with an object
*   **Group** - A pseudo-radio/communication stimulus where AIs notify other AIs in their perception group of a target
*   **Unspecified** - A generic stimulus type that can be used for things like radars and scanners, where there is no obvious physical analog

Once an entity is registered with the perception of an AI, it can fall into three different perceived levels:

*   Partially perceived
*   Fully perceived
*   Memory

Each entity has a Perceived level from 0.0 to 1.0, where 0.0 is not perceived at all and 1.0 is fully perceived. An entity's Perceived level increases every time a stimulus event occurs in one of the stimulus systems and is passed on to the Perception system.

Each stimulus type is tracked independently for each perceived entity, with its own 0.0 to 1.0 range. The maximum of these values becomes the effective Perceived level for that entity. While each stimulus type is tracked independently, the score for each stimulus event is modified by the number of different stimulus types that have registered perception for that entity. So effectively, if an entity is being perceived through multiple stimulus types, the perceived levels for each stimulus will rise faster, simulating the multiple stimuli reinforcing each other.

The Perceived level of each stimulus type decays each frame, so if the entity stops being perceived, its Perceived level will soon drop back down to 0.0. When all stimulus types have fallen to 0.0, the entity will be removed from perception.

If an entity has a value less than 1.0 it is in the **partially perceived** state. If it reaches 1.0, it will switch to the **fully perceived** state, which is typically when we consider the entity as a valid target to attack (though this isn't required). If an entity is fully perceived but stops receiving more perception stimuli, it will go into a temporary **obscured** state, the length of which is determined by the profile of the AI doing the perception. It is still considered fully perceived so its effective perceived level will stay at 1.0 during this period. If it is not perceived again before the Obscured timer runs out, it will be considered a **memory target** and the perceived level of the entity will gradually drop back down to 0.0.

When an entity is a memory target, perception information about the position of the entity is no longer updated, and it is remembered as being at the last perceived position. Also, while in this mode, each stimulus input will be multiplied by a configurable amount, which is intended to make it much faster than normal.. This is to model the fact that the AI is already alerted to the target and is looking for it, so should perceive it much more quickly than in the case when it's not yet been fully perceived.

### Profile Parameters

All profile parameters for perception are contained in a sub-blackboard of the profile blackboard called `Perception`. The basic structure with all currently defined parameters is as follows:

```
<Perception type="bb">
    <MaxObscuredTime type="float">1.0</MaxObscuredTime>
    <MaxMemoryTime type="float">30.0</MaxMemoryTime>
    <DecayRate type="float">0.2</DecayRate>
    <MemoryMultiplier type="float">5.0</MemoryMultiplier>
    <Visual type="bb">
       <ObjectTagQuery type="string">ANX:Ship</ObjectTagQuery>
       <RaycastRate type="float">1.000000</RaycastRate>
       <MaxDistance type="float">20000</MaxDistance>  
       <PrimaryFOV type="float">90.0</PrimaryFOV>
       <SecondaryFOV type="float">160.0</SecondaryFOV>
       <SecondaryFOVWeight type="float">5.0</SecondaryFOVWeight>      
       <BasePerceptionScale type="float">5.0</BasePerceptionScale>
    </Visual>
    <Audio type="bb">
       <BasePerceptionScale type="float">2.0</BasePerceptionScale>
    </Audio>
    <Group type="bb">
       <SignalRange type="float">100000</SignalRange>
       <AllowPropagation type="bool">false</AllowPropagation>
       <RegularUpdates type="bool">false</RegularUpdates>
    </Group></Perception>
```

A brief description of each parameter is as follows:

*   Perception (sub-blackboard)
    
    *   `MaxObscuredTime` - Maximum time in seconds between an entity becoming obscured (i.e. it was fully perceived, but we stop getting new stimuli from it) and its becoming a memory target. Default: 0.25f
        
    *   `MaxMemoryTime` - Maximum time in seconds before a memory target will be forgotten. Default: 10.0f
    *   `DecayRate` - Amount of Perceived level that will decay each second for each stimulus type. Incoming stimulus must be higher than this for perception level to increase, otherwise it will eventually drop to 0.0. Default: 0.2f
    *   `MemoryMultiplier` - Multiplier applied to all stimulus for a memory target. This can be used to allow memory targets to be reacquired as fully perceived faster. Default: 1.0f
    *   Visual (sub-blackboard)
        *   `ObjectTagQuery` - Name of the tag to filter AI entities with to determine which entities are valid targets to try and track with vision raycasts. Default: `Kyt:Character`
        *   `RaycastRate` - How often, in seconds, to send out a new raycast test for each entity potentially in view. Default: 1.0f
        *   `MaxDistance` - Maximum range of vision raycasts. Default in CryEngine: 50.0f; default in Unreal: 5000.0f
        *   `PrimaryFOV` - Angle in degrees of the primary view cone. Default: 90.0f
        *   `SecondaryFOV` - Angle in degrees of the secondary view cone. Default: 160.0f
        *   `SecondaryFOVWeight` - Value to divide scores by when entity is in the secondary cone but not the primary, to effectively make perception slower. Default: 5.0f
        *   `BasePerceptionScale` - Amount to multiply all visual stimulus scores by. Default: 1.0f
    *   Audio (sub-blackboard)
        *   `BasePerceptionScale` - Amount to multiply all audio stimulus scores by. Default: 1.0f
    *   Group (sub-blackboard)
        *   `SignalRange` - If greater than zero, this will limit sending signal to all AI in the Perception group within the given range from the signal sender. Default: -1.0f
        *   `AllowPropagation` - If true, AI that learn of a target via group signals will resend the signal to other AI in the group. This is only really useful if also using the SignalRange parameter. Default: false
        *   `RegularUpdates` - If true, all members of a group will only be considered to be fully perceiving a target if at least one member of the group is fully perceiving it via a non-group stimulus. The target will be forgotten if all group members are no longer directly perceiving it.
        *   `GroupCategoryName` - If provided, this will be used as the group category to send perception signals to. Default: `Perception`

## Alertness

Agents have four levels of alertness:

*   `Idle` - has not detected any targets
*   `Suspicious` - has partially perceived a target, but not yet fully perceived
*   `Alert` - a target is fully perceived
*   `Cautious` - was previously alert, but target has been lost and is now a memory

An agent's level of alertness is tied to whether it has any perceived targets, and if so, what their visibility level is.

For flying agents, only `Idle` and `Alert` states are used &ndash; when they perceive an object, they move from Idle to Alert without passing through Suspicious. When a target is lost, flying agents have a `MaxObscuredTime` which keeps them in the `Alert` state for a set time, after which they will immediately drop to `Idle`.

Ground-based agents use all four alertness states. The amount of time that an agent will spend in the `Cautious` state depends on the memory length configured in its profile, as explained in the Perception section above. The agent remains `Cautious` until it either loses its memory target and drops back to `Idle`, or receives more stimulus from the target and switches back into `Alert`.

`Suspicious` is a little more complex. Once an object has reached a certain Perceived level (currently 0.2), the agent switches from `Idle` to `Suspicious`. This allows a very brief visual stimulus to be ignored. However, once the agent is `Suspicious`, we generally want it to spend a minimum time in this state before returning to `Idle` if it loses sight of the target. This time can be used for the agent to respond to losing sight of a target, for example by looking towards the target or saying something, without looking glitchy if it only happens for a fraction of a second. This minimum time is specified in the agent's profile as `MinSuspiciousTime`.

The agent's profile can also specify a maximum decay time for the `Suspicious` state. This is not a maximum time that it will spend in this state, but rather the time it takes to go from `Suspicious` to `Idle` if an object was partially perceived and then lost. This is effectively the "cooldown" time before the agent forgets about the potential threat. If a target is repeatedly moving in and out of the agent's vision, it could stay `Suspicious` indefinitely if the Perceived level never reaches 1.0, but never falls to 0.0 either.

### Profile Parameters

All profile parameters for Alertness are contained within a sub-blackboard of the profile blackboard called **Alertness**. The basic structure with all currently defined parameters is as follows:

```
<Alertness type="bb">
   <MinSuspiciousTime type="float">5.0</MinSuspiciousTime>
   <MaxSuspiciousDecayTime type="float">10.0</MaxSuspiciousDecayTime>
</Alertness>
```

A brief description of each parameter is as follows:

*   Alertness (sub-blackboard)
    
    *   **MinSuspiciousTime** - Minimum time in seconds to be in **Suspicious** state before being allowed to drop back to idle. Default: 5.0f
        
    *   **MaxSuspiciousDecayTime** - Maximum time in seconds to decay from **Suspicious** back to **Idle** (i.e. in the case where we got to a Perceived level _just_ below 1.0 and then decayed down to 0.0. Default: 10.0f