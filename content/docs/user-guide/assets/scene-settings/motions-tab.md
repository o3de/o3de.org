---
linkTitle: Motions Tab
title: Scene Settings Motions Tab
description: Modifiers and options available in the Scene Settings Motions tab to process animation source assets for Open 3D Engine (O3DE). 
weight: 500
toc: true
---

You can process animation sequences from a source asset as **Motions**. Each motion in Scene Settings produces its own `.motion` product asset. The runtime product assets appear in **Asset Browser** as children of the source asset.

{{< important >}}
Animation in your source asset should be *baked*, that is, each animated channel should be keyed at every frame. Digital content creation (DCC) applications might use functions and simulations to interpolate between keyframes and the results might not be accurately represented in the source asset unless the animation is baked.
{{< /important >}}

For more information, see [Animation Editor File Types](/docs/user-guide/visualization/animation/character-editor/file-types/).

The Motions tab is available if the source asset contains a skeleton with keyframe animation.

## Motions tab properties

![The Scene Settings Motions tab.](/images/user-guide/assets/scene-settings/motions-tab.png)

| Property | Description |
| - | - |
| **Add another motion** | Add a motion to process. Each motion produces a single `.motion` product asset. |
| **Name motion** | The name of the motion. This is the name of the product asset that's displayed in Asset Browser. |
| **Select root bone** | Specify the root bone of the animated skeleton hierarchy. The topmost parent bone of the skeleton is selected as the root bone by default. |
| **Add Modifier** | Modifiers add specialized options for processing source assets. Choose the **Add Modifier** button to display a list of available modifiers. Some modifiers are not available unless the gem that provides the modifier is enabled in your project. |

## Additive motion

![The Scene Settings Motions tab Additive motion modifier.](/images/user-guide/assets/scene-settings/additive-motion-modifier.png)

Create an additive motion. Additive motions can be layered on top of base motions without affecting the base motion functionality.

| Property | Description |
| - | - |
| **Base Frame** | Specify the number of the base frame that contains the reference pose. |

## Comment

![The Scene Settings Motions tab Comment modifier.](/images/user-guide/assets/scene-settings/comment-modifier.png)

Add a comment to the file for the motion. You can add a comment about changes made to the source asset file for tracking purposes or notes on export options, for example. Comments don't affect how files are processed. Multiple comment modifiers can be added to a motion.

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

![The Scene Settings Meshes tab Coordinate system change modifier advanced settings.](/images/user-guide/assets/scene-settings/coordinate-system-change-modifier-2.png)

Change the **Translation** (position), **Rotation** (orientation), and **Scale** of a mesh relative to how it was authored.

| Property | Description |
| - | - |
| **Relative Origin Node** | Select the source asset node that serves as the origin for the motion. The motion is transformed relative to the selected node. The node does not need to be part of the animated skeleton. Generally, the `RootNode` of the source asset is selected here as it represents the scene origin of the source asset. There are cases, however, where it might be preferable to apply the transform relative to a bone or mesh in the source file that is not the `RootNode`. |
| **Translation** | Set the position offset of the product asset. This property is most commonly used to center the product asset or align the product asset with the ground.  |
| **Rotation** | Set the orientation offset of the product asset in degrees. This property is most commonly used to reorient a product asset to O3DE's coordinate system. |
| **Scale** | Set the scale offset of the product asset. O3DE's base unit is one meter. This property is most commonly used to uniformly scale product assets from DCC applications that use centimeters or inches as base units. |

## Motion range

![The Scene Settings Motions tab Motion range modifier.](/images/user-guide/assets/scene-settings/motion-range-modifier.png)

Set the range of the animation for the motion. This is used to extract motions from source assets where several animation segments are included within a single frame range, one after another.

| Property | Description |
| - | - |
| **Start frame** | Specify the start keyframe of the motion. |
| **End frame** | Specify the end keyframe of the motion. |

## Motion sampling

![The Scene Settings Motions tab Motion sampling modifier.](/images/user-guide/assets/scene-settings/motion-sampling-modifier.png)

When an actor has a complex skeleton, many animation sequences, or long animation sequences, the motion product assets can have high resource requirements. Motion sampling has several properties you can use to balance the quality and performance of the motion and the size of the motion product assets.

| Property | Description |
| - | - |
| **Motion data type** | Defines how motion data is stored. The default setting, `Automatic`, creates the highest possible quality animation within the memory limits. `Evenly spaced keyframes` creates motion product assets that might be more accurate to the source asset, but might require more memory. `Reduced keyframes` optimizes keyframes and generates product assets that require less memory, but take longer to process. |
| **Sample rate** | The samples rate is in fames per second (FPS). `From source scene` uses the sample rate specified in the source asset. `Custom sample rate` exposes the **Custom sample rate** property. |
| **Custom sample rate** | Specify a sample rate for the motion in frames per second (FPS). Values can range from `1` to `240`. Larger values can produce smoother, higher-fidelity motion product assets at the cost of memory requirements. |
| **Translation quality (%)** | Set the quality for bone translations. Lower percentage values will produce fewer keyframes on bone translation animations and save memory, but reduce animation quality. |
| **Rotation quality (%)** | Set the quality for bone rotations. Lower percentage values will produce fewer keyframes on bone rotation animations and save memory, but reduce animation quality. |
| **Scale quality (%)** | Set the quality for bone scale. Lower percentage values will produce fewer keyframes on bone scale animation and save memory, but reduce animation quality. |
| **Allowed memory overhead (%)** | The percentage of additional memory that can be used compared to the smallest product asset size. Increasing this value can improve animation quality, while clamping the memory requirements for product assets. |
| **Keep duration** | When active, the duration of the motion product asset is the same as the scene asset even if no bones are animated. Otherwise, the duration depends on whether the bones are animated. |

## Scale motion

![The Scene Settings Motions tab Scale motion modifier.](/images/user-guide/assets/scene-settings/scale-motion-modifier.png)

Set a uniform scale for the motion. This setting is useful if the source asset is created in a DCC application that uses a different base standard unit of measurement than O3DE.

| Property | Description |
| - | - |
| **Scale factor** | The motion is uniformly scaled by this value. |
