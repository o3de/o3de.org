---
description:  Use the Open 3D Engine Asset Pipeline to convert your source art and other assets into game ready data. 
linktitle: Asset Pipeline
title: Working with the Asset Pipeline and Asset Files
weight: 200
---

The Asset Pipeline converts source art and other assets into OS-specific, game ready data. To prepare your game to ship, build all your game assets with the Asset Pipeline and package them with your game for your supported operating systems.

The Asset Processor (AP) is a service that runs in the background and monitors a configurable set of input directories for changes in files. When it detects changes, it uses configurable rules to determine its next action. The objective is to end up with game-ready versions of all assets for each OS and each game directory in a location called the asset cache. The asset cache is kept separate from your input directory and can be automatically rebuilt entirely from your source assets by the Asset Processor.

{{< note >}}
The asset cache should not be added to your source control.
{{< /note >}}

The Asset Processor detects changes in the directories that contain input assets, with the game directory being the highest priority. Therefore, if you put assets in the game directory, those assets override assets with the same path in O3DE or other directories with lower priority.

Each output directory in the asset cache represents a full image of all files (except for executables and related files) needed to run the game. The Asset Processor curates the directory to keep it up to date, ensuring that new files are ready to use in the game and O3DE Editor as soon as possible. Game runtimes load assets only from the asset cache and never directly from your input source folders.

**Topics**

+ [Using Asset Processor](/docs/user-guide/assets/pipeline/processor)
+ [Move assets](./move-assets)
+ [Programming the O3DE AZCore Runtime Asset System](/docs/user-guide/assets/pipeline/asset-system-programming)
