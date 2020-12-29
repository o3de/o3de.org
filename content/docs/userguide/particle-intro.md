# Adding particle effects<a name="particle-intro"></a>

Lumberyard includes an advanced particle effects system that you can use to simulate explosions, fire, smoke, sparks, water spray, fog, snow, rain, and other effects\. Use the **Particle Editor** to create and manage particle effects in your game\. You can place particle emitters in your level, link them to an object, set up a material to define a custom effect, and control these effects from **Script Canvas** and the Track View\.

Lumberyard uses two shaders for rendering particles:
+ [Particles Shader](shader-ref-particles.md) – Render particle effects that are affected by light\. These effects can cast shadows and cause reflections\.
+ [ParticleImposter Shader](shader-ref-particleimposter.md) – Render mesh particle effects that are not affected by light\. These effects do not cast shadows or cause reflections\.

**Topics**
+ [Using the Particle Editor](particle-editor.md)
+ [Particle Effects Best Practices](particle-best-practices.md)
+ [Advanced Particle Techniques](particle-advanced.md)
+ [Particle Debugging with Console Variables](particle-debugging.md)