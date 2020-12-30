---
description: ' Add per vertex properties to fine tune your NVIDIA Cloth simulations
  in &ALYlong;. '
slug: nvidia-cloth-vertex-data
title: Per vertex properties for cloth
---
# Per vertex properties for cloth<a name="nvidia-cloth-vertex-data"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Cloth properties can be set per cloth particle using the vertex color tools in your content creation application\. In the **Cloth** modifier, in **FBX Settings**, you can choose which vertex color stream and which color channel in the stream represents each property\. You can use a different stream for each property, or combine multiple properties into a single vertex color stream by storing the properties in different color channels\. 

**Inverse Mass**  
**Inverse Mass** calculates a per cloth particle mass value\. If no vertex color stream is provided, then the **Inverse Mass** value of all vertices will be **1\.0** by default\. The value range for **Inverse Mass** is **0\.0** to **1\.0**\.   
An **Inverse Mass** value of **0\.0** excludes the vertex from the cloth simulation\. Vertices with a **0\.0** **Inverse Mass** value will be static\.   
Per cloth particle mass is calculated as `VertexMass = 1.0/InverseMass`\. For example, if the **Inverse Mass** value in the color channel is **0\.3**, then the resulting cloth particle mass value is `3.33`\. The smaller the **Inverse Mass** value, the greater the cloth particle mass\. 

**Motion Constraints**  
**Motion constraints** limit the movement of a simulated cloth particle to an area defined by a sphere\. The sphere's position is relative to the corresponding unsimulated vertex position\. For a detailed explanation of **Motion Constraints**, see [Cloth simulation constraints](nvidia-cloth-constraints.md)\.   
The **Motion Constraints** per vertex property calculates the radius of the sphere\. **Motion Constraints** have a value range of **0\.0** to **1\.0**\.   
A **Motion Constraints** value of **0\.0** constrains the cloth particle to the corresponding unsimulated vertex\. 

**Backstop**  
**Backstop** prevents a simulated cloth particle from entering an area defined by a sphere\. The sphere's position is relative to the corresponding unsimulated vertex position\. There are two **Backstop** properties that you can define per vertex, **Backstop Offset** and **Backstop Radius**\. For a detailed explanation of **Backstop**, see [Cloth simulation constraints](nvidia-cloth-constraints.md)\. 

**Backstop Offset**  
**Backstop Offset** defines the backstop sphere's offset along the normal of the corresponding unsimulated vertex\. The **Backstop Offset** value range, **0\.0** to **1\.0**, is remapped to a range between **\-1\.0** and **1\.0**\.   
A **Backstop Offset** value of **0\.0** is remapped to **\-1\.0** and places the backstop sphere in front of the unsimulated vertex\.   
A **Backstop Offset** value of **1\.0** places the backstop sphere behind the unsimulated vertex\.   
A **Backstop Offset** value of **0\.5** is remapped to **0\.0** and places the backstop sphere on the unsimulated vertex\. 

**Backstop Radius**  
**Backstop Radius** calculates the radius of the backstop sphere\. **Backstop Radius** has a value range of **0\.0** to **1\.0**\.   
A **Backstop Radius** value of **0\.0** disables the backstop for the corresponding vertex\. 