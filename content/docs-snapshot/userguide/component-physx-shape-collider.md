# PhysX Shape Collider<a name="component-physx-shape-collider"></a>

The **PhysX Shape Collider** component creates NVIDIA PhysX simulation collider geometry based on the shape definition supplied by a **Shape** component\. The PhysX Shape Collider supports the following Shape components: 
+  [Box](component-shapes.md#box-shape-component-properties) 
+  [Capsule](component-shapes.md#capsule-shape-component-properties) 
+  [Polygon Prism](component-polygon-prism.md) 
+  [Sphere](component-shapes.md#sphere-shape-component-properties) 

**Note**  
The **PhysX Shape Collider** component attached to an entity with a supported Shape component creates a static \(non\-moving\) entity\. To create a dynamic \(moving\) entity, you also must add a [PhysX Rigid Body](component-physx-rigid-body-physics.md) component\. 

Although the PhysX Shape Collider is similar to the [PhysX Collider](component-physx-collider.md) component, you might want to use the PhysX Shape Collider instead in these scenarios: 
+  The shape information defined by the Shape component is used elsewhere in code or script\. For example, the shape defines another volume, such as an audio volume or fog volume, and you want to keep the collider geometry and volume synchronized\. 
+  You want to use a Shape component such as [Polygon Prism Shape](component-polygon-prism.md) that is not provided by PhysX Collider\. 
+  You have existing Shape components and don't want to migrate them to use PhysX Collider components\. 

The PhysX Shape Collider component has some limitations compared to the PhysX Collider component: 
+  Only one Shape component can be used per entity, and so only one PhysX Shape Collider component is supported per entity\. Any number of PhysX Collider components can also be used on the same entity, however\. 
+  The position and rotation of the PhysX Shape Collider component can't be offset relative to the entity position\. 

To use the PhysX Shape Collider component you must enable [PhysX](gems-system-gem-physx.md) gem in your project\.

For more information, see [Simulating physics behavior with the PhysX system](physx-intro.md)\.

**Topics**
+ [PhysX Shape Collider properties](#component-physx-shape-collider-properties)
+ [Complex polygon prism shapes](#complex-polygon-prism-shapes)
+ [Colliders as triggers](#colliders-as-triggers)

## PhysX Shape Collider properties<a name="component-physx-shape-collider-properties"></a>

![\[PhysX Shape Collider component interface.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-shape-collider-A-1.24.png)

****Collision Layer****  
The collision layer that's assigned to this shape collider\. For more information, see [Collision Layers](physx-configuration-collision-layers.md)\. 

****Collides With****  
The collision group containing the layers that this shape collider collides with\. For more information, see [Collision Groups](physx-configuration-collision-groups.md)\. 

****Trigger****  
Set this shape collider as a trigger\. A trigger performs a quick overlap test and does not apply forces or return contact point information\. Use this to speed up PhysX computations where a simple overlap between colliders is sufficient\.   
Trigger Area components are legacy components and cannot be used with PhysX Shape Collider\.

****Physics Material \- Library****  
Set the physics material library for this shape collider\. 

****Physics Material \- Mesh Surfaces****  
Choose a material from the physics material library for this shape collider\. 

****Tag****  
Set a tag for this shape collider\. Tags can be used to quickly identify components in script or code\. 

****Draw collider****  
Render this shape collider in the viewport\. Enabled by default\. 

## Complex polygon prism shapes<a name="complex-polygon-prism-shapes"></a>

The [Polygon Prism Shape](component-polygon-prism.md) is automatically subdivided into convex portions, which means that polygon prisms can be used with dynamic rigid bodies or as triggers in PhysX\. The subdivision is automatically updated if the vertices of the polygon prism are modified\. 

![\[A complex polygon prism can't be converted to convex geometry.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-shape-collider-B-1.24.png)

If the vertices are modified so that the polygon prism is no longer a simple polygon, for example, if the polygon prism is self\-intersecting, it isn't possible to subdivide the polygon prism into convex pieces\. An error will display in the Editor Console, as shown in the following example\. 

![\[A complex polygon prism console error.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/physx/physx/ui-physx-shape-collider-C-1.24.png)

## Colliders as triggers<a name="colliders-as-triggers"></a>

Triggers allow colliders to perform efficient overlap tests\. Colliders marked as triggers won't have forces applied when they intersect with another collider\. This is useful for detecting when something enters a certain area or when two objects overlap\. Use Lua or Script Canvas to detect overlap\.

**Note**  
Because triggers don't perform contact resolution, the contact points between a trigger and another collider aren't available\.   
Trigger Area components are legacy components and cannot be used with PhysX Shape Collider\.