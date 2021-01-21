---
description: ' See the following AI nodes for the AI system in &ALYlong;. '
title: AI Nodes
---
# AI Nodes {#ai-scripting-mbt-nodes-ai}

These nodes provide MBT functionality for the AI system\.

## AdjustCoverStance {#ai-scripting-mbt-nodes-ai-adjustcoverstance}

Updates the AI agent's cover stance based on the maximum height at which its current cover is effective\.

### Parameters {#ai-scripting-mbt-nodes-ai-adjustcoverstance-parameters}

**duration**
\(Optional\) Length of time \(in seconds\) the node will execute\. Set to **continuous** to specify an unlimited time span\.

**variation**
\(Optional\) Maximum additional time \(in seconds\) that may be randomly added to the value of `duration`, in the range \[0, `variation`\]\. Setting this value causes the wait time to have random variations between different executions of the node\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-adjustcoverstance-success}

The node SUCCEEDS if execution of the child runs the length of the specified duration\. The node FAILS if the child is not in cover\.

### Example {#ai-scripting-mbt-nodes-ai-adjustcoverstance-example}

```
<AdjustCoverStance duration="5.0" variation="1.0"/>
```

## Aim {#ai-scripting-mbt-nodes-ai-aim}

Sets a location for the AI agent to aim at, and then clears the location when the node stops executing\.

### Parameters {#ai-scripting-mbt-nodes-ai-aim-parameters}

**at**
Location to aim at\. Allowed values include:
+ RefPoint
+ Target

**angleThreshold**
\(Optional\) Tolerance angle for aim accuracy\.

**durationOnceWithinThreshold**
\(Optional\) Amount of time \(in seconds\) to continue aiming\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-aim-success}

The node SUCCEEDS after aiming at the desired location for the specified duration, if the location is not valid or if the timeout elapses\.

### Example {#ai-scripting-mbt-nodes-ai-aim-example}

```
<Aim at="Target" durationOnceWithinThreshold="2.0" />
```

## AimAroundWhileUsingAMachingGun {#ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun}

Updates the aim direction of the AI agent when using a mounted machine gun\.

### Parameters {#ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun-parameters}

**maxAngleRange**
\(Optional\) Maximum angle to deviate from the original direction\.

**minSecondsBeweenUpdates**
\(Optional\) Minimum amount of delay \(in seconds\) between updates\.

**useReferencePointForInitialDirectionAndPivotPosition**
Boolean\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun-success}

The node does not succeed or fail\.

### Example {#ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun-example}

```
<AimAroundWhileUsingAMachingGun minSecondsBeweenUpdates="2.5" maxAngleRange="30" useReferencePointForInitialDirectionAndPivotPosition="1"/>
```

## Animate {#ai-scripting-mbt-nodes-ai-animate}

Sets the AI agent to play an animation\.

### Parameters {#ai-scripting-mbt-nodes-ai-animate-parameters}

**name**
Animation to be played\.

**urgent**
\(Optional\) Boolean indicating whether or not to add the urgent flag to the animation\.

**loop**
\(Optional\) Boolean indicating whether or not to add the loop flag to the animation\.

**setBodyDirectionTowardsAttentionTarget**
\(Optional\) Boolean indicating whether or not to change the AI's body target direction to face the attention target\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-animate-success}

The node SUCCEEDS when the animation has finished playing, or if the animation failed to be initialized\.

### Example {#ai-scripting-mbt-nodes-ai-animate-example}

```
<Animate name="LookAround" loop="1" />
```

## AnimationTagWrapper {#ai-scripting-mbt-nodes-ai-animationtagwrapper}

Adds an animation tag to the execution of a child node and clears it at the end\.

### Parameters {#ai-scripting-mbt-nodes-ai-animationtagwrapper-parameters}

**name**
Animation tag to be set\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-animationtagwrapper-success}

The node returns the result of the execution of its child node\.

