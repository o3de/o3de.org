---
linkTitle: Faster Scanning
title: Asset Processor Faster Scanning Mode
description: Faster Scanning mode speeds up source asset scanning in Open 3D Engine (O3DE).
weight: 400
toc: true
---

**Faster Scanning Mode** speeds up **Asset Processor’s** startup scan by using timestamps to track source asset changes rather than file hashes. Faster Scanning Mode also skips checks for cache changes that occurred while Asset Processor was not running. This can save time when processing many assets in a project. You can switch scan modes at any time without restarting the Asset Processor, including during an asset scan. Asset Processor saves your preference between sessions.

## Choose a scan mode

![The Faster Scanning Mode settings in Asset Processor](/images/user-guide/assets/asset-processor/interface-fast-scan.png)

Faster Scanning Mode is on by default. To disable Faster Scanning Mode, do the following:

1. Choose the Tools tab in Asset Processor.
1. Uncheck the **Faster Scanning Mode** option.

{{< note >}}
When Faster Scanning Mode is disabled, file hashes are used to check for updated source assets and source dependencies. This might significantly increase analysis time.
{{< /note >}}

You can use the command line option below to activate Faster Scanning Mode for **Asset Processor Batch**.

```cmd
AssetProcessorBatch.exe --zeroAnalysisMode
```

### Faster scanning mode feedback

Faster Scanning Mode provides feedback about how many files it finds, processes, and skips. In Asset Processor, this information is shown in the **Logs** tab. In Asset Processor Batch, this information is sent to `stdout` as in the example output below.

```cmd
5303 files reported from scanner. 2903 unchanged files skipped, 2400 files processed
```

## Source asset scanning

When analyzing source assets, Asset Processor performs a series of low cost checks. If any of these checks fail, the source asset goes through the normal, unchanged analysis pipeline, and the Faster Scanning Mode has no effect for that source asset.

| Cost | Check |
| - | - |
| Very Low | Collect timestamp information for every file scanned as part of Asset Processor startup. |
| Very Low | Check whether any **Asset Builders** had version or fingerprint changes by comparing Asset Builder fingerprints to the previous process jobs. |
| Very Low | Compare the source asset timestamps with the timestamps in the **Asset Database**. |
| Low | Query the Asset Database files table to get a list of every asset and its timestamp from previous process jobs. |
| Low | Query the Asset Database sources table to get a list of the Asset Builder fingerprint for every source asset. |

## Full Scan

You can perform a **Full Scan**, even when Faster Scanning Mode is active. A Full Scan performs the analysis actions in the table below. Actions with a **Low** cost estimate contribute to less than 1% of the total scan time.

| Cost | Analysis |
| - | - |
| Low | Determine which Asset Builders are responsible for building an asset. |
| Low | Check source assets against the Asset Database to get information about previous process jobs. |
| Low | Compare the new job fingerprints against the previous jobs. |
| Moderate | Generate a job fingerprint that includes timestamps of source assets and dependencies and the versions of the Asset Builders. |
| High | Check the **Asset Cache** and ensure that every product asset previously generated for the source asset is still present. |
| Very High | Send a **Create Jobs** request to the registered Asset Builders so that they can spawn jobs for the job queue. |

A source asset found during the scan can be excluded from reanalysis if it meets all of the criteria below:

* The source asset hasn’t changed on disk (its timestamp matches the timestamp in the Asset Database).
* The source assets's dependencies haven’t changed on disk (the source dependency timestamps match the timestamps in the Asset Database).
* The most recent process jobs for the source asset succeeded without errors or warnings.
* The version and fingerprint of the Asset Builders that processed the source asset have not changed.
* There are no new Asset Builders that may process the source file.
* No Asset Builders that could have operated on the source file have been removed.
* No Asset Builders have changed the set of source files.

## Perform a full scan

A full scan checks the Asset Cache for product assets and rebuilds the appropriate source assets. To start a full scan, follow the steps below:

1. Choose the Tools tab in Asset Processor.
1. Choose Start Scan.

{{< note >}}
If you are having issues with the Asset Cache, performing a full scan might resolve the issues. If a full scan does not repair the Asset Cache, you can rebuild the entire Asset Cache by deleting the `Cache` directory in your project. If you’re an engineer making BuilderSDK-based Asset Builders, deleting the cache is not recommended.
{{< /note >}}
