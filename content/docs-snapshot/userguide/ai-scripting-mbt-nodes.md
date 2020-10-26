# Modular Behavior Tree Node Reference<a name="ai-scripting-mbt-nodes"></a>

This section contains reference information on modular behavior tree \(MBT\) node types\. MBT node types are organized here based on the system they are defined into\.

It is possible to expose MBT nodes from anywhere in Lumberyard code\. A node can have parameters that configure the behavior of its execution\. If an invalid value is passed to the node, causing the node's parsing to fail, an error message is written to either `Editor.log` or `Game.log`\.

## Node Index<a name="ai-scripting-mbt-nodes-index"></a>

### [Generic Nodes](ai-scripting-mbt-nodes-generic.md)<a name="ai-scripting-mbt-nodes-index-generic"></a>
+ [Loop](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-loop)
+ [LoopUntilSuccess](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-loopuntilsuccess)
+ [Parallel](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-parallel)
+ [Selector](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-selector)
+ [Sequence](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-sequence)
+ [StateMachine](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-statemachine)
+ [State & Transitions](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-state)
+ [SuppressFailure](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-suppressfailure)
+ [Timeout](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-timeout)
+ [Wait](ai-scripting-mbt-nodes-generic.md#ai-scripting-mbt-nodes-generic-wait)

### [AI Nodes](ai-scripting-mbt-nodes-ai.md)<a name="ai-scripting-mbt-nodes-index-ai"></a>
+ [AdjustCoverStance](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-adjustcoverstance)
+ [Aim ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-aim)
+ [AimAroundWhileUsingAMachingGun ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun)
+ [Animate](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-animate)
+ [AnimationTagWrapper ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-animationtagwrapper)
+ [AssertCondition ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-assertcondition)
+ [AssertLua ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-assertlua)
+ [AssertTime ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-asserttime)
+ [Bubble](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-bubble)
+ [CheckIfTargetCanBeReached ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-checkiftargetcanbereached)
+ [ClearTargets ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-cleartargets)
+ [Communicate ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-communicate)
+ [ExecuteLua ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-executelua)
+ [GroupScope ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-groupscope)
+ [IfCondition ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-ifcondition)
+ [IfTime](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-iftime)
+ [Log](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-log)
+ [Look ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-look)
+ [LuaGate](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-luagate)
+ [LuaWrapper ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-luawrapper)
+ [ MonitorCondition](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-monitorcondition)
+ [ Move ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-move)
+ [Priority & Case](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-priority)
+ [PullDownThreatLevel ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-pulldownthreatlevel)
+ [QueryTPS ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-querytps)
+ [RandomGate](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-randomgate)
+ [SendTransitionSignal](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-sendtransitionsignal)
+ [SetAlertness](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-setalertness)
+ [Shoot ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-shoot)
+ [ShootFromCover ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-shootfromcover)
+ [Signal](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-signal)
+ [SmartObjectStatesWrapper ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-smartobjectstateswrapper)
+ [Stance ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-stance)
+ [StopMovement ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-stopmovement)
+ [Teleport ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-teleport)
+ [ThrowGrenade ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-throwgrenade)
+ [WaitUntilTime ](ai-scripting-mbt-nodes-ai.md#ai-scripting-mbt-nodes-ai-waituntiltime)

### [CryAction Nodes](ai-scripting-mbt-nodes-cryaction.md)<a name="ai-scripting-mbt-nodes-index-cryaction"></a>
+ [AnimateFragment](ai-scripting-mbt-nodes-cryaction.md#ai-scripting-mbt-nodes-cryaction-animatefragment)

### [Game Nodes](ai-scripting-mbt-nodes-game.md)<a name="ai-scripting-mbt-nodes-index-game"></a>
+ [InflateAgentCollisionRadiusUsingPhysicsTrick](ai-scripting-mbt-nodes-game.md#ai-scripting-mbt-nodes-game-inflateagentcollisionradiususingphysicstrick)
+ [KeepTargetAtADistance](ai-scripting-mbt-nodes-game.md#ai-scripting-mbt-nodes-game-keeptargetatadistance)
+ [Melee](ai-scripting-mbt-nodes-game.md#ai-scripting-mbt-nodes-game-melee)
+ [ScorcherDeploy](ai-scripting-mbt-nodes-game.md#ai-scripting-mbt-nodes-game-scorcherdeploy)
+ [SuppressHitReactions](ai-scripting-mbt-nodes-game.md#ai-scripting-mbt-nodes-game-suppresshitreactions)

### [Flying Nodes](ai-scripting-mbt-nodes-flying.md)<a name="ai-scripting-mbt-nodes-index-flying"></a>
+ [ Hover](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-hover)
+ [FlyShoot](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-flyshoot)
+ [WaitAlignedWithAttentionTarget](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-waitalignedwithattentiontarget)
+ [Fly](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-fly)
+ [FlyForceAttentionTarget](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-flyforceattentiontarget)
+ [FlyAimAtCombatTarget](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-flyaimatcombattarget)
+ [HeavyShootMortar](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-heavyshootmortar)
+ [SquadScope](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-squadscope)
+ [SendSquadEvent](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-sendsquadevent)
+ [IfSquadCount](ai-scripting-mbt-nodes-flying.md#ai-scripting-mbt-nodes-flying-ifsquadcount)