---
description: ' Use the Non-uniform Scale component to scale an entity by different amounts along each axis. '
title: Non-uniform Scale
---

The **Non-uniform Scale** component allows entities to be scaled by different amounts along each local axis. It can be added by clicking the **Add non-uniform scale** button on the [Transform](/docs/user-guide/components/reference/transform.md) component.

The **Non-uniform Scale** component is incompatible with certain other components which cannot be non-uniformly scaled without fundamentally changing their character. For example, it is incompatible with [Sphere Shape](/docs/user-guide/components/reference/shape/sphere-shape.md) component because non-uniformly scaling a sphere would result in an ellipsoid and break the characteristic symmetry of the sphere.

To avoid problems with skew, non-uniform scale is only applied to the current entity and does not propagate to its children.

## Compatible components
The following components are **compatible** with **Non-uniform Scale**:
+ **[Box Shape](/docs/user-guide/components/reference/shape/box-shape.md)**
+ **[Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape.md)**
+ **[Quad Shape](/docs/user-guide/components/reference/shape/quad-shape.md)**
+ **[PhysX Collider](/docs/user-guide/components/reference/physx-collider.md)** - Note that primitive colliders are replaced with convex approximations if they are non-uniformly scaled, which may slightly deteriorate performance. The level of detail of the convex approximation can be adjusted using the **Subdivision level** setting on the [PhysX Collider](/docs/user-guide/components/reference/physx-collider.md) component.
+ **[PhysX Shape Collider](/docs/user-guide/components/reference/physx-shape-collider.md)**
+ **[PhysX Rigid Body](/docs/user-guide/components/reference/physx-rigid-body-physics.md)**
+ **[PhysX Force Region](/docs/user-guide/components/reference/physx-force-region.md)**
+ **[Decal](/docs/user-guide/components/reference/atom/decal.md)**
+ **Mesh**

## Incompatible components
The following components are **incompatible** with the **Non-uniform Scale** component because non-uniform scaling would break fundamental assumptions made by the components or because they would require major work to properly support non-uniform scale:
+ **[Capsule Shape](/docs/user-guide/components/reference/shape/capsule-shape.md)**
+ **[Compound Shape](/docs/user-guide/components/reference/shape/compound-shape.md)**
+ **[Cylinder Shape](/docs/user-guide/components/reference/shape/cylinder-shape.md)**
+ **[Disk Shape](/docs/user-guide/components/reference/shape/disk-shape.md)**
+ **[Sphere Shape](/docs/user-guide/components/reference/shape/sphere-shape.md)**
+ **[Tube Shape](/docs/user-guide/components/reference/shape/tube-shape.md)**
+ **[Cloth](/docs/user-guide/components/reference/cloth.md)**
+ **[PhysX Ball Joint](/docs/user-guide/components/reference/physx-ball-joint.md)**
+ **[PhysX Fixed Joint](/docs/user-guide/components/reference/physx-fixed-joint.md)**
+ **[PhysX Hinge Joint](/docs/user-guide/components/reference/physx-hinge-joint.md)**
+ **[PhysX Ragdoll](/docs/user-guide/components/reference/physx-ragdoll.md)**
+ **[PhysX Character Controller](/docs/user-guide/components/reference/physx-character-controller.md)**
+ **PhysX Character Gameplay**
+ **[Blast Family](/docs/user-guide/components/reference/blast-family.md)**
+ **[Blast Family Mesh Data](/docs/user-guide/components/reference/blast-family-mesh-data.md)**
+ **[Attachment](/docs/user-guide/components/reference/attachment.md)**
+ **[Actor](/docs/user-guide/components/reference/actor.md)**
+ **[Simple Motion](/docs/user-guide/components/reference/simple-motion.md)**
+ **Fly Camera Input**
+ **HDRi Skybox**
+ **Physical Sky**

The following components are currently **incompatible** because they are not yet supported, but do not have fundamental reasons making compatibility difficult to add:
+ **Sequence**
+ **[Spline](/docs/user-guide/components/reference/shape/spline.md)**
+ **[White Box](/docs/user-guide/components/reference/white-box.md)**
+ **[White Box Collider](/docs/user-guide/components/reference/white-box-collider.md)**
+ **Diffuse Probe Grid**
+ **Reflection Probe**

## EBus Request Bus Interface
**NonUniformScaleRequestBus** is the request bus for the **Non-uniform Scale** component.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/user-guide/engine/ebus/_index.md)\.

Use the following request functions with the EBus interface to communicate with other components\.

### GetScale

Returns the entity's non-uniform scale\.

**Parameters**
None

**Return**
Entity's non-uniform scale value\.
Type: Vector3

### SetScale

Sets the entity's non-uniform scale\.

**Parameters**
New non-uniform scale value\.
Type: Vector3

**Return**
None

### RegisterScaleChangedEvent

Registers a handler for the **[AZ::Event](/docs/user-guide/engine/az-event.md)** raised when the entity's non-uniform scale is changed\.

**Parameters**
Handler for non-uniform scale change events\.
Type: NonUniformScaleChangedEvent::Handler

**Return**
None

## Editor Automation
The component type id for the editor **Non-uniform Scale** component can be accessed for editor automation using the following.
```
azlmbr.editor.EditorNonUniformScaleComponentTypeId
```

For example, a **Non-uniform Scale** component can be added and the scale modified as follows.

```
nonUniformScaleComponentId = azlmbr.editor.EditorNonUniformScaleComponentTypeId
azlmbr.editor.EditorComponentAPIBus(azlmbr.bus.Broadcast,'AddComponentsOfType', entityId, [nonUniformScaleComponentId])
azlmbr.entity.NonUniformScaleRequestBus(azlmbr.bus.Event, 'SetScale', entityId, azlmbr.math.Vector3(1.0, 2.0, 3.0))
```