### Example {#ai-scripting-mbt-nodes-ai-animationtagwrapper-example}

```
<AnimationTagWrapper name="ShootFromHip">
    <Shoot at="Target" stance="Stand" duration="5" fireMode="Burst" />
</AnimationTagWrapper>
```

## AssertCondition {#ai-scripting-mbt-nodes-ai-assertcondition}

Checks whether or not a specified condition is satisfied\.

### Parameters {#ai-scripting-mbt-nodes-ai-assertcondition-parameters}

**condition**
Condition to be checked\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-assertcondition-success}

The node SUCCEEDS if the condition is true, otherwise it FAILS\.

### Example {#ai-scripting-mbt-nodes-ai-assertcondition-example}

```
<AssertCondition condition="HasTarget" />
```

## AssertLua {#ai-scripting-mbt-nodes-ai-assertlua}

Executes a Lua script that returns true/false and translates the return value to success/failure\. The result can be used to build preconditions in the MBT\.

### Parameters {#ai-scripting-mbt-nodes-ai-assertlua-parameters}

**code**
Lua script to be executed\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-assertlua-success}

The node SUCCEEDS if the Lua script returns a value of true, otherwise it FAILS\.

### Example {#ai-scripting-mbt-nodes-ai-assertlua-example}

```
<AssertLua code="return entity:IsClosestToTargetInGroup()" />
```

## AssertTime {#ai-scripting-mbt-nodes-ai-asserttime}

Checks whether or not a time condition is satisfied\.

### Parameters {#ai-scripting-mbt-nodes-ai-asserttime-parameters}

**since**
Name of the time stamp to check for the condition\.

**isMoreThan**
Condition statement used to test whether the time stamp is greater than a specified value\. Cannot be used with the parameter `isLessThan`\.

**isLessThan**
Condition statement used to test whether the time stamp is less than a specified value\. Cannot be used with the parameter `isMoreThan`\.

**orNeverBeenSet**
\(Optional\) Boolean indicating whether or not to set the node to succeed if the time stamp was never set\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-asserttime-success}

The node SUCCEEDS if the time condition is true, and FAILS if it is false\. If the specified time stamp was not previously set, the node FAILS, unless the parameter `orNeverBeenSet` is true, in which case it SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-asserttime-example}

```
<AssertTime since="GroupLostSightOfTarget" isLessThan="10" orNeverBeenSet="1" />
```

## Bubble {#ai-scripting-mbt-nodes-ai-bubble}

Displays a message in a speech bubble above the AI agent\. See [AI Bubbles System](/docs/userguide/ai/bubbles-system.md)\.

### Parameters {#ai-scripting-mbt-nodes-ai-bubble-parameters}

**message**
Message string to be shown in the speech bubble\.

**duration**
Number of seconds to display the message\. Default is 0\.0\.

**balloon**
Boolean indicating whether or not to display the message in a balloon above the AI agent\. Default is true\.

**log**
Boolean indicating whether or not to write the message to the general purpose log\. Default is true\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-bubble-success}

The node SUCCEEDS immediately after having queued the message to be displayed\.

### Example {#ai-scripting-mbt-nodes-ai-bubble-example}

```
<Bubble message="MessageToBeDisplayedAndOrLogged" duration="5.0" balloon="true" log="true" />
```

## CheckIfTargetCanBeReached {#ai-scripting-mbt-nodes-ai-checkiftargetcanbereached}

Checks whether or not the AI agent's attention target can be reached\.

### Parameters {#ai-scripting-mbt-nodes-ai-checkiftargetcanbereached-parameters}

**mode**
Target to check for\. Allowed values include:
+ UseLiveTarget
+ UseAttentionTarget

### Success/Failure {#ai-scripting-mbt-nodes-ai-checkiftargetcanbereached-success}

The node SUCCEEDS if the target can be reached, otherwise it FAILS\.

### Example {#ai-scripting-mbt-nodes-ai-checkiftargetcanbereached-example}

