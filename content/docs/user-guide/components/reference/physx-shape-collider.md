---
description: ' Use the PhysX Shape Collider component to define where collision
  detection and response occur in Open 3D Engine. '
title: 'PhysX Shape Collider'
---

{{< preview-migrated >}}

The **PhysX Shape Collider** component creates NVIDIA PhysX simulation collider geometry based on the shape definition supplied by a **Shape** component\. The PhysX Shape Collider supports the following Shape components:
+  [Box Shape](/docs/user-guide/components/reference/shape/box-shape/)
+  [Capsule Shape](/docs/user-guide/components/reference/shape/capsule-shape/)
+  [Cylinder Shape](/docs/user-guide/components/reference/shape/cylinder-shape/)
+  [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/)
+  [Sphere Shape](/docs/user-guide/components/reference/shape/sphere-shape/)

**Note**
The **PhysX Shape Collider** component attached to an entity with a supported Shape component creates a static \(non\-moving\) entity\. To create a dynamic \(moving\) entity, you also must add a [PhysX Rigid Body](/docs/user-guide/components/reference/physx-rigid-body-physics/) component\.

Although the PhysX Shape Collider is similar to the [PhysX Collider](/docs/user-guide/components/reference/physx-collider/) component, you might want to use the PhysX Shape Collider instead in these scenarios:
+  The shape information defined by the Shape component is used elsewhere in code or script\. For example, the shape defines another volume, such as an audio volume or fog volume, and you want to keep the collider geometry and volume synchronized\.
+  You want to use a Shape component such as [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/) that is not provided by PhysX Collider\.
+  You have existing Shape components and don't want to migrate them to use PhysX Collider components\.

The PhysX Shape Collider component has some limitations compared to the PhysX Collider component:
+  Only one Shape component can be used per entity, and so only one PhysX Shape Collider component is supported per entity\. Any number of PhysX Collider components can also be used on the same entity, however\.
+  The position and rotation of the PhysX Shape Collider component can't be offset relative to the entity position\.

To use the PhysX Shape Collider component you must enable [PhysX](/docs/user-guide/gems/reference/physx/) gem in your project\.

For more information, see [Simulating physics behavior with the PhysX system](/docs/user-guide/interactivity/physics/nvidia-physx/)\.

**Topics**
- [PhysX Shape Collider {#component-physx-shape-collider}](#physx-shape-collider)
  - [PhysX Shape Collider properties {#component-physx-shape-collider-properties}](#physx-shape-collider-properties)
  - [Complex polygon prism shapes {#complex-polygon-prism-shapes}](#complex-polygon-prism-shapes)
  - [Colliders as triggers {#colliders-as-triggers}](#colliders-as-triggers)

## PhysX Shape Collider properties {#component-physx-shape-collider-properties}

![\[PhysX Shape Collider component interface.\]](/images/user-guide/component/physx/physx/ui-physx-shape-collider-A.png)

****Collision Layer****
The collision layer that's assigned to this shape collider\. For more information, see [Collision Layers](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-layers/)\.

****Collides With****
The collision group containing the layers that this shape collider collides with\. For more information, see [Collision Groups](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-groups/)\.

****Trigger****
When enabled, this shape collider functions as a trigger\. A trigger performs a quick overlap test and does not apply forces or return contact point information\. Use this to speed up PhysX computations where a simple overlap between colliders is sufficient\.
Trigger Area components are legacy components and cannot be used with PhysX Shape Collider\.

****Simulated****
When enabled, this shape collider will be part of the physics simulation\.

****In Scene Queries****
When enabled, this shape collider can be queried for raycasts, shapecasts and overlap\.

****Library (Physics Materials)****
The physics material library of the project\.

****Slot (Physics Materials)****
Choose a physics material for this shape collider\.

****Tag****
Set a tag for this shape collider\. Tags can be used to quickly identify components in script or code\.

****Rest offset****
PhysX bodies come to rest separated by the sum of their rest offset values\. The **Rest offset** value must be less than the **Contact offset** value\. Valid values rage from **\-Infinity** to **50**\.

****Contact offset****
PhysX bodies generate contacts when they are within the sum of their contact offset values\. The **Contact offset** value must be greater than the **Rest offset** value\. Valid values rage from **0** to **50**\.

****Draw collider****
Render this shape collider in the viewport\. Enabled by default\.

## Complex polygon prism shapes {#complex-polygon-prism-shapes}

The [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/) is automatically subdivided into convex portions, which means that polygon prisms can be used with dynamic rigid bodies or as triggers in PhysX\. The subdivision is automatically updated if the vertices of the polygon prism are modified\.

![\[A complex polygon prism can't be converted to convex geometry.\]](/images/user-guide/component/physx/physx/ui-physx-shape-collider-B.png)

If the vertices are modified so that the polygon prism is no longer a simple polygon, for example, if the polygon prism is self\-intersecting, it isn't possible to subdivide the polygon prism into convex pieces\. An error will display in the Editor Console, as shown in the following example\.

![\[A complex polygon prism console error.\]](/images/user-guide/component/physx/physx/ui-physx-shape-collider-C.png)

## Colliders as triggers {#colliders-as-triggers}

Triggers allow colliders to perform efficient overlap tests\. Colliders marked as triggers won't have forces applied when they intersect with another collider\. This is useful for detecting when something enters a certain area or when two objects overlap\. Use Lua or Script Canvas to detect overlap\.

**Note**
Because triggers don't perform contact resolution, the contact points between a trigger and another collider aren't available\.
Trigger Area components are legacy components and cannot be used with PhysX Shape Collider\.
