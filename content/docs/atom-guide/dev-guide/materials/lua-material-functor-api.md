---
title: "Lua Material Functor API"
description: "Lua material functors allow custom logic for processing material properties."
toc: true
---

Lua material functors allow custom logic for processing material properties. They can read property values, set shader inputs and shader options, configure render states, adjust material property visibility in the editor, and more.

## Name Context

The material functor may execute in an implicit name context, where certain prefixes are attached to the names that appear in the script. This allows the same lua script to be used in different contexts, for example in one material type it might exist in a group with the name "metallic" and in another the group might be called "metalness". In both cases, the groups have properties "texture" and "factor". The functor will reference the properties as simply "texture" or "factor" and the system will automatically prepend the appropriate name context internally. Material properties, shader inputs (constants or images), and shader options each potentially have a separate name context. See (/docs/atom-guide/look-dev/materials/material-type-file-spec/) for details about how the name context may be specified.

## Main Functions

The material system expects the the following functions to be defined at the global scope in the lua script.

* **GetMaterialPropertyDependencies()**: Returns a list of all material properties that may be read by the functor. Errors will be reported for properties that are accessed without reporting the dependency.
* **GetShaderOptionDependencies()**: Returns a list of all shader options that may be set by the functor. Errors will be reported for options that are accessed without reporting the dependency. (Note that the `Material::SetSystemShaderOption` function in the C++ API may only be called on shader options that are _not_ declared as dependencies or otherwised used by the material type).
* **Process(context)**: This is the main function that runs when the material is _used for rendering_. It runs when the material is first initialized or whenever relevant material property values are changed. The `context` object provides access to the API for accessing the _material properties and shader(s)_.
* **ProcessEditor(context)**: This is the main function that runs when the material is _being edited in tools_. It runs when the material is first initialized or whenever relevant material property values are changed. The `context` object provides access to the API for accessing _material properties and their metadata_.

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

## Global Utility Functions

These functions are available in the global scope.

* **Error**(`string`): report an error message to AZ_Error.
* **Warning**(`string`): report a warning message to AZ_Warning.
* **Print**(`string`): report a message to AZ_TracePrintf.

## Process(context) Functions

These functions are available in the `context` object that is passed to the `Process` function.

