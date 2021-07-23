---
linktitle: Troubleshooting the Setup
title: Troubleshooting the Setup of Open 3D Engine
description: Get troubleshooting help for setting up Open 3D Engine (O3DE).
weight: 400
toc: true
---

This guide will help you identify and resolve some common issues that you might encounter when setting up Open 3D Engine (O3DE) on your computer. Be aware that you might come across situations unique to your system or project that aren't addressed here. This reference is only for the most frequent setup issues that aren't affected by a known bug, or can't easily be worked around. If you don't find your problem covered here, try searching [our forums](https://github.com/o3de/o3de/discussions) or asking in the [O3DE discord](https://discord.gg/xNb2q4SJKJ).

If you believe your setup problem is due to a bug in O3DE, check [existing bug reports](https://github.com/o3de/o3de/issues) and [file an issue](https://github.com/o3de/o3de/issues/new/choose) if you can!

## CMake not found on the PATH

**Issue:** Running a tool from the command line in the O3DE engine directory (such as `get_python.bat`) reports that CMake was not found on the PATH and LY_CMAKE_PATH is not defined.

**Remedy:** Install CMake, if it isn't installed. If it is already installed, the path to the CMake binaries might not be defined in your operating system. Refer to the [Software prerequisites](../requirements/#software-prerequisites) and [CMake configuration](../requirements/#cmake-configuration) sections of the O3DE System Requirements topic for instructions on how to install and configure CMake, respectively.

After installing CMake or defining its path on your computer, open a new command line window before attempting to run the tool again.

## CMake error: 3rdParty folder does not exist

**Issue:** CMake cannot find the downloadable package directory specified by LY_3RDPARTY_PATH. This is commonly caused when the directory does not exist. The error can also be caused when the value passed to CMake ends in a `\` character.

```cmd
CMake Error at cmake/3rdParty.cmake:34 (message):
  3rdParty folder: C:/o3de-packages does not exist, call cmake defining a
  valid LY_3RDPARTY_PATH or use cmake-gui to configure it
```

**Remedy:** Do one of the following.

* Create the downloadable package directory.
* Change the value to remove the trailing `\`.
* Change the format of your `LY_3RDPARTY_PATH` to use the platform-agnostic `/` path separator.

## CMake error: MSVC compiler not found

**Issue:** The CMake tools report a missing MSVC compiler. This produces a warning similar to:

```cmd
CMake Error at CMakeLists.txt:15 (project):
  The CMAKE_C_COMPILER:
 
    C:/Program Files (x86)/Microsoft Visual Studio/2019/Professional/VC/Tools/MSVC/14.24.28314/bin/Hostx64/x64/cl.exe
 
  is not a full path to an existing compiler tool.
```

This is caused when Visual Studio is updated or modified, and the CMake cache holds information pointing to the previous compiler install. 

**Remedy:** This issue is most often caused during or after a Visual Studio update, without a regeneration of the O3DE project files.
The path of the C and C++ compiler is set at configure-time by the CMake system, using the `CMAKE_C_COMPILER` and `CMAKE_CXX_COMPILER` values.
These values are stored in the CMake cache. Clean the cache and reconfigure by doing one of the following:

* Removing the `CMakeCache.txt` file in your CMake build directory.
* Removing the CMake build directory completely.

After cleaning the cache, the correct compiler should be detected during the CMake configuration stage.

## GitHub credentials don't work in Git Credential Manager

**Issue:** You enter your GitHub username and password in Git Credential Manager when cloning the O3DE repo, but nothing happens and the dialog box comes back.

**Remedy:** This issue typically occurs part way through cloning the O3DE repo. The Credential Manager dialog box requests your credentials for an https URL, like the one shown in the following image.

![Git Credential Manager asking for credentials for an https URL](/images/welcome-guide/setup-troubleshooting-git-credential-manager.png)

This URL links to a Git LFS endpoint for downloading large files. You must use a GitHub personal access token here instead of your GitHub password. Refer to the instructions on configuring credentials for Git LFS in [Setting up O3DE from GitHub](/docs/welcome-guide/setup/setup-from-github/#configure-credentials-for-git-lfs).

## Python for Windows not found when you run the `o3de` script

**Issue:** You run the o3de script from the scripts directory and you get an error message that Python for Windows could not be found, even if you have Python installed on your computer.

**Remedy:** The `o3de` script in the scripts directory expects a specific version of the Python runtime to exist in the directory <O3DE>/python/runtime. To obtain this runtime, run the following command from the directory where you installed O3DE.

```cmd
python\get_python.bat
```

## More troubleshooting help

There are additional troubleshooting pages in other sections of the O3DE documentation:

* [Open 3D Engine Build Troubleshooting](/docs/user-guide/build/troubleshooting)

As a reminder, you can also try searching for your issue or asking for help in these locations:

* [O3DE forums](https://github.com/o3de/o3de/discussions)
* [O3DE discord](https://discord.gg/xNb2q4SJKJ)
* [Existing bug reports](https://github.com/o3de/o3de/issues)
