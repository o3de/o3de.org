---
title: "Glossary"
description: "A collection of terms used in the Atom renderer, their definition, and what system they belong to."
toc: true
weight: 1000
---

This is a collection of terms used in the Atom renderer, their definition, and the system they belong to. 


Attachment  
: An attachment is a buffer or image instance associated with a unique ID. Attachments are used by the Rendering Hardware Interface (RHI) and Frame Scheduler for state management inside of a Scope.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Frame Scheduler](core-systems/rhi/frame-scheduler.md)*

AZSL (Amazon Shading Language)  
: The Atom renderer uses a custom shading language called AZSL. It is an extension of HLSL (Shader model 6)  with some specialized features. The most significant special features are Shader Resource Groups (SRG) and shader options.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Compiler](core-systems/shaders/shader-compiler.md), [AZSL Reference](core-systems/shaders/azsl-reference/_index.md)*

AZSLc (AZSL Compiler)  
: The AZSLc is the compiler application for AZSL shaders. The compiler translates AZSL shader files into HLSL code, then other standard compilers (like DXC and SPRIV-Cross) compile the HLSL code into native shader bytecode for the target platforms.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Compilers](core-systems/shaders/shader-compiler.md)*

CommandList     
: A CommandList in the RHI provides an interface to bind Shader Resource Groups, scissor or viewport states, build top or bottom level acceleration structures, begin or end predications and submit draw, dispatch, or copy items.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md)*

DrawItem     
: A DrawItem corresponds to a draw call for a given object in a given pass. One DrawItem is created for each pass on the object, and a collection of DrawItems is a DrawPacket. For example, an opaque object needs to be rendered in shadows, pre-depth, and forward+ passes; This results in a DrawPacket containing three DrawItems. 

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md)*

DrawList     
: A list of pointers to DrawItems.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md)*

DrawListContext     
: A thread-safe container that accepts DrawItems into DrawLists from multiple threads. The container accumulates DrawItems into thread-local DrawLists,, which it then combines into a merged DrawList for rendering.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Atom API](/docs/api/gems/Atom), [Work Submission](core-systems/rhi/work-submission.md)*

DrawListMask     
: A DrawListMask is a bit mask used for rapid culling by indicating which DrawLists are relevant to the class that holds the mask. For a View, this indicates which DrawLists are in the View. For a DrawPacket, this indicates which DrawLists that the DrawPacket's DrawItems will render to.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md)*

DrawListTag     
: DrawListTags are unique identifiers for a list of DrawItems. The DrawPacket contains multiple DrawItems, where each DrawItem is associated with a DrawListTag.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md)*

DrawPacket     
: A DrawPacket is a collection of DrawItems, or draw calls, needed to render an object in multiple passes. For example, consider an object that is drawn in the shadow pass, the depth pre-pass, and the forward+ pass. Each of these draw calls corresponds to one DrawItem.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md), [Material System Data Flow](core-systems/materials/material-system-data-flow.md)*

Dynamic Branching  
: Dynamic branching refers to conditional statements where the result of the condition must be evaluated at runtime. For example, the code statement `if(sampledColor.a > 0.5)` is a common source of shader performance issues.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Options](core-systems/shaders/azsl-reference/shader-options.md)*

Frame Graph     
: The frame graph is a graph of Scopes where edges are derived from the attachment usage.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Frame Scheduler](core-systems/rhi/frame-scheduler.md)*

Feature Processor  
: Feature Processors are responsible for receiving data from the simulation, such as O3DE, and processing it into a form that's consumable by the renderer. Each feature processor handles a specific type of data, like static meshes or hair. Feature Processors own render proxies and convert them into DrawPackets that is consumed by the low-level layers of the RHI. For example, an Animated Mesh Feature Processor owns all the animated mesh render proxies in a given scene. Feature Processors are owned by Scenes and there can be at most one Feature Processor of a given type per Scene.

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md), [RPI System](core-systems/rpi/rpi-system.md), [Frame Rendering](Core-systems/atom-architecture/frame-rendering-process.md), [Creating a New Feature](core-systems/rpi/creating-a-feature-processor.md)*

Material  
: A Material is a data item that can be applied to a single mesh to describe how it should be rendered. It references a Material Type that defines the material's behavior and properties. A material provides a set of values for the available material properties. Materials can also inherit property values from other materials. 

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md), [Material Build Pipeline](core-systems/materials/material-build-pipeline.md)*

It is represented by a `.material` file.

Material Asset  
: A material asset is the baked material data that is stored in the engine's cache for use at runtime. It is stored in a `.azmaterial` file, which is produced by the Asset Processor from a `.material` file.

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md), [Material Build Pipeline](core-systems/materials/material-build-pipeline.md)*

