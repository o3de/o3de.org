---
title: Build and Configure Open 3D Engine and projects
description: Learn how to configure your Open 3D Engine builds with CMake, and then build O3DE projects with a native toolchain.
---

Building your O3DE project with CMake is done in two steps: Creating platform- and toolchain-specific configuration files, and then running the build on them. For many projects you can combine these into a single command, but it's useful to know how to run through each step of the process individually, in case you want to make project changes without immediately rebuilding everything. CMake lets you configure and build from the command line, and offers a GUI tool for ease of use.

As part of keeping builds fast, where possible, CMake uses its cache to hold information about project generation as well as builds. After you configure for the first time, you won't need to pass some options to CMake. This means that after setting up your first configure and build, you should be able to go through your normal development process without needing to change your build configuration except in some rare circumstances.

These instructions are for Windows x86\_64 platforms, but will get you started building on any platform as long as you generate the correct files and know if your platform needs additional arguments. For more information, see the [CMake configuration reference](cmake-options-reference.md) or the build page for your platform.

+ **Add per-platform build links here**

## Supported compiler toolchains

O3DE has build support for the following platforms and toolchains:

| Platform | Supported toolchains |
| --- | --- |
| Windows 64-bit |  |
| macOS, iOS | |
| Android | |
| Linux | |

## Build configurations

O3DE supports a number of build configurations to support your development workflows of debugging, profiling, and generating releases of your projects. Each configuration has a set of properties that makes it suitable for performing certain tasks, and affect things like debug symbol tables, optimization levels, and which O3DE development tools can be used to inspect and send assets to a running game.

For the full set of flags used by the compiler for each build configuraton, see the `lumberyard_root\dev\cmake\Platform\Common\compiler\Configurations_compiler.cmake` file.

