---
linkTitle: Scene Pipeline 
title: The Scene Pipeline and SceneAPI
description: The complete guide to scene assets, processing, and the Scene Pipeline in Open 3D Engine (O3DE).
weight: 100
toc: true
---

The scene pipeline is a specialized asset builder that imports source scene files and allows scene builders to export scene product assets such as models and animations.

| Topic | Description |
| --- | --- |
| [Source API](scene-api) | Describes the set of libraries, rules, and groups to process a source scene files. |
| [Scene Graph](scene-graph) | Describes the scene graph nodes, hierarchial data, and mechanism of iteration. |
| [Scene Manifest](scene-manifest) | Contains instructions on what to do with the SceneGraph content. |
| [Scene Builder](scene-builder) | Asset builders that are designed to manage and export parts of the scene graph. |
| [User Defined Properties](user_defined_properties.md) | A mechanism to use custom properties set in source scene files in the scene builder pipeline. |
| [Procedural Prefab](procedural_prefab.md) | Use Python to process prefab assets from scene source files. |

The following diagram shows the scene pipeline flow:

![Scene pipeline flow.](/images/user-guide/assets/scene-pipeline/scene-pipeline-flow.png)

In the preceding diagram:

* The yellow outlined shapes are asset builder events
* The blue outlined shapes are scene builder events using BindCall()
* The green outlined shapes are scene builder events via the Behavior Component
