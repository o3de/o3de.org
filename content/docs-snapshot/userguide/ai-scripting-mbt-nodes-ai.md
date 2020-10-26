# AI Nodes<a name="ai-scripting-mbt-nodes-ai"></a>

These nodes provide MBT functionality for the AI system\.

## AdjustCoverStance<a name="ai-scripting-mbt-nodes-ai-adjustcoverstance"></a>

Updates the AI agent's cover stance based on the maximum height at which its current cover is effective\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-adjustcoverstance-parameters"></a>

**duration**  
\(Optional\) Length of time \(in seconds\) the node will execute\. Set to **continuous** to specify an unlimited time span\.

**variation**  
\(Optional\) Maximum additional time \(in seconds\) that may be randomly added to the value of `duration`, in the range \[0, `variation`\]\. Setting this value causes the wait time to have random variations between different executions of the node\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-adjustcoverstance-success"></a>

The node SUCCEEDS if execution of the child runs the length of the specified duration\. The node FAILS if the child is not in cover\.

### Example<a name="ai-scripting-mbt-nodes-ai-adjustcoverstance-example"></a>

```
<AdjustCoverStance duration="5.0" variation="1.0"/>
```

## Aim<a name="ai-scripting-mbt-nodes-ai-aim"></a>

Sets a location for the AI agent to aim at, and then clears the location when the node stops executing\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-aim-parameters"></a>

**at**  
Location to aim at\. Allowed values include:   
+ RefPoint
+ Target

**angleThreshold**  
\(Optional\) Tolerance angle for aim accuracy\.

**durationOnceWithinThreshold**  
\(Optional\) Amount of time \(in seconds\) to continue aiming\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-aim-success"></a>

The node SUCCEEDS after aiming at the desired location for the specified duration, if the location is not valid or if the timeout elapses\.

### Example<a name="ai-scripting-mbt-nodes-ai-aim-example"></a>

```
<Aim at="Target" durationOnceWithinThreshold="2.0" />
```

## AimAroundWhileUsingAMachingGun<a name="ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun"></a>

Updates the aim direction of the AI agent when using a mounted machine gun\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun-parameters"></a>

**maxAngleRange**  
\(Optional\) Maximum angle to deviate from the original direction\.

**minSecondsBeweenUpdates**  
\(Optional\) Minimum amount of delay \(in seconds\) between updates\.

**useReferencePointForInitialDirectionAndPivotPosition**  
Boolean\. 

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun-success"></a>

The node does not succeed or fail\.

### Example<a name="ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun-example"></a>

```
<AimAroundWhileUsingAMachingGun minSecondsBeweenUpdates="2.5" maxAngleRange="30" useReferencePointForInitialDirectionAndPivotPosition="1"/>
```

## Animate<a name="ai-scripting-mbt-nodes-ai-animate"></a>

Sets the AI agent to play an animation\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-animate-parameters"></a>

**name**  
Animation to be played\.

**urgent**  
\(Optional\) Boolean indicating whether or not to add the urgent flag to the animation\.

**loop**  
\(Optional\) Boolean indicating whether or not to add the loop flag to the animation\.

**setBodyDirectionTowardsAttentionTarget**  
\(Optional\) Boolean indicating whether or not to change the AI's body target direction to face the attention target\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-animate-success"></a>

The node SUCCEEDS when the animation has finished playing, or if the animation failed to be initialized\.

### Example<a name="ai-scripting-mbt-nodes-ai-animate-example"></a>

```
<Animate name="LookAround" loop="1" />
```

## AnimationTagWrapper<a name="ai-scripting-mbt-nodes-ai-animationtagwrapper"></a>

Adds an animation tag to the execution of a child node and clears it at the end\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-animationtagwrapper-parameters"></a>

**name**  
Animation tag to be set\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-animationtagwrapper-success"></a>

The node returns the result of the execution of its child node\.

### Example<a name="ai-scripting-mbt-nodes-ai-animationtagwrapper-example"></a>

```
<AnimationTagWrapper name="ShootFromHip">
    <Shoot at="Target" stance="Stand" duration="5" fireMode="Burst" />
</AnimationTagWrapper>
```

