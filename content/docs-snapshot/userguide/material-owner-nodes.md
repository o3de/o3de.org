# Material Owner Nodes<a name="material-owner-nodes"></a>

You can use the **Script Canvas** editor to interact with materials in two ways\. The following section describes how to manipulate materials on a single entity\. When you apply changes to the entity that owns the material, the entity's material is automatically cloned\. The changes don't affect other entities that have the same material\.

An entity is considered a *material owner* if it has a component that supports materials\. This includes the **[Mesh](component-static-mesh.md)** and **[Decal](component-decal.md) ** components\. The **[Actor](component-actor.md)** component is not supported at this time\.

You can also access and manipulate materials directly, which affects all entities to which the material is applied\. For more information, see [Material Nodes](script-canvas-materials-nodes.md)\.

**Important**  
Depending on the material owner type, the material asset might not be available when the script is first activated \(`OnActivate` in Lua or the **On Graph Start** node in **Script Canvas**\)\. This lack of availability can occur when assets are still loading\. You can use the **[On Ready](material-owner-on-material-owner-ready-node.md)** node instead of the **On Graph Start** node, or use the **[Is Ready](material-owner-is-material-owner-ready.md)** node\.

**Topics**
+ [Get Material](material-owner-get-material.md)
+ [Get Param Color](material-owner-get-param-color-node.md)
+ [Get Param Number](material-owner-get-param-number-node.md)
+ [Get Param Vector3](material-owner-get-param-vector3-node.md)
+ [Get Param Vector4](material-owner-get-param-vector4-node.md)
+ [Is Ready](material-owner-is-material-owner-ready.md)
+ [On Ready](material-owner-on-material-owner-ready-node.md)
+ [Set Material](material-owner-set-material.md)
+ [Set Param Color](material-owner-set-param-color.md)
+ [Set Param Number](material-owner-set-param-number.md)
+ [Set Param Vector3](material-owner-set-param-vector3.md)
+ [Set Param Vector4](material-owner-set-param-vector4.md)