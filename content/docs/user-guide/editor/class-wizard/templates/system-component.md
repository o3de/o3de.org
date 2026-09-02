---
title: "System Component"
linkTitle: "System Component"
description: "Template for creating global system components on the system entity."
weight: 40
---

**Template name:** `SystemComponent`
**CLI:** `--template system_component`
**Suffix:** `Component` -- produces `${Name}Component`

An engine-level system component that lives on the system entity. System components provide global services that run outside of entity context -- input managers, network systems, resource registries, and similar singletons. The component is automatically registered in `GetRequiredSystemComponents()` so it activates at engine startup.

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
| `register_system_component` | Always | Adds to `GetRequiredSystemComponents()` for auto-activation |
| `register_interface_header` | `!skip_interface` | Registers interface header in API/INTERFACE target |


## Full Template JSON

```json
{
    "template_name": "SystemComponent",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "System Component Template",
    "summary": "A component template for a global system component on the system entity.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "SystemComponent"
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
        "display_name": "System Component",
        "class_name": "system_component",
        "description": "A global system component that lives on the system entity and activates automatically at engine startup.",
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
                "command": "register_system_component",
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
