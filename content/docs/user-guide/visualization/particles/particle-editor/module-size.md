---
linkTitle: Particle Editor Module Size
description: 'Particle Editor Module Size'
title: Emitter Module Size
---

This module allows the size of emitted particles to change over time.

* Size over lifetime -  Allows the particles to change their size over lifetime.
    * Uses a standard [Distribution Property](distribution-property) UI, which allows you to set a curve, for example, to tightly control the size over the particle or emitter's lifetime, or to randomize it.
* Size By Speed - Allows you to set the particle's size based on the current velocity of the particle.
   * Velocity Range - The velocity of the particle is scaled by this value, to result in the final strength of the effect.
   * For example, if the particle is travelling at 5 units per frame, and the **Velocity Range** is set to `10.0`, this would mean that the final effect will be at `0.5` strength, as the particle is travelling at half the speed of its range.  The smaller this number, the more of an effect differences in velocity will make to the particle size.
   * If this is set to 0, the raw velocity of the particle itself will be used without any scale.
   * Scale Factor - Allows you to set a bound for the minimum and maximum scale of particles based on their velocity.
      * Uses a standard [Distribution Property](distribution-property) UI.
      * The final computation of the size of a particle is essentially the ratio of the particle's current velocity over the **Velocity Range** value, linearly interpolated between the min and max size given by this scale factor.
      * If a curve is used for the Scale Factor, the resulting size is sampled directly from the curve.

The particle's base scale is multiplied by this value - particles that are big to start with, will remain big compared to ones that started small, for example.

* Size Scale
  * Identical to Size over lifetime.
  * Allows you to have two curves affecting size.