---
linkTitle: Particle Editor Module Spawn
description: 'Particle Editor Module Spawn'
title: Emitter Module Spawn
---

This emitter module causes particles to spawn themselves.
Without this module, particles will not spawn, unless spawned by other means, such as the event module, which spawns them based on other emitters sending events.

{{< note >}}
The emitter module itself has a maximum particle cap, and once this cap is reached, spawning ceases until particles expire to make room for new ones.
{{< /note >}}

More than one of these spawn strategies can be checked at any given time, and the particle will execute all the checked ones.

* Spawn Rate - How fast to spawn particles
   * Note that this must be checked to have any effect.
   * Process Spawn Rate - If this is set to `Off`, no particles will spawn due to Spawn Rate, even if *Spawn Rate* is checked.  This is usually combined with Spawn Per Unit (see below).   
   * When combined with **Spawn Per Unit** below, this can help control whether default spawning occurs all the time, only when the object is moving, or only when the object is NOT moving.
* Particle Rate - how many particles, per second, should be emitted.
   * Uses a standard [Distribution Property](distribution-property) UI, allowing you to change rate over time, make it random,
     or specify a curve.

* Burst List - Spawn particles in bursts (as opposed to a rate over time).
   * Process Burst List - If this is set to `Off`, bursting will not occur, unless toggled on by **Spawn Per Unit**.  This allows you to control whether particle busts occur automatically, or only when the object is moving.
   * Burst List - this is a list property.  Click the plus symbol to add any number of bursts.
      * Time - When, in relation to the particle effect starting, to emit this burst.  For example, 0.0 means immediately, and 1.0 would be one second after the effect begins.
    * Particle number - How many particles to emit in this burst.
    * Min Particle Number - if set to a positive integer, this will spawn between this many and **Particle Number** particles, instead of always spawning **Particle number** particles.

* Spawn Per Unit - Allows you to cause particles to spawn when the Entity the emitter is *attached to* moves, based on how
  fast it is moving.
  * Process Spawn Rate - Activate the parameters in the **Spawn Rate** block when the entity is moving.
  * Process Burst List - Activate the parameters iun the **Burst List** block when the entity is moving.
  * Ignore Spawn Rate when moving - If this is set to `ON`, then it will behave as if **Spawn Rate** is turned off when the entity is moving.
  * Spawn Rate Per Unit - Controls how fast to spawn particles based on how fast the unit is moving.  Note that this is additional particles to spawn over and above the amount provided by **Process Spawn Rate** and **Process Burst List**.
  * Uses a standard [Distribution Property](distribution-property) UI, allowing you to make it random, or control it with a curve over time.

### Examples

An example of using **Spawn Per Unit** would be leaving particle trails from a Magic Wand object, whenever the wand is moved.
When its moving, if you want to spawn particles based on how fast it is moving (more speed means more particles) you would rely on the **Spawn Per Unit** spawning, to control the rate:

In that case, you would set
* Spawn Rate - `OFF`
* Burst List - `OFF`
* Spawn Per Unit : `ON`
   * Process Spawn Rate - `OFF` - meaning, don't run the normal spawn when it is moving
   * Ignore Spawn Rate When Moving - `OFF` (not relevant)
   * Spawn Rate Per Unit - 10.0 - spawn 10 particles for every 1 unit it moved in space.

If you instead wanted the wand to spawn at a constant rate when moving, regardless of the velocity at which it was moving, and then stop spawning if the wand stops moving, you would instead set:

* Spawn Rate - `ON`
   * Process Spawn Rate - `OFF` - don't emit particles by default
   * Particle Rate - 10.0
* Burst List - `OFF`
* Spawn Per Unit : `ON`
   * Process Spawn Rate - `ON` - meaning, turn on the **Spawn Rate** section *when moving*
   * Ignore Spawn Rate When Moving - `OFF` (not relevant)
   * Spawn Rate Per Unit - 0.0 - don't spawn additional particles as it moves

If you instead wanted it to emit a trickle of particles constantly regardless of whether it was moving or not, and then a lot more additional particles when moving, based on the velocity:

* Spawn Rate - `ON`
   * Process Spawn Rate - `ON' - emit particles by default (for idling)
   * Particle Rate - 1.0 - just one particle per second
* Burst List - `OFF`
* Spawn Per Unit : `ON`
   * Process Spawn Rate - `ON`
   * Ignore Spawn Rate When Moving - `ON` - turns spawning from **Spawn Rate** off, when moving
   * Spawn Rate Per Unit - 10.0 - spawn 10 particles for every 1 unit moved in space.