## AssertCondition<a name="ai-scripting-mbt-nodes-ai-assertcondition"></a>

Checks whether or not a specified condition is satisfied\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-assertcondition-parameters"></a>

**condition**  
Condition to be checked\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-assertcondition-success"></a>

The node SUCCEEDS if the condition is true, otherwise it FAILS\.

### Example<a name="ai-scripting-mbt-nodes-ai-assertcondition-example"></a>

```
<AssertCondition condition="HasTarget" />
```

## AssertLua<a name="ai-scripting-mbt-nodes-ai-assertlua"></a>

Executes a Lua script that returns true/false and translates the return value to success/failure\. The result can be used to build preconditions in the MBT\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-assertlua-parameters"></a>

**code**  
Lua script to be executed\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-assertlua-success"></a>

The node SUCCEEDS if the Lua script returns a value of true, otherwise it FAILS\.

### Example<a name="ai-scripting-mbt-nodes-ai-assertlua-example"></a>

```
<AssertLua code="return entity:IsClosestToTargetInGroup()" />
```

## AssertTime<a name="ai-scripting-mbt-nodes-ai-asserttime"></a>

Checks whether or not a time condition is satisfied\. 

### Parameters<a name="ai-scripting-mbt-nodes-ai-asserttime-parameters"></a>

**since**  
Name of the time stamp to check for the condition\.

**isMoreThan**  
Condition statement used to test whether the time stamp is greater than a specified value\. Cannot be used with the parameter `isLessThan`\.

**isLessThan**  
Condition statement used to test whether the time stamp is less than a specified value\. Cannot be used with the parameter `isMoreThan`\.

**orNeverBeenSet**  
\(Optional\) Boolean indicating whether or not to set the node to succeed if the time stamp was never set\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-asserttime-success"></a>

The node SUCCEEDS if the time condition is true, and FAILS if it is false\. If the specified time stamp was not previously set, the node FAILS, unless the parameter `orNeverBeenSet` is true, in which case it SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-asserttime-example"></a>

```
<AssertTime since="GroupLostSightOfTarget" isLessThan="10" orNeverBeenSet="1" />
```

## Bubble<a name="ai-scripting-mbt-nodes-ai-bubble"></a>

Displays a message in a speech bubble above the AI agent\. See [AI Bubbles System](ai-bubbles-system.md)\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-bubble-parameters"></a>

**message**  
Message string to be shown in the speech bubble\.

**duration**  
Number of seconds to display the message\. Default is 0\.0\.

**balloon**  
Boolean indicating whether or not to display the message in a balloon above the AI agent\. Default is true\.

**log**  
Boolean indicating whether or not to write the message to the general purpose log\. Default is true\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-bubble-success"></a>

The node SUCCEEDS immediately after having queued the message to be displayed\.

### Example<a name="ai-scripting-mbt-nodes-ai-bubble-example"></a>

```
<Bubble message="MessageToBeDisplayedAndOrLogged" duration="5.0" balloon="true" log="true" />
```

## CheckIfTargetCanBeReached<a name="ai-scripting-mbt-nodes-ai-checkiftargetcanbereached"></a>

Checks whether or not the AI agent's attention target can be reached\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-checkiftargetcanbereached-parameters"></a>

**mode**  
Target to check for\. Allowed values include:   
+ UseLiveTarget
+ UseAttentionTarget

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-checkiftargetcanbereached-success"></a>

The node SUCCEEDS if the target can be reached, otherwise it FAILS\.

### Example<a name="ai-scripting-mbt-nodes-ai-checkiftargetcanbereached-example"></a>

```
<CheckIfTargetCanBeReached mode="UseLiveTarget" />
```

## ClearTargets<a name="ai-scripting-mbt-nodes-ai-cleartargets"></a>

Clears the AI agent's targets information\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-cleartargets-parameters"></a>

None\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-cleartargets-success"></a>

The node always SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-cleartargets-example"></a>

```
<ClearTargets />
```

## Communicate<a name="ai-scripting-mbt-nodes-ai-communicate"></a>

Sends a request to the communication manager to play one of the AI agent's communications\.  

### Parameters<a name="ai-scripting-mbt-nodes-ai-communicate-parameters"></a>

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

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-communicate-success"></a>

