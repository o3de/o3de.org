---
description: Learn about the Settings Registry and how it interacts with Core Systems such as the Console and Gem Systems
title: Settings Registry Documentation
linktitle: Settings Registry
weight: 300
---


# Summary
The *Settings Registry* is a way to provide settings and configuration for **Open 3D Engine (O3DE)** applications.
It gathers those those settings from JSON documents with the extension of .setreg/.setregpatch.
Settings

## Technical Details
The Settings Registry allows users to query and set settings anywhere within O3DE applications by using [JSON Pointer syntax](https://tools.ietf.org/html/rfc6901).
For example to query a setting from a JSON document containing the following
```JSON
{
    "O3DE": {
        "CustomSetting": false
    }
}
```
The JSON pointer path would be `"/O3DE/CustomSetting"`

Users may merge and modify settings to the Settings Registry from the filesystem through [JSON Patch](https://tools.ietf.org/html/rfc6902) or [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) format files.

The Settings Registry can also be interacted with through [command line parameters](./settings-registry-override-query-command-line.md), the [AZ::Console system](./settings-registry-how-to-use-scripting-languages.md) or through [Scripting(Lua, ScriptCanvas, Python)](./settings-registry-how-to-use-scripting-languages.md).


| Topic | Explanation |
| - | - |
| [Settings Registry Developer Guide](./settings-registry-developer-documentation.md) | Provides a Deep-Dive on the Settings Registry feature. Examples on using the Settings Registry are provided in a multiples scenarios. The interaction between the CMake Build Generation system, the Settings Registry and the Gem Module System are expanded upon. |
| [AZ Console - Executing Commands using Settings Registry](./az-console-how-to-use-settings-registry.md) | Details how to execute console commands using the Settings Registry |
| [Accessing the Settings Registry via the AZ Console](./settings-registry-how-to-use-az-console.md) | Provides the list of AZ Console commands that can modify the Console |
| [Accessing the Settings Registry via Scripting](./settings-registry-how-to-use-scripting-languages) | Describes the Settings Registry Scripting API. Examples are provided for Python and Lua |
| [Accessing Command Line Arguments using the Settings Registry](./settings-registry-override-query-command-line) | Describes how to access the command line supplied to the application using the Settings Registry |
| [Dumping the Settings Registry](./settings-registry-how-to-dump-settings-registry) | How-To Guide that explains how the Settings Registry can be output to stream |



## Related topics

| Topic | Description |
| --- | --- |
| [Gem Module system](/docs/user-guide/programming/gems/overview/) | Explains how O3DE Loads and Initializes Gems in C++ |
