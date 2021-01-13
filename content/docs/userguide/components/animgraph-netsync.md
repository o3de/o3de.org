---
description: ' Use the Anim Graph Net Sync component to synchronize animation graph
  parameters in &ALYlong;. '
title: Anim Graph Net Sync
---
# Anim Graph Net Sync {#component-animgraph-netsync}

The [AnimGraph](/docs/userguide/components/animgraph.md) component, which adds an animation graph and motion set to a character, does not automatically synchronize its parameters across the network\. Lumberyard's [GridMate networking system](/docs/userguide/networking/intro.md) provides a server an authoritative way of replicating these parameters\. This replication enables the movements of a character on a server to be mirrored on all of the clients that are connected to the server\. 

To implement the replication, use Lumberyard's **Anim Graph Net Sync** component, which is included with the [EMotion FX Animation](/docs/userguide/gems/builtin/emotionfx-animation.md) gem\. The **Anim Graph Net Sync** component requires the [Network Binding](/docs/userguide/components/network-binding.md) component and can be added to any entity that has the **AnimGraph** component\.

For more information, see [Synchronizing Animations Across a Network](/docs/userguide/networking/synchronizing-animation.md)\.
