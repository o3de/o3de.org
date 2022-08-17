---
linktitle: Wrinkle Masks for Skin Materials
title: "Wrinkle Mask Workflow"
description: "Learn about how to drive the blending between wrinkle maps with morph targets."
toc: true
weight: 200
---  

This document describes the workflow for driving the blending of different wrinkle layers in the [Skin Material Type](https://github.com/o3de/o3de/blob/development/Gems/Atom/Feature/Common/Assets/Materials/Types/Skin.materialtype) using morph targets. It can be seen in action in the [Old World teaser](https://www.youtube.com/watch?v=ebr8t_mz8p8) that came out with O3DE's launch. Following this workflow will allow for the automatic blending between wrinkle layers driven by the active morph targets of the actor component.

{{< important >}}
This workflow represents a minimum viable product for animating wrinkle masks. There are a number of aspects that could use feedback on how to improve, such as how the normal maps and blend masks are blended, and the potential need for corrective blend masks. If you are using this feature, please reach out to [sig-graphics-audio on Discord](https://discord.com/channels/805939474655346758/816043793576886273) with your suggestions!
{{< /important >}}

## Folder Structure and Naming Conventions
In the folder that `<mycharacter>.fbx` is in, add a `<mycharacter>_wrinklemasks` folder. Using this exact naming convention, the Asset Processor will associate any wrinkle masks in the wrinkle mask folder with morph targets from the .fbx.

![Folder Naming Convention](/images/atom-guide/materials/skin/wrinkle-mask-folder-naming-convention.png)

In the `<mycharacter>_wrinklemasks` folder add one blend mask for each morph target that activates the wrinkle layers. If the morph target does not activate any wrinkle layers at all, it does not need a mask. The name of each mask must match the name of the morph target/blend shape/shape key in the fbx. If you rename the blend shape in the fbx, you must rename the wrinkle mask. Each mask is an independent file, and there is no limitation on how many wrinkle masks you can add to a character, although there will be at most 16 active at any one time.

![Wrinkle Mask File Naming Convention](/images/atom-guide/materials/skin/wrinkle-mask-file-naming-convention.png)

Here you can see that the wrinkle mask file names above match the morph target (shape key in Blender) names below, ending with _wrinklemask.tif.

![Shape Key Names in Blender](/images/atom-guide/materials/skin/shape-key-names-in-blender.png)

At present, the masks cannot be shared, so even if you have two morph targets that would use the same mask, you'll have to duplicate the mask texture. The morph targets do not all have to have masks. The morph targets will still function without a mask, they just won't drive the wrinkle layers.

Each mask should be authored as a RGBA .tif file. The skin shader supports up to 4 wrinkle layers (normal and/or basecolor). Each color channel corresponds to the weight of one of the wrinkle layers. So for a material with only one wrinkle layer, all of the masks will be red-only (though the textures themselves will still be RGBA, with all black in the green, blue, and alpha channels). If a material uses two wrinkle layers (for example, one for vertical wrinkles and one for horizontal wrinkles), then each wrinkle mask will be red, green, or a combination of the two.

## Wrinkle Mask Extension
It is important that the masks use the _wrinklemask suffix and .tif extension, since the model builder currently looks for the _wrinklemask.tif extension to see if a mask that corresponds with the morph target exists. The suffix of _wrinklemask also ensures that the textures are processed and compressed appropriately by the asset processor using the correct settings from the _wrinklemask texture preset.

## Wrinkle Mask File Properties
The bit depth and resolution of the textures should not impact the functionality of the skin shader, so use whatever settings match the fidelity you need. We have only tested with 32 bits per channel, 4k textures. 4k is almost certainly excessive for a mask. 512x512 seems like it would be plenty, but it's at your discretion. You should be able to use 8 bits per channel while still having sufficient precision.

## Mask Blending
It is possible for multiple overlapping morph targets to be active at once. In this case, the contribution of each mask will be summed.

As an example, let's say that for the left_eyebrow_raised morph target, the portion of the forehead directly above the left eyebrow is fully wrinkled using the first wrinkle layer. This means that portion of the mask will be bright red, indicating that the first wrinkle layer should be used for the normal. For the portion of the mask that covers the center of the forehead, the mask might be a darker, mid-range red that indicates that the middle of the forehead is only halfway to fully wrinkled when the left eyebrow is raised.

The right_eybrow_raised mask might be a mirror or nearly-mirror image of the left mask, with the center of the forehead also halfway wrinkled. But if both the left eyebrow and right eyebrow are fully raised at the same time, the overlapping values in the center of the forehead from the two masks will be added together, resulting in the center of the forehead being fully wrinkled using the first wrinkle layer.

When the values from multiple masks are combined, they will be clamped in the 0-1 range, so they will never exceed 1 for any given layer.

## Corrective Shapes
It's not clear if corrective shapes will need their own mask. If they are just being used to smooth out the transition between two other shapes, the combined mask values from the other shapes may be enough. Since the blend masks are only additive, a corrective shape will not be able to reduce the influence of a wrinkle layer, only add to it.

## Base Color/Normal Blending
Once the masks for any active morph targets have been combined, the resulting rgba value will be used to blend the base color and normal maps from the different wrinkle layers in the skin material. These will be blended the same way they would have been blended if a static model with painted vertex colors was used.

MultiLayerPBR supports combining vertex colors with a mask for blending between layers. The Skin shader does not. Instead, if any masks exist, the resulting values from the masks will be used for blending and the vertex colors will be ignored (across the entire mesh, not just the portion impacted by the morph target).

The value in the red-channel is used to lerp between the base and wrinkle layer 1. The result is then lerped with wrinkle layer 2 using the value from the green-channel. Then 3 then 4. This results in an order-dependent value, so changing the order of the wrinkle layers impacts the visual result.

## Wrinkle Mask Limits
At most, 16 wrinkle masks can be active at one time. Active, meaning it has a non-zero weight in the animation. You can have more than 16 that exist, as long as they are not all active at the same time. If you exceed this limit, the 16 most influential wrinkle masks will be used, and the rest ignored.

There is no hard limit to the total number of morph targets that can exist on a single actor, only the memory and performance limits you will eventually run into if you go overboard. We do not have guidance on the performance/memory implications of adding more morph targets.
