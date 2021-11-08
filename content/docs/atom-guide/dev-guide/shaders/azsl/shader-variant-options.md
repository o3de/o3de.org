---
linktitle: Shader Variant Options
title: AZSL, Design Principles And Purpose Of Shader Variant Options
description: Learn about the design principles and purpose of AZSL Shader Variant Options in the Atom Renderer. 
weight: 100
---

Shader Variant Options are "statically optimizable" Shader Constants that the developer can choose to compile as static constants or as regular global variables. They are only used in conditional statements.  
  
Shader Variant Options are conceptually equivalent to [Specialization Constants](https://www.khronos.org/registry/vulkan/specs/1.1-khr-extensions/html/chap10.html#pipelines-specialization-constants) (external link) in Vulkan.  
  
The idea is easier to explain with some code. Consider the following AZSL code snippet, where a Shader Variant Option is being used to conditionally branch:  
  
    if (o_useRed) {
        color = float3(1, 0, 0);
    } else {
        color = float3(0, 0, 1);
    }
  
When the shader code, shown above, is compiled and the value of **"o_useRed"** is not known at compilation time then **"o_useRed"** will be compiled as a regular Shader Constant. The shader byte code **will branch at runtime** depending on the value of **"o_useRed"** as set by the Application.  
  
Please notice that **"will branch at runtime"** was emphasized. In general, branching is slower than not branching. To avoid branching, the value of **"o_useRed"** can be defined at compilation time, let's say to **true**.  
  
    // Because the developer chose o_useRed to be true at compilation time,
    // the compiler will optimize and produce the following branch-less code.
    color = float3(1, 0, 0);
  
Alternatively, at compilation time **"o_useRed"** may be defined as **false**, and the optimized output code will look like:  
  
    // Because the developer chose o_useRed to be false at compilation time,
    // the compiler will optimize and produce the following branch-less code.
    color = float3(0, 0, 1);
  
We can see from this simple example that there can be three different versions of the compiled shader code to be used at runtime. These are called Shader Variants (**ShaderVariantAssets**), and they only differ only in two ways:  
1. Whether the value of some Shader Variant Options is statically defined at compilation time or not.
2. And the values chosen at compilation time for those statically defined Shader Variant Options.
  
Following up with this example, We can endup with three different versions (Variants) of the shader bytecode:  
1. The first variant is the one where "o_useRed" is just a regular Shader Constant. This byte code will branch at runtime, BUT provides flexibility to the application to set its value before the shader is submitted for execution. This is called the Root Variant (Root ShaderVariantAsset).
2. The second variant (a Baked Variant) is the one where "o_useRed" was given the value true at compilation time. This byte code won't branch at runtime, there are APIs to help the Application discover this variant of the shader before submitting for execution.
3. The third variant (a Baked Variant) is the one where "o_useRed" was given the value false at compilation time. This byte code won't branch at runtime.  
  
Using Baked Shader Variants will provide the maximum runtime performance of shaders, at the expense of more shader byte code files in the asset catalog (more ShaderVariantAssets).  
  
Depending on the amount of Shader Variant Options declared in a shader, the application may end up with a large permutation of shader variant assets. More on this topic [here](shader-variants-fallback-key.md).  
