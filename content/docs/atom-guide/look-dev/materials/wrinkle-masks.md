---
linktitle: Wrinkle Masks for Skin Materials
title: "Wrinkle Mask Workflow"
description: "Learn about how to drive the blending between wrinkle maps with morph targets."
toc: true
weight: 200
---  

This document describes how to drive the blending of different wrinkle layers in the [Skin Material Type](https://github.com/o3de/o3de/blob/development/Gems/Atom/Feature/Common/Assets/Materials/Types/Skin.materialtype) using morph targets. Follow this workflow to allow automatic blending between wrinkle layers driven by the active morph targets of the [Actor component](/docs/user-guide/components/reference/animation/actor). Depending on the digital content creation (DCC) tool that you use, morph targets may also be called _blend shape_ or _shape key_. 

For a demonstration of wrinkle mask blending, see a [YouTube video](https://www.youtube.com/watch?v=ebr8t_mz8p8&t=3s) by Deadhaus Sonata. This video shows wrinkle mask blending with O3DE in action. 

{{< important >}}
This workflow represents a minimum viable product for animating wrinkle masks. There are a number of aspects that could use feedback on how to improve, such as how the normal maps and blend masks are blended, and the potential need for corrective blend masks. If you are using this feature, please reach out to [sig-graphics-audio on Discord](https://discord.com/channels/805939474655346758/816043793576886273) with your suggestions!
{{< /important >}}

## Setting up wrinkle masks in O3DE

To set up wrinkle masks for your morph targets, you must add the wrinkle masks to the correct location in your project folder and use the appropriate file names. 

1. In the folder that `<mycharacter>.fbx` is in, create a `<mycharacter>_wrinklemasks` folder. Using this exact naming convention, the Asset Processor can associate any wrinkle masks in the wrinkle mask folder with morph targets from the `.fbx`.

    ![Folder Naming Convention](/images/atom-guide/materials/skin/wrinkle-mask-folder-naming-convention.png)

1. In the `<mycharacter>_wrinklemasks` folder, add one blend mask for each morph target that activates the wrinkle layers. Consider these additional rules: 

    - If the morph target doesn't activate any wrinkle layers, it doesn't need a mask. 

    - Morph targets cannot share the same masks. So if two morph targets intend to use the same mask, you must duplicate the mask texture instead.

1. Ensure that the blend masks files have the correct  name, following the wrinkle mask naming convention. The name of each mask must match the name of the morph target in the corresponding `.fbx`. 

     In the following images, you can see that the wrinkle mask file names match the morph target names (displayed as shape keys in Blender) and end with `_wrinklemask.tif`.

    ![Wrinkle Mask File Naming Convention](/images/atom-guide/materials/skin/wrinkle-mask-file-naming-convention.png)
    ![Shape Key Names in Blender](/images/atom-guide/materials/skin/shape-key-names-in-blender.png)
    {{< caution >}}
If you rename the morph target in the `.fbx`, you must rename the wrinkle mask. 
    {{< /caution >}}


## File extension
Wrinkle mask file names must use the `_wrinklemask` suffix and `.tif` extension. The model builder looks for the file names `<morph-target>_wrinklemask.tif`, where `<morph-target>` matches the file name of a morph target, to identify if there's a mask that corresponds to the morph target. The `_wrinklemask` suffix also ensures that the Asset Processor processes and compresses the textures appropriately, according to the settings from the `_wrinklemask` texture preset.

## File properties

A blend mask must be an RGBA `.tif` file. The recommended minimum bit depth and resolution is 512x512, 8 bits per channel. 

Supported properties:

- For resolution, any power of 2, up to 4096x4096.

- For bit-depth, up to 32 bits per channel. 

You can choose the bit-depth and resolution of the wrinkle mask textures depending on the fidelity that you need. However, note that a higher resolution and bit-depth comes at the cost of performance.

## Overlapping morph targets
It's possible for multiple overlapping morph targets to be active at once. In this case, the contribution of each wrinkle mask sums together. If applicable, mask blending automatically applies to morph targets when a character animates, given that wrinkle masks exist. 

**Example**

As an example, suppose you have two morph targets and their corresponding wrinkle masks: _left_eyebrow_raised_ and _right_eyebrow_raised_. 

For the _left_eyebrow_raised_ wrinkle mask, imagine that the portion of the forehead directly above the left eyebrow is fully wrinkled using the first wrinkle layer. This means that portion of the mask is bright red, indicating that the first wrinkle layer should be used for the normal. For the portion of the mask that covers the center of the forehead, the mask might be a darker, mid-range red, indicating that the middle of the forehead is only halfway to fully wrinkled when the left eyebrow is raised. For the _right_eybrow_raised_ wrinkle mask, imagine that it's a near-mirror image of the left mask, with the center of the forehead also halfway wrinkled. 

If both the left eyebrow and right eyebrow are fully raised at the same time, then the overlapping values at the center of the forehead from the two masks are added together. This results in the center of the forehead being fully wrinkled by using the first wrinkle layer. When the values from multiple masks are combined, they are clamped to the 0-1 range, so they will never exceed 1 for any given layer.


## Base color and normal map blending
When the wrinkle masks of an active morph target are combined, the resulting RGBA values blend the base color and normal maps of the other wrinkle layers in the skin material. The blending technique is the same as if you used a static model with painted vertex colors instead. 

Unlike the MultiLayerPBR material type, the Skin material type's shader can't combine vertex colors with a blend mask. Instead, it uses the resulting values from the masks for blending and ignores the vertex colors. This occurs across the entire mesh, not just the portion that's impacted by the morph target.

The order of the wrinkle layers impacts the visual result. When blending, the value in the red channel lerps between the base color and wrinkle layer. Then, the result lerps with wrinkle layer 2, by using the value in the green channel. This repeats for wrinkle layers 3 and 4, by using the value in the blue channel and alpha channel, respectively. Thus, the final result is an order-dependent value.

## Limitations
- At most, 16 wrinkle masks can be active at one time. _Active_ means that it has a non-zero weight in the animation. 
- There is no limit as to how many wrinkle masks can exist on a character. If you exceed this limit, the 16 most influential wrinkle masks are used, and the rest are ignored.
- There is no hard limit to the total number of morph targets that can exist on a single actor. This is dictated by your system's memory and performance limitations.
