description: ' See the following AI Modular Behavior Tree (MBT) nodes for flying vehicles
  in &ALYlong;. '
slug: ai-mbt-nodes-flying
title: Helicopter AI MBT Nodes
---
# Helicopter AI MBT Nodes<a name="ai-mbt-nodes-flying"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

The following flying vehicle AI Modular Behavior Tree nodes are supported\.

## Hover node<a name="ai-mbt-nodes-hover"></a>

Used to let a flying agent hover at its current position\. 

**Parameters**

None\.

**Behavior**

This node never finishes by itself and will continue to hover the agent until it is forced to terminate\.

**Example**

```
<Hover />
```

## FlyShoot node<a name="ai-mbt-nodes-flyshoot"></a>

Used to let a flying agent shoot at its attention target, when possible from its current position\. If the secondary weapon system is used, then the node will only open fire if the weapons are deemed to be able to hit close enough to the target\. Otherwise normal firing rules are applied\.

**Parameters**
+ **useSecondaryWeapon**: 1 if the secondary weapon system should be used \(these are often rocket launchers\); 0 if not 

  Default value: 0

**Behavior**

This node never finishes by itself and the agent will continue shoot until it is forced to terminate\.

**Example**

```
<FlyShoot useSecondaryWeapon="1"/>
```

## Fly node<a name="ai-mbt-nodes-fly"></a>

Used to let an agent fly around by following a path\. Paths should be assigned to the agent via a flow graph\.

Upon arrival, the `ArrivedCloseToPathEnd` and `ArrivedAtPathEnd` events are emitted\.

**Parameters**
+ **desiredSpeed**: The desired speed to move along the path in meters/second\.

  Default value: 15\.0
+ **pathRadius**: The radius of the path in meters\. The agent will try to stay within this distance from the line segments of the path\.

  Default value: 1\.0
+ **lookAheadDistance**: How far long the path, in meters, to look ahead for generating "attractor points" to fly to\. 

  Default value: 3\.0
+ **decelerateDistance**: When nearing the end of the path, the agent will start to decelerate at the specified distance in meters\. 

  Default value: 10\.0
+ **maxStartDistanceAlongNonLoopingPath**: When linking up with a non\-looping path, this is the maximum distance in meters that the node is allowed to scan ahead to find the closest point to the path where to start at\. This can be useful, for example, to prevent the agent from snapping to the path at a position that is seemingly closer but is actually behind a wall after a U\-turn\.

  Default value: 30\.0
+ **loopAlongPath**: 1 if the agent should follow the path in an endless loop; 0 if not\.

  Default value: 0
+ **startPathFromClosestLocation**: 1 if the agent should start following the path at its closest position; 0 if it should start following it from the very first path waypoint\. 

  Default value: 0
+ **pathEndDistance**: The distance towards the end of the path at which the node should start sending some arrival notification events\. 

  Default value: 1\.0
+ **goToRefPoint**: 1 if the current reference point should be appended to the end of the path; 0 if not\.

  Default value: 0

**Behavior**
+ **Success**: If the agent arrived at the end of the path\.
+ **Failure**: If no valid path was assigned to the agent\.

**Example**

```
<Fly lookaheadDistance="25.0" pathRadius="10.0" decelerateDistance="20.0" pathEndDistance="1" desiredSpeed="15" maxStartDistanceAlongNonLoopingPath="30" loopAlongPath="0" goToRefPoint="1" startPathFromClosestLocation="1" />
```

 


**Outputs**  

| When | Lua variable | Overridden XML tag | 
| --- | --- | --- | 
| Node activation | Helicopter\_Loop | loopAlongPath | 
| Node activation | Helicopter\_StartFromClosestLocation | startPathFromClosestLocation | 
| Each node tick | Helicopter\_Speed | desiredSpeed | 

## FlyForceAttentionTarget node<a name="ai-mbt-nodes-flyforceattentiontarget"></a>

Used to keep forcing an attention target onto a flying vehicle\. The attention target that should be enforced is acquired during each tick of the node from the `Helicopter_ForcedTargetId` Lua script variable\.

**Parameters**

None\.

**Behavior**

This node never finishes by itself and keeps forcing the attention target onto the agent\. When the node is deactivated again, the `ForceAttentionTargetFinished` event is emitted\.

**Example**

