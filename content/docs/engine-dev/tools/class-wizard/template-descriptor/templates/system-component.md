---
title: "System Component"
linkTitle: "System Component"
description: "Template for creating global system components on the system entity."
weight: 40
---

**Template name:** `SystemComponent`
**CLI:** `--template system_component`
**Suffix:** `SystemComponent` -- produces `${Name}SystemComponent`

An engine-level system component that lives on the system entity. System components provide global services that run outside of entity context -- input managers, network systems, resource registries, and similar singletons. Optionally generates an EBus interface header and an EditorComponent wrapper, the same as Basic Component.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${Name}SystemComponent.cpp` | Always |
| `Source/${Name}SystemComponent.h` | Always |
| `Include/${GemName}/${Name}Interface.h` | Only when `add_bus_interface` is true |
| `Source/Tools/Editor${Name}SystemComponent.h` | Only when `include_editor` is true |
| `Source/Tools/Editor${Name}SystemComponent.cpp` | Only when `include_editor` is true |

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
| `register_system_component` (`module_kind: "runtime"`) | Always | Adds to `GetRequiredSystemComponents()` in the runtime module |
| `register_system_component` (`module_kind: "editor"`) | Always | Adds to `GetRequiredSystemComponents()` in the editor module |
| `register_interface_header` | `add_bus_interface` | Registers the interface header in the API/INTERFACE target |
| `register_file_list` | `include_editor` | Adds editor `.h`/`.cpp` to CMake |
| `register_module_descriptor` (`module_kind: "editor"`) | `include_editor` | Registers the EditorComponent in the editor module |
| `replace_text` | `include_editor` | Strips the `"Game"` add-component-menu category from the runtime `.cpp` so only the EditorComponent appears in the editor's Add Component menu |

**Notable features:** The only template that registers `register_system_component` twice, unconditionally. The system component is added to `GetRequiredSystemComponents()` in *both* the runtime and editor modules, regardless of whether `include_editor` generates a separate EditorComponent file. This is distinct from Data Asset, which duplicates `register_system_component` for the same reason but on a dedicated `DataAssetSystemComponent`, not the primary generated class.


## Full Template JSON

```json
{
    "template_name": "SystemComponent",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "Default System Component Template",
    "summary": "A component template for a typical system component.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "SystemComponent"
    ],
    "icon_path": "preview.png",
    "copyFiles": [
        {
            "file": "Source/${Name}SystemComponent.cpp",
            "isTemplated": true
        },
        {
            "file": "Source/${Name}SystemComponent.h",
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
            "file": "Source/Tools/Editor${Name}SystemComponent.h",
            "isTemplated": true,
            "isEditor": true,
            "cleanup_hint": "editor",
            "condition": "include_editor"
        },
        {
            "file": "Source/Tools/Editor${Name}SystemComponent.cpp",
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
        "display_name": "System Component",
        "class_name": "system_component",
        "description": "A system component registered in both runtime and editor modules",
        "component_suffix": "SystemComponent",

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
                "command": "register_system_component",
                "args": { "component_name": "${Name}${ComponentSuffix}", "module_kind": "runtime" }
            },
            {
                "command": "register_system_component",
                "args": { "component_name": "${Name}${ComponentSuffix}", "module_kind": "editor" }
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

Same mechanic as [Basic Component](../basic-component/) and [Level Component](../level-component/). Both the runtime and Editor files start out with `AppearsInAddComponentMenu(AZ_CRC_CE("Game"))`, the same category as Basic Component rather than something System-specific. This is the command that makes either one appear in the Game Add Component menu. If you have an Editor component, it needs to be the one available in the menu, not the base component. Turning on `include_editor` also runs the `replace_text` command that clears the runtime file's category to `AZ_CRC_CE("")`, leaving the generated Editor variant as the one that shows up.

Unlike the other three, this template also calls `register_system_component` unconditionally, twice, regardless of `include_editor`. See [Architecture > Commands Are Additive, Not Destructive](/docs/engine-dev/tools/class-wizard/architecture/#commands-are-additive-not-destructive) for why that's safe to run against an existing module.
