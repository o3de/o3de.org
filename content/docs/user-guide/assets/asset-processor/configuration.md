---
linkTitle: Configuration
title: Asset Processor Configuration
description: Configure Asset Processor for Open 3D Engine (O3DE) with AssetProcessorPlatformConfig.setreg.
weight: 300
toc: true
---

Many of the rules for how **Asset Processor** will process content for your project are controlled by settings registry values. You can view the default values in [`Registry/AssetProcessorPlatformConfig.setreg`](https://github.com/o3de/o3de/blob/development/Registry/AssetProcessorPlatformConfig.setreg). This file is well commented, and full of examples you can use for specific configuration on your project's asset pipeline.

To process assets for a non-host platform, you can enable additional platforms under the settings registry path `Amazon/AssetProcessor/Settings/Platforms`. Note that this is only one step in enabling a platform for your project. See the [platforms](/docs/user-guide/platforms/) section of the documentation for how to set up and deploy to additional platforms.

By default, the Asset Processor will create a worker job for each logical core on the host machine. If you wish to manage this yourself, you can adjust the setting `Amazon/AssetProcessor/Settings/Jobs/maxJobs`. A value of zero will have the Asset Processor create a job for each logical core on your machine. A value of one can be useful when debugging, if you wish to attach a debugger to a running builder processing a specific asset. Other values lower than your logical core count can be useful to manage the impact asset processing has on your machine while you are trying to perform other tasks, with the tradeoff of a longer time before all assets are processed.

The asset cache server's address can be set using the setting path `Amazon/AssetProcessor/Settings/Server/CacheServerAddress`. Documentation for this feature is still in progress, feel free to reach out on Discord if you have questions about the Asset Cache Server in the meantime.

Meta data file types for assets are managed under the setting path `Amazon/AssetProcessor/Settings/MetaDataTypes`, with a format of meta data extension : associated file extension, for example FBX files use a meta data file type with the extension fbx.assetinfo, which is defined under this setting path as "fbx.assetinfo": "fbx". If you are adding a new asset type and want to use a metadata file to track some settings for the new asset type, make sure to add it to this setting path, so the Asset Processor will re-run the processing job for the source asset when the meta data file changes.

Scan folders can be added as registry settings. In most cases you'll use the asset folders of Gems or your project, which will be automatically added as scan folders. However, if you need to add a new scan folder for tracking source assets, you can add it under the registry setting path `Amazon/AssetProcessor/Settings/` with a pattern of:
```json
"ScanFolder _scan folder name here_": {
  "watch": "_path to watch folder_",
  "display": "_display name for scan folder_",
  "recursive": 0 or 1, // 1 will tell the Asset Processor to look in sub folders, recursively for additional source assets. 0 it will not.
  "order": any number // The order this scan folder is handled compared to other scan folders.
}
```
Scan folder order is used when two assets have the exact same relative path to the scan folder root. In these situations, the source asset in the scan folder with the higher priority will be used over the other one.


You can use the exclusion system to block files matching patterns from asset processing. These exist under the registry path Amazon/AssetProcessor/Settings/ with a pattern that looks like:
```json
"Exclude _exclusion title_": {
  "pattern": "regular expression pattern, anything that matches this pattern will be ignored by the Asset Processor"
}
```

Each platform has a collection of tags applied to it, under the path `Amazon/AssetProcessor/Settings/`. These tags are then checked by other systems and don't do anything directly themselves. These follow the pattern:
```json
"Platform _platform name_": {
  "tags:" "comma,separated,list,of,tags"
}
```

Copy jobs are for source assets that should be copied directly to the cache as a product asset. Some assets don't need additional processing, so setting up a copy job this way is quicker than authoring an entire C++ based builder to make content of that type available to your game as an asset. Copy jobs are managed by a registry setting pattern under `Amazon/AssetProcessor/Settings/`, using the following pattern:
```json
"RC _copy job name_": {
  // Matching type can be glob or pattern, do not use both. Pattern is for regular expression based matching, glob is useful for if you just want to match on a file extension.
  "glob": "*.extension",
  "pattern": "regex pattern to match this copy job", // It's either glob or pattern, not both
  "productAssetType": "The UUID for the AZ::Data::AssetType for the product asset",
  "params": "copy" or "skip", // Use "copy" for copy jobs, "skip" to skip processing. Skip is mostly used for platforms that don't need a particular asset type.
  "platform tag": "copy" or "skip", // Copy or Skip for platforms matching this tag. See the earlier platform tag section for details.
}
```

The `Registry/AssetProcessorPlatformConfig.setreg` is well commented and has many syntax examples for the available configuration options.

To add project-specific or user-specific overrides, you can use the same pattern you would follow with other settings registry overrides. Documentation on that will be available when [this ticket](https://github.com/o3de/o3de.org/issues/706) is completed.
