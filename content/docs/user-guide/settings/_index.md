---
title: Settings Registry
linktitle: Settings Registry
description: Learn how to provide settings and configuration options for the tools and applications in Open 3D Engine (O3DE) with the Settings Registry.
weight: 350
---

With the Settings Registry, you can provide settings and configurations for **Open 3D Engine (O3DE)** applications and tools.

Settings are stored in JSON files with `.setreg` and `.setregpatch` extensions. You can define, query, and change O3DE application settings using [JSON Pointer syntax](https://tools.ietf.org/html/rfc6901). In the following example, the JSON Pointer path is `"/O3DE/CustomSetting"`:

```JSON
{
    "O3DE": {
        "CustomSetting": false
    }
}
```

Settings can be merged and modified through [JSON Patch](https://tools.ietf.org/html/rfc6902) or the [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) format files.

You can interact with the Settings Registry in O3DE through the following methods:

* [Command line arguments](./command-line-arguments)
* [AZ::Console system](./az-console)
* [Script (Lua, Script Canvas, Python)](./script-api)

## Topics

| Topic | Description |
| - | - |
| [Command Line Arguments and the Settings Registry](./command-line-arguments) | Learn how to modify the Settings Registry from the command line and access the command line supplied to the application. |
| [Settings Registry Script API](./script-api) | Learn the Settings Registry Script API with examples for Python and Lua. |
| [Access the Settings Registry with Console Commands](./az-console) | Use Console commands to read and modify the Settings Registry. |
| [Issue Console Commands from the Settings Registry](./issue-az-console-commands) | Learn how to run Console commands using the Settings Registry. |
| [Output the Settings Registry to Stream with C++](./output-settings-registry) | Output the Settings Registry to an IO stream with C++. |
| [Settings Registry Developer Guide](./developer-documentation) | Provides detailed developer information about the Settings Registry. Settings Registry examples are provided for multiple scenarios. The interaction between the CMake Build Generation system, the Settings Registry, and the Gem Module System are described in detail. |
| [Gem Loading and the Settings Registry](./gem-loading) | Learn how the Settings Registry is used to load Gem Modules and configure Gem settings. |

## Related topics

| Topic | Description |
| --- | --- |
| [Gem Module system](/docs/user-guide/programming/gems/overview/) | Explains how O3DE Loads and Initializes Gems in C++. |
