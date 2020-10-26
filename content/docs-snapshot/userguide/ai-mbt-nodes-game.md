# Game AI Modular Behavior Tree \(MBT\) Nodes<a name="ai-mbt-nodes-game"></a>

Game AI Modular Behavior Tree nodes are mostly used to offer specific game functionality\. Each type of game may have multiple character types and each type may need to trigger specific logic to perform action in the game\. Game\-specific nodes are generally not suitable for general use and may need to be tweaked to fit the needs of your game\.

## Melee node<a name="ai-mbt-nodes-game-melee"></a>

The Melee node will trigger a melee attack against an agent target\. The Melee node succeeds irregardless of whether the melee attack is performed and damages the target or not\.

A melee attack is performed when the following conditions are satisfied:
+ If the **failIfTargetNotInNavigationMesh** paramter is set, the target must be on a valid walkable position\. Certain melee animations could move the character pushing it outside the navigable area while trying to melee a target outside the navigation mesh \(MNM\)\.
+ If the target is not between the threshold angle specified by the entity lua value `melee.angleThreshold`\.

**Parameters**
+ **target**: The target of the melee\. This parameter could be set as `AttentionTarget` or a generic `RefPoint`\.
+ **cylinderRadius**: The radius of the cylinder used for the collision check of the hit\.
+ **hitType**: The type of hit that is sent to the game rules\. Default is `CGameRules::EHitType::Melee`\.
+ **failIfTargetNotInNavigationMesh**: Determines whether the node should not try to melee a target that is outside the navigation mesh\. This will only cause the melee attack to not be performed \- the Melee node will still succeed\. 
+ **materialEffect**: The material effect used when the melee attack hits the target\.

**Behavior**
+ **Success**: Occurs irregardless of the actual execution of the melee attack\. 

**Example**

```
<Melee target="AttentionTarget" cylinderRadius="1.5"
hitType="hitTypeName" materialEffect="materialEffectName" />
```

The following is an example lua file that defines the specific character in use:

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

The following table lists the various parameters one can use in the lua file:

**Parameters**
+ **damage**: Defines the amount of damage the melee attack inflicts on the target\.
+ **hitRange**: Defines the height of the cylinder used to check if the melee attack can hit the target\.
+ **knockdownChance**: Defines the probability that a successful melee attack knocks down the player\.
+ **impulse**: Defines the amount of the impulse that is applied to the player in case of a successful melee attack\.
+ **angleThreshold**: Threshold between the agent direction and the direction between the agent and the target to allow a melee attack to be attempted\.

## KeepTargetAtADistance node<a name="ai-mbt-nodes-game-keeptargetatadistance"></a>

This node keeps the live target at a distance by physically pushing the target away if it is within the defined minimum distance\.

This is useful when there's an action close to the player and you want to avoid clipping through the camera\. This is preferable to increasing the capsule size since that will affect how the character can fit through tight passages\. This node is mostly used in parallel with other actions that need to be performed while the player is not too close to the agent\.

**Parameters**
+ **distance**: The minimum distance allowed between the player and the agent\.
+ **impulsePower**: The power of the impulse used to keep the player at least at the minimum distance\.

**Behavior**

The node never succeeds or fails\. Once executed, it is always running until out of the scope of the executed nodes\.

**Example**

```
<KeepTargetAtADistance distance="1.8" impulsePower="1.5" />
```

## SuppressHitReactions node<a name="ai-mbt-nodes-game-suppresshitreactions"></a>

This node enables and disables the hit reaction system for the agent during its execution\.

**Parameters**

None\.

**Behavior**
+ **Success**: If the child succeeds
+ **Failure**: If the child fails\.

**Example**

```
<SuppressHitReactions>
 <SomeChildNode />
</SuppressHitReactions>
```

## InflateAgentCollisionRadiusUsingPhysicTricksTrick node<a name="ai-mbt-nodes-game-inflateagentcollisionradiususingphysicstrick"></a>

This node uses a feature of the physics system to inflate the capsule of the agent such that it has one radius for collisions with the player, and a different radius for collisions with the world\.

**Parameters**
+ **radiusForAgentVsPlayer**: The radius use to calculate the collision between the agent and the player\.
+ **radiusForAgentVsWorld**: The radius used to calculate the collision between the agent and the world\. 

**Behavior**

The node never succeeds or fails but always runs\.

**Example**

```
<InflateAgentCollisionRadiusUsingPhysicsTrick radiusForAgentVsPlayer="1.0" radiusForAgentVsWorld="0.5" />
```

