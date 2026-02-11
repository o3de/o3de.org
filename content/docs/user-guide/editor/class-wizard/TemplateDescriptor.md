---
title: "Template Descriptor Language"
linkTitle: "Template Descriptor"
weight: 300
---

# Template Descriptor Language

Every Class Creation Wizard template is defined by a `template.json` file placed in a `Templates/<TemplateName>/` directory. This file combines standard O3DE template metadata with a `class_wizard` block that the wizard uses to drive code generation and project integration.

## Template Discovery

The wizard scans for templates in three locations:

| Source | Path Pattern |
|---|---|
| Engine | `<Engine>/Templates/*/template.json` |
| Project | `<Project>/Templates/*/template.json` |
| Gems | `<Gem>/Templates/*/template.json` |

Only templates containing a `class_wizard` block are recognized by the wizard. Standard O3DE templates without this block are ignored. Templates are deduplicated by resolved directory path and sorted alphabetically by display name.

## File Structure

A complete template directory:

```
Templates/
  MyTemplate/
    template.json          -- Descriptor file
    Template/              -- Source files for o3de create-from-template
      Source/
        ${Name}MyType.cpp
        ${Name}MyType.h
      Include/
        ${GemName}/
          ${Name}Interface.h
    preview.png            -- Optional icon for GUI display
```

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
        { "file": "Include/${GemName}/${Name}Interface.h", "isTemplated": true, "condition": "!skip_interface" }
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

        "input_vars": [ ... ],
        "process_commands": [ ... ]
    }
}
```

## Top-Level Fields

These fields are standard O3DE template metadata. The wizard uses some of them during file staging.

| Field | Required | Description |
|---|---|---|
| `template_name` | Yes | Internal identifier. Must match the directory name. |
| `display_name` | No | Human-readable name for template listings. |
| `summary` | No | Short description. |
| `origin` | No | Author or organization. |
| `license` | No | License identifier. |
| `copyFiles` | Yes | Files to copy from `Template/` into the target gem. |
| `createDirectories` | No | Directories to ensure exist before copying. |

### copyFiles

Each entry in `copyFiles` defines a file to generate:

```json
{ "file": "Source/${Name}MyType.cpp", "isTemplated": true, "condition": "!skip_interface" }
```

| Field | Type | Default | Description |
|---|---|---|---|
| `file` | string | -- | Path relative to gem root. Supports `${variable}` substitution in the path. |
| `isTemplated` | boolean | `true` | If `true`, O3DE processes `${variable}` tokens inside the file content. |
| `isInterface` | boolean | `false` | Marks the file as an EBus interface header. When true, `cleanup_hint` defaults to `"interface"`. |
| `condition` | string | -- | If set, the file is only created when the condition evaluates to true. See [Conditions](#conditions). |
| `cleanup_hint` | string | -- | Controls reference scrubbing when the file is excluded by a false condition. See [Cleanup Hints](#cleanup-hints) below. |

### Cleanup Hints

When a conditional file is excluded (its `condition` is false), the wizard can scrub references to that file from the remaining generated files. The `cleanup_hint` field controls what kind of scrubbing is performed.

| Value | What Gets Removed |
|---|---|
| `"interface"` | `#include` for the header, `public BusName::Handler` base class entries, `BusConnect(...)` and `BusDisconnect(...)` calls |
| `"editor"` | `#include` lines referencing the excluded file's header |
| *(omitted)* | The file is deleted from staging; no reference cleanup is performed |

When `isInterface` is `true` and `cleanup_hint` is not set, the wizard defaults to `"interface"` cleanup automatically for backward compatibility.

**Example -- optional interface with cleanup:**