Material Functor  
: Material Types might include custom processing logic which are facilitated by Material Functors. Material Functors are small function objects that process material properties, perform logic and calculation, and produce an output from the material instance. This data is then used to configure the material's shaders and/or metadata, for the Material Editor.

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md), [Material System Data Flow](core-systems/materials/material-system-data-flow.md)*

Material Instance  
: A Material Instance is an active material, meaning it is bound to one or more meshes at runtime for actual rendering. It is created from a material asset.

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md), [Material System Data Flow](core-systems/materials/material-system-data-flow.md)*

Material Property  
: Material Properties are the data used to configure a material to achieve a particular appearance. The material type defines a list of material properties, and the material provides a list of material property values.

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md)*

Material Shader  
: In general, a "shader" is any program executed on the GPU. A Material Shader is a specific category of shaders that is referenced by a material type and used to render a mesh at runtime. We often refer to is as simply a "shader", but the term "material shader" is used to disambiguate when necessary.

*Related to: [Material System](core-systems/materials/_index.md)*

Material Type  
: *Related to: [Material System](core-systems/materials/_index.md), [Material System](core-systems/materials/materials.md)*
A material type defines how a material behaves and what properties the material has. Every material must have a material type. The main material types provided with Atom are StandardPBR and EnhancedPBR. Other examples may include hair, skin, car paint, etc.

It is represented by a `.materialtype` file.

Material Type Asset  
: A material type asset is the baked material type data that is stored in the engine's cache for use at runtime. It is stored in a `.azmaterialtype` file, which is produced by the Asset Processor from a `.materialtype` file.

*Related to: [Material System](core-systems/materials/_index.md), [Material System](core-systems/materials/materials.md), [Material Build Pipeline](core-systems/materials/material-build-pipeline.md)*

Pass  
: A pass is a logical grouping of render work with a defined input and output. A pass can contain other passes to form a tree hierarchy of passes. Passes are similar to Scopes, but live in the RPI. 

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md), [Pass System](core-systems/rpi/pass-system/pass-system.md), [Authoring Passes](core-systems/rpi/pass-system/authoring-passes.md)*

Render Pipeline  
: A render pipeline is logical grouping of Passes and Views that are used to render a certain output, such as the main view of a game or particle depth maps for collision).

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md)*

Render Component  
: A render component is a feature that pushes data to the Atom renderer via its corresponding feature processor. It's defined in a C++ class on the simulation side, such as O3DE. For example, at every frame, an Animated Mesh Component will send bone matrix updates to its Feature Processor.

*Related to: [Open 3D Engine - Components](/content/docs/user-guide/components/_index.md), [Frame Rendering](Core-systems/atom-architecture/frame-rendering-process.md), [Creating a Feature Processor](core-systems/rpi/creating-a-feature-processor.md)*

Rendering Hardware Interface (RHI)  
: The RHI is a hardware abstraction layer and is the lowest layer of the Atom renderer. It manages GPU resources, handles GPU fences, schedules work on the GPU queues, and handles synchronization between the GPU work.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md)*

Root Constant  
: A root constant is a special shader variable that provides a very fast small amount of uniform data. It is more optimal than a constant buffer, but very limited in size (generally limited to around 128 or 256 bytes for all root constants). 

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Root Constants](core-systems/rhi/root-constants.md)*

Root Shader Variant  
: The root shader variant has the main shader bytecode that is always generated by default for each shader. Since shader options are passed to the shader at runtime (not during shader compile time), the root shader variant can be used to render any combination of shader options. It is called the "root" variant because it appears at the root of the shader variant tree.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Shader Options](core-systems/shaders/azsl-reference/shader-options.md), [Shader Variant](core-systems/shaders/shader-variant.md)*

Render Pipeline Interface  
: The RPI layer sits above the RHI and is responsible for interfacing with game logic and pushing draw items through the render pipeline and down to the RHI. The Feature Processor, Pipeline, Pass, Scene, and View live in the RPI.

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md)*

Scene  
: A scene is a conceptual representation of a 'world' to be rendered. It contains feature processors and render pipelines.

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md), [RPI System](core-systems/rpi/rpi-system.md)*

Scope     
: A scope is a logical grouping of uninterruptible render work with a defined input and output. It is similar to a  Pass in the RPI, but lives in the RHI.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Frame Scheduler](core-systems/rhi/frame-scheduler.md)*

Shader  
: A shader is any program executed on the GPU. "Shader" is an overloaded term and its definition can vary depending on the context. Here are some common ways "shaders" is used in Atom:
- A `.azsl` file contains shader code.
- A `.shader` file references the .azsl file and attaches metadata to configure the AZSLc, the shader compiler. 
- The `Shader` class in C++.
  
