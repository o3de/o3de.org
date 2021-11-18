---
linktitle: Unbounded Arrays in AZSL
title: AZSL, Binding Rules For Unbounded Arrays
description: There are limitations into how many and what kind of Unbounded Arrays can be declared. 
weight: 100
---
AZSL supports declaration of Unbounded Arrays inside `ShaderResourceGroup`s, but there are limitations into how many and what kind of Unbounded Arrays can be declared. The shader compiler, **AZSLc**, makes sure those rules are not violated.  
  
Here is a summary of the rules and limitations per platform (DX12, Vulkan and Metal). '--use-spaces' and '--unique-idx' are command line arguments for **AZSLc** that are used for each platform.  
| --use-spaces   | --unique-idx | platform | Results |
|----------------|--------------|----------|---------|
| OFF | OFF |                   | Only the last SRG can contain one last unbounded array for each:<br> t[], u[], b[], s[]|
| OFF | ON  |                   | Only the last SRG can contain one, and only one, last unbounded array across all resource types:<br>Only one of t[], u[], b[], s[]|
| ON  | OFF | DX12              | Each SRG can contain one last unbounded array for each: <br> t[], u[], b[], s[]|
| ON  | ON  | Vulkan<br> Metal  | Each SRG can contain one, and only one, last unbounded array across all resource types: <br> Only one of t[], u[], b[], s[]|
  
## Things to know before going over some examples:
* "Register Space" in HLSL is the same as "Descriptor Set" in Vulkan.
* When "--use-spaces" is used, **AZSLc** will assign a unique Register Space per SRG.
* When "--unique-idx" is used, **AZSLc** will emit all resource descriptors in a Register Space to be in numerical sequence, regardless of the descriptor type. Platforms like Vulkan and Metal require this.
* Unbounded arrays take over the whole range of register indices from the point they are being declared. This means two things:
    1. It is possible to declare any kind of resources or any amount of bounded arrays of resources, BEFORE any given Unbounded Array of a particular kind.
    2. Any resource declared AFTER an Unbounded Array will be considered an error.
  
## Examples
All the examples shown here assume '--use-spaces' is ON when compiling the shader. Which means each SRG will be assigned to its own Register Space.

### Example 1
In this example there's only one SRG, and no unbounded arrays yet. It is useful to understand register space & index binding assignment.  
  
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
        Texture2D<float4>        m_texSRV1;      // Will be bound to t0 register.
        Texture2D<float4>        m_texSRV2;      // Will be bound to t1 register.
        RWTexture2D<float4>      m_texUAV1;      // Will be bound to u0 register.
    	RWTexture2D<float4>      m_texUAV2;      // Will be bound to u1 register.
        Sampler                  m_sampler1;     // Will be bound to s0 register.
        Sampler                  m_sampler2;     // Will be bound to s1 register.
        ConstantBuffer<MyStruct> m_cb1; // Will be bound to b1 register. (Because The ConstantBuffer reserved for SRG1 will be bound to b0 register).
        ConstantBuffer<MyStruct> m_cb2; // Will be bound to b2 register.
    };
  
### Example 2: (Error case)
This example is based on Example 1, but this time We are trying to introduce the first Unbounded Array: `Texture2D<float4> m_texSRV_unbounded[]`.  
This example will fail to compile because, as mentioned before, an Unbounded Array takes over the whole register starting from their index of declaration.  
In this example, `m_texSRV_unbounded`, is the first texture SRV so it will start at **t0**, and take over the rest of the indices until **tN**. Any other texture SRV declared afterwards won't find a register index to bind to.  
  
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
        Texture2D<float4>        m_texSRV_unbounded[]; // Will be bound to t0 register, and will take over t1+.
        Texture2D<float4>        m_texSRV1;      // ERROR. There's no tN available to bind this resource to.
        Texture2D<float4>        m_texSRV2;      // ERROR. There's no tN available to bind this resource to.
        RWTexture2D<float4>      m_texUAV1;      // Will be bound to u0 register.
    	RWTexture2D<float4>      m_texUAV2;      // Will be bound to u1 register.
        Sampler                  m_sampler1;     // Will be bound to s0 register.
        Sampler                  m_sampler2;     // Will be bound to s1 register.
        ConstantBuffer<MyStruct> m_cb1; // Will be bound to b1 register. (Because The ConstantBuffer reserved for SRG1 will be bound to b0 register).
        ConstantBuffer<MyStruct> m_cb2; // Will be bound to b2 register.
    };
  
