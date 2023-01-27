---
linkTitle: Skip Startup Scan
title: Asset Processor Skip Startup Scan
description: Skips startup checks for assets modified while Asset Processor was closed.
weight: 700
toc: true
---

Skipping Startup Scan improves O3DE Editor's launch time if no assets are modified while Asset Processor was closed. You can switch startup scan modes at any time but need to restart Asset Processor for the change to take effect. Asset Processor saves your preferences between sessions.

Skipping Startup Scan is an expert mode that is designed for aiding code development workflows (e.g. code updating and debugging). Use it only when you are not modifying the asset processing pipeline or making asset content changes. Asset Processor will begin to watch for asset changes once it goes to the Idle state.

When Skip Startup Scan is enabled:
1. Asset Processor skips startup checks on asset modifications after launch and enters the idle state directly.
2. O3DE Editor receives a message from Asset Processor which indicates that all the assets are ready to use.
3. O3DE Editor is unblocked to launch.

When Skip Startup Scan is disabled:
1. Asset Processor scans and processes any assets that are modified while it was closed.
2. O3DE Editor receives a message from the Asset Processor which indicates that **critical** assets are processed and ready to use.
3. O3DE Editor is unblocked to launch.
4. Asset Processor finishes processing all the assets and enters the idle state.

## Choose a startup scan mode

![The Skip Startup Scan settings in Asset Processor](/images/user-guide/assets/asset-processor/skip-startup-scan-settings.png)

Skip Startup Scan Mode is disabled by default for Asset Processor GUI. To enable/disable Skip Startup Scan Mode in the GUI, do the following:
1. Choose the Settings tab in Asset Processor.
2. Toggle the **Skip Startup Scan** option.
3. Restart the Asset Processor and Editor.

{{< important >}}
Skipping startup checks may result in unexpected behavior if assets are modified while Asset Processor is not running.
You can [perform a full scan](/docs/user-guide/assets/asset-processor/faster-scanning/#perform-a-full-scan), even when Skip Startup Scan Mode is active.
{{< /important >}}
