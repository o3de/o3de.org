---
linkTitle: Data Classes
title: Data Classes
description: Classes that describe various data maintained in Project Manager
weight: 200
---

{{< note >}}
This information is for developers of the **Project Manager** tool. If you're a user working with Project Manager, please refer to the [Project Manager User Guide](/docs/user-guide/project-config/project-manager).
{{< /note >}}

{{< note >}}
This contains brief summaries of various class's functionality and role. If available, there are additional links in the table of contents, either with expanded information, or github links. All documentation reflects code as of commit [(b79bd3df1f)](https://github.com/o3de/o3de/tree/b79bd3df1fe5d4c2a639d3921a29bd0d95712f6c) 
{{< /note >}}




## Overview

| Class | Source Code | Description |
| - | - | - |
| TemplateInfo | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/TemplateInfo.h)  [cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/TemplateInfo.cpp) | Describes data fields to encapsulate a generic Template. |
| ProjectTemplateInfo | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ProjectTemplateInfo.h) | Subclass of Template specific to Projects. Only difference is that this one includes Gems. |
| SettingsInterface | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/SettingsInterface.h) | Interface for interacting with the O3DE Settings Registry. |
| [Settings](#settings) | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Settings.h)  [cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Settings.cpp) | Implementation for `SettingsInterface` to interact with O3DE Settings Registry. |
| ProjectInfo | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ProjectInfo.h)  [cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ProjectInfo.cpp) | Contains data structure to describe a project, as recorded in project.json, inside `ProjectManager`. Also contains metadata for remote projects, or for checking if a project needs to be rebuilt. |
| EngineInfo | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/EngineInfo.h)  [cpp file](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/EngineInfo.cpp) | Contains data structure to describe the current engine, as recorded in engine.json, inside `ProjectManager`. Also contains metadata for engine registration. |
| ProjectManagerDefs | [header](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/ProjectManagerDefs.h) | Contains various constants and preset strings. |






### Settings

We specify the `SettingsInterface` as a contract to ensure we implement the proper methods, and to enable global access to settings from a clean interface ([one example](https://github.com/o3de/o3de/blob/b79bd3df1fe5d4c2a639d3921a29bd0d95712f6c/Code/Tools/ProjectManager/Source/ExternalLinkDialog.cpp#L88)). It also acts as a singleton interface for accessing Project Manager settings.

`SettingsInterface` specifies the following functions as the contract to interact with O3DE Settings Registry:
| Function | Description | Implementation |
| - | - | - |
| [`SettingsInterface::Get`](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/SettingsInterface.h#L31-L44) | Using a `QString` key, can either return the string or bool value. | [code](https://github.com/o3de/o3de/blob/7d716a4a21afd217444d91043ea810f6c8a38f21/Code/Tools/ProjectManager/Source/Settings.cpp#L65-L79) |
| [`SettingsInterface::Set`](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/SettingsInterface.h#L46-L59) | Using a `QString` key, can either set a string or bool value for an entry. | [code](https://github.com/o3de/o3de/blob/7d716a4a21afd217444d91043ea810f6c8a38f21/Code/Tools/ProjectManager/Source/Settings.cpp#L81-L99) |
| [`SettingsInterface::Remove`](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/SettingsInterface.h#L61-L66) | Removes a entry with `QString` key from the registry. | [code](https://github.com/o3de/o3de/blob/7d716a4a21afd217444d91043ea810f6c8a38f21/Code/Tools/ProjectManager/Source/Settings.cpp#L101-L109) |
| [`SettingsInterface::Copy`](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/SettingsInterface.h#L68-L75) | Copies the value from one key to another. Can also optionally remove the original entry, acting as a "Move" command. | [code](https://github.com/o3de/o3de/blob/7d716a4a21afd217444d91043ea810f6c8a38f21/Code/Tools/ProjectManager/Source/Settings.cpp#L111-L132) |
| [`SettingsInterface::GetProjectKey`](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/SettingsInterface.h#L77-L82) | Given a `ProjectInfo` instance, provides a key prefix for where that project should be in settings registry. | [code](https://github.com/o3de/o3de/blob/7d716a4a21afd217444d91043ea810f6c8a38f21/Code/Tools/ProjectManager/Source/Settings.cpp#L134-L137) |
| [`SettingsInterface::GetProjectBuiltSuccessfully`](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/SettingsInterface.h#L84-L90) | Queries the latest build status of a given project, if successful or not. | [code](https://github.com/o3de/o3de/blob/7d716a4a21afd217444d91043ea810f6c8a38f21/Code/Tools/ProjectManager/Source/Settings.cpp#L144-L163) |
| [`SettingsInterface::SetProjectBuiltSuccessfully`](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/SettingsInterface.h#L91-L97) | Sets the latest build status of a given project, if successful or not. | [code](https://github.com/o3de/o3de/blob/7d716a4a21afd217444d91043ea810f6c8a38f21/Code/Tools/ProjectManager/Source/Settings.cpp#L165-L187) |

All of these functions are pure virtual functions, which require implementation in a base implementation class, otherwise it results in a compilation error, thereby enforcing the contract.

The [`Settings`](https://github.com/o3de/o3de/blob/development/Code/Tools/ProjectManager/Source/Settings.h) class [inherits](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/Settings.h#L23-L24) `SettingsInterface` which uses [`AZ::SettingsRegistryInterface`](https://github.com/o3de/o3de/blob/b79bd3df1fe5d4c2a639d3921a29bd0d95712f6c/Code/Tools/ProjectManager/Source/Settings.h#L48) under the hood to interact with the O3DE Settings Registry.

This mirrors JSON so that values can be retrieved by key paths. For example, take a .setreg like:
```json
{
    "key":{
        "subkey":{
            "subsubkey":"value"
        }
    }
}
```
Then the value can be retrieved using the string key `key/subkey/subsubkey`.

The `ProjectManager::SettingsInterface` is similar to `AZ::SettingsRegistryInterface`, except it overrides some of the behavior to look for configuration specific to Project Manager, instead of O3DE as a whole. It's also modified to work with `QString`, which the `AZ` counterpart does not handle.

The `Settings` class inherits from `SettingsInterface::Registrar`. The [`Registrar`](https://github.com/o3de/o3de/blob/b79bd3df1fe5d4c2a639d3921a29bd0d95712f6c/Code/Framework/AzCore/AzCore/Interface/Interface.h#L100-L106) is part of the `AZ::Interface` in `AzCore`.

The [implementation](https://github.com/o3de/o3de/blob/b79bd3df1fe5d4c2a639d3921a29bd0d95712f6c/Code/Framework/AzCore/AzCore/Interface/Interface.h#L202-L212) of `Registrar` registers the interface globally, which indicates the singleton pattern.

Here are the remaining functions that `Settings` also provides:
| Function | Description |
| - | - |
| [`Settings::Save`](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/Settings.cpp#L25-L55) | Dumps the settings registry into a string stream. Then tries to open the `ProjectManager.setreg` file in the O3DE user path, and write the stream data into that file. |
| [`Settings::GetBuiltSuccessfullyPaths`](https://github.com/o3de/o3de/blob/69dbcd08a56539315bfb0472984daf0f46e7a966/Code/Tools/ProjectManager/Source/Settings.cpp#L139-L142) | For each project path requested, fetches the build status. Returns the result as a set. |

[Back to Overview](#overview)