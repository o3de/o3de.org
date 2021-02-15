---
description: ' Use shape components in Amazon Lumberyard to provide shape facilities for trigger
  volumes, collision volumes, audio area ambiances, and audio areas. '
title: 'Shapes: Cylinder, Capsule, Disk, Box, Sphere, Compound'
---
# Shapes: Cylinder, Capsule, Disk, Box, Sphere, Compound {#component-shapes}

Add shape components to entities that have other components that require shapes\.

For example, add shape components to your entities to create volumes for the following:
+ Create a trigger volume using the**[Trigger Area](/docs/userguide/components/triggerarea.md)** component\. Entities that enter the volume trigger an action\.
+ Create a collision volume using the **[PhysX Collider](/docs/userguide/components/physx-collider.md)** component\. Entities that collide with the collision volume respond to the impact, such as slowing down or bouncing back\.
+ Define reverb or echo effects using the **[Audio Environment](/docs/userguide/components/audio-environment.md)** component\.
+ Create an audio area using the **[Audio Trigger](/docs/userguide/components/audio-trigger.md)** component so that a specific sound plays in that area of the level\.

**Note**
You can add only one shape component to an entity\. If you need more than one shape on an entity, create child entities\.

Each shape component provides a generic `ShapeService` that exposes functionality common to all shapes\. Each shape also provides a more specific service, such as `BoxShapeService` or `SphereShapeService`\.

The **Shape** component includes the following shapes and properties:

