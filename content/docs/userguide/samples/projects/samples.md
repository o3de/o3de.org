---
description: ' Use the Samples Project to explore sample levels and code that demonstrate
  various &ALYlong; features. '
title: Samples Project
---
# Samples Project<a name="sample-project-samples"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

The Samples Project includes two collections of sample levels and code that demonstrates how to use various Lumberyard features\. 

The Samples Project's level files are located in the `lumberyard_version\dev\SamplesProject\Levels` directory\.

The `Samples` subdirectory contains the following levels:
+ [Advanced Rin Locomotion](/docs/userguide/animation/editor/rin-locomotion-sample.md)
+ [Audio Sample](#sample-project-samples-audio)
+ [Fur Technical Sample](/docs/userguide/shaders/fur.md)
+ [Metastream Sample](/docs/userguide/gems/builtin/metastream.md)
+ [Script Canvas Sample](/docs/userguide/scripting/scriptcanvas/basic-sample.md)
+ [Scripted Entity Tweener Sample](/docs/userguide/ui/animating/tweener.md)
+ [Simple Jack Locomotion](/docs/userguide/animation/editor/jack-locomotion-sample.md)

The `UI` subdirectory contains the following levels:
+ UI Features – Demonstrates [UI components](/docs/userguide/ui/editor/components.md), [UI animation](/docs/userguide/ui/animation/_index.md), [font rendering](/docs/userguide/ui/fonts/_index.md), [language support and localization](/docs/userguide/localization/intro.md), and C\+\+ canvases and custom components\.
+ [UI in 3D World](/docs/userguide/ui/editor/placing-canvases-3d.md) – Demonstrates placing game UI on 3D objects\.
+ [UI Main Menu Lua Sample](/docs/userguide/ui/editor/loading-canvases-lua.md) – Demonstrates loading a UI canvas using Lua\.
+ UI Main Menu Script Canvas Sample – Demonstrates loading a UI canvas using the [**Script Canvas** editor](/docs/userguide/scripting/scriptcanvas/intro.md)\.

## Audio Sample<a name="sample-project-samples-audio"></a>

This sample demonstrates how to use the [**Audio Trigger**](/docs/userguide/components/audio-trigger.md) and [**Audio Rtpc**](/docs/userguide/components/audio-rtpc.md) components with Lua scripts to associate sounds of a door opening and closing\.

This example is fully annotated within the Lua script of the level file\. The following sounds are associated:
+ Sounds
  + Door open
  + Door creak
  + Door creak stop
  + Door slam
+ Rtpc
  + Creak volume
  + Creak pitch

To play the example, do the following:
+ Press **W/S** to swing the door\.
+ Press **Q** to open the door\.
+ Press **E** to open the door\.
+ Press the **spacebar** to open or close the door\.

To see the Lua script, select the **Door** entity \(a child of **DoorTest**\) and then click the **\{ \}** button next to the script property to open the Lua IDE\.

For more information about audio, setting up sounds and using Wwise LTX, see [Adding Audio and Sound Effects](/docs/userguide/audio/intro.md)\.