```
<CheckIfTargetCanBeReached mode="UseLiveTarget" />
```

## ClearTargets {#ai-scripting-mbt-nodes-ai-cleartargets}

Clears the AI agent's targets information\.

### Parameters {#ai-scripting-mbt-nodes-ai-cleartargets-parameters}

None\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-cleartargets-success}

The node always SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-cleartargets-example}

```
<ClearTargets />
```

## Communicate {#ai-scripting-mbt-nodes-ai-communicate}

Sends a request to the communication manager to play one of the AI agent's communications\.

### Parameters {#ai-scripting-mbt-nodes-ai-communicate-parameters}

**name**
The name of the communication to be played\.

**channel**
The channel on which the communication is to be set\.

**waitUntilFinished**
\(Optional\) Specifies if the execution should wait for the end of the communication before finishing\.

**timeout**
\(Optional\) The threshold defining the maximum amount of seconds the node will wait\.

**expiry**
\(Optional\) The amount of seconds the communication can wait for the channel to be clear\.

**minSilence**
\(Optional\) The amount of seconds the channel will be silenced after the communication is played\.

**ignoreSound**
\(Optional\) Sets the sound component of the communication to be ignored\.

**ignoreAnim**
\(Optional\) Sets the animation component of the communication to be ignored\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-communicate-success}

If the node is set to wait, the node SUCCEEDS when the communication is complete\. Otherwise, it SUCCEEDS once the timeout elapses\.

### Example {#ai-scripting-mbt-nodes-ai-communicate-example}

```
<Communicate name="Advancing" channel="Tactic" expiry="1.0" waitUntilFinished="0" />
```

## ExecuteLua {#ai-scripting-mbt-nodes-ai-executelua}

Executes a Lua script\.

### Parameters {#ai-scripting-mbt-nodes-ai-executelua-parameters}

**code**
Script to be executed\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-executelua-success}

The node always SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-executelua-example}

```
<ExecuteLua code="entity:SetEyeColor(entity.EyeColors.Relaxed)" />
```

## GroupScope {#ai-scripting-mbt-nodes-ai-groupscope}

Makes execution of a child node conditional on entering the AI agent in a group scope\. Groups allow a limited number of concurrent users\.

### Parameters {#ai-scripting-mbt-nodes-ai-groupscope-parameters}

**name**
Name of the group scope to enter\.

**allowedConcurrentUsers**
\(Optional\) Maximum number of simultaneous users allowed in the specified group scope\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-groupscope-success}

The node FAILS if the AI agent cannot enter the group scope; otherwise, it returns the result of executing the child node\.

### Example {#ai-scripting-mbt-nodes-ai-groupscope-example}

```
<GroupScope name="DeadBodyInvestigator" allowedConcurrentUsers="1">
    <SendTransitionSignal name="GoToPrepareToInvestigateDeadBody" />
</GroupScope>
```

## IfCondition {#ai-scripting-mbt-nodes-ai-ifcondition}

Executes a child node if a specified condition is satisfied\.

### Parameters {#ai-scripting-mbt-nodes-ai-ifcondition-parameters}

**condition**
Condition statement to be checked\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-ifcondition-success}

If the condition is satisfied, the node returns the result of executing the child node\. If the condition is not satisfied, the node FAILS\.

### Example {#ai-scripting-mbt-nodes-ai-ifcondition-example}

```
<IfCondition condition="TargetVisible">
    <Communicate name="AttackNoise" channel="BattleChatter" expiry="2.0" waitUntilFinished="1" />
</IfCondition>
```

## IfTime {#ai-scripting-mbt-nodes-ai-iftime}

Executes a child node if a time condition is satisfied\.

### Parameters {#ai-scripting-mbt-nodes-ai-iftime-parameters}

**since**
Name of the time stamp to check for the condition\.

**isMoreThan**
Condition statement test whether the time stamp is greater than a specified value\. Cannot be used with the parameter `isLessThan`\.

