---
linktitle: Unbounded Arrays in AZSL
title: AZSL, Binding Rules For Unbounded Arrays
description: There are limitations into how many and what kind of Unbounded Arrays can be declared. 
weight: 100
---
AZSL supports declaration of unbounded arrays inside Shader Resource Group (SRG) definitions (`ShaderResourceGroup`), but there are limitations on how many and what kind of unbounded arrays can be declared.  **Amazon Shading Language Compiler (AZSLc)** verifies that those rules are not violated.  
  
## Unbounded array rules and limitations
The following table summarizes the rules and limitations for binding unbounded array for the platforms: DX12, Vulkan, and Metal. Each platform uses the `--use-spaces` and `--unique-idx` command line arguments for AZSLc.

In the following table, the symbols, *t[]*, *u[]*, *b[]* and *s[]* refer to the type of resource for the unbounded array that is being declared.
* t – for shader resource views (SRV)
* s – for samplers
* u – for unordered access views (UAV)
* b – for constant buffer views (CBV)


| `--use-spaces`   | `--unique-idx` | Platform | Results |
|----------------|--------------|----------|---------|
| OFF | OFF |                   | Only the last SRG can contain one last unbounded array for each:<br> t[], u[], b[], s[]|
| OFF | ON  |                   | Only the last SRG can contain one, and only one, last unbounded array across all resource types:<br>Only one of t[], u[], b[], s[]|
| ON  | OFF | DX12              | Each SRG can contain one last unbounded array for each: <br> t[], u[], b[], s[]|
| ON  | ON  | Vulkan<br> Metal  | Each SRG can contain one, and only one, last unbounded array across all resource types: <br> Only one of t[], u[], b[], s[]|
  
## Things to know
To understand the examples on this page, review the following information:
* In HLSL, a _register space_ is a slot that connects shader data from the CPU to the GPU. For comparison, a register space is similar to a _descriptor set_ in Vulkan. 
* When compiling shader code with the `--use-spaces` option, AZSLc assigns a unique register space per SRG.
* When compiling shader code with the `--unique-idx` option, AZSLc emits all resource descriptors into numerical sequences, regardless of the descriptor type. Vulkan and Metal platforms require this.
* Unbounded arrays take over the whole range of register indices from the point they are declared. This means you must declare any resources including bounded arrays before declaring an unbounded array. Any resource declared after an unbounded array will cause an error.
  
## Examples
All the examples shown here assume that AZSLc compiles the shader code with the `--use-spaces` option set to ON. So, assume that each SRG is assigned to its own register space.

