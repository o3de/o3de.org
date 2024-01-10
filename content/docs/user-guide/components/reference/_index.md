---
title: Component Reference
linkTitle: Component Reference
description: Open 3D Engine (O3DE) component reference index.
weight: 100
toc: true
---

Components add functionality to entities in **Open 3D Engine (O3DE)**. An entity can contain any number or combination of components. Some components allow only one instance per entity, and some depend on other components to function.

Components are provided by Gems. To make a component available in **O3DE Editor**, you must add the Gem that provides the component. Though components might belong to the same type, they might not be provided by the same Gem. You can find out which Gem provides a component in the reference topic for the component.

## Add a component to an entity

To add a component to an entity in O3DE Editor:

1. In **Entity Outliner** or **Perspective**, click an entity to select it. This will show the entity's details in **Entity Inspector**. 
1. In Entity Inspector, choose **Add Component**.
1. Select a component from the component list to add to the entity. 

{{< note >}}
If you can't find a component in the **Add Component** list, you may need to enable the Gem that provides the component and rebuild your project.
{{< /note >}}

## Components
The following components are grouped by type as they appear in the O3DE Editor.

<!--
### AI
| Component | Description | 
| - | - |
| [Navigation](/docs/user-guide/components/reference/ai/navigation/) | Provides basic path-finding and path-following services to an entity. |
| [Navigation Area](/docs/user-guide/components/reference/ai/nav-area/) | Configures the area used for navigation and pathfinding. |
| [Navigation Seed](/docs/user-guide/components/reference/ai/nav-seed/) | Determines the reachable navigation nodes along the path.  |
-->


### Animation
| Component | Description |
| - | - |
| [Actor](./animation/actor) | Adds a mesh group bound to a skeleton that can be driven by animation data from Anim Graph or Simple Motion components. |
| [Anim Graph](./animation/animgraph/) | Manages a set of assets that are built in the Animation Editor, including the animation graph, default parameter settings, and assigned motion set for the associated Actor. |
| [Attachment](./animation/attachment/) | Allows an entity to attach to a bone on the skeleton of another entity. |
| [Simple LOD Distance](./animation/simple-lod-distance) | Sets the distance from the camera for each level of detail (LOD) of an Actor. |
| [Simple Motion](./animation/simple-motion/) | Assigns a single motion to the associated Actor. This is a simpler alterative to the Anim Graph component.  |


### Atom Renderer