* Each **GetMaterialPropertyValue_** function takes a `string` property name and returns a value of the appropriate type. You must use the version that matches the data type of the material property. The material property must be listed in [GetMaterialPropertyDependencies](#main-functions).
  * **GetMaterialPropertyValue_bool**(`string`): returns a `boolean`
  * **GetMaterialPropertyValue_int**(`string`): returns a `number`
  * **GetMaterialPropertyValue_uint**(`string`): returns a `number`
  * **GetMaterialPropertyValue_enum**(`string`): returns a `number`
  * **GetMaterialPropertyValue_float**(`string`): returns a `number`
  * **GetMaterialPropertyValue_Vector2**(`string`): returns a `Vector2` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Vector3**(`string`): returns a `Vector3` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Vector4**(`string`): returns a `Vector4` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Color**(`string`): returns a `Color` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Image**(`string`): returns a generic pointer `userdata` type if an image is available, or `nil` otherwise.
* **HasMaterialProperty**(`string`): returns a boolean whether a property with the given name exists. Note the material property does not have to be listed in [GetMaterialPropertyDependencies](#main-functions) because this functions is just checking availability, not _reading values_.
* Each **SetShaderConstant_** function takes a `string` shader input name and value to set. You must use the version that matches the data type of the shader input.
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
* Each **SetShaderOptionValue_** function takes a `string` shader option name and value to set. The value will be applied to all shaders in the material type that have an option with the given name. You must use the version that matches the data type of the shader option. The shader option must be listed in [GetShaderOptionDependencies](#main-functions).
  * **SetShaderOptionValue_bool**(`string`, `boolean`)
  * **SetShaderOptionValue_uint**(`string`, `number`)
  * **SetShaderOptionValue_enum**(`string`, `number`)
* **GetShaderCount()**: Returns the number of shaders in the material type.
* **GetShader**(`number`): Returns a [`ShaderItem`](#shaderitem-functions) at a given index, or a dummy [`ShaderItem`](#shaderitem-functions) if the index is out of bounds. See [ShaderItem Functions](#shader-functions). 
* **GetShaderByTag**(`string`): Returns a [`ShaderItem`](#shaderitem-functions) that has a given tag name, or a dummy [`ShaderItem`](#shaderitem-functions) if the name is not found. See [ShaderItem Functions](#shader-functions) and [Shader tags in the Material Type File Specification](/docs/atom-guide/look-dev/materials/material-type-file-spec/#shaders). 
* **HasShaderWithTag**(`string`): Returns a `boolean` whether a shader with the given tag name exists. See [Shader tags in the Material Type File Specification](/docs/atom-guide/look-dev/materials/material-type-file-spec/#shaders).

## ProcessEditor(context) Functions

These functions are available in the `context` object that is passed to the `ProcessEditor` function.

* Each **GetMaterialPropertyValue_** function takes a `string` property name and returns a value of the appropriate type. You must use the version that matches the data type of the material property. The material property must be listed in [GetMaterialPropertyDependencies](#main-functions).
  * **GetMaterialPropertyValue_bool**(`string`): returns a `boolean`
  * **GetMaterialPropertyValue_int**(`string`): returns a `number`
  * **GetMaterialPropertyValue_uint**(`string`): returns a `number`
  * **GetMaterialPropertyValue_enum**(`string`): returns a `number`
  * **GetMaterialPropertyValue_float**(`string`): returns a `number`
  * **GetMaterialPropertyValue_Vector2**(`string`): returns a `Vector2` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Vector3**(`string`): returns a `Vector3` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Vector4**(`string`): returns a `Vector4` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Color**(`string`): returns a `Color` type. See [Lua Math Library](/docs/user-guide/scripting/lua/math-library/).
  * **GetMaterialPropertyValue_Image**(`string`): returns a generic pointer `userdata` type if an image is available, or `nil` otherwise.
* Each **SetMaterialProperty** function takes a `string` property name and sets some aspect of the property's editor metadata. See corresponding items in [Property Layout in Material Type File Specification](/docs/atom-guide/look-dev/materials/material-type-file-spec/#propertylayout). Note the material property does not have to be listed in [GetMaterialPropertyDependencies](#main-functions) because these functions are just setting metadata, not _reading values_.
  * **SetMaterialPropertyVisibility**(`string`, [`MaterialPropertyVisibility`](#materialpropertyvisibility))
  * **SetMaterialPropertyDescription**(`string`, `string`)
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

## ShaderItem Functions

ShaderItem is a lua `userdata` item with the following functions:

* **GetRenderStatesOverride()**: Returns a [`RenderStates`](#renderstates-functions) object that can be used to set overrides for any available render state.
* **SetEnabled(boolean)**: Sets whether the shader should be enabled or not.
* **SetDrawListTagOverride**(`string`): Overrides the draw list tag name that the shader will use. Set to empty string to clear the override and restore the value from the *.shader* file. See `DrawList` in the [Shader File Specification](/docs/atom-guide/look-dev/shaders/shader-file-spec/)
* Each **SetShaderOptionValue_** function takes a `string` shader option name and value to update one of this shader's options. You must use the version that matches the data type of the shader option. The shader option must be listed in [GetShaderOptionDependencies](#main-functions).
  * **SetShaderOptionValue_bool**(`string`, `boolean`)
  * **SetShaderOptionValue_uint**(`string`, `number`)
  * **SetShaderOptionValue_enum**(`string`, `number`)

## RenderStates Functions

RenderStates is a lua `userdata` item with the following functions. For each render state there is a **Set\*\*\*** function for setting an override value and a **Clear\*\*\*** function for clearing the override and restoring the default value. Most of these functions are just light wrappers over lower level render APIs.

* **Multisample State** functions
  * **SetMultisampleCustomPosition**(`number` multisampleCustomLocationIndex, `number` x, `number` y)
  * ClearMultisampleCustomPosition
  * **SetMultisampleCustomPositionCount**(`number`)
  * ClearMultisampleCustomPositionCount
  * **SetMultisampleCount**(`number`)
  * ClearMultisampleCount
  * **SetMultisampleQuality**(`number`)
  * ClearMultisampleQuality
* **Raster State** functions
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
* **Blend State** functions
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
* **Depth/Stencil State** functions
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
  
## Enum Types
  
These enum types are reflected to lua with the following global values:

#### MaterialPropertyVisibility

* MaterialPropertyVisibility_Enabled
* MaterialPropertyVisibility_Disabled
* MaterialPropertyVisibility_Hidden

#### FillModef

* FillMode_Solid
* FillMode_Wireframe
* FillMode_Invalid

#### CullMode

* CullMode_None
* CullMode_Front
* CullMode_Back
* CullMode_Invalid

#### ComparisonFunc

{{< note >}}
These enum values might not actually be reflected as intended, it seems to be an oversight. See https://github.com/o3de/o3de/issues/10203
{{< /note >}}

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


