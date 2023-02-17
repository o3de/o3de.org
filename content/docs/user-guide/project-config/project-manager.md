---
linktitle: Project Manager
title: Project Manager
description: A reference for the GUI-based Project Manager tool that enables you to create, build, and configure projects in Open 3D Engine (O3DE).
weight: 100
---

**Project Manager** is a standalone application that helps you create, build, and configure **Open 3D Engine (O3DE)** projects. It provides a GUI-based front-end to the CMake build system and an alternative to many of the commands found in the [O3DE CLI](../cli-reference).

With Project Manager, you can do the following:

* Create a project, or add an existing project.
* Build a project.
* Open a project in **O3DE Editor**.
* Add a [Gem](/docs/user-guide/appendix/glossary#gem) repo.
* Add or remove Gems from a project using the **Gem Catalog**.
* Configure the project icon.
* Configure O3DE manifest settings, such as default locations for projects,  downloadable ("third-party") packages, and other O3DE objects on your computer.

## Launching Project Manager

To launch Project Manager, do one of the following:

* Open the **Project Manager** shortcut that was placed on your desktop during installation.
* Launch `o3de.exe` from the engine or project build directory.

The location of `o3de.exe` depends on how the engine binaries were built:

{{< tabs name="o3de.exe location" >}}
{{% tab name="Source engine" %}}

When you build a source engine, you specify a build directory, such as `build/windows` or `build/linux`. The binaries are located in a subdirectory of the build directory. The path name of this subdirectory depends on the build configuration you chose. Example: `bin/profile`.

To launch Project Manager, do the following:

1. Open a file browser or command line window on your computer and navigate to the O3DE engine or project directory that contains your build directory.

1. Locate and launch the Project Manager application, `o3de.exe`, from `<BUILD_DIRECTORY>/bin/<BUILD_CONFIGURATION>`.

Example:

```cmd
build\windows\bin\profile\o3de.exe
```

{{% /tab %}}
{{% tab name="Installed or pre-built SDK engine" %}}

To launch Project Manager, do the following:

1. Open a file browser or command line window on your computer and navigate to your O3DE install directory.

1. Locate and launch the Project Manager application, `o3de.exe`, from `<INSTALL_DIRECTORY>/bin/<PLATFORM>/<BUILD_CONFIGURATION>/Default`.

Example:

```cmd
bin\Windows\profile\Default\o3de.exe
```

{{< important >}}
If you built the engine from source using the `INSTALL` target, make sure that you launch Project Manager from the installed engine's build directory, _not_ the engine's build directory. This is important, because the engine that Project Manager uses for various operations, such as creating new projects, is determined based on the location of the `o3de.exe` application.
{{< /important >}}

{{% /tab %}}
{{< /tabs >}}

## Project Manager reference

The Project Manager application contains the following screens:

* Projects
* Engine
* Project details
* Project settings
* Configure gems

### Projects

The **Projects** tab is the home screen for Project Manager. Here you will find all of your registered O3DE projects.

![Projects tab with legend](/images/user-guide/project-config/project-manager/projects-tab-legend.png)

When one or more projects are registered on your computer, the **New Project...** menu **(1)** appears in the upper right corner of the window, containing the following choices:

| Action | Description |
| - | - |
| **Create New Project** | Starts the new project workflow. |
| **Add Existing Project** | Opens a **Select Project Directory** browse dialog box, from which you can add an existing O3DE project to Project Manager. This will also register the project in your O3DE manifest. |

Each project is represented by its project icon **(2)** and a project display name **(3)**. Messages and buttons relevant to the current state of the project appear inside the project icon rectangle. Underneath each project's icon is the project context drop-down menu **(4)** containing actions that can be performed on that project.

{{< note >}}
Hover over the project name below the project icon to show the absolute path to the project as a tooltip.
{{< /note >}}

The project context menu contains the following actions:

| Action | Description |
| - | - |
| **Edit Project Settings** | Opens the project settings screen, from which you can change selected project settings and configure which Gems are enabled for your project. |
| **Configure Gems** | Skips the project settings screen and opens the Configure Gems page for your project. |
| **Build** | Builds the project. |
| **Open CMake GUI** | Opens the GUI interface for the CMake program to your project directory. |
| **Open Project folder** | Opens the project folder in a File Explorer window on your computer. |
| **Create Editor desktop shortcut** | Creates a desktop shortcut that will open your project in **O3DE Editor**, skipping Project Manager. |
| **Duplicate** | Creates a duplicate of the project (without the build folder) in a directory of your choosing. It also registers the new project in the O3DE manifest in your user folder. Note that the project display name of the duplicate project will be the same as the original. You can update the display name in Project Settings. |
| **Remove from O3DE** | Removes the project from Project Manager and the O3DE manifest, but does not delete the project from disk. |
| **Delete this Project** | Removes the project from Project Manager and the O3DE manifest _and deletes the project from disk_. |

### Engine

The **Engine** tab contains settings from the engine manifest and the O3DE manifest. The default folder locations are editable on this screen.

{{< note >}}
The default location for all of the default folders is in your user folder. If you have limited drive space in your user folder, consider changing some of these default folder locations&mdash;particularly the "3rd Party Software Folder," which will contain several GB of downloaded packages after building your first project.
{{< /note >}}

![Engine tab with default values](/images/welcome-guide/project-manager-engine-settings-adjusted.png)

The Engine tab contains the following O3DE settings:

| Setting | Description | Default |
| - | - | - |
| **Engine Name** | (Read-only) The name of the O3DE engine read from the `engine.json` manifest of the engine associated with Project Manager when Project Manager was launched. | |
| **Engine Version** | (Read-only) The O3DE engine version read from the `engine.json` manifest of the engine associated with Project Manager when Project Manager was launched. | |
| **Engine Folder** | (Read-only) The location of the O3DE engine associated with Project Manager when Project Manager was launched. Clicking on the folder icon opens the engine folder in a File Explorer window on your computer. | |
| **3rd Party Software Folder** | Defines the location of the downloadable packages used by O3DE and its components. | `<user>/.o3de/3rdParty` |
| **Default Projects Folder** | Defines the default folder for projects. New projects will be created in this folder unless a different path is specified during the new project workflow. | `<user>/O3DE/Projects` |
| **Default Gems Folder** | Defines the default folder for Gems. New Gems will be created in this folder unless a different path is specified when the Gem is created. | `<user>/O3DE/Gems` |
| **Default Project Templates Folder** | Defines the default folder for project templates. New project templates will be created in this folder unless a different path is specified when the project template is created. | `<user>/O3DE/Templates` |

### Project details

The **Enter Project Details** screen is part of the "new project" workflow. On this screen, you can set the project's name and location on your computer. You can also choose the project template, which defines the initial set of Gems that are enabled in your new project. You can further refine the initial set of Gems using the **Configure Gems** button.

![Create a New Project - Project Details screen](/images/welcome-guide/project-manager-create-project.png)

### Project settings

The **Edit Project Settings** menu action in the project context menu opens the **Edit Project Settings** screen. On this screen, you can change the project's display name and update the project's icon. These settings and other information are stored in the `project.json` file located at the root of your project directory. You can also change the set of Gems that are enabled for your project using the **Configure Gems** button.

![Edit Project Settings screen](/images/user-guide/project-config/project-manager/project-settings.png)

The Edit Project Settings screen contains the following project settings:

| Setting | Description |
| - | - |
| **Project Name** | The project's display name. This is the name that's displayed under the project icon on the Projects tab in Project Manager. |
| **Project Location** | The project's location on your computer. If you select a different folder using the folder button, Project Manager will move your project to the new location and update the O3DE manifest with the new path. A project rebuild is required after moving your project in this way. |
| **Project Preview** | The path to the project icon image. The filename will always be `preview.png`. If you select a different image using the folder button, Project Manager will copy the image to your project folder and rename it `preview.png`. |

### Configure Gems

The **Configure Gems** screen enables you to change the collection of Gems that are enabled in your project. You can open this screen during the new project workflow, from the **Enter Project Details** screen, or from the **Edit Project Settings** screen of an existing project. You can use the Gem Catalog in the **Configure Gems** screen to find and enable new Gems for your project. Refer to [Adding and Removing Gems in a Project](./add-remove-gems) for instructions on using Configure Gems.

![Configure Gems screen](/images/user-guide/project-config/add-remove-gems/configure-gems-screen.png)

## Creating projects using Project Manager

This tutorial provides an introduction to project configuration and building in **Open 3D Engine (O3DE)**. The instructions here and in the video will guide you through the following steps:

* Configure the **Project Manager** engine settings.
* Create a new O3DE project.
* Build the O3DE project.

At the end of the tutorial, you'll have a new O3DE project based on the default project template, ready to open in **O3DE Editor**.

{{< youtube-width id="_BhkXOBDYGA?start=142" title="Installing O3DE for Windows - Create a Project" >}}

### Prerequisites

The following instructions assume that you have:

* O3DE installed or built as an [SDK engine](/docs/user-guide/appendix/glossary#sdk-engine) on your computer. For help, refer to [Set up Open 3D Engine](/docs/welcome-guide/setup).
* Met all hardware and software requirements listed in [O3DE System Requirements](/docs/welcome-guide/requirements).

{{< note >}}
If you set up O3DE from GitHub and chose the [source engine](/docs/user-guide/appendix/glossary#source-engine) build type, you need to create a project from the command line and build it before you'll have a version of **Project Manager** that will work with your new project. Follow the instructions in [Creating Projects Using the CLI](/docs/welcome-guide/create/creating-projects-using-cli) to create a project for your source engine.
{{< /note >}}

### Launch Project Manager

1. Either launch Project Manager from an icon on your desktop, or open a file browser or command line window on your computer and navigate to your O3DE engine directory. Locate and launch the O3DE **Project Manager** application, `o3de.exe`, from `<install-directory>/bin/<platform>/profile/Default`.

    {{< important >}}
If you built an SDK engine from source using the `INSTALL` target, make sure you launch the Project Manager and other tools from the **install** directory, _not_ the build directory in the engine root. For example, the Windows install directory will typically end in `/bin/Windows/profile/Default`.
    {{< /important >}}

### Configure the engine settings

If this is the first time you've used Project Manager to create a project, then check and configure the O3DE engine settings before you create and build the project.

1. Choose the **Engine** tab near the top of Project Manager.

1. Review the default locations and update as desired, taking into consideration that the **3rd Party Software Folder** and a typical project located in the **Default Projects Folder** each require 10 - 20 GB of free space on a computer. O3DE uses your user directory in all the locations by default.

    If you set up and built O3DE from GitHub, you can set the **3rd Party Software Folder** to the same packages directory you created when you built the engine (for example, `C:\o3de-packages`), to avoid downloading the same packages again when the project builds.

    ![Default Projects Folder and 3rd Party Software Folder updated in engine settings](/images/welcome-guide/project-manager-engine-settings-adjusted.png)

1. Go back to the **Projects** tab when you have finished updating the engine settings.

### Create a new O3DE project

1. In Project Manager, choose **Create a Project**. This will guide you through creating a new project, starting from the default project template. It will also register the O3DE engine, if you haven't already registered it.

    ![Choose "Create a Project"](/images/welcome-guide/project-manager-no-projects.png)

    If you have already registered one or more projects, open the **New Project** dropdown menu instead and choose **Create New Project**.

    ![Or choose "New Project - Create New Project"](/images/welcome-guide/project-manager-menu-create-new-project.png)

1. Under **Project name**, give your project a name. You can use up to 64 letters, numbers, underscores ('_'), or hyphens ('-'). Spaces are not allowed.

1. If you want to change the project location, under **Project Location**, choose the folder icon, and then use the **Browse** dialog box to choose a new location. If needed, you can create a new project folder. The folder that you choose becomes the project root directory.

    ![Create a New Project - Project Details screen](/images/welcome-guide/project-manager-create-project.png)

1. Under **Select a Project Template**, you can choose a project template with a pre-configured selection of Gems. You can modify the list of Gems enabled for your project by choosing the **Configure Gems** button. This tutorial uses the default template and its pre-configured selection of common Gems.

1. Choose **Create Project** to create the project files in the project location you selected. This also registers your project in the O3DE manifest, located at `<user-folder>/.o3de/o3de_manifest.json`.

### Build the O3DE project

You are now ready to build the project from Project Manager.

1. Inside your project's icon box, open the **Build Project** dropdown menu and choose **Build Now**.

    ![Choose Build Project](/images/welcome-guide/project-manager-build-project.png)

1. After choosing **Yes** in the next dialog box to confirm that you are ready to build your project, the build will begin.

    {{< note >}}
The first build may take some time to complete if the required third-party packages need to be downloaded.
    {{< /note >}}

    When the build completes, you can find the project binaries in your project directory under `build/<platform>/bin/profile`.
    
    {{< note >}}
On Windows, if you have multiple versions of Visual Studio installed, Project Manager will build with the highest version detected. To specify the version of Visual Studio, use the CMake environment variable `CMAKE_GENERATOR_PLATFORM` with a [value from the CMake generator list](https://cmake.org/cmake/help/latest/manual/cmake-generators.7.html#visual-studio-generators).
    {{< /note >}}

1. To open your built project in the Editor, move your pointer inside your project's icon box and choose **Open Editor**.

For more information about project configuration and building, refer to the [Project Configuration](/docs/user-guide/project-config) and [Build](/docs/user-guide/build) sections of the User Guide.
