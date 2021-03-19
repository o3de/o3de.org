---
title: "Glossary"
description: "A collection of terms used in the Atom renderer, their definition, and what system they belong to."
toc: true
weight: 1500
---

This is a collection of terms used in the Atom renderer, their definition, and the system they belong to. 


Attachment  
: An attachment is a buffer or image instance associated with a unique name. Attachments are used by the Render Hardware Interface (RHI) and Frame Scheduler for state management inside of a Scope.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Frame Scheduler](core-systems/rhi/frame-scheduler.md)*

AZSL (Amazon Shading Language)  
: The Atom renderer uses a custom shading language called Amazon Shading Language (AZSL). AZSL is an extension of HLSL Shader Model 6, with some specialized features. The most significant special features are Shader Resource Groups (SRG) and shader options.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Compiler](core-systems/shaders/shader-compiler.md), [AZSL Reference](core-systems/shaders/azsl-reference/_index.md)*

AZSLc (AZSL Compiler)  
: The AZSLc is the compiler application for AZSL shaders. The compiler translates AZSL shader files into HLSL code, then other standard compilers (like DXC and SPRIV-Cross) compile the HLSL code into native shader bytecode for the target platforms.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Compilers](core-systems/shaders/shader-compiler.md)*

Command list     
: A command list in the RHI provides an interface that allows users to submit GPU commands to a scope. This includes binding Shader Resource Groups; scissoring or viewing port states; building top or bottom level acceleration structures; beginning or ending predications; and submitting draw, dispatch, or copy items. 

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md), [`CommandList` API Reference](/docs/api/gems/atom/class_a_z_1_1_r_h_i_1_1_command_list.html)*

Draw item     
: A draw call for a given object in a given pass. An object that needs to be drawn in several passes will result in several draw items. The collection of draw items pertaining to the same object constitutes a draw packet. For example, opaque objects need to be rendered in shadows, pre-depth, and forward+ passes; this results in a draw packet containing three draw items. 

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md), [`DrawItem` API Reference](/docs/api/gems/atom/struct_a_z_1_1_r_h_i_1_1_draw_item.html)*

Draw list context     
: A thread-safe container that accepts draw packets from multiple threads, sorts the draw packets into draw lists, and merges the draw lists. The resulting context is immutable and the lists are accessible in the RHI.


*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md), [`DrawListContext` API Reference](/docs/api/gems/atom/class_a_z_1_1_r_h_i_1_1_draw_list_context.html)*

Draw list mask     
: A bit mask used for rapid culling by indicating which draw lists are relevant to the class that holds the mask. In a view, a draw list mask indicates which draw lists are in the view. In a draw packet, a draw list mask indicates which draw lists that the draw packet's draw items will render to.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Atom API](/docs/api/gems/Atom), [Work Submission](core-systems/rhi/work-submission.md)*

Draw list tag
: Draw list tags are unique identifiers for a list of draw items that belong to the same draw packet.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md)*

Draw packet     
: A draw packet is a collection of draw items for a specific object. It ensures that the draw items are properly dispatched across the different passes.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Work Submission](core-systems/rhi/work-submission.md), [Material System Data Flow](core-systems/materials/material-system-data-flow.md), [Frame Rendering](core-systems/frame-rendering.md), [`DrawPacket` API Reference](/docs/api/gems/atom/class_a_z_1_1_r_h_i_1_1_draw_packet.html)*

Dynamic branching  
: Dynamic branching is when conditional statements must be evaluated at runtime. This can cause negative performance impacts. For example, the code statement `if(sampledColor.a > 0.5)` is a dynamic branch and a common source of shader performance issues.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Options](core-systems/shaders/azsl-reference/shader-options.md)*

Frame Graph     
: The Frame Graph is a graph-based tasking model that describes how the Frame Scheduler manages GPU work submissions in the RHI.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Frame Scheduler](core-systems/rhi/frame-scheduler.md), [`FrameGraph` API Reference](/docs/api/gems/atom/class_a_z_1_1_r_h_i_1_1_frame_graph.html)*

Feature Processor  
: Feature processors are responsible for receiving data from the simulation and processing it into a form that's consumable by the renderer. Each feature processor handles a specific type of data, like static meshes or hair. Feature processors own render proxies and convert them into draw packets that are consumed by the RHI. For example, an Animated Mesh Feature Processor owns all the animated mesh render proxies in a given scene. Feature processors are owned by scenes and there can be at most one feature processor of a given type per scene.

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md), [RPI System](core-systems/rpi/rpi-system.md), [Frame Rendering](Core-systems/atom-architecture/frame-rendering-process.md), [Features](features/_index.md), [Creating a New Feature](core-systems/rpi/creating-a-feature-processor.md)*

Material  
: A material is a data item that can be applied to a single mesh, describing how it should be rendered. Each material references a material type that defines the material's behavior and properties. In the Atom documentation, the term "material data" is used to disambiguate from the general concept of a "material". 

Materials are stored in files with the `.material` extension. 

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md), [Material Build Pipeline](core-systems/materials/material-build-pipeline.md)*