If the node is set to wait, the node SUCCEEDS when the communication is complete\. Otherwise, it SUCCEEDS once the timeout elapses\. 

### Example<a name="ai-scripting-mbt-nodes-ai-communicate-example"></a>

```
<Communicate name="Advancing" channel="Tactic" expiry="1.0" waitUntilFinished="0" />
```

## ExecuteLua<a name="ai-scripting-mbt-nodes-ai-executelua"></a>

Executes a Lua script\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-executelua-parameters"></a>

**code**  
Script to be executed\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-executelua-success"></a>

The node always SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-executelua-example"></a>

```
<ExecuteLua code="entity:SetEyeColor(entity.EyeColors.Relaxed)" />
```

## GroupScope<a name="ai-scripting-mbt-nodes-ai-groupscope"></a>

Makes execution of a child node conditional on entering the AI agent in a group scope\. Groups allow a limited number of concurrent users\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-groupscope-parameters"></a>

**name**  
Name of the group scope to enter\.

**allowedConcurrentUsers**  
\(Optional\) Maximum number of simultaneous users allowed in the specified group scope\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-groupscope-success"></a>

The node FAILS if the AI agent cannot enter the group scope; otherwise, it returns the result of executing the child node\.

### Example<a name="ai-scripting-mbt-nodes-ai-groupscope-example"></a>

```
<GroupScope name="DeadBodyInvestigator" allowedConcurrentUsers="1">
    <SendTransitionSignal name="GoToPrepareToInvestigateDeadBody" />
</GroupScope>
```

## IfCondition<a name="ai-scripting-mbt-nodes-ai-ifcondition"></a>

Executes a child node if a specified condition is satisfied\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-ifcondition-parameters"></a>

**condition**  
Condition statement to be checked\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-ifcondition-success"></a>

If the condition is satisfied, the node returns the result of executing the child node\. If the condition is not satisfied, the node FAILS\.

### Example<a name="ai-scripting-mbt-nodes-ai-ifcondition-example"></a>

```
<IfCondition condition="TargetVisible">
    <Communicate name="AttackNoise" channel="BattleChatter" expiry="2.0" waitUntilFinished="1" />
</IfCondition>
```

## IfTime<a name="ai-scripting-mbt-nodes-ai-iftime"></a>

Executes a child node if a time condition is satisfied\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-iftime-parameters"></a>

**since**  
Name of the time stamp to check for the condition\.

**isMoreThan**  
Condition statement test whether the time stamp is greater than a specified value\. Cannot be used with the parameter `isLessThan`\.

**isLessThan**  
Condition statement test whether the time stamp is less than a specified value\. Cannot be used with the parameter `isMoreThan`\.

**orNeverBeenSet**  
\(Optional\) Boolean indicating whether or not to set the node to succeed if the time stamp was never set\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-iftime-success"></a>

If the time condition is true, the node returns the result of executing the child node\. It FAILS if the time condition is false\. If the specified time stamp was not previously set, the node FAILS, unless the parameter `orNeverBeenSet` is true, in which case it SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-iftime-example"></a>

```
<IfTime since="FragGrenadeThrownInGroup" isMoreThan="5.0" orNeverBeenSet="1">
    <ThrowGrenade type="frag" />
</IfTime>
```

## Log<a name="ai-scripting-mbt-nodes-ai-log"></a>

Adds a message to the AI agent's personal log\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-log-parameters"></a>

**message**  
Message to be logged\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-log-success"></a>

The node always SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-log-example"></a>

```
<Log message="Investigating suspicious activity." />
```

## Look<a name="ai-scripting-mbt-nodes-ai-look"></a>

Adds a location for the AI agent to look at, and clears it when the node stops executing\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-look-parameters"></a>

**at**  
Location to look at\. Allowed values are:   
+ ClosestGroupMember
+ RefPoint
+ Target

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-look-success"></a>

This node does not succeed or fail\.

### Example<a name="ai-scripting-mbt-nodes-ai-look-example"></a>

```
<Look at="ClosestGroupMember" />
```

## LuaGate<a name="ai-scripting-mbt-nodes-ai-luagate"></a>

