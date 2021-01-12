---
description: ' Use the &ALY; &particle-editor; to create, edit, preview, manage, and
  save particle libraries and emitters that are used with entities in your level. '
title: Using the &particle-editor;
---
# Using the Particle Editor<a name="particle-editor"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Use the **Particle Editor** to create, edit, preview, and save particle libraries and emitters that are used with entities in your levels\.

**To open the Particle Editor**
+ In Lumberyard Editor, choose **Tools**, **Particle Editor**\. You can also click the particle editor icon in the Lumberyard Editor toolbar\.

![\[Particle Editor interface\]](/images/userguide/particles/particle-editor.png)

The **Particle Editor** includes the following UI elements:
+ **Libraries** panel – Lists the particle art assets\. You can view and interact with multiple libraries simultaneously\.
+ **Preview** panel – Displays the selected, active particle effect\. The preview camera automatically positions to capture the entire particle\. Use the **W**, **A**, **S**, and **D** keys and mouse controls to pan, zoom, and rotate the camera\.
+ **Attributes** panel – Lists the properties for the selected particle\.
+ **Level of Detail** panel – Displays level of detail \(LOD\) information for added particles\. For more information, see [Managing Particle Level of Detail \(LOD\)](/docs/userguide/particles/lod.md)\.

## Adding a Particle Component<a name="adding-a-particle-component-to-your-level"></a>

**To add a particle component to your level**
+ Do one of the following:
  + Drag a particle emitter from the **Particle Editor** library and drop it into the **Lumberyard Editor** viewport\.
  + Drag a particle effect asset from the **Asset Browser** into your scene\. Choose the emitter that you want to use from the **Entity Inspector** properties\. For more information, see [Entity Inspector](/docs/userguide/components/entity-inspector.md)\.
  + Create a **Particle** component entity and assign the particle effect with the **Particle effect library** parameter\. For more information, see the **[Particle](/docs/userguide/components/particle.md)** component and [Adding Components to an Entity](/docs/userguide/components/working-adding.md)\. 