Material asset  
: A material asset is generated from material data into a form that is consumable by the simulation. Material assets are stored in files with the `.azmaterial` extension and are stored in the engine's cache for use at runtime.

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md), [Material Build Pipeline](core-systems/materials/material-build-pipeline.md)*

Material functor  
: Material functors are function objects that apply custom logic and calculations to material data, configuring the material's shaders, render states, or Material Editor metadata. Material functors can be programmed in C++ or Lua. 

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md), [Material System Data Flow](core-systems/materials/material-system-data-flow.md)*

Material instance  
: A material instance is an active material, bound to one or more meshes at runtime for actual rendering. Instances are created from material assets in the cache.

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md), [Material System Data Flow](core-systems/materials/material-system-data-flow.md)*

Material property  
: Material properties are data that configure a material to achieve a particular appearance. Material properties are defined in the material type, and are then assigned property values in the material.

*Related to: [Material System](core-systems/materials/_index.md), [Material System Overview](core-systems/materials/materials.md)*

Material shader  
: A shader referenced by a material type and used to render a mesh at runtime. In the Atom documentation, "shader" normally refers to a material shader, but the term "material shader" is used to disambiguate when necessary.

*Related to: [Material System](core-systems/materials/_index.md)*

Material type  
: A material type defines how a material behaves and what properties the material has. Every material must have a material type. Some general examples of a material type are hair, skin, stone, and car paint. Atom provides physically based rendered (PBR) material types, such as StandardPBR and EnhancedPBR. In the Atom documentation, the term "material type data" is used to disambiguate from the general concept of a "material type". 

Material types are stored in files with the `.materialtype` extension.

*Related to: [Material System](core-systems/materials/_index.md), [Material System](core-systems/materials/materials.md)*

Material type asset  
: A material type asset is generated from material type data into a form that is consumable by the simulation. Material type assets are stored in files with the `.azmaterialtype` extension and are stored in the engine's cache for use at runtime.

*Related to: [Material System](core-systems/materials/_index.md), [Material System](core-systems/materials/materials.md), [Material Build Pipeline](core-systems/materials/material-build-pipeline.md)*

Pass  
: A pass is a logical grouping of render work with a defined input and output. Passes are organized into a tree hierarchy, where each pass belongs to a parent pass. Passes live in the RPI and are similar to scopes in the RHI.

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md), [Pass System](core-systems/rpi/pass-system/pass-system.md), [Authoring Passes](core-systems/rpi/pass-system/authoring-passes.md)*

Render component  
: A render component is a feature that pushes data to the Atom renderer via its corresponding feature processor. For example, at every frame, an Animated Mesh Component will send bone matrix updates to its Feature Processor.

*Related to: [Open 3D Engine - Components](/content/docs/user-guide/components/_index.md), [Frame Rendering](Core-systems/atom-architecture/frame-rendering-process.md), [Creating a Feature Processor](core-systems/rpi/creating-a-feature-processor.md)*

Render Hardware Interface (RHI)  
: The Render Hardware Interface (RHI) is a hardware abstraction layer, and is the lowest layer of the Atom renderer. The RHI manages GPU resources, handles GPU fences, schedules work on the GPU queues, and handles synchronization between the GPU work.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md)*

Render pipeline  
: A render pipeline describes how to render a scene and contains passes and views for rendering. More than one render pipeline can exist in a scene. 

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md), [`RenderPipeline` API Reference](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_render_pipeline.html)*

Render Pipeline Interface (RPI)
: The Render Pipeline Interface (RPI) layer sits above the RHI. The RPI is responsible for interfacing with simulation logic and pushing draw items through the render pipeline and down to the RHI. The RPI contains feature processors, pipelines, passes, scenes, and views.

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md)*

Root constant  
: A special shader variable that provides a very fast and small amount of uniform data. A root constant is more optimal than a constant buffer, but is limited in size (generally limited to around 128 or 256 bytes for all root constants).  

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Root Constants](core-systems/rhi/root-constants.md)*

Root shader variant  
: The root shader variant has the main shader bytecode that is always generated by default for each shader. Since shader options are passed to the shader at runtime (rather than during shader compile time), the root shader variant can be used to render any combination of shader options. It is called the "root" variant because it appears at the top-level of the shader variant tree.

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Shader Options](core-systems/shaders/azsl-reference/shader-options.md), [Shader Variant](core-systems/shaders/shader-variant.md)*

Scene  
: A scene is a conceptual representation of a 'world' to be rendered in the simulation. It contains feature processors and render pipelines.

*Related to: [Render Pipeline Interface (RPI)](core-systems/rpi/_index.md), [RPI System](core-systems/rpi/rpi-system.md), [`Scene` API Reference](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_scene.html)*

Scope     
: A scope is a logical grouping of uninterruptible render work with a defined input and output. Scopes live in the RHI and are similar to passes in the RPI.  

*Related to: [Render Hardware Interface (RHI)](core-systems/rhi/_index.md), [Frame Scheduler](core-systems/rhi/frame-scheduler.md), [`Scope` API Reference](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_scope.html)*