| Component | Description | 
| - | - |
| [Bloom](/docs/user-guide/components/reference/atom/bloom/) | Simulates real-world light bleeding, or glow. |
| [Chromatic Aberration](/docs/user-guide/components/reference/atom/chromatic-aberration) | Simulates a lens effect that focuses wavelengths of light to different points. |
| [CubeMap Capture](/docs/user-guide/components/reference/atom/cubemap-capture/) | Captures a Specular IBL or Diffuse IBL cubemap at the entity position. |
| [Debug Rendering](/docs/user-guide/components/reference/atom/debug-rendering/) | Level component used to visually inspect and debug the scene. |
| [Decal (Atom)](/docs/user-guide/components/reference/atom/decal/) | Projects a texture material in a single direction onto mesh surfaces. |
| [Deferred Fog](/docs/user-guide/components/reference/atom/deferred-fog/) | Creates a screen space fog effect that can ben used as scene fog or layered / ground fog with an optional cloud noise turbulence. |
| [Depth of Field](/docs/user-guide/components/reference/atom/depth-of-field/) | Simulates the lens effects of real world cameras that focus on a specific area. |
| [Diffuse Global Illumination](/docs/user-guide/components/reference/atom/diffuse-gi/) | Controls the quality level of global illumination that **Diffuse Probe Grid** components provide.  | 
| [Diffuse Probe Grid](/docs/user-guide/components/reference/atom/diffuse-probe-grid/) | Creates a volume of light probes that provide diffuse global illumination within the specified area. |
| [Directional Light](/docs/user-guide/components/reference/atom/directional-light/) | Casts light from an infinitely distant point towards a single direction, similar to sunlight. |
| [Display Mapper](/docs/user-guide/components/reference/atom/display-mapper/) | Configures tone mapping and color grading for the scene. |
| [Entity Reference](/docs/user-guide/components/reference/atom/entity-reference/) | Allows you to provide an entity with references to other entities. |
| [Exposure Control](/docs/user-guide/components/reference/atom/exposure-control/) | Adjusts the amount of light the camera exposes in the scene. |
| [Global Skylight (IBL)](/docs/user-guide/components/reference/atom/global-skylight-ibl/) | Creates an image-based global illumination effect that calculates light for a scene using an HDR skybox image. |
| [Grid](/docs/user-guide/components/reference/atom/grid/) | Adds a customizable grid to the scene. |
| [HDRi Skybox](/docs/user-guide/components/reference/atom/hdri-skybox/) | Creates a skybox in your scene using an HDR image. |
| [Light](/docs/user-guide/components/reference/atom/light) | Simulates soft studio light by creating various types of punctual and area lights. |
| [Look Modification](/docs/user-guide/components/reference/atom/look-modification/) | Configures a color grading look-up table (LUT). |
| [Material](/docs/user-guide/components/reference/atom/material/) | Manage and customize materials that are applied to models, actors, and other compatible components. |
| [Mesh](/docs/user-guide/components/reference/atom/mesh/) | Specifies a model to render. |
| [Occlusion Culling Plane](/docs/user-guide/components/reference/atom/occlusion-culling-plane/) | Creates an occluder that when put between the camera and a mesh, can block the mesh from being rendered. |
| [Physical Sky](/docs/user-guide/components/reference/atom/physical-sky/) | Adjusts the physical environment of the scene, such as the sky, sun, and fog. |
| [Post-processing Modifiers](/docs/user-guide/components/reference/atom/post-processing-modifiers/) | A collection of components that define layers, volumes, areas, and weights for post-processing effects (PostFX). |
| [Reflection Probe](/docs/user-guide/components/reference/atom/reflection-probe/) | Creates specular reflections in the environment around a probe (capture point). |
| [SSAO](/docs/user-guide/components/reference/atom/ssao/) | Approximates indirect lighting in a scene by using the screen space ambient occlusion technique. |
| [Stars](/docs/user-guide/components/reference/atom/stars/) | Provides physically-based animated resolution-independent distant stars. |

### Audio
| Component | Description | 
| - | - |
| Audio Animation | Adds the ability to execute audio triggers when animation events occur. |
| [Audio Area Environment](/docs/user-guide/components/reference/audio/area-environment/) | Enables entities that are moving around and throughout a shape to have environment effects applied to any sounds that they trigger. |
| [Audio Environment ](/docs/user-guide/components/reference/audio/environment/) | Applies environmental effects such as reverb or echo. |
| [Audio Listener](/docs/user-guide/components/reference/audio/listener/) | Allows a virtual microphone to be placed in the environment. |
| [Audio Preload](/docs/user-guide/components/reference/audio/preload/) | Loads and unloads soundbanks contained in the Audio Translation Layer preloads.|
| [Audio Proxy](/docs/user-guide/components/reference/audio/proxy/) | If multiple Audio components are added to an entity, the Audio Proxy component is required to ensure the other Audio components communicate to the same Audio object. |
| [Audio Rtpc](/docs/user-guide/components/reference/audio/rtpc/) | Provides basic *Real-time Parameter Control* (RTPC) functionality, which allows you to tweak sounds in real-time. |
| [Audio Switch](/docs/user-guide/components/reference/audio/switch/) | Provides basic Audio Translation Layer switch functionality to specify the state of an entity. |
| [Audio Trigger](/docs/user-guide/components/reference/audio/trigger/) | Provides Audio Translation Layer triggers that allows you to play or stop the audio. |
| [Multi-Position Audio](/docs/user-guide/components/reference/audio/multi-position/) | Provides the ability to broadcast sounds through multiple positions.|
| [MiniAudio Listener](/docs/user-guide/components/reference/audio/mini-audio-listener/) | Provides the ability to set the MiniAudio listener for spatial audio playback.|
| [MiniAudio Playback](/docs/user-guide/components/reference/audio/mini-audio-playback/) | Provides the ability to play sounds with MiniAudio.|


