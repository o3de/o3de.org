---
description: Learn about the Settings Registry and how it interacts with Core Systems such as the Console and Gem Systems
title: Settings Registry Documentation
linktitle: Settings Registry
weight: 300
---


The *Settings Registry* is a system that acts a repository of settings within the **Open 3D Engine (O3DE)** applications. It allows users to query those settings anywhere within O3DE applications by using [JSON Pointer syntax](https://tools.ietf.org/html/rfc6901). Users may merge and modify settings within the Settings Registry using the filesystem through loading [JSON Patch](https://tools.ietf.org/html/rfc6902) or [JSON Merge Patch](https://tools.ietf.org/html/rfc7386) format files. Furthermore the Settings Registry can be modified through command line parameters, the AZ::Console system or through Scripting(Lua, ScriptCanvas, Python).


| Topic | Explanation |
| - | - |
| [Settings Registry Developer Guide](./settings-registry-developer-documentation.md) | Provides a Deep-Dive on the Settings Registry feature. Explanations on the Settings Registry features are detailes. Examples on using the Settings Registry are provided in a myriad of use case. The interaction between the CMake Build Generation system, the Settings Registry and the Gem Module System are expanded upon. |
| [AZ Console - Executing Commands using Settings Registry](./az-console-how-to-use-settings-registry.md) | Details how to execute console commands using the Settings Registry |
| [Accessing the Settings Registry via the AZ Console](./settings-registry-how-to-use-az-console.md) | Provides the list of AZ Console commands that can modify the Console |
| [Accessing the Settings Registry via Scripting](./settings-registry-how-to-use-scripting-languages) | Describes the Settings Registry Scripting API. Examples are provided for Python and Lua |
| [Accessing Command Line Arguments using the Settings Registry](./settings-registry-override-query-command-line) | Outlines the API for marshaling command line arguments from/to the Settings Registry |
| [Dumping the Settings Registry](./settings-registry-how-to-dump-settings-registry) | How-To Guide that explains how the Settings Registry can be output to stream |



## Related topics

| Topic | Description |
| --- | --- |
| [Gem Module system](/docs/user-guide/programming/gems/overview/) | Explains how O3DE Loads and Initializes Gems in C++ |
