---
title: "O3DE User Defined Properties"
date: 2022-03-08
slug: blog-udp
author: Allen Jackson
blog_img: "/images/blog/udp-intro/editor_def_mat_port.png"
full_img: "/images/blog/udp-intro/editor_def_mat_port.png"
---

# O3DE User Defined Properties

Artists store metadata in source scenes (e.g. blend, ma, 3ds file extensions) to user defined properties (UDP) on scene nodes. This user defined property metadata can be exported into source scene asset files (e.g. FBX or glTF). Game teams use this UDP metadata to tag mesh data for engine purposes such as splitting up meshes into level of details (LODs), flagging a simplified mesh as a collision mesh to use as a trigger or hit detection, and assigning scene features like render materials to engine models.

Our team has added the ability for the O3DE asset pipeline to read in this UDP metadata so that scene building logic can act using the UDP metadata. This allows the artists to continue to work primarily in the tools they have mastered such as Maya or Blender. For example, since the UDP metadata can assign a material to a mesh node the artist will not need to open the O3DE Editor in order to assign the correct material the exported model. 

The import logic stores string keys mapped to a variety of value types. In the DCC tool, the artists can store value types of string, Boolean, unsigned integer 32-bit, signed integer 64-bit, float, and double for each node. The artist will need to explicitly export the scene’s properties when exporting the FBX (or glTF) scene source asset file.

By default, the UDP metadata performs no scene building actions, rather the UDP metadata is stored in the scene graph node when it is imported. In response, scene building logic can be updated to respond to the keyed values to update the scene manifest rules. The scene manifest rules are used to create LOD models, flag collision meshes, and assign materials. The scene building logic can be written in either C++ or Python in order to update the scene manifest. 

{{< note >}}
The "o3de." prefix will be reserved for O3DE engine processing logic.
{{< /note >}}

## Assigning Materials in the DCC Tool

The ```o3de.default.material``` scene property was added to the Prefab gem in order to assign a material asset while assembling a default procedural prefab. The Prefab gem constructs a default prefab for a scene graph, it looks for the UDP ```o3de.default.material``` in a mesh data node to define an O3DE render material for that mesh group inside the prefab. This allows artists to assign O3DE render materials back in the DCC tool. Each time the source scene file is exported, this reference is maintained through the scene pipeline.

![Blender with UDP metadata for material](/images/blog/udp-intro/blender_def_mat.png)

## What’s Next?

There are many more features that can be developed with the UDP metadata feature. The engine can remove the soft node naming convention for both LODs (via ```_lod<n>```) and collision mesh assignment (via ```_phys```); instead they could be replaced with ```o3de.default.lod``` and ```o3de.default.physics.collision```, respectively. 

Game teams can start adding their own unique project user defined property metadata keys to assign game statistics to meshes, occlusion meshes, and attachment points. The game team would update a scene builder’s logic to access and process with those new metadata keys and values. 

One of the goals of this feature is to unlock the ability to extend the scene pipeline so that teams will fidget less in the O3DE Editor and spend more time iterating to polish a project.


