---
linkTitle: Procedural Prefab
title: Procedural Prefab
description: With procedural prefabs, you can use Python script to create prefab assets from scene source files for Open 3D Engine (O3DE).
weight: 400
toc: true
---

With procedural prefabs, you can write out **Open 3D Engine (O3DE)** native entity-component scene descriptions from source scene files in the form of prefab assets. You can write Python scripts that parse imported source scenes and write out any number of prefab assets. With procedural prefabs, some of the process for building prefabs is shifted back into digital content creation (DCC) tools such as Maya and Blender, streamlining the asset creation workflow for artists and designers.

The workflow produces procedural prefabs using Python scripts inside the scene pipeline or when when the Prefab gem generates a default procedural prefab.

![High level view of how procedural prefabs work with Python scripts](/images/user-guide/assets/scene-pipeline/proc_prefab_workflow.png)

## The characteristics of a procedural prefab

A prefab is a prefabricated description of entities, components, and properties for a scene. Prefabs serve the purpose of easily building and modifying large and complex worlds for games. A user can author a prefab inside the O3DE Editor.

More information about the [Prefab](docs/user-guide/interactivity/prefabs) feature.

It is also possible to define a procedure to produce a product prefab asset. Python scripts are the most typical way to define procedural prefab product assets. This feature gives the ability to maintain the prefab template inside a source art scene file such as FBX or glTF. Content creators are free to instantiate these procedural prefabs in a level and they are automatically updated when the source scene is updated.

These procedural prefab assets are treated as read only prefabs inside the Editor since they are created by the definition from the original source scene file plus the script that produced the prefab. In fact, procedural prefabs are placed in the asset cache so they should not be changed directly.

## Producing procedural prefabs

The Prefab gem needs to be enabled by the project to gain the procedural prefab feature. Once the gem is enabled, all source scene files produce a default procedural prefab and the Python scripts will have the ability to produce prefabs.

{{< note >}}
It is possible to turn off the default procedural prefab by setting the registry key "/O3DE/Preferences/Prefabs/UseProceduralPrefabs" to False.
{{< /note >}}

### Creating procedural prefabs from Python

It is possible to create a procedural prefab using a Python script to hook into the scene pipeline. This script will add a Prefab Group rule into the scene manifest that describes the entities and components it will use. In fact, the script can add many Prefab Groups to the scene manifest if there is more than one scene description. The scripts can split up complex scenes from source files and fill out entities with game components.

{{< note >}}
It should also be noted that the scene pipeline can be updated in C++ if the development team feels more comfortable writing C++ scene builders.
{{< /note >}}

### Building default procedural prefabs

The Prefab gem will separate all the mesh data nodes as mesh groups, assemble a prefab scene description using entities and mesh components, and optionally assign materials to the mesh components. The logic will create empty entities for "transform only" nodes that are encountered, but for the best result the advice is to store mesh data into each node that is expected to show up in the procedural prefab.

{{< note >}}
There are instructions for tagging mesh data nodes with an Atom material using the [o3de_default_material](/blog/posts/blog-udp) user defined property.
{{< /note >}}

## Using procedural	prefabs in the O3DE Editor

For the most part, procedural prefabs are used in the same way that normal authored prefabs are used in the O3DE Editor. They can be instantiated into a level multiple times, can be updated all at once if the source scene is modified, and can be placed inside authored prefabs inside the Entity Outliner.

### Instantiate procedural prefab in the Editor

Once the source scene files are producing procedural prefab assets (with the extension `.procprefab`) they will show up in the Asset Browser as a `(Procedural Prefab)` type.

![Asset Browser](/images/user-guide/assets/scene-pipeline/procprefab_ug_ab.png)

#### Instantiate a procedural prefab in the scene

A O3DE Editor user can instantiate a procedural prefab by right clicking in the level 3D scene and choose the "Instantiate Procedural Prefab..." option.

![Procedural Prefab Context Menu](/images/user-guide/assets/scene-pipeline/procprefab_ug_pp_context.png)

