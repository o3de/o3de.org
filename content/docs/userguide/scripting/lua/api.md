---
description: ' Learn about Lua API calls that you can use with &ALY;. '
title: Component Entity Lua API Reference
---
# Component Entity Lua API Reference {#lua-api}


****  

|  | 
| --- |
| This documentation is preliminary and subject to change\.  | 

You can use the Lua API calls in this reference for scripting the component entity system in Lumberyard\. For a tutorial on writing Lua scripts in Lumberyard, see [Writing Lua Scripts](/docs/userguide/scripting/lua/intro.md)\. For Lua scripting functions that load and unload canvases in Lumberyard Editor, see the [UI Lua Reference](/docs/userguide/scripting/lua/ces-api-ui.md)\.

## BehaviorTreeComponentRequestBus {#lua-api-behaviortreecomponentrequestbus}

Represents a request submitted by a user of the current component\.

### StartBehaviorTree {#lua-api-behaviortreecomponentrequestbus-startbehaviortree}

Starts an inactive behavior tree associated with the current entity\.

**Syntax**

```
void BehaviorTreeComponent::StartBehaviorTree()
```

### StopBehaviorTree {#lua-api-behaviortreecomponentrequestbus-stopbehaviortree}

Stops an active behavior tree associated with the current entity\.

**Syntax**

```
void BehaviorTreeComponent::StopBehaviorTree()
```

### GetVariableNameCrcs {#lua-api-behaviortreecomponentrequestbus-getvariablenamecrcs}

Gets a list of cyclic redundancy check values for variable names\.

**Syntax**

```
AZStd::vector<AZ::Crc32> GetVariableNameCrcs()
```

**Returns:** A list of the 32\-bit cyclic redundancy check values for all variable names\.

**Return Type:** `AZStd::vector`

**Default Return:** `s_defaultEmptyVariableIds`

### GetVariableValue {#lua-api-behaviortreecomponentrequestbus-getvariablevalue}

Gets the value for the specified variable name CRC\-32 checksum\.

**Syntax**

```
bool GetVariableValue(AZ::Crc32 variableNameCrc)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  variableNameCrc  |  AZ::Crc32  | The CRC\-32 checksum for the variable name\. | 

**Returns:** `true` if successful; otherwise, false\.

**Return Type:** `bool`

**Default Return:** `false`

### SetVariableValue {#lua-api-behaviortreecomponentrequestbus-setvariablevalue}

Set the value associated with a variable\.

**Syntax**

```
void SetVariableValue(AZ::Crc32 variableNameCrc, bool newValue)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  variableNameCrc  |  AZ::Crc32  | The CRC\-32 checksum for the variable name\. | 
|  newValue  |  bool  | The new value for the variable\. | 

## NavigationComponentRequestBus {#lua-api-navigationcomponentrequestbus}

Requests serviced by the navigation component\.

### FindPathToEntity {#lua-api-navigationcomponentrequestbus-findpathtoentity}

Creates a path finding request to navigate towards the specified entity\.

**Syntax**

