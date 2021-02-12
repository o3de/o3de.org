---
description: ' See the modular behavior tree (MBT) node types for Amazon Lumberyard. '
title: Modular Behavior Tree Node Reference
---
# Modular Behavior Tree Node Reference {#ai-scripting-mbt-nodes}

This section contains reference information on modular behavior tree \(MBT\) node types\. MBT node types are organized here based on the system they are defined into\.

It is possible to expose MBT nodes from anywhere in Lumberyard code\. A node can have parameters that configure the behavior of its execution\. If an invalid value is passed to the node, causing the node's parsing to fail, an error message is written to either `Editor.log` or `Game.log`\.

## Node Index {#ai-scripting-mbt-nodes-index}

### [Generic Nodes](/docs/userguide/ai/scripting/mbt-nodes-generic.md) {#ai-scripting-mbt-nodes-index-generic}
+ [Loop](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-loop)
+ [LoopUntilSuccess](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-loopuntilsuccess)
+ [Parallel](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-parallel)
+ [Selector](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-selector)
+ [Sequence](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-sequence)
+ [StateMachine](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-statemachine)
+ [State & Transitions](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-state)
+ [SuppressFailure](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-suppressfailure)
+ [Timeout](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-timeout)
+ [Wait](/docs/userguide/ai/scripting/mbt-nodes-generic#ai-scripting-mbt-nodes-generic-wait)

### [AI Nodes](/docs/userguide/ai/scripting/mbt-nodes-ai.md) {#ai-scripting-mbt-nodes-index-ai}
+ [AdjustCoverStance](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-adjustcoverstance)
+ [Aim ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-aim)
+ [AimAroundWhileUsingAMachingGun ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-aimaroundwhileusingamachinggun)
+ [Animate](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-animate)
+ [AnimationTagWrapper ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-animationtagwrapper)
+ [AssertCondition ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-assertcondition)
+ [AssertLua ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-assertlua)
+ [AssertTime ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-asserttime)
+ [Bubble](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-bubble)
+ [CheckIfTargetCanBeReached ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-checkiftargetcanbereached)
+ [ClearTargets ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-cleartargets)
+ [Communicate ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-communicate)
+ [ExecuteLua ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-executelua)
+ [GroupScope ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-groupscope)
+ [IfCondition ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-ifcondition)
+ [IfTime](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-iftime)
+ [Log](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-log)
+ [Look ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-look)
+ [LuaGate](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-luagate)
+ [LuaWrapper ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-luawrapper)
+ [MonitorCondition](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-monitorcondition)
+ [Move ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-move)
+ [Priority & Case](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-priority)
+ [PullDownThreatLevel ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-pulldownthreatlevel)
+ [QueryTPS ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-querytps)
+ [RandomGate](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-randomgate)
+ [SendTransitionSignal](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-sendtransitionsignal)
+ [SetAlertness](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-setalertness)
+ [Shoot ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-shoot)
+ [ShootFromCover ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-shootfromcover)
+ [Signal](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-signal)
+ [SmartObjectStatesWrapper ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-smartobjectstateswrapper)
+ [Stance ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-stance)
+ [StopMovement ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-stopmovement)
+ [Teleport ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-teleport)
+ [ThrowGrenade ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-throwgrenade)
+ [WaitUntilTime ](/docs/userguide/ai/scripting/mbt-nodes-ai#ai-scripting-mbt-nodes-ai-waituntiltime)

### [CryAction Nodes](/docs/userguide/ai/scripting/mbt-nodes-cryaction.md) {#ai-scripting-mbt-nodes-index-cryaction}
+ [AnimateFragment](/docs/userguide/ai/scripting/mbt-nodes-cryaction#ai-scripting-mbt-nodes-cryaction-animatefragment)

### [Game Nodes](/docs/userguide/ai/scripting/mbt-nodes-game.md) {#ai-scripting-mbt-nodes-index-game}
+ [InflateAgentCollisionRadiusUsingPhysicsTrick](/docs/userguide/ai/scripting/mbt-nodes-game#ai-scripting-mbt-nodes-game-inflateagentcollisionradiususingphysicstrick)
+ [KeepTargetAtADistance](/docs/userguide/ai/scripting/mbt-nodes-game#ai-scripting-mbt-nodes-game-keeptargetatadistance)
+ [Melee](/docs/userguide/ai/scripting/mbt-nodes-game#ai-scripting-mbt-nodes-game-melee)
+ [ScorcherDeploy](/docs/userguide/ai/scripting/mbt-nodes-game#ai-scripting-mbt-nodes-game-scorcherdeploy)
+ [SuppressHitReactions](/docs/userguide/ai/scripting/mbt-nodes-game#ai-scripting-mbt-nodes-game-suppresshitreactions)

### [Flying Nodes](/docs/userguide/ai/scripting/mbt-nodes-flying.md) {#ai-scripting-mbt-nodes-index-flying}
+ [ Hover](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-hover)
+ [FlyShoot](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-flyshoot)
+ [WaitAlignedWithAttentionTarget](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-waitalignedwithattentiontarget)
+ [Fly](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-fly)
+ [FlyForceAttentionTarget](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-flyforceattentiontarget)
+ [FlyAimAtCombatTarget](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-flyaimatcombattarget)
+ [HeavyShootMortar](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-heavyshootmortar)
+ [SquadScope](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-squadscope)
+ [SendSquadEvent](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-sendsquadevent)
+ [IfSquadCount](/docs/userguide/ai/scripting/mbt-nodes-flying#ai-scripting-mbt-nodes-flying-ifsquadcount)