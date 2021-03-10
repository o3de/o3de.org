---
description: ' View the system requirements for Open 3D Engine. '
title: Open 3D Engine system requirements
weight: 100
---

{{< preview-migrated >}}

O3DE has a minimum set of system requirements for development, as outlined in the following sections\. Disk space and RAM requirements are dependent on the options that you choose during installation\.

## System requirements<a name="system-requirements"></a>

If your system is capable of running a modern real\-time 3D game with good performance you should be set, however, review these detailed requirements to be certain\.

O3DE requires Windows 10\.

Minimum hardware requirements include the following:
+ 3 GHz quad\-core processor
+ 8 GB RAM
+ 2 GB VRAM DirectX 11 or later compatible video card
  + NVIDIA GeForce GTX 660 Ti with driver version 368\.81 or later
  + AMD Radeon HD 8730M with driver version 16\.15\.2211 or later
+ 60 GB of free disk space
+ 1366 x 768 px screen resolution

**Note**
If you select options to build the engine, editor, or tools in **Setup Assistant**, 14 GB RAM is required for compilation\.
Some advanced graphics features require a DirectX 12 or later compatible video card\.
Required free disk space is dependent on the options that you select when installing O3DE\.

## Prerequisites<a name="development-environment"></a>

You can use the O3DE Editor and tools without installing additional software\. To create new projects or use advanced development features in O3DE, you need a developer environment that includes Microsoft Visual Studio\. The following versions are supported:
+ \(Recommended\) Microsoft Visual Studio 2019 version **16\.2\.4** thru version **16\.8\.x**\.
+ Microsoft Visual Studio 2017 version **15\.9\.14** thru version **15\.9\.x**\.

Microsoft offers Visual Studio Community edition free to individual developers\. For more information and to download and install Visual Studio Community, visit the [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) portal\.

 **Visual Studio 2017 and 2019 required features**

The default Visual Studio installation might not include all of the features that are required by O3DE\. Ensure that the following Visual Studio features are enabled:

1.  Launch the **Visual Studio Installer** from your download directory or the **Start Menu** if you've already installed Visual Studio\.

1.  If you've installed Visual Studio, choose **More \- Modify** on the version of Visual Studio you'll use with O3DE\.

1.  On the **Workloads** tab:
   + Select **Game development with C\+\+**\.
     + In the **Installation details** panel on the right, select at least one **Windows 10 SDK**\.
   + Select **Desktop development with C\+\+**\.

1.  On the **Individual components** tab, under **Compilers, build tools, and runtime**, make sure that a **VC\+\+ toolset** that corresponds to the installed version of Visual Studio has been selected:
   + If using **Visual Studio 2017**: Select at least one version of the **VC\+\+ 2017 toolset**\.
   + If using **Visual Studio 2019**: Select at least one version of the **MSVC v142 \- VS 2019 C\+\+ x64/x86 build tool**\.
     + \(Optional\) To build with the Visual Studio 2017 toolset in Visual Studio 2019, select **MSVC v141 \- VS 2017 C\+\+ x64/x86 build tools**\.

## Visual C\+\+ redistributable packages<a name="visual-studio-redistributable-requirements"></a>

 **O3DE Installer** will attempt to download and install the required Visual C\+\+ Redistributable packages during the installation process\. Under some circumstances, the installation of these redistributable packages may fail\. If you receive a missing Visual C\+\+ runtime `.dll` error while running O3DE Installer, O3DE Setup Assistant, or Project Configurator, do the following:

1.  Check that the Visual C\+\+ redistributable installers for Visual Studio 2012 and Visual Studio 2019 have been successfully downloaded\. The installers are located in the corresponding **Visual Studio** directories in the `lumberyard_version\dev\Tools\Redistributables\` directory\.

1.  If the Visual C\+\+ redistributable installers for Visual Studio 2012 and Visual Studio 2019 have not been downloaded by O3DE Installer, manually download the installers from Microsoft\.
   +  [Visual C\+\+ Redistributable for Visual Studio 2012](https://www.microsoft.com/en-us/download/details.aspx?id=30679)
   +  [Visual C\+\+ Redistributable for Visual Studio 2019](https://visualstudio.microsoft.com/downloads/#other-family)

1.  Run both Visual C\+\+ redistributable installers\.

1.  Retry the O3DE installation after the Visual Studio redistributables have successfully installed\.

**Note**
The Visual C\+\+ Redistributable for Visual Studio 2019 also contains redistributables for Visual Studio 2015 and 2017\.
