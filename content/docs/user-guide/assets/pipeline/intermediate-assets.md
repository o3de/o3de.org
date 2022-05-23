---
linkTitle: Intermediate Assets
title: Intermediate Assets
description: In Open 3D Engine (O3DE), intermediate assets allow builders to be chained together and add discrete steps for asset processing which increase builder reusability.
weight: 600
toc: true
---

Intermediate assets allow builders to be chained together and add discrete steps for asset processing which increase builder reusability.

## How intermediate assets work

When **Asset Processor** completes a job, it inspects the output flags and copies any outputs marked with the IntermediateAsset flag into a new `<Cache>/Intermediate Assets` directory.  This is a scan directory that Asset Processor monitors for files to process like any other scan directory.  When an intermediate asset is copied to the directory, it's scanned by Asset Processor and is sent to any matching builders, just like a source asset.

For more technical details on how intermediate assets work, refer to: https://github.com/o3de/sig-content/blob/main/rfcs/rfc-46-intermediate-asset-products.md

## Using intermediate assets

* In the CreateJobs function of your builder, create a `JobDescriptor` with the platform identifier set to `AssetBuilderSDK::CommonPlatformName` and add it to the `response.m_createJobOutputs`.  This indicates the job is meant to be run on all platforms. Only one JobDescriptor is required per job, regardless of the active platforms.
* In the ProcessJob function, process the file and output the result. Create a JobProduct and set `m_outputFlags = AssetBuilderSDK::ProductOutputFlags::IntermediateAsset`.  Add it to the response: `response.m_outputProducts.push_back(jobProduct)`.

That's all that's required to output an intermediate asset to be consumed by another builder.  Builders can be chained together like this for as many processing steps as required.

## Limitations
 * An output must be either an intermediate or a product asset, not both.  If you want to output both, you'll need to create 2 separate jobs in CreateJobs.
 * Product assets cannot output for the Common platform.
 * Intermediate assets must output for the Common platform.
 * Due to the above limitations, when outputting both types of products, the ProcessJob function will be run multiple times per file and must take care to output the correct type for the current job request.

If you want to output platform-specific intermediates, the recommended method is to output all your intermediates with platform prefixes on the name, and then output an additional manifest file which simply references all the other outputs. For example you might make a job which outputs `pc_myshader.bin`, `mac_myshader.bin`, and `myshader.shadermanifest`. You could then create another builder to consume these using `*.shadermanifest` as the input pattern.
