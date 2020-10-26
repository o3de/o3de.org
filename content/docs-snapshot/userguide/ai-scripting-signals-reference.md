# Signals Reference<a name="ai-scripting-signals-reference"></a>

A typical signal handler looks something like this: 

```
OnEnemySeen = function(self, entity, distance) 
    -- called when the AI sees a living enemy 
end,
```

Parameters self \(behavior table\) and entity \(entity table\) are passed to every signal\. Additional parameters are specific to the signal being used\. 

See also: `\Game\Scripts\AI\Behaviors\Template.lua`\.

## Perception Signals<a name="ai-scripting-signals-reference-perception"></a>

The following signals are sent to AI agents when perception types of their attention targets change\.

Note that AITHREAT\_SUSPECT < AITHREAT\_INTERESTING < AITHREAT\_THREATENING < AITHREAT\_AGGRESSIVE\.

### No Target<a name="ai-scripting-signals-reference-perception-notarget"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnNoTarget |   | Attention target is lost | 

### Sound<a name="ai-scripting-signals-reference-perception-sound"></a>

Sound heard \(no visible target\)\.


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnSuspectedSoundHeard |   | Threat is AITHREAT\_SUSPECT | 
| OnInterestingSoundHeard |   | Threat is AITHREAT\_INTERESTING | 
| OnThreateningSoundHeard |   | Threat is AITHREAT\_THREATENING | 
| OnEnemyHeard |   | Threat is AITHREAT\_AGGRESSIVE | 

### Memory<a name="ai-scripting-signals-reference-perception-memory"></a>

The target is not visible and is in memory\.


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnEnemyMemory |   | Threat is AITHREAT\_THREATENING | 
| OnLostSightOfTarget |   | Threat is AITHREAT\_AGGRESSIVE | 
| OnMemoryMoved |   | Threat is AITHREAT\_AGGRESSIVE and its location or owner has changed | 

### Visual<a name="ai-scripting-signals-reference-perception-visual"></a>

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

### Awareness of Player<a name="ai-scripting-signals-reference-perception-awareness-player"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnPlayerLooking | sender, data | Player is looking at the AI for entity\.Properties\.awarenessOfPlayer seconds\. data\.fValue = player distance | 
| OnPlayerSticking | sender | Player is staying close to the AI since <entity\.Properties\.awarenessOfPlayer> seconds | 
| OnPlayerLookingAway | sender | Player has just stopped looking at the AI | 
| OnPlayerGoingAway | sender | Player has just stopped staying close to the AI | 

### Awareness of Attention Target<a name="ai-scripting-signals-reference-perception-awareness-target"></a>


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

### Weapon Damage<a name="ai-scripting-signals-reference-perception-weapon-damage"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnBulletRain | sender | Enemy is shooting | 
| OnDamage | sender, data | AI was damaged by another friendly/unknown AI\. data\.id = damaging AI's entity id | 
| OnEnemyDamage | sender, data | AI was damaged by an enemy AI\. data\.id = damaging enemy's entity id | 

### Proximity<a name="ai-scripting-signals-reference-perception-proximity"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnCloseContact |   | enemy gets at a close distance to an AI \(defined by Lua Property "damageRadius" of this AI\) | 
| OnCloseCollision |   | 

### Vehicles<a name="ai-scripting-signals-reference-perception-vehicles"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnVehicleDanger | sender, data | vehicle is going towards the AI\. data\.point = vehicle movement direction, data\.point2 = AI direction with respect to vehicle | 
| OnEndVehicleDanger |   |   | 
| OnTargetTooClose | sender, data | attention target is too close for the current weapon range \(it works only if AI is a vehicle\) | 
| OnTargetTooFar | sender, data | attention target is too close for the current weapon range \(it works only if AI is a vehicle\) | 
| OnTargetDead |   |   | 

### User\-defined<a name="ai-scripting-signals-reference-perception-user-defined"></a>

Custom signals can be sent when an attention target enters or leaves certain ranges\. This is configured using the following Lua functions:

```
AI.ResetRanges(entityID); 
AI.AddRange(entityID,range, enterSignal, leaveSignal);
AI.GetRangeState(entityID, rangeID);
AI.ChangeRange(entityID, rangeID, distance);
```

## Weapon\-Related Signals<a name="ai-scripting-signals-reference-weapons"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnLowAmmo |   |   | 
| OnMeleeExecuted |   |   | 
| OnOutOfAmmo |   |   | 
| OnReload |   | AI goes into automatic reload after its clip is empty | 
| OnReloadDone |   | reload is done | 
| OnReloaded |   |   | 

## Navigation Signals<a name="ai-scripting-signals-reference-navigation"></a>

### Pathfinding<a name="ai-scripting-signals-reference-navigation-pathfinding"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnEndPathOffset | sender | AI has requested a path and the end of path is far from the desired destination | 
| OnNoPathFound | sender | AI has requested a path which is not possible | 
| OnPathFindAtStart |   |   | 
| OnBackOffFailed | sender | AI tried to execute a "backoff" goal which failed | 
| OnPathFound | sender | AI has requested a path and it's been computed successfully | 

### Steering<a name="ai-scripting-signals-reference-navigation-steering"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnSteerFailed |  |  | 

### Smart Objects<a name="ai-scripting-signals-reference-navigation-smart-objects"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnEnterNavSO |  |  | 
| OnLeaveNavSO |  |  | 
| OnUseSmartObject |  |  | 

### Navigation Shapes<a name="ai-scripting-signals-reference-navigation-shapes"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnShapeEnabled |  |  | 
| OnShapeDisabled |  |  | 

## Tactics Signals<a name="ai-scripting-signals-reference-tactics"></a>

### Tactical Point System<a name="ai-scripting-signals-reference-tactics-tps"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnTPSDestNotFound |  |  | 
| OnTPSDestFound |  |  | 
| OnTPSDestReached |  |  | 

### Cover<a name="ai-scripting-signals-reference-tactics-cover"></a>


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

## Groups Signals<a name="ai-scripting-signals-reference-groups"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnGroupChanged |  |  | 
| OnGroupMemberMutilated |  |  | 
| OnGroupMemberDiedNearest |  |  | 

### Formation<a name="ai-scripting-signals-reference-groups-formation"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnNoFormationPoint | sender | AI couldn't find a formation point | 
| OnFormationPointReached |   |   | 
| OnGetToFormationPointFailed |   |   | 

### Group Coordination<a name="ai-scripting-signals-reference-groups-coordination"></a>

Group target is the most threatening target of the group\.


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnGroupTargetNone |  |  | 
| OnGroupTargetSound |  |  | 
| OnGroupTargetMemory |  |  | 
| OnGroupTargetVisual |  |  | 
| PerformingRole |  |  | 

## Other Signals<a name="ai-scripting-signals-reference-other"></a>

### Forced Execute<a name="ai-scripting-signals-reference-other-forced-execute"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnForcedExecute |  |  | 
| OnForcedExecuteComplete |  |  | 

### Animation<a name="ai-scripting-signals-reference-other-animation"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| AnimationCanceled |  |  | 

### Game<a name="ai-scripting-signals-reference-other-game"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnFallAndPlay |  |  | 

### Vehicle\-related<a name="ai-scripting-signals-reference-other-vehicle"></a>


****  

| Name | Parameters | Description | 
| --- | --- | --- | 
| OnActorSitDown | Actor has entered a vehicle |  | 

### Squads<a name="ai-scripting-signals-reference-other-squads"></a>


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