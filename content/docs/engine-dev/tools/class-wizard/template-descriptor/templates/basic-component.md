---
title: "Basic Component"
linkTitle: "Basic Component"
description: "Template for creating a standard O3DE game component."
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
| `Include/${GemName}/${Name}Interface.h` | Only when `add_bus_interface` is true |
| `Source/Tools/Editor${Name}Component.h` | Only when `include_editor` is true |
| `Source/Tools/Editor${Name}Component.cpp` | Only when `include_editor` is true |

The interface header carries `cleanup_hint: "interface"` -- if not requested, all EBus wiring is removed from remaining files.
The editor files carry `cleanup_hint: "editor"` -- if excluded, their `#include` lines are stripped from siblings.

**Input variables:**

| Var Name | Type | Default | show_if | Description |
|---|---|---|---|---|
| `add_bus_interface` | toggle | `true` | -- | Create the Interface Bus header file |
| `include_editor` | toggle | `false` | `hasEditor` | Generate an EditorComponent wrapper that appears in the Editor Inspector and exports the runtime component at game-mode; only shown when gem has an Editor module |

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds runtime `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers component in runtime module |
| `register_interface_header` | `add_bus_interface` | Registers interface header in API/INTERFACE target |
| `register_file_list` | `include_editor` | Adds editor `.h` / `.cpp` to CMake |
| `register_module_descriptor` (`module_kind: "editor"`) | `include_editor` | Registers EditorComponent in editor module |
| `replace_text` | `include_editor` | Strips `AppearsInAddComponentMenu` from runtime `.cpp` so only the EditorComponent appears in the editor menu |

**Notable features:** The only template with both conditional interface cleanup and a conditional editor adapter. The `include_editor` toggle is hidden on gems without an Editor module (`show_if: "hasEditor"`). Unlike most toggles, `add_bus_interface` defaults to `true`. The wizard generates the interface header unless you explicitly turn that toggle off.


## Full Template JSON

```json
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
            "condition": "add_bus_interface"
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
                "var_name": "add_bus_interface",
                "title": "Add Bus Interface",
                "default_value": true,
                "description": "Create the Interface Bus header file"
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
                "condition": "add_bus_interface",
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

## Design Notes

The runtime and Editor source files both start out with `AppearsInAddComponentMenu(AZ_CRC_CE("Game"))`. This is the command that makes either one appear in the Game Add Component menu. If you have an Editor component, it needs to be the one available in the menu, not the base component. The wizard clears the base component's category to `AZ_CRC_CE("")` using `replace_text`. This command finds that exact literal string in the *runtime* `.cpp` only, and rewrites it. It leaves the Editor file's own copy of the same attribute untouched. The command is itself gated on `include_editor`. Skip that toggle, and the command doesn't run at all. The runtime component then keeps its original "Game" category, since there's no Editor variant to hand visibility to.

[Level Component](../level-component/), [System Component](../system-component/), and [LyShine Component](../lyshine-component/) all use this identical mechanic on their own category strings ("Level", "Game", and "UI" respectively).
