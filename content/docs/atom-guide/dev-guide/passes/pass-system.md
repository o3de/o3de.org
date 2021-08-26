---
title: "Pass System Overview"
description: "Learn about the Pass System in Atom Renderer."
date: 2021-03-09
toc: true
weight: 1000
---

This page provides an overview of the Atom Renderer's **pass system**, which refers to the high-level system that defines how passes are structured and managed.

The pass system is designed to be highly flexible across the different needs and workflows of developers. So that different types of developers and technical artists can work with passes, O3DE allows for authoring passes as data-driven (JSON), hard-coded (C++), or a combination of both. There are advantages and disadvantages for each that are important to consider when deciding how to author passes.

* **Data-driven (JSON)**  
    Authoring in a data-driven way allows a simpler prototyping workflow and faster iteration times. Since changes are made only to the data, there is no need to recompile the renderer after each change. Using data-driven passes also keeps them decoupled from the core engine. This allows passes to be shared as assets, reducing the burden of integrating passes into the engine.

    The primary cost of authoring passes in JSON is performance and lack of flexibility in the pipeline. It's recommended to use the JSON format mostly for prototyping, small shared passes, and trivial implementations.

* **Hard-coded (C++)**  
   Authoring passes through programming in C++ and directly integrating with Atom gives you more control over the rendering pipeline and offers higher performance. Authoring passes in C++ is more complicated and requires an O3DE Gem for distribution of shared passes.
    
* **Combination of both**  
    In some cases, developers may want to create passes with complex functionality in C++, while also being able to tweak their high-level properties in JSON. For example, when creating a complex visual effect, part of the implementation can be done in C++ to improve performance, and the other part can be implemented in JSON to allow rapid iteration on the effect. The combined method adds some complexity to the pass architecture, but the complexity remains transparent to the user.

## Architecture

The pass system architecture has two sides: The code side (C++) and the data side (JSON). The code side defines the structure of a pass, such as its properties and functionalities, and implements the system that manages passes, such as pass creation and registration. The data side serializes the C++ pass structure, allowing you to author passes using JSON files. 

Passes can either be a **Parent Pass**, which contains other passes, or a **Render Pass**, which executes GPU work. Passes also define their own pass behaviors, or how they should behave during a render frame. 


## Code Side: Structure of a Pass

The following classes define the structure of a pass. 

### Pass

*Related to: [Pass API](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_pass.html)*  

The `Pass` class is the base class that every pass class derives from. It defines the pass's properties and functionalities.

#### Pass Attachments

Passes use RHI attachments like textures, buffers and render targets. There are three types of attachments: Input, Output, and InputOutput.

| Attachment | Description | 
| - | - |
| Input | If a pass reads an attachment and does not write to it, then the attachment slot should be an Input. For example, in SSAO, the depth buffer is bound as an Input because the contents only need to be read. |
| Output | If a pass writes to an attachment and the previous state of the attachment isn't needed, then the attachment slot should be an Output. The previous state of an Output may be cleared or overwritten. For example, in a depth pre-pass, the depth buffer is bound as an Output because it only needs to be written to. Another example is that for a fullscreen pass that renders to a target, the target is bound as an Output. |
| InputOutput | If a pass writes to an attachment, but the previous state of the attachment is needed, then the attachment slot should be an InputOutput. The previous state of an InputOutput is preserved. For example, in a forward transparent pass the render target is an InputOutput because the render target already contains pixels rendered in the opaque pass. | 

#### Pass Behavior

The behavior of passes is defined in virtual functions, which can be overridden. These virtual functions have the suffix `Internal` at the end of their name. They do not contain any default behavior and only need to be implemented by the derived class if desired. 

Each of the virtual functions have a non-virtual counterpart, which have the same name, but without `Internal`. The non-virtual function calls the virtual counterpart and implements core functionality common to all passes. 

When authoring a new pass in C++, users create a class derived from `Pass` and override any functions they need to obtain the desired behavior. 

The following functions are used for defining pass behavior. 

| Function | Behavior |
| - | - |
| `Reset`, `ResetInternal` |  This is where passes reset their internal state, such as attachments and pointers to attachments on neighbors.  |  
| `BuildAttachments`, `BuildAttachmentsInternal` |  This is where passes build attachments, connect to other passes, and set up any necessary state.  |  
| `Validate` |  This functions allows passes to validate their internal state. For example, you can check if attachments are valid, if internal data has been properly configured, or if the pass hierarchy is valid. This is a virtual function, but does not follow the `Internal` naming pattern. Instead, derived classes should override the virtual `Validate` method and if successful, call their base class `Validate` method.  |
| `FrameBegin`, `FrameBeginInternal` |  This can be thought of as the pass's "render" function. It's called every frame and allows the pass to set up its rendering logic with the RHI's `FrameGraph`. For leaf passes this will often involve using `RHI::ScopeProducer` and calling `ImportScopeProducer` on the `FrameGraph`. This will register the pass scope producer with the `FrameGraph` so it can receive the necessary callbacks. |
| `FrameEnd`, `FrameEndInternal` | This is called every frame, after the frame's rendering logic has been executed.  It serves mostly as a sync point for passes to clean up any per-frame state or resources they no longer need. |


