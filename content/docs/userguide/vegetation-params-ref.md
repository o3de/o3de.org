---
description: ' Customize vegetation behavior with the Vegetation panel under Terrain
  in the &ALY; &rollup-bar;. '
title: 'Vegetation Parameters '
---
# Vegetation Parameters<a name="vegetation-params-ref"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

The following vegetation parameters can be accessed in the **Terrain**, **Vegetation** panel in the **Rollup Bar** for a previously selected vegetation object\. You can adjust parameters for one or more selected objects\.

Unless otherwise noted, parameters apply to newly added and placed vegetation assets only\.

**Size**  
Changes the size of newly placed vegetation objects\. Use this to uniformly scale the vegetation, where 1 represents 100%\.

**SizeVar**  
Changes the limit of size changes for a set of newly placed vegetation objects of a single kind\. Keep Size at 1 and set SizeVar to 0\.2 to get a nice variation in sizes\. 

**RandomRotation**  
Randomly rotates objects while you paint new vegetation objects\. To create a more natural look and distribution, you can set up a RandomRotation in the vegetation objects when you paint them\. This feature works only with the Paint Object tool\.

**AlignToTerrainCoefficient**  
Points the vegetation object away from the ground\. When this effect is applied, vegetation on cliffs points away from the surface instead of growing straight up\.

**UseTerrainColor**  
Makes the individual object receive the color of the underlying terrain for a better match\. Use this option to blend the grass with the underlying terrain color\. You can also use this setting on other objects, but it works best with grass\. This effect is especially useful for making grass appear to fade in the distance\.

**AllowIndoor**  
Enables the vegetation to be rendered within vis areas\.

**Bending**  
This value controls the bending deformation of the vegetation objects\. It ranges from 0 to 100, with 0 representing no bending effect and 100 the maximum effect\. This effect is based on the amount of environment wind \(WindVector\) in the level\.

**GrowOnBrushes**  
Controls the placement of objects on brushes\.

**GrowOnTerrain**  
Controls the placement of objects on terrain\. Useful if you want them placed only on brushes\.

**AutoMerged**  
Enables AutoMerged system on this object\. For more information, see [Using AutoMerged Wind Bending Effects](vegetation-bending-automerged-intro.md)\. 

**Stiffness**  
Controls the stiffness of selected vegetation and how much it reacts to physics for AutoMerged vegetation\.

**Damping**  
Determines how responsive the vegetation is to physics damping for AutoMerged vegetation\.

**AirResistance**  
 Degree that vegetation resists air movement \(wind\)\. Similar to the Bending setting but specifically designed for AutoMerged vegetation\.

**Pickable**  
Allows the player to pick up the object\.

**Density**  
Adjusts the distance between individual objects that you create while painting new vegetation\. The density setting ranges from 0 to 100\. If your density setting is bigger than your brush radius, the vegetation will not be created, so always make sure you have a suitable brush radius\.

**ElevationMin**  
Limits the minimum height at which you can paint vegetation objects\. For painting underwater vegetation, set this value to lower than the ocean; 0 is a safe option\.

**ElevationMax**  
Limits the maximum height at which you can paint vegetation objects\.

**SlopeMin**  
Limits the minimum angle of the terrain on which you can paint vegetation objects\. 255 equals 90 degrees\. When you specify a SlopeMin value higher than 0, you can no longer place objects on flat grounds\.

**SlopeMax**  
Limits the maximum angle of the terrain on which you can paint vegetation objects\. 255 equals 90 degrees\. When you specify a SlopeMax lower than 255, you can no longer place objects on very steep areas\.

**CastShadow**  
Makes the object cast a shadow based on the minimum selected **Config Spec** setting\. For example, High won't work on Low or Medium specs\.