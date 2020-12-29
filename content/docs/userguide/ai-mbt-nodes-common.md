# Common AI MBT Nodes<a name="ai-mbt-nodes-common"></a>

The following common AI Modular Behavior Tree nodes are supported\.

## AnimateFragment node<a name="ai-mbt-nodes-cryaction-animatefragment"></a>

This node plays an Mannequin animation fragment and waits until the animation finishes\.

**Parameters**
+ **name**: The name of the fragment to play\.

**Behavior**
+ **Success**: If the animation is correctly played or if no operation was needed\. 
+ **Failure**: If an error occurs while trying to queue the request to play the specified fragment\. 

**Example**

```
<AnimateFragment name="SomeFragmentName" />
```

## Bubble node<a name="ai-mbt-nodes-bubble"></a>

Used to display a message in a bubble above the agent\.
+ **message**: The message that should be shown in the speech bubble\.
+ **duration**: The number of seconds to show the message\. Default = 0\.
+ **balloon**: Shows the message in a balloon about the AI agent\. 1 will show the message in a balloon above the agent; 0 will not\. Default = 1\.
+ **log**: Writes the message to a general\-purpose log\. 1 will write to the log; 0 will not Default = 1\.

None\.

**Behavior**
+ **Success**: Succeeds immediately after having queued the message to be displayed\.

**Example**

```
<Bubble message="MessageToBeDisplayedAndOrLogged" duration="5.0" balloon="true" log="true" />
```

## Move node<a name="ai-mbt-nodes-move"></a>

Used to move the agent from the current position to the specified destination\. If the destination is a target then the end position is updated if not reached while the target moves\.

**Parameters**
+ **speed**: Movement speed, which can be any of the following: Walk, Run, or Sprint\.
+ **stance**: Stance, which can be any of the following: Relaxed, Alerted, or Stand\. Default = Stand\. 
+ **bodyOrientation**: Body orientation, which can be any of the following: FullyTowardsMovementDirection, FullyTowardsAimOrLook, or HalfwayTowardsAimOrLook\. Default = HalfwayTowardsAimOrLook\.
+ **moveToCover**: True if the agent is moving into cover; otherwise false\. Default = false\.
+ **turnTowardsMovementDirectionBeforeMoving**True if the agent should first turn into the direction of movement before actually moving; false if not\. Default = false\.
+ **strafe**: True if the agent is allowed to strafe; false it not\. Default = false\. 
+ **glanceInMovementDirection**: True if the agent is allowed to glance in the direction of movement; false if it should always look at its look\-at target\. Default = false\. 
+ **to**: Movement destination, which can be one of the following: Target, Cover, RefPoint\. or LastOp\. 
  + **Target**: The current attention target\. 
  + **Cover**: The current cover position\.
  + **RefPoint**: The current reference position\.
  + **LastOp**: The position of the last successful position related operation\.
+ **stopWithinDistance**: If within this distance from the target, stop moving\. Default = 0\.0\.
+ **stopDistanceVariation**: Additional random stopping distance, Default = 0\.0\.
+ **fireMode**: Fire mode while moving: Default \- Off\.
  + **Off**: Do not fire\.
  + **Burst**: Fire in bursts \- living targets only\.
  + **Continuous**: Fire continuously \- living targets only\.
  + **Forced**: Fire continuously \- allow any target\.
  + **Aim**: Aim target only \- allow any target
  + **Secondary**: Fire secondary weapon\.
  + **SecondarySmoke**: Fire smoke grenade
  + **Melee**: Melee\.
  + **Kill**: No missing, shoot directly at the target, no matter what aggression/attackRange/accuracy is\.
  + **BurstWhileMoving**: Fire in bursts, while moving and too far away from the target\.
  + **PanicSpread**: Fire randomly in the general direction of the target\.
  + **BurstDrawFire**: Fire in bursts, in an attempt to draw enemy fire\.
  + **MeleeForced**: Melee, without distance restrictions\.
  + **BurstSnipe**: Fire in burst, aiming for a head\-shot\. 
  + **AimSweep**: Keep aiming at the target, but not allowed to fire\.
  + **BurstOnce**: Fire a single burst\.
