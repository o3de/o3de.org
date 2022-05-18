---
linkTitle: Asset Processor Settings
title: Asset Processor Settings
description: Commandline settings for AssetProcessor and AssetBuilder
weight: 900
toc: true
---

The Asset Processor and Asset Processor Batch expose a number of commandline settings that can be used when manually launching.

## General settings
When manually launching Asset Processor or Asset Processor Batch you can set the following general properties:

| Setting            | Description                                                         |
|--------------------|---------------------------------------------------------------------|
| project-name       | Name of the current project.                                        |
| project-cache-path | Full path to the project cache folder.                              |
| project-path       | Supplies the path to the project that the AP should use (required). | 
| engine-path        | Supplies the engine path to the engine.                             |


## Advanced Settings
You can also control the behavior using the following command line options:

| Setting                         | Description                                                                                                                                                                                                 | Notes                                    |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| waitOnLaunch                    | Briefly pauses Asset Processor during initialization. Useful if you want to attach a debugger.                                                                                                              | Defaults to false for AP, true for batch |
| zeroAnalysisMode                | Enables using file modification time when examining source assets for processing.                                                                                                                           |                                          | 
| enableQueryLogging              | Enables logging database queries.                                                                                                                                                                           |                                          |
| dependencyScanPattern (dsp)     | Scans assets that match the given pattern for missing product dependencies.                                                                                                                                 |                                          |
| fileDependencyScanPattern (fsp) | Used with `dependencyScanPattern` to farther filter the scan                                                                                                                                                |                                          |
| additionalScanFolders.          | Used with `dependencyScanPattern` to farther filter the scan.                                                                                                                                               |                                          |
| dependencyScanMaxIteration      | Used to limit the number of recursive searches per line when running dependencyScanPattern.                                                                                                                 |                                          |
| warningLevel                    | Configure the error and warning reporting level for AssetProcessor. 0 Default, 1 for fatal errors, 2 for fatal errors and warnings.                                                                         |                                          |
| acceptInput                     | Enable external control messaging via the ControlRequestHandler, used with automated tests.                                                                                                                 |                                          |
| debugOutput                     | When enabled, builders that support it will output debug information as product assets. Used primarily with scene files.                                                                                    |                                          |
| sortJobsByDBSourceName          | When enabled, sorts pending jobs with equal priority and dependencies by database source name instead of job ID. Useful for automated tests to process assets in the same order each time.                  |                                          |
| truncatefingerprint             | Truncates the fingerprint used for processed assets. Useful if you plan to compress product assets to share on another machine because some compression formats like zip will truncate file mod timestamps. |                                          |
| help (h)                        | Displays this message.                                                                                                                                                                                      |                                          |

Please note that AssetProcessor and Asset Processor Batch may have different defaults.
