---
linkTitle: Source Assets 
title: Source Assets
description: Source assets and how they are processed in Open 3D Engine (O3DE).
weight: 200
toc: true
---

Source assets are files that contain unprocessed data that you want to load in **Open 3D Engine (O3DE) Editor** or **Launcher**. You can create source assets such as models, textures, animations, and audio files in digital content creation (DCC) applications. Source assets such as `.material`, `.inputbindings`, and `.scriptcanvas` files are created with O3DE's tools. These source assets must be processed through the **Asset Pipeline** and their product assets must be stored in your project's **Asset Cache** to be used by O3DE.

{{< note >}}
Some source assets, such as `.xml` files, might not need to be processed as a product asset. **Asset Processor** uses a simple copy operation to copy these assets to the Asset Cache.
{{< /note >}}

## Processing source assets

Each source asset type has a customizable set of rules used by their **Asset Builder** to generate product assets. For graphics and animation source assets, O3DE provides tools such as **Scene Settings** and **Texture Settings** that you can use to create custom processing rules for each source asset. With Texture Settings, you can specify how a texture source asset is used, a mipmap chain, and how it's sampled and filtered. With Scene Settings, you can specify what meshes, skeletons, and motions to process from a `.fbx` source asset, and how physics colliders are generated.

When the asset processing rules are customized, the options are stored in a `.assetinfo` sidecar file in the same directory as the source asset. If **Asset Processor** finds a `.assetinfo` file, the associated source asset is processed according to the options in the `.assetinfo` file. Otherwise, Asset Processor uses default rules to process the source asset based on its type.

If you have many source assets to process, you might find using the Texture Settings and Scene Settings tools time consuming. The `.assetinfo` sidecar file is in JSON format and can be generated and modified with Python. It is possible, for example, to script the export process from a DCC application to automatically generate a `.assetinfo` file, or run a batch Python script over a source asset repository to add or modify options in the `.assetinfo` files. Many assets in O3DE are JSON formatted: `.material`, `.prefab`, and `.physicsmaterial` files, for example, are all in JSON format and can be automatically generated and modified with Python.

Python can also be used to customize asset processing. Python scripts can be run during asset processing to modify how product assets are produced. **Python Asset Builder** provides a way to create custom asset processing jobs. For more information, refer to [Customize Asset Processing with Python Asset Builder](/docs/user-guide/assets/builder/).


With JSON and Python scripting, it's possible to customize and automate the entire asset pipeline, including integrating new tools and asset types.

## Asset reprocessing

Source asset files are tracked by timestamp, file hash, and Asset Builder fingerprint. To ensure the product assets for your project are always up to date, Asset Processor automatically schedules asset processing jobs in the following scenarios:

### Changes to the source asset

If a source asset is modified, and the timestamp of a source asset or its `.assetinfo` doesn't match the timestamp information of the last process job, Asset Processor adds a job to reprocess the source asset.

{{< note >}}
Asset Processor has an option to use file hashes instead of timestamps to detect file changes. However, using hashes to detect file changes can significantly increase the analysis time for source assets.
{{< /note >}}

### Changes to job dependencies

Some assets have [job dependencies](asset-dependencies-and-identifiers). Changes to a job dependency trigger Asset Processor to schedule a job to reprocess source assets with that dependency. For example, materials are dependent on shaders. If a shader is modified and reprocessed, then all the materials that reference that shader are automatically reprocessed as well.

### Changes to the Asset Builder

Asset Builders use a *fingerprint* defined in their source code to identify the version of the Asset Builder. The Asset Builder fingerprint is stored in the information about the job that produced the product asset. If an Asset Builder for a particular asset type has been updated and its fingerprint has been modified, it won't match the fingerprint of the jobs that processed the source assets supported by the Asset Builder. This triggers all source assets that use the Asset Builder to be reprocessed.


## Critical assets

Some source assets are marked as critical in their Asset Builders and are processed before non-critical assets. Critical assets are required by the engine, so that the engine can function. Shaders are critical assets. If a shader hasn't been processed, materials that use the shader can't be rendered. Critical assets prevent O3DE Editor and Launcher from launching until they have been processed. When you launch O3DE Editor for the first time, the splash screen displays information about asset processing. It might take several minutes for critical assets to process before the initial launch of O3DE Editor.
