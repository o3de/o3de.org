---
description: ' Use the &particle-editor; in &ALYlong; to create and manage particles
  in your game, such as explosions, smoke, water, and so on. '
title: Adding particle effects
---
# Adding particle effects {#particle-intro}

Lumberyard includes an advanced particle effects system that you can use to simulate explosions, fire, smoke, sparks, water spray, fog, snow, rain, and other effects\. Use the **Particle Editor** to create and manage particle effects in your game\. You can place particle emitters in your level, link them to an object, set up a material to define a custom effect, and control these effects from **Script Canvas** and the Track View\.

Lumberyard uses two shaders for rendering particles:
+ [Particles Shader](/docs/userguide/shaders/particles.md) – Render particle effects that are affected by light\. These effects can cast shadows and cause reflections\.
+ [ParticleImposter Shader](/docs/userguide/shaders/particleimposter.md) – Render mesh particle effects that are not affected by light\. These effects do not cast shadows or cause reflections\.

**Topics**
+ [Using the Particle Editor](/docs/userguide/particles/editor/_index.md)
+ [Particle Effects Best Practices](/docs/userguide/particles/best-practices.md)
+ [Advanced Particle Techniques](/docs/userguide/particles/advanced.md)
+ [Particle Debugging with Console Variables](/docs/userguide/particles/debugging.md)