**isLessThan**
Condition statement test whether the time stamp is less than a specified value\. Cannot be used with the parameter `isMoreThan`\.

**orNeverBeenSet**
\(Optional\) Boolean indicating whether or not to set the node to succeed if the time stamp was never set\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-iftime-success}

If the time condition is true, the node returns the result of executing the child node\. It FAILS if the time condition is false\. If the specified time stamp was not previously set, the node FAILS, unless the parameter `orNeverBeenSet` is true, in which case it SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-iftime-example}

```
<IfTime since="FragGrenadeThrownInGroup" isMoreThan="5.0" orNeverBeenSet="1">
    <ThrowGrenade type="frag" />
</IfTime>
```

## Log {#ai-scripting-mbt-nodes-ai-log}

Adds a message to the AI agent's personal log\.

### Parameters {#ai-scripting-mbt-nodes-ai-log-parameters}

**message**
Message to be logged\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-log-success}

The node always SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-log-example}

```
<Log message="Investigating suspicious activity." />
```

## Look {#ai-scripting-mbt-nodes-ai-look}

Adds a location for the AI agent to look at, and clears it when the node stops executing\.

### Parameters {#ai-scripting-mbt-nodes-ai-look-parameters}

**at**
Location to look at\. Allowed values are:
+ ClosestGroupMember
+ RefPoint
+ Target

### Success/Failure {#ai-scripting-mbt-nodes-ai-look-success}

This node does not succeed or fail\.

### Example {#ai-scripting-mbt-nodes-ai-look-example}

```
<Look at="ClosestGroupMember" />
```

## LuaGate {#ai-scripting-mbt-nodes-ai-luagate}

Executes a child node only if the result from running a Lua script is true\.

### Parameters {#ai-scripting-mbt-nodes-ai-luagate-parameters}

**code**
Lua script to be executed\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-luagate-success}

The node SUCCEEDS if the result of the Lua script is true, and FAILS if the result is not true\. On success, the node returns the result of executing the child node\.

### Example {#ai-scripting-mbt-nodes-ai-luagate-example}

```
<LuaGate code="return AI.GetGroupScopeUserCount(entity.id, 'DeadBodyInvestigator') == 0">
    <Animate name="AI_SearchLookAround" />
</LuaGate>
```

## LuaWrapper {#ai-scripting-mbt-nodes-ai-luawrapper}

Runs a Lua script before and/or after the execution of a child node\.

### Parameters {#ai-scripting-mbt-nodes-ai-luawrapper-parameters}

**onEnter**
\(Optional\) Script to be executed at the start\.

**onExit**
\(Optional\) Script to be executed at the end\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-luawrapper-success}

The node returns the result of executing the child node\.

### Example {#ai-scripting-mbt-nodes-ai-luawrapper-example}

```
<LuaWrapper onEnter="entity:EnableSearchModule()" onExit="entity:DisableSearchModule()">
    <Animate name="AI_SearchLookAround" />
</LuaWrapper>
```

## MonitorCondition {#ai-scripting-mbt-nodes-ai-monitorcondition}

Continuously checks the state of a specified condition\.

### Parameters {#ai-scripting-mbt-nodes-ai-monitorcondition-parameters}

**condition**
Specifies the condition to be checked\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-monitorcondition-success}

The node SUCCEEDS when the condition is satisfied\.

### Example {#ai-scripting-mbt-nodes-ai-monitorcondition-example}

```
<MonitorCondition condition="TargetVisible" />
```

## Move {#ai-scripting-mbt-nodes-ai-move}

Moves the AI agent from its current position to a specified destination\. If the destination is a target, then the end position is updated if it is not reached when the target moves\. See [Movement System](/docs/userguide/ai/movement.md)\.

### Parameters {#ai-scripting-mbt-nodes-ai-move-parameters}

