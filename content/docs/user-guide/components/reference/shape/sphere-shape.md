---
title: Sphere Shape component
linktitle: Sphere
description: ' Open 3D Engine (O3DE) Sphere Shape component reference. '
weight: 100
---



The **Sphere Shape** component creates a transparent sphere. The dimensions of the sphere can be edited with the **Radius** property. The Sphere Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for area lights, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/).

## Provider ##

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Properties ##

![Sphere Shape component properties](/images/user-guide/components/reference/shape/sphere-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the Shape component in the Perspective view, even when the entity is not selected. Disable to hide the Shape component when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the Shape component while in game mode in the editor. | Boolean | `Disabled` |
| **Shape Color** | The color of the Shape component. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Radius** | The radius of the Sphere Shape in meters. | 0 - Infinity | `0.5` |

## SphereShapeComponentRequestBus ##

Use the following request functions with the `SphereShapeComponentRequestBus` EBus interface to communicate with other components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetSphereConfiguration` | Returns the configuration of the sphere shape. | None | `SphereShapeConfiguration` object that contains the configuration for the sphere shape. | Yes |
