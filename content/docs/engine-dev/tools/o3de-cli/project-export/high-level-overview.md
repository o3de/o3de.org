---
linkTitle: Overview
title: Project Export Overview
description: High Level Developer Overview for the Project Export command.
---

## Motivation

Before the 23.10 release of O3DE, exporting game projects for sharing was a very difficult task for new users. There was a lot of cognitive burden to keep track of the tools required to process the game, requiring interaction with multiple independent parts (i.e. CMake, AssetProcessor, AssetBundler, etc.). For experienced users, there was also a lack of unified automation for the most common tasks.

This caused the export experience to be highly error prone. 

To put this in perspective, back in Q4 2022, an engineer took 1 week to manually package the Newspaper Delivery Game demo project. The same process with the Project Export command takes 2-15 minutes.

The Project Export command also follows the spirit of modularity found in other parts of the O3DE ecosystem, as diverse needs grow overtime in the open source ecosystem.

## Command Setup
The `export-project` command has the following setup:

![Project Export CLI setup](/images/engine-dev/o3de-cli/project-export/project-export-cli-setup.png)

The central driver of the command is the Export Script. In O3DE, the Export Script is simply any Python script that the user wishes to run using the O3DE Python CLI.

The way this works is that O3DE CLI (`o3de.bat` on Windows or `o3de.sh` on Linux) [invokes](https://github.com/o3de/o3de/blob/development/scripts/o3de.py#L107-L108) the `export-project` [sub-command argument](https://github.com/o3de/o3de/blob/development/scripts/o3de.py#L79) via a specified [entry-hook](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L484). This system heavily relies on the `argparse` standard library to configure the expected function for the parsed command in a modular fashion.

Note that `export-project` only partially parses arguments. This is because the remaining arguments are fed through to the main Export Script when it runs, which will have its own argument parsing logic.

## Execution Path
The entry function is called [`_run_export_script`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L367), and is structured to start the setup of the export process in the following layers:

##### Layer 1: **`_run_export_script`**  
Enables logging and feeds the user arguments into the export system.
##### Layer 2: **[`_export_script`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L307)** 
Validates the user supplied export script and project path, and determine the locations of each (if the user supplied a relative path). In some cases, this layer will check to see if the user asked for the O3DE standard export scripts. 

If anything went wrong in validation, this layer halts. Otherwise it constructs an [O3DE Context](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L112) object and proceeds to the next layer.
##### Layer 3: **[`execute_python_script`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L235)** 
Runs the main Export Script supplied by the user. It first modifies the session's system path using [prepend_to_system_path](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/utils.py#L154) to include directories for the O3DE CLI folder, as well as the folder of the user's Export Script. This allows users to easily import the API functionality using nothing more than `import o3de`. From here, the fourth layer actually executes the script.

`execute_python_script` is one of the APIs readily available for custom use with any export script. 

##### Layer 4: **[load_and_execute_script](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/utils.py#L167)**
This function uses Python's `importlib` functionality to load external scripts. It also uses `setattr` to inject the script module with the O3DE Context that was created at layer 2. This allows for seamless usage of O3DE export data as the script runs.

Execution of these four layers will successfully load and run the user's Export Script, setting it up with a built-in O3DE context, and the necessary path environment to natively use O3DE Python API.

## Standard Export Script

Although each standard export script that O3DE supplies has platform specific considerations, they all follow a similar pattern. For this overview, we will look at the [PC Export Script](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py).

This export script includes an [entry point](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L424-L446) that will only run if the script is fed through the `export-project` command, due to the requirement of the `o3de_context` being defined.

Along with this, the following top-level functions are defined: [`export_standalone_parse_args`](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L224), [`export_standalone_run_command`](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L336), and [`export_standalone_project`](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L24).

These functions are defined as top level APIs so that other systems can utilize the export script's functionality as an external module with custom parameters.

`export_standalone_parse_args` utilizes the [O3DE Configuration system](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/command_utils.py#L133) along with `argparse` to determine the appropriate configuration of settings for the particular export task that the user is requesting. The [`export_utility`](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_utility.py) contains the function `create_common_export_params_and_config` for defining the common argument parameters that all O3DE projects will have across platforms. All other PC specific parameters (e.g. Server or Client, archive format, OS platform, files to copy, etc.) are handled directly in `export_standalone_parse_args`.

`export_standalone_run_command` takes the arguments previously specified, validates them, and assuming everything is correct, proceeds to call the `export_standalone_project`.

`export_standalone_project` is the workhorse responsible for preparing the project as a game for PC. These are the main steps in this process: 
1. Determine Engine type (source built or SDK installed), validate paths and arguments, and determine levels and seedlists to package. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L84-L128)
1. Determine whether to build the toolchain or not. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L133-L141)
1. Prepare and bundle assets. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L144-L156)
1. Build the target executables of the game. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L159-L178)
1. Prepare export package output directory layout. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L181-L208)
1. Copy all relevant files there. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/ExportScripts/export_source_built_project.py#L211-L221)


## APIs
Here is a breakdown of some of the APIs that build up the rest of the system:

##### **[`process_command`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L235)** 
This runs an instance of the [`CLICommand`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/utils.py#L68) object with the supplied arguments and working directory. This effectively calls `subprocess.Popen`, and wraps all CLI related execution into a [`busy loop`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/utils.py#L110-L116) until the process is done. It also wraps all stdout and stderr logs and feeds it forward to the Export Script so that the user sees all logs as the command proceeds.

Wrapping the subprocess in this manner allows us to [clean up](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/utils.py#L118-L124) and safely terminate all processes invoked.


##### **[`build_assets`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L583)** 
This first calculates the path of the `AssetProcessorBatch` executable, based on whether O3DE is a source built or SDK installed engine. Based on that `process_command` is used to run the batch tool with arguments for the project, and with selected platform.

##### **[`bundle_assets`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L797)** 
This calculates the path of the `AssetBundlerBatch` executable, along with setting up the relevant folders for bundling. Then it iterates over every desired platform, and does the following:
1. Create the asset list file for the game for the platform. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L844)
2. Create the asset list file for the engine for the platform. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L855)
3. Using the asset list from step 1, create the bundle pak file for the game. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L868)
4. Using the asset list from step 2, create the bundle pak file for the engine. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L880)

##### **[`build_game_target`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L704)** 
Based on the type of game launcher, and whether or not the game is monolithic, and the project is engine centric, this function builds up the relevant CMake arguments, and passes along additional CMake arguments the user specified when invoking `export-project`. From there the [configure](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L765) command is run, followed by the [build](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L790) command.


##### **[`setup_launcher_layout_directory`](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L704)** 

Setting up the export layout directory takes the following steps:
1. Reset the directory folder structure, and clear old files. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L934-L939)
2. Copy all bundles and configuration files that are not ignored. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L943-L959)
3. Copy files from any additional file patterns the user specified. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L961-L963)
4. If we are using profile mode, add an additional setregpatch file to run standalone without the AssetProcessor. [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L968-L975)
5. If user specified, archive the layout directory (for example as a zip file). [code](https://github.com/o3de/o3de/blob/development/scripts/o3de/o3de/export_project.py#L978-L982)