### Parent Pass 

*Related to: [ParentPass API](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_parent_pass.html)*

A **parent pass** is a pass composed of other passes. For example, a Bloom pass is composed of several down-sample passes, blur passes, and up-sample passes. 

A parent pass inherits from `Pass` and implements a composite pattern, allowing a tree hierarchy of passes. All passes hold a pointer to their parent pass. If a pass pointer is null, then the pass is either the root of the hierarchy or an orphan, meaning it doesn't belong to the pass hierarchy. During execution, the hierarchy of child passes are traversed in depth-first order, executing each pass's behavioral functions. 

### Render Pass

*Related to: [RenderPass API](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_render_pass.html)*

A **render pass** is responsible for executing some form of GPU work.

Atom provides the following render passes that implement the most common use cases for rendering.

| Name | Description | API |
| - | - | - | 
| Raster Pass | Converts objects in a scene to an image composed of individual pixels. | [RasterPass](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_raster_pass.html) |
| Compute Pass | Activates a compute shader to dispatch render commands. | [ComputePass](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_compute_pass.html) | 
| Full Screen Triangle Pass | Renders a single triangle that covers the entire screen. This pass can be adapted to render other visuals in full screen.| [FullScreenTrianglePass](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_fullscreen_triangle_pass.html) |
| Copy Pass | Copies images and buffers on the GPU. | [CopyPass](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_copy_pass.html) |



## Code Side: Creating Passes

In the pass creation process, there are three components involved: `Pass`, `Pass System`, `Pass Template`, and `Pass Request`. When creating passes, the pass system uses the information defined in a pass template to create an instance of a pass. A pass request can be used to tell the pass system to create a pass. This section goes into detail about each component's role.

### Pass
To create a pass, there are two properties involved: Name and Pass Descriptor. (Pass is defined earlier [here](#pass).)

Name 
: A string ID that references an entry in a global name dictionary. Names are more memory efficient and offer faster equality checks than strings. 

Pass Descriptor
: *Related to: [PassDescriptor API](/docs/api/gems/atom/struct_a_z_1_1_r_p_i_1_1_pass_descriptor.html)*  

A class that is used as input to pass constructors. It contains the name of the pass to be created. If it creates a pass from a `PassTemplate` or a `PassRequest`, it also contains pointers that pass template or pass request; otherwise, the pointers point to `nullptr`.

### Pass System

*Related to: [PassSystem API](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_pass_system.html)*

The **pass system** is the central hub that oversees and manages passes. It's responsible for creating, rebuilding, and deleting passes. It also holds the root of the pass hierarchy. 

To use a pass in the render pipeline, the associated pass template must first be registered with the pass system. Then, the pass system can query from the list of registered pass templates and create an instance of that pass. 

### Pass Template

*Related to: [PassTemplate API](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_pass_template.html), [Pass Template File Specification](pass-template-file-spec.md)*

**Pass templates** provide data that allows the pass system to create an instance of a pass. 
Pass templates can be authored in C++ or through a JSON file. 

### Pass Request

*Related to: [PassRequest API](/docs/api/gems/atom/struct_a_z_1_1_r_p_i_1_1_pass_request.html)*

A pass request is a query to create a pass from a pass template. It uses the `Name` property of the `PassTemplate` to query the `PassTemplate` from the `PassSystem` and create a `Pass`. It also contains information on how to associate the pass's inputs and outputs to neighboring passes in the pass tree hierarchy. 

## Data Side: Serializing Passes

Passes can be authored in a data-driven way using JSON. Pass files use the `.pass` extension. Authoring passes in JSON allows you to configure passes and edit the render pipeline without needing to recompile any binaries.

### Pass Asset

*Related to: [PassAsset API](/docs/api/gems/atom/class_a_z_1_1_r_p_i_1_1_pass_asset.html)*

A **pass asset** is a serialization wrapper around the `PassTemplate` class. The `.pass` files are processed and serialized by a pass asset to create a pass template. When loaded from disk, the Asset Processor registers the pass template with the `PassSystem` class, so the pass template can be referenced by name either in code or in other pass assets. Any pass request in the serialized pass template will be used to create child passes. 