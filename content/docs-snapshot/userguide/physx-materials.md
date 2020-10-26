# Physics materials<a name="physx-materials"></a>

Physics materials define how a PhysX collider reacts to collisions through properties like friction and restitution \(bounce\)\. In Lumberyard, you specify physics materials for each PhysX collider and store them inside a physics material library that you create with the **Asset Editor**\. One library can store all the physics materials for a project or separate libraries can be made for different physics material types\. 

**Tip**  
Having one library makes it easier to see all the physics materials and their properties in a project\. 

**Topics**
+ [Physics material properties](#physics-material-properties)
+ [Create a physics material](#create-a-physics-material)
+ [Assign a physics material library](#assign-a-physics-material-library)
+ [Assign a physics material](#Assign-a-physics-material-collider)
+ [Assign physics materials per face](#assign-physics-materials-per-face)
+ [**Terrain physics materials**](#terrain-physics-materials)

## Physics material properties<a name="physics-material-properties"></a>

![\[Physics material interface.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx/ui-physx-material-A-1.24.png)

****Surface Type****  
Name of the physics material\. 

****Dynamic Friction****  
The friction coefficient when the PhysX collider is moving\.   
**0\.0**: No friction\. 

****Static Friction****  
The friction coefficient when the PhysX collider is still\.   
**0\.0**: No friction\. 

****Restitution****  
The energy that the PhysX collider retains on collision \(bounce\)\.   
**0\.0**: No bounce\.   
**1\.0**: Maximum bounce\. 

****Friction combine****  
Define how physics material frictions are combined between PhysX colliders when colliding\.   
**Average**: The average of the materials in contact\. This is the default value\.   
**Minimum**: The smaller value of the materials in contact\.   
**Maximum**: The larger of the values of the materials in contact\.   
**Multiply**: The product of the values of the materials in contact\. 

****Restitution combine****  
Define how physics material restitutions are combined between PhysX colliders when colliding\.   
**Average**: The average of the materials in contact\. This is the default value\.   
**Minimum**: The smaller value of the materials in contact\.   
**Maximum**: The larger of the values of the materials in contact\.   
**Multiply**: The product of the values of the materials in contact\. 

****Debug Color****  
The display color of the physics material in debug view\. 

**Note**  
When materials collide, the **Friction combine** and **Restitution combine** define the value of applied friction and restitution using the following order\.   
**Average**
**Minimum**
**Multiply**
**Maximum**

## Create a physics material<a name="create-a-physics-material"></a>

Physics materials define the physical properties of PhysX colliders\. To create physics materials, you first create a physics material library\. 

**To create a physics material**

1. Choose Asset Editor from the **Tools** menu\. 

1. In the Asset Editor, choose **New**, **Physics Material** from the **File** menu to create a new physics material library\.   
![\[Create a physics material library in the Asset Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx/ui-physx-material-B-1.24.png)

1. Create a physics material in the library by clicking the **\+** on the right\.   
![\[Create a physics material library in the Asset Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx/ui-physx-material-C-1.24.png)

1. Name the physics material by editing the **Surface Type** property\. Set the material properties as desired\. 
**Note**  
You can add additional physics materials to the library by repeating the preceding two steps\. 

1. Choose **Save As** from the **File** menu in the Asset Editor to save the library and physics material\. 

## Assign a physics material library<a name="assign-a-physics-material-library"></a>

Physics materials can be assigned to entire PhysX colliders, or on a per\-face basis if the PhysX mesh is a triangle mesh\. To assign a material, you first assign the library containing the desired physics material\. 

**To assign a physics material library**

1. Your project has a default physics material library\. When new PhysX collider components are added to entities, the default physics material library is assigned to the collider\. To change the default physics material library, choose **PhysX Configuration** from the **Tools** menu\. In the **Global Configuration** tab, click the **\.\.\.** button to the right of **Default Physics Material Library** to change the default library\.   
![\[PhysX Configuration, default physics material library.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx/ui-physx-material-D-1.24.png)
**Note**  
The default physics material library cannot be removed\. If the default physics material library is deleted or invalid, a new library named `SurfaceTypeMaterialLibrary` is created automatically when the editor is opened\. 

1. Newly added **PhysX Collider** components have the default physics material library assigned\. A default physics material library assignment appears in gray text in the component properties\. To change the physics material library assigned to a collider, click the **\.\.\.** button to the right of **Physics Material \- Library** in the **PhysX Collider** component properties\. To reset to the default physics material library, click the **x** button to the right of **Physics Material \- Library** in the **PhysX Collider** component properties\.   
![\[PhysX Collider, setting the physics material library.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx/ui-physx-material-E-1.24.png)
**Note**  
Use this method to set the physics material library on any component that has a **Physics Material \- Library** property, including **PhysX Collider**, **PhysX Ragdoll**, **PhysX Character Controller**, and **Terrain Texture Layers**\. 

## Assign a physics material<a name="Assign-a-physics-material-collider"></a>

When the **Physics Asset** shape is selected, and **Physics Materials from Mesh** is enabled, the physics material for this collider is automatically set based on the surface type in the mesh's material\. To manually set the physics material, uncheck the **Physics Materials from Mesh** property and select the physics material from the **Mesh Surfaces \- Entire object** property list to assign it\. 

![\[PhysX Collider, setting the physics material.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx/ui-physx-material-F-1.24.png)

**Warning**  
There is a known issue where switching physics material libraries between colliders such as **Ragdoll PhysX** components will not update the physics material list to the newly assigned physics material library\. To update the physics material list, click on another collider, then back on the initial collider\. 

## Assign physics materials per face<a name="assign-physics-materials-per-face"></a>

Static entities that have PhysX collider triangle mesh assets can have physics materials assigned per face\. You define physics material placement by assigning placeholder materials to the faces of the triangle collision mesh in a content creation application\. The names of placeholder materials become physics material properties of the collider component\. 

For more information on creating PhysX collider mesh assets, see [Export PhysX collider mesh assets](physx-export-physx-mesh-asset.md)\.

**Note**  
You can use the names of the placeholder materials to automate material assignment in Lumberyard by using an `_` in the placeholder material name\. The FBX exporter parses placeholder material names found on PhysX collider mesh assets as `PropertyName_PhysicsMaterialName`\.   
A placeholder material named `Road` creates a physics material property named **Road** on the collider component under **Mesh Surfaces**\. 
A placeholder material named `Road_Dirt` creates a physics material property named **Road** and attempts to assign the physics material named **Dirt** to the **Road** property, assuming that the assigned physics material library contains a physics material named **Dirt**\. 

In the example below, the PhysX collider mesh asset has two placeholder materials, *Mud* and *Grass*\. The FBX exporter creates physics material properties using the placeholder material names, and corresponding physics materials are assigned from the physics material library\. 

![\[PhysX Collider, per face physics materials.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx/ui-physx-material-G-1.24.png)

## **Terrain physics materials**<a name="terrain-physics-materials"></a>

Terrain is assigned the default physics material\. Use the **[Terrain Texture Layers](terrain-texture-layers-intro.md)** editor to assign materials to different surface types\. 

![\[Surface ID and Material Library properties in the Terrain Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx/ui-physx-material-H-1.24.png)

**Note**  
To add terrain physics materials, you must have a **[PhysX Terrain](component-physx-terrain.md)** component in your scene\.
To ensure that the engine generates a unique surface ID that can be assigned with the physics material, you must change the layer's material\. If multiple layers share the same surface ID, they must have the same physics material assigned\.