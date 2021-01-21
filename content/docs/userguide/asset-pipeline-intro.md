---
description: ' Use the &ALYlong; &asset-pipeline; to convert your source art and other
  assets into game ready data. '
title: Working with the &asset-pipeline; and asset files
---
# Working with the Asset Pipeline and asset files {#asset-pipeline-intro}

The Asset Pipeline converts source art and other assets into OS\-specific, game ready data\. To prepare your game to ship, build all your game assets with the Asset Pipeline and package them with your game for your supported operating systems\.

The Asset Processor \(AP\) is a service that runs in the background and monitors a configurable set of input directories for changes in files\. When it detects changes, it uses configurable rules to determine its next action\. The objective is to end up with game\-ready versions of all assets for each OS and each game directory in a location called the asset cache\. The asset cache is kept separate from your input directory and can be automatically rebuilt entirely from your source assets by the Asset Processor\.

**Note**
The asset cache should not be added to your source control\.

![\[Understand the Asset Pipeline and how it processes files for your game project in Amazon Lumberyard.\]](/images/userguide/assets/pipeline/asset-pipeline-diagram.png)

The Asset Processor detects changes in the directories that contain input assets, with the game directory being the highest priority\. Therefore, if you put assets in the game directory, those assets override assets with the same path in Lumberyard or other directories with lower priority\.

Each output directory in the asset cache represents a full image of all files \(except for executables and related files\) needed to run the game\. The Asset Processor curates the directory to keep it up to date, ensuring that new files are ready to use in the game and Lumberyard Editor as soon as possible\. Game runtimes load assets only from the asset cache and never directly from your input source folders\.

**Topics**
+ [Using Asset Processor](/docs/userguide/assets/processor.md)
+ [Configuring the Asset Pipeline](/docs/userguide/assets/configuring.md)
+ [Configuring Image Processing](/docs/userguide/assets/configuring-image-processing.md)
+ [Live Reloading and VFS](/docs/userguide/assets/live-reloading.md)
+ [Compiling Shaders for Release Builds](/docs/userguide/assets/shader-compilation.md)
+ [Shader Compiler Proxy](/docs/userguide/assets/shader-compiler.md)
+ [Shader Cache and Generation](/docs/userguide/materials/shaders/custom-dev-cache-intro.md)
+ [Game Startup Sequence](/docs/userguide/assets/game-sequence.md)
+ [Asset Browser](/docs/userguide/asset-browser-intro.md)
+ [Programming the Lumberyard AZCore Runtime Asset System](/docs/userguide/assets/asset-system-programming.md)