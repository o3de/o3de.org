---
title: "Material Type File Specification"
description: "Material type files (`*.materialtype`) are in written JSON format."
toc: true
---

Material type files (`*.materialtype`) are in written JSON format and contain the following elements.

## **description**  
Provides a description or comment from the material type's author.

## **version**  
Indicates the current version number of the material type. Any materials created with this material type will save this value in their [`materialTypeVersion`](material-file-spec/#materialtypeversion-optional) field.

## **versionUpdates**  

Provides backward compatibility for `.material` files that reference an older version of this `.materialtype`. This section includes a list of update steps that can update material data from one version to the next. Whenever the author makes a change to the material type that would break existing materials, such as renaming a property, they can increment the `version` number (previously discussed) and provide a new version update description here. Then, any system that loads the old `.material` file can automatically upgrade it to be compatible with the latest material type.

* **toVersion**: Indicates the material type version when these changes were introduced. The update step will be applied to any material with a [`materialTypeVersion`](material-file-spec/#materialtypeversion-optional) number less than this value.

* **actions**: A list of actions to perform when applying this update. Each action will first have an `op` parameter to indicate what operation to perform. Additional parameters must be specified depending on which operation is used. Available actions and their required parameters are listed as follows:

| op            | Parameter 1 | Description          | Parameter 2 | Description        |
|---------------|-------------|----------------------|-------------|--------------------|
| rename        | from        | old property name    | to          | new property name  |
| setValue      | name        | property name to set | value       | new property value, must be of the appropriate type for the given property |

{{< note >}}
To upgrade the `.material` source file to match the latest version of the material type, open it in the **Material Editor** and then save it.
{{< /note >}}

#### Example

```json
    ...
    "version": 5,
    "versionUpdates": [
        {
            "toVersion": 4,
            "actions": [
                {"op": "rename", "from": "opacity.doubleSided", "to": "general.doubleSided"}
            ]
        },
        {
            "toVersion": 5,
            "actions": [
                {"op": "rename", "from": "irradiance.color", "to": "irradiance.manualColor"},
                {"op": "setValue", "name": "irradiance.irradianceColorSource", "value": "Manual"}
            ]
        }
    ],
    ...
```

## **propertyLayout**
This section defines the set of properties that will be available in the Material Editor, and what shader inputs or shader options they will connect to. Properties are organized into groups, and each group can contain other groups, forming a hierarchy. The Material Editor's property inspector will organize the properties into group panels accordingly.

It's common practice to "factor-out" property group definitions into separate JSON files using the `$import` feature. This allows the reuse of groups in multiple `.materialtype` files.

* **propertyGroups**: The top-level list of property groups. Each group contains the following:
  * **name**: An identifier for this group. The value must be formatted in C-style and be unique among sibling groups. 
  * **displayName**: The given name of this group that will appear in the Material Editor. 
  * **description**: The given description of this group that will appear as tooltips in the Material Editor.
  * **shaderInputsPrefix**: Any shader input names appearing in this group, such as shader constants or shader images, will automatically prepend this value. This is useful when using `$import` to include a shared group definitions in another group.
  * **shaderOptionsPrefix**: Any shader option names that appear in this group will automatically prepend this value. This is useful when using `$import` to include a shared group definitions in another group.
  * **properties**: Defines the list of properties that will appear in this group.
    * **name**: An identifier for this property. The value must be formatted in C-style and be unique among sibling properties. 
    * **displayName**: The given name of this property that will appear in the Material Editor. 
    * **description**: The given description of this property that will appear as tooltips in the Material Editor.
    * **visibility**: The initial visibility for this property. By default, this is `Enabled`. Possible values are:
      - Enabled
      - Disabled
      - Hidden
    * **type**: The data type for this propoerty. Supported types include:
      - Bool
      - Int
      - UInt
      - Float
      - Vector2
      - Vector3
      - Vector4
      - Color
      - Image
      - Enum
    * **enumValues**: A list of names defining the possible values for an `Enum` type property.
    * **enumIsUv**: If `true`, and `type` is set to `Enum`, this uses the UV names from [`uvNameMap`](#uvnamemap) as the possible enum values.
    * **defaultValue**: The default value to use for this property. The value must be specified using the appropriate data type according to its standard JSON serialization (see [JSON Serialization of O3DE Data Types](/docs/user-guide/programming/serialization/json-data-types)). If no default is provided, then the default will be `false`, `0`, or empty according to the data type.
    * **min**: The minimum value of the property that a user can configure using a slider or similar UI widget. May be used in combination with `max`, `softMax`, or neither.
    * **max**: The maximum value of the property that a user can configure using a slider or similar UI widget. May be used in combination with `min`, `softMin`, or neither. 
    * **softMin**: The minimum value of the property that a user can configure using a slider or similar UI widget. However, a user can type in a smaller value manually. May be used in combination with `max`, `softMax`, or neither.
    * **softMax**: The maximum value of the property that a user can configure using a slider or similar UI widget. However, a user can type in a larger value manually. May be used in combination with `min`, `softMin`, or neither. 
    * **step**: Indicates the size of the increment to use for sliders or similar UI widgets.
    * **vectorLabels**: Provide a list of labels to use for the elements of a `Vector` type property. By default, the labels are "X", "Y", "Z", "W".
    * **connection**: Defines connections for passing the property value to a shader. Each connection defines a connection `type`, a `name`, and optionally a `shaderIndex`. The connection is optional, if omitted the property can be connected to shaders by a material functor.
      * **type**: Which type of connection to make:
        - ShaderInput - Connect to a shader constant or shader image in the SRG_PerMaterial ShaderResourceGroup.
        - ShaderOption - Connect to a shader option.
      * **name**: The name of the shader input or shader option to connect to.
      * **shaderIndex**: The index of which shader in the [`shaders`](#shaders) list to connect to. By default, it connects to every shader that has an option with this name.
  * **propertyGroups**: Other property groups can be nested inside this one.
  * **functors**: List of material functors for custom processing of the properties in this group and sub-groups. All property references, shader input names, and shader option names can assume the local scope of this property group. For example, if this group is called "baseColor" and has a property "textureMap", then the functor can reference the property as simply "texture", and the system will automatically interpret this as "baseColor.texture". Similarly, `shaderInputsPrefix` and `shaderOptionsPrefix` will be applied automatically. For example, if `shaderInputsPrefix` is "baseColor_" and the shader has a texture input called "baseColor_tex", then the functor can reference the texture input as simply "tex", and the system will automatically turn this into "baseColor_tex". For more information about material functors, see the following [`functors`](#functors) section.

#### Example

```json
...
    "propertyLayout": {
        "propertyGroups": [
            {
                "name": "iris", 
                "shaderInputsPrefix": "m_iris_",
                "shaderOptionsPrefix": "o_iris_",
                "displayName":  "Iris",
                "description":  "Material properties for the iris.",
                "propertyGroups": [
                    {
                        "$import": "MaterialInputs/BaseColorPropertyGroup.json"
                    },
                    {
                        "$import": "MaterialInputs/NormalPropertyGroup.json"
                    },
                    { 
                        "$import": "MaterialInputs/RoughnessPropertyGroup.json"
                    }
                ]
            },
            {
                "name": "sclera", 
                "shaderInputsPrefix": "m_sclera_",
                "shaderOptionsPrefix": "o_sclera_",
                "displayName":  "Sclera",
                "description":  "Material properties for the sclera.",
                "propertyGroups": [
                    {
                        "$import": "MaterialInputs/BaseColorPropertyGroup.json"
                    },
                    {
                        "$import": "MaterialInputs/NormalPropertyGroup.json"
                    },
                    { 
                        "$import": "MaterialInputs/RoughnessPropertyGroup.json"
                    }
                ]
            },
            {
                "name": "eye",
                "displayName": "Eye parameters",
                "description": "Properties to control eye-specific rendering behavior",
                "properties": [
                    {
                        "name": "irisDepth",
                        "displayName": "Iris Depth",
                        "description": "Distance from the object origin to the plane (XZ) where the iris lays.",
                        "type": "float",
                        "defaultValue": 0.48,
                        "min": 0.0,
                        "softMax": 1.0,
                        "connection": {
                            "type": "ShaderInput",
                            "name": "m_irisDepth"
                        }
                    },
                    {
                        "name": "irisRadius",
                        "displayName": "Iris Radius",
                        "description": "Radius of the iris. It extends the iris/sclera mask to get more samples from one or the other (no UV deformation/stretching).",
                        "type": "float",
                        "defaultValue": 0.2,
                        "min": 0.0,
                        "softMax": 0.5,
                        "connection": {
                            "type": "ShaderInput",
                            "name": "m_eyeIrisRadius"
                        }
                    },
                    ...
                ]
            },
            { 
                "name": "specularF0",
                "displayName": "Specular Reflectance f0",
                "description": "The constant f0 represents the specular reflectance at normal incidence (Fresnel 0 Angle). Used to adjust reflectance of non-metal surfaces.",
                "properties": [
                    {
                        "name": "factor",
                        "displayName": "Factor",
                        "description": "The default IOR is 1.5, which gives you 0.04 (4% of light reflected at 0 degree angle for dielectric materials). F0 values lie in the range 0-0.08, so that is why the default F0 slider is set on 0.5.",
                        "type": "Float",
                        "defaultValue": 0.5,
                        "min": 0.0,
                        "max": 1.0,
                        "connection": {
                            "type": "ShaderInput",
                            "name": "m_specularF0Factor"
                        }
                    },
                    {
                        "name": "textureMap",
                        "displayName": "Texture",
                        "description": "Texture for defining surface reflectance.",
                        "type": "Image",
                        "connection": {
                            "type": "ShaderInput",
                            "name": "m_specularF0Map"
                        }
                    },
                    {
                        "name": "useTexture",
                        "displayName": "Use Texture",
                        "description": "Whether to use the texture, or just default to the Factor value.",
                        "type": "Bool",
                        "defaultValue": true
                    },
                    {
                        "name": "textureMapUv",
                        "displayName": "UV",
                        "description": "Specular reflection map UV set",
                        "type": "Enum",
                        "enumIsUv": true,
                        "defaultValue": "Tiled",
                        "connection": {
                            "type": "ShaderInput",
                            "name": "m_specularF0MapUvIndex"
                        }
                    }
                ],
                "functors": [
                    {
                        "type": "UseTexture",
                        "args": {
                            "textureProperty": "textureMap",
                            "useTextureProperty": "useTexture",
                            "dependentProperties": ["textureMapUv"],
                            "shaderOption": "o_specularF0_useTexture"
                        }
                    }
                ]
            },
            { 
                "$import": "MaterialInputs/SubsurfaceAndTransmissionPropertyGroup.json"
            },
            { 
                "name": "general",
                "displayName": "General Settings",
                "description": "General settings.",
                "properties": [
                    {
                        "name": "applySpecularAA",
                        "displayName": "Apply Specular AA",
                        "description": "Whether to apply specular anti-aliasing in the shader.",
                        "type": "Bool",
                        "defaultValue": false,
                        "connection": {
                            "type": "ShaderOption",
                            "name": "o_applySpecularAA"
                        }
                    },
                    {
                        "name": "enableMultiScatterCompensation",
                        "displayName": "Multiscattering Compensation",
                        "description": "Whether to enable multiple scattering compensation.",
                        "type": "Bool",
                        "connection": {
                            "type": "ShaderOption",
                            "name": "o_enableMultiScatterCompensation"
                        }
                    }
                ]
            }
        ]
    },
...
```

## **version** (deprecated)

This version number in the `propertyLayout` section is no longer used and has been replaced by the previously shown [`version`](#version) number.

## **groups** (deprecated)
This is replaced by `propertyGroups` (in [propertyLayout](#propertylayout)), which can support any number of group levels with properties and groups defined in the same place. The engine can still load the old format, however any new material type files should use the new format.

{{< note >}}
An older version of the material type file format organized `propertyLayout` with separate `groups` and `properties` sections. This imposed several limitations, such as restricting property grouping to only one level. This made it difficult to factor out reusable property groups.
{{< /note >}}

## **properties** (deprecated)
This is replaced by `propertyGroups`. Similar to [**groups (deprecated)**](#groups-deprecated).

## **shaders**  

An array of references to shader files (`*.shader`) to be used to render materials of this type. By default, all shaders are enabled, but they can be disabled using [`functors`](#functors).

Each shader item includes the following values. 

* **file**: The path to the shader file. The path must be relative to the asset root or to the material type file.
* **tag**: A unique name for this shader item that can be used to reference the shader from other places in the material type definition, like in material functors. It must be a C-Style identifier.
* **options**: Set the initial value for any options in this shader, using a list of key/value pairs.

#### Example
In this example, we reference the ShadowMap and DepthPass shaders. 
```JSON
"shaders": [
    {
        "file": "../ShadowMap.shader",
        "tag": "shadowmap",
        "options": {
            "o_depthBiasMode": "DepthBiasMode::Auto"
        }
    },
    {
        "file": "../DepthPass.shader",
        "tag": "depth"
    },
    ...
]
```

## **functors**
An array of material functors. Each one reads material property values, performs some logic or calculations, and sets shader inputs accordingly. These can be defined in Lua or C++. Each functor data contains the following:

* **type**: The name of the functor type. Possible values are:
    - `Lua` - for custom Lua script functors
    - The name of a specialized functor type (defined in C++).
* **args**: An object containing key/value pairs of all the arguments to send to this functor. The arguments vary depending on functor type.

Several core functor types are provided with the engine, listed here. 

{{< note >}}
Additional functor types can be added by other gems or game projects. Try searching the source code for "RegisterMaterialFunctor" to discover what others might be available.
{{< /note >}}

### Lua

This functor type operates using custom Lua scripts. It's the most flexible functor type available, and can be used in almost any situation. However, it has poor performance compared to the other functor types. 

See [Lua Material Functor API](/docs/atom-guide/dev-guide/materials/lua-material-functor-api/) for details about the Lua script itself.

Arguments:
* **file**: The path to a `.lua` file that contains material functor code. The path must be relative to the asset root or to the material type file.
* **propertyNamePrefix**: Any property names appearing in the functor will automatically prepend this value. Note this is intended only for use with functors defined at the top level of the material type. The functors within property groups will get their prefixes from the property group.
* **srgNamePrefix**: Any ShaderResourceGroup field names appearing in the functor will automatically prepend this value. Note this is intended only for use with functors defined at the top level of the material type. The functors within property groups will get their prefixes from the property group.
* **optionsNamePrefix**: Any shader option names appearing in the functor will automatically prepend this value. Note this is intended only for use with functors defined at the top level of the material type. The functors within property groups will get their prefixes from the property group.

#### Example
```json
    ...
    {
        "type": "Lua",
        "args": {
            "file": "Materials/Types/StandardPBR_Roughness.lua",
            "propertyNamePrefix": "layer2_roughness.",
            "srgNamePrefix": "m_layer2_",
            "optionsNamePrefix": "o_layer2_"
        }
    },
    ...
```

### UseTexture

Sets a use-texture *shader option* to false if a use-texture *property* is false, or if an `Image` type property has no image bound.

Arguments:
* **textureProperty**: The name of an `Image` type property.
* **useTextureProperty**: The name of a `bool` type property. This property is hidden if the texture property is null.
* **dependentProperties**: (optional) A list of other properties that are irrelevant when no texture is being used. These will be hidden or disabled when the texture is null or unused.
* **shaderTags**: (optional) If provided, the shader option will be set only on this list of shaders. See **tags** in the [Shaders](#shaders) section.
* **shaderOption**: The name of the use-texture shader option to set.

#### Example
```json
    ...
    {
        "type": "UseTexture",
        "args": {
            "textureProperty": "baseColor.textureMap",
            "useTextureProperty": "baseColor.useTexture",
            "dependentProperties": ["baseColor.textureMapUv", "baseColor.textureBlendMode"],
            "shaderOption": "o_baseColor_useTexture"
        }
    },
    ...
```

### Transform2D

Reads user-friendly properties, like rotation and scale, and converts them to a 2D transform matrix for the shader to consume.

Arguments:
* **transformOrder**: An array of strings that indicate the order in which rotate, translate, and scale should be performed. It is recommend to always use `[ "Rotate", "Translate", "Scale" ]`.
* **centerProperty**: The name of a `Vector2` type property. Defines the center of rotation and scale.
* **scaleProperty**: The name of a `float` type property. Controls the overall scale of the transformation.
* **scaleXProperty**: The name of a `float` type property. Controls the X-scale.
* **scaleYProperty**: The name of a `float` type property. Controls the Y-scale.
* **translateXProperty**: The name of a `float` type property. Controls the X-translation.
* **translateYProperty**: The name of a `float` type property. Controls the Y-translation.
* **rotateDegreesProperty**: The name of a `float` type property. Controls the amount of rotation in degrees.
* **float3x3ShaderInput**: The name of a `float3x3` shader constant for the final transform matrix.
* **float3x3InverseShaderInput**: (optional) The name of a `float3x3` shader constant for an inverse of the final transform matrix. Some shaders may require this; for example, ones that use a parallax mapping effect.

#### Example
```json
    {
        "type": "Transform2D",
        "args": {
            "transformOrder": [ "Rotate", "Translate", "Scale" ],
            "centerProperty": "center",
            "scaleProperty": "scale",
            "scaleXProperty": "tileU",
            "scaleYProperty": "tileV",
            "translateXProperty": "offsetU",
            "translateYProperty": "offsetV",
            "rotateDegreesProperty": "rotateDegrees",
            "float3x3ShaderInput": "m_uvMatrix",
            "float3x3InverseShaderInput": "m_uvMatrixInverse"
        }
    }
```

### ConvertEmissiveUnit

This is a specialized functor for a standardized set of emissive lighting properties. It allows an enum property to select a light instensity unit (either nits or EV100) and converts a light intensity property's value accordingly.

Arguments:
* **intensityProperty**: The name of a `float` type property. Specifies the intensity of the emissive light.
* **lightUnitProperty**: The name of a `Enum` type property. Indicates the units for the intesity value.
* **shaderInput**: The name of a `float` shader constant that will receive the final intensity value. This is assumed to be in nits.
* **ev100Index**: An integer value that corresponds to the enum value for EV100, according to the definition of the `lightUnitProperty`.
* **nitIndex**: An integer value that corresponds to the enum value for nits, according to the definition of the `lightUnitProperty`.
* **ev100MinMax**: An array of two floats, indicating the min and max intensity value when operating in _EV100_ mode.
* **nitMinMax**: An array of two floats, indicating the min and max intensity value when operating in _nits_ mode.

#### Example
```json
    {
        "type": "ConvertEmissiveUnit",
        "args": {
            "intensityProperty": "intensity",
            "lightUnitProperty": "unit",
            "shaderInput": "m_emissiveIntensity",
            "ev100Index": 0,
            "nitIndex" : 1,
            "ev100MinMax": [-10, 20],
            "nitMinMax": [0.001, 100000.0]
        }
    },
```

### HandleSubsurfaceScatteringParameters
This is a specialized functor for a standardized set of properties for controlling subsurface scattering and light transmission features. See [`Skin.materialtype`](https://github.com/o3de/o3de/blob/development/Gems/Atom/Feature/Common/Assets/Materials/Types/Skin.materialtype) for an example of its usage.

#### Example
```json
    {
        "type": "HandleSubsurfaceScatteringParameters",
        "args": {
            "mode": "subsurfaceScattering.transmissionMode",
            "scale": "subsurfaceScattering.transmissionScale",
            "power": "subsurfaceScattering.transmissionPower",
            "distortion": "subsurfaceScattering.transmissionDistortion",
            "attenuation": "subsurfaceScattering.transmissionAttenuation",
            "shrinkFactor": "subsurfaceScattering.shrinkFactor",
            "transmissionNdLBias": "subsurfaceScattering.transmissionNdLBias",
            "distanceAttenuation": "subsurfaceScattering.distanceAttenuation",
            "tintColor": "subsurfaceScattering.transmissionTint",
            "thickness": "subsurfaceScattering.thickness",
            "enabled": "subsurfaceScattering.enableSubsurfaceScattering",
            "scatterDistanceColor": "subsurfaceScattering.scatterColor",
            "scatterDistanceIntensity": "subsurfaceScattering.scatterDistance",
            "scatterDistanceShaderInput": "m_scatterDistance",
            "parametersShaderInput": "m_transmissionParams",
            "tintThickenssShaderInput": "m_transmissionTintThickness"
        }
    },
```

### OverrideDrawList (deprecated)
Replaced by the use of a Lua functor with the `SetDrawListTagOverride` function. 

{{< note >}}
Before the Lua functor type was available, this functor was used to override a shader's draw list name. 
{{< /note >}}

## **uvNameMap**
This maps default identifiers to mesh UV streams. When loading meshes, the runtime tries to match UV streams from the incoming geometry using these names. 

For each entry, the key must match the semantic used for a `float2` vertex input. The value should be a user-friendly name that is consistent with the intended purpose of the stream, and consistent with the names of similar streams in other material types. By default, all core material types in O3DE use the names _Tiled_ and _Unwrapped_. Tiled means that tiling is expected, so overlapping hulls is acceptable. Unwrapped means that this is used for lightmaps and similar, so hulls should not overlap in the UV space.

#### Example
```json
    "uvNameMap": {
        "UV0": "Tiled",
        "UV1": "Unwrapped"
    }
```


