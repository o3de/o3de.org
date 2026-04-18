---
linkTitle: Particle Editor Module Particles
description: 'Particle Editor Module Particles'
title: Emitter Module Particles
---

The `Particles` module controls the **initial starting conditions** of particles emitted.

Almost every property in this group uses the standard [Distribution Property](distribution-property) UI, allowing you to specify 
a constant value, a random value between a minimum and maximum, or a curve to describe the value.  Since these are the starting values,
other modules apply to them to alter them over time.

* Particle Lifetime 
  * How long the particle remains active and visible before it is removed
* Start Color - The initial color the particle should be.  Note that how this affects the actual rendered particles depends on the
  sprite and material used, and is generally multiplicative.  So taking a white particle image, and tinting it blue will result
  in blue particles, but taking a red image and trying to tint it blue will turn it black, as there is no blue in the red to begin with.
* Start Size - How large the particle is to begin with. 
* Start Velocity - initial motion of the particle.
   * Velocity Strength - How much to multiply the Velocity Direction by.
   * Velocity Direction - The direction to apply.
* Start Rotation - Particles can be rotating around an axis - this sets the axis, and how fast they are rotating.
   * Init Axis - The initial axis of the particles
   * Rotate Axis - the axis they rotate round
   * Init Angle - the angle around the rotate axis which the particles start at
   * Rotate Speed - how quickly the particles Rotate around this axis.

Note that to notice rotation, you would need a non-circular sprite image, something you can see rotating around that axis, or, to use non-screen aligned particle sprites.
