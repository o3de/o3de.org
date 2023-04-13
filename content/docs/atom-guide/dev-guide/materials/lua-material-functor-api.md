---
title: "Lua Material Functor API"
description: "Lua material functors allow custom logic for processing material properties."
toc: true
---

Lua material functors allow custom logic for processing material properties. They can read property values, set shader inputs and shader options, configure render states, adjust material property visibility in the editor, and more.

For general information about the Lua programming language, see [Learning Lua](/docs/user-guide/scripting/lua/#learning-lua).

{{< note >}}
*Lua material functors* are distinct from *[Lua gameplay scripts](/docs/user-guide/scripting/lua/)*. While they both use the Lua language, the APIs and programming environment are mostly separate. Features like EBuses, the Properties table, and Entity integration are exclusive to gameplay scripts, and are not available to Lua material functors. The [Lua Math Library](/docs/user-guide/scripting/lua/math-library/) is the only part of the API that is common to both systems.
{{< /note >}}

## Name context

The material functor may run in an implicit name context, where certain prefixes are attached to the names that appear in the script. This allows the same Lua script to be used in different contexts. 

For example, one material type might have a group named "metallic", and another material type has a group named "metalness". In both cases, the groups have the properties `texture` and `factor`. The Lua functor will reference the properties as simply "texture" or "factor" and the system will automatically prepend the appropriate name context internally. Material properties, shader inputs (constants or images), and shader options each potentially have a separate name context. 

For details about how the name context may be specified, search "prefix" in the [Material Type File Specification](/docs/atom-guide/look-dev/materials/material-type-file-spec/).

## Main functions

The material system expects the following functions to be defined at the global scope in the Lua script.

#### Process(`context`)

This is the main function that runs when the material is *used for rendering*. It runs when the material is first initialized or whenever relevant material property values are changed. The `context` object provides access to the API for accessing the *material properties and shader(s)*.

#### ProcessEditor(`context`)

This is the main function that runs when the material is *being edited in tools*. It runs when the material is first initialized or whenever relevant material property values are changed. The `context` object provides access to the API for accessing *material properties and their metadata*.

#### GetMaterialPropertyDependencies()

Returns a list of all material properties that may be read by the functor. Errors will be reported for properties that are accessed without reporting the dependency.

#### GetShaderOptionDependencies()

Returns a list of all shader options that may be set by the functor. Errors will be reported for options that are accessed without reporting the dependency. (Note that the `Material::SetSystemShaderOption` function in the C++ API may only be called on shader options that are *not* declared as dependencies or otherwised used by the material type).


**Example**:
```lua
function GetMaterialPropertyDependencies()
    return {"textureMap", "useTexture"}
end
 
function GetShaderOptionDependencies()
    return {"o_metallic_useTexture"}
end

function Process(context)
    local textureMap = context:GetMaterialPropertyValue_Image("textureMap")
    local useTexture = context:GetMaterialPropertyValue_bool("useTexture")
    context:SetShaderOptionValue_bool("o_metallic_useTexture", useTexture and textureMap ~= nil)
end

function ProcessEditor(context)
    local textureMap = context:GetMaterialPropertyValue_Image("textureMap")
    local useTexture = context:GetMaterialPropertyValue_bool("useTexture")

    if(nil == textureMap) then
        context:SetMaterialPropertyVisibility("useTexture", MaterialPropertyVisibility_Hidden)
        context:SetMaterialPropertyVisibility("textureMapUv", MaterialPropertyVisibility_Hidden)
        context:SetMaterialPropertyVisibility("factor", MaterialPropertyVisibility_Enabled)
    elseif(not useTexture) then
        context:SetMaterialPropertyVisibility("useTexture", MaterialPropertyVisibility_Enabled)
        context:SetMaterialPropertyVisibility("textureMapUv", MaterialPropertyVisibility_Disabled)
        context:SetMaterialPropertyVisibility("factor", MaterialPropertyVisibility_Enabled)
    else
        context:SetMaterialPropertyVisibility("useTexture", MaterialPropertyVisibility_Enabled)
        context:SetMaterialPropertyVisibility("textureMapUv", MaterialPropertyVisibility_Enabled)
        context:SetMaterialPropertyVisibility("factor", MaterialPropertyVisibility_Hidden)
    end
end
```

## Global utility functions

These functions are available in the global scope.

* **Error**(`string`): Report an error message to `AZ_Error`.
* **Warning**(`string`): Report a warning message to `AZ_Warning`.
* **Print**(`string`): Report a message to `AZ_TracePrintf`.

## Process(context) functions

These functions are available in the `context` object that is passed to the `Process` function.

### GetMaterialPropertyValue\_

Each **GetMaterialPropertyValue\_** function takes a `string` property name and returns a value of the appropriate type. You must use the version that matches the data type of the material property. The material property must be listed in [GetMaterialPropertyDependencies](#main-functions).

  * **GetMaterialPropertyValue_bool**(`string`): Returns a `boolean`
  * **GetMaterialPropertyValue_int**(`string`): Returns a `number`
  * **GetMaterialPropertyValue_uint**(`string`): Returns a `number`
  * **GetMaterialPropertyValue_enum**(`string`): Returns a `number`
  * **GetMaterialPropertyValue_float**(`string`): Returns a `number`
  * **GetMaterialPropertyValue_Vector2**(`string`): Returns a `Vector2` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Vector3**(`string`): Returns a `Vector3` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Vector4**(`string`): Returns a `Vector4` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Color**(`string`): Returns a `Color` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Image**(`string`): Returns a generic pointer `userdata` type if an image is available, or `nil` otherwise.

### HasMaterialProperty(`string`)

Returns a boolean whether a property with the given name exists. Note the material property does not have to be listed in [GetMaterialPropertyDependencies](#main-functions) because this function is checking availability only, not *reading values*.

### SetShaderConstant\_

Each **SetShaderConstant\_** function takes a `string` shader input name and value to set. You must use the version that matches the data type of the shader input.

  * **SetShaderConstant_bool**(`string`, `boolean`)
  * **SetShaderConstant_int**(`string`, `number`)
  * **SetShaderConstant_uint**(`string`, `number`)
  * **SetShaderConstant_float**(`string`, `number`)
  * **SetShaderConstant_Vector2**(`string`, `Vector2`)
  * **SetShaderConstant_Vector3**(`string`, `Vector3`)
  * **SetShaderConstant_Vector4**(`string`, `Vector4`)
  * **SetShaderConstant_Color**(`string`, `Color`)
  * **SetShaderConstant_Matrix3x3**(`string`, `Matrix3x3`)
  * **SetShaderConstant_Matrix4x4**(`string`, `Matrix4x4`)

### SetShaderOptionValue\_

Each **SetShaderOptionValue\_** function takes a `string` shader option name and value to set. The value will be applied to all shaders in the material type that have an option with the given name. You must use the version that matches the data type of the shader option. The shader option must be listed in [GetShaderOptionDependencies](#main-functions).

  * **SetShaderOptionValue_bool**(`string`, `boolean`)
  * **SetShaderOptionValue_uint**(`string`, `number`)
  * **SetShaderOptionValue_enum**(`string`, `number`)

{{< note >}}
There are similar [SetShaderOptionValue\_](#setshaderoptionvalue_-1) functions in the `ShaderItem` object that operate on a single shader.
{{< /note >}}

### GetShaderCount()

Returns the number of shaders in the material type.

### GetShader(`number`)

Returns a `ShaderItem` at a given index, or a dummy `ShaderItem` if the index is out of bounds. See [ShaderItem functions](#shaderitem-functions). 

### GetShaderByTag(`string`)

Returns a `ShaderItem` that has a given tag name, or a dummy `ShaderItem` if the name is not found. See [ShaderItem functions](#shaderitem-functions) and [Shader tags in the Material Type File Specification](/docs/atom-guide/look-dev/materials/material-type-file-spec/#shaders). 

### HasShaderWithTag(`string`)

 Returns a `boolean` whether a shader with the given tag name exists. See [Shader tags in the Material Type File Specification](/docs/atom-guide/look-dev/materials/material-type-file-spec/#shaders).

## ProcessEditor(context) functions

These functions are available in the `context` object that is passed to the `ProcessEditor` function.

### GetMaterialPropertyValue\_

Each **GetMaterialPropertyValue\_** function takes a `string` property name and Returns a value of the appropriate type. You must use the version that matches the data type of the material property. The material property must be listed in [GetMaterialPropertyDependencies](#main-functions).

  * **GetMaterialPropertyValue_bool**(`string`): Returns a `boolean`
  * **GetMaterialPropertyValue_int**(`string`): Returns a `number`
  * **GetMaterialPropertyValue_uint**(`string`): Returns a `number`
  * **GetMaterialPropertyValue_enum**(`string`): Returns a `number`
  * **GetMaterialPropertyValue_float**(`string`): Returns a `number`
  * **GetMaterialPropertyValue_Vector2**(`string`): Returns a `Vector2` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Vector3**(`string`): Returns a `Vector3` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Vector4**(`string`): Returns a `Vector4` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Color**(`string`): Returns a `Color` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Image**(`string`): Returns a generic pointer `userdata` type if an image is available, or `nil` otherwise.

### SetMaterialProperty

Each **SetMaterialProperty** function takes a `string` property name and sets some aspect of the property's editor metadata. See corresponding items in [Property Layout in Material Type File Specification](/docs/atom-guide/look-dev/materials/material-type-file-spec/#propertylayout). Note the material property does not have to be listed in [GetMaterialPropertyDependencies](#main-functions) because these functions are just setting metadata, not *reading values*.

  * **SetMaterialPropertyDescription**(*`string`*, *`string`*)
  * **SetMaterialPropertyMinValue_int**(`string`, `number`)
  * **SetMaterialPropertyMinValue_uint**(`string`, `number`)
  * **SetMaterialPropertyMinValue_float**(`string`, `number`)
  * **SetMaterialPropertyMaxValue_int**(`string`, `number`)
  * **SetMaterialPropertyMaxValue_uint**(`string`, `number`)
  * **SetMaterialPropertyMaxValue_float**(`string`, `number`)
  * **SetMaterialPropertySoftMinValue_int**(`string`, `number`)
  * **SetMaterialPropertySoftMinValue_uint**(`string`, `number`)
  * **SetMaterialPropertySoftMinValue_float**(`string`, `number`)
  * **SetMaterialPropertySoftMaxValue_int**(`string`, `number`)
  * **SetMaterialPropertySoftMaxValue_uint**(`string`, `number`)
  * **SetMaterialPropertySoftMaxValue_float**(`string`, `number`)
* **SetMaterialPropertyGroupVisibility**(`string`, [`MaterialPropertyVisibility`](#materialpropertyvisibility)): Similar to `SetMaterialPropertyVisibility`, sets the visibility of an entire group rather than a single property.

## ShaderItem functions

ShaderItem is a lua `userdata` item with the following functions:

### GetRenderStatesOverride()

Returns a [`RenderStates`](#renderstates-functions) object that can be used to set overrides for any available render state.

### SetEnabled(boolean)

Sets whether the shader should be enabled or not.

### SetDrawListTagOverride(`string`)

Overrides the draw list tag name that the shader will use. Set to empty string to clear the override and restore the value from the *.shader* file. See `DrawList` in the [Shader File Specification](/docs/atom-guide/look-dev/shaders/shader-file-spec/).

### SetShaderOptionValue\_

Each **SetShaderOptionValue\_** function takes a `string` shader option name and value to update one of this shader's options. You must use the version that matches the data type of the shader option. The shader option must be listed in [GetShaderOptionDependencies](#main-functions).
  * **SetShaderOptionValue_bool**(`string`, `boolean`)
  * **SetShaderOptionValue_uint**(`string`, `number`)
  * **SetShaderOptionValue_enum**(`string`, `number`)

{{< note >}}
There are similar [SetShaderOptionValue\_](#setshaderoptionvalue_) functions in `Process(context)` that operate on a single shader.
{{< /note >}}

## RenderStates functions

`RenderStates` is a lua `userdata` item with the following functions. For each render state there is a **Set** function for setting an override value and a **Clear** function for clearing the override and restoring the default value. Most of these functions are just light wrappers over lower level render APIs.

### Multisample State functions

  * **SetMultisampleCustomPosition**(`number` multisampleCustomLocationIndex, `number` x, `number` y)
  * ClearMultisampleCustomPosition
  * **SetMultisampleCustomPositionCount**(`number`)
  * ClearMultisampleCustomPositionCount
  * **SetMultisampleCount**(`number`)
  * ClearMultisampleCount
  * **SetMultisampleQuality**(`number`)
  * ClearMultisampleQuality

### Raster State functions

  * **SetFillMode**([`FillMode`](#fillmode))
  * ClearFillMode
  * **SetCullMode**([`CullMode`](#cullmode))
  * ClearCullMode
  * **SetDepthBias**(`number`)
  * ClearDepthBias
  * **SetDepthBiasClamp**(`number`)
  * ClearDepthBiasClamp
  * **SetDepthBiasSlopeScale**(`number`)
  * ClearDepthBiasSlopeScale
  * **SetMultisampleEnabled**(`boolean`)
  * ClearMultisampleEnabled
  * **SetDepthClipEnabled**(`boolean`)
  * ClearDepthClipEnabled
  * **SetConservativeRasterEnabled**(`boolean`)
  * ClearConservativeRasterEnabled
  * **SetForcedSampleCount**(`number`)
  * ClearForcedSampleCount

### Blend State functions

  * **SetAlphaToCoverageEnabled**(`boolean`)
  * ClearAlphaToCoverageEnabled
  * **SetIndependentBlendEnabled**(`boolean`)
  * ClearIndependentBlendEnabled
  * **SetBlendEnabled**(`boolean`)
  * ClearBlendEnabled
  * **SetBlendWriteMask**(`number`)
  * ClearBlendWriteMask
  * **SetBlendSource**([`BlendFactor`](#blendfactor))
  * ClearBlendSource
  * **SetBlendDest**([`BlendFactor`](#blendfactor))
  * ClearBlendDest
  * **SetBlendOp**([`BlendOp`](#blendop))
  * ClearBlendOp
  * **SetBlendAlphaSource**([`BlendFactor`](#blendfactor))
  * ClearBlendAlphaSource
  * **SetBlendAlphaDest**([`BlendFactor`](#blendfactor))
  * ClearBlendAlphaDest
  * **SetBlendAlphaOp**([`BlendOp`](#blendop))
  * ClearBlendAlphaOp

### Depth/Stencil State functions
  * **SetDepthEnabled**(`boolean`)
  * ClearDepthEnabled
  * **SetDepthWriteMask**([`DepthWriteMask`](#depthwritemask))
  * ClearDepthWriteMask
  * **SetDepthComparisonFunc**([`ComparisonFunc`](#comparisonfunc))
  * ClearDepthComparisonFunc
  * **SetStencilEnabled**(`boolean`)
  * ClearStencilEnabled
  * **SetStencilReadMask**(`number`)
  * ClearStencilReadMask
  * **SetStencilWriteMask**(`number`)
  * ClearStencilWriteMask
  * **SetStencilFrontFaceFailOp**([`StencilOp`](#stencilop))
  * ClearStencilFrontFaceFailOp
  * **SetStencilFrontFaceDepthFailOp**([`StencilOp`](#stencilop))
  * ClearStencilFrontFaceDepthFailOp
  * **SetStencilFrontFacePassOp**([`StencilOp`](#stencilop))
  * ClearStencilFrontFacePassOp
  * **SetStencilFrontFaceFunc**([`ComparisonFunc`](#comparisonfunc))
  * ClearStencilFrontFaceFunc
  * **SetStencilBackFaceFailOp**([`StencilOp`](#stencilop))
  * ClearStencilBackFaceFailOp
  * **SetStencilBackFaceDepthFailOp**([`StencilOp`](#stencilop))
  * ClearStencilBackFaceDepthFailOp
  * **SetStencilBackFacePassOp**([`StencilOp`](#stencilop))
  * ClearStencilBackFacePassOp
  * **SetStencilBackFaceFunc**([`ComparisonFunc`](#comparisonfunc))
  * ClearStencilBackFaceFunc
  
## Enum types
  
These enum types are reflected to lua with the following global values:

#### MaterialPropertyVisibility

* MaterialPropertyVisibility_Enabled
* MaterialPropertyVisibility_Disabled
* MaterialPropertyVisibility_Hidden

#### FillMode

* FillMode_Solid
* FillMode_Wireframe
* FillMode_Invalid

#### CullMode

* CullMode_None
* CullMode_Front
* CullMode_Back
* CullMode_Invalid

#### ComparisonFunc

* ComparisonFunc_Never
* ComparisonFunc_Less
* ComparisonFunc_Equal
* ComparisonFunc_LessEqual
* ComparisonFunc_Greater
* ComparisonFunc_NotEqual
* ComparisonFunc_GreaterEqual
* ComparisonFunc_Always
* ComparisonFunc_Invalid

#### BlendFactor

* BlendFactor_Zero
* BlendFactor_One
* BlendFactor_ColorSource
* BlendFactor_ColorSourceInverse
* BlendFactor_AlphaSource
* BlendFactor_AlphaSourceInverse
* BlendFactor_AlphaDest
* BlendFactor_AlphaDestInverse
* BlendFactor_ColorDest
* BlendFactor_ColorDestInverse
* BlendFactor_AlphaSourceSaturate
* BlendFactor_Factor
* BlendFactor_FactorInverse
* BlendFactor_ColorSource1
* BlendFactor_ColorSource1Inverse
* BlendFactor_AlphaSource1
* BlendFactor_AlphaSource1Inverse
* BlendFactor_Invalid

#### BlendOp

* BlendOp_Add
* BlendOp_Subtract
* BlendOp_SubtractReverse
* BlendOp_Minimum
* BlendOp_Maximum
* BlendOp_Invalid

#### DepthWriteMask

* DepthWriteMask_Zero
* DepthWriteMask_All
* DepthWriteMask_Invalid

#### StencilOp

* StencilOp_Keep
* StencilOp_Zero
* StencilOp_Replace
* StencilOp_IncrementSaturate
* StencilOp_DecrementSaturate
* StencilOp_Invert
* StencilOp_Increment
* StencilOp_Decrement
* StencilOp_Invalid


