---
linkTitle: Particle Editor Module Velocity
description: 'Particle Editor Module Velocity'
title: Emitter Module Velocity
---

The Velocity module allows you to control the velocity of particles over time.  These modules (Except for Concentrate) generally keep ticking each frame, applying their value.

Most of the properties on this page allow you to use a standard [Distribution Property](distribution-property) UI, which lets you specify that each property is either a constant value, a random value, or a curve.

* Velocity Over Lifetime - Applies a given velocity to each particle, each frame.
  * Velocity Strength - How much velocity is added each frame
  * Velocity Direction - In what direction the velocity is added each frame

* Velocity Sector - Adds velocity in a radial direction on a flat plane, at random.
  * Central Angle - Center of the pie slice.
  * Rotate Angle - How much of the pie to include in the slice.
  * Velocity Strength - the strength of the effect, higher means more velocity is added.
  * Axis - The direction the circle points, this will be normalized.

* Velocity Cone - Adds velocity in a cone shape, at random.
  * Angle - The angle of the cone, that is, 0.0 would be a straight line, and 90 would be a cone with the top angle being 90 degrees.
   * Velocity Strength - the strength of the effect, higher means more velocity is added.
  * Axis - The direction the cone points, this will be normalized.

* Velocity Sphere - Add velocity in all directions, at random.
   * Velocity Strength - the strength of the effect, higher means more velocity is added.

* Velocity Concentrate - Modifies the velocity (Does not Add) to cause the particles to travel towards a given point.
   * This property is special in that it only updates once, during spawn, and thus will only have an effect if the spawning
     of particles is not already at that given point (by for example using the **Shape** module to spawn particles away from that given point).
   * Center - The center point all particles will travel towards.
   * Rate - The speed at which they will travel towards that center.

* Velocity Rotate Around Point - Modifies the Velocity **and position** of each particle, each frame so that they are arranged around a given point in a circle.
   * Rotate Radius - How fast they orbit around the point.
   * Radius - how large the circle is.
   * First Axis - Defines one of the two axis (rightwards) for the circle.
   * Second Axis - Defines the other axis (upwards) for the circle.
   * Center - The center of the circle.

Rotate Around Point feeds a rotation axis vector directly into the shader, which then uses it to arrange the particles around the given circle, directly in shader code.