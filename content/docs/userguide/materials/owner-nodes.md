---
description: ' Use the &ALYlong; &script-canvas; editor to access and manipulate materials
  on a specific entity. '
title: Material Owner Nodes
---
# Material Owner Nodes<a name="material-owner-nodes"></a>

You can use the **Script Canvas** editor to interact with materials in two ways\. The following section describes how to manipulate materials on a single entity\. When you apply changes to the entity that owns the material, the entity's material is automatically cloned\. The changes don't affect other entities that have the same material\.

An entity is considered a *material owner* if it has a component that supports materials\. This includes the **[Mesh](/docs/userguide/component-static-mesh.md)** and **[Decal](/docs/userguide/component-decal.md) ** components\. The **[Actor](/docs/userguide/component-actor.md)** component is not supported at this time\.

You can also access and manipulate materials directly, which affects all entities to which the material is applied\. For more information, see [Material Nodes](/docs/userguide/script-canvas-materials-nodes.md)\.

**Important**  
Depending on the material owner type, the material asset might not be available when the script is first activated \(`OnActivate` in Lua or the **On Graph Start** node in **Script Canvas**\)\. This lack of availability can occur when assets are still loading\. You can use the **[On Ready](/docs/userguide/material-owner-on-material-owner-ready-node.md)** node instead of the **On Graph Start** node, or use the **[Is Ready](/docs/userguide/material-owner-is-material-owner-ready.md)** node\.

**Topics**
+ [Get Material](/docs/userguide/material-owner-get-material.md)
+ [Get Param Color](/docs/userguide/material-owner-get-param-color-node.md)
+ [Get Param Number](/docs/userguide/material-owner-get-param-number-node.md)
+ [Get Param Vector3](/docs/userguide/material-owner-get-param-vector3-node.md)
+ [Get Param Vector4](/docs/userguide/material-owner-get-param-vector4-node.md)
+ [Is Ready](/docs/userguide/material-owner-is-material-owner-ready.md)
+ [On Ready](/docs/userguide/material-owner-on-material-owner-ready-node.md)
+ [Set Material](/docs/userguide/material-owner-set-material.md)
+ [Set Param Color](/docs/userguide/material-owner-set-param-color.md)
+ [Set Param Number](/docs/userguide/material-owner-set-param-number.md)
+ [Set Param Vector3](/docs/userguide/material-owner-set-param-vector3.md)
+ [Set Param Vector4](/docs/userguide/material-owner-set-param-vector4.md)