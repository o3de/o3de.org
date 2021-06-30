---
title: Component reference
linktitle: Component reference
description: ' Open 3D Engine (O3DE) component reference index. '
weight: 100
toc: true
---

{{< preview-new >}}

Components add functionality to entities. An entity can contain any number or combination of components. Some components allow only one instance per entity, and some depend on other components to function.

Components are provided by Gems. To make a component available in the O3DE Editor, you must add the Gem that provides it. If you configure the Gems available to your project, you must rebuild your project. Though components might belong to the same type, they might not be provided by the same Gem. Each component lists the Gem that provides it on its reference page.

## Adding components to an entity
In the O3DE Editor, you can add components to an entity. To add a component:
1. In the **Entity Outliner** panel, select an entity. This will show the entity's details in the **Entity Inspector** panel. 
2. In the Entiy Inspector panel, select **Add Component** and choose a component to add to this entity. 

{{< note >}}
If a component you are looking for does not appear in the **Add Component** list, you may need to enable the Gem that provides that component.
{{< /note >}}

## Components
The components below are grouped by type as they appear in the O3DE Editor.

### AI
| Component | Description | 
| - | - |
| [Navigation](/docs/user-guide/components/reference/ai/navigation/) | Provides basic path-finding and path-following services to an entity. |
| [Navigation Area](/docs/user-guide/components/reference/ai/nav-area/) | Configures the area used for navigation and pathfinding. |
| [Navigation Seed](/docs/user-guide/components/reference/ai/nav-seed/) | Determines the reachable navigation nodes along the path.  |


### Animation
| Component | Description | 
| - | - |
| [Actor](/docs/user-guide/components/reference/animation/actor/) | Creates and manages a controllable character. |
| [Anim Graph](/docs/user-guide/components/reference/animation/animgraph/) | Manages a set of assets that are built in the Animation Editor, including the animation graph, default parameter settings, and assigned motion set for the associated Actor. |
| [Attachment](/docs/user-guide/components/reference/animation/attachment/) | Allows an entity to attach to a bone on the skeleton of another entity. |
| [Simple LOD Distance](TBD) | Changes the actor skeleton LOD based on camera distance. |
| [Simple Motion](/docs/user-guide/components/reference/animation/simple-motion/) | Assigns a single motion to the associated Actor. This is a simpler alterative to the Anim Graph component.  |


### Atom

| Component | Description | 
| - | - |
| [Bloom](/docs/user-guide/components/reference/TBD) | Simulates real-world light bleeding, or glow. |
| [Decal (Atom)](/docs/user-guide/components/reference/TBD) | Projects a texture material in a single direction onto mesh surfaces. |
| [Deferred Fog](/docs/user-guide/components/reference/TBD) | Creates a screen space fog effect that can ben used as scene fog or layered / ground fog with an optional cloud noise turbulence. |
| [Depth of Field](/docs/user-guide/components/reference/TBD) | Simulates the lens effects of real world cameras that focus on a specific area. |
| [Diffuse Probe Grid](/docs/user-guide/components/reference/TBD) | Creates a volume of light probes that provides diffuse global illumination in a specified area. |
| [Directional Light](/docs/user-guide/components/reference/TBD) | Casts light from an infinitely distant point in a single direction, similar to sunlight, and supports shadow casting. |
| [Display Mapper](/docs/user-guide/components/reference/TBD) | Configures tone mapping and color grading for the scene. |
| [Entity Reference](/docs/user-guide/components/reference/TBD) | Allows you to provide an entity with references to other entities. |
| [Exposure Control](/docs/user-guide/components/reference/TBD) | Adjusts the amount of light the camera exposes in the scene. |
| [Global Skylight (IBL)](/docs/user-guide/components/reference/TBD) | Creates an image-based global illumination effect that calculates lighting for a scene using an HDR skybox image. |
| [Grid](/docs/user-guide/components/reference/atom/TBD/) | Adds a customizeable grid to the scene. |
| [HDRi Skybox](/docs/user-guide/components/reference/TBD) | Creates a skybox in your scene using an HDR image. |
| [Light](/docs/user-guide/components/reference/atom/light) | Simulates soft studio light by creating various types of punctual and area lights. |
| [Look Modification](/docs/user-guide/components/reference/TBD) | Configures a color grading look-up table (LUT). |
| [Material](/docs/user-guide/components/reference/TBD) | Adds a material on the object's mesh. |
| [Mesh](/docs/user-guide/components/reference/TBD) | Specifies a model to render. |
| [Occlusion Culling Plane](/docs/user-guide/components/reference/TBD) | Creates an occluder that when put between the camera and a mesh, can block the mesh from being rendered. |
| [Physical Sky](/docs/user-guide/components/reference/TBD) | Adjusts the physical environment of the scene, such as the sky, sun, and fog. |
| [PostFX Gradient Weight Modifier](/docs/user-guide/components/reference/TBD) | Modifies the Post FX's weight based on another entity's gradient signal. |
| [PostFX Shape Weight Modifier](/docs/user-guide/components/reference/TBD) | Controls how Post FX components, such as Depth of Field and Exposure Control, are applied in a scene.|
| [Radius Weight Modifier](/docs/user-guide/components/reference/TBD) | Modifies the weight of a Post FX component based on the camera's distance to the center. |
| [Reflection Probe](/docs/user-guide/components/reference/TBD) | Provides specular reflections for the environment around a probe, or a capture point. |
| [SSAO](/docs/user-guide/components/reference/TBD) | Uses the screen space ambient occlusion technique to approximate indirect lighting in a scene. |