**speed**
Speed of movement\. Allowed values include:
+ Walk
+ Run
+ Sprint

**stance**
Body stance while moving\. Allowed values include:
+ Relaxed
+ Alerted
+ Stand \(default\)

**bodyOrientation **
Direction the AI agents body should face during the move\. Allowed values include:
+ FullyTowardsMovementDirection
+ FullyTowardsAimOrLook
+ HalfwayTowardsAimOrLook \(default\)

**moveToCover**
Boolean indicating whether or not the AI agent is moving into cover\. Default is false\.

**turnTowardsMovementDirectionBeforeMovingx**
Boolean indicating whether or not the AI agent should first turn to the direction of movement before actually moving\. Default is false\.

**strafe**
Boolean indicating whether or not the AI agent is allowed to strafe\. Default is false\.

**glanceInMovementDirection**
Boolean indicating whether or not the AI agent can glance in the direction of movement\. If false, the AI agent will always look at its look\-at target\. Default is false\.

**to**
Movement destination\. Allowed values include:
+ Target \- Current attention target\.
+ Cover \- Current cover position\.
+ RefPoint \- Current reference position\.
+ LastOp \- Position of the last successful position\-related operation\.

**stopWithinDistance**
Distance from the target that the AI agent can stop moving\. Default is 0\.0\.

**stopDistanceVariation**
Maximum additional distance that may be randomly added to the value of `stopDistanceVariation`, in the range \[0, `stopDistanceVariation`\]\. Setting this value causes the stop distance to vary randomly between different executions of the node\. Default is 0\.0\.

**fireMode**
Firing style while moving\. Allowed values are listed for the [Shoot ](#ai-scripting-mbt-nodes-ai-shoot) node\.

**avoidDangers**
Boolean indicating whether or not the AI agent should avoid dangers while moving\. Default is true\.

**avoidGroupMates**
Boolean indicating whether or not the AI agent should avoid group mates while moving\. Default is true\.

**considerActorsAsPathObstacles**
Boolean indicating whether or not an AI agent's pathfinder should avoid actors on the path\. Default is false\.

**lengthToTrimFromThePathEnd**
Distance that should be trimmed from a pathfinder path\. Use positive values to trim from the path end , or negative values to trim from the path start\. Default is 0\.0\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-move-success}

The node SUCCEEDS if the destination is reached\. The node FAILS if the destination is deemed unreachable\.

### Example {#ai-scripting-mbt-nodes-ai-move-example}

```
<Move to="Target" stance="Alerted" fireMode="Aim" speed="Run" stopWithinDistance="3" />
```

## Priority & Case {#ai-scripting-mbt-nodes-ai-priority}

Prioritizes to selects from a set of possible child nodes to execute\. Within a `<Priority>` node, each child node is listed inside a `<Case>` node, which defines a condition statement\. A child node is selected and executed based on \(1\) the first child to have its condition met, and \(2\) in the case of ties, the order the child nodes are listed in\. All but the last child must have a condition statement; the last child listed is the default case, so it's condition must always be true\.

### Parameters {#ai-scripting-mbt-nodes-ai-priority-parameters}

The `<Priority>` node has no parameters\.

The `<Case>` node has the following parameters:

**condition**
Condition statement used to prioritize a child node\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-priority-success}

The node returns the result of the executed child node\.

### Example {#ai-scripting-mbt-nodes-ai-priority-example}

```
<Priority>
    <Case condition="TargetInCloseRange and TargetVisible">
<Melee target="AttentionTarget" />
    </Case>
    <Case>
<Look at="Target" />
    </Case>
</Priority>
```

## PullDownThreatLevel {#ai-scripting-mbt-nodes-ai-pulldownthreatlevel}

Lower's the AI agent's perception of the target's threat\.

### Parameters {#ai-scripting-mbt-nodes-ai-pulldownthreatlevel-parameters}

**to**


### Success/Failure {#ai-scripting-mbt-nodes-ai-pulldownthreatlevel-success}

