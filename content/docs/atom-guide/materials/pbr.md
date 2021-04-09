---
linktitle: PBR Materials
title: "Physically Based Rendering in Materials"
description: "Learn about physically based rendering and how they apply to materials in Atom."
toc: true
weight: 200
---  

{{< preview-new >}}

Physically based rendering (PBR) refers to the concept of rendering in a photorealistic way by simulating the physics of real-world lighting models. The basic concepts underlying PBR and how they relate to PBR material types in Atom are described in the sections below.

## PBR Shading Model
The fundamental materials used in Atom are based on PBR shading models. The PBR shading model is composed of properties that describe how a material interacts in the physical world. At the basic level, the PBR shading model requires the following properties: base color, metallic, roughness, and specular reflectivity. These properties are enough to define materials such as wood, metal, concrete, and other raw materials. However, materials can become much more complex with properties such as clear coating, subsurface scattering, and more. For example, varnished wood is made from a basic wood material type with an additional clear coating on top.  

The following list of properties are used to define PBR materials in Atom. An overview of which properties are included in which material type is shown in the [Properties in PBR Material Types](#properties-in-pbr-material-types) table. 

| Property | Definition |
| - | - |
| [Base Color](#base-color) | The surface reflected color for non-metals (dielectrics) or reflectance values for metals (conductors). |
| [Metallic](#metallic) | Whether the surface appears metallic or not. |
| [Roughness](#roughness) | Apparent smoothness or roughness of a surface. |
| [Specular Reflectance f0](#specular-reflectance-f0) | Apparent reflectance of non-metal surfaces. The constant f0 represents the specular reflectance at normal incidence (Fresnel 0 angle). |
| Emissive | A mechanic to simulate light emitting from the surface. |
| Ambient Occlusion | Describes how much ambient light affects a point on a surface. |
| Opacity | Transparency levels of a surface. |
| Normal | A texture mapping technique that simulates bumpiness on a surface. Also known as bump maps. |
| UVs | texture coordinates that describe how a texture maps to a surface. |
| Clear Coat | A thin translucent layer on top of base color of the surface. |
| Subsurface Scattering | A mechanism that simulates how light that penetrates translucent surfaces is scattered and absorbed before exiting the surface at a different location. Subsurface scattering is part of our shading model, however it does not follow the traditional PBR shading model due to its complexity. Instead, subsurface scattering is handled by a separate shading pass. |
| Irradiance | Describes how a surface interacts with the diffuse lighting environment. |
| Parallax | An enhanced version of normal mappping, improving the apparent bumpness on a surface by displacing texture coordinates, giving an illusion of depth. Also known as displacement mapping. |

### Base Color
The **base color** defines the diffuse albedo for non-metals, and the specular color for metals. 

When configuring the **Base Color** property in a PBR material type, you can set a solid sRGB color in `color` setting. This color can be intensified by the `factor` multiplier. Additionally, you can blend the color with the texture by assigning an image to the `textureMap` setting. The texture map blends with the color using the specified `blendingMode`.

### Metallic 
The **metallic** property determines whether a material behaves as a dielectric (nonmetal) surface, or as a conductor (metal) surface. The value of the metallic property is usually either a completely metal (1) or completely nonmetal (0), though in between values are useful for transitioning between the two. 

When configuring the **Metallic** property in a PBR material type, the amount of metallic property is defined using the `factor` setting. For surfaces with varying levels of metallic property, you can assign an image in the `texturemap` setting to indicate values between 0 and 1 per pixel. 

### Roughness
The **roughness** property determines the roughness or glossiness of a surface. The rougher a surface is, the more blurred its reflections appear to be. 

When configuring the **Roughness** property of a PBR material type, the `factor` setting defines how rough (factor = 1) or smooth (factor = 0) a material is. For surfaces with varying levels of roughness, you can assign an image in the `texturemap` setting to indicate values between 0 and 1 per pixel. You can adjust how the values of the texture map translate to roughness level by setting the upper and lower bounds. 

### Specular Reflectance f0
The **specular reflectance f0** property determines how much light reflects from dielectric surfaces. (Specular reflectivity has no effect on conductor surfaces.) Specular reflection is based on the Fresnel effect, a model which describes how the amount of light that reflects from a surface depends on the viewing angle and the index of refraction (IOR). When looking straight ahead at a surface, the view is at a 0-degree angle, also known as a normal incidence. From this viewing angle, the amount of light reflected is denoted by f0. The f0 values lie in the range 0 to 0.08, meaning the amount of light reflected can be between 0% to 8%. 

When configuring the **Specular Reflectivity f0** property in a PBR material type, the `factor` setting maps to an f0 value between 0.0 (factor = 0) and 0.08 (factor = 1). For surfaces with varying levels of specular reflectivity, you can assign an image in the `texturemap` setting to indicate values between 0 and 1 per pixel. A texture map is most useful for composite materials, or materials with a significant variation of material types (for example, material for a character with skin, a metal belt, and a leather watch). 

### Multi-scattering Compensation
A simple lighting model assumes that light only bounces once (single-scattering); but in reality, light may bounce multiple times (multi-scattering). With **multi-scattering compensation**, we can configure the lighting model to perform additional calculations to produce more accurate surface lighting. 

To understand the purpose of multi-scattering more clearly, consider the following:  
Reflection is caused by light bouncing off of a surface. Following the laws of energy conservation, when light penetrates the surface, some light energy is lost; however, the remaining light energy bounces back towards the viewer, making objects appear lit. For simplicity, when calculating specular reflection, only the first bounce of light is considered. However, in reality, light sometimes scatters multiple times before bouncing off of the surface. The effects of multi-scattering increases with rougher surfaces, where the uneven surface angles may cause light to deflect back into the surface. In these cases, single scattering calculations lead to a loss of light energy, resulting in a visually darker surface. 

To take into account multi-scattering, it's recommended to set `enableMultiScatteringCompensation` to true. This setting requires additional calculation, but yields more accurate results. The impact is most noticeable on rough metallic surfaces. For smooth surfaces and non-metal surfaces, the impact likely won't be noticed and should be disabled.

<!-- ### Emissive
...Ambient Occlusion, and more will be filled in later. -->

<!-- ## Lighting
This section describes lighting interactions in PBR. There are properties in a material that allow you to apply lighting interactions: enableIBL, enableDirectional lights. You can also edit the lighting environment of a scene. -->

## Properties in Material Types
The following table lists which properties are included in which PBR material types.
| Property | StandardPBR | EnhancedPBR | MinimalPBR |
| -- | -- | -- | -- |
| Base Color  | X | X | X |  
| Metallic  | X | X | X |  
| Roughness  | X | X | X |  
| Specular Reflectivity F0  | X | X |  |  
| Emissive  | X | X |  |  
| Ambient Occlusion  | X | X |  |  
| Opacity  | X | X |  |  
| Normal  | X | X |  |  
| UVs  | X | X |  |  
| Clear Coat  | X | X |  |  
| Subsurface Scattering  | X | X |  |  
| Irradiance | X | X |  |  
| Parallax |  | X |  |  
| Anistropic Material Response |  | X |  |
| Detail Layer |  | X |  |
| Detail Layer UV |  | X |  |