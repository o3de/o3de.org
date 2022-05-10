---
title: Mesh Component
linktitle: Mesh
description: 'Open 3D Engine (O3DE) Mesh component reference.'
toc: true
---

The **Mesh** component specifies a model to render in the scene. Model assets are supported and processed using [AssImp](https://www.assimp.org/). 

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Mesh Component properties

![mesh-component-base-properties](/images/user-guide/components/reference/atom/mesh/mesh-base-properties-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Model Asset** | Sets the model asset for this component. | Model Asset | None |
| **Sort Key** | Transparent models are first drawn by sort key, then depth. Use this to force certain transparent models to draw before or after others. | -2,147,483,648 to 2,147,483,647 | `0` |
| **Exclude from reflection cubemaps** | If enabled, the model will not be visible in baked reflection probe cubemaps. | Boolean | `Disabled` |
| **Use Forward Pass IBL Specular** | Renders image-based lighting (IBL) specular reflections in the forward pass, by using only the most influential probe (based on the position of the entity) and the global IBL cubemap. It can reduce rendering costs, but is only recommended for static objects that are affected by at most one reflection probe. | Boolean | `Disabled` |
| **Use ray tracing** | Includes this model in ray tracing calculations. | Boolean | `Enabled` |
| **LOD Type** | Refer to [LOD Type](#lod-type) below. | `Default`, `Screen Coverage`, `Specific LOD` | `Default` |
| **Add Material Component** | Button to add a [Material Component](/docs/user-guide/components/reference/atom/material/) to the entity. | | |
| **Model Stats** | Displays mesh count, vertex count, and triangle count for each LOD in the model. | | |


### LOD Type
**LOD Type** determines how the level of detail (LOD) is selected during rendering.

{{< tabs name="lod-type-ui" >}}
{{% tab name="Default" %}}

![lod-type-default](/images/user-guide/components/reference/atom/mesh/lod-type-ui/mesh-default.png)

**LOD Type**: `Default` uses the configured *default method* for automatically selecting the LOD. O3DE ships using the Screen Coverage method as the default method. If the *default method* is changed in the future, the component automatically uses the new default.

{{% /tab %}}
{{% tab name="Screen Coverage" %}}

![lod-type-screen-coverage](/images/user-guide/components/reference/atom/mesh/lod-type-ui/mesh-screen-coverage.png)

**LOD Type**: `Screen Coverage` determines which LOD to render based on the approximate proportion of the screen that the LOD covers.

| Property | Description | Values | Default |
|-|-|-|-|
| **LOD Configuration - Minimum Screen Coverage** | Minimum proportion of screen area that the entity will cover. If the entity is smaller than the minimum coverage, it is culled. | 0.0 to 1.0 | 1.0f / 1080.0f |
| **LOD Configuration - Quality Decay Rate** | Rate at which the mesh quality decays. <br><br>`0` - Always stays at highest quality LOD. <br><br>`1` - Immediately falls off to lowest quality LOD. | 0.0 to 1.0 | 0.5 |

{{% /tab %}}
{{% tab name="Specific LOD" %}}

![lod-type-specific-lod](/images/user-guide/components/reference/atom/mesh/lod-type-ui/mesh-specific-lod.png)

**LOD Type**: `Specific LOD` specifies the LOD to render, overriding the automatic LOD calculations.

| Property | Description | Values | Default |
|-|-|-|-|
| **LOD Configuration - LOD Override** | Sets the specific LOD to render. The number of LODs depends on how many LODs the asset has. | LOD 0 (Highest Detail) to LOD *n*, where *n* is the lowest detail LOD | LOD 0 (Highest Detail) |

{{% /tab %}}
{{< /tabs >}}

## MeshComponentRequestBus

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `SetModelAsset` | Sets the model asset used by the component. | Model Asset: Asset<T> | None | No |
| `GetModelAsset` | Returns the model asset used by the component. | None | Model Asset: Asset<T> | No |
| `SetModelAssetId` | Sets the model used by the component via its AssetId. | Model AssetId: AssetId | None | Yes |
| `GetModelAssetId` | Returns the AssetId for the model used by the component. | None | Model AssetId: AssetId | Yes |
| `SetModelAssetPath` | Sets the model used by the component via its path. | Asset Path: String | None | Yes |
| `GetModelAssetPath` | Returns the path for the model used by the component. | None | Asset Path: String | Yes |
| `GetModel` | Returns the model instance used by the component. | None | Model: Instance<T> | No |
| `SetSortKey` | See [Sort Key](#mesh-component-properties) | Draw Item Sort Key: Integer | None | Yes |
| `GetSortKey` | See [Sort Key](#mesh-component-properties) | None | Draw Item Sort Key: Integer | Yes |
| `SetLodType` | See [LOD Type](#lod-type) | LOD Type: Enum | None | Yes |
| `GetLodType` | See [LOD Type](#lod-type) | None | LOD Type: Enum | Yes |
| `SetLodOverride` | See [LOD Type: Specific LOD Tab](#lod-type) | LOD Override: Integer | None | Yes |
| `GetLodOverride` | See [LOD Type: Specific LOD Tab](#lod-type) | None | LOD Override: Integer | Yes |
| `SetMinimumScreenCoverage` | See [LOD Type: Screen Coverage Tab](#lod-type) | Minimum Screen Coverage: Float | None | Yes |
| `GetMinimumScreenCoverage` | See [LOD Type: Screen Coverage Tab](#lod-type) | None | Minimum Screen Coverage: Float | Yes |
| `SetQualityDecayRate` | See [LOD Type: Screen Coverage Tab](#lod-type) | Quality Decay Rate: Float | None | Yes |
| `GetQualityDecayRate` | See [LOD Type: Screen Coverage Tab](#lod-type) | None | Quality Decay Rate: Float | Yes |
| `SetVisibility` | Sets if the model should be visible (true) or hidden (false). | Visibility: Boolean | None | No |
| `GetVisibility` | Returns the visibility. If the model is visible (true), that only means that it has not been explicitly hidden. The model may still not be visible by any views being rendered. If it is not visible (false), it will not be rendered by any views, regardless of whether or not the model is in the view frustum. | None | Visibility: Boolean | No |
| `SetRayTracingEnabled` | See [Use Ray Tracing](#mesh-component-properties) | Is Ray Tracing Enabled: Boolean | None | Yes |
| `GetRayTracingEnabled` | See [Use Ray Tracing](#mesh-component-properties) | None | Is Ray Tracing Enabled: Boolean | Yes |
| `GetWorldBounds` | Returns the axis-aligned bounding box for the model at its world position. | None | World Bounds: Aabb | No |
| `GetLocalBounds` | Returns the axis-aligned bounding box in model space. | None | Local Bounds: Aabb | No |
## MeshComponentNotificationBus

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnModelReady` | Notifies listeners when a model has been loaded. If the model is already loaded when first connecting to the `MeshComponentNotificationBus`, the `OnModelReady` event will occur when connecting. | Model Asset: `Asset<T>`, Model: `Instance<T>` | None | Yes |
| `OnModelPreDestroy` | Notifies listeners when the instance of the model for this component is about to be released. | None | None | No |