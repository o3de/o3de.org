---
description: ' See the following AI system overview in &ALYlong;. '
title: AI System Overview
---
# AI System Overview<a name="ai-concepts-overview"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

This section outlines basic concepts related to the AI system\.

## Navigation<a name="ai-concepts-navigation"></a>
+ Default navigation system
  + Triangulation 
    + 2D terrain\-based navigation
    + Uses cylindrical objects \(such as trees\) and forbidden areas
  + Navigation modifiers 
    + Human waypoints – Need to be place manually but connections can be generated automatically
    + Flight – Information about navigable volumes for flying entities
    + Volume – General volume navigation, such as for oceans
+ Multi\-layer navigation system
+ Smart object system: allows AI agents to move in special ways
+ AI territories & waves
  + AI waves can be attached to AI territories and allow independent AI activations
  + AI waves automatically handle entity pool issues for assigned AI agents, such as loading/unloading 

In general, a search is time\-sliced to use 0\.5 ms per AI frame \(configured using the console variable `ai_PathfinderUpdateTime`\)\. Options for pathfinding techniques include high priority, straight, and partial\. Updates for human waypoints are heavy but time\-sliced\. The navigation graph is optimized but needs memory\. Navigation data is generated offline in Editor\. With multi\-layer navigation, the navigation mesh is regenerated when the designer modifies the map\.

## Decision Making<a name="ai-concepts-decision"></a>
+ Behavior selection system – Uses behavior trees to select AI behaviors
+ Cover system – Provides AI agents with static and dynamic covers
+ Smart object system – Allows AI agents to interact with their environment
+ Interest system – Allows AI agents to perform intelligent actions when not alerted

## Tactical<a name="ai-concepts-tactical"></a>
+ Tactical point system \(TPS\) – Allows AI agents to ask intelligent questions about their environment \(such as where to hide or where to attack\)
+ Faction system – Determines levels of hostility between AI agents
+ Group coordination system – Uses coordination selection trees to select group behaviors
+ Formation system – Allows AI agents to move in formations
+ Cluster detector – detects clusters of points in space and subdivides them into separate groupings that satisfy specific properties \(using a modified K\-mean algorithm\); used with AISquadManager to group different AI agents into dynamic squads

## World\-Interfacing<a name="ai-concepts-interfacing"></a>
+ Signals – To trigger events and/or change behaviors
+ Perception system 
  + Perception handler \(legacy, usually per game\)
  + Target track system – Uses configurable ADSR envelopes to represent incoming stimuli
+ Communication system – Allows AI agents to play sound/voice/animation events

## Development Environment<a name="ai-concepts-environment"></a>

The design and development environment includes the following components:
+ Game object model – Entity, movement controller, extensions
+ Actor & vehicle system – Health, camera, IK, weapons, animation, etc\.
+ Editor 
  + AI entities – Properties, scripts
  + Entity archetypes – Templates for properties of individual AI agents
  + AI shapes – AI territories, AI paths, forbidden areas
  + Navigation – Navigation modifiers used instead of triangulation
  + Cover surfaces – CoverSurface anchors to indicate where cover should be
+ Scripting with Lua 
  + Entity definitions
  + AI behavior definitions
  + Group behavior definitions
  + Library or shared Lua code \(game rules, basic entities\)
  + Blackboards to share information globally or among groups
  + Examples of AI functionality available in Lua:
    + AI\.Signal
    + AI\.FindObjectOfType
    + AI\.GetAttentionTargetType \(Visual, Memory, Sound, None\)
    + AI\.GetAttentionTargetAIType \(Actor, Grenade, Car, etc\.\)
    + AI\.GetRefPointPosition
    + AI\.DistanceToGenericShape
    + AI\.SetBehaviorVariable \(to change behavior\)
    + AI\.CanMelee
    + AI\.RecComment \(make comment for Visual AI Debugger
+ Scripting with XML 
  + Behavior/coordination trees
  + AI communications
  + Items \(e\.g\., weapons\)
+ Entity system 
  + Spatial queries – GetPhysicalEntitiesInBox\(\)
  + AI agents and vehicles are entities in the Entity system
  + To spawn an entity, its Entity class is required – Can be defined either using the `.ent` file in `Game\Entities` OR through a C\+\+ call to RegisterFactory\(\) in game code
  + An entity pool can be used to limit the number of active AI agents per each specified Entity class\.

## Execution Context<a name="ai-concepts-execution"></a>
+ AI update is called every frame, but are fully updated only at \~10Hz
+ Some AI subsystems use independent time\-slicing \(pathfinding, tactical point, dynamic waypoints updating, smart object, interest, and dead bodies removal\)
+ Some services can be called synchronously from game code \(such as tactical point system \(TPS\) queries\)