### Example 1: Register assignments
This example demonstrates how index bindings are assigned to register spaces. It contains one SRG and no unbounded arrays.  
```cpp
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For DX12, --unique-idx is OFF, so the expected register assignment is as follows:
    // The ConstantBuffer reserved for SRG1 binds to b0 register
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV1;      // Binds to t0 register.
        Texture2D<float4>        m_texSRV2;      // Binds to t1 register.
        RWTexture2D<float4>      m_texUAV1;      // Binds to u0 register.
    	RWTexture2D<float4>      m_texUAV2;      // Binds to u1 register.
        Sampler                  m_sampler1;     // Binds to s0 register.
        Sampler                  m_sampler2;     // Binds to s1 register.
        ConstantBuffer<MyStruct> m_cb1;          // Binds to b1 register.
        ConstantBuffer<MyStruct> m_cb2;          // Binds to b2 register.
    };
```
#### Error case 1.1
This example demonstrates how compiling an unbounded array (`Texture2D<float4> m_texSRV_unbounded[]`) can result in a register assignment conflict.  
This example fails to compile because `m_texSRV_unbounded[]` takes over the whole range of register indices from the point its declared. The unbounded array, `m_texSRV_unbounded[]`, is the first texture shader resource view (SRV), so it takes over the whole range of register indices that's allocated for SRVs, from `t0` to `tN`. Texture SRVs that are declared afterwards don't have a register index to bind to.  
```cpp
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For DX12, --unique-idx is OFF, so the expected register assignment is as follows
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV_unbounded[]; // Binds to t0 register, and takes over t1+.
        Texture2D<float4>        m_texSRV1;      // ERROR. There's no tN available to bind this resource to.
        Texture2D<float4>        m_texSRV2;      // ERROR. There's no tN available to bind this resource to.
        RWTexture2D<float4>      m_texUAV1;      // Binds to u0 register.
    	RWTexture2D<float4>      m_texUAV2;      // Binds to u1 register.
        Sampler                  m_sampler1;     // Binds to s0 register.
        Sampler                  m_sampler2;     // Binds to s1 register.
        ConstantBuffer<MyStruct> m_cb1; // Binds to b1 register. (The ConstantBuffer reserved for SRG1 binds to b0 register).
        ConstantBuffer<MyStruct> m_cb2; // Binds to b2 register.
    };
```
#### Error case 1.2
This example demonstrates a similar register assignment conflict, but defines the unbounded array, `m_texSRV_unbounded`, after `m_texSRV1` and before `m_texSRV2`.  Since `m_texSRV_unbounded` is defined after `m_texSRV1`, `m_texSRV1` can successfully bind to a register. However, since `m_texSRV_unbounded` is defined before `m_texSRV2`, it again allocates a whole range of register indices, leaving `m_texSRV2` without an available resource to bind to.  
```cpp
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For DX12, --unique-idx is OFF, so the expected register assignment is as follows:
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV1;            // Binds to t0 register.
        Texture2D<float4>        m_texSRV_unbounded[]; // Binds to t1 register, and takes over t2+.
        Texture2D<float4>        m_texSRV2;      // ERROR. There's no tN available to bind this resource to.
        RWTexture2D<float4>      m_texUAV1;      // Binds to u0 register.
    	RWTexture2D<float4>      m_texUAV2;      // Binds to u1 register.
        Sampler                  m_sampler1;     // Binds to s0 register.
        Sampler                  m_sampler2;     // Binds to s1 register.
        ConstantBuffer<MyStruct> m_cb1; // Binds to b1 register. (The ConstantBuffer reserved for SRG1 binds to b0 register).
        ConstantBuffer<MyStruct> m_cb2; // Binds to b2 register.
    };
```
#### Solution
This example demonstrates how to resolve the register assignment conflicts in the previous error cases. To resolve this, define the unbounded array last among the group of resources with the same resource type. In this case, define `m_texSRV_unbounded` after `m_texSRV1` and `m_texSRV2`.  
```cpp
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For DX12, --unique-idx is OFF, so the expected register assignment is as follows
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV1;      // Binds to t0 register.
        Texture2D<float4>        m_texSRV2;      // Binds to t1 register.
        Texture2D<float4>        m_texSRV_unbounded[]; // Binds to t2 register, and takes over t3+.
        RWTexture2D<float4>      m_texUAV1;      // Binds to u0 register.
    	RWTexture2D<float4>      m_texUAV2;      // Binds to u1 register.
        Sampler                  m_sampler1;     // Binds to s0 register.
        Sampler                  m_sampler2;     // Binds to s1 register.
        ConstantBuffer<MyStruct> m_cb1; //Binds to b1 register. (The ConstantBuffer reserved for SRG1 binds to b0 register).
        ConstantBuffer<MyStruct> m_cb2; // Binds to b2 register.
    };
```
### Example 2: Declaring unbounded arrays of different types
This case shows how to declare an unbounded array for each resource type. Always declare each unbounded array after the last non-unbounded resource of the same resource type.  
```cpp
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For DX12, --unique-idx is OFF, so the expected register assignment is as follows
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV1;            // Binds to t0 register.
        Texture2D<float4>        m_texSRV_bounded[3];  // Binds from t1 to t3 registers (inclusive).
        Texture2D<float4>        m_texSRV_unbounded[]; // Binds from t4, and takes over t5+.
        RWTexture2D<float4>      m_texUAV_bounded[5];  // Binds from u0 to u4 registers (inclusive).
    	RWTexture2D<float4>      m_texUAV_unbounded[]; // Binds from u5 register, and taked over u6+.
        Sampler                  m_sampler1_bounded[7]; // Binds from s0 to s6 registers (inclusive).
        Sampler                  m_sampler2_bounded[3]; // Binds from s7 to s9 registers (inclusive).
        Sampler                  m_sampler_unbounded[]; // Binds to s10 register, and takes over s11+.
        ConstantBuffer<MyStruct> m_cb_array[2]; // Binds from b1 to b2 registers (Inclusive). The ConstantBuffer reserved for SRG1 binds to b0 register.
        ConstantBuffer<MyStruct> m_cb2; // Binds to b3 register.
        ConstantBuffer<MyStruct> m_cb_unbounded[]; // Binds to b4 register, and takes over b5+.
    };
```
Now, let's review what will happen to all the examples above when using '--unique-idx', which is the case for Vulkan & Metal.

