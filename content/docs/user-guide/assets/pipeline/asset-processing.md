---
linkTitle: Asset Processing 
title: Asset Processing and the Asset Pipeline 
description: An introduction to asset processing and the Asset Pipeline in Open 3D Engine (O3DE).
weight: 100
toc: true
---

In **Open 3D Engine (O3DE)**, an asset is a resource file, saved to disk, that is consumed by O3DE in some way. Assets include meshes, textures, animation, and audio files created in third-party applications, as well as assets created with O3DE's tools and automated processes.

Most assets must undergo some form of processing to a runtime optimized format so that they can be used by **O3DE Editor** and **Launcher**. For example, a texture stored as a `.png` file is converted to a format that allows it to be streamed and efficiently stored in the memory of a video card (GPU). This end-to-end conversion process is the **Asset Pipeline**.

In O3DE, assets can be divided into two categories; *source* assets and *product* assets. Source assets are portable assets created with third-party applications and with O3DE's tools; the inputs for the Asset Pipeline. Product assets are the runtime optimized assets required by O3DE Editor and Launcher; the products of Asset Pipeline.

## Asset Pipeline overview

**Asset Processor** launches when you start O3DE and runs as a background service while you work with O3DE. Asset Processor monitors a pre-configured set of [*scan directories*](scan-directories) for changes. When Asset Processor detects a new or changed file, it determines what type of asset the file contains. It then queues a job to process the source asset. An **Asset Builder** for the source asset type generates a product asset. The runtime optimized product asset is stored in the **Asset Cache** for your project. The result is that your project's assets are constantly kept up to date. New and updated assets are ready to use as quickly as possible, and are hot reloaded in O3DE Editor or Launcher during runtime. The assets used in O3DE Editor are the same assets used by your deployment runtime.

Below is a simple flowchart showing the process for a mesh file.

![Mesh processing flowchart example](/images/user-guide/assets/pipeline/mesh-processing.svg)

1. Source assets are placed in scan directories that are monitored by Asset Processor.
1. Asset Processor detects new or changed source assets.
1. Asset Processor determines the content of the source asset and how to process it.
1. Asset Processor creates a job to process the source asset.
1. An Asset Builder generates runtime optimized product assets for specific deployment platforms.
1. Asset Processor gathers information about the job and product assets and updates the Asset Cache.
1. The product assets can be loaded by O3DE Editor and Launcher.

In the mesh processing diagram above, the `.fbx` file containing the mesh (source asset) produces an `.azmodel` and several `.azbuffer` files (product assets) in the Asset Cache. It's common, particularly with art assets, for an Asset Builder to generate multiple product assets from a single source asset.