The context menu "Pick Procedural Prefab" will open up to allow the user to choose the Procedural Prefab asset to instantiate.

![Pick Procedural Prefab](/images/user-guide/assets/scene-pipeline/procprefab_ug_pp_pick.png)

It is also possible to simply drag and drop a Procedural Prefab from the Asset Browser into the level 3D scene.

![Procedural Prefab in the Entity Outliner](/images/user-guide/assets/scene-pipeline/procprefab_ug_pp_eo.png)

#### Instantiate a procedural prefab in the Entity Outliner

It is possible to instantiate a procedural prefab directly in the Entity Outliner using the context menu's "Instantiate Procedural Prefab..." option and choose the Procedural Prefab using the "Pick Procedural Prefab" menu.

![Entity Outliner Procedural Prefab](/images/user-guide/assets/scene-pipeline/procprefab_ug_pp_eo_menu.png)

{{< note >}}

In the Entity Inspector that Procedural Prefab asset components and properties are show as "read only" since the properties are generated from the script definition of the components and properties. The entities inside the Procedural Prefab are also immutable.

![Entity Inspector Procedural Prefab Read Only](/images/user-guide/assets/scene-pipeline/procprefab_ug_pp_ei_readonly.png)

{{< /note >}}

### Procedural prefab being used in an authored prefab

A Procedural Prefab can be added to an authored Prefab instance in the Entity Outliner. To do this, the user will need to go into focus mode on the Prefab.

![Entity Outliner Authored Prefab](/images/user-guide/assets/scene-pipeline/procprefab_ug_pp_eo_authored.png)

A user uses the context menu **Instantiate Procedural Prefab...** option to add the Procedural Prefab patch into the authored Prefab.

![Entity Outliner Procedural Prefab Inside](/images/user-guide/assets/scene-pipeline/procprefab_ug_pp_eo_inst.png)

Users cannot add entities in the Entity Outliner nor components in the Entity Inspector to any Procedural Prefab instances. The Asset Processor might re-export the procedural prefab templates at any time which will re-write the `.procprefab` file outside the Editor. The Procedural Prefab templates are backed by the source scene files.

### Save Off Procedural Prefab as Authored Prefab

The Editor can save out a procedural prefab asset as an authored prefab source file as well. This allows Editor users to tweak a procedural prefab asset. The context menu item **Save as Prefab...** for the `(Procedural Prefab)` asset will prompt for a file name to save as an authored Prefab file.

This will allow designers to tweak the entity layout, components, and properties of the prefab template

![Save As Prefab](/images/user-guide/assets/scene-pipeline/procprefab_ug_pp_ab_saveas.png)

{{< note >}}
The authored Prefab will get no updates from the procedural prefab asset once been saved off to an authored prefab.
{{< /note >}}

### Toggling procedural prefab per source asset

Sometimes teams have a reason to turn off the default procedural prefab for a source scene file such as when a script is assigned to create a Prefab Group.

It is possible prevent generating a default procedural prefab using the **Scene Settings** dialog. In the Asset Browser select the source scene file, use the context menu, and select the **Edit Scene Settings...** option.

![Edit Settings](/images/user-guide/assets/scene-pipeline/procprefab_ug_pp_es_toggle.png)

To disable the procedural prefab generation, set the toggle for **Create default procedural prefab?** to the off value.

## Basic guidelines for default procedural prefab

The default procedural prefab logic does a "best guess" to describe the scene in terms of entities, meshes, and materials. This section is meant to help guide artists to export the cleanest version of a default procedural prefab from their DCC tool of choice.

As detailed in the user guide for the [Scene Format Support](docs/user-guide/assets/scene-settings/scene-format-support), O3DE scene asset importing uses:

- a right-handed coordinate system
- +Z as the up axis
- -Y is the viewer axis
- base measurement unit is one cubic meter per world unit

There is no support for setting up level of detail inside the procedural prefab nor does it set up an actor or motions for animation.

The `o3de_default_material` user defined property that the default procedural prefab looks for to assign an AZ Material using a product asset path to an `.azmaterial` asset.