+ **avoidDangers**: 1 if dangers should be avoided while moving, 0 if they can be ignored\. Default = 1\.
+ **avoidGroupMates**: 1 if group mates should be avoided while moving, 0 if they can be ignored\. Default = 1\.
+ **considerActorsAsPathObstacles**: 1 if any actor should be considered a path obstacle that the path\-finder should avoid, 0 if they can be ignored\. Default = 0\. 
+ **lengthToTrimFromThePathEnd**: The resulting path\-finder path will be trimmed by the specified amount of distance\. Positive values will trim from the end of the path; negative values will trim from the start of the path\. Default = 0\.0\. 

**Behavior**
+ **Success**: If the destination is reached\. 
+ **Failure**: If the destination is deemed unreachable\.

**Example**

```
<Move to="DestinationType" stance="StanceName" fireMode="FiremodeName" speed="SpeedName" stopWithinDistance="3c " />
```

## QueryTPS node<a name="ai-mbt-nodes-querytps"></a>

This node performs a Tactical Position System query and waits for a result\.

**Parameters**
+ **name**: The name of the TPS query to use\. 
+ **register**: Where to store result of the TPS query: RefPoint or Cover\. Default = Cover\. 

**Behavior**
+ **Success**: If the TPS returns a tactical position\.
+ **Failure**: If the TPS does not find a tactical position\.

**Example**

```
<QueryTPS name="NameOfTheQuery" register="NameOfTheRegister" />
```

## IfTime node<a name="ai-mbt-nodes-iftime"></a>

This node executes the child node if the time condition is satisfied\.

**Parameters**
+ **since**: Name of the time stamp used for the condition\.
+ **isMoreThan**: Defines the condition to be a comparison if the value of the time stamp is more than this value \(exclusive with the parameter 'isLessThan'\)\.
+ **isLessThan**: Defines the condition to be a comparison if the value of the time stamp is less than this value \(exclusive with the parameter 'isMoreThan'\)\.
+ **orNeverBeenSet**: \(Optional\) Changes the behavior of the node in case the time stamp was never set, instead of failing the node will succeed\.

**Behavior**
+ **Success**: If orNeverBeenSet is true\.
+ **Failure**: If the time condition is not satisfied or if the time stamp was not previously set\.

**Example**

```
<IfTime since="FragGrenadeThrownInGroup" isMoreThan="5.0" orNeverBeenSet="1">
    <ThrowGrenade type="frag" />
</IfTime>
```

## WaitUntilTime node<a name="ai-mbt-nodes-waituntiltime"></a>

This node executes the child node if the time condition is satisfied\.

**Parameters**
+ **since**: Name of the time stamp used for the condition\.
+ **isMoreThan**: Defines the condition to be a comparison if the value of the time stamp is more than this value \(exclusive with the parameter 'isLessThan'\)\.
+ **isLessThan**: Defines the condition to be a comparison if the value of the time stamp is less than this value \(exclusive with the parameter 'isMoreThan'\)\.
+ **orNeverBeenSet**: \(Optional\) Changes the behavior of the node in case the time stamp was never set, instead of failing the node will succeed\.

**Behavior**
+ **Success**: The time stamp was not set previously set and the parameter succeedIfNeverBeenSet is true\. Otherwise, the node returns the result of the execution of its child node\.

**Example**

```
<WaitUntilTime since="BeingShotAt" isMoreThan="7" />
```

## AssertTime node<a name="ai-mbt-nodes-asserttime"></a>

This node succeeds if the time condition is satisfied\.

**Parameters**
+ **since**: Name of the time stamp used for the condition\.
+ **isMoreThan**: Defines the condition to be a comparison if the value of the time stamp is more than this value \(exclusive with the parameter 'isLessThan'\)\.
+ **isLessThan**: Defines the condition to be a comparison if the value of the time stamp is less than this value \(exclusive with the parameter 'isMoreThan'\)\.
+ **orNeverBeenSet**: \(Optional\) Changes the behavior of the node in case the time stamp was never set, instead of failing the node will succeed\.

**Behavior**
+ **Success**: If the time condition is true or the orNeverBeenSet parameter is true\.
+ **Failure**: If the time stamp was not previously set\. 

**Example**

```
<AssertTime since="GroupLostSightOfTarget" isLessThan="10" orNeverBeenSet="1" />
```

