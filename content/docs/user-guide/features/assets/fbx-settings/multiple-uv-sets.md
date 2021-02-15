---
description: ' Export multiple UV sets from .fbx files with FBX Settings to Amazon Lumberyard. '
title: Multiple UV sets for meshes and actors
---
# Multiple UV sets for meshes and actors {#fbx-multiple-uv-sets}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

You can use **FBX Settings** to import multiple UV sets\. With multiple UV sets, you can apply a detail or blend layer map to your geometry using UV sets that are independent of the diffuse, normal, and spec UV sets\. With multiple UV sets, you can also apply an animated glow that is independent of other texture maps on a mesh\.

![\[Image NOT FOUND\]](/images/userguide/fbx/anim-multi-uv-support.gif)

**Topics**
+ [Processing multiple UV sets](#fbx-export-multiple-uv-sets)
+ [Materials and multiple UV sets](#fbx-setup-multiple-uv-sets)
+ [Independent tiling and UV sets](#fbx-uv-independent-tiling)

## Processing multiple UV sets {#fbx-export-multiple-uv-sets}

Lumberyard supports two UV sets per mesh\. **Asset Processor** follows these rules when processing UV sets:
+ If the `.fbx` file contains one or two UV sets, the UV sets are automatically exported\.
+ If the `.fbx` file contains three or more UV sets, the first two sets are automatically exported, and the remaining sets are ignored\.

## Materials and multiple UV sets {#fbx-setup-multiple-uv-sets}

By default, **FBX Settings** creates materials for your exported mesh\. You must use the **Shader Generation Parameters** in the **Material Editor** to specify how the material should use the second UV set\.

Follow these steps to apply the second UV set:

1. In Lumberyard Editor, choose **Tools** and then **Material Editor**\.

1. In the left pane, navigate to and select the material to use\.

1. In the right pane, under **Shader Generation Params**, do the following to apply the second UV set to one of these features:
   + Blend Layer - Select **Blendlayer** and **Use UV set 2 for blendlayer maps** to apply the second UV set to the **Second Diffuse Map**, **Specular**, **Height**, **Bump**, and **Blending Map** texture slots\.
   + Detail Map - Select **Detail mapping** and **Use UV set 2 for detail map** to apply the second UV channel to the **Detail** texture slot\.
   + Emittance Map - Select **Use UV set 2 for emittance map** to apply the second UV channel to the **Emittance** and **Decal** texture slots\.

## Independent tiling and UV sets {#fbx-uv-independent-tiling}

On the **Second Diffuse Map**, you can set independent values for the blend layer's texture inputs \(tiling, rotation, and oscillation\)\. Changes to these values don't affect the tiling, rotation, and oscillation values on the first **Diffuse Map**\. In addition, these values aren't applied to the **Blend Map**\. You can use the **Blend Mask Tiling** parameter under **Shader Params** to tile the **Blend Map**\.

You can also set independent values for tiling, rotation, and oscillation for the **Detail** and **Emittance** map features\.

Follow these steps to set independent values for the texture inputs:

1. In Lumberyard Editor, choose **Tools**, **Material Editor**\.

1. In the left pane, navigate to and select the material to use\.

1. In the right pane, do the following:
   + Under **Texture Maps**, modify the values for **Tiling**, **Rotator**, and **Oscillator** for your diffuse maps\.
   + Under **Shader Params**, modify the **Blend Mask Tiling** parameter for your blend map\.