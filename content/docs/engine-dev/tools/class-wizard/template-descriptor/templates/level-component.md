---
title: "Level Component"
linkTitle: "Level Component"
description: "Template for creating components that attach to the level entity."
weight: 30
---

**Template name:** `LevelComponent`
**CLI:** `--template level_component`
**Suffix:** `LevelComponent` -- produces `${Name}LevelComponent`

A component that attaches to the level entity rather than individual game entities. Level components handle per-level services: weather systems, lighting controllers, or level-wide game logic. Optionally generates an EBus interface header and an EditorComponent wrapper for editor-side representation, the same as Basic Component.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${Name}LevelComponent.cpp` | Always |
| `Source/${Name}LevelComponent.h` | Always |
| `Include/${GemName}/${Name}Interface.h` | Only when `add_bus_interface` is true |
| `Source/Tools/Editor${Name}LevelComponent.h` | Only when `include_editor` is true |
| `Source/Tools/Editor${Name}LevelComponent.cpp` | Only when `include_editor` is true |

The interface header carries `cleanup_hint: "interface"` -- if not requested, all EBus wiring is removed from remaining files.
The editor files carry `cleanup_hint: "editor"` -- if excluded, their `#include` lines are stripped from siblings.

**Input variables:**

| Var Name | Type | Default | show_if | Description |
|---|---|---|---|---|
| `add_bus_interface` | toggle | `true` | -- | Create the Interface Bus header file |
| `include_editor` | toggle | `false` | `hasEditor` | Generate an EditorComponent wrapper that appears in the Editor Inspector and exports the runtime component at game-mode; only shown when the gem has an Editor module |

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds runtime `.h`/`.cpp` to CMake |
| `register_module_descriptor` | Always | Registers the component in the runtime module |
| `register_interface_header` | `add_bus_interface` | Registers the interface header in the API/INTERFACE target |
| `register_file_list` | `include_editor` | Adds editor `.h`/`.cpp` to CMake |
| `register_module_descriptor` (`module_kind: "editor"`) | `include_editor` | Registers the EditorComponent in the editor module |
| `replace_text` | `include_editor` | Strips the `"Level"` add-component-menu category from the runtime `.cpp` so only the EditorComponent appears in the editor's Add Component menu |

**Notable features:** Same optional-interface / optional-editor-adapter shape as Basic Component, but with the `LevelComponent` suffix baked into every generated file and CMake/module entry.


## Full Template JSON

```json
{
    "template_name": "LevelComponent",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "Default Level Component Template",
    "summary": "A component template for a level game component.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "LevelComponent"
    ],
    "icon_path": "preview.png",
    "copyFiles": [
        {
            "file": "Source/${Name}LevelComponent.cpp",
            "isTemplated": true
        },
        {
            "file": "Source/${Name}LevelComponent.h",
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
            "file": "Source/Tools/Editor${Name}LevelComponent.h",
            "isTemplated": true,
            "isEditor": true,
            "cleanup_hint": "editor",
            "condition": "include_editor"
        },
        {
            "file": "Source/Tools/Editor${Name}LevelComponent.cpp",
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
        "display_name": "Level Component",
        "class_name": "level_component",
        "description": "A component for level-specific functionality",
        "component_suffix": "LevelComponent",

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
                    "text_to_replace": "AppearsInAddComponentMenu, AZ_CRC_CE(\"Level\"))",
                    "replacement": "AppearsInAddComponentMenu, AZ_CRC_CE(\"\"))"
                }
            }
        ]
    }
}
```

## Design Notes

Same mechanic as [Basic Component](../basic-component/). The runtime and Editor files both start out with `AppearsInAddComponentMenu(AZ_CRC_CE("Level"))`, the command that makes either one appear in the Level Add Component menu. If you have an Editor component, it needs to be the one available in the menu, not the base component. Turning on `include_editor` also runs the `replace_text` command, gated on the same toggle, that clears the runtime `.cpp`'s copy to `AZ_CRC_CE("")`. The Editor file's own copy is never touched. It's the one that ends up visible in the Add Component menu.
