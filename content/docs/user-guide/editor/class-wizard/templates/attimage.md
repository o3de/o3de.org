---
title: "Attimage"
linkTitle: "Attimage"
description: "Template for creating attachment image assets used in rendering features."
weight: 70
---

**Template name:** `Attimage`
**CLI:** `--template attimage`
**Suffix:** `Attimage` -- produces `${Name}Attimage`

An attachment image asset template for rendering features across the engine. Attachment images are used in the render pipeline for render targets, depth buffers, and intermediate rendering surfaces.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${Name}Attimage.cpp` | Always |
| `Source/${Name}Attimage.h` | Always |

**Input variables:**

This template has no additional input variables beyond the standard `Name` and `GemName`.

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers component in runtime module |


## Full Template JSON

```json
{
    "template_name": "Attimage",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "Attimage Template",
    "summary": "An attachment image asset template for rendering pipeline features.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "Attimage"
    ],
    "icon_path": "preview.png",
    "copyFiles": [
        {
            "file": "Source/${Name}Attimage.cpp",
            "isTemplated": true
        },
        {
            "file": "Source/${Name}Attimage.h",
            "isTemplated": true
        }
    ],
    "createDirectories": [
        {
            "dir": "Source"
        }
    ],
    "class_wizard": {
        "display_name": "Attimage",
        "class_name": "attimage",
        "description": "An attachment image asset for rendering pipeline render targets, depth buffers, and intermediate surfaces.",
        "component_suffix": "Attimage",

        "input_vars": [],

        "process_commands": [
            {
                "command": "register_file_list",
                "args": { "component_name": "${Name}${ComponentSuffix}" }
            },
            {
                "command": "register_module_descriptor",
                "args": { "component_name": "${Name}${ComponentSuffix}", "module_kind": "runtime" }
            }
        ]
    }
}
```
