---
linktitle: AZSLc
title: AZSLc, The Amazon Shading Language Compiler
description: Learn about the Amazon Shading Language Compiler (AZSLc) for Atom Renderer. 
weight: 100
---

**Amazon Shading Language Compiler (AZSLc)** is the front-end compiler of the Atom Renderer shader build pipeline. AZSLc is open source, and supports Windows, macOS, and Linux. The source code for AZSLc is available on GitHub here: [Amazon Shading Language Compiler](https://github.com/o3de/o3de-azslc).

## Shader build pipeline

AZSLc serves the following two purposes:
* Transpile shaders written in **Amazon Shading Language (AZSL)** into high-level shader language (HLSL).
* Extracts reflection data from the `.azsl` files including the shader constants layout, resource binding information, shader variant options, and more. The result outputs into JSON files.  

AZSLc, platform-specific shader compilers, shader asset builders, and **Asset Processor** work together to process `.azsl` source assets into product assets that the engine can consume. Asset Processor automatically detects new and updated `.azsl` source assets that are placed in project or Gem scan directories. Shader asset builders provide process job information about the `.azsl` source assets to Asset Processor. When `.azsl` source assets are processed, AZSLc transpiles the shader source to high-level shader language (HLSL). The shader product assets are compiled for the specified target platforms by DirectX Shader Compiler (DXC) and SPIRV-Cross.  
  
For more information on the shader build pipeline, refer to [Shader Build Pipeline](/docs/atom-guide/dev-guide/shaders/shader-build-pipeline).

## Running AZSLc

The AZSLc executable is located in the `\Builders\AZSLc\` directory of the **Open 3D Engine (O3DE)** build target directory.
There are many command line arguments that can be given to AZSLc. One of the more important optional arguments is `--no-ms` which transpiles mulitsample anti-aliasing (MSAA) functions and variables to their non-MSAA counterpart.
For a complete list of available command line arguments for AZSLc, run the `azslc` executable in a terminal with the `--help` argument.
