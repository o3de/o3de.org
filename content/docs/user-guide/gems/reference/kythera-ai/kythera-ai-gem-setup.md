---
linkTitle: Setup
title: Kythera AI Gem Setup
description: Instructions for setting up the Kythera AI Gem
weight: 200
toc: true
---

Download the Kythera AI Gem .zip file from Kythera AI’s website: https://www.kythera.ai/o3de.

## Build the Kythera AI demo project

The KytheraAIDemo project is part of the downloaded zip file.

1. Make sure Open 3D Engine (O3DE) is set up according the [setup guide](/docs/welcome-guide/setup/).

1. Unpack the .zip file into a directory. For this example, we’ll use `C:\dev\kythera`. If you use a different path, substitute `C:\dev` with the full path to the directory containing the Kythera AI Gem.

1. Create a `build` directory in the unpacked `KytheraAIDemo` directory (`C:\dev\kythera\KytheraAIDemo\build`).

1. Open a command prompt and `cd` into the build directory.

1. Run the following cmake configuration command, substituting the correct paths:

    ```cmd
    cmake .. -G "Visual Studio 16" -DLY_3RDPARTY_PATH=<3rdParty cache path> -DLY_EXTERNAL_SUBDIRS=<path to unpacked zip/Gems/Kythera> -DLY_UNITY_BUILD=ON`
    ```

1. In Visual Studio, open the generated solution `KytheraAIDemo.sln`.

1. Set `Code/Sandbox/Editor/Editor` as your startup project.

1. Build and run the project. The KytheraAIDemo project contains multiple levels demonstrating the features of Kythera AI.

## Add the Kythera Gem to a project

1. Create a new project following thw guide [intro to project configuration](/docs/welcome-guide/get-started/project-config).

1. Add `Kythera` to your project's `enabled_gems.cmake` file, which can be found in the `Code` subdirectory of the project.

1. Run the cmake configuration command and add the Kythera Gem directory as an external subdirectory:

    ```cmd
    cmake -B MyProject/build -S MyProject -DLY_EXTERNAL_SUBDIRS=<path to unpacked zip>\Gems\Kythera`
    ```

1. Rebuild the project from within Visual Studio.