### Audio
| Component | Description | 
| - | - |
| [Audio Animation](/docs/user-guide/components/reference/TBD) | Adds the ability to execute audio triggers when animation events occur. |
| [Audio Area Environment](/docs/user-guide/components/reference/audio/audio-area-environment/) | Enables entities that are moving around and throughout a shape to have environment effects applied to any sounds that they trigger. |
| [Audio Environment ](/docs/user-guide/components/reference/audio/audio-environment/) | Applies environmental effects such as reverb or echo. |
| [Audio Listener](/docs/user-guide/components/reference/audio/audio-listener/) | Allows a virtual microphone to be placed in the environment. |
| [Audio Preload](/docs/user-guide/components/reference/audio/audio-preload/) | Loads and unloads soundbanks contained in the Audio Translation Layer preloads.|
| [Audio Proxy](/docs/user-guide/components/reference/audio/audio-proxy/) | If multiple Audio components are added to an entity, the Audio Proxy component is required to ensure the other Audio components communicate to the same Audio object. |
| [Audio Rtpc](/docs/user-guide/components/reference/audio/audio-rtpc/) | Provides basic *Real-time Parameter Control* (RTPC) functionality, which allows you to tweak sounds in real-time. |
| [Audio Switch](/docs/user-guide/components/reference/audio/audio-switch/) | Provides basic Audio Translation Layer switch functionality to specify the state of an entity. |
| [Audio Trigger](/docs/user-guide/components/reference/audio/audio-trigger/) | Provides Audio Translation Layer triggers that allows you to play or stop the audio. |
| [Multi-Position Audio](/docs/user-guide/components/reference/audio/audio-multi-position/) | Provides the ability to broadcast sounds through multiple positions.|


### Camera
| Component | Description | 
| - | - |
| [Camera](/docs/user-guide/components/reference/camera/camera/) | Allows an entity to be used as a camera. |
| [Camera Rig](/docs/user-guide/components/reference/camera/camera-rig/) | Manages the behaviors that drive a camera entity. |

### Destruction
| Component | Description | 
| - | - |
| [Blast Family](/docs/user-guide/components/reference/destruction/blast-family/) | Enables destruction simulation using the [NVIDIA Blast library](https://developer.nvidia.com/blast). |
| [Blast Family Mesh Data](/docs/user-guide/components/reference/destruction/blast-family-mesh-data/) | Sets the mesh and material assets for NVIDIA Blast entities. |

### Editor
| Component | Description | 
| - | - |
| [Comment](/docs/user-guide/components/reference/editor/comment/) | Allows you to add a text comment for component entities. |

### Gameplay

| Component | Description | 
| - | - |
| [Fly Camera Input](/docs/user-guide/components/reference/TBD) | Allows you to control the camera using mouse and key inputs. |
| [Look At](/docs/user-guide/components/reference/TBD) | Forces an entity to always look at a given target. |
| Random Timed Spawner) | Deprecated. |
| [Simple State](/docs/user-guide/components/reference/gameplay/simple-state/) | Provides a simple state machine that allows you to activate and deactivate associated entities.|
| Spawner | Deprecated. |
| [Tag](/docs/user-guide/components/reference/gameplay/tag/) | Allows you to apply one or more labels to an entity. |
| [Input](docs/user-guide/components/reference/gameplay/input/) | Binds raw input to events in your game. |

