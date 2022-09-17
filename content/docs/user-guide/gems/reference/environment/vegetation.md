---
linkTitle: Vegetation
title: Vegetation Gem
description: The Vegetation Gem provides tools to place natural-looking vegetation in Open 3D Engine (O3DE).
weight: 400
toc: true
---

The **Vegetation Gem** provides tools for procedurally populating landscapes and environments. These tools are comprised of system and editor components that use a data-driven approach to automatically select, place, and manage vegetation objects dynamically at runtime. You can use these tools to replace or compliment manually placing, editing, and saving every instance in your level. 

Many features of the dynamic vegetation system rely on other Gems and components to supply data about the environment, such as surfaces, images, and gradient signals, to direct where and how vegetation appears. 

## Dependencies

- [Surface Data Gem](/docs/user-guide/gems/reference/environment/surface-data/)
- [Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal/)
- [FastNoise Gem](/docs/user-guide/gems/reference/utility/fast-noise/) (optional)

The [Surface Data Gem](/docs/user-guide/gems/reference/environment/surface-data/) allows a surface, like terrain or meshes, to emit signals or tags that communicate its surface type. For example, with a [Vegetation Surface Mask Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-surface-mask-filter) component, you can choose which types of vegetation can be placed on a particular surface by using an inclusion and exclusion list. You can also recapture the tags as a gradient signal by using the [Surface Mask Gradient](/docs/user-guide/components/reference/gradients/surface-mask-gradient/) component.

The [Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal/) provides components that direct data to the vegetation system, controlling the appearance of dynamic vegetation. Using gradient signals with vegetation modifiers or filters, such as [Position Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-position-modifier) and [Distribution Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-distribution-filter) components, produce realistic, random expressions of vegetation in the world.

## Provides

Entity components:
- [Vegetation Asset List](/docs/user-guide/components/reference/vegetation/vegetation-asset-list)
- [Vegetation Asset List Combiner](/docs/user-guide/components/reference/vegetation/vegetation-asset-list-combiner)
- [Vegetation Asset Weight Selector](/docs/user-guide/components/reference/vegetation/vegetation-asset-weight-selector)
- [Vegetation Layer Blender](/docs/user-guide/components/reference/vegetation/vegetation-layer-blender)
- [Vegetation Layer Blocker](/docs/user-guide/components/reference/vegetation/vegetation-layer-blocker)
- [Vegetation Layer Blocker (Mesh)](/docs/user-guide/components/reference/vegetation/vegetation-layer-blocker-mesh)
- [Vegetation Layer Debugger](/docs/user-guide/components/reference/vegetation/vegetation-layer-debugger)
- [Vegetation Layer Spawner](/docs/user-guide/components/reference/vegetation/layer-spawner)
- [Vegetation Position Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-position-modifier)
- [Vegetation Rotation Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-rotation-modifier)
- [Vegetation Scale Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-scale-modifier)
- [Vegetation Slope Alignment Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-slope-alignment-modifier)
- [Vegetation Altitude Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-altitude-filter)
- [Vegetation Distance Between Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-distance-between-filter)
- [Vegetation Distribution Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-distribution-filter)
- [Vegetation Shape Intersection Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-shape-intersection-filter)
- [Vegetation Slope Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-slope-filter)
- [Vegetation Surface Mask Depth Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-surface-mask-depth-filter)
- [Vegetation Surface Mask Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-surface-mask-filter)

Level components:
- Vegetation System Settings component
- Vegetation Debugger component

System components:
- [Vegetation Area System](/docs/user-guide/components/reference/vegetation/vegetation-area-system)
- [Vegetation Instance System](/docs/user-guide/components/reference/vegetation/vegetation-instance-system)

