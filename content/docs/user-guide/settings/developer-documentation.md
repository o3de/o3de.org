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

Several APIs are provided for the Settings Registry so that you can query, modify, and merge settings keys and values.

### Query API

The [query API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L224-L260) supports directly querying the types of `bool`, `int64_t`, `double`, `AZStd::string`, `AZStd::fixed_string` and any object reflected to the `SerializeContext`. The getter method of querying objects from the `SerializeContext` is safe to use, but it should be seen as an implementation detail of the Settings Registry. The `SettingsRegistryInterface::GetObject` interface will remain stable, but no assumptions should be made on how objects are serialized.

The following example demonstrates the query API for builtin settings types (`bool`, `AZ::s64`, `AZ::u64` `double`, `(fixed_)string`):

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

#### Load C++ class objects with the query API

In order to load C++ Class Objects using the Settings Registry, the type itself must be reflected to the Serialize Context in order to use the query API. Instead of calling the `SettingsRegistryInterface::Get` method for querying builtin JSON types, the `SettingsRegistry::GetObject` function is used.

The following example shows how to use the `SettingsRegistryInterface::GetObject` function to load the SettingsRegistry into an `AzPhysics::SceneConfiguration`.

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

### Visitor API

The [visitor API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L185-L194) supports recursively visiting the JSON object and array children starting at a specified JSON pointer. The visitor API allows for processing of each child field which isn't available when using the `GetObject` API. It also provides type flexibility when dealing with the JSON data. A visitor for the settings registry must implement the `AZ::SettingsRegistryInterface::Visitor` class. An instance of that class can be supplied to the `AZ::SettingsRegistryInterface::Visit()` method.

The visitor is recommended when serializing in/out complex objects that don't have any `SerializeContext` reflection. Since it isn't tied to the `SerializeContext`, the same logic could be used to read objects from the Settings Registry using the JSON facilities available within other programming languages such as Python, JavaScript, or C#.

The following example demonstrates using the visitor API to gather active gem info which is populated under the settings object at "/O3DE/Gems".

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

