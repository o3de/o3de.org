---
description: ' Use the &whitebox; gem to add &whitebox; rapid design components to
  your &ALYlong; project. '
title: '&whitebox; &gem;'
---
# White Box Gem<a name="gem-white-box"></a>


****  

|  | 
| --- |
| This feature is an [experimental](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#experimental) release and is subject to change\.  | 

The White Box Gem provides two tools implemented as components; the **White Box** component, and the **White Box Collision** component\. You can use the **White Box** component to quickly sketch proxy geometry for your entities\. Use the **White Box Collision** component with the **White Box** component to provide a collision surface for PhysX simulations\. 

## What is white boxing?<a name="white-boxing"></a>

*White boxing* is a rapid, iterative design process\. Simple modeling tools are used to create proxy geometry that defines the shape and dimension of 3D objects and environments\. The proxy geometry created in this process has a very low polygon count, but reasonably approximates the size and shape of the final assets\. White box entities have a basic material, and simple collision and physics materials if required\. The entities created in the white box process can be handed off to artists to be developed into polished production entities\. 

In Lumberyard, you create entities with the White Box component, using its edit functionality to rapidly sketch 3D assets to serve as building blocks for a level\. Because you create white box meshes in Lumberyard Editor with the component entity system, the entities can also contain functionality from other components such as scripts\. You can use a rapid build and test iteration cycle to create refined and functional entities before committing to developing production\-ready art assets\. The resulting white box geometry and entities are used as templates for production assets\. This development process is fast, highly iterative, and cost\-effective\. 

 

## Enable the White Box Gem<a name="enable-gem-white-box"></a>

To make the **White Box** and **White Box Collision** components available in Lumberyard, you must build and configure your project with the White Box Gem enabled\. 

**To enable the White Box Gem**

1. Use Project Configurator to add the **White Box Gem** to your project\. 
**Note**  
The White Box Gem has no dependencies\. However, if you intend to use the **White Box Collision** component, you should also enable the PhysX Gem\. 

1. Configure your project\. Use the following command\.

   ```
   lmbr_waf configure
   ```

1. Build your project\. Use the following command\. 

   ```
   lmbr_waf build_win_x64_vs2019_profile -p all --progress
   ```

For more information on Gems, see the [Gems documentation](gems-system-gems.md)\. 

## White Box component information<a name="white-box-component-topics"></a>

For information on the **White Box** component, see [White Box component](component-white-box.md)\. 

For information on the **White Box Collision** component, see [White Box Collider component](component-white-box-collider.md)\. 