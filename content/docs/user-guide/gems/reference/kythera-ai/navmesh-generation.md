---
linkTitle: Navmesh generation
title: Navmesh generation
description: Generating a navigation mesh with the Kythera AI Gem
weight: 300
---

Bounds setup
------------

In order for a navigation mesh to be generated, you will need at least one set of navmesh bounds in the level.

To declare a set of navmesh bounds, create an entity with a `PolygonPrismShape` to form the bounds, and use a `BoundsNavPath` component to mark it for navmesh generation.

![](/images/user-guide/gems/kythera-ai/navmesh-generation-bounds-setup.png)

  

### Exclusion volumes

If the bounds object has the **Exclusion Volume** checkbox checked in its control panel, it will cause navmesh **not** to be generated within the bounds. Tiles that intersect the exclusion volume will be clipped.

![](/images/user-guide/gems/kythera-ai/navmesh-generation-exclusion-volumes.png)

  

To make navmesh bounds and exclusion volumes look more intuitive, you can set the colors of the PolygonPrismShape components. In this example, the exclusion zones are colored red:

![](/images/user-guide/gems/kythera-ai/navmesh-generation-exclusion-volumes-red.png)

Configuration
-------------

Settings for navmesh generation are configured in the file `navmesh.xml.` This can be located in the folder for the particular level, or in the `scripts` or `levels` directories.

Multiple navmeshes may be specified in this file - for example, separate navmeshes for small and large characters. 

Each navmesh must be specified with an entry in the `NavMeshNames` section of the XML, declaring its name and type, as shown below.

**Navmesh configuration XML**

```
<NavMeshParams>
 <DefaultNavMeshName type="string">Default</DefaultNavMeshName>
 <DefaultNavMeshType type="string">MediumSizedCharacters</DefaultNavMeshType>
 <NavMeshNames type="bb">
  <Default type="bba">
   <Entry0 type="string">MediumSizedCharacters</Entry0>
  </Default>
  <Boss type="bba">
   <Entry0 type="string">LargeSizedCharacters</Entry0>
  </Boss>
 </NavMeshNames>
 <NavMeshTypes type="bb">
  <MediumSizedCharacters type="bb">
   <AgentHeight type="float">1.720000</AgentHeight>
   <AgentMaxClimb type="float">0.700000</AgentMaxClimb>
   <AgentMaxSlope type="float">45.000000</AgentMaxSlope>
   <AgentRadius type="float">0.600000</AgentRadius>
   <CellHeight type="float">0.050000</CellHeight>
   <CellSize type="float">0.100000</CellSize>
   <Regenerate type="bool">false</Regenerate>
  </MediumSizedCharacters>
  <LargeSizedCharacters type="bb">
   <AgentHeight type="float">1.800000</AgentHeight>
   <AgentMaxClimb type="float">0.700000</AgentMaxClimb>
   <AgentMaxSlope type="float">45.000000</AgentMaxSlope>
   <AgentRadius type="float">2.000000</AgentRadius>
   <CellHeight type="float">0.050000</CellHeight>
   <CellSize type="float">0.100000</CellSize>
   <Regenerate type="bool">false</Regenerate>
  </LargeSizedCharacters>
 </NavMeshTypes>
</NavMeshParams>
```

  

Filtering physics objects for navmesh generation
------------------------------------------------

Kythera AI can filter out which physics objects are considered when generating navmesh. This is performed by using a PhysX Collision Group- objects which collide with this collision group will be considered for navmesh, and those which do not collide with the collision group will be ignored. The collision group used can be set on a per-navmesh-type basis, by setting a `NavmeshPhysicsCollisionGroup` parameter in the per-navmesh-type parameters in NavMesh.xml. See the "PhysXTest" demo level for an example of this feature in action, where a "ghost hedge" is ignored by navmesh generation. 

Generating navmesh
------------------

Trigger a generation or regeneration of the navmeshes by pressing the Regenerate Navmesh button on the Kythera toolbar (![](/images/user-guide/gems/kythera-ai/toolbar-regenerate-navmesh.png)), or with the console command `kyt_Generate`.

Saving navmesh
--------------

To save the navmesh to disk, use the Save Navmesh button on the Kythera toolbar (![](/images/user-guide/gems/kythera-ai/toolbar-save-navmesh.png)), or use the console command `kyt_SaveTiles`.

For small levels, saving the navmesh is often unnecessary, as it will be generated automatically at runtime.

Visualization
=============

To turn on navmesh debug draw, use the Debug Draw Navmesh button (![](/images/user-guide/gems/kythera-ai/toolbar-debug-draw-navmesh.png)) on the Kythera toolbar, or set the console variables `kyt_DrawMaster` and `kyt_DrawNavMesh` both to 1. Values higher than 1 will change the details of how the navmesh is drawn.

It is possible to select which navmesh to visualize by using the combo-box in the Kythera toolbar; this defaults to "Default navmesh". This can also be set with the console variable `kyt_DrawNavMeshName` - set it to the name of the navmesh you want to draw.


Assigning to agents
===================

Agents are assigned a navmesh to use via the global `Profiles.xml` file. 

```
<NavMeshName type="string">Default</NavMeshName><NavMeshType type="string">MediumSizedCharacters</NavMeshType>
```

If a navmesh name or type is not specified in an agent's profile, the values of `DefaultNavMeshName` and/or `DefaultNavMeshType` from `NavMesh.xml` will be used.