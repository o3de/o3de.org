---
linktitle: AZSL and Compiler
title: Amazon Shader Language and Compiler
description: Learn about the Amazon Shader Language in the Atom Renderer. 
weight: 100
---

This section contains technical details about programming in the Amazon Shader Language (AZSL) and compiling with the Amazon Shader Language Compiler (AZSLc). In the Atom Renderer, shaders are written in AZSL and are compiled by AZSLc.
## Contents
| Topic                        | Description |
|--------------------------------------|---------|
| [AZSL: The Amazon Shader Language](azsl.md) | AZSL (Amazon Shader Language) is an open source extension of HLSL, which enables developers to write shaders in one language and run the shaders across different platforms.| 
| [AZSLc: The Amazon Shader Language Compiler](azslc/) |The AZSLc (Amazon Shader Language Compiler) transpiles AZSL code into HLSL code. The Shader Build Pipeline, which is part of the AssetProcessor, uses other tools like DXC (DirectX Shader Compiler) and SPIRV-Cross, to compile the HLSL code for a target.|
