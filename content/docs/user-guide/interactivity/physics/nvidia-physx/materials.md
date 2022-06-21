---
description: ' Use Physics materials to customize how an object reacts when it hits
  a surface in your Open 3D Engine project. '
title: Physics materials
weight: 200
---

Physics materials define how a PhysX collider reacts to collisions through properties like friction and restitution (bounce). In O3DE, you specify physics materials for each PhysX collider and store them inside a physics material library that you create with the **Asset Editor**. One library stores all the physics materials for a project.

**Topics**
+ [Physics material properties](#physics-material-properties)
+ [Create a physics material](#create-a-physics-material)
+ [Assign a physics material library](#assign-a-physics-material-library)
+ [Assign a physics material](#assign-a-physics-material)
  + [Assign physics materials per face](#assign-physics-materials-per-face)

## Physics material properties

![Physics material interface.](/images/user-guide/physx/physx/ui-physx-material-A.png)

****Name****
Name of the physics material.

****Dynamic Friction****
The friction coefficient when the PhysX collider is moving.
**0.0**: No friction.

****Static Friction****
The friction coefficient when the PhysX collider is still.
**0.0**: No friction.

****Restitution****
The energy that the PhysX collider retains on collision (bounce).
**0.0**: No bounce.
**1.0**: Maximum bounce.

****Friction combine****
Define how physics material frictions are combined between PhysX colliders when colliding.
**Average**: The average of the materials in contact. This is the default value.
**Minimum**: The smaller value of the materials in contact.
**Maximum**: The larger of the values of the materials in contact.
**Multiply**: The product of the values of the materials in contact.

****Restitution combine****
Define how physics material restitutions are combined between PhysX colliders when colliding.
**Average**: The average of the materials in contact. This is the default value.
**Minimum**: The smaller value of the materials in contact.
**Maximum**: The larger of the values of the materials in contact.
**Multiply**: The product of the values of the materials in contact.

****Density****
Define the degree of compactness of a material.

****Debug Color****
The display color of the physics material in debug view.

{{< note >}}
When materials collide, the **Friction combine** and **Restitution combine** define the value of applied friction and restitution using the following order:

1. **Average**
2. **Minimum**
3. **Multiply**
4. **Maximum**
{{< /note >}}

## Create a physics material

Physics materials define the physical properties of PhysX colliders. To create physics materials, you first create a physics material library.

**To create a physics material**

1. Choose Asset Editor from the **Tools** menu.

1. In the Asset Editor, choose **New**, **Physics Material** from the **File** menu to create a new physics material library.

![Create a physics material library in the Asset Editor.](/images/user-guide/physx/physx/ui-physx-material-B.png)

1. Create a physics material in the library by clicking the **+** on the right.

![Create a physics material library in the Asset Editor.](/images/user-guide/physx/physx/ui-physx-material-C.png)

1. Name the physics material by editing the **Name** property. Set the material properties as desired.

    {{< note >}}
You can add additional physics materials to the library by repeating the preceding two steps.
{{< /note >}}

1. Choose **Save As** from the **File** menu in the Asset Editor to save the library and physics material.

## Assign a physics material library

Your project has the physics material library set in **PhysX Configuration**. To change the physics material library, choose **PhysX Configuration** from the **Tools** menu. In the **Global Configuration** tab, click the button to the right of **Physics Material Library** to change the library.

![PhysX Configuration, physics material library.](/images/user-guide/physx/physx/ui-physx-material-D.png)

PhysX collider components use the physics material library that is assigned to PhysX Configuration.

You can specify the paremeter of the **Default Physics Material** in **PhysX Configuration**, which is the default option used before physics materials are assigned in PhysX collider components.

![PhysX Configuration, default physics material.](/images/user-guide/physx/physx/ui-physx-material-E.png)

## Assign a physics material

Physics materials can be assigned to entire PhysX colliders, or on a per-face basis if the PhysX mesh is a triangle mesh.

When the **Physics Asset** shape is selected in **PhysX Collider** component, and the **Physics Materials from Asset** property is enabled, the physics materials for this collider are automatically set based on the Physics Materials from the mesh's PhysX asset (see [FBX Settings PhysX tab](/docs/user-guide/assets/scene-settings/physx-tab/)). To manually set the physics materials, uncheck the **Physics Materials from Asset** property and select the physics materials from the **Physics Materials** property list to assign it.

![PhysX Collider, setting the physics materials.](/images/user-guide/physx/physx/ui-physx-material-F.png)

### Assign physics materials per face

Static entities that have PhysX triangle mesh assets can have physics materials assigned per face. You define material placement by assigning materials to the faces of the triangle collision mesh in a content creation application. These materials are listed in both FBX Settings PhysX group and PhysX Collider component, where each material is assigned a physics material.

For more information on creating PhysX mesh assets, see [FBX Settings PhysX tab](/docs/user-guide/assets/scene-settings/physx-tab/).

In the example below, the PhysX mesh asset was authored with six materials in the content creation application: *Yellow*, *Red*, *Blue*, *Teal*, *Green* and *Orange*. In FBX Settings, under PhysX tab, a physics material can be assigned to each material.

![PhysX Collider, per face physics materials.](/images/user-guide/physx/physx/ui-physx-material-G.png)

In PhysX Component, when **Physics Materials from Asset** property is disabled, a physics material can be manually assigned to each material. When **Physics Materials from Asset** property is enabled the physics materials assigned in FBX Settings will be used automatically.

![PhysX Collider, per face physics materials.](/images/user-guide/physx/physx/ui-physx-material-H.png)
