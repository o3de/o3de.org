---
linktitle: O3DE CLI Reference
title: O3DE Project Configuration CLI Reference
description: The command line interface (CLI) reference for the Open 3D Engine (O3DE) Python script.
weight: 200
toc: true
---

Use the `o3de` Python script to configure your O3DE environment and its objects, including engines, projects, and Gems, from a command line interface (CLI). The script aggregates all of the functions from lower-level scripts in **Open 3D Engine (O3DE)**, so you can access them from a single point. Find the script in your engine directory at `/scripts/o3de.py`.

You can use the `o3de` Python script for the following tasks:

- [Creating projects](/docs/welcome-guide/create/creating-projects-using-cli/)
- Creating Gems
- Creating templates
- [Enabling and disabling Gems for your project](add-remove-gems/#using-the-command-line-interface-cli)
- Registering the engine
- Registering projects and Gems
  

<!-------------------------------------------------------------->

## Prerequisites

To use the `o3de` Python script, you must set up the Python runtime, which you download when you set up the engine. For instructions on downloading the runtime, refer to the **Register the engine** section of the Setting up O3DE from GitHub topic for [Windows](/docs/welcome-guide/setup/setup-from-github/building-windows/#register-the-engine) or [Linux](/docs/welcome-guide/setup/setup-from-github/building-linux/#register-the-engine).

<!-------------------------------------------------------------->

## Quick start

{{< tabs name="Python runtime setup" >}}
{{% tab name="Windows" %}}

To run the O3DE Python runtime and a command, at a command prompt, do either of the following:

- Run the `o3de.bat` batch file directly.
    ```cmd
    <engine>\scripts\o3de.bat <command>
    ```

- Launch Python and run the `o3de.py` script.
    ```cmd
    <engine>\python\python.cmd <engine>\scripts\o3de.py <command>
    ```

{{< note >}}
Replace `<engine>` with the path to your engine.
{{< /note >}}

For example, to register the engine, enter the following command:

```cmd
<engine>\scripts\o3de.bat register --this-engine
```

{{% /tab %}}
{{% tab name="Linux" %}}

To run the O3DE Python runtime and a command, in a terminal window, do either of the following:

- Run the `o3de.sh` shell script file directly.
    ```bash
    <engine>/scripts/o3de.sh <command>
    ```

- Launch Python and run the `o3de.py` script.
    ```bash
    <engine>/python/python.sh <engine>/scripts/o3de.py <command>
    ```

{{< note >}}
Replace `<engine>` with the path to your engine.
{{< /note >}}

For example, to register the engine, enter the following command:

```bash
<engine>/scripts/o3de.sh register --this-engine
```

{{% /tab %}}
{{< /tabs >}}


<!-------------------------------------------------------------->

## Commands

The `o3de` Python script contains the following commands, with further details in the following sections. 

| Command | Description | 
| - | - |
| [`get-global-project`](#get-global-project) | Gets the global project that is registered to the engine. |
| [`set-global-project`](#set-global-project) | Sets the specified project as the engine's global project. |
| [`create-template`](#create-template) | Creates a template out of the specified source path. |
| [`create-from-template`](#create-from-template) | Creates an instance from a generic template.  |
| [`create-project`](#create-project) | Creates a new project. |
| [`create-gem`](#create-gem) | Creates a new Gem. |
| [`register`](#register) | Registers an O3DE object. |
| [`register-show`](#register-show) | Shows the registered O3DE objects. |
| [`get-registered`](#get-registered) | Shows the path to the registered O3DE object with the specified name. |
| [`enable-gem`](#enable-gem) | Enables the Gem in your project. |
| [`disable-gem`](#disable-gem) | Disables the Gem in your project. |
| [`edit-engine-properties`](#edit-engine-properties) | Edits the engine's properties. |
| [`edit-project-properties`](#edit-project-properties) | Edits the project's properties. |
| [`edit-gem-properties`](#edit-gem-properties) | Edits the Gem's properties. |
| [`sha256`](#sha256) | Creates a hash value for an O3DE object using SHA-256 (Secure Hash Algorithm 256). |


<!-------------------------------------------------------------->

## `get-global-project`

Gets the global project that is registered to the engine. By default, reads the global project from `<USER_DIRECTORY>/.o3de/Registry/bootstrap.setreg`. You can also specify a file path using `-i`.

### Format

```cmd
get-global-project [-h] [-i INPUT_PATH]
```

### Usage

Reads the global project from `<USER_DIRECTORY>/.o3de/Registry/bootstrap.setreg`.

```cmd
o3de.bat get-global-project
```

Reads the global project from a specified file.

```cmd
o3de.bat get-global-project -i <USER_DIRECTORY>\.o3de\Registry\my-custom.setreg
```

### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`-i INPUT_PATH, --input-path INPUT_PATH`**

  A path to the input file that you want to read the  `/Amazon/AzCore/Bootstrap/project_path` key from. If not supplied, then this command uses the input file `<USER_DIRECTORY>/.o3de/Registry/bootstrap.setreg` instead.


<!-------------------------------------------------------------->

## `set-global-project`

Sets the specified project as the engine's global project. By default, sets this in `<USER_DIRECTORY>\.o3de\Registry\bootstrap.setreg`. You can also specify a file path using `-o`.

If you set a global project, then O3DE tools (such as **Asset Processor** and **O3DE Editor**) use the global project when you launch them from an installed engine. To override the global project, specify a project with the `project-path` parameter when you launch the O3DE tools from the command line.

### Format 

```cmd
set-global-project [-h] (-pp PROJECT_PATH | -pn PROJECT_NAME)
                                  [-o OUTPUT_PATH] [-f]
```

### Usage

Sets the specified project as the global project in `<USER_DIRECTORY>/.o3de/Registry/bootstrap.setreg`.

```cmd
o3de.bat set-global-project -pp PROJECT_PATH
```

Sets the specified project as the global project in the specified path.

```cmd
o3de.bat set-global-project -pp PROJECT_PATH -o <USER_DIRECTORY>\.o3de\Registry\my-custom.setreg
```

### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`-pp PROJECT_PATH, --project-path PROJECT_PATH`**

  The path to the project. The path must contain the project manifest file (`project.json`) unless you also use the `--force` parameter.

- **`-pn PROJECT_NAME, --project-name PROJECT_NAME`**

  The name of the project. You can find the name in the project's `project.json` file.

- **`-o OUTPUT_PATH, --output-path OUTPUT_PATH`**

  The path and filename where the `project_path` key is written. The file should be located in `<USER_DIRECTORY>/.o3de/Registry/` and have the file extension `.setreg`. If you don't use this parameter, `o3de` writes the key to `<USER_DIRECTORY>/.o3de/Registry/bootstrap.setreg`.

- **`-f, --force`**

  Forcibly sets the project path in the supplied `.setreg` file.


<!-------------------------------------------------------------->

## `create-template`

Creates a template out of the specified source path and registers the template in the O3DE manifest. Users can then create custom source content from this template using the `create-from-template` command.

### Format

``` cmd
create-template [-h] [-v] -sp SOURCE_PATH [-tp TEMPLATE_PATH]
                [-srp SOURCE_RESTRICTED_PATH | -srn SOURCE_RESTRICTED_NAME]
                [-trp TEMPLATE_RESTRICTED_PATH | -trn TEMPLATE_RESTRICTED_NAME]
                [-sn SOURCE_NAME]
                [-srprp SOURCE_RESTRICTED_PLATFORM_RELATIVE_PATH]
                [-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH]
                [-kr] [-kl] [-r [REPLACE [REPLACE ...]]]
                [-f] [--no-register]
```

### Usage

Creates a template named `StandardGem` from the source folder and saves it in the `default_templates_folder` specified in the O3DE manifest. Also registers the template in the O3DE manifest.

```cmd
o3de.bat create-template -sp C:\MyGems\StandardGem
```

Creates a template named `StandardGem` from the source folder and saves it in `C:\MyTemplates`, without registering the template.

```cmd
o3de.bat create-template -sp C:\MyGems\StandardGem -tp C:\MyTemplates\StandardGem --no-register
```

Creates a template named `StandardGem` from the source folder and saves it in the default templates folder. Additionally, it replaces any part of a file or path in the source folder containing the word `Standard` with the placeholder name `${Name}`, and any appearance of the word `Standard` in the source file content with `${SanitizedCppName}`.

```cmd
o3de.bat create-template -sp C:\MyGems\TestGem -tp StandardGem -sn Standard
```

Creates a template named `StandardComponent` from the source folder and saves it in the default templates folder. Additionally, it does the following:

* Replaces any part of a file or path in the source folder containing the word `Standard` with the placeholder name `${Name}`.
* Replaces any appearance of the word `Standard` in the source file content with `${SanitizedCppName}`.
* Replaces any appearance of the word `MyGem` with `${GemName}`. This particular example is useful when creating a template where the Gem name serves as a C++ namespace.
* Replaces the UUID `cd2c4950-7ee3-49b9-b356-51a3b6bb2373` with `${Random_Uuid}`. When the `create-from-template` command encounters `${Random_Uuid}` in a template, it replaces this placeholder with a randomly-generated UUID.
* Keeps all licensing text in the source files that begins with `{BEGIN_LICENSE}` and ends with `{END_LICENSE}`.

```cmd
o3de.bat create-template -sp C:\MyComponent -tp StandardComponent -sn Standard -kl -r MyGem ${GemName} cd2c4950-7ee3-49b9-b356-51a3b6bb2373 ${Random_Uuid}
```

{{< note >}}
When using the replace parameter in Windows PowerShell, you must use a single quote around any `$` replacement variables. For example: `-r MyGem '${GemName}'`.
{{< /note >}}

### Optional parameters
  
- **`-h, --help`**

  Shows the help message.

- **`-v`**

  If specified, provides additional logging verbosity.

- **`-sp SOURCE_PATH, --source-path SOURCE_PATH`**

  The path to the source folder that you want to use as a template.

- **`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`**

  The path where you want to create the template. The path can be absolute or relative to the `default_templates_folder` specified in the O3DE manifest. If not supplied, the template path is set to the default template path concatenated with `SOURCE_NAME`. If `SOURCE_NAME` is not specified, the last component of `SOURCE_PATH` is used in its place.

- **`-srp SOURCE_RESTRICTED_PATH, --source-restricted-path SOURCE_RESTRICTED_PATH`**

  The path to the source's restricted folder.

- **`-srn SOURCE_RESTRICTED_NAME, --source-restricted-name SOURCE_RESTRICTED_NAME`**

  The name of the source's restricted folder. If supplied, you don't need to use the `--source-restricted-path` parameter.

- **`-trp TEMPLATE_RESTRICTED_PATH, --template-restricted-path TEMPLATE_RESTRICTED_PATH`**

  The path to the template's restricted folder.

- **`-trn TEMPLATE_RESTRICTED_NAME, --template-restricted-name TEMPLATE_RESTRICTED_NAME`**

  The name of the template's restricted folder. If supplied, you don't need to use the `--template-restricted-path` parameter.

- **`-sn SOURCE_NAME, --source-name SOURCE_NAME`**

  Substitutes any file and path entries that match `SOURCE_NAME` with `${Name}`, and any file content that matches `SOURCE_NAME` with `${SanitizedCppName}`.
  
  An example of substitution: `--source-name Foo` replaces the source file `FooBus.h` -> `${Name}Bus.h`, and the source content `class FooRequests` -> `class ${SanitizedCppName}Requests`.

- **`-srprp SOURCE_RESTRICTED_PLATFORM_RELATIVE_PATH, --source-restricted-platform-relative-path SOURCE_RESTRICTED_PLATFORM_RELATIVE_PATH`**

  A path to append to `SOURCE_RESTRICTED_PATH/<platform>/`, which contains the restricted source. For example: `--source-restricted-path C:/restricted --source-restricted-platform-relative-path some/folder` => `C:/restricted/<platform>/some/folder/<source_name>`.

- **`-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH, --template-restricted-platform-relative-path TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH`**

  A path to append to `TEMPLATE_RESTRICTED_PATH/<platform>`, which contains the restricted template source. For example: `--template-restricted-path C:/restricted --template-restricted-platform-relative-path some/folder` => `C:/restricted/<platform>/some/folder/<template_name>`.

- **`-kr, --keep-restricted-in-template`**

  If included, creates the restricted platforms in the template folder. By default, creates the restricted files in the restricted folder located at TEMPLATE_RESTRICTED_PATH.

- **`-kl, --keep-license-text`**

  If included, keeps all of the lines of license text, starting at {BEGIN_LICENSE} and ending at {END_LICENSE}. By default, the license text isn't included.

- **`-r [REPLACE [REPLACE ...]], --replace [REPLACE [REPLACE ...]]`**

  Add A to B replacement pairs. For example: `-r MyUsername ${User} 1723905 ${id}`. This replaces `MyUsername` with `${User}`, and `1723905` with `${id}`.

  {{< note >}}
When using the replace parameter in Windows PowerShell, you must use a single quote around any `$` replacement variables. For example: `-r MyUsername '${User}'`.
  {{< /note >}}

- **`-f, --force`**

  Forces the new template directory to override the existing one, if one exists.

- **`--no-register`**

  Prevents registration of the template path in the O3DE manifest.


<!-------------------------------------------------------------->

## `create-from-template`

Creates an instance of a generic template based on the specified template.

### Format

```cmd
create-from-template [-h] [-v] -dp DESTINATION_PATH
                                    (-tp TEMPLATE_PATH | -tn TEMPLATE_NAME)
                                    [-dn DESTINATION_NAME]
                                    [-drp DESTINATION_RESTRICTED_PATH | -drn DESTINATION_RESTRICTED_NAME]
                                    [-trp TEMPLATE_RESTRICTED_PATH | -trn TEMPLATE_RESTRICTED_NAME]
                                    [-drprp DESTINATION_RESTRICTED_PLATFORM_RELATIVE_PATH]
                                    [-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH]
                                    [-kr] [-kl] [-r [REPLACE [REPLACE ...]]]
                                    [-f] [--no-register]
```

### Usage

Instantiates an object based on the template that is located in the specified template path and saves it in the specified destination path.

```cmd
o3de.bat create-from-template -dp DESTINATION_PATH -tp TEMPLATE_PATH
```

Instantiates an object based on the template named `DefaultComponent` and saves it in the directory `NewComponent` in the current path. Additionally, it replaces all occurrences of `${GemName}` in the template with `MyGem`.

```cmd
o3de.bat create-from-template -dp NewComponent -dn MyTest -tn DefaultComponent -kr -r ${GemName} MyGem
```

{{< note >}}
When using the replace parameter in Windows PowerShell, you must use a single quote around any `$` replacement variables. Example: `-r '${GemName}' MyGem`.
{{< /note >}}

To create the component in an existing directory, such as the `Code` directory of a Gem that's in progress, add the `-f` option to the `create-from-template` command to force the creation of the component files there.

For example, to create a component called `MyTestComponent` in the `MyGem` namespace in the Gem's `Code` directory, do the following:

```cmd
scripts\o3de.bat create-from-template -dp C:\Gems\MyGem\Code -dn MyTest -tn DefaultComponent -kr -r ${GemName} MyGem -f
```

### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`-v`**

  If specified, provides additional logging verbosity.

- **`-dp DESTINATION_PATH, --destination-path DESTINATION_PATH`**

  The path to instantiate the new template in. The path can be absolute or relative to the O3DE development source folder. For example: DESTINATION_PATH = `C:/o3de/NewTemplate`.

- **`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`**

  The path to the template that you want to instantiate. The path can be absolute or relative to the O3DE development source folder. For example: TEMPLATE_PATH = `C:/o3de/Template/SomeTemplate`.

- **`-tn TEMPLATE_NAME, --template-name TEMPLATE_NAME`**

  The name of the registered template to instantiate. If supplied, you don't need to use the `--template-path` parameter.

- **`-dn DESTINATION_NAME, --destination-name DESTINATION_NAME`**

  The name to replace `${Name}` with in the instantiated template. The name must be alphanumeric, though it can contain underscores (_) and hyphens (-). If you don't provide the destination name, this command uses the last component of the destination path.

- **`-drp DESTINATION_RESTRICTED_PATH, --destination-restricted-path DESTINATION_RESTRICTED_PATH`**

  The path where `o3de` writes the restricted files.

- **`-drn DESTINATION_RESTRICTED_NAME, --destination-restricted-name DESTINATION_RESTRICTED_NAME`**

  The name of the registered restricted path where `o3de` writes the restricted files. If supplied, you don't need to use the `--destination-restricted-path` parameter.

- **`-trp TEMPLATE_RESTRICTED_PATH, --template-restricted-path TEMPLATE_RESTRICTED_PATH`**

  The path to the restricted directory that `o3de` adds restricted platform sources to, if any.

- **`-trn TEMPLATE_RESTRICTED_NAME, --template-restricted-name TEMPLATE_RESTRICTED_NAME`**
  
  The name of the restricted directory that `o3de` adds restricted platform sources to, if any. If supplied, you don't need to use the `--template-restricted-path` parameter.

- **`-drprp DESTINATION_RESTRICTED_PLATFORM_RELATIVE_PATH, --destination-restricted-platform-relative-path DESTINATION_RESTRICTED_PLATFORM_RELATIVE_PATH`**

  A path to append to `DESTINATION_RESTRICTED_PATH/<platform>`, which contains the restricted destination. For example: `--destination-restricted-path C:/instance --destination-restricted-platform-relative-path some/folder` => `C:/instance/<platform>/some/folder/<destination_name>`.

- **`-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH, --template-restricted-platform-relative-path TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH`**

  A path to append to `TEMPLATE_RESTRICTED_PATH/<platform>`, which contains the restricted template. For example: `--template-restricted-path C:/restricted --template-restricted-platform-relaive-path some/folder` => `C:/restricted/<platform>/some/folder/<template_name>`.

- **`-kr, --keep-restricted-in-instance`**

  If specified, creates the restricted platforms in the new template folder. If not specified, creates the restricted files in the restricted folder located at TEMPLATE_RESTRICTED_PATH.

- **`-kl, --keep-license-text`**

  If specified, keeps all license text found in the template files. If not specified, the license text isn't included. License text includes all of the lines of text starting on a line containing {BEGIN_LICENSE} and ending on the line containing {END_LICENSE}.

- **`-r [REPLACE [REPLACE ...]], --replace [REPLACE [REPLACE ...]]`**

  Add A to B replacement pairs. For example: `-r ${User} MyUsername ${id} 1723905`. This replaces `${User}` with `MyUsername`, and `${id}` with `1723905`. Note: \<DestinationName\> is the last component of the DESTINATION_PATH. The following replacement pairs already exist: `${Name}` to \<DestinationName\>, `${NameLower}` to \<destinationname\>, `${NameUpper}` to \<DESTINATIONNAME\>.

  {{< note >}}
When using the replace parameter in Windows PowerShell, you must use a single quote around any `$` replacement variables. For example: `-r '${User}' MyUsername`.
  {{< /note >}}

- **`-f, --force`**

  Overwrites files in the destination directory if they already exist.

- **`--no-register`**

  Prevents registration of the project in the O3DE manifest.


<!-------------------------------------------------------------->

## `create-project`

Creates a new project at the specified path and registers it to the `o3de_manifest.json` file. However, if you create the project in the engine directory, this command registers the project to the engine's `engine.json` file instead.

### Format

``` cmd
create-project [-h] -pp PROJECT_PATH [-pn PROJECT_NAME]
                    [-tp TEMPLATE_PATH | -tn TEMPLATE_NAME]
                    [-prp PROJECT_RESTRICTED_PATH | -prn PROJECT_RESTRICTED_NAME]
                    [-trp TEMPLATE_RESTRICTED_PATH | -trn TEMPLATE_RESTRICTED_NAME]
                    [-prprp PROJECT_RESTRICTED_PLATFORM_RELATIVE_PATH]
                    [-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH]
                    [-kr] [-kl] [-r [REPLACE [REPLACE ...]]]
                    [--system-component-class-id SYSTEM_COMPONENT_CLASS_ID]
                    [--editor-system-component-class-id EDITOR_SYSTEM_COMPONENT_CLASS_ID]
                    [--module-id MODULE_ID] [-f]
```

### Usage

Creates a new project at the specified path using the "DefaultProject" template. 

```cmd
o3de.bat create-project -pp PROJECT_PATH
```

Creates a new project at the specified path using the specified project template. The template must have a valid `project.json` file.

```cmd
o3de.bat create-project --project-path PROJECT_PATH --template-path TEMPLATE_PATH
```

### Optional parameters

  
- **`-h, --help`**

  Shows the help message.

- **`-pp PROJECT_PATH, --project-path PROJECT_PATH`**

  The path to your newly created project. The project's path can be absolute or relative to the O3DE development source folder. For example: PROJECT_PATH = `C:/o3de/TestProject`.

- **`-pn PROJECT_NAME, --project-name PROJECT_NAME`**

  The name of your new project. The name must be alphanumeric, though it can contain underscores (_) and hyphens (-). If you don't provide the project name, this command uses the last component of the project path. For example: New_Project-123.

- **`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`**

  The path to the template that you want to create a new project from. The path can be absolute or relative to the default template's path.

- **`-tn TEMPLATE_NAME, --template-name TEMPLATE_NAME`**

  The name of the template that you want to create a new project from. If supplied, you don't need to use the `--template-path` parameter.

- **`-prp PROJECT_RESTRICTED_PATH, --project-restricted-path PROJECT_RESTRICTED_PATH`**

  The path to the project's restricted folder. The path can be absolute or relative to `restricted="projects"`. 

- **`-prn PROJECT_RESTRICTED_NAME, --project-restricted-name PROJECT_RESTRICTED_NAME`**

  The name of the project's restricted path. If supplied, you do not need to use the `--project-restricted-path` parameter.

- **`-trp TEMPLATE_RESTRICTED_PATH, --template-restricted-path TEMPLATE_RESTRICTED_PATH`**

  The path to the template's restricted folder. The path can be absolute or relative to `restricted="templates"`.

- **`-trn TEMPLATE_RESTRICTED_NAME, --template-restricted-name TEMPLATE_RESTRICTED_NAME`**

  The name of the template's restricted path. If supplied, you don't need to use the `--template-restricted-path` parameter.

- **`-prprp PROJECT_RESTRICTED_PLATFORM_RELATIVE_PATH, --project-restricted-platform-relative-path PROJECT_RESTRICTED_PLATFORM_RELATIVE_PATH`**

  A path to append to `PROJECT_RESTRICTED_PATH/<platform>`, and that contains the restricted project. For example: `--project-restricted-path C:/restricted --project- restricted-platform-relative-path some/folder` => `C:/restricted/<platform>/some/folder/<project_name>`.

- **`-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH, --template-restricted-platform-relative-path TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH`**

  A path to append to `TEMPLATE_RESTRICTED_PATH/<platform>`, and that contains the restricted template source. For example: `--template-restricted-path C:/restricted --template-restricted-platform-relative-path some/folder` => `C:/restricted/<platform>/some/folder/<template_name>`.

- **`-kr, --keep-restricted-in-project`**

  If true, creates the restricted platforms in the project folder. If false, creates the restricted files in the restricted folder located at TEMPLATE_RESTRICTED_PATH. By default, this parameter is false.

- **`-kl, --keep-license-text`**

  If true, keeps the license text (located in the `template.json` file) in the new project's `project.json` file. If false, the license text isn't included. By default, this parameter is false. The license text is all of the lines of text, starting at {BEGIN_LICENSE} and ending at {END_LICENSE}.

- **`-r [REPLACE [REPLACE ...]], --replace [REPLACE [REPLACE ...]]`**

  Add A to B replacement pairs. `o3de` automatically infers `${Name}` and all of the other standard project replacements from the project name. These replacements supersede all inferred replacements. For example: `--replace MyUsername ${User} 1723905 ${id}`. This replaces `MyUsername` with `${User}`, and `1723905` with `${id}`. Note: \<ProjectName\> is the last component of the template_path. The following replacement pairs already exist: `${Name}` to \<ProjectName\>, `${NameLower}` to \<projectname\>, `${NameUpper}` to \<PROJECTNAME\>.

- **`--system-component-class-id SYSTEM_COMPONENT_CLASS_ID`**

  A UUID that you want to associate with the system class
component. The default is a random UUID. For example, 
{b60c92eb-3139-454b-a917-a9d3c5819594}.

- **`--editor-system-component-class-id EDITOR_SYSTEM_COMPONENT_CLASS_ID`**

  A UUID that you want to associate with the editor system
class component. The default is a random UUID. For example, {b60c92eb-3139-454b-a917-a9d3c5819594}.

- **`--module-id MODULE_ID`**

  A UUID that you want to associate with the module. The default is a random UUID. For example, {b60c92eb-3139-454b-a917-a9d3c5819594}. 

- **`-f, --force`**

  Forces the new project directory to override the existing one, if one exists. 


<!-------------------------------------------------------------->

## `create-gem`

Creates a new Gem at the specified path.

### Format

```cmd
create-gem [-h] -gp GEM_PATH [-gn GEM_NAME]
                    [-tp TEMPLATE_PATH | -tn TEMPLATE_NAME]
                    [-grp GEM_RESTRICTED_PATH | -grn GEM_RESTRICTED_NAME]
                    [-trp TEMPLATE_RESTRICTED_PATH | -trn TEMPLATE_RESTRICTED_NAME]
                    [-grprp GEM_RESTRICTED_PLATFORM_RELATIVE_PATH]
                    [-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH]
                    [-r [REPLACE [REPLACE ...]]] [-kr] [-kl]
                    [--system-component-class-id SYSTEM_COMPONENT_CLASS_ID]
                    [--editor-system-component-class-id EDITOR_SYSTEM_COMPONENT_CLASS_ID]
                    [--module-id MODULE_ID] [-f]
```

### Usage

Create a new Gem at the specified path using the "DefaultGem" template.

```cmd
o3de.bat create-gem -gp GEM_PATH
```

Create a new Gem at the specified path using the specified Gem template. The template must have a valid `gem.json` file.

```cmd
o3de.bat create-gem -gp GEM_PATH --template-path TEMPLATE_PATH
```

### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`-gp GEM_PATH, --gem-path GEM_PATH`**

  The path to create a new Gem at. The Gem's path can be absolute or relative to the default Gems path.  

- **`-gn GEM_NAME, --gem-name GEM_NAME`**

  The name of your new Gem. The name must be alphanumeric, though it can contain underscores (_) and hyphens (-). If you don't provide the Gem name, this command uses the last component of the Gem path. For example: New_Gem.

- **`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`**

  The path to the template that you want to create a new Gem from. The path can be absolute or relative to the default template's path.

- **`-tn TEMPLATE_NAME, --template-name TEMPLATE_NAME`**

  The name of the template that you want to create a new Gem from. If supplied, you don't need to use the `--template-path` parameter.

- **`-grp GEM_RESTRICTED_PATH, --gem-restricted-path GEM_RESTRICTED_PATH`**

  The path to the Gem's restricted folder, if any. The path can be absolute or relative to the O3DE development source folder. The default is `<o3de-development-source>/restricted`.

- **`-grn GEM_RESTRICTED_NAME, --gem-restricted-name GEM_RESTRICTED_NAME`**

  The name of the Gem's restricted path, if any. If supplied, you don't need to use the `--gem-restricted-path` parameter.

- **`-trp TEMPLATE_RESTRICTED_PATH, --template-restricted-path TEMPLATE_RESTRICTED_PATH`**

  The path to the template's restricted folder. The path can be absolute or relative to `restricted="templates"`.

- **`-trn TEMPLATE_RESTRICTED_NAME, --template-restricted-name TEMPLATE_RESTRICTED_NAME`**

  The name of the template's restricted path. If supplied, you don't need to use the `--template-restricted-path` parameter.

- **`-grprp GEM_RESTRICTED_PLATFORM_RELATIVE_PATH, --gem-restricted-platform-relative-path GEM_RESTRICTED_PLATFORM_RELATIVE_PATH`**

  A path to append to `GEM_RESTRICTED_PATH/<platform>`, which contains the restricted template. For example: `--gem-restricted-path C:/restricted --gem-restricted- platform-relative-path some/folder` => `C:/restricted/<platform>/some/folder/<gem_name>`.

- **`-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH, --template-restricted-platform-relative-path TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH`**

  A path to append to `TEMPLATE_RESTRICTED_PATH/<platform>`, which contains the restricted template. For example: `--template-restricted-path C:/restricted --template-restricted-platform-relaive-path some/folder` => `C:/restricted/<platform>/some/folder/<template_name>`.

- **`-r [REPLACE [REPLACE ...]], --replace [REPLACE [REPLACE ...]]`**

  Add A to B replacement pairs. `o3de` automatically infers `${Name}` and all of the other standard Gem replacements from the Gem name. These replacements supersede all inferred replacement pairs. For example: `--replace ${DATE} 1/1/2020 ${id} 1723905`. This replaces `${DATE}` with `1/1/2020`, and  `${id}` with `1723905`. Note:  \<GemName> is the last component of the GEM_PATH. The following replacement pairs already exist: `${Name}` to \<GemName\>, `${NameLower}` to \<gemname\>, `${NameUpper}` to \<GEMNAME\>.

- **`-kr, --keep-restricted-in-gem`**

  If true, creates the restricted platforms in the Gem folder. If false, creates the restricted files in the restricted folder located at TEMPLATE_RESTRICTED_PATH. By default, this parameter is false.

- **`-kl, --keep-license-text`**

  If true, keeps the license text (located in the `template.json` file) in the new Gem's `gem.json` file. If false, the license text isn't included. By default, this parameter is false. The license text is all of the lines of text, starting at {BEGIN_LICENSE} and ending at {END_LICENSE}.

- **`--system-component-class-id SYSTEM_COMPONENT_CLASS_ID`**

  A UUID that you want to associate the system class component with. The default is a random UUID. For example: {b60c92eb-3139-454b-a917-a9d3c5819594}.

- **`--editor-system-component-class-id EDITOR_SYSTEM_COMPONENT_CLASS_ID`**

  A UUID that you want to associate with the editor system class component. The default is a random UUID. For example: {b60c92eb-3139-454b-a917-a9d3c5819594}.

- **`--module-id MODULE_ID`**

  A UUID that you want to associate with the module. The default is a random UUID. For example: {b60c92eb-3139-454b-a917-a9d3c5819594}.

- **`-f, --force`**

  Forces the new Gem directory to override the existing one, if one exists.


<!-------------------------------------------------------------->

## `register`

Registers O3DE objects to the `o3de_manifest.json` file.

### Format

```cmd
register [-h]
                        (--this-engine | -ep ENGINE_PATH | -pp PROJECT_PATH | -gp GEM_PATH | -es EXTERNAL_SUBDIRECTORY | -tp TEMPLATE_PATH | -rp RESTRICTED_PATH | -ru REPO_URI | -aep ALL_ENGINES_PATH | -app ALL_PROJECTS_PATH | -agp ALL_GEMS_PATH | -atp ALL_TEMPLATES_PATH | -arp ALL_RESTRICTED_PATH | -aru ALL_REPO_URI | -def DEFAULT_ENGINES_FOLDER | -dpf DEFAULT_PROJECTS_FOLDER | -dgf DEFAULT_GEMS_FOLDER | -dtf DEFAULT_TEMPLATES_FOLDER | -drf DEFAULT_RESTRICTED_FOLDER | -dtpf DEFAULT_THIRD_PARTY_FOLDER | -u)
                        [-ohf OVERRIDE_HOME_FOLDER] [-r] [-f]
                        [-esep EXTERNAL_SUBDIRECTORY_ENGINE_PATH | -espp EXTERNAL_SUBDIRECTORY_PROJECT_PATH]
```


### Usage
<br>

**Registering engines**

Registers this engine to the `o3de_manifest.json` file.  This command maps the engine's name to its path in JSON. 

```cmd
o3de.bat register --this-engine
```

Registers the specified engine to the `o3de_manifest.json` file.  This command maps the engine's name to its path in JSON.  

```cmd
o3de.bat register --engine-path ENGINE_PATH
```

Registers all of the engines in the specified path to the `o3de_manifest.json` file. This command recursively scans the specified path and registers all of the paths that have a valid `engine.json` file. It maps each engine's name to its path in JSON.  

```cmd
o3de.bat register --all-engines-path ALL_ENGINES_PATH
```

<br>

**Registering projects**

Registers the specified project to the engine. This command does two things: it adds the project's path to the `o3de_manifest.json` file, and it sets `engine` to the engine's name in each project's `project.json` file.

```cmd
o3de.bat register -pp PROJECT_PATH
```

Registers the specified project to the specified engine. This command does two things: it adds the project's path to the `o3de_manifest.json` file, and it sets `engine` to the engine's name in each project's `project.json` file.

```cmd
o3de.bat register -pp PROJECT_PATH --engine-path ENGINE_PATH
```

Registers all of the projects in the specified path. This command recursively scans the specified path and registers all of the paths that have a valid `project.json` file. This command does two things: it adds each project's path to the `o3de_manifest.json` file, and it sets `engine` to the engine's name in each project's `project.json` file.

```cmd
o3de.bat register --all-projects-path ALL_PROJECTS_PATH
```

<br>

**Registering Gems**

Registers the Gem to the `o3de_manifest.json` file. Before registering the Gem, this command verifies that the Gem has a valid `gem.json` file. Then, it adds the Gem's path to the `external_subdirectories` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --gem-path GEM_PATH
```

Registers the Gem to the project's `project.json` file. Before registering the Gem, this command verifies that the Gem has a valid `gem.json` file. Then, it adds the Gem's path to the `external_subdirectories` list in the `project.json` file. This adds the Gem to the project's build solution, so the project can recognize the Gem.

```cmd
o3de.bat register -gp GEM_PATH -espp PROJECT_PATH
```

Registers the Gem to the engine's `engine.json` file. Before registering the Gem, this command verifies that the Gem has a valid `gem.json` file. Then, it adds the Gem's path to the `external_subdirectories` list in the `engine.json` file. This adds the Gem to the engine's build solution, so the engine can recognize the Gem.

```cmd
o3de.bat register -gp GEM_PATH -espp ENGINE_PATH
```

Registers all of the Gems in the specified path. This command recursively scans the specified path and registers all of the paths that have a valid `gem.json` file. This command adds each Gem to the `o3de_manifest.json` file.

```cmd
o3de.bat register --all-gems-path ALL_GEMS_PATH
```

<br>

**Registering external subdirectories**

Registers the specified subdirectory path to the `external_subdirectories` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --external-subdirectory EXTERNAL_SUBDIRECTORY
```

Registers the specified subdirectory path into `external_subdirectories` in the specified engine's `engine.json` file.

```cmd
o3de.bat register --external-subdirectory EXTERNAL_SUBDIRECTORY --external-subdirectory-engine-path ENGINE_PATH
```

Registers the specified subdirectory path into `external_subdirectories` in the specified project's `project.json` file.

```cmd
o3de.bat register --external-subdirectory EXTERNAL_SUBDIRECTORY --external-subdirectory-project-path PROJECT_PATH
```

<br>

**Registering templates**

Registers the specified template to the `templates` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --template-path <template-path>
```

Registers the specified template to the `templates` list in the specified engine's `engine.json` file.

```cmd
o3de.bat register --template-path TEMPLATE_PATH --engine-path ENGINE_PATH
```

Registers all of the templates in the specified path. This command recursively scans the specified path and registers all of the paths that have a valid `template.json` file. This command adds each template to the `templates` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --all-templates-path ALL_TEMPLATES_PATH
```

<br>

**Registering restricted paths**

Registers the specified restricted path to the `restricted` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --restricted-path RESTRICTED_PATH
```

Registers all of the restricted paths in the specified path to the `restricted` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --all-restricted-path ALL_RESTRICTED_PATH
```

<br>

**Registering repositories**

Registers the specified repository uniform resource identifier (URI) to the `repos` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --repo-uri REPO_URI
```

Registers all of the repositories in the specified URI. This command recursively scans the specified path and registers all of the repositories that have a valid `repo.json` file. This command adds each repository to the `o3de_manifest.json` file.

```cmd
o3de.bat register --all-repo-uri ALL_REPO_URI
```

<br>

**Registering default folders**

Registers the specified folder as the default engines directory in the `o3de_manifest.json` file.

```cmd
o3de.bat register --default-engines-folder ENGINES_FOLDER_PATH
```

Registers the specified folder as the default projects directory in the `o3de_manifest.json` file. When creating a project by using the `create-project` command, if you provide a relative path, the project saves in the default project folder.

```cmd
o3de.bat register --default-projects-folder PROJECTS_FOLDER_PATH
```

Registers the specified folder as the default Gems directory in the `o3de_manifest.json` file. When creating a Gem by using the `create-gem` command, if you provide a relative path, the Gem saves in the default Gems folder.

```cmd
o3de.bat register --default-gems-folder GEMS_FOLDER_PATH
```

Registers the specified folder as the default templates directory in the `o3de_manifest.json` file. When creating a template by using the `create-template` command, if you provide a relative path, the template saves in the default template folder.

```cmd
o3de.bat register --default-templates-folder TEMPLATES_FOLDER_PATH
```

Registers the specified folder as the default restricted directory in the `o3de_manifest.json` file. The commands--`create-from-template`, `create-project`, and `create-gem`--use the default restricted directory when instantiating a template.

```cmd
o3de.bat register --default-restricted-folder RESTRICTED_FOLDER_PATH
```

Registers the specified folder as the default third-party directory in the `o3de_manifest.json` file. **Project Manager** uses the default third-party directory to set the `LY_3RDPARTY_PATH` option when configuring the CMake build solution.

```cmd
o3de.bat register --default-third-party folder THIRD_PARTY_FOLDER_PATH
```

<br>

**Updating the `o3de_manifest.json` file**

Updates the `o3de_manifest.json` file. This command validates all of the registered objects, and then removes invalid objects.

```cmd
o3de.bat register --update
```


### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`--this-engine`**

  The engine running this O3DE Python script.

- **`-ep ENGINE_PATH, --engine-path ENGINE_PATH`**

  The path to the engine that you want to register or deregister.

- **`-pp PROJECT_PATH, --project-path PROJECT_PATH`**

  The path to the project that you want to register or deregister.

- **`-gp GEM_PATH, --gem-path GEM_PATH`**

  The path to the Gem that you want to register or deregister.

- **`-es EXTERNAL_SUBDIRECTORY, --external-subdirectory EXTERNAL_SUBDIRECTORY`**

  The path to the external subdirectory that you want to register or deregister.

- **`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`**

  The path to the template that you want to register or deregister.

- **`-rp RESTRICTED_PATH, --restricted-path RESTRICTED_PATH`**

  The path to the restricted folder that you want to register or deregister.

- **`-ru REPO_URI, --repo-uri REPO_URI`**

  The path to the repository that you want to register or deregister.

- **`-aep ALL_ENGINES_PATH, --all-engines-path ALL_ENGINES_PATH`**

  All of the engines that you want to register or deregister in the specified folder.

- **`-app ALL_PROJECTS_PATH, --all-projects-path ALL_PROJECTS_PATH`**

  All of the projects that you want to register or deregister in the specified folder.

- **`-agp ALL_GEMS_PATH, --all-gems-path ALL_GEMS_PATH`**

  All of the Gems that you want to register or deregister in the specified folder.

- **`-atp ALL_TEMPLATES_PATH, --all-templates-path ALL_TEMPLATES_PATH`**

  All of the templates that you want to register or deregister in the specified folder.

- **`-arp ALL_RESTRICTED_PATH, --all-restricted-path ALL_RESTRICTED_PATH`**
  
  All of the restricted folders that you want to register or deregister in the specified folder.

- **`-aru ALL_REPO_URI, --all-repo-uri ALL_REPO_URI`**
  
  All of the repositories that you want to register or deregister in the specified folder.

- **`-def DEFAULT_ENGINES_FOLDER, --default-engines-folder DEFAULT_ENGINES_FOLDER`**

  The path to the default engines folder that you want to register or deregister.

- **`-dpf DEFAULT_PROJECTS_FOLDER, --default-projects-folder DEFAULT_PROJECTS_FOLDER`**

  The path to the default projects folder that you want to register or deregister.

- **`-dgf DEFAULT_GEMS_FOLDER, --default-gems-folder DEFAULT_GEMS_FOLDER`**

  The path to the default Gems folder that you want to register or deregister.

- **`-dtf DEFAULT_TEMPLATES_FOLDER, --default-templates-folder DEFAULT_TEMPLATES_FOLDER`**

  The path to the default templates folder that you want to register or deregister.

- **`-drf DEFAULT_RESTRICTED_FOLDER, --default-restricted-folder DEFAULT_RESTRICTED_FOLDER`**

  The path to the default restricted folder that you want to register or deregister.

- **`-dtpf DEFAULT_THIRD_PARTY_FOLDER, --default-third-party-folder DEFAULT_THIRD_PARTY_FOLDER`**

  The path to the default third-party folder that you want to register or deregister.

- **`-u, --update`**

  Refreshes the repository cache.

- **`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`**

  Overrides the default home folder with the specified folder. By default, the home folder is the user folder. 
  
- **`-r, --remove`**

  Deregisters the specified entry.

- **`-f, --force`**

  Forces the registration information to update, if you made any modifications.

 
**external-subdirectory:**  
Use the following parameters with the `--external-subdirectory` option.

- **`-esep EXTERNAL_SUBDIRECTORY_ENGINE_PATH, --external-subdirectory-engine-path EXTERNAL_SUBDIRECTORY_ENGINE_PATH`**

  If supplied, registers the external subdirectory with the `engine.json` file at the specified engine path.

- **`-espp EXTERNAL_SUBDIRECTORY_PROJECT_PATH, --external-subdirectory-project-path EXTERNAL_SUBDIRECTORY_PROJECT_PATH`**

  If supplied, registers the external subdirectory with the `project.json` file at the specified project path. 


<!-------------------------------------------------------------->

## `register-show`

Shows the O3DE objects that are registered in the `o3de_manifest.json` file. 

### Format

```cmd
register-show [-h]
                             [-te | -e | -p | -g | -t | -r | -rs | -ep | -eg | -et | -ers | -ees | -pg | -pt | -prs | -pes | -ap | -ag | -at | -ares | -aes]
                             [-v] [-pp PROJECT_PATH | -pn PROJECT_NAME]
                             [-ohf OVERRIDE_HOME_FOLDER]
```

### Usage

Outputs the `o3de_manifest.json` file.

```cmd
o3de.bat register-show
```

<br>

**Showing registered engines**

Outputs the current engine that is registered in the `o3de_manifest.json` file. If you use `-v`, this command also outputs the contents of the current engine's `engine.json` file.

```cmd
o3de.bat register-show --this-engine -v
```

Outputs the list of engines that are registered in the `o3de_manifest.json` file. If you use `-v`, then this command outputs each engine's `engine.json` file. 

```cmd
o3de.bat register-show --engines -v
```

<br>

**Showing registered projects**

Outputs the list of projects that are registered in the `o3de_manifest.json` file. If you use `-v`, then this command outputs each project's `project.json` file.

```cmd
o3de.bat register-show --projects -v
```

Outputs the list of projects that are registered in the current engine's `engine.json` file. If you use `-v`, then this command outputs each project's `project.json` file.

```cmd
o3de.bat register-show --engine-projects -v
```

Outputs the list of projects that are registered in both the `o3de_manifest.json` file and the current engine's `engine.json` file. If you use `-v`, then this command outputs each project's `project.json` file.

```cmd
o3de.bat register-show --all-projects -v
```

<br>

**Showing registered Gems**

Outputs the list of Gems that are registered in the `o3de_manifest.json` file. If you use `-v`, then this command outputs each Gem's `gem.json` file.

```cmd
o3de.bat register-show --gems -v
```

Outputs the list of Gems that are registered in the current engine's `engine.json` file. If you use `-v`, then this command outputs each Gem's `gem.json` file.

```cmd
o3de.bat register-show --engine-gems -v
```

Outputs the list of Gems that are registered in the specified project's `project.json` file. If you use `-v`, then this command outputs each Gem's `gem.json` file.

```cmd
o3de.bat register-show --project-gems --project-path PROJECT_PATH -v
```

Outputs the list of Gems that are registered in both the `o3de_manifest.json` file and the current engine's `engine.json` file. If you use `-v`, then this command outputs each Gem's `gem.json` file.

```cmd
o3de.bat register-show --all-gems -v
```

<br>

**Showing registered templates**

Outputs the list of templates that are registered in the `o3de_manifest.json` file. If you use `-v`, then this command outputs each template's `template.json` file.

```cmd
o3de.bat register-show --templates -v
```

Outputs the list of templates that are registered in the current engine's `engine.json` file. If you use `-v`, then this command outputs each template's `template.json` file.

```cmd
o3de.bat register-show --engine-templates -v
```

Outputs the list of templates that are registered in the specified project's `project.json` file. If you use `-v`, then this command outputs each template's `template.json` file.

```cmd
o3de.bat register-show --project-templates --project-path PROJECT_PATH -v
```

Outputs the list of templates that are registered in both the `o3de_manifest.json` file and the current engine's `engine.json` file. If you use `-v`, then this command outputs each template's `template.json` file.

```cmd
o3de.bat register-show --all-templates -v
```

<br>

**Showing registered restricted directories**

Outputs the list of restricted directories that are registered in the `o3de_manifest.json` file. If you use `-v`, then this command outputs each restricted directory's `restricted.json` file.

```cmd
o3de.bat register-show --restricted -v
```

Outputs the list of restricted directories that are registered in the current engine's `engine.json` file. If you use `-v`, then this command outputs each restricted directory's `restricted.json` file.

```cmd
o3de.bat register-show --engine-restricted -v
```

Outputs the list of restricted directories that are registered in the specified project's `project.json` file. If you use `-v`, then this command outputs each restricted directory's `restricted.json` file.

```cmd
o3de.bat register-show --project-restricted --project-path PROJECT_PATH -v
```

Outputs the list of restricted directories that are registered in both the `o3de_manifest.json` file and the current engine's `engine.json` file. If you use `-v`, then this command outputs each restricted directory's `restricted.json` file.

```cmd
o3de.bat register-show --all-restricted -v
```

<br>

**Showing registered external subdirectories**

Outputs the list of external subdirectories that are registered in the `o3de_manifest.json` file.

```cmd
o3de.bat register-show --external-subdirectories
```

Outputs the list of external subdirectories that are registered in the current engine's `engine.json` file.

```cmd
o3de.bat register-show --engine-external-subdirectories
```

Outputs the list of external subdirectories that are registered in the specified project's `project.json` file.

```cmd
o3de.bat register-show --project-external-subdirectories --project-path PROJECT_PATH
```

Outputs the list of external subdirectories that are registered in both the `o3de_manifest.json` file and the current engine's `engine.json` file.

```cmd
o3de.bat register-show --all-external-subdirectories
```

<br>

**Showing registered repositories**

Outputs the list of repositories that are registered in the `o3de_manifest.json` file.

```cmd
o3de.bat register-show --repos
```


### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`-te, --this-engine`**

  Outputs the current engine's path.

- **`-e, --engines`**

  Outputs a list of the engines that are registered in the `o3de_manifest.json` file.

- **`-p, --projects`**

  Outputs a list of the projects that are registered in the `o3de_manifest.json` file.

- **`-g, --gems`**

  Outputs a list of the Gems that are registered in the `o3de_manifest.json` file.

- **`-t, --templates`**

  Outputs a list of the templates that are registered in the `o3de_manifest.json` file.

- **`-r, --repos`**

  Outputs a list of the repos that are registered in the `o3de_manifest.json` file.

- **`-rs, --restricted`**

  Outputs a list of the restricted directories that are registered in the `o3de_manifest.json` file.

- **`-ep, --engine-projects`**

  Outputs a list of the projects that are registered in the current engine's `engine.json` file. 

- **`-eg, --engine-gems`**

  Outputs a list of the Gems that are registered in the current engine's `engine.json` file. 

- **`-et, --engine-templates`**

  Outputs a list of the templates that are registered in the current engine's `engine.json` file. 

- **`-ers, --engine-restricted`**

  Outputs a list of the restricted directories that are registered in the current engine's `engine.json` file.

- **`-ees, --engine-external-subdirectories`**

  Outputs a list of the external subdirectories that are registered in the current engine's `engine.json` file.

- **`-pg, --project-gems`**

  Outputs a list of the Gems that are registered in the specified project's `project.json` file. You must specify the project using the `-pp` or `-pn` options.

- **`-pt, --project-templates`**

  Outputs a list of the templates that are registered in the specified project's `project.json` file. You must specify the project using the `-pp` or `-pn` options.

- **`-prs, --project-restricted`**

  Outputs a list of the restricted directories that are registered in the specified project's `project.json` file. You must specify the project using the `-pp` or `-pn` options.

- **`-pes, --project-external-subdirectories`**

  Outputs a list of the external subdirectories that are registered in the specified project's `project.json` file. You must specify the project using the `-pp` or `-pn` options.

- **`-ap, --all-projects`**

  Outputs all of the projects that are registered in the `o3de_manifest.json` file and the current engine's `engine.json` file. 

- **`-ag, --all-gems`**

  Outputs all of the Gems that are registered in the `o3de_manifest.json` file and the current engine's `engine.json` file.

- **`-at, --all-templates`**

  Outputs all of the templates that are registered in the `o3de_manifest.json` file and the current engine's `engine.json` file. 

- **`-ares, --all-restricted`**

  Outputs all of the restricted directories that are registered in the `o3de_manifest.json` file and the current engine's `engine.json` file.

- **`-aes, --all-external-subdirectories`**

  Outputs all of the external subdirectories that are registered in the `o3de_manifest.json` file and the current engine's `engine.json` file.

- **`-v, --verbose`**

  If specified, outputs the contents of the listed files.

- **`-pp PROJECT_PATH, --project-path PROJECT_PATH`**

  The path to a project.

- **`-pn PROJECT_NAME, --project-name PROJECT_NAME`**

  The name of a project.

- **`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`**

  Overrides the default home folder with the specified folder. By default, the home folder is the user folder. 



<!-------------------------------------------------------------->

## `get-registered`

Shows the path to the registered O3DE object with the specified name.

### Format

```cmd
get-registered [-h]
                    (-en ENGINE_NAME | -pn PROJECT_NAME | -gn GEM_NAME | -tn TEMPLATE_NAME | -df {engines,projects,gems,templates,restricted} | -rn REPO_NAME | -rsn RESTRICTED_NAME)
                    [-ohf OVERRIDE_HOME_FOLDER]
```

### Usage

Returns the first path of an engine that has the specified `engine_name` value. 

```cmd
o3de.bat get-registered --engine-name ENGINE_NAME
```

Returns the first path of a project that has the specified `project_name` value. 

```cmd
o3de.bat get-registered --project-name PROJECT_NAME
```

Returns the first path of a Gem that has the specified `gem_name` value. 

```cmd
o3de.bat get-registered --gem-name GEM_NAME
```

Returns the first path of a template that has the specified `template_name` value.

```cmd
o3de.bat get-registered --template-name TEMPLATE_NAME
```

Returns the first path of a restricted directory that has the specified `restricted_name` value.

```cmd
o3de.bat get-registered --restricted-name RESTRICTED_NAME
```

Returns the first URI for a repository that has the specified `repo_name` value.

```cmd
o3de.bat get-registered --repo-name REPO_NAME
```

Returns the default engine folder that is registered in the `o3de_manifest.json` file.

```cmd
o3de.bat get-registered --default-folder engines
```

Returns the default projects folder that is registered in the `o3de_manifest.json` file.

```cmd
o3de.bat get-registered --default-folder projects
```

Returns the default Gems folder that is registered in the `o3de_manifest.json` file.

```cmd
o3de.bat get-registered --default-folder gems
```

Returns the default templates folder that is registered in the `o3de_manifest.json` file. 

```cmd
o3de.bat get-registered --default-folder templates
```

Returns the default restricted folder that is registered in the `o3de_manifest.json` file.

```cmd
o3de.bat get-registered --default-folder restricted
```


### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`-en ENGINE_NAME, --engine-name ENGINE_NAME`**

  The name of an engine.

- **`-pn PROJECT_NAME, --project-name PROJECT_NAME`**

  The name of a project.

- **`-gn GEM_NAME, --gem-name GEM_NAME`**

  The name of a Gem.

- **`-tn TEMPLATE_NAME, --template-name TEMPLATE_NAME`**

  The name of a template.

- **`-df {engines,projects,gems,templates,restricted}, --default-folder {engines,projects,gems,templates,restricted}`**

  The default folders for engines, projects, Gems, templates, and restricted folders in O3DE.

- **`-rn REPO_NAME, --repo-name REPO_NAME`**

  The name of a repository. 

- **`-rsn RESTRICTED_NAME, --restricted-name RESTRICTED_NAME`**

  The name of a restricted folder.

- **`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`**

  Overrides the default home folder with the specified folder. By default, the home folder is the user folder. 


<!-------------------------------------------------------------->

## `enable-gem`

Enables the specified Gem in your project, so that you can use the assets or code that the Gem provides. When you enable a Gem, this command adds its name to your project's `Code/enabled_gems.cmake` file, which adds the Gem as a build and load dependency of your project's **Game Launcher**, the Editor, and Asset Processor.

### Format

```cmd
enable-gem [-h] (-pp PROJECT_PATH | -pn PROJECT_NAME)
                          (-gp GEM_PATH | -gn GEM_NAME)
                          [-egf ENABLED_GEM_FILE] [-ohf OVERRIDE_HOME_FOLDER]
```

### Usage

```cmd
o3de.bat enable-gem -gp GEM_PATH -pp PROJECT_PATH
```

### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`-pp PROJECT_PATH, --project-path PROJECT_PATH`**

  The path to the project.

- **`-pn PROJECT_NAME, --project-name PROJECT_NAME`**

  The name of the project.

- **`-gp GEM_PATH, --gem-path GEM_PATH`**

  The path to the Gem.

- **`-gn GEM_NAME, --gem-name GEM_NAME`**

  The name of the Gem.

- **`-egf ENABLED_GEM_FILE, --enabled-gem-file ENABLED_GEM_FILE`**

  The CMake file that manages the list of enabled Gems. When disabling a Gem, this command removes the Gem from the specified file. If not specified, this command uses the `Code/enabled_gem.cmake` file.

- **`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`**

  Overrides the default home folder with the specified folder. By default, the home folder is the user folder. 


<!-------------------------------------------------------------->

## `disable-gem`

Disables the specified Gem in your project. When you disable a Gem, this command removes it from the project's `Code/enabled_gems.cmake` file, which removes the Gem as a build and load dependency of your project's Game Launcher, the Editor, and Asset Processor.

### Format

```cmd
disable-gem [-h] (-pp PROJECT_PATH | -pn PROJECT_NAME)
                (-gp GEM_PATH | -gn GEM_NAME)
                [-egf ENABLED_GEM_FILE] [-ohf OVERRIDE_HOME_FOLDER]
```

### Usage

```cmd
o3de.bat disable-gem -gp GEM_PATH -pp PROJECT_PATH
```

### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`-pp PROJECT_PATH, --project-path PROJECT_PATH`**

  The path to the project.

- **`-pn PROJECT_NAME, --project-name PROJECT_NAME`**

  The name of the project.

- **`-gp GEM_PATH, --gem-path GEM_PATH`**

  The path to the Gem.

- **`-gn GEM_NAME, --gem-name GEM_NAME`**

  The name of the Gem.

- **`-egf ENABLED_GEM_FILE, --enabled-gem-file ENABLED_GEM_FILE`**

  The CMake file that manages the list of enabled Gems. When disabling a Gem, this command removes it from the specified file. If not specified, this command uses the `Code/enabled_gem.cmake` file.

- **`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`**

  Overrides the default home folder with the specified folder. By default, the home folder is the user folder. 


<!-------------------------------------------------------------->

## `edit-engine-properties`

Edits the specified engine's properties by modifying the `engine.json` file. 

### Format

```cmd
edit-engine-properties [-h] (-ep ENGINE_PATH | -en ENGINE_NAME)
                        [-enn ENGINE_NEW_NAME]
                        [-ev ENGINE_VERSION]
```

### Usage

Updates the `engine_name` field in the `engine.json` file located in the specified engine's folder.

```cmd
o3de.bat edit-engine-properties --engine-path ENGINE_PATH --engine-new-name ENGINE_NEW_NAME

// or

o3de.bat edit-engine-properties --engine-name ENGINE_NAME --engine-new-name ENGINE_NEW_NAME
```


### Optional parameters

  
- **`-h, --help`**

  Shows the help message.

- **`-ep ENGINE_PATH, --engine-path ENGINE_PATH`**

  The path to the engine.

- **`-en ENGINE_NAME, --engine-name ENGINE_NAME`**

  The name of the engine.


**Engine properties:**

The following parameters modify the specified engine's properties.
  
- **`-enn ENGINE_NEW_NAME, --engine-new-name ENGINE_NEW_NAME`**

  Sets the engine's name. 

- **`-ev ENGINE_VERSION, --engine-version ENGINE_VERSION`**

  Sets the engine's version.


<!-------------------------------------------------------------->

## `edit-project-properties`

Edits the specified project's properties by modifying the `project.json` file. 

### Format 

```cmd
edit-project-properties [-h]
                        (-pp PROJECT_PATH | -pn PROJECT_NAME)
                        [-pnn PROJECT_NEW_NAME]
                        [-po PROJECT_ORIGIN]
                        [-pd PROJECT_DISPLAY]
                        [-ps PROJECT_SUMMARY]
                        [-pi PROJECT_ICON]
                        [-at [ADD_TAGS [ADD_TAGS ...]] | -dt
                        [DELETE_TAGS [DELETE_TAGS ...]] | -rt
                        [REPLACE_TAGS [REPLACE_TAGS ...]]]
```

### Usage

Updates the `project_name` field in the `gem.json` file located in the supplied project path or at the path of the registered project.

```cmd
o3de.bat edit-project-properties --project-path PROJECT_PATH --project-new-name PROJECT_NEW_NAME
o3de.bat edit-project-properties --project-name PROJECT_NAME --project-new-name PROJECT_NEW_NAME
```

### Optional parameters

- **`-h, --help`**

  Shows the help message.

- **`-pp PROJECT_PATH, --project-path PROJECT_PATH`**

  The path to the project.

- **`-pn PROJECT_NAME, --project-name PROJECT_NAME`**

  The name of the project.

- **`-at [ADD_TAGS [ADD_TAGS ...]], --add-tags [ADD_TAGS [ADD_TAGS ...]]`**

  Adds tags to the `user_tags` property. To add multiple tags, use a space-delimited list. For example: `-at A B C`.

- **`-dt [DELETE_TAGS [DELETE_TAGS ...]], --delete-tags [DELETE_TAGS [DELETE_TAGS ...]]`**

  Removes tags from the `user_tags` property. To delete multiple tags, use a space-delimited list. For example: `-dt A B C`.

- **`-rt [REPLACE_TAGS [REPLACE_TAGS ...]], --replace-tags [REPLACE_TAGS [REPLACE_TAGS ...]]`**

  Replaces the `user_tags` property with the specified space-delimited list of values.


**Project properties:**

The following parameters modify the specified project's properties.

- **`-pnn PROJECT_NEW_NAME, --project-new-name PROJECT_NEW_NAME`**

  Sets the project's name.

- **`-po PROJECT_ORIGIN, --project-origin PROJECT_ORIGIN`**

  Sets the description or URL for the project origin, such as the project host, repository, or owner.

- **`-pd PROJECT_DISPLAY, --project-display PROJECT_DISPLAY`**

  Sets the project's display name.

- **`-ps PROJECT_SUMMARY, --project-summary PROJECT_SUMMARY`**

  Sets the project's summary description.

- **`-pi PROJECT_ICON, --project-icon PROJECT_ICON`**

  Sets the path to the project's icon resource.

<!-------------------------------------------------------------->

## `edit-gem-properties`

Edits the specified Gem's properties by modifying the `gem.json` file. 

### Format

```cmd
edit-gem-properties [-h] (-gp GEM_PATH | -gn GEM_NAME)
                        [-gnn GEM_NEW_NAME] [-gd GEM_DISPLAY]
                        [-go GEM_ORIGIN] [-gt {Code,Tool,Asset}]
                        [-gs GEM_SUMMARY] [-gi GEM_ICON]
                        [-gr GEM_REQUIREMENTS]
                        [-at [ADD_TAGS [ADD_TAGS ...]] | -dt
                        [REMOVE_TAGS [REMOVE_TAGS ...]] | -rt
                        [REPLACE_TAGS [REPLACE_TAGS ...]]]
```

### Usage

Updates the `gem_name` field in the `gem.json` file located in the specified Gem's folder.

```cmd
o3de.bat edit-gem-properties --gem-path GEM_PATH --gem-new-name GEM_NEW_NAME

// or

o3de.bat edit-gem-properties --gem-name GEM_NAME --gem-new-name GEM_NEW_NAME
```

### Optional parameters

- **`-h, --help`**
  
  Shows the help message.

- **`-gp GEM_PATH, --gem-path GEM_PATH`**

  The path to the Gem.

- **`-gn GEM_NAME, --gem-name GEM_NAME`**

  The name of the Gem.

- **`-at [ADD_TAGS [ADD_TAGS ...]], --add-tags [ADD_TAGS [ADD_TAGS ...]]`**

  Adds tags to the `user_tags` property. To add multiple tags, use a space-delimited list. For example: `-at A B C`.

- **`-dt [DELETE_TAGS [DELETE_TAGS ...]], --delete-tags [DELETE_TAGS [DELETE_TAGS ...]]`**

  Removes tags from the `user_tags` property. To delete multiple tags, use a space-delimited list. For example: `-dt A B C`.

- **`-rt [REPLACE_TAGS [REPLACE_TAGS ...]], --replace-tags [REPLACE_TAGS [REPLACE_TAGS ...]]`**
  
  Replaces the `user_tags` property with the specified space-delimited list of values.


**Gem properties:**

  The following parameters modify the specified Gem's properties.

- **`-gnn GEM_NEW_NAME, --gem-new-name GEM_NEW_NAME`**

  Sets the Gem's name.

- **`-gd GEM_DISPLAY, --gem-display GEM_DISPLAY`**

  Sets the Gem's display name.

- **`-go GEM_ORIGIN, --gem-origin GEM_ORIGIN`**

  Sets the description or URL for the Gem's origin, such as the Gem host, repository, or owner.

- **`-gt {Code,Tool,Asset}, --gem-type {Code,Tool,Asset}`**

  Sets the Gem type to either Code, Tool, or Asset.

- **`-gs GEM_SUMMARY, --gem-summary GEM_SUMMARY`**

  Sets the Gem's summary description.

- **`-gi GEM_ICON, --gem-icon GEM_ICON`**

  Sets the path to the Gem's icon resource.

- **`-gr GEM_REQUIREMENTS, --gem-requirements GEM_REQUIREMENTS`**

  Sets the description of the requirements that are needed to use the Gem.

<!-------------------------------------------------------------->

## `sha256`

Creates a hash value for an O3DE object using SHA-256 (Secure Hash Algorithm 256). This command outputs the specified file path and writes the value to the `sha256` field in the specified JSON file.

### Format

```cmd
sha256 [-h] -f FILE_PATH [-j JSON_PATH]
```

### Usage

```cmd
o3de.bat sha256 --file-path FILE_PATH --json-path JSON_PATH
```

### Optional parameters

- **`-f FILE_PATH, --file-path FILE_PATH`**

  The path to the O3DE object.

- **`-j JSON_PATH, --json-path JSON_PATH`**

  The path to the O3DE object's JSON file that you want to add the `sha256` hash value to.
