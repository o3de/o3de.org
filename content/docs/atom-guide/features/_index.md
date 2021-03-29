---
title: "Features"
description: "Learn about graphics features in the Atom renderer"
toc: true
weight: 900
---  

<<<<<<< HEAD
This section provides a high-level overview of graphics features that the Atom renderer supports. Some of these features are also implemented in Open 3D Engine (O3DE), so you can add rendering effects to your project. 


## Anti-aliasing
A common problem in rendered images is aliasing, or the appearance of jagged edges, which is a result of rasterizing smooth curves into pixels. There are a number of anti-aliasing techniques that help mitigate this issue. Atom implements two anti-aliasing techniques: Multisampling Anti-aliasing (MSAA) and Subpixel Morphological Anti-aliasing (SMAA). 

Multisampling Anti-aliasing (MSAA)   
: MSAA is an anti-aliasing technique that is based off of Supersampling Anti-aliasing (SSAA), another technique where samples are rendered at high-resolution and then down-sampled to low-resolution. MSAA is an optimized version of SSAA. Whereas SSAA samples each individual pixel, MSAA samples from groups of pixels, effectively decreasing the number of calculations. MSAA provides the best results, but still has a high performance cost. In Atom, MSAA is enabled by default. 

Subpixel Morphological Anti-aliasing (SMAA)  
: An image-based, post-processing anti-aliasing technique that implements a combination of morphological anti-aliasing and multi-/super- sampling anti-aliasing strategies. It is more efficient than MSAA, but provides less quality. SMAA can be enabled and configured in the file `SMAAConfiguration.azasset`. 


## Lighting

Punctual Lights  
: Punctual lights are efficient, simple to compute, light sources. Atom integrates punctual lights into O3DE using feature processor interfaces. The following punctual lights are supported:
+ **Point Light** - Casts light from an infinitely small point in all directions within a radius, similar to a light bulb.
+ **Directional Light** - Casts light from an infinitely distant point in a single direction. Directional lights are often used to simulate large distant light sources link the sun, and to cast shadows.

*Related to: [Point Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_point_light_feature_processor_interface.html), [Spot Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_spot_light_feature_processor_interface.html), [Directional Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_directional_light_feature_processor_interface.html), [O3DE Point Light Component](TBD), [O3DE Directional Light Component](TBD)*


Area Lights
: A light source that simulates light emitted from an area, rather than from a point or direction. This gives a more realistic depiction of light, since lights in the real world are area lights. Area lights require more complex calculations and are more expensive to render compared to punctual lights. 

*Related to: [Capsule Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_capsule_light_feature_processor_interface.html), [Disk Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_disk_light_feature_processor_interface.html), [Polygon Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_polygon_light_feature_processor_interface.html), [Quad Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_quad_light_feature_processor_interface.html), [O3DE Area Light Component](TBD)*


Clustered Forward Shading
: A light culling technique that optimizes the amount of light calculations performed by discarding ineffective light sources per sample. The clustered shading technique involves grouping samples from a scene into clusters, and then determining which light sources affects those clusters. Atom implements clustered shading during forward shading passes. 


Diffuse Probe Grid  
: A volume of light probes that provides diffuse global illumination in a specified area. Each probe in the volume uses ray tracing to capture its diffuse lighting environment, known as irradiance.

*Related to: [Diffuse Probe Grid Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_diffuse_probe_grid_feature_processor_interface.html), [Diffuse Probe Grid](TBD)*


Reflection Probes  
: A system that provides specular reflections for the environment around capture points, known as probes.  A probe stores its environment as a cubemap and applies the cubemap to meshes that are located inside the probe's volume. With the reflection probes system, the mesh can display environment reflections that match the surroundings at its location.

*Related to: [Reflection Probe Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_reflection_probe_feature_processor.html), [O3DE Reflection Probe Component](TBD)*


 Subsurface Scattering   
: Describes how light that enters a translucent object scatters through a material. Subsurface scattering is implemented into material properties. 

Related to: [Material System](docs\atom-guide\core-systems\materials\_index.md)


Exposure and Eye Adaptation 
: Lighting mechanics that describe and interact with the brightness of a scene. 

