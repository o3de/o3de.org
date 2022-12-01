---
linkTitle: White Box Collider
title: 'White Box Collider Component'
description: ' Use the White Box Collider component to add PhysX collision to white box meshes in Open 3D Engine (O3DE). '
---




You can enable collision on white box meshes in **Open 3D Engine (O3DE)** by adding the **White Box Collider** component to an entity that has a **White Box** component mesh. The White Box Collider component supports collision layers and physics materials. It can be used with static and kinematic white box meshes. The White Box Collider component uses the white box mesh as the collision surface. Unlike the **PhysX Collider** component, there is no need to specify a collision shape or provide a PhysX mesh asset.

![White Box static collider.](/images/user-guide/components/reference/shape/white-box-collider-A.gif)

In the image above, the White Box Collider component is added to an entity with a static White Box component. You can test for changes in collision immediately after editing the white box mesh.

## Provider

[White Box Gem](/docs/user-guide/gems/reference/design/white-box)

## Dependencies

[White Box component](./white-box)

## White Box Collider properties 

![White Box Collider component interface.](/images/user-guide/components/reference/shape/white-box-collider-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Collision Layer** | The collision layer that's assigned to the collider. For more information, see [Collision Layers](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-layers/). || `Default` |
| **Collides With** | The collision group containing the layers that this collider collides with. For more information, see [Collision Groups](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-groups/). || `All` |
| **Physics Materials** | Choose a physics material for this white box collider. | A `.physxmaterial` asset assigned. | `(default)` |
| **Tag** | Set a tag for this collider. Tags can be used to quickly identify components in script or code. | Crc32 | None |
| **Rest offset** | Bodies will come to rest separated by the sum of their **Rest offset** values. Must be less than **Contact offset**. | -Infinity to 50.0 | `0.0` |
| **Contact offset** | Bodies will begin to generate contacts when within the sum of their **Contact offset** values.  Must be greater than **Rest offset** | 0.0 - 50.0 | `0.02` |
| **Body Type** | Select `Static` for non-moving entities. Select `Kinematic` for animated entities. The White Box collider must be set to `Static` to interact with the **PhysX Character Controller**. | Static, Kinematic | `Static` |
