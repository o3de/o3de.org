---
linkTitle: API Examples
title: Settings Registry API Examples
description: Provides information about the available Settings Registry APIs with examples
weight: 800
---

Details the available set of APIs provided by the Settings Registry.  Examples are provided for the ability to query settings, using both the query and visitor APIs. How to define and update settings using the setter APIs.

Settings can be merged from files or in-memory JSON documents using the merge API.  Finally, notifications of when settings have been modified or removed are available using the notification API.

### Query API

The [query API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L224-L260) supports directly querying the types of `bool`, `int64_t`, `double`, `AZStd::string`, `AZStd::fixed_string`, and any object reflected to the `SerializeContext`. The getter method of querying objects from the `SerializeContext` is safe to use, but it should be respected as an implementation detail of the Settings Registry. The `SettingsRegistryInterface::GetObject` interface will remain stable, but no assumptions should be made on how objects are serialized.

The following example demonstrates the query API for builtin settings types (`bool`, `AZ::s64`, `AZ::u64` `double`, `(fixed_)string`):

```c++
// Setting FileIOBase alias based on values within the Settings Registry
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

To load C++ class objects using the Settings Registry, the type itself must be reflected to the `SerializeContext` to use the query API. Instead of calling the `SettingsRegistryInterface::Get` method for querying built-in JSON types, the `SettingsRegistry::GetObject` function is used.

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

The [visitor API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistry.h#L185-L194) supports recursively visiting the JSON object and array children starting at a specified JSON pointer. The visitor API allows for processing each child field which isn't available when using the `GetObject` API. It also provides type flexibility when dealing with JSON data. A visitor for the Settings Registry must implement the `AZ::SettingsRegistryInterface::Visitor` class. An instance of that class can be supplied to the `AZ::SettingsRegistryInterface::Visit()` method.

The visitor is recommended when serializing in/out complex objects that don't have any `SerializeContext` reflection. Since it isn't tied to the `SerializeContext`, the same logic could be used to read objects from the Settings Registry using the JSON facilities available within other programming languages such as Python, JavaScript, or C#.

The following example demonstrates using the visitor API to gather active gem info populated under the settings object at "/O3DE/Gems".  This is done by the [GetGemsInfo](https://github.com/o3de/o3de/blob/adb37ad54d69bcef23c5b7f70c77e669f8202194/Code/Framework/AzFramework/AzFramework/Gem/GemInfo.cpp#L27-L64) function.

```c++
// Queries the Settings Registry to get the list active gems targets and source paths
auto GemSettingsVisitor = [&settingsRegistry, &gemInfoList](const AZ::SettingsRegistryInterface::VisitArgs& gemVisitArgs)
{
    auto FindGemInfoByName = [&gemVisitArgs](const GemInfo& gemInfo)
    {
        return gemVisitArgs.m_fieldName == gemInfo.m_gemName;
    };
    auto gemInfoFoundIter = AZStd::ranges::find_if(gemInfoList, FindGemInfoByName);
    GemInfo& gemInfo = gemInfoFoundIter != gemInfoList.end() ? *gemInfoFoundIter : gemInfoList.emplace_back(gemVisitArgs.m_fieldName);

    // Read the Gem Target Name into target Name field
    auto VisitGemTargets = [&gemInfo](const AZ::SettingsRegistryInterface::VisitArgs& visitArgs)
    {
        // Assume the fieldName is the name of the target in this case
        gemInfo.m_gemTargetNames.emplace_back(visitArgs.m_fieldName);
        return AZ::SettingsRegistryInterface::VisitResponse::Skip;
    };
    AZ::SettingsRegistryVisitorUtils::VisitObject(settingsRegistry, VisitGemTargets,
        FixedValueString::format("%.*s/Targets", AZ_STRING_ARG(gemVisitArgs.m_jsonKeyPath)));

    // Visit the "SourcePath" array fields of the gem to populate the Gem Absolute Source Paths array
    const auto gemPathKey = FixedValueString::format("%s/%.*s/Path",
        AZ::SettingsRegistryMergeUtils::ManifestGemsRootKey, AZ_STRING_ARG(gemVisitArgs.m_fieldName));
    if (AZ::IO::Path gemRootPath; settingsRegistry.Get(gemRootPath.Native(), gemPathKey))
    {
        gemInfo.m_absoluteSourcePaths.emplace_back(gemRootPath);
    }

    return AZ::SettingsRegistryInterface::VisitResponse::Skip;
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

    void Visit(const AZ::SettingsRegistryInterface::VisitArgs& visitArgs)
    {
        if (int value; registry.Get(value, visitArgs.m_jsonKeyPath))
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
auto AppendObjectFields = [&fieldToIntMap](const AZ::SettingsRegistryInterface::VisitArgs& visitArgs)
{
    if (int value{}; registry.Get(value, visitArgs.m_jsonKeyPath))
    {
        fieldToIntMap.emplace(visitArgs.m_fieldName, value);
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

// ... Later, the SceneConfiguration class can be stored in the Settings Registry
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
    [&registry](const AZ::SettingsRegistryInterface::NotifyArgs& notifyArgs)
{
    if (notifyArgs.m_jsonKeyPath == "/O3DE/Runtime/FilePaths/CacheRootFolder"
        && notifyArgs.m_type == SettingsRegistryInterface::Type::String)
    {
        AZ::IO::FixedMaxPath cacheRootPath;
        if (registry.Get(cacheRootPath.Native(), notifyArgs.m_jsonKeyPath))
        {
            AZ_TracePrintf("Settings Registry Tracking", "The Asset Cache path has changed to %s", cacheRootPath.c_str());
        }
    }
};

{
    // The SettingsRegistryInterface::RegisterNotifier function returns an AZ event handler that needs to be stored for as long
    // as desired to receive the notification events
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

### Merge Settings Registry files from directories

Merging a specific `.setreg` or `.setregpatch` file or merging a JSON document requires only specifying the file name or JSON content. Merging a directory containing `.setreg` or `.setregpatch` files requires not only the directory name but also specifying a list of tags known as *specializations* to the merge API.

The following example contains the specializations of `automatedtesting`, `automatedtesting_gamelauncher`, `game` and the current build configuration tag as part of its name (debug, profile, release):

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

The Settings Registry Merge Utilities also contains a function for dumping JSON values at a specific JSON pointer path to an `AZ::IO::GenericStream`.

The following list provides links to the various auxiliary APIs in `AzCore/Settings/SettingsRegistryMergeUtils.h`:

* [Merge to Settings Registry API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L133-L263)
* [Query Specialization Tag API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L125-L131)
* [Settings Registry Section Dumping API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L276-L304)

## O3DE Manifest utils API

The Settings Registry Merge Utilities also provides the [O3DE Manifest Utils API](https://github.com/o3de/o3de/blob/02846cf44347cbf4fae0faacc4a2ba74284908ff/Code/Framework/AzCore/AzCore/Settings/SettingsRegistryMergeUtils.h#L349-L404), which is a collection of helper functions for visiting the set of active Gems as well as recursively visiting the O3DE manifest "external_subdirectories" to determine the set of all registered Gems.
