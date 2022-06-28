---
title: "Shader File Specification"
description: "A file specification for Shader files (`*.shader`) in the Atom Renderer."
toc: false
weight: 1000
---

Shader files (`*.shader`) are written in JSON format and contain the following elements.

- **Source**: A file path to the AZSL source file (`*.azsl`). The path can be relative to this shader file or relative to the asset root.
  
- **RasterState**: The render state configuration for the rasterizer. 

- **DepthStencilState**: The depth stencil state for the output merger. 

- **CompilerHints**: A container of settings for the chain of shader compilers. The settings might be implemented differently per platform with varying levels of support.  
  
  For the full list of settings, see `ShaderCompilerArguments::Reflect` in `Gems\Atom\RHI\Code\Source\RHI.Edit\ShaderCompilerArguments.cpp`. 
  {{< note >}}
AZSLc is just the first compiler in the chain, that generates HLSL code. There are various other compilers, like dxc and spirv-cross, that perform additional translation and compilation. 
  {{< /note >}}
  

- **ProgramSettings**: A container for shader program settings.
  - **EntryPoints**: The list of shader entry points to build. If the EntryPoints setting is omitted, the builders will look for valid functions starting or ending with VS, PS, or CS, corresponding to vertex, fragment, and compute shaders.
    - **Name**: The name of the shader entry point function, which was defined in the AZSL source file (`.azsl`). 
    - **Type**: The type of shader function. The supported types are “Vertex”, “Fragment”, and “Compute”. 
  
- **DrawList**: The name of the draw list where DrawItems that are using this shader should be queued for rendering. This name must match the draw list name in one or more passes (`*.pass` file) to be rendered.

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