### Example 3: (Error case)
This error case is very similar to Example 2, but `m_texSRV_unbounded` is declared after `m_texSRV1`, but before `m_texSRV2`.  
  
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
        Texture2D<float4>        m_texSRV1;      // Will be bound to t0 register.
        Texture2D<float4>        m_texSRV_unbounded[]; // Will be bound to t1 register, and will take over t2+.
        Texture2D<float4>        m_texSRV2;      // ERROR. There's no tN available to bind this resource to.
        RWTexture2D<float4>      m_texUAV1;      // Will be bound to u0 register.
    	RWTexture2D<float4>      m_texUAV2;      // Will be bound to u1 register.
        Sampler                  m_sampler1;     // Will be bound to s0 register.
        Sampler                  m_sampler2;     // Will be bound to s1 register.
        ConstantBuffer<MyStruct> m_cb1; // Will be bound to b1 register. (Because The ConstantBuffer reserved for SRG1 will be bound to b0 register).
        ConstantBuffer<MyStruct> m_cb2; // Will be bound to b2 register.
    };
  
### Example 4:
This case fixes the issues in Example 3. By moving the point of declaration of `m_texSRV_unbounded[]` after `m_texSRV2` there are no more register assignment conflicts.  
  
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
        Texture2D<float4>        m_texSRV1;      // Will be bound to t0 register.
        Texture2D<float4>        m_texSRV2;      // Will be bound to t1 register.
        Texture2D<float4>        m_texSRV_unbounded[]; // Will be bound to t2 register, and will take over t3+.
        RWTexture2D<float4>      m_texUAV1;      // Will be bound to u0 register.
    	RWTexture2D<float4>      m_texUAV2;      // Will be bound to u1 register.
        Sampler                  m_sampler1;     // Will be bound to s0 register.
        Sampler                  m_sampler2;     // Will be bound to s1 register.
        ConstantBuffer<MyStruct> m_cb1; // Will be bound to b1 register. (Because The ConstantBuffer reserved for SRG1 will be bound to b0 register).
        ConstantBuffer<MyStruct> m_cb2; // Will be bound to b2 register.
    };
  
### Example 5:
This case shows how to declare one Unbounded Array for each resource type. The rule of thumb is to always declare each Unbounded Array after the last non-Unbounded resource.  
  
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
        Texture2D<float4>        m_texSRV1;      // Will be bound to t0 register.
        Texture2D<float4>        m_texSRV_bounded[3];  // Will be bound to t1 register... Until t3 (inclusive).
        Texture2D<float4>        m_texSRV_unbounded[]; // Will be bound to t4 register, and will take over t5+.
        RWTexture2D<float4>      m_texUAV_bounded[5];  // Will be bound to u0 register... Until u4 (inclusive).
    	RWTexture2D<float4>      m_texUAV_unbounded[]; // Will be bound to u5 register, and will take over u6+.
        Sampler                  m_sampler1_bounded[7]; // Will be bound to s0 register... Until s6 (inclusive).
        Sampler                  m_sampler2_bounded[3]; // Will be bound to s7 register... Until s9 (inclusive).
        Sampler                  m_sampler_unbounded[]; // Will be bound to s10 register, and will take over s11+.
        ConstantBuffer<MyStruct> m_cb_array[2]; // Will be bound to b1 register. (Because The ConstantBuffer reserved for SRG1 will be bound to b0 register)... Until     b2 (inclusive).
        ConstantBuffer<MyStruct> m_cb2; // Will be bound to b3 register.
        ConstantBuffer<MyStruct> m_cb_unbounded[]; // Will be bound to b4 register, and will take over b5+.
    };
  
