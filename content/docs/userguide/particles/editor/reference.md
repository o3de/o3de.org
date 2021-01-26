---
description: ' Use the particle parameters and attributes to modify how emitters and
  particles look and behave in the Amazon Lumberyard Particle Editor . '
title: Particles Attributes Reference
---
# Particles Attributes Reference {#particle-editor-reference}


****

|  |
| --- |
| This topic references tools and features that are [legacy](/docs/userguide/ly-glos-chap#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](/docs/userguide/gems/cryentity-removal-gem) using the [Project Configurator](/docs/userguide/configurator/intro) or the [command line](/docs/userguide/lmbr-exe)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. |

In the **Particle Editor**, you can modify how emitters and particles look and behave\. You can find all available parameters in the **Attributes** pane\. Except for a parameter's base value, most numeric parameters allow random variation over a particle or emitter lifetime\.

Some parameters have additional settings:
+ **Random** - Specifies how much a particle's parameter value deviates from the default value of `0` \(no variation\)\.
+ **Strength Over Emitter Life** - Controls the alpha strength over the lifetime of the particle\. This parameter works with finite particles only\. This parameter has no effect if set to continuous\.
+ **Strength Over Particle Life** - Controls the alpha strength over the lifetime of an individual particle\. For example, you can use this parameter to make a smoke particle fade to nothing once its lifetime has finished\. The particle fades out earlier or later depending on where you reduce the value to zero\.

**Topics**
+ [Using the Curve Editor in the Particle Editor](/docs/userguide/emitter-curve-editor.md)
+ [Advanced Attribute](/docs/userguide/particles/editor/reference-advanced.md)
+ [Audio Attribute](/docs/userguide/particles/editor/reference-audio.md)
+ [Collision Attribute](/docs/userguide/particles/editor/reference-collision.md)
+ [Comment Attribute](/docs/userguide/particles/editor/reference-comment.md)
+ [Configuration Attribute](/docs/userguide/particles/editor/reference-configuration.md)
+ [Emitter Attribute](/docs/userguide/particles/editor/reference-emitter.md)
+ [Lighting Attribute](/docs/userguide/particles/editor/reference-lighting.md)
+ [Movement Attribute](/docs/userguide/particles/editor/reference-movement.md)
+ [Particles Attribute](/docs/userguide/particles/editor/reference-particles.md)
+ [Rotation Attribute](/docs/userguide/particles/editor/reference-rotation.md)
+ [Size Attribute](/docs/userguide/particles/editor/reference-size.md)
+ [Visibility Attribute](/docs/userguide/particles/editor/reference-visibility.md)