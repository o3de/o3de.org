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

A source dependency triggers **Asset Processor** to rerun the process job whenever the file declared as a source dependency changes. For example, image files declare a source dependency on the `.preset` file containing the preset information used to process the image, so if the preset changes the image will be reprocessed and use the new preset settings.

## Job dependencies

Job dependencies are a process time concept.

A job dependency should be used when processing one asset requires reading the product asset output of another, different job. A job dependency is declared against another job. If a job matching that description exists in the job queue, when the job with the dependency is up next to run, it will first make sure all of its job dependencies are run. When a job runs again, it will trigger any jobs that depend on it to run. The shader and material relationship is an example of a job dependency. The material cannot be processed until the shader job is completed because the material requires information from product assets of the shader job. If the source shader asset is changed, causing the shader job to re-run, then the material job with that job dependency will re-run after the shader job finishes.

Required job dependencies cause the process job to fail if the required product asset is not available.

Job dependencies can optionally specify a set of product assets from the associated job. If this is done, then the job that is the dependency will only cause the job with the dependency to re-run if the hash of the contents of the specified product asset(s) change. This is best used when the dependency has multiple product assets but the job with the dependency does not reference all of these product assets. As an example, if one job outputs a configuration file and a logic file (for example, shaders), and another job uses the configuration file (for example, materials), by declaring a job dependency on the configuration product asset, the job with this dependency would only re-run if the configuration asset changes, and not if the logic asset changes.

## Product dependencies

Product dependencies are a runtime concept.

Product dependencies contain data on the relationships between product assets. Product dependencies are used during runtime loading and asset bundling.

When a product asset is loaded at runtime, the product dependencies specify other product assets that must be loaded for this product asset to function. Similarly, when bundling assets, the product dependencies specify additional product assets required by the assets being bundled. An easy to understand example is a level prefab.  All the meshes, shaders, materials, audio files, and scripts used by entities and prefabs that are placed in the level are dependencies of the level prefab. When you load or bundle a level prefab, the chain of asset dependencies specifies all the product assets required by the level prefab, as well as the product assets referenced by those dependencies, and so on, until all the product dependencies are met.

Product dependencies can also be marked as required or optional. If a required product dependency is not available, the runtime load process or the bundling process fails. If an optional product dependency is not available, the runtime load process or bundling process can proceed.

## Asset identifiers

Source assets are identified by a Universally Unique Identifier (UUID). This is also referenced as a Globally Unique Identifier (GUID) in some parts of O3DE. The source asset UUID is generated based on the file name and scan directory relative path. This ensures the source asset UUID is identical on any host platform machine for the project.

Product assets are identified by a combination of the UUID for the source asset and a sub ID defined by the **Asset Builder** that produced the product asset. It is the responsibility of the builder author to make sure their sub IDs are deterministic and unique, so that references to these product assets can be maintained when assets are updated. When authoring a builder, keep in mind that other builders may process the same source asset and also generate products, which is one area sub ID collisions can occur. When authoring a builder, try to keep sub IDs as consistent as possible across changes to a source asset, otherwise downstream references, such as a prefab file referencing a product asset via asset ID, will break if that sub ID no longer resolves, or resolves to a different product asset. In the rare event of a product asset ID collision, Asset Processor notifies you that an asset already exists with the product ID so you can resolve the issue.

Note that source assets are not specific to platforms, but product assets are unique across platforms. If you are authoring a builder that outputs product assets differently for different platforms, you should consider how you will access these product assets at runtime. Most of the time the product asset differences are performance optimizations per platform, and in that case it's recommended that the same sub ID is used for similar assets for each platform. For example, the source asset _dev_purple.tif generates a streamingimage file _dev_purple.tif.streamingimage for all platforms, which has the sub ID 1000 on all platforms. This means that any other content referencing this file can reference that sub ID and get the same functional image regardless of which platform the project is running on.
