# PhysX Collider<a name="component-physx-collider"></a>

Performance demands in games and real\-time applications require physics simulations to be solved in fractions of a second\. The PhysX Collider component allows you to specify primitive shapes or PhysX mesh assets to calculate collisions between entities, ensuring fast physics simulation\. A simple entity such as a crate might have a single PhysX Collider component, while more complex entities, such as vehicles, might require multiple PhysX Collider components\. 

**Note**  
The PhysX Collider component attached to an entity by itself creates a static \(non\-moving\) entity, such as a wall or a mountain\. To create a dynamic \(moving\) entity, you also need to add a **[PhysX Rigid Body](component-physx-rigid-body-physics.md)** component\. The **PhysX Rigid Body Physics** component requires either a primitive collider or convex mesh collider\. Triangle mesh physics assets work only with static entities\. 

The PhysX Collider component requires the [PhysX](gems-system-gem-physx.md) gem enabled in your project\.

For more information, see [Simulating physics behavior with the PhysX system](physx-intro.md)\.

**Topics**
+ [PhysX Collider properties](#component-physx-collider-properties)
+ [Static PhysX entities](#static-physx-entities)
+ [Primitive colliders](#primitive-colliders)
+ [Physics asset colliders](#physics-asset-colliders)
+ [Collider component mode](#colliders-component-mode)
+ [Colliders as triggers](#colliders-as-triggers)
+ [Export PhysX collider mesh assets](physx-export-physx-mesh-asset.md)

## PhysX Collider properties<a name="component-physx-collider-properties"></a>

![\[PhysX Collider component interface.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-A-1.24.png)

****Collision Layer****  
The collision layer that's assigned to the collider\. For more information, see [Collision Layers](physx-configuration-collision-layers.md)\. 

****Collides With****  
The collision group containing the layers that this collider collides with\. For more information, see [Collision Groups](physx-configuration-collision-groups.md)\. 

****Trigger****  
Set this collider as a trigger\. A trigger performs a quick overlap test and does not apply forces or return contact point information\. Use this to speed\-up PhysX computations where a simple overlap between colliders is sufficient\.   
Triangle meshes are not supported as triggers\.  
Trigger Area components cannot be used with PhysX Collider\.

****Offset****  
Local offset position of the collider, relative to the entity\. 

****Rotation****  
Local rotation of the collider about the **Offset** of the PhysX collider component\. 

****Physics Material \- Library****  
Set the physics material library for this collider\. 

****Physics Material \- Mesh Surfaces****  
Choose a material from the physics material library for this collider\. A collider can have multiple materials assigned\. For more information, see [Physics materials](physx-materials.md)\. 

****Tag****  
Set a tag for this collider\. Tags can be used to quickly identify components in script or code\. 

****Shape****  
Shape of the collider\. A collider can be a primitive shape or a physics asset\.  
To use a primitive shape, choose **Box**, **Sphere**, or **Capsule**\. For more information, see [Primitive colliders](#primitive-colliders)\.   
To use a physics asset, choose **Physics Asset**\. For more information, see [Physics asset colliders](#physics-asset-colliders)\. 

****PhysX Mesh** \(Physics Asset shape\)**  
Assign a physics asset to the collider\. For more information, see [Export PhysX collider mesh assets](physx-export-physx-mesh-asset.md)\. 

![\[PhysX Collider component interface, Sphere.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-A-1-1.24.png)

****Radius** \(Sphere shape\)**  
Radius multiplier of the sphere collider\. The size of the sphere primitive is the **Radius** multiplied by the largest value in the **Scale** property in the **[Transform](component-transform.md)** component\. 

![\[PhysX Collider component interface, Box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-A-2-1.24.png)

**Dimensions** \(Box shape\)  
Width, depth, and height of the box collider\. 

![\[PhysX Collider component interface, Capsule.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-A-3-1.24.png)

**Height** \(Capsule shape\)  
Height of the capsule primitive shape\. The height property of the capsule must be at least twice the radius property\. For example, if the radius of the capsule is **5\.0**, the minimum height is **10\.0**\. 

**Radius** \(Capsule shape\)  
Radius of the capsule primitive shape\. The radius property of the capsule must be no greater than half the height property\. For example, if the height of the capsule is **10\.0**, the maximum radius is **5\.0**\. 

**Asset Scale**  
Scale the collider shape independent of the entity\. 

**Physics Materials from Mesh**  
When the **Physics Asset** shape is selected, and **Physics Materials from Mesh** is enabled, the physics material for this collider is automatically set based on the surface type in the mesh's material\. If the surface type in the mesh's material doesn't exist in the **Physics Material \- Library**, the **Physics Material \- Mesh Surface** is set to default\. The collider **Mesh Surfaces** properties cannot be edited while this option is enabled\. 

**Draw Collider**  
Render the collider in the viewport\. Enabled by default\. 

**Edit**  
Enable collider component mode to edit properties of the collider in the viewport using manipulators\. 

## Static PhysX entities<a name="static-physx-entities"></a>

A PhysX entity that is static can interact with other entities, but doesn't move\. 

**To create a static PhysX entity**

1. Create an entity\. For more information, see [Creating an Entity](creating-entity.md)\.

1. In the **Entity Inspector**, choose **Add Component** and then select **[Mesh](component-static-mesh.md)** component\.

1. In the **Mesh** component, choose a mesh asset for the **Mesh asset** property\.

1. In the **Entity Inspector**, choose **Add Component** and then select **PhysX Collider** component\.

1. In the **PhysX Collider** component, set the **Shape** to **Box**, and edit the **Dimensions** property so the box encloses the mesh asset\.

1. Press **Control\+G** to enter play mode\. Because your entity does not have a **PhysX Rigid Body** component, it is static and does not move\.   
![\[PhysX Collider component example entity that is static.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-B-1.24.png)
**Tip**  
On the **[Transform](component-transform.md)** component, enable the **Static** property\. This enables optimizations for static entities\. 

## Primitive colliders<a name="primitive-colliders"></a>

When you add the **PhysX Collider** component to an entity, you can specify the following basic collider shapes\.
+ **Sphere**
+ **Box**
+ **Capsule**

These primitive shapes don't have an underlying mesh\. Because they are defined by dimensions rather than a mesh, they are high\-performance colliders and should be used when possible\.

## Physics asset colliders<a name="physics-asset-colliders"></a>

Physics asset colliders are meshes that are created in a modeling application, or are convex meshes that are automatically generated by the FBX exporter\. Because physics asset colliders are more complex than shapes, they are less efficient\. Physics asset colliders should be used in cases where collision detection that more closely resembles the complex shape of the visible mesh is required\. To generate PhysX collider mesh assets for your project, see [Export PhysX collider mesh assets](physx-export-physx-mesh-asset.md)\. 

**Note**  
To define a mesh collider that has varying properties:  
Use a third\-party content creation tool to define a mesh collider and use the FBX exporter to convert the mesh collider for your project\. Mesh colliders created this way can only be added to static entities\.
Alternatively, attach multiple **PhysX Collider** components to the entity, and specify different PhysX collider shapes and properties for each component\.

**To create a mesh collider**

1. Create an entity\. For more information, see [Creating an Entity](creating-entity.md)\.

1. In the **Entity Inspector**, choose **Add Component** and then select **[Mesh](component-static-mesh.md)**\.

1. In the **Mesh** component, choose a mesh asset for the **Mesh asset** property\.

1. In the **Entity Inspector**, choose **Add Component** and then select **PhysX Collider**\.
**Note**  
If the asset specified for the **Mesh** component contains a PhysX collider mesh asset, the **PhysX Collider** automatically sets its **Shape** property to **Physics Asset**, and its **PhysX Mesh** property to the PhysX collider mesh asset\. If the asset specified for the **Mesh** component contains more than one PhysX collider mesh asset, the first PhysX collider mesh asset found is assigned to the **PhysX Mesh** property\. 

1. In the **PhysX Collider** properties, ensure that the **Shape** property has **Physics Asset** selected\.

1. For **PhysX Mesh**, ensure that the desired PhysX collider mesh asset is selected\. Click the **\.\.\.** button to the right of **PhysX Mesh** to change the mesh asset\.  
![\[PhysX Collider component properties for asset and PhysX collision mesh.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-C-1.24.png)
**Note**  
To generate PhysX collider mesh assets for your project, see [Export PhysX collider mesh assets](physx-export-physx-mesh-asset.md)\.   
**Example**  

   Instead of a primitive shape, the entity has a PhysX collider mesh asset specified for the **PhysX Collider** component\.  
![\[PhysX Collider component with a custom PhysX collider mesh asset to create a custom collider shape.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-D-1.24.png)

**Note**  
To make an entity dynamic, in the **Entity Inspector**, choose **Add Component** and then select **PhysX Rigid Body Physics** component\.   
Only primitive shapes and convex meshes can be used for dynamic colliders\. If you assign a triangle mesh, the collider won't work\. For dynamic objects, be sure to disable the **Static** property of the **Transform** component of your entity\. 

## Collider component mode<a name="colliders-component-mode"></a>

In collider component mode, you edit colliders with manipulators in the viewport\. To enter collider component mode, choose the **Edit** button at the bottom of the PhysX Collider component properties in the **Entity Inspector**\. 

**Sub component modes**  
There are three editing modes available in collider component mode\.
+ **Resize** mode, which is unique to each collider type, scales the collider\.

   The manipulator displayed in the viewport in resize mode is dependent on the collider shape\. For primitive colliders, the resize manipulator handles are represented as black squares\. For **Physics Asset** colliders, the resize manipulator is represented as a familiar scale manipulator\.
+ **Offset** mode translates the collider relative to its entity transform\.
+ **Rotation** mode rotates the collider about the component's **Offset**\.

**Resize \(Sphere Shape\)**  
**Sphere** resize mode has one linear manipulator that controls the **Radius** property\.   

![\[PhysX Collider component mode sphere resize manipulator\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-E-1.24.png)

**Resize \(Box Shape\)**  
**Box** resize mode has six linear manipulators, one on each side of the box\. The manipulators control the width, depth, and height **Dimensions** property\.   

![\[PhysX Collider component mode box resize manipulator\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-G-1.24.png)

**Resize \(Capsule Shape\)**  
**Capsule** resize mode has two linear manipulators\. The manipulator at the top of the capsule controls the **Height** property\. The manipulator on the side controls the **Radius** property\.   

![\[PhysX Collider component mode capsule resize manipulator\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-F-1.24.png)

**Resize \(Physics Asset Shape\)**  
**Physics Asset** resize mode has a three axis scale manipulator\.  

![\[PhysX Collider component mode Physics Asset resize manipulator\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-H-1.24.png)

**Offset**  
Offset mode has a three axis translate manipulator\.  

![\[PhysX Collider component mode offset manipulator\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-I-1.24.png)

**Rotation**  
Rotation mode has a three axis rotate manipulator\.  

![\[PhysX Collider component mode rotate manipulator\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-collider-J-1.24.png)

**Collider component mode hotkeys**  
These navigation hotkeys are available in collider component mode\.
+ **1** – Resize mode\.
+ **2** – Offset mode\.
+ **3** – Rotation mode\.
+ **Control \+ Mouse Wheel Up** – Next mode\.
+ **Control \+ Mouse Wheel Down** – Previous mode\.
+ **R** – Reset current mode\. This is effectively an undo operation\. You can step through the Resize, Offset, and Rotation modes and press R to reset changes to the current mode\. 
+ **Escape** – Exit component mode\.

## Colliders as triggers<a name="colliders-as-triggers"></a>

Triggers allow colliders to perform efficient overlap tests\. Colliders marked as triggers won't have forces applied when they intersect with another collider\. This is useful for detecting when something enters a certain area or when two objects overlap\. Use Lua or Script Canvas to detect overlap\.

**Note**  
Because triggers don't perform contact resolution, the contact points between a trigger and another collider aren't available\.   
Triangle meshes are not supported as triggers\.  
Trigger Area components cannot be used with PhysX Collider\.