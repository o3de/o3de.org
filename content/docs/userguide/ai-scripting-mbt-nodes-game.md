# Game Nodes<a name="ai-scripting-mbt-nodes-game"></a>

These nodes offer game\-specific MBT functionality\. These allow a game with multiple character types to trigger specific logic and perform actions involving each type's peculiarities\. Game\-specific nodes not likely to be good for "general use" will probably need customization for each game\. 

Character types are defined in a Lua file, which contains a table of settings for game nodes\.

## InflateAgentCollisionRadiusUsingPhysicsTrick<a name="ai-scripting-mbt-nodes-game-inflateagentcollisionradiususingphysicstrick"></a>

Enlarges an AI agent's capsule radius for collisions with a player\. This node employs a trick in the physics system inflate the capsule radius for agent\-player collisions while leaving the radius unchanged for collisions between the agent and the world\.

**Note**  
This trick is entirely isolated within this node\. The node does not clean up after itself, so the capsule remains inflated after it has been used\. 

This trick works as follows:

1. Sets the player dimensions with the agent\-vs\.\-player collision radius\. The physics system is multi\-threaded, so there's a short wait while until the player dimensions are committed\.

1. Periodically inspects the player dimensions to check that the agent\-vs\.\-player collision radius has been successfully committed\. This can sometimes fail to happen, such as when the AI agent is in a tight spot and can't inflate\. 

1. Once the agent\-vs\.\-player radius has been committed, goes into the geometry and sets the capsule's radius in place, using the agent\-vs\.\-world radius\. This will not affect the agent\-vs\.\-player dimensions\.

### Parameters<a name="ai-scripting-mbt-nodes-game-inflateagentcollisionradiususingphysicstrick-parameters"></a>

**radiusForAgentVsPlayer**  
Size of capsule to use when calculating collisions between the AI agent and the player\.

**radiusForAgentVsWorld**  
Size of capsule to use when calculating collisions between the AI agent and the world\.

### Success/Failure<a name="ai-scripting-mbt-nodes-game-inflateagentcollisionradiususingphysicstrick-success"></a>

The node does not SUCCEED or FAIL\. Once executed, it continues running until it is out of the scope of the executed nodes\.

### Example<a name="ai-scripting-mbt-nodes-game-inflateagentcollisionradiususingphysicstrick-example"></a>

```
<InflateAgentCollisionRadiusUsingPhysicsTrick radiusForAgentVsPlayer="1.0" radiusForAgentVsWorld="0.5" />
```

## KeepTargetAtADistance<a name="ai-scripting-mbt-nodes-game-keeptargetatadistance"></a>

Keeps the live target at a distance by physically pushing the target away when it is within a specified distance\. This node is useful when there is some sort of action close to the player and you want to avoid clipping through the camera\. Use of this node is preferable over increasing the AI agent's capsule size, which will also affect how the character fits through tight passages\. This node is generally used in parallel with other actions that need to be performed while the player cannot come too close to the AI agent; for example, when playing an animation on the spot that can move the AI agent without moving the locator, causing camera clipping\.

### Parameters<a name="ai-scripting-mbt-nodes-game-keeptargetatadistance-parameters"></a>

**distance**  
Minimum distance allowed between the player and the AI agent\.

**impulsePower**  
Amount of impulse used to keep the player at least at the minimum distance\.

### Success/Failure<a name="ai-scripting-mbt-nodes-game-keeptargetatadistance-success"></a>

The node does not SUCCEED or FAIL\. Once executed, it continues running until it is out of the scope of the executed nodes\.

### Example<a name="ai-scripting-mbt-nodes-game-keeptargetatadistance-example"></a>

```
<KeepTargetAtADistance distance="1.8" impulsePower="1.5" />
```

## Melee<a name="ai-scripting-mbt-nodes-game-melee"></a>

Triggers a melee attack against the AI agent's target\. The melee attack is performed if the following condition are satisfied: 
+ If `failIfTargetNotInNavigationMesh` is set, the target must be on a valid walkable position\. Some melee animations can move the character to a position outside the navigable area if trying to melee a target outside the navigation mesh\. 
+ If the target is not within the threshold angle specified by the entity Lua value `melee.angleThreshold`\.

### Parameters<a name="ai-scripting-mbt-nodes-game-melee-parameters"></a>

**target**  
Target of the melee attack\. This parameter could be set with the AI agent's AttentionTarget or a generic RefPoint\.

**cylinderRadius**  
Radius of the cylinder used for the collision check of the hit\.

**hitType**  
Type of hit that will be reported to the game rules\. Default is CGameRules::EHitType::Melee\.

**failIfTargetNotInNavigationMesh**  
Boolean indicating whether or not the node should try to melee a target that is outside the navigation mesh\.

**materialEffect**  
Name of the material effect used when the melee attack hits the target\.

### Success/Failure<a name="ai-scripting-mbt-nodes-game-melee-success"></a>

This node succeeds regardless of whether or not a melee attack is executed and, if it is, whether or not the attack damages the target\. This is because a failure in this node is not important for behavior tree logic\. If it's important for the game to react to this situation, a fail option can be added\. 