### Gradient Modifiers

| Component | Description | 
| - | - |
| [Dither Gradient Modifier](/docs/user-guide/components/reference/gradient-modifiers/TBD) | Applies ordered dithering to the input gradient. |
| [Gradient Mixer](/docs/user-guide/components/reference/gradient-modifiers/TBD) | Generates a new gradient by combining other gradients. |
| [Gradient Transform Modifier](/docs/user-guide/components/reference/gradient-modifiers/TBD) | Transforms the entity's coordinates into a space that is relative to a shape. You can then apply other transform and sampling modifications using this altered coordinate space. |
| [Invert Gradient Modifier](/docs/user-guide/components/reference/gradient-modifiers/TBD) | Inverts a gradient's values. |
| [Levels Gradient Modifier](/docs/user-guide/components/reference/gradient-modifiers/TBD) | Modifies an input gradient's signal using low/mid/high points and allows clamping of min/max output values. |
| [Posterize Gradient Modifier](/docs/user-guide/components/reference/gradient-modifiers/TBD) | Divides an input gradient's signal into a specified number of bands.|
| [Smooth-Step Gradient Modifier](/docs/user-guide/components/reference/gradient-modifiers/TBD) | Generates a gradient fall off, which creates a smoother input gradient. |
| [Threshold Gradient Modifier](/docs/user-guide/components/reference/gradient-modifiers/TBD) | Converts input gradient to be 0 if the value is below the threshold, and 1 if the value is above the threshold. |

### Gradients

