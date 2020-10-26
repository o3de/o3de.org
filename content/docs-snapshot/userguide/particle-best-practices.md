# Particle Effects Best Practices<a name="particle-best-practices"></a>

The total number of particles in a scene is not a critical factor when considering best practices for working with particles\. Total fill\-rate, physics, and \(to some extent\) spawn rate are more important\. Following are some best practices for working with particles:
+ Use soft particles only on subemitters that are near the ground and have only small particles\. Create similar subemitters higher up that emit particles that never intersect with the ground and don't require soft particles\.
+ If sharp details are not required, use low\-resolution textures and texture compression\.
+ Use an alpha texture with high or average opacity rather than additive blending\.
+ Each second\-generation effect causes an emitter to be created for each particle in the parent effect\. Use this sparingly because it can be expensive\.
+ Use physicalized particles sparingly because they are expensive\. You can split an effect into subeffects, so that only a few large particles have physics enabled for appearance\. The rest go through the ground or fade out quickly\.
+  Instead of multiple overlaid sprites for chaotic glow effects, use only two particles at a time\. Carefully tune the lifetime and rotation rate, and set curves for **Alpha**, **Color**, and **Size** to combine in chaotic ways\. Or, increase the **Emissive Lighting** parameter\. 
+ For large, full\-screen particles, use a **Fill Rate Cost** value of 1 or above\.
+ For small particles, such as sparks, set a maximum distance value to ensure that they aren't rendered as small, single pixel particles\. Use the lowest **Config spec** setting to turn off small particles that are used in collisions\.