---
<<<<<<< HEAD
<<<<<<< HEAD
description:  View the system requirements for Open 3D Engine. 
title: Open 3D Engine system requirements
=======
linktitle: System Requirements
<<<<<<< HEAD
<<<<<<< HEAD
title: Open 3D Engine (O3DE) System Requirements
<<<<<<< HEAD
<<<<<<< HEAD
description: View the system requirements for Open 3D Engine (O3DE).
>>>>>>> 08172c74 (instructions for installing from GitHub)
=======
=======
title: O3DE System Requirements
>>>>>>> 68220315 (Update from feedback)
=======
title: O3DE System Requirements
>>>>>>> 68220315 (Update from feedback)
description: View the system requirements for development with Open 3D Engine (O3DE).
>>>>>>> c7b7d43c (more system requirements edits)
=======
linktitle: System Requirements
title: Open 3D Engine (O3DE) System Requirements
description: View the system requirements for Open 3D Engine (O3DE).
>>>>>>> 08172c74 (instructions for installing from GitHub)
=======
description: View the system requirements for development with Open 3D Engine (O3DE).
>>>>>>> c7b7d43c (more system requirements edits)
weight: 100
toc: true
---

{{< preview-new >}}

O3DE has a minimum set of hardware and software requirements for development, as outlined in the following sections.

<<<<<<< HEAD
<<<<<<< HEAD
## System requirements

Minimum hardware requirements for development include the following:

+ Quad-core Intel or AMD processor, 2.5 GHz or fastder
+ 8 GB RAM
+ DirectX 12 or Vulkan-compatible video card
  + 4 GB VRAM recommended
  + NVIDIA GeForce GTX 1060 or better, driver version 465.89 or later recommended
  + AMD Radeon Pro 560 or better
=======
## System Requirements
=======
## System requirements
>>>>>>> 30dff6d9 (added screenshots)

Minimum hardware requirements for development include the following:

<<<<<<< HEAD
>>>>>>> b1ca3379 (updated setup from GitHub and system requirements)
=======
+ 3 GHz quad-core processor
+ 12 GB RAM*
+ 2 GB VRAM DirectX 12 or Vulkan-compatible video card
  + NVIDIA GeForce GTX 750 or better
  + AMD Radeon HD 8770 or better
<<<<<<< HEAD
>>>>>>> 63fabf12 (update setup requirements)
+ 60 GB of free disk space
+ 1366 x 768 px screen resolution

<<<<<<< HEAD
{{< note >}}
RAM and free disk space requirements are dependent on the options that you select when configuring your project in O3DE.
{{< /note >}}

## Software prerequisites

To create new projects or use advanced development features in O3DE, you need a developer environment that includes the following software:

+ Windows 10 version 1809 (10.0.17763) or later
+ [Microsoft Visual Studio 2019](https://visualstudio.microsoft.com/downloads/) version **16.3.x** through version **16.9.x**
+ [Visual C++ Redistributable for Visual Studio 2019](https://visualstudio.microsoft.com/downloads/#other-family)
+ [CMake {{< versions/cmake >}} or later](https://cmake.org/download/)

{{< note >}}
Microsoft offers **Visual Studio Community** free to individual developers. For more information and to download and install Visual Studio Community, visit the [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) portal.
{{< /note >}}

### Visual Studio configuration
=======
Required free disk space and RAM requirements are dependent on the options that you select when configuring your project in O3DE.
=======
+ 60 GB of free disk space*
+ 1366 x 768 px screen resolution

*Required free disk space and RAM requirements are dependent on the options that you select when configuring your project in O3DE.
>>>>>>> c7b7d43c (more system requirements edits)

## Software prerequisites

To create new projects or use advanced development features in O3DE, you need a developer environment that includes the following software:

+ Windows 10
+ [Microsoft Visual Studio 2019*](https://visualstudio.microsoft.com/downloads/) version **16.2.4** through version **16.9.x**
+ [Visual C++ Redistributable for Visual Studio 2019](https://visualstudio.microsoft.com/downloads/#other-family)
+ [CMake {{< versions/cmake >}} or later](https://cmake.org/download/)

*Microsoft offers Visual Studio Community edition free to individual developers. For more information and to download and install Visual Studio Community, visit the [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) portal.

<<<<<<< HEAD
### Visual Studio Configuration
>>>>>>> b1ca3379 (updated setup from GitHub and system requirements)

The default Visual Studio installation might not include all of the features that are required by O3DE. The following steps describe how to ensure that the necessary Visual Studio features are enabled:
=======
### Visual Studio configuration
>>>>>>> 30dff6d9 (added screenshots)

<<<<<<< HEAD
<<<<<<< HEAD
1. Launch the **Visual Studio Installer**.
=======
The default Visual Studio installation might not include all of the features that are required by O3DE. The following steps describe how to ensure that the necessary Visual Studio features are enabled:
>>>>>>> 68220315 (Update from feedback)

1. Choose **More - Modify** on the version of Visual Studio that you'll use with O3DE.
=======
1. Launch the **Visual Studio Installer** from your download directory or the **Start Menu** if you've already installed Visual Studio.

<<<<<<< HEAD
1. If you've installed Visual Studio, choose **More - Modify** on the version of Visual Studio you'll use with O3DE.
>>>>>>> b1ca3379 (updated setup from GitHub and system requirements)
=======
1. If you've installed Visual Studio, choose **More - Modify** on the version of Visual Studio that you'll use with O3DE.
>>>>>>> 68220315 (Update from feedback)

1. On the **Workloads** tab:
   + Select **Game development with C++**.
      + In the **Installation details** panel on the right, select at least one **Windows 10 SDK**.
   + Select **Desktop development with C++**.

1. On the **Individual components** tab, in **Compilers, build tools, and runtime**:
   + Select at least one version of the **MSVC v142 - VS 2019 C++ x64/x86 build tool**.