### Camera
| Component | Description | 
| - | - |
| [Camera](/docs/user-guide/components/reference/camera/camera/) | Allows an entity to be used as a camera. |
| [Camera Rig](/docs/user-guide/components/reference/camera/camera-rig/) | Manages the behaviors that drive a camera entity. |

<!--### Destruction
| Component | Description | 
| - | - |
| [Blast Family](/docs/user-guide/components/reference/destruction/blast-family/) | Enables destruction simulation using the [NVIDIA Blast library](https://developer.nvidia.com/blast). |
| [Blast Family Mesh Data](/docs/user-guide/components/reference/destruction/blast-family-mesh-data/) | Sets the mesh and material assets for NVIDIA Blast entities. | Hiding until blast tools are fixed, and blast docs are updated.-->

### Editor
| Component | Description | 
| - | - |
| [Comment](/docs/user-guide/components/reference/editor/comment/) | Allows you to add a text comment for component entities. |

### Gameplay

| Component | Description | 
| - | - |
| [Fly Camera Input](./gameplay/fly-camera-input/) | Allows you to control the camera using mouse and key inputs. |
| [Look At](./gameplay/look-at/) | Forces an entity to always look at a given target. |
| [Simple State](/docs/user-guide/components/reference/gameplay/simple-state/) | Provides a simple state machine that allows you to activate and deactivate associated entities.|
| [Tag](./gameplay/tag/) | Allows you to apply one or more labels to an entity. |
| [Input](./gameplay/input/) | Binds raw input to events in your game. |

### Gradient Modifiers

| Component | Description | 
| - | - |
| [Dither Gradient Modifier](./gradient-modifiers/dither-gradient-modifier) | Applies ordered dithering to the input gradient. |
| [Gradient Mixer](./gradient-modifiers/gradient-mixer) | Generates a new gradient by combining other gradients. |
| [Gradient Transform Modifier](./gradient-modifiers/gradient-transform-modifier) | Creates a coordinate space for the gradient based on a **Shape** component. Modifiers for the input gradient are applied in this space. |
| [Invert Gradient Modifier](./gradient-modifiers/invert-gradient-modifier) | Inverts a gradient's values. |
| [Levels Gradient Modifier](./gradient-modifiers/levels-gradient-modifier) | Modifies an input gradient's signal using low/mid/high points and allows clamping of min/max output values. |
| [Posterize Gradient Modifier](./gradient-modifiers/posterize-gradient-modifier) | Divides an input gradient's signal into a specified number of bands.|
| [Smooth-Step Gradient Modifier](./gradient-modifiers/smooth-step-gradient-modifier) | Generates a gradient fall off that smooths the input gradient. |
| [Threshold Gradient Modifier](./gradient-modifiers/threshold-gradient-modifier) | Applies a threshold value to an input gradient to generate an output gradient that has only two values. Input gradient values above the threshold are set to 1 and input values at or below the threshold are set to 0. |

### Gradients

| Component | Description | 
| - | - |
| [Altitude Gradient](./gradients/altitude-gradient) | Generates a gradient based on height within a range. |
| [Constant Gradient](./gradients/constant-gradient) | Returns a specified value as a gradient when sampled. |
| [FastNoise Gradient](./gradients/fastnoise-gradient) | Generates gradient values using [FastNoise](https://github.com/Auburn/FastNoiseLite), a noise generation library with a collection of real-time noise algorithms. |
| [Image Gradient](./gradients/image-gradient) | Generates a gradient by sampling an image asset. |
| [Perlin Noise Gradient](./gradients/perlin-noise-gradient) | Generates a gradient by sampling a perlin noise generator. |
| [Random Noise Gradient](./gradients/random-noise-gradient) | Generates a gradient by sampling a random noise generator.|
| [Reference Gradient](./gradients/reference-gradient) | References another gradient. |
| [Shape Falloff Gradient](./gradients/shape-falloff-gradient) | Generates a gradient based on the distance from a shape. |
| [Slope Gradient](./gradients/slope-gradient) | Generates a gradient based on the surface angle. |
| [Surface Mask Gradient](./gradients/surface-mask-gradient) | Generates a gradient based on the underlying surface types. |

### Multiplayer

| Component | Description | 
| - | - |
| [Simple Network Player Spawner](./multiplayer/simple-player-spawner) | Implements a basic setup for handling player join and player leave events in a network multiplayer session. |


### Non-uniform Scale

| Component | Description | 
| - | - |
| [Non-uniform Scale](/docs/user-guide/components/reference/non-uniform-scale/non-uniform-scale/) | Allows an entity to scale by varying sizes across the x-, y-, and z- axes. By default, entities can scale only equally across the axes. |

### NVIDIA PhysX

| Component | Description | 
| - | - |
| [Cloth](/docs/user-guide/components/reference/physx/cloth/) | Simulates the behavior of cloth by treating the vertices of a mesh as cloth particles with physical properties. |
| [PhysX Ball Joint](/docs/user-guide/components/reference/physx/ball-joint/) | Simulates a dynamic ball joint that constrains an entity to the joint with freedom to rotate around the y- and z-axes of the joint.|
| [PhysX Character Controller](/docs/user-guide/components/reference/physx/character-controller/) | Implements basic character interactions with the physical world. |
| [PhysX Character Gameplay](/docs/user-guide/components/reference/physx/character-gameplay/) | Configures general character properties in the gameplay, such as the character's gravitational strength. |
| [PhysX Dynamic Rigid Body](/docs/user-guide/components/reference/physx/rigid-body/) | Defines the movable entity as a movable rigid object that is solid and can collide with other PhysX entities. |
| [PhysX Fixed Joint](/docs/user-guide/components/reference/physx/fixed-joint/) | Creates a dynamic fixed joint that constrains an entity to the joint with no degree of freedom in any axis. |
| [PhysX Force Region](/docs/user-guide/components/reference/physx/force-region/) | Applies a physical force on objects that are within the specified region. |
  [PhysX Heightfield Collider](/docs/user-guide/components/reference/physx/heightfield-collider/) | Creates a geometric collider based on the Axis-Aligned Box component. |
| [PhysX Hinge Joint](/docs/user-guide/components/reference/physx/hinge-joint/) | Creates a dynamic hinge joint that constrains an entity to the joint with freedom to rotate around the x-axis of the joint.|
| [PhysX Mesh Collider](./physx/mesh-collider/) | Allows you to specify PhysX mesh assets to calculate collisions between entities. |
| [PhysX Primitive Collider](./physx/collider/) | Allows you to specify primitive shapes to calculate collisions between entities. |
| [PhysX Prismatic Joint](/docs/user-guide/components/reference/physx/prismatic-joint/) | Creates a dynamic prismatic joint that constrains an entity to the joint, keeping the same rotation but allowing it to move freely along one axis.|
| [PhysX Ragdoll](/docs/user-guide/components/reference/physx/ragdoll/) | Simulates ragdoll physics by creating a hierarchy of rigid bodies connected by joints. |
| [PhysX Static Rigid Body](/docs/user-guide/components/reference/physx/static-rigid-body/) | Defines the entity as a non-movable rigid object that is solid and can collide with other PhysX entities. |
| [PhysX Shape Collider](/docs/user-guide/components/reference/physx/shape-collider/) | Creates a geometric collider based on the **Shape** component. |

### Scripting

| Component | Description | 
| - | - |
| [Lua Script](/docs/user-guide/components/reference/scripting/lua-script/) | Allows you to add custom logic and functionality using Lua code. |
| [Script Canvas](/docs/user-guide/components/reference/scripting/script-canvas/) | Allows you to add custom logic and functionality using Lua code. |

### Shape  

| Component | Description | 
| - | - |
| [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape/) | Creates box geometry that is always axis-aligned. |
| [Box Shape](/docs/user-guide/components/reference/shape/box-shape/) | Generates box geometry for volumes and triggers. |
| [Capsule Shape](/docs/user-guide/components/reference/shape/capsule-shape/) | Generates capsule geometry for volumes and triggers. |
| [Compound Shape](/docs/user-guide/components/reference/shape/compound-shape/) | Builds complex geometry from simple shapes for volumes and triggers. |
| [Cylinder Shape](/docs/user-guide/components/reference/shape/cylinder-shape/) | Generates cylinder geometry for volumes and triggers. |
| [Disk Shape](/docs/user-guide/components/reference/shape/disk-shape/) | Generates disk geometry for areas and triggers. |
| [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/) | Generates n-sided prism geometry for volumes and triggers. |
| [Quad Shape](/docs/user-guide/components/reference/shape/quad-shape/) | Generates quad-plane geometry for areas and triggers. |
| [Shape Reference](/docs/user-guide/components/reference/shape/shape-reference) | Enables entities to reference and reuse Shape components. |
| [Sphere Shape](/docs/user-guide/components/reference/shape/sphere-shape/) | Generates sphere geometry for volumes and triggers. |
| [Spline](/docs/user-guide/components/reference/shape/spline/) | Generates lines and curves for paths. |
| [Tube Shape](/docs/user-guide/components/reference/shape/tube-shape/) | Generates tube geometry for volumes and triggers. |
| [White Box](/docs/user-guide/components/reference/shape/white-box/) | Allows you to sketch 3D proxy meshes in the O3DE Editor. |
| [White Box Collider](/docs/user-guide/components/reference/shape/white-box-collider/) | Supports collision layers and physics materials for white box meshes. |

### Surface Data   

| Component | Description | 
| - | - |
| [Gradient Surface Tag Emitter](surface-data/gradient-surface-tag-emitter) | Enables a gradient to emit surface tags. |
| [Mesh Surface Tag Emitter](surface-data/mesh-surface-tag-emitter) | Enables a static mesh to emit surface tags. |
| [PhysX Collider Surface Tag Emitter](surface-data/physx-collider-surface-tag-emitter) | Enables a physics collider to emit surface tags. |
| [Shape Surface Tag Emitter](surface-data/shape-surface-tag-emitter) | Enables a shape to emit surface tags. |

### Terrain  

| Component | Description | 
| - | - |
| [Terrain Physics Heightfield Collider](./terrain/terrain-physics-collider) | Provides terrain data to a physics collider in the form of a heightfield and surface to material mapping. |
| [Terrain Layer Spawner](./terrain/layer_spawner) | Spawns a terrain region contained within configurable bounds, and allows prioritization of overlapping terrain layers. |
| [Terrain Macro Material](./terrain/terrain-macro-material) | Provides low-fidelity color data for a region of terrain. |
| [Terrain Height Gradient List](./terrain/height_gradient_list) | Provides terrain height data from a list of gradients. |
| [Terrain Surface Materials List](./terrain/surface-material-list) | Defines mappings between a surface type and a render material. |
| [Terrain Surface Gradient List](./terrain/surface-gradient-list) | Defines mappings between a gradient and a surface type on a terrain layer. |
| [Terrain World](./terrain/world) | Allows the bounds of the Terrain World and the height query resolution to be set. |
| [Terrain World Debugger](./terrain/world-debugger) | Provides a means to display a wireframe or bounds representation of the Terrain World. |
| [Terrain World Renderer](./terrain/world-renderer) | Renders the terrain within the Terrain World bounds. |

### Test  

| Component | Description | 
| - | - |
| AssetCollectionAsyncLoaderTest | Allows you to test the API provided by AssetCollectionAsyncLoader. |

### UI  

| Component | Description | 
| - | - |
| [UI Canvas Asset Ref](/docs/user-guide/components/reference/ui/canvas-asset-ref/) | Allows you to associate a UI Canvas with an entity. |
| [UI Canvas Proxy Ref](/docs/user-guide/components/reference/ui/canvas-proxy-ref/) | Allows you to associate an entity with another entity that is managing a UI Canvas. |
| [UI Canvas on Mesh](/docs/user-guide/components/reference/ui/canvas-on-mesh/) | Allows you to place a UI Canvas on an entity in the 3D world that a player can interact with via ray casts. |

### Vegetation  

| Component | Description | 
| - | - |
| Landscape Canvas | Provides a node-based Editor for authoring Dynamic Vegetation.  |
| [Vegetation Asset List](vegetation/vegetation-asset-list) | Provides a set of vegetation descriptors. |
| [Vegetation Asset List Combiner](vegetation/vegetation-asset-list-combiner) | Provides a list of vegetation descriptor providers. |
| [Vegetation Asset Weight Selector](vegetation/vegetation-asset-weight-selector) | Selects vegetation assets based on their weight. |
| [Vegetation Layer Blender](vegetation/vegetation-layer-blender) | Combines a collection of vegetation areas and applies them in a specified order. |
| [Vegetation Layer Blocker](vegetation/vegetation-layer-blocker) | Defines an area in which dynamic vegetation cannot be placed. |
| [Vegetation Layer Blocker (Mesh)](vegetation/vegetation-layer-blocker-mesh) | Prevents vegetation from being placed in the mesh. |
| [Vegetation Layer Debugger](vegetation/vegetation-layer-debugger) | Enables debug visualizers for vegetation layers. |
| [Vegetation Layer Spawner](vegetation/layer-spawner) | Creates dynamic vegetation in a specified area. |

### Vegetation Filters  

| Component | Description | 
| - | - |
| [Vegetation Altitude Filter](vegetation-filters/vegetation-altitude-filter) | Limits the placement of vegetation to surfaces within the specified height range. |
| [Vegetation Distance Between Filter](vegetation-filters/vegetation-distance-between-filter) | Defines the minimum distance between vegetation instances. |
| [Vegetation Distribution Filter](vegetation-filters/vegetation-distribution-filter) | Limits the placement of vegetation to a specified value range within a distribution defined by a gradient.  |
| [Vegetation Shape Intersection Filter](vegetation-filters/vegetation-shape-intersection-filter) | Limits the placement of vegetation to surfaces that intersect the specified shape. |
| [Vegetation Slope Filter](vegetation-filters/vegetation-slope-filter) | Limits the placement of vegetation to surfaces within the specified surface angle range. |
| [Vegetation Surface Mask Depth Filter](vegetation-filters/vegetation-surface-mask-depth-filter) | Limits the placement of vegetation to surfaces within a specified depth range between two surface tags. |
| [Vegetation Surface Mask Filter](vegetation-filters/vegetation-surface-mask-filter) | Filters out vegetation based on surface mask-to-tag mappings. |

### Vegetation Modifiers  

| Component | Description | 
| - | - |
| [Vegetation Position Modifier](vegetation-modifiers/vegetation-position-modifier) | Offsets the position of the vegetation. |
| [Vegetation Rotation Modifier](vegetation-modifiers/vegetation-rotation-modifier) | Offsets the rotation of the vegetation. |
| [Vegetation Scale Modifier](vegetation-modifiers/vegetation-scale-modifier) | Offsets the scale of the vegetation. |
| [Vegetation Slope Alignment Modifier](vegetation-modifiers/vegetation-slope-alignment-modifier) | Offsets the orientation of the vegetation relative to a surface angle. |

## Supplemental Information

The following pages provide additional information about data and systems used by the components.

| Data/System | Description |
| - | - |
| [Paint Brush](paintbrush/paintbrush) | Painting data manipulator used by some components. |
| [Terrain Detail Material](./terrain/terrain-detail-material) | Provides high-fidelity material data for a region of terrain. |
