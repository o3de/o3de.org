---
linktitle: Adding and Removing Gems
title: Adding and Removing Gems in a Project
description: Learn how to add and remove Gems in a project in Open 3D Engine.
toc: true
weight: 120
---

This tutorial shows you how to add and remove Gems in your project by using the **Project Manager** or the command line interface (CLI) in **Open 3D Engine (O3DE)**. Gems provide features and assets to your project. For more details on Gems and what Gems are available with O3DE, refer to the [Gems](/docs/user-guide/gems) section.

O3DE includes many Gems that you can add to your project. You can also use Gems from *external* sources. External Gems must be registered to your project before you can enable them. Refer to [Registering Gems](/docs/user-guide/project-config/register-gems/) for instructions on how to register additional Gems.

## Overview

The basic steps to configure Gems for your project are as follows:

1. (Optional) Register the Gem if it is from an external source.

1. Locate the Gem you want to enable or disable.

1. Enable or disable the Gem.

1. (Optional) Selecting a Gem version.

1. Save changes.

1. Rebuild your project (if necessary).

## Using Project Manager

### Opening the Configure Gems screen

1. Launch **Project Manager**, which can be found on your desktop or in `bin/Windows/profile/Default/o3de.exe` if you installed O3DE, or in your engine build directory if you built O3DE from source.

1. Open the menu for a project and select the **Configure Gems...** button.

    ![For a project, go to the menu and select 'Edit Project Settings'. ](/images/user-guide/project-config/add-remove-gems/quick-start-1.png)

1. In the **Configure Gems** screen, you can filter or search for available Gems. Scroll through the resulting list to find the Gem you want to enable or disable for your project.

    ![Configure Gems screen.](/images/user-guide/project-config/add-remove-gems/configure-gems-screen.png)

### Locating Gems

**Filtering the catalog**

Filter the Gem catalog to help you find a particular set of Gems. 

![Filter Gems](/images/user-guide/project-config/add-remove-gems/ui-filter-by.png)

You can filter by the following groups: 
| Criteria | Description |
| - | - |
| Status | Displays Gems that are already either selected or unselected for your project.  |
| Versions | Displays Gems that are compatible with your project or have version updates.  |
| Provider | Displays Gems based on their provider. `Open 3D Engine` displays Gems that are built with O3DE source. `Local` displays local Gems that are provided by other sources. `Remote` displays Gems that are provided by remote sources. |
| Type | Displays Gems based on the type of Gem. `Asset` displays Gems that add assets to your project. `Code` displays Gems that extend functionality in your project. `Tool` displays Gems that provide a tool you can use in O3DE. |
| Supported Platforms | Displays Gems based on the platforms that support it. |
| Features | Displays Gems based on its provided features. |

**Searching the catalog**

Search the Gem catalog by entering text in the search field. You can search for Gems using any of the following search terms:

* Gem name
* Gem display name
* Origin
* Summary
* Features

![Search field](/images/user-guide/project-config/add-remove-gems/ui-search.png)

**Viewing Gem details**

Select a Gem to view its description, other Gems it depends on or conflicts with, and additional information.

![View Gem details](/images/user-guide/project-config/add-remove-gems/ui-gem-details.png)

When an update is availble for an active gem a yellow notification icon will appear in the gem row next to the gem version.

![Gem update available](/images/user-guide/project-config/add-remove-gems/ui-gem-update-available.png)

### Enabling or disabling Gems

Enable or disable Gems in your project by toggling the switch under the **Selected** column for a given Gem.

![Gems to enable or disable during configuration.](/images/user-guide/project-config/add-remove-gems/ui-enable-disable-gem.png)

You can enable or disable multiple Gems at once. The changes that will be made to the project are summarized in the top right corner of the window. Select the Gem bag icon to view the Gems to enable or disable. These changes will take effect after you've saved and (depending on the Gem requirements) rebuilt your project.

![Gems to enable or disable during Gem configuration.](/images/user-guide/project-config/add-remove-gems/ui-gem-changes.png)

### Selecting a Gem version

If multiple versions of a Gem are available, a drop-down box will be visible in the Gem details panel showing available versions.  Select a version to see the details about it.  

![Gem version details.](/images/user-guide/project-config/add-remove-gems/ui-gem-version-details.png)

When you activate the gem, the selected version will be used.  If the Gem is already active, a `Use Version` button will appear in the Gem details panel when the Gem version is changed.

![Use Gem version button.](/images/user-guide/project-config/add-remove-gems/ui-use-version-button.png)

### Saving and rebuilding

1. Select the **Save** button when you are finished adding and removing Gems from your project.  If any compatibility issue are found with the added gems, a popup will appear with information and ask if you want to continue adding those gems or cancel.

1. Asset-only Gems do not typically require a rebuild of your project, however Gems that include code do. When you save changes to your project configuration, a warning message will appear if you need to rebuild.

    ![Project rebuild warning](/images/user-guide/project-config/add-remove-gems/project-rebuild-warning.png)

1. In the Project Manager home screen, select the **Build Project** button on your project to rebuild it (if necessary).

    ![Build project button](/images/user-guide/project-config/add-remove-gems/project-build-button.png)

## Using the Command Line Interface (CLI)

You can also configure Gems using the CLI. Refer to [CLI Reference](/docs/user-guide/project-config/cli-reference/) for additional supported CLI commands.

1. Open a command prompt to the folder where your engine is located.

1. Use the following commands to enable or disable a Gem for a project.

    **Enable**

    ```cmd
    scripts/o3de enable-gem -gp <gem-path> -pp <project-path>
    ```

    **Disable**

    ```cmd
    scripts/o3de disable-gem -gp <gem-path> -pp <project-path>
    ```

    There are several variations of these commands that you can use to specify either the name with optional version specifier or the path of the Gem and project.
    - `-gp`, `--gem-path`: Path to the Gem folder (can be absolute or relative).
    - `-gn`, `--gem-name`: Name of the Gem with optional version specifier, which can be found in the Gem's `gem.json` configuration file: i.e. `--gem-name Atom>=1.0.0`. Refer to the [Gem Versioning](/docs/user-guide/gems/gem-versioning) section for more information about Gem version specifiers.
    - `-pp`, `--project-path`: Path to the project folder (can be absolute or relative).
    - `-pn`, `--project-name`: Name of the project with optional version specifier, which can be found in the project's `project.json` configuration file.

1. Rebuild your project. Refer to the [Build](/docs/user-guide/build) section for more information about building your project from the command line.
