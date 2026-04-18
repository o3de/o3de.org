---
linkTitle: Particle Editor Module Sub UV
description: 'Particle Editor Module Sub UV'
title: Emitter Module Sub UV
---

Allows sprite-sheet animation to be used on particles.

Sometimes your particle image consists of animated frames of a larger animation and you would like to play them like a flipbook or a sprite sheet.  This module allows you to do that, combined with the **Renderer** module, which specifies how many images are in the sprite sheet (horizontally and vertically).

* Frame Per Second - How many frames in the sprite sheet to advance, per second of real time passing.  This is the framerate of the animation.
* Frame Number - How many frames are available in the given texture sprite sheet.  For example, if you have a 8x8 sprite sheet, but you only use the first 6 cells, you would set this to 6 to prevent it from continuing into blank cells.  When the frame number reaches this value, it wraps around back to the first sprite in the sheet, looping.  You can use Frame Per Second combined with particle lifetime to prevent looping.
* Spawn Only - normally, each particle will animate over time, based on the **Frame Per Second** option.  If **Spawn Only** is set, no animation will occur on each individual particle, and **Frame Per Second** is ignored.  Instead, each particle will have a static image assigned to it depending on the value of **Index By Event Order**
   * Index By Event Order - If set to `OFF`, a random starting frame will be picked for each particle.  If `ON`, the particle starting frame will be set to the index of the event that caused it to spawn.  This interacts with the **Event System**, and is a number that increases over time based on how many events are emitted.
   * If this was a "Natural" spawn, caused by the **Spawn Module** instead of Events, the value will be 0, the first frame in the sprite set.



