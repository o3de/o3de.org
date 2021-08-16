---
linktitle: AZSL and Compiler
title: Amazon Shader Language and Compiler
description: Learn about the Amazon Shader Language in the Atom Renderer. 
weight: 100
---

This section contains technical details about programming in the Amazon Shader Language (AZSL) and compiling with the Amazon Shader Language Compiler (AZSLc). In the Atom Renderer, shaders are written in AZSL and are compiled by AZSLc. 

## Contents
| Topic                        | Description |
|------------------------------|-------------|
| [Amazon Shader Language Reference (AZSL)](reference.md) | Learn about the AZSL language. |
| [Binding Rules for Unbounded Arrays](binding-rules.md) | Understand the rules and limitations when declaring unbounded arrays in AZSL. |
| [Design of Shader Variant Options](shader-variant-options.md) | Define shader variant options to optimize shader code compilation in AZSL. |
| [Shader Variant Options and the Fallback Key](fallback-key.md) | Learn about how Shader Variant Options are encoded when compiled, and how developers can set up a Fallback Key in AZSL. |
| [Shader Resource Group Semantics](srg-semantics.md) | Define Shader Resource Group Semantics to describe the order in which descriptor bindings and descriptor sets are emitted for each Shader Resource Group in AZSL. |
| [Amazon Shader Language Compiler (AZSLc)](azsl-compiler.md) | Understand how AZSLc transpiles AZSL shaders into HLSL, which is the first part of the compilation process in the shader build pipeline. |