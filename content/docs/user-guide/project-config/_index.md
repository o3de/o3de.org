---
linktitle: Project Configuration
title: Project Configuration
description: Learn the basics of project configuration in Open 3D Engine, and get the details on the Project Manager and O3DE CLI tools.
weight: 100
---

Open 3D Engine (O3DE) projects define and configure the set of code and assets that make up your game or other application. Some code and assets are provided by [Gems](/docs/user-guide/gems) that you enable for your project. Projects are contained within a project directory, referred to in this documentation as the "project root". An important configuration file in the project root is the project manifest: `project.json`.

To create and manage projects, you can use either the GUI-based **Project Manager** tool or the O3DE command line interface (CLI). The topics in this section provide details on creating O3DE projects using either of these options.

| Topic | Description |
| - | - |
| [Understanding project.json](#understanding-project-json) | A detailed look at the fields in the project manifest file, `project.json`. |
| [Adding and Removing Gems](add-remove-gems/) | Learn how to add and remove Gems in your project. | 
| [Registering Gems](register-gems/) | Learn how to register external Gems from sources outside of O3DE. |
| [O3DE CLI Reference](cli-reference/) | A command line interface (CLI) reference for the `o3de` Python script.
| [Troubleshooting](troubleshooting/) | Troubleshoot common issues that you might encounter during project configuration. |

## Understanding `project.json` {#understanding-project-json}

Each project contains a project manifest file named `project.json`. This file is located in the project root directory, and stores important configuration properties for each project. It is created for you at the time of project creation.

To make changes to any of the properties in this file, you can either edit it manually using a text editor, or specify individual properties to edit using the [O3DE CLI](./cli-reference) `edit-project-properties` command.

The following table describes each of the properties in `project.json`. The name given to the project when the project was created is used as part of the default value for many of the properties, and is indicated by "<PROJECT_NAME>".

| Property | Description | Default |
| --- | --- | --- |
| **project_name** | The name of the project. Used by the O3DE CLI `--project-name` parameter to identify the project. | "<PROJECT_NAME>" |
| **origin** | A URL for the project, such as the repository URL or project website. TBD: displayed where? | "The primary repo for <PROJECT_NAME> goes here: i.e. http://www.mydomain.com"
| **license** | The license your project uses, and any copyright information you want to include. Consider providing the URL for the license. | "What license <PROJECT_NAME> uses goes here: i.e. https://opensource.org/licenses/MIT" |
| **display_name** | The display name of the project in **Project Manager**. The name that's displayed for the executable runtime. | "<PROJECT_NAME>" |
| **summary** | A short description of your project. The summary appears TBD: where? | "A short description of <PROJECT_NAME>." |
| **canonical_tags** | | [ "Project" ] |
| **user_tags** | These tags are intended for documentation and filtering. | [ "<PROJECT_NAME>" ] |
| **icon_path** | The path and filename of the project icon. This icon is used in **Project Manager**. It must be named `preview.png` and located in the project root directory. | "preview.png" <br> DO NOT CHANGE! |
| **engine** | The name of the engine registered to the project. Engine names are registered in your O3DE manifest: `<USER>/.o3de/o3de_manifest.json`. | "o3de" |
| **restricted_name** | | "projects" |
| **external_subdirectories** | (Optional) The path to one or more Gems registered to the project. | |
