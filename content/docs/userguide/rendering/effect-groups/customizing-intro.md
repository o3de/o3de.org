---
description: ' Customize post-processing effects in &ALYlong;. '
title: Customizing Post-Processing Effects
---
# Customizing Post\-Processing Effects {#effect-groups-customizing-intro}

Lumberyard includes post\-processing effects that can help improve your game's graphics, lighting, and transitions between effects such as color correction, bloom, and depth of field\.

Use XML files with **Script Canvas** editor or Lua scripts to customize effects by setting their parameters, create prioritized groups of effect parameter sand enable or disable them\.

You can also use effect groups to specify the following:
+ Blend curves to smoothly transition between effects
+ Stay enabled until explicitly disabled
+ Make effect strength based on distance from the camera

**Note**  
Creating a new effect requires modifying Lumberyard, while creating a new effect group does not\.

**Topics**
+ [Post Effect Group XML Files](/docs/userguide/rendering/effect-groups/xml-files.md)
+ [Enabling and Disabling Effect Groups](/docs/userguide/rendering/effect-groups/enabling-disabling.md)
+ [Specifying a Blend Curve for Smooth Effect Transitions](/docs/userguide/rendering/effect-groups/transitions.md)
+ [Setting Effect Strength Based on Camera Distance](/docs/userguide/rendering/effect-groups/strength-camera-distance.md)
+ [Using the Screen Fader Effect](/docs/userguide/rendering/effect-groups/screen-fader-effect.md)