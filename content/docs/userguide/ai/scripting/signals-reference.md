---
description: ' See the following signals reference for the AI system in Amazon Lumberyard. '
title: Signals Reference
---
# Signals Reference {#ai-scripting-signals-reference}

A typical signal handler looks something like this:

```
OnEnemySeen = function(self, entity, distance)
    -- called when the AI sees a living enemy
end,
```

Parameters self \(behavior table\) and entity \(entity table\) are passed to every signal\. Additional parameters are specific to the signal being used\.

See also: `\Game\Scripts\AI\Behaviors\Template.lua`\.

## Perception Signals {#ai-scripting-signals-reference-perception}

The following signals are sent to AI agents when perception types of their attention targets change\.

Note that AITHREAT\_SUSPECT < AITHREAT\_INTERESTING < AITHREAT\_THREATENING < AITHREAT\_AGGRESSIVE\.

### No Target {#ai-scripting-signals-reference-perception-notarget}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnNoTarget |   | Attention target is lost |

### Sound {#ai-scripting-signals-reference-perception-sound}

Sound heard \(no visible target\)\.


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnSuspectedSoundHeard |   | Threat is AITHREAT\_SUSPECT |
| OnInterestingSoundHeard |   | Threat is AITHREAT\_INTERESTING |
| OnThreateningSoundHeard |   | Threat is AITHREAT\_THREATENING |
| OnEnemyHeard |   | Threat is AITHREAT\_AGGRESSIVE |

### Memory {#ai-scripting-signals-reference-perception-memory}

The target is not visible and is in memory\.


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnEnemyMemory |   | Threat is AITHREAT\_THREATENING |
| OnLostSightOfTarget |   | Threat is AITHREAT\_AGGRESSIVE |
| OnMemoryMoved |   | Threat is AITHREAT\_AGGRESSIVE and its location or owner has changed |

### Visual {#ai-scripting-signals-reference-perception-visual}

The target is visible\.


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnSuspectedSeen |   | Threat is AITHREAT\_SUSPECT |
| OnSomethingSeen |   | Threat is AITHREAT\_INTERESTING |
| OnThreateningSeen |   | Threat is AITHREAT\_THREATENING |
| OnEnemySeen | distance | Threat is AITHREAT\_AGGRESSIVE |
| OnObjectSeen | distance, data | AI sees an object registered for this signal\. data\.iValue = AI object type \(e\.g\. AIOBJECT\_GRENADE or AIOBJECT\_RPG\) |
| OnExposedToExplosion | data | AI is affected by explosion at data\.point |
| OnExplosionDanger |   | Destroyable object explodes |

### Awareness of Player {#ai-scripting-signals-reference-perception-awareness-player}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnPlayerLooking | sender, data | Player is looking at the AI for entity\.Properties\.awarenessOfPlayer seconds\. data\.fValue = player distance |
| OnPlayerSticking | sender | Player is staying close to the AI since <entity\.Properties\.awarenessOfPlayer> seconds |
| OnPlayerLookingAway | sender | Player has just stopped looking at the AI |
| OnPlayerGoingAway | sender | Player has just stopped staying close to the AI |

### Awareness of Attention Target {#ai-scripting-signals-reference-perception-awareness-target}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnTargetApproaching |   |   |
| OnTargetFleeing |   |   |
| OnNewAttentionTarget |   |   |
| OnAttentionTargetThreatChanged |   |   |
| OnNoTargetVisible |   |   |
| OnNoTargetAwareness |   |   |
| OnSeenByEnemy | sender | AI is seen by the enemy |

### Weapon Damage {#ai-scripting-signals-reference-perception-weapon-damage}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnBulletRain | sender | Enemy is shooting |
| OnDamage | sender, data | AI was damaged by another friendly/unknown AI\. data\.id = damaging AI's entity id |
| OnEnemyDamage | sender, data | AI was damaged by an enemy AI\. data\.id = damaging enemy's entity id |

### Proximity {#ai-scripting-signals-reference-perception-proximity}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnCloseContact |   | enemy gets at a close distance to an AI \(defined by Lua Property "damageRadius" of this AI\) |
| OnCloseCollision |   |

### Vehicles {#ai-scripting-signals-reference-perception-vehicles}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnVehicleDanger | sender, data | vehicle is going towards the AI\. data\.point = vehicle movement direction, data\.point2 = AI direction with respect to vehicle |
| OnEndVehicleDanger |   |   |
| OnTargetTooClose | sender, data | attention target is too close for the current weapon range \(it works only if AI is a vehicle\) |
| OnTargetTooFar | sender, data | attention target is too close for the current weapon range \(it works only if AI is a vehicle\) |
| OnTargetDead |   |   |