Executes a child node only if the result from running a Lua script is true\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-luagate-parameters"></a>

**code**  
Lua script to be executed\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-luagate-success"></a>

The node SUCCEEDS if the result of the Lua script is true, and FAILS if the result is not true\. On success, the node returns the result of executing the child node\.

### Example<a name="ai-scripting-mbt-nodes-ai-luagate-example"></a>

```
<LuaGate code="return AI.GetGroupScopeUserCount(entity.id, 'DeadBodyInvestigator') == 0">
    <Animate name="AI_SearchLookAround" />
</LuaGate>
```

## LuaWrapper<a name="ai-scripting-mbt-nodes-ai-luawrapper"></a>

Runs a Lua script before and/or after the execution of a child node\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-luawrapper-parameters"></a>

**onEnter**  
\(Optional\) Script to be executed at the start\.

**onExit**  
\(Optional\) Script to be executed at the end\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-luawrapper-success"></a>

The node returns the result of executing the child node\.

### Example<a name="ai-scripting-mbt-nodes-ai-luawrapper-example"></a>

```
<LuaWrapper onEnter="entity:EnableSearchModule()" onExit="entity:DisableSearchModule()">
    <Animate name="AI_SearchLookAround" />
</LuaWrapper>
```

## MonitorCondition<a name="ai-scripting-mbt-nodes-ai-monitorcondition"></a>

Continuously checks the state of a specified condition\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-monitorcondition-parameters"></a>

**condition**  
Specifies the condition to be checked\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-monitorcondition-success"></a>

The node SUCCEEDS when the condition is satisfied\.

### Example<a name="ai-scripting-mbt-nodes-ai-monitorcondition-example"></a>

```
<MonitorCondition condition="TargetVisible" />
```

## Move<a name="ai-scripting-mbt-nodes-ai-move"></a>

Moves the AI agent from its current position to a specified destination\. If the destination is a target, then the end position is updated if it is not reached when the target moves\. See [Movement System](ai-movement.md)\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-move-parameters"></a>

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

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-move-success"></a>

The node SUCCEEDS if the destination is reached\. The node FAILS if the destination is deemed unreachable\.

### Example<a name="ai-scripting-mbt-nodes-ai-move-example"></a>

```
<Move to="Target" stance="Alerted" fireMode="Aim" speed="Run" stopWithinDistance="3" />
```

## Priority & Case<a name="ai-scripting-mbt-nodes-ai-priority"></a>

Prioritizes to selects from a set of possible child nodes to execute\. Within a `<Priority>` node, each child node is listed inside a `<Case>` node, which defines a condition statement\. A child node is selected and executed based on \(1\) the first child to have its condition met, and \(2\) in the case of ties, the order the child nodes are listed in\. All but the last child must have a condition statement; the last child listed is the default case, so it's condition must always be true\. 

### Parameters<a name="ai-scripting-mbt-nodes-ai-priority-parameters"></a>

The `<Priority>` node has no parameters\.

The `<Case>` node has the following parameters:

**condition**  
Condition statement used to prioritize a child node\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-priority-success"></a>

The node returns the result of the executed child node\.

### Example<a name="ai-scripting-mbt-nodes-ai-priority-example"></a>

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

## PullDownThreatLevel<a name="ai-scripting-mbt-nodes-ai-pulldownthreatlevel"></a>

Lower's the AI agent's perception of the target's threat\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-pulldownthreatlevel-parameters"></a>

**to**  

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-pulldownthreatlevel-success"></a>

The node always SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-pulldownthreatlevel-example"></a>

```
<PullDownThreatLevel to="Suspect" />
```

## QueryTPS<a name="ai-scripting-mbt-nodes-ai-querytps"></a>

Performs a TPS query to find a tactical position for the AI agent, and waits for a result\. See [AI Tactical Point System](ai-tactical-point-system.md)\. 

### Parameters<a name="ai-scripting-mbt-nodes-ai-querytps-parameters"></a>

**name**  
Name of the TPS query to run\.

**register**  
Location to store the result of the TPS query\. Allowed values include:   
+ RefPoint
+ Cover \(default\)

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-querytps-success"></a>

