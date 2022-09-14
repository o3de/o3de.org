---
linktitle: Registering Gems
title: Registering Gems to a Project
description: Learn how to register external Gems to a project in Open 3D Engine (O3DE).
toc: true
weight: 140
---

**Open 3D Engine (O3DE)** includes many Gems that extend features and add assets to your project. For a full list, refer to the [Gem Reference](/docs/user-guide/gems/). These Gems have already been registered to the engine and are ready to be added to a project.

You can also register *external* Gems from a source outside of O3DE so that they too can be used in your project. Registering a Gem enables your project to find the Gem. Gem folders can be located anywhere on your computer.

After you've registered a Gem, you can enable it for use in your project. Refer to [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems/) for instructions on enabling or disabling a Gem.

## Register

To register a Gem to your project:

1. Open a command prompt to the folder where your engine lives.

2. Use the following command to register a Gem to your project. This command verifies that the specified Gem path contains a valid `gem.json` configuration file before registering the Gem to your project. When the Gem is registered to your project, the Gem path is added to your project's `project.json` configuration file in the `external_subdirectories` list.
   
    ```cmd
    scripts/o3de register -gp <gem-path> -espp <project-path>
    ```

    There are short and long notations of the options that you can use to specify the path of the Gem and project.
    - `-gp`, `--gem-path`: Path to the Gem folder (can be absolute or relative).
    - `-espp`, `--external-subdirectory-project-path`: Path to your project folder (can be absolute or relative).

## Deregister
To deregister a Gem from your project, add the `--remove` option to the command for registering a Gem. This removes the Gem path from your project's `project.json` configuration file in the `external_subdirectories` list. 

```cmd
scripts/o3de register -gp <gem-path> -espp <project-path> --remove
```