### User\-defined {#ai-scripting-signals-reference-perception-user-defined}

Custom signals can be sent when an attention target enters or leaves certain ranges\. This is configured using the following Lua functions:

```
AI.ResetRanges(entityID);
AI.AddRange(entityID,range, enterSignal, leaveSignal);
AI.GetRangeState(entityID, rangeID);
AI.ChangeRange(entityID, rangeID, distance);
```

## Weapon\-Related Signals {#ai-scripting-signals-reference-weapons}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnLowAmmo |   |   |
| OnMeleeExecuted |   |   |
| OnOutOfAmmo |   |   |
| OnReload |   | AI goes into automatic reload after its clip is empty |
| OnReloadDone |   | reload is done |
| OnReloaded |   |   |

## Navigation Signals {#ai-scripting-signals-reference-navigation}

### Pathfinding {#ai-scripting-signals-reference-navigation-pathfinding}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnEndPathOffset | sender | AI has requested a path and the end of path is far from the desired destination |
| OnNoPathFound | sender | AI has requested a path which is not possible |
| OnPathFindAtStart |   |   |
| OnBackOffFailed | sender | AI tried to execute a "backoff" goal which failed |
| OnPathFound | sender | AI has requested a path and it's been computed successfully |

### Steering {#ai-scripting-signals-reference-navigation-steering}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnSteerFailed |  |  |

### Smart Objects {#ai-scripting-signals-reference-navigation-smart-objects}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnEnterNavSO |  |  |
| OnLeaveNavSO |  |  |
| OnUseSmartObject |  |  |

### Navigation Shapes {#ai-scripting-signals-reference-navigation-shapes}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnShapeEnabled |  |  |
| OnShapeDisabled |  |  |

## Tactics Signals {#ai-scripting-signals-reference-tactics}

### Tactical Point System {#ai-scripting-signals-reference-tactics-tps}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnTPSDestNotFound |  |  |
| OnTPSDestFound |  |  |
| OnTPSDestReached |  |  |

### Cover {#ai-scripting-signals-reference-tactics-cover}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnHighCover |  |  |
| OnLowCover |  |  |
| OnMovingToCover |  |  |
| OnMovingInCover |  |  |
| OnEnterCover |
| OnLeaveCover |  |  |
| OnCoverCompromised |  |  |

## Groups Signals {#ai-scripting-signals-reference-groups}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnGroupChanged |  |  |
| OnGroupMemberMutilated |  |  |
| OnGroupMemberDiedNearest |  |  |

### Formation {#ai-scripting-signals-reference-groups-formation}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnNoFormationPoint | sender | AI couldn't find a formation point |
| OnFormationPointReached |   |   |
| OnGetToFormationPointFailed |   |   |

### Group Coordination {#ai-scripting-signals-reference-groups-coordination}

Group target is the most threatening target of the group\.


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnGroupTargetNone |  |  |
| OnGroupTargetSound |  |  |
| OnGroupTargetMemory |  |  |
| OnGroupTargetVisual |  |  |
| PerformingRole |  |  |

## Other Signals {#ai-scripting-signals-reference-other}

### Forced Execute {#ai-scripting-signals-reference-other-forced-execute}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnForcedExecute |  |  |
| OnForcedExecuteComplete |  |  |

### Animation {#ai-scripting-signals-reference-other-animation}


****

| Name | Parameters | Description |
| --- | --- | --- |
| AnimationCanceled |  |  |

### Game {#ai-scripting-signals-reference-other-game}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnFallAndPlay |  |  |

### Vehicle\-related {#ai-scripting-signals-reference-other-vehicle}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnActorSitDown | Actor has entered a vehicle |  |

### Squads {#ai-scripting-signals-reference-other-squads}


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnSomebodyDied |  |  |
| OnBodyFallSound |  |  |
| OnBodyFallSound |  |  |
| OnUnitDied |  |  |
| OnSquadmateDied |  |  |
| OnPlayerTeamKill |  |  |
| OnUnitBusy |  |  |
| OnPlayerDied |  |  |


****

| Name | Parameters | Description |
| --- | --- | --- |
| OnFriendInWay | sender | AI is trying to fire and another friendly AI is on his line of fire |
| URPRISE\_ACTION |   |   |
| OnActionDone | data | AI action of this agent was finished\. data\.ObjectName is the action name, data\.iValue is 0 if action was cancelled or 1 if it was finished normally, data\.id is the entity id of "the object" of the AI action |