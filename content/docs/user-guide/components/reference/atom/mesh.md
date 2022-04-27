---
title: Model (Mesh) Component
linktitle: Model (Mesh)
description: 'Open 3D Engine (O3DE) Model (Mesh) component reference.'
toc: true
---

The **Model (Mesh)** component specifies a model to render in the scene. Model assets are supported and processed using [AssImp](https://www.assimp.org/). 

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Model (Mesh) Component Properties
![model-mesh-component-base-properties](/images/user-guide/components/reference/atom/model-mesh/model-mesh-base-properties-ui.png)
<a name="model-mesh-component-properties"></a>
| Property | Description | Values | Default |
|-|-|-|-|
| **Model asset** | Sets the model asset for this component. | Model Asset | None |
| **Sort Key** | <a name="sort-key"> Transparent models are drawn by sort key then depth. Use this to force certain transparent models to draw before or after others. </a> | -2,147,483,648 to 2,147,483,647 | 0 |
| **Exclude from reflection cubemaps** | If enabled, the model will not be visible in baked reflection probe cubemaps. | Boolean | `Disabled` |
| **Use Forward Pass IBL Specular** | Renders IBL specular reflections in the forward pass, using only the most influential probe (based on the position of the entity) and the global IBL cubemap. Can reduce rendering costs, but only recommended for static objects that are affected by at most one reflection probe. | Boolean | `Disabled` |
| **Use ray tracing** | Includes this model in ray tracing calculations. | Boolean | `Enabled` |
| **Lod Type** | Refer to [Lod Type](#lod-type) below. | `Default`, `Screen Coverage`, `Specific Lod` | `Default` |Default (Highest) |
| **Add Material Component** | Button to add a [Material Component](/docs/user-guide/components/reference/atom/material/) to the entity | | |
| **Model Stats** | Displays mesh count, vertex count, and triangle count for each lod in the model | | |


### Lod Type
Determines how Lods will be selected during rendering.

{{< tabs name="lod-type-ui" >}}
{{% tab name="Default" %}}

![lod-type-default](/images/user-guide/components/reference/atom/model-mesh/lod-type-ui/model-mesh-default.png)

Uses the default method for automatically selecting the lod. Leaving Lod Type set to default ensures that if the default method is changed in the future, the component will automatically use the new default. O3DE ships using the Screen Coverage method by default.

{{% /tab %}}
{{% tab name="Screen Coverage" %}}

![lod-type-screen-coverage](/images/user-guide/components/reference/atom/model-mesh/lod-type-ui/model-mesh-screen-coverage.png)

Determines which lod should be rendered based on the approximate proportion of the screen the lod will take up.

| Property | Description | Values | Default |
|-|-|-|-|
| **Lod Configuration - Minimum Screen Coverage** | Minimum proportion of screen area an entity takes up. If the entity is smaller than the minimum coverage, it is culled. | 0.0 to 1.0 | 1.0f / 1080.0f |
| **Lod Configuration - Quality Decay Rate** | Rate at which mesh quality decays (0 -> always stay highest quality lod, 1 -> quality falls off to lowest quality lod immediately). | 0.0 to 1.0 | 0.5 |

{{% /tab %}}
{{% tab name="Specific Lod" %}}

![lod-type-specific-lod](/images/user-guide/components/reference/atom/model-mesh/lod-type-ui/model-mesh-specific-lod.png)

Overrides the lod to be rendered instead of calculating the lod automatically.

| Property | Description | Values | Default |
|-|-|-|-|
| **Lod Configuration - Lod Override** | Sets the specific lod to render. | Default (Highest) to Lod *n*, where *n* is the lowest resolution lod | Highest |

{{% /tab %}}
{{< /tabs >}}

## MeshComponentRequestBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| SetModelAsset | Sets the model asset used by the component. | Model Asset: Asset<T> | None | No |
| GetModelAsset | Returns the model asset used by the component. | None | Model Asset: Asset<T> | No |
| SetModelAssetId | Sets the model used by the component via its AssetId. | Model AssetId: AssetId | None | Yes |
| GetModelAssetId | Returns the AssetId for the model used by the component. | None | Model AssetId: AssetId | Yes |
| SetModelAssetPath | Sets the model used by the component via its path. | Asset Path: String | None | Yes |
| GetModelAssetPath | Returns the path for the model used by the component. | None | Asset Path: String | Yes |
| GetModel | Returns the model instance used by the component. | None | Model: Instance<T> | No |
| SetSortKey | See [Sort Key](#model-mesh-component-properties) | DrawItemSortKey: Integer | None | Yes |
| GetSortKey | See [Sort Key](#model-mesh-component-properties) | None | DrawItemSortKey: Integer | Yes |
| SetLodType | See [Lod Type](#lod-type) | Lod Type: Enum | None | Yes |
| GetLodType | See [Lod Type](#lod-type) | None | Lod Type: Enum | Yes |
| SetLodOverride | See [Lod Type: Specific Lod Tab](#lod-type) | Lod Override: Integer | None | Yes |
| GetLodOverride | See [Lod Type: Specific Lod Tab](#lod-type) | None | Lod Override: Integer | Yes |
| SetMinimumScreenCoverage | See [Lod Type: Screen Coverage Tab](#lod-type) | Minimum Screen Coverage: Float | None | Yes |
| GetMinimumScreenCoverage | See [Lod Type: Screen Coverage Tab](#lod-type) | None | Minimum Screen Coverage: Float | Yes |
| SetQualityDecayRate | See [Lod Type: Screen Coverage Tab](#lod-type) | Quality Decay Rate: Float | None | Yes |
| GetQualityDecayRate | See [Lod Type: Screen Coverage Tab](#lod-type) | None | Quality Decay Rate: Float | Yes |
| SetVisibility | Sets if the model should be visible (true) or hidden (false). | Visibility: Boolean | None | No |
| GetVisibility | Returns the visibility. If the model is visible (true), that only means that it has not been explicitly hidden. The model may still not be visible by any views being rendered. If it is not visible (false), it will not be rendered by any views, regardless of whether or not the model is in the view frustum. | None | Visibility: Boolean | No |
| SetRayTracingEnabled | See [Use Ray Tracing](#model-mesh-component-properties) | Is Ray Tracing Enabled: Boolean | None | Yes |
| GetRayTracingEnabled | See [Use Ray Tracing](#model-mesh-component-properties) | None | Is Ray Tracing Enabled: Boolean | Yes |
| GetWorldBounds | Returns the axis-aligned bounding box for the model at its world position. | None | World Bounds: Aabb | No |
| GetLocalBounds | Returns the axis-aligned bounding box in model space. | None | Local Bounds: Aabb | No |
## MeshComponentNotificationBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| OnModelReady | Notifies listeners when a model has been loaded. If the model is already loaded when first connecting to the MeshComponentNotificationBus, the OnModelReady event will occur when connecting. | Model Asset: Asset<T>, Model: Instance<T> | None | Yes |
| OnModelPreDestroy | Notifies listeners when the instance of the model for this component is about to be released | None | None | No |