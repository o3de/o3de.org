---
title: "LyShine Component"
linkTitle: "LyShine Component"
description: "Template for creating UI components using the LyShine/UiCanvas system."
weight: 50
---

**Template name:** `LyShineComponent`
**CLI:** `--template lyshine_component`
**Suffix:** `Component` -- produces `${Name}Component`

A UI component for the LyShine (UI 2.0) system. LyShine components are used to create custom UI elements that work within the UiCanvas framework -- buttons, health bars, inventory slots, and other interactive UI elements. Automatically adds the LyShine gem as a build dependency.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${Name}Component.cpp` | Always |
| `Source/${Name}Component.h` | Always |

**Input variables:**

This template has no additional input variables beyond the standard `Name` and `GemName`.

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers component in runtime module |
| `add_gem_dependency` | Always | Adds `Gem::LyShine.API` as a build dependency |


## Full Template JSON

```json
{
    "template_name": "LyShineComponent",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "LyShine Component Template",
    "summary": "A UI component template for the LyShine (UI 2.0) canvas system.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "LyShineComponent"
    ],
    "icon_path": "preview.png",
    "copyFiles": [
        {
            "file": "Source/${Name}Component.cpp",
            "isTemplated": true
        },
        {
            "file": "Source/${Name}Component.h",
            "isTemplated": true
        }
    ],
    "createDirectories": [
        {
            "dir": "Source"
        }
    ],
    "class_wizard": {
        "display_name": "LyShine Component",
        "class_name": "lyshine_component",
        "description": "A UI component that integrates with the LyShine/UiCanvas system.",
        "component_suffix": "Component",

        "input_vars": [],

        "process_commands": [
            {
                "command": "register_file_list",
                "args": { "component_name": "${Name}${ComponentSuffix}" }
            },
            {
                "command": "register_module_descriptor",
                "args": { "component_name": "${Name}${ComponentSuffix}", "module_kind": "runtime" }
            },
            {
                "command": "add_gem_dependency",
                "args": { "dependency": "Gem::LyShine.API" }
            }
        ]
    }
}
```
