# Creating Bodies of water<a name="terrain-water-intro"></a>

You can create realistic\-looking ocean, lakes, rivers, waterfalls, and pools with waves and ripples\. Players and objects interacting with water surfaces also generate waves and ripples\. Water gets its appearance from reflections on the surface and the interaction of light with particles suspended underneath the surface\. You need both to achieve an authentic look\.

Lumberyard offers three different shaders for rendering bodies of water:
+ **[Water Shader](shader-ref-water.md)** – For oceans only
+ **[WaterVolume Shader](shader-ref-watervolume.md)** – For lakes, rivers, ponds and all other water volumes
+ **[Waterfall Shader](shader-ref-waterfall.md)** – For waterfalls only

Lumberyard also supports caustics\. Caustics are optical properties caused by light refracting through a volume of water, creating light and dark patterns at the bottom\. Realistic caustic effects also include water ripples generated from players and other objects interacting with the water surface\.

**Note**  
To make caustics visible, you must place water volumes at a height of 1 or greater in your level\.

**Topics**
+ [Preparing the Terrain](terrain-water-prepare-terrain.md)
+ [Setting Ocean Parameters](terrain-water-ocean.md)
+ [Creating Rivers](terrain-rivers-intro.md)
+ [Adding Waterfalls](terrain-water-waterfalls.md)
+ [Adding Water Puddles](terrain-water-puddles.md)
+ [Adding Fog Beneath Water](terrain-water-fog.md)
+ [Advanced Water Volume Parameters](terrain-water-params-ref.md)