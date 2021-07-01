---
linkTitle: Setup
title: Kythera AI Gem setup
description: Instructions for setting up the Kythera AI Gem
weight: 200
---

Download the Kythera AI Gem .zip file from Kythera AI’s website: https://www.kythera.ai/o3de.

Building the Kythera AI demo project
====================================

The demo project (called KytheraAIDemo) is part of the downloaded zip file.

*   Make sure O3DE is set up according the [official guide](/docs/welcome-guide/setup/).
*   Unpack the .zip file into a folder - for this example we’ll use `C:\dev\kythera`. If you use a different path, substitute `C:\dev` with the folder you unpacked the Kythera AI Gem into.
*   Create a `build` directory in the unpacked `KytheraAIDemo` folder (`C:\dev\kythera\KytheraAIDemo\build`)
*   Open a shell prompt and `cd` into the build directory
*   Run the following cmake command (with the correct paths substituted):
*   `cmake .. -G "Visual Studio 16" -DLY_3RDPARTY_PATH=<3rdParty cache path> -DLY_EXTERNAL_SUBDIRS=<path to unpacked zip/Gems/Kythera> -DLY_UNITY_BUILD=ON`
*   Open the generated Visual Studio Solution `KytheraAIDemo.sln`
*   Set `Code/Sandbox/Editor/Editor` as your startup project, then build and run it. The KytheraAIDemo project contains multiple levels showing off some features of Kythera AI.

Adding the Kythera Gem to a project
===================================
* Create a new project based on the documentation here: [Intro to Project Configuration](/docs/welcome-guide/get-started/project-config)
* Add `Kythera` to your project's `enabled_gems.cmake` file, which can be found in the `Code` subdirectory of the project or in the Visual Studio project.
* Rerun the cmake configuration command and add the Kythera Gem directory as an external subdirectory: `cmake -B MyProject/build -S MyProject -DLY_EXTERNAL_SUBDIRS=<path to unpacked zip>\Gems\Kythera`
* Rebuild the project from within Visual Studio
