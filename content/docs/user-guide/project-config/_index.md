---
linktitle: Project Configuration
title: Project Configuration
description: Learn the basics of project configuration in Open 3D Engine, and get the details on the Project Manager and O3DE CLI tools.
weight: 100
---

Open 3D Engine (O3DE) projects define and configure the set of code and assets that make up your game or other application. Some code and assets are provided by [Gems](/docs/user-guide/gems) that you enable for your project. Projects are contained within a project directory, sometimes referred to as the "project root".

To create and manage projects, you can use either the GUI-based **Project Manager** tool or the O3DE command line interface (CLI). The topics in this section provide details on creating O3DE projects using either of these options.

| Topic | Description |
| - | - |
| [Understanding project.json](#understanding-project-json) | A detailed look at the fields in the project manifest, an important project configuration file. |
| [Adding and Removing Gems](add-remove-gems/) | Learn how to add and remove Gems in your project. | 
| [Registering Gems](register-gems/) | Learn how to register external Gems from sources outside of O3DE. |
| [O3DE CLI Reference](cli-reference/) | A command line interface (CLI) reference for the `o3de` Python script.
| [Troubleshooting](troubleshooting/) | Troubleshoot common issues that you might encounter during project configuration. |

To build projects, you can use either Project Manager or **CMake**. You can find information on building projects in the [introductory tutorials](/docs/welcome-guide/create/) in the Getting Started Guide, and in the [Configure and Build](/docs/user-guide/build/configure-and-build) topic in the Build section of this User Guide.

## Understanding `project.json` {#understanding-project-json}

Each project contains a project manifest file named `project.json`. You can find this file in the project root directory. It stores important configuration properties for each project. It is created for you at the time of project creation.

To make changes to any of the properties in this file, you can either edit it manually using a text editor, or specify individual properties to edit using the [O3DE CLI](./cli-reference) `edit-project-properties` command. Additionally, you can edit the `display_name` property in Project Manager.

The following table describes each of the properties in `project.json`. The default value for many of the properties contains the name of the project given when the project was created. In the values below this is indicated by "<PROJECT_NAME>".

| Property | Description | Default |
| --- | --- | --- |
| **project_name** | The name of the project. Used by the O3DE CLI `--project-name` parameter to identify the project. | "<PROJECT_NAME>" |
| **origin** | A URL for the project, such as the repository URL or project website. This field is intended to be available for display and use by tools. | "The primary repo for <PROJECT_NAME> goes here: i.e. http://www.mydomain.com" |
| **license** | The license your project uses, and any copyright information you want to include. Consider providing the URL for the license. This field is intended to be available for display and use by tools. | "What license <PROJECT_NAME> uses goes here: i.e. https://opensource.org/licenses/MIT" |
| **display_name** | The display name of the project in **Project Manager**. | "<PROJECT_NAME>" |
| **summary** | A short description of your project. This field is intended to be available for display and use by tools. | "A short description of <PROJECT_NAME>." |
| **canonical_tags** | A standard field used in O3DE manifests to describe what type of O3DE object this is. Examples: "Gem", "Project". | [ "Project" ] |
| **user_tags** | These tags are intended to be used by tools for documentation, search, and filtering. | [ "<PROJECT_NAME>" ] |
| **icon_path** | The path and filename of the project icon. This icon is used in **Project Manager**. It must be named `preview.png` and located in the project root directory. | "preview.png" <br> DO NOT CHANGE! |
| **engine** | The name of the engine registered to the project. Engines get registered in your O3DE manifest: `<USER>/.o3de/o3de_manifest.json`. | "o3de" |
| **external_subdirectories** | (Optional) The path to one or more directories to include in the project build. Any directory with a `CMakeLists.txt` file can be used here. The paths to Gems that are registered to the project using the O3DE CLI `register --external-subdirectory-project-path` command are added here. | |
