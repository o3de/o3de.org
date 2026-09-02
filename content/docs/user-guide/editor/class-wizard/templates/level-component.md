---
title: "Level Component"
linkTitle: "Level Component"
description: "Template for creating components that attach to the level entity."
weight: 30
---

**Template name:** `LevelComponent`
**CLI:** `--template level_component`
**Suffix:** `Component` -- produces `${Name}Component`

A component that attaches to the level entity rather than individual game entities. Level components are useful for per-level services like weather systems, lighting controllers, or level-wide game logic. The component's `Activate()` / `Deactivate()` lifecycle is tied to level load and unload.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${Name}Component.cpp` | Always |
| `Source/${Name}Component.h` | Always |
| `Include/${GemName}/${Name}Interface.h` | Only when `skip_interface` is false |

The interface header carries `cleanup_hint: "interface"` -- if skipped, all EBus wiring is removed from remaining files.

**Input variables:**

| Var Name | Type | Default | show_if | Description |
|---|---|---|---|---|
| `skip_interface` | toggle | false | -- | Omit `${Name}Interface.h` and all EBus wiring |

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers component in runtime module |
| `register_interface_header` | `!skip_interface` | Registers interface header in API/INTERFACE target |


## Full Template JSON

```json
{
    "template_name": "LevelComponent",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "Level Component Template",
    "summary": "A component template for a level-scoped component.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "LevelComponent"
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
        },
        {
            "file": "Include/${GemName}/${Name}Interface.h",
            "isTemplated": true,
            "isInterface": true,
            "cleanup_hint": "interface",
            "condition": "!skip_interface"
        }
    ],
    "createDirectories": [
        {
            "dir": "Include/${GemName}"
        },
        {
            "dir": "Source"
        }
    ],
    "class_wizard": {
        "display_name": "Level Component",
        "class_name": "level_component",
        "description": "A component that attaches to the level entity. Activates on level load and deactivates on level unload.",
        "component_suffix": "Component",

        "input_vars": [
            {
                "input_type": "toggle",
                "var_name": "skip_interface",
                "title": "Skip Interface",
                "default_value": false,
                "description": "Do not create the Interface.h file"
            }
        ],

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
                "command": "register_interface_header",
                "condition": "!skip_interface",
                "args": { "component_name": "${Name}" }
            }
        ]
    }
}
```
