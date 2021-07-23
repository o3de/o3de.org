---
linktitle: System Requirements
title: O3DE System Requirements
description: View the system requirements for development with Open 3D Engine (O3DE).
weight: 100
toc: true
---

Open 3D Engine (O3DE) has a minimum set of hardware and software requirements
for development, as outlined in the following sections. In the [Software
prerequisites and configuration](#software-prerequisites-and-configuration)
section, each prerequisite is listed along with any specific configuration steps
required.

## Hardware requirements

Minimum hardware requirements for development include the following:

+ Quad-core Intel or AMD processor, 2.5 GHz or faster
+ 8 GB RAM
+ DirectX 12 or Vulkan-compatible video card with 2 GB VRAM minimum
  + 4 GB VRAM recommended
  + NVIDIA GeForce GTX 1060 or better, driver version 465.89 or later recommended
  + AMD Radeon Pro 560 or better
  + Intel HD 630 or better
+ 40 - 100 GB of free disk space
+ 1366 x 768 px screen resolution

{{< note >}}
RAM and free disk space requirements are dependent on the options that you select when configuring your project in O3DE.
{{< /note >}}

## Software prerequisites and configuration

Creating new projects or using the advanced development features of O3DE requires several software components.
To create new projects or use advanced development features in O3DE, you need a developer environment that includes the following software:

### Operating System
At this time, Microsoft Windows is the primary platform for using the O3DE
editor and building source. Specifically, _Windows 10 version 1809 (10.0.17763)_
or later is required.

Support for other operating systems is a work in progress.

### Microsoft Visual Studio
[Microsoft Visual Studio 2019](https://visualstudio.microsoft.com/downloads/)
version **16.9.2** through version **16.10.x** are the editor versions supported
for use with O3DE.

Microsoft offers **Visual Studio Community** free to individual developers. For
more information and to download and install Visual Studio Community, visit the
[Visual Studio Community](https://visualstudio.microsoft.com/vs/community/)
portal.
#### Visual Studio configuration

The default Visual Studio installation might not include all of the features
that are required by O3DE. The following steps describe how to ensure that the
necessary Visual Studio features are enabled:

1. Launch the **Visual Studio Installer**.

1. Choose **Modify** on the version of Visual Studio that you'll use with O3DE.
   {{< note >}}
   If you downloaded and started the Visual Studio installation process
   previously, upon running the installer you may see other existing component
   installations. Make sure that you are trying to modify an installation of
   Visual Studio [Community, Enterprise, Professional] and not something else
   such as Visual Studio Build Tools 20XX.
   {{< /note >}}

1. On the **Workloads** tab:
   + Select **Game development with C++**.
      + In the **Installation details** panel on the right, select at least one **Windows 10 SDK**.
   + Select **Desktop development with C++**.

1. On the **Individual components** tab, in **Compilers, build tools, and runtime**:
   + Select at least one version of the **MSVC v142 - VS 2019 C++ x64/x86 build tools**. If you don't know which to choose, just use **Latest**.

1. When you are ready, click the **Install** button in the lower right hand corner, and choose the download option that best suits you.
  {{< note >}}
  If you have made changes to an existing installation, you may see a **Modify** button in the lower right corner of the options window instead.
  {{< /note >}}

Once you are finished installing, you may be prompted to restart your system.
### Microsoft Visual Studio C++ Redistributable
You will also need the [Visual C++ Redistributable for Visual Studio 2019](https://visualstudio.microsoft.com/downloads/#other-family).

After installing the C++ Redistributable, you may be prompted to restart your system.

### CMake
[CMake {{< versions/cmake >}} or later](https://cmake.org/download/) is used for
building/compiling O3DE projects. It is strongly recommended that you install
the **Latest Release** from the CMake download page instead of a Release
Candidate. Select the install option that adds CMake to the system PATH during
installation to save you from having to do this later.

   ![Add CMake to the system PATH during installation](/images/welcome-guide/requirements-cmake-install-add-to-path.png)
#### CMake configuration validation
Several O3DE CLI scripts require the `cmake.exe` command line tool to be
available from a command line window. To see if this tool is on the system path,
open a command prompt and use the `--version` command:

   ```cmd
   cmake --version
   ```

If the current CMake version was not returned because CMake cannot be found,
locate the `bin` folder in the CMake installation directory and add the path to
that folder to your Windows system `PATH` environment variable:

1. Open the Windows Start menu.

1. Type "env" to search for environment variables. Choose **Edit system environment variables**.

1. Choose the **Environment Variables** button.

1. Select **Path** under **System variables**.

1. Choose the **Edit...** button.

1. Choose **New** to add a new path to the list and type the full path to the CMake `bin` folder.

   ![Manually add CMake to the system PATH](/images/welcome-guide/requirements-cmake-add-to-path-manually.png)
