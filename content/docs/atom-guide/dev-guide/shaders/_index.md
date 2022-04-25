---
linkTitle: "Shader System"
title: "Atom Renderer Shader System"
description: "Learn about the Atom Renderer shader system."
toc: false
weight: 500
---

This section contains technical details about Atom Renderer's shader system, including the Amazon Shading Language (AZSL), the Amazon Shading Language Compiler (AZSLc), the shader build pipeline, and the `.shader` file specification.

## Contents
| Topic                        | Description |
|--------------------------------------|---------|
| [The Amazon Shading Language (AZSL)](azsl/) | AZSL is an open source extension of HLSL. With AZSL you can author shaders in one language and build them for multiple target platforms. | 
| [The Amazon Shading Language Compiler (AZSLc)](azslc/) | AZSLc transpiles AZSL code into HLSL code. | 
| [Shader Build Pipeline](shader-build-pipeline) | The shader build pipeline is a subsystem of the **Asset Pipeline** that builds shaders based on compilation attributes you define. When **Asset Processor** discovers `.azsl` source assets in scan directories, the shader build pipeline uses AZSLc, DirectX Shader Compiler (DXC), and SPIRV-Cross to compile the shader product assets for the specified target platforms. |
| [Shader File Specification](/docs/atom-guide/look-dev/shaders/shader-file-spec/) | A JSON reference for `.shader` files. |
<!--| [Runtime API for Using Shaders](runtime-api/) | The set of classes and interfaces that use shaders, and how to make them visible to the material and pass systems. |DRAFT TOPIC-->
