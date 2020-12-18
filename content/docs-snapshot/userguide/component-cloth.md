# Cloth<a name="component-cloth"></a>


****  

|  | 
| --- |
| This feature is an [experimental](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#experimental) release and is subject to change\.  | 

The **Cloth** component treats the vertices of any mesh that it references as particles and applies physical properties, forces, and constraints to simulate the behavior of cloth\. You can add this component to any entity that has **Mesh** or **Actor** components\. 
+ [Cloth Component Properties](#component-cloth-properties) 
+ [Debug Visualization](#component-cloth-debug-visualization) 
+ [References](#component-cloth-references) 

## Cloth Component Properties<a name="component-cloth-properties"></a>

### Base Properties<a name="component-cloth-base-properties"></a>

Set the core behavior of the cloth simulation\.

![\[Base properties of the Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-A-1.23.png)

**Mesh node**  
A list of meshes to simulate as cloth\. The meshes available in the list that have **Cloth** modifiers applied in the **Scene Settings** tool\. 

**Mass**  
Scale multiplier applied to the mass of all particles associated with this cloth component\. Setting this parameter to **0\.0** makes all particles static\. 

**Custom Gravity**  
Enable to override global gravity and set a custom gravity value for this cloth modifier\. 

**Gravity**  
With **Custom Gravity** enabled, this value is used for gravity for this cloth simulation\. The default, **\-9\.81** on the Z axis, is standard gravity\. 

**Gravity Scale**  
Scale multiplier applied to the gravity of all particles\.

**Animation Blending**  
Blend factor for cloth applied to meshes that also have skinned animation\.   
**0\.0**: Cloth mesh is fully simulated\.   
**1\.0**: Cloth mesh is fully animated\.   
This property is available only when the **Cloth** component is applied to an **Entity** containing an **Actor** component\. 

**Stiffness frequency**  
An exponent that adjusts the overall stiffness of the cloth simulation\. This exponent is applied per second to the damping, damping linear and angular drag, wind drag and lift, self collision stiffness, fabric stiffness, fabric compression, fabric stretch and tether constraint stiffness properties described in the following sections\.

### Damping Properties Group<a name="component-cloth-damping-properties"></a>

Adjust the decay of particle velocities over time\.

![\[Damping properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-B-1.23.png)

**Damping**  
Damps particle velocity\.   
**0\.0**: Velocity is unaffected\.   
**1\.0**: Velocity is zeroed\. 

**Linear Drag**  
Portion of velocity applied to particles\.   
**0\.0**: Particles are unaffected\.   
**1\.0**: Global particle velocity is damped\. 

**Angular Drag**  
Portion of angular velocity applied to turning particles\.   
**0\.0**: Particles are unaffected\.   
**1\.0**: Global particle angular velocity is damped\. 

### Inertia Properties Group<a name="component-cloth-inertia-properties"></a>

Adjust particle acceleration\. 

![\[Inertia properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-C-1.23.png)

**Linear**  
Portion of linear acceleration applied to particles\.   
**0\.0**: Particles are unaffected\.   
**1\.0**: Physically correct linear acceleration\. 

**Angular**  
Portion of angular acceleration applied to turning particles\.   
**0\.0**: Particles are unaffected\.   
**1\.0**: Physically correct angular acceleration\. 

**Centrifugal**  
Portion of angular velocity applied to turning particles\.   
**0\.0**: Particles are unaffected\.   
**1\.0**: Physically correct angular velocity\. 

### Wind Properties Group<a name="component-cloth-wind-properties"></a>

Create a wind force to act on the cloth simulation\. 

![\[Wind properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-D-1.23.png)

**Velocity**  
Wind vector \(direction and magnitude\) in world coordinates\. A greater magnitude applies a stronger wind force\.   
The wind **Velocity** property is disabled when both the below air drag and lift coefficients are **0\.0**\. 

**Air drag coefficient**  
Specifies how much drag air applies to the particles\.

**Air lift coefficient**  
Specifies how much lift air applies to the particles\.

**Air Density**  
The density of air used for drag and lift calculations\.

### Collision Properties Group<a name="component-cloth-collision-properties"></a>

Adjust the effect of collisions with other PhysX colliders\.

![\[Collision properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-E-1.23.png)

**Friction**  
Controls the amount of friction between particles and colliders\.   
**0\.0**: **Friction** disabled\. 

**Mass scale**  
Controls how quickly particle mass is increased during collisions\.   
**0\.0**: **Mass scale** disabled\. 

**Continuous detection**  
Continuous collision detection improves collision by computing the time of impact between cloth particles and colliders\.   
The increase in quality can impact performance\. We recommend that you use **Continuous detection** only when necessary\. 

### Self Collision Properties Group<a name="component-cloth-self-collision-properties"></a>

Enable and adjust the effect of the cloth colliding with itself\.

![\[Self collision properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-F-1.23.png)

**Distance**  
The minimum distance that the colliding particles must maintain from each other in meters\.   
**0\.0**: **Self collision** disabled\. 

**Stiffness**  
Stiffness for the self collision constraints\.   
**0\.0**: **Self collision** disabled\. 

### Fabric Stiffness Properties Group<a name="component-cloth-fabric-stiffness-properties"></a>

Adjust the stiffness of the cloth\. As values for these properties approach **1\.0**, the more heavy and stiff the cloth appears\. 

![\[Fabric stiffness properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-G-1.23.png)

**Horizontal**  
Stiffness value for horizontal constraints\. This value defines how much a cloth stretches and compresses horizontally\.   
**0\.0**: No horizontal compression and stretch constraints\. 

**Horizontal multiplier**  
Scale value for horizontal compression and stretch constraints\.   
**0\.0**: No horizontal compression and stretch limits applied\.   
**1\.0**: Fully apply horizontal compression and stretch limits\. 

**Vertical**  
Stiffness value for vertical constraints\. This value defines how much a cloth stretches and compresses vertically\.   
**0\.0**: No vertical compression and stretch constraints\. 

**Vertical multiplier**  
Scale value for vertical compression and stretch constraints\.   
**0\.0**: No horizontal compression and stretch limits applied\.   
**1\.0**: Fully apply horizontal compression and stretch limits\. 

**Bending**  
Stiffness value for bending constraints\. This value defines how easily a cloth folds on itself\.   
**0\.0**: No bending constraints\. 

**Bending multiplier**  
Scale value for bending constraints\.   
**0\.0**: No bending limits applied\.   
**1\.0**: Fully apply bending limits\. 

**Shearing**  
Stiffness value for shearing constraints\. This value defines how easily a cloth twists\.   
**0\.0**: No shearing constraints\. 

**Shearing multiplie**  
Scale value for shearing constraints\.   
**0\.0**: No shearing limits applied\.   
**1\.0**: Fully apply shearing limits\. 

### Fabric Compression Properties Group<a name="component-cloth-fabric-compression-properties"></a>

Set the compression limits for fabric\.

![\[Fabric Compression properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-H-1.23.png)

**Horizontal limit**  
Compression limit for horizontal constraints\. This property is affected by **Horizontal multiplier** in the **Fabric stiffness** property group\.   
**0\.0**: Horizontal compression disabled\. 

**Vertical limit**  
Compression limit for vertical constraints\. This property is affected by **Vertical multiplier** in the **Fabric stiffness** property group\.   
**0\.0**: Vertical compression disabled\. 

**Bending limit**  
Compression limit for bending constraints\. This property is affected by **Bending multiplier** in the **Fabric stiffness** property group\.   
**0\.0**: Bending compression disabled\. 

**Shearing limit**  
Compression limit for shearing constraints\. This property is affected by **Shearing multiplier** in the **Fabric stiffness** property group\.   
**0\.0**: Shearing compression disabled\. 

### Fabric Stretch Properties Group<a name="component-cloth-fabric-stretch-properties"></a>

Set the stretch limits for fabric\.

**Note**  
For these properties, reduce **Stiffness** of **Tether constraints** or increase its **Scale** to allow cloth to stretch\. 

![\[Fabric stretch properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-I-1.23.png)

**Horizontal limit**  
Stretch limit for horizontal constraints\. This property is affected by **Horizontal multiplier** in the **Fabric stiffness** property group\.   
**0\.0**: Horizontal stretch disabled\. 

**Vertical limit**  
Stretch limit for vertical constraints\. This property is affected by **Vertical multiplier** in the **Fabric stiffness** property group\.   
**0\.0**: Vertical stretch disabled\. 

**Bending limit**  
Stretch limit for bending constraints\. This property is affected by **Bending multiplier** in the **Fabric stiffness** property group\.   
**0\.0**: Bending stretch disabled\. 

**Shearing limit**  
Stretch limit for shearing constraints\. This property is affected by **Shearing multiplier** in the **Fabric stiffness** property group\.   
**0\.0**: Shearing stretch disabled\. 

### Tether Constraints Properties Group<a name="component-cloth-tether-constraints-properties"></a>

Adjust the stiffness for tether constraints between particles with mass values and static particles\.

![\[Tether constraints properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-J-1.23.png)

**Stiffness**  
Stiffness for tether constraints\.   
**0\.0**: Tether constraints disabled\.   
**1\.0**: Tether constraints behave like springs\. 

**Scale**  
Scale factor for tether constraint **Stiffness** 

### Quality Properties Group<a name="component-cloth-quality-properties"></a>

Set the overall quality of the cloth simulation\.

![\[Quality properties of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-K-1.23.png)

**Solver frequency**  
Target solver iterations per second\. The executed number of iterations per second may vary dependent on many performance factors\. However, at least one iteration per frame is solved regardless of the value set\. 

**Acceleration filter iterations**  
Number of iterations to average the delta time factor used for gravity and external acceleration\. 

## Debug Visualization<a name="component-cloth-debug-visualization"></a>

![\[Debug visualization of the NVIDIA Cloth component\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/nvidiacloth/ui-cloth-component-debug-1.23.png)

To enable the debug visualization of cloth, use these CVARs in the Editor Console 

*cloth\_debugDraw*  
Draw the cloth mesh wireframe\.   
**0**: Disable wireframe display\.   
**1**: Enable wireframe display\. 

*cloth\_DebugDrawNormals*  
Draw the cloth mesh normals\.   
**0**: Disable normals display\.   
**1**: Enable normals display\.   
**2**: Enable normals, tangents and bitangents display\. 

*cloth\_DebugDrawColliders*  
Draw the cloth colliders\.   
**0**: Disable collider display\.   
**1**: Enable collider display\. 

## References<a name="component-cloth-references"></a>

 [Nvidia NvCloth Documentation](https://gameworksdocs.nvidia.com/NvCloth/1.1/index.html) 

**Topics**
+ [Cloth Component Properties](#component-cloth-properties)
+ [Debug Visualization](#component-cloth-debug-visualization)
+ [References](#component-cloth-references)
+ [Cloth Simulation](tutorial-cloth-simulation.md)
+ [Create Cloth for Environments](tutorial-cloth-environment.md)
+ [Create Cloth for Characters](tutorial-cloth-characters.md)