### Example<a name="ai-scripting-mbt-nodes-game-melee-example"></a>

```
<Melee target="AttentionTarget" cylinderRadius="1.5" hitType="hitTypeName" materialEffect="materialEffectName" />
```

### Lua Table Settings<a name="ai-scripting-mbt-nodes-game-melee-luatable"></a>

The Lua table `melee` contains the following settings:

```
melee =
{
    damage = 400,
    hitRange = 1.8,
    knockdownChance = 0.1,
    impulse = 600,
    angleThreshold = 180,
},
```

**damage**  
Amount of damage a melee attack inflicts on the target\.

**hitRange**  
Height of the cylinder used to check whether or not the melee attack can hit the target\.

**knockdownChance**  
Probability that a successful melee attack knocks down the player\.

**impulse**  
Amount of impulse applied to the player in the case of a successful melee attack\.

**angleThreshold**  
Maximum angle allowed between the AI agent's direction of movement and the direction of a path between the AI agent and the target for melee attack to be attempted\.

## ScorcherDeploy<a name="ai-scripting-mbt-nodes-game-scorcherdeploy"></a>

Manages how the Scorcher character type handles certain activity while deploying or undeploying as part of its shooting phase\. This node relies on some external Lua scripts and various signals to work properly, but is useful in obfuscating some common functionality in the AI libraries\.

Before and after the node runs, the following Lua functions are called: `EnterScorchTargetPhase()` and `LeaveScorchTargetPhase()`\. When the node starts running, the "ScorcherScorch" animation tag is requested by Mannequin\. When the node stops , if it stops normally, the "ScorcherNormal" tag is requested again\. If it is terminated prematurely, it is up to the behavior tree script to define a proper exit strategy, such as requesting the "ScorcherTurtle" tag\.

On requesting animation tags, the node waits for the following animation events to be received \(this ensures that the transition blend animations are not interrupted\): 

1. "ScorcherDeployed" – when the scorcher is ready to start firing

1. "ScorcherUndeployed" – when the scorcher is again ready to walk around

The node encapsulates the following child nodes: `RunWhileDeploying` and `RunWhileDeployed`, each of which can contain exactly one child node\.

### RunWhileDeploying<a name="ai-scripting-mbt-nodes-game-scorcherdeploy-runwhiledeploying"></a>

Causes activity to happen while the Scorcher is in the process of deploying, that is, getting ready for an attack\. As an example, this node might be used to control aiming before actually shooting\.

The node will continue running until one of the following events occur, after which the node will be forcefully stopped:
+ `ScorcherFriendlyFireWarningModule` sends one of these signals to the entity: "OnScorchAreaClear" or OnScorchAreaNotClearTimeOut"
+ Mannequin animation sequence sends a "ScorcherDeployed" signal
+ An internal timeout elapses

The node does not support any parameters\. The node SUCCEEDS or FAILS depending on whether the child node succeeds or fails\. The node is allowed to SUCCEED prematurely\.

### RunWhileDeployed<a name="ai-scripting-mbt-nodes-game-scorcherdeploy-runwhiledeployed"></a>

Controls actual aiming and firing during an attack\. Duration and execution of the attack is controlled via this node\.

The node does not support any parameters\. The node SUCCEEDS or FAILS depending on whether the child node succeeds or fails\. The node is allowed to SUCCEED prematurely\. If the node SUCCEEDS, this triggers the parent node to start the undeployment sequence\.

### Parameters<a name="ai-scripting-mbt-nodes-game-scorcherdeploy-parameters"></a>

**maxDeployDuration**  
Length of time \(in seconds\) to allow the "RunWhileDeploying" child node to run\. Default is 2\.0\.

### Success/Failure<a name="ai-scripting-mbt-nodes-game-scorcherdeploy-success"></a>

The node SUCCEEDS if the entire deploy and undeploy sequence is completed\. The node FAILS if either the `RunWhileDeploying` or `RunWhileDeployed` nodes FAILED\.

### Example<a name="ai-scripting-mbt-nodes-game-scorcherdeploy-example"></a>

```
<ScorcherDeploy maxDeployDuration="1.0">
    <RunWhileDeploying>
        <SomeChildNode>
    </RunWhileDeploying>
    <RunWhileDeployed>
        <SomeOtherChildNode>
    </RunWhileDeployed>
</ScorcherDeploy>
```

## SuppressHitReactions<a name="ai-scripting-mbt-nodes-game-suppresshitreactions"></a>

Enables or disables the Hit Reaction system for the AI agent\.

### Parameters<a name="ai-scripting-mbt-nodes-game-suppresshitreactions-parameters"></a>

None\.

### Success/Failure<a name="ai-scripting-mbt-nodes-game-suppresshitreactions-success"></a>

The node SUCCEEDS or FAILS based on success of failure of its child node\.

### Example<a name="ai-scripting-mbt-nodes-game-suppresshitreactions-example"></a>

```
<SuppressHitReactions>
    <SomeChildNode />
</SuppressHitReactions>
```