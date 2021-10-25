---
linkTitle: Kythera City Level Overview
title: Kythera City Level Overview
description: Overview of the AI demo level "Kythera City"
weight: 100
---

![A ship navigates Kythera City in 3D](/images/learning-guide/tutorials/ai/kythera-city-ship.png)

The `KytheraCity` level demonstrates basic setup examples for several features of the **Kythera AI** Gem in **Open 3D Engine (O3DE)** [Developer Preview]. These features include:

*   [2D navmesh generation](/docs/user-guide/gems/reference/kythera-ai/navmesh-generation) and customizability
*   [3D octree generation](/docs/user-guide/gems/reference/kythera-ai/octree-generation) and customizability
* The [**Kythera AI Inspector**](/docs/user-guide/gems/reference/kythera-ai/introduction-to-the-inspector) tool, which includes:
    * [Behavior tree editing](/docs/user-guide/gems/reference/kythera-ai/behavior-tree-editor)
    * Debug drawing
*   2D pathfinding
*   3D pathfinding
*   [3D splines](/docs/user-guide/gems/reference/kythera-ai/navigation-splines-tool) and orientation

## Kythera actors

When you open the level, note first that the level actors are split into prefabs.
This document provides an overview of the entities and actors within `KytheraActors.prefab`.

![Actors dialog](/images/learning-guide/tutorials/ai/kythera-city-actors.png)

`KytheraActors_City.prefab` is located in the `KytheraAIDemo/Prefabs` folder and must be saved manually. To save it, right-click on the shaded part of the prefab in the Entity Outliner, and then click **Save prefab to file**.

`KytheraActors_City` is split into three parent entities that serve as a container to keep entities organized:

*   Generation
    *   Contains the `Navmesh Bounds` entity
    *   Contains the `3DOctree` entity
*   2D Actors
    *   Contains `Robot.prefab`s for 2D navigation
*   3D Actors
    *   Contains three more parent entities:
        *   3D POIs (points of interest)
        *   3D ships
            * KytSpaceship
            * KytSpaceship_Splines
            * KytDrone_Splines
        *   3D Splines
            *   Contains Kyt_Spline(s)


## 2D navmesh generation and customizability

When you open the level for the first time, you will need to regenerate and save the navmesh before you can simulate the AI.

To regenerate and debug the navmesh:

*   In the Kythera Toolbar, set the navmesh select to `Basic`<br>
    ![Navmesh select](/images/learning-guide/tutorials/ai/kythera-city-navmesh-basic.png)
*   To generate the navmesh, click the **Regenerate Navmesh** icon in the Kythera Toolbar<br>
    ![Generating the navmesh](/images/learning-guide/tutorials/ai/kythera-city-navmesh-generate.png)
*   Then save the navmesh to a file using the **Save** icon in the Kythera Toolbar<br>
	  ![Saving the navmesh](/images/learning-guide/tutorials/ai/kythera-city-navmesh-save.png)

The NavMesh Bounds component comes with a `Polygon Prism Shape` component when you first add it, to help you scale the shape to your level's requirements in edit mode.

![Entity Inspector showing NavMesh Bounds component](/images/learning-guide/tutorials/ai/kythera-city-navmesh-bounds-dialog.png)

* Click and drag the red points to move them
* Ctrl+Click on the line to add new points
_(Ctrl+Click on the red points after previously selecting another point to select multiple points at once)._

The navmesh name we're using in this level is `Default`, and the properties and parameters of the navmesh can be found and modified in `KytheraAIDemo/Scripts/navmesh.xml`.

![The Polygon Prism Shape component](/images/learning-guide/tutorials/ai/kythera-city-navmesh-bounds.png)

`Navmesh.xml` is customized to be consistent with the `Robot.prefab` (`KytRobot`) entity that contains the
PhysX character controller for accurate obstacle avoidance and slope transitioning.

![Customizing the navmesh](/images/learning-guide/tutorials/ai/kythera-city-navmesh-customize.png)

```xml
<AgentHeight type="float">1.720000</AgentHeight>
<AgentMaxClimb type="float">0.750000</AgentMaxClimb>
<AgentMaxSlope type="float">60.000000</AgentMaxSlope>
<AgentRadius type="float">0.600000</AgentRadius>
```

* `AgentHeight` = Capsule height
* `AgentMaxClimb` = Step height
* `AgentMaxSlope` = Maximum slope angle
* `AgentRadius` = Capsule radius

## 3D octree generation & customizability

Like the `Navmesh Bounds` component, the `Octree` component comes with a `Polygon Prism Shape` component.

![Octree component configuration](/images/learning-guide/tutorials/ai/kythera-city-octree-dialog.png)

The `3DOctree` entity's `Octree component` is configured for accuracy at the cost of some performance, using a small cell size to represent the complex geometry of the level.

![Octree debug draw](/images/learning-guide/tutorials/ai/kythera-city-octree.png)

*   To generate the octree use the **Generate Octree** icon on the Kythera AI Toolbar,
    then make sure to save the octree using the **Save Octree** button<br>
    ![Regenerate Octree toolbar icon](/images/learning-guide/tutorials/ai/kythera-city-octree-regenerate.png)
*   To show debug draw for the Octree, enter the following commands in the O3DE console:
    *   `kyt_drawmaster 1`
    *   `kyt_drawnavoctree 2`


![Enabling octree debug draw in the O3DE console](/images/learning-guide/tutorials/ai/kythera-city-octree-console.png)

## Kythera AI Inspector tool (behavior trees and debug draw)

