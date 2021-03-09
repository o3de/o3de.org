---
title: "AZSL Symbol Encoding"
description: Learn about AZSLc's symbol encoding and the AZSL Intermediate Representation.
---

{{< preview-new >}}

In the shader compilation process, the AZSLc compiles AZSL code into HLSL code. During this intermediate step, the AZSLc can provide some useful information, like the mangled symbol names it uses in stack traces. 

The **AZSL Intermediate Representation (AZIR)** describes the naming structure used internally by AZSLc. To encode symbol identities into unique strings, AZSLc's symbol table uses a mangling scheme with the following rules:

1. A scope is separated by a forward slash. (`Parent/member`)
2. The global scope is a root scope represented by a single forward slash. (`/`)
3. A fundamental type is fully qualified with a question mark. (`?float4`)
4. An anonymous block is introduced by a dollar sign. (`/Func()/$bk0`)
5. Functions contain the canonical identities of their parameter lists within their identity, enclosed in parenthesis. (`/Func(?int)`)
   
You can verify these schemes by using the `--dumpsym` option in AZSLc.