---
title: "Template Descriptor Format"
linkTitle: "Template Descriptor Format"
description: "Full reference for the template.json descriptor file used by the Class Creation Wizard."
weight: 400
---

Every **Class Creation Wizard** template is defined by a `template.json` file, placed in a `Templates/<TemplateName>/` directory. This file combines standard O3DE template metadata with a `class_wizard` block that the wizard uses to drive code generation and project integration.

This page covers the schema field by field. First, the standard O3DE fields ([`copyFiles`](#copyfiles), `createDirectories`), which the wizard extends rather than replaces. Then the wizard-only [`class_wizard` block](#the-class_wizard-block), which documents every field required to author a template. After you know this schema, see [Templates](templates/) for how every built-in template applies it.

---

## Full Schema

```json
{
    "template_name": "MyTemplate",
    "display_name": "My Template",
    "summary": "Brief description shown in O3DE template listings.",
    "origin": "Your Studio",
    "license": "Apache-2.0",

    "copyFiles": [
        { "file": "Source/${Name}MyType.cpp", "isTemplated": true },
        { "file": "Source/${Name}MyType.h", "isTemplated": true },
        { "file": "Include/${GemName}/${Name}Interface.h", "isTemplated": true, "condition": "!include_extra_file" }
    ],

    "createDirectories": [
        { "dir": "Include/${GemName}" },
        { "dir": "Source" }
    ],

    "class_wizard": {
        "display_name": "My Custom Type",
        "class_name": "my_template",
        "description": "Creates a custom type with optional interface.",
        "component_suffix": "MyType",

        "input_vars": [
            {
                "input_type": "toggle",
                "var_name": "include_extra_file",
                "title": "Include Extra File",
                "default_value": false,
                "description": "Adds the optional interface header"
            },
            ...
        ],
        "process_commands": [
            {
                "command": "register_file_list",
                "args": { "component_name": "${Name}${ComponentSuffix}" }
            },
            ...
        ]
    }
}
```

Each array here can hold as many entries as the template needs: one `input_vars` entry per field you want to collect, one `process_commands` entry per step you want to run. The single entries shown are illustrative. See [input_vars](#input_vars) and [process_commands](#process_commands) below for every field each one supports.

---

## Top-Level Fields

These fields are standard O3DE template metadata. The wizard uses `copyFiles` and `createDirectories` during file staging.

| Field | Required | Description |
|---|---|---|
| `template_name` | Yes | Internal identifier. Must match the directory name. |
| `display_name` | No | Human-readable name for template listings. |
| `summary` | No | Short description. |
| `origin` | No | Author or organization. |
| `license` | No | License identifier. |
| `copyFiles` | Yes | Files to copy from `Template/` into the target gem. |
| `createDirectories` | No | Directories to ensure exist before copying. |

---

## copyFiles

Each entry in `copyFiles` defines a file to generate:

```json
{ "file": "Source/${Name}MyType.cpp", "isTemplated": true, "condition": "!include_extra_file" }
```

| Field | Type | Default | Description |
|---|---|---|---|
| `file` | string | -- | Path relative to gem root. Supports `${variable}` substitution in the path. |
| `isTemplated` | boolean | `true` | If `true`, O3DE processes `${variable}` tokens inside the file content. |
| `isInterface` | boolean | `false` | Marks the file as an EBus interface header. When true, `cleanup_hint` defaults to `"interface"`. |
| `isEditor` | boolean | `false` | Marks the file as belonging to the editor module CMake target. `register_file_list` reads this to decide whether to register the file against the runtime or editor build target. |
| `isTest` | boolean | `false` | Marks the file as belonging to the test CMake target. |
| `excludeFromMerge` | boolean | `false` | If `true`, the file is staged (so `${variable}` substitution still runs) but is not bulk-merged into the gem's source tree. A `process_commands` entry reads the file from the staging directory and writes it to a non-default destination -- `copy_file_to` is the command built for this. |
| `condition` | string | -- | If set, the file is only created when the condition evaluates to true. See [Conditions](#conditions). |
| `cleanup_hint` | string | -- | Controls reference scrubbing when the file is excluded by a false condition. See [Cleanup Hints](#cleanup-hints). |

### Cleanup Hints

When the wizard excludes a conditional file, because its `condition` is false, it can scrub references to that file from the remaining generated files. The `cleanup_hint` field controls the kind of scrubbing performed.

| Value | What Gets Removed |
|---|---|
| `"interface"` | `#include` for the header, `public BusName::Handler` base class entries, `BusConnect(...)` and `BusDisconnect(...)` calls |
| `"editor"` | `#include` lines referencing the excluded file's header |
| *(omitted)* | The file is deleted from staging; no reference cleanup is performed |

When `isInterface` is `true` and `cleanup_hint` is not set, the wizard defaults to `"interface"` cleanup automatically.

**Example -- optional interface with cleanup:**

```json
{
    "file": "Include/${GemName}/${Name}Bus.h",
    "isTemplated": true,
    "isInterface": true,
    "cleanup_hint": "interface",
    "condition": "!include_extra_file"
}
```

**Example -- optional editor adapter with cleanup:**

```json
{
    "file": "Source/Editor${Name}Component.h",
    "isTemplated": true,
    "cleanup_hint": "editor",
    "condition": "include_editor"
}
```

---

## The class_wizard Block

This is the wizard-specific configuration. Without this block, the template is invisible to the Class Creation Wizard.

### Identity Fields

| Field | Required | Description |
|---|---|---|
| `display_name` | Yes | Name shown in the wizard GUI and `--list-templates` output. |
| `class_name` | Yes | Internal key used as the `--template` CLI argument value. Must be unique across all discovered templates. |
| `description` | No | Longer description shown in `--template-help` output. |
| `component_suffix` | Yes | Appended to `${Name}` to form the full class name. Available as `${ComponentSuffix}`. |

---

## input_vars

Defines user-facing input fields. Each variable becomes a GUI widget and a CLI flag.

```json
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
        "default_value": "mydata",
        "description": "Custom asset file extension",
        "required": true
    },
    {
        "input_type": "dropdown",
        "var_name": "asset_group",
        "title": "Asset Group",
        "default_value": "Other",
        "options": ["Other", "Texture", "Animation", "Audio"],
        "description": "Asset browser category"
    },
    {
        "input_type": "int",
        "var_name": "width",
        "title": "Width",
        "default_value": 1920,
        "min_value": 1,
        "description": "Width in pixels"
    }
]
```

| Field | Required | Description |
|---|---|---|
| `var_name` | Yes | Variable name. Referenced as `${var_name}` in args and conditions. Becomes `--var-name` on the CLI (underscores to hyphens). |
| `input_type` | Yes | One of `"toggle"`, `"text"`, `"dropdown"`, `"int"`, or `"float"`. |
| `title` | Yes | Label shown in the GUI. |
| `default_value` | No | Default value. Toggles default to `false`, text to `""`. |
| `description` | No | Help text shown in GUI tooltips and `--template-help`. |
| `required` | No | If `true`, the field must be filled. Only meaningful for `text` inputs. |
| `options` | No | Array of choices. Only used with `"dropdown"` type. |
| `show_if` | No | Project condition key. If set, the input only appears when the selected gem satisfies this condition. |
| `min_value` / `max_value` | No | Numeric range bounds. Only used with `"int"`/`"float"` types; clamps the GUI spin box and is otherwise unenforced. |

### Input Types

| Type | GUI Widget | CLI Flag | Variable Value |
|---|---|---|---|
| `toggle` | Checkbox | `--var-name` (store_true) | `true` / `false` |
| `text` | Text field | `--var-name VALUE` | String |
| `dropdown` | Combo box | `--var-name VALUE` (choices) | Selected string |
| `int` | Spin box | `--var-name VALUE` (integer) | Integer |
| `float` | Double spin box | `--var-name VALUE` (float) | Floating-point |

A `toggle` input's CLI flag is a plain `store_true` action. It can only turn the value *on*. If `default_value` is already `true`, as with `add_bus_interface` on the component templates, there is no CLI flag to turn it back off. That variable can currently only be set to `false` from the GUI.

### Project Conditions (show_if)

The `show_if` field lets input variables appear or disappear based on the structure of the selected target gem.

| Condition Key | True When |
|---|---|
| `hasEditor` | The gem has a `Code/Source/Editor/` directory or any `*editor*.cmake` file |
| `hasTesting` | The gem has a `Code/Tests/` directory or any `*tests*.cmake` file |

**Example -- editor adapter toggle, visible only for gems with an editor module:**

```json
{
    "input_type": "toggle",
    "var_name": "include_editor",
    "title": "Include Editor Adapter",
    "default_value": false,
    "description": "Generate an editor-specific component variant",
    "show_if": "hasEditor"
}
```

If the selected gem has no editor module, the wizard hides the toggle, and the variable defaults to `false`.

---

## process_commands

An ordered array of commands to execute after files are generated and merged into the gem.

```json
"process_commands": [
    {
        "command": "register_file_list",
        "args": { "component_name": "${Name}${ComponentSuffix}" }
    },
    {
        "command": "register_module_descriptor",
        "args": { "component_name": "${Name}${ComponentSuffix}", "module_kind": "runtime" },
        "condition": "!include_extra_file"
    },
    {
        "command": "add_gem_dependency",
        "args": { "dependency": "Gem::SomeOtherGem.API" }
    }
]
```

| Field | Required | Description |
|---|---|---|
| `command` | Yes | Registered command name. See [Command Reference](../commands/). |
| `args` | Yes | Object of arguments passed to the command constructor. All string values support `${variable}` substitution. |
| `condition` | No | If set, the command only runs when the condition is true. |

Commands execute in order. Registration commands, those with `is_registration_command = True`, only run when `--automatic-register` is enabled. All other commands always run.

### Scoped Commands (Advanced)

A `process_commands` entry can also be a **scope block** instead of a single command. This lets a template dispatch to different command lists based on a variable's value. Scope blocks are optional. A template with no scope blocks behaves exactly as described above.

```json
"process_commands": [
    {
        "scope": "${integration_mode}",
        "branches": {
            "PostVolume": [
                { "command": "copy_variant_files", "args": { "variant_var": "integration_mode" } }
            ],
            "ScreenSpaceConstant": [
                { "command": "copy_variant_files", "args": { "variant_var": "integration_mode" } },
                { "command": "add_feature_processor_registration", "args": { "feature_processor_name": "${Name}FeatureProcessor" } }
            ]
        },
        "default": [
            { "command": "copy_variant_files", "args": { "variant_var": "integration_mode" } }
        ],
        "condition": "!skip_variant"
    }
]
```

| Field | Required | Description |
|---|---|---|
| `scope` | Yes | A `${variable}` reference resolved at generation time. Its resolved value is matched against the keys in `branches`. |
| `branches` | Yes | Object mapping a possible resolved value of `scope` to a list of command entries. Only the matching branch's commands are inlined; commands in other branches do not run. |
| `default` | No | Command list used when the resolved `scope` value matches none of the `branches` keys. |
| `condition` | No | If set, the entire scope block (all branches) is skipped when false. |

Branches can contain nested scope blocks. Templates that offer multiple integration modes, each with a different follow-up command list, use this pattern. See `copy_variant_files` in the [Command Reference](../commands/).

---

## Variables

Variables are substituted in file paths, file content (when `isTemplated` is true), and command arguments.

### Built-in Variables

The wizard's own `VariableResolver` seeds exactly three base variables for every generation:

| Variable | Source | Example |
|---|---|---|
| `${Name}` | `--component-name` or GUI "Component Name" field | `PlayerHealth` |
| `${GemName}` | Selected gem namespace | `GS_Interaction` |
| `${ComponentSuffix}` | Template's `component_suffix` field | `Component` |

`${SanitizedCppName}` and other O3DE template variables come from the underlying `o3de create-from-template` staging step, not from the wizard's own resolver. They follow O3DE's general template variable rules, separate from the three above.

### User Variables

Any `var_name` defined in `input_vars` is available as `${var_name}`.

---

## Conditions

Conditions gate file inclusion and command execution. The wizard evaluates them against the resolved variable set.

| Syntax | Meaning |
|---|---|
| *(empty or omitted)* | Always true |
| `"var_name"` | True if the variable is truthy (non-empty, non-false, non-zero) |
| `"!var_name"` | True if the variable is falsy |
| `"${var} == 'value'"` | String equality |
| `"${var} != 'value'"` | String inequality |
| `"${var} > N"` | Numeric greater-than |
| `"${var} < N"` | Numeric less-than |

---

## Complete Example

[Data Asset](templates/data-asset/) is a real built-in template. It uses this schema as follows:

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

This template does the following:

1. Generates four files unconditionally: a dedicated `${GemName}DataAssetSystemComponent`, plus the `${Name}Asset` class itself. It generates a fifth, conditional interface header, gated on `add_bus_interface`, with `cleanup_hint: "interface"` to scrub it out cleanly if that toggle is off.
2. Uses three different `input_vars` shapes in one template: a toggle, a required text field, and a free-text field with no fixed choices.
3. Adds `AZ::AzFramework` as a build dependency, then registers both file pairs in the gem's CMake file list.
4. Registers the system component's module descriptor, then adds it to `GetRequiredSystemComponents()` in *both* the runtime and editor modules, unconditionally, because the asset handler needs to exist in both.
5. Registers a `GenericAssetHandler` for the asset, using the user-provided file extension and asset group.
6. Registers the interface header too, but only `if add_bus_interface`.

See [Data Asset](templates/data-asset/) for the full field-by-field breakdown, and [Architecture > A Full-Stack Example](../architecture/#a-full-stack-example) for how this same template illustrates the wizard's execution order end to end.

---

## See It Applied

Every built-in template implements this schema. See [Templates](templates/) for the field-by-field breakdown of each one: Basic Component, Level Component, System Component, LyShine Component, Data Asset, and Attimage.
