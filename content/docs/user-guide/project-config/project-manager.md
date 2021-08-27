---
linktitle: Project Manager
title: Project Manager
description: A reference for the GUI-based Project Manager tool that enables you to create, build, and configure projects in Open 3D Engine (O3DE).
weight: 100
---

**Project Manager** is a standalone application that helps you create, build, and configure Open 3D Engine (O3DE) projects. It provides a GUI-based front-end to the CMake build system and an alternative to many of the commands found in the [O3DE CLI](../cli-reference).

With Project Manager, you can do the following:

* Create a project, or add an existing project.
* Build a project.
* Open a project in **O3DE Editor**.
* Add or remove [Gems](/docs/user-guide/appendix/glossary#gem) in a project from the **Gem Catalog**.
* Configure the project icon.
* Configure engine manifest settings, such as default locations for projects,  downloadable ("third-party") packages, and other O3DE objects on your computer.

## Launching Project Manager

### From a source engine

### From an installed or pre-built SDK engine

Open a file browser or command line window on your computer and navigate to your O3DE engine directory. Locate and launch the O3DE **Project Manager** application, `o3de.exe`, from `<INSTALL_DIRECTORY>/bin/Windows/profile`.

    {{< important >}}
If you built an SDK engine from source using the `INSTALL` target, make sure you launch the Project Manager and other tools from the **install** directory, _not_ the build directory in the engine root. For example, the Windows install directory will typically end in `/bin/Windows/profile`.
    {{< /important >}}

## Project Manager reference

![The Project Manager tool, ready to create projects.](/images/welcome-guide/project-manager-no-projects.png)

### Projects tab

### Engine tab

### Edit project settings

### Configure gems
