---
description: ' Add colliders to actors in Open 3D Engine for NVIDIA Cloth simulations. '
title: Add Cloth Colliders to actors
---

{{< preview-migrated >}}

|  |
| --- |
| This feature is an [experimental](/docs/userguide/ly-glos-chap#experimental) release and is subject to change.  |

Applying cloth simulation to actors adds realism and dynamism in their every movement. Adding cloth colliders greatly enhances the effect. Cloth colliders can prevent cloth from penetrating into the meshes of the actor. To add cloth colliders, you must enable the NVIDIA Cloth Gem.

For more information, see the [NVIDIA Cloth Gem documentation](/docs/user-guide/interactivity/physics/nvidia-cloth/_index.md).

## Add Cloth Colliders to an actor 

1. In O3DE Editor, choose **Tools**, **Animation Editor**.

1. In the **Animation Editor**, on the right side of the menu bar, choose **Physics** from the drop-down list. This changes the layout.

1. Choose **File**, **Open Actor**, and select your actor.

1. In the **Skeleton Outliner**, select the joint that you want to add the cloth collider to.

1. Right-click the selected joint, and then choose **Cloth**, **Add collider**. You can add colliders (capsules or spheres). You can also copy them from Hit Detection, Ragdolls or Simulated Objects.
![\[Add cloth collider to character.\]](/images/user-guide/actor-animation/nvidiacloth/ui-cloth-add-collider.png)

1. The **Cloth Colliders** tab shows you the list of cloth colliders of the selected joint.

1. Adjust the dimensions, offset, and rotation of cloth colliders.
![\[Adjust cloth collider added to character.\]](/images/user-guide/actor-animation/nvidiacloth/ui-cloth-adjust-collider.png)

1. Choose **File**, **Save Selected Actors**.
