---
linkTitle: PhysX Character Controller
description: Use the PhysX Character Controller component to implement basic character interactions in Open 3D Engine (O3DE).
title: PhysX Character Controller Component
---



You can use the **PhysX Character Controller** component to implement basic character interactions with the physical world. For example, you can prevent characters from walking through walls or passing through terrain. You can also control interactions with slopes and steps and manage interactions with other characters.

The following diagram shows some of the features of the **PhysX Character Controller** component. Because it is usually more convenient to work with a character's foot position, the entity position coincides with the base of the controller. For details about the contact offset, see [Contact Offset](#contact-offset).

![Contact offset of a PhysX Character Controller component in the O3DE Editor viewport.](/images/user-guide/component/physx/component-physx-character-controller-1.png)

The **PhysX Character Controller** component requires the [PhysX](/docs/user-guide/gems/reference/physics/nvidia/physx/) gem.

**Topics**
+ [Using the PhysX Character Controller Component](#using-the-physx-character-controller-component)
+ [PhysX Character Controller Properties](#physx-character-controller-properties)
+ [Differences Between PhysX and Legacy Character Physics Components](#differences-between-physx-and-legacy-character-physics-components)

## Using the PhysX Character Controller Component 

To use the **PhysX Character Controller** component, [add it to an entity](/docs/user-guide/components/reference/#adding-components-to-an-entity) that represents a character.

You can control the character's movement by using Script Canvas, the C++ API, or animation systems that use the C++ API.

## PhysX Character Controller Properties 

You can configure the properties for the **PhysX Character Controller** component in the **[Entity Inspector](/docs/user-guide/editor/entity-inspector/)**.

![PhysX Character Controller component properties in the Entity Inspector.](/images/user-guide/component/physx/ui-physx-character-controller-properties.png)

The **PhysX Character Controller** has the following component properties.


****

| Property | Description |
| --- | --- |
|  **Collision Layer**  |  Collision layer assigned to the controller. The default is **Default**.  |
|  **Collides With**  |  Collision layers that this character controller collides with. Possible values are those that you define in the collision groups section of the PhysX configuration.  You can specify the following values:   The collision filters determine whether dynamic objects collide with the controller. A separate set of filters control what objects can impede the character from moving. The movement filters are currently hard-coded so that static objects obstruct character movement.   |
|  **Physics Materials** |  Choose a physics material for this character controller collider.   |
|  **[Maximum Slope Angle](#maximum-slope-angle)**  |  Angle in degrees of the largest slope that the character controller can climb.   |
|  **[Step Height](#step-height)**  |  Height of steps in meters that the character controller can traverse.   |
|  **Minimum Movement Distance**  |  Distance in meters below which the controller doesn't attempt to move. Used to avoid jittering.   |
|  **Collider Tag**  |  A tag string used to identify the collider associated with the character controller.  |
|  **Slope Behavior**  |  Behavior of the controller on surfaces above the maximum slope.  You can specify the following values:  The default is **Prevent Climbing**.  |
| **[Contact Offset](#contact-offset)** |  Additional distance in meters beyond the controller that is monitored for potential contact. Used for smoother contact resolution.   |
| **Scale** |  Scales the size of the collider created in PhysX relative to the dimensions specified for the controller. A value slightly smaller than `1` is recommended.  The default is `0.8`.  |
| **[Shape](#shape)** | Shape of the character controller.You can specify the following values:The default is Capsule. |
| **Height (Capsule Only)** |  Height of the capsule in meters.  |
| **Radius (Capsule Only)** |  Radius of the capsule in meters.  |
| **Dimensions (Box Only)** |  The x, y, and z dimensions of the box in meters.  |

### Maximum Slope Angle 

The maximum slope angle is the largest slope that the character controller can climb. The character cannot move in directions that exceed this slope. If the character is standing on a slope above the maximum slope angle, its behavior depends on the slope behavior setting. The range of values allowed in the **Entity Inspector** is from `0` to `89` degrees.

### Step Height 

The maximum slope angle determines the step height that the controller can climb.

**Example**
Capsule controllers might be able to climb steps slightly higher than the step height because the curved bottom can slide upwards on steps. Refer to the following image:

![Step height determines the height of steps that the controller can climb.](/images/user-guide/component/physx/component-physx-character-controller-6.png)

### Contact Offset 

The contact offset is the distance padding between the collider shape and the contact surface. The contact offset allows the simulation to provide smoother collision behavior.

{{< note >}}
The contact offset is included in the calculation for the foot position.
{{< /note >}}

**Example**
In the editor debug draw for the **PhysX Character Controller** component, the effect of the contact offset is represented by the wireframe that surrounds the solid shape of the collider, as in the following image.

![Wireframe showing the contact offset for a PhysX Character Controller in the O3DE Editor viewport.](/images/user-guide/component/physx/component-physx-character-controller-7.png)

### Shape 

You can use character controller collider with the following shapes:
+ Capsule
+ Box

Use the **Shape** property in the **Entity Inspector** to choose the desired shape. When you do so, the relevant dimensions are displayed for editing. The dimension settings are identical to the capsule and box options for the **[PhysX Collider](/docs/user-guide/components/reference/physx/collider/)** component.

## Differences Between PhysX and Legacy Character Physics Components 

Character controllers are usually **kinematic** or **dynamic**. Dynamic character controllers are controlled through their velocity or by applying forces. Kinematic character controllers are controlled directly by position. Each controller type has advantages and disadvantages.

For more information, see [Character Controllers](https://docs.nvidia.com/gameworks/content/gameworkslibrary/physx/guide/3.3.4/Manual/CharacterControllers.html) in the NVIDIA documentation.

Because the **PhysX Character Controller** component is kinematic and not affected by outside forces, it is not affected by gravity out of the box. This separation allows you to use Script Canvas or C++ to implement custom behavior for gravity and other effects, since that behavior is likely to be highly game-specific. For example implementations of some gameplay features such as gravity, see the **[PhysX Character Gameplay](/docs/user-guide/components/reference/physx/character-gameplay/)** component. Kinematic controllers behave as if they have infinite mass when dynamic objects collide with them. Your custom gameplay logic determines how the controller responds to collisions such as the recoil from heavy impacts.
