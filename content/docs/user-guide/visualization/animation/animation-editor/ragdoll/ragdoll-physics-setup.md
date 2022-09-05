---
description: ' Setting up a ragdoll in the Open 3D Engine Animation Editor. '
title: Setting up a Ragdoll
---

{{< important >}}
There is currently no automatic way to prevent the physics geometry **PhysX Character Controller** component from colliding with the **PhysX Ragdoll** component, which can lead to unexpected behavior for the ragdoll. Collisions can be avoided by using [collision filtering](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-layers/) or by disabling the physics on the **PhysX Character Controller** component when the ragdoll is activated.
{{< /important >}}

When you set up a ragdoll, you do the following:
+ [Define joints for the ragdoll.](#step-1-define-joints-for-the-ragdoll)
+ [Add ragdoll colliders.](#step-2-add-ragdoll-colliders)
+ [Create joint limits.](#step-3-create-a-joint-limit)

In addition, your actor must have a motion extraction node. Your ragdoll must have a root node that is a direct child of the motion extraction node. For example, the Rin character uses `root` for its motion extraction node. For the ragdoll root node, the Rin character uses `'C_pelvis_JNT`, which is a child node of `root`.

While working on ragdoll setup, it can be useful to show or hide certain elements in the **Atom Render Window**. You can use the render options dropdown, represented by the ![Use the render options in the Atom Render Window to show or hide elements such as ragdoll colliders, joint limits and hit detection colliders](/images/user-guide/actor-animation/ragdoll-skeleton-render-options.svg) icon, to show or hide the **Ragdoll Colliders** (rendered in orange), **Ragdoll Joint Limits**, **Hit Detection Colliders** (rendered in blue), **Cloth Colliders** (rendered in purple), **Line Skeleton**, and other elements.

## Step 1: Define Joints for the Ragdoll 

Do the following to select the joints for your ragdoll. Usually you will want to include significantly fewer joints in the ragdoll than are present in the animation skeleton, as simulating small joints such as finger bones typically creates little benefit and incurs performance costs.

**To select joints for the ragdoll**

1. In O3DE Editor, choose **Tools**, **Animation Editor**.

1. In the **Animation Editor**, on the right side of the menu bar, choose **Physics** from the drop-down list. This changes the layout.

1. Choose **File**, **Open Actor** and select your actor.

1. In the **Skeleton Outliner**, multi-select the joints that you want to include in your ragdoll. You can also select individual joints by left clicking on the **Line Skeleton** view in the **Atom Render Window**.

1. Right-click one of the selected joints and then choose **Ragdoll**, **Add to ragdoll**.

    {{< note >}}
You can add joints to the ragdoll at any time.
{{< /note >}}
    {{< note >}}
If a joint is added to the ragdoll, all of its ancestors are automatically added as well. This can be useful as a quick way to add a complete hierarchy just by adding a few end effectors, e.g. joints in the hands, feet and head. Similarly if a joint is removed from the ragdoll, all of its descendants are also removed.
{{< /note >}}

![Add a selected joint to the ragdoll in the Skeleton Outliner in the Animation Editor](/images/user-guide/actor-animation/ragdoll-skeleton-outliner-add-to-ragdoll.png)

1. Click the filter icon next to the search text box, and select **Ragdoll joints and colliders**. This shows only the joints in the ragdoll and not the full animation skeleton.

![Use the Ragdoll joints and colliders filter to show only joints in the ragdoll in the Animation Editor](/images/user-guide/actor-animation/ragdoll-skeleton-outliner-ragdoll-joints-colliders-filter.png)

   The **Skeleton Outliner** displays icons to indicate that:
   + A joint is part of the ragdoll
   + A joint holds ragdoll colliders
   + A joint holds hit detection colliders
   + A joint holds cloth colliders

   ![Icons in the Skeleton Outliner show how joints are related to the ragdoll, ragdoll colliders, and hit detection colliders](/images/user-guide/actor-animation/ragdoll-skeleton-outliner-joint-icons.png)

1. In the **Atom Render Window**, use the render options dropdown, represented by the <span style="background-color:rgba(68, 68, 68, 255)">![Use the render options in the Atom Render Window to show or hide ragdoll colliders and joint limits and hit detection colliders](/images/user-guide/actor-animation/ragdoll-skeleton-render-options.svg)</span> icon, to show or hide the ragdoll colliders (rendered in orange), ragdoll joint limits, hit detection colliders (rendered in blue), and cloth colliders (rendered in purple).

    {{< note >}}
If your ragdoll colliders, hit detection colliders, or cloth colliders are the same size, you may need to hide the colliders that you are not working on.
{{< /note >}}

1. On the **Ragdoll** tab, you can view and modify the ragdoll properties for the selected joint. For example, the rigid body mass, sleeping threshold, and colliders.

![View and modify ragdoll properties for a selected joint on the Ragdoll tab in the Animation Editor](/images/user-guide/actor-animation/ragdoll-skeleton-ragdoll-tab-properties.png)

## Step 2: Add Ragdoll Colliders 

The ragdoll automatically suppresses collisions between joints that are adjacent in the skeleton. This means that adjacent colliders can overlap, but a pair of colliders that are not adjacent should not intersect. If the pair of colliders intersects, they'll collide when the ragdoll is simulated. This leads to unstable behaviour, because the colliding bodies are trying to separate, while the joints are trying to keep them together.

In the following example, the collider for the second spine joint (highlighted) can intersect with the first or third spine joint. The first and third spine joints, however, should not intersect.

![Example that shows how the collider for the second spine joint intersects with the first or third spine joint](/images/user-guide/actor-animation/ragdoll-collider-spine-joints-example.png)

If two joints which are not adjacent in the hierarchy have overlapping colliders, the colliders will be rendered in red. To resolve the overlap, you can resize the colliders or set the collision filters on them so that they do not collide with each other.

**To add a ragdoll collider**

1. In the **Animation Editor**, on the **Ragdoll** tab, click **Add ragdoll collider** and then choose **Add box**, **Add capsule**, or **Add sphere**.

![Add a ragdoll collider shape (box, capsule, or sphere) on the Ragdoll tab in the Animation Editor](/images/user-guide/actor-animation/add-ragdoll-collider-options.png)

1. On the **Ragdoll** tab, do the following in the collider properties:

   1. Set the **Offset** and **Rotation** to move the collider to the correct location. The **Offset** and **Rotation** are relative to the joint transform.

   1. Adjust the collider dimensions (for example, set the **Height** and **Radius** for a **Capsule**) to resize the collider.

   ![Set the Offset, Rotation, Height, and Radius properties for the collider on the Ragdoll tab in the Animation Editor](/images/user-guide/actor-animation/ragdoll-collider-options-offset-rotation-height-radius.png)

1. Choose **File**, **Save Selected Actors**. This saves the ragdoll data to the `.assetinfo` file for the character. The Asset Processor then bakes the ragdoll data into the `.actor` file.

## Step 3: Create a Joint Limit 

Joint limits are enabled for every joint in your ragdoll. This allows you to edit the joints and ensure they're set up correctly.

The following image shows joint limits that are set up correctly.

![Example that shows joint limits that are set up correctly](/images/user-guide/actor-animation/ragdoll-collider-joint-limits-example.png)

**To create a joint limit**

1. In the **Animation Editor**, in the **Atom Render Window**, adjust the child local rotation so that the red axis points along the bone.

1. Adjust the parent local rotation so that the red axis appears inside the swing cone.

1. Adjust the twist limit value so that the line appears inside the wedge.

![Example that shows the line for the twist limit value in the wedge](/images/user-guide/actor-animation/ragdoll-joint-limit-twist-limit-value.png)