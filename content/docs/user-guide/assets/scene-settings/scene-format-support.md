---
linkTitle: Scene Format Support
title: Scene Format Support
description: Information about 3D scene file types and data supported by Open 3D Engine (O3DE).
weight: 100
toc: true
---

**Open 3D Engine (O3DE)** integrates [Open Asset Import Library](https://github.com/assimp/assimp) to parse 3D scene source assets. The primary 3D scene source asset format supported by O3DE is `.fbx`. O3DE also supports `.stl`, a format widely used in computer aided design (CAD) and 3D printing, and has in development support for `.glTF`, an open source transport format for runtime applications that is gaining popularity.

Open Asset Import Library supports many common [scene formats](https://github.com/assimp/assimp/blob/master/doc/Fileformats.md). If you want to experiment with other formats supported by Open Asset Import Library, you can edit the `o3de/Registry/sceneassetimporter.setreg` settings file and add format extensions to the `"SupportedFileTypeExtensions":` list.

## Coordinate systems

It's important to understand O3DE's coordinate system and the varying coordinate systems of digital content creation (DCC) applications. If the source asset uses a different coordinate system than O3DE, the asset might not be oriented correctly when loaded in **O3DE Editor**.

O3DE uses a *right-handed* coordinate system with **Z** as the up axis. DCC applications often use right-handed coordinate systems with **Y** as the up axis. In a right-handed coordinate system, positive rotation from the positive **X** axis to the positive **Y** axis is counter-clockwise.

In O3DE's coordinate system, with the positive **X** axis aimed to the right, the forward axis points away from the viewer. In most DCC application coordinate systems, with the positive **X** axis aimed to the right, the forward axis points toward the viewer. See the illustration below for a comparison of O3DE's coordinate system and a common DCC application coordinate system.

{{< image-width "/images/user-guide/assets/scene-settings/o3de-coordinate-system.svg" "650" "Example image of O3DE's coordinate system compared to a common content creation application coordinate system." >}}

 Most DCC applications have user settings that you can use to change their coordinate system, or options that you can use to orient the scene when it is exported, ensuring the asset is oriented correctly in O3DE. Otherwise, **Scene Settings** provides a **Coordinate system change** modifier you can use to reorient 3D scenes to O3DE's coordinate system when source assets are processed.

## World measurement units

O3DE's base measurement unit is one cubic meter per world unit. Most DCC applications use a much smaller base measurement unit such as one cubic centimeter per world unit. This difference might result in product assets that appear microscopic in O3DE, requiring the source asset to be uniformly scaled by a factor of `100` for O3DE's base unit of measurement.

Most DCC applications have user settings that you can use to change the DCC's base measurement unit, or options that you can use to scale the scene when it is exported, ensuring the asset is at the proper scale in O3DE. Otherwise, the Scene Settings Coordinate system change modifier has **Advanced Settings** you can use to scale source assets to account for differences between your DCC application and O3DE.

## Supported 3D scene data

When a 3D scene file source asset is processed, runtime optimized product assets are created and stored in the **Asset Cache** of your project. In most scenarios, there isn't a one-to-one relationship between the source asset and the number of product assets that are generated. A simple mesh, for example, might produce an `.azmodel`, several `.azlod` and `.pxmesh` product assets, and even more `.azbuffer` product assets. Each of the product assets contains a subset of the scene data required for the asset.

O3DE supports a wide array of 3D scene data, however, due to the specifications of various intermediate scene formats, and the restrictions imposed by hardware resources for real-time applications, there are limitations on the data that can be processed for product assets.

The table below outlines the 3D scene data supported by O3DE and the limitations.

{{< important >}}
The data in the table below represents all of the 3D scene data supported by O3DE. Some source asset file types only support a subset of this data.

For example, popular 3D scene file formats such as `.stl` and `.obj` have limited support for certain types of mesh data and do not support animation. Other 3D scene file formats such as `.bvh` only support skeleton hierarchies and keyframe motion data. The various **Asset Builders** in O3DE only generate product assets for data that is supported by both the Asset Builder and the source asset file format. 
{{< /important >}}

| Data | Limitation |
| - | - |
| **Meshes** | Unlimited. Any number of mesh groups containing any number of meshes can be specified per source asset. |
| **Vertices per mesh** [<sup>**1**</sup>](#vertex-limit) | 4,294,967,295 |
| **Vertex precision** | 32-bit precision.  |
| **Normals** | Custom normals from the source asset, or automatically generated (averaged) normals. |
| **Tangents** | Custom tangents from the source asset, or tangents that are automatically generated with the MikkT algorithm. |
| **Bitangents** | Custom bitangents from the source asset, or bitangents that are automatically generated with the MikkT algorithm. |
| **UV Sets** [<sup>**2**</sup>](#buffer-limit)  | 2 UV sets (`UV0` and `UV1`) are supported by default shaders. |
| **Vertex Colors** [<sup>**2**</sup>](#buffer-limit)  | 1 vertex color stream is supported by default shaders. Additional vertex color streams can store constraints and inverse mass data for cloth simulation. |
| **Materials** | 1 per polygon. |
| **Physics materials** | 1 per material. |
| **Level of detail (LOD)** | 5 mesh LODs and 5 skeleton LODs numbered **[0]** to **[4]** (does not include base meshes and skeletons). |
| **Bone influences per vertex** [<sup>**3**</sup>](#skin-weights) | Up to 32 per vertex maximum, with a default limit of 8 per vertex. |
| **Bones per skeleton** | Unlimited. Skeletons can have any number of bones.  |
| **Motions** | Unlimited. A motion can can have any number of keyframes and multiple motions can be specified from a source asset in segments with start and end keyframes. |
| **Cloth meshes** [<sup>**4**</sup>](#cloth-meshes) | Unlimited. |
| **PhysX colliders** [<sup>**5**</sup>](#physx-colliders) | Unlimited. PhysX colliders can be triangle meshes processed from the source asset or automatically generated as shape or convex hull colliders. |

{{< note >}}
<a name="vertex-limit"></a>
<sup>**1**</sup> **Vertices per mesh limit**

The vertices per mesh limit is theoretical. The real total number of vertices is dependent on target platform hardware resources and performance.

<a name="buffer-limit"></a>
<sup>**2**</sup> **UV set and vertex color limits**

Although the default shaders only support 2 UV sets and 1 vertex color stream, support for additional UV sets and vertex color streams can be added. Each `.azmodel` can have up to 12 `.azbuffer` product assets that store additional model data including UV sets and vertex color streams. The total number of UV sets and vertex color streams is limited by the available `.azbuffer` product assets. For example, suppose an `.azmodel` product asset has the buffers below:

* index
* position
* normals
* tangents
* bitangents
* skin weights
* joint indices

In the example asset above, 7 of the 12 available buffers contain data, leaving 5 remaining buffers available for UV sets and vertex color streams.

<a name="skin-weights"></a>
<sup>**3**</sup> **Bone influences per vertex limit**

Though the max number of bone influences (skin weights) per vertex is 32, a lower default value is specified for the project in the [Settings Registry](../../../settings). The following settings registry values can be modified to change the default skin weight settings. Allowing fewer bone influences per vertex can offer better animation performance on some target platforms.

| Setting | Description | Default |
| :-- | :-- | :-: |
| `/O3DE/SceneAPI/SkinRule/DefaultMaxSkinInfluencesPerVertex` | The maximum number of bones that can influence any vertex in an actor mesh. Each vertex in an actor mesh can have any number of skin weights between 1 and the number specified in this registry value. | 8 |
| `/O3DE/SceneAPI/SkinRule/DefaultWeightThreshold` | The minimum value for a skin wight. Skin weight values below this limit are ignored. | 0.001 |

The maximum number of bone influences and the weight threshold can be overridden on a per actor basis by adding a [Skin modifier](../meshes-tab#skin) to the actor's mesh in [Scene Settings](../scene-settings).

<a name="cloth-meshes"></a>
<sup>**4**</sup> **Cloth mesh limitations**

Though any number of cloth meshes can be processed, the number and resolution of cloth meshes that O3DE can support is dependent on the target platform's capabilities.

<a name="physx-colliders"></a>
<sup>**5**</sup> **Physics colliders limitations**

The PhysX collider Asset Builder can generate colliders  from triangle meshes, primitives, or convex hulls. The generated colliders can be automatically fit to the mesh asset and complex meshes can be decomposed into convex parts. Because source asset meshes can be combined or decomposed into convex parts for collider generation, there might not be a one-to-one relationship between the number of mesh product assets and the number of PhysX collider product assets.

Though any number of PhysX colliders can be processed, the number and resolution of PhysX colliders that O3DE can support is dependent on the target platform's capabilities. Primitive colliders provide the best performance in general.
{{< /note >}}

## `.fbx` file support

The `.fbx` format is portable and widely supported. It's capable of storing complete 3D scenes with multiple assets, each composed of multiple meshes, materials, skeletons, animations, vertex attributes, and so on. Though it's possible to include any number of assets in a single `.fbx` file, it's recommended that you only include the data required for a single asset such as a character or a prop. Ensuring a `.fbx` source asset only generates product assets for a single character or prop can prevent issues with dependencies and asset reprocessing.

`.fbx` source assets can contain any of the data outlined in the table above including meshes, skeletons, animation, and PhysX meshes.

{{< note >}}
`.fbx` files can be ASCII or binary format. If you intend to work with automation and scripting to process `.fbx` source assets, you might prefer to use ASCII format `.fbx` files because they can be easily read and modified in script languages like Python.
{{< /note >}}

## `.stl` file support

The `.stl` format only supports closed, manifold meshes composed of triangles. That is, the mesh must not have open edges. Each edge must be shared by two triangles. Additional mesh data, such as UVs, materials, normals, and skin weights are not supported by `.stl`. Support for `.stl` is provided as a convenience for users of CAD and 3D printing applications.

## glTF support

{{< feature-in-progress "glTF support" "https://github.com/o3de/o3de/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+gltf" "https://github.com/o3de/o3de/pulls?q=is%3Apr+is%3Aopen+in%3Atitle+gltf">}}

glTF is an open source 3D scene transport format that is gaining popularity for real-time applications. The goals of glTF are to improve interoperability between content creation and runtime applications, and to streamline the processing needed for runtime assets. glTF supports complete 3D scenes with multiple assets, each composed of multiple meshes, materials, skeletons, animations, vertex attributes, and so on.

glTF source assets can be stored in three different ways:

* **Binary** (`.glb`). The entire scene including texture assets is embedded in a single binary file with a `.glb` extension. This format provides the smallest and easiest to transport source assets.
* **ASCII embedded** (`.gltf`). The entire scene is stored in a single JSON formatted ASCII file with a `.gltf` extension. Scene data and and images are encoded in the `.gltf` file in Base64. This format generates a single large file, but has the benefit of providing source assets entirely encoded in a text file.
* **ASCII and binary** (`.gltf` scene description, `.bin` data, and texture files). The scene description is stored in a JSON formatted ASCII file with the `.gltf` extension. Scene data is stored in a binary file with the `.bin` extension. Textures are stored individually in specified image formats. This format provides reasonably small files and some unique opportunities to debug the source asset and update textures at any time, at the cost of having the source asset stored across multiple files. 

{{< note  >}}
At the time of this documentation, Blender provides near complete glTF support for O3DE with some issues that can be mitigated. Using ASCII and binary (`.gltf` scene description, `.bin` data, and texture files) source assets along with **Visual Studio Code** and the **glTF Tools** extension provides additional methods to debug glTF source assets.

For information on the current status of glTF support, refer to the [glTF support](https://github.com/o3de/o3de/issues/6007) feature request.
{{< /note  >}}

You can read more about `.glTF` at the [glTF specification homepage](https://www.khronos.org/gltf/).

