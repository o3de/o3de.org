---
linktitle: Installing O3DE for Windows
title: Installing O3DE for Windows
description: Learn how to install and set up Open 3D Engine (O3DE) for Windows using the installer tool.
weight: 100
---

To get started quickly with O3DE in Windows, download and run the installer. Use the following video or written instructions to guide you through the installation process. After a successful install, you'll have a stable, pre-built version of the engine and its Gems, and you'll be ready to create new projects or open existing projects with the **Project Manager** tool.

{{< youtube-width id="_BhkXOBDYGA" title="Installing O3DE for Windows" >}}

## Prerequisites

The following instructions assume that you have:

* Met all hardware and software requirements listed in [O3DE System Requirements](../requirements).
* Configured the required Windows software as described in the [Microsoft Windows](../requirements/#microsoft-windows) section of the system requirements topic.

## Installing O3DE

1. Get the latest version of the Windows installer from the [O3DE download](https://o3de.org/download/#windows) page.

1. Run the installer from your download location.

{{< note >}} To create an offline installer, use the following command: **`<installer exe> /layout`**. This will download a portable MSI and CAB files to the relative path of the installer. Run the MSI to start an offline install. {{< /note >}}

1. During the developer preview, you might encounter the following warning from Microsoft Defender describing the program as an unrecognized app. To proceed with installation, choose **More info**, and then choose **Run anyway**.

    ![Microsoft Defender Windows protection dialog boxes](/images/welcome-guide/installer-defender-protection.png)

1. The default install location is: `C:\O3DE\<o3de_version>`. To install O3DE here, choose **Install**. To change the install location, choose **Options**.

    ![O3DE welcome and options](/images/welcome-guide/installer-welcome.png)

1. During installation, additional files will be downloaded and windows might open and close&mdash;for example, when installing the Python runtime in the engine's `python` directory.

    ![O3DE install progress](/images/welcome-guide/installer-install-progress.png)

1. Upon successful installation, the installer displays the message **Installation Successfully Completed**. To open Project Manager, choose **Launch**. To exit the installer, choose **Close**.

    ![O3DE install successful](/images/welcome-guide/installer-completed-success.png)

    The installer creates two shortcuts on the desktop for common O3DE applications:

    ![O3DE Editor icon](/images/welcome-guide/desktop-icon-editor.png) **O3DE Editor**

    Editor is a central hub for O3DE's creative tools. To help you implement your project goals, use Editor to place and group entities, add components, configure properties, and open supporting tools such as **Animation Editor** and **Script Canvas**. To learn more about Editor, take the [Editor tour](/docs/welcome-guide/tours/editor-tour).

    ![O3DE Project Manager icon](/images/welcome-guide/desktop-icon-project-manager.png) **O3DE Project Manager**

    Create and customize projects using the Project Manager tool. To add or remove functionality for your project, you can also enable or disable Gems.

    For an introduction to Project Manager and help creating your first project, continue to [Creating Projects Using the Open 3D Engine Project Manager](/docs/welcome-guide/create/creating-projects-using-project-manager) to take an introductory tutorial.
