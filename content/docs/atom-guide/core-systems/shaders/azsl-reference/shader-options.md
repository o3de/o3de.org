---
title: Shader Options
description: Learn about creating AZSL shader variants in code with the 'option' keyword.
---
A **shader variant** is an alternate version of a shader that can have some or all of its shader options statically compiled into the bytecode. This is an optimization that can help reduce *dynamic branching*. 

{{< preview-new >}}

For example, the original shader code might have branching logic, like `if(shadowsEnabled)`, to perform additional calculations for shadows. If the value of `shadowsEnabled` is declared to be a shader option, then you can make two shader variants: one where `shadowsEnabled` is true and one where it is false. At runtime, one of these shader variants is automatically selected depending on whether shadows should be enabled, rather than forcing the GPU to check the condition dynamically.

<!-- [todo] For more information on Shader Variants, see __ -->

## Options Type Qualifier
Shader variants can be created based on the set of shader options in the shader. These options are declared as variables in the global scope using the `option` type qualifier. Note that global variables can be declared as `static`, `static const`, or `option`. The `uniform` keyword is not supported.

The `option` type qualifier must be of type *enum*, *bool*, *int*, or *uint*. An *int* or *uint* option requires a *range* attribute to specify the minimum and maximum range of values.

Shader options declarations may include an initializer. If no initializer is provided, the default value will be 0 or false.

{{< note >}}
The recommended naming convention is to prefix all shader options with "o_".
{{< /note >}}

```glsl
option bool o_useIBL;
option bool o_useShadows = true;
 
option enum QualityT {Low, Medium, High} o_quality;
option enum class SurfaceT {Metal, Plastic, Hair} o_surface = SurfaceT::Metal;
 
enum LightContributionT {None, Diffuse, Specular, Both};
option LightContributionT o_directLightContribution;
option LightContributionT o_indirectLightContribution;
 
[[range(1, 16)]]
option int o_numberOfTaps;
```

When one or more shader options are declared, one of the SRGs in the shader must have a fallback key, through its SRG semantic (see [SRG Semantic](/docs/atom-guide/core-systems/shaders/azsl-reference/shader-resource-groups/#defining-an-srg-semantic)).

```glsl
ShaderResourceGroupSemantic SRG_PerDraw
{
    FrequencyId = 0;
    ShaderVariantFallback = 128;
};
ShaderResourceGroup MyExampleSrg : SRG_PerDraw
{
    ...
}
```

This SRG will include an automatically generated constant buffer that is filled with a bitset representing the values of all shader options. Whenever a shader variant does not have an option's value baked-in, it will retrieve the value from this constant buffer.