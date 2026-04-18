---
linkTitle: Particle Editor Module Renderer
description: 'Particle Editor Module Renderer'
title: Emitter Module Renderer
---

The `Renderer` module selects how a particle is actually rendered.

First, you need to choose which renderer is used at all, from one of these

* Sprite Renderer - Particles are rendered as sprites (that is, a quad with an image on them)
* Mesh Renderer - Particles are each an instance of a particular Atom Mesh
* Ribbon Renderer - Particles are rendered as connected ribbons.

{{< note >}}
 For each of the three types (Sprite, Mesh, and Ribbon), they each have a `Material` field.  This `Material` chosen here must 
 be of the correct [Atom Material Type](/docs/atom-guide/look-dev/materials/material-system/) that matches the kind of renderer, to function.  For example, Sprite renderer requires
 that the material be based on the `ParticleSprite` material type.  See the other example materials for more information.
{{< /note >}}

### Sprite Renderer

This is the typical particle sprite renderer, which renders each particle as a textured quad.

* Render Alignment - How to align the sprite particle.  This alignment is executed inside the shader code.
  * CAMERA_POS - Points the sprite at the camera.  Similar to square, but can cause some visual distortion at the edges of the viewport, as it assumes an up vector
     of (0,0,1).
  * SQUARE - Causes the sprite to always appear as a square no matter where the camera is in relation to it.  This produces particles with the least amount
     of visual distortion on screen, for sprites.  It makes the particle point at the camera, and also have the same up vector as the camera.
  * RECTANGLE - Similar to SQUARE, but allows the sprite to have non-uniform scale.
  * VELOCITY - At rest, particles will behave as if RECTANGLE is used, but moving particles will face in their direction of travel instead. 
  * CUSTOM - Custom alignment of particles.  The actual axis of the particle and its rotation will be used as the acutal world rotation of the quad.
* Render Sort - Used to sort different emitters relative to each other, for the purposes of culling and visibility.  Since particles don't interact
  with the depth buffer (unless the shader is modified to do so), this lets you control which order a particular emitter sorts in relative to other
  emitters.
* Sub Image Size - For sprite animation, how many sprites is the image cut into?  For example, if the image is a 4x4 grid of sprites, set X and Y to 4 (for a total of 16 sprites.)  This is related to the SubUV module, which can animate this value.
* Material - Pick a material derived from the `ParticleSprite` material type.  See [Atom Material Type](/docs/atom-guide/look-dev/materials/material-system/).

### Ribbon Renderer

The ribbon render connects each particle in the effect to other particles in the same effect, by generating a ribbon of quads to connect them together.

* Ribbon Parameter - (Appears when *Trail Mode* below is set to *Ribbon*).
   * Ribbon Count - The number of seperate Ribbons to generate.  For example, if there are 32 particles currently alive in the effect, and you set this to 2, there will be 2 ribbons generated, each using 16 of the 32 available particles.
* Trail Parameter - (Appears when *Trail Mode* below is set to *Trail*).
   * Ratio - the ratio of particle body vs tail.
   * Lifetime - Duration of life of trails.
   * Inherit Lifetime - Whether mthe particle trail inherits its parent particle lifetime.
   * Die with particles - delete the trail immediately when the particle parent is deleted.
* Render Sort - Used to sort different emitters relative to each other, for the purposes of culling and visibility.  Since particles don't interact
  with the depth buffer (unless the shader is modified to do so), this lets you control which order a particular emitter sorts in relative to other
  emitters.
* Min Segment Length - The minimum distance for a quad segment to be.
* Ribbon Width - uses a standard [Distribution Property](distribution-property) UI to select how wide the ribbon is at any given point.
* Tesselation Factor - how many quads to subdivide the gap between particles into a ribbon.  The higher this number, the more sparse.  Lower numbers
  generate smoother ribbons (like 0.1 or 0.001) but cost most render time as more vertices are being generated.
* Curve Tension - A number between 0.0 and 1.0 where 0.0 is smooth flowing curves and 1.0 is angular vertex points.
* Tile Distance - Controls how the texture tiles along the length of the ribbon.  Smaller numbers cause the texture to repeat more often.
* Render Alignment - this affects the vector used to align the ribbon quads in the world to 'face' the camera.
   * SCREEN - Assume the quad faces world +Z (constant).
   * CAMERA - The quad faces the camera (it points at the world camera position).
* Trail Mode - RIBBON or TRAIL.
  * Controls a block of properties above - if set to Ribbon, "Ribbon Paramater" with "Ribbon Count" will appear above, otherwise, "Trail Parameter" will appear
    instead.
* Material - Pick a material derived from the `ParticleRibbon` material type.  See [Atom Material Type](/docs/atom-guide/look-dev/materials/material-system/).

### Mesh Renderer

The mesh renderer uses an actual Atom Mesh as the object to render, for each particle.
{{< caution >}}
The mesh renderer does not work on mobile yet, and might cause issues with rendering on PC.  This feature is not final, and should not yet
be used in production.
{{< /caution >}}

* Render Sort - Used to sort different emitters relative to each other, for the purposes of culling and visibility.  Since particles don't interact
  with the depth buffer (unless the shader is modified to do so), this lets you control which order a particular emitter sorts in relative to other
  emitters.
* Material - Pick a material derived from the `ParticleMesh` material type.  See [Atom Material Type](/docs/atom-guide/look-dev/materials/material-system/).
* Mesh - Pick an Atom Mesh to render

