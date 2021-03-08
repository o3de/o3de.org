---
title: Shader system
description: Learn about the shader system used by O3DE Atom, and how to write AZSL programs.
---

Shaders in Atom are written in the **Amazon Shading Language (AZSL)**, coupled with specialized configuration files that add various metadata. This consists of a main AZSL source file (`*.azsl`) and a shader asset file (`*.shader`). It might also include a shader variant list (`*.shadervariantlist`) and multiple AZSL include files (`*.azsli`, `*.srgi`).

## Shaders in the Asset Pipeline
The Asset Processer has several builders that work together to process .shader, .azsl, .azsli, and .shadervariantlist files and produce all the assets needed by the runtime. These shader assets and shader variant assets are most often used by the pass system or by the material system. During the build process, the Shader Asset Builder converts the `.shader` file into `.azshader` file. The `.azsl` file is translated from AZSL to HLSL (Shader Model 6.3) using the **Amazon Shading Language Compiler (AZSLc)**. The translated code is then compiled by the platform compilers:
- **D3D12**: dxc.exe with DXT emission.
- **Vulkan**: dxc.exe with SpirV emission.
- **Metal**: dxc.exe and spriv-cross to generate `.msl` files. 

## AZSL Source Files (`*.azsl`, `*.azsli`, `*.srgi`)
**AZSL** is a variation of HLSL, with a few extensions that make it easier to author and maintain shaders. Most constructs that works in HLSL will work in AZSL as well. A key difference between AZSL and HLSL is the use of **Shader Resource Groups (SRGs)**, which make it easier to write shaders for multiple platforms and populate the shader inputs at runtime. Also, **shader options** simplify the process of generating multiple shader variants for optimizing shader bytecode. 
<!-- [WRITER NOTE] How can i improve this paragraph by eliminating "easy" and "simple" -->

The **AZSL compiler (AZSLc)** is a “transpiler” that translates AZSL into HLSL. It is then passed to common shader compilers like DXC.exe to compile bytecode for the target platforms. 

<!-- [todo] Further details on shader compilers can be found in the AZSL Reference. -->

The main source code file for any shader is a `.azsl` file. This contains the entry point functions for the relevant shader stages, like the vertex shader, pixel shader, and/or compute shader. It might include other files containing reusable AZSL code, like `.azsli` files and `.srgi` files.
The `.azsli` files are virtually identical to the `.azsl` files; they just use the “azsli” extension by convention to indicate they contain reusable utility code rather than shader entry point functions (the “i" stands for “include”). Atom comes with many `.azsli` files for various utility code that is reused throughout the renderer and can be used by project teams to create their own custom shaders.

The `.srgi` files are specialized AZSL files that are used to merge multiple **partial ShaderResourceGroup** definitions into a single shader resource group asset. This allows multiple Gems to contribute their own resources to a common SRG, like the SceneSrg or ViewSrg. 

<!-- [todo] For more detail on this topic see TBD link. -->


## Shader Asset Files (`*.shader`)
Shader asset files (`*.shader`) are written in JSON. They reference the main AZSL source file (`*.azsl`) and add a variety of metadata for configuring the shader compiler (AZSLc) and indicating how the render pipeline should use this shader. 

When built by the Asset Processor, the *source* shader asset file (`*.shader`) will produce a corresponding *product* shader asset file (`*.azshader`) in the cache. It will also produce a shader variant asset (`*.azshadervariant`) for the root shader variant, which is the default bytecode used for rendering <!-- [todo] (see the [Shader Variants]() section for more information) -->.

The shader asset file includes the following elements:

- **Source**: A file path to the AZSL source file (`*.azsl`). The path can be relative to this shader file or relative to the asset root.
  
- **RasterState**: The render state configuration for the rasterizer. 

- **DepthStencilState**: The depth stencil state for the output merger. 

- **CompilerHints**: A container of settings for the chain of shader compilers. The settings might be implemented differently per platform with varying levels of support.  
  
  For the full list of settings, see `ShaderCompilerArguments::Reflect` in `Gems\Atom\RHI\Code\Source\RHI.Edit\ShaderCompilerArguments.cpp`. 
  {{< note >}}
AZSLc is just the first compiler in the chain, that generates HLSL code. There are various other compilers, like dxc and spirv-cross, that perform additional translation and compilation
  {{< /note >}}
  

- **ProgramSettings**: A container for shader program settings.
  - **EntryPoints**: The list of shader entry points to build. If the EntryPoints setting is omitted, the builders will look for valid functions starting or ending with VS, PS, or CS, corresponding to vertex, fragment, and compute shaders.
    - **Name**: The name of the shader entry point function, which was defined in the AZSL source file (`.azsl`). 
    - **Type**: The type of shader function. The supported types are “Vertex”, “Fragment”, and “Compute”. 
  
- **DrawLists**: The name of the draw list where DrawItems using this shader should be queued for rendering. This name must match the draw list name in one or more passes (`*.pass` file) to be rendered.

{{< note >}}
This is a high level breakdown of the available elements in the shader asset file. The most reliable way to know the full specification is to inspect `ShaderSourceData::Reflect()` in `Gems\Atom\Code\Source\RPI.Edit\Shader\ShaderSourceData.cpp`. 

For the various render states listed above, like DepthStencilState and RasterState, see `Gems\Atom\RHI\Code\Source\RHI.Reflect\RenderStates.cpp`.
{{< /note >}}


The following is an example of a shader file, `MinimalPBR_ForwardPass.shader`. 
```json
{
    "Source" : "./MinimalPBR_ForwardPass.azsl",

    "DepthStencilState" :
    {
        "Depth" :
        {
            "Enable" : true,
            "CompareFunc" : "GreaterEqual"
        },
        "Stencil" :
        {
            "Enable" : true,
            "ReadMask" : "0x00",
            "WriteMask" : "0xFF",
            "FrontFace" :
            {
                "Func" : "Always",
                "DepthFailOp" : "Keep",
                "FailOp" : "Keep",
                "PassOp" : "Replace"
            }
        }
    },

    "CompilerHints" : { 
        "DxcDisableOptimizations" : false
    },

    "ProgramSettings":
    {
      "EntryPoints":
      [
        {
          "name": "MinimalPBR_MainPassVS",
          "type": "Vertex"
        },
        {
          "name": "MinimalPBR_MainPassPS",
          "type": "Fragment"
        }
      ]
    },

    "DrawList" : "forward"
}

```

## Shader Variant List (`*.shadervariantlist`)
This section is in progress. 