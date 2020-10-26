# Path Following<a name="ai-path-following"></a>

This topic provides some high\-level insight on how path following is done in Lumberyard\. To illustrate some concepts, we'll use the relatively simplistic example of Racing HMMWVs, which is a good representation of classic path following as presented in many AI texts\.

Path following with Racing HMMWVs adheres to the following sequence\.

1. Get the closest \(to the AI agent\) point on path\.

1. Get the path parameter of this point\. Paths usually have some kind of parametrization, *t \-> \(x,y,z\)\.*

1. Add a certain value, usually called a "lookahead", to this parameter\.

1. Get the path point that corresponds to this new parameter\. This is called the look\-ahead position\.

1. Use this point as the navigation target\.

1. If the vehicle is stuck, beam it straight to the closest point on the path\.

## Goalop "Followpath"<a name="ai-path-following-goalop"></a>

Use the goalop *followpath* to instruct an AI agent to follow a path\. You can observe this sequence in action by setting a breakpoint at the beginning of a call to COPFollowPath::Execute\. In the call stack window in Visual Studio, you'll be able to see the update operations for all \(active\) AI agents being called as part of the AI system update procedure\. This action in turn calls the execute operations of the currently active goalops being run by the AI\.

COPFollowPath::Execute accomplishes the following tasks:
+ Uses the goalop *pathfind* to find a path leading to the beginning of a path\. Optionally, it finds a path to the closest point on a path using a parameter passed to the *followpath* goalop\.
+ Traces the path by following it using the goalop *trace*
+ Listens for the signal "OnPathFollowingStuck" to make sure the AI agent isn't stuck

The goalops *pathfind* and *trace* are commonly used for navigational goalops, including *approach* and *stick*\.

## COPTrace::ExecuteTrace and COPTrace::Execute<a name="ai-path-following-coptrace"></a>

COPTrace::ExecuteTrace is used to clean up path\-following issues, including handling edge cases and smart objects\. The core of this call is as follows:

```
IPathFollower* pPathFollower = gAIEnv.CVars.PredictivePathFollowing ? pPipeUser->GetPathFollower() : 0;
bTraceFinished = pPathFollower ? ExecutePathFollower(pPipeUser, bFullUpdate, pPathFollower) : Execute2D(pPipeUser, bFullUpdate);
```

COPTrace::Execute does the same work plus a bit more\. For the AI following a path, when its lookahead position hits the end of the path, this operation sends the signal "OnEndWithinLookAheadDistance" to the AI\. In the sample scenario, this allows our racing HMMWVs to start looking for a new path to follow while they're still moving along the current path\. Normally AI agents stop moving when the path following process is completed\. The following Lua script is also useful to maintain movement:

```
AI.SetContinuousMotion(vehicle.id, true);
```

## COPTrace::Execute2D<a name="ai-path-following-coptrace-execute2d"></a>

This operation can be used as a fallback if an AI agent \(CPipeUser, at least\) doesn't have a path follower\. COPTrace::Execute2D accomplishes the following tasks:
+ Gets the lookahead path position and the path direction at this position\.
+ Executes a maneuver, if necessary\. For example, it makes cars go backwards to make a U\-turn\.
+ Considers a number of reasons to slow down, including:
  + The angle between current and desired \(aforementioned path direction\) directions\.
  + The curvature of the path\.
  + Approaching the end of the path\.
  + Approaching the top of a hill\.

It then sets members *fDesiredSpeed* and *vMoveDir* of the AI agent's SOBJECTSTATE structure, which are brought to the game code later\. For an example of how this data can be used for actual steering, take a look at CVehicleMovementArcadeWheeled::ProcessAI\.

Note that COPTrace::Execute2D is not the only operation that sets *vMoveDir*\. For example, obstacle avoidance code can overwrite it\.