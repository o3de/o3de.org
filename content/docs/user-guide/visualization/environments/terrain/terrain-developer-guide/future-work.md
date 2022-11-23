---
linktitle: Future Work
title: Future Work
description: Possible future improvements to the terrain system.
weight: 500
toc: true
---

There are a number of improvements that could potentially be made to the terrain system for anyone interested in taking the system further.

## Large-scale improvements

This category of improvements requires architecting new solutions to provide extensive new capabilities.

### 3D geometry support

Instead of a heightfield-based approach, the APIs and renderer could be extended to use a full 3D approach, whether it's through voxels, displacement maps, mesh ingestion, raytracing, or some other technology. This would enable the system to support caves, arches, cliff geometry, and other vertical or overlapping terrain features that simply can't be supported through a pure heightfield approach.

The API extensions would likely consist of redefining the current APIs to provide the _highest elevation_ terrain data that appears below the given query input positions, and then adding more APIs to provide _all_ the terrain data that exists at or below the given query positions.

### GPU calculation support

The terrain system is built on top of the gradient components, which perform all of their calculations CPU-side. However, the types of calculations being performed are ideal for GPU-side calculation. An overhaul or replacement of the gradient system that supports GPU-side calculations could provide orders of magnitude improvements to the terrain system. The primary caveats are that the data is still needed CPU-side to feed to physics, generalized raycasts, and other systems, and that it should be possible to still use the terrain system on devices with limited or no GPU capabilities (low-end phones, headless servers, etc).

## Additional features

This category of improvements should be possible to incrementally add into the system without fundamentally altering anything about how the system currently works.

### Triangle split direction

The terrain currently always triangulates each quad in the same uniform direction. This could be replaced with heuristics for choosing the best direction for each quad. This could even be exposed as multiple heuristics - same direction for every quad, alternating directions per quad, best choice per quad based on vertex heights. This decision should be controlled at the terrain system level, so that the information can be provided consistently to the terrain debugger, terrain physics, terrain rendering, terrain raycasting, etc.

### Improved shape to height workflows

It's currently somewhat non-intuitive to create terrain heights directly from primitive shape components. The best options are to use either the Shape Falloff Gradient or the Surface Altitude Gradient, but they're both currently problematic. The Shape Falloff Gradient creates falloff based on distance from the bottom of a box, not just simply the position of the shape within a box, so it's hard to control. The Surface Altitude Gradient doesn't support falloff and the auto-refresh doesn't work. Either of these components could be improved, or a new component could be added, to make it easier to just place a shape with falloff into the world and turn it into a height gradient.

### Masking / blending

Add controls to the Terrain Layer Spawner and the Terrain Macro Material to allow each one to mask and blend instead of completely replacing the data. This would make it much easier to create small terrain "stamps" for things like craters.

### First-class "hole" support

Holes can be created right now by authoring a high-priority terrain layer spawner with no ground plane for whatever size is desired. However, it would be nice to have additional authoring controls to make it possible to put holes directly into gradient data, possibly either through a second alpha channel, or through a separate gradient on the Terrain Height Gradient List component.

### Improved terrain texturing

There are a number of features that would be nice to add to the terrain texturing:

* Decals - both stamps for surface marks and textures that can repeat directionally along a spline or shape for things like paths and roads.
* Parallax Occlusion Mapping (POM) support - improves the lighting of small surface details.
* Triplanar mapping - improves the application of textures on vertical surfaces.

### Mesh blending

Arbitrary meshes should be able to be "planted" into the terrain surface with height, color, and surface blending to help the meshes integrate more seamlessly into the terrain.
