---
title: Material Component
linktitle: Material
description: 'Open 3D Engine (O3DE) Material component reference.'
toc: true
---

Use the **Material** component to inspect and customize materials and properties on entities with compatible render components. Currently, only the [Mesh component](/docs/user-guide/components/reference/atom/mesh/) and the [Actor component](/docs/user-guide/components/reference/animation/actor/) support the Material component. However, any component can support the Material component by implementing the required buses and services. The Material component uses material assets, which you can create and configure using the Material Editor. Another way that material assets are produced is by the Asset Processor and the Model Asset Builder. This exports the materials defined within a source model, like an FBX file.

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Material Component Properties
By default, the Material component contains only the **Default Material** property. The Material component reveals other property groups, **Model Materials** and **LOD Materials**, via `MaterialConsumerRequestBus`. For example, the Mesh component implements `MaterialConsumerRequestBus` to describe materials required by its model asset. The Mesh component sends notifications via `MaterialConsumerNotificationBus` whenever material requirements change. If that model asset requires five unique materials, then the **Model Materials** property group displays five model material slots. Furthermore, if the model asset contains three LODs, then the **LOD Materials** property group shows three LOD material groups with their own material slots.

| Description | Screenshot |
|-|-|
| Default | ![material-component-base-properties](/images/user-guide/components/reference/atom/material/material-base-properties-ui.png) |
| Simple | ![material-component-slot-properties](/images/user-guide/components/reference/atom/material/material-slot-properties-ui.png) |
| Complex | ![material-component-extended-slot-properties](/images/user-guide/components/reference/atom/material/material-extended-slot-properties-ui.png) |

## Material Component Features

| Description | Screenshot |
|-|-|
| The Material Component context menu contains many options for clearing all materials, model materials, and LOD materials. The menu has actions for eliminating unused material assignments and properties that might remain from a previously assigned model or if the Material Component is copied and pasted to a new entity. Most of these options correspond to functions on the MaterialComponentRequestBus detailed below. | ![material-componen-menu](/images/user-guide/components/reference/atom/material/material-menu-ui.png) |
| There is also a context menu available for each material slot. This menu gives options for opening the dedicated Material Editor, opening Material Instance Inspector windows for customizing material properties on selected entities, and more.  | ![material-component-slot-menu](/images/user-guide/components/reference/atom/material/material-slot-menu-ui.png) |
| The **Generate/Manage Source Materials** dialog allows you to export and automatically assign `.material` source files from the Material component. If your workflow doesn't require `.material` source files, then you can customize materials directly on entities using the **Material Instance Inspector**.<br><br>You can access this dialog by clicking **Generate/Manage Source Materials...** in the context menu or the button at the top of the Material component. The dialog displays a list of the unique materials that are associated with each material slot. You can configure the target file names to save the materials as, or use the default. Afterwards, the dialog will generate the `.material` source file files and automatically assign them to every matching material slot. Then, you can open and edit the `.material` source files using the Material Editor, and share them with other entities.  <br><br>Even though you’re not required to use this dialog, it can help simplify the process of assigning materials that are shared by multiple entities. For example, if you select multiple entities that share the same set of material slots and open the dialog from their context menu, then the generated materials get automatically assigned on every entity. This dialog can also be useful for building a material library based on materials embedded in an FBX or other source. | ![material-componen-generate](/images/user-guide/components/reference/atom/material/material-generate-ui.png) |
| The **Material Instance Inspector** provides the same features as the inspector found in the Material Editor. However, instead of creating a child material, this tool allows you to customize material properties by overriding the values of the asset that’s assigned to the material slot. The changes you make are applied to the entity in real time, visible in the viewport and previews. <br><br>You can open the Material Instance Inspector from the context menu by selecting **Edit Material Instance…** or **Edit Source Material…** . This window remains open and locks to the entity and material slot selection until you manually close it. If the entity or selected material slot becomes invalid or unavailable, the window will be disabled.| ![material-componen-inspector](/images/user-guide/components/reference/atom/material/material-inspector-ui.png) |

