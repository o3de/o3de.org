# Collision Layers<a name="physx-configuration-collision-layers"></a>

Use collision layers to group objects of the same type\. Use collision groups to define what the collision layers collide with\. You can have a maximum of 64 layers per game\.

Common types of layers are objects like the following:
+ Terrain
+ Static objects
+ Players
+ Enemies
+ Projectiles

The layers that you define are specific to your game\. When a collider is created, it is assigned a collision layer with index \[0\] called `Default`\. This can't be changed\.

**To create a collision layer**

1. In Lumberyard Editor, choose **Tools**, **PhysX Configuration**\.

1. Click the **Layers** tab\.

1. Type the name of the layer into an available text field\. Layer names must be 32 characters or less\.  
![\[Creating Layers in the PhysX Configuration tool.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-configuration-2.png)

**To assign a collision layer to a collider**

1. In the Lumberyard Editor viewport, create an entity and select it\.

1. In the **Entity Inspector**, add a **PhysX Collider** component to the entity\.

1. In the **PhysX Collider** component, for **Collision Layer**, choose one of the colliders that you created from the drop\-down list\.  
![\[The PhysX Collider component in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/physx/physx-configuration-3.png)

## Notes<a name="physx-configuration-collision-layers-notes"></a>
+ If you rename a layer, its references are updated automatically, but you can't reorder layers\.
+ If an entity with a **PhysX Collider** component is selected in the viewport and you use the **PhysX Configuration** window to create, rename, or delete a collision layer, the changes do not appear in the **Entity Inspector**\. To see the changes, deselect and reselect the entity in the viewport\.