## Priority:Case node<a name="ai-mbt-nodes-priority-case"></a>

This node executes the child with the current highest priority\. The priorities are derived from the order in which the children are defined and the satisfaction of their individual conditions, so that the highest priority goes to the first child to have its condition met\.

The children's conditions must be specified with the use of Case nodes with the exception of the last child which is considered to be the default case, meaning that its condition is always true and cannot be specified\.

**Parameters**
+ **condition**: Specifies the condition of the child\.

**Behavior**

The node returns the result of the execution of the child node\.

**Example**

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

## LuaGate node<a name="ai-mbt-nodes-luagate"></a>

This node executes the child node if the result from running a lua snippet is true\.

**Parameters**
+ **code**: The lua code to be executed\.

**Behavior**
+ **Failure**: If the lua code returns a value different from true\. Otherwise, the node returns the result of the execution of its child node\. 

**Example**

```
<LuaGate code="return AI.GetGroupScopeUserCount(entity.id, 'DeadBodyInvestigator') == 0">
```

**Warning**  
 The LuaGate node uses the legacy scripting context and does not work with the new component entity system\. 

## RandomGate node<a name="ai-mbt-nodes-randomgate"></a>

This node executes or not the child node based on a random chance\.

**Parameters**
+ **opensWithChance**: The chance of executing the child node \(0\.0 \- 1\.0\)\.

**Behavior**
+ **Failure**: If the child is not executed\. Otherwise, the node returns the result of the execution of its child node\.

**Example**

```
<RandomGate opensWithChance="0.5">
```

## AdjustCoverStance node<a name="ai-mbt-nodes-adjustcoverstance"></a>

This node updates the agent's cover stance based on the maximum height in which his current cover is still effective\.

**Parameters**
+ **duration**: \(Optional\) The amount of seconds the node will execute\. Use 'continuous' for unlimited time\.
+ **variation**: \(Optional\) The extra random amount of seconds that will be added on top of the specified duration, in the range \(0, variation\)\.

**Behavior**
+ **Success**: If the duration of execution elapses\.
+ **Failure**: If the child is not in cover\.

**Example**

```
<AdjustCoverStance duration="5.0" variation="1.0"/>
```

## SetAlertness node<a name="ai-mbt-nodes-setalertness"></a>

This node sets the agent's alertness value\.

**Parameters**
+ **value**: The alertness value \(0\-2\)\.

**Behavior**

The node succeeds immediately\.

**Example**

```
<SetAlertness value="1" />
```

## Log node<a name="ai-mbt-nodes-log"></a>

This node adds a message to the agent's personal log\.

**Parameters**
+ **message**: The message to be logged\.

**Behavior**

The node succeeds immediately\.

**Example**

```
<Log message="Investigating suspicious activity." />
```

## Communicate node<a name="ai-mbt-nodes-communicate"></a>

This node requests the communication manager to play one of the agent's readabilities\.

**Parameters**
+ **name**: The name of the communication to be played\.
+ **channel**: The channel on which the communication is to be set\.
+ **waitUntilFinished**: \(Optional\) Specifies if the execution should wait for the end of the communication before finishing\.
+ **timeout**: \(Optional\) The threshold defining the maximum amount of seconds the node will wait\.
+ **expiry**: \(Optional\) The amount of seconds the communication can wait for the channel to be clear\.
+ **minSilence**: \(Optional\) The amount of seconds the channel will be silenced after the communication is played\.
+ **ignoreSound**: \(Optional\) Sets the sound component of the communication to be ignored\.
+ **ignoreAnim**: \(Optional\) Sets the animation component of the communication to be ignored\.

**Behavior**
+ **Success**: If the timeout elapses or when the readability is complete if the node is set to wait until the communication is finished\.
+ **Failure**: 

**Example**

```
<Communicate name="Advancing" channel="Tactic" expiry="1.0" waitUntilFinished="0" />
```

## Animate node<a name="ai-mbt-nodes-animate"></a>

This node sets the agent to play an animation\.

**Parameters**
+ **name**: The name of the animation to be played\.
+ **urgent**: \(Optional\) Adds the urgent flag to the animation\.
+ **loop**: \(Optional\) Adds the loop flag to the animation\.
+ **setBodyDirectionTowardsAttentionTarget**: \(Optional\) Changes the body target direction to be facing the attention target\.

