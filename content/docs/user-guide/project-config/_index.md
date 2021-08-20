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
| [Adding and Removing Gems](add-remove-gems/) | Learn how to add and remove Gems in your project. |
| [Registering Gems](register-gems/) | Learn how to register external Gems from sources outside of O3DE. |
| [O3DE CLI Reference](cli-reference/) | Learn how to create and configure your O3DE environment and its objects, including engines, projects, and Gems, using the `o3de` Python script. |
| [Troubleshooting](troubleshooting/) | Troubleshoot common issues that you might encounter during project configuration. |

To build projects, you can use either Project Manager or **CMake**. For more information, refer to the [introductory tutorials](/docs/welcome-guide/create/) in the Get Started Guide, and the [Configure and Build](/docs/user-guide/build/configure-and-build) topic in the Build section of this User Guide.

## Understanding `project.json` {#understanding-project-json}

Each project's root directory contains a project manifest file named `project.json`. This file stores important project configuration properties. O3DE creates this file for you during project creation.

To change any of the properties in this file, you can either edit the file manually using a text editor, or edit individual properties using the `edit-project-properties` [O3DE CLI](./cli-reference) command. Additionally, you can edit the `display_name` property in Project Manager.

The following table describes each of the properties in `project.json`. The default value for many of the properties contains the project name given when you created the project. We indicate this project name as "<PROJECT_NAME>".

| Property | Description | Default |
| --- | --- | --- |
| **project_name** | The name of the project. The `--project-name` O3DE CLI parameter uses this name to identify the project. | "<PROJECT_NAME>" |
| **origin** | A URL for the project, such as the repository URL or project website. This field is intended for Project Manager to use. | "The primary repo for <PROJECT_NAME> goes here: i.e. http://www.mydomain.com" |
| **license** | The license that the project uses, and any copyright information that you want to include. Consider providing the URL for the license. This field is intended for Project Manager to use. | "What license <PROJECT_NAME> uses goes here: i.e. https://opensource.org/licenses/MIT" |
| **display_name** | The display name of the project in Project Manager. | "<PROJECT_NAME>" |
| **summary** | A short description of the project. This field is intended for Project Manager to use. | "A short description of <PROJECT_NAME>." |
| **canonical_tags** | A standard field in O3DE manifests used to identify an O3DE object's type. Examples: "Gem", "Project". Projects should use the "Project" tag. | [ "Project" ] |
| **user_tags** | Any keyword tags that you want to associate with the project. Examples: "Physics", "Assets", "AWS". For examples of the standard set of tags that Gems use, refer to the Project Manager **Gem Catalog**. Project Manager uses these tags for documentation, search, and filtering. | [ "<PROJECT_NAME>" ] |
| **icon_path** | The path and filename of the project icon. Project Manager uses this icon. The file must be located in the project root directory, and the filename must be `preview.png`. <br><br> WARNING: Do not change the path or filename. | "preview.png" |
| **engine** | The name of the engine registered to the project. Register engines in your O3DE manifest, located at `<USER>/.o3de/o3de_manifest.json`. | "o3de" |
| **restricted_name** | (Optional) The name of a restricted folder to associate with the project. | "projects" |
| **external_subdirectories** | (Optional) The path to one or more directories to include in the project build. You can use any directory with a `CMakeLists.txt` file. When you register Gems to the project using the `register --external-subdirectory-project-path` O3DE CLI command, O3DE adds their paths here. | |