### Example 3: Resource assignments with `--unique-idx`
This example is similar to [Example 1: Register assignments](#example-1-register-assignments), but assumes that AZSLc compiles with the `--unique-idx` set to `ON`, which is required by Vulkan and Metal. With the `--unique-idx` option enabled, the register index always increments, regardless of the resource type.  
```cpp
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For Vulkan & Metal, --unique-idx is ON, so the expected register assignment is as follows:
    // The ConstantBuffer reserved for SRG1 binds to b0 register.
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV1;      // Binds to t1 register.
        Texture2D<float4>        m_texSRV2;      // Binds to t2 register.
        RWTexture2D<float4>      m_texUAV1;      // Binds to u3 register.
    	RWTexture2D<float4>      m_texUAV2;      // Binds to u4 register.
        Sampler                  m_sampler1;     // Binds to s5 register.
        Sampler                  m_sampler2;     // Binds to s6 register.
        ConstantBuffer<MyStruct> m_cb1;          // Binds to b7 register.
        ConstantBuffer<MyStruct> m_cb2;          // Binds to b8 register.
    };
```
#### Error case.
This example demonstrates how compiling an unbounded array (`Texture2D<float4> m_texSRV_unbounded[]`) with the `--use-idx` option results in a register assignment conflict. 
This example fails to compile because the unbounded array, `m_texSRV_unbounded[]`, takes over a whole range of register indices, regardless of resource type. `m_texSRV_unbounded[]` takes over `tN`, `uN`, `sN`, and `bN` registers, as opposed to the first error case in [Example 1 : Register assignments](#error-case-11) where it only takes over `tN` registers.
```cpp
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For Vulkan & Metal, --unique-idx is ON, so the expected register assignment is as follows:
    // The ConstantBuffer reserved for SRG1 binds to b0 register.
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV_unbounded[]; // Binds to t1 register and taked over ALL1+. 
        Texture2D<float4>        m_texSRV1;      // ERROR. There's no tN available to bind this resource to.
        Texture2D<float4>        m_texSRV2;      // ERROR. There's no tN available to bind this resource to.
        RWTexture2D<float4>      m_texUAV1;      // ERROR. There's no uN available to bind this resource to.
    	RWTexture2D<float4>      m_texUAV2;      // ERROR. There's no uN available to bind this resource to.
        Sampler                  m_sampler1;     // ERROR. There's no sN available to bind this resource to.
        Sampler                  m_sampler2;     // ERROR. There's no sN available to bind this resource to.
        ConstantBuffer<MyStruct> m_cb1; // ERROR. There's no bN available to bind this resource to.
        ConstantBuffer<MyStruct> m_cb2; // ERROR. There's no bN available to bind this resource to.
    };
```
#### Solution.

This example demonstrates how to resolve the register assignment conflict in the previous error case. To resolve this, define the unbounded array after all resource declarations, regardless of their resource types. In this case, define `m_texSRV_unbounded` after `m_cb2`. Alternatively, you can move the declaration of `m_texSRV_unbounded` into a second SRG declaration, `SRG2`. The next example demonstrates multiple SRG declarations in detail.  
```cpp
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
// For Vulkan & Metal, --unique-idx is ON, so the expected register assignment is as follows
// The ConstantBuffer reserved for SRG1 binds to b0 register.
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV1;      // Binds to t1 register.
        Texture2D<float4>        m_texSRV2;      // Binds to t2 register.
        RWTexture2D<float4>      m_texUAV1;      // Binds to u3 register.
    	RWTexture2D<float4>      m_texUAV2;      // Binds to u4 register.
        Sampler                  m_sampler1;     // Binds to s5 register.
        Sampler                  m_sampler2;     // Binds to s6 register.
        ConstantBuffer<MyStruct> m_cb1;          // Binds to b7 register.
        ConstantBuffer<MyStruct> m_cb2;          // Binds to b8 register.
        Texture2D<float4>        m_texSRV_unbounded[]; // Binds to t9 register, and takes over ALL10+.
    };
```
### Example 4: Declaring unbounded arrays with `--unique-idx`
The earlier example, [Example 2: Declaring unbounded arrays of different types](#example-2-declaring-unbounded-arrays-of-different-types), demonstrates how to declare an unbounded array for each major resource type: SRV(t), UAV(u), Sampler(s) and CBV(b) inside a single SRG. You cannot do this when compiling with the `--use-idx` option.  
To work around this issue, define additional SRGs per resource type. Since each SRG has their set of register spaces that are defined in a numerical sequence, you can avoid resource assignment conflict by separating resources into different SRGs. As in previous examples, always declare an unbounded array as the last variable inside each SRG.  
```cpp
ShaderResourceGroupSemantic slot1 { FrequencyId = 1; };
ShaderResourceGroupSemantic slot2 { FrequencyId = 2; };
ShaderResourceGroupSemantic slot3 { FrequencyId = 3; };
ShaderResourceGroupSemantic slot4 { FrequencyId = 4; };

struct MyStruct
{
    float3 m_a;
    float3 m_b;
};

// For Vulkan & Metal, --unique-idx is ON, so the expected register assignment is as follows:

// SRG1 binds to register space 0. The ConstantBuffer reserved for SRG1 binds to b0 register. 
ShaderResourceGroup SRG1 : slot1
{
    Texture2D<float4>        m_texSRV1;      // Binds to t1 register.
    Texture2D<float4>        m_texSRV_bounded[3];  // Binds from t2 to t4 register (inclusive).
    Texture2D<float4>        m_texSRV_unbounded[]; // Binds to t5 register, and takes over ALL6+ for register space 0.
    float m_value; // Okay to declare a variable of fundamental type as it is not a resource.
};

// SRG2 binds to register space 1. The ConstantBuffer reserved for SRG2 binds to b0 register. 
ShaderResourceGroup SRG2 : slot2
{
    RWTexture2D<float4>      m_texUAV_bounded[5];  // Binds from u1 to u5 registers (inclusive).
	RWTexture2D<float4>      m_texUAV_unbounded[]; // Binds to u6 register, and takes over ALL7+ for Register Space 1.
    bool m_boolValue;                              // Okay to declare a variable of fundamental type as it is not a resource.
};

// SRG3 binds to register space 2. The ConstantBuffer reserved for SRG3 binds to b0 register.
ShaderResourceGroup SRG3 : slot3
{
    Sampler                  m_sampler1_bounded[7]; // Binds from s1 to s7 registers (inclusive).
    Sampler                  m_sampler2_bounded[3]; // Binds from s8 to s10 (inclusive).
    Sampler                  m_sampler_unbounded[]; // Binds to s11 register, and takes over ALL12+ for Register Space 2.
    float3x3                 m_matrix;              // Okay to declare a variable of fundamental type as it is not a resource.
};

// SRG4 binds to register space 3. The ConstantBuffer reserved for SRG4 binds to b0 register.
ShaderResourceGroup SRG4 : slot4
{
    ConstantBuffer<MyStruct> m_cb_array[2]; // Will be bound to b1 register. (Because The ConstantBuffer reserved for SRG4 will be bound to b0 register)... Until     b2 (inclusive).
    ConstantBuffer<MyStruct> m_cb2; // Will be bound to b3 register.
    ConstantBuffer<MyStruct> m_cb_unbounded[]; // Will be bound to b4 register, and will take over ALL5+ for Register Space 3.
    int m_intValue; // Declaring this variable, of Fundamental type, after an Unbounded Array is ok, as it is not a resource.
};
```
