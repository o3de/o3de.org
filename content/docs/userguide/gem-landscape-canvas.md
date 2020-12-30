---
description: ' Use &landscape-canvas; &gem; to author dynamic vegetation &ALYlong;
  project. '
slug: gem-landscape-canvas
title: '&landscape-canvas; &gem;'
---
# Landscape Canvas Gem<a name="gem-landscape-canvas"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

The Landscape Canvas Gem provides the Landscape Canvas Editor; a node\-based graph tool for authoring dynamic vegetation workflows to drive vegetation areas\. This is a great improvement over the previous component based dynamic vegetation system because you can now manage an edit all of the inputs in one place, and easily visualize the data flow when you build dynamic vegetation\. The Landscape Canvas Editor uses the same UI and UX principles as Script Canvas, making Landscape Canvas intuitive and familiar\. 

![\[White Box component interface.\]](/images/userguide/gems/landscape-canvas-demo.gif)

**Note**  
Landscape Canvas is backwards compatible\. Any Dynamic Vegetation content you have previously authored is automatically parsed and a graph is built for you from your existing levels\. 

Landscape Canvas has five node groups available that map to the components you previously would use to build dynamic vegetation: **Gradient Modifiers**, **Gradients**, **Shapes**, **Utilities**, and **Vegetation Areas**\. The workflow is to create a new landscape canvas asset, and layout and connect nodes in the canvas to build a workflow for a vegetation area\. 

## Enable the Landscape Canvas Gem<a name="enable-gem-landscape-canvas"></a>

To make the **Landscape Canvas** Editor available in Lumberyard, you must build and configure your project with the Landscape Canvas Gem enabled\. 

1. Use Project Configurator to add the **Landscape Canvas Gem** to your project\. 
**Note**  
The Landscape Canvas Gem requires the following Gems\.   
LmbrCentral
Vegetation
GraphCanvas
GraphModel
GradientSignal
SurfaceData

1. Configure your project\. 

   **lmbr\_waf configure** 

1. Build your project\. 

   **lmbr\_waf build\_*win\_x64\_vs2019*\_profile \-p all \-\-progress** 

For more information on Gems, see the [Gems documentation](gems-system-gems.md)\. 