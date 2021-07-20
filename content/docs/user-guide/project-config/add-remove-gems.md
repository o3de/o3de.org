---
linktitle: Adding and Removing Gems
title: Adding and Removing Gems in a Project
description: 'Learn how to add and remove Gems in a project in Open 3D Engine.'
toc: true
---

{{< preview-new >}}

This tutorial shows you how to add and remove Gems in your project by using the **Project Manager** or the command line interface (CLI) in Open 3D Engine (O3DE). Gems provide features and assets to your project. For more details on Gems and what Gems are available with O3DE, refer to the [Gems](/docs/user-guide/gems) section. 

O3DE is pre-requipped with many Gems that you can add to or remove from your project, but you can also use *external*  Gems from other sources. External Gems must be registered to your project before you can enable it. Refer to [Register Gems](/docs/user-guide/project-config/register-gems/) for instructions.


## Steps  
The basic steps to configure Gems are as follows:

1. (Optional) If adding an external Gem, you must register the Gem to your project.
   
2. Filter or search through the Gem catalog, and enable or disable a Gem.
   
3. Save changes. 
   
4. Rebuild your project. 


## Project Manager

### Quick Start

1. Launch **Project Manager**, which is located in your engine folder in `bin\Windows\profile\o3de.exe`.
   
2. Open the menu for a project and select the **Edit Project Settings...** button.

    ![For a project, go to the menu and select 'Edit Project Settings'. ](/images/user-guide/project-config/add-remove-gems/quick-start-1.png)

3. Select the **Configure Gems** button.
    
    ![Select the 'Configure Gems' button to open the Configure Gems screen.](/images/user-guide/project-config/add-remove-gems/quick-start-2.png)


4. In the Configure Gems screen, you can filter through or search for available Gems, and enable or disable Gems for your project. 
   
    Some Gems require a rebuild of your project in order to work. If so, a warning message will appear after you save your configuration.

    ![Configure Gems screen.](/images/user-guide/project-config/add-remove-gems/quick-start-3.png)

### Filter

Filter the Gem catalog to help you find a particular set of Gems. 

![Filter Gems](/images/user-guide/project-config/add-remove-gems/ui-filter-by.png)

You can filter by the following groups: 
| Criteria | Description |
| - | - |
| Status | Displays Gems that are already either selected or unselected for your project.  |
| Provider | Displays Gems based on their provider. `Open 3D Engine` displays Gems that are built with O3DE source. `Local` displays Gems that are provided by other sources. |
| Type | Displays Gems based on the type of Gem. `Asset` displays Gems that add assets to your project. `Code` displays Gems that extend functionality in your project. `Tool` displays Gems that provide a tool you can use in O3DE. |
| Supported Platforms | Displays Gems based on the platforms that support it. |
| Features | Displays Gems based on its provided features. |

### Search

Search the Gem catalog by entering the Gem name in the search field.  

![Search field](/images/user-guide/project-config/add-remove-gems/ui-search.png)


### View details

Select a Gem to view its description, other Gems it depends on or conflicts with, and additional information. 

![View Gem details](/images/user-guide/project-config/add-remove-gems/ui-gem-details.png)



### Enable or disable

Enable or Disable Gems in your project by toggling **Selected** for a given Gem. 

![Gems to enable or disable during configuration.](/images/user-guide/project-config/add-remove-gems/ui-enable-disable-gem.png)

You can enable or disable multiple Gems at once. The changes you want to make are summarized in the top right corner of the window. Select the Gem bag icon to view the Gems to enable or disable. These changes become active only after you've saved and (depending on the configuration) rebuilt your project. 

![Gems to enable or disable during Gem configuration.](/images/user-guide/project-config/add-remove-gems/ui-gem-changes.png)


## Command line Interface (CLI)

You can also configure Gems using the CLI. Refer to [CLI Reference](docs/user-guide/project-config/cli-reference/) for more details on supported CLI commands. 

### Enable or disable
1. Open a command prompt to the folder where your engine lives.

2. Use the following commands to enable or disable a Gem for a project. 
   
    **Enable**

    ```cmd
    scripts/o3de enable-gem -gp <gem-path> -pp <project-path>
    ```

    **Disable**

    ```cmd
    scripts/o3de enable-gem -gp <gem-path> -pp <project-path>
    ```

    There are other variations of options you can use that specifies either the name or path of the Gem and project.
    - `-gp`, `--gem-path`: Path to the Gem folder (can be absolute or relative).
    - `-gn`, `--gem-name`: Name of the Gem, which can be found in the Gem's `gem.json` configuration file. 
    - `-pp`, `--project-path`: Path to the project folder (can be absolute or relative).
    - `-pn`, `--project-name`: Name of the project, which can be found in the project's `project.json` configuration file. 
