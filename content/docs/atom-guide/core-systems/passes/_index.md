---
title: "Passes"
description: "Passes in the Atom Renderer"
weight: 410
toc: true
---

This section provides technical details about how passes are created and managed in the Atom renderer.

## What are passes?  
Every detail you see in the final rendered frame was calculated through a series of passes. Passes represent the whole process in which individual images of a single frame are produced and combined together to compose a complete image. Each image contains a specific piece of information about the scene, such as color, normals, and depth. These images of information combine and build on top of each other to produce more complex effects such as shadows, lighting, blur, glow, and other post processing effects. 

Technically, passes are logical groupings of render work with a defined input and output. This means, a pass performs calculations on the input to produce the output.

**Examples**  
Passes are a means to produce a desired visual effect. To demonstrate, consider the following examples: 
- A *forward render* pass receives a list of objects to draw and outputs a rendered image of those objects as seen from the viewpoint.
- A *depth of field* pass takes an image and a depth buffer and outputs a new image that mimics the depth of field effect present in real world cameras.
- A *particle simulation* pass operates on buffers of particle data and updates the position and state of the particles.

## Contents
This section covers the following topics.
| Topics                        | Description |
|--------------------------------------|---------|
| [Pass System](pass-system.md) | An overview of the pass system in Atom. |
| [Pass Template File Specification](pass-template-file-spec.md) | JSON reference for pass template data. |
| [Authoring Passes](authoring-passes.md) | Learn how to author passes in the pass system.  |