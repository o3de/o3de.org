---
linkTitle: Non-uniform Scale
description: ' Use the Non-uniform Scale component to scale an entity by different amounts along each axis. '
title: Non-uniform Scale Component
---

The **Non-uniform Scale** component allows entities to be scaled by different amounts along each local axis. It can be added by clicking the **Add non-uniform scale** button on the [Transform](/docs/user-guide/components/reference/transform/) component.

The **Non-uniform Scale** component is incompatible with certain other components which cannot be non-uniformly scaled without fundamentally changing their character. For example, it is incompatible with [Sphere Shape](/docs/user-guide/components/reference/shape/sphere-shape/) component because non-uniformly scaling a sphere would result in an ellipsoid and break the characteristic symmetry of the sphere.

To avoid problems with skew, non-uniform scale is only applied to the current entity and does not propagate to its children.

## Compatible components
The following components are **compatible** with **Non-uniform Scale**:
+ **[Box Shape](/docs/user-guide/components/reference/shape/box-shape/)**
+ **[Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/)**
+ **[Quad Shape](/docs/user-guide/components/reference/shape/quad-shape/)**
+ **[PhysX Collider](/docs/user-guide/components/reference/physx/collider/)** - Note that primitive colliders are replaced with convex approximations if they are non-uniformly scaled, which may slightly deteriorate performance. The level of detail of the convex approximation can be adjusted using the **Subdivision level** setting on the [PhysX Collider](/docs/user-guide/components/reference/physx/collider/) component.
+ **[PhysX Shape Collider](/docs/user-guide/components/reference/physx/shape-collider/)**
+ **[PhysX Rigid Body](/docs/user-guide/components/reference/physx/rigid-body/)**
+ **[PhysX Force Region](/docs/user-guide/components/reference/physx/force-region/)**
+ **[Decal](/docs/user-guide/components/reference/atom/decal/)**
+ **Mesh**

## Incompatible components
The following components are **incompatible** with the **Non-uniform Scale** component because non-uniform scaling would break fundamental assumptions made by the components or because they would require major work to properly support non-uniform scale:
+ **[Capsule Shape](/docs/user-guide/components/reference/shape/capsule-shape/)**
+ **[Compound Shape](/docs/user-guide/components/reference/shape/compound-shape/)**
+ **[Cylinder Shape](/docs/user-guide/components/reference/shape/cylinder-shape/)**
+ **[Disk Shape](/docs/user-guide/components/reference/shape/disk-shape/)**
+ **[Sphere Shape](/docs/user-guide/components/reference/shape/sphere-shape/)**
+ **[Tube Shape](/docs/user-guide/components/reference/shape/tube-shape/)**
+ **Cloth**
+ **[PhysX Ball Joint](/docs/user-guide/components/reference/physx/ball-joint/)**
+ **[PhysX Fixed Joint](/docs/user-guide/components/reference/physx/fixed-joint/)**
+ **[PhysX Hinge Joint](/docs/user-guide/components/reference/physx/hinge-joint/)**
+ **[PhysX Ragdoll](/docs/user-guide/components/reference/physx/ragdoll/)**
+ **[PhysX Character Controller](/docs/user-guide/components/reference/physx/character-controller/)**
+ **PhysX Character Gameplay**
+ **[Attachment](/docs/user-guide/components/reference/animation/attachment/)**
+ **[Actor](/docs/user-guide/components/reference/animation/actor/)**
+ **[Simple Motion](/docs/user-guide/components/reference/animation/simple-motion/)**
+ **Fly Camera Input**
+ **HDRi Skybox**
+ **Physical Sky**
<!-- + **[Blast Family](/docs/user-guide/components/reference/destruction/blast-family/)** -->
<!-- + **[Blast Family Mesh Data](/docs/user-guide/components/reference/destruction/blast-family-mesh-data/)** -->

The following components are currently **incompatible** because they are not yet supported, but do not have fundamental reasons making compatibility difficult to add:
+ **Sequence**
+ **[Spline](/docs/user-guide/components/reference/shape/spline/)**
+ **[White Box](/docs/user-guide/components/reference/shape/white-box/)**
+ **[White Box Collider](/docs/user-guide/components/reference/shape/white-box-collider/)**
+ **Diffuse Probe Grid**
+ **Reflection Probe**

## EBus Request Bus Interface
**NonUniformScaleRequestBus** is the request bus for the **Non-uniform Scale** component.

For more information about using the event bus (EBus) interface, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).

Use the following request functions with the EBus interface to communicate with other components.

### GetScale

Returns the entity's non-uniform scale.

**Parameters**
None

**Return**
Entity's non-uniform scale value.
Type: Vector3

### SetScale

Sets the entity's non-uniform scale.

**Parameters**
New non-uniform scale value.
Type: Vector3

**Return**
None

### RegisterScaleChangedEvent

Registers a handler for the **[AZ::Event](/docs/user-guide/programming/messaging/az-event/)** raised when the entity's non-uniform scale is changed.

**Parameters**
Handler for non-uniform scale change events.
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
