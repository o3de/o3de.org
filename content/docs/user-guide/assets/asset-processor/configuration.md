---
linkTitle: Configuration
title: Asset Processor Configuration
description: Configure Asset Processor for Open 3D Engine (O3DE) with AssetProcessorPlatformConfig.setreg.
weight: 300
toc: true
---

## Settings Registry

Many of the content processing rules that **Asset Processor** uses for your project are controlled by settings registry values. You can view the default values in [`Registry/AssetProcessorPlatformConfig.setreg`](https://github.com/o3de/o3de/blob/development/Registry/AssetProcessorPlatformConfig.setreg). This file is well commented, and full of examples you can use to customize configuration for your project's asset pipeline.

{{< todo issue="https://github.com/o3de/o3de.org/issues/706" >}}
To add project-specific or user-specific overrides, you can use the same pattern you would follow with other settings registry overrides. The linked issue covers documenting the setttings registry override functionality.
{{</todo>}}

### Processing Assets for Multiple Platforms

To process assets for a non-host platform, you can enable additional platforms under the settings registry path `Amazon/AssetProcessor/Settings/Platforms`. Note that this is only one step in enabling a platform for your project. See the [platforms](/docs/user-guide/platforms/) section of the documentation for how to set up and deploy to additional platforms.

### Asset Job Management

By default, the Asset Processor will create a worker job for each logical core on the host machine. If you want to control the number of worker jobs, adjust the setting `Amazon/AssetProcessor/Settings/Jobs/maxJobs`. A value of zero will have the Asset Processor create a job for each logical core on your machine. A value of one can be useful when debugging, if you wish to attach a debugger to a running builder processing a specific asset. Setting a value lower than the number of logical cores will allow you to reduce the resources asset processing consumes with the trade off that assets will take longer to process.

### Asset Cache Server

The Asset Cache server's address can be set using the setting path `Amazon/AssetProcessor/Settings/Server/CacheServerAddress`. In most cases this will be a network share, an example for Windows looks like `T:\\AssetServerCache`.

{{< note >}}
This feature is in development. If you have questions about the Asset Cache server, reach out to us on the [O3DE Discord](https://discord.com/invite/o3de).
{{< /note >}}

### Metadata Files

Metadata files for assets are managed under the setting path `Amazon/AssetProcessor/Settings/MetaDataTypes`, with a format mapping the metadata extension to associated file extension. For example, FBX files use a metadata file type with the extension `.fbx.assetinfo`, which is defined under this setting path as `"fbx.assetinfo": "fbx"`. When adding a new asset type and you want to track settings in a metadata file, make sure to add it to this setting path. This is so the Asset Processor will re-run the processing job for the source asset when the metadata file changes.

### Scan Folders

Scan folders can be added as registry settings. In most cases you'll use the asset folders of Gems or your project, which will be automatically added as scan folders. However, if you need to add a new scan folder for tracking source assets, you can add it under the registry setting path `Amazon/AssetProcessor/Settings/` with a pattern of:

```json
"ScanFolder <scan folder name>": {
  "watch": "<scan folder path>",
  "display": "<Display name for the scan folder>",
  "recursive": <0|1>, // 1 scans all subdirectories for assets recursively, 0 only includes assets in this folder and not subfolders.
  "order": <any number> // The order this scan folder is handled compared to other scan folders.
}
```

Scan folder order is used when two assets have the exact same relative path to the scan folder root. In these situations, the source asset in the scan folder with the higher priority will be used over the other one.

### Excluding Folders

The exclusion system is used to block files matching patterns from asset processing. These exist under the registry path `Amazon/AssetProcessor/Settings/Exclude` with a pattern that looks like:

```json
"Exclude <exclusion title>": {
  "pattern": "<regex of files to exclude>"
}
```

### Asset Processing Tags

Each platform has a collection of tags applied to it, under the registry path `Amazon/AssetProcessor/Settings/`. These tags are checked by other systems for processing, but don't directly trigger any activity themselves. Platform tags follow the pattern:

```json
"Platform <platform name>": {
  "tags:" "<comma-separated list of tags>"
}
```

### Copy Jobs

Copy jobs are for source assets that should be copied directly to the cache as a product asset. Some assets don't need additional processing, so setting up a copy job this way is quicker than authoring an entire C++ based builder to make content of that type available to your game as an asset. Copy jobs are managed by a registry setting pattern under `Amazon/AssetProcessor/Settings/`, using the following pattern:

```json
"RC <Copy job name>": {
  // Matching type can be glob or pattern, do not use both. Pattern is for regular expression based matching, glob is useful for if you just want to match on a file extension.
  "glob": "*.<extension>",
  "pattern": "<regex pattern to match this copy job>", // It's either glob or pattern, not both
  "productAssetType": "<The UUID for the AZ::Data::AssetType for the product asset>",
  "params": "<copy|skip>", // Use "copy" for copy jobs, "skip" to skip processing. Skip is mostly used for platforms that don't need a particular asset type.
  "<platform tag>": "<copy|skip>", // Copy or Skip for platforms matching this tag. For example, if you don't want to run the copy job for platforms with the Server tag, this line would be `"server": "skip"`. See the earlier platform tag section for details.
}
```
