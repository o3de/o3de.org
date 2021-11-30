---
linktitle: AZSL
title: AZSL, The Amazon Shading Language
description: Learn about the Amazon Shading Language (AZSL) for Atom Renderer.
toc: true
weight: 100
---

Shaders for Atom Renderer are written in Amazon Shading Language (AZSL). AZSL is a superset of high-level shader language (HLSL). AZSL supports Vertex, Fragment and Compute shaders according to Shader Model 6.2. Ray-Tracing shaders are also supported according to Shader Model 6.3.

Typically, you write shader code in a file with the `.azsl` extension, also known as an _AZSL source file_. You can also write shader code in a file with the `.azsli` extension, which is an include file that multiple AZSL source files can reference. Consider writing your shaders in `.azsli` files to reuse them in multiple AZSL source files and reduce code redundancy.  

AZSL is defined on top of HLSL with the following differences:

* [Declaration Of Shader Constants](#declaring-shader-constants)
* [Shader Resource Groups](#ShaderResourceGroup)
* [Shader Resource Group Semantics](srg-semantics)
* [Root Constants](#root-constants)
* [Shader variant options](#option)
* [The special attribute \[\[pad_to(N)\]\]](#padton)

The shader build pipeline allows for `.azsl` files to include other files and define C/C++ Macros. The `.azsl` files are always pre-processed by the **[C Pre-Processor (MCPP)](http://mcpp.sourceforge.net/)** before being transpiled into HLSL. In other words, if a raw `.azsl` file has `#include`, `#pragma` or `#define` directives it should be run through **MCPP** before being compiled with **AZSLc**, otherwise **AZSLc** will fail to compile such files.

**Caveat**: **MCPP** doesn't support Macros with arithmetic expressions. Examples:  
```cpp
    // Bad (Arithmetic Expression in C-Macros are not supported by MCPP)
    #define BAD_MACRO(x, y) ((x * 0.5) - (y * 2.0))
     
    // Good
    #define HEIGHT (7.2)
```
## Declaring Shader Constants
Also known as Shader Uniforms in other shader languages, like GLSL.

AZSL allows the declaration of shader constants only in the following places:

* [Shader Resource Groups](#ShaderResourceGroup).
* [Root Constants](#root-constant).
* `option` variables
{{< note >}}
You can also use `option` variables equivalently as Vulkan's Specialization Constants. In other words, You can define these constants statically at compilation time to avoid branching at runtime.
{{< /note >}}
  
**AZSLc** triggers a compilation error if an arbitrary `cbuffer` or any other type of resource is declared outside of the scopes mentioned above. The exception is `static` global variables, which shaders use internally, but aren't exposed to the application.

## <a name="ShaderResourceGroup"></a>Shader Resource Groups

A *Shader Resource Group (SRG)* is a logical namespace to declare shader constants and resources. In AZSL the keyword to declare an SRG is `ShaderResourceGroup`. Shader resources are constants of the types: Shader Resource Views (SRV), Unordered Access Views (UAV), Constant Buffer Views (CBV), and Sampler States.

When compiling shaders with the `--use-spaces` argument, each SRG takes over a whole register space (or descriptor set, as known in Vulkan). AZSL abstracts the register and register space assignment of resource descriptors with the `ShaderResourceGroupSemantic` keyword, which you must specify when declaring SRGs.

Use the following syntax to declare an SRG:
```cpp
    ShaderResourceGroup <Name> : <Semantic>
    {
        <Data>
    };
```
Alternatively, use a `partial` qualifier to declare an SRG. For more information on partials, refer to [Partial ShaderResourceGroup Definitions](#partial-shaderresourcegroup-definitions).
```cpp
    partial ShaderResourceGroup <Name> : <Semantic>
    {
        <Data>
    };
```
* `<Name>` is the user defined name for the SRG.
* `<Semantic>` is the name of the `ShaderResourceGroupSemantic` for the SRG. For more information on SRG Semantics, refer to [AZSL, Shader Resource Group Semantics](srg-semantics).
* `<Data>` is one or more declarations of functions, constants, and resources for the binding data that the SRG contains. For more information on the type data that an SRG can contain, refer to [Data](#data).  
  
### Data
* Fundamental type variables like `float`, `float3`, `int2`, `bool`, `matrices`, and so on. AZSLc emits a *Constant Buffer View (CBV)* that packs all the Fundamental type variables that the SRG declares.

* Resource declarations like `Texture2D`, `Texture2DMS`, `ByteAddressBuffer`, as well as HLSL shader resource of the categories: Shader Resource Views (SRV), Unordered Access Views (UAV), Samplers and CBVs.

* Unbounded arrays for the following resource declarations: SRVs, UAVs, CBVs and Samplers. You may need to consider some rules for unbounded arrays, depending on the command line arguments you use when you compile with AZSLc. For more information, refer to [AZSL, Binding Rules fore Unbounded Arrays](./unbounded-arrays).

* Functions.

* Structs (declaration and instances).

* Instances of classes. You can instantiate classes in an SRG, but you must declare them outside of the SRG.  
  
**Example**  
The following example demonstrates an SRG declaration. A *Shader Resource Group Semantic (SRG Semantic)* defines the space index, or descriptor set, of the constants and resources declared inside the SRG.  When you declare an SRG, it must specify an SRG Semantic. For more information on SRG Semantics, refer to [AZSL, Shader Resource Group Semantics](./srg-semantics).
```cpp
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
```
### Scope
Every SRG defines a scope and the SRG data must be qualified when accessed from out-of-SRG scope code.  
```cpp
    float4 color = ExampleSRG::m_uniformColor;
    color *= ExampleSRG::m_texture.Sample(ExampleSRG::m_staticSampler, float2(0.5, 0.5));
```

### Sampler variables
A dynamic sampler declaration does not contain a body definition because they must be set at runtime. You can also declare a dynamic sampler as an array.

A static sampler declaration contains a body definition. You can declare a sampler and sampler-comparison by using AZSL's `Sampler` keyword, which conveniently encompasses HLSL's `SamplerState` and `SamplerComparisonState` keywords. AZSLc compiles sampler variables into the corresponding HLSL variables: `SamplerState`, or `SamplerComparisonState`, if it contains a `ComparisonFunc` definition..  

The following examples demonstrate declarations for a dynamic sampler, a static sampler, and a static sampler comparison. They must be declared inside an SRG.
```cpp
    // Dynamic sampler declaration
    Sampler m_dynamicSampler;
     
    // Static sampler declaration. Compiled as HLSL SamplerState
    Sampler m_staticSamplerState
    {
        AddressU = Wrap;
        AddressV = Wrap;
        AddressW = Wrap;
        MagFilter = Linear;
    };
     
    // Static sampler declaration. Compiled as HLSL SamplerComparisonState because of the ComparisonFunc declaration.
    Sampler m_staticSamplerComparisonState
    {
        AddressU = Wrap;
        AddressV = Wrap;
        AddressW = Wrap;
        MagFilter = Linear;
        ComparisonFunc = Less;
    };
    ...
```
### Functions
Functions can be declared in classes, global scopes, or inside SRGs. Defining functions inside SRGs is unique to AZSL.  
```cpp
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
```
### Structs
Just like in HLSL, the following rules apply for structs:
- Must be defined globally. 
- Contains only data, not methods. 
- Cannot have a constructor or destructor. 
- Cannot accept default member initializers.  
  
AZSL adds an extended rule: Define and instantiate structs inside SRGS. You can instantiate globally defined structs inside SRGs, root constants, and another struct or class.

### Classes
Just like in HLSL, the following rules apply for classes:
- Must be declared and defined only in global scopes, outside of SRGs. 
- Can inherit from interfaces, which forces the class to repect a minimal method set. 
- Don't have constructors or destructors.
- Don't accept default member initializers.  
  
ASZL adds the following extended rules for classes:
- Can instantiate class type variables in an SRG. 
- Cannot inherit classes, unlike in HLSL. .

### Matrices
AZSL follows the HLSL convention to use column major matrices by default. However, in O3DE runtime, the default convention is row major matrices. When declaring a matrix, you can specify the order by using the `row_major` or `column_major` keywords.  
```cpp
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
```
### Arrays And Unbounded Arrays
For array definitions, the rules and limitations are exactly the same as HLSL. The following examples demonstrate array declarations: 
```cpp
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
```
To learn more about the limitations when declaring unbounded arrays, go to: [Binding Rules For Unbounded Arrays.](./unbounded-arrays)  
  
### Partial ShaderResourceGroup Definitions.
Before talking about partial SRGs, it's important to talk about SRG Semantics, which is always required when declaring a `ShaderResourceGroup`. Read about SRG Semantics in [Shader Resource Group Semantics](srg-semantics).  
  
Define a partial SRG by using `partial ShaderResourceGroup`. The `partial` keyword is useful to define parts of an SRG in different blocks (for example, across different files). This is a similar concept as partial classes in C#.  
There are no limits on how many `partial` blocks can be used to define an SRG.  

There are three requirements for defining partial SRGs:  
1. When using `partial` to define an SRG block, all other SRG definition blocks within for the same SRG must also start with the `partial` keyword.
2. For a given SRG, at least one `partial` SRG block must define the SRG Semantic.
3. For a given SRG, if the SRG Semantic is defined more than once across different `partial` blocks, then they must refer to the same SRG Semantic.  
  
{{< important >}}
When AZSLc finds the first `partial ShaderResourceGroup` block, it will use it as the unified point of emission for all the data of a given SRG across all partial blocks. The main recommendation that comes out of this rule, is that any globally defined struct, or class that may be referenced by a partial SRG block must be defined before the first partial block for the SRG in question.
{{< /important >}}

**Example: Using the partial keyword**  
```cpp
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
```
  
**Example (Error): partial, emission point Error**  
```cpp
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
```
**Example (Solution): partial, emission point success**  
```cpp
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
```
## Root Constants
AZSL supports the definition of shader constants that conform to the DX12 concept of Root Constants: https://docs.microsoft.com/en-us/windows/win32/direct3d12/using-constants-directly-in-the-root-signature.  
  
Root Constants, declared with the `rootconstant` keyword, will be transparently embedded into a `ConstantBuffer`. They are useful to define shader constants of frequent access. Because they are located in the root signature they can be read instantly without requiring additional levels of indirection.  
  
Shader constants qualified as `rootconstant` are always declared globally. Examples:  
```cpp
    rootconstant float4x4 s_objectMatrix;
    rootconstant uint s_materialIndex;
```
Root Constants should be used sparingly because the space to define root constants, the Root Signature, is shared with Root Descriptors and Descriptor Tables. In D3D12, the Root Signature is limited at 64 DWords (256 Bytes) worth of space that is shared among Root Constants, Root Descriptors and Descriptor Tables.  
  
## <a name="option"></a>Shader variant options

Before describing how to use Shader variant options in a shader, you should read this: [AZSL: Design Principles And Purpose Of Shader variant options.](shader-variant-options)  
  
Shader variant options are declared as global variables with the `option` keyword. Their ultimate purpose is to avoid conditional branching, in favor of static execution, all for the sake of performance.  
  
Although the ultimate purpose is to avoid conditional branching at runtime, they can be used to conditionally branch at runtime and, in fact, it's the default behavior of the shader code to conditionally branch at runtime when a Shader Variant has not been compiled (not *baked*).  
  
It is helpful to think of Shader variant options as compile time configurable C Macros.  
  
They can be of type `bool`, `int`, or `enum`. Other data types like `float` and `struct` options are not supported.  
  
An `int` option requires a range attribute to specify the minimum and maximum range of values.  
```cpp
    option bool o_useIBL;
    option bool o_useShadows = true;
     
     
    option enum QualityT {Low, Medium, High} o_quality;
    option enum class SurfaceT {Metal, Plastic, Hair} o_surface = SurfaceT::Metal;
     
    enum LightContributionT {None, Diffuse, Specular, Both};
    option LightContributionT o_directLightContribution;
    option LightContributionT o_indirectLightContribution;
     
    [[range(3, 16)]] // This integer option accepts values between 3 and 16 (both ends included).  
    option int o_numberOfTaps;
```
Even though the Shader variant options are declared globally, they are actually encoded in a single array of bits as a member variable of one, and only one, SRG.  
To learn more about how Shader variant options are encoded when compiled, please read: [Shader variant options & The Fallback Key.](shader-variants-fallback-key)  
  
# <a name="padton"></a>The special attribute [[pad_to(N)]]
In DX12, the layout, offset & sizes, of variables inside `struct` definitions changes whether a `struct` is being used as part of a `ConstantBuffer`, or as part of a `StructuredBuffer`.  
Example:  
```cpp
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
```
The [[pad_to(N)]] attribute is useful to pad the data with dummy variables until guaranteeing that the offset of the next variable starts with the desired alignment. The **N** argument is a single integral literal that must be a multiple of 4.  
In the case posted above, `struct MyStruct`, using `[[pad_to(16)]]` can be useful to guarantee the same layout regardless of how it is used, as part of a `ConstantBuffer` or a `StructuredBuffer`:  
```cpp
    struct MyStruct
    {
         float m_data;
         [[pad_to(16)]]
         float4 m_arr[2]; //Now, this member variable will always start at offset 16.
    };
```
In this example, **MyStruct** is forced to be of size 64 bytes:  
```cpp
    struct MyStruct
    {
         float m_data;
         [[pad_to(16)]]
         float4 m_arr[2]; //Now, this member variable will always start at offset 16.
         [[pad_to(64)]] // This guarantees the sizeof(MyStruct) to be 64.
    };
```
