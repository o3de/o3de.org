---
title: "O3DE User Defined Properties"
date: 2022-03-08
slug: blog-udp
author: Allen Jackson
blog_img: "/images/blog/udp-intro/editor_def_mat_port.png"
full_img: "/images/blog/udp-intro/editor_def_mat_port.png"
---

# O3DE User Defined Properties

O3DE has the ability for the O3DE asset pipeline to read in this user defined properties (UDP) metadata so that scene building logic can customize asset processing logic using the UDP metadata. This allows the artists to continue to work primarily in the tools they have mastered such as Maya or Blender. For example, a content designer will not need to open up the O3DE Editor to assign a brick material to a wall model since the artist has assigned the brick material to the wall mesh node in Blender.

Artists assign metadata in source scene files (e.g. blend, ma, 3ds file extensions) in order to store custom properties about hierarchy nodes such as mesh, light, and animation nodes. This user defined property metadata can be exported into source scene asset files (e.g. FBX or glTF). Game teams use this UDP metadata to tag mesh data for engine purposes such as splitting up meshes into level of details (LODs), flagging a simplified mesh as a collision mesh to use as a trigger or hit detection, and assigning scene features like render materials to engine models.

The import logic stores string keys mapped to a variety of value types. In the digital content creation (DCC) tool, the artists can store value types of string, Boolean, unsigned integer 32-bit, signed integer 64-bit, float, and double for each node. The artist will need to explicitly export the scene’s properties when exporting the FBX (or glTF) scene source asset file.

By default, the UDP metadata performs no scene building actions, rather the UDP metadata is stored in the scene graph node when it is imported into O3DE. In response, scene building logic can be updated to respond to the keyed values to update the scene manifest rules. The scene manifest rules are used to create LOD models, flag collision meshes, and assign materials. The scene building logic can be written in either C++ or Python in order to update the scene manifest.

{{< note >}}
The "o3de_" prefix will be reserved for O3DE engine processing logic.
{{< /note >}}

## Assigning Materials in the DCC Tool

The ```o3de_default_material``` scene property was added to the Prefab gem in order to assign a material asset while assembling a default procedural prefab. The Prefab gem constructs a default prefab for a scene graph, it looks for the UDP ```o3de_default_material``` in a mesh data node to define an O3DE render material for that mesh group inside the prefab. This allows artists to assign O3DE render materials back in the DCC tool. Each time the source scene file is exported, this reference is maintained through the scene pipeline.

{{< image-width src="/images/blog/udp-intro/blender_def_mat.png" width="100%" alt="Blender with UDP metadata for material" >}}

## What’s Next?

There are many more features that can be developed with the UDP metadata feature. The engine can remove the soft node naming convention for both LODs (via ```_lod<n>```) and collision mesh assignment (via ```_phys```); instead they could be replaced with ```o3de_default_lod``` and ```o3de_default_physics_collision```, respectively.

Game teams can start adding their own unique project user defined property metadata keys to assign game statistics to meshes, occlusion meshes, and attachment points. The game team would update a scene builder’s logic to access and process with those new metadata keys and values.

One of the goals of this feature is to unlock the ability to extend the scene pipeline so that content creators have to tweak assets less in the O3DE Editor and spend more time iterating to polish a project.