Now, let's review what will happen to all the examples above when using '--unique-idx', which is the case for Vulkan & Metal.

### Example 6: Based on Example 1, with '--unique-idx'
Same code as Example 1, but it is assumed to be compiled with '--unique-idx' (ON), which is required by Vulkan & Metal. Please note how the register index always increments, regardless of the resource type.  
  
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For Vulkan & Metal, --unique-idx is ON, so the expected register assignment is as follows
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV1;      // Will be bound to t1 register. (Because The ConstantBuffer reserved for SRG1 will be bound to b0 register).
        Texture2D<float4>        m_texSRV2;      // Will be bound to t2 register.
        RWTexture2D<float4>      m_texUAV1;      // Will be bound to u3 register.
    	RWTexture2D<float4>      m_texUAV2;      // Will be bound to u4 register.
        Sampler                  m_sampler1;     // Will be bound to s5 register.
        Sampler                  m_sampler2;     // Will be bound to s6 register.
        ConstantBuffer<MyStruct> m_cb1; // Will be bound to b7 register.
        ConstantBuffer<MyStruct> m_cb2; // Will be bound to b8 register.
    };
  
### Example 7: Based on Example 2, with '--unique-idx'. Error Case.
  
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For Vulkan & Metal, --unique-idx is ON, so the expected register assignment is as follows
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV_unbounded[]; // Will be bound to t1 register(Because The ConstantBuffer reserved for SRG1 will be bound to b0 register), and     will take over ALL1+. 
        Texture2D<float4>        m_texSRV1;      // ERROR. There's no tN available to bind this resource to.
        Texture2D<float4>        m_texSRV2;      // ERROR. There's no tN available to bind this resource to.
        RWTexture2D<float4>      m_texUAV1;      // ERROR. There's no uN available to bind this resource to.
    	RWTexture2D<float4>      m_texUAV2;      // ERROR. There's no uN available to bind this resource to.
        Sampler                  m_sampler1;     // ERROR. There's no sN available to bind this resource to.
        Sampler                  m_sampler2;     // ERROR. There's no sN available to bind this resource to.
        ConstantBuffer<MyStruct> m_cb1; // ERROR. There's no bN available to bind this resource to.
        ConstantBuffer<MyStruct> m_cb2; // ERROR. There's no bN available to bind this resource to.
    };
  
### Example 8: Fix for Example 7.
The solution to Example 7, is to move the declaration of `m_texSRV_unbounded` to the end of `SRG1`, basically after `m_cb2`.  
Alternatively, you could create a second `SRG2`, and move the declaration of `m_texSRV_unbounded` to `SRG2` (As the last resource in `SRG2`, in case there are more resources in `SRG2`.)  
  
    ShaderResourceGroupSemantic slot1
    {
        FrequencyId = 1;
    };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For Vulkan & Metal, --unique-idx is ON, so the expected register assignment is as follows
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV1;      // Will be bound to t1 register. (Because The ConstantBuffer reserved for SRG1 will be bound to b0 register).
        Texture2D<float4>        m_texSRV2;      // Will be bound to t2 register.
        RWTexture2D<float4>      m_texUAV1;      // Will be bound to u3 register.
    	RWTexture2D<float4>      m_texUAV2;      // Will be bound to u4 register.
        Sampler                  m_sampler1;     // Will be bound to s5 register.
        Sampler                  m_sampler2;     // Will be bound to s6 register.
        ConstantBuffer<MyStruct> m_cb1; // Will be bound to b7 register.
        ConstantBuffer<MyStruct> m_cb2; // Will be bound to b8 register.
        Texture2D<float4>        m_texSRV_unbounded[]; // Will be bound to t9 register, and will take over ALL10+.
    };
  