```
PathfindRequest::NavigationRequestId FindPathToEntity(AZ::EntityId entityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  entityId  |  AZ::EntityId  | Request EntityId of the entity we want to navigate towards\.  | 

**Returns:** A unique identifier to the pathfinding request\.

**Return Type:** `PathfindRequest::NavigationRequestId`

**Default Return:** `PathfindResponse::kInvalidRequestId`

### Stop {#lua-api-navigationcomponentrequestbus-stop}

Stops all pathfinding operations for the specified `requestId`\. The ID is used to make sure that the request being cancelled is the request that is currently being processed\. If the specified `requestId` is different from the ID of the current request, the stop command can be safely ignored\.

**Syntax**

```
void Stop(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request that is being cancelled\. | 

## NavigationComponentNotificationBus {#lua-api-navigationcomponentnotificationbus}

Notifications sent by the Navigation component\.

### OnSearchingForPath {#lua-api-navigationcomponentnotificationbus-onsearchingforpath}

Indicates that the pathfinding request has been submitted to the navigation system\.

**Syntax**

```
void OnSearchingForPath(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request for the path that is being searched\. | 

### OnTraversalStarted {#lua-api-navigationcomponentnotificationbus-ontraversalstarted}

Indicates that traversal for the indicated request has started\.

**Syntax**

```
void OnTraversalStarted(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request for which traversal has started\. | 

### OnTraversalInProgress {#lua-api-navigationcomponentnotificationbus-ontraversalinprogress}

Indicates that traversal for the indicated request has started\.

**Syntax**

```
void OnTraversalInProgress(PathfindRequest::NavigationRequestId requestId, float distanceRemaining)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request for which traversal is in progress\. | 
|  distanceRemaining  |  float  | The remaining distance in the current path\. | 

### OnTraversalComplete {#lua-api-navigationcomponentnotificationbus-ontraversalcomplete}

Indicates that traversal for the indicated request has completed successfully\.

**Syntax**

```
void OnTraversalComplete(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request for which traversal has finished\. | 

### OnTraversalCancelled {#lua-api-navigationcomponentnotificationbus-ontraversalcancelled}

Indicates that traversal for the indicated request was cancelled before it could be successfully completed\.

**Syntax**

```
void OnTraversalCancelled(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request for which traversal was cancelled\. | 

## NavigationSystemRequestBus {#lua-api-navigationsystembus}

Requests serviced by the navigation system component\. This currently contains the single function `RayCast`\.

### RayCast {#lua-api-navigationcomponentrequestbus-raycast}

Creates a path finding request to navigate towards the specified entity\.

**Syntax**

```
virtual NavRayCastResult RayCast(const AZ::Vector3& begin, const AZ::Vector3& direction, float maxDistance) { return NavRayCastResult() }
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| begin  |  Vector3  | The origin of the ray\. | 
| direction | Vector3 | The direction for the ray to travel\. | 
| maxDistance | float | The maximum distance the ray travels\. | 

**Returns:** A `NavRayCastResult`\.

`NavRayCastResult` has the following structure\.


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
| bool m\_collision  | Boolean | Returns true if there was a collision\. The default is false\. | 
| m\_position | Vector3 | The position of the hit in world space\. The default is AZ::Vector3::CreateZero\(\)\. | 
| m\_meshId | NavigationMeshId | The mesh ID of the navigation mesh hit\. This is callable from Lua script\. The default is 0\. | 

## AttachmentComponentRequestBus {#lua-api-attachmentcomponentrequestbus}

Messages serviced by the `AttachmentComponent`\. The `AttachmentComponent` lets an entity "stick" to a particular bone on a target entity\.

### Attach {#lua-api-attachmentcomponentrequestbus-attach}

Change the attachment target\. The entity will detach from any previous target\.

**Syntax**

```
void Attach(AZ::EntityId targetId, const char* targetBoneName, const AZ::Transform& offset)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  targetId  |  AZ::EntityId  | Specifies the ID of the entity to attach to\. | 
|  targetBoneName  |  char  | Specifies the bone on the target entity to attach to\. If the target bone is not found, then attach to the target entity's transform origin\. | 
|  offset  |  AZ::Transform  | The attachment's offset from the target\. | 

### Detach {#lua-api-attachmentcomponentrequestbus-detach}

Detaches an entity from its target\.

**Syntax**

```
void Detach()
```

### SetAttachmentOffset {#lua-api-attachmentcomponentrequestbus-setattachmentoffset}

Update an entity's offset from its target\.

**Syntax**

```
void SetAttachmentOffset(const AZ::Transform& offset)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  offset  |  AZ::Transform  | The offset from the target\. | 

## AttachmentComponentNotificationBus {#lua-api-attachmentcomponentnotificationbus}

This EBus interface handles events emitted by the `AttachmentComponent`\. The `AttachmentComponent` lets an entity "stick" to a particular bone on a target entity\.

### OnAttached {#lua-api-attachmentcomponentnotificationbus-onattached}

The entity has attached to the target\.

**Syntax**

```
void OnAttached(AZ::EntityId targetId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  targetId  |  AZ::EntityId  | The target being attached to\. | 

### OnDetached {#lua-api-attachmentcomponentnotificationbus-ondetached}

The entity is detaching from the target\.

**Syntax**

```
void OnDetached(AZ::EntityId targetId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  targetId  |  AZ::EntityId  | The target being detached from\. | 

## CharacterAnimationRequestBus {#lua-api-characteranimationrequestbus}

General character animation requests serviced by the `CharacterAnimationManager` component\.

### SetBlendParameter {#lua-api-characteranimationrequestbus-setblendparameter}

Sets a custom blend parameter\.

**Syntax**

```
void SetBlendParameter(AZ::u32 blendParameter, float value)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  blendParameter  |  AZ::u32  | Corresponds to EMotionParamID\. | 
|  value  |  float  | The value to set\. | 

### SetAnimationDrivenMotion {#lua-api-characteranimationrequestbus-setanimationdrivenmotion}

Enables or disables animation\-driven root motion\.

**Syntax**

```
void SetAnimationDrivenMotion(bool useAnimDrivenMotion)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  useAnimDrivenMotion  |  bool  | Specify true to enable animation\-driven root motion; false to disable\. | 

## MannequinRequestsBus {#lua-api-characteranimationrequestbus-mannequinrequestsbus}

Services provided by the Mannequin component\.

### QueueFragment {#lua-api-characteranimationrequestbus-queuefragment}

Queues the specified Mannequin fragment\.

**Syntax**

```
FragmentRequestId QueueFragment(int priority, const char* fragmentName, const char* fragTags, bool isPersistent)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  priority  |  int  | Specifies priority\. A higher number means higher priority | 
|  fragmentName  |  char  | Name of the fragment to be played\. | 
|  fragTags  |  char  | Fragment tags to be applied\. | 
|  isPersistent  |  bool  | Specifies persistence\. | 

**Returns:** A request ID that can be used to identify and make modifications to the request\.

**Return Type:** `FragmentRequestId`

**Default Return:** `MannequinRequests::s_invalidRequestId`

### PauseAll {#lua-api-characteranimationrequestbus-pauseall}

Pauses all actions being managed by the current Mannequin component

**Syntax**

```
void PauseAll()
```

### ResumeAll {#lua-api-characteranimationrequestbus-resumeall}

Resumes all actions being managed by the current Mannequin component\.

**Syntax**

```
void ResumeAll(IActionController::EResumeFlags resumeFlag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  resumeFlag  |  IActionController::EResumeFlags  | Flag that indicates how the animations are to be resumed\. See the EResumeFlags enum for possible values\. | 

```
enum EResumeFlags
    {
        ERF_RestartAnimations              = BIT(0),
        ERF_RestoreLoopingAnimationTime    = BIT(1),
        ERF_RestoreNonLoopingAnimationTime = BIT(2),
        ERF_Default = ERF_RestartAnimations | ERF_RestoreLoopingAnimationTime | ERF_RestoreNonLoopingAnimationTime
    };
```

### SetTag {#lua-api-characteranimationrequestbus-settag}

Sets the specified tag for the action controller\.

**Syntax**

```
void SetTag(const char* tagName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tagName  |  char  | The name of the tag to set\. | 

### ClearTag {#lua-api-characteranimationrequestbus-cleartag}

Clears the specified tag for the action controller\.

**Syntax**

```
void ClearTag(const char* tagName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tagName  |  char  | The name of the tag to be cleared\. | 

### SetGroupTag {#lua-api-characteranimationrequestbus-setgrouptag}

Sets a tag in the specified group\.

**Syntax**

```
void SetGroupTag(const char* groupName, const char* tagName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  groupName  |  char  | The name of the group\. | 
|  tagName  |  char  | The name of the tag\. | 

### ClearGroup {#lua-api-characteranimationrequestbus-cleargroup}

Clears tags for the indicated group\.

**Syntax**

```
void ClearGroup(const char* groupName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  groupName  |  char  | The name of the group\. | 

### SetScopeContext {#lua-api-characteranimationrequestbus-setscopecontext}

Sets the scope context for the current animation controller\.

**Syntax**

```
void SetScopeContext(const char* scopeContextName, const AZ::EntityId entityId, const char* animationDatabaseName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  scopeContextName  |  char  | Name of the scope context that the animation database \(\.adb\) file is to be attached to\. | 
|  entityId  |  AZ::EntityId  | Reference to an entity whose character instance will be bound to this scope context\. | 
|  animationDatabaseName  |  char  | The path to the animation database file\. | 

### ClearScopeContext {#lua-api-characteranimationrequestbus-clearscopecontext}

Clears the specified scope context\.

**Syntax**

```
void ClearScopeContext(const char* scopeContextName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  scopeContextName  |  char  | Name of the scope context that is to be cleared\. | 

### StopRequest {#lua-api-characteranimationrequestbus-stoprequest}

Stops the actions associated with the specified request\.

**Syntax**

```
void StopRequest(FragmentRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  FragmentRequestId  | Specifies the ID of the request for which actions should be stopped\. | 

### GetRequestStatus {#lua-api-characteranimationrequestbus-getrequeststatus}

Retrieves the status of the specified request

**Syntax**

```
IAction::EStatus GetRequestStatus(FragmentRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  FragmentRequestId  | The ID of the request to retrieve status for\. | 

**Returns:** The status of the request\.

**Return Type:** `IAction::EStatus`

**Default Return:** `IAction::EStatus::None`

### ForceFinishRequest {#lua-api-characteranimationrequestbus-forcefinishrequest}

Forces the actions associated with the specified request to finish\.

**Syntax**

```
void ForceFinishRequest(FragmentRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  FragmentRequestId  | The ID of the request\. | 

### SetRequestSpeedBias {#lua-api-characteranimationrequestbus-setrequestspeedbias}

Sets the speed bias for the actions associated with the specified request\.

**Syntax**

```
void SetRequestSpeedBias(FragmentRequestId requestId, float speedBias)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  FragmentRequestId  | The request ID\. | 
|  speedBias  |  float  | The speed bias for this animation | 

### GetRequestSpeedBias {#lua-api-characteranimationrequestbus-getrequestspeedbias}

Gets the speed bias for the actions associated with the specified request

**Syntax**

```
float GetRequestSpeedBias(FragmentRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  FragmentRequestId  | The ID of the request\. | 

**Returns:** The speed bias for the indicated request\.

**Return Type:** `float`

**Default Return:** `-1`

### SetRequestAnimWeight {#lua-api-characteranimationrequestbus-setrequestanimweight}

Sets the animation weight for the actions associated with the specified request\.

**Syntax**

```
void SetRequestAnimWeight(FragmentRequestId requestId, float animWeight)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  FragmentRequestId  | The ID of the request\. | 
|  animWeight  |  float  | The weight for the animation\. | 

### GetRequestAnimWeight {#lua-api-characteranimationrequestbus-getrequestanimweight}

Gets the animation weight for the actions associated with the specified request\.

**Syntax**

```
float GetRequestAnimWeight(FragmentRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  FragmentRequestId  | The ID of the request\. | 

**Returns:** The animation weight for the indicated request\.

**Return Type:** `float`

**Default Return:** `-1`

## SimpleAnimationComponentRequestBus {#lua-api-simpleanimationcomponentrequestbus}

Services provided by the Simple Animation component\. The Simple Animation component provides basic animation functionality for the entity\. If the entity has a mesh component with a skinned mesh attached \(a \.chr or \.cdf file\), the Simple Animation component will provide a list of all valid animations specified in the associated \.chrparams file\. The Simple Animation component does not provide interaction with Mannequin and should be used for light\-weight environment or background animation\.

### StartDefaultAnimations {#lua-api-simpleanimationcomponentrequestbus-startdefaultanimations}

Plays the default animations along with default looping and speed parameters that were set up as a part of the current component\. Components allow for multiple layers to be set up with defaults\. The `StartDefaultAnimations` method starts the playback of all the default animations of the component\.

**Syntax**

```
SimpleAnimationComponentRequests::Result StartDefaultAnimations()
```

**Returns:** A `Result` indicating whether the animations were started successfully\.

**Return Type:** `SimpleAnimationComponentRequests::Result`

**Default Return:** `SimpleAnimationComponentRequests::Result::Failure`

### StartAnimation {#lua-api-simpleanimationcomponentrequestbus-startanimation}

Starts playback of the animation of the specified `animatedLayer.`

**Syntax**

```
SimpleAnimationComponentRequests::Result StartAnimation(const AnimatedLayer& animatedLayer)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  animatedLayer  |  AnimatedLayer  | A layer configured with the animation that is to be played on it\. | 

**Returns:** A `Result` indicating whether the animation was started\.

**Return Type:** `SimpleAnimationComponentRequests::Result`

**Default Return:** `SimpleAnimationComponentRequests::Result::Failure`

### StartAnimationByName {#lua-api-simpleanimationcomponentrequestbus-startanimationbyname}

Plays the animation with the specified name\.

**Syntax**

```
Result StartAnimationByName(const char* name, AnimatedLayer::LayerId layerId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  name  |  char  | The name of the animation to play\. | 
|  layerId  |  AnimatedLayer::LayerId  | The layer in which to play the animation | 

**Returns:** A `Result` indicating whether the animation was started\.

**Return Type:** `SimpleAnimationComponentRequests::Result`

**Default Return:** `SimpleAnimationComponentRequests::Result::Failure`

### StopAllAnimations {#lua-api-simpleanimationcomponentrequestbus-stopallanimations}

Stops all animations that are being played on all layers\.

**Syntax**

```
Result StopAllAnimations()
```

**Returns:** A `Result` indicating whether all animations were stopped\.

**Return Type:** `SimpleAnimationComponentRequests::Result`

**Default Return:** `SimpleAnimationComponentRequests::Result::Failure `

### StopAnimationsOnLayer {#lua-api-simpleanimationcomponentrequestbus-stopanimationsonlayer}

Stops the animation currently playing on the specified layer\.

**Syntax**

```
Result StopAnimationsOnLayer(AnimatedLayer::LayerId layerId, float blendOutTime)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  layerId  |  AnimatedLayer::LayerId  | Identifier for the layer that is to stop its animation \(0 \- AnimatedLayer::s\_maxActiveAnimatedLayers\) | 
|  blendOutTime  |  float  | Time that the animations take to blend out\. | 

**Returns:** A `Result` indicating whether the animation on the indicated layer was stopped\.

**Return Type:** `SimpleAnimationComponentRequests::Result`

**Default Return:** `SimpleAnimationComponentRequests::Result::Failure`

### SetPlaybackSpeed {#lua-api-simpleanimationcomponentrequestbus-setplaybackspeed}

Changes the playback speed for a particular layer\.

**Syntax**

```
Result SetPlaybackSpeed(AnimatedLayer::LayerId layerId, float playbackSpeed)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  layerId  |  AnimatedLayer::LayerId  | Identifier for the layer whose speed should be changed\. | 
|  playbackSpeed  |  float  | The playback speed\. | 

**Returns:** A `Result` indicating whether the animation on the indicated layer was updated or not\. A failure likely indicated that no animation is playing on the specified layer\.

**Return Type:** `SimpleAnimationComponentRequests::Result`

**Default Return:** `SimpleAnimationComponentRequests::Result::Failure`

## SimpleAnimationComponentNotificationBus {#lua-api-simpleanimationcomponentnotificationbus}

This EBus interfaces handles events sent by the simple animation component\.

### OnAnimationStarted {#lua-api-simpleanimationcomponentnotificationbus-onanimationstarted}

Informs all listeners about an animation being started on a layer\.

**Syntax**

```
void OnAnimationStarted(const AnimatedLayer& animatedLayer)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  animatedLayer  |  AnimatedLayer  | Specifies the name and parameters of the animation that was started\. | 

### OnAnimationStopped {#lua-api-simpleanimationcomponentnotificationbus-onanimationstopped}

Informs all listeners about an animation being stopped on the indicated layer

**Syntax**

```
void OnAnimationStopped(const AnimatedLayer::LayerId animatedLayer)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  animatedLayer  |  AnimatedLayer::LayerId  | Specifies the name and parameters of the animation that was stopped\. | 

## AudioEnvironmentComponentRequestBus {#lua-api-audioenvironmentcomponentrequestbus}

This EBus interface handles messages serviced by `AudioEnvironmentComponent` instances\. The environment refers to the effects \(primarily the auxiliary effects\) that the bus sends\. See `AudioEnvironmentComponent.cpp` for details\.

### SetAmount {#lua-api-audioenvironmentcomponentrequestbus-setamount}

Sets an environment amount on the default assigned environment\.

**Syntax**

```
void SetAmount(float amount)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  amount  |  float  | The amount for the environment\. | 

### SetEnvironmentAmount {#lua-api-audioenvironmentcomponentrequestbus-setenvironmentamount}

Set an environment amount, specify an environment name at run time \(that is, a script\)\.

**Syntax**

```
void SetEnvironmentAmount(const char* environmentName,float amount)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  environmentName  |  char  | The name of the environment\. | 
|  amount  |  float  | The amount for the environment\. | 

## AudioListenerComponentRequestBus {#lua-api-audiolistenercomponentrequestbus}

This EBus interface handles messages serviced by `AudioListenerComponent` instances\.

### SetRotationEntity {#lua-api-audiolistenercomponentrequestbus-setrotationentity}

Sets the entity for which the audio listener tracks rotation\.

**Syntax**

```
void SetRotationEntity(const AZ::EntityId entityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  entityId  |  AZ::EntityId  | The ID of the entity\. | 

### SetPositionEntity {#lua-api-audiolistenercomponentrequestbus-setpositionentity}

Sets the entity for which the audio listener tracks position\.

**Syntax**

```
void SetPositionEntity(const AZ::EntityId entityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  entityId  |  AZ::EntityId  | The ID of the entity\. | 

### SetFullTransformEntity {#lua-api-audiolistenercomponentrequestbus-setfulltransformentity}

Essentially the same as calling `SetRotationEntity` and `SetPositionEntity` on the same entity\.

**Syntax**

```
void SetFullTransformEntity(const AZ::EntityId entityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  entityId  |  AZ::EntityId  | The ID of the entity\. | 

## AudioRtpcComponentRequestBus {#lua-api-audiortpccomponentrequestbus}

This EBus interface handles messages serviced by `AudioRtpcComponent` instances\. RTPC stands for Real\-Time Parameter Control\. The `AudioRtpcComponent` is used by the game to configure parameters in the audio engine\. See `AudioRtpcComponent.cpp` for details\.

### SetValue {#lua-api-audiortpccomponentrequestbus-setvalue}

Sets an RTPC value for the RTPC name that has been serialized with the component\.

**Syntax**

```
void SetValue(float value)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  value  |  float  | The RTPC value to set\. | 

### SetRtpcValue {#lua-api-audiortpccomponentrequestbus-setrtpcvalue}

Use to manually specify an RTPC name and value at run time for use in scripting\.

**Syntax**

```
void SetRtpcValue(const char* rtpcName, float value)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  rtpcName  |  char  | Specifies an RTPC name to use\. | 
|  value  |  float  | Specifies a value for the RTPC name supplied\. | 

## AudioSwitchComponentRequestBus {#lua-api-audioswitchcomponentrequestbus}

This EBus interface handles messages serviced by `AudioSwitchComponent` instances\. A `Switch` is an object that can be in one `State` at a time, but whose `State` value can be changed at run time\. For example, a `Switch called` `SurfaceMaterial` might have states such as 'Grass', 'Snow', 'Metal', or 'Wood'\. See `AudioSwitchComponent.h` for details\.

### SetState {#lua-api-audioswitchcomponentrequestbus-setstate}

Sets the name of the state on the default assigned switch\.

**Syntax**

```
void SetState(const char* stateName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  stateName  |  char  | Specifies the name of the state to set\. | 

### SetSwitchState {#lua-api-audioswitchcomponentrequestbus-setswitchstate}

Sets the specified switch to the specified state\.

**Syntax**

```
void SetSwitchState(const char* switchName, const char* stateName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  switchName  |  char  | The name of the switch to set\. | 
|  stateName  |  char  | The name of the state to set on the specified switch\. | 

## AudioTriggerComponentRequestBus {#lua-api-audiotriggercomponentrequestbus}

This EBus interface handles messages serviced by `AudioTriggerComponent` instances\. You can use the `AudioTriggerComponent` to execute, stop, and control ATL triggers\. You can serialize the name of the trigger with the component or manually specify the name at run time for use in scripting\. Only one `AudioTriggerComponent` is allowed on an entity, but the interface supports firing multiple ATL triggers\.

### Play {#lua-api-audiotriggercomponentrequestbus-play}

Executes the play trigger if the play trigger is set\.

**Syntax**

```
void Play()
```

### Stop {#lua-api-audiotriggercomponentrequestbus-stop}

Executes the stop trigger if one is set; otherwise, stops the play trigger\.

**Syntax**

```
void Stop()
```

### ExecuteTrigger {#lua-api-audiotriggercomponentrequestbus-executetrigger}

Executes the specified ATL trigger\.

**Syntax**

```
void ExecuteTrigger(const char* triggerName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerName  |  char  | Specifies the name of the trigger to execute\. | 

### KillTrigger {#lua-api-audiotriggercomponentrequestbus-killtrigger}

Kills the specified ATL Trigger\.

**Syntax**

```
void KillTrigger(const char* triggerName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerName  |  char  | Specifies the name of the trigger to remove\. | 

### KillAllTriggers {#lua-api-audiotriggercomponentrequestbus-killalltriggers}

Forces a removal of triggers that are active on the underlying proxy\.

**Syntax**

```
void KillAllTriggers()
```

### SetMovesWithEntity {#lua-api-audiotriggercomponentrequestbus-setmoveswithentity}

Specifies whether the trigger should be repositioned as the entity moves\.

**Syntax**

```
void SetMovesWithEntity(bool shouldTrackEntity)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  shouldTrackEntity  |  bool  | Specify true to have the trigger track the entity\. Specify false to have the trigger not track the entity\. | 

## AudioTriggerComponentNotificationBus {#lua-api-audiotriggercomponentnotificationbus}

This EBus interface handles messages sent by `AudioTriggerComponent` instances\.

### OnTriggerFinished {#lua-api-audiotriggercomponentnotificationbus-ontriggerfinished}

Notifies when a trigger instance has finished\.

**Syntax**

```
void OnTriggerFinished(const Audio::TAudioControlID triggerID)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerID  |  Audio::TAudioControlID  | The ID of the trigger\. | 

## FloatGameplayNotificationBus \(AZ::GameplayNotificationBus<float>\) {#lua-api-floatgameplaynotificationbus-}

This version of the `GameplayNotificationBus` EBus interface handles float\-based gameplay notifications\.

### OnGameplayEventAction {#lua-api-floatgameplaynotificationbus-ongameplayeventaction}

Event sent when the specified `GameplayEventAction` has occurred\.

### OnGameplayEventFailed {#lua-api-floatgameplaynotificationbus-ongameplayeventfailed}

Event sent when the given `GameplayEventAction` has failed\.

## Vector3GameplayNotificationBus {#lua-api-vector3gameplaynotificationbus}

This version of the `GameplayNotificationBus` EBus interface handles Vector3\-based gameplay notifications\.

### OnGameplayEventAction {#lua-api-vector3gameplaynotificationbus-ongameplayeventaction}

Event sent when the given `GameplayEventAction` has occurred\.

### OnGameplayEventFailed {#lua-api-vector3gameplaynotificationbus-ongameplayeventfailed}

Event sent when the given `GameplayEventAction` has failed\.

## StringGameplayNotificationBus \(AZ::GameplayNotificationBus<const AZStd:wq::string>\) {#lua-api-stringgameplaynotificationbus}

This version of the `GameplayNotificationBus` EBus interface handles string\-based gameplay notifications\.

### OnGameplayEventAction {#lua-api-stringgameplaynotificationbus-ongameplayeventaction}

Event sent when the given `GameplayEventAction` has occurred\.

### OnGameplayEventFailed {#lua-api-stringgameplaynotificationbus-ongameplayeventfailed}

Event sent when the given `GameplayEventAction` has failed\.

## EntityIdGameplayNotificationBus \(AZ::GameplayNotificationBus<AZ::EntityId>\) {#lua-api-entityidgameplaynotificationbus}

This EBus interface handles `EntityId`\-based gameplay notifications\. It is a specialization of the `GameplayNotificationBus`\.

### OnGameplayEventAction {#lua-api-entityidgameplaynotificationbus-ongameplayeventaction}

Event sent when the given `GameplayEventAction` has occurred\.

### OnGameplayEventFailed {#lua-api-entityidgameplaynotificationbus-ongameplayeventfailed}

Event sent when the given `GameplayEventAction` has failed\.

## CryCharacterPhysicsRequestBus {#lua-api-crycharacterphysicsrequestbus}

This EBus interface handles messages serviced by Cry character physics\.

### Move {#lua-api-crycharacterphysicsrequestbus-move}

Requests movement from Living Entity\.

**Syntax**

```
void Move(const AZ::Vector3& velocity, int jump)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  velocity  |  AZ::Vector3  | Requested velocity \(direction and magnitude\)\. | 
|  jump  |  int  | Controls how the value for the velocity parameter is applied within a Living Entity\. To change the velocity to the new value, specify 1\. To add the value to the current velocity, specify 2\. | 

## ConstraintComponentRequestBus {#lua-api-constraintcomponentrequestbus}

This EBus interface handles messages serviced by instances of the Constraint component\. A Constraint component facilitates the creation of a physics constraint between two entities or an entity and a point in the world\. Both entities must have a component that provides the physics service\.

### SetConstraintEntities {#lua-api-constraintcomponentrequestbus-setconstraintentities}

Sets the entity that owns the constraint and the target of the constraint\.

**Syntax**

```
void SetConstraintEntities(const AZ::EntityId& owningEntity, const AZ::EntityId& targetEntity)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  owningEntity  |  AZ::EntityId  | Specifies the ID of the entity that owns the constraint\. | 
|  targetEntity  |  AZ::EntityId  | Specifies the ID of the entity that is the target of the constraint\. The target is invalid if constrained to world space\. | 

### SetConstraintEntitiesWithPartIds {#lua-api-constraintcomponentrequestbus-setconstraintentitieswithpartids}

Sets the entity that owns the constraint, the target entity, and the animation part IDs \(bone IDs\) for the constraint to be attached to\.

**Syntax**

```
void SetConstraintEntitiesWithPartIds(const AZ::EntityId& owningEntity, int ownerPartId, const AZ::EntityId& targetEntity, int targetPartId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  owningEntity  |  AZ::EntityId  | Specifies the ID of the entity that owns the constraint\. | 
|  ownerPartId  |  int  | Specifies the ID of the owner part \(the bone ID\) for the constraint\. | 
|  targetEntity  |  AZ::EntityId  | Specifies the ID of the entity that is the target of the constraint\. | 
|  targetPartId  |  int  | Specifies the ID of the target part \(the bone ID\) for the constraint\. | 

### EnableConstraint {#lua-api-constraintcomponentrequestbus-enableconstraint}

Enable all constraints on the current entity\.

**Syntax**

```
void EnableConstraint()
```

### DisableConstraint {#lua-api-constraintcomponentrequestbus-disableconstraint}

Disable all constraints on the current entity\.

**Syntax**

```
void DisableConstraint()
```

## ConstraintComponentNotificationBus {#lua-api-constraintcomponentnotificationbus}

This EBus interface handles messages dispatched by the Constraint component\.

### OnConstraintEntitiesChanged {#lua-api-constraintcomponentnotificationbus-onconstraintentitieschanged}

This event fires when either the constraint owner or target changes\. The target is invalid if constrained to world space\.

**Note**  
This event also fires when `partId` values change\.

**Syntax**

```
void OnConstraintEntitiesChanged(const AZ::EntityId& oldOwner, const AZ::EntityId& oldTarget, const AZ::EntityId& newOwner, const AZ::EntityId& newTarget)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  oldOwner  |  AZ::EntityId  | Specifies the ID of the entity that owned the constraint\. | 
|  oldTarget  |  AZ::EntityId  | Specifies the ID of the entity that was the target of the constraint\. | 
|  newOwner  |  AZ::EntityId  | Specifies the ID of the entity that is the new owner of the constraint\.  | 
|  newTarget  |  AZ::EntityId  | Specifies the ID of the entity that is the new target of the constraint\.  | 

### OnConstraintEnabled {#lua-api-constraintcomponentnotificationbus-onconstraintenabled}

Fires when constraints have been enabled on the current entity\.

**Syntax**

```
void OnConstraintEnabled()
```

### OnConstraintDisabled {#lua-api-constraintcomponentnotificationbus-onconstraintdisabled}

Fires when a constraint has been disabled\.

**Syntax**

```
void OnConstraintDisabled()
```

## PhysicsComponentRequestBus {#lua-api-physicscomponentrequestbus}

This EBus interface handles messages serviced by the in\-game Physics component\.

### EnablePhysics {#lua-api-physicscomponentrequestbus-enablephysics}

Makes the entity a participant in the physics simulation\.

**Syntax**

```
void EnablePhysics()
```

### DisablePhysics {#lua-api-physicscomponentrequestbus-disablephysics}

Stops the entity from participating in the physics simulation

**Syntax**

```
void DisablePhysics()
```

### IsPhysicsEnabled {#lua-api-physicscomponentrequestbus-isphysicsenabled}

Checks if physics are enabled on the current entity\.

**Syntax**

```
bool IsPhysicsEnabled()
```

**Returns:** `true` if physics are enabled; `false` otherwise\.

**Return Type:** `bool`

**Default Return:** `false`

### AddImpulse {#lua-api-physicscomponentrequestbus-addimpulse}

Applies the specified impulse to the entity\.

**Syntax**

```
void AddImpulse(const AZ::Vector3& impulse)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  impulse  |  AZ::Vector3  | Vector of the impulse\. | 

### AddAngularImpulse {#lua-api-physicscomponentrequestbus-addangularimpulse}

Applies an angular impulse to the entity\.

**Syntax**

```
void AddAngularImpulse(const AZ::Vector3& /*impulse*/, const AZ::Vector3& worldSpacePivot)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  impulse  |  AZ::Vector3  | Vector of the impulse\. | 
|  worldSpacePivot  |  AZ::Vector3  | Vector of the world space pivot to apply to the entity\. | 

### GetVelocity {#lua-api-physicscomponentrequestbus-getvelocity}

Retrieves the velocity of the entity\.

**Syntax**

```
AZ::Vector3 GetVelocity()
```

**Returns:** The velocity of the entity\.

**Return Type:** `AZ::Vector3`

**Default Return:** `AZ::Vector3::CreateZero`\(\)

### SetVelocity {#lua-api-physicscomponentrequestbus-setvelocity}

Sets the velocity of the entity\.

**Syntax**

```
void SetVelocity(const AZ::Vector3& velocity)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  velocity  |  AZ::Vector3  | Specifies the velocity to set\. | 

### GetAcceleration {#lua-api-physicscomponentrequestbus-getacceleration}

Gets the linear acceleration of the entity\.

**Syntax**

```
AZ::Vector3 GetAcceleration()
```

**Returns:** A vector containing the linear acceleration of the entity\.

**Return Type:** `AZ::Vector3`

**Default Return:** `AZ::Vector3::CreateZero`\(\)

### GetAngularVelocity {#lua-api-physicscomponentrequestbus-getangularvelocity}

Gets the angular velocity of the entity\.

**Syntax**

```
AZ::Vector3 GetAngularVelocity()
```

**Returns:** A vector containing the angular velocity of the entity\.

**Return Type:** `AZ::Vector3`

**Default Return:** `AZ::Vector3::CreateZero`\(\)

### SetAngularVelocity {#lua-api-physicscomponentrequestbus-setangularvelocity}

Sets the angular velocity of the entity to the specified amount\.

**Syntax**

```
void SetAngularVelocity(const AZ::Vector3& angularVelocity)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  angularVelocity  |  AZ::Vector3  | The angular velocity to set\. | 

### GetAngularAcceleration {#lua-api-physicscomponentrequestbus-getangularacceleration}

Gets the angular acceleration of the entity

**Syntax**

```
AZ::Vector3 GetAngularAcceleration()
```

**Returns:** A vector containing the angular acceleration of the entity\.

**Return Type:** `AZ::Vector3`

**Default Return:** `AZ::Vector3::CreateZero`\(\)

### GetMass {#lua-api-physicscomponentrequestbus-getmass}

Retrieves the mass of the entity\.

**Syntax**

```
float GetMass()
```

**Returns:** The mass of the entity\.

**Return Type:** `float`

**Default Return:** `0.0f`

## PhysicsComponentNotificationBus {#lua-api-physicscomponentnotificationbus}

This bus handles events emitted by a Physics component and by the Physics system\.

### OnPhysicsEnabled {#lua-api-physicscomponentnotificationbus-onphysicsenabled}

Fires when an entity begins participating in the physics simulation\. If the entity is active when a handler connects to the bus, then `OnPhysicsEnabled`\(\) is immediately dispatched\.

**Note**  
If physics is enabled, `OnPhysicsEnabled` fires immediately upon connecting to the bus\.

**Syntax**

```
void OnPhysicsEnabled()
```

### OnPhysicsDisabled {#lua-api-physicscomponentnotificationbus-onphysicsdisabled}

Fires when an entity ends its participation in the physics simulation\.

**Syntax**

```
void OnPhysicsDisabled()
```

### OnCollision {#lua-api-physicscomponentnotificationbus-oncollision}

Fires when an entity collides with another entity\.

**Syntax**

```
void OnCollision(const Collision& collision)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  collision  |  Collision  | Contains information about the collision that occurred\. See the following Collision struct\. | 

```
struct Collision
        {
            AZ_TYPE_INFO(Collision, "{33756BD4-24D4-4DAE-A849-537114D52F7D}");
            AZ_CLASS_ALLOCATOR(Collision, AZ::SystemAllocator, 0);

            AZ::EntityId m_entity;        // ID of other entity involved in event
            AZ::Vector3 m_position;       // Contact point in world coordinates
            AZ::Vector3 m_normal;         // Normal to the collision
            float m_impulse;              // Impulse applied by the collision resolver
            AZ::Vector3 m_velocityA;      // Velocities of the first entity involved in the collision
            AZ::Vector3 m_velocityB;      // Velocities of the second entity involved in the collision
            float m_massA;                // Masses of the first entity involved in the collision
            float m_massB;                // Masses of the second entity involved in the collision
        }
```

## PhysicsSystemRequestBus {#lua-api-physicssystemrequestbus}

Requests for the physics system

### RayCast {#lua-api-physicssystemrequestbus-raycast}

Casts a ray and retrieves a list of results\.

**Syntax**

```
RayCastHit RayCast(const AZ::Vector3& begin, const AZ::Vector3& direction, float maxDistance, AZ::u32 maxHits, AZ::u32 query)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  begin  |  const AZ::Vector3&  | The origin of the ray | 
|  direction  |  const AZ::Vector3&  | The direction for the ray to travel | 
|  maxDistance  |  float  | The maximum distance the ray will travel | 
|  maxHits  |  AZ::u32  | The maximum number of hits to return from the search\. | 
|  query  |  AZ::u32  | The entity types to hit\. See the PhysicalEntityTypes enum that follows\. | 

**Returns:** A `RayCastHit` struct\. For details, see the code listing that follows\.

**Return Type:** `PhysicsSystemRequests::RayCastHit`

**Default Return:** `RayCastHit()`

```
struct RayCastHit
{
   AZ_TYPE_INFO(RayCastHit, "{3D8FA68C-A145-44B4-BA18-F3405D83A9DF}");
   AZ_CLASS_ALLOCATOR(RayCastHit, AZ::SystemAllocator, 0);

   float m_distance = 0.0f;    // The distance from RayCast begin to the hit.
   AZ::Vector3 m_position;     // The position of the hit in world space.
   AZ::Vector3 m_normal;       // The normal of the surface hit.
   AZ::EntityId m_entityId;    // The ID of the AZ::Entity hit, or 
                               // AZ::InvalidEntityId if hit object is not an AZ::Entity.
};
```

## RagdollPhysicsRequestBus {#lua-api-ragdollphysicsrequestbus}

Messages serviced by the Cry character physics ragdoll behavior\.

### EnterRagdoll {#lua-api-ragdollphysicsrequestbus-enterragdoll}

Causes an entity with a skinned mesh component to disable its current physics and enable ragdoll physics\.

**Syntax**

```
void EnterRagdoll()
```

### ExitRagdoll {#lua-api-ragdollphysicsrequestbus-exitragdoll}

Causes the ragdoll component to deactivate itself and reenable the entity's physics component\.

**Syntax**

```
void ExitRagdoll()
```

## DecalComponentRequestBus {#lua-api-decalcomponentrequestbus}

This EBus interface handles messages serviced by the Decal component\.

### SetVisibility {#lua-api-decalcomponentrequestbus-setvisibility}

Specifies the decal's visibility\.

**Syntax**

```
void SetVisibility(bool visible)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  visible  |  bool  | Specify true to make the decal visible, false to hide it\. | 

### Show {#lua-api-decalcomponentrequestbus-show}

Makes the decal visible\.

**Syntax**

```
void Show()
```

### Hide {#lua-api-decalcomponentrequestbus-hide}

Hides the decal\.

**Syntax**

```
void Hide()
```

## LensFlareComponentRequestBus {#lua-api-lensflarecomponentrequestbus}

This EBus interface handles messages serviced by the Lens Flare component\.

### SetLensFlareState {#lua-api-lensflarecomponentrequestbus-setlensflarestate}

Controls the lens flare state\.

**Syntax**

```
void SetLensFlareState(State state)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  state  |  State  | Specify On to turn on the lens flare; specify Off to turn it off\. | 

### TurnOnLensFlare {#lua-api-lensflarecomponentrequestbus-turnonlensflare}

Turns the lens flare on\.

**Syntax**

```
void TurnOnLensFlare()
```

### TurnOffLensFlare {#lua-api-lensflarecomponentrequestbus-turnofflensflare}

Turns the lens flare off\.

**Syntax**

```
void TurnOffLensFlare()
```

### ToggleLensFlare {#lua-api-lensflarecomponentrequestbus-togglelensflare}

Toggles the lens flare state\.

**Syntax**

```
void ToggleLensFlare()
```

## LensFlareComponentNotificationBus {#lua-api-lensflarecomponentnotificationbus}

This EBus interface handles events dispatched by the Lens Flare component\.

### LensFlareTurnedOn {#lua-api-lensflarecomponentnotificationbus-lensflareturnedon}

Notifies that the lens flare has been turned on\.

**Syntax**

```
void LensFlareTurnedOn()
```

### LensFlareTurnedOff {#lua-api-lensflarecomponentnotificationbus-lensflareturnedoff}

Notifies that the lens flare has been turned off\.

**Syntax**

```
void LensFlareTurnedOff()
```

## LightComponentRequestBus {#lua-api-lightcomponentrequestbus}

This EBus interfaces handles messages serviced by the light component\.

### SetLightState {#lua-api-lightcomponentrequestbus-setlightstate}

Controls the light state\.

**Syntax**

```
void SetLightState(State state)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  state  |  State  | Specify On to turn on the light; specify Off to turn it off\. | 

### TurnOnLight {#lua-api-lightcomponentrequestbus-turnonlight}

Turns the light on\.

**Syntax**

```
void TurnOnLight()
```

### TurnOffLight {#lua-api-lightcomponentrequestbus-turnofflight}

Turns the light off\.

**Syntax**

```
void TurnOffLight()
```

### ToggleLight {#lua-api-lightcomponentrequestbus-togglelight}

Toggles the light state\.

**Syntax**

```
void ToggleLight()
```

## LightComponentNotificationBus {#lua-api-lightcomponentnotificationbus}

Light component notifications\.

### LightTurnedOn {#lua-api-lightcomponentnotificationbus-lightturnedon}

Event sent when a light component is turned on\.

**Syntax**

```
void LightTurnedOn()
```

### LightTurnedOff {#lua-api-lightcomponentnotificationbus-lightturnedoff}

Event sent when a light component is turned off\.

**Syntax**

```
void LightTurnedOff()
```

## ParticleComponentRequestBus {#lua-api-particlecomponentrequestbus}

Provides access to the particle component\.

### SetVisibility {#lua-api-particlecomponentrequestbus-setvisibility}

Specifies the visibility of the particle component\.

**Syntax**

```
void SetVisibility(bool visible)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  visible  |  bool  | Specify true to make the particle component visible; false to hide it\. | 

### Show {#lua-api-particlecomponentrequestbus-show}

Makes the particle component visible\.

**Syntax**

```
void Show()
```

### Hide {#lua-api-particlecomponentrequestbus-hide}

Hides the particle component\.

**Syntax**

```
void Hide()
```

### SetupEmitter {#lua-api-particlecomponentrequestbus-setupemitter}

Sets up an effect emitter with the specified name and settings\.

**Syntax**

```
void SetupEmitter(const AZStd::string& emitterName, const ParticleEmitterSettings& settings)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  emitterName  |  const AZStd::string&  | The name of the emitter to set up\. | 
|  settings  |  const ParticleEmitterSettings&  | Contains particle emitter settings\. For more information, see ParticleComponent\.cpp\. | 

## SimpleStateComponentRequestBus {#lua-api-simplestatecomponentrequestbus}

This EBus interface handles messages serviced by the Simple State component\. The Simple State component provides a simple state machine\. Each state is represented by a name and zero or more entities that are activated when the state is entered and deactivated when the state is left\.

### SetState {#lua-api-simplestatecomponentrequestbus-setstate}

Sets the active state

**Syntax**

```
void SetState(const char* stateName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  stateName  |  char  | The name of the state\. | 

### SetStateByIndex {#lua-api-simplestatecomponentrequestbus-setstatebyindex}

Sets the active state using a 0\-based index\.

**Syntax**

```
void SetStateByIndex(AZ::u32 stateIndex)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  stateIndex  |  AZ::u32  | The 0\-based index of the state\. | 

### SetToNextState {#lua-api-simplestatecomponentrequestbus-settonextstate}

Advances to the next state\. If the next state is null, the first state is set\.

**Syntax**

```
void SetToNextState()
```

### SetToPreviousState {#lua-api-simplestatecomponentrequestbus-settopreviousstate}

Sets the previous state\. If the previous state is null, the end state is set\.

**Syntax**

```
void SetToPreviousState()
```

### SetToFirstState {#lua-api-simplestatecomponentrequestbus-settofirststate}

Sets the first state\.

**Syntax**

```
void SetToFirstState()
```

### SetToLastState {#lua-api-simplestatecomponentrequestbus-settolaststate}

Sets the last state\.

**Syntax**

```
void SetToLastState()
```

### GetNumStates {#lua-api-simplestatecomponentrequestbus-getnumstates}

Get the number of states\.

**Syntax**

```
AZ::u32 GetNumStates()
```

**Returns:** The number of states\.

**Return Type:** `AZ::u32`

**Default Return:** `0`

### GetCurrentState {#lua-api-simplestatecomponentrequestbus-getcurrentstate}

Gets the current state\.

**Syntax**

```
const char* GetCurrentState()
```

**Returns:** The current state\.

**Return Type:** `const char*`

**Default Return:** `nullptr`

## SimpleStateComponentNotificationBus {#lua-api-simplestatecomponentnotificationbus}

This EBus interface handles events dispatched by the Simple State component\.

### OnStateChanged {#lua-api-simplestatecomponentnotificationbus-onstatechanged}

Notify that the state has changed from `oldState` to `newState`\.

**Syntax**

```
void OnStateChanged(const char* oldState, const char* newState)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  oldState  |  char  | The name of the old state\. | 
|  newState  |  char  | The name of the new state\. | 

## SpawnerComponentRequestBus {#lua-api-spawnercomponentrequestbus}

This EBus interface handles messages serviced by the `SpawnerComponent`\.

### Spawn {#lua-api-spawnercomponentrequestbus-spawn}

Spawns the selected slice at the entity's location\.

**Syntax**

```
AzFramework::SliceInstantiationTicket Spawn()
```

**Returns:** A slice instantiation ticket\.

**Return Type:** `AzFramework::SliceInstantiationTicket`

**Default Return:** `AzFramework::SliceInstantiationTicket`\(\)

### SpawnRelative {#lua-api-spawnercomponentrequestbus-spawnrelative}

Spawns the selected slice at the entity's location with the specified relative offset\.

**Syntax**

```
AzFramework::SliceInstantiationTicket SpawnRelative(const AZ::Transform& relative)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  relative  |  AZ::Transform  | Relative offset from the entity's location\. | 

**Returns:** A slice instantiation ticket\.

**Return Type:** `AzFramework::SliceInstantiationTicket`

**Default Return:** `AzFramework::SliceInstantiationTicket`\(\)

### SpawnAbsolute {#lua-api-spawnercomponentrequestbus-spawnabsolute}

Spawns the selected slice at the specified world transform\.

**Syntax**

```
AzFramework::SliceInstantiationTicket SpawnAbsolute(const AZ::Transform& world)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  world  | const AZ::Transform& | Specifies the world transform at which to spawn the selected slice\. | 

**Returns:** A slice instantiation ticket\.

**Return Type:** `AzFramework::SliceInstantiationTicket`

**Default Return:** `AzFramework::SliceInstantiationTicket`\(\)

## SpawnerComponentNotificationBus {#lua-api-spawnercomponentnotificationbus}

This EBus interface handles events dispatched by the `SpawnerComponent.`

### OnSpawnBegin {#lua-api-spawnercomponentnotificationbus-onspawnbegin}

Notifies that a slice has been spawned, but that its entities have not yet been activated\. `OnEntitySpawned` events are about to be dispatched\.

**Syntax**

```
void OnSpawnBegin(const AzFramework::SliceInstantiationTicket& ticket)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  ticket  |  AzFramework::SliceInstantiationTicket  | The slice instantiation ticket\. | 

### OnSpawnEnd {#lua-api-spawnercomponentnotificationbus-onspawnend}

Notifies that a spawn has been completed\. All `OnEntitySpawned` events have been dispatched\.

**Syntax**

```
void OnSpawnEnd(const AzFramework::SliceInstantiationTicket& ticket)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  ticket  |  AzFramework::SliceInstantiationTicket  | The slice instantiation ticket\. | 

### OnEntitySpawned {#lua-api-spawnercomponentnotificationbus-onentityspawned}

Notifies that an entity has spawned\. This event is called once for each entity spawned in a slice\.

**Syntax**

```
void OnEntitySpawned(const AzFramework::SliceInstantiationTicket& ticket, const AZ::EntityId& spawnedEntities)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  ticket  |  AzFramework::SliceInstantiationTicket  | The slice instantiation ticket\. | 
|  spawnedEntities  |  AZ::EntityId  | The ID of the spawned entity\. | 

## TagComponentRequestBus {#lua-api-tagcomponentrequestbus}

Provides services for managing tags on entities\.

### HasTag {#lua-api-tagcomponentrequestbus-hastag}

Checks for a specified tag on an entity\.

**Syntax**

```
bool HasTag(const Tag&)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tag  |  Tag  | The tag to query for\. | 

**Returns:** `true` if the entity has the specified tag; `false` otherwise\.

**Return Type:** `bool`

**Default Return:** `false`

### AddTag {#lua-api-tagcomponentrequestbus-addtag}

Adds the specified tag to the entity if it doesn't already have it\.

**Syntax**

```
void AddTag(const Tag&)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  Tag  |  Tag  | The tag to add\. | 

### AddTags {#lua-api-tagcomponentrequestbus-addtags}

Adds a specified list of tags to the entity if the list does not exist on the entity\.

**Syntax**

```
void AddTags(const Tags& tags)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tags  |  Tags  | The list of tags to add\. | 

### RemoveTag {#lua-api-tagcomponentrequestbus-removetag}

Removes a specified tag from the entity if the tag is present\.

**Syntax**

```
void RemoveTag(const Tag&)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tag  |  Tag  | The tag to remove\. | 

### RemoveTags {#lua-api-tagcomponentrequestbus-removetags}

Removes the specified list of tags from the entity if the list exists on the entity\.

**Syntax**

```
void RemoveTags(const Tags& tags)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tags  |  Tags  | The list of tags to remove\. | 

### GetTags {#lua-api-tagcomponentrequestbus-gettags}

Retrieves the list of tags on the entity\.

**Syntax**

```
const Tags& GetTags()
```

**Returns:** A list of the tags on the entity\.

**Return Type:** `static Tags`

**Default Return:** `s_emptyTags`

## TagGlobalRequestBus {#lua-api-tagglobalrequestbus}

Provides services for querying Tags on entities\.

### RequestTaggedEntities {#lua-api-tagglobalrequestbus-requesttaggedentities}

Queries for tagged entities\. Handlers respond if they have the tag \(that is, they are listening on the tag's channel\)\. Use `AZ::EbusAggregateResults` to handle more than the first responder\.

**Syntax**

```
const AZ::EntityId RequestTaggedEntities()
```

**Returns:** The ID of an entity that has a tag\.

**Return Type:** `const AZ::EntityId`

**Default Return:** `s_invalidEntityId`

## TagGlobalNotificationBus {#lua-api-tagglobalnotificationbus}

Handler for global Tag component notifications\.

### OnEntityTagAdded {#lua-api-tagglobalnotificationbus-onentitytagadded}

Notifies that a tag has been added to an entity\. When connecting to the tag global notification bus, your `OnEntityTagAdded` handler fires once for each entity that already has a tag\. After the initial connection, you are alerted whenever a new entity gains or loses a tag\.

**Syntax**

```
void OnEntityTagAdded(const AZ::EntityId&)
```

### OnEntityTagRemoved {#lua-api-tagglobalnotificationbus-onentitytagremoved}

Notifies that a Tag has been removed from an entity\.

**Syntax**

```
void OnEntityTagRemoved(const AZ::EntityId&)
```

## TagComponentNotificationsBus {#lua-api-tagcomponentnotificationsbus}

Provides notifications regarding tags on entities\.

### OnTagAdded {#lua-api-tagcomponentnotificationsbus-ontagadded}

Notifies listeners when a tag has been added\.

**Syntax**

```
void OnTagAdded(const Tag&)
```

### OnTagRemoved {#lua-api-tagcomponentnotificationsbus-ontagremoved}

Notifies listeners when a tag is removed\.

**Syntax**

```
void OnTagRemoved(const Tag&)
```

## TriggerAreaRequestsBus {#lua-api-triggerarearequestsbus}

This EBus interface services requests made to the Trigger Area component\.

### AddRequiredTag {#lua-api-triggerarearequestsbus-addrequiredtag}

Adds a required tag to the activation filtering criteria of the current component\.

**Syntax**

```
void AddRequiredTag(const Tag& requiredTag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requiredTag  |  Tag  | The tag to add to the activation filtering criteria\. | 

### RemoveRequiredTag {#lua-api-triggerarearequestsbus-removerequiredtag}

Removes a required tag from the activation filtering criteria of the current component\.

**Syntax**

```
void RemoveRequiredTag(const Tag& requiredTag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requiredTag  |  Tag  | The tag to remove from the activation filtering criteria\. | 

### AddExcludedTag {#lua-api-triggerarearequestsbus-addexcludedtag}

Adds an excluded tag to the activation filtering criteria of the current component\.

**Syntax**

```
void AddExcludedTag(const Tag& excludedTag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  excludedTag  |  Tag  | The excluded tag to add to the activation filtering criteria\. | 

### RemoveExcludedTag {#lua-api-triggerarearequestsbus-removeexcludedtag}

Removes an excluded tag from the activation filtering criteria of the current component\.

**Syntax**

```
void RemoveExcludedTag(const Tag& excludedTag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  excludedTag  |  Tag  | The excluded tag to remove from the activation filtering criteria\. | 

## TriggerAreaNotificationBus {#lua-api-triggerareanotificationbus}

This EBus handles events for a given trigger area when an entity enters or leaves\.

### OnTriggerAreaEntered {#lua-api-triggerareanotificationbus-ontriggerareaentered}

Notifies when an entity enters the trigger area\.

**Syntax**

```
void OnTriggerAreaEntered(AZ::EntityId enteringEntityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  enteringEntityId  |  AZ::EntityId  | The ID of the entity that entered the trigger area\. | 

### OnTriggerAreaExited {#lua-api-triggerareanotificationbus-ontriggerareaexited}

Notifies when an entity exits the trigger area\.

**Syntax**

```
void OnTriggerAreaExited(AZ::EntityId exitingEntityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  exitingEntityId  |  AZ::EntityId  | The ID of the entity that exited the trigger area\. | 

## TriggerAreaEntityNotificationBus {#lua-api-triggerareaentitynotificationbus}

Events fired for a specified trigger when the trigger area has been entered or exited\.

### OnEntityEnteredTriggerArea {#lua-api-triggerareaentitynotificationbus-onentityenteredtriggerarea}

Notifies when an `enteringEntityId` instance has entered the specified trigger area\.

**Syntax**

```
void OnEntityEnteredTriggerArea(AZ::EntityId triggerId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerId  |  AZ::EntityId  | The ID of the trigger that has been entered\. | 

### OnEntityExitedTriggerArea {#lua-api-triggerareaentitynotificationbus-onentityexitedtriggerarea}

Notifies when an `enteringEntityId` instance has exited the specified trigger area\.

**Syntax**

```
void OnEntityExitedTriggerArea(AZ::EntityId triggerId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerId  |  AZ::EntityId  | The ID of the trigger that has been exited\. | 

## BoxShapeComponentRequestsBus {#lua-api-boxshapecomponentrequestsbus}

Services provided by the Box Shape component\.

### GetBoxConfiguration {#lua-api-boxshapecomponentrequestsbus-getboxconfiguration}

Retrieves the box configuration\.

**Syntax**

```
BoxShapeConfiguration GetBoxConfiguration()
```

**Return Type:** `BoxShapeConfiguration`

**Default Return:** `BoxShapeConfiguration()`

### SetBoxDimensions {#lua-api-boxshapecomponentrequestsbus-setboxdimensions}

Sets new dimensions for the Box Shape\.

**Syntax**

```
void SetBoxDimensions(AZ::Vector3 newDimensions)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newDimensions  |  AZ::Vector3  | Specifies dimensions along the X, Y, and Z axes\. | 

## CapsuleShapeComponentRequestsBus {#lua-api-capsuleshapecomponentrequestsbus}

Services provided by the Capsule Shape Component\.

### GetCapsuleConfiguration {#lua-api-capsuleshapecomponentrequestsbus-getcapsuleconfiguration}

Retrieves the capsule configuration\.

**Syntax**

```
CapsuleShapeConfiguration GetCapsuleConfiguration()
```

**Returns:** The capsule configuration\.

**Return Type:** `CapsuleShapeConfiguration`

**Default Return:** `CapsuleShapeConfiguration`\(\)

### SetHeight {#lua-api-capsuleshapecomponentrequestsbus-setheight}

Sets the end to end height of capsule, including the cylinder and both caps\.

**Syntax**

```
void SetHeight(float newHeight)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newHeight  |  float  | Specifies the new height of the capsule\. | 

### SetRadius {#lua-api-capsuleshapecomponentrequestsbus-setradius}

Sets the radius of the capsule\.

**Syntax**

```
void SetRadius(float newRadius)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newRadius  |  float  | Specifies the new radius of the capsule\. | 

## CylinderShapeComponentRequestsBus {#lua-api-cylindershapecomponentrequestsbus}

This EBus interface handles messages for the Cylinder Shape component\.

### GetCylinderConfiguration {#lua-api-cylindershapecomponentrequestsbus-getcylinderconfiguration}

Retrieves the cylinder configuration\.

**Syntax**

```
CylinderShapeConfiguration GetCylinderConfiguration()
```

**Returns:** The cylinder configuration\.

**Return Type:** `CylinderShapeConfiguration`

**Default Return:** `CylinderShapeConfiguration`\(\)

### SetHeight {#lua-api-cylindershapecomponentrequestsbus-setheight}

Sets the height of the cylinder\.

**Syntax**

```
void SetHeight(float newHeight)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newHeight  |  float  | Specifies the height of the cylinder\. | 

### SetRadius {#lua-api-cylindershapecomponentrequestsbus-setradius}

Sets the radius of the cylinder\.

**Syntax**

```
void SetRadius(float newRadius)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newRadius  |  float  | Specifies the radius of the cylinder\. | 

## ShapeComponentRequestsBus {#lua-api-shapecomponentrequestsbus}

Handles requests for services provided by the Shape component\.

### GetShapeType {#lua-api-shapecomponentrequestsbus-getshapetype}

Retrieves the type of shape of a component\.

**Syntax**

```
AZ::Crc32 GetShapeType()
```

**Returns:** A Crc32 value that indicates the type of shape of the current component\.

**Return Type:** `AZ::Crc32`

**Default Return:** `AZ::Crc32()`

### IsPointInside {#lua-api-shapecomponentrequestsbus-ispointinside}

Checks if a given point is inside or outside a shape\.

**Syntax**

```
bool IsPointInside(const AZ::Vector3& point)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  point  |  AZ::Vector3  | Specifies the coordinates of the point to be tested\. | 

**Returns:** A `bool` value that indicates whether the point is inside or out\.

**Return Type:** `bool`

**Default Return:** `false`

### DistanceFromPoint {#lua-api-shapecomponentrequestsbus-distancefrompoint}

Retrieves the minimum distance the specified point is from the shape\.

**Syntax**

```
float DistanceFromPoint(const AZ::Vector3& point)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  point  |  AZ::Vector3  | Specifies the coordinates of the point from which to calculate distance\.  | 

**Returns:** A float that indicates the distance the point is from the shape\.

**Return Type:** `float`

**Default Return:** `0.f`

### DistanceSquaredFromPoint {#lua-api-shapecomponentrequestsbus-distancesquaredfrompoint}

Retrieves the minimum squared distance the specified point is from the shape\.

**Syntax**

```
float DistanceSquaredFromPoint(const AZ::Vector3& point)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  point  |  AZ::Vector3  | Specifies the coordinates of the point from which to calculate the squared distance\. | 

**Returns:** A float that contains the minimum squared distance the specified point is from the shape\.

**Return Type:** `float`

**Default Return:** `0.f`

## ShapeComponentNotificationsBus {#lua-api-shapecomponentnotificationsbus}

Notifications sent by the shape component\.

### OnShapeChanged {#lua-api-shapecomponentnotificationsbus-onshapechanged}

Notifies that the shape component has been modified\.

**Syntax**

```
void OnShapeChanged(ShapeChangeReasons changeReason)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  changeReason  |  ShapeChangeReasons  | Informs listeners of the reason for this shape change \(transform change, the shape dimensions being altered\.\) | 

## SphereShapeComponentRequestsBus {#lua-api-sphereshapecomponentrequestsbus}

Services provided by the Sphere Shape Component

### GetSphereConfiguration {#lua-api-sphereshapecomponentrequestsbus-getsphereconfiguration}

Retrieves the sphere configuration\.

**Syntax**

```
SphereShapeConfiguration GetSphereConfiguration()
```

**Returns:** The sphere configuration\.

**Return Type:** `SphereShapeConfiguration`

**Default Return:** `SphereShapeConfiguration`\(\)

### SetRadius {#lua-api-sphereshapecomponentrequestsbus-setradius}

Sets the specified radius for the sphere shape component\.

**Syntax**

```
void SetRadius(float newRadius)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newRadius  |  float  | Specifies the radius of the sphere shape\. | 

## EntityBus {#lua-api-entitybus}

Dispatches events specific to a given entity\.

### OnEntityActivated {#lua-api-entitybus-onentityactivated}

Notifies when entity activation has completed\. If the entity is active when a handler connects to the bus, then the `OnEntityActivated` event is sent immediately\.

**Syntax**

```
void OnEntityActivated(const AZ::EntityId&)
```

### OnEntityDeactivated {#lua-api-entitybus-onentitydeactivated}

Notifies when the entity is about to be deactivated\.

**Syntax**

```
void OnEntityDeactivated(const AZ::EntityId&)
```

## TickBus {#lua-api-tickbus}

Tick events are executed on the main game or component thread\.

**Note**  
Warning: Adding mutex to the tick bus degrades performance in most cases\.

### OnTick {#lua-api-tickbus-ontick}

Notifies the delta time if the delta from the previous tick \(in seconds\) and time point is its absolute value\.

**Syntax**

```
void OnTick(float deltaTime, ScriptTimePoint time)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  deltaTime  |  float  | The latest time between ticks\. | 
|  time  |  ScriptTimePoint  | The time at the current tick\. | 

## TickRequestBus {#lua-api-tickrequestbus}

Make requests from this bus to get the frame time or return the current time as seconds\.

### GetTickDeltaTime {#lua-api-tickrequestbus-gettickdeltatime}

Gets the latest time between ticks\.

**Syntax**

```
float GetTickDeltaTime()
```

**Returns:** The latest time between ticks\.

**Return Type:** `float`

**Default Return:** `0.f`

### GetTimeAtCurrentTick {#lua-api-tickrequestbus-gettimeatcurrenttick}

Gets the time in seconds at the current tick\.

**Syntax**

```
ScriptTimePoint GetTimeAtCurrentTick()
```

**Returns:** The time in seconds at the current tick\.

**Return Type:** `ScriptTimePoint`

**Default Return:** `ScriptTimePoint`\(\)

## TransformNotificationBus {#lua-api-transformnotificationbus}

This EBus is a listener for transform changes\.

### OnTransformChanged {#lua-api-transformnotificationbus-ontransformchanged}

Notifies when the local transform of the entity has changed\. A local transform update always implies a world transform change\.

**Syntax**

```
void OnTransformChanged(const Transform& local, const Transform& world)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  local  |  Transform  | The local transform of the entity\. | 
|  world  |  Transform  | The world transform\. | 

### OnParentChanged {#lua-api-transformnotificationbus-onparentchanged}

Notifies when the parent of an entity has changed\. When the old or new parent is invalid, the invalid `EntityId` is equal to `InvalidEntityId`\.

**Syntax**

```
void OnParentChanged(EntityId oldParent, EntityId newParent)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  oldParent  |  EntityId  | The entity ID of the old parent\. | 
|  newParent  |  EntityId  | The entity ID of the new parent\. | 

## GameEntityContextRequestBus {#lua-api-gameentitycontextrequestbus}

This EBus interfaces makes requests to the game entity context component\.

### DestroyGameEntity {#lua-api-gameentitycontextrequestbus-destroygameentity}

Destroys an entity\. The entity is deactivated immediately and is destroyed in the next tick\.

**Syntax**

```
void DestroyGameEntity(const AZ::EntityId& id)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  id  |  AZ::EntityId  | The ID of the entity to be destroyed\. | 

### DestroyGameEntityAndDescendants {#lua-api-gameentitycontextrequestbus-destroygameentityanddescendants}

Destroys an entity and all its descendants, the entity and its descendants are deactivated immediately and will be destroyed the next tick\.

**Syntax**

```
void DestroyGameEntityAndDescendants(AZ::EntityId& id)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  id  |  AZ::EntityId  | The ID of the entity to be destroyed\. The entity's descendants will also be destroyed\. | 

### ActivateGameEntity {#lua-api-gameentitycontextrequestbus-activategameentity}

Activates an entity by the specified ID\.

**Syntax**

```
void ActivateGameEntity(AZ::EntityId& id)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  id  |  AZ::EntityId  | The ID of the entity to activate\. | 

### DeactivateGameEntity {#lua-api-gameentitycontextrequestbus-deactivategameentity}

Deactivates an entity by the specified ID\.

**Syntax**

```
void DeactivateGameEntity(AZ::EntityId& id)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  id  |  AZ::EntityId  | The ID of the entity to deactivate\. | 

### DestroySliceByEntity {#lua-api-gameentitycontextrequestbus-destroyslicebyentity}

Destroys the slice instance that contains the entity with the specified ID\.

**Syntax**

```
bool DestroySliceByEntity(AZ::EntityId& id)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  id  |  AZ::EntityId  |  | 

**Returns**: `true` if the slice instance was successfully destroyed\.

**Return Type:** `bool`

**Default Return:** `false`

## RandomManagerBus {#lua-api-randommanagerbus}

Provides functions for random numbers\.

### RandomFloat {#lua-api-randommanagerbus-randomfloat}

Generates a random float value\.

**Syntax**

```
float RandomFloat()
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tag  |  AZStd::string  | The tag\. | 

**Returns:** A random value between \[0\.0f, 1\.0f\)\.

**Return Type:** `float`

**Default Return:** `0.0f`

### RandomBool {#lua-api-randommanagerbus-randombool}

Generates a random Boolean value\.

**Syntax**

```
bool RandomBool(const AZStd::string& tag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tag  |  AZStd::string  | The tag\. | 

**Returns:** A random Boolean value\.

**Return Type:** `bool`

**Default Return:** `false`

### RandomInt {#lua-api-randommanagerbus-randomint}

Generates a random unsigned integer value\.

**Syntax**

```
unsigned int RandomInt(const AZStd::string& tag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tag  |  AZStd::string  | The tag\. | 

**Returns:** A random unsigned integer value\.

**Return Type:** `unsigned int`

**Default Return:** `0`

### RandomInRange {#lua-api-randommanagerbus-randominrange}

Generates a random unsigned integer value within a specified range\.

**Syntax**

```
unsigned int RandomInRange(const AZStd::string& tag, unsigned int min, unsigned int max)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tag  |  AZStd::string  | The tag\. | 
|  min  |  unsigned int  | The minimum value that can be returned\. | 
|  max  |  unsigned int  | The maximum value that can be returned\. | 

**Returns:** A random unsigned integer value within the specified range\.

**Return Type:** `unsigned int`

**Default Return:** `0`

## CameraRequestBus {#lua-api-camerarequestbus}

Provides access to camera properties and services\.

### GetFov {#lua-api-camerarequestbus-getfov}

Gets the camera's field of view in degrees

**Syntax**

```
float GetFOV()
```

**Returns:** The camera's field of view as a float\.

**Return Type:** `float`

**Default Return:** `s_defaultFoV`

### GetNearClipDistance {#lua-api-camerarequestbus-getnearclipdistance}

Gets the camera's distance from the near clip plane in meters\.

**Syntax**

```
float GetNearClipDistance()
```

**Returns:** The camera's distance from the near clip plane as a float in meters\.

**Return Type:** `float`

**Default Return:** s\_`defaultNearPlaneDistance`

### GetFarClipDistance {#lua-api-camerarequestbus-getfarclipdistance}

Gets the camera's distance from the far clip plane in meters\.

**Syntax**

```
float GetFarClipDistance()
```

**Returns:** The camera's distance from the far clip plane as a float in meters\.

**Return Type:** `float`

**Default Return:** s\_`defaultFarClipPlaneDistance`

### GetFrustumWidth {#lua-api-camerarequestbus-getfrustumwidth}

Gets the camera frustum's width\.

**Syntax**

```
float GetFrustumWidth()
```

**Returns:** The camera frustum's width as a float\.

**Return Type:** `float`

**Default Return:** s\_`defaultFrustumDimension`

### GetFrustumHeight {#lua-api-camerarequestbus-getfrustumheight}

Gets the camera frustum's height\.

**Syntax**

```
float GetFrustumHeight()
```

**Returns:** The camera frustum's height as a float\.

**Return Type:** `float`

**Default Return:** s\_`defaultFrustumDimension`

### SetFov {#lua-api-camerarequestbus-setfov}

Sets the camera's field of view in degrees\.

**Syntax**

```
void SetFov(float fov)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  fov  |  float  | The field of view in degrees\. Possible values are 0 < fov < 180\. | 

### SetNearClipDistance {#lua-api-camerarequestbus-setnearclipdistance}

Sets the near clip plane to the specified distance from the camera in meters\.

**Syntax**

```
void SetNearClipDistance(float nearClipDistance)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  nearClipDistance  |  float  | The distance from the camera in meters\. The value should be small, but greater than 0\. | 

### SetFarClipDistance {#lua-api-camerarequestbus-setfarclipdistance}

Sets the far clip plane to the specified distance from the camera in meters\.

**Syntax**

```
void SetFarClipDistance(float farClipDistance)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  farClipDistance  |  float  | The distance from the camera in meters\. | 

### SetFrustumWidth {#lua-api-camerarequestbus-setfrustumwidth}

Sets the camera frustum's width\.

**Syntax**

```
void SetFrustumWidth(float width)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  width  |  float  | The camera frustum's width\. | 

### SetFrustumHeight {#lua-api-camerarequestbus-setfrustumheight}

Sets the camera frustum's height\.

**Syntax**

```
void SetFrustumHeight(float height)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  height  |  float  | The camera frustum's height\. | 

### MakeActiveView {#lua-api-camerarequestbus-makeactiveview}

Makes the camera the active view\.

**Syntax**

```
void MakeActiveView()
```

## HttpClientComponentNotificationBus {#lua-api-httpclientcomponentnotificationbus}

Event handler for Http requests\.

### OnHttpRequestSuccess {#lua-api-httpclientcomponentnotificationbus-onhttprequestsuccess}

Notifies when an HTTP request is successful\.

**Syntax**

```
void OnHttpRequestSuccess(int responseCode, AZStd::string responseBody)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  responseCode  |  int  | The response code\. | 
|  responseBody  |  AZStd::string  | The body of the response\. | 

### OnHttpRequestFailure {#lua-api-httpclientcomponentnotificationbus-onhttprequestfailure}

Sent when an HTTP request failed\.

**Syntax**

```
void OnHttpRequestFailure(int responseCode)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  responseCode  |  int  | The response code\. | 

## HttpClientComponentRequestBus {#lua-api-httpclientcomponentrequestbus}

Provides services to make HTTP requests\.

### MakeHttpRequest {#lua-api-httpclientcomponentrequestbus-makehttprequest}

Makes an HTTP request\.

**Syntax**

```
void MakeHttpRequest(AZStd::string url, AZStd::string method, AZStd::string jsonBody)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  url  |  AZStd::string  | The request URL\. | 
|  method  |  AZStd::string  | The HTTP request method\. | 
|  jsonBody  |  AZStd::string  | The JSON body of the request\. | 

## HMDDeviceRequestBus {#lua-api-hmddevicerequestbus}

HMD device bus used to communicate with the rest of the engine\. Every device supported by the engine lives in its own Gem and supports this bus\. A device wraps the underlying SDK into a single object for easy use by the rest of the system\. Every device created should register with the EBus in order to be picked up as a usable device during initialization by the EBus function `BusConnect`\(\)\.

### GetTrackingState {#lua-api-hmddevicerequestbus-gettrackingstate}

Gets the most recent HMD tracking state\.

**Syntax**

```
TrackingState* GetTrackingState()
```

**Returns:** The tracking state\.

**Return Type:** `TrackingState*`

**Default Return:** `nullptr`

### RecenterPose {#lua-api-hmddevicerequestbus-recenterpose}

Center the current pose for the HMD based on the current direction in which the viewer is looking\.

**Syntax**

```
void RecenterPose()
```

### SetTrackingLevel {#lua-api-hmddevicerequestbus-settrackinglevel}

Set the current tracking level of the HMD\. Supported tracking levels are defined in struct `TrackingLevel`\.

**Syntax**

```
void SetTrackingLevel(const AZ::VR::HMDTrackingLevel level)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  level  |  AZ::VR::HMDTrackingLevel  |  The tracking level to use with the current HMD\. Possible values: `kHead` \- The sensor reads as if the player is standing\. `kFloor` \- The sensor reads as if the player is seated or on the floor\.  | 

### OutputHMDInfo {#lua-api-hmddevicerequestbus-outputhmdinfo}

Outputs the information about the currently connected HMD \(contained in the [struct HMDDeviceInfo](/docs/userguide/scripting/lua/ref-vr#lua-scripting-ref-vr-struct-hmddeviceinfo) object\) to the console and log file\.

**Syntax**

```
void OutputHMDInfo()
```

### GetDeviceInfo {#lua-api-hmddevicerequestbus-getdeviceinfo}

Get the device info object for this particular HMD\.

**Syntax**

```
HMDDeviceInfo* GetDeviceInfo()
```

**Returns:** A pointer to the current HMD's [struct HMDDeviceInfo](/docs/userguide/scripting/lua/ref-vr#lua-scripting-ref-vr-struct-hmddeviceinfo)\.

**Return Type:** `HMDDeviceInfo*`

**Default Return:** `nullptr`

### IsInitialized {#lua-api-hmddevicerequestbus-isinitialized}

Gets whether or not the HMD has been initialized\. The HMD has been initialized when it has fully established an interface with its required SDK and is ready to be used\.

**Syntax**

```
bool IsInitialized()
```

**Returns:** `true` if the device has been initialized and is usable; otherwise, returns `false`\.

**Return Type:** `bool`

**Default Return:** `false`

## ControllerRequestBus {#lua-api-controllerrequestbus}

Provides information about HMD device controllers\.

### GetTrackingState {#lua-api-controllerrequestbusgettrackingstate}

Returns a `TrackingState` object that contains tracking info about a connected controller\. For more information, see [struct TrackingState](/docs/userguide/scripting/lua/ref-vr#lua-scripting-ref-vr-struct-trackingstate)\.

**Syntax**

```
TrackingState* GetTrackingState(ControllerIndex controllerIndex)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  controllerIndex  |  int  | Specify 0 for the left controller; 1 for the right controller\. | 

**Returns:** A pointer to the `TrackingState` object for the connected controller\.

**Return Type:** `TrackingState*`

**Default Return:** `nullptr`

### IsConnected {#lua-api-controllerrequestbus-isconnected}

Returns whether the specified controller is connected\.

**Syntax**

```
bool IsConnected(ControllerIndex controllerIndex)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  controllerIndex  |  int  | Specify 0 for the left controller; 1 for the right controller\. | 

**Returns:** A Boolean that indicates whether the specified controller is connected\.

**Return Type:** `bool`

**Default Return:** `false`

## VideoPlaybackRequestBus {#lua-api-videoplaybackrequestbus}

Provides access to video playback services\.

### Play {#lua-api-videoplaybackrequestbus-play}

Start or resume playing a movie that is attached to the current entity\.

**Syntax**

```
void Play()
```

### Pause {#lua-api-videoplaybackrequestbus-pause}

Pause a movie that is attached to the current entity\.

**Syntax**

```
void Pause()
```

### Stop {#lua-api-videoplaybackrequestbus-stop}

Stop playing a movie that is attached to the current entity\.

**Syntax**

```
void Stop()
```

### EnableLooping {#lua-api-videoplaybackrequestbus-enablelooping}

Set whether or not the movie attached to the current entity loops\.

**Syntax**

```
void EnableLooping(bool enable)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  enable  |  bool  | Specify true to loop; false to not loop\. | 

### IsPlaying {#lua-api-videoplaybackrequestbus-isplaying}

Returns whether or not the video is currently playing

**Syntax**

```
bool IsPlaying()
```

**Returns:** `true` if the video is currently playing; `false` if the video is paused or stopped\.

**Return Type:** `bool`

**Default Return:** `false`

### SetPlaybackSpeed {#lua-api-videoplaybackrequestbus-setplaybackspeed}

Sets the playback speed based on a factor of the current playback speed\.

**Syntax**

```
void SetPlaybackSpeed(float speedFactor)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  speedFactor  |  float  | The speed modification factor to apply to playback speed\. For example, specify 0\.5f to play at half speed or 2\.0f to play at double speed\. | 

## VideoPlaybackNotificationBus {#lua-api-videoplaybacknotificationbus}

This bus contains event handlers for video playback services\.

### OnPlaybackStarted {#lua-api-videoplaybacknotificationbus-onplaybackstarted}

Event that fires when the movie starts playback\.

**Syntax**

```
void OnPlaybackStarted()
```

### OnPlaybackPaused {#lua-api-videoplaybacknotificationbus-onplaybackpaused}

Event that fires when the movie pauses playback\.

**Syntax**

```
void OnPlaybackPaused()
```

### OnPlaybackStopped {#lua-api-videoplaybacknotificationbus-onplaybackstopped}

Event that fires when the movie stops playback\.

**Syntax**

```
void OnPlaybackStopped()
```

### OnPlaybackFinished {#lua-api-videoplaybacknotificationbus-onplaybackfinished}

Event that fires when the movie completes playback\.

**Syntax**

```
void OnPlaybackFinished()
```