The [Kythera AI Inspector](/docs/user-guide/gems/reference/kythera-ai/introduction-to-the-inspector) is a web-based tool that allows you to author behavior trees (BTs) and access advanced debug draw features. To launch the Kythera AI Inspector, click on the **Launch Inspector** icon in the Kythera Toolbar.

By default, the Inspector will show the blackboard view, where you can debug existing blackboard values, and enable or disable the debug draw options.

![The blackboard view in the Kythera AI Inspector](/images/learning-guide/tutorials/ai/kythera-city-inspector-bbview.png)

To enable debug draw, expand Console Variables or drag it to the side to create a new tab.
Set console variable `Draw Master` to 1 and collapse console variables.

Expand `debug options`, here you can disable/enable various specific debug draw features.

To view the behavior trees, click on BT Editor at the top of the page and select a behavior tree name to edit.
Make sure that the game or **O3DE Editor** isn't playing or simulating while editing the behavior trees.

![The BT Editor in the Kythera AI Inspector](/images/learning-guide/tutorials/ai/kythera-city-inspector-bteditor.png)

Alternatively, you can view the behavior in live mode, go to:

1. In the top menu bar choose the `Live` tab, then the `Behavior trees` tab below it
2. Simulate or play the level in O3DE Editor. The Inspector shows `Kythera is active`.
3. Find an entity in the dropdown menu to see which behavior tree is in use.
4. Click the `Live` button to the right of the dropdown menu to view the behavior tree in real time

## 2D pathfinding

![A 2D Kythera AI agent](/images/learning-guide/tutorials/ai/kythera-city-robot.png)

2D Navigation is demonstrated by the `Robot.prefab`. The robots use the behavior `2DRandomWalk`, which chooses a random point in a specified range, then finds and follows a path to that point.

When duplicating or moving entities, be sure to select the top (shaded tab) of the prefab in the Entity Outliner, to prevent detached objects in the level.

The `KytRobot` entity in the prefab has the following components, which are required for 2D navigation:

*   `Kythera`
*   `PhysX Character Controller`, set to be consistent with `navmesh.xml`
*   `Agent`, set to use the profile `RandomWalk`
*   `SimpleMovementController`
The `RandomWalk` profile can be found in `KytheraAIDemo/Scripts/Profiles.xml`:

```xml
<RandomWalk id="140" inheritanceParent="100" type="bb">
  <DefaultBehavior type="string">2DRandomWalk</DefaultBehavior>
</RandomWalk>
```
The `DefaultBehavior` name must match the behavior name set in the inspector.

## 3D pathfinding

![A 3D Kythera AI agent](/images/learning-guide/tutorials/ai/kythera-city-spaceship.png)

3D Pathfinding is demonstrated by KytSpacship entities within the level.

The `KytSpaceship` entities use the behavior tree `3DGoToRandomEntityTag`, which searches for a random entity with a Kythera AI tag of `Kyt_Point_of_interest`, then finds and follows a path to that entity.

You can find the `Kythera3D_Point_of_Interest_Tagged` entities in the outliner, which contains a `Kythera` component with an added tag of `Kyt_Point_of_interest`.

!["Point of interest" entity in the Entity Outliner](/images/learning-guide/tutorials/ai/kythera-city-point-of-interest.png)

The octree must be built and present in the level for 3D navigation behavior tree nodes to work.

The `KytSpaceship` entity has the following components, which are required for 3D navigation:

*   `Kythera`
*   `PhysX Collider`, set to the convex shape of the ship
*   `Agent`, set to use the profile `GoToRandomEntityProfile`
*   `FlightMovementController`, which you can configure to change the speed and acceleration of the ships
*   `PhysX Rigid Body` (required by the movement controller)

You can find the profile `GoToRandomEntityProfile` in `KytheraAIDemo/Scripts/Profiles.xml`.
```xml
<GoToRandomEntityProfile id="210" inheritanceParent="200" type="bb">
  <DefaultBehavior type="string">3DGoToRandomEntityTag</DefaultBehavior>
</GoToRandomEntityProfile>
```
The `DefaultBehavior` name must match the behavior name set in the inspector.

## 3D splines and orientation

![A 3D Kythera AI agent following a navigation spline](/images/learning-guide/tutorials/ai/kythera-city-spaceship.png)

The level demonstrates 3D splines using a few entities.

![Navigation Spline component dialog](/images/learning-guide/tutorials/ai/kythera-city-spline-dialog.png)

The level contains a couple of `Kyt_Spline` actor entities that are set up with a `Navigation Spline` component. The parameters of this component change the physics behavior of agents flying the spline.

In the above screenshot, the spline is shown using the "Ghost Vehicle" visualization, which shows the expected physical behavior for agents following the spline, including orientation and speed. (The further apart the ghost vehicles appear, the faster the agents travel.)

The `KytSpaceship_Splines` entity has the following components, which are required for 3D navigation:

*   `Kythera`
*   `PhysX Collider`, set to the convex shape of the ship
*   `Agent`, set to use the profile `PathToNearestSplineStart`
*   `FlightMovementController`, which you can configure to change the speed and acceleration of the ships
*   `PhysX Rigid Body` (required by the movement controller)

The `KytDrone_Splines` entity is set up in almost exactly the same way as the `KytSpaceshp_Splines`, except that its `Agent` component is set to use the profile `PathToNearestSplinePoint`.

The following debug draw features, which you can set from the Kythera AI Inspector, are useful for debugging 3D navigation:

*   `ConsoleVariables` / `DrawMaster 1`
*   `ConsoleVariables` / `DrawOctree 2`
*   `Debug Options` / `Splines`
*   `Debug Options` / `3D Path`
*   `Debug Options` / `Velocity`
*   `Debug Options` / `Speed`
*   `Debug Options` / `Steering Path`
