---
title: "Features"
description: "Learn about graphics features in Atom Renderer, the graphics engine integrated into Open 3D Engine (O3DE)."
toc: true
weight: 400
---  

This section provides a high-level overview of graphics features that **Atom Renderer** supports. Some of these features are implemented in **Open 3D Engine (O3DE)**, so you can add rendering effects to your project.


## Anti-aliasing
*Aliasing*, the appearance of jagged edges, is a common problem in rendered images. Aliasing is a result of rasterizing smooth curves into pixels. There are a number of anti-aliasing techniques that help mitigate this problem. Atom implements three anti-aliasing techniques: Multisampling Anti-aliasing (MSAA), Subpixel Morphological Anti-aliasing (SMAA), and Temporal Anti-aliasing (TAA).

Multisampling Anti-aliasing (MSAA)
: An anti-aliasing technique that is based off of Supersampling Anti-aliasing (SSAA), another technique where samples are rendered at high-resolution and then down-sampled to low-resolution. MSAA is an optimized version of SSAA. Whereas SSAA samples each individual pixel, MSAA samples from groups of pixels, effectively decreasing the number of calculations. MSAA provides the best results, but still has a high performance cost. In Atom, MSAA is enabled by default.

Subpixel Morphological Anti-aliasing (SMAA)  
: An image-based, post-processing anti-aliasing technique that implements a combination of morphological anti-aliasing and multisampling/supersampling anti-aliasing strategies. It is more efficient than MSAA, but provides lower quality. You can enable and configure SMAA in the file `SMAAConfiguration.azasset`.

Temporal Anti-aliasing (TAA)
: A type of supersampling that takes samples from different locations within a pixel each frame and combines them with samples from previous frames to create a supersampled image. You can also use contrast adaptive sharpening to reduce blurs that TAA may introduce. For more information, refer to [Temporal Anti-Aliasing](taa/) and [Contrast Adaptive Sharpening](cas/).

## Lighting

Punctual Lights  
: Punctual lights are efficient, simple to compute, light sources. Atom integrates punctual lights into O3DE using feature processor interfaces. The following punctual lights are supported:
+ **Point Light** - Casts light from an infinitely small point in all directions within a radius, similar to a light bulb.
+ **Directional Light** - Casts light from an infinitely distant point in a single direction. Directional lights are often used to simulate large distant light sources like the sun, and to cast shadows.

*Related to: [O3DE Light component](/docs/user-guide/components/reference/atom/light/), [O3DE Directional Light component](/docs/user-guide/components/reference/atom/directional-light/), [Point Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_point_light_feature_processor_interface.html), [Directional Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_directional_light_feature_processor_interface.html)*


Area Lights
: A light source that simulates light emitted from an area, rather than from a point or direction. This gives a more realistic depiction of light, since lights in the real world are area lights. Area lights require more complex calculations and are more expensive to render compared to punctual lights. 

*Related to: [O3DE Light component](/docs/user-guide/components/reference/atom/light/), [Disk Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_disk_light_feature_processor_interface.html),  [Capsule Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_capsule_light_feature_processor_interface.html), [Quad Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_quad_light_feature_processor_interface.html), [Polygon Light Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_polygon_light_feature_processor_interface.html)*


Clustered Forward Shading
: A light culling technique that optimizes the amount of light calculations performed by discarding ineffective light sources per sample. The clustered shading technique involves grouping samples from a scene into clusters, and then determining which light sources affects those clusters. Atom implements clustered shading during forward shading passes. 


Diffuse Probe Grid  
: A volume of light probes that provides diffuse global illumination in a specified area. Each probe in the volume uses ray tracing to capture its diffuse lighting environment, known as irradiance.

*Related to: [Diffuse Probe Grid component](/docs/user-guide/components/reference/atom/diffuse-probe-grid/), [Diffuse Probe Grid Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_diffuse_probe_grid_feature_processor_interface.html)*


Reflection Probes  
: A system that provides specular reflections for the environment around capture points, known as probes.  A probe stores its environment as a cubemap and applies the cubemap to meshes that are located inside the probe's volume. With the reflection probes system, the mesh can display environment reflections that match the surroundings at its location.

*Related to: [Reflection Probe component](/docs/user-guide/components/reference/atom/reflection-probe/), [Reflection Probe Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_reflection_probe_feature_processor.html)*


 Subsurface Scattering   
: Describes how light that enters a translucent object scatters through a material. Subsurface scattering is implemented into material properties. 

Related to: [Material System](/docs/atom-guide/dev-guide/materials)


Exposure and Eye Adaptation 
: Lighting mechanics that describe and interact with the brightness of a scene. 

*Exposure control* provides a set of options to adjust the exposure, or amount of light, in a scene. You can set the exposure manually, or automatically using Eye Adaptation mode. Exposure Control is integrated into O3DE via an Exposure Control component, and is processed by Atom via a series of passes. 

*Eye adaptation* is a technique that automatically adjusts the scene's light intensity, simulating the human eye's ability to adjust from light to dark, or vice versa. Eye adaptation is implemented in the Exposure Control feature.  

*Related to: [Exposure Control component](/docs/user-guide/components/reference/atom/exposure-control/)*


Global Skylight (IBL)   
: An image-based global illumination effect that calculates lighting for a scene using an HDR skybox image.

*Related to: [Global Skylight (IBL) component](/docs/user-guide/components/reference/atom/global-skylight-ibl)*


 HDRi Skybox   
: Creates a skybox in your scene using an HDR image.

*Related to: [HDRi Skybox component](/docs/user-guide/components/reference/atom/hdri-skybox/)*


 Decal   
: Non-repeating materials that are projected onto the surface of an object. Decals can be used to apply all manner of unique surface details including painted insignias, chipping, dirt, rust, and more.

