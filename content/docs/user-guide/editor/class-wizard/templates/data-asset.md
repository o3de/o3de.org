---
title: "Data Asset"
linkTitle: "Data Asset"
description: "Template for creating custom data asset types with GenericAssetHandler registration."
weight: 60
---

**Template name:** `DataAsset`
**CLI:** `--template data_asset`
**Suffix:** `Asset` -- produces `${Name}Asset`

A custom data asset class with full asset pipeline integration. Creates the asset class, a `GenericAssetHandler` registration, `.setreg` configuration for the Asset Processor, and file extension mapping. The template produces both the asset data class and a system component that registers the asset handler at engine startup.

**Files generated:**

| File | Conditional |
|---|---|
| `Source/${Name}Asset.cpp` | Always |
| `Source/${Name}Asset.h` | Always |
| `Source/${Name}DataAssetSystemComponent.cpp` | Always |
| `Source/${Name}DataAssetSystemComponent.h` | Always |

**Input variables:**

| Var Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `file_extension` | text | `mydata` | Yes | Custom file extension the Asset Processor will recognize |
| `asset_group` | dropdown | `Other` | No | Asset browser category (`Other`, `Texture`, `Animation`, `Audio`) |

**Commands:**

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds asset `.h` / `.cpp` to CMake |
| `register_file_list` | Always | Adds system component `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers DataAssetSystemComponent in runtime module |
| `register_system_component` | Always | Adds to `GetRequiredSystemComponents()` |
| `register_generic_asset` | Always | Registers `GenericAssetHandler` in the system component |
| `register_asset_setreg` | Always | Creates `.setreg` entry for the Asset Processor |
| `copy_setreg` | Always | Ensures the `Registry/` directory exists |


## Full Template JSON

```json
{
    "template_name": "DataAsset",
    "origin": "Open 3D Engine - o3de.org",
    "origin_url": "https://github.com/o3de/o3de",
    "license": "Apache-2.0 or MIT",
    "license_url": "https://github.com/o3de/o3de/blob/development/LICENSE.txt",
    "display_name": "Data Asset Template",
    "summary": "A custom data asset class with asset handler and Asset Processor configuration.",
    "canonical_tags": [
        "Template"
    ],
    "user_tags": [
        "DataAsset"
    ],
    "icon_path": "preview.png",
    "copyFiles": [
        {
            "file": "Source/${Name}Asset.cpp",
            "isTemplated": true
        },
        {
            "file": "Source/${Name}Asset.h",
            "isTemplated": true
        },
        {
            "file": "Source/${Name}DataAssetSystemComponent.cpp",
            "isTemplated": true
        },
        {
            "file": "Source/${Name}DataAssetSystemComponent.h",
            "isTemplated": true
        }
    ],
    "createDirectories": [
        {
            "dir": "Source"
        }
    ],
    "class_wizard": {
        "display_name": "Data Asset",
        "class_name": "data_asset",
        "description": "Creates a custom data asset type with GenericAssetHandler registration and Asset Processor configuration.",
        "component_suffix": "Asset",

        "input_vars": [
            {
                "input_type": "text",
                "var_name": "file_extension",
                "title": "File Extension",
                "default_value": "mydata",
                "description": "Custom file extension the Asset Processor will recognize for this asset type",
                "required": true
            },
            {
                "input_type": "dropdown",
                "var_name": "asset_group",
                "title": "Asset Group",
                "default_value": "Other",
                "options": ["Other", "Texture", "Animation", "Audio"],
                "description": "Asset browser category for this asset type"
            }
        ],

        "process_commands": [
            {
                "command": "register_file_list",
                "args": { "component_name": "${Name}${ComponentSuffix}" }
            },
            {
                "command": "register_file_list",
                "args": { "component_name": "${Name}DataAssetSystemComponent" }
            },
            {
                "command": "register_module_descriptor",
                "args": { "component_name": "${Name}DataAssetSystemComponent", "module_kind": "runtime" }
            },
            {
                "command": "register_system_component",
                "args": { "component_name": "${Name}DataAssetSystemComponent", "module_kind": "runtime" }
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
                "command": "register_asset_setreg",
                "args": {
                    "asset_name": "${Name}${ComponentSuffix}",
                    "asset_ext": "${file_extension}"
                }
            },
            {
                "command": "copy_setreg",
                "args": {
                    "setreg_name": "${GemName}.setreg"
                }
            }
        ]
    }
}
```
