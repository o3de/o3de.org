---
description: ' Use advanced particle techniques in the &ALYlong; &particle-editor;. '
title: Advanced Particle Techniques
---
# Advanced Particle Techniques {#particle-advanced}


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Use the following advanced techniques in the Particle Editor to emit particles from geometry, create a particle effect that explodes, preview your effects on an animated character, or generate particles from surface properties\.

## Emitting Particles from Geometry {#particle-advanced-geometry}

Do the following to emit particles from the parent geometry\.

**To emit particles from geometry**

1. Create a parent emitter with a `.cgf` mesh asset that is assigned in the **Geometry** input under **Particles**\. For more information, see [Creating and Managing Particle Emitters](/docs/userguide/particles/emitter/creating.md)\.

1. Create a new emitter as a child of the first emitter\.

1. On the child emitter, in the emitter attributes, set **Spawn Indirection** to **Parent Start**\.

1. Set the **AttachType** to **Render**, and the **AttachForm** to **Vertices**\.

   The child's particles spawn from the mesh of its parent\.

![\[Image NOT FOUND\]](/images/userguide/particles/particle-editor-advanced.png)

**Note**  
Use any **Attach Type** and **AttachForm** for the intended effect\.

## Creating Exploding Geometry Particle Effect {#particle-advanced-explosions}

Do the following to create a particle effect that instantly spawns exploding chunks\.

**To create an exploding geometry particle effect**

1. Create an emitter\. In the **Attributes** panel, under **Particles**, assign a multipart `.cgf` file to the **Geometry** input\.

1. Set **Geometry** in **Pieces** to the option for your use case: **RandomPieces** or **AllPieces**\.

1. Set appropriate values for **Gravity**, **Speed**, **Rotation Rate**, and more to create an exploding effect\.

1. Optionally set **Collision** parameters for physicalized pieces\.

## Attaching Particles to Character Animations for Previewing {#particle-advanced-animations}

Do the following to preview the effects on an animated character in your level\.

**To attach a particle to an animation**

1. In Lumberyard Editor, choose **Tools**, **Asset Browser**\.

1. In the **Asset Browser**, select and drag a `.cdf` character asset that has animations into the Lumberyard Editor viewport\. Close the **Asset Browser**\.

1. In the **Entity Inspector**, click **Add Component**\. Under **Animation**, choose **Simple Animation**\.

1. Under **Simple Animation**, click the **\+** button to add an element\. Select an animation to play\.

1. Open the **Particle Editor** and drag the effect that you want to preview into your level\.

1. In the **Entity Inspector**, click **Add Component**\. Under **Animation**, choose **Attachment**\.

1. Under **Attachment**, click the target entity picker and select your character in the viewport\.

1. In the joint list, select a joint name to which to attach the effect\. Select an offset as needed\.

1. In the bottom toolbar, click **AI/Physics**\. Alternatively, press **Ctrl\+G** to start the animation and preview the effect\.

## Generating Particles from Surface Properties {#particle-advanced-surface}

Use the properties for an object's material surface to define the event\-driven effects that can occur when an object experiences an event\. You can specify these events on a render material or on individual pieces or surfaces of a `.cgf` asset\.

Many of the properties define the particle effects that are spawned by events such as walking or a bullet hit\. To specify the effect that is spawned when a geometry piece breaks off of an object, set the following parameters in a Lua script:

**Name**  
Specifies the name of the particle effect\.

**Scale**  
Multiplies the size of the particle\.

**Count\_scale**  
Multiplies the particle counts\.