The node SUCCEEDS if the TPS returns a tactical position, or FAILS if it does not find a tactical position\.

### Example<a name="ai-scripting-mbt-nodes-ai-querytps-example"></a>

```
<QueryTPS name="queryName" register="Cover" />
```

## RandomGate<a name="ai-scripting-mbt-nodes-ai-randomgate"></a>

Executes a child node \(or not\) based on random chance\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-randomgate-parameters"></a>

**opensWithChance**  
Probability to use to determine whether the child node will be executed\. Allowed values include floats 0\.0 to 1\.0\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-randomgate-success"></a>

The node FAILS if the child node is not executed\. If it is executed, the node SUCCEEDS AND returns the result of the execution of its child node\.

### Example<a name="ai-scripting-mbt-nodes-ai-randomgate-example"></a>

```
<RandomGate opensWithChance="0.5">
    <ThrowGrenade type="frag" />
</RandomGate>
```

## SendTransitionSignal<a name="ai-scripting-mbt-nodes-ai-sendtransitionsignal"></a>

Sends a signal, destined for a state machine node on the behavior tree, with the explicit intent of causing a change of state\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-sendtransitionsignal-parameters"></a>

**name**  
Name of the signal to be sent\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-sendtransitionsignal-success"></a>

This node does not succeed or fail\.

### Example<a name="ai-scripting-mbt-nodes-ai-sendtransitionsignal-example"></a>

```
<SendTransitionSignal name="LeaveSearch" />
```

## SetAlertness<a name="ai-scripting-mbt-nodes-ai-setalertness"></a>

Sets the AI agent's alertness level\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-setalertness-parameters"></a>

**value**  
Alertness level\. Allowed values include integers 0 to 2\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-setalertness-success"></a>

The node always SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-setalertness-example"></a>

```
<SetAlertness value="1" />            
```

## Shoot<a name="ai-scripting-mbt-nodes-ai-shoot"></a>

Sets the AI agent to shoot at a target or location\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-shoot-parameters"></a>

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

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-shoot-success"></a>

The node SUCCEEDS if it executes for the specified duration\. The node FAILS if the aim is obstructed for longer than the specified timeout\.

### Example<a name="ai-scripting-mbt-nodes-ai-shoot-example"></a>

```
<Shoot at="Target" stance="Crouch" fireMode="Burst" duration="5" allowedSlopeNormalDeviationFromUpInDegrees="30" stanceToUseIfSlopeIsTooSteep="Stand" />
```

## ShootFromCover<a name="ai-scripting-mbt-nodes-ai-shootfromcover"></a>

Sets the AI agent to shoot at the target from cover and adjusts its stance accordingly\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-shootfromcover-parameters"></a>

**duration**  
Length of time \(in seconds\) the node should execute\.

