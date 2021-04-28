---
title: "RPI System"
description: "RPI System in the Atom Renderer"
date: 2021-03-04
toc: false
weight: 200
---

{{< preview-new >}}

The Render Pipeline Interface (RPI) is the core system in Atom that drives rendering. The [RPI Architecture Diagram](./rpi.md#rpi-architecture) shows the RPI's role in the entire rendering system. This article explains how the RPI and its components perform rendering. 

## Components
The RPI system contains the following components. 

### Scene
A **scene** represents a rendering context. Commonly, we need an application to render contexts for different purposes. For example, a 3D game has a UI overlay that has a different light setting than the in-game lighting. In another example, a level view window is rendered differently from a material preview window. Scenes help manage these different rendering contexts and isolate them from each other when needed. 

In Atom RPI, scenes are defined by the `Scene` class. The RPI system must have at least one scene. Scenes are independent of each other, and must have their own scene Shader Resource Group (SRG) to provide related constant buffer data.

### Pass
A **pass** is where the GPU command submissions are handled. GPU commands, such as draw commands, compute commands, or copy commands must be submitted in a pass. For more information on passes, see the [Pass System](../pass-system/pass-system/) section. 

### Render Pipeline
A **render pipeline** defines how to render a scene.

A scene that is not rendered does not need to have a render pipeline. Otherwise, a rendered scene must have at least one render pipeline. It can have additional render pipelines to render the scene in different ways. For example, in a level editor, we might have several windows to show the same level with different rendering modes. One mode might render the in-game view, which includes lighting passes and post effects. The other mode might render a debug view, which shows colored wireframes.

A render pipeline contains a pass tree that defines how passes handle draw data submission (see [Pass System](pass-system.md) section). A render pipeline also provides an interface to associate views and assign persistent attachments to the passes, so users don't need to manually look for the specific pass to do the operation.

Since pass trees in a render pipeline can be dynamic, it's possible to use them to enable or disable passes during runtime. For example, if we need to disable some post-effect during runtime, we can disable the pass responsible for the post effect. 

### View
A **view** is similar to a camera, which describes how to render a 3D scene onto a 2D screen. It contains the transformation matrices between different spaces, such as world, view, and clip. It also maintains the view's shader resource group, which allows others to access the transformation information from GPU shaders. Draw data submitted in passes must be sorted in view spaces. Passes might also use some constants that are provided by the view's SRG, such as camera position. 

### Feature Processor
A feature processor is responsible for preparing and managing draw data for a specific graphics feature. Each scene can have only one instance of each type of feature processor. However, feature processors can support multiple graphics features. 

## Simulation
RPI system simulation is used primarily for graphics features that are computed in the CPU. For example, character animation updates and time of day simulation all happen in the CPU. The simulation for these features can be done in parallel. 

## Draw Data Flow
Feature processors prepare draw packets and add them to views. (Draw packets are collections of draw items, which are data to be rendered.) Views filter the draw items from the draw packets into different groups. They then sort each group of draw items. A pass requests a certain group of draw items from a view and then submits them. 

For a more detailed explanation, see [Frame Rendering Process](/core-systems/frame-rendering/).