The node always SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-pulldownthreatlevel-example}

```
<PullDownThreatLevel to="Suspect" />
```

## QueryTPS {#ai-scripting-mbt-nodes-ai-querytps}

Performs a TPS query to find a tactical position for the AI agent, and waits for a result\. See [AI Tactical Point System](/docs/userguide/ai/tactical-point-system.md)\.

### Parameters {#ai-scripting-mbt-nodes-ai-querytps-parameters}

**name**
Name of the TPS query to run\.

**register**
Location to store the result of the TPS query\. Allowed values include:
+ RefPoint
+ Cover \(default\)

### Success/Failure {#ai-scripting-mbt-nodes-ai-querytps-success}

The node SUCCEEDS if the TPS returns a tactical position, or FAILS if it does not find a tactical position\.

### Example {#ai-scripting-mbt-nodes-ai-querytps-example}

```
<QueryTPS name="queryName" register="Cover" />
```

## RandomGate {#ai-scripting-mbt-nodes-ai-randomgate}

Executes a child node \(or not\) based on random chance\.

### Parameters {#ai-scripting-mbt-nodes-ai-randomgate-parameters}

**opensWithChance**
Probability to use to determine whether the child node will be executed\. Allowed values include floats 0\.0 to 1\.0\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-randomgate-success}

The node FAILS if the child node is not executed\. If it is executed, the node SUCCEEDS AND returns the result of the execution of its child node\.

### Example {#ai-scripting-mbt-nodes-ai-randomgate-example}

```
<RandomGate opensWithChance="0.5">
    <ThrowGrenade type="frag" />
</RandomGate>
```

## SendTransitionSignal {#ai-scripting-mbt-nodes-ai-sendtransitionsignal}

Sends a signal, destined for a state machine node on the behavior tree, with the explicit intent of causing a change of state\.

### Parameters {#ai-scripting-mbt-nodes-ai-sendtransitionsignal-parameters}

**name**
Name of the signal to be sent\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-sendtransitionsignal-success}

This node does not succeed or fail\.

### Example {#ai-scripting-mbt-nodes-ai-sendtransitionsignal-example}

```
<SendTransitionSignal name="LeaveSearch" />
```

## SetAlertness {#ai-scripting-mbt-nodes-ai-setalertness}

Sets the AI agent's alertness level\.

### Parameters {#ai-scripting-mbt-nodes-ai-setalertness-parameters}

**value**
Alertness level\. Allowed values include integers 0 to 2\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-setalertness-success}

The node always SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-setalertness-example}

```
<SetAlertness value="1" />
```

## Shoot {#ai-scripting-mbt-nodes-ai-shoot}

Sets the AI agent to shoot at a target or location\.

### Parameters {#ai-scripting-mbt-nodes-ai-shoot-parameters}

**duration**
Length of time \(in seconds\) the AI agent should continue shooting\.

**at**
Location to shoot at\. Allowed values include:
+ AttentionTarget
+ ReferencePoint
+ LocalSpacePosition

**fireMode**
Firing style\. Allowed values include:
+ Off \- Do not fire \(default\)\.
+ Burst \- Fire in bursts at living targets only\.
+ Continuous \- Fire continuously at living targets only\.
+ Forced \- Fire continuously at any target\.
+ Aim \- Aim only at any target\.
+ Secondary \- Fire secondary weapon \(grenades, etc\.\)\.
+ SecondarySmoke \- Fire smoke grenade\.
+ Melee \- Melee\.
+ Kill \- Shoot at the target without missing, regardless of the AI agent's aggression/attackRange/accuracy settings\.
+ BurstWhileMoving \- Fire in bursts while moving and too far away from the target\.
+ PanicSpread \- Fire randomly in the general direction of the target\.
+ BurstDrawFire \- Fire in bursts in an attempt to draw enemy fire\.
+ MeleeForced \- Melee without distance restrictions\.
+ BurstSwipe \- Fire in burst aiming for a head shot\.
+ AimSweep \- Maintain aim on the target but don't fire\.
+ BurstOnce \- Fire a single burst\.