**Behavior**
+ **Success**: If the animation failed to be initialized or when it is finished\.

**Example**

```
<Animate name="LookAround" loop="1"/>
```

## Signal node<a name="ai-mbt-nodes-signal"></a>

This node sends a signal to the AI system\.

**Parameters**
+ **name**: The name of the signal to be sent\.
+ **filter**: \(Optional\) The filter to be applied to the signal in the AI system\.

**Behavior**

The node succeeds immediately\.

**Example**

```
<Signal name="StartedJumpAttack" />
```

## SendTransitionSignal node<a name="ai-mbt-nodes-sendtransitionsignal"></a>

This node sends a signal destined for a state machine node on the behavior tree, with the explicit intent of causing a change of state\.

**Parameters**
+ **name**: The name of the signal to be sent\.

**Behavior**

The node does not succeed or fail\.

**Example**

```
<SendTransitionSignal name="LeaveSearch" />
```

## Stance node<a name="ai-mbt-nodes-stance"></a>

This node sets the stance of the agent\.

**Parameters**
+ **name**: The name of the stance to be set: Relaxed, Alerted, Crouch, Stand\.
+ **stanceToUseIfSlopeIsTooSteep**: \(Optional\) The alternative stance to be used in case the slope is too steep\.
+ **allowedSlopeNormalDeviationFromUpInDegrees**: \(Optional\) Defines how steep can the slope be for this stance\.

**Behavior**

The node succeeds immediately\.

**Example**

```
<Stance name="Crouch" allowedSlopeNormalDeviationFromUpInDegrees="30" 
stanceToUseIfSlopeIsTooSteep="Stand" />
```

## IfCondition node<a name="ai-mbt-nodes-ifcondition"></a>

This node executes the child node if the specified condition is satisfied\.

**Parameters**
+ **condition**: Specifies the condition to be checked\.

**Behavior**

The node returns the result of the child's execution if the condition is true, otherwise it fails\.

**Example**

```
<IfCondition condition="TargetVisible">
    <Communicate name="AttackNoise" channel="BattleChatter" expiry="2.0" 
waitUntilFinished="1" />
</IfCondition>
```

## AssertCondition node<a name="ai-mbt-nodes-assertcondition"></a>

This node succeeds if the specified condition is satisfied\.

**Parameters**
+ **condition**: Specifies the condition to be checked\.

**Behavior**

The node succeeds if the condition is true, otherwise it fails\.

**Example**

```
<AssertCondition condition="HasTarget" />
```

## LuaWrapper node<a name="ai-mbt-nodes-luawrapper"></a>

This node executes the child node with the additional option of running a lua script on the start and/or end of that execution\.

**Parameters**
+ **onEnter**: \(Optional\) The code to be executed at the start\.
+ **onExit**: \(Optional\) The code to be executed at the end\.

**Behavior**

The node returns the result of the child's execution\.

**Example**

```
<LuaWrapper onEnter="entity:EnableSearchModule()" 
onExit="entity:DisableSearchModule()">
    <Animate name="AI_SearchLookAround" />
</LuaWrapper>
```

**Warning**  
 The LuaWrapper node uses the legacy scripting context and does not work with the new component entity system\. 

## ExecuteLua node<a name="ai-mbt-nodes-executelua"></a>

This node executes a lua script\.

**Parameters**
+ **code**: The code to be executed\.

**Behavior**

The node always succeeds\.

**Example**

```
<ExecuteLua code="entity:SetEyeColor(entity.EyeColors.Relaxed)" />
```

**Warning**  
 The ExecuteLua node uses the legacy scripting context and does not work with the new component entity system\. 

## AssertLua node<a name="ai-mbt-nodes-assertlua"></a>

This node executes Lua code and translates the return value of that code from true or false to success or failure\. It can then be used to build preconditions in the Modular Behavior Tree\.

**Parameters**
+ **code**: The code to be executed\.

**Behavior**

Succeeds if the Lua code returns value is true, otherwise it fails\.

**Example**

```
<AssertLua code="return entity:IsClosestToTargetInGroup()" />
```

**Warning**  
 The AssertLua node uses the legacy scripting context and does not work with the new component entity system\. 

## GroupScope node<a name="ai-mbt-nodes-groupscope"></a>

