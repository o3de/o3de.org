---
linktitle: Creating Projects Using Project Manager
title: Creating Projects Using the Open 3D Engine Project Manager
description: Learn how to create and build Open 3D Engine (O3DE) projects from the default project template using the Project Manager tool.
weight: 100
toc: true
---

This tutorial provides an introduction to project configuration and building in Open 3D Engine (O3DE). The instructions here will guide you through the following steps:

* Configure the **O3DE Project Manager** engine settings.
* Create a new O3DE project.
* Build the O3DE project.

At the end of the tutorial you'll have a new O3DE project, based on the default "standard" project template, ready to open in **O3DE Editor**.

## Prerequisites

The instructions that follow assume you have the following:

* O3DE installed or built as a pre-installed SDK engine on your computer. For help, refer to [Set up Open 3D Engine](/docs/welcome-guide/setup).
* Met all hardware and software requirements listed in [O3DE System Requirements](/docs/welcome-guide/requirements).

{{< note >}}
If you set up O3DE from GitHub and chose the [source engine](/docs/welcome-guide/setup/setup-from-github/#build-the-engine) build type, it is recommended that you create your project using the CLI. Refer to [Creating Projects Using the CLI](../creating-projects-using-cli).
{{< /note >}}

## Launch Project Manager

Project directories can be located either in the same directory as the O3DE root directory or outside of this directory. The latter are referred to as "external projects" in this documentation.

This tutorial uses the following project name and directories in the examples:

* O3DE engine install directory: `C:\o3de-install`
* New project name and location: `C:\o3de-projects\MyProject`
* Package directory (created earlier during [setup](/docs/welcome-guide/setup/setup-from-github/#build-the-engine)): `C:\o3de-packages`

1. Open a file browser or command line window on your computer and navigate to your O3DE engine directory. Locate and launch the O3DE **Project Manager** application, `o3de.exe`, from `<INSTALL_DIRECTORY>/bin/Windows/profile`.

    ![Launch o3de.exe from <INSTALL_DIRECTORY>/bin/profile](/images/welcome-guide/project-manager-location.png)

    {{< important >}}
If you built the engine from source using the INSTALL target, make sure you launch the Project Manager and other tools from the **install** directory, _not_ the build directory in the engine root. For example, the Windows install directory will typically end in `/bin/Windows/profile`.
    {{< /important >}}

## Configure the engine settings

If this is the first time you've used Project Manager to create a project, then check and configure the O3DE engine settings before you create and build the project.

1. Choose the **Engine** tab near the top of Project Manager.

1. Review the default locations and update as desired, taking into consideration that the **3rd Party Software Folder** and a typical project located in the **Default Projects Folder** each require 10 - 20 GB of free space on a computer. O3DE uses your user directory in all the locations by default.

    If you setup and built O3DE from GitHub, you can set the **3rd Party Software Folder** to the same packages directory you created when you built the engine (for example, `C:\o3de-packages`), to avoid downloading the same packages again when the project builds.

    ![Default Projects Folder and 3rd Party Software Folder updated in engine settings](/images/welcome-guide/project-manager-engine-settings-adjusted.png)

1. Go back to the **Projects** tab when you have finished updating the engine settings.

## Create a new O3DE project

1. In Project Manager, choose **Create a Project**. This will guide you through creating a new project, starting from the default project template. It will also register the O3DE engine, if you haven't already registered it.

    ![Choose "Create a Project"](/images/welcome-guide/project-manager-no-projects.png)

    If you have already registered one or more projects, open the **New Project** dropdown menu instead and choose **Create New Project**.

    ![Or choose "New Project - Create New Project"](/images/welcome-guide/project-manager-menu-create-new-project.png)

1. Give your project a name, such as "MyProject". If you want to change the project location, choose the folder icon in the Project Location field and use the Browse dialog box to select a new location, creating the new project folder if needed. The folder you select will become the project root directory.

    ![Create a New Project - Project Details screen](/images/welcome-guide/project-manager-create-project.png)

1. You can also select a different project template, and choose different Gems to enable for your project. In this tutorial, the default template and its pre-configured selection of common Gems will be used.

1. Choose **Create Project** to create the project files in the directory specified by the project location. This will also register your project in the O3DE manifest, located at `<USER_DIRECTORY>/.o3de/o3de_manifest.json`.

## Build the O3DE project

You are now ready to build the project from Project Manager.

1. Choose the **Build Project** button for your new project.

    ![Choose the Build Project button](/images/welcome-guide/project-manager-build-project.png)

1. The project should not take long to build. When the build is complete, the project binaries can be found in your project directory under `build/windows_vs2019/bin/profile`.

1. To open your built project in O3DE **Editor**, click or tap on the **Open Editor** button inside the project box in Project Manager.

For more information about project configuration and building, refer to the [Project Configuration](/docs/user-guide/project-config) and [Build](/docs/user-guide/build) sections of the User Guide.
