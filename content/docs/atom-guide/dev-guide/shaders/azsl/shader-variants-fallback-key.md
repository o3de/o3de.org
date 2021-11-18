---
linktitle: Shader Variant Options And The Fallback Key
title: AZSL, Shader Variant Options And The Fallback Key
description: Learn about the design principles and purpose of AZSL Shader Variant Options in the Atom Renderer. 
weight: 100
---

Even though the Shader Variant Options are declared globally, they are actually encoded in a single array of bits as a member variable of **one, and only one** SRG.  
  
This single array of bits is known as the Fallback Key, and the SRG that owns the Fallback Key is known as the Shader Variant Fallback.  
  
Two questions arise:
1. Which SRG is chosen by the compiler to own the Fallback Key?
2. How many bits long is the Fallback Key?
  
## Which SRG is chosen by the compiler to own the Fallback Key?
The shader developer is the one who chooses which SRG will own the Fallback Key. This is done via the `ShaderVariantFallback` member of the SRG Semantic.  
  
If at least one Shader Variant Option is declared, then the developer must define the `ShaderVariantFallback` for one, and only one, SRG Semantic.  
  
In the following example we are declaring a single Shader Variant Option of boolean type, `o_useObjectColor`. There are two SRGs in this example. This example will fail to compile because the compilers needs one, and only one, SRG Semantic to define the `ShaderVariantFallback`.

The compiler, **AZSLc**, will report the following error:  
`IR error #129: If you have non-static options, one SRG must be designated as the default ShaderVariantFallback`.  
  
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
  
And here is the solution, in which the developer chooses `DrawSrg` to be the Shader Variant Fallback. In other words, `DrawSrg` will own the Fallback Key:  
  
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
  
### How many bits long is this array of bits where the compiler encodes all of the Shader Variant Options?
When one or more option variables are declared, one and only one SRG must have a fallback value.  
  
The size of the fallback value should be at least 128 bit.  
The fallback value is specified on a Shader Resource Group Semantic.  
  
    ShaderResourceGroupSemantic OptionExample
    {
        FrequencyId = 6;
        ShaderVariantFallback = 128;
    };
  
The Fallback Key is a Shader Constant, but has its own API to configure At runtime. For a 128 bits long fallback key, an array of four 32-bit integers will be reserved to hold the bitset representing the values of all options not defined statically at compilation time.  
  
Now that the concept of Fallback Key has been introduced, it is time to talk about Shader Variant Byte Code (*ShaderVariantAsset*) Permutations.  
  
## Permutations Of Shader Variant Assets.
When a shader is compiled as an asset, at a minimum one *ShaderVariantAsset* is generated per platform (One for DX12, one for Vulkan, etc). This is called the Root Variant.  
The Root Variant will be capable of executing any branch in the code at runtime because each Shader Variant Option will be used by the byte code.  
Because the size of the Shader Variant Fallback Key is 128 bits, the Shader Developer can make use of up to 128 unique boolean options.  
In order to fully "specialize" (or bake) all the possible permutations the shader build pipeline will have to generate (2<sup>128</sup>  - 1) ShaderVariantAssets, per platform.  
Fortunately, the Shader Build Pipeline only builds the permutations specified by the developer.  
  
For a realistic example, imagine an arbitrary integral option, in the range 2 to 17 (16 unique values):  
  
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
  
In order to fit 16 unique values, **o_numberOfTaps** will take 4 of 128 bits from the Shader Variant Fallback Key.  
And, if the user wants to fully avoid dynamic branching, then in addition to the Root ShaderVariantAsset, 16 unique ShaderVariantAssets, per platform (dx12, vulkan, metal, etc), will be compiled by the Shader Build Pipeline.  
  
