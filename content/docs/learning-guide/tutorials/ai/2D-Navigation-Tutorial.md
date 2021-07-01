Prerequisites: Your own project with Kythera Gem enabled or the Kythera ShooterDemo project, as documented here: [Kythera AI Gem Setup](https://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/1747648543/Kythera+AI+Gem+Setup)

Configuration files
-------------------

For this example to work, we need to create two XML configuration files first:

### Profile

A Kythera Profile defines how an AI agent behaves. One of the most important settings in a profile is the default behavior tree that the agent will be running.

Profiles are defined in `Profiles.xml` in the `Scripts` directory of the game project. Open or create the files and add a new profile:

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

If you change `Profiles.xml` while the editor or game is already running, you can reload the file with the console command `kyt_LoadProfiles`.

### NavMesh

`NavMesh.xml` defines the different types of NavMeshes that can be used by Agents. `NavMesh.xml` can exist in the global `Scripts` directory to define NavMeshes that can be used in all levels, or a level specific NavMesh.xml in a level subdirectory.

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

Create level and reference behavior tree
----------------------------------------

*   Create a new empty level
    
*   Remove the ShaderBall entity
    
*   Select the Grid entity, and add a new PhysX Collider component to it. All entities that should be included in the NavMesh need some kind of PhysX collider.
    
    *   On the collider, set the shape property to `Box`
        
    *   On the collider, set the X and Y scale to 32, so the box encompasses the whole grid
        
    *   If you activate Debug Helpers (? symbol in the top right corner of the viewport) and the “Draw Collider” option is active on the PhysX collider component, you should see the collider debug draw.
        
*   Create a new entity called NavBounds (name does not matter)
    
    *   Add a Kythera `NavMesh Bounds` component in the entity inspector
        
    *   Add a `Polygon Prism Shape` component and press the `Edit` button
        
    *   Increase the size of the prism with the 4 red circles, so it encompasses most of the grid. Also increase the height with the blue arrow in the center a bit.
        
*   Activate Basic Debug Draw in the drop-down of the Kythera Toolbar (insert screenshot)
    
*   Click `Regenerate Navmesh` in the Kythera toolbar (insert screenshot)
    
*   Create a new entity called `Agent` (again, name does not matter)
    
    *   Add a `Mesh` component and select a Mesh, e.g. Lucy\_low from the AtomLyIntegration Gem.
        
    *   Add a `Kythera` component to the entity. This component registers the entity with Kythera.
        
    *   Add a Kythera `Agent` component to the entity, and set the `Profile` property to `WanderProfile`, which as been defined in `Profiles.xml` above.
        
    *   Add a `SimpleMovementController` component. This component translates movement requests from Kythera into actual movement of the Entity by implementing the `MovementRequestBus`. It does not support Animations yet.
        

Create behavior tree with the inspector
---------------------------------------

The main UI interface for Kythera is called the Inspector. It is a web application that is launched together with the Kythera Gem and is accessible on [http://localhost:8081/](http://localhost:8081/) by default. The inspector allows introspection into the current state of Kythera, configuring many debug settings including debug draw and also contains the editor for Kythera Behavior trees. We will define a very basic behavior tree that randomly generates a position on the NavMesh and then moves to that position. After arriving, it will generate another position and move there to, in an endless loop.

*   Go to the BT Editor tab in the inspector
    
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

If something is not working, you can check the Kythera Logfile in `<project directory>/user/log/Kythera.log`for more information on what is going on.