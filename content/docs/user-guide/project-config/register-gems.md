---
linktitle: Registering Gems
title: Registering Gems to a Project
description: 'Learn how to register external Gems to a project in Open 3D Engine (O3DE).'
toc: true
---

{{< preview-new >}}

Open 3D Engine (O3DE) is pre-equipped with many Gems that extend features and add assets to your project. For a full list, refer to the [Gem Reference](/docs/user-guide/gems/reference). These Gems are provided by O3DE and are already registered to the engine by default. 

However, you can also use *external* Gems that are provided by a source outside of O3DE. Before you can use external gems in your project, you must register the Gem. Registering a Gem allows your project to find the Gem's folder path. Gem folders can live in the same drive as your engine, or in another drive. 

After you've registered a Gem, you must enable the Gem to use it in your project. Refer to [Configure Gems](/docs/user-guide/project-config/add-remove-gems/) for instructions on enabling or disabling a Gem. 

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