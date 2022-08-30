---
linktitle: System Requirements
title: O3DE System Requirements
description: View the system requirements for development with Open 3D Engine (O3DE).
weight: 300
toc: true
---

**Open 3D Engine (O3DE)** has a minimum set of hardware and software requirements for development, as outlined in the following sections. In the [Software
prerequisites and configuration](#software-prerequisites)
section, each prerequisite is listed along with any specific configuration steps
required.

## Hardware requirements

Minimum hardware requirements for development include the following:

+ Windows 10 64-bit version 1809 or Ubuntu {{< versions/ubuntu >}}
+ Quad-core Intel or AMD processor, 2.5 GHz or faster
+ 8 GB RAM
+ DirectX 12, Vulkan-compatible, or Metal-compatible video card with 2 GB VRAM minimum
  + 4 GB VRAM recommended
  + NVIDIA GeForce GTX 1060 or better, driver version 471.11 or later recommended
  + AMD Radeon Pro 560 or better
  + Intel HD 630 or better
  + Shader Model 6.2 (or Shader Model 6.3 to use raytracing features)
+ 40 - 100 GB of free disk space
+ 1366 x 768 px screen resolution

{{< note >}}
RAM and free disk space requirements are dependent on the options that you select when configuring your project in O3DE.
{{< /note >}}

## Software prerequisites and configuration {#software-prerequisites}

Creating new projects or using the advanced development features of O3DE requires several software components depending on the operating system you are using. 

## Microsoft Windows

At this time, Microsoft Windows is the primary platform for using the O3DE
editor and for building source. Specifically, **Windows 10 version 1809 (10.0.17763)**
or later is required.

### Microsoft Visual Studio

+ [Microsoft Visual Studio 2019](https://docs.microsoft.com/en-us/visualstudio/releases/2019/release-notes) version **16.9.2** through version **16.11.x** are supported with O3DE. You can use any Microsoft Visual Studio license, including the Community edition.
+ [Microsoft Visual Studio 2022](https://docs.microsoft.com/en-us/visualstudio/releases/2022/release-notes) version **17.3** through version **17.3.x** are supported with O3DE. You can use any Microsoft Visual Studio license, including the Community edition. **A minimum of CMake 3.21.7 or above is required to build with Visual Studio 2022**.

#### Visual Studio configuration

The default Visual Studio installation might not include all of the features that are required by O3DE. The following steps describe how to ensure that the necessary Visual Studio features are enabled:

1. Launch the **Visual Studio Installer**.

1. Choose **Modify** on the version of Visual Studio that you'll use with O3DE.
   {{< note >}}
   Make sure you are modifying an installation of Visual Studio [Community, Enterprise, Professional] and not a different product, such as Visual Studio Build Tools.
   {{< /note >}}

1. On the **Workloads** tab:
   + Select **Game development with C++**.
      + In the **Installation details** panel on the right, select at least one **Windows 10 SDK**.
   + Select **Desktop development with C++**.

1. Once you've completed your changes, choose the **Install** button in the lower right hand corner, selecting your preferred download option.
  {{< note >}}
  If you've made changes to an existing installation, you might see a **Modify** button in the lower right corner of the options window instead.
  {{< /note >}}

After the install completes, you might be prompted to restart your system.

### Microsoft Visual Studio C++ Redistributable

You will also need the [Visual C++ Redistributable for Visual Studio 2019](https://visualstudio.microsoft.com/downloads/#other-family).

After installing the C++ redistributable, you might be prompted to restart your system.

### CMake

[CMake {{< versions/cmake >}} or later](https://cmake.org/download/#latest) is required to configure and build O3DE projects. We strongly recommend that you install the **Latest Release** from the CMake download page instead of a Release Candidate. During installation, select one of the options that adds CMake to the system PATH. This will save you from having to do this later.

   ![Add CMake to the system PATH during installation](/images/welcome-guide/requirements-cmake-install-add-to-path.png)

#### CMake configuration validation

Several O3DE CLI scripts require the `cmake.exe` command line tool to be available from a command line window. To see if this tool is on the system path, open a command prompt and use the `--version` command.

```cmd
cmake --version
```

If the current CMake version was not returned because CMake cannot be found, locate the `bin` folder in the CMake installation directory and add the path to that folder to the front of your Windows system `PATH` environment variable by doing the following:

1. Open the Windows Start menu.

1. Type "env" to search for environment variables. Choose **Edit system environment variables**.

1. Choose the **Environment Variables** button.

1. Select **Path** under **System variables**.

1. Choose the **Edit...** button.

1. Choose **New** to add a new path to the list and enter the full path to the CMake `bin` folder.

   ![Manually add CMake to the system PATH](/images/welcome-guide/requirements-cmake-add-to-path-manually.png)

1. (Recommended) Choose **Move Up** to move the path to the top of the list.

1. Choose **OK** to save your changes and close the windows that were opened.

1. Verify that `cmake` is on the system path by opening a new command line window and running `cmake --version` again.

## Linux

The primary Linux distribution for using the O3DE Editor is Ubuntu {{< versions/ubuntu >}}. The following instructions describe how to retrieve and install the required software packages through Ubuntu's `apt-get` command-line utility.

### CMake {#linux-cmake}

As with the other operating systems, [CMake {{< versions/cmake >}} or later](https://cmake.org/download/#latest) is required to configure and build O3DE projects. We strongly recommend that you install the **Latest Release** of CMake rather than the default one provided by your current Linux distribution. If CMake is already installed, but does not match the minimum version, you will need to remove it with the following command.

```shell
sudo apt-get remove cmake
```

In order to get the latest version of CMake for Ubuntu, you can add the Kitware APT repository to your Ubuntu package list and run `apt-get` to install it. Refer to [Kitware APT Page](https://apt.kitware.com/) for more information.

```shell
wget -O - https://apt.kitware.com/keys/kitware-archive-latest.asc 2>/dev/null | gpg --dearmor - | sudo tee /usr/share/keyrings/kitware-archive-keyring.gpg >/dev/null

echo 'deb [signed-by=/usr/share/keyrings/kitware-archive-keyring.gpg] https://apt.kitware.com/ubuntu/ focal main' | sudo tee /etc/apt/sources.list.d/kitware.list >/dev/null

sudo apt-get update

sudo apt-get install cmake
```

Once installed, verify that the version meets the minimum version criteria.

```shell
cmake --version
```

### Clang

O3DE requires [Clang](https://clang.llvm.org/get_started.html) to compile all of the native C++ code.

```shell
sudo apt-get install clang-12 
```

After clang-12 is installed, it needs to be added to `/etc/environment` as two new environment variables.

```shell
CC="/usr/bin/clang-12"
CXX="/usr/bin/clang++-12"
```

### Vulkan supported video drivers

In addition to the minimum hardware requirements for video cards for O3DE, Linux requires that the latest drivers for the video card are installed and enabled. Refer to the video card manufacturer's support page for instructions on how to do this.

### Additional library dependencies

O3DE also requires some additional library packages to be installed:

* libglu1-mesa-dev
* libxcb-xinerama0
* libxcb-xinput0
* libxcb-xinput-dev
* libxcb-xfixes0-dev
* libxcb-xkb-dev
* libxkbcommon-dev
* libxkbcommon-x11-dev
* libfontconfig1-dev
* libcurl4-openssl-dev
* libsdl2-dev
* zlib1g-dev
* mesa-common-dev
* libssl-dev

You can download and install these packages through `apt-get`.

```shell
sudo apt-get install libglu1-mesa-dev libxcb-xinerama0 libxcb-xinput0 libxcb-xinput-dev libxcb-xfixes0-dev libxcb-xkb-dev libxkbcommon-dev libxkbcommon-x11-dev libfontconfig1-dev libcurl4-openssl-dev libsdl2-dev zlib1g-dev mesa-common-dev libssl-dev
```

### Ninja Build System (Optional)

By default, CMake uses Unix Makefiles for building O3DE. O3DE supports multiple build configurations (debug, profile, and release), which you specify when building O3DE. Unix Makefiles only supports single-configuration builds, so you must determine which configuration you want to build when you generate the project. All project builds are based on that configuration. In order to change the build configuration, you need to regenerate the project with the different configuration. This process restricts O3DE's support for multiple-configuration builds and slows down building workflows.

The Ninja build system is an alternative to Linux's default Unix Makefiles. The Ninja build system makes it easier to generate, configure, and build your project. With the Ninja build system, specifically [Ninja Multi-Config](https://cmake.org/cmake/help/latest/generator/Ninja%20Multi-Config.html), you can generate the project once and determine which configuration to build during build time. We recommend that you use this generator for O3DE development. You can install the Ninja build tool through `apt-get`.

```shell
sudo apt-get install ninja-build
```

## macOS

Support for developing on macOS is in an experimental stage. At a minimum, you need macOS Big Sur, Intel x86_64, XCode {{< versions/xcode >}} or later, and a Metal-compatible video card that meets the hardware requirements above.
