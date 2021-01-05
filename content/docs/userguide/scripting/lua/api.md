---
description: ' Learn about Lua API calls that you can use with &ALY;. '
slug: lua-api
title: Component Entity Lua API Reference
---
# Component Entity Lua API Reference<a name="lua-api"></a>


****  

|  | 
| --- |
| This documentation is preliminary and subject to change\.  | 

You can use the Lua API calls in this reference for scripting the component entity system in Lumberyard\. For a tutorial on writing Lua scripts in Lumberyard, see [Writing Lua Scripts](/docs/userguide/scripting/lua/intro.md)\. For Lua scripting functions that load and unload canvases in Lumberyard Editor, see the [UI Lua Reference](/docs/userguide/scripting/lua/ces-api-ui.md)\.

## BehaviorTreeComponentRequestBus<a name="lua-api-behaviortreecomponentrequestbus"></a>

Represents a request submitted by a user of the current component\.

### StartBehaviorTree<a name="lua-api-behaviortreecomponentrequestbus-startbehaviortree"></a>

Starts an inactive behavior tree associated with the current entity\.

**Syntax**

```
void BehaviorTreeComponent::StartBehaviorTree()
```

### StopBehaviorTree<a name="lua-api-behaviortreecomponentrequestbus-stopbehaviortree"></a>

Stops an active behavior tree associated with the current entity\.

**Syntax**

```
void BehaviorTreeComponent::StopBehaviorTree()
```

### GetVariableNameCrcs<a name="lua-api-behaviortreecomponentrequestbus-getvariablenamecrcs"></a>

Gets a list of cyclic redundancy check values for variable names\.

**Syntax**

```
AZStd::vector<AZ::Crc32> GetVariableNameCrcs()
```

**Returns:** A list of the 32\-bit cyclic redundancy check values for all variable names\.

**Return Type:** `AZStd::vector`

**Default Return:** `s_defaultEmptyVariableIds`

### GetVariableValue<a name="lua-api-behaviortreecomponentrequestbus-getvariablevalue"></a>

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

### SetVariableValue<a name="lua-api-behaviortreecomponentrequestbus-setvariablevalue"></a>

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

## NavigationComponentRequestBus<a name="lua-api-navigationcomponentrequestbus"></a>

Requests serviced by the navigation component\.

### FindPathToEntity<a name="lua-api-navigationcomponentrequestbus-findpathtoentity"></a>

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

### Stop<a name="lua-api-navigationcomponentrequestbus-stop"></a>

Stops all pathfinding operations for the specified `requestId`\. The ID is used to make sure that the request being cancelled is the request that is currently being processed\. If the specified `requestId` is different from the ID of the current request, the stop command can be safely ignored\.

**Syntax**