| Component | Description | 
| - | - |
| [Altitude Gradient](/docs/user-guide/components/reference/gradients/TBD) | Generates a gradient based on height within a range. |
| [Constant Gradient](/docs/user-guide/components/reference/gradients/TBD) | Returns a specified value as a gradient when sampled. |
| [FastNoise Gradient](/docs/user-guide/components/reference/gradients/TBD) | Generates gradient values using [FastNoise](https://github.com/Auburn/FastNoiseLite), a noise generation library with a collection of real-time noise algorithms. |
| [Image Gradient](/docs/user-guide/components/reference/gradients/TBD) | Generates a gradient by sampling an image asset. |
| [Perlin Noise Gradient](/docs/user-guide/components/reference/gradients/TBD) | Generates a gradient by sampling a perlin noise generator. |
| [Random Noise Gradient](/docs/user-guide/components/reference/gradients/TBD) | Generates a gradient by sampling a random noise generator.|
| [Reference Gradient](/docs/user-guide/components/reference/gradients/TBD) | References another gradient. |
| [Shape Falloff Gradient](/docs/user-guide/components/reference/gradients/TBD) | Generates a gradient based on the distance from a shape. |
| [Slope Gradient](/docs/user-guide/components/reference/gradients/TBD) | Generates a gradient based on the surface angle. |
| [Surface Mask Gradient](/docs/user-guide/components/reference/gradients/TBD) | Generates a gradient based on the underlying surface types. |

### Networking

| Component | Description | 
| - | - |
| [Anim Graph Net Sync](/docs/user-guide/components/reference/networking/animgraph-netsync/) | The **AnimGraph** component, which adds an animation graph and motion set to a character, does not automatically synchronize its parameters across the network. The **Anim Graph Net Sync** component provides an authoritative way of replicating these parameters. |
| [Network Binding](/docs/user-guide/components/reference/networking/TBD/) |  |

### Non-uniform Scale

| Component | Description | 
| - | - |
| [Non-uniform Scale](/docs/user-guide/components/reference/non-uniform-scale/non-uniform-scale/) | Allows an entity to scale by varying sizes across the x-, y-, and z- axes. By default, entities can scale only equally across the axes. |

### PhysX

| Component | Description | 
| - | - |
| [Cloth](/docs/user-guide/components/reference/physx/cloth/) | Simulates the behavior of cloth by treating the vertices of a mesh as cloth particles with physical properties. |
| [PhysX Ball Joint](/docs/user-guide/components/reference/physx/physx-ball-joint/) | Simulates a dynamic ball joint that constrains an entity to the joint with freedom to rotate around the y- and z-axes of the joint.|
| [PhysX Character Controller](/docs/user-guide/components/reference/physx/physx-character-controller/) | Implements basic character interactions with the physical world. |
| [PhysX Character Gameplay](/docs/user-guide/components/reference/TBD) | Configures general character properties in the gameplay, such as the character's gravitational strength. |
| [PhysX Collider](/docs/user-guide/components/reference/physx-collder/) | Allows you to specify primitive shapes or PhysX mesh assets to calculate collisions between entities. |
| [PhysX Fixed Joint](/docs/user-guide/components/reference/physx/physx-fixed-joint/) | Creates a dynamic fixed joint that constrains an entity to the joint with no degree of freedom in any axis. |
| [PhysX Force Region](/docs/user-guide/components/reference/physx/physx-force-region/) | Applies a physical force on objects that are within the specified region. |
| [PhysX Hinge Joint](/docs/user-guide/components/reference/physx/physx-hinge-joint/) | Creates a dynamic hinge joint that constrains an entity to the joint with freedom to rotate around the x-axis of the joint.|
| [PhysX Ragdoll](/docs/user-guide/components/reference/physx/physx-ragdoll/) | Simulates ragdoll physics by creating a hierarchy of rigid bodies connected by joints. |
| [PhysX Rigid Body](/docs/user-guide/components/reference/physx/physx-rigid-body-physics/) | Defines the entity as a rigid object that is solid and can move and collide with other PhysX entities. |
| [PhysX Shape Collider](/docs/user-guide/components/reference/physx/physx-shape-collider/) | Creates a geometric collider based on the **Shape** component. |

### Scripting

| Component | Description | 
| - | - |
| [Lua Script](/docs/user-guide/components/reference/scripting/lua-script/) | Allows you to add custom logic and functionality using Lua code. |
| [Script Canvas](/docs/user-guide/components/reference/scripting/script-canvas/) | Allows you to add custom logic and functionality using Lua code. |

### Shape  

| Component | Description | 
| - | - |
| [Box Shape](/docs/user-guide/components/reference/shape/box-shape/) | Generates box geometry for volumes and triggers. |
| [Capsule Shape](/docs/user-guide/components/reference/shape/capsule-shape/) | Generates capsule geometry for volumes and triggers. |
| [Compound Shape](/docs/user-guide/components/reference/shape/compound-shape/) | Builds complex geometry from simple shapes for volumes and triggers. |
| [Cylinder Shape](/docs/user-guide/components/reference/shape/cylinder-shape/) | Generates cylinder geometry for volumes and triggers. |
| [Disk Shape](/docs/user-guide/components/reference/shape/disk-shape/) | Generates disk geometry for areas and triggers. |
| [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/) | Generates n-sided prism geometry for volumes and triggers. |
| [Quad Shape](/docs/user-guide/components/reference/shape/quad-shape/) | Generates quad-plane geometry for areas and triggers. |
| [Sphere Shape](/docs/user-guide/components/reference/shape/sphere-shape/) | Generates sphere geometry for volumes and triggers. |
| [Spline](/docs/user-guide/components/reference/shape/spline/) | Generates lines and curves for paths. |
| [Tube Shape](/docs/user-guide/components/reference/shape/tube-shape/) | Generates tube geometry for volumes and triggers. |
| [White Box](/docs/user-guide/components/reference/shape/white-box/) | Allows you to sketch 3D proxy meshes in the O3DE Editor. |
| [White Box Collider](/docs/user-guide/components/reference/shape/white-box-collider/) | Supports collision layers and physics materials for white box meshes. |

### Surface Data   

| Component | Description | 
| - | - |
| [Gradient Surface Tag Emitter](/docs/user-guide/components/reference/TBD) | Enables a gradient to emit surface tags. |
| [Mesh Surface Tag Emitter](/docs/user-guide/components/reference/TBD) | Enables a static mesh to emit surface tags. |
| [PhysX Collider Surface Tag Emitter](/docs/user-guide/components/reference/TBD) | Enables a physics collider to emit surface tags. |
| [Shape Surface Tag Emitter](/docs/user-guide/components/reference/TBD) | Enables a shape to emit surface tags. |


### Test  

| Component | Description | 
| - | - |
| [AssetCollectionAsyncLoaderTest](/docs/user-guide/components/reference/TBD) | Allows you to test the API provided by AssetCollectionAsyncLoader. |

### UI  

| Component | Description | 
| - | - |
| [UI Canvas Asset Ref](/docs/user-guide/components/reference/ui/ui-canvas-asset-ref/) | Allows you to associate a UI Canvas with an entity. |
| [UI Canvas Proxy Ref](/docs/user-guide/components/reference/ui/ui-canvas-proxy-ref/) | Allows you to associate an entity with another entity that is managing a UI Canvas. |
| [UI Canvas on Mesh](/docs/user-guide/components/reference/ui/ui-canvas-on-mesh/) | Allows you to place a UI Canvas on an entity in the 3D world that a player can interact with via ray casts. |

### Vegetation  

| Component | Description | 
| - | - |
| [Landscape Canvas](/docs/user-guide/components/reference/TBD) | Provides a node-based Editor for authoring Dynamic Vegetation.  |
| [Vegetation Asset List](/docs/user-guide/components/reference/TBD) | Provides a set of vegetation descriptors. |
| [Vegetation Asset List Combiner](/docs/user-guide/components/reference/TBD) | Provides a list of vegetation descriptor providers. |
| [Vegetation Asset Weight Selector](/docs/user-guide/components/reference/TBD) | Selects vegetation assets based on their weight. |
| [Vegetation Layer Blender](/docs/user-guide/components/reference/TBD) | Combines a collection of vegetation areas and applies them in a specified order. |
| [Vegetation Layer Blocker](/docs/user-guide/components/reference/TBD) | Defines an area in which dynamic vegetation cannot be placed. |
| [Vegetation Layer Blocker (Mesh)](/docs/user-guide/components/reference/TBD) | Prevents vegetation from being placed in the mesh. |
| [Vegetation Layer Debugger](/docs/user-guide/components/reference/TBD) | Enables debug visualizers for vegetation layers. |
| [Vegetation Layer Spawner](/docs/user-guide/components/reference/vegetation/vegetation-layer-spawner/) | Creates dynamic vegetation in a specified area. |
| [Vegetation Reference Shape](/docs/user-guide/components/reference/TBD) | Enables the entity to reference and reuse shape entities. |

### Vegetation Filters  

| Component | Description | 
| - | - |
| [Vegetation Altitude Filter](/docs/user-guide/components/reference/TBD) | Limits the placement of vegetation to be on surfaces within the specified height range. |
| [Vegetation Distance Between Filter](/docs/user-guide/components/reference/TBD) | Defines the minimum distance required between vegetation instances. |
| [Vegetation Distribution Filter](/docs/user-guide/components/reference/TBD) | Limits the placement of vegetation to be within the specified value ranges. |
| [Vegetation Shape Intersection Filter](/docs/user-guide/components/reference/TBD) | Limits the placement of vegetation to be on surfaces that intersect the specified shape. |
| [Vegetation Slope Filter](/docs/user-guide/components/reference/TBD) | Limits the placement of vegetation to be only on surfaces within the specified surface angles. |
| [Vegetation Surface Mask Depth Filter](/docs/user-guide/components/reference/TBD) | Limits the placement of vegetation to be on surfaces within a specified depth between two surface tags. |
| [Vegetation Surface Mask Filter](/docs/user-guide/components/reference/TBD) | Filters out vegetation based on surface mask-to-tag mappings. |

### Vegetation Modifiers  

| Component | Description | 
| - | - |
| [Vegetation Position Modifier](/docs/user-guide/components/reference/TBD) | Offsets the position of the vegetation. |
| [Vegetation Rotation Modifier](/docs/user-guide/components/reference/TBD) | Offsets the rotation of the vegetation. |
| [Vegetation Scale Modifier](/docs/user-guide/components/reference/TBD) | Offsets the scale of the vegetation. |
| [Vegetation Slope Alignment Modifier](/docs/user-guide/components/reference/TBD) | Offsets the orientation of the vegetation relative to a surface angle. |
