---
linkTitle: Asset Dependencies and Identifiers 
title: Asset Dependencies and Identifiers 
description: Asset dependencies and identifiers ensure that asset references can be met when assets are processed, loaded, and packaged.
weight: 500
toc: true
---

Both source and product assets might have dependencies. Source asset and job dependencies are inputs to the **Asset Pipeline** and asset processing jobs. Product dependencies are outputs from the Asset Pipeline and are used to load and package product assets. Asset identifiers help ensure both types of asset dependencies are met.

## Source and job dependencies

Source and job dependencies are a process time concept.

A source dependency triggers **Asset Processor** to rerun the process job whenever a source asset changes. For example, a `.assetinfo` file is a source dependency and triggers a process job on its source asset when it is modified.

A job dependency requires the product asset of another process job before this process job can be run. The shader and material relationship is an example of a job dependency. The material cannot be processed until the shader product asset is generated because the material requires information about the shader product asset.

Required job dependencies cause the process job to fail if the required product asset is not available, however, job dependencies can be marked optional. Optional job dependencies make use of the requested product asset if it exists, but can complete without the requested product asset.

In some cases, a builder requires the output of another builder in order to process the asset it is working on.  If the other builder only outputs a single product, a regular job dependency works just fine.  Sometimes, however, the other builder outputs many products, some of which might not be updated every time the builder runs.  This can result in Asset Processor doing unnecessary work to rebuild dependent assets when their dependencies haven't actually changed.  For these cases, builders can specify the exact set of products they depend on by providing a list of SubIds in the AssetBuilderSDK::JobDependency::m_productSubIds field.  When a builder provides a list of specific products to depend on, Asset Processor will only trigger the dependency when the hash of the contents of any of the specified products changes.

## Product dependencies

Product dependencies are a runtime concept.

Product dependencies contain data on the relationships between product assets. Product dependencies are used during runtime loading and asset bundling.

When a product asset is loaded at runtime, the product dependencies specify other product assets that must be loaded for this product asset to function. Similarly, when bundling assets, the product dependencies specify additional product assets required by the assets being bundled. An easy to understand example is a level prefab.  All the meshes, shaders, materials, audio files, and scripts used by entities and prefabs that are placed in the level are dependencies of the level prefab. When you load or bundle a level prefab, the chain of asset dependencies specifies all the product assets required by the level prefab, as well as the product assets referenced by those dependencies, and so on, until all the product dependencies are met.


Product dependencies can also be marked as required or optional. If a required product dependency is not available, the runtime load process or the bundling process fails. If an optional product dependency is not available, the runtime load process or bundling process can proceed.

## Asset identifiers

Source assets are identified by a Universally Unique Identifier (UUID). The source asset UUID is generated based on the file name and scan directory relative path. This ensures the source asset UUID is identical on any host platform machine for the project.


Product assets are identified by a combination of the UUID for the source asset and a sub ID based on the fingerprint of the **Asset Builder** that produced the product asset. This ensures each product asset ID is deterministic and unique, and that references to these product assets can be maintained when assets are updated. In the rare event of a product asset ID collision, Asset Processor notifies you that an asset already exists with the product ID so you can resolve the issue.
