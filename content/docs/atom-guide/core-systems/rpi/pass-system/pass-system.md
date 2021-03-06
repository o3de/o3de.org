---
title: "Pass System"
description: "Pass System in Atom"
date: 2021-03-09
toc: false
---

*This section is under construction.*
<!-- [WRITER NOTE: I want to improve the intro by talking about the Pass System in a general sense
@antonmic
- What is the responsibility of the pass system?
- Where is it located? (RPI)] -->

<!-- [WRITER NOTE: I'm not in love with the structure of this page] -->

This document provides a technical overview of the pass system in Atom. Passes are logical groupings of render work with a defined input and output. 

To understand how a pass works, consider the following use cases for passes: 
* A forward render pass receives a list of objects to draw and outputs a rendered image. 
* A depth of field pass takes an image and associated depth buffer and outputs a new image that mimics the depth of field effect present in real world cameras.
* A particle simulation pass operates on buffers of particle data and updates the position and state of the particles.

## Paradigms for Pass Authoring
Atom's pass system supports three paradigms for authoring passes: data-driven (JSON), hard-coded (C++), or a combination of both. There are advantages and disadvantages for each paradigm. It's important to consider them when deciding which paradigm to use for authoring a pass. 
* **Data-driven (JSON)**  
    Authoring in a data-driven way allows a simpler prototyping workflow and faster iteration times. Since changes are only made to the data, there is no need to recompile the renderer after each change. Furthermore, passes that might be game-specific are decoupled from the core engine (C++). This allows passes to be shared as assets rather than as code, which reduces the burden of integrating passes into the engine. 

* **Hard-coded (C++)**  
    Although the data-driven paradigm improves workflow, it limits intricate logic that certain passes might require. Furthermore, if a pass's custom logic needs to run on a per-frame basis, the data-driven paradigm might lead to performance issues. Authoring passes through programming gives engineers more control over the rendering pipeline. This is also the more common way to author passes in other renderers. 
    
* **Combination of both**  
    In some cases, it makes sense for most of the rendering logic to be handled in C++ classes, while keeping some aspects data-driven. This enables the ability to customize and prototype some aspects of the pass without any programming. The combined method adds some complexity to the pass architecture, but the complexity remains transparent to the user. 

## Pass System Architecture
The architecture of a pass can be thought of as having two sides: the code side and the data side. Passes are first authored as **pass templates**. Depending on the paradigm, they can be authored in the code side (C++), the data side (JSON), or a combination of both. Then, in the code side, the pass templates are processed into passes, which are consumed by the rest of the pipeline.  

Passes are created from a parent pass, which is the root of this pass hierarchy. They inherit from a render pass, which is where all the pass work in a GPU is executed. Passes also define their own pass behaviors, or how they should behave during a render frame. 

![pass-architectrure](/images/atom-guide/core-systems/rpi/pass-architecture.svg)

### Pass
A **pass** (`Pass`) is at the center of Atom's Pass System. All pass logic (data-driven or hard-coded) contains some elements that inherit from this class.  
#### Attachments
Passes use RHI attachments like textures, buffers and render targets. These attachments are organized into three categories: Input, Output and InputOutput.
  * **Input**:  If a pass reads an attachment and does not write to it, then the attachment slot should be an Input. For example, for SSAO, the depth buffer is as an Input because the contents only need to be read. 
  * **Output**: If a pass writes to an attachment and the previous state of the attachment doesn't matter, then the attachment slot should be an Output. For example, in a depth pre-pass, the depth buffer is bound as an Output because it only needs to be written to. Or, in a fullscreen pass that renders to a target, the target is bound as an Output. 
  * **InputOutput**: If a pass writes to an attachment, but the previous state of the attachment matters, then the attachment slot should be an InputOutput. For example, in a forward transparent pass, the render target is an InputOutput because the render target already contains pixels rendered in the opaque pass. 
 
#### Pass Behavior
The behavior of passes is defined in virtual functions, which can be overridden. These virtual functions can be identified as having the suffix "Internal" at the end of their name. Each of the virtual functions have a non-virtual counterpart, which have the same name, but without "Internal". 

The non-virtual function calls the virtual counterpart and implements core functionality common to all passes. When authoring a new pass in C++, users create a class derived from `Pass` and override any functions they need to obtain the desired behavior. 

The following functions are used for defining pass behavior. 

* **`Reset()`**, **`ResetInternal()`**: This is where passes reset their internal state, such as attachments and pointers to attachments on neighbors. 
  
* **`BuildAttachments()`**, **`BuildAttachmentsInternal()`**: This is where passes build attachments, connect to other passes, and setup any necessary state. 
  
* **`Validate()`**: This functions allows passes to validate any internal state. For example, to check if attachments are valid, if internal data has been properly configured, or if the pass hierarchy is valid. This is a virtual function, but does not follow the -Internal naming pattern. Instead, derived classes should override the virtual `Validate()` method and if successful, call their base class `Validate()` method. 

* **`FramePrepare()`**, **`FramePrepareInternal()`**: This can be thought of as the pass's "render" function. It is called every frame and allows the pass to set up its rendering logic with the RHI's FrameGraph. 

    For leaf passes this will often involve leveraging `RHI::ScopeProducer` and calling `ImportScopeProducer` on the FrameGraph. This will register the pass scope producer with the FrameGraph so it can receive the necessary callbacks.

* **`FrameEnd()`**, **`FrameEndInternal()`**: This is called every frame, after the frame's rendering logic has been executed.  It serves mostly as a sync point for passes to clean up any per-frame state or resources they no longer need.

#### Parent Pass 
A **parent pass** (`ParentPass`) is a pass that is composed of other passes. For example, a Bloom pass is composed of several down-sample passes, blur passes, and up-sample passes. 

A parent pass inherits from `Pass` and implements a composite pattern, allowing a tree hierarchy of passes. All passes hold a pointer to their parent pass. If a pass pointer is null, then the pass is either the root of the hierarchy or an orphan, meaning it doesn't belong to the pass hierarchy. During execution, the above behavioral functions are executed in depth-first traversal order throughout the hierarchy of child passes. 

`ParentPass` contains the following function:  
* **`CreatePasses()`**, **`CreatePassesInternal()`**: This is where parent passes create the required child passes. For example, a Bloom pass can create downsample, blur, and upsample child passes. 

#### Render Pass
A **render pass** (`RenderPass`) refers to all other, non-parent passes. Render passes are responsible for executing some form of GPU work. 

Atom has three derived classes of RenderPass that implement the most common use cases.
  *  **RasterPass**: Rasterizes objects and renders it to a render target, such as the screen. Objects are matched to passes via DrawListTags.
  *  **ComputePass**: Dispatches a compute shader. There is an option to make a fullscreen compute shader so that the number of X and Y dispatch groups are auto calculated based on the size of the output image and the X and Y thread count per group specified in the shader.
  *  **FullScreenTrianglePass**: Renders a triangle that covers the screen so that every pixel of the output image is written to. 


### Pass Creation 
The `Pass` class contains the following components, which are used for creating passes. 

#### Name 
Passes contain an instance of the `Name` class, which is a simple string ID that references an entry in a global name dictionary. Names are more memory efficient and offer faster equality checks than strings. 

#### Pass Descriptor
A **pass descriptor** (`PassDescriptor`) is a struct that is used as input to pass constructors. It contains the name of the pass to be created. If it creates a pass from a `PassTemplate` or a `PassRequest`, it also contains pointers that pass template or pass request; otherwise, the pointers point to `nullptr`.

#### Pass System
All passes must be registered with the **pass system** (`PassSystem`). When the pass is registered, the pass system uses the pass's `Name` to query the `Create()` method and instantiate passes of that `Pass` class. 

Similarly, the pass system holds references to all pass templates, which can be queried by `Name`. The `PassSystem` can query passes and pass templates using the following functions. 

```cpp
// See PassSystem.cpp

//! Retrieves a PassTemplate from the library
virtual const AZStd::shared_ptr<PassTemplate> GetPassTemplate(const Name& name) const = 0;
 
//! Find matching passes from registered passes with specified filter
virtual AZStd::vector<Pass*> FindPasses(const PassFilter& passFilter) const = 0;
 
//! Get all the passes created with the given template name
virtual const AZStd::vector<Pass*>& GetPassesForTemplateName(const Name& templateName) const = 0;
 
//! Returns true if the pass factory contains passes created with the given template name
virtual bool HasPassesForTemplateName(const Name& templateName) const = 0;
```

#### Pass Template
A pass template (`PassTemplate`) is a template used to create `Passes`. It contains a `Name`, which is used by the `PassSystem` to create the appropriate class. 

Pass Templates have **attachment slots**, which specify slots that attachments can be use on the instantiated `Pass`. As mentioned above, [attachments](#attachments) fall into three categories: Input, Output, and InputOutput. 

PassTemplates can be authored in C++ or through a JSON file. 

#### Pass Request
A pass request (`PassRequest`) is a piece of data that represents a request to create a `Pass` from a `PassTemplate`. It contains the `Name` of the `PassTemplate`, which is used to query the `PassTemplate` from the `PassSystem` and create a `Pass`. It also contains information on how to hook up the pass's inputs and outputs to neighboring passes in the pass tree hierarchy. 

### Pass Asset
A pass asset (`PassAsset`) is a serialization wrapper around `PassTemplate`. When loaded from disk, it registers the `PassTemplate` with the `PassSystem` so it can be referenced by name either in code or in other `PassAssets`. Any `PassRequest` in the serialized `PassTemplate` will be used to create child Passes. 