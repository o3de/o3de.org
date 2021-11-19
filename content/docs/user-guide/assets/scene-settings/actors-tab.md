---
linkTitle: Actors Tab
title: Scene Settings Actors Tab
description: Modifiers and options available in the Scene Settings Actors tab to process source assets that have skeletons and skin data for Open 3D Engine (O3DE). 
weight: 400
toc: true
---

Actors are assets (not necessarily characters) with at least one bone and can contain one or more skinned meshes. By default, all actors in the source asset are processed. However, you can manually exclude individual actors. You can also process multiple actors from a single source asset. Each **Actor group** produces its own `.actor` and `.skinmeta` product assets. The runtime product assets appear in **Asset Browser** as children of the source asset.

The Actors tab is available if the source asset contains at least one bone.

## Actors tab properties

![The Scene Settings Actors tab.](/images/user-guide/assets/scene-settings/actors-tab.png)

| Property | Description |
| - | - |
| **Add another actor** | Add an actor group to process. Each actor group produces its own `.actor` and `.skinmeta` product assets. |
| **Name actor** | The name of the actor group. This is the name of the product asset that's displayed in Asset Browser. |
| **Select root bone** | Specify the root bone of the skeleton hierarchy. The topmost parent bone of the skeleton is selected as the root bone by default. |
| **Add Modifier** | Modifiers add specialized options for processing source assets. Choose the **Add Modifier** button to display a list of available modifiers. Some modifiers are not available unless the gem that provides the modifier is enabled in your project. |

## Comment

![The Scene Settings Meshes tab Comment modifier.](/images/user-guide/assets/scene-settings/comment-modifier.png)

Add a comment to the file for the actor group. You can add a comment about changes made to the source asset file for tracking purposes or notes on export options, for example. Comments don't affect how files are processed. Multiple comment modifiers can be added to an actor group.

## Coordinate system change

The Coordinate system change modifier is used to reorient a 3D scene source to Open 3D Engine's (O3DE) coordinate system. Most digital content creation (DCC) applications use a right-handed coordinate system with **Y** as the up axis. O3DE's coordinate system is left-handed with **Z** as the up axis.

The Coordinate system change modifier has the following two modes:

### Basic coordinate system change

![The Scene Settings Meshes tab Coordinate system change modifier basic settings.](/images/user-guide/assets/scene-settings/coordinate-system-change-modifier-1.png)

| Property | Description |
| - | - |
| **Facing direction** | Apply a 180 degree rotation around the up axis when product assets are processed. This property can be used to reorient the product assets to O3DE's forward axis, when the forward axis of the source asset aims toward the viewer (which is the default case in most DCC applications). |
| **Use Advanced Settings** | When active, this property exposes the **Advanced coordinate system change** properties. |

### Advanced coordinate system change

![The Scene Settings Actors tab Coordinate system change modifier advanced settings.](/images/user-guide/assets/scene-settings/coordinate-system-change-modifier-2.png)

Change the **Translation** (position), **Rotation** (orientation), and **Scale** of a mesh relative to how it was authored.

| Property | Description |
| - | - |
| **Relative Origin Node** | Select the source asset node that serves as the origin for the actor group. The actor group is transformed relative to the selected node. The node does not need to be part of the actor group. Generally, the `RootNode` of the source asset is selected here as it represents the scene origin of the source asset. There are cases, however, where it might be preferable to apply the transform relative to a bone or mesh in the source file that is not the `RootNode`. |
| **Translation** | Set the position offset of the product asset. This property is most commonly used to center the product asset or align the product asset with the ground.  |
| **Rotation** | Set the orientation offset of the product asset in degrees. This property is most commonly used to reorient a product asset to O3DE's coordinate system. |
| **Scale** | Set the scale offset of the product asset. O3DE's base unit is one meter. This property is most commonly used to uniformly scale product assets from DCC applications that use centimeters or inches as base units. |

## Scale actor

![The Scene Settings Actors tab Scale actor modifier.](/images/user-guide/assets/scene-settings/scale-actor-modifier.png)

Set a uniform scale for the actor group. This setting is useful if the source asset is created in a DCC application that uses a different base standard unit of measurement than O3DE.

| Property | Description |
| - | - |
| **Scale factor** | The actor is uniformly scaled by this value. |

## Skeleton LOD

![The Scene Settings Actors tab Skeleton lod modifier.](/images/user-guide/assets/scene-settings/skeleton-lod-modifier.png)

A Skeleton LOD is a simplified skeleton where some leaf bones have been removed from the skeleton. The farther an entity is from the camera, the less detail is required from the actor. Using a character as an example, fine details such as facial animation and individual finger bones may not be required beyond a certain distance from the camera. The corresponding bones for these details can be optimized out of the skeleton. In networked games, the skeletons used on dedicated servers can be optimized to only include bones that transform colliders. Leaf bones that are downstream from colliders can be removed.

You can create up to five LODs for actor groups which are numbered \[`0`\] to \[`4`\], with \[`0`\] being the *highest* level of detail. LODs are not required but are recommended because they help get the best performance and visual fidelity across a range of platforms with different hardware capabilities.

* Choose the {{< icon add.svg >}} **Add** button to add an LOD.

* Choose the {{< icon delete.svg >}} **Delete** button to remove an LOD.

* Choose the {{< icon browse-edit-select-files.svg >}} **Selection list** button to specify the bones to include in the LOD.

{{< important >}}
When deselecting bones in a skeleton LOD, only leaf bones (bones at the end of a bone chain) should be deselected. The bones included in a skeleton LOD should correspond to the bones that the mesh LOD uses. Do not deselect bones that are in the middle of a chain.

For example, LODs for a character's hands might follow the scenario below:

 * **LOD0** - Has individual fingers with a base, middle, and tip bone for each finger.
 * **LOD1** - Finger tip bones for the middle, ring, and pinky fingers are deselected and removed from the LOD. The finger geometry is skinned to the remaining bones.
 * **LOD2** - The middle, ring, and pinky meshes are fused together into a mitt and are skinned to the two middle finger bones. The bones for the ring finger and pinky are deselected and removed from the LOD.
 * **LOD3** - All finger geometry is fused into a mitt and skinned to the base bone of the index finger. The middle and tip bones of the index finger, and the middle finger bones are deselected and removed from the LOD.
 * **LOD4** - All finger geometry is fused and skinned to the hand bone. All finger bones are deselected and removed from the LOD.
{{< /important >}}

## Skeleton optimization

![The Scene Settings Actors tab Skeleton optimization modifier.](/images/user-guide/assets/scene-settings/skeleton-optimization-modifier.png)

Skeleton optimization provides a few options for automatically generating skeleton LODs.

| Property | Description |
| - | - |
| **Auto Skeleton LOD** | When active, client side skeleton LODs are automatically generated based on skin weight data. Leaf bones that don't have skin weights in the corresponding mesh LOD are optimized out of the skeleton. |
| **Server Skeleton Optimize** | When active, server side skeleton LODs are automatically generated based on hit detection colliders. Leaf bones that don't have colliders are optimized out of the skeleton. |
| **Critical bones** | Choose the {{< icon browse-edit-select-files.svg >}} **Selection list** button to select bones that won't be optimized out during automatic LOD generation. This is useful for scenarios where leaf bones don't have skin weights but are used for attachments, such as a character holding an object. |
