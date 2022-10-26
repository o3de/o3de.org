---
title: PostFX Layer Component
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

![PostFX Layer base properties](/images/user-guide/components/reference/atom/post-processing-modifiers/postfx-layer.png)

| Property | Description | Values | Default |
| - | - | - | - |
| **Layer Category** | Specifies the layer where PostFX Layer components exist. | Layer Category element | `Default` |
| **Priority in Default** | A priority value that determines the order of this component when blending with multiple PostFX. PostFX Layers with the same Layer Category cannot have the same priority. | `0` to `20` | `0` |
| **Weight** | Manually interpolates the weight of the effect of a PostFX Layer when blending with other PostFX Layers. `0` is the weakest weight and `1` is the strongest. Other Post Processing Volume components can also modulate the weight of this PostFX Layer. | `0.0` to `1.0` | `1.0` |
| **Select Camera Tags Only** | Only camera entities containing the specified tags are affected by this PostFX Layer. | Tag element | Empty |
| **Excluded Camera Tags** | Camera entities containing the specified tags aren't affected by this PostFX Layer. | Tag element | Empty|

## Using Layer Categories

Each PostFX Layer component must be assigned to a Layer Category. Each Layer Category is a key-value pair with a 64-bit integer value that ranks its priority, with `0` being the highest priority. When multiple PostFX Layers are active, they are sorted first by Layer Category value, then by their Priority in Default value within their assigned Layer Category.

To update the preset Layer Category list:

1. Open Asset Editor from the **Tools** menu.

1. In Asset Editor, go to **File** &rarr; **Open**.

1. Search for `default.postfxlayercategories` and open it in Asset Editor.

1. Click the {{< icon "caret-closed.svg" >}} **Layer Categories Caret** to expand the list.

1. Click the {{< icon "add.svg" >}} **Add** button.

1. Provide a Layer Category key (name) and choose **OK** to add a new Layer Category to the list.

1. Modify the Layer Category value if necessary. The default value is `0` which makes this new Layer Category top priority.

1. In Asset Editor, choose **Save** from the **File** menu or press **Ctrl+S** to save your changes.

You can also create a new Layer Category List.

1. In Asset Editor, go to **File** &rarr; **New** &rarr; **PostFx Layer Categories**.

1. Add a new Layer Categories to the list following the steps above.

1. In Asset Editor, choose **Save** from the **File** menu or press **Ctrl+S** to save your changes.


## Using Camera Tags

You can include or exclude Cameras from a PostFX Layer component through **Tag** components applied to camera entities. The specified tags in the **Select Camera Tags Only** and **Excluded Camera Tags** properties must match the camera entity's Tag component.

In this example, the PostFX Entity has a PostFX Layer component that only affects camera entities that have the tag `MainCamera`. This affects Camera Entity, which has the `MainCamera` tag.

![Using camera tags with PostFX Layer](/images/user-guide/components/reference/atom/post-processing-modifiers/postfx-layer-camera-tags-1.png)

![Using camera tags with PostFX Layer](/images/user-guide/components/reference/atom/post-processing-modifiers/postfx-layer-camera-tags-2.png)