## ScorcherDeploy:RunWhileDeploying node<a name="ai-mbt-nodes-game-scorcherdeploying"></a>

This node and the following one are special decorator nodes that the Scorcher uses to deploy and undeploy as part of the shooting phase\. These two nodes rely on external Lua scripts and various signals to work properly\. In this way you don't have to explicitly expose more functionality from the AI system libraries\. 

This node must contain exactly one child node that runs while the Scorcher is in the processes of deployment getting ready for an attack\. It can be used, for example, to control aiming before actually shooting\.

**Parameters**

None\.

**Behavior**
+ **Success**: If the child node succeeds\.
+ **Failure**: If the child node fails\.

**Example**

## ScorcherDeploy:RunWhileDeployed node<a name="ai-mbt-nodes-game-scorcherdeployed"></a>

This node must contain exactly one child node that controls the actual aiming and firing\.

**Parameters**

None\.

**Behavior**
+ **Success**: If the child node succeeds\. This will make the parent node start the undeployment sequence\.
+ **Failure**: If the child node fails\. 

**Example**

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

## HeavyShootMortar node<a name="ai-mbt-nodes-game-heavyshootmortar"></a>

Used to control the shooting of heavy mortar\. It tries to simplify and to centralize the check of the pre\-condition and the initialization of the weapon plus the re\-selection of the primary weapon\.

**Parameters**
+ **to**: \(Optional\) Defines the target of the shooting\. Possible values: Target or RefPoint\. Default is Target\. 
+ **firemode**: \(Optional\) The Heavy X\-Pak \(or Mortar\) has two different firemodes\. Possible values: Charge or BurstMortar\. Default is Charge\. 
+ **timeout**: \(Optional\) Defines the maximum time the node can try to perform the shooting\. Default value is 5\.0 seconds\.
+ **aimingTimeBeforeShooting**: \(Optional\) Defines the time in which the Heavy will aim before starting the shooting\. Default is 1\.0 seconds\. This amount of time must be larger than the global timeout\.
+ **minAllowedDistanceFromTarget**: \(Optional\) Defines the minimum distance from the Target to allow shooting\. Default is 10\.0 m\.

**Behavior**
+ **Success**: The node succeeds when the shooting succeeds\.
+ **Failure**: The node fails if the timeout is reached, if the Heavy is closer to the target than the **minAllowedDistanceFromTarget** value, or if there obstructions two meters in front of the Heavy \(a cylinder check is performed to avoid this condition in front of the mortar if there is an object the Heavy tries to shoot at\.\)

**Example**

```
<HeavyShootMortar to="RefPoint" fireMode="Charge" aimingTimeBeforeShooting="2" timeout="7" />
```

## SquadScope node<a name="ai-mbt-nodes-game-squadscope"></a>

Used to enter a squad scope, which is limited by the specified amount of concurrent users\. If the node succeeds to do that, then the child node is executed\.

**Parameters**
+ **name**: The name of the squad scope to enter\. 
+ **allowedConcurrentUsers**: \(Optional\) Number of allowed concurrent users in the specified scope\. Default value = 1\.

**Behavior**
+ **Success**: The node succeeds when the child succeeds\.
+ **Failure**: The node fails if it can't enter the specified scope or if the child fails\.

**Example**

```
<SquadScope name="ANameForTheScope" allowedConcurrentUsers="5">
 <SomeChildNode />
</SquadScope>
```

## SendSquadEvent node<a name="ai-mbt-nodes-game-sendsquadevent"></a>

Used to send an event only to the squad members\.

**Parameters**
+ **name**: Name of the event to be sent\. 

**Behavior**

The node succeeds after having sent the event\. The node never fails\.

**Example**

```
<SendSquadEvent name="ANameForTheEvent" />
```

## IfSquadCount node<a name="ai-mbt-nodes-game-ifsquadcount"></a>

This node checks if a squad contains a specific amount of members and if so executes its child\.

**Parameters**

One of the following parameters must be specified\.
+ **isGreaterThan**: \(Optional\) To succeed, checks if the number of members is greater than the specified number\. 
+ **isLesserThan**: \(Optional\) To succeed, checks if the number of members is lesser than the specified number\. 
+ **equals**: \(Optional\) To succeed, checks if the number of members is equal to the specified number\. 

**Behavior**
+ **Success**: If the number of members satisfies the specified condition\.
+ **Failure**: If otherwise\.

**Example**

```
<IfSquadCount isGreaterThan="1">
 <SomeChildNode />
</IfSquadCount>
```