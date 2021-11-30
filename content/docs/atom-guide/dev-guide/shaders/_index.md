---
title: "Shader System"
description: "Learn about the Shader System."
toc: false
weight: 500
---

This section contains technical details about the shader system in O3DE.

## Contents
| Topic                        | Description |
|--------------------------------------|---------|
| [The Amazon Shading Language (AZSL)](azsl/) | *The Amazon Shading Language (AZSL)* is an open source extension of HLSL, which enables developers to write shaders in one language and run the shaders across different platforms. | 
| [The Amazon Shading Language Compiler (AZSLc)](azslc/) | *The Amazon Shading Language Compiler (AZSLc)* transpiles AZSL code into HLSL code. | 
| [Shader Build Pipeline](shader-build-pipeline) | A subsystem within the **AssetProcessor** where the user defines the list of shaders and their compilation attributes. The shader build pipeline compiles all of the shaders defined in Gems and O3DE projects, and produces shader assets that will be used by the rendering pipeline at runtime. It depends on tools like AZSLc, DXC, and SPRIV-Cross to compile the shaders for each target platform. |
| [Shader File Specification](/docs/atom-guide/look-dev/shaders/shader-file-spec/) | A JSON reference for `.shader` files. |
<!--| [Runtime API for Using Shaders](runtime-api/) | The set of classes and interfaces that use shaders, and how to make them visible to the material and pass systems. |DRAFT TOPIC-->
