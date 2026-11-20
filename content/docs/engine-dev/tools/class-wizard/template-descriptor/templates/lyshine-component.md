---
title: "LyShine Component"
linkTitle: "LyShine Component"
description: "Template for creating UI components using the LyShine/UiCanvas system."
weight: 50
---

**Template name:** `LyShineComponent`
**CLI:** `--template lyshine_component`
**Suffix:** `Component` -- produces `${Name}Component`

A UI component for the LyShine (UI 2.0) system. LyShine components are used to create custom UI elements that work within the UiCanvas framework -- buttons, health bars, inventory slots, and other interactive UI elements. Automatically adds `Gem::LyShine` as a build dependency. Optionally generates an EBus interface header and an EditorComponent wrapper, the same as Basic Component.

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
| `include_editor` | toggle | `false` | `hasEditor` | Generate an EditorComponent wrapper that appears in the Editor Inspector and exports the runtime component at game-mode; only shown when the gem has an Editor module |

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds runtime `.h`/`.cpp` to CMake |
| `register_module_descriptor` | Always | Registers the component in the runtime module |
| `add_gem_dependency` | Always | Adds `Gem::LyShine` as a build dependency |
| `register_interface_header` | `add_bus_interface` | Registers the interface header in the API/INTERFACE target |
| `register_file_list` | `include_editor` | Adds editor `.h`/`.cpp` to CMake |
| `register_module_descriptor` (`module_kind: "editor"`) | `include_editor` | Registers the EditorComponent in the editor module |
| `replace_text` | `include_editor` | Strips the `"UI"` add-component-menu category from the runtime `.cpp` so only the EditorComponent appears in the editor's Add Component menu |

**Notable features:** The only template that adds a gem dependency (`Gem::LyShine`) as part of its standard flow. Otherwise, it follows the same optional-interface / optional-editor-adapter shape as Basic Component.


## Full Template JSON

```json
{
    "template_name": "LyShineComponent",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "Component Template for LyShine UI Component",
    "summary": "A component template for a ui game component.",
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
        "display_name": "LyShine UI Component",
        "class_name": "lyshine_component",
        "description": "A UI component using LyShine with Gem::LyShine dependency",
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
                "command": "add_gem_dependency",
                "args": { "dependency": "Gem::LyShine" }
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
                    "text_to_replace": "AppearsInAddComponentMenu, AZ_CRC_CE(\"UI\"))",
                    "replacement": "AppearsInAddComponentMenu, AZ_CRC_CE(\"\"))"
                }
            }
        ]
    }
}
```

## Design Notes

Same mechanic again, this time on `AZ_CRC_CE("UI")`. Both the runtime and Editor files start out categorized for the UI menu. Turning on `include_editor` triggers the same runtime-only `replace_text` clear described on [Basic Component](../basic-component/). The generated Editor variant is what actually appears to users.
