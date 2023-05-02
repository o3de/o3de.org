---
linktitle: Project Configuration
title: Project Configuration
description: Learn the basics of project configuration in Open 3D Engine (O3DE), and get the details on the Project Manager and O3DE CLI tools.
weight: 100
---

**Open 3D Engine (O3DE)** projects define and configure the set of code and assets that make up your game or other application. [Gems](/docs/user-guide/gems) that you enable for your project provide some code and assets. A project directory, sometimes referred to as the "project root", contains your projects.

To create and manage projects, you can use either the GUI-based **Project Manager** tool or the O3DE command line interface (CLI). The topics in this section provide details on creating O3DE projects using either of these options.

| Topic | Description |
| - | - |
| [Understanding `project.json`](#understanding-project-json) | Get a detailed look at the fields in the project manifest, an important project configuration file. |
| [Project Manager](project-manager/) | Learn how to create and manage projects using a GUI-based tool. |
| [Adding and Removing Gems](add-remove-gems/) | Learn how to add and remove Gems in your project. |
| [Registering Gems](register-gems/) | Learn how to register external Gems from sources outside of O3DE. |
| [O3DE CLI Reference](cli-reference/) | Learn how to create and configure your O3DE environment and its objects, including engines, projects, and Gems, using the `o3de` Python script. |
| [Troubleshooting](troubleshooting/) | Troubleshoot common issues that you might encounter during project configuration. |
| [Local `project.json` Overrides](#user-project-json) | Learn how to override the engine name and path using a `project.json` override file in your project's `user` folder. |

To build projects, use either Project Manager or **CMake**. For more information, refer to any of the following resources:

* [Introductory tutorials](/docs/welcome-guide/create/) in the Get Started Guide.
* [Project Manager](project-manager/) and its **Build** command in the project drop-down menu.
* [Configure and build](/docs/user-guide/build/configure-and-build) topic in the Build section of this User Guide.

## Understanding `project.json` {#understanding-project-json}

Each project's root directory contains a project manifest file named `project.json`. This file stores important project configuration properties. O3DE creates this file for you during project creation.

To change any of the properties in this file, you can either edit the file manually using a text editor, or edit individual properties using the `edit-project-properties` [O3DE CLI](./cli-reference) command. Additionally, you can edit the `display_name` property in Project Manager.

The following table describes each of the properties in `project.json`. The default value for many of the properties contains the project name given when you created the project. We indicate this project name as "`<PROJECT_NAME>`".

The "`<USER>`" placeholder below refers to the user's home directory based on the operation system being used. For example, if your user name is "Foo" and you are using a Windows machine, the `<USER>` directory would be `C:\Users\Foo`.

| Operating System | Home Directory Path |
| --- | --- |
| Windows | `C:\Users\<YourUserName>` |
| Linux | `/home/<YourUserName>` |
| MacOs | `/Users/<YourUserName>` |



| Property | Required | Description | Default |
| --- | --- | --- | --- |
| **project_name** | **Required** | The name of the project. The `--project-name` O3DE CLI parameter uses this name to identify the project. | "`<PROJECT_NAME>`" |
| **display_name** | **Required** | The display name of the project in Project Manager. | "`<PROJECT_NAME>`" |
| **engine** | Optional | The name of the engine and optional version specifier this project uses. Register engines in your O3DE manifest, located at `<USER>/.o3de/o3de_manifest.json`. | "o3de" |
| **engine_api_dependencies** | Optional | A list of engine API dependencies.  If empty, the project is assumed compatible with all versions of any engine APIs. | "" |
| **external_subdirectories** | Optional | The path to one or more directories to include in the project build. You can use any directory with a `CMakeLists.txt` file. When you register Gems to the project using the `register --external-subdirectory-project-path` O3DE CLI command, O3DE adds their paths here. | [ ] |
| **canonical_tags** | **Required** | A standard field in O3DE manifests used to identify an O3DE object's type. Examples: "Gem", "Project". Projects should use the "Project" tag. | [ "Project" ] |
| **compatible_engines** | Optional | A list of engine names and optional version specifiers that this project is known to be compatible with: i.e. `o3de>=2.0.0`, `o3de-sdk==1.2.0`, `o3de-custom` etc. If empty, the project is assumed compatible with all engines if they meet all the requirements in the `engine_api_dependencies` and `gem_names` fields. | [ ] |
| **gem_names** | Optional | A list of gem names and optional version specifiers that this project uses, including the Gem included in the project: i.e. `Atom`, `PopcornFX==1.2.0` etc. | [ "`<PROJECT_NAME>`" ] |
| **icon_path** | Optional | The path and filename of the project icon. Project Manager uses this icon. The file must be located in the project root directory. The current recommended size is 210px wide and 280px high. | "preview.png" |
| **license** | **Required** | The license that the project uses, and any copyright information that you want to include. Consider providing the URL for the license. This field is intended for Project Manager to use. | "What license `<PROJECT_NAME>` uses goes here: i.e. https://opensource.org/licenses/MIT" |
| **origin** | Optional | A URL for the project, such as the repository URL or project website. This field is intended for Project Manager to use. | "The primary repo for `<PROJECT_NAME>` goes here: i.e. http://www.mydomain.com" |
| **project_id** | Optional | A UUID that is generated when the project is created. | "< UUID >" |
| **restricted_name** | Optional | The name of a restricted folder to associate with the project. | "`<PROJECT_NAME>`" |
| **summary** | Optional | A short description of the project. This field is intended for Project Manager to use. | "A short description of `<PROJECT_NAME>`." |
| **user_tags** | Optional | Any keyword tags that you want to associate with the project. Examples: "Physics", "Assets", "AWS". For examples of the standard set of tags that Gems use, refer to the Project Manager **Gem Catalog**. Project Manager uses these tags for documentation, search, and filtering. | [ "`<PROJECT_NAME>`" ] |
| **version** | Optional | The `MAJOR.MINOR.PATCH` [semantic version](https://semver.org/) that is updated as changes are made to the project. | "1.0.0" |

## Local `project.json` Overrides {#user-project-json}

When you have multiple engines installed locally it can be useful to make your project use an engine with a specific name or path without changing the `project.json` file shared with your team.  O3DE will use settings in the `user/project.json` overrides file in your project folder to override `project.json` file settings in the project root.

To change any of the properties in the `user/project.json` overrides file, you can either edit the file manually using a text editor, or edit individual properties using the `edit-project-properties` [O3DE CLI](./cli-reference) command with the `--user` option.  The Project Manager will set the `engine_path` in this file when you add a project. 

| Field | Description | Example |
| --- | ---| --- |
| **engine** | Engine name override with optional specifier |  "o3de==1.2.3" |
| **engine_path** | The absolute local path to the engine to use | "C:/o3de-custom" |


Example:

A developer is using [git worktrees](https://git-scm.com/docs/git-worktree) to work on multiple branches of the o3de GitHub repository at the same time.  The `engine_name` is the same for every engine instance, so the developer uses the `user/project.json` file to set the `engine_path` to the specific engine they want to use.

Example:

An engine developer works on a team that stores the engine SDK and project in source control but keeps the engine source code in a separate repository.  The developer has both repositories on their machine locally:
```
/home/user/repo1 
            /o3de-sdk <-- engine SDK
            /project  <-- project
/home/user/repo2      
            /o3de     <-- engine source code
```
Because the developer is building the engine from source and doesn't want to use the SDK, they set the `engine_path` setting to `/home/user/repo2/o3de` in the project's `/home/user/repo1/project/user/project.json` overrides file.