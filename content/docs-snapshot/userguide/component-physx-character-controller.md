# PhysX Character Controller<a name="component-physx-character-controller"></a>

You can use the **PhysX Character Controller** component to implement basic character interactions with the physical world\. For example, you can prevent characters from walking through walls or passing through terrain\. You can also control interactions with slopes and steps and manage interactions with other characters\.

The following diagram shows some of the features of the **PhysX Character Controller** component\. Because it is usually more convenient to work with a character's foot position, the entity position coincides with the base of the controller\. For details about the contact offset, see [Contact Offset](#component-physx-character-controller-contact-offset)\.

![\[Contact offset of a PhysX Character Controller component in the Lumberyard Editor viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/component-physx-character-controller-1.png)

The **PhysX Character Controller** component requires the [PhysX Characters](gems-system-gem-physx-characters.md) gem, which you can [enable](gems-system-using-project-configurator.md) in the Project Configurator\.

**Topics**
+ [Using the PhysX Character Controller Component](#component-physx-character-controller-using)
+ [PhysX Character Controller Properties](#component-physx-character-controller-properties)
+ [Differences Between PhysX and Legacy Character Physics Components](#component-physx-character-controller-vs-legacy)

## Using the PhysX Character Controller Component<a name="component-physx-character-controller-using"></a>

To use the **PhysX Character Controller** component, [add it to an entity](component-working-adding.md) that represents a character\.

![\[Using the Entity Inspector to add the PhysX Character Controller component to an entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/component-physx-character-controller-2.png)

You can control the character's movement by using Script Canvas, the C\+\+ API, or animation systems that use the C\+\+ API\.

## PhysX Character Controller Properties<a name="component-physx-character-controller-properties"></a>

You can configure the properties for the **PhysX Character Controller** component in the **[Entity Inspector](component-entity-inspector.md)**\.

![\[PhysX Character Controller component properties in the Entity Inspector.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/component-physx-character-controller-3.png)

The **PhysX Character Controller** has the following component properties\.


****  

| Property | Description | 
| --- | --- | 
|  **Collision Layer**  |  Collision layer assigned to the controller\. The default is **Default**\.  | 
|  **Collides With**  |  Collision layers that this character controller collides with\. Possible values are those that you define in the collision groups section of the PhysX configuration\.  You can specify the following values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-physx-character-controller.html)  The collision filters determine whether dynamic objects collide with the controller\. A separate set of filters control what objects can impede the character from moving\. The movement filters are currently hard\-coded so that static objects obstruct character movement\.   | 
| Material Library |  [PhysX material](physx-materials.md) assigned to this character controller\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-physx-character-controller.html)  | 
| Material Slot |  Specifies a material from the material library\. To select a material from the library, click the drop\-down list\. The default is the first value configured\.  If the material library is empty, this option does not appear and the default material values \(`0.5` and average for all parameters\) are used\.   | 
|  **[Maximum Slope Angle](#component-physx-character-controller-maximum-slope-angle)**  |  Angle in degrees of the largest slope that the character controller can climb\.   | 
|  **[Step Height](#component-physx-character-controller-step-height)**  |  Height of steps in meters that the character controller can traverse\.   | 
|  **Minimum Movement Distance**  |  Distance in meters below which the controller doesn't attempt to move\. Used to avoid jittering\.   | 
|  **Slope Behavior**  |  Behavior of the controller on surfaces above the maximum slope\.  You can specify the following values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-physx-character-controller.html) The default is **Prevent Climbing**\.  | 
| [Contact Offset](#component-physx-character-controller-contact-offset) |  Additional distance in meters beyond the controller that is monitored for potential contact\. Used for smoother contact resolution\.   | 
| Scale |  Scales the size of the collider created in PhysX relative to the dimensions specified for the controller\. A value slightly smaller than `1` is recommended\.  The default is `0.8`\.  | 
| [Shape](#component-physx-character-controller-shape) | Shape of the character controller\.You can specify the following values:[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-physx-character-controller.html)The default is Capsule\. | 
| Height \(Capsule Only\) |  Height of the capsule in meters\.  | 
| Radius \(Capsule Only\) |  Radius of the capsule in meters\.  | 
| Dimensions \(Box Only\) |  The x, y, and z dimensions of the box in meters\.  | 

### Maximum Slope Angle<a name="component-physx-character-controller-maximum-slope-angle"></a>

The maximum slope angle is the largest slope that the character controller can climb\. The character cannot move in directions that exceed this slope\. If the character is standing on a slope above the maximum slope angle, its behavior depends on the slope behavior setting\. The range of values allowed in the **Entity Inspector** is from `0` to `89` degrees\.

### Step Height<a name="component-physx-character-controller-step-height"></a>

The maximum slope angle determines the step height that the controller can climb\.

**Example**  
Capsule controllers might be able to climb steps slightly higher than the step height because the curved bottom can slide upwards on steps\. Refer to the following image:  

![\[Step height determines the height of steps that the controller can climb.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/component-physx-character-controller-6.png)

### Contact Offset<a name="component-physx-character-controller-contact-offset"></a>

The contact offset is the distance padding between the collider shape and the contact surface\. The contact offset allows the simulation to provide smoother collision behavior\.

**Note**  
The contact offset is included in the calculation for the foot position\.

**Example**  
In the editor debug draw for the **PhysX Character Controller** component, the effect of the contact offset is represented by the wireframe that surrounds the solid shape of the collider, as in the following image\.  

![\[Wireframe showing the contact offset for a PhysX Character Controller in the Lumberyard Editor viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/component-physx-character-controller-7.png)

### Shape<a name="component-physx-character-controller-shape"></a>

You can use character controller collider with the following shapes:
+ Capsule
+ Box

Use the **Shape** property in the **Entity Inspector** to choose the desired shape\. When you do so, the relevant dimensions are displayed for editing\. The dimension settings are identical to the capsule and box options for the **[PhysX Collider](component-physx-collider.md)** component\.

## Differences Between PhysX and Legacy Character Physics Components<a name="component-physx-character-controller-vs-legacy"></a>

Character controllers are usually **kinematic** or **dynamic**\. Dynamic character controllers are controlled through their velocity or by applying forces\. Kinematic character controllers are controlled directly by position\. Each controller type has advantages and disadvantages\. 

For more information, see [Character Controllers](https://docs.nvidia.com/gameworks/content/gameworkslibrary/physx/guide/3.3.4/Manual/CharacterControllers.html) in the NVIDIA documentation\.

In Lumberyard, the **PhysX Character Controller** component is kinematic\. The legacy [https://docs.aws.amazon.com/lumberyard/latest/legacyreference/component-physics-character.html](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/component-physics-character.html) component is dynamic\.

Because the **PhysX Character Controller** component is kinematic and not affected by outside forces, it is not affected by gravity out of the box\. This separation allows you to use Script Canvas or C\+\+ to implement custom behavior for gravity\. Kinematic controllers behave as if they have infinite mass when dynamic objects collide with them\. Your custom gameplay logic determines how the controller responds to collisions such as the recoil from heavy impacts\.