Exposure control provides a set of options to adjust the exposure, or amount of light, in a scene. You can set the exposure manually, or automatically using Eye Adaptation mode. Exposure Control is integrated into O3DE via an Exposure Control component, and is processed by Atom via a series of passes. 

Eye adaptation is a technique that automatically adjusts the scene's light intensity, simulating the human eye's ability to adjust from light to dark, or vice versa. Eye adaptation is implemented in the Exposure Control feature.  

*Related to: [O3DE Exposure Control Component](/docs/user-guide/components/reference/atom/exposure-control.md)*


Global Skydome (IBL)   
=======
Area Lights
: Simulate light being emitted from an area, rather than from a point or direction. It is a more realistic depiction of light, since lights in the real world are area lights. Area lights require more complex calculations and is more expensive to render compared to punctual lights. 

*Related to: [Capsule Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_capsule_light_feature_processor_interface.html), [Disk Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_disk_light_feature_processor_interface.html), [Polygon Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_polygon_light_feature_processor_interface.html), [Quad Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_quad_light_feature_processor_interface.html), [O3DE Area Light Component](TBD)*


 Bloom   
: A post-processing effect that simulates real-world glow or light bleed that is caused by an overwhelming amount of light. 

*Related to: [O3DE Bloom Component](TBD)* 


 Color Grading   
: Color grading adjusts the color output of the render. There are two color grading modes: HDR Color Grading and LDR Color Grading. This feature is integrated in the **Display Mapper** feature. 


 Decal   
: Non-repeating images or textures that are applied to the surface of an object. Decal are culled per-view, so they should be handled in a View SRG.

*Related to: [Decal Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_decal_feature_processor_interface.html), [O3DE Decal Component](/docs/user-guide/components/reference/atom/decal.md)* 


 Deferred Fog   
: A post-processing effect that creates volumetric fog in a scene. In Atom, this technique uses dynamic noise octaves to create clouds, and uses ray marching along the fog layer to apply the clouds. 

*Related to: [O3DE Deferred Fog Component](TBD)* 


 Depth of Field   
: A post-processing effect that uses a point-of-focus and distance to simulate the bokeh effect in a camera. Atom handles depth of field effects using shader passes.

*Related to: [O3DE Depth of Field Component](/docs/user-guide/components/reference/atom/depth-of-field.md)* 


Diffuse Probe Grid
: A volume of diffuse probes that provides diffuse global illumination in that area. Each probe in the volume uses ray tracing to capture its diffuse lighting environment, known as irradiance.

*Related to: [Diffuse Probe Grid Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_diffuse_probe_grid_feature_processor_interface.html), [Diffuse Probe Grid](TBD)*


 Display Mapper   
: The Display Mapper performs tone mapping and color grading. This feature is integrated into O3DE by default, however you can configure its properties by adding the Display Mapper component to your level. Atom applies this effect using a sequence of passes

*Related to: [O3DE Display Mapper Component](TBD)* 


 Exposure Control   
: A set of parameters to adjust the exposure in a scene. You can choose to set the exposure manually, or automatically using **Eye Adaptation** mode. **Exposure Control** is integrated into O3DE via an Exposure Control component, and is processed by Atom via a series of passes. 

