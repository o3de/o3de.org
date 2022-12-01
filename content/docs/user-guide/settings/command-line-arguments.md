---
title: Command Line Arguments and the Settings Registry
linkTitle: Command Line Arguments
description: Learn how to modify settings through command line arguments and access command line arguments stored in the Settings Registry in Open 3D Engine (O3DE).
weight: 200
---

You can edit the Settings Registry in Open 3D Engine (O3DE) with command line arguments. Command line arguments are stored in the Settings Registry. Functions to store and retrieve command line arguments are in the `SettingsRegistryMergeUtilities` API.

## Override settings with `--regset`

Most commonly, command line arguments are used to set values in the Settings Registry. Any Settings Registry value can be overridden by specifying the JSON pointer path and the new value to set with the `--regset` option. In the following example, when **O3DE Editor** is launched, the project path is overridden and set to `AutomatedTesting`:

```bash
${CMAKE_BINARY_DIR}/bin/profile/Editor.exe --regset="/Amazon/AzCore/Bootstrap/project_path=AutomatedTesting"
```

## Command line support

The are several command line options you can use to query and modify the Settings Registry through a JSON pointer path. This functionality is available in any application that creates a global Settings Registry through `AZ::ComponentApplication`.

The following applications support Settings Registry command line options:

* **MaterialEditor**
* **AssetProcessor**
* **AssetProcessorBatch**
* **AssetBuilder**
* **AssetBundler**
* **Editor**
* **${project}.GameLauncher**
* **${project}.ServerLauncher**
* **SerializeContextTools**
* **SharedManagementConsole**
* **PythonBindingsExample**

Settings Registry supports the following command line options.

| Command Line Option | Description |
| --- | --- |
| `--regset="<JSON pointer path>=<value>"` | Sets a value within the Settings Registry at the specified JSON pointer path. `--regset` is evaluated in left-to-right order inline with other `--regset` and `--regremove` options. |
| `--regremove="<JSON pointer path>"` | Removes a value from the Settings Registry at the specified JSON pointer path. `--regremove` is evaluated in left-to-right order inline with other `--regremove` and `--regset` options. |
| `--regdump="<JSON pointer path>"` | Recursively dumps a value from the Settings Registry from the specified JSON pointer path to stdout. |
| `--regdumpall` | Dumps the entire JSON document from the Settings Registry to stdout. This is equivalent to passing in the command line of `--regdump=""`. |
| `--regset-file="<file-path>::<JSON anchor path>"` | Merges a JSON formatted file into the Settings Registry. Files can be merged under the root empty string("") key by omitting the JSON anchor path (for example, `--regset-file="Registry/bootstrap.setreg"`). Optionally a [JSON pointer path](https://datatracker.ietf.org/doc/html/rfc6901#section-5) can be supplied after the filepath, separated by two colons (`::`). The anchor path represents the JSON object where the settings are anchored.<br><br>**Example:** Merge a JSON file under the "/O3DE/Bootstrap" key<br>`--regset-file="Registry/bootstrap.setregpatch::/O3DE/Bootstrap"`<br>If the file path ends with `.setregpatch`, the file is merged using JSON Patch, otherwise, the JSON Merge Patch algorithm is used.<br><br>{{< note >}}This command supports merging any JSON formatted file. The file extension is only important in determining if the JSON Patch algorithm will be used in the `.setregpatch` case.{{< /note >}} |

### Command line evaluation

The `--regset`, `--regset-file` and `--regremove` options are evaluated in left-to-right order.
This is relevant when the same options have been supplied on the command line multiple times or when a setting is both removed and set.

| Command line options | Evaluation Result |
| --- | --- |
| `Editor.exe --regset="/My/Setting/value=false" --regset="/My/Setting/value=true"`| The "/My/Setting/value" field will be set to `true` as the last option wins. |
| `Editor.exe --regset="/My/Setting/value=false" --regremove="/My/Setting/value"`| The Settings Registry will not have a "/My/Setting/value" field due to `--regremove` as the last option. |
| `Editor.exe --regremove="/My/Setting/value" --regset="/My/Setting/value=true"`| The Settings Registry will have a "/My/Setting/value" field that is set to `true` due to `--regset` as the last option. |
| `Editor.exe --regdump="/My/Setting" --regdump="/Your/Setting"`| The values of the "/My/Setting" field and the "/Your/Setting" field will both be output. |


## Command line storage

The command line that launched the application is parsed into *optional* and *positional* arguments. Then they are stored in the Settings Registry as part of `ComponentApplication` initialization.

Optional arguments have an option name associated with them. In the optional argument, `--project-path /path/to/project/root`, the option is `project-path` and the value is `/path/to/project/root`. If multiple values are associated with a single option, the values are stored in an array. Optional arguments are stored in the "/O3DE/Runtime/CommandLine/Switches" JSON pointer path.

Positional arguments don't include an option name (or key) and are parsed based on their position in the command line. Positional arguments are stored in the "/O3DE/Runtime/CommandLine/MiscValues" JSON pointer path.

## `SettingsRegistryMergeUtilities` API

`SettingsRegistryMergeUtilities` provides the functions `StoreCommandLineToRegistry` and `GetCommandLineFromRegistry`. These functions can be used to cache and retrieve the command line arguments supplied to O3DE applications.

```c++
//! Stores the command line settings into the Setting Registry
//! The arguments can be used later anywhere the command line is needed
void StoreCommandLineToRegistry(SettingsRegistryInterface& registry, const AZ::CommandLine& commandLine);

//! Query the command line settings from the Setting Registry and stores them
//! into the AZ::CommandLine instance
bool GetCommandLineFromRegistry(SettingsRegistryInterface& registry, AZ::CommandLine& commandLine);
```

Refer to: [SettingsRegistryMergeUtils.h](https://github.com/o3de/o3de/blob/development/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L265-L271)
