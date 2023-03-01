---
linkTitle: The Fallback Key
title: Shader Variant Options and the Fallback Key
description: Learn about the fallback key; the array that contains the shader variant options for an Amazon Shading Language (AZSL) shader. 
weight: 100
---

Shader variant options are declared globally. They are encoded in a bit array as a member variable of *one, and only one* shader resource group (SRG). This bit array is known as the *fallback key*, and the SRG that owns the fallback key is known as the *shader variant fallback*.  
  
## Which SRG owns the fallback key?
The shader developer chooses which SRG owns the fallback key. This is done via the `ShaderVariantFallback` member of the SRG Semantic.  
  
If at least one shader variant option is declared, then the developer must define the `ShaderVariantFallback` for one, and only one, SRG Semantic.  
  
### Error case
The following example demonstrates how to declare a single shader variant option of boolean type, `o_useObjectColor`. There are two SRGs in this example. This example will fail to compile because the compilers needs one, and only one, SRG Semantic to define the `ShaderVariantFallback`.

The **Amazon Shading Language Compiler (AZSLc)**, will report the following error:  
`IR error #129: If you have non-static options, one SRG must be designated as the default ShaderVariantFallback`.  
```cpp
option bool o_useObjectColor;

ShaderResourceGroupSemantic SRG_PerDraw
{
    FrequencyId = 0;
}
ShaderResourceGroupSemantic SRG_PerObject
{
    FrequencyId = 1;
}
 
ShaderResourceGroup ObjectSrg : SRG_PerObject
{
    float4 m_color;
}
 
ShaderResourceGroup DrawSrg : SRG_PerDraw
{
	float4 m_color; 
}

PSOutput MainPS(VSOutput IN)
{
    PSOutput OUT;
    if (o_useObjectColor)
    {
        OUT.m_color = ObjectSrg::m_color;
    }
    else
    {
        OUT.m_color = DrawSrg::m_color;
    }
    return OUT;
}
```

### Solution
In the following example, to resolve this, the developer chooses `DrawSrg` as the shader variant fallback. In other words, `DrawSrg` owns the fallback key:  
```cpp
option bool o_useObjectColor;

ShaderResourceGroupSemantic SRG_PerDraw
{
    FrequencyId = 0;
    ShaderVariantFallback = 128; // The SRG that gets this semantic will own the 128bits long Fallback Key.
}
ShaderResourceGroupSemantic SRG_PerObject
{
    FrequencyId = 1;
}
 
ShaderResourceGroup ObjectSrg : SRG_PerObject
{
    float4 m_color;
}
 
ShaderResourceGroup DrawSrg : SRG_PerDraw
{
	float4 m_color; 
}

PSOutput MainPS(VSOutput IN)
{
    PSOutput OUT;
    if (o_useObjectColor)
    {
	   OUT.m_color = ObjectSrg::m_color;
    }
    else
    {
       OUT.m_color = DrawSrg::m_color;
    }
    return OUT;
}
```
### How many bits long is this array of bits where the compiler encodes all of the shader variant options?
When one or more option variables are declared, one and only one SRG must have the fallback value. The size of the fallback value should be at least 128 bit. The fallback value is specified on a SRG Semantic.  
The following example demonstrates how to declare a SRG Semantic with the fallback value. 
```cpp
ShaderResourceGroupSemantic OptionExample
{
    FrequencyId = 6;
    ShaderVariantFallback = 128;
};
```
The fallback key is a shader constant and has its own API to configure at runtime. For a 128 bits long fallback key, an array of four 32-bit integers is reserved to hold the bitset that represents the values of all options that are not defined statically at compilation time.  
  
## Permutations of shader variant assets
When AZSLc compiles shader code and produces a shader asset, a *root variant* is generated per platform (DX12, Vulkan, Metal, and so on). The root variant can execute any branch in the code at runtime because the byte code uses each shader variant option. Because the size of the shader variant fallback key is 128 bits, the shader developer can use up to 128 unique boolean options.  
To fully specialize (or bake) all the possible permutations, the shader build pipeline must generate (2<sup>128</sup>  - 1) shader variant assets per platform. You may not need all those shader variant assets, so the developer can specify which permutations the shader build pipeline builds.  
  
In the following example, consider an arbitrary integral option in the range 2 to 17 (16 unique values). In order to fit 16 unique values, **o_numberOfTaps** takes 4 of 128 bits from the shader variant fallback key.  
If the developer wants to fully avoid dynamic branching, then in addition to the root variant, specify to the shader build pipeline to compile 16 unique shader variant assets per platform.  
```cpp
[[range(2, 17)]] // This integer option accepts values between 2 and 17 (inclusive at both ends).  
option int o_numberOfTaps;
    
    ... some code
    switch (o_numberOfTaps) {
        case 2:
        ...
        case 3:
        ...
        ...
        ...
        case 17:
    }
```