**stance**
Body stance while shooting\. Allowed values include:
+ Relaxed
+ Alerted
+ Crouch
+ Stand

**position**
\(Required if the target is a local space position\) Local space position to be used as the target\.

**stanceToUseIfSlopeIsTooSteep**
\(Optional\) Alternative stance style if the slope exceeds a specified steepness\. Allowed values are the same as for `stance`\.

**allowedSlopeNormalDeviationFromUpInDegrees**
\(Optional\) Maximum allowed steepness \(in degrees of inclination above horizontal\) to set the primary stance\. At positions that exceed this slope, the alternative stance is used\.

**aimObstructedTimeout**
\(Optional\) Length of time \(in seconds\) the AI agent's aim can be obstructed before the node will fail\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-shoot-success}

The node SUCCEEDS if it executes for the specified duration\. The node FAILS if the aim is obstructed for longer than the specified timeout\.

### Example {#ai-scripting-mbt-nodes-ai-shoot-example}

```
<Shoot at="Target" stance="Crouch" fireMode="Burst" duration="5" allowedSlopeNormalDeviationFromUpInDegrees="30" stanceToUseIfSlopeIsTooSteep="Stand" />
```

## ShootFromCover {#ai-scripting-mbt-nodes-ai-shootfromcover}

Sets the AI agent to shoot at the target from cover and adjusts its stance accordingly\.

### Parameters {#ai-scripting-mbt-nodes-ai-shootfromcover-parameters}

**duration**
Length of time \(in seconds\) the node should execute\.

**fireMode**
Firing style\. Allowed values are listed for the [Shoot ](#ai-scripting-mbt-nodes-ai-shoot) node\.

**aimObstructedTimeout**
\(Optional\) Length of time \(in seconds\) the AI agent's aim can be obstructed before the node will fail\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-shootfromcover-success}

The node SUCCEEDS if it executes for the specified duration\. The node FAILS if the AI agent is not in cover, if there's no shoot posture, or if the aim is obstructed for longer than the specified timeout\.

### Example {#ai-scripting-mbt-nodes-ai-shootfromcover-example}

```
<ShootFromCover duration="10" fireMode="Burst" aimObstructedTimeout="3" />
```

## Signal {#ai-scripting-mbt-nodes-ai-signal}

Sends a signal to the AI system\. See [Signals](/docs/userguide/ai/scripting/signals.md)\.

### Parameters {#ai-scripting-mbt-nodes-ai-signal-parameters}

**name**
Name of the signal to be sent\.

**filter**
\(Optional\) Signal filter to use when sending the signal, which determines which AI agents will receive it\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-signal-success}

The node always SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-signal-example}

```
<Signal name="StartedJumpAttack" />
```

## SmartObjectStatesWrapper {#ai-scripting-mbt-nodes-ai-smartobjectstateswrapper}

Sets the states of certain smart objects immediately before and/or after the execution of a child node\.

### Parameters {#ai-scripting-mbt-nodes-ai-smartobjectstateswrapper-parameters}

**onEnter**
\(Optional\) Smart object states to set at the start\.

**onExit**
\(Optional\) Smart object states to set at the end\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-smartobjectstateswrapper-success}

The node returns the result of executing the child node\.

### Example {#ai-scripting-mbt-nodes-ai-smartobjectstateswrapper-example}

```
<SmartObjectStatesWrapper onEnter="InSearch" onExit="-InSearch">
    <Animate name="LookAround" />
</SmartObjectStatesWrapper>
```

## Stance {#ai-scripting-mbt-nodes-ai-stance}

Sets the stance of the AI agent\.

### Parameters {#ai-scripting-mbt-nodes-ai-stance-parameters}

