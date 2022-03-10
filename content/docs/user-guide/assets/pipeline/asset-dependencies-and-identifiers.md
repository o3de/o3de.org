---
linkTitle: Asset Dependencies and Identifiers 
title: Asset Dependencies and Identifiers 
description: Asset dependencies and identifiers ensure that asset references can be met when assets are processed, loaded, and packaged.
weight: 500
toc: true
---

Both source and product assets might have dependencies. Source asset and job dependencies are inputs to the **Asset Pipeline** and asset processing jobs. Product dependencies are outputs from the Asset Pipeline and are used to load and package product assets. Asset identifiers help ensure both types of asset dependencies are met.

## Source dependencies

Source dependencies are a process time concept.

A source dependency triggers **Asset Processor** to rerun the process job whenever the file declared as a source dependency changes. For example, a `.assetinfo` file is a source dependency and triggers a process job on its source asset when it is modified.

## Job dependencies

Job dependencies are a process time concept.

A job dependency is declared against another job. If a job matching that description exists in the job queue, when the job with the dependency is up next to run, it will first make sure all of its job dependencies are run. Also, if a job dependency runs again, it will trigger any jobs with that dependency to run. The shader and material relationship is an example of a job dependency. The material cannot be processed until the shader job is completed because the material requires information from product assets of the shader job. If the source shader asset is changed, causing the shader job to re-run, then the material job with that job dependency will re-run after the shader job finishes.

Required job dependencies cause the process job to fail if the required product asset is not available, however, job dependencies can be marked optional. Optional job dependencies make use of the requested product asset if it exists, but can complete without the requested product asset.

Job dependencies can be declared on a product asset of the associated job. If this is done, then the job that is the dependency will only cause the job with the dependency to re-run if the hash of the contents of the specified product asset change. This is best used when the dependency has multiple product assets but the job with the dependency only references one of those product assets.

## Product dependencies

Product dependencies are a runtime concept.

Product dependencies contain data on the relationships between product assets. Product dependencies are used during runtime loading and asset bundling.

When a product asset is loaded at runtime, the product dependencies specify other product assets that must be loaded for this product asset to function. Similarly, when bundling assets, the product dependencies specify additional product assets required by the assets being bundled. An easy to understand example is a level prefab.  All the meshes, shaders, materials, audio files, and scripts used by entities and prefabs that are placed in the level are dependencies of the level prefab. When you load or bundle a level prefab, the chain of asset dependencies specifies all the product assets required by the level prefab, as well as the product assets referenced by those dependencies, and so on, until all the product dependencies are met.


Product dependencies can also be marked as required or optional. If a required product dependency is not available, the runtime load process or the bundling process fails. If an optional product dependency is not available, the runtime load process or bundling process can proceed.

## Asset identifiers

Source assets are identified by a Universally Unique Identifier (UUID). This is also referenced as a Globally Unique Identifier (GUID) in some parts of O3DE. The source asset UUID is generated based on the file name and scan directory relative path. This ensures the source asset UUID is identical on any host platform machine for the project.


Product assets are identified by a combination of the UUID for the source asset and a sub ID based on the fingerprint of the **Asset Builder** that produced the product asset. This ensures each product asset ID is deterministic and unique, and that references to these product assets can be maintained when assets are updated. In the rare event of a product asset ID collision, Asset Processor notifies you that an asset already exists with the product ID so you can resolve the issue.


Note that source assets are not specific to platforms, but product assets are unique across platforms. If you are authoring a builder that outputs product assets differently for different platforms, you should consider how you will access these product assets at runtime. Most of the time the product asset differences are performance optimizations per platform, and in that case it's recommended that the same sub ID is used for similar assets for each platform. For example, the source asset _dev_purple.tif generates a streamingimage file _dev_purple.tif.streamingimage for all platforms, which has the sub ID 1000 on all platforms. This means that any other content referencing this file can reference that sub ID and get the same functional image regardless of which platform the project is running on.
