---
title: "Features"
description: "Graphics Features"
toc: true
weight: 900
---  

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
: An image-based global illumination effect that calculates lighting for a scene using an HDR skybox image.

*Related to: [O3DE Global Skylight (IBL) Component](TBD)* 


 HDRi Skybox   
: Creates a skybox in your scene using an HDR image.

*Related to: [O3DE HDRi Skybox Component](TBD)* 

 
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

*Related to: [O3DE SSAO Component](TBD)* 


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

