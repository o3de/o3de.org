---
title: Debug Render Component
linktitle: Debug Render Component
description: 'Open 3D Engine (O3DE) debug rendering level component reference.'
toc: true
---

**Note**: This is a level component, and as such must be added to the level instead of an entity.

![debug-rendering-component](/images/user-guide/components/reference/atom/debug-rendering/debug-rendering-component.jpg)


## Debug Visualization Properties

The **Debug Rendering Level Component** is used to visualize rendering information about the scene, such as material properties like albedo and roughness or lighting factors like direct/indirect and diffuse/specular.

| Property | Description |
|-|-|
| Enable Render Debugging | Whether to utilize render debugging or not. If set to false, properties in this component have no effect. |
| Debug View Mode | Specifies what debug information is displayed in the viewport (for example material albedo, metalness, roughness...). Note that the options "Albedo" and "BaseColor" differ in that BaseColor will display the color used for metal reflectance, whereas Albedo for metals will be zero/black. |
| Lighting Type | Whether to display Diffuse Lighting, Specular Lighting, or both. |
| Lighting Source | Whether to display Direct Lighting, Indirect Lighting, both, or use a debug directional light as the only light source (see the next section). |

Screeshot with Debug View Mode set to Albedo
{{< image-width "/images/user-guide/components/reference/atom/debug-rendering/albedo.jpg" "1300" "Screeshot with Debug View Mode set to Albedo" >}}

Screenshot with Lighting Type set to Diffuse and Lighting Source set to Indirect (i.e. the scene will only apply indirect diffuse lighting)
{{< image-width "/images/user-guide/components/reference/atom/debug-rendering/indirect-diffuse.jpg" "1300" "Screeshot with Lighting Type set to Diffuse and Lighting Source set to Indirect" >}}


## Debug Light Properties

Sometimes it can be difficult to judge whether normals on objects are correct just by outputting them as color to the screen. The Debug Render Component provides the option to disable all lighting in the scene except for a single directional light (this light doesn't cast shadows). By using and rotating this light, users can more carefully inspect the normals and other material properties of an object in the scene.

| Property | Description |
|-|-|
| Debug Light Azimuth | The azimuth in degreees used to determine the position of the debug directional light (changing this rotates the light around the up vector). |
| Debug Light Elevation | Determines the elevation in degrees used to determine the position of the debug directional light (change this to move the directional light up/down). |
| Debug Light Color | The color of the debug directional light. |
| Debug Light Intensity | The intensity of the debug directional light. |

Screenshot using the Debug Light
{{< image-width "/images/user-guide/components/reference/atom/debug-rendering/debug-light.jpg" "1300" "Screeshot with Lighting Type set to Diffuse and Lighting Source set to Indirect" >}}


## Material Override Properties

The Debug Render Component allows users to override material values for all materials in the scene. This gives users extra options which which to vizualize and debug lighting and materials in the scene. For example, one use case would be to override the color of all objects in the scene to white or grey in order to get a better sense of the lighting in the scene.
Values that can be overriden are Base Color, Roughness and Metallic. Normals maps and detail normal maps cannot be overriden but they can be disabled (if both are disabled then materials in the scene will use vertex normals only).

| Property | Description |
|-|-|
| Override Base Color | Whether to override the base color for all materials in the scene to the value specified below. |
| Base Color Value | The value used to override base color on all materials in the scene. For example you can set this to red to see what your scene would look like if it were entirely red. |
| Override Roughness | Whether to override the roughness for all materials in the scene to the value specified below. |
| Roughness Value | The value used to override roughness on all materials in the scene. For example you can set this to zero if you want to visualize a very glossy and reflective scene. |
| Override Metallic | Whether to override the metallic for all materials in the scene to the value specified below. |
| Metallic Value | The value used to override metallic on all materials in the scene. For example you can set this one to make all materials in your scene metals. |
| Enable Normal Maps | Whether to enable/disable normal maps on all materials in the scene (note that disabling normal maps will also disable detail normal maps, and thus only the vertex normal will be used in shading calculations). |
| Enable Detail Normal Maps | Whether to enable/disable detail normal maps on all materials in the scene (note that not all materials provide or support detail normal maps, therefore those materials will be unaffected by this option). |

Screenshot overriding the base color in the scene to grey (R:128, G:128, B:128)
{{< image-width "/images/user-guide/components/reference/atom/debug-rendering/debug-light.jpg" "1300" "Screeshot with Lighting Type set to Diffuse and Lighting Source set to Indirect" >}}


## Custom Debug Properties

When writing shaders, it can be useful to have immediate access to a tweakable value for debug purposes. The Debug Render Component provides access to **four debug booleans** and **four debug floats** that are passed into the Scene Shader Resource Group. These values are accessible from any shader that includes the Scene SRG.
**NOTE**: It is imperative that you delete any usage of these variables from your shaders when submitting your code. These values are strictly to facilitate local debugging and aren't meant for any other use. If you fail to delete your usage of these variable before you submit, another shader author might experience unwanted side effects when using these values.
The custom debug float and boolean properties are exposed to shaders via the SceneSrg.azsli and Debug.azsli files.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)
