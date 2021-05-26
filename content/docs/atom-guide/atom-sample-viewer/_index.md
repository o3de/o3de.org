---
title: "Atom Sample Viewer"
description: "The Atom Sample Viewer showcases samples of some features and rendering techniques capable in Atom."
toc: true
weight: 300
---  

{{< preview-new >}}

The **Atom Sample Viewer** showcases samples of features and rendering techniques that the Atom Renderer supports.

## Quick Start

To launch the Atom Sample Viewer, run `AtomSampleViewerStandalone.exe` located in the directory `<build>/bin/profile`. The following list of samples can be viewed in the Atom Sample Viewer. 

## Debug Menus

The following debug menus in the Atom Sample Viewer are tools for profiling and debugging systems across the rendering engine. You can run these tools while viewing samples in the Atom Sample Viewer.
| Menu | Description |
|---------|---------|
| [CPU Profiler](debug-menu-samples.md#cpu-profiler) | Provides CPU timing information, including the time spent working on RHI threads and on waiting for the GPU work to complete. |
| [Culling Debug Window](debug-menu-samples.md#culling-debug-window) | Provides information on what the culling system is doing in real time.  |
| [GPU Profiler](debug-menu-samples.md#gpu-profiler) | Provides information on the GPU workload for each render pass. |
| [Pass Tree](debug-menu-samples.md#pass-tree) | Displays a pass hierarchy and pass details. |
| [Transient Attachment Profiler](debug-menu-samples.md#transient-attachment-profiler) | Provides information about transient allocations that happen during a frame. |


## Graphics Feature Samples
The following samples demonstrate graphics features and rendering techniques that can enhance the visual effects in your simulation.
| Sample | Description |
|---------|---------|
| [Area Lights](graphics-feature-samples.md#area-lights) | Demonstrates different area light types with modifiable parameters. |
| [Bloom](graphics-feature-samples.md#bloom) | Demonstrates bloom effects with modifiable parameters. |
| [Checkerboard Render Pipeline](graphics-feature-samples.md#checkerboard-render-pipeline) | Demonstrates how to set up a basic checkerboard render pipeline. |
| [Depth of Field](graphics-feature-samples.md#depth-of-field) | Demonstrates the depth of field effect with modifiable parameters. |
| [Diffuse Global Illumination](graphics-feature-samples.md#diffuse-global-illumination) | Demonstrates diffuse global illumination using ray-traced light probes.  |
| [Exposure](graphics-feature-samples.md#exposure) | Demonstrates camera exposure with eye adaptation and other modifiable parameters. |
| [Light Culling](graphics-feature-samples.md#light-culling) | Demonstrates the light culling system with configurable parameters to spawn a large amount of lights and decals. |
| [Parallax](graphics-feature-samples.md#parallax) | Demonstrates the effects of parallax mapping and pixel depth offset. |
| [Shadow](graphics-feature-samples.md#shadow) | Demonstrates shadow effects for directional lights and spot lights with a configurable lighting setup. |
| [Shadowed Bistro](graphics-feature-samples.md#shadowed-bistro) | Similar to the Shadow sample, in a more complex scene. |
| [Skinned Mesh](graphics-feature-samples.md#skinned-mesh) | Demonstrates how to create skinned mesh, calculate bone transforms, and render using the Skinned Mesh Feature Processor. |
| [SSAO](graphics-feature-samples.md#ssao) | Demonstrates screen space ambient occlusion (SSAO) with modifiable parameters. |
| [SSR](graphics-feature-samples.md#ssr) | Demonstrates screen space reflections (SSR) on different ground materials. |
| [Tonemapping](graphics-feature-samples.md#tonemapping) | Visualizes how ACES tone mapping affects various colors and levels of brightness. |
| [Transparency](graphics-feature-samples.md#transparency) | Demonstrates transparent materials. |


## Rendering Hardware Interface (RHI) Samples
The following samples demonstrate rendering features in the RHI. 
| Sample | Description |
|---------|---------|
| [Alpha to Coverage](rhi-samples.md#alpha-to-coverage) | Demonstrates alpha to coverage, a multi-sampling technique for anti-aliasing. |
| [Async Compute](rhi-samples.md#async-compute) | Demonstrates the use of asynchronous compute to render meshes with shadows, and to apply simple tonemapping during post-processing. |
| [Bindless Prototype](rhi-samples.md#bindless-prototype) | Explores a method for supporting bindless resources by allocating a sizeable float buffer.  |
| [Compute](rhi-samples.md#compute) | Demonstrates the functionality of a dispatch pipeline by calculating a 2D fractal on a compute shader. |
| [Copy Queue](rhi-samples.md#copy-queue) | Demonstrates queued uploads of data to the GPU while rendering. |
| [Dual Source Blending](rhi-samples.md#dual-source-blending) | Demonstrates the functionality of dual source blending. |
| [Indirect Rendering](rhi-samples.md#indirect-rendering) | Demonstrates indirect rendering by executing commands from the GPU rather than from the CPU.  |
| [Input Assembly](rhi-samples.md#input-assembly) | Demonstrates how to handle vertex buffer generation on a compute shader, and how to declare shader inputs. |
| [MSAA](rhi-samples.md#msaa) | Demonstrates multisampling anti-aliasing (MSAA) on a simple triangle. |
| [Multiple Views](rhi-samples.md#multiple-views) | Demonstrates how to render to multiple views. |
| [Multi-Render Target](rhi-samples.md#multi-render-target) | Demonstrates how to render to multiple targets, merge them together, and render the final output to the screen. |
| [Multi-Thread](rhi-samples.md#multi-thread) | Demonstrates parallelization by the Frame Scheduler by executing multi-threaded command lists. |
| [Multi-Viewport Swapchain](rhi-samples.md#multi-viewport-swapchain) | Demonstrates swap chains by animating colors across multiple screens. |
| [Queries](rhi-samples.md#queries) | Demonstrates query pools, which manage a collection of queries, for occlusion queries, predication, timestamp information, and pipeline statistics. |
| [Ray Tracing](rhi-samples.md#raytracing) | Demonstrates ray tracing against a simple scene. |
| [Spherical Harmonics](rhi-samples.md#spherical-harmonics) | Demonstrates functionalities provided by the spherical harmonics (SH) library. |
| [Stencil](rhi-samples.md#stencil) | Tests the functionality of a stencil buffer. |
| [Subpass](rhi-samples.md#subpass) | Demonstrates the use of a simple deferred renderer with two subpasses. |
| [Swapchain](rhi-samples.md#swapchain) | Demonstrates swap chains by animating colors on a single screen. |
| [Texture](rhi-samples.md#texture) | Demonstrates textures on a quad. |
| [Texture3D](rhi-samples.md#texture3d) | Demonstrates support for 3D images using the RHI's Image structure. There are two structures to represent images: Image and Streaming Image.|
| [Texture Array](rhi-samples.md#texture-array) | Demonstrates support for image array descriptors and how to sample them with a uniform index. |
| [Texture Map](rhi-samples.md#texture-map) | Tests texture type functionality for the following: Texture1D, Texture1DArray, Texture2DArray, TextureCube, TextureCubeArray, and Texture3D.  |
| [Triangle](rhi-samples.md#triangle) | Demonstrates how to draw and animate a triangle on a screen. Also known as a "Hello Triangle" example. |
| [Triangle Constant Buffer](rhi-samples.md#triangle-constant-buffer) | Demonstrates how to animate triangles using a constant buffer. |


## Rendering Pipeline Interface (RPI) Samples
The following samples demonstrate rendering features in the RPI. 
| Sample | Description |
|---------|---------|
| [Asset Load](rpi-samples.md#asset-load) | Demonstrates the ability to quickly load meshes and render many objects at high frame rates. |
| [Aux Geom](rpi-samples.md#aux-geom) | Demonstrates the AuxGeom feature (auxiliary geometry), which provides an interface for drawing geometry such as points, lines, polylines, triangles, AABBs, OBBs, spheres, cones, and cylinders.  |
| [Bistro Benchmark](rpi-samples.md#bistro-benchmark) | Showcases many different features of Atom and allows profiling of all these systems working together. |
| [Decal](rpi-samples.md#decal) | Demonstrates decals on various objects with different materials and other modifiable properties. |
| [Dynamic Draw](rpi-samples.md#dynamic-draw) | Demonstrates how to use the [DynamicDrawContext API](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_dynamic_draw_context.html) by rendering several pyramids with different render states. |
| [Dynamic Material](rpi-samples.md#dynamic-material) | Demonstrates support for multiple instances of a material, and how to update those material instances' properties in real time. |
| [Material Hot Reload](rpi-samples.md#material-hot-reload) | Tests hot-reloading of material and shader assets by making changes to source data files. |
| [Mesh](rpi-samples.md#mesh) | Demonstrates a single mesh and material. You can select from a collection of mesh and material. |
| [MSAA](rpi-samples.md#msaa) | Demonstrates how to load a new pipeline with MSAA enabled, and a simple scene with a single mesh. |
| [Multi-Render Pipeline](rpi-samples.md#multi-render-pipeline) | Demonstrates how to create two render pipelines. |
| [Multi-Scene](rpi-samples.md#multi-scene) | Demonstrates how to create two RPI scenes with different content in each. |
| [Multi-View Single Scene Aux Geom](rpi-samples.md#multi-view) | Tests the ability to send draw calls to any selection of windows in a scene. |
| [Root Constants](rpi-samples.md#root-constants) | Demonstrates the use of root constants to pass information quickly from the CPU to the shader. |
| [Scene Reload Soak](rpi-samples.md#scene-reload-soak) | Tests Atom's stability by repeatedly performing many different commands across various times. This sample is used to discover timing-sensitive issues.  |
| [Shading](rpi-samples.md#shading) | Demonstrates rendering a shaderball with default StandardPBR material, with the LuxCore feature. |
| [Streaming Image](rpi-samples.md#streaming-image) | Demonstrates a streaming image's streaming process. |