This node tries to enter the agent in a group scope, which is limited by the specified amount of concurrent users\. If the node succeeds to do that, then the child node is executed\.

**Parameters**
+ **name**: The name of the group scope to be entered\. 
+ **allowedConcurrentUsers**: \(Optional\) The maximum number of simultaneous users of that can be in the specified group scope\.

**Behavior**

The node fails if the agent could not enter the group scope, otherwise returns the result of the execution of the child\.

**Example**

```
<GroupScope name="DeadBodyInvestigator" allowedConcurrentUsers="1">
    <SendTransitionSignal name="GoToPrepareToInvestigateDeadBody" />
</GroupScope>
```

## Look node<a name="ai-mbt-nodes-look"></a>

This node adds a location for the agent to look at and clears it when the node stops executing\.

**Parameters**
+ **at**: The location to look at: ClosestGroupMember, RefPoint,Target\.

**Behavior**

The nodes does not succeed or fail\.

**Example**

```
<Look at="ClosestGroupMember" />
```

## Aim node<a name="ai-mbt-nodes-aim"></a>

This node sets the location where the agent should aim, clearing it when the node stops executing\.

**Parameters**
+ **at**: The location to look at: RefPoint,Target\.
+ **angleThreshold**: \(Optional\) The tolerance angle for the agent to be considered aiming in the desired direction\.
+ **durationOnceWithinThreshold**: \(Optional\) The amount of seconds to keep on aiming\.

**Behavior**
+ **Success**: If after aiming in the desired direction for the specified time, if the location is not valid or if the timeout elapses\.

**Example**

```
<Aim at="Target" durationOnceWithinThreshold="2.0" />
```

## AimAroundWhileUsingAMachineGun node<a name="ai-mbt-nodes-aim-machine-gun"></a>

This node updates the aim direction of the agent for when he is using a mounted machine gun\.

**Parameters**
+ **maxAngleRange**: \(Optional\) The maximum amount to deviate from the original position\.
+ **minSecondsBeweenUpdates**: \(Optional\) The minimum amount of delay between updates\.
+ **useReferencePointForInitialDirectionAndPivotPosition**: 

**Behavior**

The node does not succeed or fail\.

**Example**

```
<AimAroundWhileUsingAMachingGun minSecondsBeweenUpdates="2.5" maxAngleRange="30" 
useReferencePointForInitialDirectionAndPivotPosition="1"/>
```

## ClearTargets node<a name="ai-mbt-nodes-cleartargets"></a>

This node clears the agent's targets information\. 

**Parameters**

None\.

**Behavior**

The node succeeds immediately\.

**Example**

```
<ClearTargets />
```

## StopMovement node<a name="ai-mbt-nodes-stopmovement"></a>

This node sends a request to the Movement System to stop all the movements\.

This may not always immediately physically stop the agent\. The Movement System may be dependent on the influence of animations and physics, for example, which may result in a natural stop and not an immediate stop\.

**Parameters**
+ **waitUntilStopped**: 1 if the node should wait for the Movement System to have processed the request; 0 if not\.
+ **waitUntilIdleAnimation**: 1 if the node should wait until the Motion\_Idle animation fragment started running in Mannequin, 0 if not\.

**Behavior**
+ **Success**: If the stop request has been completed\.

**Example**

```
<StopMovement waitUntilStopped="1" waitUntilIdleAnimation="0" />
```

## Teleport node<a name="ai-mbt-nodes-teleport"></a>

This node teleports the character when the destination point and the source point are both outside of the camera view\.

**Parameters**

None\.

**Behavior**
+ **Success**: After the character is teleported\. 

**Example**

```
<Teleport />
```

## SmartObjectStateWrapper node<a name="ai-mbt-nodes-smartobjectsstatewrapper"></a>

This node executes the child node with the additional option of setting certain smart objects states on the start and/or end of that execution\.

**Parameters**
+ **onEnter**: \(Optional\) The smart object states to set at the start of the child's execution\.
+ **onExit**: \(Optional\) The smart object states to set at the end of the child's execution\.

**Behavior**

The node returns the result of the execution of its child node\.

**Example**

```
<SmartObjectStatesWrapper onEnter="InSearch" onExit="-InSearch">
    <Animate name="LookAround" />
</SmartObjectStatesWrapper>
```

