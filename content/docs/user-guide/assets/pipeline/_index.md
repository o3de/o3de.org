---
linkTitle: Asset Pipeline 
title: The Asset Pipeline and Asset Processing 
description: The complete guide to assets, asset processing, and the Asset Pipeline in Open 3D Engine (O3DE).
weight: 100
toc: true
---

The topics in this section explain the **Asset Pipeline** and asset processing in **Open 3DE Engine (O3DE)**. The entire process, from source assets to product assets stored in the **Asset Cache**, including explanations of scan directories, **Asset Builders**, and asset dependencies, is covered in the topics below. 

| Topic Area | Description |
| --- | --- |
| [Asset Processing](asset-processing) | The Asset Pipeline is the end-to-end process that transforms source assets into runtime optimized product assets. |
| [Source Assets](source-assets) | An explanation of source assets, how asset processing can be customized with sidecar files, and the scenarios that trigger source asset processing. |
| [Scan Directories](scan-directories) | **Asset Processor** monitors scan directories in O3DE projects for new and updated source assets. |
| [Asset Builders](asset-builders) | Asset Builders generate asset process jobs and generate product assets. |
| [Asset Dependencies and Identifiers](asset-dependencies-and-identifiers) | Asset dependencies and identifiers ensure that asset references can be met when assets are processed, loaded, and packaged. |
| [Asset Cache](asset-cache) | The Asset Cache stores the runtime optimized product assets and the information Asset Processor needs to track assets and keep them up to date. |
| [Asset Types](asset-types) | A table of asset types supported by O3DE's asset pipeline. |
