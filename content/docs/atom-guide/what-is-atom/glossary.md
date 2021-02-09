# Glossary
This is a collection of terms used in Atom as well as their definitions. 

## Attachment (RHI)
A buffer / image instance associated with a unique name id. It can be attached to a scope with a specific state (e.g. color, depth stencil, shader read/write, copy read/write). The state of the attachment is fixed for the duration of the scope. There are two types of attachments: persistent and transient.

## CommandList (RHI)
[TODO]

## DrawItem (RHI)
Corresponds to a draw call for a given object in a given pass. An object that needs to be drawn in several passes will result in several DrawItems (for example opaque objects need to be rendered in shadows, pre-depth and forward+). The collection of DrawItems pertaining to the same objects constitutes a DrawPacket.

## DrawList (RHI)
A list of pointers to DrawItems.

## DrawListContext (RHI)
A thread safe container that can accept DrawItems into DrawLists from multiple threads. It accumulates DrawItems into thread local DrawLists, which it then combines into a merged DrawList for rendering.

## DrawListMask (RHI)
A bit mask used for rapid culling that indicates which DrawLists are relevant to the class that holds mask. For a View, this indicates which DrawLists are in the View. For a DrawPacket, this indicates the union of DrawLists that the packet's DrawItems will render to.

## DrawListTag (RHI)
[TODO] 

## DrawPacket (RHI)
Collection of data needed to render an object in multiple passes. For example, an object may need to be drawn in the shadow pass, the depth pre-pass and the forward+ pass. Each of those draw calls corresponds to one DrawItem. The draw packet is the collection of those draw items.

## FrameGraph (RHI)
[TODO]

## Feature Processor (RPI)
Are responsible for receiving data from the simulation and processing it into a form that's consumable by the renderer. Each feature processor handles a specific type of data, like static meshes or hair. Feature processors own render proxies and convert them into draw packets for consumption by the lower segments of the RPI. For example an animated mesh feature processor will own all the animated mesh render proxies in a given scene. Feature processors are owned by scenes and there can be at most one feature processor of a given type per scene.

## Material (RPI)
A material is a data item that can be applied to a single mesh to describe how it should be rendered. It references a material type which defines its behavior, and provides a set of values for the available material properties. Materials can inherit property values from other materials.

## Material Type (RPI)
A material type defines how a material behaves and what properties it has. Every material must have a material type. The main material type provided with Atom is Standard PBR. Other examples may include hair, skin, car paint, etc.

## Material Instance (RPI)
A material instance is an active material, bound to one or more meshes, being used at runtime for actual rendering. It can be created from a material asset.

## Render Component (O3DE)
A class that lives on the simulation side (i.e. Lumberyard) and pushes data to the renderer via it's Feature Processor. For example an animated mesh component will send bone matrix updates to it's Feature Processor each frame.

## RHI - Rendering Hardware Interface
Hardware abstraction layer and the lowest layer of Atom. Manages GPU resources, handles GPU fences, schedules work on the GPU queues and handles synchronization between them.

## RPI - Render Pipeline Interface
Layer sitting above the RHI, responsible for interfacing with game logic and pushing draw items through the pipeline and down to the RHI.

## Pass (RPI)
A logical grouping of render work with a defined input and output. Similar to Scope but lives in the RPI. A pass can contain other passes to form a tree hierarchy of passes.

## Pipeline (RPI)
A logical grouping of passes and views used to render a certain output (like the main view of the game or particle depth maps for collision).

## Scene (RPI)
Conceptually represents a 'world' to be rendered. Contains feature processors and pipelines.

## Scope (RHI)
A logical grouping of uninterruptible render work with a defined input and output. Similar to Pass but lives in the RHI.

## Shader Resource Group (RHI, RPI & Shaders)
A shader resource group is a collection of shader resources: image / buffer views, dynamic samplers, it also may contain an implicit constant buffer for small constant data. Shader resource groups are best utilized when bound at specific frequencies (e.g. per frame, view, pass, material, instance). The goal is to pre-cook shader resources into a table suitable for binding to the hardware pipeline.

## View (RPI)
Defines a frustum used for rendering. Views hold lists of draw items that are queried by passes for rendering.

## ViewList (RPI)
[TODO]

## ViewListTag (RPI)
[TODO]