| Property | Description | Values | Default |
|-|-|-|-|
| **Generate/Manage Source Materials...** | This button opens the **Generate/Manage Source Materials** dialog. | | |
| **Default Material** | The default material applies to the entire model, except for parts where a higher priority model or LOD material is assigned. | Material Asset | None |
| **Model Materials** | Materials that are assigned to these slots are applied to every part of the model with the same material slot name, unless a higher priority LOD material is assigned. | Container of material assets | Empty |
| **Enable LOD Materials** | When this flag is enabled, materials can be customized per LOD. | Boolean | `Disabled` |
| **LOD Materials** | Materials assigned to LOD material slots override **Default Material** and **Model Material** assignments for the given LOD. If you change the default material or model materials and don't see those changes applied, then verify that there's no LOD material taking higher priority or disable them completely. | Container of material assets organized by LOD | Empty |

## MaterialComponentRequestBus
This request bus supplies the interface for interacting with the Material component. It contains many of the functions that relate to inspecting or customizing materials and properties. All of the functions are available in the editor, gameplay, and simulation. Many of them may be more useful for extending Material component related tools and scripts. 

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| 'GetDefautMaterialMap' | Returns a map of available material slots and their default assignments. | None | Unmodified Material Slot Layout: MaterialAssignmentMap | Yes |
| 'FindMaterialAssignmentId' | Searches for and returns the MaterialAssignmentId matching the LOD index and label substring. Use LOD index of -1 for default and model materials. If no matching material is found the default material will be returned. | LOD Index: Integer, Label: String | Material Assignment Slot ID: MaterialAssignmentId | Yes |
| 'GetDefaultMaterialAssetId' | Return the default material asset for a material slot | Material Assignment Slot ID: MaterialAssignmentId | Material Asset ID: AssetId | Yes |
| GetMaterialLabel' | Return the unique display name for a material slot | Material Assignment Slot ID: MaterialAssignmentId | Label: String | Yes |
| 'SetMaterialMap' | Replace all material and property customization data for a material slot | Material Overrides: MaterialAssignmentMap | None | Yes |
| 'GetMaterialMap' | Return all materials and properties for a material slot | None | Material Overrides: MaterialAssignmentMap | Yes |
| 'ClearMaterialMap' | Erase all material and property customizations | None | None | Yes |
| 'ClearMaterialsOnModelSlots' | Clear non-LOD material customizations | None | None | Yes |
| 'ClearMaterialsOnLodSlots' | Clear LOD material customizations | None | None | Yes |
| 'ClearMaterialsOnInvalidSlots' | Clear residual materials that don't correspond to available material slots | None | None | Yes |
| 'ClearMaterialsWithMissingAssets' | Clear any material customizations that reference missing assets | None | None | Yes |
| 'RepairMaterialsWithMissingAssets' | Repair materials that reference missing assets by assigning the default asset for each slot | None | None | Yes |
| 'RepairMaterialsWithRenamedProperties' | Repair materials that reference missing properties by auto-renaming them where possible | None | Number of properties updated: Integer | Yes |
| 'SetMaterialAssetIdOnDefaultSlot' | Convenience function for assigning a material to the default material slot | Material Asset ID: AssetId | None | Yes |
| 'GetMaterialAssetIdOnDefaultSlot' | Convenience function for returning the material assigned to the default material slot | None | Material Asset ID: AssetId | Yes |
| 'ClearMaterialAssetIdOnDefaultSlot' | Convenience function for clearing the material assigned to the default material slot | None | None | Yes |
| 'SetMaterialAssetId' | Set material asset | Material Assignment Slot ID: MaterialAssignmentId, Material Asset ID: AssetId | None | Yes |
| 'GetMaterialAssetId' | Get material asset | Material Assignment Slot ID: MaterialAssignmentId | Material Asset ID: AssetId | Yes |
| 'ClearMaterialAssetId' | Clear material asset | Material Assignment Slot ID: MaterialAssignmentId | None | Yes |
| 'SetPropertyValue' | Set a material property value value wrapped by an AZStd::any | Material Assignment Slot ID: MaterialAssignmentId, Property Name: String, Property Value: AZStd::any | None | Yes |
| 'GetPropertyValue' | Get a material property value value wrapped by an AZStd::any | Material Assignment Slot ID: MaterialAssignmentId, Property Name: String | Property Value: AZStd::any | Yes |
| 'ClearPropertyValue' | Clear a property value for a material slot | Material Assignment Slot ID: MaterialAssignmentId, Property Name: String | None | Yes |
| 'ClearPropertyValues | Clear property values for a material slot | Material Assignment Slot ID: MaterialAssignmentId | None | Yes |
| 'ClearAllPropertyValues' | Clear all property values | None | None | Yes |
| 'SetPropertyValues' | Set property values for a material slot | Material Assignment Slot ID: MaterialAssignmentId , Material Properties: MaterialPropertyValueMap | None | Yes |
| 'GetPropertyValues' | Get property values for a material slot | Material Assignment Slot ID: MaterialAssignmentId | Material Properties: MaterialPropertyValueMap | Yes |
| 'SetModelUvOverrides' | Set model UV values for a material slot | Material Assignment Slot ID: MaterialAssignmentId , Material Model UV Overrides: MaterialModelUvOverrideMap | None | Yes |
| 'GetModelUvOverrides' | Get model UV values for a material slot | Material Assignment Slot ID: MaterialAssignmentId | Material Model UV Overrides: MaterialModelUvOverrideMap | Yes |
| 'SetPropertyValueT | Template convenience function wrapping SetPropertyValue for type safe behavior context bindings | Material Assignment Slot ID: MaterialAssignmentId, property name: String, Property Value: T | None | Yes |
| 'GetPropertyValueT | Template convenience function wrapping GetPropertyValue for type safe behavior context bindings | Material Assignment Slot ID: MaterialAssignmentId, property name: String | Property Value: T | Yes |

