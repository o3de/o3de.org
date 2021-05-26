---
description: ' Use the Anim Graph Net Sync component to synchronize animation graph
  parameters in Open 3D Engine. '
title: Anim Graph Net Sync
---

{{< preview-migrated >}}

The [AnimGraph](/docs/user-guide/components/reference/animgraph/) component, which adds an animation graph and motion set to a character, does not automatically synchronize its parameters across the network\. O3DE's [GridMate networking system](/docs/userguide/networking/intro.md) provides a server an authoritative way of replicating these parameters\. This replication enables the movements of a character on a server to be mirrored on all of the clients that are connected to the server\.

To implement the replication, use O3DE's **Anim Graph Net Sync** component, which is included with the [EMotion FX Animation](/docs/user-guide/gems/reference/emotionfx-animation/) gem\. The **Anim Graph Net Sync** component requires the [Network Binding](/docs/userguide/components/network-binding.md) component and can be added to any entity that has the **AnimGraph** component\.

For more information, see [Synchronizing Animations Across a Network](/docs/userguide/networking/synchronizing-animation.md)\.