*Related to: [Shader System](core-systems/shaders/_index.md), [Shader System Overview](core-systems/shaders/shader-system.md)*

Shader Asset  
: A shader asset is the shader data that is stored in the engine's cache for use at runtime. It is stored in a `.azshader` file, that is produced by the Asset Processor from a `.shader` file. This does not contain any shader bytecode, rather it contains metadata about the shader and links to one or more shader variant assets which contain the bytecode.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Build Pipeline](core-systems/shaders/shader-build-pipeline.md)*

Shader Resource Group (SRG)  
: A shader resource group is a collection of shader resources: textures, buffers, samplers, and loose constants which are automatically packed into an implicit constant buffer. Shader resource groups are bound at specific frequencies (e.g. per scene, per view, per pass, per material, etc.). It supports automatic packing of shader resources into a table suitable for binding to the hardware pipeline, in a platform-agnostic way.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Resource Groups](core-systems/rhi/shader-resource-groups.md), [Shader Resource Groups and Constant Data](core-systems/rhi/srgs-and-constant-data.md), [AZSL Reference](core-systems\shaders\azsl-reference\shader-resource-groups.md)*

Shader Bytecode  
: A shader bytecode is a compiled shader program that is ready to be passed into the GPU for rendering.

*Related to: [Shader System](core-systems/shaders/_index.md)*

Shader Constant  
: A shader constant refers to the data fields in a Shader Resource Group (SRG) that use primitive data types. These data types are automatically packed into an implicit constant buffer within the SRG. They can be easily accessed at runtime by name or index using the `RPI::ShaderResourceGroup` class.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Resource Groups](core-systems/rhi/shader-resource-groups.md), [Shader Resource Groups and Constant Data](core-systems/rhi/srgs-and-constant-data.md)*

Shader Option  
: A shader option is a special kind of variable in a shader that makes it easy to define and configure shader variants. The value for a shader option can be supplied either at build time or at runtime. If supplied at build time through a shader variant, the value is baked into the shader bytecode for better performance. Otherwise, the value is passed to the shader at runtime, giving the same visual result.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Options](core-systems/shaders/azsl-reference/shader-options.md)*

Shader Variant  
: A shader variant is similar to the concept of shader permutations common in other renderers. It is an alternate version of shader bytecode that is optimized for a specific set of input values. For example, the original shader code might have branching logic (`if` statements) to perform different calculations depending on some shader input flag. Rather than evaluate these branches dynamically (which has performance penalties), the system can pre-compile multiple shader variants. Each shader variant is hard-coded to use the alternate calculations. At runtime, the system selects an appropriate variant based on the input flag, rather than passing the input flag to the shader.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Options](core-systems/shaders/azsl-reference/shader-options.md), [Shader Variant](core-systems/shaders/shader-variant.md)*

Shader Variant Asset  
: The shader variant asset contains the actual bytecode for a compiled shader that is stored in the engine's cache for use at runtime. It is stored in a `.azshadervariant` file, that is produced by the Asset Processor. There must be one shader variant asset for each `.shader` file to hold the root shader variant. There might be numerous shader variant assets generated from a `.shadervariantlist` file.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Variant](core-systems/shaders/shader-variant.md), [Shader Build Pipeline](core-systems/shaders/shader-build-pipeline.md)*

Shader Variant Tree  
: The shader variant tree is a data structure that organizes a shader's collection of shader variants. It allows fast lookup of shader variants at runtime, as well as automatic fallback to more generalized variants if a specific variant is not found.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Variant](core-systems/shaders/shader-variant.md), [Shader Build Pipeline](core-systems/shaders/shader-build-pipeline.md)*

Shader Variant Tree Asset  
: This asset contains the shader varient tree that is stored in the engine's cache for use at runtime. It is stored in a `.azshadervarianttree` file, that is produced by the Asset Processor from a `.shadervariantlist` file. It contains links to all of the shader variant assets for a particular shader.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Variant](core-systems/shaders/shader-variant.md)*

System Shader Option  
: A system shader option is any shader option in a material shader that is not owned by the material type. When a material type connects to a shader option in one of its shaders, that option is owned by the material type; only the material is allowed to set the value for that option. All other options are called system shader options, and these are set directly in code by calling the method `Material::SetSystemShaderOption()`.

*Related to: [Shader System](core-systems/shaders/_index.md), [Material System Data Flow](core-systems/materials/material-system-data-flow.md)*

<!-- We are currently missing these definitions. -->
<!-- View  
: *Render Pipeline Interface (RPI)*    

ViewList  
: *Render Pipeline Interface (RPI)*    

ViewListTag  
: *Render Pipeline Interface (RPI)*     -->