---
linkTitle: 2D Navigation
title: 2D Navigation with Kythera AI
description: Tutorial for 2D navigation with the Kythera AI Gem in Open 3D Engine (O3DE)
weight: 100
toc: true
---

This tutorial shows you how to use the [Kythera AI Gem](/docs/user-guide/gems/reference/kythera-ai/) to create an area of level that can be navigated by Kythera AI agents, and a simple AI agent that follows a visually scripted behavior tree.

You will need to begin from either your own project with the Kythera AI Gem enabled, or the Kythera AI Demo project. See [Kythera AI Gem setup](/docs/user-guide/gems/reference/kythera-ai/kythera-ai-gem-setup/) for information on setting up the Kythera AI Demo project.

## Configuration files

For this example to work, you first need to create two XML configuration files, a *Profile* for the agent's behavior, and a *NavMesh* that defines the parameters for the navigation area.

### Profile

The behavior of an AI agent is defined in its profile. One of the most important settings in a profile is the agent's default *behavior tree*, which is a visually scripted 'program' for the agent to run.

Profiles are defined in XML in the `Profiles.xml` in the `Scripts` directory of your project. Open (or create) this file and add a new profile, `WanderProfile`:

```xml
<Profiles>
    <WanderProfile type="bb">
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

### Navigation mesh

2D agents operate on a *navigation mesh* (navmesh) which is a network of 2D tiles that define the navigable areas of the level. Kythera AI generates these navmeshes automatically according to parameters defined in the `NavMesh.xml`. Kythera AI allows for multiple types of navmeshes that can be used by different types of agents. For example, a navmesh type for large creatures prevents them from navigating small spaces.

Navmeshes can be global, meaning they are available in all levels in the project, or level-specific. The global `NavMesh.xml` is placed in the project's `Scripts` directory. For level-specific navmeshes, a `NavMesh.xml` can be placed in the level's subdirectory.

```xml
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

## Create a level and reference the behavior tree

1. Create a new empty level.

1. Remove the **ShaderBall** entity.

1. Select the **Grid** entity, and add a new **PhysX Primitive Collider** component to it. All entities that will be included in the NavMesh need a PhysX collider.

    1. On the collider, set the shape property to `Box`.

    1. On the collider, set the X and Y scale to `32`, so the box encompasses the grid.

    1. If you activate Debug Helpers (the ![debug helper icon](/images/learning-guide/tutorials/ai/debug-helpers.png) symbol in the top right corner of the viewport) and the **Draw Collider** option is active on the PhysX Primitive collider component, you should see the collider debug visualization:
    
        ![PhysX collider debug draw](/images/learning-guide/tutorials/ai/collider.png)

1. Create a new entity called `NavBounds`. This will define the area of the level in which navmesh is generated.

    1. Add a Kythera **NavMesh Bounds** component in the entity inspector.

    1. Add a **Polygon Prism Shape** component and choose the **Edit** button to enter edit mode for the prism.

    1. Increase the size of the prism using the four red circles so that it encompasses most of the grid.
    
    1. Increase the height of the prism with the blue arrow in the center.

        ![Navmesh boundaries](/images/learning-guide/tutorials/ai/navmesh-boundaries-edit.png)
    
    1. Choose **Done** to exit edit mode.

1. The Kythera AI toolbar has some functions required for the rest of the tutorial. Right click the O3DE toolbar and select the Kythera AI toolbar to add it if the Kythera AI Toolbar is not visible.
    
    ![Kythera AI toolbar](/images/learning-guide/tutorials/ai/kythera-toolbar.png)

1. Activate `Basic Debug Draw` in the drop-down of the Kythera Toolbar. This is the first drop-down in the toolbar, showing  `NavMesh Dbg off` by default.

1. Choose the **Generate navmesh** button (![Generate navmesh icon](/images/user-guide/gems/kythera-ai/toolbar-generate-navmesh.png)) in the Kythera AI Toolbar.

1. Create a new entity called `Agent`. This will be the AI character.

    1. Add a **Mesh** component and select any available mesh. You can use `Lucy_low` from the AtomLyIntegration Gem.

    1. Add a **Kythera** component to the entity. This component registers the entity with Kythera.

    1. Add a Kythera **Agent** component to the entity.
    
    1. In the Agent component, set the **Profile** property to `WanderProfile`, as defined in `Profiles.xml`.

    1. Add a **SimpleMovementController** component. This component translates movement requests from Kythera AI into movement of the Agent entity by implementing the `MovementRequestBus`. For more information, refer to [Character movement APIs](/docs/user-guide/gems/reference/kythera-ai/character-movement-apis).
    
{{< note >}}
Animation is not yet supported.
{{< /note >}}

## Create a behavior tree with the Inspector

[The Inspector](/docs/user-guide/gems/reference/kythera-ai/introduction-to-the-inspector/) is Kythera AI's browser based debugger and behavior tree authoring tool. The Inspector webserver is started on the local machine when the Kythera Gem is initialized. While Kythera AI is running, the Inspector is available at [http://localhost:8081/](http://localhost:8081/).

We will define a very basic behavior tree that randomly generates a position on the NavMesh and then moves to that position. After arriving, it will generate another position and move there to, in an endless loop.

1. Open the Inspector

1. Choose the **BT Editor** tab.

1.  Create a new behavior tree called `WanderBehavior` (as referenced in the `DefaultBehavior` node in `Profiles.xml`).

1. Add a **Repeater** node. This node executes the child nodes the number of times specified by the **iterations** property. By default, iterations is set to `0`, which means endless iteration. Leave the default value of `0`.

1. Add a **Sequence** node as a child node of the Repeater node. This node executes all child nodes attached to it one after another. However, if one fails, the execution will stop.

1. Add a **Character_RandomPointInRange** node as a child of the Sequence node. This node finds a random point on the navmesh.

    1. Set **Range** to `100`.

    1. Set the **Point** output to `NextPoint`. This is the name of the variable that contains the found point.

1. Add a `Character_Goto` node. This node moves a character to a specific position. This node is fully integrated into the Kythera navigation system, so it will use the navmesh to pathfind a way to the target.

    1. Set **Destination** to `NextPoint`.

    1. Set **Speed** to `5`.

The finished behavior tree should look like the following image:

![Behavior tree example](/images/learning-guide/tutorials/ai/behavior-tree.png)
        
Back in the editor, activate Simulate (Ctrl+P) and see the agent move!

You can also activate the debug draw of the paths the agent is walking along the navpaths button on the Kythera AI toolbar (![navpaths button icon](/images/learning-guide/tutorials/ai/toolbar-navpaths.png)).

Below is the finished example, with the NavMesh debug draw setting changed from `Basic` to `Color Tiles` and with Nav Path debug draw activated:

![2D Navigation tutorial finished](/images/learning-guide/tutorials/ai/finished.png)

## Troubleshooting

If something is not working, you can check the Kythera AI log file at `<project directory>/user/log/Kythera.log` for more information.
