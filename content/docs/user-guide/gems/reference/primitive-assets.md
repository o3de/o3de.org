---
description: ' Use the Primitive Assets Gem in your O3DE project to add primitive
  objects with physics enabled. '
title: Primitive Assets Gem
---

{{< preview-migrated >}}

The Primitive Assets Gem provides primitive objects that are physics enabled and unit size \(1x1x1\), with a gray checkerboard texture\. The checkerboard texture is RGB middle gray \(127,127,127\) and sRGB middle gray \(187,187,187\)\. Diffuse, normal, and specular maps are included\. The primitive object models have import settings, a material, and a slice\. Each slice contains the object mesh and the appropriate **Shape** and **Rigid Body Physics** components\. You can use these to add the cube, sphere, and cylinder objects to your level and manipulate the objects, create a placeholder, or test O3DE Editor features\.

The asset files for the primitive objects are in the O3DE `Gems\PrimitiveAssets\Assets` directory\.

You can add the primitive objects to your game project by doing either of the following:
+ Create a new project from the **Default** template in the Project Configurator\. By default the Primitive Assets Gem is enabled for projects that are created from this template\.
+ Enable the Primitive Assets Gem for your existing project in the Project Configurator\.

For more information, see [Creating a Game Project in O3DE](/docs/userguide/configurator/projects#creating-a-game-project)\.

![\[Image NOT FOUND\]](/images/user-guide/gems/project-template-default-simple-level.png)