**name**
Primary stance style\. Allowed values include:
+ Relaxed
+ Alerted
+ Crouch
+ Stand

**stanceToUseIfSlopeIsTooSteep**
\(Optional\) Alternative stance style if the slope exceeds a specified steepness\. Allowed values are the same as for `stance`\.

**allowedSlopeNormalDeviationFromUpInDegrees**
\(Optional\) Maximum allowed steepness \(in degrees of inclination above horizontal\) to set the primary stance\. At positions that exceed this slope, the alternative stance is used\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-stance-success}

The node always SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-stance-example}

```
<Stance name="Crouch" allowedSlopeNormalDeviationFromUpInDegrees="30" stanceToUseIfSlopeIsTooSteep="Stand" />
```

## StopMovement {#ai-scripting-mbt-nodes-ai-stopmovement}

Sends a request to the Movement system to stop all movements\. See [Movement System](/docs/userguide/ai/movement.md)\.

**Note**
This may not immediately stop the AI agent The Movement system may be dependent on animations and physics that dictate a 'natural' stop rather than an immediate cessation of movement\.

### Parameters {#ai-scripting-mbt-nodes-ai-stopmovement-parameters}

**waitUntilStopped**
Boolean indicating whether or not the node should wait for the Movement System to finish processing the request\.

**waitUntilIdleAnimation**
Boolean indicating whether or not the node should wait until the Motion\_Idle animation fragment begins running in Mannequin\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-stopmovement-success}

The node SUCCEEDS if the stop request has been completed\.

### Example {#ai-scripting-mbt-nodes-ai-stopmovement-example}

```
<StopMovement waitUntilStopped="1" waitUntilIdleAnimation="0" />
```

## Teleport {#ai-scripting-mbt-nodes-ai-teleport}

Moves the AI agent when both the destination point and source point are outside the camera view\.

### Parameters {#ai-scripting-mbt-nodes-ai-teleport-parameters}

None\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-teleport-success}

The node always SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-teleport-example}

```
<Teleport />
```

## ThrowGrenade {#ai-scripting-mbt-nodes-ai-throwgrenade}

Triggers the AI agent to attempt a grenade throw\.

### Parameters {#ai-scripting-mbt-nodes-ai-throwgrenade-parameters}

**timeout**
Maximum length of time \(in seconds\) to wait for the grenade to be thrown\.

**type**
Grenade type to throw\. Allowed values include:
+ emp
+ frag
+ smoke

### Success/Failure {#ai-scripting-mbt-nodes-ai-throwgrenade-success}

The node SUCCEEDS if a grenade is thrown before it times out, otherwise the node FAILS\.

### Example {#ai-scripting-mbt-nodes-ai-throwgrenade-example}

```
<ThrowGrenade type="emp" timeout="3" />
```

## WaitUntilTime {#ai-scripting-mbt-nodes-ai-waituntiltime}

Executes until a time condition is satisfied\.

### Parameters {#ai-scripting-mbt-nodes-ai-waituntiltime-parameters}

**since**
Name of the time stamp to check for the condition\.

**isMoreThan**
Condition statement used to test whether the time stamp is greater than a specified value\. Cannot be used with the parameter `isLessThan`\.

**isLessThan**
Condition statement used to test whether the time stamp is less than a specified value\. Cannot be used with the parameter `isMoreThan`\.

**succeedIfNeverBeenSet**
\(Optional\) Boolean indicating whether or not to set the node to succeed if the time stamp was never set\.

### Success/Failure {#ai-scripting-mbt-nodes-ai-waituntiltime-success}

The node SUCCEEDS if the time condition is true\. If the specified time stamp was not previously set, the node FAILS, unless the parameter `succeedIfNeverBeenSet` is true, in which case it SUCCEEDS\.

### Example {#ai-scripting-mbt-nodes-ai-waituntiltime-example}

```
<WaitUntilTime since="BeingShotAt" isMoreThan="7" />
```