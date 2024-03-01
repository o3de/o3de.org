---
linkTitle: Get the Starter Game project
title: Get the Starter Game project
description: Learn how to install Lumberyard from github and open a project with it.
weight: 100
toc: true
---

This tutorial teaches you how to download and run **Amazon Lumberyard Engine** with its Starter Game project. Additional sections of the tutorial introduce how to build Lumberyard from sources and use other projects.

| O3DE Experience | Time to Complete | Feature Focus | Last Updated |
| - | - | - | - |
| Beginner | 15 Minutes | Install Lumberyard and open a project | February 27, 2024 |

{{< note >}}
As Lumberyard can only run on Windows, this tutorial can only be followed by Windows users
{{< /note >}}

## Clone the Lumberyard github repository

You can download the [Lumberyard repository](https://github.com/aws/lumberyard) or clone it onto your local machine. Cloning allows you to keep track of the changes made.

- To download, click on the green **Code** button and select **Download ZIP**. Then copy and unzip it where you want it to be.
- To clone
  1. Open a terminal or shell in the directory where you want this repository to be in. 
  2. Run the command `git clone https://github.com/aws/lumberyard.git`.

Enter the folder and click on `git_bootstrap.exe`. It will download pre-built binaries of the engine and 3rd party libraries (around 10gb to download and 25gb unzipped on disk).

Once the process is over it will open the **Lumberyard Setup Assistant**, you can close it now if you don't want to build the engine from source.

## Open the StarterGame project

Now that you have the engine binaries, you will want to select the **default project**. Simply go to `LUMBERYARD_FOLDER\dev\Bin64vc142` and run the `ProjectConfigurator.exe`. Make sure that the StarterGame project is set as default (the icon should be grayed out). If not, simply click on the icon next to the name and click on "**Set as default**" button on the top right.

![Project Configurator](/images/learning-guide/tutorials/lumberyard-to-o3de/project-configurator.png)

In the same folder, you can run the `Editor.exe`. The asset processor will run and the editor will open after a few seconds. In the Welcome popup select *"Open level..."* and select *"Levels\Game\SinglePlayer"*.

You can play the game directly by pressing **Ctrl+G** or if you go to the top menu **Game\Play Game**.

![Play](/images/learning-guide/tutorials/lumberyard-to-o3de/play-game.png)

{{< note >}}
The Lumberyard asset processor does not automatically close when you exit Lumberyard. Don't forget to close it via a right click in the notification bar if you plan to open O3DE afterwards as it will prevent the O3DE asset processor to open.
{{< /note >}}

## (Optional) Build the engine from source

You will need to go through the Lumberyard Setup Assistant and follow the *"Full Install"* path. You can open this assistant anytime via `SetupAssistant.bat` in the Lumberyard folder. You will need Visual Studio 2019 with its "Desktop development with C++" component properly installed.

Once the setup is over, you might want to generate or re-generate a Visual Studio solution. Simply run `.\lmbr_waf.bat configure --enabled-game-projects=SamplesProject,StarterGame` from the **dev** folder. Then open `dev\Solutions\LumberyardSDK_vs2019.sln` with Visual Studio 2019. 

To run the editor, set **Sandbox\Editor** as startup project on right click.

If you encounter a build error, check the `LocalFileIO.cpp` and update the `SetAlias` method like this

```cpp
void LocalFileIO::SetAlias(const char* key, const char* path)
{
    ClearAlias(key);
    char fullPath[AZ_MAX_PATH_LEN];
    ConvertToAbsolutePath(path, fullPath, AZ_MAX_PATH_LEN);
    m_aliases.push_back(AliasType(key, fullPath));
}
```

## (Optional) Try out other samples

There are other project samples for Lumberyard available online and in the repository. You can use the **ProjectConfigurator** to switch between them, it will auto-detect any projects on the `dev` folder.

- [N.E.M.O project](https://www.youtube.com/watch?v=SNIQjZzif1k): A third person game with a submarine
- [Dynamic Vegetation](https://www.youtube.com/watch?v=wX7O9K66zbY): A showcase of the vegetation and weather system
- Multiplayer Sample: A simple top-down shooter in space
- Samples Project: Multiple tech demo scenes
