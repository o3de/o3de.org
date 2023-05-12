---
description: ' Create realistic partial destruction simulations in Open 3D Engine with
  NVIDIA Blast. '
title: Partial destruction with NVIDIA Blast
weight: 500
draft: true
---

In some scenarios, you might want to partly destroy an entity. For example, you create a destructible wall, but want the bottom of the wall to remain in place as a static mesh with colliders after the top of the wall takes damage from a projectile and is destroyed. You can achieve this by adding **static** to the `name` primitive attribute of non-root mesh chunks in Houdini.

## Make non-root chunks static in NVIDIA Blast 

Use Houdini to make non-root chunks static, which results in partial destruction of the asset.

**To make non-root chunks static**

1. In Houdini, add an **Attribute String Edit** SOP to the network.

1. Wire the **Attribute String Edit** SOP into the network.

   1. Connect the output of the **Merge** SOP to the input of the **Attribute String Edit** SOP.

   1. Connect the output of the **Attribute String Edit** SOP to the input of the **Blast Export** SOP.

1. In the **Attribute String Edit** SOP, in the **Attributes** tab, enable the **Primitives** parameter, and select the **name** attribute from its list.

1. In the **Attribute String Edit** SOP, in the **Filter** tab, set the **From** parameter to the path name of a chunk you would like to make static, such as **root/chunk5**.

1. In the **Attribute String Edit** SOP, in the **Filter** tab, set the **To** parameter to the same path as above. Append **static** to the path; for example, **root/chunk5static**.

{{< important >}}
If the specified chunk has been fractured, its descendants are also static when exported to O3DE.
{{< /important >}}

1. You can add additional chunks to the **Attribute String Edit** SOP. Choose the **+** icon next to the **Number of filters** parameter to add a filter. Repeat steps **4** and **5** to make another chunk static.

   In the image below, the chunks that comprise the back half of the rabbit have been made static. Note that 12 filters have been added to the filter list in the **Attribute String Edit** SOP. You can see the renamed chunks in the groups and attributes overlay in the perspective viewport.

   ![Create static chunks in Houdini for NVIDIA Blast.](/images/user-guide/physx/blast/ui-blast-houdini-static-chunks.png)

1. Enable the **Static root** parameter in the **Blast Export** SOP before exporting the asset.

See the result simulation in O3DE below. A large, invisible PhysX Dynamic Rigid Body collider is dropped on the rabbit. The front half of the rabbit is destroyed. The chunks are simulated as dynamic rigid bodies while the back of the rabbit remains in place.

![Create static chunks in Houdini for NVIDIA Blast.](/images/user-guide/physx/blast/anim-nvidia-blast-static-simulation.gif)
