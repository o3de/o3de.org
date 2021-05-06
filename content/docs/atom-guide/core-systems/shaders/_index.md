---
title: "Shader System"
description: "Learn about the Shader System in the Atom renderer."
toc: false
weight: 300
---

{{< preview-new >}}

This section contains technical details about the shader system in the Atom renderer.

## Contents
| Topic                        | Description |
|--------------------------------------|---------|
| [Amazon Shader Language and Compiler](azsl/_index.md) | AZSL (Amazon Shader Language) is an open source extension of HLSL, which enables developers to write shaders in one language and run it across different platforms. AZSLc (Amazon Shader Language Compiler) transpiles AZSL code into HLSL code, and then uses other tools like DXC (DirectX Shader Compiler) and SPIRV-Cross, to compile the HLSL code into byte code for each platform supported by O3DE. |
| [Shader Build Pipeline](shader-build-pipeline.md) | A subsystem within the Asset Processor where the user defines the list of shaders and compilation attributes for each one of them. It compiles all of shaders defined in Gems and O3DE projects, and produces shader assets that will be used by the rendering pipeline at runtime. It depends on tools like AZSLc, DXC, and SPRIV-Cross to compile the shaders for each target platform. |
| [Runtime API for Using Shaders](runtime-api.md) | The set of classes and interfaces that use shaders, and how to make them visible to the material and pass systems. |
