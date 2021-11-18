---
linktitle: AZSL
title: AZSL, The Amazon Shader Language
description: Learn about the Amazon Shader Language in the Atom Renderer.
toc: true
weight: 100
---

In O3DE, shaders are written in the Amazon Shader Language (AZSL).

AZSL is a superset of HLSL. AZSL supports Vertex, Fragment and Compute shaders according to Shader Model 6.2. Ray-Tracing shaders are also supported according to Shader Model 6.3.

Typically, a shader is written in a file with the *.azsl* extension.

Shader code can be written in include files with the *.azsli* (optional, yet recommended) extension and referenced by multiple AZSL source files.


AZSL is defined on top of HLSL with the following differences:

* [Declaration Of Shader Constants](#shaderconstants).
* [Shader Resource Groups](#ShaderResourceGroup).
* [Shader Resource Group Semantics](srg-semantics).
* [Root Constants](#rootconstant).
* [Shader Variant Options](#option).
* [The special attribute](#padton) [[pad_to(N)]].

Although not a language extension, the shader build pipeline allows for *.azsl* files to include other files and define C/C++ Macros. The *.azsl* files are always pre-processed by the *C Pre-Processor (MCPP)* before being transpiled into HLSL. In other words, if a raw *.azsl* file has `#include`, `#pragma` or `#define` directives it should be run through **MCPP** before being compiled with **AZSLc**, otherwise **AZSLc** will fail to compile such files.

**Caveat**: **MCPP**, doesn't support Macros with arithmetic expressions. Examples:  
```cpp
    // Bad (Arithmetic Expression in C-Macros are not supported by MCPP)
    #define BAD_MACRO(x, y) ((x * 0.5) - (y * 2.0))
     
    // Good
    #define HEIGHT (7.2)
```
## <a name="shaderconstants"></a>Declaring Shader Constants (also known as Shader Uniforms in other shader languages, like GLSL)

AZSL only allows the declaration of shader constants inside the following places:

* [Shader Resource Groups](#ShaderResourceGroup).
* [Root Constants](#rootconstant).
* `option` variables, but these variables can also be used equivalently as Vulkan's Specialization Constants, in other words, these constants can be statically defined at compilation time to avoid branching at runtime.  
  
**AZSLc** will trigger a compilation error if an arbitrary `cbuffer` or any other type of resources are declared outside the scopes mentioned above. The exception would be `static` global variables, which won't be exposed to the application but will be usable internally by the shaders.

## <a name="ShaderResourceGroup"></a>Shader Resource Groups

A *Shader Resource Group (SRG)* is a logical namespace to declare shader constants and resources. In AZSL the keyword to declare an SRG is `ShaderResourceGroup`. Shader resources are constants of the type Shader Resource Views (SRV), Unordered Access Views (UAV), Constant Buffer Views (CBV), and Sampler States.

When compiling shaders with the "--use-spaces" argument, each SRG will take over a whole register space (or descriptor set, as known in Vulkan). AZSL abstracts the register and register space assignment of resource descriptors with the `ShaderResourceGroupSemantic` keyword, which must be specified when declaring SRGs.

A Shader Resource Group is declared with the following syntax:
  
    ShaderResourceGroup <Name> : <Semantic>
    {
        <Data>
    };
     
    //Alternatively
    partial ShaderResourceGroup <Name> : <Semantic>
    {
        <Data>
    };
  
* **&lt;Name&gt;** is the user defined name for the SRG.
* **&lt;Semantic&gt;** is the name of the `ShaderResourceGroupSemantic` for the SRG. More on this later.
* **&lt;Data&gt;** is one or more declaration of functions, constants and resources for the binding data contained in the SRG.  
  
In the code block shown above, a [partial](#partial) qualifier can be used when declaring SRGs.
### &lt;Data&gt;
SRGs can contain fundamental type variables like float, float3, int2, bool, matrices, etc. For each SRG, a Constant Buffer View (CBV) will be automatically created and it will pack all the fundamental type variables declared inside the SRG.

SRGs can contain resource declarations like Texture2D, Texture2DMS, ByteAddressBuffer, etc. In general any HLSL shader resource of the categories:  Shader Resource Views (SRV), Unordered Access Views (UAV), Samplers and Constant Buffer Views (CBV).

SRGs can contain unbounded arrays for resource declarations: SRVs, UAVs, CBVs and Samplers. There are some rules that need to be considered, depending on command line arguments when compiling with **AZSLc**. More on unbounded arrays [here](unbounded-arrays).

SRGs can contain functions.

SRGs can contain structs (declaration & instances). The Shader Build Pipeline and the runtime handle the platform-specific packing rules and alignment.

SRGs can contain instances of classes (but you can not declare classes inside an SRG).  
  
**Example**  
The following example demonstrates declaration of a Shader Resource Group. We have not covered details of what is a `ShaderResourceGroupSemantic`, but suffice to say, it defines the space (aka, descriptor set) index of the constants and resources declared inside the SRG.  
  
    ShaderResourceGroupSemantic BindingPerExample
    {
        FrequencyId = 0;
    };
       
    ShaderResourceGroup ExampleSRG : BindingPerExample
    {
        float4          m_uniformColor;
        Texture2D       m_texture;
        Buffer<float>   m_buffer;
        Sampler m_dynamicSampler;
        Sampler m_staticSampler
        {
            AddressU = Wrap;
            AddressV = Wrap;
            AddressW = Wrap;
            MagFilter = Linear;
        };
        
        // You can define functions inside a ShaderResourceGroup
        float GetRedColor()
        {
            return m_uniformColor.r;
        }
    };
  
### Scope
Every SRG defines a scope and the SRG data must be qualified when accessed from out-of-SRG scope code.  
  
    float4 color = ExampleSRG::m_uniformColor;
    color *= ExampleSRG::m_texture.Sample(ExampleSRG::m_staticSampler, float2(0.5, 0.5));
  

### Sampler variables
* Dynamic Samplers are declared without a body definition. They have to be set in the runtime. Dynamic Samplers can also be declared as arrays.
* Static Samplers are declared with a body definition.
    * Although you can declare Samplers directly as `SamplerState` or `SamplerComparisonState`, AZSL provides a convenient single `Sampler` keyword for both.
    * Sampler variables will be compiled into regular HLSL `SamplerState` variables, unless a `ComparisonFunc` is defined inside the `Sampler` block, which will be compiled as `SamplerComparisonState`.  

<!-- -->

    //These samplers are declared inside an SRG
    ...
    Sampler m_dynamicSampler;
     
    // Compiled as HLSL SamplerState
    Sampler m_staticSamplerState
    {
        AddressU = Wrap;
        AddressV = Wrap;
        AddressW = Wrap;
        MagFilter = Linear;
    };
     
    //Compiled as HLSL SamplerComparisonState because of the ComparisonFunc declaration.
    Sampler m_staticSamplerComparisonState
    {
        AddressU = Wrap;
        AddressV = Wrap;
        AddressW = Wrap;
        MagFilter = Linear;
        ComparisonFunc = Less;
    };
    ...
  
### Functions
Functions can be declared in classes, global scopes, or inside SRGs. Declaring functions in classes or in the global scope is a standard HLSL feature. Defining functions inside SRGs is unique to AZSL (Of course, because ShaderResourceGroup  is a exclusive feature of AZSL).  
  
    ShaderResourceGroup PerObject : BindingPerObject
    {
        row_major float3x4 m_modelToWorld;
        row_major float3x3 m_normalMatrix;
       
        float4x4 GetWorldMatrix()
        {
            float4x4 modelToWorld = float4x4(
                float4(1, 0, 0, 0),
                float4(0, 1, 0, 0),
                float4(0, 0, 1, 0),
                float4(0, 0, 0, 1));
       
            modelToWorld[0] = m_modelToWorld[0];
            modelToWorld[1] = m_modelToWorld[1];
            modelToWorld[2] = m_modelToWorld[2];
            return modelToWorld;
        }
           
        float3x3 GetNormalMatrix()
        {
            return m_normalMatrix;
        }
    }
      
      
    VertexOutput MainVS(VertexInput input)
    {
        const float4x4 worldMatrix = PerObject::GetWorldMatrix();
       
        VertexOutput output;
        float3 worldPosition = mul(worldMatrix, float4(input.m_position,1)).xyz;
        output.m_position = mul(GetView_ViewProjectionMatrix(), float4(worldPosition, 1.0));
       
        output.m_uv = input.m_uv;
               
        output.m_positionToCamera = GetView_WorldPosition() - worldPosition;
       
        output.m_normal = mul(PerObject::GetNormalMatrix(), input.m_normal);
        output.m_tangent = mul(PerObject::GetNormalMatrix(), input.m_tangent);
       
        return output;
    }
  
### Structs
Just like in HLSL, structs can be defined globally, but in AZSL they can also be defined and instantiated inside SRGs. You can only instantiate globally defined structs inside SRGs, rootconstants or inside another struct or class.  
  
In general, structs are supported just like in HLSL. struct has no constructors/destructors and as such, do not accept default member initializers.  
  
Just like in HLSL, struct has the particularity to be data only (no methods).

### Classes
Classes are supported in AZSL with the exact same expectations of how they are supported in HLSL. They can only be declared/defined in global scopes (outside of SRGs), but an SRG can instantiate class type variables.  
  
Like in HLSL, classes can inherit from interfaces to be forced to respect a minimal method set.  
  
Unlike in HLSL, AZSL forbids class inheritance among classes.  
  
Classes has no constructors/destructors and as such, do not accept default member initializers.

### Matrices
AZSL follows the HLSL convention to use column major matrices by default.  
  
However, in the O3DE Runtime, the default convention is row major matrices.  
  
When declaring a matrix, the order can be specified using the row_major or column_major keywords.  
  
    ShaderResourceGroupSemantic MatrixExample
    {
        FrequencyId = 1;
    };
      
    ShaderResourceGroup MatrixExampleSRG : MatrixExample
    {
                     float2x3 defaultMatrix;
        row_major    float2x3 rowMajorMatrix;
        column_major float2x3 colMajorMatrix;
    };
  
### Arrays And Unbounded Arrays
From the point of view of defining arrays, the rules and limitations are exactly the same as HLSL. Examples:  
  
    ShaderResourceGroup PerObject : BindingPerObject
    {
        float m_arrayOfFloats[64]; // GOOD. Arrays of fundamental types must be of constant size.
     
        struct SomeStruct
        {
            int m_integer;
            bool m_boolean;
        }
        static const int MyArraySize = 32;
        SomeStruct m_arrayOfStructs[MyArraySize]; // GOOD. Arrays of packable types (structs & fundamentals) require constant size definition.
     
        int m_unboundedArrayOfIntegers[]; // ERROR. Unbounded arrays are not supported for fundamental(packables, in general) data types.
     
        Texture2D<float4> m_textures[MyArraySize]; // GOOD. Contant size array of Resource View types is ok.
         
        ConstantBuffer<SomeStruct> m_unboundedArrayOfStructs[]; // GOOD. Unbounded array of Resource View type is ok. BUT, there are some restrictions.
    }
  
To learn more about what are the limitations when declaring unbounded arrays, go here: [Binding Rules For Unbounded Arrays.](unbounded-arrays)  
  
### <a name="partial"></a> Partial ShaderResourceGroup Definitions.
Before talking about `partial ShaderResourceGroup`, it's important to talk about [ShaderResourceGroupSemantic](srg-semantics), which is always required when declaring a `ShaderResourceGroup`.  
Go to this section to read about [ShaderResourceGroupSemantic](srg-semantics).  
  
The `partial` keyword is useful to define parts of an SRG in different blocks. For example, across different files. This is a similar concept as partial classes in C#.  
There are no limits into how many `partial` blocks can be used to define an SRG.  
There are only three requirements:  
1. When using `partial` to define an SRG block, all other SRG definition blocks, for the same SRG, must start with the `partial` keyword.
2. For a given SRG, at least one `partial` SRG block must define the Shader Resource Group Semantic.
3. For a given SRG, if the Shader Resource Group Semantic is defined more than once across different `partial` blocks, they must refer to the same `ShaderResourceGroupSemantic`.  
  
**Example: Using the partial keyword**  
  
    ShaderResourceGroupSemantic PerPass
    {
        FrequencyId = 1;
    }
     
    partial ShaderResourceGroup PassSrg
    {
        Texture2D m_texture; // A regular SRV resource,
    }
     
    partial ShaderResourceGroup PassSrg : PerPass // At least one partial block must define the semantic
    {
        Sampler m_sampler; // A Dynamic sampler.
    }
     
    partial ShaderResourceGroup PassSrg
    {
        float2 m_resolution;
        float4 ReadColor(float2 uv)
        {
            return m_texture.Sample(m_sampler, uv);
        }
    }
     
    PSOutput MainPS(VSOutput IN)
    {
        PSOutput OUT;
        float2 uv = IN.m_position.xy / PassSrg::m_resolution;
        OUT.m_color = PassSrg::ReadColor(uv);
        return OUT;
    }
  
An important remark about partial SRG blocks is that when the compiler, **AZSLc**, finds the first `partial` block, it will use it as the unified point of emission for all the data of a given SRG across all `partial` blocks. The main recommendation that comes out of this rule, is that any globally defined `struct`, or `class` that may be referenced by a `partial` SRG block must be defined before the first partial block for the SRG in question.  
  
**Example (Error): partial, emission point Error**  
  
    ShaderResourceGroupSemantic PerPass
    {
        FrequencyId = 1;
    }
     
    // This is the first encounter of a "partial" block for "PassSrg".
    // The whole SRG will be emitted here in the generated HLSL.
    partial ShaderResourceGroup PassSrg : PerPass
    {
        float4 m_color;
    }
     
    class SomeClass
    {
        float4 m_colorOffset;
        float4 GetColorOffset()
        {
            return m_colorOffset;
        }
    };
     
    // This is the second encounter of a "partial" block for "PassSrg",
    // All of this code will be emitted at the first encounter.
    partial ShaderResourceGroup PassSrg : PerPass
    {
        // Because the declaration of this variable will be emitted before
        // class SomeClass is defined, it'll appear as if this SRG is referencing an undefined class.
        SomeClass m_instanceOfClass;
     
        float4 GetColor()
        {
            return m_color + m_instanceOfClass.GetColorOffset();
        }
    }
     
    PSOutput MainPS(VSOutput IN)
    {
        PSOutput OUT;
        OUT.m_color = PassSrg::GetColor();
        return OUT;
    }
  
**Example (Solution): partial, emission point success**  
  
    ShaderResourceGroupSemantic PerPass
    {
        FrequencyId = 1;
    }
     
    class SomeClass
    {
        float4 m_colorOffset;
        float4 GetColorOffset()
        {
            return m_colorOffset;
        }
    };
     
    partial ShaderResourceGroup PassSrg : PerPass
    {
        float4 m_color;
    }
     
    partial ShaderResourceGroup PassSrg : PerPass
    {
        SomeClass m_instanceOfClass;
        float4 GetColor()
        {
            return m_color + m_instanceOfClass.GetColorOffset();
        }
    }
     
    PSOutput MainPS(VSOutput IN)
    {
        PSOutput OUT;
        OUT.m_color = PassSrg::GetColor();
        return OUT;
    }
  
## <a name="rootconstant"></a>Root Constants
AZSL supports the definition of shader constants that conform to the DX12 concept of Root Constants: https://docs.microsoft.com/en-us/windows/win32/direct3d12/using-constants-directly-in-the-root-signature.  
  
Root Constants, declared with the `rootconstant` keyword, will be transparently embedded into a `ConstantBuffer`. They are useful to define shader constants of frequent access. Because they are located in the root signature they can be read instantly without requiring additional levels of indirection.  
  
Shader constants qualified as `rootconstant` are always declared globally. Examples:  
  
    rootconstant float4x4 s_objectMatrix;
    rootconstant uint s_materialIndex;
  
Root Constants should be used sparingly because the space to define root constants, the Root Signature, is shared with Root Descriptors and Descriptor Tables. In D3D12, the Root Signature is limited at 64 DWords (256 Bytes) worth of space that is shared among Root Constants, Root Descriptors and Descriptor Tables.  
  
## <a name="option"></a>Shader Variant Options

Before describing how to use Shader Variant Options in a shader, you should read this: [AZSL: Design Principles And Purpose Of Shader Variant Options.](shader-variant-options)  
  
Shader Variant Options are declared as global variables with the `option` keyword. Their ultimate purpose is to avoid conditional branching, in favor of static execution, all for the sake of performance.  
  
Although the ultimate purpose is to avoid conditional branching at runtime, they can be used to conditionally branch at runtime and, in fact, it's the default behavior of the shader code to conditionally branch at runtime when a Shader Variant has not been compiled (not *baked*).  
  
It is helpful to think of Shader Variant Options as compile time configurable C Macros.  
  
They can be of type `bool`, `int`, or `enum`. Other data types like `float` and `struct` options are not supported.  
  
An `int` option requires a range attribute to specify the minimum and maximum range of values.  
  
    option bool o_useIBL;
    option bool o_useShadows = true;
     
     
    option enum QualityT {Low, Medium, High} o_quality;
    option enum class SurfaceT {Metal, Plastic, Hair} o_surface = SurfaceT::Metal;
     
    enum LightContributionT {None, Diffuse, Specular, Both};
    option LightContributionT o_directLightContribution;
    option LightContributionT o_indirectLightContribution;
     
    [[range(3, 16)]] // This integer option accepts values between 3 and 16 (both ends included).  
    option int o_numberOfTaps;
  
Even though the Shader Variant Options are declared globally, they are actually encoded in a single array of bits as a member variable of one, and only one, SRG.  
To learn more about how Shader Variant Options are encoded when compiled, please read: [Shader Variant Options & The Fallback Key.](shader-variants-fallback-key)  
  
# <a name="padton"></a>The special attribute [[pad_to(N)]]
In DX12, the layout, offset & sizes, of variables inside `struct` definitions changes whether a `struct` is being used as part of a `ConstantBuffer`, or as part of a `StructuredBuffer`.  
Example:  
  
    struct MyStruct
    {
         float m_data;
         float4 m_arr[2];
    };
  
For ConstantBuffer&lt;MyStruct&gt; case you'll get these offsets:  
  
    float m_data;                     ; Offset:    0
    float4 m_arr[2];                  ; Offset:   16
  
For StructuredBuffer&lt;MyStruct&gt; case you'll get:  
  
    float m_data;                     ; Offset:    0
    float4 m_arr[2];                  ; Offset:    4
  
The [[pad_to(N)]] attribute is useful to pad the data with dummy variables until guaranteeing that the offset of the next variable starts with the desired alignment. The **N** argument is a single integral literal that must be a multiple of 4.  
In the case posted above, `struct MyStruct`, using `[[pad_to(16)]]` can be useful to guarantee the same layout regardless of how it is used, as part of a `ConstantBuffer` or a `StructuredBuffer`:  
  
    struct MyStruct
    {
         float m_data;
         [[pad_to(16)]]
         float4 m_arr[2]; //Now, this member variable will always start at offset 16.
    };
  
In this example, **MyStruct** is forced to be of size 64 bytes:  
  
    struct MyStruct
    {
         float m_data;
         [[pad_to(16)]]
         float4 m_arr[2]; //Now, this member variable will always start at offset 16.
         [[pad_to(64)]] // This guarantees the sizeof(MyStruct) to be 64.
    };
  
