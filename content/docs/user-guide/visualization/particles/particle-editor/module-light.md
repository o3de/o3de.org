---
linkTitle: Particle Editor Module Light
description: 'Particle Editor Module Light'
title: Emitter Module Light
---

The `Light` module allows particles to emit actual Atom renderer lights.

Use this sparingly, as it causes each particle to create an Atom Light in the actual render scene.

All three properties (Color, Intensity, Radius) use a standard [Distribution Property](distribution-property) UI.

* Color:
  * Allows you to control the color of the light emitted.
* Intensity: 
  * How bright / intense the light is.  More intensity injects more light into the scene.
* Radius
  * How large the light is in size, so how much of the scene it affects.

