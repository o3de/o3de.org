---
linktitle: CLI Reference
title: Project Configuration CLI Reference
weight: 200
toc: true
---

The `o3de` Python script provides a solution to accomplish project configuration tasks using the command line interface (CLI). It aggregates all of the functions from lower-level scripts in Open 3D Engine (O3DE), so users can access them from a single point. The main driver script is located in the engine folder at `[/scripts/o3de.py](http://o3de.py)`. 

The `o3de` Python script is responsible for multiple tasks:

- Creating projects
- Creating Gems
- Creating templates
- [Enabling and disabling Gems for your project](add-remove-gems/)
- [Registering the engine](/docs/welcome-guide/setup/setup-from-github#register-the-engine)
- Registering projects and Gems


## Prerequisites

To use the `o3de` Python script, you must have Python runtime set up. Python runtime was downloaded when you set up the engine. For more information, refer to instructions on how to get Python runtime in the [Register the engine](/docs/welcome-guide/setup/setup-from-github/#register-the-engine) section of the Setup From GitHub page.


## Quick Start

{{< tabs name="Python runtime setup" >}}
{{% tab name="Windows" %}}

For Windows, open a command prompt. Then, run the O3DE Python runtime using one of the following ways, and enter the command you want to perform. Note: Replace `<engine>` with the path to your engine. 

- Launch python and run the `o3de.py` script.

    ```cmd
    <engine>/python/python.cmd <engine>/scripts/o3de.py <command>
    ```

- Run the `o3de.bat` batch file directly.

    ```cmd
    <engine>/scripts/o3de.bat <command>
    ```

**Example**

For example, to register the engine, you can enter the following command. 

```cmd
<engine>/scripts/o3de.bat register --this-engine
```

{{% /tab %}}
{{% tab name="Linux" %}}

For Linux, open a terminal. Then, run the O3DE Python runtime using one of the following ways, and enter the command you want to perform. Note: Replace `<engine>` with the path to your engine. 

- Launch python and run the `o3de.py` script.

    ```bash
    <engine>/python/python.sh <engine/scripts/o3de.py
    ```

- Run the `o3de.sh` shell script file directly.

    ```bash
    <engine>/scripts/o3de.sh
    ```

**Example**

For example, to register the engine, you can enter the following command. 

```bash
<engine>/scripts/o3de.sh register --this-engine
```

{{% /tab %}}
{{< /tabs >}}


## Commands


| Command | Description | 
| - | - |
| [`get-global-project`](#get-global-project) | Gets the global project that is registered to the engine. |
| [`set-global-project`](#set-global-project) | Sets the specified project as the engine's global project. |
| [`create-template`](#create-template) | Creates a template out of the specified source path. |
| [`create-from-template`](#create-from-template) | Creates a template from an existing template.  |
| [`create-project`](#create-project) | Creates a new project. |
| [`create-gem`](#create-gem) | Creates a new Gem. |
| [`register`](#register) | Register an O3DE object. |
| [`register-show`](#register-show) | Shows the registered O3DE objects. |
| [`get-registered`](#get-registered) | Shows the registered O3DE object's path that is mapped to the specified name. |
| [`enable-gem`](#enable-gem) | Enables the Gem in your project, so you can use the assets or code the Gem provides. |
| [`disable-gem`](#disable-gem) | Disables the Gem in your project. |
| [`sha256`](#sha256) | Creates a secure hash algorithm (SHA-256). |
<!-- | [`edit-project-properties`](#edit-project-properties) |  | -->



## `get-global-project`

Gets the global project that is registered to the engine in the specified `.setreg` file at `<user>/.o3de/Registry/`.


```cmd
usage: o3de.py get-global-project [-h] [-i INPUT_PATH]
```

### Usage

```cmd
o3de.bat get-global-project -i SETREG_PATH
```

### Optional Parameters

`-h, --help`
show this help message and exit

`-i INPUT_PATH, --input-path INPUT_PATH`

Optional path to file to read `/Amazon/AzCore/Bootstrap/project_path` key from. If not supplied, then
`C:\Users\USER_PATH\.o3de\Registry\bootstrap.setreg` is used instead



## `set-global-project`

Sets the specified project as the engine's global project in the specified `.setreg` file at `<user>/.o3de/Registry/`

```cmd
usage: o3de.oy set-global-project [-h] (-pp PROJECT_PATH | -pn PROJECT_NAME)
                                  [-o OUTPUT_PATH] [-f]
```

### Usage

```cmd
o3de.bat set-global-project -pp PROJECT_PATH -o SETREG_PATH
```

### Optional Parameters

`-h, --help`

show this help message and exit

`-pp PROJECT_PATH, --project-path PROJECT_PATH`

The path to the project.

`-pn PROJECT_NAME, --project-name PROJECT_NAME`

The name of the project.

`-o OUTPUT_PATH, --output-path OUTPUT_PATH`

Optional path to output file to write project_path key to. If not supplied, then `C:\Users\USER_NAME\.o3de\Registry\bootstrap.setreg` is used instead

`-f, --force`

Force the setting of the project path in the supplied setreg file


## `create-template`

Creates a template out of the specified source path.

``` cmd
usage: o3de.py create-template [-h] -sp SOURCE_PATH [-tp TEMPLATE_PATH]
                    [-srp SOURCE_RESTRICTED_PATH | -srn SOURCE_RESTRICTED_NAME]
                    [-trp TEMPLATE_RESTRICTED_PATH | -trn TEMPLATE_RESTRICTED_NAME]
                    [-sn SOURCE_NAME]
                    [-srprp SOURCE_RESTRICTED_PLATFORM_RELATIVE_PATH]
                    [-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PAT
```

### Usage

Creates a template from the source folder and saves the template into the specified path.

```cmd
o3de.bat create-template --source-path SOURCE_PATH --template-path TEMPLATE_PATH
```

### Optional Parameters
  
`-h, --help`

show this help message and exit

`-sp SOURCE_PATH, --source-path SOURCE_PATH`

The path to the source that you want to make into a template

`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`

The path to the template to create, can be absolute or relative to default templates path

`-srp SOURCE_RESTRICTED_PATH, --source-restricted-path SOURCE_RESTRICTED_PATH`

The path to the source restricted folder.

`-srn SOURCE_RESTRICTED_NAME, --source-restricted-name SOURCE_RESTRICTED_NAME`

The name of the source restricted folder. If supplied this will resolve the --source-restricted-path.

`-trp TEMPLATE_RESTRICTED_PATH, --template-restricted-path TEMPLATE_RESTRICTED_PATH`

The path to the templates restricted folder.

`-trn TEMPLATE_RESTRICTED_NAME, --template-restricted-name TEMPLATE_RESTRICTED_NAME`

The name of the templates restricted folder. If supplied this will resolve the --template-restricted- path.

`-sn SOURCE_NAME, --source-name SOURCE_NAME`

Substitutes any file and path entries which match the source name within the source-path directory with the ${Name} and ${SanitizedCppName}.Ex: Path substitution --source-name Foo<source-path>/Code/Include/FooBus.h -> <source-path>/Code/Include/${Name}Bus.hEx: File content substitution.class FooRequests -> class ${SanitizedCppName}Requests

`-srprp SOURCE_RESTRICTED_PLATFORM_RELATIVE_PATH, --source-restricted-platform-relative-path SOURCE_RESTRICTED_PLATFORM_RELATIVE_PATH`

Any path to append to the --source-restricted- path/<platform> to where the restricted source is. EX. --source-restricted-path C:/restricted --source- restricted-platform-relative-path some/folder => C:/restricted/<platform>/some/folder/<source_name>

`-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH, --template-restricted-platform-relative-path TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH`

Any path to append to the --template-restricted- path/<platform> to where the restricted template source is. --template-restricted-path C:/restricted --template-restricted-platform-relative-path some/folder => C:/restricted/<platform>/some/folder/<template_name>

`-kr, --keep-restricted-in-template`

Should the template keep the restricted platforms in the template, or create the restricted files in the restricted folder, default is False so it will create a restricted folder by default

`-kl, --keep-license-text`

Should license in the template files text be kept in the instantiation, default is False, so will not keep license text by default. License text is defined as all lines of text starting on a line with {BEGIN_LICENSE} and ending line {END_LICENSE}.

`-r [REPLACE [REPLACE ...]], --replace [REPLACE [REPLACE ...]]`

String that specifies A->B replacement pairs. Ex. --replace CoolThing ${the_thing} 1723905 ${id} Note: <TemplateName> is the last component of template_path Note: <TemplateName> is automatically ${Name} Note: <templatename> is automatically ${NameLower} Note: <TEMPLATENAME> is automatically ${NameUpper}

`-f, --force`           
Copies to new template directory even if it exist.


## `create-from-template`

Creates a template with a `template.json` file. 

```cmd
usage: o3de.py create-from-template [-h] -dp DESTINATION_PATH
                                    (-tp TEMPLATE_PATH | -tn TEMPLATE_NAME)
                                    [-dn DESTINATION_NAME]
                                    [-drp DESTINATION_RESTRICTED_PATH | -drn DESTINATION_RESTRICTED_NAME]
                                    [-trp TEMPLATE_RESTRICTED_PATH | -trn TEMPLATE_RESTRICTED_NAME]
                                    [-drprp DESTINATION_RESTRICTED_PLATFORM_RELATIVE_PATH]
                                    [-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH]
                                    [-kr] [-kl] [-r [REPLACE [REPLACE ...]]]
                                    [-f]
```

### Usage

Creates a generic template and saves it in the specified path. 

```cmd
o3de.bat create-from-template --destination-path DESTINATION_PATH
```

Creates a template based on the specified template and saves it in the specified path. 

```cmd
o3de.bat create-from-template --destination-path DESTINATION_PATH --template-path TEMPLATE_PATH
```

### Optional Parameters

`-h, --help`

show this help message and exit

`-dp DESTINATION_PATH, --destination-path DESTINATION_PATH`

The path to where you want the template instantiated, can be absolute or dev root relative. Ex. C:/o3de/TestTest = \<destination_name\>

`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`

The path to the template you want to instantiate, can be absolute or dev root/Templates relative. Ex. C:/o3de/Template/TestTemplateTestTemplate = \<template_name\>

`-tn TEMPLATE_NAME, --template-name TEMPLATE_NAME`

The name to the registered template you want to
instantiate. If supplied this will resolve the
--template-path.

`-dn DESTINATION_NAME, --destination-name DESTINATION_NAME`

The name to use when substituting the ${Name} placeholder in instantiated template, must be alphanumeric, and can contain _ and - characters. If no name is provided, will use last component of destination path. Ex. New_Gem

`-drp DESTINATION_RESTRICTED_PATH, --destination-restricted-path DESTINATION_RESTRICTED_PATH`

The destination restricted path is where the restricted files will be written to.

`-drn DESTINATION_RESTRICTED_NAME, --destination-restricted-name DESTINATION_RESTRICTED_NAME`

The name the registered restricted path where the restricted files will be written to. If supplied this will resolve the --destination-restricted-path.

`-trp TEMPLATE_RESTRICTED_PATH, --template-restricted-path TEMPLATE_RESTRICTED_PATH`

The template restricted path to read from if any

`-trn TEMPLATE_RESTRICTED_NAME, --template-restricted-name TEMPLATE_RESTRICTED_NAME`

The name of the registered restricted path to read from if any. If supplied this will resolve the --template-restricted-path.

`-drprp DESTINATION_RESTRICTED_PLATFORM_RELATIVE_PATH, --destination-restricted-platform-relative-path DESTINATION_RESTRICTED_PLATFORM_RELATIVE_PATH`

Any path to append to the --destination-restricted -path//<platform/> to where the restricted destination is. --destination-restricted-path C:/instance --destination-restricted-platform-relative-path some/folder =/> C:/instance//<platform/>/some/folder//<destination_name/>

`-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH, --template-restricted-platform-relative-path TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH`

Any path to append to the --template-restricted- path//<platform/> to where the restricted template is. --template-restricted-path C:/restricted --template-
restricted-platform-relaive-path some/folder =/> C:/restricted//<platform/>/some/folder//<template_name/>

`-kr, --keep-restricted-in-instance`

Should the instance keep the restricted platforms in the instance, or create the restricted files in the restricted folder, default is False.

`-kl, --keep-license-text`

Should license in the template files text be kept in the instantiation, default is False, so will not keep license text by default. License text is defined as
all lines of text starting on a line with {BEGIN_LICENSE} and ending line {END_LICENSE}. 

`-r [REPLACE [REPLACE ...]], --replace [REPLACE [REPLACE ...]]`

String that specifies A-/>B replacement pairs. Ex. --replace CoolThing ${the_thing} ${id} 1723905 Note: /<DestinationName/> is the last component of destination_path Note: ${Name} is automatically /<DestinationName/> Note: ${NameLower} is automatically /<destinationname/> Note: ${NameUpper} is automatically
/<DESTINATIONNAME/> 

`-f, --force`

Copies over instantiated template directory even if it exist.


## `create-project`

Create a new project at the specified path.

``` cmd
usage: o3de.py create-project [-h] -pp PROJECT_PATH [-pn PROJECT_NAME]
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

### Optional Parameters

  
`-h, --help`

show this help message and exit

`-pp PROJECT_PATH, --project-path PROJECT_PATH`

The location of the project you wish to create from the template, can be an absolute path or dev root relative. Ex. C:/o3de/TestProject TestProject = \<project_name\> if --project-name not provided

`-pn PROJECT_NAME, --project-name PROJECT_NAME`

The name of the project you wish to use, must be alphanumeric, and can contain _ and - characters. If no name is provided, will use last component of project path. Ex. New_Project-123

`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`

the path to the template you want to instance, can be absolute or relative to default templates path

`-tn TEMPLATE_NAME, --template-name TEMPLATE_NAME`

The name the registered template you want to instance, defaults to DefaultProject. If supplied this will resolve the --template-path.

`-prp PROJECT_RESTRICTED_PATH, --project-restricted-path PROJECT_RESTRICTED_PATH`

path to the projects restricted folder, can be absolute or relative to the restricted="projects"

`-prn PROJECT_RESTRICTED_NAME, --project-restricted-name PROJECT_RESTRICTED_NAME`

The name of the registered projects restricted path. If supplied this will resolve the --project- restricted-path.

`-trp TEMPLATE_RESTRICTED_PATH, --template-restricted-path TEMPLATE_RESTRICTED_PATH`

The templates restricted path can be absolute or relative to restricted="templates"

`-trn TEMPLATE_RESTRICTED_NAME, --template-restricted-name TEMPLATE_RESTRICTED_NAME`

The name of the registered templates restricted path. If supplied this will resolve the --template- restricted-path.

`-prprp PROJECT_RESTRICTED_PLATFORM_RELATIVE_PATH, --project-restricted-platform-relative-path PROJECT_RESTRICTED_PLATFORM_RELATIVE_PATH`

Any path to append to the --project-restricted- path/\<platform\> to where the restricted project is. --project-restricted-path C:/restricted --project- restricted-platform-relative-path some/folder =\> C:/restricted/\<platform\>/some/folder/\<project_name\>

`-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH, --template-restricted-platform-relative-path TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH`

Any path to append to the --template-restricted- path/\<platform\> to where the restricted template is. --template-restricted-path C:/restricted --template- restricted-platform-relative-path some/folder =\> C:/restricted/\<platform\>/some/folder/\<template_name\>

`-kr, --keep-restricted-in-project`

Should the new project keep the restricted platforms in the project, orcreate the restricted files in the restricted folder, default is False

`-kl, --keep-license-text`

Should license in the template files text be kept in the instantiation, default is False, so will not keep license text by default. License text is defined as all lines of text starting on a line with {BEGIN_LICENSE} and ending line {END_LICENSE}.

`-r [REPLACE [REPLACE ...]], --replace [REPLACE [REPLACE ...]]`

String that specifies ADDITIONAL A-\>B replacement pairs. ${Name} and all other standard project replacements will be automatically inferred from the project name. These replacements will superseded all inferred replacements. Ex. --replace ${DATE} 1/1/2020 ${id} 1723905 Note: \<ProjectName\> is the last component of project_path Note: ${Name} is automatically \<ProjectName\> Note: ${NameLower} is automatically \<projectname\> Note: ${NameUpper} is automatically \<PROJECTNAME\>

`--system-component-class-id SYSTEM_COMPONENT_CLASS_ID`

The uuid you want to associate with the system class
component, default is a random uuid Ex.
{b60c92eb-3139-454b-a917-a9d3c5819594}

`--editor-system-component-class-id EDITOR_SYSTEM_COMPONENT_CLASS_ID`

The uuid you want to associate with the editor system
class component, default is a random uuid Ex.
{b60c92eb-3139-454b-a917-a9d3c5819594}

`--module-id MODULE_ID`

The uuid you want to associate with the module,
default is a random uuid Ex.
{b60c92eb-3139-454b-a917-a9d3c5819594}

`-f, --force`

Copies over instantiated template directory even if it
exist.


## `create-gem`

Create a new Gem at the specified path.

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

Create a new Gem at the specified path using the specified Gem template. The template must have a valid gem.json file.

```cmd
o3de.bat create-gem -gp GEM_PATH --template-path TEMPLATE_PATH
```

### Optional parameters

`-h, --help`

show this help message and exit

`-gp GEM_PATH, --gem-path GEM_PATH`

The gem path, can be absolute or relative to default gems path

`-gn GEM_NAME, --gem-name GEM_NAME`

The name to use when substituting the ${Name} placeholder for the gem, must be alphanumeric, and can contain _ and - characters. If no name is provided, will use last component of gem path. Ex. New_Gem

`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`

The template path you want to instance, can be absolute or relative to default templates path

`-tn TEMPLATE_NAME, --template-name TEMPLATE_NAME`

The name of the registered template you want to instance, defaults to DefaultGem. If supplied this will resolve the --template-path.

`-grp GEM_RESTRICTED_PATH, --gem-restricted-path GEM_RESTRICTED_PATH`

The path to the gem restricted to write to folder if any, can beabsolute or dev root relative, default is dev root/restricted.

`-grn GEM_RESTRICTED_NAME, --gem-restricted-name GEM_RESTRICTED_NAME`

The path to the gem restricted to write to folder if any, can beabsolute or dev root relative, default is dev root/restricted. If supplied this will resolve the --gem-restricted-path.

`-trp TEMPLATE_RESTRICTED_PATH, --template-restricted-path TEMPLATE_RESTRICTED_PATH`

The templates restricted path, can be absolute or relative to the restricted="templates"

`-trn TEMPLATE_RESTRICTED_NAME, --template-restricted-name TEMPLATE_RESTRICTED_NAME`

The name of the registered templates restricted path. If supplied this will resolve the --template- restricted-path.

`-grprp GEM_RESTRICTED_PLATFORM_RELATIVE_PATH, --gem-restricted-platform-relative-path GEM_RESTRICTED_PLATFORM_RELATIVE_PATH`

Any path to append to the --gem-restricted- path/ \<platform \> to where the restricted template is. --gem-restricted-path C:/restricted --gem-restricted- platform-relative-path some/folder = \> C:/restricted/ \<platform \>/some/folder/ \<gem_name \>

`-trprp TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH, --template-restricted-platform-relative-path TEMPLATE_RESTRICTED_PLATFORM_RELATIVE_PATH`

Any path to append to the --template-restricted- path/ \<platform \> to where the restricted template is. --template-restricted-path C:/restricted --template- restricted-platform-relative-path some/folder = \> C:/restricted/ \<platform \>/some/folder/ \<template_name \>

`-r [REPLACE [REPLACE ...]], --replace [REPLACE [REPLACE ...]]`

String that specifies ADDITIONAL A- \>B replacement pairs. ${Name} and all other standard gem replacements will be automatically inferred from the gem name. These replacements will superseded all inferred replacement pairs. Ex. --replace ${DATE} 1/1/2020 ${id} 1723905 Note:  \<GemName \> is the last component of gem_path Note: ${Name} is automatically  \<GemName \> Note: ${NameLower} is automatically  \<gemname \> Note: ${NameUpper} is automatically  \<GEMANME \>

`-kr, --keep-restricted-in-gem`

Should the new gem keep the restricted platforms in the project, orcreate the restricted files in the restricted folder, default is False

`-kl, --keep-license-text`

Should license in the template files text be kept in the instantiation, default is False, so will not keep license text by default. License text is defined as all lines of text starting on a line with {BEGIN_LICENSE} and ending line {END_LICENSE}.

`--system-component-class-id SYSTEM_COMPONENT_CLASS_ID`

The uuid you want to associate with the system class component, default is a random uuid Ex. {b60c92eb-3139-454b-a917-a9d3c5819594}

`--editor-system-component-class-id EDITOR_SYSTEM_COMPONENT_CLASS_ID`

The uuid you want to associate with the editor system class component, default is a random uuid Ex. {b60c92eb-3139-454b-a917-a9d3c5819594}

`--module-id MODULE_ID`

The uuid you want to associate with the gem module, default is a random uuid Ex. {b60c92eb-3139-454b-a917-a9d3c5819594}

`-f, --force`

Copies over instantiated template directory even if it exist.


## `register`

Register O3DE objects to the `o3de_manifest.json` file.


```cmd
usage: o3de.py register [-h]
                        (--this-engine | -ep ENGINE_PATH | -pp PROJECT_PATH | -gp GEM_PATH | -es EXTERNAL_SUBDIRECTORY | -tp TEMPLATE_PATH | -rp RESTRICTED_PATH | -ru REPO_URI | -aep ALL_ENGINES_PATH | -app ALL_PROJECTS_PATH | -agp ALL_GEMS_PATH | -atp ALL_TEMPLATES_PATH | -arp ALL_RESTRICTED_PATH | -aru ALL_REPO_URI | -def DEFAULT_ENGINES_FOLDER | -dpf DEFAULT_PROJECTS_FOLDER | -dgf DEFAULT_GEMS_FOLDER | -dtf DEFAULT_TEMPLATES_FOLDER | -drf DEFAULT_RESTRICTED_FOLDER | -dtpf DEFAULT_THIRD_PARTY_FOLDER | -u)
                        [-ohf OVERRIDE_HOME_FOLDER] [-r] [-f]
                        [-esep EXTERNAL_SUBDIRECTORY_ENGINE_PATH | -espp EXTERNAL_SUBDIRECTORY_PROJECT_PATH]
```


### Usage

#### Registering engines

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

#### Registering projects

Registers the specified project to the engine. This command does two things: it adds the project's path to the `o3de_manifest.json` file; and it sets `engine` to the engine's name in each project's `project.json` file.

```cmd
o3de.bat register -pp PROJECT_PATH
```

Registers the specified project to the specified engine. This command does two things: it adds the project's path to the `o3de_manifest.json` file; and it sets `engine` to the engine's name in each project's `project.json` file.

```cmd
o3de.bat register -pp PROJECT_PATH --engine-path ENGINE_PATH
```

Registers all of the projects in the specified path. This command recursively scans the specified path and registers all of the paths that have a valid `project.json` file. For each project, this command does two things: it adds the each project's path to the `o3de_manifest.json` file; and it sets `engine` to the engine's name in each project's `project.json` file. 

```cmd
o3de.bat register --all-projects-path ALL_PROJECTS_PATH
```

#### Registering Gems

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

Registers all of the Gems in the specified path. This command recursively scans the specified path and registers all of the paths that have a valid `gem.json` file. For each Gem, this command adds the Gem to the `o3de_manifest.json` file.

```cmd
o3de.bat register --all-gems-path ALL_GEMS_PATH
```

#### Registering external subdirectories

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

#### Registering templates

Registers the specified template to the `templates` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --template-path <template-path
```

Registers the specified template to the `templates` list in the specified engine's `engine.json` file.

```cmd
o3de.bat register --template-path TEMPLATE_PATH --engine-path ENGINE_PATH
```

Registers all of the templates in the specified path. This command recursively scans the specified path and registers all of the paths that have a valid `template.json` file. For each template, this command adds the template to the `templates` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --all-templates-path ALL_TEMPLATES_PATH
```

#### Registering restricted paths

Registers the specified restricted directory to the `restricted` list in the `o3de_manifest.json` file. 

```cmd
o3de.bat register --restricted-path RESTRICTED_PATH
```

Registers all of the restricted paths in the specified path to the `restricted` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --all-restricted-path ALL_RESTRICTED_PATH
```
#### Registering repositories

Registers the specified repository URI (uniform resource identifier) to the `repos` list in the `o3de_manifest.json` file.

```cmd
o3de.bat register --repo-uri REPO_URI
```

Registers all of the repositories in the specified URI. This command recursively scans the specified path and registers all of the repositoriesthat have a valid `repo.json` file. For each repository, this command adds the Gem to the `o3de_manifest.json` file.

```cmd
o3de.bat register --all-repo-uri ALL_REPO_URI
```

#### Registering default folders

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

Register the specified folder as the default templates directory in the `o3de_manifest.json` file. When creating a template by using the `create-template` command, if you provide a relative path, the template saves in the default template folder.

```cmd
o3de.bat register --default-templates-folder TEMPLATES_FOLDER_PATH
```

Register the specified folder as the default restricted directory in the `o3de_manifest.json` file. The commands - `create-from-template`, `create-project`, and `create-gem` - use the default restricted directory when instantiating a template. 

```cmd
o3de.bat register --default-restricted-folder RESTRICTED_FOLDER_PATH
```

Register the specified folder as the default 3rd Party directory in the `o3de_manifest.json` file. The Project Manager uses the default 3rd Party directory to set the `LY_3RDPARTY_PATH` option when configuring the CMake build solution.

```cmd
o3de.bat register --default-third-party folder THIRD_PARTY_FOLDER_PATH
```

#### Updating the `o3de_manifest.json` file

Updates the `o3de_manifest.json` file. This command validates all of the registered objects, and then removes invalid objects.

```cmd
o3de.bat register --update
```


### Optional parameters
`-h, --help`  
show this help message and exit

`--this-engine`  
Registers the engine this script is running from.

`-ep ENGINE_PATH, --engine-path ENGINE_PATH`  

Engine path to register/remove.

`-pp PROJECT_PATH, --project-path PROJECT_PATH`  

Project path to register/remove.

`-gp GEM_PATH, --gem-path GEM_PATH`  

Gem path to register/remove.

`-es EXTERNAL_SUBDIRECTORY, --external-subdirectory EXTERNAL_SUBDIRECTORY`  

External subdirectory path to register/remove.

`-tp TEMPLATE_PATH, --template-path TEMPLATE_PATH`  

Template path to register/remove.

`-rp RESTRICTED_PATH, --restricted-path RESTRICTED_PATH`  

A restricted folder to register/remove.

`-ru REPO_URI, --repo-uri REPO_URI`  

A repo uri to register/remove.

`-aep ALL_ENGINES_PATH, --all-engines-path ALL_ENGINES_PATH`  

All engines under this folder to register/remove.

`-app ALL_PROJECTS_PATH, --all-projects-path ALL_PROJECTS_PATH`  

All projects under this folder to register/remove.

`-agp ALL_GEMS_PATH, --all-gems-path ALL_GEMS_PATH`  

All gems under this folder to register/remove.

`-atp ALL_TEMPLATES_PATH, --all-templates-path ALL_TEMPLATES_PATH`  

All templates under this folder to register/remove.

`-arp ALL_RESTRICTED_PATH, --all-restricted-path ALL_RESTRICTED_PATH`  

All templates under this folder to register/remove.

`-aru ALL_REPO_URI, --all-repo-uri ALL_REPO_URI`  

All repos under this folder to register/remove.

`-def DEFAULT_ENGINES_FOLDER, --default-engines-folder DEFAULT_ENGINES_FOLDER`  

The default engines folder to register/remove.

`-dpf DEFAULT_PROJECTS_FOLDER, --default-projects-folder DEFAULT_PROJECTS_FOLDER`  

The default projects folder to register/remove.

`-dgf DEFAULT_GEMS_FOLDER, --default-gems-folder DEFAULT_GEMS_FOLDER`  

The default gems folder to register/remove.

`-dtf DEFAULT_TEMPLATES_FOLDER, --default-templates-folder DEFAULT_TEMPLATES_FOLDER`  

The default templates folder to register/remove.

`-drf DEFAULT_RESTRICTED_FOLDER, --default-restricted-folder DEFAULT_RESTRICTED_FOLDER`  

The default restricted folder to register/remove.

`-dtpf DEFAULT_THIRD_PARTY_FOLDER, --default-third-party-folder DEFAULT_THIRD_PARTY_FOLDER`  

The default 3rd Party folder to register/remove.

`-u, --update`  

Refresh the repo cache.

`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`  

By default the home folder is `the user folder, override it to this folder.
  
`-r, --remove`  

Remove entry.

`-f, --force`  

For the update of the registration field being modified.

 
**external-subdirectory:**  
path arguments to use with the --external-subdirectory option

`-esep EXTERNAL_SUBDIRECTORY_ENGINE_PATH, --external-subdirectory-engine-path EXTERNAL_SUBDIRECTORY_ENGINE_PATH`  

If supplied, registers the external subdirectory with the engine.json at the engine-path location

`-espp EXTERNAL_SUBDIRECTORY_PROJECT_PATH, --external-subdirectory-project-path EXTERNAL_SUBDIRECTORY_PROJECT_PATH`

If supplied, registers the external subdirectory with the project.json at the project-path location


## `register-show`
Shows the registered O3DE objects in the `o3de_manifest.json` file. 


```cmd
usage: o3de.py register-show [-h]
                             [-te | -e | -p | -g | -t | -r | -rs | -ep | -eg | -et | -ers | -ees | -pg | -pt | -prs | -pes | -ap | -ag | -at | -ares | -aes]
                             [-v] [-pp PROJECT_PATH | -pn PROJECT_NAME]
                             [-ohf OVERRIDE_HOME_FOLDER]
```

### Usage

Outputs the `o3de_manifest.json` file.

```cmd
o3de.bat register-show
```

Outputs the current engine that is registered in the `o3de_manifest.json` file.

```cmd
o3de.bat register-show --this-engine
```

Iterates over each engine that is registered in the `o3de_manifest.json` file. Then, for each iteration, outputs the `engine.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --engines
```

Iterates over each project that is registered in the `o3de_manifest.json` file. Then, for each iteration, outputs the `engine.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --projects
```

Iterates over each engine that is registered in the current engine's `engine.json` file. Then, for each iteration, outputs the `engine.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --engine-projects
```

Iterates over each project that is registered in both the `o3de_manifest.json` file and the current engine's `engine.json` file. Then, for each iteration, outputs the `project.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --all-projects
```

Iterators over each Gem that is registered in the `o3de_manifest.json` file. Then, for each iteration, outputs the `gem.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --gems
```

Iterates over each Gem that is registered in the current engine's `engine.json`. Then, for each iteration, outputs the `gem.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --engine-gems
```

Iterates over each gem in the project.json at the specified path. Then, for each iteration, outputs the `gem.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --project-gems --project-path PROJECT_PATH
```

Iterates over each gem that is registered in both the `o3de_manifest.json` file and the current engine's `engine.json` file. Then, for each iteration, outputs the Gem's path to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --all-gems
```

Outputs the templates that is registered in the `o3de_manifest.json` file. Then, for each iteration, outputs the `template.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --templates
```

Iterates over each template that is registered in the current engine's `engine.json`. Then, for each iteration, outputs the `template.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --engine-templates
```

Iterates over each template in the `project.json` file that is located at the specified project path. Then, for each iteration, outputs the `template.json` to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --project-templates --project-path C:/Projects/TestProject
```

Iterates over each template that is registered in both the `o3de_manifest.json` file and the current engine's `engine.json`. Then, for each iteration, outputs the `template.json` file path to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --all-templates
```

Outputs the restricted directories that are registered in the `o3de_manifest.json` file. For each restricted directory, this command outputs the `restricted.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --restricted
```

Iterates over each restricted directory that is registered in the current engine's `engine.json`. Then, for each iteration, outputs the `restricted.json` file to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --engine-restricted
```

Iterates over each restricted directory in the `project.json` file that is located at the specified project path. Then, for each iteration outputs the restricted directory's path to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --project-templates --project-path C:/Projects/TestProject
```

Iterates over each restricted directory that is registered in both the `o3de_manifest.json` file and the current engine's `engine.json` file. Then, for each iteration, outputs the restricted directory's path to stdout if verbose > 0 (`-v`).

```cmd
o3de.bat register-show --all-restricted
```

Outputs the `external_subdirectories` array in the `o3de_manifest.json` file.

```cmd
o3de.bat register-show --external-subdirectories
```

Outputs the `external_subdirectories` array in the current engine's `engine.json` file. 

```cmd
o3de.bat register-show --engine-external-subdirectories
```

Outputs the `external_subdirectories` array in the `project.json` that is located at the specified project path.

```cmd
o3de.bat register-show --project-external-subdirectories --project-path PROJECT_PATH
```

Outputs the `external_subdirectories` from both the `o3de_manifest.json` file and the current engine's `engine.json` file.

```cmd
o3de.bat register-show --all-external-subdirectories --project-path PROJECT_PATH
```

Iterates over the repositories that are registered in the `o3de_manifest.json` file. Then, for each repository, outputs the `repos` array to stdout.

```cmd
o3de.bat register-show --repos
```

### Optional parameters

`-h, --help`
Shows the help message.

`-te, --this-engine`
Outputs the current engine's path.

`-e, --engines`
Outputs the engines registered in the `o3de_manifest.json` file.

`-p, --projects`
Output the projects registered in the `o3de_manifest.json` file.

`-g, --gems`
Output the gems registered in the `o3de_manifest.json` file.

`-t, --templates`
Output the templates registered in the `o3de_manifest.json` file.

`-r, --repos`
Output the repos registered in the `o3de_manifest.json` file. Ignores repos.

`-rs, --restricted`
Output the restricted directories registered in the `o3de_manifest.json` file.

`-ep, --engine-projects`
Output the projects registered in the current engine engine.json. Ignores repos.

`-eg, --engine-gems`
Output the gems registered in the current engine engine.json. Ignores repos

`-et, --engine-templates`
Output the templates registered in the current engine engine.json. Ignores repos.

`-ers, --engine-restricted`
Output the restricted directories registered in the current engine engine.json.

`-ees, --engine-external-subdirectories`
Output the external subdirectories registered in the current engine engine.json.

`-pg, --project-gems`
Returns the gems registered with the project.json.

`-pt, --project-templates`
Returns the templates registered with the project.json.

`-prs, --project-restricted`
Returns the restricted directories registered with the project.json.

`-pes, --project-external-subdirectories`
Returns the external subdirectories register with the project.json.

`-ap, --all-projects`
Output all projects registered in the `o3de_manifest.json` file.and the current engine.json. Ignores repos.

`-ag, --all-gems`
Output all gems registered in the `o3de_manifest.json` file.and the current engine.json. Ignores repos

`-at, --all-templates`
Output all templates registered in the `o3de_manifest.json` file.and the current engine.json. Ignores repos.

`-ares, --all-restricted`
Output all restricted directory registered in the `o3de_manifest.json` file.and the current engine.json.

`-aes, --all-external-subdirectories`
Output all external subdirectories registered in the `o3de_manifest.json` file.and the current engine.json.

`-v, --verbose`
How verbose do you want the output to be.

`-pp PROJECT_PATH, --project-path PROJECT_PATH`
The path to a project.

`-pn PROJECT_NAME, --project-name PROJECT_NAME`
The name of a project.

`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`
 By default the home folder is the user folder, override it to this folder.



## `get-registered`
ShowS the registered O3DE object's path that is mapped to the specified name.


```cmd
usage: o3de.py get-registered [-h]
                    (-en ENGINE_NAME | -pn PROJECT_NAME | -gn GEM_NAME | -tn TEMPLATE_NAME | -df {engines,projects,gems,templates,restricted} | -rn REPO_NAME | -rsn RESTRICTED_NAME)
                    [-ohf OVERRIDE_HOME_FOLDER]
```

### Usage

Returns the first path of an engine that has the specified "engine_name" value. 

```cmd
o3de.bat get-registered --engine-name ENGINE_NAME
```

Returns the first path of a project that has the specified "project_name" value. 

```cmd
o3de.bat get-registered --project-name PROJECT_NAME
```

Returns the first path of a Gem that has the specified "gem_name" value. 

```cmd
o3de.bat get-registered --gem-name GEM_NAME
```

Returns the first path of a template that has the specified "template_name" value.

```cmd
o3de.bat get-registered --template-name TEMPLATE_NAME
```

Returns the first path of a restricted directory that has the specified "restricted_name" value.

```cmd
o3de.bat get-registered --restricted-name RESTRICTED_NAME
```

Returns the first URI for a repository that has the specified "repo_name" value.

```cmd
o3de.bat get-registered --repo-name REPO_NAME
```

Returns the default engine folder that is registered to the `o3de_manifest.json` file.

```cmd
o3de.bat get-registered --default-folder engines
```

Returns the default projects folder that is registered to the `o3de_manifest.json` file. 

```cmd
o3de.bat get-registered --default-folder projects
```

Returns the default Gems folder that is registered to the `o3de_manifest.json` file. 

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


### Optional Parameters

`-h, --help`

show this help message and exit

`-en ENGINE_NAME, --engine-name ENGINE_NAME`

Engine name.

`-pn PROJECT_NAME, --project-name PROJECT_NAME`

Project name.

`-gn GEM_NAME, --gem-name GEM_NAME`

Gem name.

`-tn TEMPLATE_NAME, --template-name TEMPLATE_NAME`

Template name.

`-df {engines,projects,gems,templates,restricted}, --default-folder {engines,projects,gems,templates,restricted}`

The default folders for o3de.

`-rn REPO_NAME, --repo-name REPO_NAME`

Repo name.

`-rsn RESTRICTED_NAME, --restricted-name RESTRICTED_NAME`

Restricted name.

`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`

By default the home folder is the user folder, override it to this folder.


## `enable-gem`

Enables the Gem in your project, so you can use the assets or code the Gem provides. When you enable a Gem, this command adds the Gem's name to your project's `Code/enabled_gems.cmake` file, which adds the Gem as a build and load dependency of your project's **Game Launcher**, the **Editor**, and the **Asset Processor**.

```cmd
usage: o3de.py enable-gem [-h] (-pp PROJECT_PATH | -pn PROJECT_NAME)
                          (-gp GEM_PATH | -gn GEM_NAME)
                          [-egf ENABLED_GEM_FILE] [-ohf OVERRIDE_HOME_FOLDER]
```

### Usage

```cmd
o3de.bat enable-gem -gp GEM_PATH -pp PROJECT_PATH
```

### Optional Parameters

`-h, --help`

show this help message and exit

`-pp PROJECT_PATH, --project-path PROJECT_PATH`

The path to the project.

`-pn PROJECT_NAME, --project-name PROJECT_NAME`

The name of the project.

`-gp GEM_PATH, --gem-path GEM_PATH`

The path to the gem.

`-gn GEM_NAME, --gem-name GEM_NAME`

The name of the gem.

`-egf ENABLED_GEM_FILE, --enabled-gem-file ENABLED_GEM_FILE`

The cmake enabled_gem file in which the gem names are
specified.If not specified it will assume
enabled_gems.cmake

`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`

By default the home folder is the user folder,
override it to this folder.


## `disable-gem`

Disables the Gem in your project. When you disable a Gem, this command removes the Gem from the project's `Code/enabled_gems.cmake` file, which removes the Gem as a build and load dependency of your project's **Game Launcher**, the **Editor**, and the **Asset Processor**.

```cmd
usage: o3de.py disable-gem [-h] (-pp PROJECT_PATH | -pn PROJECT_NAME)
                (-gp GEM_PATH | -gn GEM_NAME)
                [-egf ENABLED_GEM_FILE] [-ohf OVERRIDE_HOME_FOLDER]
```

### Usage

```cmd
o3de.bat disable-gem -gp GEM_PATH -pp PROJECT_PATH
```

### Optional Parameters

`-h, --help`
show this help message and exit

`-pp PROJECT_PATH, --project-path PROJECT_PATH`

The path to the project.

`-pn PROJECT_NAME, --project-name PROJECT_NAME`

The name of the project.

`-gp GEM_PATH, --gem-path GEM_PATH`

The path to the gem.

`-gn GEM_NAME, --gem-name GEM_NAME`

The name of the gem.

`-egf ENABLED_GEM_FILE, --enabled-gem-file ENABLED_GEM_FILE`

The cmake enabled gem file in which gem names are to be removed from.If not specified it will assume

`-ohf OVERRIDE_HOME_FOLDER, --override-home-folder OVERRIDE_HOME_FOLDER`

By default the home folder is the user folder, override it to this folder.


<!-- ## edit-project-properties -->


## `sha256`

Creates a *secure hash algorithm* (SHA-256). This command outputs the specified file path and writes the value to the `sha256` field in the specified JSON file. 


```cmd
usage: o3de.py sha256 [-h] -f FILE_PATH [-j JSON_PATH]
```

### Usage

```cmd
o3de.bat sha256 --file-path FILE_PATH --json-path JSON_PATH
```

### Optional Parameters

`-f FILE_PATH, --file-path FILE_PATH`

The path to the file you want to sha256.

`-j JSON_PATH, --json-path JSON_PATH`

optional path to an o3de json file to add the "sha256" element to.

