---
linkTitle: Assets 
title: The Asset Pipeline and Asset Processing 
description: The complete guide to assets, asset processing, and the Asset Pipeline in Open 3D Engine (O3DE).
weight: 700
toc: true
---

Topics in this section cover the **Asset Pipeline** and asset processing, including what source assets are, how they are discovered and tracked, and how they are processed into runtime optimized product assets. There are also guides for **Asset Processor**, which manages the Asset Pipeline, as well as the **Scene Settings** and **Texture Settings** tools, that customize source asset processing. The final guide explains how to create custom **Asset Builders** with **Python Asset Builder**.

| Topic Area | Description |
| --- | --- |
| [Asset Pipeline](pipeline) | The Asset Pipeline is the end-to-end process that transforms source assets into runtime optimized product assets. |
| [Scene Pipeline](scene-pipeline) | The scene pipeline is a specialized asset builder that imports source scene files and allows scene builders to export scene product assets such as models and animations.  |
| [Asset Processor](asset-processor) | Asset Processor discovers source assets, manages asset process jobs, and maintains the [Asset Cache](pipeline/asset-cache). |
| [Scene Source Assets](scene-settings) | Information and best practices for creating assets. These topics include details on how to use [Scene Settings](scene-settings/scene-settings) to customize how meshes, actors, motions, and PhysX colliders are processed. |
| [Texture Settings](texture-settings) | With Texture Settings, you can customize how source image assets are processed. |
| [Python Asset Builder](builder) | With Python Asset Builder, you can create custom Asset Builders for known file types. |
| [Asset Types](asset-types) | This table lists O3DE's supported source asset types and the product assets they generate. |
