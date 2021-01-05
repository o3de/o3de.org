---
description: ' Motion constraints for NVIDIA Cloth in &ALYlong;. '
slug: nvidia-cloth-constraints
title: Cloth simulation constraints
---
# Cloth simulation constraints<a name="nvidia-cloth-constraints"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Constraints limit the movement of cloth particles to prevent mesh penetration and create more predictable results from cloth simulation\. Amazon Lumberyard has two types of cloth constraints: **Motion constraints** and **Backstop**\. 

**Motion constraints** \- Constrains a simulated cloth particle within an area defined by a sphere\. The sphere's position is relative to the corresponding unsimulated vertex position\. 

**Backstop** \- Prevents a simulated cloth particle from entering an area defined by a sphere\. The sphere's position is relative to the corresponding unsimulated vertex position\. 

Motion constraints and Backstop properties are set by creating vertex color streams for the mesh in a content creation application such as Maya\. When exporting a mesh through **FBX Settings**, you can specify which vertex color streams and color channels define the properties in the **Cloth** modifier\. 

Motion constraints and Backstop properties are per vertex and can be used with **Actor** and **Mesh** components\. 

## Motion constraints<a name="cloth-motion-constraints-diagram"></a>

Motion constraints limit the movement of a simulated cloth particle to an area defined by a sphere\. The sphere is centered on the corresponding vertex of the unsimulated mesh\. The radius of the sphere is calculated using the Motion Constraints value from the vertex color stream and the **Max Distance**, **Scale** and **Bias** properties in the **Motion constraints** property group of the **Cloth** component\. 

If no vertex color stream is present, then a default value of **1\.0** is used for the Motion constraints of each vertex\. Motion Constraints vertex color stream values range from **0\.0** to **1\.0**\. The simulated cloth particles are fully constrained to the unsimulated mesh vertices if the vertex color stream has a value of **0\.0**\. 

 The diagram below visualizes Motion constraints\. 

![\[Motion constraint diagram for cloth simulation\]](/images/userguide/physx/cloth/cloth-motion-constraints-diagram.png)

## Backstop<a name="cloth-backstop-diagram"></a>

Because cloth colliders are simple primitives, you may encounter scenarios where cloth colliders aren't sufficient to prevent the simulated cloth particles from penetrating other meshes\. You can use **Backstop** to fine tune the behavior of simulated cloth particles to address these scenarios\. 

Backstop prevents a simulated cloth particle from entering an area defined by a sphere\. The sphere is positioned along the normal of the corresponding unsimulated mesh vertex through an offset property\. Backstop requires color channels from a vertex color stream to define both the radius of the sphere and the sphere's offset\. The **Backstop Radius** and **Backstop Offset** values in the vertex color stream are scaled by the **Radius** and **Offset** values in the **Cloth** component **Backstop** properties\. 

Because a vertex color channel can only contain values between **0\.0** and **1\.0**, the value in the color channel representing the **Backstop Offset** property will be remapped to a range between **\-1\.0** and **1\.0**\. 

A Backstop Offset vertex color value of **1\.0** is scaled by the **Back Offset** property of the **Cloth** component\. The backstop sphere is placed behind the unsimulated mesh vertex \. 

A Backstop Offset vertex color value of **0\.0** is remapped to **\-1\.0** and scaled by the **Front Offset** property of the **Cloth** component\. The backstop sphere is placed in front of the unsimulated mesh vertex\. 

 A Backstop Offset vertex color value of **0\.5** is remapped to **0\.0** and scaled by the **Back Offset** property of the **Cloth** component\. The backstop sphere is placed on the corresponding unsimulated vertex\. 

The Backstop Radius vertex color channel has values in the range of **0\.0** to **1\.0**\. A value of **0\.0** in the Backstop Radius vertex color channel disables the backstop for the corresponding vertex\. 

 The diagram below visualizes Backstop\. 

![\[Backstop diagram for cloth simulation\]](/images/userguide/physx/cloth/cloth-backstop-diagram.png)