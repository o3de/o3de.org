---
linkTitle: Formations
title: Navmesh formations
description: Guide to the navmesh formations feature of the Kythera AI Gem
weight: 500
---
[Kythera AI Gem](index.md)

# Navmesh formations

**Navmesh formations** allow multiple Kythera agents to move together in a fixed two-dimensional structure. The formation itself is its own Kythera Entity and can be controlled with a behavior tree.

There is a demo level called **Formations2DDemo** in ShooterDemo with some basic behavior trees.

Templates
=========

The shape of a formation is defined in a `Formations.xml` file that can be in the top level `<game>\Scripts` folder or inside a level folder. Here is a basic example for a 2x3 (two rows with 3 agents each):

```
<Formations id="1">
  <Profiles type="bb">
    <!-- profile referenced by the KytProfile node in the template defintion (by id) -->
    <DefaultProfile id="2" type="bb">
      <!-- behavior tree run by the formation entitiy -->
      <DesiredBehaviour type="string">Formation2DWalk</DesiredBehaviour>
      <!-- default target selector of the Kythera gem -->
      <TargetSelector type="string">TS_Default</TargetSelector>
    </DefaultProfile>
  </Profiles>

  <!--
    The following section defines templates for the formations.
    It defines which profile (defined above) is used by the formation entity,
    and how entities that are part of the formation are layed out.
    Templates names ("Default" in this example") are used by behavior tree nodes like
    MeshFormation_CreateFormation, MeshFormation_SetFormationTemplate or the
    CreateHDV2DFormation API.
    For technical reasons, 2d formations are stored as 3d vectors. leave z=0.
  -->
  <Formations2D type="bb">
    <!-- A simple formation with 2 rows with 3 entities each -->
    <Default type="bb">
      <!-- use DefaultProfile defined above -->
      <KytProfile inheritanceParent="3" type="bb"></KytProfile>
      <FillInThreshold type="float">2.0</FillInThreshold>
      <!--
       Define slots/positions of the agents relative to the center of the formation.
       Slots are filled up in the order they are defined here.
      -->
      <Offsets type="bba">
        <v type="bb">
          <OffsetVec type="vec3">0, 0, 0</OffsetVec>
        </v>
        <v type="bb">
          <OffsetVec type="vec3">-2, 0, 0</OffsetVec>
        </v>
        <v type="bb">
          <OffsetVec type="vec3">2, 0, 0</OffsetVec>
        </v>
        <v type="bb">
          <OffsetVec type="vec3">0, -2, 0</OffsetVec>
        </v>
        <v type="bb">
          <OffsetVec type="vec3">-2, -2, 0</OffsetVec>
        </v>
        <v type="bb">
          <OffsetVec type="vec3">2, -2, 0</OffsetVec>
        </v>
      </Offsets>
    </Default>
```

Tagged slots
------------

Slots can be tagged, so only agents with the same tag can occupy this slot:

```
<v type="bb">
  <OffsetVec type="vec3">0, 0, 0</OffsetVec>
  <RequiredTag type="string">Blue</RequiredTag>
</v>
```

In O3DE, tags can be added on the Kythera component:

![](/images/user-guide/gems/kythera-ai/navmesh-formations-add-tags.png)

Behavior Tree
=============

Most of the runtime control over formations is handled with a behavior tree. A formation is a separate entity that is running its own behavior tree. The relevant behavior tree nodes are:

*   **CheckFormationOverlap** - succeeds if this formation is overlapping another
    
*   **MeshFormation\_AttemptMerge** - attempts to merge the target formation into the calling formation. Fails if merge was incomplete
    
*   **MeshFormation\_CreateFormation** - create a new formation with the current entity as its leader
    
*   **MeshFormation\_DisbandFormation** - disband an existing formation
    
*   **MeshFormation\_FormationInPositionNow** - check if formation's members are in their respective slots
    
*   **MeshFormation\_IssueOrder** - Issue an order to this entities formation members
    
*   **MeshFormation\_JoinFormation** - Join an existing formation
    
*   **MeshFormation\_SetFormationGoal** - Issue an order to this entity's formation members
    
*   **MeshFormation\_SetFormationTemplate** - Change the template that this formation uses
    
*   **MeshFormation\_SplitFormation** - Split members of the current formation into a new formation
    

A formation is also a group, so read-only group related behavior tree nodes like **GetGroupFromEntity**, **GetGroupCount** and **GetEntityInGroup** work. For creating, joining, leaving, and disbanding formations, you must use the formation-specific behavior tree nodes.