## MaterialComponentNotificationBus
These notifications are sent in relation to Material Component state changes during editing and runtime.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| 'OnMaterialsEdited' | This notification is intended for edit time. It should be sent whenever the Material Component configuration is altered outside changing property values using the Entity Inspector. The notification is used to synchronize modified materials and Material Instance Inspectors. | None | None | No |
| 'OnMaterialsUpdated' | This notification is sent by the Material Component whenever material instances are recreated or destroyed as a result of properties being assigned or removed. The notification is queued and only sent once per frame if there were any changes. Anything concerned with material instances, like [Mesh Component](/docs/user-guide/components/reference/atom/mesh/) and [Actor Component](/docs/user-guide/components/reference/animation/actor/), must listen for this notification to assign the correct material instances to their draw packets. | Material Overrides: MaterialAssignmentMap | None | No |
| 'OnMaterialInstanceCreated' | This notification is sent whenever an individual material instance is created by the Material Component. Unique material instances will only be created if the Material Component configuration specifies property overrides that customizes the behavior of a given material. | Material Override: MaterialAssignment | None | No |

## MaterialConsumerRequestBus
A "material consumer" is any component that accepts material and property changes from the Material Component. Implementing this bus provides the Material Component with details about available material slots, default material assets, labels, and other information. This is used to populate the Material Component UI.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| 'FindMaterialAssignmentId' | Searches for and returns the MaterialAssignmentId matching the LOD index and label substring. Use LOD index of -1 for default and model materials. If no matching material is found the default material will be returned. | LOD Index: Integer, Label: String | Material Assignment Slot ID: MaterialAssignmentId | Yes |
| 'GetMaterialAssignments' | Returns a map of available material slots and their default assignments | None | Unmodified Material Slot Layout: MaterialAssignmentMap | Yes |
| 'GetModelMaterialSlots' | Returns a map containing details about the available material slots like a stable ID and label name. [Mesh Component](/docs/user-guide/components/reference/atom/mesh/) and [Actor Component](/docs/user-guide/components/reference/animation/actor/) extract this data from model assets but the same data could be provided by any other rendering components. | None | Material Slot Layout: ModelMaterialSlotMap | No |
| 'GetModelUvNames' | Returns a map of available UV channel names that can be remapped per material using the Material Component. | None | Model UV Channel Names: AZStd::unordered_set<AZ::Name> | Yes |

## MaterialConsumerNotificationBus
This notification bus is used to inform the Material Component and its editor equivalent of changes in the layout and default values of available material slots. Notifications consumed from this bus inform the editor Material Component that UI changes need to occur. 

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| 'OnMaterialAssignmentsChanged' | This notification must be sent by the material consumer whenever available material slots change. Once the editor Material Component consumes this notification, it will rebuild the UI for the available slots to reflect what can be customized on the material consumer. | None| None | No |
