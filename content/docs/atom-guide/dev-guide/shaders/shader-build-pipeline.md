---
title: Shader Build Pipeline
description: Learn about the Shader Build Pipeline in the Atom Renderer.
toc: true
weight: 200
---

Shaders in Atom are written in the **Amazon Shading Language (AZSL)**, coupled with specialized configuration files that add various metadata.

Shaders are made up of several files:  

- **`*.azsl`**: The main AZSL source file that contains the shader program.
- **`*.shader`**: References the .azsl file and attaches metadata to configure the shader for compiling. 
- **`*.azsli`**: (Optional) Contains reusable AZSL code, which is intended to be included in .azsl files. 
- **`*.srgi`**: (Optional) Contains AZSL code, which combines partial SRGs.
- **`.shadervariantlist`**: (Optional) Describes what shader variants must be compiled for a given .shader file. 
  
## AZSL Files

**AZSL** is a variation of HLSL, with a few extensions that make it easier to author and maintain shaders. Most programming rules that apply to AZSL are the same for HLSL. You can refer to the [AZSL and Compiler](azsl/) section and the [Microsoft DirectX HLSL](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-reference) documentation for more details.  

There are a few key extensions of AZSL, which affect the shader build pipeline:
- **Shader Resource Groups (SRGs)**: A container for application visible variables, which are defined in code with the class `ShaderResourceGroup`. SRGs can be defined in `.azsl` files as *partial SRGs*, which define only a portion of an SRG. You can combine the partial SRGs in a single `.srgi` file.<!-- Learn more about SRGs in the [AZSL Reference](azsl/reference.md).DRAFT TOPIC-->
- **Shader Variant Options**: Application visible variables, which the developer can choose to compile as static constants or as regular global variables. The compiled shader code results in **shader variants**, or variations of the shader code, which minimize branching in runtime. You can specify the variants you want to pre-build in a `.shadervariantlist` file.<!-- Learn more about shader variant options in the [AZSL Reference](azsl/reference.md).DRAFT TOPIC-->

### AZSL file (`.azsl`)

The `.azsl` file is the main source file that contains AZSL code and shader programs. Atom currently supports vertex, pixel (or fragment), compute, and raytracing shaders. The `.azsl` file might also include other files with reusable AZSL code, like `.azsli` and `.srgi` files.


### Shader Asset Files (`*.shader`)

The `.shader` files are written in JSON. They reference the main AZSL source file (`*.azsl`) and add a variety of metadata for configuring AZSLc and indicating how the render pipeline should use this shader. 

### AZSL Include file (`.azsli`)

The `.azsli` files contain AZSL code that is meant to be reused and shared among multiple `.azsl` files. The `.azsli` extension is simply a naming convention to indicate that the file contains reusable AZSL code and should be included by `.azsl` files; otherwise, `.azsli` files are virtually identical to the `.azsl` files. 

### SRG Include file (`.srgi`)

The `.srgi` files are specialized AZSL files that are used to merge multiple partial SRG definitions into a single SRG asset. This allows multiple Gems to contribute their own resources to a common SRG, like the SceneSrg or ViewSrg. 

## Shaders in the Asset Pipeline

The **Asset Processer** has several builders that work together to process shader files and produce all of the assets that are needed in runtime. These shader assets and shader variant assets are most often used by the pass system or by the material system. 

The shader build pipeline consists of the following processes: 
1. The **Shader Asset Builder** converts the `.shader` file into a `.azshader` file, known as a *shader asset*. It also produces a shader variant asset (`*.azshadervariant`) for the root shader variant, which is the main variant of the shader and is the default bytecode that's used for rendering.
2. The **Amazon Shading Language Compiler (AZSLc)** and platform compilers compile the `.azsl` file by transpiling AZSL to HLSL (Shader Model 6.3).
3. The target platform's shader compiler compiles the HLSL code.

The Shader System uses the following shader compilers for supported platforms: 
- **D3D12**: DirectX shader compiler with DXT emission.
- **Vulkan**: DirectX shader compiler with SpirV emission.
- **Metal**: DirectX shader compiler and [SPIRV-Cross](https://github.com/KhronosGroup/SPIRV-Cross) to generate metalSL emission. 
