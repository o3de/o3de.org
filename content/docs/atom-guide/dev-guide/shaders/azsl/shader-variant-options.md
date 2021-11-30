---
linktitle: Shader variant options
title: Shader variant options in Amazon Shading Language (AZSL)
description: Learn about Amazon Shading Language (AZSL) shader variant options for Atom Renderer. 
weight: 100
---

Shader variant options are shader constants that are only used in conditional statements that can be statically optimized. You can choose to compile them as static constants or as global variables.  
  
Shader variant options are conceptually equivalent to [Specialization Constants](https://www.khronos.org/registry/vulkan/specs/1.1-khr-extensions/html/chap10.html#pipelines-specialization-constants) (external link) in Vulkan.  
  
The idea is easier to explain with some code. Consider the following AZSL code snippet, where a Shader Variant Option is being used to conditionally branch:  
```cpp
    if (o_useRed) {
        color = float3(1, 0, 0);
    } else {
        color = float3(0, 0, 1);
    }
```
In the shader code above, the value of `o_useRed` is not known at compilation time, so `o_useRed` is compiled as a shader constant. The shader byte code branches at runtime depending on the runtime value of `o_useRed`.  In general, branching is slow and should be avoided.
In this scenario, if the value of `o_useRed` is defined as `true` at compilation time, then the compiler produces the following branch-less code.  
```cpp
    // Because the developer chose o_useRed to be true at compilation time,
    // the compiler will optimize and produce the following branch-less code.
    color = float3(1, 0, 0);
```
If `o_useRed` is defined as `false` at compilation time, then the compiler produces the following branch-less code:  
```cpp
    // Because the developer chose o_useRed to be false at compilation time,
    // the compiler will optimize and produce the following branch-less code.
    color = float3(0, 0, 1);
```
The example above produces three different versions of the compiled shader code. These are called *shader variants* (`ShaderVariantAsset`). The three shader variants produced in the example differ in two ways:
* Whether or not the value of the shader variant option `o_useRed` is statically defined at compilation time.
* The compilation time value for the `o_useRed` when the shader variant option is statically defined.
  
The table below describes the three shader variants created by the example.
| `o_useRed` value | Runtime branch? | Notes |
| - | - | - |
| undefined | yes | Slower than branch-less shader code, but can be set at runtime. This is the root variant (`Root ShaderVariantAsset`). |
| `true` | no | Faster because the value of `o_useRed` is baked in, and shader variant doesn't branch at runtime. |
| `false` | no | Faster because the value of `o_useRed` is baked in, and shader variant doesn't branch at runtime. |

  
Using baked shader variant options provides maximum shader runtime performance but generates more shader variants (`ShaderVariantAssets`) in the **Asset Cache**.  
  
{{< important >}}
If many shader variant options are declared in a shader, a large number of shader variant assets might be generated. This is particularly important to understand if the shader code has nested conditional statements that have shader variant options. A shader variant asset is generated for each possible combination shader variant options, which creates an exponential number of shader variants.
For more information on this topic, refer to [Shader Variant Options and the Fallback Key](../shader-variants-fallback-key).
{{< /important >}}

