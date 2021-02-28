# Platform Specific Shader Code
AZSLc is a cross-platform compatible compiler, but there are several ways to introduce platform specific code in AZSL. 
[NOTE FOR DEVS: What are some common use cases for using compiler]

## AZSL Headers
There is a header file for each graphics API per platform. When the shader code for the respective platform is compiled, the header files are added to each AZSL shader file (*.azsl*). By specifying static constants, functions, and interfaces, you can customize the behavior of the shader code per platform. The constants should not alter the behavior of SRG Layouts, input assembly, output merger, and other commonly shared data. 

*Note: Header files for each platform can be found in their respective folders in ../dev/Gems/Atom/Asset/Shader/Code/AZSL/Platform/.*

Another header, AzslcHeader.azsli, is provided when compiling SRG Layouts and other commonly shared data. It acts as an interface, where everything should be declared. However, since it's only used for reflection, function definitions and similar implementations can be left empty. 

*Note: AzslcHeader.azsli can be found in the folder ../dev/Gems/Atom/Asset/Shader/Code/AZSL/Platform/Common/.*

<!-- 
What do these examples show? Why are they helpful in this section?
Example from AzslcHeader.h
```cpp
// The default azsl debug color is the Amazon's orange
// We will probably not see this in action, because every platform can override this behavior
// The definition here is just a placeholder which makes the code valid
static const float4 s_AzslDebugColor = float4(255.0 / 255.0, 153.0 / 255.0, 0, 1);
```

Example from AzslcHeader_Vulkan.h
```cpp
// When compiling for Vulkan, the azsl debug color will be Vulkan's crimson red
static const float4 s_AzslDebugColor = float4(165.0 / 255.0, 30.0 / 255.0, 36.0 / 255.0, 1);
``` -->

## Attributes
Platform specific code can also be introduced using attributes. Attributes are filtered by their namespace and only attributes with the matching namespace or without any namespace are processed and re-emitted.

The attributes live in the shader code directly and allow customizeable behavior. Attributes cannot be restricted. 

There are two types of attributes: 
- **global** attributes are detached from their declaration context and re-emitted as top level declarations in their order of appearance. 
- **regular** attributes (non-global, or attached) are attached to the next declaration. 

### Global Attributes
```cpp
// Old example from FullscreenVertexUtility.azsli
// This example only exists to describe the use of the verbatim attribute - the same result can be achieved by using static const in an AzslHeader file
[[global::dx::verbatim("#define TOPLEFT true")]]
[[global::vk::verbatim("#define TOPLEFT false")]]
[[global::mt::verbatim("#define TOPLEFT true")]]
[[global::pv::verbatim("#define TOPLEFT true")]]
 
// The global scope in the attribute name is required to identify it as a global attribute - this is the only exception of how attributes are declared in other languages, for example in C++
// The namespace (in this case after the global:: scope) acts as a filter - this shader should be compiled with the --namespace=XYZ command line argument to activate it
// Multiple namespaces can be enabled at the same time, for example --namespace=dx,pc,win10
// AZSLc is executed from the platform-specific ShaderPlatformInterface which is unique for DirectX12 (dx), Vulkan (vk), Metal (mt) and Provo (pv)
// The namespaces in this example are already fixed to work with the 4 graphics API so you can use them
 
 
// Finally, the verbatim attribute is exactly what it says - it emits the arguments verbatim. AZSLc makes no sense of the code inside
 
float4 GetVertexPositionAndTexCoords(uint vertexID)
{
    if (TOPLEFT)
    {
        // Some code
    }
    else
    {
        // Other code
    }
}
```

### Global Attributes
```cpp
// You can also use the verbatim attribute to include headers
// Note that since AZSLc makes no sense of the verbatim code, it will not parse, validate or inspect the code in the include files
// It will paste it as-is, which is great if you know what you are doing, but puts all validation requirements on the developers
// Also, because AZSLc will not parse the code, you can write in the native shader grammar directly - it will not trigger an AZSL syntax error
 
 
[[global::dx::verbatim("#include \"simple-surface-dx.azsli\"")]]
[[global::pv::verbatim("#include \"simple-surface-ps.azsli\"")]]
 
// ...
 
float4 MainPS() : SV_Target0
{
    return VerbatimColor(ExampleSRG::exampleColor); // Gets injected with the verbatim #include
}
 
 
// Contents of simple-surface-dx.azsli
float4 VerbatimColor(float4 inColor)
{
    return inColor + float4(0, 1, 0, 0);
}
```

### Attributes
```cpp
// Attributes and attribute specifier sequences which don't have the global namespace are considered regular and are attached to the next declaration, just like normal attributes
// AZSLc doesn't make sense of most of them, but re-emits them anyway!
// The reason is that native compilers will continue to provide intrinsic keywords and attributes that we haven't yet seen (so we can't support them before they're released!)
// The developers should be able to use them for optimizations, but such attributes remain mostly untested - in the example below vk::binding is likely to interfere with our own binding
// strategy so it's unclear if it can even be used properly, while vk::post_depth_coverage is a hint for the shader compiler and has no effect on our reflection system
 
 
ShaderResourceGroupSemantic sem0 {FrequencyId = 0;};
ShaderResourceGroup SRG : sem0
{
 
struct S {
    float4 f;
};
 
// vk::binding + vk::counter_binding
[[vk::binding(5, 3), vk::counter_binding(10)]]
RWStructuredBuffer<S> mySBuffer1;
 
// :register(xX, spaceY) + vk::counter_binding
[[vk::counter_binding(20)]]
AppendStructuredBuffer<S> myASBuffer1;
 
// :register(spaceY) + vk::counter_binding
[[vk::counter_binding(15)]]
RWStructuredBuffer<S> mySBuffer3;
 
// none + vk::counter_binding
[[vk::counter_binding(2)]]
ConsumeStructuredBuffer<S> myCSBuffer1;
 
// vk::binding + none
[[vk::binding(1)]]
RWStructuredBuffer<S> mySBuffer2;
 
AppendStructuredBuffer<S> myASBuffer2;
ConsumeStructuredBuffer<S> myCSBuffer3;
ConsumeStructuredBuffer<S> myCSBuffer2;
};
 
[[vk::post_depth_coverage]]
float4 main() : SV_Target {
    uint a = SRG::mySBuffer1.IncrementCounter();
    uint b = SRG::mySBuffer2.DecrementCounter();
 
    return  a + b;
}
```