---
linkTitle: Particle Editor Module Emitter
description: 'Particle Editor Module Emitter'
title: Emitter Module
---

The Emitter module isn't a real module in the usual sense (Cannot be toggled on and off) but establishes basic properties for the emitter as a whole.

![Emitter Module](/images/user-guide/visualization/particles/module-emitter.png)

**Simulate Type**

Currently, only CPU is supported, via multi-threaded jobs.

**Max Particles**

Caps the total amount of particles in this emitter to this number, regardless of how many are spawned and how rapidly.

**Spawn Delay**

After activation, how long (in seconds) before the emitter begins spawning particles.

**Use Local Space**

If this is set to `ON`, then each individual particle will continuously update its transform relative to the entity containing the particle component, so moving
that entity will also retroactively move all the particles too, the effect playing relative to that entity's current position.

If this is set to `OFF` then each particle will still be initially emitted relative to the entity containing the emitter, but will not continue to follow
the entity that spawned it after that initial emission.

**Looping**

If set to `OFF`, the particle will follow its emission rules in the other modules, and then stop.

If set to `ON`, the particle will start over once it reaches the end of its emission rules, continuously following the same pattern in a loop.

