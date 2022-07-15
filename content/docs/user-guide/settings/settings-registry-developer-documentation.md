---
linktitle: Settings Registry Developer Guide
title: Settings Registry Developer Guide
description: Explains what the Settings Registry feature of O3DE and how developers can interact with it.
weight: 400
---

* [Overview - What is the Settings Registry?](#WhatIsTheSettingsRegistry)
  * [JSON Patch/Merge Patch Primer](#JSONPatchPrimer)
* [Quick Start - Settings Registry](#QuickStartSettingsRegistry)
* [Settings Registry - Sample Files](#SettingsRegistrySampleFiles)
* [Setting up a Settings Registry](#setting-up-a-settings-registry)
  * [Settings Registry Creation](#SettingsRegistryCreation)
    * [Setreg Search Paths](#SettingsRegistrySearchPathNonGame)
  * [GameLauncher/ServerLauncher search locations for Settings Registry files](SettingsRegistrySearchPathLauncher)
  * [AssetProcessor SettingsRegistryBuilder](#SettingsRegistryAssetBuilder)
  * [Gems May Reside anywhere on the Filesystem](#GemExistence)
  * [Settings Registry Key Hierarchy Recommendation](#settings-registry-key-hierarchy-recommendation)
* [Settings Registry API](#settings-registry-api)
  * [Value Query APIs](#value-query-apis)
    * [Query Based API](#query-based-api)
    * [Ex. Querying for builtin Setting types](#query-api-builtin-json-types)
    * [How to Load C++ Class Objects using the Settings Registry query API](#how-to-load-c-class-objects-using-the-settings-registry-query-api)
    * [Visitor Based API](#visitor-based-api)
    * [Ex. Querying Active Gem Information](#querying-active-gem-info-o3degems)
  * [Value Setter API](#value-setter-api)
    * [Store a builtin Settings type to the Settings Registry(bool, AZ::s64/AZ::u64, double, string\_view)](#store-builtin-settings-type-to-the-settings-registry)
    * [Store a C++ Class Object to the Settings Registry using the SettingsRegistryInterface::SetObject function](#store-a-c-class-object-to-the-settings-registry-using-the-settingsregistryinterfacesetobject-function)
  * [Value Notification API](#value-notification-api)
    * [Logging each time the Asset Cache Folder has been updated in the SettingsRegistry](#logging-each-time-the-asset-cache-folder-has-been-updated-in-the-settingsregistry)
  * [Merge API](#merge-api)
    * [Merging settings registry files within both the executable directory and the asset cache root directory](#merging-settings-registry-files-within-both-the-executable-directory-and-the-asset-cache-root-directory)
* [Auxiliary API - Settings Registry Merge Utilities](#auxiliary-api-merge-utils)
  * [Settings Registry Merge Utils Merge API](#settings-registry-merge-utils-merge-api)
  * [Settings Registry Merge Utils Specialization API](#settings-registry-merge-utils-specialization-api)
  * [Settings Registry Merge Utils Value Dumper API](#settings-registry-merge-utils-value-dumper-api)
  * [Settings Registry Manifest Visit Utils API](#settings-registry-manifest-visit-utils-api)
* [Setting Registry Specializations - Folder Merging](#setting-registry-specializations-folder-merging)
    * [Ex. Loading \*.setreg files using Specialization Tags](#loading-setreg-using-specialization)
  * [Adding Specializations via the Command Line](#adding-specializations-via-the-command-line)
    * [Ex. Running the Editor with a custom specialization](#running-the-editor-with-custom-specialization)
  * [Settings Registry Specialization System: MergeSettingsFolder()  - In-Depth Explanation](#settings-registry-specialization-system-in-depth)
* [Settings Registry - Command Line Support](#settings-registry-command-line-support)
  * [Command Line option order evaluation](#cli-option-order-evaluation)
  * [Ex. Using "--regset" to set override the Project Path](#regset-cli-example)
  * [Ex. Using "--regdump" to dump the JSON object containing the bootstrap settings to stdout](#regdump-cli-example)
* [Loading Gems through the Settings Registry](#loading-gems-through-the-settings-registry)
  * [Ex. Automatically loading the list of gem build dependencies for an Application](#automatic-gem-dependency-loading)
    * [CMakeLists.txt (Voxel Editor)](#cmakeliststxt-voxel-editor)
    * [CMakeLists.txt (AtomBridge)](#cmakeliststxt-atombridge)
    * [cmake\_dependencies.voxeleditor.setreg (Voxel Editor)](#cmake-dependencies-voxel-editor)
    * [CMakeLists.txt (AtomTest)](#cmakeliststxt-atom-test-project-gem)
  * [Platform Gem Loading](#platform-gem-loading)
* [Explicit Gem Activation](#explicit-gem-activation)
  * [Ex. Activating a Gem for the AutomatedTesting Project ](#gem-dependency-automatedtesting)
  * [Disable Autoloading of Gem Modules](#disable-autoloading-of-gem-modules)
    * [Ex. Disabling specific Gem modules from autoloading when activated as part of the AutomatedTesting Project](#disable-autoloading-of-chatplay-module)
    * [Disable Autoloading for a user](#disable-autoloading-at-the-user-level)
    * [Disable Autoloading for a project](#disable-autoloading-at-the-project-level)
    * [Disable Autoloading for a platform](#disable-autoloading-at-the-platform-level)
  * [How to Load Gems in C++](#advanced-topic-load-gems-in-cpp)
* [Add AssetProcessor Scan Folder for Gems using the Settings Registry](#assetprocessor-scan-folder-support)
  * [Gem Asset Scan Folders](#gem-asset-scan-folders)
    * [assetprocessor\_settings.setreg](#assetprocessorsettings-setreg)
* [Convert Windows Style INI file to JSON format](#convert-windows-style-ini-file-to-json-format)
* [Settings Registry - Debugging](#settings-registry-debugging)
  * [MSVC Debugging](#msvc-debugging)



<a id="WhatIsTheSettingsRegistry"></a>
# Overview - What is the Settings Registry?

The settings registry is a feature within AzCore that allows querying a json document using JSON [Pointer](https://tools.ietf.org/html/rfc6901) syntax.
It acts as a central repository of global settings within all Applications that uses it in O3DE.
The settings registry can read any valid json files which contain the .setreg extension. The json files do not have to following any specific format.
The settings registry combines multiple json values into one document by merging json values using either the [JSON Patch](https://tools.ietf.org/html/rfc6902) format or the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) format.
This allows overriding values within the settings registry by loading either a .setreg file which is merged using the JSON Merge Patch strategy or a .setregpatch file which is merged using the Json Patch strategy.
In simple terms the Settings Registry can be thought of a wrapper around a JSON DOM that can query and set values within that DOM using JSON Pointer.
Values can be also be queried by visiting a path within the JSON document which can be used to construct objects from the JSON DOM without the need of reflection.

<a id="JSONPatchPrimer"></a>
## JSON Patch/Merge Patch Primer
---

For quick reference JSON Patch is a format than which describes a set of operations to perform to a json value at a particular json path.
JSON Merge Patch is a format that allows specification of a json document that is used primarily for modifying JSON objects by merging objects using a simple algorithm.
Unlike JSON Patch it does not specify a set of operations encoded in a json document. It act more as a "patch" of changes to apply to a json value at a particular path.
Furthermore JSON Merge Patch does not specifically allow setting a key value to "null', nor does it allow removing/adding values of a JSON array. The entire array must be replaced.

<a id="QuickStartSettingsRegistry"></a>
# Quick Start - Settings Registry

The easiest way to use the Settings Registry is through the Get and Set API of the Settings Registry Interface.
When a Component Application is created, there will be a global settings registry accessible via `AZ::SettingsRegistry::Get`
The Get and Set functions of the Settings Registry Interface supports querying and modifications of simple primative types. Those types are `bool`, `integer`, `double` and `string`.

**Retrieving a value from the Global Settings Registry can be done using the Get functions**

```c++
auto settingsRegistry = AZ::SettingsRegistry::Get();
AZ::SettingsRegistryInterface::FixedValueString projectName;

if (settingsRegistry && settingsRegistry->Get(projectName, "/Amazon/AzCore/Bootstrap/project_path"))
{
// Do stuff with current Project Path
}
```

**Setting a value into the global settings registry can done using the Set functions**

```c++
auto settingsRegistry = AZ::SettingsRegistry::Get();
if (settingsRegistry && settingsRegistry->Set("/Amazon/AzCore/Bootstrap/project_path", "AutomatedTesting"))
{
// Successfully set the Project Path, do other stuff
}
```

<a id="SettingsRegistrySampleFiles"></a>
## Settings Registry - Sample Files
---

The following files are used illustrate the difference between a \*.setreg and a \*.setregpatch file as well to provide uses a sample of how one of these files looks

*   First is a setreg file, which uses the JSON Merge Patch algorithm when merging files into the Settings Registry.
    The format of the file is as if using regular JSON document

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

*   The alternative is a setregpatch file, which use the [JSON Patch](https://tools.ietf.org/html/rfc6902) algorithm when merging files into the Settings Registry
    The format is regular JSON, where elements of the JSON array are used to describe a set of patch operations to a JSON document

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


# Setting up a Settings Registry

The simplest way to create a settings registry is to create an instance of the `AZ::SettingsRegistryImpl` class.
That by creates an empty settings registry that can be used locally by a library or gem.

Now the method to creating a global settings involves creation of an AZ::ComponentApplication(or a class derived from it).
Creating an instance of the AZ::ComponentApplication creates a AZ::SettingsRegistryImpl instance that gets registry with an AZ::Interface that is accessible via the name of "AZ::SettingsRegistry".

Next it scans the global user ~/.o3de/Registry folder and populates it's contents into the Settings Registry.
The global user registry folder is also merged a second time after all the settings registry paths are merged(Engine, Gems, Project,) to make sure the user settings overrides all other settings except for command line settings.
Next any --regset/-regremove options specified on the command line are read and merged into the Settings Registry
The ComponentApplication then request that the settings registry populates runtime file paths based on the bootstrap settings.
The runtime file paths are all located under the json path of "/O3DE/Runtime/FilePaths"
There are a couple of Utility functions to help with retrieving important paths and the project name

*   AZ::Utils::GetEnginePath() - Queries the absolute path to the engine root
*   AZ::Utils::GetProjectPath() - Queries the absolute path to the project root
*   AZ::Utils::GetProjectName() - Queires the name of the project as specified in the `<ProjectRoot>/project.json` file
*   AZ::Utils::GetExecutableDirectory() - Queries the absolute path to the directory containing the executable
*   AZ::Utils::GetO3deManifestDirectory() - Queries the absolute path .o3de directory inside the user home: `~/.o3de`


<a id="SettingsRegistryCreation"></a>
## Settings Registry Creation
---

To clarify, default construction of an AZ::ComponentApplication is enough to create a settings registry. The AZ::ComponentApplication::Create() function does NOT need to be called for to register a singleton AZ::SettingsRegistryInterface.

<a id="SettingsRegistrySearchPathNonGame"></a>
### Default .setreg/.setregpatch search locations
---

The ComponentApplication global SettingsRegistry attempts to load settings registry files within the following paths by default.

1.  The `~/.o3de/Registry` folder is scanned for global user settings.
    It is located in the user home directory.
    Normally this is `C:\Users\<user>\.o3de\Registry` on Windows, `/home/<user>/.o3de/Registry` on Linux and `/Users/<user>/.o3de/Registry` on Mac
2.  The Command Line allows setting a value within the Settings Registry via
    1.  The "--regset" switch by specifying the value as \<path>=\<value>.
    2.  The "--regset-file" switch allows merging of a .setreg file into the settings registry
    3.  The "--regremove" switch allows removal of a key in the registry.
    4.  The registry can be dumped using a supplied json pointer path via the "--regdump" switch to stdout.
    5.  Finally the entire Settings Registry can be dumped to stdout is supported by using the "--regdumpall" switch.
        More Information can be found in the [Command Option API](#CommandLineAPI)
3.  The `<EngineRoot>/Registry` folder is searched for settings.
4.  Next each gem's `<GemRoot>/Registry` folder is searched for settings.
5.  A registry folder within the Project path is searched for settings next: `<ProjectRoot>/Registry`
6.  Afterwards the global user setting registry located at `~/.o3de/Registry` is merged again to make sure the global user settings override any engine, gem or project settings
7.  Next the user specific per project `<ProjectRoot>/user/Registry` folder is merge. This folder should not be in source control as it is meant to be user specific
8.  Finally the Command Line is merged again by checking for "--regset", "--regset-file" and "--regremove" options to override any other settings


<a id="SettingsRegistrySearchPathLauncher"></a>
### GameLauncher/ServerLauncher search locations for Settings Registry files
---

The Project's GameLauncher and ServerLauncher applications have an additional search location of within the Project's Root Cache directory(`<ProjectRoot>/Cache/<platform>`) for an aggregated `bootstrap.*.setreg` file that is generated by the AssetProcessor.

<a id=SettingsRegistryAssetBuilder></a>
### AssetProcessor SettingsRegistryBuilder
---

The AssetProcessor contains a builder for aggregating all of the settings from the following locations as well as the command line that was supplied to the invocation of the AssetProcessor into a `bootstrap.game.<config>.setreg` file

The settings are loaded in the following order and merged into a single local Settings Registry which is then serialized out to the bootstrap.game.\*.setreg files

*   `<engine-root>/Registry`
*   `<gem-root>/Registry` for each gem loaded within the AP
*   `<project-root>/Registry`
*   (Non-Release Only) `<user-home>/.o3de/Registry`
*   (Non-Release Only) `<project-root>/user/Registry`
*   (Non-Release Only) `--regset`/`--regremove` command line parameters supplied to the AssetProcessor

For example on android the following files will be output to the project's asset cache android folder

*   bootstrap.game.debug.setreg
*   bootstrap.game.profile.setreg
*   bootstrap.game.release.setreg


When loading applications in non-monolithic mode, the `<ExeDirectory>/Registry` is searched for a cmake\_dependencies.\*.setreg which contains the list of gems to load. For non-host platforms such as Android or iOS where the files are deployed according to a specific layout, the `<ProjectCachePlatformRoot>/Registry` is searched as well. This is explained in more detail below in the Loading Gems section.

---
**NOTE**: Stale Settings Troubleshooting

If the GameLauncher or ServerLauncher application is launched before the Asset Processor has the opportunity to update the `bootstrap.game.<config>.setreg` file, then  up-to-date settings might not load until until the next run of the launchers.
---

<a id="GemExistence"></a>
### Gems may exist outside of `<EngineRoot>/Gems` folder

The list of gem root folder paths are populated via CMake when it generates the build files for a platform.

Since CMake knows the CMakeLists.txt location for each gem, it's able generate a .setreg file with a list of gems for each CMake targets that sets a "Gem Variant" to load. This done by using the `ly_set_gem_variant_to_load` command.
This list includes the filename of the gem and the relative path to the gem directory based on the source directory supplied to CMake during configuration.

The big benefit of this is that if a gem is added outside of the `<EngineRoot>` location using the cmake [add\_subdirectory](https://cmake.org/cmake/help/v3.18/command/add_subdirectory.html) command, the settings registry will still be able to load any .setreg files within the `<GemRoot>/Registry` directory.

This can for example be used to include a specific gem outside of the O3DE `<EngineRoot>` folder.

```cmake
add_subdirectory(<AbsolutePathToMoleculeGem> <AbsolutePathToMoleculeGem>) # This doesn't have to be in the O3DE engine root
add_subdirectory(../<RelativePathToElectronGem> ../<RelativePathToelectronGem>)
```

## Settings Registry Key Hierarchy Recommendation
---

Due to the Settings Registry being backed by a JSON document, there is a high possibility that a path to a json value from two separate .setreg files could have keys rooted at the same path.
Therefore it is recommended to always prefix any keys within the SettingsRegistry with at the very least under ("/O3DE") if it is an engine specific setting. Going further and appending the project name, gem name or library name to the key is also recommended to reduce the changes of collisions(i.e "/O3DE/AzCore/Key1", "/O3DE/Gems/EMotionFX/Key1")

So instead of having settings represented with the hierarchy of the following

```json
{
    "useExistingAllocator": false,
    "grabAllMemory": false
}
```

A better approach would be to root the settings at a hierarchy such as "/O3DE/AzCore"

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

This helps avoid collisions with JSON keys from other libraries or other organizations.

# Settings Registry API

## Value Query APIs
---

The settings registry supports two APIs for querying data.

### [Query Based API](#query-based-api)

The first API is a getter based one, that supports directly querying the types of `bool`, `int64_t`, `double`, `AZStd::string`, `AZStd::fixed_string` and any object reflected to the SerializeContext.

The getter method of querying objects from the SerializeContext is safe to use, but it should be seen as an implementation detail of the SettingsRegistry.

The SettingsRegistryInterface GetObject interface will remain stable, but no assumptions should be made on how Objects are serialized under the hood.

[Getter API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L224-L260):

<a id="query-api-builtin-json-types"></a>
### Example of query API for builtin Settings types(`bool`, `AZ::s64`, `AZ::u64` `double`, `(fixed_)string`)
---

```c++
// Setting FileIOBase alias based on values within the settings registry
using FixedValueString = AZ::SettingsRegistryInterface::FixedValueString
if (FixedValueString pathAlias;
     m_settingsRegistry->Get(pathAlias, AZ::SettingsRegistryMergeUtils::FilePathKey_CacheRootFolder))
{
    fileIoBase->SetAlias("@products@", pathAlias.c_str());
}
if (AZStd::string pathAlias;
     m_settingsRegistry->Get(pathAlias, AZ::SettingsRegistryMergeUtils::FilePathKey_ProjectPath))
{
    fileIoBase->SetAlias("@projectroot@", pathAlias.c_str());
}

if (AZ::s64 intValue;
    m_settingsRegistry->Get(pathAlias, "/O3DE/Int64Value"))
{
    // Do stuff with int value
}

```

### [How to Load C++ Class Objects using the Settings Registry query API](#how-to-load-c-class-objects-using-the-settings-registry-query-api)

In order to load C++ Class Objects using the SettingsRegistry, the type itself must be reflected to the SerializeContext in order to use the query API.

In this case instead of calling the `SettingsRegistryInterface::Get` method for querying builtin JSON types, the `SettingsRegistry::GetObject` function would be used instead

The following snippet shows how to use the `SettingsRegistryInterface::GetObject` function to load the SettingsRegistry into a AzPhysics::SceneConfiguration

```c++
// Make sure the AzPhysics::SceneConfiguration class is reflected
void SceneConfiguration::Reflect(AZ::ReflectContext* context)
{
    Physics::WorldConfiguration::Reflect(context);

    if (auto* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
    {
        serializeContext->Class<SceneConfiguration>()
            ->Version(1)
            ->Field("LegacyConfig", &SceneConfiguration::m_legacyConfiguration)
            ->Field("LegacyId", &SceneConfiguration::m_legacyId)
            ->Field("Name", &SceneConfiguration::m_sceneName)
            ;
    }
}

// ... Later on the SceneConfiguration class can be loaded from the SettingsRegistry using the `GetObject` function
AzPhysics::SceneConfiguration sceneConfig;
bool configurationRead = false;

AZ::SettingsRegistryInterface* settingsRegistry = AZ::SettingsRegistry::Get();
if (settingsRegistry)
{
    configurationRead = settingsRegistry->GetObject(sceneConfig, "/Amazon/Gems/PhysX/DefaultSceneConfiguration");
}
```

### [Visitor Based API](#visitor-based-api)
---

The visitor API is the allows querying settings objects. It supports recursively visiting the JSON object and array children starting at a specified json pointer.

A visitor for the settings registry must implement the `AZ::SettingsRegistryInterface::Visitor` class.

An instance of that class can be supplied to the `AZ::SettingsRegistryInterface::Visit()` method.

The visitor is recommended when serializing in/out complex objects that don't have any SerializeContext reflection.
Since it isn't tied to the SerializeContext the same logic could be used to read objects from the SettingsRegistry using the JSON facilities available within other programming languages such as Python, JavaScript, C#, etc...

The visitor API allows for processing of each child field which isn't available when using the `GetObject` API.  
It is also provides type flexibility when it comes with dealing with the json data.

Example of [Visitor Based API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L185-L194)

<a id="querying-active-gem-info-o3degems"></a>
### Querying active gem info which is populated underneath the settings object at "/O3DE/Gems"
---

```c++
// Queries the settings registry to get the list active gems targets and source paths
auto GemSettingsVisitor = [&settingsRegistry, &gemInfoList]
(AZStd::string_view gemObjectKeyPath, AZStd::string_view gemName, AZ::SettingsRegistryInterface::Type)
{
    auto FindGemInfoByName = [gemName](const GemInfo& gemInfo)
    {
        return gemName == gemInfo.m_gemName;
    };
    auto gemInfoFoundIter = AZStd::ranges::find_if(gemInfoList, FindGemInfoByName);
    GemInfo& gemInfo = gemInfoFoundIter != gemInfoList.end() ? *gemInfoFoundIter : gemInfoList.emplace_back(gemName);

    // Read the Gem Target Name into target Name field
    auto VisitGemTargets = [&gemInfo](AZStd::string_view, AZStd::string_view fieldName, Type)
    {
        // Assume the fieldName is the name of the target in this case
        gemInfo.m_gemTargetNames.emplace_back(fieldName);
    };
    AZ::SettingsRegistryVisitorUtils::VisitObject(settingsRegistry, VisitGemTargets,
        FixedValueString::format("%.*s/Targets", AZ_STRING_ARG(gemObjectKeyPath)));

    // Retrieve the Gem root path stored underneath the "/O3DE/Runtime/Manifest/Gems" key
    const auto gemPathKey = FixedValueString::format("%s/%.*s/Path",
        AZ::SettingsRegistryMergeUtils::ManifestGemsRootKey, AZ_STRING_ARG(gemName));
    if (AZ::IO::Path gemRootPath; settingsRegistry.Get(gemRootPath.Native(), gemPathKey))
    {
        gemInfo.m_absoluteSourcePaths.emplace_back(gemRootPath);
    }
};

// Visit the "/O3DE/Gems" setting object to query the data for all active gems
AZ::SettingsRegistryVisitorUtils::VisitObject(settingsRegistry, GemSettingsVisitor,
    AZ::SettingsRegistryMergeUtils::ActiveGemsRootKey);

```

There is also a set of utility classes and functions to help reduce the boilerplate with all the direct children fields of a json object. These classes and functions are located in the SettingsRegistryVisitorUtils.h file which describe the [Visitor Utils API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryVisitorUtils.h#L16-L82)

For example given an JSON array as follows

```json
{
    "O3DE": {
        "Array" : [
            1,
            2
        ]
    }
}
```

The fields of the array can be visited using the SettingsRegistryVisitorUtils

```c++
struct AppendArrayVisitor
    : AZ::SettingsRegistryVisitorUtils::ArrayVisitor
{
    CustomArrayVisitor(AZ::SettingsRegistryInterface& registry)
        : m_registry(registry)
    {}

    void Visit(AZStd::string_view arrayElementPath, AZStd::string_view fieldName, Type type)
    {
        if (int value{}; registry.Get(value, arrayElementPath))
        {
            m_array.push_back(value);
        }
    }

    AZStd::vector<int> m_array;
private:
    AZ::SettingsRegistryInterface& m_registry;

};
// ...
settingsRegistry->Visit(AppendArrayVisitor, "/O3DE/Array");
```

The same approach can be done to visit the fields of an object. Another scenario is a JSON object that has the following content

```json
{
    "O3DE": {
        "Object": {
            "Field1": 1,
            "Field2": 2
        }
    }
}
```

Since the array example illustrated how to use the helper visitor utility class, this example will instead focus on using the helper visitor callback function

```c++
AZStd::unordered_map<AZStd::string, int> fieldToIntMap;
auto AppendObjectFields = [&fieldToIntMap](AZStd::string_view objectElementPath, AZStd::string_view fieldName, Type type)
{
    if (int value{}; registry.Get(value, objectElementPath))
    {
        fieldToIntMap.emplace(fieldName, value);
    }
};
// ...
AZ::SettingsRegistryVisitorUtils::VisitObject(*settingsRegistry, AppendObjectFields);
```


## Value Setter API
---

The Settings Registry allows setting values of json keys to the individual JSON types (objects, arrays, strings, bools, numbers) without the need to json documents through the .setreg

The API to set values within the settings registry is the same API as for query values using the Get\*() functions. Any type that has been reflected to the SerializeContext or is either the types of either `bool`, `int64_t`, `double`, `AZStd::string_view` can be stored within the settings registry [Value Setter API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L262-L309):

<a id="store-builtin-settings-type-to-the-settings-registry"></a>
### Store a builtin Settings type to the Settings Registry(bool, AZ::s64/AZ::u64, double, string\_view)
---

The Settings Registry `SettingsRegistryInterface::Set` function can be used to store builtin JSON value types.

The Supported types are `bool`, `AZ::s64/AZ::u64`, `double`, `AZStd::string_view`

The following code snippet shows how to add several directories to the Settings Registry as well as plain arithmetic values

```c++
// Executable folder - corresponds to the @exefolder@ alias
AZ::IO::FixedMaxPath path = AZ::Utils::GetExecutableDirectory();
registry.Set("/O3DE/Runtime/FilePaths/BinaryFolder", path.Native());

// Engine root folder - corresponds to the @engroot@ alias
AZStd::string engineRoot = AZ::Utils::GetEnginePath();
registry.Set("/O3DE/Runtime/FilePaths/EngineRootFolder", engineRoot);

// Retrieve the "project_path" and set the Runtime FilePaths to the ProjectPath
AZ::SettingsRegistryInterface::FixedValueString projectPath = AZ::Utils::GetProjectPath();
registry.Set("/O3DE/Runtime/FilePaths/ProjectPath", projectPath);

// Add a bool value
registry.Set("/O3DE/BoolValue", true);
// Add a double value
registry.Set("/O3DE/DoubleValue1", 1.0);
registry.Set("/O3DE/DoubleValue2", 2.0f); // float promoted to double
// Add a signed integer value
registry.Set("/O3DE/SignedInt", 1LL);
// Add an unsigned integer value
registry.Set("/O3DE/UnsignedInt", 2ULL);
```

### Store a C++ Class Object to the Settings Registry using the `SettingsRegistryInterface::SetObject` function
---

The Value Setter API of the Settings Registry allows transforming an C++ object into json data through the `SettingsRegistryInterface:SetObject`

In order for this to work, there is a prerequisite that the C++ object must be reflected to the SerializeContext

```c++
// Make sure the AzPhysics::SceneConfiguration class is reflected
void SceneConfiguration::Reflect(AZ::ReflectContext* context)
{
    Physics::WorldConfiguration::Reflect(context);

    if (auto* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
    {
        serializeContext->Class<SceneConfiguration>()
            ->Version(1)
            ->Field("LegacyConfig", &SceneConfiguration::m_legacyConfiguration)
            ->Field("LegacyId", &SceneConfiguration::m_legacyId)
            ->Field("Name", &SceneConfiguration::m_sceneName)
            ;
    }
}

// ... Later on the SceneConfiguration class can be stored into the SettingsRegistry
AzPhysics::SceneConfiguration sceneConfig;
sceneConfig.m_sceneName = "PhysX Scene 1";
bool configurationStored = false;

AZ::SettingsRegistryInterface* settingsRegistry = AZ::SettingsRegistry::Get();
if (settingsRegistry)
{
    configurationStored = settingsRegistry->SetObject("/Amazon/Gems/PhysX/DefaultSceneConfiguration", sceneConfig);
}

```

## Value Notification API
---

The SettingsRegistry also has support for notifying users when a key at a JSON pointer within the SettingsRegistry has been modified.

The SettingsRegistryInterface::RegisterNotifier function allows users to registry a callback with the SettingsRegistry that is invoked when the value of a json key is set within the [SettingsRegistry Notifier API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L196-L222):

An example of using the Register Notifier function to listen for a change in a value is as follows

### [Logging each time the Asset Cache Folder has been updated in the SettingsRegistry](#logging-each-time-the-asset-cache-folder-has-been-updated-in-the-settingsregistry)

```c++
SettingsRegistry& registry = *AZ::SettingsRegistry::Get();
AZ::SettingsRegistryInterface::NotifyCallback assetCacheChangedCB =
    [&registry](AZStd::string_view path, AZ::SettingsRegistryInterface::Type type)
{
    if (path == "/O3DE/Runtime/FilePaths/CacheRootFolder"
        && type == SettingsRegistryInterface::Type::String)
    {
        AZ::SettingsRegistryInterface::FixedValueString cacheRootPath;
        if (registry.Get(cacheRootPath, path))
        {
            AZ_TracePrintf("Settings Registry Tracking", "The Asset Cache path has changed to %s", cacheRootPath.c_str());
        }
    }
};

{
    // The SettingsRegistryInterface::RegisterNotifier function returns an AZ event handler that needs to be stored for as long
    // as desired to received the notification events
    AZ::SettingsRegistryInterface::NotifyEventHandler assetChangedHandler = registry.RegisterNotifier(AZStd::move(assetCacheChangedCB));
    // ...
    registry.Set("/O3DE/Runtime/FilePaths/CacheRootFolder", "/home/testuser/TestCache");
}
 // When the assetChangedHandler scope ends, it will unregister from the Settings Registry Notifier event
 // If the handler is desired to persist, it can be stored in a member variable to extend its lifetime

```

## Merge API
-----------------

The most complex part of the Settings Registry is the merging API. There are three primary types of input that can be supplied to the Settings Registry for merging.

1.  Input with the syntax \<JSONPointerPath>=\<value>. It is treated as if command line parameters are being merged
2.  An in-memory json document
3.  A path to a file/folder containing .setreg/setregpatch files.

The order in which settings are merged to the registry is important. Keys that are merged later have precedence over keys seen merged earlier.

i.e If there is "streamer.setreg" that has the content at key "/O3DE/AzFramework/MyArray"

```json
{
    "O3DE":
    {
        "AzFramework":
        {
            "MyArray":
            [
                "String1",
                "String3",
                "String5",
            ],
            "MyObject":
            {
                "AssetKey": "{80CCDA30-1F70-4982-ADE9-62D3DEE332D4}"
            }
        }
    }
}

```

and a "streamer.editor.setreg" that is merged later with the same "/O3DE/AzFramework/MyArray" key

```json
{
    "O3DE":
    {
        "AzFramework":
        {
            "MyArray":
            [
                true,
                false,
                75,
                "StringX",
                "InnerObject":
                {
                    "MyKey": "PathKey"
                }
            ]
        }
    }
}
```

The settings registry will contain the following keys and values

```ini
"/O3DE/AzFramework/MyArray/0" = true
"/O3DE/AzFramework/MyArray/1" = false
"/O3DE/AzFramework/MyArray/2" = 75
"/O3DE/AzFramework/MyArray/3" = "StringX"
"/O3DE/AzFramework/MyArray/4/InnerObject/MyKey" = "PathKey"
"/O3DE/AzFramework/MyObject/AssetKey" = "{80CCDA30-1F70-4982-ADE9-62D3DEE332D4}"
```

The values that are associated with the json array underneath the "/O3DE/AzFramework/MyArray" key are from the merger of the "streamer.setreg" file has been updated with the values of the "streamer.editor.setreg" file

The merge API for the Settings Registry is linked at: [Settings Registry Merge API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L311-L375)

Merging a specific .setreg/.setregpatch file or merging a json document requires only specifying the file name or json content.  Merging a folder of containing .setreg/setregpatch files requires the not only the folder name, but also specifying a list of tags known as "Specializations" to the Merge API which will be explained in a later section.

### [Merging settings registry files within both the executable directory and the asset cache root directory](#merging-settings-registry-files-within-both-the-executable-directory-and-the-asset-cache-root-directory)

which contains the following specializations of "automatedtesting", "automatedtesting\_gamelauncher", "game" and the current build configuration tag as part of it's name(debug, profile, release)

```c++
SettingsRegistryInterface::Specializations specializations{"automatedtesting", "automatedtesting_gamelauncher", "game", AZ_BUILD_CONFIGURATION_TYPE };

AZ::IO::FixedMaxPath mergePath = Internal::GetExecutableDirectory();
if (!mergePath.empty())
{
    registry.MergeSettingsFolder((mergePath / SettingsRegistryInterface::RegistryFolder).Native(),
        specializations, AZ_TRAIT_OS_PLATFORM_CODENAME);
}

// Look within the Cache Root directory for target build dependency .setreg files
AZ::SettingsRegistryInterface::FixedValueString cacheRootPath;
if (registry.Get(cacheRootPath, FilePathKey_CacheRootFolder))
{
    mergePath = AZStd::move(cacheRootPath);
    mergePath /= SettingsRegistryInterface::RegistryFolder;
    registry.MergeSettingsFolder(mergePath.Native(), specializations, platfor);
}

```

<a id="auxiliary-api-merge-utils"></a>
# Auxiliary API - Settings Registry Merge Utilities

The Settings Registry Merge Utilities are a set of functions located within AzCore/Settings/SettingsRegistryMergeUtils.h which contains implementation of merging of common files, folder locations and the command line.

It also contains functions querying and setting a "specialization" within the Settings Registry underneath the key of /Amazon/AzCore/Settings/Specializations
Specializations can be used for filtering which \*.setreg files to merge when the SettingsInterface::MergeSettingsFolder is invoked

The Settings Registry Merge Utilities also contains a function for dumping JSON value at a specific JSON pointer path to an AZ::IO::GenericStream

## Settings Registry Merge Utils Merge API
---

[Merge to Settings Registry API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L133-L263)


## Settings Registry Merge Utils Specialization API
---

[Query Specialization Tag API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L125-L131)


## Settings Registry Merge Utils Value Dumper API
---

[Settings Registry Section Dumping API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L276-L304)


## Settings Registry O3DE Manifest Visit Utils API
---

The Settings Registry Merge Utilities also provide a set of helper functions for visting the set of active gems as well as recursively visiting the O3DE manifest "external\_subdirectories" locations to determine the set of all registered gems with O3DE.  
[O3DE Manifest Utils API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L349-L404)


<a id="setting-registry-specializations-folder-merging"></a>
# Setting Registry Specializations - Folder Merging

Specializations are set of tags that can be used to filter which .setreg/setregpatch files to load within a particular folder. The tags are part of a filename that \*.setreg files are allowed to contain. Not all tags within the tag set are required to be matched as part of the filename, but any parts of the filename which do not match a tag in the Specializations object results in a failed match. The specification of a setreg file is as follows:
\<filename stem> [.\<tag1>\] \[.\<tag2>\] ... \[.\<tagN>\] ".setreg"
Therefore a settings registry file with the name of "bootstrap.game.windows.profile.setreg", has a filename of "bootstrap" and tags of "game", "windows and "profile". In order to load the preceding file using the `AZ::SettingsRegistry::MergeSettingsFolder` function a Specializations object with the tags of "game", "windows" and "profile" stored within it are needed. That Specializations object can have additional tags added to it and it would still be able to load the "bootstrap.game.windows.profile.setreg file.

The Specializations object can be thought of as an allowlist of ".\<tag>." values that can be part of the settings registry file name.

<a id="loading-setreg-using-specialization"></a>
### Ex. Loading .setreg file from \<ExecutableDirectory>/Registry folder with using specialization tags
---

```
SettingsRegistryInterface::Specializations specializations{
     "automatedtesting",
     "automatedtesting_gamelauncher",
     "randomtag"
};
AZ::SettingsRegistryInterface* registry = AZ::SettingsRegistry::Get();
registry->MergeSettingsFolder(AZ::Utils::GetExecutableDirectory() / "Registry", specializations, AZ_TRAIT_OS_PLATFORM_CODENAME);
```

A table detailing which types of files will be loaded using the example specializations is as follows

| `<ExeDirectory>/Registry` Files | Loaded by AZ::SettingsRegistryInterface::MergeSettingsFolder |
| --- | --- |
| cmake\_dependencies.automatedtesting.automatedtesting\_gamelauncher.setreg | Yes - contains both the "automatedtesting" and "automatedtesting\_gamelauncher" tags |
| cmake\_dependencies.automatedtesting.setreg | Yes - contains the "automatedtesting" tag that is part of the tag allowlist |
| cmake\_dependencies.automatedtesting\_gamelauncher.setreg | Yes - contains the "automatedtesting\_gamelauncher" tag that is part of the tag allowlist |
| cmake\_dependencies.automatedtesting.automatedtesting\_gamelauncher.setregpatch | Yes - illustrates that the .setregpatch extension also works |
| cmake\_dependencies.automatedtesting.automatedtesting\_gamelauncher | No - missing a .setreg or .setregpatch extension |
| automatedtesting.cmake\_dependencies.setreg | No - "cmake\_dependencies" is not part of the tag set |
| cmake\_dependencies.setreg | Yes - contains no tags at all |
| automatedtesting.setreg | Yes - Again contains no tags; "automatedtesting" is seen as the stem of the filename, not a tag" |

An alternative to using the Specialization system of the `AZ::SettingsRegistryInterface::MergeSettingsFolder` function is to load each file through the `AZ::SettingsRegistryInterface::MergeSettingsFile` function

1.  Use AZ::IO::SystemFile::FindFiles to search for .setreg/.setregpatch files.
1.  To gather files .setreg/.setregpatch files for the specific OS platform, a second call to AZ::IO::SystemFile::FindFiles can be performed by appending the directory of `"Platform" / AZ_TRAIT_OS_PLATFORM_CODENAME` to the folder being searched.
i.e `<ExeDirectory>/Registry/Platform/Windows`
1.  Then pass each file to AZ::SettingsRegistryInterface::MergeSettingsFile

<a id="merging-pal-folders"></a>
### Merging Platform Abstraction Layer(PAL) folders
---

The `AZ::SettingsRegistry::MergeSettingsFolder` allows users to supply an optional platform name to indicate an OS platform folder to search for .setreg/.setegpatch files.
This allows merging of platform specific settings by supplying the `platform` parameter.
This parameter should be set to an empty string if platform specific settings are not desired to be loaded.
For loading platform specific settings for the current OS the [AZ_TRAIT_OS_PLATFORM_CODENAME](https://github.com/o3de/o3de/blob/37b1216015567fb7faa49fe7e3f6f7a73379e06a/Code/Framework/AzCore/Platform/Linux/AzCore/AzCore_Traits_Linux.h#L41) define should be used which expands to the current platform.

## Adding Specializations via the Command Line
---

The Settings Registry supports storing particular specializations to use within the registry itself.

The `/Amazon/AzCore/Settings/Specialization/<TagName>` key can be set to true to add the <TagName> specialization to be used when merging files from the Settings Registry. This can be done through the `regset` command parameter mechanism.

<a id="running-the-editor-with-custom-specialization"></a>
### Ex. Running the Editor with a custom specialization
---

```bash
Editor.exe --project-path=<Path-To-Project> --regset="/Amazon/AzCore/Settings/Specialization/custom=true"
```

Note: Specializations in the Settings Registry are case-insensitive.


<a id="settings-registry-specialization-system-in-depth"></a>
## Settings Registry Specialization System: MergeSettingsFolder() - In-Depth Explanation
---

### Settings Registry MergeSettingsFolder File Selection

The Specialization tagging system can be used to filter _.setreg/_.setregpatch files out settings registry files that don't match any of tags supplied.

The SettingsRegistry `MergeSettingsFolder()` function accepts a "specializations" parameter which will be check against all tags found within a filename located in the merged folder.

If a filename contains a tag that is not supplied as part of the "specializations" parameter it will be removed from the list of settings registry files to load.

Ex. Merging Hardware Settings

1.  Given a set of specializations of \["**mobile**", "**core\_count\_16**"\]
2.  A folder with the following settings registry files

| Settings Registry Files |
| --- |
| hardware\_settings.core\_count\_16.mobile.setreg |
| hardware\_settings.mobile.setreg |
| hardware\_settings.pc.setreg |
| hardware\_settings.core\_count\_16.pc.setreg |
| hardware\_settings.core\_count\_4.mobile.setreg |
| hardware\_settings.core\_count\_16.setreg |
| Platform/Android/hardware\_settings.mobile.setreg |
| a\_hardware\_settings.core\_count\_16.mobile.setreg |

The specialization tags will be checked against each of "specializations" that are part of the settings registry file name in the [SettingsRegistryImpl::ExtractFileDescription](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryImpl.h#L113) function.

The part of the filename that is a specialization in a \*.setreg(patch) file is the section after the first \<dot> character and before the extension.

So "\<filename stem>.**\<tag1>**.**\<tag2>**.**\<tag3>**.setreg" is an example of a Settings Registry file that with 3 tags: "tag1", "tag2", "tag3".

Each of tag of a \*.setreg file must match a tag supplied to the specialization structure that gets passed in to the [SettingsRegistryInterface::MergeSettingsFolder](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L357-L375) function.

In this case with the hardware settings will be loaded from the following files highlighted in **bold** when the "specializations" parameter contains \["**core\_count\_16**", "**mobile**"\]

| Settings Registry Files |
| --- |
| **hardware\_settings.core\_count\_16.mobile.setreg** |
| **hardware\_settings.mobile.setreg** |
| hardware\_settings.pc.setreg |
| hardware\_settings.core\_count\_16.pc.setreg |
| hardware\_settings.core\_count\_4.mobile.setreg |
| **hardware\_settings.core\_count\_16.setreg** |
| **Platform/Android/hardware\_settings.mobile.setreg** |
| **a\_hardware\_settings.core\_count\_16.mobile.setreg** |

Specifically the following files have been selected

| Chosen Settings Registry Files |
| --- |
| hardware\_settings.core\_count\_16.mobile.setreg |
| hardware\_settings.mobile.setreg |
| hardware\_settings.core\_count\_16.setreg |
| Platform/Android/hardware\_settings.mobile.setreg |
| a\_hardware\_settings.core\_count\_16.mobile.setreg |

The order in which the settings registry files get loaded will now be explained.

The [SettingsRegistryImpl::IsLessThan](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryImpl.h#L110-L112) function is used to sort the list of settings registry files based on the following rules

1.  The "\<filename stem>.\<tag1>.\<tag2>...\<tagN>.setreg" files would be sorted based on the lexigraphical order of the "\<filename>" portion of the setreg file.
2.  Next for pairs of settings registry files with the same "\<filename>", the one with the fewest amount of tags would be sorted in ascending numerical order.
3.  Next for pairs of settings registry files with the same "\<filename>" and the same number of tags, the sorting would occur in the order that the "tags" were added to the specialization structure.
4.  Finally for pairs of settings registry files with the same "\<filename>", number of tags and order of those tags, if one of the files is located within the platform abstraction layer folder(Ex. `"Registry/Platform/Android/hardware_settings.mobile.setreg"`), it will sort the platform specific file after the non-platform specific file.. For this the case outlined in this example, since the "**core\_count\_16**" tag is being added before "**mobile**", the **core\_count\_16** tag sorts before the **mobile** tag.

The order the selected settings registry files will load in is as follows:

| Settings Registry File Load Order | Reason |
| --- | --- |
| a\_hardware\_settings.core\_count\_16.mobile.setreg | The filename "a\_hardware\_settings" sorts before "hardware\_settings" |
| hardware\_settings.core\_count\_16.setreg | The filename "hardware\_settings" matches and contains the same number of tags as the next entry, but this entry tag of "**core\_count\_16**" was added before "**mobile**" |
| hardware\_settings.mobile.setreg | The "**mobile**" tag was added to the specialization array after the "**core\_count\_16**" tag |
| Platform/Android/hardware\_settings.mobile.setreg | The Android platform specific version of "hardware\_settings.mobile.setreg" loads after the non-platform version |
| hardware\_settings.core\_count\_16.mobile.setreg | "The filename "hardware\_settings" matches the previous 4 entries, but this entry contains two specialization tags instead of the one the previous entries contained |

<a id="settings-registry-command-line-support"></a>
# Settings Registry - Command Line Support

The Settings Registry supports several command line parameters for querying and setting files using a json pointer path.
This functionality is available in any Application that creates a global settings registry via the creation of an AZ::ComponentApplication

Supported Applications with this functionality are as follows.
This is not an exhaustive set, but a list of known applications at this time 

| Supported Applications |
| --- |
| MaterialEditor |
| AssetProcessor / AssetProcessorBatch |
| AssetBuilder |
| AssetBundler |
| Editor |
| ${project}.GameLauncher |
| ${project}.ServerLauncher |
| SerializeContextTools |
| SharedManagementConsole |
| PythonBindingsExample |

The following are the command line options supported by the Settings Registry


|Command Option|Description|
|---|---|
|`--regset=<JSON pointer path>=<value>`|Sets a value within the Settings Registry at the specified JSON pointer path use the value to the right of the equal sign<br>Evaluated in left-to-right order inline with other `--regset` and `--regremove` options|
|`--regremove=<JSON pointer path>`|Removes a value within the Settings Registry at the specified JSON pointer path<br>Evaluated in left-to-right order inline with other `--regremove` and `--regset` options|
|`--regdump=<JSON pointer path>`|Dumps a value from the Settings Registry from the JSON pointer path recursively to stdout|
|`--regdumpall`|Dumps the entire JSON document from the Settings Registry to stdout.<br>This is equivalent to passing in the command line of `--regdump=""`|
|`--regset-file=<file-path>[::<JSON anchor path>]`|Merges a JSON formatted file into the Settings Registry.<br>**Merge a JSON file to the Settings Registry under the root("") key**<br>`--regset-file="Registry/bootstrap.setreg"`<br>Optionally a [JSON pointer path](https://datatracker.ietf.org/doc/html/rfc6901#section-5) can be supplied after the filepath which is separate by two <colons>.<br>This path represents the JSON object where the settings are anchored underneath.<br><br>**Merge a JSON file to the Settings Registry under the "/O3DE/Bootstrap" key**<br>`--regset-file="Registry/bootstrap.setregpatch::/O3DE/Bootstrap"`<br>If the file path ends with ".setregpatch", the file will be merged using JSON Patch, otherwise the JSON Merge Patch algorithm will be used.<br><br>**Tip\|Any File Extension supported**<br>This can command supports any merging a JSON formated file with any kind of file extension.<br>The file extension is only important in determining if JSON Patch algorithm will be used in the .setregpatch case.

<a id="cli-option-order-evaluation"></a>
## Info \| Order of regset/regremove are evaluated left-to-right

The `--regset`, `--regset-file` and `--regremove` options are evaluated in left-to-right order.
This is relevant when the same options has been supplied on the command line multiple times or when a setting is being both removed and set.

| Command line options | Evaulation Result |
| --- | --- |
| `Editor.exe --regset="/My/Setting/value=false" --regset="/My/Setting/value=true"`| The "/My/Setting/value" field will be set to "true" as the last option wins |
| `Editor.exe --regset="/My/Setting/value=false" --regremove="/My/Setting/value"`| The Settings Registry will not have a "/My/Setting/value" field due to `--regremove` as the last option |
| `Editor.exe --regremove="/My/Setting/value" --regset="/My/Setting/value=true"`| The Settings Registry **will** have a "/My/Setting/value" field that is set to "true" due to `--regset` as the last option |


<a id="regset-cli-example"></a>
## Ex. - Using "--regset" to set override the Project Path
---

The Project Path can be read from any \*.setrreg file or the command line via the "/Amazon/AzCore/Bootstrap/project\_path" entry.
The ideal place is that this is set on a per user basis using the global user registry location.
That location is at the user's ~/.o3de/Registry directory

After the Settings Registry merges in the settings registry files within the user's global registry , it then checks the AZ CommandLine for all --regset options and merges each `<JSON pointer path, value>` pair into the Settings Registry.


```bash
# Override the Project via "project_path" value in the Settings Registry
# The SerializeContextTools will load up the Gems needed to run the project located at <EngineRoot>/AutomatedTesting
SerializeContextTools.exe --regset="/Amazon/AzCore/Bootstrap/project_path=AutomatedTesting" convert -files=AutomatedTesting/project.physicsconfiguration -ext=physics.setreg
```

<a id="regdump-cli-example"></a>
## Ex. - Using "--regdump" to dump the JSON object containing the bootstrap settings to stdout
---


```bash
# Dumps all the values underneath the "/Amazon/AzCore/Bootstrap to stdout
Editor.exe --regdump="/Amazon/AzCore/Bootstrap"
```


# Loading Gems through the Settings Registry

<a id="automatic-gem-dependency-loading"></a>
## Automatically loading the list of gem build dependencies for an Application
---

CMake is used to output a list of tagged .setreg files(`cmake_dependencies.<target>.setreg`), which contain the build dependencies of a CMake Target that should load through the O3DE module system.
This is used to automatically load gems based on the build dependencies of a CMake Target.

The use of Game.xml and Editor.xml in earlier versions has been deprecated and replaced with the mechanic described above.

The following illustrates how to generate a settings registry(.setreg) file that contains a list of gem build dependencies for a *hypothetical* VoxelEditor CMake Target.

First the CMakeLists.txt for the VoxelEditor feature is modified to add the following

<a id="cmakeliststxt-voxel-editor"></a>
### CMakeLists.txt (Voxel Editor)
---

```cmake
# Associate the VoxelEditor CMake target with ".Tools" variant of gems to load.
# This will generate a "cmake_dependencies.voxeleditor.setreg" file that contains the path to the shared
# libraries that will need to be loaded by the VoxelEditor, as well as the list paths to the gem source directory
ly_set_gem_variant_to_load(TARGETS VoxelEditor VARIANTS Tools)

# Adds the VoxelEditor target as a C preprocessor define so that it can be used as a Settings Registry
# specialization in order to look up the generated .setreg which contains the dependencies
# specified for the target.
set_source_files_properties(
    Source/VoxelEditorApplication.cpp
    PROPERTIES
        COMPILE_DEFINITIONS LY_CMAKE_TARGET="VoxelEditor"
)
```

Running the CMake command to generate a solution on Windows will also generate a cmake\_dependencies.voxeleditor.setreg with the following content. It recurses through the list of Gems RUNTIME\_DEPENDENCIES and looks for a GEM\_MODULE target property on it to determine the list of gems that need to load

For example this is how the Atom Bridge Gem is configured in CMake

<a id="cmakeliststxt-atom-bridge"></a>
### CMakeLists.txt (AtomBridge)
---

```cmake
if(PAL_TRAIT_BUILD_HOST_TOOLS)
    ly_add_target(
        NAME Atom_AtomBridge.Editor ${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}
        NAMESPACE Gem
        ...
        RUNTIME_DEPENDENCIES
            Gem::Atom_RHI.Private
            Gem::Atom_RHI_DX12.Private
            Gem::Atom_RHI_DX12.Builders
            Gem::Atom_Asset_Shader.Builders
            Gem::ImageProcessingAtom.Editor
            Gem::ImguiAtom
            Gem::AtomToolsFramework.Editor
    )


    # Any 'tool' and 'builder' type applications should use Gem::Atom_AtomBridge.Editor:
    ly_create_alias(NAME Atom_AtomBridge.Builders NAMESPACE Gem TARGETS Gem::Atom_AtomBridge.Editor)
    ly_create_alias(NAME Atom_AtomBridge.Tools    NAMESPACE Gem TARGETS Gem::Atom_AtomBridge.Editor)
endif()
```

Configuring CMake then generates the following setreg file for the user underneath their executable directory "Registry" folder.

<a id="cmake-dependencies-voxel-editor"></a>
### cmake\_dependencies.voxeleditor.setreg (Voxel Editor)
---

```json
{
    "O3DE": {
        "Gems": {
            "Atom_AtomBridge": {
                "Targets": {
                    "Atom_AtomBridge.Editor": {
                        "Modules":["Atom_AtomBridge.Editor.dll"]
                    },
                    "Atom_AtomBridge.Builders": {
                    }
                }
            },
            "AtomShader": {
                "Targets": {
                    "Atom_Asset_Shader.Builders": {
                        "Modules":["Atom_Asset_Shader.Builders.dll"]
                    }
                }
            },
            "ImageProcessingAtom": {
                "Targets": {
                    "ImageProcessingAtom.Editor": {
                        "Modules":["ImageProcessingAtom.Editor.dll"]
                    }
                }
            },
            "AtomToolsFramework": {
                "Targets": {
                    "AtomToolsFramework.Editor": {
                        "Modules":["AtomToolsFramework.Editor.dll"]
                    }
                }
            },
            "Atom_RHI_DX12": {
                "Targets": {
                    "Atom_RHI_DX12.Builders": {
                        "Modules":["Atom_RHI_DX12.Builders.dll"]
                    },
                    "Atom_RHI_DX12.Private": {
                        "Modules":["Atom_RHI_DX12.Private.dll"]
                    }
                }
            }
        }
    }
}
```

Finally the next step is to add a Settings Registry Specialization that is used to load the cmake\_dependencies.voxeleditor.setreg file.

This is done in C++ code via the `SettingsRegistryMergeUtils::MergeSettingsToRegistry_AddBuildSystemTargetSpecialization` function.

```c++
    //! This function returns the build system target name
    AZStd::string_view GetBuildTargetName()
    {
#if !defined (LY_CMAKE_TARGET)
#error "LY_CMAKE_TARGET must be defined in order to add this source file to a CMake executable target"
#endif
        return AZStd::string_view{ LY_CMAKE_TARGET };
    }

    VoxelEditorApplication::VoxelEditorApplication(int* argc, char*** argv)
        : Application(argc, argv)
        , QApplication(*argc, *argv)
    {
        // The settings registry has been created at this point, so add the CMake target "voxeleditor"
        // as a specialization into the settings registry
        AZ::SettingsRegistryMergeUtils::MergeSettingsToRegistry_AddBuildSystemTargetSpecialization(
            *AZ::SettingsRegistry::Get(), GetBuildTargetName());
    }
```

Afterwards the AZ::ComponentApplication will use the gem modules filenames stored within the settings registry to load them from the filesystem. It will also merge `<GemRootPath>/Registry/*.setreg` files for each gem.

Additionally CMake targets based on the game project can also generate a setreg file by using the ly\_enable\_gems() function

For example the AtomTest project gem uses the ly\_enable\_gems() function to generate cmake\_depenencies.atomtest.\<target>.setreg files. That file contains the list shared library file paths and gem source folder to load within the editor.

<a id="cmakeliststxt-atom-test-project-gem"></a>
### CMakeLists.txt (AtomTest)
---

```cmake
ly_add_target(
    NAME AtomTest ${PAL_TRAIT_MONOLITHIC_DRIVEN_MODULE_TYPE}
    NAMESPACE Gem
    FILES_CMAKE
        atomtest_files.cmake
    INCLUDE_DIRECTORIES
        PUBLIC
            Include
    BUILD_DEPENDENCIES
        PRIVATE
            AZ::AzGameFramework
            Gem::Atom_LyIntegration.Static
)

# if enabled, AtomTest gem is used by the Client and Server Launchers as well as Tools
# But it it isn't needed in Builders
ly_create_alias(NAME AtomTest.Clients NAMESPACE Gem TARGETS Gem::AtomTest)
ly_create_alias(NAME AtomTest.Servers NAMESPACE Gem TARGETS Gem::AtomTest)
ly_create_alias(NAME AtomTest.Tools   NAMESPACE Gem TARGETS Gem::AtomTest)

################################################################################
# Gem dependencies
################################################################################
# The GameLauncher uses "Clients" gem variants:
ly_enable_gems(PROJECT_NAME AtomTest GEM_FILE enabled_gems.cmake)
```

That command will add build and load dependencies to the AtomTest project

At CMake generate time the following settings registry files will be generated within the a users "\<CMakeBuildDir>/bin/$\<CONFIG>" folder based on the ly\_enable\_gems() commands For example configuring CMake for Windows with only the AtomTest project enabled can generate the following .setreg files

```
<CMakeBuildDir>\bin\profile\Registry\cmake_dependencies.atomtest.editor.setreg
<CMakeBuildDir>\bin\profile\Registry\cmake_dependencies.atomtest.assetprocessor.setreg
<CMakeBuildDir>\bin\profile\Registry\cmake_dependencies.atomtest.atomtest_gamelauncher.setreg
...
```

The generated project .setreg files has the format of "cmake\_dependencies.\<ProjectNameLower>.\<CMakeTargetNameLower>.setreg"

The reason why the project name is part of the generated "cmake\_dependencies.\*.setreg" file is that O3DE currently allows configuring multiple projects at once, yet each of those projects would use the same applications for tools.

Applications such as the Editor and AssetProcessor are re-used for each game project. Each of those applications need to load a different set of gems based on the active game project.
Therefore the project name is added as part of the CMake build dependencies settings registry files.

For example if CMake is configured with the value of -DLY\_PROJECTS="AutomatedTesting;D:/o3de/AtomSampleViewer", the following .setreg files would be generated

```
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.assetbuilder.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.assetprocessor.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.assetprocessorbatch.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.atomsampleviewer_gamelauncher.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.atomsampleviewer.editor.setreg

D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.assetbuilder.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.assetprocessor.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.assetprocessorbatch.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.automatedtesting_gamelauncher.setreg
D:\o3de\o3de\windows_vs2019\bin\profile\Registry\cmake_dependencies.automatedtesting.editor.setreg

```

## Platform Gem Loading
---

Gems can be built and loaded on a per platform specific basis via the ly\_enable\_gems function being to be called multiple times for a given variant with PAL(Platform Abstraction Layer) paths.
CMake supports several Platform Abstraction variables that can be used to include specific enabled gems files based on the current platform(Windows, Mac, Android, etc...)

**Example: Specifying Target General and Platform Specific Gem Dependencies Together**

```cmake
o3de_pal_dir(pal_dir ${CMAKE_CURRENT_LIST_DIR}/Platform/${PAL_PLATFORM_NAME} "${gem_restricted_path}" "${gem_path}" "${gem_parent_relative_path}")
# Read a platform specific cmake file that contains the names of gems to activate
ly_enable_gems(PROJECT_NAME AtomTest GEM_FILE ${pal_dir}/enabled_gems.cmake)
```

# Explicit Gem Activation

This section aims to be the definitive source for developers to determine how to enable and disable a gem for building, as well as to turn of autoloading of gems based using the Settings Registry
As mentioned in the [Loading Gems through the Settings Registry](#loading-gems-through-the-settings-registry) section, the building of gems is determined by the name of the gems in the enabled\_gems.cmake file.
This file should not be manually modified and instead the o3de.py enable-gem / disable gem command should be used to add or remove explicit activation of a gem

<a id="gem-dependency-automatedtesting">
## Ex. Adding a Gem as a dependency for the AutomatedTesting Project
---

The following are example of using the o3de python script commands to add and remove explicit gem activation for a gem called "Sponza" to the AutomatedTesting project

**Enable and Disabling the Sponza Gem**

```bash
# The following command adds explicit activation of the "Sponza" gem within the AutomatedTesting project
# It will modify the enabled_gems.cmake file and conditionally the project.json file if the gem being activated is registered with the global o3de_manifest.json
[engine-root]> scripts\o3de.bat enable-gem --gem-name Sponza --project-path AutomatedTesting
# The following command removes explicit activation of the "Sponza" gem within the AutomatedTesting project
# It will modify the enabled_gems.cmake file and conditionally the project.json file if the gem being activated is registered with the global o3de_manifest.json
[engine-root]> scripts\o3de.bat disable-gem --gem-name Sponza --project-path AutomatedTesting
```

## Disable Autoloading of Gem Modules
---

As part of the cmake project generation step, it generates a cmake\_dependencies.\*.setreg file that contains a list of gems to load.
Until now, no steps have been provided to prevent applications from automatically loading that list of gems.
To prevent autoloading of a specific gem a JSON boolean value of \`false\` could set at the in JSON pointer format for the gem using the path of `"/O3DE/Gems/${GemName}/${TargetModule}/AutoLoad"`.

For example a \*.setreg placed in the `"<project-root>/Registry/"` folder which sets the `"/O3DE/Gems/${GemName}/${TargetModule}/AutoLoad=false"` value.

<a id="disable-autoloading-of-chatplay-module"></a>
### Example - Disabling the ChatPlay Client module and QtForPython Tools module from autoloading when enabled as part of the AutomatedTesting Project
---

The following is a snippet of the generated `cmake_dependencies.automatedtesting.assetproccessor.setreg` that is generated when O3DE is configured with the `-DLY_PROJECTS=AutomatedTesting` option

**cmake\_dependencies.automatedtesting.assetproccessor.setreg**

```json

{
    "O3DE": {
        "Gems": {
            "ChatPlay": {
                "ChatPlay": {
                    "Modules": ["ChatPlay.dll"]
                }
            },
            "QtForPython": {
                "QtForPython.Editor": {
                    "Modules": ["QtForPython.Editor.dll"]
                }
            },
            //...
        }
    }
}
```

### Disable Autoloading at the User Level

The ChatPlay Client and QtForPython Tools module can be disabled from autoloading on a **per user** basis by placing a .setreg file either within the "\<project\_root>/User/Registry" (per project override) or the "~/.o3de/Registry" global user override

**gem\_autoload.setreg**

```json
{
    "O3DE": {
        "Gems": {
            "ChatPlay": {
                "ChatPlay": {
                    "AutoLoad": false
                }
            },
            "QtForPython": {
                "QtForPython.Editor": {
                    "AutoLoad": false
                }
            }
        }
    }
}
```


### Disable Autoloading at the Project Level

To disable autoloading at the **project** level, the settings registry file can be placed in the registry folder within the project

*   `<project_root>/Registry`

### Disable Autoloading at the Platform Level

The ability to disable the autoloading of gems can further be enforced at the **platform** level as well.
For a project this is done by placing the settings registry file in the Registry -> Platform -> ${PAL\_PLATFORM\_NAME} folder

*   `<project_root>/Registry/Platform/${PAL_PLATFORM_NAME}`


<a id="advanced-topic-load-gems-in-cpp"></a>
## Advanced Topic - How to load the Gems in C++
---

This tip is to bring to developers attention the location of the code that is responsible for loading dynamic modules within Applications in case a developer needs to manually loading a gem.

The logic for loading the list of gems is among two files.

First the SettingsRegistryMergeUtils.cpp.

It contains the [MergeSettingsToRegistry_TargetBuildDependencyRegistry](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L216-L220) function which is responsible for loading the "cmake\_dependencies.\<tag1>.\<tag2>.setreg" files containting the list of gems to load based on the values in its "specialization" tag structure
The list of gem moudles to load are stored in the Setting Registry for later

```c++
void MergeSettingsToRegistry_TargetBuildDependencyRegistry(SettingsRegistryInterface& registry, const AZStd::string_view platform,
    const SettingsRegistryInterface::Specializations& specializations, AZStd::vector<char>* scratchBuffer);
```


Next the ComponentApplication.cpp is responsible for loading the gems

It is the [LoadDynamicModule](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Component/ComponentApplication.h#L297-L299) function. which reads the Settings Registry for all array keys  at the paths of "/O3DE/Gems/${GemName}/Modules" and aggregates that into a list of gems to load

```c++
void ComponentApplication::LoadDynamicModules()
{
    // Queries the settings registry to get the list of gem modules to load
    struct GemModuleLoadData
    {
        AZ::OSString m_gemName;
        AZStd::vector<AZ::OSString> m_dynamicLibraryPaths;
        bool m_autoLoad{ true };
    };
    // ...
}
```

<a id="assetprocessor-scan-folder-support"></a>
## Add AssetProcessor Scan Folder for Gems using the Settings Registry

The Settings Registry supports configuring settings for the AssetProcessor.
The AssetProcessorPlatformConfig.setreg file can be used as a referenced as to what settings are available: [AssetProcessorPlatformConfig.setreg](https://github.com/o3de/o3de/blob/development/Registry/AssetProcessorPlatformConfig.setreg)

<a id="gem-asset-scan-folders"></a>
### Gem Asset Scan Folders
---

To add additional Scan Folders for an active gem (such as the Blast gem), a setreg file can be added which adds a "ScanFolder \<name>" under the the "/Amazon/AssetProcessor/Settings" field. The \<name> portion can be anything as long as it doesn't collide with a \<name> of another scan folder entry.

The following adds the `<Blast Gem Root>/Editor/Scripts` folder as a Scan Folder for the AP

<a id="assetprocessorsettings-setreg"></a>
#### assetprocessor\_settings.setreg
---

```json
{
    "Amazon": {
        "AssetProcessor": {
            "Settings": {
                "ScanFolder Blast/Scripts": {
                    "watch": "@GEMROOT:Blast@/Editor/Scripts",
                    "display": "Blast/Scripts",
                    "recursive": 1,
                    "order": 101
                }
            }
        }
    }
}
```

# Convert Windows Style INI file to JSON format

To help facilate converting windows style INI settings over to use the Settings Registry, the SerializeContextTools exposes a "convert-ini" option. The "convert-ini" option can accept one or more Windows-ini style files and convert them to .setreg files that can be loaded via the Settings Registry

Below is an example of converting the `AssetProcessorPlatformConfig.ini` and the `user.cfg` to a setreg file

**convert-ini**

```bash
<CMakeBinaryDir>/bin/profile/SerializeContextTools.exe convert-ini --files AssetProcessorPlatformConfig.ini;user.cfg --ext setreg --json-prefix="/O3DE/Settings"
```

<a id="settings-registry-debugging"></a>
# Settings Registry - Debugging

## MSVC Debugging
---

The Settings Registry maintain it settings in a `rapidjson::Document` that is member variable in `AZ::SettingsRegistryImpl`.

The rapidjson 3rdParty provides a Native Visualizer(.natvis) file for the MSVC debugger which makes it easy to recurse through `rapidjson::Value` and `rapidjson::Document` instances. This natvis file is part of AzCore, so nothing needs to be done to visualize these fields in Visual Studio

Expanding the `AZ::SettingsRegistryImpl::m_settings` provides a view of the values within the Settings Registry. This allows for drilling down to a particular json entry within the Settings Registry to determine whether the entry exist and if so its value.