API: [Vegetation Gem API Reference](https://www.o3de.org/docs/api/gems/vegetation/index.html)

Source code: [`/Gems/docs/user-guide/components/reference/Vegetation/`](https://github.com/o3de/o3de/tree/development/Gems/Vegetation/Code)

## Vegetation Areas

The dynamic vegetation system builds around the concept of *vegetation areas* that describe what, where, how, and if vegetation will generate on surfaces. 
Other systems in the engine register and process Vegetation areas.
They can examine and take action on points in the world, like placing or preventing a vegetation instance.

In **O3DE Editor**, vegetation areas are referred to as *vegetation layers*.
You can add vegetation behaviors to vegetation layers using components that describe, select, reject, or mutate potential vegetation instances. 
These behaviors are called, respectively, vegetation descriptor providers, selectors, filters, and modifiers. 
Each behavior has an interface that extends the system with new features. 
The Vegetation Gem contains several versions of each type, and each type has a unique purpose and effect on the vegetation instances it generates. 
These components expose controls that allow rapid, rule-based, procedural population of any arbitrarily sized part of the world with decorative content. 
Depending on its configuration, a single vegetation layer can generate a small patch of flowers or intelligently blanket the entire world with a convincing variety and groupings of plants and objects.

## Vegetation instances

*Vegetation instances* are the objects placed throughout the world. When you create them, you configure their information using vegetation descriptors. 
These include a unique ID, transform, other attributes, and a reference to the source vegetation descriptor.

In O3DE Editor, vegetation instances appear within a vegetation area. They're procedurally generated based on the configuration of the vegetation area. 

## Vegetation descriptors

*Vegetation descriptors* are structures that specify all of the common details needed to represent a type of vegetation. It includes data for mesh and material assets, the type of vegetation instances it creates, and many advanced parameters that can be enabled to override behavior of most filters and modifiers. Create **Vegetation Descriptors** in the [Vegetation Asset List](/docs/user-guide/components/reference/vegetation/vegetation-asset-list) component or through **Asset Editor**.

| Group Name | Parameter Name | Description | Type |
| --- | --- | --- | --- |
|     | **Weight** | Weight is used during the spawning and selection process as a multiplier that changes the likelihood of one descriptor being chosen over another. | Float |
|     | **Advanced** | When enabled, displays the following advanced settings that are normally hidden. | Bool |
| Position |     | Settings for controlling per-instance overrides to the [Position Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-position-modifier) component. |     |
|     | **Position Override Enabled** | When enabled, the [Position Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-position-modifier) component can use the per-instance override values specified in the descriptor instead of the component configuration. | Bool |
|     | **Position Min X** | Override value for the minimum position offset on the X axis. | Float |
|     | **Position Max X** | Override value for the maximum position offset on the X axis. | Float |
|     | **Position Min Y** | Override value for the minimum position offset on the Y axis. | Float |
|     | **Position Max Y** | Override value for the maximum position offset on the Y axis. | Float |
|     | **Position Min Z** | Override value for the minimum position offset on the Z axis. | Float |
|     | **Position Max Z** | Override value for the maximum position offset on the Z axis. | Float |
| Rotation |     | Settings for controlling per-instance overrides for the [Rotation Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-rotation-modifier) component. |     |
|     | **Rotation Override Enabled** | When enabled, the [Rotation Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-rotation-modifier) component can use the per-instance override values specified in the descriptor instead of the component configuration. | Bool |
|     | **Rotation Min X** | Override value for the minimum rotation offset on the X axis. | Float |
|     | **Rotation Max X** | Override value for the maximum rotation offset on the X axis. | Float |
|     | **Rotation Min Y** | Override value for the minimum rotation offset on the Y axis. | Float |
|     | **Rotation Max Y** | Override value for the maximum rotation offset on the Y axis. | Float |
|     | **Rotation Min Z** | Override value for the minimum rotation offset on the Z axis. | Float |
|     | **Rotation Max Z** | Override value for the maximum rotation offset on the Z axis. | Float |
| Scale |     | Settings for controlling per-instance overrides for the [Scale Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-scale-modifier) component. |     |
|     | **Scale Override Enabled** | When enabled, the [Scale Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-scale-modifier) component can use the per-instance override values specified in the descriptor instead of the component configuration. | Bool |
|     | **Scale Min** | Override value for the minimum scale multiplier. | Float |
|     | **Scale Max** | Override value for the maximum scale multiplier. | Float |
| Altitude Filter |     | Settings for controlling per-instance overrides for the [Altitude Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-altitude-filter) component. |     |
|     | **Altitude Filter Override Enabled** | When enabled, the [Altitude Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-altitude-filter) component can use the per-instance override values specified in the descriptor instead of the component configuration. | Bool |
|     | **Altitude Filter Min** | Override value for the minimum altitude accepted by the filter. | Float |
|     | **Altitude Filter Max** | Override value for the maximum altitude accepted by the filter. | Float |
| **Distance Between Filter (Radius)** |     | Settings for controlling per-instance overrides for the [Distance Between Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-distance-between-filter) component. |     |
|     | **Distance Between Filter Override Enabled** | When enabled, the [Distance Between Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-distance-between-filter) component can use the per-instance override values specified in the descriptor instead of the component configuration. | Bool |
|     | **Bound Mode** | When performing distance checks between two instances, this setting determines whether the radius of the mesh asset is used, as opposed to a manually-entered radius<br><br>Radius<br><br>MeshRadius. |     |
|     | **Radius Min** | User defined radius for distance checks. | Float |
| Surface Slope Alignment |     |     |     |
|     | **Surface Slope Alignment Override Enabled** | When enabled, the [Slope Alignment Modifier](/docs/user-guide/components/reference/vegetation-modifiers/vegetation-slope-alignment-modifier) component can use the per-instance override values specified in the descriptor instead of the component configuration. | Bool |
|     | **Surface Slope Alignment Min** | Override minimum alignment strength. | Float |
|     | **Surface Slope Alignment Max** | Override maximum alignment strength. | Float |
| Slope Filter |     |     |     |
|     | **Slope Filter Override Enabled** | When enabled, the [Slope Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-slope-filter) component can use the per-instance override values specified in the descriptor instead of the component configuration. | Bool |
|     | **Slope Filter Min** | Override minimum slope accepted by filter. | Float |
|     | **Slope Filter Max** | Override maximum slope accepted by filter. | Float |
| Surface Mask Filter |     |     |     |
|     | **Override Mode** | Controls how overrides are considered by the [Surface Mask Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-surface-mask-filter) component<br><br>Disable - Overrides are completely ignored<br><br>Replace - Overrides replace those specified in the component<br><br>Extend - Overrides are added to those specified in the component. |     |
|     | **Inclusion Tags** | A set of surface tags that dictate where vegetation can be placed. | SurfaceTagVector |
|     | **Exclusion Tags** | A set of surface tags that dictate where vegetation will not be placed. | SurfaceTagVector |
| Surface Mask Depth Filter |   |  Settings for controlling per-instance overrides for the [Surface Mask Depth Filter](/docs/user-guide/components/reference/vegetation-filters/vegetation-surface-mask-depth-filter) component.  |     |
|     | **Surface Tags** | A set of surface tags used for depth comparisons. | SurfaceTagVector |
|     | **Upper Distance Range (m)** | A range used for vertical distance comparisons against the closest point with matching surface tags. | Float |
|     | **Lower Distance Range (m)** | A range used for vertical distance comparisons against the closest point with matching surface tags. | Float |

File: [`/Gems/Vegetation/Code/Source/Descriptor.cpp`](https://github.com/o3de/o3de/blob/900bd390b9b11c83a77ac3de651dc9eb3d897270/Gems/Vegetation/Code/Include/Vegetation/Descriptor.h)


## EBus interface

### Vegetation::AreaInfoBus

| Request Name | Description | Parameters | Return |
| --- | --- | --- | --- |
| `GetLayer` | Gets the *layer*, or macro priority value of the vegetation area. `GetLayer` and `GetPriority` are useful to identify a vegetation area when there is multiple overlap. | None | Float |
| `GetPriority` | Gets the micro priority value within a layer. `GetLayer` and `GetPriority` are useful to identify a vegetation area when there is multiple overlap. | None | Float |
| `GetEncompassingAabb` | Gets the axis-aligned bounding box for the entire vegetation area. | None | AZ::Aabb |
| `GetProductCount` | Gets the number of instances currently spawned by this vegetation area. | None | AZ::u32 |
| `GetChangeIndex` | Gets an incrementing number that represents the number of times the Blocker area refreshed since creation. | None | AZ::u32 |

File: [`/Gems/Vegetation/Code/Include/Vegetation/Ebuses/AreaInfoBus.h`](https://github.com/o3de/o3de/blob/0121a0675b53104cfe1d9f6d87bf9b8ac59a4382/Gems/Vegetation/Code/Include/Vegetation/Ebuses/AreaInfoBus.h)

### Vegetation::AreaRequestBus

| Request Name | Description | Parameters | Return |
| --- | --- | --- | --- |
| `PrepareToClaim` | Runs any pre-claim checks or logic, independent of position. | EntityIdStack& stackIds | Bool |
| `ClaimPositions` | Processes a set of points for planting vegetation or performing other operations. | EntityIdStack& stackIds, ClaimContext& context | None |
| `UnclaimPosition` | Handles clean-up whenever the system releases a claimed point. | const ClaimHandle handle | None |

File: [`/Gems/Vegetation/Code/Include/Vegetation/Ebuses/AreaRequestBus.h`](https://github.com/o3de/o3de/blob/0fb9727c67c9ad7885b4af538860920f5ba53bfa/Gems/Vegetation/Code/Include/Vegetation/Ebuses/AreaRequestBus.h)


### Vegetation::DescriptorProviderRequestBus

*Vegetation descriptor providers* supply [Vegetation Layer Spawners](/docs/user-guide/components/reference/vegetation/layer-spawner) and [Blenders](/docs/user-guide/components/reference/vegetation/vegetation-layer-blender) with a list of vegetation descriptors from defined sources. 
The Vegetation Gem comes with components that can either provide descriptors from a list that's defined directly in the component, reference a list of descriptors from externally created assets, or combine multiple descriptor lists together.

| Request Name | Description | Parameters | Return |
| --- | --- | --- | ---  |
| `GetDescriptors` | When a component is ready and has fully loaded all of its assets, this method creates a list of its active descriptors. | DescriptorPtrVec& descriptors | None |

File: [`/Gems/Vegetation/Code/Include/Vegetation/Ebuses/DescriptorProviderRequestBus.h`](https://github.com/o3de/o3de/blob/0fb9727c67c9ad7885b4af538860920f5ba53bfa/Gems/Vegetation/Code/Include/Vegetation/Ebuses/DescriptorProviderRequestBus.h)

### Vegetation::DescriptorSelectorRequestBus

A [Vegetation Layer Spawner](/docs/user-guide/components/reference/vegetation/layer-spawner) component can use *vegetation descriptor selectors* when a vegetation descriptor provider offers multiple options. There is one selector, [Vegetation Asset Weight Selector](/docs/user-guide/components/reference/vegetation/vegetation-asset-weight-selector)component, which chooses based on the selection weight field of a vegetation descriptor.

| Request Name | Description | Parameters | Return|
| --- | --- | --- | ---  |
| `SelectDescriptors` | Uses the input gradient signal and other parameters to reduce the set of descriptors to those eligible for selection. | None | const DescriptorSelectorParams&  <br>DescriptorPtrVec&|

File: [`/Gems/Vegetation/Code/Include/Vegetation/Ebuses/DescriptorSelectorRequestBus.h`](https://github.com/o3de/o3de/blob/0fb9727c67c9ad7885b4af538860920f5ba53bfa/Gems/Vegetation/Code/Include/Vegetation/Ebuses/DescriptorSelectorRequestBus.h)

### Vegetation::ModifierRequestBus

*Vegetation modifiers* add uniqueness or variation to every vegetation instance, by changing the position, rotation, scale, alignment, or any exposed field. 
This allows the same vegetation descriptors throughout a vegetation area, with each instance of the descriptor to appear differently.

| Request Name | Description | Parameters | Return |
| --- | --- | --- | ---   |
| `Execute` | Modify a single vegetation instance based on configuration. | Vegetation::InstanceData | None |
| `GetModifierStage` | Internal: Determines the order in which to run Vegetation Modifier components. | None | Vegetation::ModifierStage |

File: [`/Gems/Vegetation/Code/Include/Vegetation/Ebuses/ModifierRequestBus.h`](https://github.com/o3de/o3de/blob/0fb9727c67c9ad7885b4af538860920f5ba53bfa/Gems/Vegetation/Code/Include/Vegetation/Ebuses/ModifierRequestBus.h)

### Vegetation::FilterRequestBus

Vegetation areas use *vegetation filters* to evaluate every vegetation instance data and decide whether any activity should occur. 
[Vegetation Layer Spawners](/docs/user-guide/components/reference/vegetation/layer-spawner) use filters to determine whether to create vegetation instances. 
They can optionally evaluate filters before or after vegetation modifiers run. 
Evaluating filters before modifiers performs better because it skips unnecessary processing, but it yields less accurate results when position changes occur. 
Evaluating filters after modifiers is accurate because it evaluates the final version of the instance data.

| Request Name | Description | Parameters | Return |
| --- | --- | --- | ---   |
| `Evaluate` | Evaluate if the vegetation described in the InstanceData satisfies the requirements set by a filter. | InstanceData | Bool |
| `GetFilterStage` | Get the filter stage (PreProcess/PostProcess) for when a filter is evaluated. | None | FilterStage |
| `SetFilterStage` | Set the filter stage (PreProcess/PostProcess) for when a filter is evaluated. | FilterStage | None |

File: [`Gems/Vegetation/Code/Include/Vegetation/Ebuses/FilterRequestBus.h`](https://github.com/o3de/o3de/blob/0fb9727c67c9ad7885b4af538860920f5ba53bfa/Gems/Vegetation/Code/Include/Vegetation/Ebuses/FilterRequestBus.h)
