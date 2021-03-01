# Shader Variants and the Options Keyword
## Shader Variants
A shader source file can have multiple variants, which are permutations of the same shader. Each shader has at least one variant, a **root variant**. In a root variant, all the options are dynamic. A shader variant is optimized for performance, where one or more options are baked with static values and static branches. They are reflected to the Atom Asset Builder and participate in variant permutation building.

<!-- @csantora Using "Atom Asset Builder" based on your previous comment in Materials PR. I want to make sure it is applicable here too. Yes/no/maybe? -->

<!-- [
    NOTE FOR DEVS:
- What does it mean for options to be "dynamic"?
- How are shader variants optimized?
] --> 

## Options Type Qualifier
Variants are defined using the `option` type qualifier.
In the top level declaration scope, you can define variables as either `static const` or `option` qualified, but not as uniforms.

The `option` type qualifier must be of type *enum*, *bool*, or *int*. An *int* option requires a *range* attribute to specify the minimum and maximum range of values. *Float* and *struct* options are not supported. 

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

When one or more option variables are declared, only one SRG must have a fallback value. The size of the fallback value should be at least 128 bits and 128-bit aligned. The fallback value is specified on a Shader Resource Group Semantic. 

```glsl
ShaderResourceGroupSemantic OptionExample
{
    FrequencyId = 6;
    ShaderVariantFallback = 128;
};
```

A generated constant buffer is used to pass the bitset representing the values of all options. This is automatically accessed when a specified, hard-coded shader bytecode prebuild is not available.