```json
{
    "file": "Include/${GemName}/${Name}Bus.h",
    "isTemplated": true,
    "isInterface": true,
    "cleanup_hint": "interface",
    "condition": "!skip_interface"
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

### input_vars

Defines user-facing input fields. Each variable becomes a GUI widget and a CLI flag.

```json
"input_vars": [
    {
        "input_type": "toggle",
        "var_name": "skip_interface",
        "title": "Skip Interface",
        "default_value": false,
        "description": "Do not create the Interface.h file"
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
    }
]
```

| Field | Required | Description |
|---|---|---|
| `var_name` | Yes | Variable name. Referenced as `${var_name}` in args and conditions. Becomes `--var-name` on the CLI (underscores to hyphens). |
| `input_type` | Yes | One of `"toggle"`, `"text"`, or `"dropdown"`. |
| `title` | Yes | Label shown in the GUI. |
| `default_value` | No | Default value. Toggles default to `false`, text to `""`. |
| `description` | No | Help text shown in GUI tooltips and `--template-help`. |
| `required` | No | If `true`, the field must be filled. Only meaningful for `text` inputs. |
| `options` | No | Array of choices. Only used with `"dropdown"` type. |
| `show_if` | No | Project condition key. If set, the input only appears when the selected gem satisfies this condition. See [Project Conditions](#project-conditions) below. |

### Project Conditions

The `show_if` field lets input variables appear or disappear based on the structure of the selected target gem. This allows templates to expose optional features (like an editor adapter) only when the gem is actually set up to support them.

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

If the selected gem has no editor module, the toggle is hidden and the variable defaults to `false`, which naturally excludes any files conditioned on `include_editor`.

#### Input Types

| Type | GUI Widget | CLI Flag | Variable Value |
|---|---|---|---|
| `toggle` | Checkbox | `--var-name` (store_true) | `true` / `false` |
| `text` | Text field | `--var-name VALUE` | String |
| `dropdown` | Combo box | `--var-name VALUE` (choices) | Selected string |

### process_commands

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
        "condition": "!skip_interface"
    },
    {
        "command": "add_gem_dependency",
        "args": { "dependency": "Gem::SomeOtherGem.API" }
    },
    {
        "command": "replace_text",
        "args": {
            "component_name": "${Name}_Reactor.h",
            "text_to_replace": "${PulseChannel}",
            "replacement_var": "pulse_channel"
        }
    }
]
```

| Field | Required | Description |
|---|---|---|
| `command` | Yes | Registered command name. See [Command Reference](Commands.md). |
| `args` | Yes | Object of arguments passed to the command constructor. All string values support `${variable}` substitution. |
| `condition` | No | If set, the command only runs when the condition is true. |

Commands execute in order. Registration commands (those with `is_registration_command = True`) only run when `--automatic-register` is enabled. All other commands always run.

See the [Command Reference](Commands.md) for the full list of available commands and their arguments.

---

## Variables

Variables are substituted in file paths, file content (when `isTemplated` is true), and command arguments.

### Built-in Variables

| Variable | Source | Example |
|---|---|---|
| `${Name}` | `--component-name` or GUI "Component Name" field | `PlayerHealth` |
| `${GemName}` | Selected gem namespace | `GS_Interaction` |
| `${ComponentSuffix}` | Template's `component_suffix` field | `Component` |
| `${SanitizedCppName}` | O3DE-generated C++-safe version of `${Name}` | `PlayerHealth` |

### User Variables

Any `var_name` defined in `input_vars` is available as `${var_name}`:

```json
"input_vars": [{ "var_name": "pulse_channel", ... }]
```

Accessible in args as `${pulse_channel}` or via `replacement_var: "pulse_channel"` in the `replace_text` command.

---

## Conditions

Conditions gate file inclusion and command execution. They are evaluated against the resolved variable set.

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

A gem template for a dialogue effect component:

```json
{
    "template_name": "DialogueEffect",
    "display_name": "Dialogue Effect Template",
    "summary": "A dialogue effect component for the cinematics system.",

    "copyFiles": [
        { "file": "Source/${Name}_DialogueEffect.cpp", "isTemplated": true },
        { "file": "Source/${Name}_DialogueEffect.h", "isTemplated": true }
    ],

    "createDirectories": [
        { "dir": "Source" }
    ],

    "class_wizard": {
        "display_name": "Dialogue Effect",
        "class_name": "dialogue_effect",
        "description": "Creates a new dialogue effect that integrates with the GS_Cinematics dialogue system.",
        "component_suffix": "DialogueEffect",

        "input_vars": [],

        "process_commands": [
            {
                "command": "register_file_list",
                "args": { "component_name": "${Name}_${ComponentSuffix}" }
            },
            {
                "command": "register_module_descriptor",
                "args": { "component_name": "${Name}_${ComponentSuffix}", "module_kind": "runtime" }
            },
            {
                "command": "register_system_component",
                "args": { "component_name": "${Name}_${ComponentSuffix}", "module_kind": "runtime" }
            },
            {
                "command": "add_gem_dependency",
                "args": { "dependency": "Gem::GS_Cinematics.API" }
            }
        ]
    }
}
```

This template:
1. Generates two source files from the `Template/Source/` directory
2. Registers them in the gem's CMake file list
3. Adds the component to the module descriptor and system component list
4. Adds `Gem::GS_Cinematics.API` as a build dependency (skipped if the gem is GS_Cinematics itself)
