# Primitive Assets Gem<a name="gems-system-gem-primitive-assets"></a>

The Primitive Assets Gem provides primitive objects that are physics enabled and unit size \(1x1x1\), with a gray checkerboard texture\. The checkerboard texture is RGB middle gray \(127,127,127\) and sRGB middle gray \(187,187,187\)\. Diffuse, normal, and specular maps are included\. The primitive object models have import settings, a material, and a slice\. Each slice contains the object mesh and the appropriate **Shape** and **Rigid Body Physics** components\. You can use these to add the cube, sphere, and cylinder objects to your level and manipulate the objects, create a placeholder, or test Lumberyard Editor features\.

The asset files for the primitive objects are in the `\lumberyard_version\dev\Gems\PrimitiveAssets\Assets` directory\.

You can add the primitive objects to your game project by doing either of the following:
+ Create a new project from the **Default** template in the Project Configurator\. By default the Primitive Assets Gem is enabled for projects that are created from this template\.
+ Enable the Primitive Assets Gem for your existing project in the Project Configurator\.

For more information, see [Creating a Game Project in Lumberyard](configurator-projects.md#creating-a-game-project)\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/project-template-default-simple-level.png)