---
linkTitle: Vegetation Asset List
title: Vegetation Asset List Component
description: Organize vegetation assets into reusable asset lists with customized weights and settings in Open 3D Engine (O3DE).
weight: 150
---

Use the **Vegetation Asset List** component to combine your vegetation assets into reusable asset lists.  Configure *Vegetation Asset Descriptors*, asset-specific settings that are only used when the asset is spawned from this component's vegetation layer.  Create Vegetation Descriptor Lists in the **Asset Editor** or define them in the component interface.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Vegetation Asset List properties

{{< tabs name="source-type" >}}
{{% tab name="Embedded Source" %}}

![Vegetation Asset List component properties](/images/user-guide/components/reference/vegetation/vegetation-asset-list-component-embedded.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Source Type** | If set to `Embedded`, vegetation asset descriptors are defined in this component's interface.  If set to `External`, descriptors are defined in a Vegetation Descriptor List asset. | `Embedded` or `External` | `Embedded` |
| **Embedded Assets** | An array of vegetation asset descriptors. |  |  |

### Asset properties

| Property | Description | Values | Default |
|-|-|-|-|
| **Instance Spawner** | Sets the type of asset to spawn. | `Dynamic Slice`, `Empty Space`, or `Prefab` | `Dynamic Slice` |
| **Asset** | Selects the source asset to spawn.<br> <br>*This field is available only if **Instance Spawner** is set to `Dynamic Slice` or `Prefab`.* | Dynamic Slice or Prefab Asset | None |
| **Weight** | Sets the relative density of the asset's instances.  Vegetation assets in the asset list with larger weights will be placed more frequently than assets with smaller weights. | Float: -Infinity to Infinity | `1.0` |
| **Display Per-Item Overrides** | Displays per-asset overrides of Vegetation Modifiers and Filters settings. | Boolean | `Disabled` |

{{% /tab %}}
{{% tab name="External Source" %}}

![Vegetation Asset List component properties](/images/user-guide/components/reference/vegetation/vegetation-asset-list-component-external.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Source Type** | If set to `Embedded`, vegetation asset descriptors are defined in this component's interface.  If set to `External`, descriptors are defined in a Vegetation Descriptor List asset. | `Embedded` or `External` | `Embedded` |
| **External Assets** | Selects the Vegetation Descriptor List asset that provides descriptors for this component. | Vegetation Descriptor List Asset | None |

{{% /tab %}}
{{< /tabs >}}

## DescriptorListRequestBus

Use the following request functions with the `DescriptorListRequestBus` EBus interface to communicate with Vegetation Asset List components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddDescriptor` | Adds a descriptor to an asset list. | Vegetation Descriptor | None | Yes |
| `GetDescriptor` | Returns a vegetation descriptor from an asset list. | Descriptor Index: Integer | Vegetation Descriptor | Yes |
| `GetDescriptorAssetPath` | Returns the **External Assets** source path for an asset list. | None | Path: String | Yes |
| `GetDescriptorListSource` | Returns the **Source Type** of an asset list. Returns `0` for `Embedded` and `1` for `External` source types.| None | List Source Type: Integer | Yes |
| `GetNumDescriptors` | Returns the number of vegetation descriptors in an asset list. | None | Descriptor Index: Integer | Yes |
| `RemoveDescriptor` | Removes a vegetation descriptor from an asset list. | Descriptor Index: Integer | None | Yes |
| `SetDescriptor` | Sets the configuration of a descriptor at a specific asset list index. | Descriptor Index: Integer, Vegetation Descriptor | None | Yes |
| `SetDescriptorAssetPath` | Sets the **External Assets** source path of an asset list. | Path: String | None | Yes |
| `SetDescriptorListSource` | Sets the **Source Type** of an asset list. `0` for `Embedded` and `1` for `External` source types. | List Source Type: Integer | None | Yes |
