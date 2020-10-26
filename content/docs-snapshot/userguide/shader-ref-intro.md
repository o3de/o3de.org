# Shader Reference<a name="shader-ref-intro"></a>

Lumberyard includes the following physically\-based rendering \(PBR\) shaders, which use real\-world physical rules and properties to describe how light interacts with the surface of objects\. This means that game object materials look realistic under all lighting conditions\.

**To access a shader**

1. In Lumberyard Editor, click **Tools**, **Material Editor**\.

1. In the left tree pane, select a material to work with\.

1. Under **Material Settings**, **Shader**, make a selection\.

1. Locate shader\-specific parameters under **Shader Params** and associated **Shader Generation Params**\.

**Note**  
Some shader parameters become available \(are visible\) only if an associated shader generation parameter is first enabled\. This is also true for certain texture map slots \(file paths\) under **Texture Maps**\. 


****  

| Shader Name | Description | 
| --- | --- | 
| [Common\.Cloud Shader](shader-ref-common-cloud.md) | Use to render 3D clouds that use per\-vertex gradient lighting and takes sun color, sky color, and viewer position into account\. | 
| [DistanceClouds Shader](shader-ref-distanceclouds.md) | Use to render cheap 2D clouds that are distantly placed in a sky scene\. | 
| [Eye Shader](shader-ref-eye.md) | Use to render realistic eyes that take sclera, cornea, iris, and eye moisture properties into account\. Eyelash rendering is done using the [Hair Shader](shader-ref-hair.md)\. | 
| [GeometryBeam Shader](shader-ref-geometrybeam.md) | Use to create volumetric light beams that feature dust and turbulence effects\. | 
| [Glass Shader](shader-ref-glass.md) | Use to render glass surfaces with various refractive, reflective, ripple, tint, and cracking effects\. | 
| [Hair Shader](shader-ref-hair.md) | Use to render all hair and fur, imparting different color, stranding, and animation effects\. Use to render eyelashes and eyebrows along with the [Eye Shader](shader-ref-eye.md) for realistic eyes\. | 
| [HumanSkin Shader](shader-ref-humanskin.md) | Use to render skin and it's various physical properties including color, oiliness, pores, stubble, and wrinkles\. | 
| [Illum Shader](shader-ref-illum.md) | The most common shader \- use to create an extremely wide variety of render effects\. | 
| [LightBeam Shader](shader-ref-lightbeam.md) | Use to create volumetric light beams that feature fog and other atmospheric effects\. | 
| Monitor Shader | Use to create retro television screen effects such as grain, noise, chroma shift, and interlacing\. Useful for in\-game displays\. | 
| NoDraw Shader | Use mainly for physics proxies, this shader does not render selected geometry\.  | 
| [ParticleImposter Shader](shader-ref-particleimposter.md) | Use to create particle effects that are not affected by light and hence do not cast shadows or cause reflections\. | 
| [Particles Shader](shader-ref-particles.md) | Use to render particle effects for fire, smoke, lightning, sparks, and fog that are affected by light and as such cast shadows and cause reflections\.  | 
| [Sky Shader](shader-ref-sky.md) | Use to render cheap static sky \(SkyBox\) effects\. | 
| [SkyHDR Shader](shader-ref-skyhdr.md) | Use to render realistic dynamic sky effects that change based on time of day in the level\. | 
| [TemplBeamProc Shader](shader-ref-templbeamproc.md) | Use to create cheap fog\-like effects for light beams\. | 
| [Terrain\.Layer Shader](shader-ref-terrain-layer.md) | Use for painting and blending terrain texture layers in a level\. | 
| [Vegetation Shader](shader-ref-vegetation.md) | Use to render trees, bushes, grass, and other vegetation, as well as imparting various bending motion effects\. | 
| [VolumeObject Shader](shader-ref-volumeobject.md) | Use to render various volumetric objects such as clouds, fog, and smoke, and to impart realistic shading and self\-shadowing effects\. | 
| [Water Shader](shader-ref-water.md) | Use to render the ocean exclusively, and to impart various reflection, ripple, and foam effects\. | 
| [Waterfall Shader](shader-ref-waterfall.md) | Use to render waterfalls exclusively, and provides layering and tiling, as well as motion effects\. | 
| [WaterVolume Shader](shader-ref-watervolume.md) | Use to render volumetric bodies of water including lakes, pools, and rivers, and to impart various reflection, ripple, and foam effects\. | 