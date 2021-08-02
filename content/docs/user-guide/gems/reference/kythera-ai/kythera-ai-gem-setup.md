---
linkTitle: Setup
title: Kythera AI Gem Setup
description: Instructions for setting up the Kythera AI Gem
weight: 200
toc: true
---

Download the Kythera AI Gem .zip file from Kythera AI’s website: https://www.kythera.ai/kythera-for-o3de.

## Build the Kythera AI demo project

The KytheraAIDemo project is part of the downloaded zip file.

Make sure you have a working engine installation from the installer or an SDK installation as documented in the [O3DE Setup Guide](/docs/welcome-guide/setup/).

1. Extract all of the contents of the download zip file to a folder.
1. Open the **O3DE Project Manager** (`o3de.exe`).
1. Go to **New Project...** and select **Add existing Project**.
1. Select the `KytheraAIDemo` folder in the unpacked zip folder.
1. In the project menu, select **Build**.

    ![Project Menu Build](/images/user-guide/gems/kythera-ai/project-manager-project-menu-build.png)

1. Back in the O3DE launcher, click **Open Editor**.
1. After the Editor has launched, make sure that all assets have been processed in the Asset Processor (Status is Idle), otherwise opening our demo levels will throw errors.

## Add the Kythera AI Gem to a project

The following steps work for both installed/SDK builds and engine centric builds:

1. Unpack the zip file to a folder.
1. Open a command prompt or PowerShell window inside your engine installation.
1. Run the following command:
    ```
    .\scripts\o3de.bat register -gp <path to the Kythera Gem> --external-subdirectory-project-path <path to your game directory>`
    ```
    The Kythera Gem is the `Kythera` subdirectory in the unpacked zip folder.
    The command will add the `external_subdirectories` key to the `project.json` file and make the Gem available to your project.
1. Open the **O3DE Project Manager** (`o3de.exe`).
1. In the project menu, click **Edit Project Settings** and then the **Configure Gems** button on the top right corner.
1. Kythera AI should now be selectable as a Gem. Select it and save the project settings.

The project has to be rebuilt before Kythera AI components can be used.
