---
linkTitle: Product Assets 
title: Product Assets
description: Product assets are the runtime ready form of content in O3DE projects.
weight: 400
toc: true
---

A **product asset** is the runtime ready form of content in O3DE projects.

The [Asset Processor](/docs/user-guide/assets/assets/asset-processor/) uses [Asset Builders](/docs/user-guide/assets/pipeline/asset-builders/) to generate product assets from [source assets](/docs/user-guide/assets/pipeline/source-assets/).

This page covers best practices for generating product assets from an asset builder.

# Determistic generation

It's best practice to make product asset generation deterministic. The same source asset, with the same version of the asset builder for that source asset, should generate the exact same product asset each time it is generated. Both locally for the same contributor, and for all contributors on an O3DE project. This should be done for several reasons.

* Asset reference stability - It's easier to debug issues with product assets if they are identical for all contributors on a project.
* Time spent re-processing assets - Job dependencies that are declared with a sub ID to match to a specific product will cause the job to re-process each time the product changes. This system was built to save time spent re-running jobs, to only run jobs when they need to be run. Product assets that change each time the job is run circumvent this system.
* Minimizing asset bundle sizes - [Asset bundling](docs/user-guide/packaging/asset-bundler/) is a step in the process of generating distributable release builds. A key feature of asset bundling is the use of product asset hashes to track which product assets have changed since the last published release build. If product assets change each time they are generated, that will results in asset bundling on patches including content that may not have been meaningfully modified since the last release.

# Emit product dependencies

[Product dependencies](/docs/user-guide/assets/pipeline/asset-dependencies-and-identifiers/#product-dependencies) have two functional purposes: They are used during asset loading to make sure necessary assets are loaded based on the dependency graph from an initial asset load request, and they are used during [asset bundling](docs/user-guide/packaging/asset-bundler/) to make sure asset bundles include all relevant assets.

# Debug output flag

The debug output setting is a flag that asset builders can check, to change how and what they emit. It's most commonly used to emit human readable product asset information, to assist in debugging issues with asset builders and product assets.

The debug flag can be accessed via the job parameters on the job description on the job request: `request.m_jobDescription.m_jobParameters.find(AZ_CRC_CE("DebugFlag"));`

As an example, the scene builder will emit multiple debug output files when this flag is set. These additional product asset files contain both human readable information about the scene graph for the scene file being parsed, and that same information formatted to be easily read by automated tests.

This parameter can be set when running Asset Processor by either including `--debugOutput` on the command line, or the "Debug Output" toggle on the Settings page of the Asset Processor graphical user interface.

# Sub ID generation

The sub ID is a number used as a stable identifier for a particular product asset generated from a source asset. A product asset's sub ID is combined with the associated source asset's UUID to define that product asset's asset ID. Product assets are ideally referenced via this asset ID. See [referencing other product assets](#Referencing-other-product-assets) for details.

It's important to stabilize sub IDs used for product assets across changes to the source asset. This is because the sub ID is used to reference the product asset, so if the sub ID changes, that reference will break.

# Referencing other product assets

It's common for product assets to reference other product assets at runtime. For example, a material references image files as textures.

When deciding how to track these references in the product asset, asset IDs are going to be the most stable. An asset ID is a combination of the source asset identifier, in the form of a UUID, and a sub ID to track the specific product asset. Asset IDs can be stabilized to remain the same when an asset is renamed or moved. This means that, if a product asset references another product asset via asset ID, that reference will remain stable if the referenced asset is relocated. You can read more about asset relocation [here](/docs/user-guide/assets/pipeline/metadata/).

You can read more about referencing product assets from other product assets [here](/docs/user-guide/assets/pipeline/asset-builders/#references-from-product-assets-to-other-files).


