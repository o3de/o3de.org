description: ' See the following flying nodes for the AI system in &ALYlong;. '
slug: ai-scripting-mbt-nodes-flying
title: Flying Nodes
---
# Flying Nodes<a name="ai-scripting-mbt-nodes-flying"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

These nodes provide MBT functionality related to flying vehicles\.

## Hover<a name="ai-scripting-mbt-nodes-flying-hover"></a>

Causes a flying AI agent to hover at its current position\.

### Parameters<a name="ai-scripting-mbt-nodes-flying-hover-parameters"></a>

None\.

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-hover-success"></a>

The node does not SUCCEED or FAIL\. Once executed, it continues running until forced to terminate\.

### Example<a name="ai-scripting-mbt-nodes-flying-hover-example"></a>

```
<Hover />
```

## FlyShoot<a name="ai-scripting-mbt-nodes-flying-flyshoot"></a>

Allows the AI agent to shoot at its attention target when possible from its current position\.

If the AI agent's secondary weapon system is used, the node will only open fire if the weapons are able to hit close enough to the target\. Otherwise normal firing rules are applied\.

### Parameters<a name="ai-scripting-mbt-nodes-flying-flyshoot-parameters"></a>

**useSecondaryWeapon**  
Boolean indicating whether or not the secondary weapon system \(such as rocket launchers\) should be used\. Default is 0\.

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-flyshoot-success"></a>

The node does not SUCCEED or FAIL\. Once executed, the AI agent continues to shoot until forced to terminate\.

### Example<a name="ai-scripting-mbt-nodes-flying-flyshoot-example"></a>

```
<FlyShoot useSecondaryWeapon="1" />
```

## WaitAlignedWithAttentionTarget<a name="ai-scripting-mbt-nodes-flying-waitalignedwithattentiontarget"></a>

Waits until the AI agent is facing its attention target\.

### Parameters<a name="ai-scripting-mbt-nodes-flying-waitalignedwithattentiontarget-parameters"></a>

**toleranceDegrees**  
Maximum angle \(in degrees\) between the attention target and the forward direction of the AI agent to consider the AI agent to be "facing" the attention target\. Allowed values include the range \[0\.0,180\.0\]\. Default is 20\.0\. 

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-waitalignedwithattentiontarget-success"></a>

The node SUCCEEDS if the angle between the AI agent's forward direction and its attention target is within the allowed range\. The node FAILS if the AI agent has no attention target\.

### Example<a name="ai-scripting-mbt-nodes-flying-waitalignedwithattentiontarget-example"></a>

```
<WaitAlignedWithAttentionTarget toleranceDegrees="40" />
```

## Fly<a name="ai-scripting-mbt-nodes-flying-fly"></a>

Allows an AI agent to fly around by following a path\.  

### Parameters<a name="ai-scripting-mbt-nodes-flying-fly-parameters"></a>

**desiredSpeed**  
Speed of movement \(in meters per second\) along the path to move along the path\. Default is 15\.0\.

**pathRadius**  
Radius of the path \(in meters\)\. While flying, the AI agent tries to stay within this distance from the path's line segments\. Defaults is 1\.0\. 

**lookAheadDistance**  
Distance \(in meters\) to look forward along the path for 'attractor points' to fly to\. Default is 3\.0\. 

**decelerateDistance**  
Distance \(in meters\) from the end of the path that the AI agent starts to decelerate\. Default is 10\.0\. 

**maxStartDistanceAlongNonLoopingPath**  
Maximum distance \(in meters\) to look ahead for the closest point to link with another path\. This parameter is used to link with non\-looping paths; for example, it is useful to prevent the AI agent from snapping to the new path at a position that seems closer but is actually behind a wall after a U\-turn\. Defaults is 30\.0\. 

**loopAlongPath**  
Boolean indicating whether or not the AI agent should follow a path in an endless loop\. Default is 0\. 

**startPathFromClosestLocation**  
Boolean indicating at what point the AI agent should start following a path\. Default is 0\.  
+ 1 \- at its closest position
+ 2 \- at the first path waypoint

**pathEndDistance**  
Distance \(in meters\) from the end of the path that this node should start sending arrival notification events\. Defaults is 1\.0\. 

**goToRefPoint**  
Boolean indicating whether or not the current reference point should be appended to the end of the path\. Default is 0\.

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-fly-success"></a>

The node SUCCEEDS if the AI agent reached the end of the path\. The node FAILS if no valid path was assigned to the AI agent\.

### Example<a name="ai-scripting-mbt-nodes-flying-fly-example"></a>

```
<Fly lookaheadDistance="25.0" pathRadius="10.0" decelerateDistance="20.0" pathEndDistance="1" desiredSpeed="15" maxStartDistanceAlongNonLoopingPath="30" loopAlongPath="0" goToRefPoint="1" startPathFromClosestLocation="1" />
```

### Lua table settings<a name="ai-scripting-mbt-nodes-flying-fly-luatable"></a>

The following properties in the AI agent's Lua script table can override the default XML tags\. This will allow for changes to be made at runtime through scripting\.


****  

| When | Lua variable | XML tag | 
| --- | --- | --- | 
| Each node tick | Helicopter\_Speed | desiredSpeed | 
| Node activation  | Helicopter\_Loop | loopAlongPath | 
| Node activation | Helicopter\_StartFromClosestLocation  | startPathFromClosestLocation | 

Upon arrival, the following events will be emitted: 
+ ArrivedCloseToPathEnd
+ ArrivedAtPathEnd

## FlyForceAttentionTarget<a name="ai-scripting-mbt-nodes-flying-flyforceattentiontarget"></a>

Keeps an attention target on a flying vehicle by force\. The attention target is acquired during each tick of the node from the `Helicopter_ForcedTargetId` Lua script variable\. When the node is deactivated, a ForceAttentionTargetFinished event is emitted\. 

