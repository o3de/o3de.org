---
title: "Data Asset"
linkTitle: "Data Asset"
description: "Template for creating custom data asset types with GenericAssetHandler registration."
weight: 60
---

**Template name:** `DataAsset`
**CLI:** `--template data_asset`
**Suffix:** `Asset` -- produces `${Name}Asset`

A custom data asset class with full asset pipeline integration. Creates the asset class, a `GenericAssetHandler` registration, `.setreg` configuration for the Asset Processor, and optional file extension mapping.

## Files Generated

| File | Conditional |
|---|---|
| `Source/${Name}Asset.cpp` | Always |
| `Source/${Name}Asset.h` | Always |
| `Source/${Name}DataAssetSystemComponent.cpp` | Always |
| `Source/${Name}DataAssetSystemComponent.h` | Always |

## Input Variables

| Var Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `file_extension` | text | `mydata` | Yes | Custom file extension the Asset Processor will recognize |
| `asset_group` | dropdown | `Other` | No | Asset browser category (`Other`, `Texture`, `Animation`, `Audio`) |

## Commands

| Command | Condition | Description |
|---|---|---|
| `register_file_list` | Always | Adds asset `.h` / `.cpp` to CMake |
| `register_file_list` | Always | Adds system component `.h` / `.cpp` to CMake |
| `register_module_descriptor` | Always | Registers DataAssetSystemComponent in runtime module |
| `register_system_component` | Always | Adds to `GetRequiredSystemComponents()` |
| `register_generic_asset` | Always | Registers `GenericAssetHandler` in the system component |
| `register_asset_setreg` | Always | Creates `.setreg` entry for the Asset Processor |
| `copy_setreg` | Always | Ensures the `Registry/` directory exists |

## Key Differences from Basic Component

- Creates an asset class (`AZ::Data::AssetData` subclass) instead of a game component
- Includes a system component for asset handler registration
- Automatically configures the Asset Processor via `.setreg` files
- Requires a file extension and asset group as inputs
- No interface header or editor adapter options
