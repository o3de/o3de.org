---
title: PostFX Layer component
linktitle: PostFX Layer
description: 'Open 3D Engine (O3DE) PostFX Layer component reference.'
toc: true
---

The **PostFx Layer** component controls how post-processing effects (PostFX), such as Bloom, Deferred Fog, and Depth of Field, are applied in a scene. For example, you can control how various PostFX blend or set which cameras are affected by the PostFX layer.

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

None


## Base properties

![PostFX Layer base properties](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-layer.png)

| Property | Description | Values | Default |
| - | - | - | - |
| Layer Category | Specifies the layer where PostFX Layer components exist. | Layer Category element | `Default` |
| Priority in Default | A priority value that determines the order of this component when blending with multiple PostFX. PostFX Layers with the same Layer Category cannot have the same priority. | `0` to `20` | `0` |
| Weight | Manually interpolates the weight of the effect of a PostFX Layer when blending with other PostFX Layers. `0` is the weakest weight and `1` is the strongest. Other Post Processing Volume components can also modulate the weight of this PostFX Layer. | `0.0` to `1.0` | `1.0` |
| Select Camera Tags Only | Enforces the PostFx Layer to only affect camera entities with the indicated tag. | Tag element | Empty |
|Excluded Camera Tags | Camera entities containing the indicated tag are not affected by this component. | Tag element | Empty|

## Using Layer Categories

A PostFX Layer component must exist within a layer. Each layer category is associated with a number that ranks its priority, with `0` being the highest. Layer Categories are represented by a 64-bit integer. Blending multiple PostFX layers uses the values in the Layer Category and Priority in Default properties.

You can add or update the Layer Categories in the **Asset Editor**. If the Asset Editor isn't open, then enable it from the **Tools** menu.

To add a new Layer Category file:
1. Go to `File` &rarr; `New` &rarr; `PostFx Layer Categories`
2. Create a new Layer Category file.
3. Add a new Layer Category.
   
To update the default Layer Category file:
1. Go to `File` &rarr; `Open`.
2. Search for `default.postfxlayercategories` and open it in the Asset Editor.
3. Add a new Layer Category.


## Using Camera Tags

You can force a PostFX Layer component to only affect or completely ignore camera entities that have a specific tag. The indicated tags in the properties, `Select Camera Tags Only` and `Excluded Camera Tags` must match the camera entity's **Tag** component. 

In this example, the PostFX Entity has a PostFX Layer component that only affects camera entities that have the tag "MainCamera". This affects Camera Entity, which has the "MainCamera" tag. 

![Using camera tags with PostFX Layer](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-layer-camera-tags-1.png)

![Using camera tags with PostFX Layer](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-layer-camera-tags-2.png)