### Example 9: Similar to Example 5, but with '--unique-idx'
In example 5, it is shown how to declare one Unbounded Array for each major resource type: SRV(t), UAV(u), Sampler(s) and CBV(b) inside a single SRG.  
Unfortunately, when using '--unique-idx', this is impossible to do.  
The only workaround is to declare more SRGs (in this case three more SRGs) and making sure the Unbounded Array is always the last variable declared inside each SRG.  
  
    ShaderResourceGroupSemantic slot1 { FrequencyId = 1; };
    ShaderResourceGroupSemantic slot2 { FrequencyId = 2; };
    ShaderResourceGroupSemantic slot3 { FrequencyId = 3; };
    ShaderResourceGroupSemantic slot4 { FrequencyId = 4; };
    
    struct MyStruct
    {
        float3 m_a;
        float3 m_b;
    };
    
    //For Vulkan & Metal, --unique-idx is ON. Because --use-spaces is ON, SRG1 will be bound to Register Space 0.
    ShaderResourceGroup SRG1 : slot1
    {
        Texture2D<float4>        m_texSRV1;      // Will be bound to t1 register. (Because The ConstantBuffer reserved for SRG1 will be bound to b0 register).
        Texture2D<float4>        m_texSRV_bounded[3];  // Will be bound to t2 register... Until t4 (inclusive).
        Texture2D<float4>        m_texSRV_unbounded[]; // Will be bound to t5 register, and will take over ALL6+ for Register Space 0.
        float m_value; // Declaring this variable, of Fundamental type, after an Unbounded Array is ok, as it is not a resource.
    };
    
    //For Vulkan & Metal, --unique-idx is ON. Because --use-spaces is ON, SRG2 will be bound to Register Space 1.
    ShaderResourceGroup SRG2 : slot2
    {
        RWTexture2D<float4>      m_texUAV_bounded[5];  // Will be bound to u1 register (Because The ConstantBuffer reserved for SRG2 will be bound to b0 register)...     Until u5 (inclusive).
    	RWTexture2D<float4>      m_texUAV_unbounded[]; // Will be bound to u6 register, and will take over ALL7+ for Register Space 1.
        bool m_boolValue; // Declaring this variable, of Fundamental type, after an Unbounded Array is ok, as it is not a resource.
    };
    
    //For Vulkan & Metal, --unique-idx is ON. Because --use-spaces is ON, SRG3 will be bound to Register Space 2.
    ShaderResourceGroup SRG3 : slot3
    {
        Sampler                  m_sampler1_bounded[7]; // Will be bound to s1 register (Because The ConstantBuffer reserved for SRG3 will be bound to b0 register)...     Until s7 (inclusive).
        Sampler                  m_sampler2_bounded[3]; // Will be bound to s8 register... Until s10 (inclusive).
        Sampler                  m_sampler_unbounded[]; // Will be bound to s11 register, and will take over ALL12+ for Register Space 2.
        float3x3                 m_matrix; // Declaring this variable, of Fundamental type, after an Unbounded Array is ok, as it is not a resource.
    };
    
    //For Vulkan & Metal, --unique-idx is ON. Because --use-spaces is ON, SRG4 will be bound to Register Space 3.
    ShaderResourceGroup SRG4 : slot4
    {
        ConstantBuffer<MyStruct> m_cb_array[2]; // Will be bound to b1 register. (Because The ConstantBuffer reserved for SRG4 will be bound to b0 register)... Until     b2 (inclusive).
        ConstantBuffer<MyStruct> m_cb2; // Will be bound to b3 register.
        ConstantBuffer<MyStruct> m_cb_unbounded[]; // Will be bound to b4 register, and will take over ALL5+ for Register Space 3.
        int m_intValue; // Declaring this variable, of Fundamental type, after an Unbounded Array is ok, as it is not a resource.
    };
  
