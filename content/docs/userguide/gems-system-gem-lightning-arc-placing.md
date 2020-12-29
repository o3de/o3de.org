description: ' Specify targets where your lightning will arc in your &ALY; level. '
slug: gems-system-gem-lightning-arc-placing
title: Placing Lightning Arc
---
# Placing Lightning Arc<a name="gems-system-gem-lightning-arc-placing"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

When you place a lightning arc entity, you must specify at least one target\. The lightning arcs between the lightning arc entity and each target that is linked\. The lightning arc appears in Lumberyard Editor when you turn on **AI/Physics** or enter game mode \(**Ctrl \+ G**\)\.

**To place a lightning arc**

1. In the **Rollup Bar**, on the **Object** tab, click **Entity**\.

1. Under **Browser**, expand **Environment**, and then drag **LightningArc** into your scene\.

1. Under **Entity Properties**, ensure that **Active** is selected\.

1. Click **AI/Physics** in the bottom toolbar\. This makes the lightning arc visible in Lumberyard Editor after you place and link the targets\.  
![\[Image NOT FOUND\]](/images/gems/gems-system-lightning-ai-physics.png)

1. To place one or more targets, in the **Rollup Bar**'s **Objects** tab, click **AI**\. Under **Object Type**, click **Tagpoint**\.

1. Move your mouse into the scene, and click to place the tag point where your lightning will arc\.

1. To link your tag point, select your lightning arc entity in the scene\.

1. If necessary, scroll down or collapse other headings in the **Rollup Bar** to find **Entity Links**\. Click **Pick Target**\. Select the tag point you placed\. Once it appears in the **Link Name** list, double\-click the link name and change it to **Target**\.

1. Assign a lightning material: Beneath **Entity**, click in the **Mtl** text box\. The **Material Editor** appears\.

1. Expand `materials\effects`\. Right\-click the desired lightning effect\. Then click **Assign to Selected Objects**\. Close the **Material Editor**\.