```
void Stop(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request that is being cancelled\. | 

## NavigationComponentNotificationBus<a name="lua-api-navigationcomponentnotificationbus"></a>

Notifications sent by the Navigation component\.

### OnSearchingForPath<a name="lua-api-navigationcomponentnotificationbus-onsearchingforpath"></a>

Indicates that the pathfinding request has been submitted to the navigation system\.

**Syntax**

```
void OnSearchingForPath(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request for the path that is being searched\. | 

### OnTraversalStarted<a name="lua-api-navigationcomponentnotificationbus-ontraversalstarted"></a>

Indicates that traversal for the indicated request has started\.

**Syntax**

```
void OnTraversalStarted(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request for which traversal has started\. | 

### OnTraversalInProgress<a name="lua-api-navigationcomponentnotificationbus-ontraversalinprogress"></a>

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

### OnTraversalComplete<a name="lua-api-navigationcomponentnotificationbus-ontraversalcomplete"></a>

Indicates that traversal for the indicated request has completed successfully\.

**Syntax**

```
void OnTraversalComplete(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request for which traversal has finished\. | 

### OnTraversalCancelled<a name="lua-api-navigationcomponentnotificationbus-ontraversalcancelled"></a>

Indicates that traversal for the indicated request was cancelled before it could be successfully completed\.

**Syntax**

```
void OnTraversalCancelled(PathfindRequest::NavigationRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  PathfindRequest::NavigationRequestId  | ID of the request for which traversal was cancelled\. | 

## NavigationSystemRequestBus<a name="lua-api-navigationsystembus"></a>

Requests serviced by the navigation system component\. This currently contains the single function `RayCast`\.

### RayCast<a name="lua-api-navigationcomponentrequestbus-raycast"></a>

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

## AttachmentComponentRequestBus<a name="lua-api-attachmentcomponentrequestbus"></a>

Messages serviced by the `AttachmentComponent`\. The `AttachmentComponent` lets an entity "stick" to a particular bone on a target entity\.

### Attach<a name="lua-api-attachmentcomponentrequestbus-attach"></a>

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

### Detach<a name="lua-api-attachmentcomponentrequestbus-detach"></a>

Detaches an entity from its target\.

**Syntax**

```
void Detach()
```

### SetAttachmentOffset<a name="lua-api-attachmentcomponentrequestbus-setattachmentoffset"></a>

Update an entity's offset from its target\.

**Syntax**

```
void SetAttachmentOffset(const AZ::Transform& offset)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  offset  |  AZ::Transform  | The offset from the target\. | 

## AttachmentComponentNotificationBus<a name="lua-api-attachmentcomponentnotificationbus"></a>

This EBus interface handles events emitted by the `AttachmentComponent`\. The `AttachmentComponent` lets an entity "stick" to a particular bone on a target entity\.

### OnAttached<a name="lua-api-attachmentcomponentnotificationbus-onattached"></a>

The entity has attached to the target\.

**Syntax**

```
void OnAttached(AZ::EntityId targetId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  targetId  |  AZ::EntityId  | The target being attached to\. | 

### OnDetached<a name="lua-api-attachmentcomponentnotificationbus-ondetached"></a>

The entity is detaching from the target\.

**Syntax**

```
void OnDetached(AZ::EntityId targetId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  targetId  |  AZ::EntityId  | The target being detached from\. | 

## CharacterAnimationRequestBus<a name="lua-api-characteranimationrequestbus"></a>

General character animation requests serviced by the `CharacterAnimationManager` component\.

### SetBlendParameter<a name="lua-api-characteranimationrequestbus-setblendparameter"></a>

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

### SetAnimationDrivenMotion<a name="lua-api-characteranimationrequestbus-setanimationdrivenmotion"></a>

Enables or disables animation\-driven root motion\.

**Syntax**

```
void SetAnimationDrivenMotion(bool useAnimDrivenMotion)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  useAnimDrivenMotion  |  bool  | Specify true to enable animation\-driven root motion; false to disable\. | 

## MannequinRequestsBus<a name="lua-api-characteranimationrequestbus-mannequinrequestsbus"></a>

Services provided by the Mannequin component\.

### QueueFragment<a name="lua-api-characteranimationrequestbus-queuefragment"></a>

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

### PauseAll<a name="lua-api-characteranimationrequestbus-pauseall"></a>

Pauses all actions being managed by the current Mannequin component

**Syntax**

```
void PauseAll()
```

### ResumeAll<a name="lua-api-characteranimationrequestbus-resumeall"></a>

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

### SetTag<a name="lua-api-characteranimationrequestbus-settag"></a>

Sets the specified tag for the action controller\.

**Syntax**

```
void SetTag(const char* tagName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tagName  |  char  | The name of the tag to set\. | 

### ClearTag<a name="lua-api-characteranimationrequestbus-cleartag"></a>

Clears the specified tag for the action controller\.

**Syntax**

```
void ClearTag(const char* tagName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tagName  |  char  | The name of the tag to be cleared\. | 

### SetGroupTag<a name="lua-api-characteranimationrequestbus-setgrouptag"></a>

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

### ClearGroup<a name="lua-api-characteranimationrequestbus-cleargroup"></a>

Clears tags for the indicated group\.

**Syntax**

```
void ClearGroup(const char* groupName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  groupName  |  char  | The name of the group\. | 

### SetScopeContext<a name="lua-api-characteranimationrequestbus-setscopecontext"></a>

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

### ClearScopeContext<a name="lua-api-characteranimationrequestbus-clearscopecontext"></a>

Clears the specified scope context\.

**Syntax**

```
void ClearScopeContext(const char* scopeContextName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  scopeContextName  |  char  | Name of the scope context that is to be cleared\. | 

### StopRequest<a name="lua-api-characteranimationrequestbus-stoprequest"></a>

Stops the actions associated with the specified request\.

**Syntax**

```
void StopRequest(FragmentRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  FragmentRequestId  | Specifies the ID of the request for which actions should be stopped\. | 

### GetRequestStatus<a name="lua-api-characteranimationrequestbus-getrequeststatus"></a>

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

### ForceFinishRequest<a name="lua-api-characteranimationrequestbus-forcefinishrequest"></a>

Forces the actions associated with the specified request to finish\.

**Syntax**

```
void ForceFinishRequest(FragmentRequestId requestId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requestId  |  FragmentRequestId  | The ID of the request\. | 

### SetRequestSpeedBias<a name="lua-api-characteranimationrequestbus-setrequestspeedbias"></a>

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

### GetRequestSpeedBias<a name="lua-api-characteranimationrequestbus-getrequestspeedbias"></a>

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

### SetRequestAnimWeight<a name="lua-api-characteranimationrequestbus-setrequestanimweight"></a>

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

### GetRequestAnimWeight<a name="lua-api-characteranimationrequestbus-getrequestanimweight"></a>

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

## SimpleAnimationComponentRequestBus<a name="lua-api-simpleanimationcomponentrequestbus"></a>

Services provided by the Simple Animation component\. The Simple Animation component provides basic animation functionality for the entity\. If the entity has a mesh component with a skinned mesh attached \(a \.chr or \.cdf file\), the Simple Animation component will provide a list of all valid animations specified in the associated \.chrparams file\. The Simple Animation component does not provide interaction with Mannequin and should be used for light\-weight environment or background animation\.

### StartDefaultAnimations<a name="lua-api-simpleanimationcomponentrequestbus-startdefaultanimations"></a>

Plays the default animations along with default looping and speed parameters that were set up as a part of the current component\. Components allow for multiple layers to be set up with defaults\. The `StartDefaultAnimations` method starts the playback of all the default animations of the component\.

**Syntax**

```
SimpleAnimationComponentRequests::Result StartDefaultAnimations()
```

**Returns:** A `Result` indicating whether the animations were started successfully\.

**Return Type:** `SimpleAnimationComponentRequests::Result`

**Default Return:** `SimpleAnimationComponentRequests::Result::Failure`

### StartAnimation<a name="lua-api-simpleanimationcomponentrequestbus-startanimation"></a>

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

### StartAnimationByName<a name="lua-api-simpleanimationcomponentrequestbus-startanimationbyname"></a>

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

### StopAllAnimations<a name="lua-api-simpleanimationcomponentrequestbus-stopallanimations"></a>

Stops all animations that are being played on all layers\.

**Syntax**

```
Result StopAllAnimations()
```

**Returns:** A `Result` indicating whether all animations were stopped\.

**Return Type:** `SimpleAnimationComponentRequests::Result`

**Default Return:** `SimpleAnimationComponentRequests::Result::Failure `

### StopAnimationsOnLayer<a name="lua-api-simpleanimationcomponentrequestbus-stopanimationsonlayer"></a>

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

### SetPlaybackSpeed<a name="lua-api-simpleanimationcomponentrequestbus-setplaybackspeed"></a>

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

## SimpleAnimationComponentNotificationBus<a name="lua-api-simpleanimationcomponentnotificationbus"></a>

This EBus interfaces handles events sent by the simple animation component\.

### OnAnimationStarted<a name="lua-api-simpleanimationcomponentnotificationbus-onanimationstarted"></a>

Informs all listeners about an animation being started on a layer\.

**Syntax**

```
void OnAnimationStarted(const AnimatedLayer& animatedLayer)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  animatedLayer  |  AnimatedLayer  | Specifies the name and parameters of the animation that was started\. | 

### OnAnimationStopped<a name="lua-api-simpleanimationcomponentnotificationbus-onanimationstopped"></a>

Informs all listeners about an animation being stopped on the indicated layer

**Syntax**

```
void OnAnimationStopped(const AnimatedLayer::LayerId animatedLayer)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  animatedLayer  |  AnimatedLayer::LayerId  | Specifies the name and parameters of the animation that was stopped\. | 

## AudioEnvironmentComponentRequestBus<a name="lua-api-audioenvironmentcomponentrequestbus"></a>

This EBus interface handles messages serviced by `AudioEnvironmentComponent` instances\. The environment refers to the effects \(primarily the auxiliary effects\) that the bus sends\. See `AudioEnvironmentComponent.cpp` for details\.

### SetAmount<a name="lua-api-audioenvironmentcomponentrequestbus-setamount"></a>

Sets an environment amount on the default assigned environment\.

**Syntax**

```
void SetAmount(float amount)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  amount  |  float  | The amount for the environment\. | 

### SetEnvironmentAmount<a name="lua-api-audioenvironmentcomponentrequestbus-setenvironmentamount"></a>

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

## AudioListenerComponentRequestBus<a name="lua-api-audiolistenercomponentrequestbus"></a>

This EBus interface handles messages serviced by `AudioListenerComponent` instances\.

### SetRotationEntity<a name="lua-api-audiolistenercomponentrequestbus-setrotationentity"></a>

Sets the entity for which the audio listener tracks rotation\.

**Syntax**

```
void SetRotationEntity(const AZ::EntityId entityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  entityId  |  AZ::EntityId  | The ID of the entity\. | 

### SetPositionEntity<a name="lua-api-audiolistenercomponentrequestbus-setpositionentity"></a>

Sets the entity for which the audio listener tracks position\.

**Syntax**

```
void SetPositionEntity(const AZ::EntityId entityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  entityId  |  AZ::EntityId  | The ID of the entity\. | 

### SetFullTransformEntity<a name="lua-api-audiolistenercomponentrequestbus-setfulltransformentity"></a>

Essentially the same as calling `SetRotationEntity` and `SetPositionEntity` on the same entity\.

**Syntax**

```
void SetFullTransformEntity(const AZ::EntityId entityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  entityId  |  AZ::EntityId  | The ID of the entity\. | 

## AudioRtpcComponentRequestBus<a name="lua-api-audiortpccomponentrequestbus"></a>

This EBus interface handles messages serviced by `AudioRtpcComponent` instances\. RTPC stands for Real\-Time Parameter Control\. The `AudioRtpcComponent` is used by the game to configure parameters in the audio engine\. See `AudioRtpcComponent.cpp` for details\.

### SetValue<a name="lua-api-audiortpccomponentrequestbus-setvalue"></a>

Sets an RTPC value for the RTPC name that has been serialized with the component\.

**Syntax**

```
void SetValue(float value)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  value  |  float  | The RTPC value to set\. | 

### SetRtpcValue<a name="lua-api-audiortpccomponentrequestbus-setrtpcvalue"></a>

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

## AudioSwitchComponentRequestBus<a name="lua-api-audioswitchcomponentrequestbus"></a>

This EBus interface handles messages serviced by `AudioSwitchComponent` instances\. A `Switch` is an object that can be in one `State` at a time, but whose `State` value can be changed at run time\. For example, a `Switch called` `SurfaceMaterial` might have states such as 'Grass', 'Snow', 'Metal', or 'Wood'\. See `AudioSwitchComponent.h` for details\.

### SetState<a name="lua-api-audioswitchcomponentrequestbus-setstate"></a>

Sets the name of the state on the default assigned switch\.

**Syntax**

```
void SetState(const char* stateName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  stateName  |  char  | Specifies the name of the state to set\. | 

### SetSwitchState<a name="lua-api-audioswitchcomponentrequestbus-setswitchstate"></a>

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

## AudioTriggerComponentRequestBus<a name="lua-api-audiotriggercomponentrequestbus"></a>

This EBus interface handles messages serviced by `AudioTriggerComponent` instances\. You can use the `AudioTriggerComponent` to execute, stop, and control ATL triggers\. You can serialize the name of the trigger with the component or manually specify the name at run time for use in scripting\. Only one `AudioTriggerComponent` is allowed on an entity, but the interface supports firing multiple ATL triggers\.

### Play<a name="lua-api-audiotriggercomponentrequestbus-play"></a>

Executes the play trigger if the play trigger is set\.

**Syntax**

```
void Play()
```

### Stop<a name="lua-api-audiotriggercomponentrequestbus-stop"></a>

Executes the stop trigger if one is set; otherwise, stops the play trigger\.

**Syntax**

```
void Stop()
```

### ExecuteTrigger<a name="lua-api-audiotriggercomponentrequestbus-executetrigger"></a>

Executes the specified ATL trigger\.

**Syntax**

```
void ExecuteTrigger(const char* triggerName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerName  |  char  | Specifies the name of the trigger to execute\. | 

### KillTrigger<a name="lua-api-audiotriggercomponentrequestbus-killtrigger"></a>

Kills the specified ATL Trigger\.

**Syntax**

```
void KillTrigger(const char* triggerName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerName  |  char  | Specifies the name of the trigger to remove\. | 

### KillAllTriggers<a name="lua-api-audiotriggercomponentrequestbus-killalltriggers"></a>

Forces a removal of triggers that are active on the underlying proxy\.

**Syntax**

```
void KillAllTriggers()
```

### SetMovesWithEntity<a name="lua-api-audiotriggercomponentrequestbus-setmoveswithentity"></a>

Specifies whether the trigger should be repositioned as the entity moves\.

**Syntax**

```
void SetMovesWithEntity(bool shouldTrackEntity)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  shouldTrackEntity  |  bool  | Specify true to have the trigger track the entity\. Specify false to have the trigger not track the entity\. | 

## AudioTriggerComponentNotificationBus<a name="lua-api-audiotriggercomponentnotificationbus"></a>

This EBus interface handles messages sent by `AudioTriggerComponent` instances\.

### OnTriggerFinished<a name="lua-api-audiotriggercomponentnotificationbus-ontriggerfinished"></a>

Notifies when a trigger instance has finished\.

**Syntax**

```
void OnTriggerFinished(const Audio::TAudioControlID triggerID)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerID  |  Audio::TAudioControlID  | The ID of the trigger\. | 

## FloatGameplayNotificationBus \(AZ::GameplayNotificationBus<float>\)<a name="lua-api-floatgameplaynotificationbus-"></a>

This version of the `GameplayNotificationBus` EBus interface handles float\-based gameplay notifications\.

### OnGameplayEventAction<a name="lua-api-floatgameplaynotificationbus-ongameplayeventaction"></a>

Event sent when the specified `GameplayEventAction` has occurred\.

### OnGameplayEventFailed<a name="lua-api-floatgameplaynotificationbus-ongameplayeventfailed"></a>

Event sent when the given `GameplayEventAction` has failed\.

## Vector3GameplayNotificationBus<a name="lua-api-vector3gameplaynotificationbus"></a>

This version of the `GameplayNotificationBus` EBus interface handles Vector3\-based gameplay notifications\.

### OnGameplayEventAction<a name="lua-api-vector3gameplaynotificationbus-ongameplayeventaction"></a>

Event sent when the given `GameplayEventAction` has occurred\.

### OnGameplayEventFailed<a name="lua-api-vector3gameplaynotificationbus-ongameplayeventfailed"></a>

Event sent when the given `GameplayEventAction` has failed\.

## StringGameplayNotificationBus \(AZ::GameplayNotificationBus<const AZStd:wq::string>\)<a name="lua-api-stringgameplaynotificationbus"></a>

This version of the `GameplayNotificationBus` EBus interface handles string\-based gameplay notifications\.

### OnGameplayEventAction<a name="lua-api-stringgameplaynotificationbus-ongameplayeventaction"></a>

Event sent when the given `GameplayEventAction` has occurred\.

### OnGameplayEventFailed<a name="lua-api-stringgameplaynotificationbus-ongameplayeventfailed"></a>

Event sent when the given `GameplayEventAction` has failed\.

## EntityIdGameplayNotificationBus \(AZ::GameplayNotificationBus<AZ::EntityId>\)<a name="lua-api-entityidgameplaynotificationbus"></a>

This EBus interface handles `EntityId`\-based gameplay notifications\. It is a specialization of the `GameplayNotificationBus`\.

### OnGameplayEventAction<a name="lua-api-entityidgameplaynotificationbus-ongameplayeventaction"></a>

Event sent when the given `GameplayEventAction` has occurred\.

### OnGameplayEventFailed<a name="lua-api-entityidgameplaynotificationbus-ongameplayeventfailed"></a>

Event sent when the given `GameplayEventAction` has failed\.

## CryCharacterPhysicsRequestBus<a name="lua-api-crycharacterphysicsrequestbus"></a>

This EBus interface handles messages serviced by Cry character physics\.

### Move<a name="lua-api-crycharacterphysicsrequestbus-move"></a>

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

## ConstraintComponentRequestBus<a name="lua-api-constraintcomponentrequestbus"></a>

This EBus interface handles messages serviced by instances of the Constraint component\. A Constraint component facilitates the creation of a physics constraint between two entities or an entity and a point in the world\. Both entities must have a component that provides the physics service\.

### SetConstraintEntities<a name="lua-api-constraintcomponentrequestbus-setconstraintentities"></a>

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

### SetConstraintEntitiesWithPartIds<a name="lua-api-constraintcomponentrequestbus-setconstraintentitieswithpartids"></a>

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

### EnableConstraint<a name="lua-api-constraintcomponentrequestbus-enableconstraint"></a>

Enable all constraints on the current entity\.

**Syntax**

```
void EnableConstraint()
```

### DisableConstraint<a name="lua-api-constraintcomponentrequestbus-disableconstraint"></a>

Disable all constraints on the current entity\.

**Syntax**

```
void DisableConstraint()
```

## ConstraintComponentNotificationBus<a name="lua-api-constraintcomponentnotificationbus"></a>

This EBus interface handles messages dispatched by the Constraint component\.

### OnConstraintEntitiesChanged<a name="lua-api-constraintcomponentnotificationbus-onconstraintentitieschanged"></a>

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

### OnConstraintEnabled<a name="lua-api-constraintcomponentnotificationbus-onconstraintenabled"></a>

Fires when constraints have been enabled on the current entity\.

**Syntax**

```
void OnConstraintEnabled()
```

### OnConstraintDisabled<a name="lua-api-constraintcomponentnotificationbus-onconstraintdisabled"></a>

Fires when a constraint has been disabled\.

**Syntax**

```
void OnConstraintDisabled()
```

## PhysicsComponentRequestBus<a name="lua-api-physicscomponentrequestbus"></a>

This EBus interface handles messages serviced by the in\-game Physics component\.

### EnablePhysics<a name="lua-api-physicscomponentrequestbus-enablephysics"></a>

Makes the entity a participant in the physics simulation\.

**Syntax**

```
void EnablePhysics()
```

### DisablePhysics<a name="lua-api-physicscomponentrequestbus-disablephysics"></a>

Stops the entity from participating in the physics simulation

**Syntax**

```
void DisablePhysics()
```

### IsPhysicsEnabled<a name="lua-api-physicscomponentrequestbus-isphysicsenabled"></a>

Checks if physics are enabled on the current entity\.

**Syntax**

```
bool IsPhysicsEnabled()
```

**Returns:** `true` if physics are enabled; `false` otherwise\.

**Return Type:** `bool`

**Default Return:** `false`

### AddImpulse<a name="lua-api-physicscomponentrequestbus-addimpulse"></a>

Applies the specified impulse to the entity\.

**Syntax**

```
void AddImpulse(const AZ::Vector3& impulse)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  impulse  |  AZ::Vector3  | Vector of the impulse\. | 

### AddAngularImpulse<a name="lua-api-physicscomponentrequestbus-addangularimpulse"></a>

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

### GetVelocity<a name="lua-api-physicscomponentrequestbus-getvelocity"></a>

Retrieves the velocity of the entity\.

**Syntax**

```
AZ::Vector3 GetVelocity()
```

**Returns:** The velocity of the entity\.

**Return Type:** `AZ::Vector3`

**Default Return:** `AZ::Vector3::CreateZero`\(\)

### SetVelocity<a name="lua-api-physicscomponentrequestbus-setvelocity"></a>

Sets the velocity of the entity\.

**Syntax**

```
void SetVelocity(const AZ::Vector3& velocity)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  velocity  |  AZ::Vector3  | Specifies the velocity to set\. | 

### GetAcceleration<a name="lua-api-physicscomponentrequestbus-getacceleration"></a>

Gets the linear acceleration of the entity\.

**Syntax**

```
AZ::Vector3 GetAcceleration()
```

**Returns:** A vector containing the linear acceleration of the entity\.

**Return Type:** `AZ::Vector3`

**Default Return:** `AZ::Vector3::CreateZero`\(\)

### GetAngularVelocity<a name="lua-api-physicscomponentrequestbus-getangularvelocity"></a>

Gets the angular velocity of the entity\.

**Syntax**

```
AZ::Vector3 GetAngularVelocity()
```

**Returns:** A vector containing the angular velocity of the entity\.

**Return Type:** `AZ::Vector3`

**Default Return:** `AZ::Vector3::CreateZero`\(\)

### SetAngularVelocity<a name="lua-api-physicscomponentrequestbus-setangularvelocity"></a>

Sets the angular velocity of the entity to the specified amount\.

**Syntax**

```
void SetAngularVelocity(const AZ::Vector3& angularVelocity)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  angularVelocity  |  AZ::Vector3  | The angular velocity to set\. | 

### GetAngularAcceleration<a name="lua-api-physicscomponentrequestbus-getangularacceleration"></a>

Gets the angular acceleration of the entity

**Syntax**

```
AZ::Vector3 GetAngularAcceleration()
```

**Returns:** A vector containing the angular acceleration of the entity\.

**Return Type:** `AZ::Vector3`

**Default Return:** `AZ::Vector3::CreateZero`\(\)

### GetMass<a name="lua-api-physicscomponentrequestbus-getmass"></a>

Retrieves the mass of the entity\.

**Syntax**

```
float GetMass()
```

**Returns:** The mass of the entity\.

**Return Type:** `float`

**Default Return:** `0.0f`

## PhysicsComponentNotificationBus<a name="lua-api-physicscomponentnotificationbus"></a>

This bus handles events emitted by a Physics component and by the Physics system\.

### OnPhysicsEnabled<a name="lua-api-physicscomponentnotificationbus-onphysicsenabled"></a>

Fires when an entity begins participating in the physics simulation\. If the entity is active when a handler connects to the bus, then `OnPhysicsEnabled`\(\) is immediately dispatched\.

**Note**  
If physics is enabled, `OnPhysicsEnabled` fires immediately upon connecting to the bus\.

**Syntax**

```
void OnPhysicsEnabled()
```

### OnPhysicsDisabled<a name="lua-api-physicscomponentnotificationbus-onphysicsdisabled"></a>

Fires when an entity ends its participation in the physics simulation\.

**Syntax**

```
void OnPhysicsDisabled()
```

### OnCollision<a name="lua-api-physicscomponentnotificationbus-oncollision"></a>

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

## PhysicsSystemRequestBus<a name="lua-api-physicssystemrequestbus"></a>

Requests for the physics system

### RayCast<a name="lua-api-physicssystemrequestbus-raycast"></a>

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

## RagdollPhysicsRequestBus<a name="lua-api-ragdollphysicsrequestbus"></a>

Messages serviced by the Cry character physics ragdoll behavior\.

### EnterRagdoll<a name="lua-api-ragdollphysicsrequestbus-enterragdoll"></a>

Causes an entity with a skinned mesh component to disable its current physics and enable ragdoll physics\.

**Syntax**

```
void EnterRagdoll()
```

### ExitRagdoll<a name="lua-api-ragdollphysicsrequestbus-exitragdoll"></a>

Causes the ragdoll component to deactivate itself and reenable the entity's physics component\.

**Syntax**

```
void ExitRagdoll()
```

## DecalComponentRequestBus<a name="lua-api-decalcomponentrequestbus"></a>

This EBus interface handles messages serviced by the Decal component\.

### SetVisibility<a name="lua-api-decalcomponentrequestbus-setvisibility"></a>

Specifies the decal's visibility\.

**Syntax**

```
void SetVisibility(bool visible)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  visible  |  bool  | Specify true to make the decal visible, false to hide it\. | 

### Show<a name="lua-api-decalcomponentrequestbus-show"></a>

Makes the decal visible\.

**Syntax**

```
void Show()
```

### Hide<a name="lua-api-decalcomponentrequestbus-hide"></a>

Hides the decal\.

**Syntax**

```
void Hide()
```

## LensFlareComponentRequestBus<a name="lua-api-lensflarecomponentrequestbus"></a>

This EBus interface handles messages serviced by the Lens Flare component\.

### SetLensFlareState<a name="lua-api-lensflarecomponentrequestbus-setlensflarestate"></a>

Controls the lens flare state\.

**Syntax**

```
void SetLensFlareState(State state)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  state  |  State  | Specify On to turn on the lens flare; specify Off to turn it off\. | 

### TurnOnLensFlare<a name="lua-api-lensflarecomponentrequestbus-turnonlensflare"></a>

Turns the lens flare on\.

**Syntax**

```
void TurnOnLensFlare()
```

### TurnOffLensFlare<a name="lua-api-lensflarecomponentrequestbus-turnofflensflare"></a>

Turns the lens flare off\.

**Syntax**

```
void TurnOffLensFlare()
```

### ToggleLensFlare<a name="lua-api-lensflarecomponentrequestbus-togglelensflare"></a>

Toggles the lens flare state\.

**Syntax**

```
void ToggleLensFlare()
```

## LensFlareComponentNotificationBus<a name="lua-api-lensflarecomponentnotificationbus"></a>

This EBus interface handles events dispatched by the Lens Flare component\.

### LensFlareTurnedOn<a name="lua-api-lensflarecomponentnotificationbus-lensflareturnedon"></a>

Notifies that the lens flare has been turned on\.

**Syntax**

```
void LensFlareTurnedOn()
```

### LensFlareTurnedOff<a name="lua-api-lensflarecomponentnotificationbus-lensflareturnedoff"></a>

Notifies that the lens flare has been turned off\.

**Syntax**

```
void LensFlareTurnedOff()
```

## LightComponentRequestBus<a name="lua-api-lightcomponentrequestbus"></a>

This EBus interfaces handles messages serviced by the light component\.

### SetLightState<a name="lua-api-lightcomponentrequestbus-setlightstate"></a>

Controls the light state\.

**Syntax**

```
void SetLightState(State state)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  state  |  State  | Specify On to turn on the light; specify Off to turn it off\. | 

### TurnOnLight<a name="lua-api-lightcomponentrequestbus-turnonlight"></a>

Turns the light on\.

**Syntax**

```
void TurnOnLight()
```

### TurnOffLight<a name="lua-api-lightcomponentrequestbus-turnofflight"></a>

Turns the light off\.

**Syntax**

```
void TurnOffLight()
```

### ToggleLight<a name="lua-api-lightcomponentrequestbus-togglelight"></a>

Toggles the light state\.

**Syntax**

```
void ToggleLight()
```

## LightComponentNotificationBus<a name="lua-api-lightcomponentnotificationbus"></a>

Light component notifications\.

### LightTurnedOn<a name="lua-api-lightcomponentnotificationbus-lightturnedon"></a>

Event sent when a light component is turned on\.

**Syntax**

```
void LightTurnedOn()
```

### LightTurnedOff<a name="lua-api-lightcomponentnotificationbus-lightturnedoff"></a>

Event sent when a light component is turned off\.

**Syntax**

```
void LightTurnedOff()
```

## ParticleComponentRequestBus<a name="lua-api-particlecomponentrequestbus"></a>

Provides access to the particle component\.

### SetVisibility<a name="lua-api-particlecomponentrequestbus-setvisibility"></a>

Specifies the visibility of the particle component\.

**Syntax**

```
void SetVisibility(bool visible)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  visible  |  bool  | Specify true to make the particle component visible; false to hide it\. | 

### Show<a name="lua-api-particlecomponentrequestbus-show"></a>

Makes the particle component visible\.

**Syntax**

```
void Show()
```

### Hide<a name="lua-api-particlecomponentrequestbus-hide"></a>

Hides the particle component\.

**Syntax**

```
void Hide()
```

### SetupEmitter<a name="lua-api-particlecomponentrequestbus-setupemitter"></a>

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

## SimpleStateComponentRequestBus<a name="lua-api-simplestatecomponentrequestbus"></a>

This EBus interface handles messages serviced by the Simple State component\. The Simple State component provides a simple state machine\. Each state is represented by a name and zero or more entities that are activated when the state is entered and deactivated when the state is left\.

### SetState<a name="lua-api-simplestatecomponentrequestbus-setstate"></a>

Sets the active state

**Syntax**

```
void SetState(const char* stateName)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  stateName  |  char  | The name of the state\. | 

### SetStateByIndex<a name="lua-api-simplestatecomponentrequestbus-setstatebyindex"></a>

Sets the active state using a 0\-based index\.

**Syntax**

```
void SetStateByIndex(AZ::u32 stateIndex)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  stateIndex  |  AZ::u32  | The 0\-based index of the state\. | 

### SetToNextState<a name="lua-api-simplestatecomponentrequestbus-settonextstate"></a>

Advances to the next state\. If the next state is null, the first state is set\.

**Syntax**

```
void SetToNextState()
```

### SetToPreviousState<a name="lua-api-simplestatecomponentrequestbus-settopreviousstate"></a>

Sets the previous state\. If the previous state is null, the end state is set\.

**Syntax**

```
void SetToPreviousState()
```

### SetToFirstState<a name="lua-api-simplestatecomponentrequestbus-settofirststate"></a>

Sets the first state\.

**Syntax**

```
void SetToFirstState()
```

### SetToLastState<a name="lua-api-simplestatecomponentrequestbus-settolaststate"></a>

Sets the last state\.

**Syntax**

```
void SetToLastState()
```

### GetNumStates<a name="lua-api-simplestatecomponentrequestbus-getnumstates"></a>

Get the number of states\.

**Syntax**

```
AZ::u32 GetNumStates()
```

**Returns:** The number of states\.

**Return Type:** `AZ::u32`

**Default Return:** `0`

### GetCurrentState<a name="lua-api-simplestatecomponentrequestbus-getcurrentstate"></a>

Gets the current state\.

**Syntax**

```
const char* GetCurrentState()
```

**Returns:** The current state\.

**Return Type:** `const char*`

**Default Return:** `nullptr`

## SimpleStateComponentNotificationBus<a name="lua-api-simplestatecomponentnotificationbus"></a>

This EBus interface handles events dispatched by the Simple State component\.

### OnStateChanged<a name="lua-api-simplestatecomponentnotificationbus-onstatechanged"></a>

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

## SpawnerComponentRequestBus<a name="lua-api-spawnercomponentrequestbus"></a>

This EBus interface handles messages serviced by the `SpawnerComponent`\.

### Spawn<a name="lua-api-spawnercomponentrequestbus-spawn"></a>

Spawns the selected slice at the entity's location\.

**Syntax**

```
AzFramework::SliceInstantiationTicket Spawn()
```

**Returns:** A slice instantiation ticket\.

**Return Type:** `AzFramework::SliceInstantiationTicket`

**Default Return:** `AzFramework::SliceInstantiationTicket`\(\)

### SpawnRelative<a name="lua-api-spawnercomponentrequestbus-spawnrelative"></a>

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

### SpawnAbsolute<a name="lua-api-spawnercomponentrequestbus-spawnabsolute"></a>

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

## SpawnerComponentNotificationBus<a name="lua-api-spawnercomponentnotificationbus"></a>

This EBus interface handles events dispatched by the `SpawnerComponent.`

### OnSpawnBegin<a name="lua-api-spawnercomponentnotificationbus-onspawnbegin"></a>

Notifies that a slice has been spawned, but that its entities have not yet been activated\. `OnEntitySpawned` events are about to be dispatched\.

**Syntax**

```
void OnSpawnBegin(const AzFramework::SliceInstantiationTicket& ticket)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  ticket  |  AzFramework::SliceInstantiationTicket  | The slice instantiation ticket\. | 

### OnSpawnEnd<a name="lua-api-spawnercomponentnotificationbus-onspawnend"></a>

Notifies that a spawn has been completed\. All `OnEntitySpawned` events have been dispatched\.

**Syntax**

```
void OnSpawnEnd(const AzFramework::SliceInstantiationTicket& ticket)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  ticket  |  AzFramework::SliceInstantiationTicket  | The slice instantiation ticket\. | 

### OnEntitySpawned<a name="lua-api-spawnercomponentnotificationbus-onentityspawned"></a>

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

## TagComponentRequestBus<a name="lua-api-tagcomponentrequestbus"></a>

Provides services for managing tags on entities\.

### HasTag<a name="lua-api-tagcomponentrequestbus-hastag"></a>

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

### AddTag<a name="lua-api-tagcomponentrequestbus-addtag"></a>

Adds the specified tag to the entity if it doesn't already have it\.

**Syntax**

```
void AddTag(const Tag&)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  Tag  |  Tag  | The tag to add\. | 

### AddTags<a name="lua-api-tagcomponentrequestbus-addtags"></a>

Adds a specified list of tags to the entity if the list does not exist on the entity\.

**Syntax**

```
void AddTags(const Tags& tags)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tags  |  Tags  | The list of tags to add\. | 

### RemoveTag<a name="lua-api-tagcomponentrequestbus-removetag"></a>

Removes a specified tag from the entity if the tag is present\.

**Syntax**

```
void RemoveTag(const Tag&)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tag  |  Tag  | The tag to remove\. | 

### RemoveTags<a name="lua-api-tagcomponentrequestbus-removetags"></a>

Removes the specified list of tags from the entity if the list exists on the entity\.

**Syntax**

```
void RemoveTags(const Tags& tags)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  tags  |  Tags  | The list of tags to remove\. | 

### GetTags<a name="lua-api-tagcomponentrequestbus-gettags"></a>

Retrieves the list of tags on the entity\.

**Syntax**

```
const Tags& GetTags()
```

**Returns:** A list of the tags on the entity\.

**Return Type:** `static Tags`

**Default Return:** `s_emptyTags`

## TagGlobalRequestBus<a name="lua-api-tagglobalrequestbus"></a>

Provides services for querying Tags on entities\.

### RequestTaggedEntities<a name="lua-api-tagglobalrequestbus-requesttaggedentities"></a>

Queries for tagged entities\. Handlers respond if they have the tag \(that is, they are listening on the tag's channel\)\. Use `AZ::EbusAggregateResults` to handle more than the first responder\.

**Syntax**

```
const AZ::EntityId RequestTaggedEntities()
```

**Returns:** The ID of an entity that has a tag\.

**Return Type:** `const AZ::EntityId`

**Default Return:** `s_invalidEntityId`

## TagGlobalNotificationBus<a name="lua-api-tagglobalnotificationbus"></a>

Handler for global Tag component notifications\.

### OnEntityTagAdded<a name="lua-api-tagglobalnotificationbus-onentitytagadded"></a>

Notifies that a tag has been added to an entity\. When connecting to the tag global notification bus, your `OnEntityTagAdded` handler fires once for each entity that already has a tag\. After the initial connection, you are alerted whenever a new entity gains or loses a tag\.

**Syntax**

```
void OnEntityTagAdded(const AZ::EntityId&)
```

### OnEntityTagRemoved<a name="lua-api-tagglobalnotificationbus-onentitytagremoved"></a>

Notifies that a Tag has been removed from an entity\.

**Syntax**

```
void OnEntityTagRemoved(const AZ::EntityId&)
```

## TagComponentNotificationsBus<a name="lua-api-tagcomponentnotificationsbus"></a>

Provides notifications regarding tags on entities\.

### OnTagAdded<a name="lua-api-tagcomponentnotificationsbus-ontagadded"></a>

Notifies listeners when a tag has been added\.

**Syntax**

```
void OnTagAdded(const Tag&)
```

### OnTagRemoved<a name="lua-api-tagcomponentnotificationsbus-ontagremoved"></a>

Notifies listeners when a tag is removed\.

**Syntax**

```
void OnTagRemoved(const Tag&)
```

## TriggerAreaRequestsBus<a name="lua-api-triggerarearequestsbus"></a>

This EBus interface services requests made to the Trigger Area component\.

### AddRequiredTag<a name="lua-api-triggerarearequestsbus-addrequiredtag"></a>

Adds a required tag to the activation filtering criteria of the current component\.

**Syntax**

```
void AddRequiredTag(const Tag& requiredTag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requiredTag  |  Tag  | The tag to add to the activation filtering criteria\. | 

### RemoveRequiredTag<a name="lua-api-triggerarearequestsbus-removerequiredtag"></a>

Removes a required tag from the activation filtering criteria of the current component\.

**Syntax**

```
void RemoveRequiredTag(const Tag& requiredTag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  requiredTag  |  Tag  | The tag to remove from the activation filtering criteria\. | 

### AddExcludedTag<a name="lua-api-triggerarearequestsbus-addexcludedtag"></a>

Adds an excluded tag to the activation filtering criteria of the current component\.

**Syntax**

```
void AddExcludedTag(const Tag& excludedTag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  excludedTag  |  Tag  | The excluded tag to add to the activation filtering criteria\. | 

### RemoveExcludedTag<a name="lua-api-triggerarearequestsbus-removeexcludedtag"></a>

Removes an excluded tag from the activation filtering criteria of the current component\.

**Syntax**

```
void RemoveExcludedTag(const Tag& excludedTag)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  excludedTag  |  Tag  | The excluded tag to remove from the activation filtering criteria\. | 

## TriggerAreaNotificationBus<a name="lua-api-triggerareanotificationbus"></a>

This EBus handles events for a given trigger area when an entity enters or leaves\.

### OnTriggerAreaEntered<a name="lua-api-triggerareanotificationbus-ontriggerareaentered"></a>

Notifies when an entity enters the trigger area\.

**Syntax**

```
void OnTriggerAreaEntered(AZ::EntityId enteringEntityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  enteringEntityId  |  AZ::EntityId  | The ID of the entity that entered the trigger area\. | 

### OnTriggerAreaExited<a name="lua-api-triggerareanotificationbus-ontriggerareaexited"></a>

Notifies when an entity exits the trigger area\.

**Syntax**

```
void OnTriggerAreaExited(AZ::EntityId exitingEntityId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  exitingEntityId  |  AZ::EntityId  | The ID of the entity that exited the trigger area\. | 

## TriggerAreaEntityNotificationBus<a name="lua-api-triggerareaentitynotificationbus"></a>

Events fired for a specified trigger when the trigger area has been entered or exited\.

### OnEntityEnteredTriggerArea<a name="lua-api-triggerareaentitynotificationbus-onentityenteredtriggerarea"></a>

Notifies when an `enteringEntityId` instance has entered the specified trigger area\.

**Syntax**

```
void OnEntityEnteredTriggerArea(AZ::EntityId triggerId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerId  |  AZ::EntityId  | The ID of the trigger that has been entered\. | 

### OnEntityExitedTriggerArea<a name="lua-api-triggerareaentitynotificationbus-onentityexitedtriggerarea"></a>

Notifies when an `enteringEntityId` instance has exited the specified trigger area\.

**Syntax**

```
void OnEntityExitedTriggerArea(AZ::EntityId triggerId)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  triggerId  |  AZ::EntityId  | The ID of the trigger that has been exited\. | 

## BoxShapeComponentRequestsBus<a name="lua-api-boxshapecomponentrequestsbus"></a>

Services provided by the Box Shape component\.

### GetBoxConfiguration<a name="lua-api-boxshapecomponentrequestsbus-getboxconfiguration"></a>

Retrieves the box configuration\.

**Syntax**

```
BoxShapeConfiguration GetBoxConfiguration()
```

**Return Type:** `BoxShapeConfiguration`

**Default Return:** `BoxShapeConfiguration()`

### SetBoxDimensions<a name="lua-api-boxshapecomponentrequestsbus-setboxdimensions"></a>

Sets new dimensions for the Box Shape\.

**Syntax**

```
void SetBoxDimensions(AZ::Vector3 newDimensions)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newDimensions  |  AZ::Vector3  | Specifies dimensions along the X, Y, and Z axes\. | 

## CapsuleShapeComponentRequestsBus<a name="lua-api-capsuleshapecomponentrequestsbus"></a>

Services provided by the Capsule Shape Component\.

### GetCapsuleConfiguration<a name="lua-api-capsuleshapecomponentrequestsbus-getcapsuleconfiguration"></a>

Retrieves the capsule configuration\.

**Syntax**

```
CapsuleShapeConfiguration GetCapsuleConfiguration()
```

**Returns:** The capsule configuration\.

**Return Type:** `CapsuleShapeConfiguration`

**Default Return:** `CapsuleShapeConfiguration`\(\)

### SetHeight<a name="lua-api-capsuleshapecomponentrequestsbus-setheight"></a>

Sets the end to end height of capsule, including the cylinder and both caps\.

**Syntax**

```
void SetHeight(float newHeight)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newHeight  |  float  | Specifies the new height of the capsule\. | 

### SetRadius<a name="lua-api-capsuleshapecomponentrequestsbus-setradius"></a>

Sets the radius of the capsule\.

**Syntax**

```
void SetRadius(float newRadius)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newRadius  |  float  | Specifies the new radius of the capsule\. | 

## CylinderShapeComponentRequestsBus<a name="lua-api-cylindershapecomponentrequestsbus"></a>

This EBus interface handles messages for the Cylinder Shape component\.

### GetCylinderConfiguration<a name="lua-api-cylindershapecomponentrequestsbus-getcylinderconfiguration"></a>

Retrieves the cylinder configuration\.

**Syntax**

```
CylinderShapeConfiguration GetCylinderConfiguration()
```

**Returns:** The cylinder configuration\.

**Return Type:** `CylinderShapeConfiguration`

**Default Return:** `CylinderShapeConfiguration`\(\)

### SetHeight<a name="lua-api-cylindershapecomponentrequestsbus-setheight"></a>

Sets the height of the cylinder\.

**Syntax**

```
void SetHeight(float newHeight)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newHeight  |  float  | Specifies the height of the cylinder\. | 

### SetRadius<a name="lua-api-cylindershapecomponentrequestsbus-setradius"></a>

Sets the radius of the cylinder\.

**Syntax**

```
void SetRadius(float newRadius)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newRadius  |  float  | Specifies the radius of the cylinder\. | 

## ShapeComponentRequestsBus<a name="lua-api-shapecomponentrequestsbus"></a>

Handles requests for services provided by the Shape component\.

### GetShapeType<a name="lua-api-shapecomponentrequestsbus-getshapetype"></a>

Retrieves the type of shape of a component\.

**Syntax**

```
AZ::Crc32 GetShapeType()
```

**Returns:** A Crc32 value that indicates the type of shape of the current component\.

**Return Type:** `AZ::Crc32`

**Default Return:** `AZ::Crc32()`

### IsPointInside<a name="lua-api-shapecomponentrequestsbus-ispointinside"></a>

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

### DistanceFromPoint<a name="lua-api-shapecomponentrequestsbus-distancefrompoint"></a>

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

### DistanceSquaredFromPoint<a name="lua-api-shapecomponentrequestsbus-distancesquaredfrompoint"></a>

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

## ShapeComponentNotificationsBus<a name="lua-api-shapecomponentnotificationsbus"></a>

Notifications sent by the shape component\.

### OnShapeChanged<a name="lua-api-shapecomponentnotificationsbus-onshapechanged"></a>

Notifies that the shape component has been modified\.

**Syntax**

```
void OnShapeChanged(ShapeChangeReasons changeReason)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  changeReason  |  ShapeChangeReasons  | Informs listeners of the reason for this shape change \(transform change, the shape dimensions being altered\.\) | 

## SphereShapeComponentRequestsBus<a name="lua-api-sphereshapecomponentrequestsbus"></a>

Services provided by the Sphere Shape Component

### GetSphereConfiguration<a name="lua-api-sphereshapecomponentrequestsbus-getsphereconfiguration"></a>

Retrieves the sphere configuration\.

**Syntax**

```
SphereShapeConfiguration GetSphereConfiguration()
```

**Returns:** The sphere configuration\.

**Return Type:** `SphereShapeConfiguration`

**Default Return:** `SphereShapeConfiguration`\(\)

### SetRadius<a name="lua-api-sphereshapecomponentrequestsbus-setradius"></a>

Sets the specified radius for the sphere shape component\.

**Syntax**

```
void SetRadius(float newRadius)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  newRadius  |  float  | Specifies the radius of the sphere shape\. | 

## EntityBus<a name="lua-api-entitybus"></a>

Dispatches events specific to a given entity\.

### OnEntityActivated<a name="lua-api-entitybus-onentityactivated"></a>

Notifies when entity activation has completed\. If the entity is active when a handler connects to the bus, then the `OnEntityActivated` event is sent immediately\.

**Syntax**

```
void OnEntityActivated(const AZ::EntityId&)
```

### OnEntityDeactivated<a name="lua-api-entitybus-onentitydeactivated"></a>

Notifies when the entity is about to be deactivated\.

**Syntax**

```
void OnEntityDeactivated(const AZ::EntityId&)
```

## TickBus<a name="lua-api-tickbus"></a>

Tick events are executed on the main game or component thread\.

**Note**  
Warning: Adding mutex to the tick bus degrades performance in most cases\.

### OnTick<a name="lua-api-tickbus-ontick"></a>

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

## TickRequestBus<a name="lua-api-tickrequestbus"></a>

Make requests from this bus to get the frame time or return the current time as seconds\.

### GetTickDeltaTime<a name="lua-api-tickrequestbus-gettickdeltatime"></a>

Gets the latest time between ticks\.

**Syntax**

```
float GetTickDeltaTime()
```

**Returns:** The latest time between ticks\.

**Return Type:** `float`

**Default Return:** `0.f`

### GetTimeAtCurrentTick<a name="lua-api-tickrequestbus-gettimeatcurrenttick"></a>

Gets the time in seconds at the current tick\.

**Syntax**

```
ScriptTimePoint GetTimeAtCurrentTick()
```

**Returns:** The time in seconds at the current tick\.

**Return Type:** `ScriptTimePoint`

**Default Return:** `ScriptTimePoint`\(\)

## TransformNotificationBus<a name="lua-api-transformnotificationbus"></a>

This EBus is a listener for transform changes\.

### OnTransformChanged<a name="lua-api-transformnotificationbus-ontransformchanged"></a>

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

### OnParentChanged<a name="lua-api-transformnotificationbus-onparentchanged"></a>

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

## GameEntityContextRequestBus<a name="lua-api-gameentitycontextrequestbus"></a>

This EBus interfaces makes requests to the game entity context component\.

### DestroyGameEntity<a name="lua-api-gameentitycontextrequestbus-destroygameentity"></a>

Destroys an entity\. The entity is deactivated immediately and is destroyed in the next tick\.

**Syntax**

```
void DestroyGameEntity(const AZ::EntityId& id)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  id  |  AZ::EntityId  | The ID of the entity to be destroyed\. | 

### DestroyGameEntityAndDescendants<a name="lua-api-gameentitycontextrequestbus-destroygameentityanddescendants"></a>

Destroys an entity and all its descendants, the entity and its descendants are deactivated immediately and will be destroyed the next tick\.

**Syntax**

```
void DestroyGameEntityAndDescendants(AZ::EntityId& id)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  id  |  AZ::EntityId  | The ID of the entity to be destroyed\. The entity's descendants will also be destroyed\. | 

### ActivateGameEntity<a name="lua-api-gameentitycontextrequestbus-activategameentity"></a>

Activates an entity by the specified ID\.

**Syntax**

```
void ActivateGameEntity(AZ::EntityId& id)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  id  |  AZ::EntityId  | The ID of the entity to activate\. | 

### DeactivateGameEntity<a name="lua-api-gameentitycontextrequestbus-deactivategameentity"></a>

Deactivates an entity by the specified ID\.

**Syntax**

```
void DeactivateGameEntity(AZ::EntityId& id)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  id  |  AZ::EntityId  | The ID of the entity to deactivate\. | 

### DestroySliceByEntity<a name="lua-api-gameentitycontextrequestbus-destroyslicebyentity"></a>

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

## RandomManagerBus<a name="lua-api-randommanagerbus"></a>

Provides functions for random numbers\.

### RandomFloat<a name="lua-api-randommanagerbus-randomfloat"></a>

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

### RandomBool<a name="lua-api-randommanagerbus-randombool"></a>

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

### RandomInt<a name="lua-api-randommanagerbus-randomint"></a>

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

### RandomInRange<a name="lua-api-randommanagerbus-randominrange"></a>

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

## CameraRequestBus<a name="lua-api-camerarequestbus"></a>

Provides access to camera properties and services\.

### GetFov<a name="lua-api-camerarequestbus-getfov"></a>

Gets the camera's field of view in degrees

**Syntax**

```
float GetFOV()
```

**Returns:** The camera's field of view as a float\.

**Return Type:** `float`

**Default Return:** `s_defaultFoV`

### GetNearClipDistance<a name="lua-api-camerarequestbus-getnearclipdistance"></a>

Gets the camera's distance from the near clip plane in meters\.

**Syntax**

```
float GetNearClipDistance()
```

**Returns:** The camera's distance from the near clip plane as a float in meters\.

**Return Type:** `float`

**Default Return:** s\_`defaultNearPlaneDistance`

### GetFarClipDistance<a name="lua-api-camerarequestbus-getfarclipdistance"></a>

Gets the camera's distance from the far clip plane in meters\.

**Syntax**

```
float GetFarClipDistance()
```

**Returns:** The camera's distance from the far clip plane as a float in meters\.

**Return Type:** `float`

**Default Return:** s\_`defaultFarClipPlaneDistance`

### GetFrustumWidth<a name="lua-api-camerarequestbus-getfrustumwidth"></a>

Gets the camera frustum's width\.

**Syntax**

```
float GetFrustumWidth()
```

**Returns:** The camera frustum's width as a float\.

**Return Type:** `float`

**Default Return:** s\_`defaultFrustumDimension`

### GetFrustumHeight<a name="lua-api-camerarequestbus-getfrustumheight"></a>

Gets the camera frustum's height\.

**Syntax**

```
float GetFrustumHeight()
```

**Returns:** The camera frustum's height as a float\.

**Return Type:** `float`

**Default Return:** s\_`defaultFrustumDimension`

### SetFov<a name="lua-api-camerarequestbus-setfov"></a>

Sets the camera's field of view in degrees\.

**Syntax**

```
void SetFov(float fov)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  fov  |  float  | The field of view in degrees\. Possible values are 0 < fov < 180\. | 

### SetNearClipDistance<a name="lua-api-camerarequestbus-setnearclipdistance"></a>

Sets the near clip plane to the specified distance from the camera in meters\.

**Syntax**

```
void SetNearClipDistance(float nearClipDistance)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  nearClipDistance  |  float  | The distance from the camera in meters\. The value should be small, but greater than 0\. | 

### SetFarClipDistance<a name="lua-api-camerarequestbus-setfarclipdistance"></a>

Sets the far clip plane to the specified distance from the camera in meters\.

**Syntax**

```
void SetFarClipDistance(float farClipDistance)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  farClipDistance  |  float  | The distance from the camera in meters\. | 

### SetFrustumWidth<a name="lua-api-camerarequestbus-setfrustumwidth"></a>

Sets the camera frustum's width\.

**Syntax**

```
void SetFrustumWidth(float width)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  width  |  float  | The camera frustum's width\. | 

### SetFrustumHeight<a name="lua-api-camerarequestbus-setfrustumheight"></a>

Sets the camera frustum's height\.

**Syntax**

```
void SetFrustumHeight(float height)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  height  |  float  | The camera frustum's height\. | 

### MakeActiveView<a name="lua-api-camerarequestbus-makeactiveview"></a>

Makes the camera the active view\.

**Syntax**

```
void MakeActiveView()
```

## HttpClientComponentNotificationBus<a name="lua-api-httpclientcomponentnotificationbus"></a>

Event handler for Http requests\.

### OnHttpRequestSuccess<a name="lua-api-httpclientcomponentnotificationbus-onhttprequestsuccess"></a>

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

### OnHttpRequestFailure<a name="lua-api-httpclientcomponentnotificationbus-onhttprequestfailure"></a>

Sent when an HTTP request failed\.

**Syntax**

```
void OnHttpRequestFailure(int responseCode)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  responseCode  |  int  | The response code\. | 

## HttpClientComponentRequestBus<a name="lua-api-httpclientcomponentrequestbus"></a>

Provides services to make HTTP requests\.

### MakeHttpRequest<a name="lua-api-httpclientcomponentrequestbus-makehttprequest"></a>

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

## HMDDeviceRequestBus<a name="lua-api-hmddevicerequestbus"></a>

HMD device bus used to communicate with the rest of the engine\. Every device supported by the engine lives in its own Gem and supports this bus\. A device wraps the underlying SDK into a single object for easy use by the rest of the system\. Every device created should register with the EBus in order to be picked up as a usable device during initialization by the EBus function `BusConnect`\(\)\.

### GetTrackingState<a name="lua-api-hmddevicerequestbus-gettrackingstate"></a>

Gets the most recent HMD tracking state\.

**Syntax**

```
TrackingState* GetTrackingState()
```

**Returns:** The tracking state\.

**Return Type:** `TrackingState*`

**Default Return:** `nullptr`

### RecenterPose<a name="lua-api-hmddevicerequestbus-recenterpose"></a>

Center the current pose for the HMD based on the current direction in which the viewer is looking\.

**Syntax**

```
void RecenterPose()
```

### SetTrackingLevel<a name="lua-api-hmddevicerequestbus-settrackinglevel"></a>

Set the current tracking level of the HMD\. Supported tracking levels are defined in struct `TrackingLevel`\.

**Syntax**

```
void SetTrackingLevel(const AZ::VR::HMDTrackingLevel level)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  level  |  AZ::VR::HMDTrackingLevel  |  The tracking level to use with the current HMD\. Possible values: `kHead` \- The sensor reads as if the player is standing\. `kFloor` \- The sensor reads as if the player is seated or on the floor\.  | 

### OutputHMDInfo<a name="lua-api-hmddevicerequestbus-outputhmdinfo"></a>

Outputs the information about the currently connected HMD \(contained in the [struct HMDDeviceInfo](lua-scripting-ref-vr.md#lua-scripting-ref-vr-struct-hmddeviceinfo) object\) to the console and log file\.

**Syntax**

```
void OutputHMDInfo()
```

### GetDeviceInfo<a name="lua-api-hmddevicerequestbus-getdeviceinfo"></a>

Get the device info object for this particular HMD\.

**Syntax**

```
HMDDeviceInfo* GetDeviceInfo()
```

**Returns:** A pointer to the current HMD's [struct HMDDeviceInfo](lua-scripting-ref-vr.md#lua-scripting-ref-vr-struct-hmddeviceinfo)\.

**Return Type:** `HMDDeviceInfo*`

**Default Return:** `nullptr`

### IsInitialized<a name="lua-api-hmddevicerequestbus-isinitialized"></a>

Gets whether or not the HMD has been initialized\. The HMD has been initialized when it has fully established an interface with its required SDK and is ready to be used\.

**Syntax**

```
bool IsInitialized()
```

**Returns:** `true` if the device has been initialized and is usable; otherwise, returns `false`\.

**Return Type:** `bool`

**Default Return:** `false`

## ControllerRequestBus<a name="lua-api-controllerrequestbus"></a>

Provides information about HMD device controllers\.

### GetTrackingState<a name="lua-api-controllerrequestbusgettrackingstate"></a>

Returns a `TrackingState` object that contains tracking info about a connected controller\. For more information, see [struct TrackingState](lua-scripting-ref-vr.md#lua-scripting-ref-vr-struct-trackingstate)\.

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

### IsConnected<a name="lua-api-controllerrequestbus-isconnected"></a>

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

## VideoPlaybackRequestBus<a name="lua-api-videoplaybackrequestbus"></a>

Provides access to video playback services\.

### Play<a name="lua-api-videoplaybackrequestbus-play"></a>

Start or resume playing a movie that is attached to the current entity\.

**Syntax**

```
void Play()
```

### Pause<a name="lua-api-videoplaybackrequestbus-pause"></a>

Pause a movie that is attached to the current entity\.

**Syntax**

```
void Pause()
```

### Stop<a name="lua-api-videoplaybackrequestbus-stop"></a>

Stop playing a movie that is attached to the current entity\.

**Syntax**

```
void Stop()
```

### EnableLooping<a name="lua-api-videoplaybackrequestbus-enablelooping"></a>

Set whether or not the movie attached to the current entity loops\.

**Syntax**

```
void EnableLooping(bool enable)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  enable  |  bool  | Specify true to loop; false to not loop\. | 

### IsPlaying<a name="lua-api-videoplaybackrequestbus-isplaying"></a>

Returns whether or not the video is currently playing

**Syntax**

```
bool IsPlaying()
```

**Returns:** `true` if the video is currently playing; `false` if the video is paused or stopped\.

**Return Type:** `bool`

**Default Return:** `false`

### SetPlaybackSpeed<a name="lua-api-videoplaybackrequestbus-setplaybackspeed"></a>

Sets the playback speed based on a factor of the current playback speed\.

**Syntax**

```
void SetPlaybackSpeed(float speedFactor)
```


****  

| Parameter | Type | Description | 
| --- | --- | --- | 
|  speedFactor  |  float  | The speed modification factor to apply to playback speed\. For example, specify 0\.5f to play at half speed or 2\.0f to play at double speed\. | 

## VideoPlaybackNotificationBus<a name="lua-api-videoplaybacknotificationbus"></a>

This bus contains event handlers for video playback services\.

### OnPlaybackStarted<a name="lua-api-videoplaybacknotificationbus-onplaybackstarted"></a>

Event that fires when the movie starts playback\.

**Syntax**

```
void OnPlaybackStarted()
```

### OnPlaybackPaused<a name="lua-api-videoplaybacknotificationbus-onplaybackpaused"></a>

Event that fires when the movie pauses playback\.

**Syntax**

```
void OnPlaybackPaused()
```

### OnPlaybackStopped<a name="lua-api-videoplaybacknotificationbus-onplaybackstopped"></a>

Event that fires when the movie stops playback\.

**Syntax**

```
void OnPlaybackStopped()
```

### OnPlaybackFinished<a name="lua-api-videoplaybacknotificationbus-onplaybackfinished"></a>

Event that fires when the movie completes playback\.

**Syntax**

```
void OnPlaybackFinished()
```