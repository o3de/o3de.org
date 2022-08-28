---
linkTitle: Developer Guide
title: Settings Registry Developer Guide
description: Explains what the Settings Registry feature of O3DE and how developers can interact with it.
weight: 700
---

The *Settings Registry* acts as a central repository of global settings for all **Open 3D Engine (O3DE)** applications. Settings can be defined, queried, and changed using [JSON Pointer syntax](https://tools.ietf.org/html/rfc6901). The settings registry can read any valid JSON files that have a `.setreg` extension.

The Settings Registry combines multiple JSON values into one document by merging values using either the [JSON Patch](https://tools.ietf.org/html/rfc6902) format or the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) format. This allows overriding values within the settings registry by loading either a `.setreg` file which is merged using the JSON Merge Patch strategy or a `.setregpatch` file which is merged using the JSON Patch strategy.

The Settings Registry can be thought of as a wrapper around a JSON DOM that can query and set values in that DOM using JSON Pointers. Values can be also be queried by visiting a path in the JSON document that can be used to construct objects from the JSON DOM without the need of reflection.

## JSON Patch and JSON Merge Patch

There are two formats for modifying the Settings Registry, [JSON Patch](https://tools.ietf.org/html/rfc6902) and [JSON Merge Patch](https://tools.ietf.org/html/rfc7386).

*JSON Patch* is a format that describes a set of operations to perform to a JSON value at a particular JSON path.

*JSON Merge Patch* is a format that allows specification of a JSON document that is used primarily for modifying JSON objects by merging objects using a simple algorithm. Unlike JSON Patch, it does not specify a set of operations encoded in a JSON document. It acts more as a patch of changes to apply to a JSON value at a particular path. JSON Merge Patch does not specifically allow setting a key value to "null', nor does it allow removing or adding values of a JSON array. The entire array must be replaced.

### `.setreg` example

A `.setreg` file uses the JSON Merge Patch algorithm when it's merged into the Settings Registry. The format is JSON.

**~/.o3de/Registry/sample.setreg**

```json
{
    "Amazon" : {
        "AzCore": {
            "Bootstrap": {
                "project_path": "D:/o3de/AtomSampleViewer"
            }
        }
    }
}
```

### `.setregpatch` example

The `.setregpatch` file uses the JSON Patch algorithm when it's merged into the Settings Registry. The format is JSON, where elements of the JSON array are used to describe a set of patch operations to a JSON document.

**~/.o3de/Registry/sample.setregpatch**

```json
[
    { "op": "replace", "path": "/Amazon/AzCore/Bootstrap/project_path", "value": "D:/o3de/AtomSampleViewer" },
    { "op": "add", "path": "/Amazon/AzCore/Bootstrap/engine_path", "value": "D:/o3de/o3de" },
    { "op": "add", "path": "/Amazon/AzCore/Bootstrap/bin_directories/-", "value": "D:/o3de/AtomSampleViewer/AppendToEndOfJsonArray" },
    { "op": "copy", "from": "/Amazon/AzCore/Bootstrap/bin_directories/0", "path": "Amazon/AzCore/Bootstrap/default_bin_directory" },
    { "op": "move", "from": "/Amazon/AzCore/Bootstrap/windows_assets", "path": "/Amazon/AzCore/Bootstrap/assets" },
    { "op": "remove", "path": "/Amazon/AzCore/Bootstrap/bin_directories/1" }
]
```

## Get started with the Settings Registry

Every O3DE application uses the `AZ::ComponentApplication` class which creates a global Settings Registry for the application. The easiest way to use the Settings Registry is through its Get and Set API (`AZ::SettingsRegistry::Get` and `AZ::SettingsRegistry::Set`). The `Get` and `Set` functions support query and modification of `bool`, `integer`, `double`, and `string` types.

### Use the `Get` function

```c++
auto settingsRegistry = AZ::SettingsRegistry::Get();
AZ::SettingsRegistryInterface::FixedValueString projectName;

if (settingsRegistry && settingsRegistry->Get(projectName, "/Amazon/AzCore/Bootstrap/project_path"))
{
// Do stuff with current Project Path
}
```

### Use the `Set` function

```c++
auto settingsRegistry = AZ::SettingsRegistry::Get();
if (settingsRegistry && settingsRegistry->Set("/Amazon/AzCore/Bootstrap/project_path", "AutomatedTesting"))
{
// Successfully set the Project Path, do other stuff
}
```

## Create a Settings Registry

The creation of an `AZ::ComponentApplication`, or a class derived from it, creates a global Settings Registry. When an instance of the `AZ::ComponentApplication` is created, an `AZ::SettingsRegistryImpl` instance is registered with an `AZ::Interface`. It is accessible by the name `AZ::SettingsRegistry`. For clarity, the default construction of an `AZ::ComponentApplication` is all that is required to create a global Settings Registry. The `AZ::ComponentApplication::Create()` function does *not* need to be called to register a singleton `AZ::SettingsRegistryInterface`.

To create an empty Settings Registry that can be used locally by a Gem or a library, create an instance of the `AZ::SettingsRegistryImpl` class.

### Populate a Settings Registry

Settings are merged into the Settings registry in the following order:

1. First, the global user `~/.o3de/Registry` directory is scanned and its contents are merged into the Settings Registry. The global user `Registry` directory is also merged a second time after all the settings registry paths are merged (Engine, Gems, and Project) to ensure the user settings override all other settings except for command line settings.
2. Next any `--regset`/`--regremove` options specified on the command line are read and merged into the Settings Registry.
3. The `ComponentApplication` then requests that the Settings Registry populates runtime file paths based on the bootstrap settings. The runtime file paths are all located under the JSON path of "/O3DE/Runtime/FilePaths".

The following utility functions help with retrieving important paths and the project name:

* `AZ::Utils::GetEnginePath()` - Queries the absolute path to the engine root.
* `AZ::Utils::GetProjectPath()` - Queries the absolute path to the project root.
* `AZ::Utils::GetProjectName()` - Queries the name of the project as specified in the `<ProjectRoot>/project.json` file.
* `AZ::Utils::GetExecutableDirectory()` - Queries the absolute path to the directory containing the executable.
* `AZ::Utils::GetO3deManifestDirectory()` - Queries the absolute path .o3de directory inside the user home: `~/.o3de`.
* `AZ::Utils::GetGemPath(gemName)` - Queries the absolute path .to the gem whose gem.json "gem_name" entry matches.

### Search locations

The `ComponentApplication` global Settings Registry attempts to load settings registry files in the following order:

1. First, the `~/.o3de/Registry` directory is scanned for global user settings. It is located in the user home directory. By default, this is `C:\Users\<user>\.o3de\Registry` on Windows, `/home/<user>/.o3de/Registry` on Linux, and `/Users/<user>/.o3de/Registry` on Mac
2. Command line options are merged. The command line allows setting a value within the Settings Registry through the following methods:
   * The `--regset` switch by specifying the value as `<path>=<value>`.
   * The `--regset-file` switch allows merging of a `.setreg` file into the settings registry.
   * The `--regremove` switch allows removal of a key in the registry.
    {{< note >}}
        The registry can be dumped stdout using a supplied JSON pointer path via the `--regdump` switch. The entire Settings Registry can be dumped to stdout by using the `--regdumpall` switch.
    {{< /note >}}
3. The `<EngineRoot>/Registry` directory is searched for settings.
4. Each Gem's `<GemRoot>/Registry` directory is searched for settings.
5. The registry directory, `<ProjectRoot>/Registry`, within the Project path is searched for settings.
6. The global user setting registry located at `~/.o3de/Registry` is merged again to make sure the global user settings override any engine, Gem, or project settings.
7. The project specific user directory, `<ProjectRoot>/user/Registry`, is merged. This directory should not be in source control as it is meant to be user specific.
8. Finally the Command Line is merged again by checking for `--regset`, `--regset-file`, and `--regremove` options to override any other settings.

### Launcher search locations

The Project's GameLauncher and ServerLauncher applications have an additional search location of within the Project's Root Cache directory, `<ProjectRoot>/Cache/<platform>`, for an aggregated `bootstrap.*.setreg` file that is generated by **Asset Processor**.

### Settings Registry builder

Asset Processor contains a builder for aggregating all of the settings stored in files as well as the command line into a `bootstrap.game.<config>.setreg` file. The settings are loaded in the following order and merged into a single local Settings Registry which is then serialized out to the `bootstrap.game.\*.setreg` files.

* `<engine-root>/Registry`
* `<gem-root>/Registry` for each Gem loaded within the Asset Processor
* `<project-root>/Registry`
* (Non-Release Only) `<user-home>/.o3de/Registry`
* (Non-Release Only) `<project-root>/user/Registry`
* (Non-Release Only) `--regset`/`--regremove` command line parameters supplied to Asset Processor

For example, on Android the following files are output to the project's asset cache Android directory:

* `bootstrap.game.debug.setreg`
* `bootstrap.game.profile.setreg`
* `bootstrap.game.release.setreg`

When applications load in non-monolithic mode, the `<ExeDirectory>/Registry` is searched for a `cmake_dependencies.*.setreg` that contains the list of Gems to load. For non-host platforms such as Android or iOS where the files are deployed according to a specific layout, the `<ProjectCachePlatformRoot>/Registry` is searched as well. This is explained in more detail below in the [Loading Gems](#loading-gems) section.

{{< note >}}
If the GameLauncher or ServerLauncher application is launched before the Asset Processor has the opportunity to update the `bootstrap.game.<config>.setreg` file, then up-to-date settings might not be available until the next run of the Launcher application.
{{< /note >}}

### Gems outside of `<EngineRoot>/Gems`

The list of Gem root directory paths is populated by CMake when it generates the build files for a platform. Since CMake knows the `CMakeLists.txt` location for each Gem, it's able to generate a `.setreg` file with a list of Gems for each CMake target that sets a "Gem Variant" to load. This done by using the `ly_set_gem_variant_to_load` command. This list includes the filename of the Gem and the relative path to the Gem directory based on the source directory supplied to CMake during configuration.

The benefit of this is that if a Gem is added outside of the `<EngineRoot>` location using the [`cmake add_subdirectory`](https://cmake.org/cmake/help/v3.18/command/add_subdirectory.html) command, then the Settings Registry can load any `.setreg` files within the `<GemRoot>/Registry` directory.

This can be used to include a specific Gem outside of the O3DE `<EngineRoot>` directory, as in the following example:

```cmake
add_subdirectory(<AbsolutePathToMoleculeGem> <AbsolutePathToMoleculeGem>) # This doesn't have to be in the O3DE engine root
add_subdirectory(../<RelativePathToElectronGem> ../<RelativePathToElectronGem>)
```

### Settings Registry key hierarchy

Due to the Settings Registry being backed by a JSON document, it's possible that a path to a JSON value from two separate `.setreg` files could have keys rooted at the same path. Therefore, it's recommended to always prefix any keys within the Settings Registry, particularly keys under "/O3DE" if it is an engine specific setting. Additionally appending the project name, Gem name or library name to the key is also recommended to reduce the changes of collisions between keys (for example, "/O3DE/AzCore/Key1", "/O3DE/Gems/EMotionFX/Key1").

Instead of having settings represented with the hierarchy of the following example:

```json
{
    "useExistingAllocator": false,
    "grabAllMemory": false
}
```

A better approach is to root the settings at a hierarchy such as "/O3DE/AzCore" as in the following example:

```json
{
    "O3DE": {
        "AzCore": {
            "useExistingAllocator": false,
            "grabAllMemory": false
        }
    }
}
```

This can avoid collisions with JSON keys from other libraries or other organizations.

## Settings Registry API

Several APIs are provided for the Settings Registry so that you can query, modify, and merge settings keys and values.  Those APIs are detailed in the [Settings Registry Developer API](./developer-api) document.

| Topic | Description |
| - | - |
| [Settings Registry Developer API](./developer-api) | Learn how interact with the Settings Registry using the C++ API. |

## Setting Registry specializations

Specializations are set of tags that can be used to filter which `.setreg` and `.setregpatch` files to merge from a particular directory. The tags are part of a filename that `*.setreg` files can contain. Not all tags within the tag set are required to be matched as part of the filename, but any parts of the filename which do not match a tag in the specializations object result in a failed match. The following is an example specification of a `.setreg` file:

`<filename stem>.<tag1>.<tag2>...<tagN>.setreg`

A settings registry file with the name of `bootstrap.game.windows.profile.setreg`, has a filename of "bootstrap" and tags of "game", "windows", and "profile". In order to merge the file using the `AZ::SettingsRegistry::MergeSettingsFolder` function, a specializations object with the tags of "game", "windows" and "profile" is needed. That specializations object can have additional tags added to it and i can still merge the `bootstrap.game.windows.profile.setreg` file.

The specializations object can be thought of as an allowlist of `.<tag>` values that can be part of the settings registry file name.

The following example merges a `.setreg` file from the `<ExecutableDirectory>/Registry` directory with using specialization tags:

```c++
SettingsRegistryInterface::Specializations specializations{
     "automatedtesting",
     "automatedtesting_gamelauncher",
     "randomtag"
};
AZ::SettingsRegistryInterface* registry = AZ::SettingsRegistry::Get();
registry->MergeSettingsFolder(AZ::Utils::GetExecutableDirectory() / "Registry", specializations, AZ_TRAIT_OS_PLATFORM_CODENAME);
```

The following table details which types of files will be merged using the preceding example specializations:

| Files in `<ExeDirectory>/Registry`  | Merged by `MergeSettingsFolder` |
| --- | --- |
| `cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg` | **Yes** - contains both the "automatedtesting" and "automatedtesting\_gamelauncher" tags |
| `cmake_dependencies.automatedtesting.setreg` | **Yes** - contains the "automatedtesting" tag |
| `cmake_dependencies.automatedtesting_gamelauncher.setreg` | **Yes** - contains the "automatedtesting\_gamelauncher" tag |
| `cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setregpatch` | **Yes** - contains both the "automatedtesting" and "automatedtesting\_gamelauncher" tags, and `.setregpatch` files can also be merged |
| `cmake_dependencies.automatedtesting.automatedtesting_gamelauncher` | **No** - missing a `.setreg` or `.setregpatch` extension |
| `automatedtesting.cmake_dependencies.setreg` | **No** - "cmake\_dependencies" is not part of the tag set |
| `cmake_dependencies.setreg` | **Yes** - contains no specialization tags |
| `automatedtesting.setreg` | **Yes** - "automatedtesting" is seen as the stem of the filename, not a tag |

## Merge settings files

An alternative to using the specialization system is to merge each file through the `AZ::SettingsRegistryInterface::MergeSettingsFile` function as follows:

1. Use `AZ::IO::SystemFile::FindFiles` to search for `.setreg` and `.setregpatch` files. To gather the files for the specific platform, a second call to `AZ::IO::SystemFile::FindFiles` can be performed by appending the directory of `"Platform" / AZ_TRAIT_OS_PLATFORM_CODENAME` to the directory being searched, for example, `<ExeDirectory>/Registry/Platform/Windows`.
1. Pass each file to `AZ::SettingsRegistryInterface::MergeSettingsFile`.

## Merge Platform Abstraction Layer (PAL) directories

`AZ::SettingsRegistry::MergeSettingsFolder` allows users to supply an optional platform name to indicate an OS platform directory to search for `.setreg` and `.setegpatch` files. This allows merging of platform specific settings by supplying the `platform` parameter. This parameter should be set to an empty string if platform specific settings are not required. To merge platform specific settings for the current OS the [AZ_TRAIT_OS_PLATFORM_CODENAME](https://github.com/o3de/o3de/blob/37b1216015567fb7faa49fe7e3f6f7a73379e06a/Code/Framework/AzCore/Platform/Linux/AzCore/AzCore_Traits_Linux.h#L41) define, which expands to the current platform, can be used.

## Adding specializations from the command line

The Settings Registry supports storing particular specializations to use within the registry itself. The `/Amazon/AzCore/Settings/Specialization/<TagName>` key can be set to true to add the <TagName> specialization to be used when merging files from the Settings Registry. This can be done through the `--regset` command line option.

The following example launches **O3DE Editor** with a custom specialization:

```bash
Editor.exe --project-path=<Path-To-Project> --regset="/Amazon/AzCore/Settings/Specialization/custom=true"
```

{{< note >}}
Specializations in the Settings Registry are case-insensitive.
{{< /note >}}

## Specialization system in depth

The specialization tagging system can be used to filter `.setreg` and `.setregpatch` files by specialization tags. The Settings Registry `MergeSettingsFolder` function accepts a "specializations" parameter which is checked against all tags found within a filename located in the merged directory. If a filename contains a tag that is not supplied as part of the specialization parameter, it will be removed from the list of settings registry files to merge.

Consider the following example of merging hardware settings:

For example Given a set of specializations of \["mobile", "core\_count\_16"\], and a directory with the following settings registry files:

* `hardware_settings.core_count_16.mobile.setreg`
* `hardware_settings.mobile.setreg`
* `hardware_settings.pc.setreg`
* `hardware_settings.core_count_16.pc.setreg`
* `hardware_settings.core_count_4.mobile.setreg`
* `hardware_settings.core_count_16.setreg`
* `Platform/Android/hardware_settings.mobile.setreg`
* `a_hardware_settings.core_count_16.mobile.setreg`

The specialization tags are checked against each of specializations that are part of the file name in the [SettingsRegistryImpl::ExtractFileDescription](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryImpl.h#L113) function. The part of the filename that is a specialization in a `*.setreg` or `*.setregpatch` file is the section after the first \<dot> character and before the extension.

So `<filename stem>.<tag1>.<tag2>.<tag3>.setreg` is an example of a Settings Registry file that with three tags.

Each of tag of a `.setreg` file must match a tag supplied to the specialization structure that gets passed in to the [SettingsRegistryInterface::MergeSettingsFolder](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L357-L375) function.

In this case, the hardware settings are merged from the following files because the specializations parameter contains \["core\_count\_16", "mobile"\]

* `hardware_settings.core_count_16.mobile.setreg`
* `hardware_settings.mobile.setreg`
* `hardware_settings.core_count_16.setreg`
* `Platform/Android/hardware_settings.mobile.setreg`
* `a_hardware_settings.core_count_16.mobile.setreg`

## Merge order

The [SettingsRegistryImpl::IsLessThan](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryImpl.h#L110-L112) function is used to sort the list of settings registry files based on the following rules:

1. The `<filename stem>.<tag1>.<tag2>...<tagN>.setreg` files are sorted based on the lexicographical order of the "\<filename>" portion of the file.
2. Next, for files with the same "\<filename>", the files are sorted by number of tags in ascending order.
3. Next, for files with the same "\<filename>" and the same number of tags, the files are sorted according to the order of the tags in the specialization structure. In the preceding example, since the "core\_count\_16" tag is added before "mobile", the "core\_count\_16" tag sorts before the "mobile" tag.
4. Finally, for files with the same "\<filename>", number and order of tags, if one of the files is located within the platform abstraction layer directory (for example, `"Registry/Platform/Android/hardware_settings.mobile.setreg"`), the platform specific file is sorted after the non-platform specific file.

The following table explains the order the example files are merged:

| Settings Registry file load order | Reason |
| --- | --- |
| `a_hardware_settings.core_count_16.mobile.setreg` | The filename "a\_hardware\_settings" sorts before "hardware\_settings" |
| `hardware_settings.core_count_16.setreg` | The filename "hardware\_settings" matches and contains the same number of tags as the next entry, but this entry tag of "core\_count\_16" was added before "mobile" |
| `hardware_settings.mobile.setreg` | The "mobile" tag was added to the specialization array after the "core\_count\_16" tag |
| `Platform/Android/hardware_settings.mobile.setreg` | The Android platform specific version of "hardware\_settings.mobile.setreg" loads after the non-platform version |
| `hardware_settings.core_count_16.mobile.setreg` | The filename "hardware\_settings" matches the previous 4 entries, but this entry contains two specialization tags instead of the one the previous entries contained |

## Command line support

The are several command line options you can use to query and modify the Settings Registry through a JSON pointer path. This functionality is available in any application that creates a global settings registry through `AZ::ComponentApplication`.

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

The following are the command line options supported by the Settings Registry

| Command Line Option | Description |
| --- | --- |
| `--regset=<JSON pointer path>=<value>` | Sets a value within the Settings Registry at the specified JSON pointer path. `--regset` is evaluated in left-to-right order inline with other `--regset` and `--regremove` options. |
| `--regremove=<JSON pointer path>` | Removes a value form  the Settings Registry at the specified JSON pointer path. `--reremove` is evaluated in left-to-right order inline with other `--regremove` and `--regset` options. |
| `--regdump=<JSON pointer path>` | Recursively dumps a value from the Settings Registry from the specified JSON pointer path to stdout. |
| `--regdumpall` | Dumps the entire JSON document from the Settings Registry to stdout. This is equivalent to passing in the command line of `--regdump=""`. |
| `--regset-file=<file-path>::<JSON anchor path>` | Merges a JSON formatted file into the Settings Registry. Files can be merged under the root ("") key by omitting the JSON anchor path (for example, `--regset-file="Registry/bootstrap.setreg`). Optionally a [JSON pointer path](https://datatracker.ietf.org/doc/html/rfc6901#section-5) can be supplied after the filepath, separated by two colons (`::`). The anchor path represents the JSON object where the settings are anchored.<br><br>**Example:** Merge a JSON file under the "/O3DE/Bootstrap" key<br>`--regset-file="Registry/bootstrap.setregpatch::/O3DE/Bootstrap"`<br>If the file path ends with `.setregpatch`, the file is merged using JSON Patch, otherwise the JSON Merge Patch algorithm is used.<br><br>{{< note >}}This can command supports merging any JSON formatted file. The file extension is only important in determining if the JSON Patch algorithm will be used in the `.setregpatch` case.{{< /note >}} |

### Command line evaluation

The `--regset`, `--regset-file` and `--regremove` options are evaluated in left-to-right order.
This is relevant when the same options have been supplied on the command line multiple times or when a setting is both removed and set.

| Command line options | Evaluation Result |
| --- | --- |
| `Editor.exe --regset="/My/Setting/value=false" --regset="/My/Setting/value=true"`| The "/My/Setting/value" field will be set to `true` as the last option wins. |
| `Editor.exe --regset="/My/Setting/value=false" --regremove="/My/Setting/value"`| The Settings Registry will not have a "/My/Setting/value" field due to `--regremove` as the last option. |
| `Editor.exe --regremove="/My/Setting/value" --regset="/My/Setting/value=true"`| The Settings Registry will have a "/My/Setting/value" field that is set to `true` due to `--regset` as the last option. |

### Using `--regset`

The Project Path can be read from any `.setrreg` file or from the command line via the "/Amazon/AzCore/Bootstrap/project\_path" entry. It's preferable set on a per user basis using the global user registry location in the user's `~/.o3de/Registry` directory.

After the Settings Registry merges in the settings registry files from the user's global registry, it then checks the command line for all `--regset` options and merges each `<JSON pointer path, value>` pair into the Settings Registry as in the following example:

```bash
# Override the Project via "project_path" value in the Settings Registry
# The SerializeContextTools will load up the Gems needed to run the project located at <EngineRoot>/AutomatedTesting
SerializeContextTools.exe --regset="/Amazon/AzCore/Bootstrap/project_path=AutomatedTesting" convert -files=AutomatedTesting/project.physicsconfiguration -ext=physics.setreg
```

### Using `--regdump`

You can specify the `--regdump` option without a JSON pointer path to dump the entire Settings Registry to stdout. In the following example, the JSON pointer path "/Amazon/AzCore/Bootstrap" recursively dumps the Settings Registry keys and values beneath "/Amazon/AzCore/Bootstrap".

```bash
# Dumps all the values underneath the "/Amazon/AzCore/Bootstrap" to stdout
Editor.exe --regdump="/Amazon/AzCore/Bootstrap"
```

## Convert `.ini` files to JSON

To help convert Windows style `.ini` settings for use in the Settings Registry, the `SerializeContextTools` exposes a "convert-ini" option that can accept one or more `.ini` style files and convert them to `.setreg` files that can be loaded in the Settings Registry. The following example demonstrates conversion of the `AssetProcessorPlatformConfig.ini` and the `user.cfg` to a `.setreg` file.

**convert-ini**

```bash
<CMakeBinaryDir>/bin/profile/SerializeContextTools.exe convert-ini --files AssetProcessorPlatformConfig.ini;user.cfg --ext setreg --json-prefix="/O3DE/Settings"
```

## MSVC debugging

The Settings Registry maintains its settings in a `rapidjson::Document` that is a member variable in `AZ::SettingsRegistryImpl`.

The rapidjson 3rdParty provides a Native Visualizer (`.natvis`) file for the MSVC debugger which makes it easy to recurse through `rapidjson::Value` and `rapidjson::Document` instances. This `.natvis` file is part of `AzCore` and can be visualized in Visual Studio. Expanding `AZ::SettingsRegistryImpl::m_settings` provides a view of the values within the Settings Registry. This allows for drilling down to a particular JSON entry within the Settings Registry to determine if an entry exists, and its value.
