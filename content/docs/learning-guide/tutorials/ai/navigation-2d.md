---
linkTitle: 2D Navigation
title: 2D Navigation
description: Tutorial for 2D navigation with the Kythera AI Gem
weight: 100
---

This tutorial shows you how to use the [Kythera AI Gem](/docs/user-guide/gems/reference/kythera-ai/) to create an area of level that is navigable to Kythera AI agents (e.g. characters or vehicles), and a simple AI agent that follows a visually scripted behavior tree.

You will need to begin from either your own project with the Kythera AI Gem enabled, or the Kythera AI ShooterDemo project (see [Kythera AI Gem Setup](/docs/user-guide/gems/reference/kythera-ai/).

### Configuration files

For this example to work, you first need to create two XML configuration files first:

#### Profile

The behavior of an AI agent is defined in its **Profile**. One of the most important settings in a profile is the agent's default **behavior tree** - a visually scripted 'program' for the agent to run.

Profiles are defined in XML in the `Profiles.xml` in the `Scripts` directory of your project. Open (or create) this file and add a new profile, `WanderProfile`:

```
<Profiles id="1">
    <WanderProfile  id="2" type="bb">
        <CharacterFeatures type="bb">
            <GroundNav type="bool">true</GroundNav>
            <GroundAvoidance type="bool">true</GroundAvoidance>
            <Movement type="bool">true</Movement>
            <Behavior type="bool">true</Behavior>
        </CharacterFeatures>
        <DefaultBehavior type="string">WanderBehavior</DefaultBehavior>
    </WanderProfile>
</Profiles>
```

If you change `Profiles.xml` while the editor or game is running, you can reload the file with the console command `kyt_LoadProfiles`.

#### Navigation mesh

2D agents operate on a **navigation mesh** (navmesh), a network of 2D tiles that define the navigable areas of the level. Kythera AI generates these navmeshes automatically according to parameters defined by the author. Kythera AI allows for multiple types of navmesh that can be used by different types of agents - so that, for example, large creatures cannot fit through small spaces. Navmeshes can be global, meaning they are available in all levels in the project, or level-specific.

Navmesh parameters are defined in files called `NavMesh.xml`. For global navmeshes this file lives in the `Scripts` directory; for level-specific navmeshes, there can be a `NavMesh.xml` in any level's subdirectory.

```
<NavMeshParams>
    <DefaultNavMeshName type="string">Default</DefaultNavMeshName>
    <DefaultNavMeshType type="string">MediumSizedCharacters</DefaultNavMeshType>
    <NavMeshNames type="bb">
        <Default type="bba">
            <Entry0 type="string">MediumSizedCharacters</Entry0>
        </Default>
    </NavMeshNames>
    <NavMeshTypes type="bb">
        <MediumSizedCharacters type="bb">
            <AgentHeight type="float">1.720000</AgentHeight>
            <AgentMaxClimb type="float">0.700000</AgentMaxClimb>
            <AgentMaxSlope type="float">45.000000</AgentMaxSlope>
            <AgentRadius type="float">0.600000</AgentRadius>
            <CellHeight type="float">0.050000</CellHeight>
            <CellSize type="float">0.100000</CellSize>
        </MediumSizedCharacters>
    </NavMeshTypes>
</NavMeshParams>
```

Create a level and reference the behavior tree
----------------------------------------------

*   Create a new empty level
    
*   Remove the **ShaderBall** entity
    
*   Select the **Grid** entity, and add a new **PhysX Collider** component to it. This will be an obstacle for your agent to navigate around. All entities that will be included in the NavMesh need some kind of PhysX collider.
    
    *   On the collider, set the shape property to `Box`
        
    *   On the collider, set the X and Y scale to 32, so the box encompasses the whole grid
        
    *   If you activate Debug Helpers (from the "?" symbol in the top right corner of the viewport) and the **Draw Collider** option is active on the PhysX collider component, you should see the collider's debug draw.
        
*   Create a new entity called (for example) `NavBounds`. This will define the area of the level in which navmesh is generated.
    
    *   Add a Kythera `NavMesh Bounds` component in the entity inspector
        
    *   Add a `Polygon Prism Shape` component and press the `Edit` button
        
    *   Increase the size of the prism using the 4 red circles, so that it encompasses most of the grid. Also increase the height with the blue arrow in the center a bit.
        
*   Activate Basic Debug Draw in the drop-down of the Kythera Toolbar. 
    
*   Click the "Generate navmesh" button (![](/images/user-guide/gems/kythera-ai/toolbar-generate-navmesh.png)) in the Kythera toolbar.
    
*   Create a new entity called (for example) `Agent`. This will be the AI character itself.
    
    *   Add a `Mesh` component and select a Mesh, e.g. Lucy\_low from the AtomLyIntegration Gem.
        
    *   Add a `Kythera` component to the entity. This component registers the entity with Kythera.
        
    *   Add a Kythera `Agent` component to the entity, and set the `Profile` property to `WanderProfile`, which as been defined in `Profiles.xml` above.
        
    *   Add a `SimpleMovementController` component. This component translates movement requests from Kythera AI into actual movement of the Entity by implementing the `MovementRequestBus` (see [Character movement APIs](http://localhost:44541/docs/user-guide/gems/reference/kythera-ai/kyt/character-movement-apis/). It does not support Animations yet.
        

Create a behavior tree with the Inspector
-----------------------------------------

[The Inspector](/docs/user-guide/gems/reference/kythera-ai/kyt/introduction-to-the-inspector/) is Kythera AI's web-based debugger and behavior tree authoring tool. While Kythera AI is running, the Inspector will be available at [http://localhost:8081/](http://localhost:8081/) (by default). We will define a very basic behavior tree that randomly generates a position on the NavMesh and then moves to that position. After arriving, it will generate another position and move there to, in an endless loop.

*   Open the Inspector Go to the BT Editor tab in the inspector
    
*   Create a new behavior tree called `WanderBehavior` (as referenced in the `DefaultBehavior` node in `Profiles.xml`).
    
*   Add a `Repeater` node. This node executes the child nodes `iteration`s times. By default, `iterations` is set to `0` which means endless iteration, which is what we want here.
    
*   Add a `Sequence` node as a child node of the `Repeater` node. This node executes all child nodes attached to it one after another, except if one fails, the execution will stop.
    
*   Add a `Character_RandomPointInRange` node as a child of the `Sequence` node
    
    *   This node finds a random point on the NavMesh
        
    *   Set `Range` to 100
        
    *   Set the `Point` output to `NextPoint`
        
        *   This is the name of the variable where the found point will be saved to
            
*   Add a `Character_Goto` node
    
    *   This node moves a character to a specific position
        
    *   This node is fully integrated into the Kythera navigation system, so it will use the NavMesh to pathfind a way to the target
        
    *   Set `Destination` to `NextPoint`
        
    *   Set `Speed` to 5
        
*   Back in the editor, activate Simulate (Ctrl+P) and see the agent move!
    

Troubleshooting
---------------

If something is not working, you can check the Kythera AI logfile at `<project directory>/user/log/Kythera.log` for more information.
