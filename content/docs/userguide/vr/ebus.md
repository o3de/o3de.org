---
description: ' Use EBus request bus functions for virtual reality in &ALYlong;. '
title: Using EBus Request Bus Interface for Virtual Reality
---
# Using EBus Request Bus Interface for Virtual Reality {#virtual-reality-ebus}

Use the following request function with the StereoRendererBus event bus \(EBus\) interface to communicate with other components of your game\.

For more information about using the EBus interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

## IsRenderingToHMD {#virtual-reality-ebus-isrenderingtohmd}

Returns true if the renderer is rendering to the HMD\.

**Parameters**  
None

**Response**  
`True` or `False`

**Scriptable**  
Yes