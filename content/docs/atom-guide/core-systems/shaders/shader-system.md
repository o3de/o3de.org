# Shader System
<!-- Shaders are computer graphics programs that are used for shading 3D scenes. They are written in shading languages (for example, HLSL and GLSL).  -->
Shaders in Atom are written in the Amazon Shading Language (AZSL), which is an extended version of HLSL. Atom supports *Vertex*, *Fragment*, and *Compute* shaders. Shaders consist of a shader source file (`*.azsl`) and a shader asset file (`*.shader`). Shader source files are written in AZSL. Shader asset files are written in json and contain a reference to its corresponding shader source file. 

## Contents
- Asset Pipeline
- Shader Source Files (.azsl)
- Shader Assets Files (.shader, .azshader)
- Shader Variants (.rootshadervariant)
  
## Shaders in the Asset Pipeline
In the asset pipeline, the written shader files (`.azsl` and `.shader`) are processed and become shader assets. Shader assets are then used directly or consumed by material assets. During this process, the Shader Asset Builder converts the `.shader` file into `.azshader` file. The `.azsl` file is translated from AZSL to HLSL (Shader Model 6.3) using the **Amazon Shading Language Compiler (AZSLc)**. The translated code is then compiled by the platform compilers:
- **D3D12**: dxc.exe with DXT emission.
- **Vulkan**: dxc.exe with SpirV emission.
- **Metal**: dxc.exe and spriv-cross to generate `.msl` files. 
  
Warnings and errors during compilation of shaders are reported by the Asset Processor. 

*Note: AZSL compilers are located in the folder, `..\dev\<project_build>\Bin\Builders\AZSLc\version\<compiler folder>`*.

<!-- For more information on shader compilation, see **Shader Compilation**.  -->


## Shader Source Files (*.azsl)
Shader source files (`*.azsl`) are written in AZSL, an extension of HLSL. All grammar that applies to HLSL can also be applied to AZSL. A key difference between AZSL and HLSL is the use of **Shader Resource Groups (SRGs)**, which are declarations of uniform constants and shader resources. Further details can be found in [AZSL Grammar](azsl-grammar.md). 

### Naming Convention 
The shader source files have the `.azsl` extension and the include files have the `.azsli` extension. This naming convention is enforced by the Asset Processor. Although the shader compiler works with any file extensions, the Asset Processor and the Shader Asset Builder will look for `.azsl` and `.azsli` extensions, so all shaders in Atom must have one of those extensions.

## Shader Asset Files (*.shader)
Shader asset files (`*.shader`) are written in json. A full list of attributes are defined in the file, **ShaderSourceData.cpp**. You can also add new attributes in **ShaderSourceData.cpp**. 

*Note: ShaderSourceData.cpp is located in the folder `dev\Gems\Atom\Code\Source\RPI.Edit\Shader`.*

The following shader asset file sample contains the following elements:
* **Source**: A file path to the shader source file (`*.azsl`). The path is relative to this shader file. The .azsl extension can be omitted. 
  
* **DepthStencilState**: The depth stencil state for the output merger. 
  * **Depth**: An object depth object that contains the attributes `Enable` and `CompareFunc`. To enable the depth, set `Enable` to `true`. The `CompareFunc`  ___[TODO]___. 
  
* **Compiler**: A container of hints to configure the platform's native shader compiler, not AZSLc itself. The hints may be implemented differently per platform. For example, some platforms use more than one compiler (dxc and spirv.cross). The `Version` attribute which specifies what version of the compiler to use. It's recommended to use the latest version. The `DisableOptimizations` can be set to `true` to disable optimizations in the AZSL compiler. Optimizations can be disabled when compiling with *dxc.exe* on *D3D12*. 

* **ProgramSettings**: A container for common program shader settings.
  * **EntryPoints**: The list of shader entry points to build. The `name` corresponds to the shader entry point (function), which was defined in the shader source file (`.azsl`). The `type` corresponds to the shader's function. The supported functions are vertex, fragment, and compute. If the `EntryPoints` setting is omitted, the builders will look for valid functions starting or ending with VS, PS, or CS, corresponding to vertex, fragment, and compute shaders.
  
    All entry points are built with their respective profiles and the byte code is serialized in the root shader variant asset file (`.azshadervariant`). The root shader variant asset is generated and bound to the shader asset file (`.azshader`), which is produced by this shader file (`.shader`). 
  
* **DrawLists**:
The DrawList where RenderItems of this shader should be queued for rendering.

```json
{
    "Source" : "./StandardPBR_ForwardPass.azsl",
 
    "DepthStencilState" : {
        "Depth" : { "Enable" : true, "CompareFunc" : "GreaterEqual" }
    },
 
    "Compiler" : {
        "Version" : "1.6",
        "DisableOptimizations" : false
    },
     
    "ProgramSettings":
    {
      "EntryPoints":
      [
        {
          "name": "StandardPbr_ForwardPassVS",
          "type": "Vertex"
        },
        {
          "name": "StandardPbr_ForwardPassPS",
          "type": "Fragment"
        }
      ]
    },
 
    "DrawList" : "forward"
}
```