Shader  
: A shader is any program that's run on the GPU. The "shader" definition varies depending on the context. Here are some common ways "shader" is used in Atom:
- A `.azsl` file contains shader code.
- A `.shader` file references the .azsl file and attaches metadata to configure the AZSLc. 
- The `Shader` class in C++.
- Material shaders are often referred to as "shaders".
  
*Related to: [Shader System](core-systems/shaders/_index.md), [Shader System Overview](core-systems/shaders/shader-system.md)*

Shader asset  
: A shader asset is generated from shader data into a form that is consumable by the simulation. Shader assets are stored in files with the `.azshader` extension and are stored in the engine's cache for use at runtime. The shader asset does not contain any shader bytecode. Instead, it contains metadata about the shader and links to one or more shader variant assets, which contain the bytecode.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Build Pipeline](core-systems/shaders/shader-build-pipeline.md)*

Shader Resource Group (SRG)  
: A Shader Resource Group (SRG) is a collection of shader resources (textures, buffers, samplers, and loose constants) that are automatically packed into an implicit constant buffer. SRGs are bound at specific frequencies (such as per scene, per view, per pass, per material).

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Resource Groups](core-systems/rhi/shader-resource-groups.md), [AZSL Reference](core-systems\shaders\azsl-reference\shader-resource-groups.md), [`Scene` API Reference](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_shader-resource-group.html)*

Shader bytecode  
: A compiled shader program ready to be passed to a GPU for execution.

*Related to: [Shader System](core-systems/shaders/_index.md)*

Shader constant  
: A shader constant refers to the data fields in a Shader Resource Group (SRG) that use primitive data types. These data types are automatically packed into an implicit constant buffer within the SRG. They can be easily accessed at runtime by name or index using the `RPI::ShaderResourceGroup` class.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Resource Groups](core-systems/rhi/shader-resource-groups.md), [Shader Resource Groups and Constant Data](core-systems/rhi/srgs-and-constant-data.md)*

Shader option  
: A shader option is a special kind of variable in a shader that makes it easy to define and configure shader variants. The value for a shader option can be supplied either at build time or at runtime. If the shader option is supplied at build time through a shader variant, the value is baked into the shader bytecode for better performance. Otherwise, the value is passed to the shader at runtime, giving the same visual result.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Options](core-systems/shaders/azsl-reference/shader-options.md)*

Shader variant  
: A shader variant is similar to shader permutations, which are common in other renderers. The shader variant is an alternate version of shader bytecode, and is optimized for a specific set of input values. For example, the original shader code might have branching logic (`if` statements) to perform different calculations depending on some shader input flag. Rather than evaluate these branches dynamically (which has performance penalties), the system can pre-compile multiple shader variants. Each shader variant is hardcoded to use the alternate calculations. At runtime, the system selects an appropriate variant based on the input flag, rather than passing the input flag to the shader.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Options](core-systems/shaders/azsl-reference/shader-options.md), [Shader Variant](core-systems/shaders/shader-variant.md)*

Shader variant asset  
: The shader variant asset contains the actual bytecode for a compiled shader that is stored in the engine's cache for use at runtime. The shader variant asset is stored in a file with the `.azshadervariant` extension. There must be one shader variant asset for each `.shader` file to hold the root shader variant. Numerous shader variant assets can be generated from a `.shadervariantlist` file.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Variant](core-systems/shaders/shader-variant.md), [Shader Build Pipeline](core-systems/shaders/shader-build-pipeline.md)*

Shader variant tree  
: The shader variant tree is a data structure that organizes a shader's collection of shader variants. It allows fast lookup of shader variants at runtime, as well as automatic fallback to more generalized variants if a specific variant is not found.

A shader variant tree is stored in a file with the `.shadervariantlist` extension.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Variant](core-systems/shaders/shader-variant.md), [Shader Build Pipeline](core-systems/shaders/shader-build-pipeline.md)*

Shader variant tree asset  
: A shader variant tree asset is generated from shader variant tree data into a form that is consumable by the simulation. Shader variant tree assets are stored in files with the `.azshadervarianttree` extension and are stored in the engine's cache for use at runtime. The shader variant tree asset contains links to all of the shader variant assets for a particular shader.

*Related to: [Shader System](core-systems/shaders/_index.md), [Shader Variant](core-systems/shaders/shader-variant.md)*

System shader option  
: A system shader option is any shader option in a material shader that is not owned by the material type. When a material type connects to a shader option in one of its shaders, that option is owned by the material type; only the material is allowed to set the value for that option. All other options are called system shader options, and these are set directly in code by calling the method `Material::SetSystemShaderOption()`.

*Related to: [Shader System](core-systems/shaders/_index.md), [Material System Data Flow](core-systems/materials/material-system-data-flow.md)*

<!-- We are currently missing these definitions. -->
<!-- View  
: *Render Pipeline Interface (RPI)*    

ViewList  
: *Render Pipeline Interface (RPI)*    

ViewListTag  
: *Render Pipeline Interface (RPI)*     -->