```
<FlyForceAttentionTarget />
```

## FlyAimAtCombatTarget node<a name="ai-mbt-nodes-flyaimcombattarget"></a>

Used to aim a flying agent at its target, taking into account special aiming adjustments for weapons\.

**Parameters**

None\.

**Behavior**

This node never finishes by itself and keeps forcing agent to rotate its body towards its attention target\.

**Example**

```
<FlyAimAtCombatTarget />
```

## WaitAlignedWithAttentionTarget node<a name="ai-mbt-nodes-waitattentiontarget"></a>

Used to wait until the agent is facing its attention target\.

**Parameters**
+ **toleranceDegrees**: The maximum allowed angle between the attention target and the forward direction of the agent, in the range of 0\.0 to 180\.0 degrees\. 

  Default value: 20\.0

**Behavior**
+ **Success**: If the angle between the agent's forward direction and its attention target is small enough\.
+ **Failure**: If the agent has no attention target\.

**Example**

```
<WaitAlignedWithAttentionTarget toleranceDegrees="40" />
```

## HeavyShootMortar node<a name="ai-mbt-nodes-heavyshootmortar"></a>

Used to control the shooting of a heavy mortar\. The precondition and initialization of the weapon as well the reselection of the primary weapon is simplified and centralized\.

**Parameters**
+ **to**: \(Optional\) Defines the target of the shooting\. Possible values: Target or RefPoint\.

  Default value: Target
+ **firemode**: \(Optional\) The Heavy X\-Pak \(or Mortar\) has two different firing modes\. Possible values are Charge and BurstMortar\.

  Default value: Charge
+ **timeout**: \(Optional\) Defines the maximum time in seconds that the node can try to perform the shooting\. 

  Default value: 5\.0
+ **aimingTimeBeforeShooting**: \(Optional\) Defines the time in seconds in which the heavy mortar will aim before starting the shooting\. This amount of time must be bigger than the global timeout\. 

  Default value: 1\.0
+ **minAllowedDistanceFromTarget**: \(Optional\) Defines the minimum distance in meters from the Target to allow the shooting\. 

  Default value: 10\.0

**Behavior**
+ **Success**: If the shooting succeeds\.
+ **Failure**: If the heavy mortar is closer to the Target than the minimum distance, if there are obstructions 2 meters in front of the heavy mortar, or if the timeout is reached\.

**Example**

```
<HeavyShootMortar to="RefPoint" fireMode="Charge" aimingTimeBeforeShooting="2" timeout="7" />
```

## SquadScope node<a name="ai-mbt-nodes-squadscope"></a>

Used to enter a squad scope, which is limited by the specified number of concurrent users\. If the node succeeds to do that, then the child node is executed\. 

**Parameters**
+ **name**: The name of the squad scope to enter\.
+ **allowedConcurrentUsers**: \(Optional\) Number of allowed concurrent users in the specified scope\. 

  Default value: 1

**Behavior**
+ **Success**: If the child succeeds
+ **Failure**: If it can't enter the specified scope or if the child fails\.

**Example**

```
<SquadScope name="ANameForTheScope" allowedConcurrentUsers="5">
 <SomeChildNode />
</SquadScope>
```

## SendSquadEvent node<a name="ai-mbt-nodes-sendsquadevent"></a>

Used to send an event only to the squad members\.

**Parameters**
+ **name**: Name of the event to be sent\.

**Behavior**
+ **Success**: If the event is sent\.
+ **Failure**: Never fails

**Example**

```
<SendSquadEvent name="ANameForTheEvent"/>
```

## IfSquadCount node<a name="ai-mbt-nodes-ifsquadcount"></a>

Used to check if a squad contains a specific number of members and if so executes its child\.

**Parameters**
+ **isGreaterThan**: \(Optional\) To succeed the node will check if the number of members is greater than the specified amount\.
+ **isLesserThan**: \(Optional\) To succeed the node will check if the number of members is lesser than the specified amount\.
+ **equals**: \(Optional\) To succeed the node will check if the number of members is equal to the specified amount\.

**Behavior**
+ **Success**: If the number of members in the squad satisfies the specified comparison\.
+ **Failure**: the number of members in the squad does not satisfy the specified comparison\. 

**Example**

```
<IfSquadCount isGreaterThan="1">
 <SomeChildNode />
</IfSquadCount>
```