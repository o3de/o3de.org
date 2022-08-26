---
linkTitle: Render Pipelines
title: Render Pipelines in Atom Renderer
description: You can use pre-built render pipelines or create custom ones in Atom Renderer, the graphics engine integrated into Open 3D Engine (O3DE).
toc: false
weight: 150
---

A *render pipeline* describes a sequence of steps to render a 3D scene on a 2D screen. In **Atom Renderer**, the render pipeline is completely modular and driven by a series of passes. This lets you customize the render pipeline for features such as shadows, lighting, and post effects. You can also completely change the rendering technique, for example, to Deferred, Checkerboard, or Forward+. By default, Atom implements *Forward+* rendering in its pre-built render pipelines.

Atom's pre-built render pipelines are ready to use and encompass common use cases for **Open 3D Engine (O3DE)**:
- **Main Rendering Pipeline**: The default render pipeline for Windows, Linux, and macOS platforms. 
- **Low-end Rendering Pipeline**: The default render pipeline for iOS and Android platforms.

The render pipeline consists of a root pass that drives a collection of passes to handle different graphics techniques in the render pipeline. For more information, refer to the [Pass System](/docs/atom-guide/dev-guide/passes/pass-system/) section.


## Supported features in pre-built render pipelines

This table lists the features that are supported by the Main Rendering Pipeline and the Low-end Rendering Pipeline by default.

| Feature | Description | Main Pipeline | Low-end Pipeline |
| - | - | - | - |
| Skinning | Compute-shader-based mesh skinning for bone weighted animations and morph targets. | Yes | Yes |
| Directional shadows | Cascaded shadowmap to simulate sun light. | Yes | Yes |
| Punctual shadows | Shadows for punctual light types: point and spot lights. | Yes | Yes |
| Area lights | Spherical, disk, capsule, quad, and polygonal lights. | Yes | Yes |
| Light culling | Tile-based or cluster-based light culling for efficient light iteration in the Forward+ pass. | Yes | Yes |
| RTX global illumination | Real-time global illumination that uses NVIDIA RTXGI (RTX Global Illumination). | Yes | No |
| Reflection probe | Generates and uses reflection probes for specular image-based lighting (IBL). | Yes | Yes |
| Physically based sky | Basic sky rendering that uses physically-based atmospheric modeling. | Yes | No |
| HDR skybox | Uses an HDR image as a skybox. | Yes | Yes |
| Screen space ambient occlusion (SSAO) | Applies SSAO to the scene to create contact shadows where objects meet.  | Yes | No |
| Subsurface scattering | Calculates subsurface scattering for materials, such as skin, by using a screen space technique. | Yes | No |
| Deferred fog | Applies a height-based fog to the scene. | Yes | No |
| Screen space reflections (SSR) | Implements SSR by using renderered lighting buffer to approximate real-time reflections. | Yes | No |
| Depth of field | Applies a bokeh-shaped depth of field effect to the scene that's based on the scene's depth and camera focus paramters. | Yes | No |
| Bloom | Applies a bloom effect to the rendered image, making bright pixels bleed out into neighboring pixels. | Yes | No |
| Subpixel morphological anti-aliasing (SMAA) | Applies SMAA as an anti-aliasing technique. | Yes | No |
| Temporal anti-aliasing (TAA) | TAA uses motion vectors and temporal super-sampling to reduce aliasing in the final image. | Yes | No |
| Light adaptation | Adjusts brightness of the final image based on the scene's average luminance, so the image appears neither too dark nor too bright. | Yes | Yes |
| Look modification and color grading | Allows artists to adjust the final look of the image by using look up tables (LUTs). | Yes | Yes |
| Display mapping | Adjusts the color values of the final image based on the color range that the screen expects. | Yes | Yes |
| User interface (UI) | Renders 2D UI components. | Yes | Yes |
| Auxilary geometry (AuxGeom) | Renders various geometry and text for in-editor tools and debugging, such as gizmos, grids, debug lines, and shapes. | Yes | Yes |



## File structure

A render pipeline is stored as an `.azasset` file, which is a JSON file that links to the root pass of the render pipeline and contains other configurations. In this file, the `RootPassTemplate` parameter contains the name of pipeline's root pass.

The following example is the `MainRenderPipeline.azasset` file. The root pass template is called `MainPipeline`, which links to the `MainPipeline.pass` file. 
```json
{
    "Type": "JsonSerialization",
    "Version": 1,
    "ClassName": "RenderPipelineDescriptor",
    "ClassData": {
        "Name": "MainPipeline",
        "MainViewTag": "MainCamera",
        "RootPassTemplate": "MainPipeline",
        "RenderSettings": {
            "MultisampleState": {
                "samples": 4
            }
        }
    }
}

```


You can find the following render pipeline files in your O3DE engine source:
- **Main Rendering Pipeline**: `Gems\Atom\Feature\Common\Assets\Passes\MainRenderPipeline.azasset`
- **Low-end Rendering Pipeline**: `Gems\Atom\Feature\Common\Assets\Passes\LowEndRenderPipeline.azasset`


## Modifying the render pipeline

Because modular passes drive the render pipeline, it's more accessible to add or remove passes and update connections. You can modify the main render pipeline or create a custom render pipeline for your team. You might want to use a custom render pipeline for a number of reasons, such as to:

- Develop new features that impact the render pipeline.
- Implement and use alternative rendering techniques.
- Improve rendering performance.

Modifying the render pipeline involves enabling or disabling a pass and updating the connections. You can do this directly by manually editing the `MainPipeline.pass` with a text editor.

To enable or disable a pass in the render pipeline: 
1. In the render pipeline's `.pass` file, find the pass that you want to enable or disable in the `PassRequests` list. 
2. Set the `Enabled` property to true or false.
   
When you enable or disable a pass, the pass system automatically updates the connections in the pass hierarchy. This requires that you've set up fallback connections. For more information, refer to [PassTemplate File Specification](/docs/atom-guide/dev-guide/passes/pass-template-file-spec/)

For example, in the `PassRequests` section of the `MainPipeline.pass`, disable `DeferredFogPass` in the render pipeline by setting `Enabled` to false.
```JSON
    "PassRequests": [

        ...
        
        {
            "Name": "DeferredFogPass",
            "TemplateName": "DeferredFogPassTemplate",
            "Enabled": false,
            "Connections": [
                ...
            ],
            "PassData": { ... }
        },
        
        ...
    ]
```
