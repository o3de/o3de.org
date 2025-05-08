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

## Using Project Manager

Launch Project Manager, which can be found on your desktop or in `bin/Windows/profile/Default/o3de.exe` if you installed O3DE, or in your engine build directory if you built O3DE from source.

### Register a local Gem

{{< tip >}}
If the gem that you want to register is part of a repository, it might use the **Remote Content** format (look for a `repo.json` file at the root folder). In this case you can follow [this documentation](/docs/user-guide/remote-content/use-a-remote-repository) for a straightforward way to register multiple gems at once.
{{< /tip >}}

If the gem does not yet exist in your local files, you will have to **download it from the source**. It is common to host content in websites such as github, so you can find an example below on how to download a repository from github which contains a Gem. 

![Download repository](/images/user-guide/project-config/register-gems/github-download.jpg)

Simply unzip the folder once that it has been downloaded.

{{< caution >}}
Some repositories are using git lfs to store large files. In this case you shouldn't use the download button as files will be omitted, but rather perform a `git clone`. A similar setup can be seen [in this documentation](/docs/welcome-guide/setup/setup-from-github). A repository uses git lfs when it contains a `.gitattributes` file at the root.
{{< /caution >}}

Now that you have the Gem content in local, you can use the project manager to register it. Simply use the **Gems** page, and use the right burger menu to finally click on **"Add Existing Gem"**. It will open a file dialog that you can use to browse to your gem folder (it should contain a `gem.json` file).

![Register Gem](/images/user-guide/project-config/register-gems/register-gem.jpg)

If the operation succeeded, you should see your Gem listed in the Gems tab. If you want to use your Gem in a project, you can now proceed [to this documentation](/docs/user-guide/project-config/add-remove-gems).

### Deregister a local Gem

The **Gems** page is listing every gems currently registered. If you use the filter on the left to only display the **Local** Gems, and pick one of them, then you should see a button on the right to **Remove Gem**. Click on this button to unregister the Gem. 

![Remove Gem](/images/user-guide/project-config/register-gems/remove-gem.jpg)

## Using the Command Line Interface (CLI)

### Register a local folder

To register a Gem to your project:

1. Open a command prompt to the folder where your engine lives.

2. Use the following command to register a Gem to your project. This command verifies that the specified Gem path contains a valid `gem.json` configuration file before registering the Gem to your project. When the Gem is registered to your project, the Gem path is added to your project's `project.json` configuration file in the `external_subdirectories` list.
   
    ```cmd
    scripts/o3de register -gp <gem-path> -espp <project-path>
    ```

    There are short and long notations of the options that you can use to specify the path of the Gem and project.
    - `-gp`, `--gem-path`: Path to the Gem folder (can be absolute or relative).
    - `-espp`, `--external-subdirectory-project-path`: Path to your project folder (can be absolute or relative).

### Deregister a local folder

To deregister a Gem from your project, add the `--remove` option to the command for registering a Gem. This removes the Gem path from your project's `project.json` configuration file in the `external_subdirectories` list. 

```cmd
scripts/o3de register -gp <gem-path> -espp <project-path> --remove
```