The [visitor utilities API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryVisitorUtils.h#L16-L82) can simplify visiting the direct children fields of a JSON object. These classes and functions are located in `SettingsRegistryVisitorUtils.h`. 

For example, consider the following JSON array:

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

The fields of the array can be visited using the `SettingsRegistryVisitorUtils` as in the following example:

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

The same approach can be used to visit the fields of an object. Consider the following JSON object:

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

You can use the helper visitor callback function, as in the following example:

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

## Value setter API

The [value setter API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L262-L309) is used to set values within the Settings Registry for `bool`, `int64_t`, `double`, and `AZStd::string_view` types, or any type that is reflected to the `SerializeContext`.


The Settings Registry `SettingsRegistryInterface::Set` function can be used to store supported types such as `bool`, `AZ::s64/AZ::u64`, `double`, and `AZStd::string_view`. The following example shows how to add several directories to the Settings Registry as well as plain values:

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

### Store a C++ Class Object with the value setter API

The value setter API allows transforming a C++ object into JSON data through the `SettingsRegistryInterface:SetObject`. There is a prerequisite that the C++ object must be reflected to the `SerializeContext` as in the following example:

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

## Value notifier API

The [value notifier API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L196-L222) notifies when a key at a JSON pointer within the SettingsRegistry has been modified. The `SettingsRegistryInterface::RegisterNotifier` function allows users to register a callback with the Settings Registry that is invoked when the value of a JSON key is set.

The following example demonstrates logging each time the Asset Cache directory has been updated in the Settings Registry:

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

The most complex part of the Settings Registry is the [merge API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L311-L375). There are three primary types of input that can be supplied to the Settings Registry for merging.

* Input with the syntax \<JSONPointerPath>=\<value> - This is treated as if command line parameters are being merged.
* An in-memory JSON document
* A path to a file/directory containing `.setreg`/`.setregpatch` files

The order in which settings are merged to the registry is important. Keys that are merged later have precedence over keys seen merged earlier. Suppose there is `streamer.setreg` that has the content at key "/O3DE/AzFramework/MyArray" such as the following example:

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

Suppose there is a `streamer.editor.setreg` with the same "/O3DE/AzFramework/MyArray" key, such as the following example:

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

If the preceding `streamer.editor.setreg` is merged, the settings registry contains the following keys and values:

```ini
"/O3DE/AzFramework/MyArray/0" = true
"/O3DE/AzFramework/MyArray/1" = false
"/O3DE/AzFramework/MyArray/2" = 75
"/O3DE/AzFramework/MyArray/3" = "StringX"
"/O3DE/AzFramework/MyArray/4/InnerObject/MyKey" = "PathKey"
"/O3DE/AzFramework/MyObject/AssetKey" = "{80CCDA30-1F70-4982-ADE9-62D3DEE332D4}"
```

The values that are associated with the JSON array underneath the "/O3DE/AzFramework/MyArray" key from the merger of the `streamer.setreg` file have been updated with the values of the `streamer.editor.setreg` file.

### Merge settings registry files from directories

Merging a specific `.setreg` or `.setregpatch` file or merging a JSON document requires only specifying the file name or JSON content. Merging a directory containing `.setreg` or `.setregpatch` files requires the not only the directory name, but also specifying a list of tags known as *specializations* to the merge API.

The following example contains the specializations of "automatedtesting", "automatedtesting\_gamelauncher", "game" and the current build configuration tag as part of it's name (debug, profile, release):

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
    registry.MergeSettingsFolder(mergePath.Native(), specializations, platform);
}
```

The details of specializations are explained in the following sections on Auxiliary APIs.

## Auxiliary APIs

The Settings Registry merge utilities are a set of functions located in `AzCore/Settings/SettingsRegistryMergeUtils.h` which contains implementation of merging of common files, directory locations, and the command line. It also contains functions for querying and setting a specialization within the Settings Registry underneath the key of "/Amazon/AzCore/Settings/Specializations". Specializations can be used for filtering which `*.setreg` files to merge when `SettingsInterface::MergeSettingsFolder` is invoked.

The Settings Registry Merge Utilities also contains a function for dumping JSON value at a specific JSON pointer path to an `AZ::IO::GenericStream`.

The following list provides links to the various auxiliary APIs in `AzCore/Settings/SettingsRegistryMergeUtils.h`:

* [Merge to Settings Registry API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L133-L263)
* [Query Specialization Tag API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L125-L131)
* [Settings Registry Section Dumping API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L276-L304)

## O3DE Manifest utils API

The Settings Registry Merge Utilities also provides the [O3DE Manifest Utils API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L349-L404) which is a set of helper functions for visiting the set of active Gems as well as recursively visiting the O3DE manifest "external\_subdirectories" to determine the set of all registered Gems.  

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

## Loading Gems

CMake is used to output a list of tagged `.setreg` files (`cmake_dependencies.<target>.setreg`), which contain the build dependencies of a CMake Target that loads through the O3DE module system.
This is used to automatically load Gems based on the build dependencies of a CMake Target. This section demonstrates how to generate a `.setreg` file that contains a list of Gem build dependencies.

The following is the `CMakeLists.txt` for for a *hypothetical* voxel editor feature:

**CMakeLists.txt (Voxel Editor)**

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

Running the CMake command generates a solution and a `cmake_dependencies.voxeleditor.setreg`. It recurses through the list of Gems "RUNTIME\_DEPENDENCIES" and looks for a "GEM\_MODULE" target property to determine the list of required Gems.

For example, the following is how the Atom Bridge Gem is configured in CMake:

**CMakeLists.txt (AtomBridge)**

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

Configuring CMake for the voxel editor generates the following `.setreg` file in the executable directory `Registry` directory:

**cmake\_dependencies.voxeleditor.setreg (Voxel Editor)**
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

You then add a Settings Registry specialization that is used to load the `cmake_dependencies.voxeleditor.setreg` file. This is done in C++ code via the `SettingsRegistryMergeUtils::MergeSettingsToRegistry_AddBuildSystemTargetSpecialization` function as in the following example:

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

The `AZ::ComponentApplication` uses the Gem modules filenames stored within the Settings Registry to load the Gems from the filesystem. It also merges `<GemRootPath>/Registry/*.setreg` files for each Gem. CMake targets based on the game project can also generate a `.setreg` file by using the `ly_enable_gems` function.

The AtomTest project Gem uses the `ly_enable_gems` function to generate `cmake_dependencies.atomtest.<target>.setreg` files. That file contains the list of shared library file paths and Gem source directory to load as shown in the following example:

**CMakeLists.txt (AtomTest)**

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

The `ly_enable_gems` function adds build and load dependencies to the AtomTest project.

During CMake generation, the settings registry files are generated in the `<CMakeBuildDir>/bin/$<CONFIG>` directory based on the `ly_enable_gems` functions. For example, configuring CMake for Windows with only the AtomTest project enabled generates the following `.setreg` files:

```
<CMakeBuildDir>\bin\profile\Registry\cmake_dependencies.atomtest.editor.setreg
<CMakeBuildDir>\bin\profile\Registry\cmake_dependencies.atomtest.assetprocessor.setreg
<CMakeBuildDir>\bin\profile\Registry\cmake_dependencies.atomtest.atomtest_gamelauncher.setreg
...
```

The generated project `.setreg` files are formatted as `cmake_dependencies.<ProjectNameLower>.<CMakeTargetNameLower>.setreg`. The project name is part of the generated `cmake_dependencies.*.setreg` file name because O3DE allows configuring multiple projects at once. The same applications, such as O3DE Editor and Asset Processor, are used for each game project, but the applications need to load a different set of Gems based on the active game project, so the project name is added as part of the CMake build dependencies settings registry files.

For example, if CMake is configured with the value of `-DLY_PROJECTS="AutomatedTesting;D:/o3de/AtomSampleViewer"`, the following `.setreg` files are generated:

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

### Platform specific Gem loading

Gems can be built and loaded on a per platform basis by calling the `ly_enable_gems` function multiple times for a given variant with Platform Abstraction Layer (PAL) paths.
CMake supports several Platform Abstraction variables that can be used to include specific enabled Gems based on the current platform (Windows, Linux, Android, and so on).

The following example demonstrates how to specify general and platform specific Gem dependencies together:

```cmake
o3de_pal_dir(pal_dir ${CMAKE_CURRENT_LIST_DIR}/Platform/${PAL_PLATFORM_NAME} "${gem_restricted_path}" "${gem_path}" "${gem_parent_relative_path}")
# Read a platform specific cmake file that contains the names of gems to activate
ly_enable_gems(PROJECT_NAME AtomTest GEM_FILE ${pal_dir}/enabled_gems.cmake)
```

### Explicit Gem activation

As mentioned in the [Loading gems](#loading-gems) section, the building of Gems is determined by the name of the Gems in the `enabled_gems.cmake` file. This file should not be manually modified. Instead use the `o3de.py` `enable-gem` and `disable gem` commands or **Project Manager** to add or remove Gems. This section explains how to enable and disable a Gem for building, as well as how to turn off autoloading of Gems using the Settings Registry.

The following example demonstrates using the `o3de.py` Python script commands to add and remove explicit Gem activation for a Gem named "Sponza" in the AutomatedTesting project:

```bash
# The following command adds explicit activation of the "Sponza" gem within the AutomatedTesting project
# It will modify the enabled_gems.cmake file and conditionally the project.json file if the gem being activated is registered with the global o3de_manifest.json
[engine-root]> scripts\o3de.bat enable-gem --gem-name Sponza --project-path AutomatedTesting
# The following command removes explicit activation of the "Sponza" gem within the AutomatedTesting project
# It will modify the enabled_gems.cmake file and conditionally the project.json file if the gem being activated is registered with the global o3de_manifest.json
[engine-root]> scripts\o3de.bat disable-gem --gem-name Sponza --project-path AutomatedTesting
```

### Disable Gem autoloading

During the CMake project generation step, a `cmake_dependencies.*.setreg` file that contains a list of Gems to load is generated. To prevent autoloading of a specific Gem, set a JSON boolean value of `false` at the in JSON pointer format for the Gem using the path of `"/O3DE/Gems/${GemName}/${TargetModule}/AutoLoad"`. For example, you can add a `.setreg` file in the `"<project-root>/Registry/"` directory that sets the `"/O3DE/Gems/${GemName}/${TargetModule}/AutoLoad=false"` value.

The following is a snippet of the generated `cmake_dependencies.automatedtesting.assetproccessor.setreg` that is generated when O3DE is configured with for the AUtomated Testing project (`-DLY_PROJECTS=AutomatedTesting`).

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

The ChatPlay Client and QtForPython Tools modules can be disabled from autoloading on a *per user* basis by placing a `.setreg` file either in the `<project_root>/User/Registry` (per project override) or in the `~/.o3de/Registry` global user override as in the following example:

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

To disable Gem autoloading at the *project* level, a `.setreg` file, such as the preceding example, can be placed in `<project_root>/Registry`, the project's `Registry` directory.

To disable Gem autoloading at the *platform* level, a `.setreg` file, such as the preceding example, can be placed in the `<O3DE root>/Registry/Platform/${PAL_PLATFORM_NAME}` directory.

### Load Gems in C++

You can manually load Gems in an application through C++ if needed. `SettingsRegistryMergeUtils.cpp` contains a function, [MergeSettingsToRegistry_TargetBuildDependencyRegistry](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L216-L220), that loads the `cmake_dependencies.<tag1>.<tag2>.setreg` files that the list of Gems to load. Gems are loaded based on the values in the "specialization" tag structure. The list of Gem modules are stored in the Setting Registry.

```c++
void MergeSettingsToRegistry_TargetBuildDependencyRegistry(SettingsRegistryInterface& registry, const AZStd::string_view platform,
    const SettingsRegistryInterface::Specializations& specializations, AZStd::vector<char>* scratchBuffer);
```

`ComponentApplication.cpp` is responsible for loading the required Gems through the [LoadDynamicModule](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Component/ComponentApplication.h#L297-L299) function which reads the Settings Registry for all array keys at the paths of `/O3DE/Gems/${GemName}/Modules` and aggregates that into a list of Gems to load.

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

## Add a Gems scan folder

The Settings Registry supports configuring settings for Asset Processor. The `AssetProcessorPlatformConfig.setreg` file can be used as a reference for available settings: [AssetProcessorPlatformConfig.setreg](https://github.com/o3de/o3de/blob/development/Registry/AssetProcessorPlatformConfig.setreg).

### Gem asset scan folders

To add additional Scan Folders for an active Gem, a `.setreg` file can add a "ScanFolder \<name>" under the the "/Amazon/AssetProcessor/Settings" field. The "\<name>" portion can be anything as long as it doesn't collide with another scan folder entry.

The following example adds the `<Blast Gem Root>/Editor/Scripts` folder as a Scan Folder for the Asset Processor:

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

## Convert `.ini` files to JSON

To help convert Windows style `.ini` settings for use in the Settings Registry, the `SerializeContextTools` exposes a "convert-ini" option that can accept one or more `.ini` style files and convert them to `.setreg` files that can be loaded in the Settings Registry. The following example demonstrates conversion of the `AssetProcessorPlatformConfig.ini` and the `user.cfg` to a `.setreg` file.

**convert-ini**

```bash
<CMakeBinaryDir>/bin/profile/SerializeContextTools.exe convert-ini --files AssetProcessorPlatformConfig.ini;user.cfg --ext setreg --json-prefix="/O3DE/Settings"
```

## MSVC debugging

The Settings Registry maintains its settings in a `rapidjson::Document` that is a member variable in `AZ::SettingsRegistryImpl`.

The rapidjson 3rdParty provides a Native Visualizer (`.natvis`) file for the MSVC debugger which makes it easy to recurse through `rapidjson::Value` and `rapidjson::Document` instances. This `.natvis` file is part of `AzCore` and can be visualized in Visual Studio. Expanding `AZ::SettingsRegistryImpl::m_settings` provides a view of the values within the Settings Registry. This allows for drilling down to a particular JSON entry within the Settings Registry to determine if an entry exists, and its value.
