---
description: ' Use Amazon Lumberyard''s physically-based rendering shaders to create screen
  effects for your game project. '
title: Create screen effects
---
# Create screen effects {#rendering-graphics-screen-effects-intro}

Lumberyard's rendering technology starts with a modern, physically\-based shading core that renders materials based on real world physical parameters \(such as base color, metallicity, smoothness, and specularity\), allowing you to achieve realistic results using the same physically\-based parameters used in the highest end film rendering pipelines\.

The rendering core is supplemented by a rich set of the most frequently used real time lighting, shading, special effects, and post effects features, such as physical lights, global illumination, volumetric fog, procedural weathering, particle systems, dynamic real time shadows, motion blur, [bokeh](https://en.wikipedia.org/wiki/Bokeh) depth of field, post color correction, and more\.

Lumberyard's rendering engine is tightly integrated with Lumberyard Editor, so the graphical fidelity and performance achieved in your game is what you see in the editor\. Changes made in the editor are instantly reflected in the fully rendered scene, allowing for immediate feedback and rapid iteration\.

The Lumberyard rendering technology is designed to take maximum advantage of today's high\-end PC and console operating systems, while maintaining compatibility with older hardware by scaling down graphical features and fidelity without compromising the core visual elements of your scene\.

**Topics**
+ [Working with camera screen effects](/docs/userguide/rendering/cameras.md)
+ [Temporal Antialiasing and Supersampling](/docs/userguide/rendering/anti-aliasing.md)
+ [Voxel\-based Global Illumination \(SVOGI\)](/docs/userguide/rendering/svogi.md)
+ [Fog Systems](/docs/userguide/rendering/fog-intro.md)
+ [Render Nodes](/docs/userguide/rendering/rendernode.md)
+ [Generating Stars \.dat File](/docs/userguide/rendering/stars.md)
+ [Building DirectX 12 Supported Applications](/docs/userguide/rendering/directx.md)