---
linktitle: AZSLc
title: AZSLc, The Amazon Shading Language Compiler
description: Learn about the Amazon Shading Language Compiler in the Atom Renderer. 
weight: 100
---

**AZSLc** is the front end compiler of the O3DE Shader Build Pipeline. It serves two purposes:
1. Transpile shaders written in AZSL into HLSL files.
2. Extract, in the form of JSON files, reflection data from the AZSL files: shader constants layout, resource binding information, shader variant options, etc.
  
Users of O3DE don't work directly with AZSLc, instead they rely on the Shader Build Pipeline to do all the shader compilation.
  
There are many command line arguments that can be given to **AZSLc**, of particular importance *--no-ms* is one of the optional arguments to highlight.  
*--no-ms* Useful to transpile the usage of MSAA related functions and variables to their non-MSAA counterpart. More on this later.  
  
**AZSLc** is an Open Source project hosted at: https://github.com/o3de/o3de-azslc.  
It is available on Windows, MacOS and Linux.
