---
title: Debug Rendering Component
linktitle: Debug Rendering
description: 'Use the Debug Rendering level component with Atom Renderer in Open 3D Engine (O3DE) '
toc: true
---

The **Debug Rendering level component** is used to visualize rendering information about the scene, such as material properties like albedo and roughness or lighting factors like direct/indirect and diffuse/specular.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Properties

{{< image-width "/images/user-guide/components/reference/atom/debug-rendering/debug-rendering-component.jpg" "500" "Debug Render Component" >}}


## Base properties

| Property | Description | Value | Default Value |
|-|-|-|-|
| **Enable Render Debugging** | If enabled, uses render debugging. If disabled, properties in this component have no effect. | Boolean | `Enabled` |
| **Debug View Mode** | Specifies what debug information to display in the Viewport. For metallic materials, the `Base Color` displays the color that's used for metal reflectance, and `Albedo` displays black because there's no diffuse reflection. | `None`,  `Base Color`, `Albedo`, `Roughness`, `Metallic`, `Normal`, `Tangent`, `Bitangent`, `CascadeShadows` | `None` |


## Lighting properties

It can be difficult to judge whether normals on objects are correct by only outputting them as color to the screen. The **Lighting Source** property `Debug Light` option disables all lighting in the scene except for a single directional light that doesn't cast shadows. You can use and rotate this light to carefully inspect the normals and other material properties of an object in the scene.

| Property | Description | Value | Default Value |
|-|-|-|-|
| **Lighting Type** | Whether to display diffuse lighting, specular lighting, or both. | `Diffuse + Specular`, `Diffuse`, `Specular` | `Diffuse + Specular` |
| **Lighting Source** | Choose to display the level lights ( `Direct + Indirect`), isolated contributions of the level lights (`Direct` or `Indirect`), or disable the level lights and display a debug directional light that doesn't cast shadows (`Debug Light`). The debug directional light can be configured with the **Debug Light-** properties below. | `Direct + Indirect`, `Direct`, `Indirect`, `Debug Light` | `Direct + Indirect` |
| **Debug Light Azimuth** | Sets the azimuth of the light by rotating the light around the Z axis. The rotation value is in degrees. | -360.0 to 360.0 | `0.0` |
| **Debug Light Elevation** | Sets the elevation of the light by rotating the light around the X axis. The rotation value is in degrees. Positive values aim the light downward. Negative values aim the light upward. | -90.0 to 90.0 | `60.0` |
| **Debug Light Color** | The color of the debug directional light. | Color | (`255`, `255`, `255`) |
| **Debug Light Intensity** | The intensity of the debug directional light. | 0.0 - 25.0 | `2.0` |


## Material Override properties

The Debug Render component allows you to override material values for all materials in the scene. These extra options can help you visualize and debug lighting and materials. For example, to get a better sense of the lighting in the scene, you may override the color of all objects to white or grey.

**Base Color**, **Roughness**, and **Metallic** values can be overriden. **Normal Maps** and **Detail Normal Maps** can be enabled or disabled, but cannot be overridden. If both are disabled, then materials in the scene use only vertex normals.

| Property | Description | Value | Default Value |
|-|-|-|-|
| **Override Base Color** | If enabled, overrides the base color for all materials in the scene to the value specified below. | Boolean | Disabled |
| **Base Color Value** | The value used to override the base color on all materials in the scene. For example, set this to red to see your scene entirely red. | Eight bits per channel color: 0-255 | (`128`, `128`, `128`) |
| **Override Roughness** | If enabled, overrides the roughness for all materials in the scene to the value specified below. | Boolean | Disabled |
| **Roughness Value** | The value used to override roughness on all materials in the scene. For example, set this to `0.0` if you want to visualize a very glossy and reflective scene. | 0.0 - 1.0 | `1.0` |
| **Override Metallic** | If enabled, overrides the metallic property for all materials in the scene to the value specified below. | Boolean | Disabled |
| **Metallic Value** | The value used to override metallic on all materials in the scene. For example, you can set this to `1.0` to make all materials in your scene into metals. | 0.0 - 1.0 | `0.0` |
| **Enable Normal Maps** | If enabled, activates normal maps on all materials in the scene. If disabled, it also disables detail normal maps, and thus only the vertex normal is used in shading calculations. | Boolean | Enabled |
| **Enable Detail Normal Maps** | If enabled, activates detail normal maps on all materials in the scene. Materials that don't provide or support detail normal maps are unaffected by this option. Detail normal maps are deactivated if **Enable Normal Maps** is disabled. | Boolean | Enabled |


## Custom Debug properties

When debugging shaders, it can be useful to have immediate access to tweakable values. The Debug Render component provides access to four _debug booleans_ and four _debug floats_. These values are passed into the Scene Shader Resource Group (SRG) and are accessible from any shader that includes `SceneSRG`. For more information on SRGs, see [Shader Resource Groups](/docs/atom-guide/dev-guide/shaders/azsl/#shader-resource-groups).

The custom debug float and boolean properties are exposed to shaders via the [SceneSrg.azsli](https://github.com/o3de/o3de/blob/development/Gems/Atom/Feature/Common/Assets/ShaderResourceGroups/SceneSrg.azsli) and [Debug.azsli](https://github.com/o3de/o3de/blob/development/Gems/Atom/Feature/Common/Assets/ShaderLib/Atom/Features/Debug.azsli) files.

{{< important >}}
These variables are only meant to help you debug your shaders locally. For best practice, when you are done debugging, we recommend that you delete any usage of these variables. It's especially important to delete them if you are contributing shader code either to the source repo or your team's own repo. If you don't, another shader author may experience unwanted side effects when using the same variables.
{{< /important >}}


## Examples

Example with **Debug View Mode** set to `Albedo`:

{{< image-width "/images/user-guide/components/reference/atom/debug-rendering/albedo.jpg" "1500" "Screeshot with Debug View Mode set to Albedo" >}}


Example of debug lighting, with **Lighting Type** set to `Diffuse` and **Lighting Source** set to `Indirect`:

{{< image-width "/images/user-guide/components/reference/atom/debug-rendering/indirect-diffuse.jpg" "1500" "Screeshot with Lighting Type set to Diffuse and Lighting Source set to Indirect" >}}


Example of debug lighting:

{{< image-width "/images/user-guide/components/reference/atom/debug-rendering/debug-light.jpg" "1500" "Screenshot using the Debug Light" >}}


Example of debug materials, with **Override Base Color** set to grey (`128`, `128`, `128`):

{{< image-width "/images/user-guide/components/reference/atom/debug-rendering/color-override.jpg" "1500" "Screenshot overriding the base color in the scene to grey" >}}

