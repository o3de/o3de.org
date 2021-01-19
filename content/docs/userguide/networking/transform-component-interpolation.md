---
description: ' Use the interpolation options for the Transform component in &ALYlong;
  to smooth movement of entities under poor network conditions. '
title: Transform Component Interpolation
---
# Transform Component Interpolation {#network-transform-component-interpolation}

The **[Transform](/docs/userguide/components/transform.md)** component supports local interpolation of its position and rotation values when it is synchronized over the network\.

You can use the interpolation of transform values to smooth changes in the movement and orientation of your entities when they are controlled by your server application\. In Lumberyard, networking is accomplished through replicas that can either be primary replicas or proxy replicas\. Primary replicas are typically server application controllers that set the values directly\. Proxy replicas, typically on client applications, receive regular updates from the primary replicas\. Due to changing network conditions, updates can be delayed or come at varying time intervals\. Under these conditions, interpolation enables your clients to smooth the movement of entities being controlled over the network\. It does this by gradually modifying transform values until they match the last received values from the network\.

In Lumberyard Editor, you can use the Entity Inspector to alter these settings in the Transform component's **Network Sync** section\.

![\[Network Sync options in the Entity Inspector for the Transform component\]](/images/userguide/networking/network-transform-component-interpolation-1.png)

To have your entity synchronized across the network, your entity must have the Network Binding component, and you must enable **Sync to replicas**\. The interpolation mode settings have no effect if your entity does not have the network binding component\.

You can handle position and rotation interpolation separately\.

**Position interpolation** refers to the smoothing of position between network updates and interruptions\. This is useful if your objects change location and you notice visual jitter or sudden changes in orientation due to network conditions\.

**Rotation interpolation** refers to the smoothing of rotation between network updates and interruptions\. This is useful if your objects rotate and you notice visual jitter or sudden changes in orientation due to network conditions\.

For each of these settings, you can either choose no interpolation at all, which is the default choice, or linear interpolation\. For example, if your object never moves and thus has no need to smooth position over time, then you can leave **Position interpolation** mode set to **None**\. If your object rotates and you notice visual jitter or sudden changes in its position under poor network conditions, you can set **Rotation Interpolation** to **Linear**\. This setting can lead to smoother change in rotation over time\.

**Note**  
Scale interpolation is not supported in the Transform component\.

## Network Optimization of the Transform Component {#network-transform-component-interpolation-optimization}

The Transform component is optimized for network bandwidth\. If your entity is synchronized over the network but only changes position, then only new position values are sent across the network\. This avoids the network cost of sending the entire transform\. The same is true for rotation or scale of the transform\. This is done automatically\. You do not have to change any settings to use this feature\.

For information on providing your own interpolation logic for the Transform component, see [Providing Your Own Interpolation Logic for the Transform Component](/docs/userguide/networking/providing-custom-interpolation-logic.md)\.