---
title: Setting up O3DE from the Installer
description: Learn how to install and set up Open 3D Engine (O3DE) using the installer tool.
weight: 200
---

A quick way to get started with O3DE is to download and install a released version. After running the installer, you will have a stable, pre-built version of the engine and its Gems, ready for you to jump into your next project.

The instructions here will guide you through the installation experience. At the end of a successful install, you will be ready to create new or open existing projects with the **Project Manager** tool.

## Prerequisites

The instructions here assume you have completed the following:

* Met all hardware and software requirements listed in [System Requirements](./requirements).
* Configured the required software as described in [Software Configuration](./requirements#software-configuration).

## Installing O3DE

1. Obtain the latest version of the installer from the [O3DE download](https://o3de.org/download/) page.

1. Run the installer from your download location.

1. During developer preview, you might encounter a warning such as the following from Microsoft Defender describing the program as an unrecognized app. To proceed with installation, you must first open the **More info** link and then choose **Run anyway**.

    ![Microsoft Defender Windows protection dialog boxes](/images/welcome-guide/installer-defender-protection.png)

1. The default location for the engine is: `C:\O3DE\<o3de_version>`. Choose **Install** to install O3DE here, or choose **Options** to change the install location.

    ![O3DE welcome and options](/images/welcome-guide/installer-welcome.png)

1. During installation, additional packages will be downloaded as needed. The process can take some time, depending on your internet connection speed. You might notice additional windows open and close during install - for example, when the Python runtime is installed in the engine's `python` directory.

    ![O3DE install progress](/images/welcome-guide/installer-install-progress.png)

1. The installer displays an **Installation Successfully Completed** message if installation was successful. Choose the **Launch** button to open Project Manager, or **Close** to exit the installer.

    ![O3DE install successful](/images/welcome-guide/installer-completed-success.png)

1. The installer creates two shortcuts on the desktop for common O3DE applications:

    ![O3DE Editor icon](/images/welcome-guide/desktop-icon-editor.png) **O3DE Editor**

    The Editor is a central hub for O3DE's creative tools. Place and group entities, add components, configure properties, and open supporting tools to help you implement your project goals. Take the [Editor Tour](/docs/welcome-guide/get-started/editor-tour) to learn more about this application.

    ![O3DE Project Manager icon](/images/welcome-guide/desktop-icon-project-manager.png) **O3DE Project Manager**

    Create and customize projects using the Project Manager tool. You can also enable or disable Gems to add or remove functionality for your project.

    For an introduction to Project Manager and help creating your first project, continue to [Creating Projects Using the Open 3D Engine Project Manager](/docs/welcome-guide/get-started/project-config/creating-projects-using-project-manager) in this guide.