*Related to: [Decal component](/docs/user-guide/components/reference/atom/decal/), [Decal Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_decal_feature_processor_interface.html)*


## Meshes
Atom has a unified mesh format with support for several mesh types:
+ **Static** meshes that are stationary. Static meshes can be included in light maps and reflection maps.
+ **Dynamic** meshes that are animated by script or simulation. Dynamic meshes can't be included in light maps or reflection maps.
+ **Skinned** meshes that are bound to a skeleton with per vertex bone weights and animated through transforms applied to the bones of the skeleton. Skinned meshes can't be included in light maps or reflection maps.
+ **Cloth** meshes that dynamically simulate the physical properties of cloth-like objects. Cloth meshes can't be included in light maps or reflection maps.

*Related to: [Mesh component](/docs/user-guide/components/reference/atom/mesh), [Mesh Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_mesh_feature_processor.html), [Skinned Mesh Feature Processer API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_skinned_mesh_feature_processor_interface.html)*  


## Post-processing effects (PostFX)


Tonemapping  
: The process of converting the tonal values of an image from a high dynamic range (HDR) to a lower one. Atom renders in a 16-bit HDR framebuffer and applies tonemapping to make the rendered image suitable for view on a wide variety of digital screen technologies, from standard 48-nit LDR displays (sRGB/rec.709) to various HDR display types that may be 1000-nit or brighter. In O3DE, the **Display Mapper** component configures how the renderer performs tonemapping.

Atom's default tonemapping is [ACES](https://acescentral.com/), which simplifies and standardizes color management by maintaining artistic integrity and fidelity. It allows the best reproduction of color from the renderer to the display and across many modern DCC applications that support ACES. 

*Related to: [Display Mapper component](/docs/user-guide/components/reference/atom/display-mapper/)*


Color Grading  
: The process of altering the visual appearance of an image. This technique can present images in different environments on different devices or enhance artistic style. Color grading can enhance various attributes of an image such as contrast, color, saturation, detail, black level, and white point. Color grading and tonemapping often work together to control the color and tone of the resulting image displayed on different devices. In O3DE, you can perform HDR color grading in the render pipeline via the PostFX system, by using a color look-up table (LUT) through the **Look Modification** component, or by applying a single global LDR color grading on the final display output through the Display Mapper component.

*Related to: [Look Modification component](docs/user-guide/components/reference/atom/look-modification.md), [Display Mapper component](/docs/user-guide/components/reference/atom/display-mapper/)*

Post-processing Volumes   
: Various mechanisms in O3DE control the blending of PostFX layers by weighting each layer within a volume or area through a shape, gradient signal, or radius.

- A **PostFX Radius Weight Modifier** component sets up a simple blend that's based on distance.
  
- A **PostFX Shape Weight Modifier** component and a Shape component sets up a blend that's based on volume and falloff.

- A **PostFX Gradient Weight Modifier** component sets up a more complex blend by using a gradient signal as a masking operation.
 
*Related to: PostFX components ([PostFX Layer](/docs/user-guide/components/reference/atom/postfx-layer/), [PostFX Gradient Weight](/docs/user-guide/components/reference/atom/postfx-gradient-weight-modifier/), [PostFX Shape Weight Modifier](/docs/user-guide/components/reference/atom/postfx-shape-weight-modifier/), [PostFX Radius Weight Modifier](/docs/user-guide/components/reference/atom/postfx-radius-weight-modifier/)), [Post Process Feature Processor API](/docs/api/gems/Atom/class_a_z_1_1_render_1_1_post_process_feature_processor_interface.html)*


Bloom  
: A post-processing effect that simulates real-world glow or light bleed that is caused by an overwhelming amount of light.

*Related to: [Bloom component](/docs/user-guide/components/reference/atom/bloom/)* 

Chromatic Aberration   
: A post-processing effect that simulates a lens that focuses different wavelengths of light at different points, creating fringes of color around edges in the image.

*Related to: [Chromatic Aberration component](/docs/user-guide/components/reference/atom/chromatic-aberration/)* 

Deferred Fog   
: A post-processing effect that creates volumetric fog in a scene. Deferred fog is calculated using dynamic noise octaves to create fog, and ray marching to render the fog.

*Related to: [Deferred Fog component](/docs/user-guide/components/reference/atom/deferred-fog/)* 


Depth of Field   
: A post-processing effect that uses a point-of-focus and distance to simulate lens effects of real world cameras that focus on a specific area. Atom handles depth of field effects using shader passes.

*Related to: [Depth of Field component](/docs/user-guide/components/reference/atom/depth-of-field/)* 


Screen Space Ambient Occlusion (SSAO)   
: Real-time estimation of ambient occlusion as a screen space post-proccessing effect. SSAO shades areas that are blocked from receiving ambient light by nearby surfaces. The effect is most evident in the shadows created in the cracks, crevices, and creases of a surface.

*Related to: [SSAO component](/docs/user-guide/components/reference/atom/ssao/)* 


## Rendering
Motion Vectors   
: Calculations that describe the motion of an object at a specific time. Motion vectors are implemented using passes that calculate movement, in two parts: camera motion and object motion. The camera motion pass records clip space motion caused by camera movement. The object motion pass records clip space motion caused by both camera movement and object transformation. Motion vectors are necessary to compute effects such as motion blur and temporal anti-aliasing (TAA).


Multi-scene   
: Support for rendering to multiple scenes. An example of this implementation can be found in the Atom Sample Viewer. 

Multi-render Pipeline   
: Support for using multiple render pipelines in a scene. Multiple render pipelines allow you to switch render pipelines at runtime. An example of this implementation can be found in the Atom Sample Viewer.