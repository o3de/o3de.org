---
linkTitle: Particle Editor Module Force
description: 'Particle Editor Module Force'
title: Emitter 'Force' Module
---

The Force module allows application of simulated forces to particles over time, simulating wind, vortices, drag, and other physical phenomena.

* Acceleration - This allows an acceleration to be applied to particles after they are emitted, over time.
  * Uses a standard [Distribution Property](distribution-property) UI.

* Drag
  * This allows you to slow a particles velocity down over time.
  * Uses a standard [Distribution Property](distribution-property) UI.

* Vortex Force - simulates a vortex of force being applied (tornado, etc)
  * Vortex Axis controls the orientation (the "up axis") of the vortex.
  * Origin controls an offset from the origin where the center of the vortex is.
  * Origin Pull - Strength of force pulling particles to the origin.
     * Uses a standard [Distribution Property](distribution-property) UI.
  * Vortex Rate - Rate of revolution of the vortex (changing the direction of pull).
     * Uses a standard [Distribution Property](distribution-property) UI.
  * Vortex Radius - The size of the vortex.
     * Uses a standard [Distribution Property](distribution-property) UI.

* Noise - simulates random noise as if the particles were in a noisy medium by using a 3d field of Jacobian Simplex Noise.
  * Noise Strength - controls the strength of the noise effect - the larger the number, the more exaggerated the effect will be, imparting more force.
  * Noise Frequency - frequency of the noise - the larger this number, the bigger the clumps and voids of the noise are, the smaller the number, the more tightly clumped and smaller the features of the noise, leading to more preturbation on a smaller scale.
  * Pan Noise - If this is set to `ON`, the location the noise is being sampled from the noise field will pan by **Pan Noise Field** each frame.
  * Pan Noise Field - if **Pan Noise** is set to `ON`, this is how far to pan the sample point in the field, each frame.  This effectively translates the entire field each frame, having an effect similar to ocean waves moving underneath objects, preturbing their motion, as opposed to a static frozen field of bumpy ice causing objects to move along static slopes.  (But in 3D).
  * Random Seed - changes the random seed used to generate the noise.  Each different seed produces a different 3d noise field.
  * Randomization Vector - The larger this number, the more "randomly" particles will behave with respect to each other.   If this is zero, particles will behave as if bound in the same field, with nearby particles receiving similar forces from the field.  If this number is non zero, then the larger it is, the less the relationship between how close particles are to each other will matter to which forces are imparted to them.

* Particle Collision
  * Simulates particles colliding with a bounds object and bouncing.
  * Collision Type
     * Currently, only `Plane` is available.  This simulates there being a collision plane at a specified location, which particles bounce off.
  * Collision Radius - Particles are assumed to be spheres, to simplify the bounce collision calculations.  This section specifies how that sphere's radius is caculated.
      * Calculation Type
          * Sprite - Use the sprite to calculate the sphere
          * Mesh - (For Mesh Particles) use the bounds of the mesh
          * Custom - Specify a radius manually
      * Calculation Method
          * BOUNDS - Use the bounding box of the object to calculate a radius.  The sphere will be inscribed within this range.  Good for circular sprites.
          * MAXIMUM AXIS - Take the bounding box, then take the largest axis in it and use half that as the radius.
          * MINIMUM AXIS - Take the bounding box, then use the smallest axis in it and use half that as the radius.
      * Radius Scale - scale the final calculated radius by this amount, to make a small adjustment
      * Radius (Only available if "Custom" is selected for Calculation Type) - Manually specify the actual radius.
  * Bounce
      * Restitution - Essentially, the amount of the incoming velocity to maintain after a bounce.  0 would cause the particles to stick to the plane, 1.0 is a perfect
        elastic collistion, and anywhere between 0.0 and 1.0 is partially bouncy
      * Randomize Normal - simulates a rough surface by preturbing the normal of collision with the plane
  * UseTwoPlane - If set to on, 2 collision planes will be used, instead of one.
     * Collision Plane 1 and Collision Plane 2 define the planes - for example, the 'floor' would be a plane positioned at (0,0,0) pointing upwards (0,0,1).

