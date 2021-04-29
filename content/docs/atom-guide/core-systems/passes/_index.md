---
title: "Passes"
description: "Passes in the Atom Renderer"
weight: 410
toc: true
---

This section provides technical details about how passes are created and managed in the Atom renderer.

## What are passes?  

Every detail you see in the final rendered frame is calculated through a series of passes. Passes produce images as textures, buffers, or render targets. Each image contains a specific piece of information about the scene, such as color, normals, and depth. These images of information are combined to produce more complex effects such as shadows, lighting, blur, glow, and other post processing effects. 

Passes are logical groupings of render work with a defined input and output. This means, a pass performs calculations on the input to produce the output.

**Examples**  
Passes are a means to produce a desired visual effect. To demonstrate, consider the following examples: 
- A *forward render* pass receives a list of objects to draw and outputs a rendered image of those objects viewed from the camera's perspective in the scene. 
- A *depth of field* pass takes an image and a depth buffer and outputs a new image that mimics the bokeh effect present in real world cameras.
- A *skinned mesh* pass takes a mesh's vertices, calculates movement, and outputs the new positions of the vertices.

## Contents
This section covers the following topics.
| Topics                        | Description |
|--------------------------------------|---------|
| [Pass System](pass-system.md) | An overview of the pass system in Atom. |
| [Pass Template File Specification](pass-template-file-spec.md) | JSON reference for pass template data. |
| [Authoring Passes](authoring-passes.md) | Learn how to author passes in the pass system.  |