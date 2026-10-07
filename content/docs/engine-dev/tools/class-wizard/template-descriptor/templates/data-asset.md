---
title: "Data Asset"
linkTitle: "Data Asset"
description: "Template for creating custom data asset types with GenericAssetHandler registration."
weight: 60
---

**Template name:** `DataAsset`
**CLI:** `--template data_asset`
**Suffix:** `Asset` -- produces `${Name}Asset`

A custom data asset class with `GenericAssetHandler` registration -- also known as Generic Asset, after that handler class. Generates the asset data class plus a dedicated `${GemName}DataAssetSystemComponent` that registers the asset handler at engine startup, in both the runtime and editor modules. Optionally generates an EBus interface header for the asset.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${GemName}DataAssetSystemComponent.cpp` | Always |
| `Source/${GemName}DataAssetSystemComponent.h` | Always |
| `Source/${Name}Asset.cpp` | Always |
| `Source/${Name}Asset.h` | Always |
| `Include/${GemName}/${Name}Interface.h` | Only when `add_bus_interface` is true |

The interface header carries `cleanup_hint: "interface"` -- if not requested, all EBus wiring is removed from remaining files.

**Input variables:**

| Var Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `add_bus_interface` | toggle | `true` | No | Create the Interface Bus header file |
| `file_extension` | text | `dataasset` | Yes | The file extension for this asset type (without dot) |
| `asset_group` | text | `DataAssets` | No | The asset browser group for this asset type |

`asset_group` is free text, not a fixed dropdown -- any group name the asset browser should display can be entered.

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `add_gem_dependency` | Always | Adds `AZ::AzFramework` as a build dependency |
| `register_file_list` | Always | Adds the system component `.h`/`.cpp` to CMake |
| `register_file_list` | Always | Adds the asset `.h`/`.cpp` to CMake |
| `register_module_descriptor` | Always | Registers the system component in the runtime module |
| `register_system_component` | Always | Adds the system component to `GetRequiredSystemComponents()` in the runtime module |
| `register_system_component` | Always | Adds the system component to `GetRequiredSystemComponents()` in the editor module |
| `register_generic_asset` | Always | Registers a `GenericAssetHandler` for the asset in the system component |
| `register_interface_header` | `add_bus_interface` | Registers the interface header in the API/INTERFACE target |

**Notable features:** The only template that registers its system component in both the runtime and editor `GetRequiredSystemComponents()` lists unconditionally, because the asset handler needs to be available in both. There is no `.setreg`/Asset Processor configuration step. The file extension and asset group only drive the `GenericAssetHandler` registration in code.


## Full Template JSON

```json
{
    "template_name": "DataAsset",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "Data Asset Template",
    "summary": "A template to create and register a Custom Data Asset.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "DataAsset"
    ],
    "icon_path": "preview.png",
    "copyFiles": [
        {
            "file": "Source/${GemName}DataAssetSystemComponent.cpp",
            "isTemplated": true
        },
        {
            "file": "Source/${GemName}DataAssetSystemComponent.h",
            "isTemplated": true
        },
        {
            "file": "Source/${Name}Asset.cpp",
            "isTemplated": true
        },
        {
            "file": "Source/${Name}Asset.h",
            "isTemplated": true
        },
        {
            "file": "Include/${GemName}/${Name}Interface.h",
            "isTemplated": true,
            "isInterface": true,
            "cleanup_hint": "interface",
            "condition": "add_bus_interface"
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
        "display_name": "Data Asset",
        "class_name": "data_asset",
        "description": "Creates a custom data asset with setreg configuration",
        "component_suffix": "Asset",

        "input_vars": [
            {
                "input_type": "toggle",
                "var_name": "add_bus_interface",
                "title": "Add Bus Interface",
                "default_value": true,
                "description": "Create the Interface Bus header file"
            },
            {
                "input_type": "text",
                "var_name": "file_extension",
                "title": "File Extension",
                "default_value": "dataasset",
                "required": true,
                "description": "The file extension for this asset type (without dot)"
            },
            {
                "input_type": "text",
                "var_name": "asset_group",
                "title": "Asset Group",
                "default_value": "DataAssets",
                "description": "The asset browser group for this asset type"
            }
        ],

        "process_commands": [
            {
                "command": "add_gem_dependency",
                "args": { "dependency": "AZ::AzFramework" }
            },
            {
                "command": "register_file_list",
                "args": { "component_name": "${GemName}DataAssetSystemComponent" }
            },
            {
                "command": "register_file_list",
                "args": { "component_name": "${Name}${ComponentSuffix}" }
            },
            {
                "command": "register_module_descriptor",
                "args": { "component_name": "${GemName}DataAssetSystemComponent", "module_kind": "runtime" }
            },
            {
                "command": "register_system_component",
                "args": { "component_name": "${GemName}DataAssetSystemComponent", "module_kind": "runtime" }
            },
            {
                "command": "register_system_component",
                "args": { "component_name": "${GemName}DataAssetSystemComponent", "module_kind": "editor" }
            },
            {
                "command": "register_generic_asset",
                "args": {
                    "asset_name": "${Name}${ComponentSuffix}",
                    "asset_ext": "${file_extension}",
                    "asset_group": "${asset_group}"
                }
            },
            {
                "command": "register_interface_header",
                "condition": "add_bus_interface",
                "args": { "component_name": "${Name}" }
            }
        ]
    }
}
```

Note: the JSON's `description` field ("Creates a custom data asset with setreg configuration") predates this version of the template -- the current `process_commands` no longer touch a `.setreg` file. Treat the prose sections above as the authoritative description of current behavior.

## Design Notes

Data Asset has no `include_editor` toggle and no separate EditorComponent file. Its `${GemName}DataAssetSystemComponent` is registered into `GetRequiredSystemComponents()` in *both* the runtime and editor modules, unconditionally. See [Architecture > Commands Are Additive, Not Destructive](/docs/engine-dev/tools/class-wizard/architecture/#commands-are-additive-not-destructive).

Basic Component and its relatives resolve an `AppearsInAddComponentMenu` visibility conflict between a runtime component and its Editor variant. Data Asset has no such conflict to resolve. A system component is never placed by hand from that menu. It only needs to exist in whichever module is running. This is also why Data Asset is the only template that calls `register_system_component` twice against the *same* component name, rather than a runtime/Editor pair.