## CheckTargetCanBeReached node<a name="ai-mbt-nodes-checktargetcanbereached"></a>

This node checks if the agent's attention target can be reached\.

**Parameters**
+ **mode**: Defines the target to use: UseLiveTarget or UseAttentionTarget\.

**Behavior**
+ **Success**: If it can reach the target\. 
+ **Failure**: If it cannot reach the target\.

**Example**

```
<CheckIfTargetCanBeReached mode="UseLiveTarget" />
```

## MonitorCondition node<a name="ai-mbt-nodes-monitorcondition"></a>

This node continuously checks for the state of a specified condition\.

**Parameters**
+ **condition**: Specifies the condition to be checked\.

**Behavior**
+ **Success**: When the condition is satisfied\.

**Example**

```
<MonitorCondition condition="TargetVisible" />
```

## AnimationTagWrapper node<a name="ai-mbt-nodes-animationtagwrapper"></a>

This node executes the child node, adding an animation tag for the agent on the beginning of that execution and clearing it on the end\.

**Parameters**
+ **name**: The animation tag to be set\.

**Behavior**

The node returns the result of the execution of its child node\.

**Example**

```
<AnimationTagWrapper name="ShootFromHip">
    <Shoot at="Target" stance="Stand" duration="5" fireMode="Burst" />
</AnimationTagWrapper>
```

## ShootFromCover node<a name="ai-mbt-nodes-shootfromcover"></a>

This node sets the agent to shoot at the target from cover and adjusts his stance accordingly\.

**Parameters**
+ **duration**: The number of seconds the node should execute\.
+ **fireMode**: The firemode to be used for shooting\.
+ **aimObstructedTimeout**: \(Optional\) The number of seconds the aim is allowed to be obstructed\.

**Behavior**
+ **Success**: If the duration of execution elapses\.
+ **Failure**: If the agent is not in cover, if there's no shoot posture or if the aim obstructed timeout elapses\.

**Example**

```
<ShootFromCover duration="10" fireMode="Burst" aimObstructedTimeout="3" />
```

## Shoot node<a name="ai-mbt-nodes-shoot"></a>

This node sets the agent to shoot at a target or a location\.

**Parameters**
+ **duration**: The number of seconds the node should execute\.
+ **at**: The location to shoot at: AttentionTarget, ReferencePoint, LocalSpacePosition\.
+ **fireMode**: The fire mode to be used for shooting\.
+ **stance**: The stance to be set while shooting: Relaxed, Alerted, Crouch, Stand\.
+ **position**: \(Mandatory only if the target is a local space position\)\. The local space position to be used as the target\.
+ **stanceToUseIfSlopeIsTooSteep**: \(Optional\) The alternative stance to be used in case the slope is too steep\.
+ **allowedSlopeNormalDeviationFromUpInDegrees**: \(Optional\) Defines how steep can the slope be for this stance\.
+ **aimObstructedTimeout**: \(Optional\) The amount of seconds the aim is allowed to be obstructed\.

**Behavior**
+ **Success**: If the duration of execution elapses\.
+ **Failure**: If the aim obstructed timeout elapses

**Example**

```
<Shoot at="Target" stance="Crouch" fireMode="Burst" duration="5" 
allowedSlopeNormalDeviationFromUpInDegrees="30" 
stanceToUseIfSlopeIsTooSteep="Stand" />
```

## ThrowGrenade node<a name="ai-mbt-nodes-throwgrenade"></a>

This node sets the agent to attempt a grenade throw\.

**Parameters**
+ **timeout**: The maximum amount of seconds the node will wait for the grenade to be thrown\.
+ **type**: The type of grenade: emp, frag, smoke\.

**Behavior**
+ **Success**: If a grenade is thrown before it times out\.
+ **Failure**: If a grenade is not thrown before it times out\. 

**Example**

```
<ThrowGrenade type="emp" timeout="3" />
```

## PullDownThreatLevel node<a name="ai-mbt-nodes-pulldownthreatlevel"></a>

This node sets the agent to lower his notion the target's threat\.

**Parameters**

None\.

**Behavior**

The node succeeds immediately\.

**Example**

```
<PullDownThreatLevel to="Suspect" />
```