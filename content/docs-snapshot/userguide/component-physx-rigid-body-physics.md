# PhysX Rigid Body<a name="component-physx-rigid-body-physics"></a>

The **PhysX Rigid Body** component defines the entity as a rigid object\. This means the entity is solid and can move and collide with other PhysX entities\. For example, you can add the **PhysX Rigid Body** to the entity to create a moving and solid entity, such as a projectile\.

You can specify two main modes for a **PhysX Rigid Body** component\.

**Dynamic**  
Dynamic rigid bodies will be fully simulated by Lumberyard and respond to collision events with other rigid bodies\. Lumberyard will apply forces to two dynamic objects that collide, which results in a realistic physics simulation\. The simulation will also apply a gravity force to rigid bodies in dynamic mode\. You can disable this feature for each rigid body on the component\. Dynamic rigid bodies should be used for semi\-realistic objects like a rolling barrel or a projectile that falls under gravity\.  
Dynamic is the default\.

**Kinematic**  
Kinematic rigid bodies are not fully simulated like dynamic rigid bodies\. You can specify the movement using a script with the `SetKinematicTarget` method that you specify in the script with C\+\+ or Script Canvas\.  
Forces and gravity have no effect on a kinematic body\. Use this feature for objects such as moving platforms, doors, or anything that doesn't need to be fully simulated by physics\.

**Note**  
You should always add the **PhysX Rigid Body** component to the top level of an entity hierarchy\. If you add the component to a child entity, this can cause conflicts with the entity's world transform and result in undefined behavior\.

The **PhysX Rigid Body** components requires the [PhysX](gems-system-gem-physx.md) gem\.

For more information, see [Simulating physics behavior with the PhysX system](physx-intro.md)\.

**Topics**
+ [PhysX Rigid Body Properties](#component-physx-rigid-body-physics-properties)
+ [Creating a Dynamic PhysX Entity](#example-creating-dynamic-game-entity)

## PhysX Rigid Body Properties<a name="component-physx-rigid-body-physics-properties"></a>

![\[PhysX Rigid Body component properties.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/component-physx-rigid-body-1.png)

The **PhysX Rigid Body** component has the following properties\.


| Property | Description | 
| --- | --- | 
| Initial linear velocity |  Specifies the initial linear velocity for the rigid body when created\.  | 
| Initial angular velocity |  Specifies the initial angular velocity for the rigid body when created\.  | 
| Linear damping |  Specifies the rate at which linear velocity decays over time even if force are not acting on the body\. Objects with a positive value will eventually stop moving when forces are not applied\.  You must specify a positive value\.  | 
| Angular damping |  Specifies the rate at which angular velocity decays over time even if torque is not applied on the body\. A positive value will eventually stop rotating when torque isn't applied\. You must specify a positive value\.  | 
| Mass |  Mass of the rigid body, in kilograms\. A value of `0` is treated as an infinite mass\. Default: `1`  | 
| Sleep threshold |  Kinetic energy per unit mass below which the rigid body goes to sleep\.  You must specify a positive value\.  | 
|  **Start Asleep**  |  If set, the object will start asleep when created\.  | 
|  **Interpolate Motion**  |  If set, makes the objects motion and style appear smooth\.  Set this property for entities in your game project in which you want smooth motions, such as vehicles\.  | 
|  **Gravity Enabled**  |  If set, the rigid body will fall under gravity\. Only applies to rigid bodies in dynamic mode\.  | 
|  **Kinematic**  |  If set, the rigid body uses kinematic mode\. If this property is not selected, the entity is dynamic by default\.  | 
|  **CCD Enabled**  |  Enables continuous collision detection \(CCD\)\. This property is useful for high speed objects\.   To set this property, you must also set the **Continuous Collision Detection** in the **PhysX Configuration** window\. See [World Configuration](physx-configuration-global.md#physx-configuration-global-world)\.    | 
|  **Compute COM**  |  If set, Lumberyard automatically computes the center of mass \(COM\) at creation time and updates when the rigid body changes\.  If you don't set this property, you can specify the offset in the **Center of Mass Offset** property\.  | 
|  **Center of Mass Offset**  |  Allows the center of mass to be manually specified relative to the rigid body position\.  This property appears only if **Compute COM** is disabled\.  | 
| Compute inertia |  If set, the inertia will be computed automatically at the time of creation\.  | 
|  **Debug Draw COM**  |  If set, defines the sphere radius, in meters\.  | 

## Creating a Dynamic PhysX Entity<a name="example-creating-dynamic-game-entity"></a>

A PhysX entity that is dynamic can move and collide with other entities\.

**To create a dynamic PhysX entity**

1. Create an entity\. For more information, see [Creating an Entity](creating-entity.md)\.

1. In the **Entity Inspector**, choose **Add Component** and then select a **[Mesh](component-static-mesh.md)** component\.

1. For **Mesh asset**, select the mesh asset so that your entity is visible, such as a `box.cgf`\.

1. Add the **PhysX Collider** component to the entity\.

1. Add the **PhysX Rigid Body** component to the entity\.

1. Create another entity for your PhysX terrain\. For more information, see the **[PhysX Terrain](component-physx-terrain.md)** component\.

1. Press **Ctrl\+G** to enter gameplay mode\.  
**Example**  

   The entity has a **PhysX Collider** component and a **PhysX Rigid Body** component attached\. Because the object is dynamic, it falls and then collides with the **PhysX Terrain** component\.  
![\[Animated example of a dynamic entity falling to the terrain and bouncing around.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared/physx-creating-dynamic-object-1.gif)
**Note**  
For the **[Transform](component-transform.md)** component, clear the **Static** property\. This ensures that the mesh moves with the physics\. 