*Related to: [O3DE Exposure Control Component](/docs/user-guide/components/reference/atom/exposure-control.md)*, [Eye Adaptation](#eye-adaptation)


 Eye Adaptation   
: A technique that automatically adjusts the scene's light intensity, simulating the human eye's ability to adjust from light to dark, or vice versa. The **Eye Adaptation** mode is implemented in the **Exposure Control** feature. 

Related to: [Exposure Control](#exposure-control)


 Global Skylight (IBL)   
>>>>>>> 705ec3f5 (Init features page with features list)
: An image-based global illumination effect that calculates lighting for a scene using an HDR skybox image.

*Related to: [O3DE Global Skylight (IBL) Component](TBD)* 


 HDRi Skybox   
: Creates a skybox in your scene using an HDR image.

*Related to: [O3DE HDRi Skybox Component](TBD)* 

<<<<<<< HEAD

 Decal   
: Non-repeating materials that are projected onto the surface of an object. Decals can be used to apply all manner of unique surface details including painted insignias, chipping, dirt, rust, and more. 

*Related to: [Decal Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_decal_feature_processor_interface.html), [O3DE Decal Component](/docs/user-guide/components/reference/atom/decal.md)* 


## Meshes
Atom has a unified mesh format with support for several mesh types:
+ **Static** meshes that are stationary. Static meshes can be included in light maps and reflection maps.
+ **Dynamic** meshes that are animated by script or simulation. Dynamic meshes can't be included in light maps or reflection maps.
+ **Skinned** meshes that are bound to a skeleton with per vertex bone weights and animated through transforms applied to the bones of the skeleton. Skinned meshes can't be included in light maps or reflection maps.
+ **Cloth** meshes that dynamically simulate the physical properties of cloth-like objects. Cloth meshes can't be included in light maps or reflection maps.

*Related to: [Mesh Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_mesh_feature_processor.html), [O3DE Mesh Component](/content/docs/user-guide/components/reference/atom/mesh.md), [Skinned Mesh Feature Processer API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_skinned_mesh_feature_processor_interface.html), [O3DE Skinned Mesh Component](/content/docs/user-guide/components/reference/atom/skinned-mesh.md)*  


## Processing and Post FX

Tone Mapping and Color Grading   
: Techniques that adjust the overall lighting and color in a scene. Tone mapping simulates high dynamic range (HDR) by mapping one set of colors to another set that has a higher range. Color grading adjusts the color output of the render. There are two color grading modes: HDR Color Grading and LDR Color Grading. Tone mapping and color grading can be configured in O3DE using the **Display Mapper**. You can also view a demo of tone mapping and color grading in the Atom Sample Viewer. 

*Related to: [O3DE Display Mapper Component](TBD), [Tonemapping (Atom Sample Viewer)](\docs\atom-guide\atom-sample-viewer\graphics-feature-samples.md#tonemapping)*

Post-processing Volumes   
: Volumes that allow PostFX to be bounded in certain shapes and areas in the game. Post-processing volumes are integrated into O3DE via a shape component and one of the PostFX components.

*Related to: [Post Process Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_post_process_feature_processor_interface.html), [O3DE Post Process Components](/docs/user-guide/components/reference/atom/post-process/index.md)*


Bloom   
: A post-processing effect that simulates real-world glow or light bleed that is caused by an overwhelming amount of light.

*Related to: [O3DE Bloom Component](TBD)* 


Deferred Fog   
: A post-processing effect that creates volumetric fog in a scene. Deferred fog is calculated using dynamic noise octaves to create fog, and ray marching to render the fog.

*Related to: [O3DE Deferred Fog Component](TBD)* 


Depth of Field   
: A post-processing effect that uses a point-of-focus and distance to simulate a bokeh effect (softening of distant objects) in a camera. Atom handles depth of field effects using shader passes.

*Related to: [O3DE Depth of Field Component](/docs/user-guide/components/reference/atom/depth-of-field.md)* 


Screen Space Ambient Occlusion (SSAO)   
: Real-time estimation of ambient occlusion (a shading method based on both light sources and surrounding objects) as a screen space post effect.  Atom implements SSAO through a series of compute shader passes.  
=======
 
 Light Culling   
: Atom implements a clustered light culling system to reduce the amount of work done during forward shading. 


 Mesh   
: Mesh covers both *static* and *dynamic* (non-skinned) meshes. Static meshes remain stationary and can be part of the light baking process. Dynamic meshes can move around, but they are not animated nor skinned. They cannot receive light maps or be part of the light baking process.

*Related to: [Mesh Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_mesh_feature_processor.html), [O3DE Mesh Component](/content/docs/user-guide/components/reference/atom/mesh.md)*


 Motion Vectors   
: Atom generates motion vectors, which are necessary to develop features such as motion blur and temporal anti-aliasing.


 Multi-scene   
: Atom supports rendering to multiple scenes. An example of this implementation can be found in the Atom Sample Viewer. 

*Related to: [Multi-Scene RPI Sample (Atom Sample Viewer)](/docs/atom-guide/atom-sample-viewer/rpi-samples#multi-scene)* 


 Multi-render Pipeline   
: Atom supports multiple render pipelines per scene. With multiple render pipelines set up, you can easily switch to a different pipeline at runtime. An example of this implementation can be found in the Atom Sample Viewer.

*Related to: [Multi-Scene RPI Sample (Atom Sample Viewer)](/docs/atom-guide/atom-sample-viewer/rpi-samples/#multi-render-pipeline)* 


 Multi-sampling Anti-Aliasing (MSAA)   
: A common anti-aliasing technique that produces the best results, but at high performance cost. This is enabled in Atom by default.

 Post Processing Volumes   
: Volumes that allow PostFX to be bounded in certain shapes and areas in the game. This feature is integrated into O3DE via a shape component and one of the PostFX components.

*Related to: [Post Process Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_post_process_feature_processor_interface.html), [O3DE Post Process Components](/docs/user-guide/components/reference/atom/post-process/index.md)*


Punctual Lights
: Punctual lights are light sources that come from a single point. They are the most efficient and contain the simplest calculations. They include point, spot, and directional lights.

*Related to: [Point Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_point_light_feature_processor_interface.html), [Spot Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_spot_light_feature_processor_interface.html), [Directional Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_directional_light_feature_processor_interface.html)*

Reflection Probes
: The Reflection Probe system provides specular reflections for the environment around a capture points known as Probes.  A probe stores its environment as a cubemap, and applies this cubemap to meshes that are located inside the probe's volume.  This enables the mesh to display environment reflections that match the surroundings at its location.

*Related to: [Reflection Probe Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_reflection_probe_feature_processor.html), [O3DE Reflection Probe Component](TBD)*


 Screen Space Ambient Occlusion (SSAO)   
: A technique for estimating the ambient occlusion effect in a scene at real time. Atom implements SSAO through a series of compute shader passes.  
>>>>>>> 705ec3f5 (Init features page with features list)

*Related to: [O3DE SSAO Component](TBD)* 


<<<<<<< HEAD
## Rendering
Motion Vectors   
: Calculations that describe the motion of an object at a specific time. Motion vectors are implemented using passes that calculate movement, in two parts: camera motion and object motion. The camera motion pass records clip space motion caused by camera movement. The object motion pass records clip space motion caused by both camera movement and object transformation. Motion vectors are necessary to compute effects such as motion blur and temporal anti-aliasing (TAA).


Multi-scene   
: Support for rendering to multiple scenes. An example of this implementation can be found in the Atom Sample Viewer. 

*Related to: [Multi-Scene RPI Sample (Atom Sample Viewer)](/docs/atom-guide/atom-sample-viewer/rpi-samples#multi-scene)* 


Multi-render Pipeline   
: Support for using multiple render pipelines in a scene. Multiple render pipelines allow you to switch render pipelines at runtime. An example of this implementation can be found in the Atom Sample Viewer.

*Related to: [Multi-Scene RPI Sample (Atom Sample Viewer)](/docs/atom-guide/atom-sample-viewer/rpi-samples/#multi-render-pipeline)* 
=======
 Subpixel Morphological Anti-Aliasing (SMAA)  
: A shader-based, anti-aliasing technique that is more efficient than traditional methods, like MSAA. SMAA can be edited through the configuration file `SMAAConfiguration.azasset`. 



 Subsurface Scattering   
: Describes how light that enters a translucent object scatters through a material. This feature is implemented into material properties. 

Related to: [Material System](docs\atom-guide\core-systems\materials\_index.md)


 Skinned Mesh   
: Skinned mesh can be animated and skinned using bone matrices or some other method. 

*Related to: [Skinned Mesh Feature Processer API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_skinned_mesh_feature_processor_interface.html), [O3DE Skinned Mesh Component](/content/docs/user-guide/components/reference/atom/skinned-mesh.md)*  


 Tone Mapping   
: Tone mapping is a technique that simulates high-dynamic range by mapping one set of colors to another set that has higher range. It is integrated into the **Display Mapper**. 

>>>>>>> 705ec3f5 (Init features page with features list)