**Topics**
+ [Scaling Shapes](#component-shape-scaling)
+ [Box Shape Component Properties](#box-shape-component-properties)
+ [Capsule Shape Component Properties](#capsule-shape-component-properties)
+ [Compound Shape Component Properties](#compound-shape-component-properties)
+ [Cylinder Shape Component Properties](#cylinder-shape-component-properties)
+ [Disk Shape Component Properties](#disk-shape-component-properties)
+ [Sphere Shape Component Properties](#sphere-shape-component-properties)
+ [Request EBus Interface](#shape-component-ebuses)

## Scaling Shapes {#component-shape-scaling}

As a best practice, when you scale a shape, adjust the shape component's properties, such as its **Dimensions**, **Height**, and **Radius**\.

![\[Scale a Box Shape by adjusting its Dimensions values. Scale a Cylinder Shape by adjusting its Height and Radius values.\]](/images/userguide/component/component-shape-scaling-2.png)

**Tip**
Modify the shape component's properties instead using the [Scale tool](/docs/userguide/editor/toolbars#lumberyard-editor-toolbars-editmode), which changes the entity's **[Transform](/docs/userguide/components/transform.md)** component\.

**Example**
See the following examples for the different scaling:

1. In nonuniform scaling, adjusting an entity's transform scale leads to different values for **X**, **Y**, and **Z**\.

1. In uniform scaling, **X**, **Y**, and **Z** have the same value\.

1. In uniform normalized scaling, all of the scale values are `1`\.

![\[Nonuniform scaling (1), where X, Y, and Z have different values. Uniform scaling (2), where X, Y, and Z values are the same (in this case, 4). Uniform normalized scaling (3), where X, Y, and Z values are all 1.\]](/images/userguide/component/component-shape-scaling-1.png)
If an entity has been scaled nonuniformly, rendering and intersection tests use the largest component of the scale vector\. Although this can work, the best practice is to keep a uniform and, ideally, normalized \(`1`, `1`, `1`\) transform scale, as shown in the third example\.

## Box Shape Component Properties {#box-shape-component-properties}

![\[The box shape component properties in Lumberyard Editor.\]](/images/userguide/component/box-shape-component-properties.png)

The **Box Shape** component has the following properties\.


****

| Name | Description |
| --- | --- |
| Visible |  The component always appears in the viewport, even if the entity isn't selected\.   |
| Game View |  Renders the box shape in game mode in Lumberyard Editor\. To enter game mode, press **Ctrl\+G**\.  |
|  **Shape Color**  |  Specifies the color to render the shape\.  |
| Dimensions |  Defines dimensions of the shape along all three axes in local space\.  If the **[Transform](/docs/userguide/components/transform.md)** component applies a scale, these dimensions are multiplied by the same value\.  |
|  **Edit**  | Choose Edit, and the component is locked for editing\. For more information, see [Editing Components in the Viewport](/docs/userguide/edit-mode-for-components.md)\. |

The **Box Shape** component also has its own Component Mode with several linear manipulators for each axis\.

![\[Box Shape component in the viewport.\]](/images/userguide/component/component-box-shape.png)

## Capsule Shape Component Properties {#capsule-shape-component-properties}

![\[The Capsule Shape component properties in Lumberyard Editor.\]](/images/userguide/component/capsule-shape-component-properties.png)

The **Capsule Shape**component has the following properties\.


****

| Name | Description |
| --- | --- |
| Visible |  The component always appears in the viewport, even if the entity isn't selected\.   |
| Game View |  Renders the shape in game mode\. To enter game mode, press **Ctrl \+ G**\.  |
|  **Shape Color**  |  Specifies the color to render the shape\.  |
| Height |  The end\-to\-end height of the capsule, including the cylinder and both caps\.  If the **[Transform](/docs/userguide/components/transform.md)** component applies a scale, these dimensions are multiplied by the same value\.  |
| Radius |  The radius of the capsule\. If the **[Transform](/docs/userguide/components/transform.md)** component applies a scale, these dimensions are multiplied by the same value\.  |

## Compound Shape Component Properties {#compound-shape-component-properties}

![\[The Compound Shape component properties in Lumberyard Editor.\]](/images/userguide/component/compound-shape-component-properties.png)

With the **Compound Shape** component, you can combine shapes to create a complex object to generate a physics collider, trigger shape, or any other application of shapes\. The individual shapes might or might not be children of the entity with the **Compound Shape** component\.

**Note**
To move the shapes together with the compound shape, set them as child entities\.
To move the shapes independent of the entity with the compound shape, don't set them as child entities\.
For EBus \(event bus\) requests, compound shapes service the full shape component bus\. However, each individual shape that you add increases the cost of requests such as `IsPointInside`\.

See the following **Compound Shape** properties\.


****

| Name | Description |
| --- | --- |
| Child Shape Entities |  Specifies the entities and their shapes that make up the compound shape\. These entities might or might not be children of the entity with the compound shape\.  |

## Cylinder Shape Component Properties {#cylinder-shape-component-properties}

![\[The Cylinder Shape component properties in Lumberyard Editor.\]](/images/userguide/component/cylinder-shape-component-properties.png)

The **Cylinder Shape** component has the following properties\.


****

| Name | Description |
| --- | --- |
| Visible |  The component always appears in the viewport, even if the entity isn't selected\.   |
| Game View |  Renders the shape in game mode in Lumberyard Editor\. To enter game mode, press **Ctrl \+ G**\.  |
|  **Shape Color**  |  Specifies the color to render the shape\.  |
| Height |  The height of the cylinder\. If the **[Transform](/docs/userguide/components/transform.md)** component applies a scale, these dimensions are multiplied by the same value\.  |
| Radius |  The radius of the cylinder\. If the **[Transform](/docs/userguide/components/transform.md)** component applies a scale, these dimensions are multiplied by the same value\.  |

## Disk Shape Component Properties {#disk-shape-component-properties}

![\[See the disk shape component properties in Lumberyard Editor.\]](/images/userguide/component/disk-shape-component-properties.png)

See the following **Disk Shape** properties\.


****

| Name | Description |
| --- | --- |
| Visible |  The component always appears in the viewport, even if the entity isn't selected\.   |
| Game View |  Renders the shape in game mode in Lumberyard Editor\. To enter game mode, press **Ctrl \+ G**\.  |
|  **Shape Color**  |  Specifies the color to render the shape\.  |
| Radius |  The radius of the disk\.  If the **[Transform](/docs/userguide/components/transform.md)** component applies a scale, these dimensions are multiplied by the same value\.  |

## Sphere Shape Component Properties {#sphere-shape-component-properties}

![\[See the sphere shape component properties in Lumberyard Editor.\]](/images/userguide/component/sphere-shape-component-properties.png)

See the following **Sphere Shape** properties\.


****

| Name | Description |
| --- | --- |
| Visible |  The component always appears in the viewport, even if the entity isn't selected\.   |
| Game View |  Renders the shape in game mode in Lumberyard Editor\. To enter game mode, press **Ctrl \+ G**\.  |
|  **Shape Color**  |  Specifies the color to render the shape\.  |
| Radius |  The radius of the sphere\.  If the **[Transform](/docs/userguide/components/transform.md)** component applies a scale, these dimensions are multiplied by the same value\.  |

## Request EBus Interface {#shape-component-ebuses}

All shape components provide access to two separate request buses\. The first bus is the `ShapeComponentRequestsBus` that returns general information about the shape component\. The second bus is the [`ShapeNameComponentRequestsBus`](#component-shape-components-request-bus) that returns property configurations for the specified shape\.

Use the following request functions with the event bus interface to communicate with other components in your game\.

For more information, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

### ShapeComponentRequestsBus {#component-shape-ebus-request}

The following table describes the `ShapeComponentRequestsBus`\.


****

| Name | Description | Parameter  | Return | Scriptable |
| --- | --- | --- | --- | --- |
| DistanceFromPoint |  Returns the minimum distance between a specified point and the shape\.  |  `point` - Vector3 point to calculate distance from\.  |  Distance from point to shape\. Type: Float   | Yes |
| DistanceSquaredFromPoint |  Returns the minimum squared distance between a specified point and the shape\.  |  `point` - Vector3 point to calculate square distance from\.  |  Square distance from point to shape\. Type: Float   | Yes |
| GetEncompassingAabb |  Returns an `AABB` that encompasses the entire shape\.  | None | AZ::Aabb that encompasses the shape\. | No |
| GetShapeType | Returns the specified shape type for the component\. | None |  `AZ::Crc32(shape_name)` For example:  `AZ::Crc32("Box")` \| `AZ::Crc32("Sphere")` \| `AZ::Crc32("Capsule")` \| `AZ::Crc32("Cylinder")`  | Yes |
| IsPointInside |  Checks whether a specified point is inside or outside a shape\.  |  `point` - Vector3 point to check\.  |  Indicates whether the point is inside or outside the shape\. Type: Boolean   | Yes |

### ComponentRequestsBus {#component-shape-components-request-bus}

Each shape component has its own specific event bus for accessing that particular shape\. The buses have similar functions and only differ for the requested shape type\.

#### BoxShapeComponentRequestsBus {#box-shape-component-request-bus}


****

| Request Name | Description | Parameter  | Return | Scriptable |
| --- | --- | --- | --- | --- |
| GetBoxConfiguration | Returns the configuration of the BoxShape\. | None | BoxShapeConfiguration object that contains the configuration for the box shape\. | Yes |

#### CapsuleShapeComponentRequestsBus {#capsule-shape-component-request-bus}


****

| Request Name | Description | Parameter  | Return | Scriptable |
| --- | --- | --- | --- | --- |
| GetCapsuleConfiguration |  Returns the configuration of the `CapsuleShape`\.  | None |  `CapsuleShapeConfiguration` object that contains the configuration for the capsule shape\.  | Yes |

#### CompoundShapeComponentRequestsBus {#compound-shape-component-request-bus}


****

| Request Name | Description | Parameter  | Return | Scriptable |
| --- | --- | --- | --- | --- |
| GetCompoundShapeConfiguration |  Returns the configuration of the `CompoundShape`\.  | None |  `CompoundShapeConfiguration` object that contains the configuration for the compound shape\.  | Yes |

#### CylinderShapeComponentRequestsBus {#cylinder-shape-component-request-bus}


****

| Request Name | Description | Parameter  | Return | Scriptable |
| --- | --- | --- | --- | --- |
| GetCylinderConfiguration |  Returns the configuration of the `CylinderShape`\.  | None | CylinderShapeConfiguration object that contains configuration for the cylinder shape\. | Yes |

#### SphereShapeComponentRequestsBus {#sphere-shape-component-request-bus}


****

| Name | Description | Parameter  | Return | Scriptable |
| --- | --- | --- | --- | --- |
| GetSphereConfiguration |  Returns the configuration of the `SphereShape`\.  | None |  `SphereShapeConfiguration` object that contains the configuration for the sphere shape\.  | Yes |

### ShapeComponentNotificationsBus {#component-shape-ebusnotification}

All shapes share a single notification bus named `ShapeComponentNotificationsBus`\.


****

| Notification Name | Description | Parameter  | Return | Scriptable |
| --- | --- | --- | --- | --- |
| OnShapeChanged | Notifies listeners that the shape component has been updated\. |  `ShapeChangeReasons` - Indicates whether the shape was updated from a transform change or a shape parameter change\.  | Void | Yes |