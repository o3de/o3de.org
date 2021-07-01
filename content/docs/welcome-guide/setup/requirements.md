---
linktitle: System Requirements
title: O3DE System Requirements
description: View the system requirements for development with Open 3D Engine (O3DE).
weight: 100
toc: true
---

Open 3D Engine (O3DE) has a minimum set of hardware and software requirements for development, as outlined in the following sections.

## Hardware requirements

Minimum hardware requirements for development include the following:

+ Quad-core Intel or AMD processor, 2.5 GHz or faster
+ 8 GB RAM
+ DirectX 12 or Vulkan-compatible video card
  + 4 GB VRAM recommended
  + NVIDIA GeForce GTX 1060 or better, driver version 465.89 or later recommended
  + AMD Radeon Pro 560 or better
+ 60 GB of free disk space
+ 1366 x 768 px screen resolution

{{< note >}}
RAM and free disk space requirements are dependent on the options that you select when configuring your project in O3DE.
{{< /note >}}

## Software prerequisites

To create new projects or use advanced development features in O3DE, you need a developer environment that includes the following software:

+ Windows 10 version 1809 (10.0.17763) or later.
+ [Microsoft Visual Studio 2019](https://visualstudio.microsoft.com/downloads/) version **16.9.2** through version **16.10.x**.
+ [Visual C++ Redistributable for Visual Studio 2019](https://visualstudio.microsoft.com/downloads/#other-family).
+ [CMake {{< versions/cmake >}} or later](https://cmake.org/download/). It is strongly recommended that you install the **Latest Release** from the CMake download page instead of a Release Candidate. Select the install option that adds CMake to the system PATH during installation to save you from having to do this later.

   ![Add CMake to the system PATH during installation](/images/welcome-guide/requirements-cmake-install-add-to-path.png)

+ (Optional) Wwise version 2019.2.8.7432 audio SDK. Use the [Wwise Launcher](https://www.audiokinetic.com/download/) to install.

See the following sections for additional configuration instructions.

{{< note >}}
Microsoft offers **Visual Studio Community** free to individual developers. For more information and to download and install Visual Studio Community, visit the [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) portal.
{{< /note >}}

### CMake configuration

Several O3DE CLI scripts require the `cmake.exe` command line tool to be available from a command line window. You can check to see if this tool is on the system path by opening a command prompt and using the `--version` command.

   ```cmd
   cmake --version
   ```

If the current CMake version was not returned because CMake cannot be found, locate the `bin` folder in the CMake installation directory and add the path to that folder to your Windows system `PATH` environment variable.

1. Open the Windows Start menu.

1. Type "env" to search for environment variables. Choose **Edit system environment variables**.

1. Choose the **Environment Variables** button.

1. Select **Path** under **System variables**.

1. Choose the **Edit...** button.

1. Choose **New** to add a new path to the list and type the full path to the CMake `bin` folder.

   ![Manually add CMake to the system PATH](/images/welcome-guide/requirements-cmake-add-to-path-manually.png)

### Visual Studio configuration

The default Visual Studio installation might not include all of the features that are required by O3DE. The following steps describe how to ensure that the necessary Visual Studio features are enabled:

1. Launch the **Visual Studio Installer**.

1. Choose **Modify** on the version of Visual Studio that you'll use with O3DE.

1. On the **Workloads** tab:
   + Select **Game development with C++**.
      + In the **Installation details** panel on the right, select at least one **Windows 10 SDK**.
   + Select **Desktop development with C++**.

1. On the **Individual components** tab, in **Compilers, build tools, and runtime**:
   + Select at least one version of the **MSVC v142 - VS 2019 C++ x64/x86 build tool**.

1. If you've made changes, choose the **Modify** button in the lower right corner of the window when you're ready to install the new options you've selected.