### Parameters<a name="ai-scripting-mbt-nodes-flying-flyforceattentiontarget-parameters"></a>

None\. 

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-flyforceattentiontarget-success"></a>

The node does not SUCCEED or FAIL\. Once executed, it continues to force the attention target until deactivation\.

### Example<a name="ai-scripting-mbt-nodes-flying-flyforceattentiontarget-example"></a>

```
<FlyForceAttentionTarget />
```

## FlyAimAtCombatTarget<a name="ai-scripting-mbt-nodes-flying-flyaimatcombattarget"></a>

Aims a flying AI agent at its target, taking into account special aiming adjustments for weapons\.

### Parameters<a name="ai-scripting-mbt-nodes-flying-flyaimatcombattarget-parameters"></a>

None\. 

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-flyaimatcombattarget-success"></a>

The node does not SUCCEED or FAIL\. Once executed, it continues to force the AI agent to rotate its body towards the attention target until termination\. 

### Example<a name="ai-scripting-mbt-nodes-flying-flyaimatcombattarget-example"></a>

```
<FlyAimAtCombatTarget />
```

## HeavyShootMortar<a name="ai-scripting-mbt-nodes-flying-heavyshootmortar"></a>

Controls shooting the mortar \(or Heavy X\-Pak\) weapon\. It tries to simplify and centralize the pre\-condition check and initialization of the weapon, plus re\-selection of the primary weapon\.

### Parameters<a name="ai-scripting-mbt-nodes-flying-heavyshootmortar-parameters"></a>

**to**  
\(Optional\) Shooting target\. Allowed values include:   
+ Target \(default\)
+ Refpoint

**fireMode**  
\(Optional\) Type of firing\. Allowed values include:   
+ Charge \(default\)
+ BurstMortar

**timeout**  
\(Optional\) Maximum time \(in seconds\) to continue shooting\. Default is 5\.0\.

**aimingTimeBeforeShooting**  
\(Optional\) Time \(in seconds\) to spend aiming before starting to shoot\. Value must be longer than the global timeout\. Default is 1\.0\. 

**minAllowedDistanceFromTarget**  
\(Optional\) Minimum distance \(in meters\) to the target required to start shooting\. Default is 10\.0\.

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-heavyshootmortar-success"></a>

The node FAILS if the weapon is closer to the target than the value of `minAllowedDistanceFromTarget`\. The node FAILS if there are obstructions less than two meters in front of the weapon; a cylinder check is done to avoid this\. The node FAILS if the timeout is reached\. The node SUCCEEDS if the shooting SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-flying-heavyshootmortar-example"></a>

```
<HeavyShootMortar to="RefPoint" fireMode="Charge" aimingTimeBeforeShooting="2" timeout="7" />
```

## SquadScope<a name="ai-scripting-mbt-nodes-flying-squadscope"></a>

Makes execution of a child node conditional on adding the AI agent to a squad scope\. Squads allow a limited number of concurrent users\. 

**Note**  
The dynamic squad system uses the AI system's cluster detector\. This tool is used with `AISquadManager` to group AI agents into dynamic squads\.

### Parameters<a name="ai-scripting-mbt-nodes-flying-squadscope-parameters"></a>

**name**  
Name of the squad scope to enter\.

**allowedConcurrentUsers**  
\(Optional\) Maximum number of simultaneous users allowed in the specified squad scope\. Default is 1\.

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-squadscope-success"></a>

The node SUCCEEDS when the child SUCCEEDS\. The node FAILS if the AI agent can't enter the squad scope or if the child FAILS\.

### Example<a name="ai-scripting-mbt-nodes-flying-squadscope-example"></a>

```
<SquadScope name="SomeScopeName" allowedConcurrentUsers="5">
    <SomeChildNode />
</SquadScope>
```

## SendSquadEvent<a name="ai-scripting-mbt-nodes-flying-sendsquadevent"></a>

Sends an event to squad members only\. 

**Note**  
The dynamic squad system uses the AI system's cluster detector\. This tool is used with `AISquadManager` to group AI agents into dynamic squads\.

### Parameters<a name="ai-scripting-mbt-nodes-flying-sendsquadevent-parameters"></a>

**name**  
Name of the event to be sent\.

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-sendsquadevent-success"></a>

The node always SUCCEEDS after sending the event\.

### Example<a name="ai-scripting-mbt-nodes-flying-sendsquadevent-example"></a>

```
<SendSquadEvent name="SomeEventName" />
```

## IfSquadCount<a name="ai-scripting-mbt-nodes-flying-ifsquadcount"></a>

Makes execution of a child node conditional on whether or not the number of squad members meets a specified condition\. Although all parameters are optional, at least one parameter must be used\.

**Note**  
The dynamic squad system uses the AI system's cluster detector\. This tool is used with `AISquadManager` to group AI agents into dynamic squads\.

### Parameters<a name="ai-scripting-mbt-nodes-flying-ifsquadcount-parameters"></a>

**isGreaterThan**  
\(Optional\) Condition statement used to test whether the number of squad members exceeds a specified value\.

**isLesserThan**  
\(Optional\) Condition statement used to test whether the number of squad members is under a specified value\.

**equals**  
\(Optional\) Condition statement used to test whether the number of squad members exactly equals a specified value\.

### Success/Failure<a name="ai-scripting-mbt-nodes-flying-ifsquadcount-success"></a>

The node SUCCEEDS if the number of squad members satisfies the specified condition statement, and FAILS if not\.

### Example<a name="ai-scripting-mbt-nodes-flying-ifsquadcount-example"></a>

```
<IfSquadCount isGreaterThan="1">
    <SomeChildNode />
</IfSquadCount>
```