{{% note %}}
On the Linux platform when generating configurations and makefiles for GNU Automake, the build configuration is selected at the time of toolchain file generation and can't be configured on a per-build basis. To change build types on Linux, you'll need to regenerate the build files. For more information on building on Linux, see [Deploy a O3DE multiplayer project's server on Linux](linux-build-lumberyard-executable.md).
{{% /note %}}

**`debug` - Debugging support for programmers**

+ Disables compiler optimizations, including function inlining.
+ Debug symbol tables.
+ Additional support for memory consistency checks, stack unwinding, and crash inspection.
+ **MSVC only** - "Edit and continue" support.

**`profile` - For day to day development and performance improvements**

+ Optimized builds \(`-O2`\).
+ Support for shader compilation at runtime.
+ Connects to the Asset Processor for dynamic asset compilation and loading.
+ Crash logging and other troubleshooting functionality.
+ Debug symbol tables.
+ Support for loading assets and information from the Virtual File System \(VFS\).

**`release` - For release builds**

+ Optimized builds \(`-O2`\).
+ Disables debugging symbol tables and other development tools.
+ Assets can only be loaded from `.pak` files distributed with the game binary.
+ Limited crash log and memory information for postmortem debugging.
+ Removes support for in-game developer console.

## Prerequisites

In order to follow these build instructions, you'll need the following.

+ An installation of O3DE 2.0 or later, configured to build your project and the engine.
+ Microsoft Visual Studio 2019 or Visual Studio 2017. [Get Visual Studio](https://visualstudio.microsoft.com/downloads/)
+ CMake 3.17 or later. CMake is included as part of the O3DE 3rd party tools set.

## Configure with the CMake CLI

 When building using the CMake CLI, you'll need to have a build output directory created, know where your 3rd party libraries are, and which O3DE projects you want to be able to build and run. Walking through the following steps will get you started with your first O3DE build out of the box, let you know which values to change on subsequent builds, and help you learn how the build process works with CMake.

1. Open a command prompt and navigate to your O3DE dev directory at `lumberyard_install_path\dev`.

1. Edit the `bootstrap.cfg` file to set the project to `StarterGame`. Do this by changing the value of the `sys_game_folder` variable to `StarterGame`. Setting the project as part of the bootstrapping allows CMake to detect the correct Gem dependencies to build.

1. Create the directory for your build.

   ```
   mkdir build_win64
   ```

**Important**  
 You can create your build output directory anywhere, but in order to run your O3DE project, the build output *must* be a child directory of `lumberyard_install_path\dev`. This setup is necessary for your build to load resources from the `dev\project_name` directory.

1. Generate your configuration files. With Visual Studio 2019, use the following command.

   ```
   cmake -B build_win64 -S . -G "Visual Studio 16 2019" -DLY_3RDPARTY_PATH=lumberyard_install_path\3rdparty -DLY_PROJECTS=StarterGame
   ```

   Visual Studio 2017 requires a different generator and some additional arguments to build for x86\_64 architectures.

   ```
   cmake -B build_win64 -S . -G "Visual Studio 15 2017" -A x64 -T host=x64  -DLY_3RDPARTY_PATH=lumberyard_install_path\3rdparty -DLY_PROJECTS=StarterGame
   ```

## Configure with the CMake GUI

1. Open a command prompt and navigate to your O3DE dev directory at `lumberyard_install_path\dev`.

1. Edit the `bootstrap.cfg` file to set the project to `StarterGame`. Do this by changing the value of the `sys_game_folder` variable to `StarterGame`. Setting the project as part of the bootstrapping allows CMake to detect the correct Gem dependencies to build.

1. Launch the GUI.

   ```
   cmake-gui .
   ```

1. Change the build directory by adding `/build_win64` to the end of it.  
![\[The CMake GUI showing the "Source code" and "Browse build" commands. The path to the build directory is on the bottom, and ends in "dev/build_win64".\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cmake/cmake-gui-build-dir.png)

1. Add the location of your 3rd party libraries. Select the **Add Entry** button.  
![\[The top third of the CMake GUI window. Fields are source code location, build location, and search. Two unchecked check boxes are next to the search field. To the right of the check boxes is the "Add Entry" button."Add Entry" is surrounded by a red box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cmake/cmake-gui-add-entry.png)

    A popup window will appear. Enter `LY_3RDPARTY_PATH` for **Name** and select `PATH` for **Type**. Enter the location of your 3rd party libraries for **Value**, or use the **...** button to select the directory in Windows Explorer. After setting the variable value, select **Ok**.
![\[The CMake GUI "Add Cache Entry" window. The "Name" field has the value "LY_3RDPARTY_PATH". The dropdown beneath that is "Type" with a value of "PATH". Beneath that is a "Value" field containing an obfuscated path. The "Description" field below is empty. The window has "Ok" and "Cancel" buttons at the bottom.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cmake/cmake-gui-3rdparty.png)

1. Set the O3DE project that you'll be building. Select the **Add Entry** button, and when the popup appears, enter `LY_PROJECTS` for **Name** and select `STRING` for **Type**. Set the value of the **Value** field to `StarterGame`, and then select the **Ok** button.
![\[The CMake GUI "Add Cache Entry" window. The "Name" field has the balue "LY_PROJECTS". The dropdown beneath that is "Type" with a value of "STRING". Beneath that is a "Value" field set to "StarterGame". The "Description" field below is empty. The window has "Ok" and "Cancel" buttons at the bottom.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cmake/cmake-gui-project.png)

1. Select the **Configure** button near the bottom of the window.  
![\[The bottom third of the CMake GUI window. Shows the buttons "Configure", "Generate", "Open Project" from left to right. "Configure" is surrounded by a red box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cmake/cmake-gui-configure.png)

   A popup window will appear asking if you want to create the build directory. Select **Yes**.  
![\[A popover window asking for confirmation to create the build directory. Options are "Yes" and "No". The "Yes" option is surrounded by a red box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cmake/cmake-gui-create-dir.png)

   A popup window will appear, allowing you to select the project generator. For Visual Studio 2019, use the default values and select **Finish**.  
![\[CMake GUI generation window. Shows that Visual Studio 2019 will be used as the generator in a dropdown menu, the radio button next to "Use default native compilers" is selected. Buttons at the bottom are labeled "Finish" and "Cancel". The "Finish" option is surrounded by a red box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cmake/cmake-generate-vs2019.png)
**Note**  
 For Visual Studio 2017, you're required to select the appropriate generator of **Visual Studio 15 2017**, as well as edit the platform and toolset values. The platform value must be `x64` and the toolset must be `host=x64`.

![\[CMake GUI generation window. Shows that Visual Studio 2017 will be used in the dropdown menu. The field labeled "Optional platform for generator" has the value "x64". The field "Optional toolset to use" has the value "host=x64". The dropdown and fields are surrounded by a red box. The radio button next to "Use default native compilers" is selected. Buttons at the bottom are labeled "Finish" and "Cancel". The "Finish" option is surrounded by a red box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cmake/cmake-generate-vs2017.png)

1. Select the **Generate** button near the bottom of the window.  
![\[The bottom third of the CMake GUI window. Shows the buttons "Configure", "Generate", "Open Project" from left to right. "Generate" is surrounded by a red box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cmake/cmake-gui-generate.png)

## Build the O3DE editor and StarterGame project

 After configuring and running the generator, you'll have a Visual Studio solution file located at `lumberyard_install_dir\dev\build_win64\O3DE.sln`. You can open and build any available target by opening this file in your version of Visual Studio, but using CMake's capabilities to invoke the MSVC compiler directly from the command line is faster. In the next steps, you'll perform a build from the command line without needing to open Visual Studio.

1. Open a command prompt and navigate to your O3DE dev directory at `lumberyard_install_path\dev`.

1. Build the editor and the StarterGame project in the "profile" configuration. Building the editor here makes sure that it's using the correct gems enabled for StarterGame, and any time you make changes to the gems used by a project you should also rebuild the editor.

   ```
   cmake --build build_win64 --target Editor StarterGameLauncher --config profile
   ```

   Running your first build can take a while, as the O3DE editor, asset management and build tools, enabled gems, engine, and your project code are all built. Once the build finishes, the binaries are located in `lumberyard_install_dir\dev\build_win64\bin\profile`. From within this directory you can now launch StarterGame and the editor.
