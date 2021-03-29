---
linktitle: System Requirements
title: Open 3D Engine (O3DE) System Requirements
description: View the system requirements for Open 3D Engine (O3DE).
weight: 100
toc: true
---

{{< preview-new >}}

O3DE has a minimum set of hardware and software requirements for development, as outlined in the following sections.

## System requirements

Minimum hardware requirements include the following:

+ 60 GB of free disk space
+ 1366 x 768 px screen resolution
+ _Other specs for processor, memory, and video cards - coming soon._

Required free disk space and RAM requirements are dependent on the options that you select when configuring your project in O3DE.

## Software prerequisites

To create new projects or use advanced development features in O3DE, you need a developer environment that includes the following software:

+ [Microsoft Visual Studio 2019*](https://visualstudio.microsoft.com/downloads/) version **16.2.4** through version **16.9.x**
+ [Visual C++ Redistributable for Visual Studio 2019](https://visualstudio.microsoft.com/downloads/#other-family)
+ [CMake 3.19.1](https://cmake.org/files/LatestRelease/cmake-3.19.1-win64-x64.msi) or later

*Microsoft offers Visual Studio Community edition free to individual developers. For more information and to download and install Visual Studio Community, visit the [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) portal.

### Visual Studio configuration

The default Visual Studio installation might not include all of the features that are required by O3DE. Ensure that the following Visual Studio features are enabled:

1. Launch the **Visual Studio Installer** from your download directory or the **Start Menu** if you've already installed Visual Studio.

1. If you've installed Visual Studio, choose **More - Modify** on the version of Visual Studio you'll use with O3DE.

1. On the **Workloads** tab:
   + Select **Game development with C++**.
      + In the **Installation details** panel on the right, select at least one **Windows 10 SDK**.
   + Select **Desktop development with C++**.

1. On the **Individual components** tab, in **Compilers, build tools, and runtime**:
   + Select at least one version of the **MSVC v142 - VS 2019 C++ x64/x86 build tool**.
