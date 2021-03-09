---
description: ' Use visual debugging in Open 3D Engine for NVIDIA Cloth. '
title: Cloth visual debugger
weight: 500
---

{{< preview-migrated >}}

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

![\[Debug visualization of the NVIDIA Cloth component\]](/images/user-guide/physx/cloth/ui-cloth-component-debug-1.23.png)

To enable debug cloth visualization, use the following console variables \(CVARs\) in the editor console\.

**`cloth_DebugDraw <value>`**
Draw the cloth mesh wireframe\.
**0**: Disable wireframe display\.
**1**: Enable wireframe display\.

**`cloth_DebugDrawNormals <value>`**
Draw the cloth mesh normals\.
**0**: Disable normals display\.
**1**: Enable normals display\.
**2**: Enable normals, tangents and bitangents display\.

**`cloth_DebugDrawColliders <value>`**
Draw the cloth colliders\.
**0**: Disable collider display\.
**1**: Enable collider display\.

**`cloth_DebugDrawMotionConstraints <value>`**
Draw the cloth motion constraints\.
**0**: Disable motion constraint display\.
**1**: Enable motion constraint display\.

**`cloth_DebugDrawBackstop <value>`**
Draw the cloth backstop\.
**0**: Disable backstop display\.
**1**: Enable backstop display\.