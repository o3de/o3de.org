---
title: "Basic Component"
linkTitle: "Basic Components"
description: ""
weight: 20
---

**Template name:** `DefaultComponent`
**CLI:** `--template default_component`
**Suffix:** `Component` -- produces `${Name}Component`

The standard O3DE game component. Optionally generates an EBus interface header and an EditorComponent wrapper for editor-side representation.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${Name}Component.cpp` | Always |
| `Source/${Name}Component.h` | Always |
| `Include/${GemName}/${Name}Interface.h` | Only when `skip_interface` is false |
| `Source/Editor${Name}Component.h` | Only when `include_editor` is true |
| `Source/Editor${Name}Component.cpp` | Only when `include_editor` is true |

The interface header carries `cleanup_hint: "interface"` -- if skipped, all EBus wiring is removed from remaining files.
The editor files carry `cleanup_hint: "editor"` -- if excluded, their `#include` lines are stripped from siblings.

**Input variables:**

| Var Name | Type | Default | show_if | Description |
|---|---|---|---|---|
| `skip_interface` | toggle | false | -- | Omit `${Name}Interface.h` and all EBus wiring |
| `include_editor` | toggle | false | `hasEditor` | Generate `Editor${Name}Component` for editor-side representation; only shown when gem has an Editor module |

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds runtime `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers component in runtime module |
| `register_interface_header` | `!skip_interface` | Registers interface header in API/INTERFACE target |
| `register_file_list` | `include_editor` | Adds editor `.h` / `.cpp` to CMake |
| `register_module_descriptor` (`module_kind: "editor"`) | `include_editor` | Registers EditorComponent in editor module |
| `replace_text` | `include_editor` | Strips `AppearsInAddComponentMenu` from runtime `.cpp` so only the EditorComponent appears in the editor menu |

**Notable features:** Only template with both conditional interface cleanup and conditional editor adapter. The `include_editor` toggle is hidden on gems without an Editor module (`show_if: "hasEditor"`).


## Full Template JSON

```
{
    "template_name": "DefaultComponent",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "Default Component Template",
    "summary": "A component template for a typical game component.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "DefaultComponent"
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
        },
        {
            "file": "Source/Tools/Editor${Name}Component.h",
            "isTemplated": true,
            "isEditor": true,
            "cleanup_hint": "editor",
            "condition": "include_editor"
        },
        {
            "file": "Source/Tools/Editor${Name}Component.cpp",
            "isTemplated": true,
            "isEditor": true,
            "cleanup_hint": "editor",
            "condition": "include_editor"
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
        "display_name": "Basic Component",
        "class_name": "default_component",
        "description": "A standard game component with optional interface header and optional editor adapter component.",
        "component_suffix": "Component",

        "input_vars": [
            {
                "input_type": "toggle",
                "var_name": "skip_interface",
                "title": "Skip Interface",
                "default_value": false,
                "description": "Do not create the Interface.h file"
            },
            {
                "input_type": "toggle",
                "var_name": "include_editor",
                "title": "Add Editor Comp.",
                "default_value": false,
                "description": "Generate an EditorComponent wrapper that appears in the Editor Inspector and exports the runtime component at game-mode",
                "show_if": "hasEditor"
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
            },
            {
                "command": "register_file_list",
                "condition": "include_editor",
                "args": { "component_name": "Editor${Name}${ComponentSuffix}" }
            },
            {
                "command": "register_module_descriptor",
                "condition": "include_editor",
                "args": { "component_name": "Editor${Name}${ComponentSuffix}", "module_kind": "editor" }
            },
            {
                "command": "replace_text",
                "condition": "include_editor",
                "args": {
                    "component_name": "${Name}${ComponentSuffix}.cpp",
                    "text_to_replace": "AppearsInAddComponentMenu, AZ_CRC_CE(\"Game\"))",
                    "replacement": "AppearsInAddComponentMenu, AZ_CRC_CE(\"\"))"
                }
            }
        ]
    }
}

```