**fireMode**  
Firing style\. Allowed values are listed for the [Shoot ](#ai-scripting-mbt-nodes-ai-shoot) node\.

**aimObstructedTimeout**  
\(Optional\) Length of time \(in seconds\) the AI agent's aim can be obstructed before the node will fail\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-shootfromcover-success"></a>

The node SUCCEEDS if it executes for the specified duration\. The node FAILS if the AI agent is not in cover, if there's no shoot posture, or if the aim is obstructed for longer than the specified timeout\.

### Example<a name="ai-scripting-mbt-nodes-ai-shootfromcover-example"></a>

```
<ShootFromCover duration="10" fireMode="Burst" aimObstructedTimeout="3" />
```

## Signal<a name="ai-scripting-mbt-nodes-ai-signal"></a>

Sends a signal to the AI system\. See [Signals](ai-scripting-signals.md)\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-signal-parameters"></a>

**name**  
Name of the signal to be sent\.

**filter**  
\(Optional\) Signal filter to use when sending the signal, which determines which AI agents will receive it\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-signal-success"></a>

The node always SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-signal-example"></a>

```
<Signal name="StartedJumpAttack" />
```

## SmartObjectStatesWrapper<a name="ai-scripting-mbt-nodes-ai-smartobjectstateswrapper"></a>

Sets the states of certain smart objects immediately before and/or after the execution of a child node\. 

### Parameters<a name="ai-scripting-mbt-nodes-ai-smartobjectstateswrapper-parameters"></a>

**onEnter**  
\(Optional\) Smart object states to set at the start\.

**onExit**  
\(Optional\) Smart object states to set at the end\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-smartobjectstateswrapper-success"></a>

The node returns the result of executing the child node\.

### Example<a name="ai-scripting-mbt-nodes-ai-smartobjectstateswrapper-example"></a>

```
<SmartObjectStatesWrapper onEnter="InSearch" onExit="-InSearch">
    <Animate name="LookAround" />
</SmartObjectStatesWrapper>
```

## Stance<a name="ai-scripting-mbt-nodes-ai-stance"></a>

Sets the stance of the AI agent\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-stance-parameters"></a>

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

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-stance-success"></a>

The node always SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-stance-example"></a>

```
<Stance name="Crouch" allowedSlopeNormalDeviationFromUpInDegrees="30" stanceToUseIfSlopeIsTooSteep="Stand" />
```

## StopMovement<a name="ai-scripting-mbt-nodes-ai-stopmovement"></a>

Sends a request to the Movement system to stop all movements\. See [Movement System](ai-movement.md)\. 

**Note**  
This may not immediately stop the AI agent The Movement system may be dependent on animations and physics that dictate a 'natural' stop rather than an immediate cessation of movement\. 

### Parameters<a name="ai-scripting-mbt-nodes-ai-stopmovement-parameters"></a>

**waitUntilStopped**  
Boolean indicating whether or not the node should wait for the Movement System to finish processing the request\.

**waitUntilIdleAnimation**  
Boolean indicating whether or not the node should wait until the Motion\_Idle animation fragment begins running in Mannequin\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-stopmovement-success"></a>

The node SUCCEEDS if the stop request has been completed\.

### Example<a name="ai-scripting-mbt-nodes-ai-stopmovement-example"></a>

```
<StopMovement waitUntilStopped="1" waitUntilIdleAnimation="0" />
```

## Teleport<a name="ai-scripting-mbt-nodes-ai-teleport"></a>

Moves the AI agent when both the destination point and source point are outside the camera view\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-teleport-parameters"></a>

None\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-teleport-success"></a>

The node always SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-teleport-example"></a>

```
<Teleport />
```

## ThrowGrenade<a name="ai-scripting-mbt-nodes-ai-throwgrenade"></a>

Triggers the AI agent to attempt a grenade throw\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-throwgrenade-parameters"></a>

**timeout**  
Maximum length of time \(in seconds\) to wait for the grenade to be thrown\.

**type**  
Grenade type to throw\. Allowed values include:  
+ emp
+ frag
+ smoke

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-throwgrenade-success"></a>

The node SUCCEEDS if a grenade is thrown before it times out, otherwise the node FAILS\.

### Example<a name="ai-scripting-mbt-nodes-ai-throwgrenade-example"></a>

```
<ThrowGrenade type="emp" timeout="3" />
```

## WaitUntilTime<a name="ai-scripting-mbt-nodes-ai-waituntiltime"></a>

Executes until a time condition is satisfied\.

### Parameters<a name="ai-scripting-mbt-nodes-ai-waituntiltime-parameters"></a>

**since**  
Name of the time stamp to check for the condition\.

**isMoreThan**  
Condition statement used to test whether the time stamp is greater than a specified value\. Cannot be used with the parameter `isLessThan`\.

**isLessThan**  
Condition statement used to test whether the time stamp is less than a specified value\. Cannot be used with the parameter `isMoreThan`\.

**succeedIfNeverBeenSet**  
\(Optional\) Boolean indicating whether or not to set the node to succeed if the time stamp was never set\.

### Success/Failure<a name="ai-scripting-mbt-nodes-ai-waituntiltime-success"></a>

The node SUCCEEDS if the time condition is true\. If the specified time stamp was not previously set, the node FAILS, unless the parameter `succeedIfNeverBeenSet` is true, in which case it SUCCEEDS\.

### Example<a name="ai-scripting-mbt-nodes-ai-waituntiltime-example"></a>

```
<WaitUntilTime since="BeingShotAt" isMoreThan="7" />
```