---
linkTitle: Settings
title: Asset Processor Settings
description: Commandline settings for AssetProcessor and AssetProcessorBatch
weight: 900
toc: true
---

The Asset Processor and Asset Processor Batch expose a number of commandline settings that can be used when manually launching.

For example, if you want to manually launch Asset Processor on Windows but delay launch to attach a debugger:
```
AssetProcessor --project-path="C:/o3de/o3de/AutomatedTesting" --engine-path="C:/o3de/o3de" --waitOnLaunch
```

## General settings
When manually launching Asset Processor or Asset Processor Batch you can set the following general properties:

| Setting            | Description                                                         | Default value                                               |
|--------------------|---------------------------------------------------------------------|-------------------------------------------------------------|
| project-name       | Name of the current project.                                        | The project name associated with the passed `project-path`. |
| project-cache-path | Full path to the project cache folder.                              | The cache path associated with the passed `project-path`.   |
| project-path       | Supplies the path to the project that the Asset Processor should use (required). |                                                             |
| engine-path        | Supplies the engine path to the engine.                             | The engine path associated with the passed `project-path`.  |


## Advanced settings
You can also control the behavior using the following command line options:

| Setting                         | Description                                                                                                                                                                                                 | Default value                                                                                   |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| acceptInput                     | Enable external control messaging via the ControlRequestHandler, used with automated tests.                                                                                                                 |                                                                                                 |
| additionalScanFolders           | Used with `dependencyScanPattern` to farther filter the scan.                                                                                                                                               |                                                                                                 |
| debugOutput                     | When enabled, builders that support it will output debug information as product assets. Used primarily with scene files.                                                                                    |                                                                                                 |
| dependencyScanMaxIteration      | Used to limit the number of recursive searches per line when running dependencyScanPattern.                                                                                                                 | 800                                                                                 |
| dependencyScanPattern (dsp)     | Scans assets that match the given pattern for missing product dependencies.                                                                                                                                 |                                                                                                 |
| enableQueryLogging              | Enables logging database queries.                                                                                                                                                                           |                                                                                                 |
| fileDependencyScanPattern (fsp) | Used with `dependencyScanPattern` to further filter the scan.                                                                                                                                               |                                                                                                 |
| help (h)                        | Displays all available commands and their description.                                                                                                                                                      |                                                                                                 |
| sortJobsByDBSourceName          | When enabled, sorts pending jobs with equal priority and dependencies by database source name instead of job ID. Useful for automated tests to process assets in the same order each time.                  |                                                                                                 |
| truncatefingerprint             | Truncates the fingerprint used for processed assets. Useful if you plan to compress product assets to share on another machine because some compression formats like zip will truncate file mod timestamps. |                                                                                                 |
| waitOnLaunch                    | Briefly pauses Asset Processor during initialization.  Waits for 20 seconds when true. Useful if you want to attach a debugger.                                                                                                              | false                             |
| warningLevel                    | Configure the error and warning reporting level for AssetProcessor. 0 Default, 1 for fatal errors, 2 for fatal errors and warnings.                                                                         | Defaults to 0.                                                                                  |
| zeroAnalysisMode                | Use file modification time when examining source assets for processing.                                                                                                                           | Asset Processor defaults to true, and can be changed in Asset Processor's UI. Asset Processor Batch defaults to false. | 

Please note that AssetProcessor and Asset Processor Batch may have different defaults.
