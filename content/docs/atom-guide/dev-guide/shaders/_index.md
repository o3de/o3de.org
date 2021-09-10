---
title: "Shader System"
description: "Learn about the Shader System in the Atom Renderer."
toc: false
weight: 500
---

This section contains technical details about the shader system in the Atom Renderer.

## Contents
| Topic                        | Description |
|--------------------------------------|---------|
| [Amazon Shader Language and Compiler](azsl/_index.md) | AZSL (Amazon Shader Language) is an open source extension of HLSL, which enables developers to write shaders in one language and run the shaders across different platforms. The AZSLc (Amazon Shader Language Compiler) transpiles AZSL code into HLSL code, and then uses other tools like DXC (DirectX Shader Compiler) and SPIRV-Cross, to compile the HLSL code for a target. | 
| [Shader Build Pipeline](shader-build-pipeline.md) | A subsystem within the Asset Processor where the user defines the list of shaders and their compilation attributes. The shader build pipeline compiles all of the shaders defined in Gems and O3DE projects, and produces shader assets that will be used by the rendering pipeline at runtime. It depends on tools like AZSLc, DXC, and SPRIV-Cross to compile the shaders for each target platform. |
| [Shader File Specification](/docs/atom-guide/look-dev/shaders/shader-file-spec/) | A JSON reference for `.shader` files. |
<!--| [Runtime API for Using Shaders](runtime-api.md) | The set of classes and interfaces that use shaders, and how to make them visible to the material and pass systems. |DRAFT TOPIC-->
