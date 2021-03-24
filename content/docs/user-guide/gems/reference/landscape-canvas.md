---
description: ' Use Landscape Canvas Gem to author dynamic vegetation Open 3D Engine
  project. '
title: 'Landscape Canvas Gem'
---

{{< preview-migrated >}}

The Landscape Canvas Gem provides the Landscape Canvas Editor; a node\-based graph tool for authoring dynamic vegetation workflows to drive vegetation areas\. This is a great improvement over the previous component based dynamic vegetation system because you can now manage an edit all of the inputs in one place, and easily visualize the data flow when you build dynamic vegetation\. The Landscape Canvas Editor uses the same UI and UX principles as Script Canvas, making Landscape Canvas intuitive and familiar\.

![\[White Box component interface.\]](/images/user-guide/gems/landscape-canvas-demo.gif)

**Note**
Landscape Canvas is backwards compatible\. Any Dynamic Vegetation content you have previously authored is automatically parsed and a graph is built for you from your existing levels\.

Landscape Canvas has five node groups available that map to the components you previously would use to build dynamic vegetation: **Gradient Modifiers**, **Gradients**, **Shapes**, **Utilities**, and **Vegetation Areas**\. The workflow is to create a new landscape canvas asset, and layout and connect nodes in the canvas to build a workflow for a vegetation area\.
