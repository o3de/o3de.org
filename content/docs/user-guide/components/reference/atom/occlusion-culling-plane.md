---
title: Occlusion Culling Plane Component
linktitle: Occlusion Culling Plane
description: 'Open 3D Engine (O3DE) Occlusion Culling Plane component reference.'
toc: true
---

The **Occlusion Culling Plane** component adds a plane, known as an **Occluder**, that will prevent a mesh from rendering when the occluder is between the camera and the mesh. Occlusion culling is a rendering technique that reduces the number of non-visible objects sent to the renderer. An object is visible when it is on-screen and not fully behind an occlusion culling plane.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Properties


![occlusion-culling-plane-component-base-properties](/images/user-guide/components/reference/atom/occlusion-culling-plane/occlusion-culling-plane-base-properties-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Show Visualization** | Displays the occlusion culling plane in the scene as a green plane for debugging.  | Boolean | `Enabled` |
| **Transparent Visualization** | Displays the visualization as a semi-transparent plane.  | Boolean |  `Disabled` |